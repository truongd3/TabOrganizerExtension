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
            text: `Given the following array of objects where keys are tab titles and values are tab URLs: ${JSON.stringify(tabs)}, identify the titles and URLs that match or relevant to the query: "${prompt}". Return the title and URL of each matching object, separated by a comma, and each title and URL seperated by a character <>, without any additional explanation. If no matches are found, return a string being empty`,
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

    const data = await response.json();
    const cleanedArray = data.candidates[0].content.parts[0].text
      .split(",")
      .map((tab) => {
        const [key, value] = tab.split("<>").map(info => info.trim())
        return {key, value};
      });
    return cleanedArray;
  } catch (error) {
    console.error("Failed to fetch response:", error);
  }
};

export default postGeminiPrompt;
