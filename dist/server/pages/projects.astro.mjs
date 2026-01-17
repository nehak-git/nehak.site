import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_m-MB8ZxY.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_PEA7Rhyt.mjs';
import { g as getCollection, P as ProjectList } from '../chunks/_astro_content_kkwskbPI.mjs';
export { renderers } from '../renderers.mjs';

const $$Projects = createComponent(async ($$result, $$props, $$slots) => {
  const projects = await getCollection("projects");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Projects | Neha Kumari" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-10 py-20"> <div> <h1 class="text-4xl font-medium text-stone-800 font-display">
Projects
</h1> <p class="text-stone-600 mt-2">
Here are some of the projects I've worked on.
</p> </div> ${renderComponent($$result2, "ProjectList", ProjectList, { "client:load": true, "projects": projects, "client:component-hydration": "load", "client:component-path": "/home/rahaman/nehak.site/src/components/react/project-list", "client:component-export": "default" })} </div> ` })}`;
}, "/home/rahaman/nehak.site/src/pages/projects.astro", void 0);

const $$file = "/home/rahaman/nehak.site/src/pages/projects.astro";
const $$url = "/projects";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Projects,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
