import { NextResponse } from "next/server";
import OpenAI from 'openai';

const systemPrompt = `
Welcome to your academic and career guidance assistant! My role is to provide tailored support to both college and high school students, helping you take meaningful steps toward your dream career. Choose the section that applies to you below, and I will guide you based on your academic stage.

--- For College Students ---
1. Course selection and academic focus areas within your major that align with industry needs.
2. Skills, certifications, or technologies you should master, with resources or study tips if needed.
3. Networking opportunities within and outside your university, including suggestions on clubs, online communities, and professional organizations.
4. Strategies to secure internships, research positions, or co-op experiences and how to leverage them for long-term goals.
5. Resume, portfolio, and interview tips tailored to your chosen field.
6. Advice on finding mentors or connecting with alumni who can guide you further.
7. Preparation steps for graduate studies (if relevant to your field), including recommended research, applications, and resources.

--- For High School Students ---
1. Recommended high school courses that will build a strong foundation in your field of interest.
2. Extracurricular activities, clubs, and volunteer opportunities that enhance your skills and experience.
3. AP or dual enrollment courses that can give you an advantage in college (if available at your school).
4. Scholarship, internship, and summer program recommendations to gain experience and expand your network.
5. Basic career skills to start developing, such as time management, communication, and online research.
6. Tips for building a compelling college application, especially for programs related to your field.
7. Preparing for college entrance exams if applicable, and finding resources to study for them effectively.
8. Additional steps to set you up for success as you move toward college and beyond.
`;

function formatContent(content) {
    // Check if content includes career advice keywords
    const isCareerAdvice = content.toLowerCase().includes("career advice") || content.toLowerCase().includes("advice");

    // Format content conditionally based on whether it is career advice
    return content
            .split('\n')
            .filter(line => line.trim() !== '') // Remove empty lines
            //.map((line, index) => `${index + 1}. ${line.trim()}`) // Number each line
            .join('\n\n'); // Add space between lines for readability
        //.split('\n')
        //.filter(line => line.trim() !== '') // Remove empty lines
        //map((line, index) => isCareerAdvice ? `${index + 1}. ${line.trim()}` : line.trim()) // Apply numbering only if it's career advice
        //.join('\n\n'); // Add space between lines for readability
}


export async function POST(req) {
    const openai = new OpenAI();
    const data = await req.json();

    const completion = await openai.chat.completions.create({
        messages: [{ role: 'system', content: systemPrompt }, ...data],
        model: 'gpt-4',
        stream: true,
    });

    const stream = new ReadableStream({
        async start(controller) {
            const encoder = new TextEncoder();

            try {
                for await (const chunk of completion) {
                    let content = chunk.choices[0]?.delta?.content;
                    if (content) {
                        content = formatContent(content); // Format content with numbers and spacing
                        const text = encoder.encode(content);
                        controller.enqueue(text);
                    }
                }
            } catch (error) {
                controller.error(error);
            } finally {
                controller.close();
            }
        },
    });

    return new Response(stream);
}


// Call the function to start the conversation


/*

// Import necessary modules
import { NextResponse } from 'next/server'

// Your system prompt
const systemPrompt = `Starting your skincare routine with a gentle cleanser is crucial for 
removing impurities and excess oil, preventing clogged pores and breakouts, and preparing 
the skin for subsequent products. Applying a moisturizer suitable for your skin type helps to hydrate and protect the skin barrier, 
preventing dryness and irritation. Look for products with hyaluronic acid for intense hydration. 
Incorporating exfoliation into your skincare routine 1-2 times a week helps to remove dead skin cells from the surface, 
promoting cell turnover and revealing smoother, brighter skin underneath. Daily application of a broad-spectrum sunscreen with at least SPF 30 is 
essential for protecting the skin from harmful UV rays, preventing premature aging and reducing the risk of skin cancer. A balanced diet rich in antioxidants and staying 
hydrated contribute to skin health from the inside out, supporting the skin's ability to maintain moisture and elasticity. Regular physical activity increases blood flow to the skin, 
nourishing skin cells and helping to carry away waste products, including free radicals, from working cells. Managing stress through practices like meditation, yoga, or 
even deep-breathing exercises can help reduce the occurrence of stress-related skin issues such as acne and eczema.
Question: What are the key components of an effective skincare routine that promotes healthy, glowing skin?`

// Handle POST requests
export async function POST(req) {
const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  try {
    const data = await req.json()
    
    // Simulate model response
    const modelResponse = {
        message: {parts: systemPrompt}, ...data,
        model: model
    };

    // Return the response
    return NextResponse.json({ message: modelResponse.choices[0].message.parts })
} catch (error) {
    console.error('Error processing request:', error)
    return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
    }
}

// Optionally, handle other HTTP methods (e.g., GET) if needed
export async function GET() {
    return NextResponse.json({ message: 'Welcome to the chat API!' })
}
*/

/*
// Import necessary modules
import { NextResponse } from 'next/server'

// Your system prompt
const systemPrompt = `Starting your skincare routine with a gentle cleanser is crucial for 
removing impurities and excess oil, preventing clogged pores and breakouts, and preparing 
the skin for subsequent products. Applying a moisturizer suitable for your skin type helps to hydrate and protect the skin barrier, 
preventing dryness and irritation. Look for products with hyaluronic acid for intense hydration. 
Incorporating exfoliation into your skincare routine 1-2 times a week helps to remove dead skin cells from the surface, 
promoting cell turnover and revealing smoother, brighter skin underneath. Daily application of a broad-spectrum sunscreen with at least SPF 30 is 
essential for protecting the skin from harmful UV rays, preventing premature aging and reducing the risk of skin cancer. A balanced diet rich in antioxidants and staying 
hydrated contribute to skin health from the inside out, supporting the skin's ability to maintain moisture and elasticity. Regular physical activity increases blood flow to the skin, 
nourishing skin cells and helping to carry away waste products, including free radicals, from working cells. Managing stress through practices like meditation, yoga, or 
even deep-breathing exercises can help reduce the occurrence of stress-related skin issues such as acne and eczema.
Question: What are the key components of an effective skincare routine that promotes healthy, glowing skin?`

// Handle POST requests
export async function POST(req) {
try {
const data = await req.json()

// Simulate model response
const modelResponse = ({
    messages: [{role: "system", parts: systemPrompt,}, ... data]
})

// Return the response
return NextResponse.json({ message: modelResponse.choices[0].message.parts })
} catch (error) {
console.error('Error processing request:', error)
return NextResponse.json({ error: 'Failed to process request' }, { status: 500 })
}
}

// Optionally, handle other HTTP methods (e.g., GET) if needed
export async function GET() {
return NextResponse.json({ message: 'Welcome to the chat API!' })
}
 /////////////////////////////////////////////////////////////////
import { NextResponse } from "next/server";
const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

const systemPrompt = `Starting your skincare routine with a gentle cleanser is crucial for 
removing impurities and excess oil, preventing clogged pores and breakouts, and preparing 
the skin for subsequent products. Applying a moisturizer suitable for your skin type helps to hydrate and protect the skin barrier, 
preventing dryness and irritation. Look for products with hyaluronic acid for intense hydration. 
Incorporating exfoliation into your skincare routine 1-2 times a week helps to remove dead skin cells from the surface, 
promoting cell turnover and revealing smoother, brighter skin underneath. Daily application of a broad-spectrum sunscreen with at least SPF 30 is 
essential for protecting the skin from harmful UV rays, preventing premature aging and reducing the risk of skin cancer. A balanced diet rich in antioxidants and staying 
hydrated contribute to skin health from the inside out, supporting the skin's ability to maintain moisture and elasticity. Regular physical activity increases blood flow to the skin, 
nourishing skin cells and helping to carry away waste products, including free radicals, from working cells. Managing stress through practices like meditation, yoga, or 
even deep-breathing exercises can help reduce the occurrence of stress-related skin issues such as acne and eczema.
Question: What are the key components of an effective skincare routine that promotes healthy, glowing skin?`

const data = await req.json()
const chat = model.chat({
    messages: [{role: "system", parts: systemPrompt,}, ... data]
});
return NextResponse.json({message: chat.choices[0].message.parts})


export async function POST(req){
    const data = await req.json()
    const chat = await model.chat({
        messages: [{role: "system", parts: systemPrompt,}, ... data]
        })
    return NextResponse.json({message: chat.choices[0].message.parts})
}

*/



