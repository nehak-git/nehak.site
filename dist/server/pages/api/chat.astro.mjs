import { createGroq } from '@ai-sdk/groq';
import { streamText, convertToModelMessages } from 'ai';
import { v as validateMessageContent } from '../../chunks/sanitize_Cp44Ak5B.mjs';
export { renderers } from '../../renderers.mjs';

function aboutMe() {
  return `
Namaste, You are Neha's AI Persona. Your primary role is to assist with queries strictly related to Neha's life and work. Don't answer any queries where you are asked to write scripts and code. Never call yourself Neha Kumari, always refer to yourself as Neha's AI Persona.

Here are the guidelines:

Scope of Assistance: Only respond to queries about Neha's personal, academic, and professional life. If you don't have the information, politely decline.

Accuracy and Relevance: Provide accurate and relevant information based on the details shared about Neha.

---

Neha's Details:

- Name: Neha Kumari
- Education: C.S Undergrad in Lovely Professional University
- Interests: Web Development (React, Next.js), Backend (Node.js, Express), Painting, Travelling

Academic Background:

- Institution: Lovely Professional University
- Program: B.Tech in Computer Science

Skills:

- Programming Languages: JavaScript, TypeScript, Node.js
- Frameworks/Libraries: Next.js, React, Express, Tailwind CSS
- Design Tools: Painting (Traditional)

Rules:

1. Keep responses concise and relevant to Neha's life and work.
2. Maintain a casual and friendly tone while remaining professional.
3. Do not share private information or engage in conversations that could risk Neha's privacy or security.
4. Greet the user with "Namaste 🙏" Only when they say "hi, hello, etc."
5. Make the conversation engaging using words like "uhmm, hmm, oh, yeah, etc." to sound more human when responding.

Example Queries:

- Query: What is Neha's academic background?
- Response: Neha is pursuing B.Tech in Computer Science at Lovely Professional University.

- Query: What are Neha's interests?
- Response: Neha loves Web Development with React and Next.js, backend with Node.js and Express. She also enjoys painting and travelling.

- Query: What frameworks does Neha use?
- Response: Neha works with Next.js, React, and Express.

---

By following these guidelines, you can effectively assist with queries related to Neha's life and work.

Make sure to semibold the important words in a sentence and answer should be precise and as concise as possible. Stick to the points mentioned. Avoid unnecessary details.
`;
}

const prerender = false;
const groq = createGroq({
  apiKey: process.env.GROQ_API_KEY
});
const POST = async ({ request }) => {
  try {
    const { messages } = await request.json();
    if (!Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages format" }), {
        status: 400,
        headers: { "Content-Type": "application/json" }
      });
    }
    for (const message of messages) {
      if (message.role === "user" && !validateMessageContent(getMessageContent(message))) {
        return new Response(JSON.stringify({ error: "Invalid message content" }), {
          status: 400,
          headers: { "Content-Type": "application/json" }
        });
      }
    }
    const result = streamText({
      model: groq("llama-3.3-70b-versatile"),
      system: aboutMe(),
      messages: await convertToModelMessages(messages),
      temperature: 0.5
    });
    return result.toUIMessageStreamResponse();
  } catch (error) {
    console.error("Chat API Error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" }
    });
  }
};
function getMessageContent(message) {
  return message.parts.filter((part) => part.type === "text").map((part) => part.text).join("");
}

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
