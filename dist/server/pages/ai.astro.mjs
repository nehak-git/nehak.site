import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_m-MB8ZxY.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_PEA7Rhyt.mjs';
import { jsxs, jsx } from 'react/jsx-runtime';
import { marked } from 'marked';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { useState, useRef, useEffect } from 'react';
import { IoArrowUpSharp } from 'react-icons/io5';
import { AnimatePresence, motion } from 'framer-motion';
import { s as sanitizeHTML } from '../chunks/sanitize_Cp44Ak5B.mjs';
import { BsStars } from 'react-icons/bs';
export { renderers } from '../renderers.mjs';

const messageVariants = {
  initial: { opacity: 0, y: 20, scale: 0.9 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 20 }
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.2 }
  }
};
const greetingVariants = {
  initial: { opacity: 0, y: 50, scale: 0.7 },
  animate: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 200,
      damping: 20,
      delay: 0.2
    }
  },
  exit: {
    opacity: 0,
    y: -20,
    scale: 0.9,
    transition: { duration: 0.3 }
  }
};

function getMessageContent(message) {
  return message.parts.filter((part) => part.type === "text").map((part) => part.text).join("");
}
const chatTransport = new DefaultChatTransport({
  api: "/api/chat"
});
function AIChat() {
  const renderer = new marked.Renderer();
  renderer.code = ({ text, lang }) => {
    const languageClass = lang ? `language-${lang}` : "";
    return `<pre class="p-1.5 overflow-auto"><code class="${languageClass} text-slate-700 whitespace-pre-wrap break-words text-xs">${text}</code></pre>`;
  };
  renderer.link = ({ href, text }) => `<a href="${href}" target="_blank" rel="noopener noreferrer" class="text-indigo-700 underline underline-offset-2 transition duration-150 ease-in-out hover:text-black hover:underline">${text}</a>`;
  marked.setOptions({ renderer });
  const [input, setInput] = useState("");
  const inputRef = useRef(null);
  const { messages, sendMessage, status, error } = useChat({
    transport: chatTransport,
    onError: (err) => {
      console.error("Chat error:", err);
    }
  });
  const chatContainerRef = useRef(null);
  useEffect(() => {
    if (chatContainerRef.current) {
      const scrollToBottom = () => {
        chatContainerRef.current.scrollTo({
          top: chatContainerRef.current.scrollHeight,
          behavior: "smooth"
        });
      };
      setTimeout(scrollToBottom, 100);
    }
  }, [messages]);
  const handleButtonClick = (text) => {
    if (status === "ready") {
      sendMessage({ text });
    }
  };
  const sanitizeMarkdown = (content) => {
    const htmlContent = marked.parse(content);
    return sanitizeHTML(htmlContent);
  };
  const isProcessing = status === "streaming" || status === "submitted";
  const isDisabled = isProcessing || input.trim() === "";
  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (input.trim() && status === "ready") {
      sendMessage({ text: input });
      setInput("");
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "flex h-[600px] flex-col text-sm", children: [
    /* @__PURE__ */ jsxs(
      "div",
      {
        ref: chatContainerRef,
        className: "border-stone-200 flex-1 overflow-y-auto rounded-lg border bg-white/50 backdrop-blur-md p-4",
        children: [
          /* @__PURE__ */ jsx(AnimatePresence, { initial: false, mode: "popLayout", children: messages.map((m) => /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: messageVariants,
              initial: "initial",
              animate: "animate",
              exit: "exit",
              className: `flex ${m.role === "user" ? "justify-end" : "justify-start"} mb-4`,
              children: /* @__PURE__ */ jsx(
                "div",
                {
                  className: `${m.role === "user" ? "rounded-full bg-blue-100 text-blue-700" : "rounded-full bg-emerald-100 text-emerald-700"} max-w-xs rounded-lg px-2.5 py-1.5`,
                  children: /* @__PURE__ */ jsx("div", { dangerouslySetInnerHTML: { __html: sanitizeMarkdown(getMessageContent(m)) } })
                }
              )
            },
            m.id
          )) }),
          /* @__PURE__ */ jsx(AnimatePresence, { children: messages.length === 0 && /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: greetingVariants,
              initial: "initial",
              animate: "animate",
              exit: "exit",
              className: "mb-4 flex justify-start",
              children: /* @__PURE__ */ jsxs("div", { className: "max-w-xs rounded-lg bg-emerald-100 px-2.5 py-1.5 text-emerald-700", children: [
                "Hi! I'm ",
                /* @__PURE__ */ jsx("span", { className: "font-semibold", children: "Neha's AI persona" }),
                ". Ask me anything about her or her work. I'll be happy to assist you."
              ] })
            }
          ) }),
          error && /* @__PURE__ */ jsx(
            motion.div,
            {
              variants: messageVariants,
              initial: "initial",
              animate: "animate",
              className: "mb-4 flex justify-start",
              children: /* @__PURE__ */ jsx("div", { className: "max-w-xs rounded-lg bg-red-100 px-2.5 py-1.5 text-red-700", children: "Sorry, something went wrong. Please try again." })
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "flex w-full justify-between gap-2 pt-4 text-xs overflow-x-auto", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleButtonClick("What are Neha's interests?"),
          className: "whitespace-nowrap rounded-lg bg-rose-100 px-2.5 py-1.5 text-rose-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-rose-200 md:hover:text-rose-900",
          disabled: isProcessing,
          children: "What are Neha's interests?"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleButtonClick("What is Neha's education?"),
          className: "whitespace-nowrap rounded-lg bg-violet-100 px-2.5 py-1.5 text-violet-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-violet-200 md:hover:text-violet-900",
          disabled: isProcessing,
          children: "What is Neha's education?"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          onClick: () => handleButtonClick("What skills does Neha have?"),
          className: "whitespace-nowrap rounded-lg bg-amber-100 px-2.5 py-1.5 text-amber-700 transition duration-300 ease-in-out md:hover:scale-95 md:hover:bg-amber-200 md:hover:text-amber-900",
          disabled: isProcessing,
          children: "What skills does Neha have?"
        }
      )
    ] }),
    /* @__PURE__ */ jsx("form", { onSubmit: handleFormSubmit, className: "flex-none pt-4", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          ref: inputRef,
          type: "text",
          value: input,
          onChange: (e) => setInput(e.target.value),
          disabled: isProcessing,
          className: `border-stone-200 placeholder:text-stone-400 flex-1 rounded-l-full border border-r-0 bg-white/50 px-4 py-2.5 focus:ring-0 focus:outline-none active:focus:outline-none ${isProcessing ? "cursor-not-allowed" : "cursor-auto"}`,
          placeholder: "Ask about Neha or her work!"
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "submit",
          disabled: isDisabled,
          "aria-label": "Send message",
          name: "send message",
          className: "border-stone-200 rounded-r-full border border-l-0 px-1.5 focus:ring-0 focus:outline-none active:focus:outline-none bg-white/50",
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: `rounded-full p-2 ${isDisabled ? "bg-stone-300 transition duration-300 ease-in-out" : "bg-stone-800 transition duration-300 ease-in-out md:hover:scale-95"}`,
              children: /* @__PURE__ */ jsx(
                IoArrowUpSharp,
                {
                  className: `${isDisabled ? "text-stone-500 transition duration-150 ease-linear" : "text-white transition duration-150 ease-linear"}`
                }
              )
            }
          )
        }
      )
    ] }) }),
    /* @__PURE__ */ jsx("p", { className: "text-stone-500 pt-4 text-sm text-center", children: "Everyone makes mistakes, including this AI." })
  ] });
}

const $$Ai = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "nehak://ai" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-6"> <div class="flex items-center justify-between"> <h1 class="text-3xl font-display tracking-tight text-stone-800">
nehak://ai
</h1> <div class="rounded-full bg-emerald-100 px-2.5 py-1.5 text-xs font-medium text-emerald-700 flex items-center gap-1"> ${renderComponent($$result2, "BsStars", BsStars, { "className": "text-emerald-700" })} <span>just for fun!</span> </div> </div> <h2 class="text-stone-600 font-medium tracking-tight">
have a chat with my AI to know more about me!
</h2> <section class="pt-4"> ${renderComponent($$result2, "AIChat", AIChat, { "client:load": true, "client:component-hydration": "load", "client:component-path": "/home/rahaman/nehak.site/src/components/react/ai-chat", "client:component-export": "default" })} </section> </div> ` })}`;
}, "/home/rahaman/nehak.site/src/pages/ai.astro", void 0);

const $$file = "/home/rahaman/nehak.site/src/pages/ai.astro";
const $$url = "/ai";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Ai,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
