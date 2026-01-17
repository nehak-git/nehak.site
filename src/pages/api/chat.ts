import type { APIRoute } from "astro";
import { createGroq } from "@ai-sdk/groq";
import { streamText, convertToModelMessages, type UIMessage } from "ai";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import aboutMe from "@/lib/utils/about-me";
import { validateMessageContent } from "@/lib/utils/sanitize";

export const prerender = false;

const groq = createGroq({
	apiKey: import.meta.env.GROQ_API_KEY,
});

const redis = new Redis({
	url: import.meta.env.UPSTASH_REDIS_REST_URL,
	token: import.meta.env.UPSTASH_REDIS_REST_TOKEN,
});

const ratelimit = new Ratelimit({
	redis,
	limiter: Ratelimit.slidingWindow(10, "60 s"),
	prefix: "chat-api",
});

export const POST: APIRoute = async ({ request }: { request: Request }) => {
	try {
		// Get identifier for rate limiting (use IP address or fallback)
		const identifier =
			request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
			request.headers.get("x-real-ip") ||
			"anonymous";

		const { success } = await ratelimit.limit(identifier);
		if (!success) {
			return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
				status: 429,
				headers: { "Content-Type": "application/json" },
			});
		}

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
