/* empty css                                 */
import { c as createComponent, r as renderTemplate, a as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_n6-e6VbM.mjs';
import { $ as $$Layout } from '../chunks/Layout_C1GBpSxu.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "About" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="mx-auto max-w-[1200px]"> <h1 class="text-center text-3xl">About</h1> <article class="max-w-[1000px] mx-auto my-10"> <h2 class="text-xl">How it works?</h2> <p class="text-lg">
The background scenery are generated using the
<span> <a href="https://cloudinary.com/documentation/transformation_reference" target="_blank">Cloudinary API</a> </span>,
        with the help of the property 'replace background'
</p> <br> <p class="text-lg">
Each story has a maximum of 3 images, depending on the length of the story, all the stories are staticly generated and stories ready to edit with the name, if the user don't provide a name, a random name will be generated.
</p> </article> </section> ` })}`;
}, "D:/Code/Astro/hackaton-cloudinary/src/pages/about.astro", void 0);

const $$file = "D:/Code/Astro/hackaton-cloudinary/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
