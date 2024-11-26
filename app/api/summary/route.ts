import { createOpenAI as createGroq } from '@ai-sdk/openai';
import { NextRequest, NextResponse } from 'next/server';
import { generateText } from 'ai';

// Initialize the Groq AI instance
const groq = createGroq({
  baseURL: 'https://api.groq.com/openai/v1',
  apiKey: process.env.GROQ_API_KEY!,
});

// Define the POST handler
export async function POST(req: NextRequest) {
  try {
    // Parse the request body
    const body = await req.json();
    const { content } = body;  // Changed from 'prompt' to 'content'

    // Validate input
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    // Generate text using the provided content
    const { text } = await generateText({
      model: groq('llama-3.1-70b-versatile'),
      prompt: `No preamble please.Summarize the following blog post in 3 concise lines, capturing the key points:\n\n${content}`,
    });

    // Return the generated text
    return NextResponse.json({ result: text }, { status: 200 });
  } catch (error) {
    console.error('Error generating summary:', error);
    return NextResponse.json({ 
      error: 'Failed to generate summary', 
      details: error instanceof Error ? error.message : 'Unknown error' 
    }, { status: 500 });
  }
}