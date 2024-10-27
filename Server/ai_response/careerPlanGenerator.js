import OpenAI from 'openai';
import dotenv from "dotenv";
dotenv.config();
import fs from 'fs';
import occupations from './occupations.js';

const openai = new OpenAI({ apiKey: process.env.OPENAI_API });
const OPENAI_MODEL = 'gpt-4o-mini';
const OPENAI_SYSTEM_PROMPT = "You are a college career advisor. You will provide 4 year college plan in academic and professional development for the specific career path. Do not use markdown to denote text formatting";
const OPENAI_USER_PROMPT = (occupation, industry) => `I want to be a ${occupation} with interest in ${industry} field. Provide me a 4 year college plan in academic and professional development for this career path. For academic development, only focus on courses related to the field. For each course, include the major topics for the course. For professional development, create realistic goals and steps to achieve them. Include the details in a roadmap format.`;
const OUTPUT_FILE = './ai_response/response_4mini.json';

const chatCompletion = async (occupation, industry) => {
  const jsonData = {};

  let messages = [
    {
      role: "system",
      content: OPENAI_SYSTEM_PROMPT,
    },
    {
      role: "user",
      content: OPENAI_USER_PROMPT(occupation, industry),
    },
  ];

  for(let i = 1; i <= 4; i++) {
    messages.push({
      role: "user",
      content: "Now provide the plan for year " + i,
    });

    const completion = await openai.chat.completions.create({
      messages: messages,
      model: OPENAI_MODEL,
    });

    messages.push({
      role: "assistant",
      content: completion.choices[0].message.content,
    });
    
    jsonData["year" + i] = completion.choices[0].message.content;
  }

  console.log(messages);
  console.log(jsonData);
  return jsonData;
};


const saveResponseToFile = async (response) => {
  try {
    const jsonData = {
      response
    };
    const jsonString = JSON.stringify(jsonData,null,2);
    fs.writeFile(OUTPUT_FILE, jsonString, (err) => {
      if (err) {
        throw err;
      }
    });
  }catch (error) {
    console.error(error);
  }
};


const createResponses = async () => {
  const responses = {};
  for (let i = 0; i < occupations.length; i++) {
    const occupation = occupations[i].name;
    const industry = occupations[i].industry;
    const response = await chatCompletion(occupation, industry);
    const jsonResponse = {response, occupation, industry};
    responses[occupation] = jsonResponse;
  }
  return responses;
}


saveResponseToFile(await createResponses());