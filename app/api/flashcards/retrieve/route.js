// Importing necessary modules from Next.js
// Importing Supabase client creation utility from '@supabase/supabase-js'
import { createClient } from "@supabase/supabase-js";
// Importing LangChain utilities for working with OpenAI and document processing
import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { SupabaseVectorStore } from "@langchain/community/vectorstores/supabase";
import { Document } from "@langchain/core/documents";
import { RunnableSequence } from "@langchain/core/runnables";
import {
  BytesOutputParser,
  StringOutputParser,
} from "@langchain/core/output_parsers";

import { NextResponse } from "next/server";
import OpenAI from "openai";
import { FlashCardPrompt } from "/app/lib/data"; //import the flashcards prompt

//post function for the flashcards route
const systemPrompt = FlashCardPrompt; //store the flashcard prompt

export async function POST(req) {
  const openai = new OpenAI();
  const data = await req.text();

  // implement open AI API call
  const completion = await openai.chat.completions.create({//create chat copletion request to the OpenAi API
    messages: [
      { role: "system", content: systemPrompt },//message with our prompt
      { role: "user", content: data },//message from the client (request body)
    ],
    model: "gpt-4o", //specify to use gpt-4o model
    response_format: { type: "json_object" }, //set response format to Json format so we receive a json response
  });

   // Parse the JSON response from the OpenAI API this response will be in the format specified in our system prompt, with a `flashcards` array conatining objects with `front` and `back` properties
   const flashcards = JSON.parse(completion.choices[0].message.content)

   // Return the flashcards as a JSON response
   return NextResponse.json(flashcards.flashcards)
}

/*--------------------------below code implements RAG it still has some bugs---------------------------------------------------------*/
/*--------------------------when uncomenting the below code you will have to comment the above code from lines 16-42----------------------------------*/





// Define the runtime environment for the function (edge runtime for serverless functions)
/*export const runtime = "edge";

// Function to combine document contents into a single string
const combineDocumentsFn = (docs) => {
  const serializedDocs = docs.map((doc) => doc.pageContent);
  return serializedDocs.join("\n\n");
};

// Define the template for creating flashcards
const FLASHCARD_PROMPT_TEMPLATE = `You are a flashcard creator. Create exactly 10 flashcards from the following context and text:

<Text to process>
  {text}
</Text>

You should return the flashcards in the following JSON format:
{{
  "flashcards": [
    {{
      "front": "Front of the card",
      "back": "Back of the card"
    }}
  ]
}}
`;
const flashcardPrompt = PromptTemplate.fromTemplate(FLASHCARD_PROMPT_TEMPLATE);

/**
 * This handler initializes and calls a retrieval chain to generate flashcards.
 */
/*export async function POST(req) {
  try {
    // Parse the request body to get the text to process
    const body = await req.json();
    const data = body.text
    
    // Ensure the data is a string
    if (typeof data !== "string") {
      throw new Error("Input data must be a string.");
    }

    // Initialize the OpenAI chat model
    const model = new ChatOpenAI({
      model: "gpt-4o", // Specify the model to use
      temperature: 0.2,
    });

    // Create a Supabase client instance
    const client = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_PRIVATE_KEY
    );
    
    // Initialize the Supabase vector store for document retrieval
    const vectorstore = new SupabaseVectorStore(new OpenAIEmbeddings(), {
      client,
      tableName: "documents",
      queryName: "match_documents",
    });

    // Create a promise to resolve with the retrieved documents
    let resolveWithDocuments;
    const documentPromise = new Promise((resolve) => {
      resolveWithDocuments = resolve;
    });

    // Set up the retriever to handle document retrieval
    const retriever = vectorstore.asRetriever({
      callbacks: [
        {
          handleRetrieverEnd(documents) {
            resolveWithDocuments(documents);
          },
        },
      ],
    });

    // Define the retrieval chain to process the documents
    const retrievalChain = retriever.pipe(combineDocumentsFn);

    // Define the flashcard chain to generate the response
    const flashcardChain = RunnableSequence.from([
      {
        context: RunnableSequence.from([
          (input) => input.text,
          retrievalChain,
        ]),
        text: (input) => input.text,
      },
      flashcardPrompt,
      model,
    ]);
    
    
    
    console.log(data)

    // Execute the flashcard generation chain
    const flashcardsResponse = await flashcardChain.stream({ text: data });

    // Wait for the document retrieval to complete
    let document = await documentPromise;

    // Serialize and encode the document sources
    const serializedSources = Buffer.from(
      JSON.stringify(
        document.map((doc) => {
          return {
            pageContent: doc.pageContent.slice(0, 50) + "...",
            metadata: doc.metadata,
          };
        }),
      ),
    ).toString("base64");

    // Return a streaming response with document sources as metadata
    return new Response(stream, {
      headers: {
        "x-message-index": (previousMessages.length + 1).toString(),
        "x-sources": serializedSources,
      },
    });

    try {
      flashcards = JSON.parse(flashcardsResponse);
    } catch (e) {
      throw new Error("Failed to parse flashcards response as JSON.");
    }

    // Return the flashcards as a JSON response
    return NextResponse.json(flashcards.flashcards);
  } catch (e) {
    console.log(e);
    // Handle errors and return a JSON response with the error message
    return NextResponse.json({ error: e.message }, { status: e.status ?? 500 });
  }
}*/
