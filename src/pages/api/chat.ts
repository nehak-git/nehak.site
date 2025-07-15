import type { APIRoute } from "astro";
import { convertToCoreMessages, generateText, streamText } from "ai";
import { createMistral } from "@ai-sdk/mistral";
import aboutMe from "@/constants/NEHA";

export const prerender = false;
const mistral = createMistral({
  apiKey: import.meta.env.MISTRAL_API_KEY,
});

export const POST: APIRoute = async ({ request }) => {
  const { messages } = await request.json();

  const result = streamText({
    model: mistral("mistral-large-latest"),
    system: aboutMe(),
    temperature: 0.5,
    messages: convertToCoreMessages(messages),
  });

  return result.toDataStreamResponse();
};
