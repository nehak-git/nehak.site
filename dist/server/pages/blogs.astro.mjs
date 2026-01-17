import { c as createComponent, r as renderComponent, a as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_m-MB8ZxY.mjs';
import 'piccolore';
import { $ as $$Layout } from '../chunks/Layout_PEA7Rhyt.mjs';
export { renderers } from '../renderers.mjs';

const $$Blogs = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Blogs | Neha Kumari" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="flex flex-col gap-10 py-20"> <div> <h1 class="text-4xl font-medium text-stone-800 font-display">
Blogs
</h1> <p class="text-stone-600 mt-2">
Coming soon...
</p> </div> </div> ` })}`;
}, "/home/rahaman/nehak.site/src/pages/blogs.astro", void 0);

const $$file = "/home/rahaman/nehak.site/src/pages/blogs.astro";
const $$url = "/blogs";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Blogs,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
