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
