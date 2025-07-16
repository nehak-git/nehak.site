import { marked } from "marked";
import { useChat } from "@ai-sdk/react";
import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { messageVariants, greetingVariants } from "@/utils/animationVariants";
import { Input } from "./ui/input";
import { cn } from "@/utils/cn";
import { Button } from "./ui/button";

export default function LakshAI() {
  const renderer = new marked.Renderer();

  renderer.code = ({ text, lang }) => {
    const languageClass = lang ? `language-${lang}` : "";
    return `<pre class="p-1.5 overflow-auto"><code class="${languageClass} text-slate-700 whitespace-pre-wrap break-words text-xs">${text}</code></pre>`;
  };

  renderer.link = ({ href, text }) =>
    `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-purple-700 underline underline-offset-2 transition duration-150 ease-in-out hover:text-black hover:underline">${text}</a>`;

  marked.setOptions({ renderer });

  const { messages, input, handleInputChange, handleSubmit, setInput, status } =
    useChat();

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

  const handleButtonClick: (text: string) => void = (text: string) => {
    setInput(text);
  };

  const isProcessing = status === "streaming" || status === "submitted";
  const isDisabled = isProcessing || input.trim() === "";

  return (
    <div
      className="flex  flex-col text-sm  h-[calc(100vh-100px)]
"
    >
      <div
        ref={chatContainerRef}
        className="border-body/20 flex1 overflow-y-auto rounded-lg h-full flex-1  "
      >
        <AnimatePresence initial={false} mode="popLayout">
          {messages.map((m) => (
            <motion.div
              key={m.id}
              variants={messageVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              } mb-4`}
            >
              <div
                className={`${
                  m.role === "user"
                    ? "rounded-full bg-rose-200 text-rose-900 "
                    : "rounded-full bg-purple-200 text-purple-900 "
                } max-w-xs rounded-lg px-2.5 py-1.5`}
              >
                <div dangerouslySetInnerHTML={{ __html: marked(m.content) }} />
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
              <div className="max-w-xs rounded-lg bg-main px-2.5 py-1.5 ">
                Hi! I'm <span className="font-semibold">Neha's AI persona</span>
                . Ask me anything about him or her work. I'll be happy to assist
                you.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <div className="flex w-full justify-between gap-2 pt-4 text-xs">
        <button
          onClick={() => handleButtonClick("Tell me more about Neha")}
          className="rounded-lg bg-rose-100 px-2.5 py-1.5 text-rose-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-rose-200 md:hover:text-rose-900"
          disabled={isProcessing}
        >
          Tell me more about Neha
        </button>
        <button
          onClick={() => handleButtonClick("Projects Neha has worked on")}
          className="rounded-lg bg-violet-100 px-2.5 py-1.5 text-violet-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-violet-200 md:hover:text-violet-900"
          disabled={isProcessing}
        >
          Projects Neha has worked on
        </button>
        <button
          onClick={() =>
            handleButtonClick(
              "What are the technologies Neha uses?"
            )
          }
          className="rounded-lg bg-amber-100 px-2.5 py-1.5 text-amber-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-amber-200 md:hover:text-amber-900"
          disabled={isProcessing}
        >
          What are the technologies Neha uses?
        </button>
        <button
          onClick={() => handleButtonClick("Fun facts about her?")}
          className="rounded-lg bg-amber-100 px-2.5 py-1.5 text-amber-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-amber-200 md:hover:text-amber-900"
          disabled={isProcessing}
        >
          Fun facts about her?
        </button>
      </div>
      <form onSubmit={handleSubmit} className="flex-none pt-4">
        <div className="flex gap-2">
          <Input
            type="text"
            value={input}
            onChange={handleInputChange}
            disabled={isProcessing}
            className={cn("w-full", isProcessing && "cursor-not-allowed")}
            placeholder="Ask about me or my work!"
          />
          <Button
            variant="shine"
            type="submit"
            disabled={isDisabled}
            aria-label="Send message"
            name="send message"
            className="min-w-fit"
          >
            Send
          </Button>
        </div>
      </form>
      <p className="text-body/80 pt-4 text-sm">
        Everyone makes mistakes, including this AI powered by{" "}
        <a
          href="https://ai.google.dev/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-body md:hover:text-primary underline-offset-4 transition duration-150 ease-in-out md:hover:underline"
        >
          Google's Gemini 2.0 Flash
        </a>{" "}
        and{" "}
        <a
          href="https://sdk.vercel.ai/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-body md:hover:text-primary underline-offset-4 transition duration-150 ease-in-out md:hover:underline"
        >
          Vercel AI SDK
        </a>
        . Make sure to double-check important information.
      </p>
    </div>
  );
}
