import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_m-MB8ZxY.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_PEA7Rhyt.mjs';
import { jsx } from 'react/jsx-runtime';
import { g as getCollection, G as GitHub, P as ProjectList } from '../chunks/_astro_content_kkwskbPI.mjs';
export { renderers } from '../renderers.mjs';

const LinkedIn = (props) => /* @__PURE__ */ jsx("svg", { width: "1em", height: "1em", xmlns: "http://www.w3.org/2000/svg", preserveAspectRatio: "xMidYMid", viewBox: "0 0 256 256", ...props, children: /* @__PURE__ */ jsx("path", { d: "M218.123 218.127h-37.931v-59.403c0-14.165-.253-32.4-19.728-32.4-19.756 0-22.779 15.434-22.779 31.369v60.43h-37.93V95.967h36.413v16.694h.51a39.907 39.907 0 0 1 35.928-19.733c38.445 0 45.533 25.288 45.533 58.186l-.016 67.013ZM56.955 79.27c-12.157.002-22.014-9.852-22.016-22.009-.002-12.157 9.851-22.014 22.008-22.016 12.157-.003 22.014 9.851 22.016 22.008A22.013 22.013 0 0 1 56.955 79.27m18.966 138.858H37.95V95.967h37.97v122.16ZM237.033.018H18.89C8.58-.098.125 8.161-.001 18.471v219.053c.122 10.315 8.576 18.582 18.89 18.474h218.144c10.336.128 18.823-8.139 18.966-18.474V18.454c-.147-10.33-8.635-18.588-18.966-18.453", fill: "currentColor" }) });

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const projects = await getCollection("projects");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Neha Kumari" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-10"> <div class="flex flex-col gap-2 py-20"> <p class="text-stone-600">Hey There 👋, I am</p> <h1 class="text-4xl font-medium text-stone-800 font-display">
Neha Kumari.
</h1> <p class="text-stone-600">
C.S Undergrad in Lovely Professional University. I am learning about Web
        Development with React and Next.js, backend with Node.js and Express.
        Along with that, I also love painting and travelling.
</p> <div class="flex gap-8 mt-8"> <div class="flex items-center gap-2 text-stone-500"> ${renderComponent($$result2, "LinkedIn", LinkedIn, { "className": "text-xl" })} <a href="https://linkedin.com" target="_blank">LinkedIn</a> </div> <div class="flex items-center gap-2 text-stone-500"> ${renderComponent($$result2, "GitHub", GitHub, { "className": "text-xl" })} <a href="https://github.com" target="_blank">GitHub</a> </div> </div> </div> <div class="flex flex-col gap-6"> <div class="flex items-center gap-3 text-stone-800"> <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M8.422 20.618C10.178 21.54 11.056 22 12 22V12L2.638 7.073l-.04.067C2 8.154 2 9.417 2 11.942v.117c0 2.524 0 3.787.597 4.801c.598 1.015 1.674 1.58 3.825 2.709z"></path><path fill="currentColor" d="m17.577 4.432l-2-1.05C13.822 2.461 12.944 2 12 2c-.945 0-1.822.46-3.578 1.382l-2 1.05C4.318 5.536 3.242 6.1 2.638 7.072L12 12l9.362-4.927c-.606-.973-1.68-1.537-3.785-2.641" opacity=".7"></path><path fill="currentColor" d="m21.403 7.14l-.041-.067L12 12v10c.944 0 1.822-.46 3.578-1.382l2-1.05c2.151-1.129 3.227-1.693 3.825-2.708c.597-1.014.597-2.277.597-4.8v-.117c0-2.525 0-3.788-.597-4.802" opacity=".5"></path><path fill="currentColor" d="m6.323 4.484l.1-.052l1.493-.784l9.1 5.005l4.025-2.011q.205.232.362.498c.15.254.262.524.346.825L17.75 9.964V13a.75.75 0 0 1-1.5 0v-2.286l-3.5 1.75v9.44A3 3 0 0 1 12 22c-.248 0-.493-.032-.75-.096v-9.44l-8.998-4.5c.084-.3.196-.57.346-.824q.156-.266.362-.498l9.04 4.52l3.387-1.693z"></path></svg> <h2 class="text-xl font-medium">Some things I've built</h2> </div> <p class="text-stone-600 max-w-lg">
A selection of projects I've worked on, ranging from web applications to experimental prototypes.
</p> ${renderComponent($$result2, "ProjectList", ProjectList, { "client:load": true, "projects": projects, "client:component-hydration": "load", "client:component-path": "/home/rahaman/nehak.site/src/components/react/project-list", "client:component-export": "default" })} </div> </div> ` })}`;
}, "/home/rahaman/nehak.site/src/pages/index.astro", void 0);

const $$file = "/home/rahaman/nehak.site/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
