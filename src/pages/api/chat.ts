import type { APIRoute } from "astro";
import { createGroq } from "@ai-sdk/groq";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import aboutMe from "@/lib/utils/about-me";
import { validateMessageContent } from "@/lib/utils/sanitize";

export const prerender = false;

const groq = createGroq({
	apiKey: import.meta.env.GROQ_API_KEY,
});

export const POST: APIRoute = async ({ request }: { request: Request }) => {
	try {
		const { messages }: { messages: UIMessage[] } = await request.json();

		if (!Array.isArray(messages)) {
			return new Response(JSON.stringify({ error: "Invalid messages format" }), {
				status: 400,
				headers: { "Content-Type": "application/json" },
			});
		}

		for (const message of messages) {
			if (message.role === "user" && !validateMessageContent(getMessageContent(message))) {
				return new Response(JSON.stringify({ error: "Invalid message content" }), {
					status: 400,
					headers: { "Content-Type": "application/json" },
				});
			}
		}

		const result = streamText({
			model: groq("llama-3.3-70b-versatile"),
			system: aboutMe(),
			messages: await convertToModelMessages(messages),
			temperature: 0.5,
		});

		return result.toUIMessageStreamResponse();
	} catch (error) {
		console.error("Chat API Error:", error);
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" },
		});
	}
};

function getMessageContent(message: Readonly<UIMessage>): string {
	return message.parts
		.filter((part): part is { type: "text"; text: string } => part.type === "text")
		.map((part) => part.text)
		.join("");
}
