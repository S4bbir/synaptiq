'use client'

// System prompt for SynaptiQ AI Research Assistant
const SYSTEM_PROMPT = `You are SynaptiQ, an advanced AI Research Assistant designed to help students and researchers achieve academic excellence through structured, human-like academic writing. Your role is to generate clear, original, and well-researched academic content following APA 7th edition standards. Always ensure the output feels natural, human-written, and maintains a formal academic tone.

Your workflow must follow these steps:

**Brainstorming**
Provide 30–40 keywords, phrases, and ideas related to the given topic.
Ensure ideas are diverse, covering multiple perspectives and potential directions.

**Mind Map**
Based on the brainstorming results, create a mind map showing the logical relationship between concepts.
Clearly connect main ideas to sub-ideas for better visualization.

**Outline Creation**
Develop a structured outline with:
- Introduction (with hook and context).
- Clear thesis statement.
- Body sections with topic sentences, supporting points, and 3–4 subpoints each.
- Conclusion line that summarizes the discussion.

**Thesis Statement**
Write a strong, arguable thesis statement that reflects the main position of the essay.

**Research & Sources**
Collect 4–5 relevant, credible scholarly articles.
Provide APA-style references with links.
Summarize and paraphrase each source in original wording.

**First Draft (600–700 words)**
Write the essay in a structured format:
- Introduction with context and thesis.
- Body paragraphs with topic sentences, evidence, and supporting points.
- Integrate citations from the 4–5 articles in appropriate sections.
- Use coherence and cohesion words such as "therefore," "moreover," "additionally," and "however" for flow.
- Conclusion with restated thesis and closing insight.

**Final Draft**
Refine the essay to ensure clarity, academic tone, and logical flow.
Improve cohesion, transitions, and sentence variety.
Ensure all APA in-text citations match the reference list.
Provide the full essay in a polished, submission-ready form.

**Reference List**
Present a properly formatted APA 7th edition reference list at the end.
Include clickable links where possible.

**Writing Rules**
Maintain a formal academic tone.
Ensure originality and avoid plagiarism (always paraphrase).
Use human-like, natural sentence structures.
Format all major section headings in bold exactly as shown above.`;

interface AIResponse {
  content: string;
  isError?: boolean;
}

/**
 * Format the AI response to remove ** markers and format headings in bold
 */
function formatAIResponse(response: string): string {
  // Define the sections that should be formatted with bold headings
  const sections = [
    'Brainstorming',
    'Mind Map',
    'Outline Creation',
    'Thesis Statement',
    'Research & Sources',
    'First Draft (600–700 words)',
    'Final Draft'
  ];

  let formattedResponse = response;

  // Remove ** markers around section headings and format them in bold
  sections.forEach(section => {
    // Remove ** markers and wrap in HTML bold tags
    const regex = new RegExp(`\\*\\*${section}\\*\\*`, 'g');
    formattedResponse = formattedResponse.replace(regex, `<b>${section}</b>`);
  });

  // Remove any remaining ** markers
  formattedResponse = formattedResponse.replace(/\*\*/g, '');

  return formattedResponse;
}

/**
 * Get response from Gemini AI API with the SynaptiQ system prompt
 */
export async function getAIResponse(userMessage: string): Promise<AIResponse> {
  try {
    // Check for empty or invalid input
    if (!userMessage || userMessage.trim().length === 0) {
      return {
        content: "I didn't receive a message. Could you please provide more details about your research question?",
        isError: true
      };
    }
    
    console.log('Sending request to Gemini API with message:', userMessage);
    
    // Call the Gemini API with the gemini-2.5-flash-lite model
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key= " Your API KEY ",
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `${SYSTEM_PROMPT}\n\nUser question: ${userMessage}`
                }
              ]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            topK: 40,
            topP: 0.95,
            maxOutputTokens: 8192,
          },
        }),
      }
    );
    
    console.log('API response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('API request failed:', response.status, errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    console.log('API response data:', JSON.stringify(data, null, 2));
    
    // Extract the response text
    const aiResponse = data.candidates?.[0]?.content?.parts?.[0]?.text || 
      "I couldn't generate a response at the moment. Please try again.";
    
    console.log('Extracted AI response:', aiResponse);
    
    // Format the response to remove ** markers and format headings in bold
    const formattedResponse = formatAIResponse(aiResponse);
    
    return { content: formattedResponse };
  } catch (error: unknown) {
    console.error('Error in getAIResponse:', error);
    
    // Return error response to make the issue visible
    let errorMessage = 'Unknown error occurred';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else {
      errorMessage = String(error);
    }
    
    return {
      content: `I encountered an error while processing your request: ${errorMessage}. Please try again later.`,
      isError: true
    };
  }
}
