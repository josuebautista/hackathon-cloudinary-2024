import { renderers } from './renderers.mjs';
import { c as createExports } from './chunks/entrypoint_C3negRV7.mjs';
import { manifest } from './manifest_DCDtAHEx.mjs';

const serverIslandMap = new Map([
	['OriginalImageSection', () => import('./chunks/OriginalImageSection_CIMdLJqU.mjs')],
	['ImageContainer', () => import('./chunks/ImageContainer_DipIXeyW.mjs')],
]);;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/api/sign-cloudinary.astro.mjs');
const _page4 = () => import('./pages/examples.astro.mjs');
const _page5 = () => import('./pages/photo.astro.mjs');
const _page6 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@4.15.12_@types+node@22.7.7_rollup@4.24.0_typescript@5.6.2/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/api/sign-cloudinary.ts", _page3],
    ["src/pages/examples.astro", _page4],
    ["src/pages/photo.astro", _page5],
    ["src/pages/index.astro", _page6]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "96746b9a-6264-4918-9b87-f882c73e8625",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };
