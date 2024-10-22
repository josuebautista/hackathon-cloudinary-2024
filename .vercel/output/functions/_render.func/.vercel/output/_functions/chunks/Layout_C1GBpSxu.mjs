import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent, d as addAttribute, e as renderHead, f as renderSlot, b as createAstro } from './astro/server_n6-e6VbM.mjs';
/* empty css                         */
import { GoHomeFill } from 'react-icons/go';
import { FaLightbulb } from 'react-icons/fa';
import { TbHelpSquareRoundedFilled } from 'react-icons/tb';
import { IoLogoGithub } from 'react-icons/io';

const $$Header = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex flex-col md:flex-row justify-between items-center w-full p-5 gap-5" data-astro-cid-3ef6ksr2> <div class="flex-1 md:block hidden" data-astro-cid-3ef6ksr2></div> <div class="width-full md:p-0 p-3 md:m-auto m-0" data-astro-cid-3ef6ksr2> <h1 class="md:text-6xl text-3xl" data-astro-cid-3ef6ksr2>
Halloween Story
<span class="span-title" data-astro-cid-3ef6ksr2>Generator</span> </h1> </div> <div class="flex-1 md:inline-flex hidden gap-2 justify-center" data-astro-cid-3ef6ksr2> <a href="/" class="flex flex-row items-center justify-center gap-1 hover:opacity-80 active:text-orange-500 transition duration-200" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "GoHomeFill", GoHomeFill, { "size": 25, "data-astro-cid-3ef6ksr2": true })} <span data-astro-cid-3ef6ksr2>Home</span> </a> <a href="/examples" class="flex flex-row items-center justify-center gap-1 hover:opacity-80 active:text-orange-500 transition duration-200" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "FaLightbulb", FaLightbulb, { "size": 25, "data-astro-cid-3ef6ksr2": true })} <span data-astro-cid-3ef6ksr2>Examples</span> </a> <a href="/about" class="flex flex-row items-center justify-center gap-1 hover:opacity-80 active:text-orange-500 transition duration-200" data-astro-cid-3ef6ksr2> ${renderComponent($$result, "TbHelpSquareRoundedFilled", TbHelpSquareRoundedFilled, { "size": 25, "data-astro-cid-3ef6ksr2": true })} <span data-astro-cid-3ef6ksr2>About</span> </a> </div> </div> `;
}, "D:/Code/Astro/hackaton-cloudinary/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div class="flex md:flex-row flex-col md:justify-between justify-center items-center my-5  w-full gap-10" data-astro-cid-sz7xmlte> <div class="flex-1 md:block hidden" data-astro-cid-sz7xmlte></div> <div class="flex items-center justify-center gap-2 hover:opacity-80 transition duration-200" data-astro-cid-sz7xmlte> <p class="md:text-2xl text-xl ml-5" data-astro-cid-sz7xmlte>Powered by</p> <a href="https://cloudinary.com/" target="_blank" rel="noopener noreferrer" data-astro-cid-sz7xmlte> <img src="/cloudinary-logo.svg" alt="Cloudinary logo" data-astro-cid-sz7xmlte> </a> </div> <div class="flex-1 hover:opacity-80 active:text-orange-500 transition duration-200" data-astro-cid-sz7xmlte> <a href="https://github.com/josuebautista/hackathon-cloudinary-2024" target="_blank" rel="noopener noreferrer" class="flex flex-row items-center justify-center gap-2" data-astro-cid-sz7xmlte> ${renderComponent($$result, "IoLogoGithub", IoLogoGithub, { "size": 30, "data-astro-cid-sz7xmlte": true })} <span data-astro-cid-sz7xmlte>Source Code</span> </a> </div> </div> `;
}, "D:/Code/Astro/hackaton-cloudinary/src/components/Footer.astro", void 0);

const $$Astro = createAstro();
const $$Layout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Layout;
  const { title } = Astro2.props;
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="description" content="Astro description"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${title}</title>${renderHead()}</head> <body class="bg-solid"> <div class="bg-halloween"></div> <div class="bg-solid"> <nav class="container"> ${renderComponent($$result, "Header", $$Header, {})} </nav> </div> <hr> <main class="container"> ${renderSlot($$result, $$slots["default"])} </main> <hr> <div class="bg-solid"> <footer class="container"> ${renderComponent($$result, "Footer", $$Footer, {})} </footer> </div> </body></html>`;
}, "D:/Code/Astro/hackaton-cloudinary/src/layouts/Layout.astro", void 0);

export { $$Layout as $ };
