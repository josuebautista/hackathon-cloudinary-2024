/* empty css                                 */
import { c as createComponent, r as renderTemplate, a as renderComponent, b as createAstro, m as maybeRenderHead } from '../chunks/astro/server_n6-e6VbM.mjs';
import { $ as $$Layout } from '../chunks/Layout_C1GBpSxu.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$404 = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$404;
  const { searchParams } = Astro2.url;
  const reason = searchParams.get("reason");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": `Error Page`, "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="content md:text-5xl text-2xl" data-astro-cid-zetdm5md> <h1 class="font-bold md:py-5 py-1" data-astro-cid-zetdm5md>
Something went wrong
</h1> <br data-astro-cid-zetdm5md> <p data-astro-cid-zetdm5md>${reason} error</p> <br data-astro-cid-zetdm5md> <a class="md:text-xl text-lg hover:opacity-80 transition duration-200" href="/" data-astro-cid-zetdm5md> Return to home page </a> </div> ` })}  `;
}, "D:/Code/Astro/hackaton-cloudinary/src/pages/404.astro", void 0);

const $$file = "D:/Code/Astro/hackaton-cloudinary/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
