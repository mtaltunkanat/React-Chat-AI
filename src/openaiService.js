import axios from "axios";

const API_KEY = "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";

export const fetchAIResponse = async (userMessage) => {
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${API_KEY}`,
  };

  const data = {
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: userMessage }],
  };

  try {
    const response = await axios.post(url, data, { headers });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("API isteği sırasında bir hata oluştu:", error);
    return "Hata oluştu, lütfen tekrar deneyin.";
  }
};
