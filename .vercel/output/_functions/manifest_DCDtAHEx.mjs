import { g as decodeKey } from './chunks/astro/server_n6-e6VbM.mjs';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CM9CUc1v.mjs';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///D:/Code/Astro/hackaton-cloudinary/","adapterName":"@astrojs/vercel/serverless","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/.pnpm/astro@4.15.12_@types+node@22.7.7_rollup@4.24.0_typescript@5.6.2/node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.C3Uj9Co0.js"}],"styles":[{"type":"external","src":"/_astro/about.D0CUbGeJ.css"},{"type":"inline","content":".content[data-astro-cid-zetdm5md]{text-align:center;line-height:1rem;height:75vh;display:flex;place-content:center;flex-direction:column}a[data-astro-cid-zetdm5md]{opacity:.6}\n"}],"routeData":{"route":"/404","isIndex":false,"type":"page","pattern":"^\\/404\\/?$","segments":[[{"content":"404","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/404.astro","pathname":"/404","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.D0CUbGeJ.css"}],"routeData":{"route":"/about","isIndex":false,"type":"page","pattern":"^\\/about\\/?$","segments":[[{"content":"about","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/about.astro","pathname":"/about","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/sign-cloudinary","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/sign-cloudinary\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"sign-cloudinary","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/sign-cloudinary.ts","pathname":"/api/sign-cloudinary","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"external","src":"/_astro/about.D0CUbGeJ.css"}],"routeData":{"route":"/examples","isIndex":false,"type":"page","pattern":"^\\/examples\\/?$","segments":[[{"content":"examples","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/examples.astro","pathname":"/examples","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.CkbQVonS.js"}],"styles":[{"type":"external","src":"/_astro/about.D0CUbGeJ.css"},{"type":"inline","content":".bg-fallback[data-astro-cid-wyxho7sb]{background:light-dark(#cccccc,#414141)}\n"}],"routeData":{"route":"/photo","isIndex":false,"type":"page","pattern":"^\\/photo\\/?$","segments":[[{"content":"photo","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/photo.astro","pathname":"/photo","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[{"type":"external","value":"/_astro/hoisted.1P81lz3V.js"}],"styles":[{"type":"external","src":"/_astro/about.D0CUbGeJ.css"},{"type":"inline","content":"section[data-astro-cid-j7pv25f6]{min-height:70vh;text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["D:/Code/Astro/hackaton-cloudinary/src/pages/404.astro",{"propagation":"none","containsHead":true}],["D:/Code/Astro/hackaton-cloudinary/src/pages/about.astro",{"propagation":"none","containsHead":true}],["D:/Code/Astro/hackaton-cloudinary/src/pages/examples.astro",{"propagation":"none","containsHead":true}],["D:/Code/Astro/hackaton-cloudinary/src/pages/index.astro",{"propagation":"none","containsHead":true}],["D:/Code/Astro/hackaton-cloudinary/src/pages/photo.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(o,t)=>{let i=async()=>{await(await o())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var s=(i,t)=>{let a=async()=>{await(await i())()};if(t.value){let e=matchMedia(t.value);e.matches?a():e.addEventListener(\"change\",a,{once:!0})}};(self.Astro||(self.Astro={})).media=s;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var l=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let a of e)if(a.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=l;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000noop-middleware":"_noop-middleware.mjs","\u0000@astro-page:src/pages/404@_@astro":"pages/404.astro.mjs","\u0000@astro-page:src/pages/about@_@astro":"pages/about.astro.mjs","\u0000@astro-page:src/pages/api/sign-cloudinary@_@ts":"pages/api/sign-cloudinary.astro.mjs","\u0000@astro-page:src/pages/examples@_@astro":"pages/examples.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-page:node_modules/.pnpm/astro@4.15.12_@types+node@22.7.7_rollup@4.24.0_typescript@5.6.2/node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:src/pages/photo@_@astro":"pages/photo.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","D:/Code/Astro/hackaton-cloudinary/node_modules/.pnpm/astro@4.15.12_@types+node@22.7.7_rollup@4.24.0_typescript@5.6.2/node_modules/astro/dist/env/setup.js":"chunks/astro/env-setup_Cr6XTFvb.mjs","D:/Code/Astro/hackaton-cloudinary/node_modules/.pnpm/@unpic+placeholder@0.1.2/node_modules/@unpic/placeholder/dist/index.mjs":"chunks/index_BVcfRxua.mjs","D:/Code/Astro/hackaton-cloudinary/node_modules/.pnpm/blurhash@2.0.5/node_modules/blurhash/dist/index.mjs":"chunks/index_CkGk45UB.mjs","D:/Code/Astro/hackaton-cloudinary/node_modules/.pnpm/node-fetch-native@1.6.4/node_modules/node-fetch-native/dist/chunks/multipart-parser.mjs":"chunks/multipart-parser_BrdtzNhF.mjs","D:/Code/Astro/hackaton-cloudinary/node_modules/.pnpm/@astrojs+react@3.6.2_@types+react-dom@18.3.1_@types+react@18.3.11_react-dom@18.3.1_react@18.3_nro6z2gxfdo2azq7gjfk347hbm/node_modules/@astrojs/react/vnode-children.js":"chunks/vnode-children_C1YIWAGb.mjs","D:/Code/Astro/hackaton-cloudinary/src/components/ImageContainer.astro":"chunks/ImageContainer_DipIXeyW.mjs","\u0000@astrojs-manifest":"manifest_DCDtAHEx.mjs","D:/Code/Astro/hackaton-cloudinary/src/components/OriginalImageSection.astro":"chunks/OriginalImageSection_CIMdLJqU.mjs","D:/Code/Astro/hackaton-cloudinary/src/components/react/Description":"_astro/Description.DcZ-rEvX.js","@astrojs/react/client.js":"_astro/client.BY2mA-CD.js","/astro/hoisted.js?q=0":"_astro/hoisted.C3Uj9Co0.js","/astro/hoisted.js?q=1":"_astro/hoisted.CkbQVonS.js","/astro/hoisted.js?q=2":"_astro/hoisted.1P81lz3V.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/merriweather-sans-vietnamese-wght-normal.CaXG5Gwy.woff2","/_astro/merriweather-sans-latin-wght-normal.CAo5hNA4.woff2","/_astro/merriweather-sans-latin-ext-wght-normal.rbgaStwC.woff2","/_astro/merriweather-sans-vietnamese-wght-italic.CYldu3by.woff2","/_astro/merriweather-sans-latin-ext-wght-italic.Dzb6KCrX.woff2","/_astro/luckiest-guy-latin-400-normal.dJClyBWO.woff2","/_astro/merriweather-sans-latin-wght-italic.BFVIdP8b.woff2","/_astro/creepster-latin-400-normal.DnKpM-ys.woff2","/_astro/luckiest-guy-latin-400-normal.f5b8-b44.woff","/_astro/creepster-latin-400-normal.DFidaany.woff","/_astro/about.D0CUbGeJ.css","/bg-halloween.png","/cloudinary-logo.svg","/favicon.svg","/vas_a_caer.jpg","/examples/the-cursed-pumpkin-patch-min.jpeg","/examples/the-haunted-mansion's-dark-secret-min.jpeg","/examples/the-whispering-forest-min.jpeg","/examples/the-witch’s-lantern-min.jpeg","/_astro/client.BY2mA-CD.js","/_astro/Description.DcZ-rEvX.js","/_astro/hoisted.1P81lz3V.js","/_astro/hoisted.C3Uj9Co0.js","/_astro/hoisted.CkbQVonS.js","/_astro/index.B52nOzfP.js","/_astro/router.Cas-jtPn.js"],"buildFormat":"directory","checkOrigin":false,"serverIslandNameMap":[["@components/OriginalImageSection.astro","OriginalImageSection"],["D:/Code/Astro/hackaton-cloudinary/src/components/ImageContainer.astro","ImageContainer"]],"key":"GXic/NsUDQhjzh3tfGtkkUsDvebPJebZJJD5q+SYE5o=","experimentalEnvGetSecretEnabled":false});

export { manifest };
