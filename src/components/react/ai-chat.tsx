import { marked } from "marked";
import { useChat, type UIMessage } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { IoArrowUpSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import { messageVariants, greetingVariants } from "@/lib/utils/animation-variants";
import { sanitizeHTML } from "@/lib/utils/sanitize";

function getMessageContent(message: Readonly<UIMessage>): string {
	return message.parts
		.filter((part): part is { type: "text"; text: string } => part.type === "text")
		.map((part) => part.text)
		.join("");
}

// Create transport instance outside component to avoid recreation
const chatTransport = new DefaultChatTransport({
	api: "/api/chat",
});

export default function AIChat() {
	const renderer = new marked.Renderer();

	renderer.code = ({ text, lang }) => {
		const languageClass = lang ? `language-${lang}` : "";
		return `<pre class="p-1.5 overflow-auto"><code class="${languageClass} text-slate-700 whitespace-pre-wrap break-words text-xs">${text}</code></pre>`;
	};

	renderer.link = ({ href, text }) =>
		`<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-indigo-700 underline underline-offset-2 transition duration-150 ease-in-out hover:text-black hover:underline">${text}</a>`;

	marked.setOptions({ renderer });

	const [input, setInput] = useState("");
	const inputRef = useRef<HTMLInputElement>(null);

	const { messages, sendMessage, status, error } = useChat({
		transport: chatTransport,
		onError: (err: Error) => {
			console.error("Chat error:", err);
		},
	});

	const chatContainerRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (chatContainerRef.current) {
			const scrollToBottom = () => {
				chatContainerRef.current!.scrollTo({
					top: chatContainerRef.current!.scrollHeight,
					behavior: "smooth",
				});
			};

			setTimeout(scrollToBottom, 100);
		}
	}, [messages]);

	const handleButtonClick = (text: string) => {
		if (status === "ready") {
			sendMessage({ text });
		}
	};

	const sanitizeMarkdown = (content: string): string => {
		const htmlContent = marked.parse(content) as string;
		return sanitizeHTML(htmlContent);
	};

	const isProcessing = status === "streaming" || status === "submitted";
	const isDisabled = isProcessing || input.trim() === "";

	const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		if (input.trim() && status === "ready") {
			sendMessage({ text: input });
			setInput("");
			setTimeout(() => inputRef.current?.focus(), 0);
		}
	};

	return (
		<div className="flex h-[600px] flex-col text-sm">
			<div
				ref={chatContainerRef}
				className="border-stone-200 flex-1 overflow-y-auto rounded-lg border bg-white/50 backdrop-blur-md p-4"
			>
				<AnimatePresence initial={false} mode="popLayout">
					{messages.map((m: Readonly<UIMessage>) => (
						<motion.div
							key={m.id}
							variants={messageVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							className={`flex ${m.role === "user" ? "justify-end" : "justify-start"} mb-4`}
						>
							<div
								className={`${
									m.role === "user"
										? "rounded-full bg-blue-100 text-blue-700"
										: "rounded-full bg-emerald-100 text-emerald-700"
								} max-w-xs rounded-lg px-2.5 py-1.5`}
							>
								<div dangerouslySetInnerHTML={{ __html: sanitizeMarkdown(getMessageContent(m)) }} />
							</div>
						</motion.div>
					))}
				</AnimatePresence>

				<AnimatePresence>
					{messages.length === 0 && (
						<motion.div
							variants={greetingVariants}
							initial="initial"
							animate="animate"
							exit="exit"
							className="mb-4 flex justify-start"
						>
							<div className="max-w-xs rounded-lg bg-emerald-100 px-2.5 py-1.5 text-emerald-700">
								Hi! I&apos;m <span className="font-semibold">Neha&apos;s AI persona</span>. Ask me anything about her or her
								work. I&apos;ll be happy to assist you.
							</div>
						</motion.div>
					)}
				</AnimatePresence>

				{error && (
					<motion.div
						variants={messageVariants}
						initial="initial"
						animate="animate"
						className="mb-4 flex justify-start"
					>
						<div className="max-w-xs rounded-lg bg-red-100 px-2.5 py-1.5 text-red-700">
							Sorry, something went wrong. Please try again.
						</div>
					</motion.div>
				)}
			</div>
			<div className="flex w-full justify-between gap-2 pt-4 text-xs overflow-x-auto">
				<button
					onClick={() => handleButtonClick("What are Neha's interests?")}
					className="whitespace-nowrap rounded-lg bg-rose-100 px-2.5 py-1.5 text-rose-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-rose-200 md:hover:text-rose-900"
					disabled={isProcessing}
				>
					What are Neha&apos;s interests?
				</button>
				<button
					onClick={() => handleButtonClick("What is Neha's education?")}
					className="whitespace-nowrap rounded-lg bg-violet-100 px-2.5 py-1.5 text-violet-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-violet-200 md:hover:text-violet-900"
					disabled={isProcessing}
				>
					What is Neha&apos;s education?
				</button>
				<button
					onClick={() => handleButtonClick("What skills does Neha have?")}
					className="whitespace-nowrap rounded-lg bg-amber-100 px-2.5 py-1.5 text-amber-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-amber-200 md:hover:text-amber-900"
					disabled={isProcessing}
				>
					What skills does Neha have?
				</button>
			</div>
			<form onSubmit={handleFormSubmit} className="flex-none pt-4">
				<div className="flex">
					<input
						ref={inputRef}
						type="text"
						value={input}
						onChange={(e) => setInput(e.target.value)}
						disabled={isProcessing}
						className={`border-stone-200 placeholder:text-stone-400 flex-1 rounded-l-full border border-r-0 bg-white/50 px-4 py-2.5 focus:ring-0 focus:outline-none active:focus:outline-none ${
							isProcessing ? "cursor-not-allowed" : "cursor-auto"
						}`}
						placeholder="Ask about Neha or her work!"
					/>
					<button
						type="submit"
						disabled={isDisabled}
						aria-label="Send message"
						name="send message"
						className="border-stone-200 rounded-r-full border border-l-0 px-1.5 focus:ring-0 focus:outline-none active:focus:outline-none bg-white/50"
					>
						<div
							className={`rounded-full p-2 ${isDisabled ? "bg-stone-300 transition duration-300 ease-in-out" : "bg-stone-800 transition duration-300 ease-in-out md:hover:scale-95"}`}
						>
							<IoArrowUpSharp
								className={`${isDisabled ? "text-stone-500 transition duration-150 ease-linear" : "text-white transition duration-150 ease-linear"}`}
							/>
						</div>
					</button>
				</div>
			</form>
			<p className="text-stone-500 pt-4 text-sm text-center">
				Everyone makes mistakes, including this AI.
			</p>
		</div>
	);
}
