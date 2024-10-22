import { c as createComponent, r as renderTemplate, m as maybeRenderHead, a as renderComponent, b as createAstro } from './astro/server_n6-e6VbM.mjs';
import $$ImageContainer from './ImageContainer_DipIXeyW.mjs';
import { a as astroPkg, c as constructCloudinaryUrl } from './chunk-RPEDWVUU_DMH4Lh06.mjs';

// src/constants/analytics.ts

// package.json
var package_default = {
  name: "astro-cloudinary",
  version: "1.1.0",
  type: "module",
  license: "MIT",
  module: "./index.ts",
  keywords: [
    "cloudinary",
    "astro",
    "astro-loader"
  ],
  exports: {
    ".": {
      import: "./index.ts"
    },
    "./helpers": {
      types: "./dist/helpers/index.d.ts",
      import: "./dist/helpers/index.js"
    },
    "./loaders": {
      types: "./dist/loaders/index.d.ts",
      import: "./dist/loaders/index.js"
    },
    "./package.json": "./package.json"
  },
  files: [
    "dist",
    "helpers",
    "loaders",
    "src",
    "index.ts"
  ],
  scripts: {
    dev: "tsup --watch",
    build: "tsup",
    prepublishOnly: "cp ../README.md . && cp ../LICENSE . && pnpm build",
    postpublish: "rm ./README.md && rm ./LICENSE"
  },
  dependencies: {
    "@cloudinary-util/types": "1.5.7",
    "@cloudinary-util/url-loader": "5.10.2",
    "@cloudinary-util/util": "^3.3.2",
    "@cloudinary/url-gen": "^1.20.0",
    "@unpic/astro": "^0.0.46",
    "@unpic/core": "^0.0.49",
    tsup: "^8.2.4",
    unpic: "^3.18.0"
  },
  peerDependencies: {
    astro: "^3.2.0 || ^4.0.0"
  },
  devDependencies: {
    astro: "^4.15.6"
  }
};

// src/constants/analytics.ts
var ASTRO_CLOUDINARY_ANALYTICS_PRODUCT_ID = "B";
var ASTRO_CLOUDINARY_ANALYTICS_ID = "G";
var ASTRO_VERSION = normalizeVersion(astroPkg.version);
var ASTRO_CLOUDINARY_VERSION = normalizeVersion(package_default.version);
function normalizeVersion(version) {
  let normalized = version;
  if (normalized.includes("-")) {
    normalized = normalized.split("-")[0];
  }
  return normalized;
}

function getCloudinaryConfig(config) {
  const cloudName = "alhedev-gallery";
  const apiKey = "372241328758597";
  const secureDistribution = undefined                                                     ;
  const privateCdn = undefined                                             ;
  return Object.assign({
    cloud: {
      ...config?.cloud,
      apiKey,
      cloudName
    },
    url: {
      ...config?.url,
      secureDistribution,
      privateCdn
    }
  }, config);
}
function getCloudinaryAnalytics(analytics) {
  return Object.assign({
    product: ASTRO_CLOUDINARY_ANALYTICS_PRODUCT_ID,
    sdkCode: ASTRO_CLOUDINARY_ANALYTICS_ID,
    sdkSemver: ASTRO_CLOUDINARY_VERSION,
    techVersion: ASTRO_VERSION,
    feature: ""
  }, analytics);
}
function getCldImageUrl(options, config, analytics) {
  return constructCloudinaryUrl({
    options,
    config: getCloudinaryConfig(config),
    analytics: getCloudinaryAnalytics(analytics)
  });
}

const $$Astro = createAstro();
const $$OriginalImageSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$OriginalImageSection;
  const { id } = Astro2.props;
  const url = getCldImageUrl({
    src: id,
    format: "auto",
    flags: "attachment"
  });
  return renderTemplate`${maybeRenderHead()}<section class="mx-auto max-w-[1200px]"> <br> <h2 class="md:text-2xl text-lg mb-3 text-center">Optimized Original Image</h2> ${renderComponent($$result, "ImageContainer", $$ImageContainer, { "server:defer": true, "url": url, "server:component-directive": "defer", "server:component-path": "D:/Code/Astro/hackaton-cloudinary/src/components/ImageContainer.astro", "server:component-export": "default" }, { "fallback": ($$result2) => renderTemplate`<div class="bg-fallback mx-auto w-[500px] h-[500px] rounded-2xl flex flex-col justify-center items-center"> ${renderComponent($$result2, "l-quantum", "l-quantum", { "size": "55", "speed": "2.0", "color": "orange" })} <span>Loading Image</span> </div>` })} <br> </section>`;
}, "D:/Code/Astro/hackaton-cloudinary/src/components/OriginalImageSection.astro", void 0);

const $$file = "D:/Code/Astro/hackaton-cloudinary/src/components/OriginalImageSection.astro";
const $$url = undefined;

export { $$OriginalImageSection as $, $$file as a, $$url as b, getCldImageUrl as g };
