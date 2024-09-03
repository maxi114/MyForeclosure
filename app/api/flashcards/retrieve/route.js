// Importing necessary modules from Next.js
// Importing Supabase client creation utility from '@supabase/supabase-js'
import { createClient } from "@supabase/supabase-js";
// Importing LangChain utilities for working with OpenAI and document processing
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { Document } from "@langchain/core/documents";
import { RunnableSequence } from "@langchain/core/runnables";
import { MongoDBAtlasVectorSearch } from "@langchain/mongodb";
const { MongoClient } = require("mongodb");

import {
  BytesOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";

import { NextResponse } from "next/server";
import OpenAI from "openai";
import { FlashCardPrompt } from "/app/lib/data"; //import the flashcards prompt
import { steps } from "framer-motion";

//post function for the flashcards route
const systemPrompt = FlashCardPrompt; //store the flashcard prompt

export async function POST(req) {
  //store the incoming request data
  const data = await req.text();

  //establish connection to open ai
  const openai = new OpenAI();

  // Establish connection to MongoDB
  const client = new MongoClient(
    `mongodb+srv://pro:${process.env.MongoPwd}@mycluster.pbbtvdv.mongodb.net/MyForeclosure?retryWrites=true&w=majority`
  );
  await client.connect();
  const collection = client.db("MyForeclosure").collection("Education");

  //vector search function to perform search using the vector emeddings stored in the database
  //it accepts user_query (users search query) & collection (the mongob collection to be searched)
  async function vectorSearch(userQuery) {
    //create an embedding with the users flashcards request
    const embedding = await openai.embeddings.create({
      model: "text-embedding-3-small",
      input: userQuery,
      encoding_format: "float",
    });

    // Define the vector search pipeline to query similar embeddings in mongodb
    const pipeline = [
      {
        $vectorSearch: {
          index: "vector_search", // Use the name of your vector search index
          path: "values", // Field in your collection containing the vectors
          queryVector: embedding.data[0].embedding, // The generated embedding
          numCandidates: 1000, // Number of candidate matches to consider
          limit: 5, // Return top 5 matches
        },
      },
      {
        $project: {
          values: 0, // Exclude the 'values' field (you can include/exclude fields as needed, bacause value is set to 0 it will return every other field except the values field)
          score: {
            $meta: "vectorSearchScore", // Include the search score
          },
        },
      },
    ];

    // Execute the search
    const results = await collection.aggregate(pipeline).toArray();
    console.log(results)
    return results;
  }

  vectorSearch(data, collection);

  //call the vector search function to perform the vector search
  const getKnowledge = await vectorSearch(data, collection);

  // variable to store Processd search results
  let searchResult = "";

  getKnowledge.forEach((result) => {
    searchResult += `Title: ${result.id || "N/A"}, Steps: ${
      result.metadata.steps.map((step) => step.step).join(", ") || "N/A"
    }\n`;
  });

  //combine the users question with the returned mongo results
  const lastMessage = data;
  const lastMessageContent = lastMessage + searchResult;

  // implement open AI API call
  const completion = await openai.chat.completions.create({
    //create chat copletion request to the OpenAi API
    messages: [
      { role: "system", content: systemPrompt }, //message with our prompt
      { role: "user", content: lastMessageContent }, //message from the client (request body)
    ],
    model: "gpt-4o", //specify to use gpt-4o model
    response_format: { type: "json_object" }, //set response format to Json format so we receive a json response
  });

  // Parse the JSON response from the OpenAI API this response will be in the format specified in our system prompt, with a `flashcards` array conatining objects with `front` and `back` properties
  const flashcards = JSON.parse(completion.choices[0].message.content);

  // Return the flashcards as a JSON response
  return NextResponse.json(flashcards.flashcards);
}

