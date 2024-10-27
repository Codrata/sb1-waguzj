import { Handler } from '@netlify/functions';
import { Configuration, OpenAIApi } from 'openai';

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    const { resumeText, jobDescription } = JSON.parse(event.body || '{}');

    if (!resumeText || !jobDescription) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' }),
      };
    }

    const prompt = `
      Analyze this resume and job description:
      
      Resume:
      ${resumeText}
      
      Job Description:
      ${jobDescription}
      
      Provide:
      1. List of relevant skills from the resume matching the job requirements
      2. Suggested modifications to better match the job description
      3. A draft cover letter
    `;

    const completion = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{ role: "user", content: prompt }],
    });

    const analysis = completion.data.choices[0].message?.content || '';
    
    return {
      statusCode: 200,
      body: JSON.stringify({ analysis }),
      headers: {
        'Content-Type': 'application/json',
      },
    };
  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal server error' }),
    };
  }
};