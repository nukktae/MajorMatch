import OpenAI from 'openai';
import { ASSESSMENT_QUESTIONS } from '../components/AssessmentQuestion';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true
});

export async function generateCareerRecommendation(answers: Record<number, string>) {
  try {
    if (!import.meta.env.VITE_OPENAI_API_KEY) {
      throw new Error('OpenAI API key is not configured');
    }

    const completion = await openai.chat.completions.create({
      messages: [
        {
          role: "system",
          content: "You are an expert career counselor providing major recommendations based on assessment responses."
        },
        {
          role: "user",
          content: `Based on these assessment responses, recommend 3-4 college majors:
            ${Object.entries(answers).map(([questionId, answer]) => {
              const question = ASSESSMENT_QUESTIONS.find(q => q.id === parseInt(questionId));
              const selectedOption = question?.options.find(opt => opt.value === answer);
              return `${question?.category}: ${selectedOption?.text}`;
            }).join('\n')}
            
            Format as JSON with this structure for each major:
            {
              "majors": [{
                "name": string,
                "description": string,
                "whyGoodFit": string,
                "careers": string[],
                "skills": string[],
                "coursework": string[],
                "jobOutlook": string,
                "averageSalary": string
              }]
            }`
        }
      ],
      model: "gpt-4-turbo-preview",
      response_format: { type: "json_object" },
      temperature: 0.7,
      max_tokens: 2000
    });

    const content = completion.choices[0].message.content;
    if (!content) {
      throw new Error('No response from OpenAI');
    }

    return JSON.parse(content);
  } catch (error) {
    console.error('Error generating recommendation:', error);
    throw error;
  }
} 