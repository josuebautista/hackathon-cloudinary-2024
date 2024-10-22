/* empty css                                 */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_n6-e6VbM.mjs';
import { $ as $$Layout } from '../chunks/Layout_C1GBpSxu.mjs';
export { renderers } from '../renderers.mjs';

const $$Examples = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Examples" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto max-w-[1200px]"> <h1 class="text-center text-3xl">Examples</h1> <article class="max-w-[1000px] mx-auto my-10"> <h2 class="text-xl">Upload the image</h2> <p class="text-lg">
The image will be edited to generate a background scenery according to
        the story, here are some examples:
</p> <div class="mt-5 max-w-[800px] h-auto md:columns-2 columns-1 mx-auto object-cover gap-5"> <img class="w-full h-auto border-2 border-orange-500 rounded-3xl mb-5" src="/examples/the-haunted-mansion's-dark-secret-min.jpeg" alt="the-haunted-mansion's-dark-secret-min"> <img class="w-full h-auto border-2 border-orange-500 rounded-3xl mb-5" src="/examples/the-cursed-pumpkin-patch-min.jpeg" alt="the-cursed-pumpkin-patch-min"> <img class="w-full h-auto border-2 border-orange-500 rounded-3xl mb-5" src="/examples/the-witch’s-lantern-min.jpeg" alt="the-witch’s-lantern-min"> <img class="w-full h-auto border-2 border-orange-500 rounded-3xl mb-5" src="/examples/the-whispering-forest-min.jpeg" alt="the-whispering-forest-min"> </div> </article> </section> ` })}`;
}, "D:/Code/Astro/hackaton-cloudinary/src/pages/examples.astro", void 0);

const $$file = "D:/Code/Astro/hackaton-cloudinary/src/pages/examples.astro";
const $$url = "/examples";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Examples,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
