import { API_KEY, MODEL } from '../env_config.js';

// Define the API endpoint for the Gemini model, using an environment variable for the API key.
const Gemini_Endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

const postGeminiPrompt = async (prompt, tabs) => {
  // Construct the request body
  const postData = {
    contents: [
      {
        parts: [
          {
            text: `Given a list of tab title ${tabs}. Pick titles and return their exact title without explaination that are relate to the prompt "${prompt}". If there is no match return "There is no match"`,
          },
        ],
      },
    ],
  };

  try {
    // Make a Post request
    const response = await fetch(Gemini_Endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const data = await response.json();
    const cleanedArray = data.candidates[0].content.parts[0].text
      .split("\n")
      .map((tab) => tab.trim().replace(/^- /, ""));
    return cleanedArray;
  } catch (error) {
    console.error("Failed to fetch response:", error);
  }
};

export default postGeminiPrompt;
