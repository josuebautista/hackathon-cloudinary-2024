/* empty css                         */
import { i as commonjsGlobal, c as createComponent, r as renderTemplate, m as maybeRenderHead, s as spreadAttributes, b as createAstro, a as renderComponent, d as addAttribute, f as renderSlot } from './astro/server_n6-e6VbM.mjs';
import { $ as $$Layout } from './Layout_C1GBpSxu.mjs';
import { Buffer as Buffer$1 } from 'node:buffer';
import vt from 'node:http';
import Bs from 'node:https';
import st from 'node:zlib';
import me, { PassThrough, pipeline } from 'node:stream';
import { promisify, deprecate, types } from 'node:util';
import { format } from 'node:url';
import { isIP } from 'node:net';
import { statSync, promises, createReadStream } from 'node:fs';
import { basename } from 'node:path';
import { i as imageConfig } from './_astro_assets_snxUhnJ8.mjs';
import { env } from 'node:process';
import { p as parseUrl, c as constructCloudinaryUrl, a as astroPkg, t as transformationPlugins } from './chunk-RPEDWVUU_DMH4Lh06.mjs';
import { createHash } from 'node:crypto';
/* empty css                         */
import '../renderers.mjs';

// src/lib/upload-widget.ts
function getUploadWidgetOptions({ uploadSignature, ...options }, config) {
  const signed = typeof uploadSignature === "function";
  const { cloudName, apiKey } = config?.cloud || {};
  if (!cloudName) {
    throw new Error("A Cloudinary Cloud name is required, please make sure your environment variable is set and configured in your environment.");
  }
  if (signed && !apiKey) {
    throw new Error("A Cloudinary API Key is required for signed requests, please make sure your environment variable is set and configured in your environment.");
  }
  if (!signed && !options.uploadPreset) {
    throw new Error("A Cloudinary Upload Preset is required for unsigned uploads. Please specify an uploadPreset or configure signed uploads.");
  }
  const uploadOptions = {
    cloudName,
    apiKey,
    ...options
  };
  if (signed) {
    uploadOptions.uploadSignature = uploadSignature;
  }
  return uploadOptions;
}
function getVideoPlayerOptions(options, config) {
  const {
    autoplay,
    controls = true,
    language,
    languages,
    logo = true,
    loop = false,
    muted = false,
    poster,
    src,
    transformation,
    quality = "auto",
    ...otherCldVidPlayerOptions
  } = options;
  const { cloudName } = config?.cloud || {};
  const { secureDistribution, privateCdn } = config?.url || {};
  if (!cloudName) {
    throw new Error(
      "A Cloudinary Cloud name is required, please make sure your environment variable is set and configured in your environment."
    );
  }
  let publicId = src || "";
  if (publicId.startsWith("http")) {
    try {
      const parts = parseUrl(src);
      if (typeof parts?.publicId === "string") {
        publicId = parts?.publicId;
      }
    } catch (e) {
    }
  }
  if (!publicId) {
    throw new Error(
      "Video Player requires a src, please make sure to configure your src as a public ID or Cloudinary URL."
    );
  }
  const playerTransformations = Array.isArray(transformation) ? transformation : [transformation];
  playerTransformations.unshift({
    quality
  });
  let logoOptions = {};
  if (typeof logo === "boolean") {
    logoOptions.showLogo = logo;
  } else if (typeof logo === "object") {
    logoOptions = {
      ...logoOptions,
      showLogo: true,
      logoImageUrl: logo.imageUrl,
      logoOnclickUrl: logo.onClickUrl
    };
  }
  let autoplayValue = false;
  let autoplayModeValue = void 0;
  if (typeof autoplay === "boolean" || autoplay === "true" || autoplay === "false") {
    autoplayValue = autoplay;
  }
  if (typeof autoplay === "string" && autoplay !== "true" && autoplay !== "false") {
    autoplayModeValue = autoplay;
  }
  const playerOptions = {
    cloud_name: cloudName,
    privateCdn,
    secureDistribution,
    autoplayMode: autoplayModeValue,
    autoplay: autoplayValue,
    controls,
    language,
    languages,
    loop,
    muted,
    publicId,
    transformation: playerTransformations,
    ...logoOptions,
    ...otherCldVidPlayerOptions
  };
  if (playerOptions.width && playerOptions.height && !playerOptions.aspectRatio) {
    playerOptions.aspectRatio = `${playerOptions.width}:${playerOptions.height}`;
  }
  if (typeof poster === "string") {
    playerOptions.posterOptions = {
      publicId: poster
    };
  } else if (typeof poster === "object") {
    if (typeof poster.src !== "string") {
      playerOptions.posterOptions = {
        publicId: constructCloudinaryUrl({
          options: {
            ...poster,
            src: publicId,
            assetType: "video",
            format: "auto:image"
          },
          config
        })
      };
    } else {
      playerOptions.posterOptions = {
        publicId: constructCloudinaryUrl({
          options: poster,
          config
        })
      };
    }
  }
  return playerOptions;
}

const domains = {
    "images.ctfassets.net": "contentful",
    "cdn.builder.io": "builder.io",
    "images.prismic.io": "imgix",
    "www.datocms-assets.com": "imgix",
    "cdn.sanity.io": "imgix",
    "images.unsplash.com": "imgix",
    "cdn.shopify.com": "shopify",
    "s7d1.scene7.com": "scene7",
    "ip.keycdn.com": "keycdn",
    "assets.caisy.io": "bunny",
    "images.contentstack.io": "contentstack",
    "ucarecdn.com": "uploadcare"
};

const subdomains = {
    "imgix.net": "imgix",
    "files.wordpress.com": "wordpress",
    "b-cdn.net": "bunny",
    "storyblok.com": "storyblok",
    "kc-usercontent.com": "kontent.ai",
    "cloudinary.com": "cloudinary",
    "kxcdn.com": "keycdn",
    "imgeng.in": "imageengine",
    "imagekit.io": "imagekit",
    "cloudimg.io": "cloudimage",
    "ucarecdn.com": "uploadcare",
    "supabase.co": "supabase"
};

const paths = {
    "/cdn-cgi/image/": "cloudflare",
    "/cdn-cgi/imagedelivery/": "cloudflare_images",
    "/_next/image": "nextjs",
    "/_next/static": "nextjs",
    "/_vercel/image": "vercel",
    "/is/image": "scene7",
    "/_ipx/": "ipx",
    "/_image": "astro",
    "/.netlify/images": "netlify",
    "/storage/v1/object/public/": "supabase",
    "/storage/v1/render/image/public/": "supabase"
};

const roundIfNumeric = (value) => {
    if (!value) {
        return value;
    }
    const num = Number(value);
    return isNaN(num) ? value : Math.round(num);
};
const setParamIfDefined = (url, key, value, deleteExisting, roundValue) => {
    if (value) {
        if (roundValue) {
            value = roundIfNumeric(value);
        }
        url.searchParams.set(key, value.toString());
    }
    else if (deleteExisting) {
        url.searchParams.delete(key);
    }
};
const setParamIfUndefined = (url, key, value) => {
    if (!url.searchParams.has(key)) {
        url.searchParams.set(key, value.toString());
    }
};
const getNumericParam = (url, key) => {
    const value = Number(url.searchParams.get(key));
    return isNaN(value) ? undefined : value;
};
/**
 * Given a URL object, returns path and query params
 */
const toRelativeUrl = (url) => {
    const { pathname, search } = url;
    return `${pathname}${search}`;
};
/**
 * Returns a URL string that may be relative or absolute
 */
const toCanonicalUrlString = (url) => {
    return url.hostname === "n" ? toRelativeUrl(url) : url.toString();
};
/**
 * Normalises a URL object or string URL to a URL object.
 */
const toUrl = (url, base) => {
    return typeof url === "string" ? new URL(url, base ?? "http://n/") : url;
};

const cdnDomains = new Map(Object.entries(domains));
const cdnSubdomains = Object.entries(subdomains);
function getImageCdnForUrl(url) {
    return getImageCdnForUrlByDomain(url) || getImageCdnForUrlByPath(url);
}
function getImageCdnForUrlByDomain(url) {
    if (typeof url === "string" && !url.startsWith("https://")) {
        return false;
    }
    const { hostname } = toUrl(url);
    if (cdnDomains.has(hostname)) {
        return cdnDomains.get(hostname);
    }
    for (const [subdomain, cdn] of cdnSubdomains) {
        if (hostname.endsWith(`.${subdomain}`)) {
            return cdn;
        }
    }
    return false;
}
function getImageCdnForUrlByPath(url) {
    // Allow relative URLs
    const { pathname } = toUrl(url);
    for (const [prefix, cdn] of Object.entries(paths)) {
        if (pathname.startsWith(prefix)) {
            return cdn;
        }
    }
    return false;
}

const transform$o = ({ url: originalUrl, width, height, format }) => {
    const url = toUrl(originalUrl);
    if (width && width > 4000) {
        if (height) {
            height = Math.round(height * 4000 / width);
        }
        width = 4000;
    }
    if (height && height > 4000) {
        if (width) {
            width = Math.round(width * 4000 / height);
        }
        height = 4000;
    }
    setParamIfDefined(url, "w", width, true, true);
    setParamIfDefined(url, "h", height, true, true);
    setParamIfDefined(url, "fm", format);
    setParamIfUndefined(url, "fit", "fill");
    return url;
};

const transform$n = ({ url: originalUrl, width, height, format }) => {
    const url = toUrl(originalUrl);
    setParamIfDefined(url, "width", width, true, true);
    setParamIfDefined(url, "height", height, true, true);
    setParamIfDefined(url, "format", format);
    if (width && height) {
        setParamIfUndefined(url, "fit", "cover");
        setParamIfUndefined(url, "sharp", "true");
    }
    return url;
};

const transform$m = ({ url: originalUrl, width, height, format }) => {
    const url = toUrl(originalUrl);
    setParamIfDefined(url, "w", width, true, true);
    setParamIfDefined(url, "h", height, true, true);
    setParamIfUndefined(url, "fit", "min");
    if (format) {
        url.searchParams.set("fm", format);
        const fm = url.searchParams.get("auto");
        if (fm === "format") {
            url.searchParams.delete("auto");
        }
        else if (fm?.includes("format")) {
            url.searchParams.set("auto", fm.split(",").filter((s) => s !== "format").join(","));
        }
    }
    else {
        url.searchParams.delete("fm");
        if (!url.searchParams.get("auto")?.includes("format")) {
            url.searchParams.append("auto", "format");
        }
    }
    return url;
};

const shopifyRegex = /(.+?)(?:_(?:(pico|icon|thumb|small|compact|medium|large|grande|original|master)|(\d*)x(\d*)))?(?:_crop_([a-z]+))?(\.[a-zA-Z]+)(\.png|\.jpg|\.webp|\.avif)?$/;
const parse$9 = (imageUrl) => {
    const url = toUrl(imageUrl);
    const match = url.pathname.match(shopifyRegex);
    if (!match) {
        throw new Error("Invalid Shopify URL");
    }
    const [, path, size, width, height, crop, extension, format] = match;
    url.pathname = `${path}${extension}`;
    const widthString = width ? width : url.searchParams.get("width");
    const heightString = height ? height : url.searchParams.get("height");
    url.searchParams.delete("width");
    url.searchParams.delete("height");
    return {
        base: url.toString(),
        width: Number(widthString) || undefined,
        height: Number(heightString) || undefined,
        format: format ? format.slice(1) : undefined,
        params: { crop, size },
        cdn: "shopify",
    };
};
const generate$9 = ({ base, width, height, format, params }) => {
    const url = toUrl(base);
    setParamIfDefined(url, "width", width, true, true);
    setParamIfDefined(url, "height", height, true, true);
    setParamIfDefined(url, "crop", params?.crop);
    setParamIfDefined(url, "format", format);
    return url;
};
const transform$l = ({ url: originalUrl, width, height }) => {
    const parsed = parse$9(originalUrl);
    if (!parsed) {
        return;
    }
    const props = {
        ...parsed,
        width,
        height,
    };
    return generate$9(props);
};

const transform$k = ({ url: originalUrl, width, height }) => {
    const url = toUrl(originalUrl);
    setParamIfDefined(url, "w", width, true, true);
    setParamIfDefined(url, "h", height, true, true);
    setParamIfUndefined(url, "crop", "1");
    return url;
};

const transform$j = ({ url: originalUrl, width, height }) => {
    const url = toUrl(originalUrl);
    setParamIfDefined(url, "w", width, true, true);
    setParamIfDefined(url, "h", height, true, true);
    setParamIfDefined(url, "q", getNumericParam(url, "q"), true);
    return url;
};

// Thanks Colby!
const cloudinaryRegex = /https?:\/\/(?<host>[^\/]+)\/(?<cloudName>[^\/]+)\/(?<assetType>image|video|raw)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)\/?(?<signature>s\-\-[a-zA-Z0-9]+\-\-)?\/?(?<transformations>(?:[^_\/]+_[^,\/]+,?)*)?\/(?:(?<version>v\d+)\/)?(?<idAndFormat>[^\s]+)$/g;
const parseTransforms$2 = (transformations) => {
    return transformations
        ? Object.fromEntries(transformations.split(",").map((t) => t.split("_")))
        : {};
};
const formatUrl$3 = ({ host, cloudName, assetType, deliveryType, signature, transformations = {}, version, id, format, }) => {
    if (format) {
        transformations.f = format;
    }
    const transformString = Object.entries(transformations).map(([key, value]) => `${key}_${value}`).join(",");
    const pathSegments = [
        host,
        cloudName,
        assetType,
        deliveryType,
        signature,
        transformString,
        version,
        id,
    ].filter(Boolean).join("/");
    return `https://${pathSegments}`;
};
const parse$8 = (imageUrl) => {
    const url = toUrl(imageUrl);
    const matches = [...url.toString().matchAll(cloudinaryRegex)];
    if (!matches.length) {
        throw new Error("Invalid Cloudinary URL");
    }
    const group = matches[0].groups || {};
    const { transformations: transformString = "", idAndFormat, ...baseParams } = group;
    delete group.idAndFormat;
    const lastDotIndex = idAndFormat.lastIndexOf(".");
    const id = lastDotIndex < 0
        ? idAndFormat
        : idAndFormat.slice(0, lastDotIndex);
    const originalFormat = lastDotIndex < 0
        ? undefined
        : idAndFormat.slice(lastDotIndex + 1);
    const { w, h, f, ...transformations } = parseTransforms$2(transformString);
    const format = (f && f !== "auto") ? f : originalFormat;
    const base = formatUrl$3({ ...baseParams, id, transformations });
    return {
        base,
        width: Number(w) || undefined,
        height: Number(h) || undefined,
        format,
        cdn: "cloudinary",
        params: {
            ...group,
            id: group.deliveryType === "fetch" ? idAndFormat : id,
            format,
            transformations,
        },
    };
};
const generate$8 = ({ base, width, height, format, params }) => {
    const parsed = parse$8(base.toString());
    const props = {
        transformations: {},
        ...parsed.params,
        ...params,
        format: format || "auto",
    };
    if (width) {
        props.transformations.w = roundIfNumeric(width).toString();
    }
    if (height) {
        props.transformations.h = roundIfNumeric(height).toString();
    }
    // Default crop to fill without upscaling
    props.transformations.c ||= "lfill";
    return formatUrl$3(props);
};
const transform$i = ({ url: originalUrl, width, height, format = "auto" }) => {
    const parsed = parse$8(originalUrl);
    if (!parsed) {
        throw new Error("Invalid Cloudinary URL");
    }
    if (parsed.params?.assetType !== "image") {
        throw new Error("Cloudinary transformer only supports images");
    }
    if (parsed.params?.signature) {
        throw new Error("Cloudinary transformer does not support signed URLs");
    }
    const props = {
        ...parsed,
        width,
        height,
        format,
    };
    return generate$8(props);
};

const cloudflareRegex = /https?:\/\/(?<host>[^\/]+)\/cdn-cgi\/image\/(?<transformations>[^\/]+)?\/(?<path>.*)$/g;
const parseTransforms$1 = (transformations) => Object.fromEntries(transformations.split(",").map((t) => t.split("=")));
const formatUrl$2 = ({ host, transformations = {}, path, }) => {
    const transformString = Object.entries(transformations).map(([key, value]) => `${key}=${value}`).join(",");
    const pathSegments = [
        host,
        "cdn-cgi",
        "image",
        transformString,
        path,
    ].join("/");
    return `https://${pathSegments}`;
};
const parse$7 = (imageUrl) => {
    const url = toUrl(imageUrl);
    const matches = [...url.toString().matchAll(cloudflareRegex)];
    if (!matches.length) {
        throw new Error("Invalid Cloudflare URL");
    }
    const group = matches[0].groups || {};
    const { transformations: transformString, ...baseParams } = group;
    const { width, height, f, ...transformations } = parseTransforms$1(transformString);
    formatUrl$2({ ...baseParams, transformations });
    return {
        base: url.toString(),
        width: Number(width) || undefined,
        height: Number(height) || undefined,
        format: f,
        cdn: "cloudflare",
        params: { ...group, transformations },
    };
};
const generate$7 = ({ base, width, height, format, params }) => {
    const parsed = parse$7(base.toString());
    const props = {
        transformations: {},
        ...parsed.params,
        ...params,
    };
    if (width) {
        props.transformations.width = width?.toString();
    }
    if (height) {
        props.transformations.height = height?.toString();
    }
    if (format) {
        props.transformations.f = format === "jpg" ? "jpeg" : format;
    }
    props.transformations.fit ||= "cover";
    return new URL(formatUrl$2(props));
};
const transform$h = ({ url: originalUrl, width, height, format = "auto" }) => {
    const parsed = parse$7(originalUrl);
    if (!parsed) {
        throw new Error("Invalid Cloudflare URL");
    }
    const props = {
        ...parsed,
        width,
        height,
        format,
    };
    return generate$7(props);
};

const transform$g = ({ url: originalUrl, width, height }) => {
    const url = toUrl(originalUrl);
    setParamIfDefined(url, "width", width, true, true);
    if (width && height) {
        setParamIfUndefined(url, "aspect_ratio", `${width}:${height}`);
    }
    return url;
};

const storyBlokAssets = /(?<id>\/f\/\d+\/\d+x\d+\/\w+\/[^\/]+)\/?(?<modifiers>m\/?(?<crop>\d+x\d+:\d+x\d+)?\/?(?<resize>(?<flipx>\-)?(?<width>\d+)x(?<flipy>\-)?(?<height>\d+))?\/?(filters\:(?<filters>[^\/]+))?)?$/g;
const storyBlokImg2 = /^(?<modifiers>\/(?<crop>\d+x\d+:\d+x\d+)?\/?(?<resize>(?<flipx>\-)?(?<width>\d+)x(?<flipy>\-)?(?<height>\d+))?\/?(filters\:(?<filters>[^\/]+))?\/?)?(?<id>\/f\/.+)$/g;
const splitFilters = (filters) => {
    if (!filters) {
        return {};
    }
    return Object.fromEntries(filters.split(":").map((filter) => {
        if (!filter)
            return [];
        const [key, value] = filter.split("(");
        return [key, value.replace(")", "")];
    }));
};
const generateFilters = (filters) => {
    if (!filters) {
        return undefined;
    }
    const filterItems = Object.entries(filters).map(([key, value]) => `${key}(${value ?? ""})`);
    if (filterItems.length === 0) {
        return undefined;
    }
    return `filters:${filterItems.join(":")}`;
};
const parse$6 = (imageUrl) => {
    const url = toUrl(imageUrl);
    // img2.storyblok.com is the old domain for Storyblok images, which used a
    // different path format. We'll assume custom domains are using the new format.
    const regex = url.hostname === "img2.storyblok.com"
        ? storyBlokImg2
        : storyBlokAssets;
    const [matches] = url.pathname.matchAll(regex);
    if (!matches || !matches.groups) {
        throw new Error("Invalid Storyblok URL");
    }
    const { id, crop, width, height, filters, flipx, flipy } = matches.groups;
    const { format, ...filterMap } = splitFilters(filters);
    // We update old img2.storyblok.com URLs to use the new syntax and domain
    if (url.hostname === "img2.storyblok.com") {
        url.hostname = "a.storyblok.com";
    }
    return {
        base: url.origin + id,
        width: Number(width) || undefined,
        height: Number(height) || undefined,
        format,
        params: {
            crop,
            filters: filterMap,
            flipx: flipx,
            flipy: flipy,
        },
        cdn: "storyblok",
    };
};
const generate$6 = ({ base, width = 0, height = 0, format, params = {} }) => {
    const { crop, filters, flipx = "", flipy = "" } = params;
    const size = `${flipx}${width}x${flipy}${height}`;
    return new URL([base, "m", crop, size, generateFilters(filters), format].filter(Boolean).join("/"));
};
const transform$f = ({ url: originalUrl, width, height, format }) => {
    const parsed = parse$6(originalUrl);
    if (!parsed) {
        return;
    }
    if (format) {
        if (!parsed.params) {
            parsed.params = { filters: {} };
        }
        if (!parsed.params.filters) {
            parsed.params.filters = {};
        }
        parsed.params.filters.format = format;
    }
    return generate$6({
        ...parsed,
        width,
        height,
    });
};

const transform$e = ({ url: originalUrl, width, height, format }) => {
    const url = toUrl(originalUrl);
    setParamIfDefined(url, "w", width, true, true);
    setParamIfDefined(url, "h", height, true, true);
    setParamIfDefined(url, "fm", format, true);
    if (width && height) {
        setParamIfUndefined(url, "fit", "crop");
    }
    return url;
};

const delegateUrl = (url) => {
    const parsed = toUrl(url);
    const source = parsed.searchParams.get("url");
    if (!source || !source.startsWith("http")) {
        return false;
    }
    const cdn = getImageCdnForUrlByDomain(source);
    if (!cdn) {
        return false;
    }
    return {
        cdn,
        url: source,
    };
};
const generate$5 = ({ base, width, params: { quality = 75, root = "_vercel" } = {} }) => {
    // If the base is a relative URL, we need to add a dummy host to the URL
    const url = new URL("http://n");
    url.pathname = `/${root}/image`;
    url.searchParams.set("url", base.toString());
    setParamIfDefined(url, "w", width, false, true);
    setParamIfUndefined(url, "q", quality);
    return toRelativeUrl(url);
};
const transform$d = ({ url, width, cdn }) => {
    // the URL might be relative, so we need to add a dummy host to it
    const parsedUrl = toUrl(url);
    const isNextImage = parsedUrl.pathname.startsWith("/_next/image") ||
        parsedUrl.pathname.startsWith("/_vercel/image");
    const src = isNextImage ? parsedUrl.searchParams.get("url") : url.toString();
    if (!src) {
        return undefined;
    }
    setParamIfDefined(parsedUrl, "w", width, true, true);
    if (isNextImage) {
        return toCanonicalUrlString(parsedUrl);
    }
    return generate$5({
        base: src,
        width,
        params: { root: cdn === "nextjs" ? "_next" : "_vercel" },
    });
};

const transform$c = (params) => transform$d({ ...params, cdn: "nextjs" });

const transform$b = ({ url: originalUrl, width, height, format }) => {
    const url = toUrl(originalUrl);
    setParamIfDefined(url, "wid", width, true, true);
    setParamIfDefined(url, "hei", height, true, true);
    setParamIfDefined(url, "fmt", format, true);
    setParamIfDefined(url, "qlt", getNumericParam(url, "qlt"), true);
    setParamIfDefined(url, "scl", getNumericParam(url, "scl"), true);
    setParamIfUndefined(url, "fit", "crop");
    if (!width && !height) {
        setParamIfUndefined(url, "scl", 1);
    }
    return url;
};

const transform$a = ({ url: originalUrl, width, height, format }) => {
    const url = toUrl(originalUrl);
    setParamIfDefined(url, "width", width, true, true);
    setParamIfDefined(url, "height", height, true, true);
    setParamIfDefined(url, "format", format, true);
    setParamIfDefined(url, "quality", getNumericParam(url, "quality"), true);
    setParamIfUndefined(url, "enlarge", 0);
    return url;
};

const transform$9 = ({ url: originalUrl, width, height, format }) => {
    const url = toUrl(originalUrl);
    setParamIfDefined(url, "width", width, true, true);
    setParamIfDefined(url, "height", height, true, true);
    setParamIfDefined(url, "format", format);
    setParamIfDefined(url, "quality", getNumericParam(url, "quality"), true);
    return url;
};

const OBJECT_TO_DIRECTIVES_MAP = {
    width: "w",
    height: "h",
    autoWidthWithFallback: "w_auto",
    auto_width_fallback: "w_auto",
    scaleToScreenWidth: "pc",
    scale_to_screen_width: "pc",
    crop: "cr",
    outputFormat: "f",
    format: "f",
    fit: "m",
    fitMethod: "m",
    compression: "cmpr",
    sharpness: "s",
    rotate: "r",
    inline: "in",
    keepMeta: "meta",
    keep_meta: "meta",
    noOptimization: "pass",
    no_optimization: "pass",
    force_download: "dl",
    max_device_pixel_ratio: "maxdpr",
    maxDevicePixelRatio: "maxdpr",
};
function getDirective(key) {
    let keyArray = Object.keys(OBJECT_TO_DIRECTIVES_MAP);
    let directive = keyArray.find((k) => OBJECT_TO_DIRECTIVES_MAP[k] === key) ||
        "";
    return directive;
}
function getParameterArray(url) {
    let url_string = url.toString();
    let paramArray = [];
    if (url_string) {
        let splitURL = url_string.split("imgeng=");
        if (splitURL.length > 1) {
            paramArray = splitURL[1].split("/");
        }
    }
    return paramArray;
}
function getBaseUrl(url) {
    let url_string = url.toString();
    let baseUrl = "";
    if (url_string) {
        let splitURL = url_string.split("imgeng=");
        if (splitURL.length > 1) {
            baseUrl = splitURL[0].slice(0, -1);
        }
        else {
            baseUrl = url_string;
        }
    }
    return baseUrl;
}
const transform$8 = ({ url: originalUrl, width, height, format }) => {
    const url = toUrl(originalUrl);
    const src = getBaseUrl(url);
    let directives = {};
    const param = url.toString() === src ? [] : getParameterArray(url);
    if (param.length) {
        directives = getDirectives(param);
    }
    if (width) {
        directives["width"] = width;
    }
    if (height) {
        directives["height"] = height;
    }
    if (format) {
        directives["format"] = format;
    }
    if (!directives.hasOwnProperty("fit")) {
        directives = { ...directives, "fit": "cropbox" };
    }
    let directives_string = build_IE_directives(directives);
    let query_string = build_IE_query_string(directives_string);
    let query_prefix = query_string === "" ? "" : (src.includes("?") ? "&" : "?");
    return `${src}${query_prefix}${query_string}`;
};
function build_IE_directives(directives) {
    return Object.entries(directives).reduce((acc, [k, v]) => {
        return acc + maybe_create_directive(k, v);
    }, "");
}
function build_IE_query_string(directives_string) {
    if (directives_string && directives_string !== "") {
        return `imgeng=${directives_string}`;
    }
    return "";
}
function maybe_create_directive(directive, value) {
    let translated_directive = OBJECT_TO_DIRECTIVES_MAP[directive];
    if (translated_directive && (value || value === 0)) {
        return `/${translated_directive}_${value}`;
    }
    return "";
}
function getDirectives(paramArray) {
    let directives = {};
    paramArray.forEach((para) => {
        let keyValue = para.split("_");
        if (keyValue.length > 1) {
            let key = keyValue[0];
            let value = keyValue[1];
            let directiveKey = getDirective(key);
            if (directiveKey) {
                directives[directiveKey] = value;
            }
        }
    });
    return directives;
}

const transform$7 = ({ url: originalUrl, width, height, format }) => {
    const url = toUrl(originalUrl);
    setParamIfDefined(url, "width", width, true, true);
    setParamIfDefined(url, "height", height, true, true);
    setParamIfDefined(url, "format", format);
    if (!url.searchParams.has("format")) {
        setParamIfUndefined(url, "auto", "webp");
    }
    if (width && height) {
        setParamIfUndefined(url, "fit", "crop");
    }
    return url;
};

const cloudflareImagesRegex = /https?:\/\/(?<host>[^\/]+)\/cdn-cgi\/imagedelivery\/(?<accountHash>[^\/]+)\/(?<imageId>[^\/]+)\/*(?<transformations>[^\/]+)*$/g;
const parseTransforms = (transformations) => Object.fromEntries(transformations?.split(",")?.map((t) => t.split("=")) ?? []);
const formatUrl$1 = ({ host, accountHash, transformations = {}, imageId, }) => {
    const transformString = Object.entries(transformations).map(([key, value]) => `${key}=${value}`).join(",");
    const pathSegments = [
        host,
        "cdn-cgi",
        "imagedelivery",
        accountHash,
        imageId,
        transformString,
    ].join("/");
    return `https://${pathSegments}`;
};
const parse$5 = (imageUrl) => {
    const url = toUrl(imageUrl);
    const matches = [...url.toString().matchAll(cloudflareImagesRegex)];
    if (!matches.length) {
        throw new Error("Invalid Cloudflare Images URL");
    }
    const group = matches[0].groups || {};
    const { transformations: transformString, ...baseParams } = group;
    const { w, h, f, ...transformations } = parseTransforms(transformString);
    return {
        base: url.toString(),
        width: Number(w) || undefined,
        height: Number(h) || undefined,
        format: f,
        cdn: "cloudflare_images",
        params: { ...baseParams, transformations },
    };
};
const generate$4 = ({ base, width, height, format, params }) => {
    const parsed = parse$5(base.toString());
    const props = {
        transformations: {},
        ...parsed.params,
        ...params,
    };
    if (width) {
        props.transformations.w = width?.toString();
    }
    if (height) {
        props.transformations.h = height?.toString();
    }
    if (format) {
        props.transformations.f = format;
    }
    props.transformations.fit ||= "cover";
    return new URL(formatUrl$1(props));
};
const transform$6 = ({ url: originalUrl, width, height, format = "auto" }) => {
    const parsed = parse$5(originalUrl);
    if (!parsed) {
        throw new Error("Invalid Cloudflare Images URL");
    }
    const props = {
        ...parsed,
        width,
        height,
        format,
    };
    return generate$4(props);
};

/**
 * Parses the CDN/server's native URL format
 */
const parse$4 = (imageUrl) => {
    const url = toUrl(imageUrl);
    const [modifiers, ...id] = url.pathname.split("/").slice(1);
    const params = Object.fromEntries(modifiers.split(",").map((modifier) => {
        const [key, value] = modifier.split("_");
        return [key, value];
    }));
    if (params.s) {
        const [width, height] = params.s.split("x");
        params.w ||= width;
        params.h ||= height;
    }
    return {
        base: id.join("/"),
        width: Number(params.w) || undefined,
        height: Number(params.h) || undefined,
        quality: Number(params.q) || undefined,
        format: params.f || "auto",
        params,
        cdn: "ipx",
    };
};
const generate$3 = ({ base: id, width, height, format, params }) => {
    const modifiers = params?.modifiers ?? {};
    if (width && height) {
        modifiers.s = `${width}x${height}`;
    }
    else if (width) {
        modifiers.w = `${width}`;
    }
    else if (height) {
        modifiers.h = `${height}`;
    }
    if (format) {
        modifiers.f = format;
    }
    const base = params?.base.endsWith("/") ? params?.base : `${params?.base}/`;
    const modifiersString = Object.entries(modifiers).map(([key, value]) => `${key}_${value}`).join(",");
    const stringId = id.toString();
    const image = stringId.startsWith("/") ? stringId.slice(1) : stringId;
    return `${base}${modifiersString}/${image}`;
};
const transform$5 = (options) => {
    const url = String(options.url);
    const parsedUrl = toUrl(url);
    const defaultBase = (parsedUrl.pathname.startsWith("/_ipx") && parsedUrl.hostname !== "n")
        ? `${parsedUrl.origin}/_ipx`
        : "/_ipx";
    const base = options.cdnOptions?.ipx?.base ?? defaultBase;
    const isIpxUrl = base && base !== "/" && url.startsWith(base);
    if (isIpxUrl) {
        const parsed = parse$4(url.replace(base, ""));
        return generate$3({
            ...parsed,
            ...options,
            params: {
                ...options.cdnOptions?.ipx,
                base,
            },
        });
    }
    return generate$3({
        ...options,
        base: url,
        params: {
            ...options.cdnOptions?.ipx,
            base,
        },
    });
};

const transform$4 = ({ url: originalUrl, width, height, format }) => {
    const parsedUrl = toUrl(originalUrl);
    const href = toCanonicalUrlString(new URL(parsedUrl.pathname, parsedUrl.origin));
    const url = { searchParams: new URLSearchParams() };
    setParamIfDefined(url, "href", href, true, true);
    setParamIfDefined(url, "w", width, true, true);
    setParamIfDefined(url, "h", height, true, true);
    setParamIfDefined(url, "f", format);
    return `/_image?${url.searchParams.toString()}`;
};

const skippedParams = new Set([
    "w",
    "h",
    "q",
    "fm",
    "url",
    "width",
    "height",
    "quality",
]);
const parse$3 = (url) => {
    const parsed = toUrl(url);
    const width = Number(parsed.searchParams.get("w") ?? parsed.searchParams.get("width")) ??
        undefined;
    const height = Number(parsed.searchParams.get("h") ?? parsed.searchParams.get("height")) ??
        undefined;
    const quality = Number(parsed.searchParams.get("q") ?? parsed.searchParams.get("quality")) || undefined;
    const format = parsed.searchParams.get("fm") || undefined;
    const base = parsed.searchParams.get("url") || "";
    const params = {
        quality,
    };
    parsed.searchParams.forEach((value, key) => {
        if (skippedParams.has(key)) {
            return;
        }
        params[key] = value;
    });
    parsed.search = "";
    return {
        base,
        width,
        height,
        format,
        params,
        cdn: "netlify",
    };
};
const generate$2 = ({ base, width, height, format, params: { site, quality, ...params } = {} }) => {
    const url = toUrl("/.netlify/images", site);
    Object.entries(params).forEach(([key, value]) => setParamIfDefined(url, key, value));
    setParamIfDefined(url, "q", quality, true, true);
    setParamIfDefined(url, "w", width, true, true);
    setParamIfDefined(url, "h", height, true, true);
    setParamIfDefined(url, "fm", format);
    setParamIfUndefined(url, "fit", "cover");
    url.searchParams.set("url", base.toString());
    return toCanonicalUrlString(url);
};
const transform$3 = (options) => {
    const url = toUrl(options.url);
    // If this is a Netlify image URL, we'll manipulate it rather than using it as the source image
    if (url.pathname.startsWith("/.netlify/images")) {
        const { params, base, format } = parse$3(url);
        return generate$2({
            base,
            format,
            ...options,
            params: {
                ...params,
                // If hostname is "n", we're dealing with a relative URL, so we don't need to set the site param
                site: url.hostname === "n" ? undefined : url.origin,
            },
        });
    }
    return generate$2({
        ...options,
        base: options.url,
        params: {
            site: options.cdnOptions?.netlify?.site,
        },
    });
};

const getTransformParams = (url) => {
    const transforms = url.searchParams.get("tr") || "";
    return transforms.split(",").reduce((acc, transform) => {
        const [key, value] = transform.split("-");
        acc[key] = value;
        return acc;
    }, {});
};
const transform$2 = ({ url: originalUrl, width, height, format }) => {
    const url = toUrl(originalUrl);
    const transformParams = getTransformParams(url);
    transformParams.w = width ? Math.round(width) : width;
    transformParams.h = height ? Math.round(height) : height;
    if (!transformParams.f) {
        transformParams.f = "auto";
    }
    if (format) {
        transformParams.f = format;
    }
    const tr = Object.keys(transformParams).map((key) => {
        const value = transformParams[key];
        if (value) {
            return `${key}-${value}`;
        }
    })
        .filter((x) => x)
        .join(",");
    url.searchParams.set("tr", tr);
    return url;
};

const uploadcareRegex = /^https?:\/\/(?<host>[^\/]+)\/(?<uuid>[^\/]+)/g;
/**
 * Taken from uploadcare/blocks
 *
 * @see https://github.com/uploadcare/blocks/blob/87d1048e94f05f99e1da988c86c6362522e9a3c8/utils/cdn-utils.js#L57
 */
function extractFilename(cdnUrl) {
    const url = new URL(cdnUrl);
    const noOrigin = url.pathname + url.search + url.hash;
    const urlFilenameIdx = noOrigin.lastIndexOf("http");
    const plainFilenameIdx = noOrigin.lastIndexOf("/");
    let filename = "";
    if (urlFilenameIdx >= 0) {
        filename = noOrigin.slice(urlFilenameIdx);
    }
    else if (plainFilenameIdx >= 0) {
        filename = noOrigin.slice(plainFilenameIdx + 1);
    }
    return filename;
}
/**
 * Taken from uploadcare/blocks
 *
 * @see https://github.com/uploadcare/blocks/blob/87d1048e94f05f99e1da988c86c6362522e9a3c8/utils/cdn-utils.js#L131
 */
function isFileUrl(filename) {
    return filename.startsWith("http");
}
/**
 * Taken from uploadcare/blocks
 *
 * @see https://github.com/uploadcare/blocks/blob/87d1048e94f05f99e1da988c86c6362522e9a3c8/utils/cdn-utils.js#L141
 */
function splitFileUrl(fileUrl) {
    const url = new URL(fileUrl);
    return {
        pathname: url.origin + url.pathname || "",
        search: url.search || "",
        hash: url.hash || "",
    };
}
/**
 * Taken from uploadcare/blocks
 *
 * @see https://github.com/uploadcare/blocks/blob/87d1048e94f05f99e1da988c86c6362522e9a3c8/utils/cdn-utils.js#L114
 */
function trimFilename(cdnUrl) {
    const url = new URL(cdnUrl);
    const filename = extractFilename(cdnUrl);
    const filenamePathPart = isFileUrl(filename)
        ? splitFileUrl(filename).pathname
        : filename;
    url.pathname = url.pathname.replace(filenamePathPart, "");
    url.search = "";
    url.hash = "";
    return url.toString();
}
/**
 * Taken from uploadcare/blocks
 *
 * @see https://github.com/uploadcare/blocks/blob/87d1048e94f05f99e1da988c86c6362522e9a3c8/utils/cdn-utils.js#L9C1-L24C3
 */
const normalizeCdnOperation = (operation) => {
    if (typeof operation !== "string" || !operation) {
        return "";
    }
    let str = operation.trim();
    if (str.startsWith("-/")) {
        str = str.slice(2);
    }
    else if (str.startsWith("/")) {
        str = str.slice(1);
    }
    if (str.endsWith("/")) {
        str = str.slice(0, str.length - 1);
    }
    return str;
};
/**
 * Taken from uploadcare/blocks
 *
 * @see https://github.com/uploadcare/blocks/blob/87d1048e94f05f99e1da988c86c6362522e9a3c8/utils/cdn-utils.js#L93C1-L106C2
 */
function extractOperations(cdnUrl) {
    const withoutFilename = trimFilename(cdnUrl);
    const url = new URL(withoutFilename);
    const operationsMarker = url.pathname.indexOf("/-/");
    if (operationsMarker === -1) {
        return [];
    }
    const operationsStr = url.pathname.substring(operationsMarker);
    return operationsStr
        .split("/-/")
        .filter(Boolean)
        .map((operation) => normalizeCdnOperation(operation));
}
const parseOperations = (operations) => {
    return operations.length
        ? operations.reduce((acc, operation) => {
            const [key, value] = operation.split("/");
            return {
                ...acc,
                [key]: value,
            };
        }, {})
        : {};
};
const formatUrl = ({ host, uuid, operations = {}, filename, }) => {
    const operationString = Object.entries(operations).map(([key, value]) => `${key}/${value}`).join("/-/");
    const pathSegments = [
        host,
        uuid,
        operationString ? `-/${operationString}` : "",
        filename,
    ].join("/");
    return `https://${pathSegments}`;
};
const parse$2 = (imageUrl) => {
    const url = toUrl(imageUrl);
    const matchers = [...url.toString().matchAll(uploadcareRegex)];
    if (!matchers.length) {
        throw new Error("Invalid Uploadcare URL");
    }
    const group = matchers[0].groups || {};
    const { ...baseParams } = group;
    const filename = extractFilename(url.toString());
    const { format: f, ...operations } = parseOperations(extractOperations(url.toString()));
    const format = (f && f !== "auto") ? f : "auto";
    const base = formatUrl({
        ...baseParams,
        filename: filename || undefined,
        operations: {
            ...operations,
            format,
        },
    });
    return {
        base,
        cdn: "uploadcare",
        params: {
            ...group,
            filename: filename || undefined,
            operations: {
                ...operations,
                format,
            },
        },
    };
};
const generate$1 = ({ base, width, height, params, }) => {
    const baseUrl = base.toString();
    const parsed = parse$2(baseUrl.endsWith("/") ? baseUrl : `${baseUrl}/`);
    const props = {
        operations: {},
        ...parsed.params,
        ...params,
    };
    if (width && height) {
        props.operations = {
            ...props.operations,
            resize: `${width}x${height}`,
        };
    }
    else {
        if (width) {
            props.operations = {
                ...props.operations,
                resize: `${width}x`,
            };
        }
        if (height) {
            props.operations = {
                ...props.operations,
                resize: `x${height}`,
            };
        }
    }
    return formatUrl(props);
};
const transform$1 = ({ url: originalUrl, width, height, }) => {
    const parsed = parse$2(originalUrl);
    if (!parsed) {
        throw new Error("Invalid Uploadcare URL");
    }
    const props = {
        ...parsed,
        width,
        height,
    };
    return generate$1(props);
};

const ALLOWED_FORMATS = ["origin"];
const STORAGE_URL_PREFIX = "/storage/v1/object/public/";
const RENDER_URL_PREFIX = "/storage/v1/render/image/public/";
const isRenderUrl = (url) => url.pathname.startsWith(RENDER_URL_PREFIX);
const parse$1 = (imageUrl) => {
    const url = toUrl(imageUrl);
    const isRender = isRenderUrl(url);
    if (!isRender) {
        return {
            cdn: "supabase",
            base: url.origin + url.pathname,
        };
    }
    const imagePath = url.pathname.replace(RENDER_URL_PREFIX, "");
    const quality = url.searchParams.has("quality")
        ? Number(url.searchParams.get("quality"))
        : undefined;
    const width = url.searchParams.has("width")
        ? Number(url.searchParams.get("width"))
        : undefined;
    const height = url.searchParams.has("height")
        ? Number(url.searchParams.get("height"))
        : undefined;
    const format = url.searchParams.has("format")
        ? url.searchParams.get("format")
        : undefined;
    const resize = url.searchParams.has("resize")
        ? url.searchParams.get("resize")
        : undefined;
    return {
        cdn: "supabase",
        base: url.origin + STORAGE_URL_PREFIX + imagePath,
        width,
        height,
        format,
        params: {
            quality,
            resize,
        },
    };
};
const generate = ({ base, width, height, format, params }) => {
    const parsed = parse$1(base.toString());
    base = parsed.base;
    width = width || parsed.width;
    height = height || parsed.height;
    format = format || parsed.format;
    params = { ...parsed.params, ...params };
    const searchParams = new URLSearchParams();
    if (width)
        searchParams.set("width", roundIfNumeric(width).toString());
    if (height)
        searchParams.set("height", roundIfNumeric(height).toString());
    if (format && ALLOWED_FORMATS.includes(format)) {
        searchParams.set("format", format);
    }
    if (params?.quality) {
        searchParams.set("quality", roundIfNumeric(params.quality).toString());
    }
    if (params?.resize)
        searchParams.set("resize", params.resize);
    if (searchParams.toString() === "")
        return base;
    return parsed.base.replace(STORAGE_URL_PREFIX, RENDER_URL_PREFIX) + "?" +
        searchParams.toString();
};
const transform = ({ url, width, height, format, cdnOptions }) => {
    const parsed = parse$1(url);
    return generate({
        base: parsed.base,
        width: width || parsed.width,
        height: height || parsed.height,
        format: format || parsed.format,
        params: cdnOptions?.supabase || parsed.params,
    });
};

// Image servers that might delegate to another CDN
const delegators = {
    vercel: delegateUrl,
    nextjs: delegateUrl,
};
function getDelegatedCdn(url, cdn) {
    // Most CDNs are authoritative for their own URLs
    if (!(cdn in delegators)) {
        return false;
    }
    const maybeDelegate = delegators[cdn];
    if (!maybeDelegate) {
        return false;
    }
    return maybeDelegate(url);
}
/**
 * Gets the canonical URL and CDN for a given image URL, recursing into
 * the source image if it is hosted on another CDN.
 */
function getCanonicalCdnForUrl(url, defaultCdn) {
    const cdn = getImageCdnForUrl(url) || defaultCdn;
    if (!cdn) {
        return false;
    }
    const maybeDelegated = getDelegatedCdn(url, cdn);
    if (maybeDelegated) {
        return maybeDelegated;
    }
    return { cdn, url };
}

const getTransformer = (cdn) => ({
    imgix: transform$m,
    contentful: transform$o,
    "builder.io": transform$n,
    shopify: transform$l,
    wordpress: transform$k,
    cloudimage: transform$j,
    cloudinary: transform$i,
    bunny: transform$g,
    storyblok: transform$f,
    cloudflare: transform$h,
    vercel: transform$d,
    nextjs: transform$c,
    scene7: transform$b,
    "kontent.ai": transform$e,
    keycdn: transform$a,
    directus: transform$9,
    imageengine: transform$8,
    contentstack: transform$7,
    "cloudflare_images": transform$6,
    ipx: transform$5,
    astro: transform$4,
    netlify: transform$3,
    imagekit: transform$2,
    uploadcare: transform$1,
    supabase: transform,
}[cdn]);
/**
 * Returns a transformer function if the given CDN is supported
 */
const getTransformerForCdn = (cdn) => {
    if (!cdn) {
        return undefined;
    }
    return getTransformer(cdn);
};
/**
 * Transforms an image URL to a new URL with the given options.
 * If the URL is not from a known image CDN it returns undefined.
 */
const transformUrl = (options) => {
    const cdn = options?.cdn ?? getImageCdnForUrl(options.url);
    // Default to recursive
    if (!(options.recursive ?? true)) {
        return getTransformerForCdn(cdn)?.(options);
    }
    const canonical = getCanonicalCdnForUrl(options.url, cdn);
    if (!canonical || !canonical.cdn) {
        return undefined;
    }
    return getTransformer(canonical.cdn)?.({
        ...options,
        url: canonical.url,
    });
};

const __vite_import_meta_env__ = {"ASSETS_PREFIX": undefined, "BASE_URL": "/", "DEV": false, "MODE": "production", "PROD": true, "PUBLIC_CLOUDINARY_API_KEY": "372241328758597", "PUBLIC_CLOUDINARY_CLOUD_NAME": "alhedev-gallery", "SITE": undefined, "SSR": true};
var RE_MEDIA_QUERY = /^(?:(only|not)?\s*([_a-z][_a-z0-9-]*)|(\([^)]+\)))(?:\s*and\s*(.*))?$/i;
var RE_MQ_EXPRESSION = /^\(\s*([_a-z-][_a-z0-9-]*)\s*(?::\s*([^)]+))?\s*\)$/;
var RE_MQ_FEATURE = /^(?:(min|max)-)?(.+)/;
function parse(mediaQuery) {
  return mediaQuery.split(",").map(function(query) {
    query = query.trim();
    const captures = query.match(RE_MEDIA_QUERY);
    if (!captures) {
      throw new SyntaxError('Invalid CSS media query: "' + query + '"');
    }
    const modifier = captures[1];
    const type = captures[2];
    const parsed = {
      inverse: !!modifier && modifier.toLowerCase() === "not",
      type: type ? type.toLowerCase() : "all",
      expressions: []
    };
    const expressions = ((captures[3] || "") + (captures[4] || "")).trim();
    if (!expressions) {
      return parsed;
    }
    const expressionList = expressions.match(/\([^)]+\)/g);
    if (!expressionList) {
      throw new SyntaxError('Invalid CSS media query: "' + query + '"');
    }
    parsed.expressions = expressionList.map(function(expression) {
      const captures2 = expression.match(RE_MQ_EXPRESSION);
      if (!captures2) {
        throw new SyntaxError('Invalid CSS media query: "' + query + '"');
      }
      const feature = captures2[1].toLowerCase().match(RE_MQ_FEATURE);
      return {
        modifier: feature?.[1] ?? "",
        feature: feature?.[2] ?? "",
        value: captures2[2]
      };
    });
    return parsed;
  });
}
var DEBUG = Object.assign(__vite_import_meta_env__, {})?.DEV;
function logError(...args) {
  if (DEBUG) {
    console.error("[unpic]", ...args);
  }
}
var getSizes = (width, layout) => {
  if (!width || !layout) {
    return void 0;
  }
  switch (layout) {
    case `constrained`:
      return `(min-width: ${width}px) ${width}px, 100vw`;
    case `fixed`:
      return `${width}px`;
    case `fullWidth`:
      return `100vw`;
    default:
      return void 0;
  }
};
var pixelate = (value) => value || value === 0 ? `${value}px` : void 0;
var getStyle = ({
  width,
  height,
  aspectRatio,
  layout,
  objectFit = "cover",
  background
}) => {
  const styleEntries = [
    ["object-fit", objectFit]
  ];
  if (background?.startsWith("https:") || background?.startsWith("http:") || background?.startsWith("data:")) {
    styleEntries.push(["background-image", `url(${background})`]);
    styleEntries.push(["background-size", "cover"]);
    styleEntries.push(["background-repeat", "no-repeat"]);
  } else {
    styleEntries.push(["background", background]);
  }
  if (layout === "fixed") {
    styleEntries.push(["width", pixelate(width)]);
    styleEntries.push(["height", pixelate(height)]);
  }
  if (layout === "constrained") {
    styleEntries.push(["max-width", pixelate(width)]);
    styleEntries.push(["max-height", pixelate(height)]);
    styleEntries.push([
      "aspect-ratio",
      aspectRatio ? `${aspectRatio}` : void 0
    ]);
    styleEntries.push(["width", "100%"]);
  }
  if (layout === "fullWidth") {
    styleEntries.push(["width", "100%"]);
    styleEntries.push([
      "aspect-ratio",
      aspectRatio ? `${aspectRatio}` : void 0
    ]);
    styleEntries.push(["height", pixelate(height)]);
  }
  return Object.fromEntries(
    styleEntries.filter(([, value]) => value)
  );
};
var DEFAULT_RESOLUTIONS = [
  6016,
  // 6K
  5120,
  // 5K
  4480,
  // 4.5K
  3840,
  // 4K
  3200,
  // QHD+
  2560,
  // WQXGA
  2048,
  // QXGA
  1920,
  // 1080p
  1668,
  // Various iPads
  1280,
  // 720p
  1080,
  // iPhone 6-8 Plus
  960,
  // older horizontal phones
  828,
  // iPhone XR/11
  750,
  // iPhone 6-8
  640
  // older and lower-end phones
];
var LOW_RES_WIDTH = 24;
var getBreakpoints = ({
  width,
  layout,
  resolutions = DEFAULT_RESOLUTIONS
}) => {
  if (layout === "fullWidth") {
    return resolutions;
  }
  if (!width) {
    return [];
  }
  const doubleWidth = width * 2;
  if (layout === "fixed") {
    return [width, doubleWidth];
  }
  if (layout === "constrained") {
    return [
      // Always include the image at 1x and 2x the specified width
      width,
      doubleWidth,
      // Filter out any resolutions that are larger than the double-res image
      ...resolutions.filter((w) => w < doubleWidth)
    ];
  }
  return [];
};
var getSrcSetEntries = ({
  src,
  width,
  layout = "constrained",
  height,
  aspectRatio,
  breakpoints,
  cdn,
  transformer,
  format
}) => {
  const canonical = getCanonicalCdnForUrl(src, cdn);
  if (canonical && !transformer) {
    transformer = getTransformer(canonical.cdn);
  }
  if (!transformer) {
    return [];
  }
  breakpoints ||= getBreakpoints({ width, layout });
  return breakpoints.sort((a, b) => a - b).map((bp) => {
    let transformedHeight;
    if (height && aspectRatio) {
      transformedHeight = Math.round(bp / aspectRatio);
    }
    return {
      url: canonical ? canonical.url : src,
      width: bp,
      height: transformedHeight,
      format
    };
  });
};
var getSrcSet = (options) => {
  let { src, cdn, transformer } = options;
  const canonical = getCanonicalCdnForUrl(src, cdn);
  if (canonical && !transformer) {
    transformer = getTransformer(canonical.cdn);
  }
  if (!transformer) {
    return "";
  }
  return getSrcSetEntries({ ...options, transformer }).map((transform) => {
    const url = transformer(transform);
    return `${url?.toString()} ${transform.width}w`;
  }).join(",\n");
};
function transformSharedProps({
  width,
  height,
  priority,
  layout = "constrained",
  aspectRatio,
  ...props
}) {
  width = width && Number(width) || void 0;
  height = height && Number(height) || void 0;
  if (priority) {
    props.loading ||= "eager";
    props.fetchpriority ||= "high";
  } else {
    props.loading ||= "lazy";
    props.decoding ||= "async";
  }
  if (props.alt === "") {
    props.role ||= "presentation";
  }
  if (aspectRatio) {
    if (width) {
      if (height) {
        logError("Ignoring aspectRatio because width and height are both set");
      } else {
        height = Math.round(width / aspectRatio);
      }
    } else if (height) {
      width = Math.round(height * aspectRatio);
    } else if (layout !== "fullWidth") {
      logError(
        "When aspectRatio is set, either width or height must also be set"
      );
    }
  } else if (width && height) {
    aspectRatio = width / height;
  } else if (layout !== "fullWidth") {
    logError("Either aspectRatio or both width and height must be set");
  }
  return {
    width,
    height,
    aspectRatio,
    layout,
    ...props
  };
}
function transformProps(props) {
  let {
    src,
    cdn,
    transformer,
    background,
    layout,
    objectFit,
    breakpoints,
    width,
    height,
    aspectRatio,
    unstyled,
    ...transformedProps
  } = transformSharedProps(props);
  const canonical = src ? getCanonicalCdnForUrl(src, cdn) : void 0;
  let url = src;
  if (canonical) {
    url = canonical.url;
    transformer ||= getTransformer(canonical.cdn);
  }
  if (transformer && background === "auto") {
    const lowResHeight = aspectRatio ? Math.round(LOW_RES_WIDTH / aspectRatio) : void 0;
    const lowResImage = transformer({
      url,
      width: LOW_RES_WIDTH,
      height: lowResHeight
    });
    if (lowResImage) {
      background = lowResImage.toString();
    }
  }
  const styleProps = {
    width,
    height,
    aspectRatio,
    layout,
    objectFit,
    background
  };
  transformedProps.sizes ||= getSizes(width, layout);
  if (!unstyled) {
    transformedProps.style = {
      ...getStyle(styleProps),
      ...transformedProps.style
    };
  }
  if (transformer) {
    transformedProps.srcset = getSrcSet({
      src: url,
      width,
      height,
      aspectRatio,
      layout,
      breakpoints,
      transformer,
      cdn
    });
    const transformed = transformer({ url, width, height });
    if (transformed) {
      url = transformed;
    }
    if (layout === "fullWidth" || layout === "constrained") {
      width = void 0;
      height = void 0;
    }
  }
  if (!url) {
    logError("No URL provided for image");
  }
  return {
    ...transformedProps,
    src: url?.toString(),
    width,
    height
  };
}
function normalizeImageType(type) {
  if (!type) {
    return {};
  }
  if (type.startsWith("image/")) {
    return {
      format: type.slice(6),
      mimeType: type
    };
  }
  return {
    format: type,
    mimeType: `image/${type === "jpg" ? "jpeg" : type}`
  };
}
function transformSourceProps({ media, type, ...props }) {
  let {
    src,
    cdn,
    transformer,
    layout,
    breakpoints,
    width,
    height,
    aspectRatio,
    sizes,
    loading,
    decoding,
    ...rest
  } = transformSharedProps(props);
  const canonical = src ? getCanonicalCdnForUrl(src, cdn) : void 0;
  let url = src;
  if (canonical) {
    url = canonical.url;
    transformer ||= getTransformer(canonical.cdn);
  }
  if (!transformer) {
    return {};
  }
  const { format, mimeType } = normalizeImageType(type);
  sizes ||= getSizes(width, layout);
  const srcset = getSrcSet({
    src: url,
    width,
    height,
    aspectRatio,
    layout,
    breakpoints,
    transformer,
    cdn,
    format
  });
  const transformed = transformer({ url, width, height });
  if (transformed) {
    url = transformed;
  }
  const returnObject = {
    ...rest,
    sizes,
    srcset
  };
  if (media) {
    if (DEBUG) {
      try {
        parse(media);
        returnObject.media = media;
      } catch (e) {
        logError(e.message);
      }
    } else {
      returnObject.media = media;
    }
  }
  if (mimeType) {
    returnObject.type = mimeType;
  }
  return returnObject;
}
function inferImageDimensions(props, imageData) {
  const aspectRatio = props.aspectRatio || imageData.width / imageData.height;
  let { width, height } = props;
  if (!width) {
    if (height) {
      width = height * aspectRatio;
    } else {
      width = imageData.width;
    }
  }
  if (!height) {
    if (width) {
      height = width / aspectRatio;
    } else {
      height = imageData.height;
    }
  }
  return { width, height };
}

const dntGlobals = {
    Buffer: Buffer$1,
};
createMergeProxy(globalThis, dntGlobals);
// deno-lint-ignore ban-types
function createMergeProxy(baseObj, extObj) {
    return new Proxy(baseObj, {
        get(_target, prop, _receiver) {
            if (prop in extObj) {
                return extObj[prop];
            }
            else {
                return baseObj[prop];
            }
        },
        set(_target, prop, value) {
            if (prop in extObj) {
                delete extObj[prop];
            }
            baseObj[prop] = value;
            return true;
        },
        deleteProperty(_target, prop) {
            let success = false;
            if (prop in extObj) {
                delete extObj[prop];
                success = true;
            }
            if (prop in baseObj) {
                delete baseObj[prop];
                success = true;
            }
            return success;
        },
        ownKeys(_target) {
            const baseKeys = Reflect.ownKeys(baseObj);
            const extKeys = Reflect.ownKeys(extObj);
            const extKeysSet = new Set(extKeys);
            return [...baseKeys.filter((k) => !extKeysSet.has(k)), ...extKeys];
        },
        defineProperty(_target, prop, desc) {
            if (prop in extObj) {
                delete extObj[prop];
            }
            Reflect.defineProperty(baseObj, prop, desc);
            return true;
        },
        getOwnPropertyDescriptor(_target, prop) {
            if (prop in extObj) {
                return Reflect.getOwnPropertyDescriptor(extObj, prop);
            }
            else {
                return Reflect.getOwnPropertyDescriptor(baseObj, prop);
            }
        },
        has(_target, prop) {
            return prop in extObj || prop in baseObj;
        },
    });
}

var encoder = {exports: {}};

/*
  Copyright (c) 2008, Adobe Systems Incorporated
  All rights reserved.

  Redistribution and use in source and binary forms, with or without 
  modification, are permitted provided that the following conditions are
  met:

  * Redistributions of source code must retain the above copyright notice, 
    this list of conditions and the following disclaimer.
  
  * Redistributions in binary form must reproduce the above copyright
    notice, this list of conditions and the following disclaimer in the 
    documentation and/or other materials provided with the distribution.
  
  * Neither the name of Adobe Systems Incorporated nor the names of its 
    contributors may be used to endorse or promote products derived from 
    this software without specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
  IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
  THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
  PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR 
  CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
  EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO,
  PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF
  LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING
  NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
  SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

(function (module) {

	function JPEGEncoder(quality) {
		var ffloor = Math.floor;
		var YTable = new Array(64);
		var UVTable = new Array(64);
		var fdtbl_Y = new Array(64);
		var fdtbl_UV = new Array(64);
		var YDC_HT;
		var UVDC_HT;
		var YAC_HT;
		var UVAC_HT;
		
		var bitcode = new Array(65535);
		var category = new Array(65535);
		var outputfDCTQuant = new Array(64);
		var DU = new Array(64);
		var byteout = [];
		var bytenew = 0;
		var bytepos = 7;
		
		var YDU = new Array(64);
		var UDU = new Array(64);
		var VDU = new Array(64);
		var clt = new Array(256);
		var RGB_YUV_TABLE = new Array(2048);
		var currentQuality;
		
		var ZigZag = [
				 0, 1, 5, 6,14,15,27,28,
				 2, 4, 7,13,16,26,29,42,
				 3, 8,12,17,25,30,41,43,
				 9,11,18,24,31,40,44,53,
				10,19,23,32,39,45,52,54,
				20,22,33,38,46,51,55,60,
				21,34,37,47,50,56,59,61,
				35,36,48,49,57,58,62,63
			];
		
		var std_dc_luminance_nrcodes = [0,0,1,5,1,1,1,1,1,1,0,0,0,0,0,0,0];
		var std_dc_luminance_values = [0,1,2,3,4,5,6,7,8,9,10,11];
		var std_ac_luminance_nrcodes = [0,0,2,1,3,3,2,4,3,5,5,4,4,0,0,1,0x7d];
		var std_ac_luminance_values = [
				0x01,0x02,0x03,0x00,0x04,0x11,0x05,0x12,
				0x21,0x31,0x41,0x06,0x13,0x51,0x61,0x07,
				0x22,0x71,0x14,0x32,0x81,0x91,0xa1,0x08,
				0x23,0x42,0xb1,0xc1,0x15,0x52,0xd1,0xf0,
				0x24,0x33,0x62,0x72,0x82,0x09,0x0a,0x16,
				0x17,0x18,0x19,0x1a,0x25,0x26,0x27,0x28,
				0x29,0x2a,0x34,0x35,0x36,0x37,0x38,0x39,
				0x3a,0x43,0x44,0x45,0x46,0x47,0x48,0x49,
				0x4a,0x53,0x54,0x55,0x56,0x57,0x58,0x59,
				0x5a,0x63,0x64,0x65,0x66,0x67,0x68,0x69,
				0x6a,0x73,0x74,0x75,0x76,0x77,0x78,0x79,
				0x7a,0x83,0x84,0x85,0x86,0x87,0x88,0x89,
				0x8a,0x92,0x93,0x94,0x95,0x96,0x97,0x98,
				0x99,0x9a,0xa2,0xa3,0xa4,0xa5,0xa6,0xa7,
				0xa8,0xa9,0xaa,0xb2,0xb3,0xb4,0xb5,0xb6,
				0xb7,0xb8,0xb9,0xba,0xc2,0xc3,0xc4,0xc5,
				0xc6,0xc7,0xc8,0xc9,0xca,0xd2,0xd3,0xd4,
				0xd5,0xd6,0xd7,0xd8,0xd9,0xda,0xe1,0xe2,
				0xe3,0xe4,0xe5,0xe6,0xe7,0xe8,0xe9,0xea,
				0xf1,0xf2,0xf3,0xf4,0xf5,0xf6,0xf7,0xf8,
				0xf9,0xfa
			];
		
		var std_dc_chrominance_nrcodes = [0,0,3,1,1,1,1,1,1,1,1,1,0,0,0,0,0];
		var std_dc_chrominance_values = [0,1,2,3,4,5,6,7,8,9,10,11];
		var std_ac_chrominance_nrcodes = [0,0,2,1,2,4,4,3,4,7,5,4,4,0,1,2,0x77];
		var std_ac_chrominance_values = [
				0x00,0x01,0x02,0x03,0x11,0x04,0x05,0x21,
				0x31,0x06,0x12,0x41,0x51,0x07,0x61,0x71,
				0x13,0x22,0x32,0x81,0x08,0x14,0x42,0x91,
				0xa1,0xb1,0xc1,0x09,0x23,0x33,0x52,0xf0,
				0x15,0x62,0x72,0xd1,0x0a,0x16,0x24,0x34,
				0xe1,0x25,0xf1,0x17,0x18,0x19,0x1a,0x26,
				0x27,0x28,0x29,0x2a,0x35,0x36,0x37,0x38,
				0x39,0x3a,0x43,0x44,0x45,0x46,0x47,0x48,
				0x49,0x4a,0x53,0x54,0x55,0x56,0x57,0x58,
				0x59,0x5a,0x63,0x64,0x65,0x66,0x67,0x68,
				0x69,0x6a,0x73,0x74,0x75,0x76,0x77,0x78,
				0x79,0x7a,0x82,0x83,0x84,0x85,0x86,0x87,
				0x88,0x89,0x8a,0x92,0x93,0x94,0x95,0x96,
				0x97,0x98,0x99,0x9a,0xa2,0xa3,0xa4,0xa5,
				0xa6,0xa7,0xa8,0xa9,0xaa,0xb2,0xb3,0xb4,
				0xb5,0xb6,0xb7,0xb8,0xb9,0xba,0xc2,0xc3,
				0xc4,0xc5,0xc6,0xc7,0xc8,0xc9,0xca,0xd2,
				0xd3,0xd4,0xd5,0xd6,0xd7,0xd8,0xd9,0xda,
				0xe2,0xe3,0xe4,0xe5,0xe6,0xe7,0xe8,0xe9,
				0xea,0xf2,0xf3,0xf4,0xf5,0xf6,0xf7,0xf8,
				0xf9,0xfa
			];
		
		function initQuantTables(sf){
				var YQT = [
					16, 11, 10, 16, 24, 40, 51, 61,
					12, 12, 14, 19, 26, 58, 60, 55,
					14, 13, 16, 24, 40, 57, 69, 56,
					14, 17, 22, 29, 51, 87, 80, 62,
					18, 22, 37, 56, 68,109,103, 77,
					24, 35, 55, 64, 81,104,113, 92,
					49, 64, 78, 87,103,121,120,101,
					72, 92, 95, 98,112,100,103, 99
				];
				
				for (var i = 0; i < 64; i++) {
					var t = ffloor((YQT[i]*sf+50)/100);
					if (t < 1) {
						t = 1;
					} else if (t > 255) {
						t = 255;
					}
					YTable[ZigZag[i]] = t;
				}
				var UVQT = [
					17, 18, 24, 47, 99, 99, 99, 99,
					18, 21, 26, 66, 99, 99, 99, 99,
					24, 26, 56, 99, 99, 99, 99, 99,
					47, 66, 99, 99, 99, 99, 99, 99,
					99, 99, 99, 99, 99, 99, 99, 99,
					99, 99, 99, 99, 99, 99, 99, 99,
					99, 99, 99, 99, 99, 99, 99, 99,
					99, 99, 99, 99, 99, 99, 99, 99
				];
				for (var j = 0; j < 64; j++) {
					var u = ffloor((UVQT[j]*sf+50)/100);
					if (u < 1) {
						u = 1;
					} else if (u > 255) {
						u = 255;
					}
					UVTable[ZigZag[j]] = u;
				}
				var aasf = [
					1.0, 1.387039845, 1.306562965, 1.175875602,
					1.0, 0.785694958, 0.541196100, 0.275899379
				];
				var k = 0;
				for (var row = 0; row < 8; row++)
				{
					for (var col = 0; col < 8; col++)
					{
						fdtbl_Y[k]  = (1.0 / (YTable [ZigZag[k]] * aasf[row] * aasf[col] * 8.0));
						fdtbl_UV[k] = (1.0 / (UVTable[ZigZag[k]] * aasf[row] * aasf[col] * 8.0));
						k++;
					}
				}
			}
			
			function computeHuffmanTbl(nrcodes, std_table){
				var codevalue = 0;
				var pos_in_table = 0;
				var HT = new Array();
				for (var k = 1; k <= 16; k++) {
					for (var j = 1; j <= nrcodes[k]; j++) {
						HT[std_table[pos_in_table]] = [];
						HT[std_table[pos_in_table]][0] = codevalue;
						HT[std_table[pos_in_table]][1] = k;
						pos_in_table++;
						codevalue++;
					}
					codevalue*=2;
				}
				return HT;
			}
			
			function initHuffmanTbl()
			{
				YDC_HT = computeHuffmanTbl(std_dc_luminance_nrcodes,std_dc_luminance_values);
				UVDC_HT = computeHuffmanTbl(std_dc_chrominance_nrcodes,std_dc_chrominance_values);
				YAC_HT = computeHuffmanTbl(std_ac_luminance_nrcodes,std_ac_luminance_values);
				UVAC_HT = computeHuffmanTbl(std_ac_chrominance_nrcodes,std_ac_chrominance_values);
			}
		
			function initCategoryNumber()
			{
				var nrlower = 1;
				var nrupper = 2;
				for (var cat = 1; cat <= 15; cat++) {
					//Positive numbers
					for (var nr = nrlower; nr<nrupper; nr++) {
						category[32767+nr] = cat;
						bitcode[32767+nr] = [];
						bitcode[32767+nr][1] = cat;
						bitcode[32767+nr][0] = nr;
					}
					//Negative numbers
					for (var nrneg =-(nrupper-1); nrneg<=-nrlower; nrneg++) {
						category[32767+nrneg] = cat;
						bitcode[32767+nrneg] = [];
						bitcode[32767+nrneg][1] = cat;
						bitcode[32767+nrneg][0] = nrupper-1+nrneg;
					}
					nrlower <<= 1;
					nrupper <<= 1;
				}
			}
			
			function initRGBYUVTable() {
				for(var i = 0; i < 256;i++) {
					RGB_YUV_TABLE[i]      		=  19595 * i;
					RGB_YUV_TABLE[(i+ 256)>>0] 	=  38470 * i;
					RGB_YUV_TABLE[(i+ 512)>>0] 	=   7471 * i + 0x8000;
					RGB_YUV_TABLE[(i+ 768)>>0] 	= -11059 * i;
					RGB_YUV_TABLE[(i+1024)>>0] 	= -21709 * i;
					RGB_YUV_TABLE[(i+1280)>>0] 	=  32768 * i + 0x807FFF;
					RGB_YUV_TABLE[(i+1536)>>0] 	= -27439 * i;
					RGB_YUV_TABLE[(i+1792)>>0] 	= - 5329 * i;
				}
			}
			
			// IO functions
			function writeBits(bs)
			{
				var value = bs[0];
				var posval = bs[1]-1;
				while ( posval >= 0 ) {
					if (value & (1 << posval) ) {
						bytenew |= (1 << bytepos);
					}
					posval--;
					bytepos--;
					if (bytepos < 0) {
						if (bytenew == 0xFF) {
							writeByte(0xFF);
							writeByte(0);
						}
						else {
							writeByte(bytenew);
						}
						bytepos=7;
						bytenew=0;
					}
				}
			}
		
			function writeByte(value)
			{
				//byteout.push(clt[value]); // write char directly instead of converting later
	      byteout.push(value);
			}
		
			function writeWord(value)
			{
				writeByte((value>>8)&0xFF);
				writeByte((value   )&0xFF);
			}
			
			// DCT & quantization core
			function fDCTQuant(data, fdtbl)
			{
				var d0, d1, d2, d3, d4, d5, d6, d7;
				/* Pass 1: process rows. */
				var dataOff=0;
				var i;
				var I8 = 8;
				var I64 = 64;
				for (i=0; i<I8; ++i)
				{
					d0 = data[dataOff];
					d1 = data[dataOff+1];
					d2 = data[dataOff+2];
					d3 = data[dataOff+3];
					d4 = data[dataOff+4];
					d5 = data[dataOff+5];
					d6 = data[dataOff+6];
					d7 = data[dataOff+7];
					
					var tmp0 = d0 + d7;
					var tmp7 = d0 - d7;
					var tmp1 = d1 + d6;
					var tmp6 = d1 - d6;
					var tmp2 = d2 + d5;
					var tmp5 = d2 - d5;
					var tmp3 = d3 + d4;
					var tmp4 = d3 - d4;
		
					/* Even part */
					var tmp10 = tmp0 + tmp3;	/* phase 2 */
					var tmp13 = tmp0 - tmp3;
					var tmp11 = tmp1 + tmp2;
					var tmp12 = tmp1 - tmp2;
		
					data[dataOff] = tmp10 + tmp11; /* phase 3 */
					data[dataOff+4] = tmp10 - tmp11;
		
					var z1 = (tmp12 + tmp13) * 0.707106781; /* c4 */
					data[dataOff+2] = tmp13 + z1; /* phase 5 */
					data[dataOff+6] = tmp13 - z1;
		
					/* Odd part */
					tmp10 = tmp4 + tmp5; /* phase 2 */
					tmp11 = tmp5 + tmp6;
					tmp12 = tmp6 + tmp7;
		
					/* The rotator is modified from fig 4-8 to avoid extra negations. */
					var z5 = (tmp10 - tmp12) * 0.382683433; /* c6 */
					var z2 = 0.541196100 * tmp10 + z5; /* c2-c6 */
					var z4 = 1.306562965 * tmp12 + z5; /* c2+c6 */
					var z3 = tmp11 * 0.707106781; /* c4 */
		
					var z11 = tmp7 + z3;	/* phase 5 */
					var z13 = tmp7 - z3;
		
					data[dataOff+5] = z13 + z2;	/* phase 6 */
					data[dataOff+3] = z13 - z2;
					data[dataOff+1] = z11 + z4;
					data[dataOff+7] = z11 - z4;
		
					dataOff += 8; /* advance pointer to next row */
				}
		
				/* Pass 2: process columns. */
				dataOff = 0;
				for (i=0; i<I8; ++i)
				{
					d0 = data[dataOff];
					d1 = data[dataOff + 8];
					d2 = data[dataOff + 16];
					d3 = data[dataOff + 24];
					d4 = data[dataOff + 32];
					d5 = data[dataOff + 40];
					d6 = data[dataOff + 48];
					d7 = data[dataOff + 56];
					
					var tmp0p2 = d0 + d7;
					var tmp7p2 = d0 - d7;
					var tmp1p2 = d1 + d6;
					var tmp6p2 = d1 - d6;
					var tmp2p2 = d2 + d5;
					var tmp5p2 = d2 - d5;
					var tmp3p2 = d3 + d4;
					var tmp4p2 = d3 - d4;
		
					/* Even part */
					var tmp10p2 = tmp0p2 + tmp3p2;	/* phase 2 */
					var tmp13p2 = tmp0p2 - tmp3p2;
					var tmp11p2 = tmp1p2 + tmp2p2;
					var tmp12p2 = tmp1p2 - tmp2p2;
		
					data[dataOff] = tmp10p2 + tmp11p2; /* phase 3 */
					data[dataOff+32] = tmp10p2 - tmp11p2;
		
					var z1p2 = (tmp12p2 + tmp13p2) * 0.707106781; /* c4 */
					data[dataOff+16] = tmp13p2 + z1p2; /* phase 5 */
					data[dataOff+48] = tmp13p2 - z1p2;
		
					/* Odd part */
					tmp10p2 = tmp4p2 + tmp5p2; /* phase 2 */
					tmp11p2 = tmp5p2 + tmp6p2;
					tmp12p2 = tmp6p2 + tmp7p2;
		
					/* The rotator is modified from fig 4-8 to avoid extra negations. */
					var z5p2 = (tmp10p2 - tmp12p2) * 0.382683433; /* c6 */
					var z2p2 = 0.541196100 * tmp10p2 + z5p2; /* c2-c6 */
					var z4p2 = 1.306562965 * tmp12p2 + z5p2; /* c2+c6 */
					var z3p2 = tmp11p2 * 0.707106781; /* c4 */
		
					var z11p2 = tmp7p2 + z3p2;	/* phase 5 */
					var z13p2 = tmp7p2 - z3p2;
		
					data[dataOff+40] = z13p2 + z2p2; /* phase 6 */
					data[dataOff+24] = z13p2 - z2p2;
					data[dataOff+ 8] = z11p2 + z4p2;
					data[dataOff+56] = z11p2 - z4p2;
		
					dataOff++; /* advance pointer to next column */
				}
		
				// Quantize/descale the coefficients
				var fDCTQuant;
				for (i=0; i<I64; ++i)
				{
					// Apply the quantization and scaling factor & Round to nearest integer
					fDCTQuant = data[i]*fdtbl[i];
					outputfDCTQuant[i] = (fDCTQuant > 0.0) ? ((fDCTQuant + 0.5)|0) : ((fDCTQuant - 0.5)|0);
					//outputfDCTQuant[i] = fround(fDCTQuant);

				}
				return outputfDCTQuant;
			}
			
			function writeAPP0()
			{
				writeWord(0xFFE0); // marker
				writeWord(16); // length
				writeByte(0x4A); // J
				writeByte(0x46); // F
				writeByte(0x49); // I
				writeByte(0x46); // F
				writeByte(0); // = "JFIF",'\0'
				writeByte(1); // versionhi
				writeByte(1); // versionlo
				writeByte(0); // xyunits
				writeWord(1); // xdensity
				writeWord(1); // ydensity
				writeByte(0); // thumbnwidth
				writeByte(0); // thumbnheight
			}

			function writeAPP1(exifBuffer) {
				if (!exifBuffer) return;

				writeWord(0xFFE1); // APP1 marker

				if (exifBuffer[0] === 0x45 &&
						exifBuffer[1] === 0x78 &&
						exifBuffer[2] === 0x69 &&
						exifBuffer[3] === 0x66) {
					// Buffer already starts with EXIF, just use it directly
					writeWord(exifBuffer.length + 2); // length is buffer + length itself!
				} else {
					// Buffer doesn't start with EXIF, write it for them
					writeWord(exifBuffer.length + 5 + 2); // length is buffer + EXIF\0 + length itself!
					writeByte(0x45); // E
					writeByte(0x78); // X
					writeByte(0x69); // I
					writeByte(0x66); // F
					writeByte(0); // = "EXIF",'\0'
				}

				for (var i = 0; i < exifBuffer.length; i++) {
					writeByte(exifBuffer[i]);
				}
			}

			function writeSOF0(width, height)
			{
				writeWord(0xFFC0); // marker
				writeWord(17);   // length, truecolor YUV JPG
				writeByte(8);    // precision
				writeWord(height);
				writeWord(width);
				writeByte(3);    // nrofcomponents
				writeByte(1);    // IdY
				writeByte(0x11); // HVY
				writeByte(0);    // QTY
				writeByte(2);    // IdU
				writeByte(0x11); // HVU
				writeByte(1);    // QTU
				writeByte(3);    // IdV
				writeByte(0x11); // HVV
				writeByte(1);    // QTV
			}
		
			function writeDQT()
			{
				writeWord(0xFFDB); // marker
				writeWord(132);	   // length
				writeByte(0);
				for (var i=0; i<64; i++) {
					writeByte(YTable[i]);
				}
				writeByte(1);
				for (var j=0; j<64; j++) {
					writeByte(UVTable[j]);
				}
			}
		
			function writeDHT()
			{
				writeWord(0xFFC4); // marker
				writeWord(0x01A2); // length
		
				writeByte(0); // HTYDCinfo
				for (var i=0; i<16; i++) {
					writeByte(std_dc_luminance_nrcodes[i+1]);
				}
				for (var j=0; j<=11; j++) {
					writeByte(std_dc_luminance_values[j]);
				}
		
				writeByte(0x10); // HTYACinfo
				for (var k=0; k<16; k++) {
					writeByte(std_ac_luminance_nrcodes[k+1]);
				}
				for (var l=0; l<=161; l++) {
					writeByte(std_ac_luminance_values[l]);
				}
		
				writeByte(1); // HTUDCinfo
				for (var m=0; m<16; m++) {
					writeByte(std_dc_chrominance_nrcodes[m+1]);
				}
				for (var n=0; n<=11; n++) {
					writeByte(std_dc_chrominance_values[n]);
				}
		
				writeByte(0x11); // HTUACinfo
				for (var o=0; o<16; o++) {
					writeByte(std_ac_chrominance_nrcodes[o+1]);
				}
				for (var p=0; p<=161; p++) {
					writeByte(std_ac_chrominance_values[p]);
				}
			}
			
			function writeCOM(comments)
			{
				if (typeof comments === "undefined" || comments.constructor !== Array) return;
				comments.forEach(e => {
					if (typeof e !== "string") return;
					writeWord(0xFFFE); // marker
					var l = e.length;
					writeWord(l + 2); // length itself as well
					var i;
					for (i = 0; i < l; i++)
						writeByte(e.charCodeAt(i));
				});
			}
		
			function writeSOS()
			{
				writeWord(0xFFDA); // marker
				writeWord(12); // length
				writeByte(3); // nrofcomponents
				writeByte(1); // IdY
				writeByte(0); // HTY
				writeByte(2); // IdU
				writeByte(0x11); // HTU
				writeByte(3); // IdV
				writeByte(0x11); // HTV
				writeByte(0); // Ss
				writeByte(0x3f); // Se
				writeByte(0); // Bf
			}
			
			function processDU(CDU, fdtbl, DC, HTDC, HTAC){
				var EOB = HTAC[0x00];
				var M16zeroes = HTAC[0xF0];
				var pos;
				var I16 = 16;
				var I63 = 63;
				var I64 = 64;
				var DU_DCT = fDCTQuant(CDU, fdtbl);
				//ZigZag reorder
				for (var j=0;j<I64;++j) {
					DU[ZigZag[j]]=DU_DCT[j];
				}
				var Diff = DU[0] - DC; DC = DU[0];
				//Encode DC
				if (Diff==0) {
					writeBits(HTDC[0]); // Diff might be 0
				} else {
					pos = 32767+Diff;
					writeBits(HTDC[category[pos]]);
					writeBits(bitcode[pos]);
				}
				//Encode ACs
				var end0pos = 63; // was const... which is crazy
				for (; (end0pos>0)&&(DU[end0pos]==0); end0pos--) {}				//end0pos = first element in reverse order !=0
				if ( end0pos == 0) {
					writeBits(EOB);
					return DC;
				}
				var i = 1;
				var lng;
				while ( i <= end0pos ) {
					var startpos = i;
					for (; (DU[i]==0) && (i<=end0pos); ++i) {}
					var nrzeroes = i-startpos;
					if ( nrzeroes >= I16 ) {
						lng = nrzeroes>>4;
						for (var nrmarker=1; nrmarker <= lng; ++nrmarker)
							writeBits(M16zeroes);
						nrzeroes = nrzeroes&0xF;
					}
					pos = 32767+DU[i];
					writeBits(HTAC[(nrzeroes<<4)+category[pos]]);
					writeBits(bitcode[pos]);
					i++;
				}
				if ( end0pos != I63 ) {
					writeBits(EOB);
				}
				return DC;
			}

			function initCharLookupTable(){
				var sfcc = String.fromCharCode;
				for(var i=0; i < 256; i++){ ///// ACHTUNG // 255
					clt[i] = sfcc(i);
				}
			}
			
			this.encode = function(image,quality) // image data object
			{
				new Date().getTime();
				
				if(quality) setQuality(quality);
				
				// Initialize bit writer
				byteout = new Array();
				bytenew=0;
				bytepos=7;
		
				// Add JPEG headers
				writeWord(0xFFD8); // SOI
				writeAPP0();
				writeCOM(image.comments);
				writeAPP1(image.exifBuffer);
				writeDQT();
				writeSOF0(image.width,image.height);
				writeDHT();
				writeSOS();

		
				// Encode 8x8 macroblocks
				var DCY=0;
				var DCU=0;
				var DCV=0;
				
				bytenew=0;
				bytepos=7;
				
				
				this.encode.displayName = "_encode_";

				var imageData = image.data;
				var width = image.width;
				var height = image.height;

				var quadWidth = width*4;
				
				var x, y = 0;
				var r, g, b;
				var start,p, col,row,pos;
				while(y < height){
					x = 0;
					while(x < quadWidth){
					start = quadWidth * y + x;
					p = start;
					col = -1;
					row = 0;
					
					for(pos=0; pos < 64; pos++){
						row = pos >> 3;// /8
						col = ( pos & 7 ) * 4; // %8
						p = start + ( row * quadWidth ) + col;		
						
						if(y+row >= height){ // padding bottom
							p-= (quadWidth*(y+1+row-height));
						}

						if(x+col >= quadWidth){ // padding right	
							p-= ((x+col) - quadWidth +4);
						}
						
						r = imageData[ p++ ];
						g = imageData[ p++ ];
						b = imageData[ p++ ];
						
						
						/* // calculate YUV values dynamically
						YDU[pos]=((( 0.29900)*r+( 0.58700)*g+( 0.11400)*b))-128; //-0x80
						UDU[pos]=(((-0.16874)*r+(-0.33126)*g+( 0.50000)*b));
						VDU[pos]=((( 0.50000)*r+(-0.41869)*g+(-0.08131)*b));
						*/
						
						// use lookup table (slightly faster)
						YDU[pos] = ((RGB_YUV_TABLE[r]             + RGB_YUV_TABLE[(g +  256)>>0] + RGB_YUV_TABLE[(b +  512)>>0]) >> 16)-128;
						UDU[pos] = ((RGB_YUV_TABLE[(r +  768)>>0] + RGB_YUV_TABLE[(g + 1024)>>0] + RGB_YUV_TABLE[(b + 1280)>>0]) >> 16)-128;
						VDU[pos] = ((RGB_YUV_TABLE[(r + 1280)>>0] + RGB_YUV_TABLE[(g + 1536)>>0] + RGB_YUV_TABLE[(b + 1792)>>0]) >> 16)-128;

					}
					
					DCY = processDU(YDU, fdtbl_Y, DCY, YDC_HT, YAC_HT);
					DCU = processDU(UDU, fdtbl_UV, DCU, UVDC_HT, UVAC_HT);
					DCV = processDU(VDU, fdtbl_UV, DCV, UVDC_HT, UVAC_HT);
					x+=32;
					}
					y+=8;
				}
				
				
				////////////////////////////////////////////////////////////////
		
				// Do the bit alignment of the EOI marker
				if ( bytepos >= 0 ) {
					var fillbits = [];
					fillbits[1] = bytepos+1;
					fillbits[0] = (1<<(bytepos+1))-1;
					writeBits(fillbits);
				}
		
				writeWord(0xFFD9); //EOI
	      return Buffer.from(byteout);
		};
		
		function setQuality(quality){
			if (quality <= 0) {
				quality = 1;
			}
			if (quality > 100) {
				quality = 100;
			}
			
			if(currentQuality == quality) return // don't recalc if unchanged
			
			var sf = 0;
			if (quality < 50) {
				sf = Math.floor(5000 / quality);
			} else {
				sf = Math.floor(200 - quality*2);
			}
			
			initQuantTables(sf);
			currentQuality = quality;
			//console.log('Quality set to: '+quality +'%');
		}
		
		function init(){
			var time_start = new Date().getTime();
			if(!quality) quality = 50;
			// Create tables
			initCharLookupTable();
			initHuffmanTbl();
			initCategoryNumber();
			initRGBYUVTable();
			
			setQuality(quality);
			new Date().getTime() - time_start;
	    	//console.log('Initialization '+ duration + 'ms');
		}
		
		init();
		
	}
	{
		module.exports = encode;
	}

	function encode(imgData, qu) {
	  if (typeof qu === 'undefined') qu = 50;
	  var encoder = new JPEGEncoder(qu);
		var data = encoder.encode(imgData, qu);
	  return {
	    data: data,
	    width: imgData.width,
	    height: imgData.height,
	  };
	}
} (encoder));

var encoderExports = encoder.exports;

var decoder = {exports: {}};

/* -*- tab-width: 2; indent-tabs-mode: nil; c-basic-offset: 2 -*- /
/* vim: set shiftwidth=2 tabstop=2 autoindent cindent expandtab: */

(function (module) {
	/*
	   Copyright 2011 notmasteryet

	   Licensed under the Apache License, Version 2.0 (the "License");
	   you may not use this file except in compliance with the License.
	   You may obtain a copy of the License at

	       http://www.apache.org/licenses/LICENSE-2.0

	   Unless required by applicable law or agreed to in writing, software
	   distributed under the License is distributed on an "AS IS" BASIS,
	   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
	   See the License for the specific language governing permissions and
	   limitations under the License.
	*/

	// - The JPEG specification can be found in the ITU CCITT Recommendation T.81
	//   (www.w3.org/Graphics/JPEG/itu-t81.pdf)
	// - The JFIF specification can be found in the JPEG File Interchange Format
	//   (www.w3.org/Graphics/JPEG/jfif3.pdf)
	// - The Adobe Application-Specific JPEG markers in the Supporting the DCT Filters
	//   in PostScript Level 2, Technical Note #5116
	//   (partners.adobe.com/public/developer/en/ps/sdk/5116.DCT_Filter.pdf)

	var JpegImage = (function jpegImage() {
	  var dctZigZag = new Int32Array([
	     0,
	     1,  8,
	    16,  9,  2,
	     3, 10, 17, 24,
	    32, 25, 18, 11, 4,
	     5, 12, 19, 26, 33, 40,
	    48, 41, 34, 27, 20, 13,  6,
	     7, 14, 21, 28, 35, 42, 49, 56,
	    57, 50, 43, 36, 29, 22, 15,
	    23, 30, 37, 44, 51, 58,
	    59, 52, 45, 38, 31,
	    39, 46, 53, 60,
	    61, 54, 47,
	    55, 62,
	    63
	  ]);

	  var dctCos1  =  4017;   // cos(pi/16)
	  var dctSin1  =   799;   // sin(pi/16)
	  var dctCos3  =  3406;   // cos(3*pi/16)
	  var dctSin3  =  2276;   // sin(3*pi/16)
	  var dctCos6  =  1567;   // cos(6*pi/16)
	  var dctSin6  =  3784;   // sin(6*pi/16)
	  var dctSqrt2 =  5793;   // sqrt(2)
	  var dctSqrt1d2 = 2896;  // sqrt(2) / 2

	  function constructor() {
	  }

	  function buildHuffmanTable(codeLengths, values) {
	    var k = 0, code = [], i, j, length = 16;
	    while (length > 0 && !codeLengths[length - 1])
	      length--;
	    code.push({children: [], index: 0});
	    var p = code[0], q;
	    for (i = 0; i < length; i++) {
	      for (j = 0; j < codeLengths[i]; j++) {
	        p = code.pop();
	        p.children[p.index] = values[k];
	        while (p.index > 0) {
	          if (code.length === 0)
	            throw new Error('Could not recreate Huffman Table');
	          p = code.pop();
	        }
	        p.index++;
	        code.push(p);
	        while (code.length <= i) {
	          code.push(q = {children: [], index: 0});
	          p.children[p.index] = q.children;
	          p = q;
	        }
	        k++;
	      }
	      if (i + 1 < length) {
	        // p here points to last code
	        code.push(q = {children: [], index: 0});
	        p.children[p.index] = q.children;
	        p = q;
	      }
	    }
	    return code[0].children;
	  }

	  function decodeScan(data, offset,
	                      frame, components, resetInterval,
	                      spectralStart, spectralEnd,
	                      successivePrev, successive, opts) {
	    frame.precision;
	    frame.samplesPerLine;
	    frame.scanLines;
	    var mcusPerLine = frame.mcusPerLine;
	    var progressive = frame.progressive;
	    frame.maxH; frame.maxV;

	    var startOffset = offset, bitsData = 0, bitsCount = 0;
	    function readBit() {
	      if (bitsCount > 0) {
	        bitsCount--;
	        return (bitsData >> bitsCount) & 1;
	      }
	      bitsData = data[offset++];
	      if (bitsData == 0xFF) {
	        var nextByte = data[offset++];
	        if (nextByte) {
	          throw new Error("unexpected marker: " + ((bitsData << 8) | nextByte).toString(16));
	        }
	        // unstuff 0
	      }
	      bitsCount = 7;
	      return bitsData >>> 7;
	    }
	    function decodeHuffman(tree) {
	      var node = tree, bit;
	      while ((bit = readBit()) !== null) {
	        node = node[bit];
	        if (typeof node === 'number')
	          return node;
	        if (typeof node !== 'object')
	          throw new Error("invalid huffman sequence");
	      }
	      return null;
	    }
	    function receive(length) {
	      var n = 0;
	      while (length > 0) {
	        var bit = readBit();
	        if (bit === null) return;
	        n = (n << 1) | bit;
	        length--;
	      }
	      return n;
	    }
	    function receiveAndExtend(length) {
	      var n = receive(length);
	      if (n >= 1 << (length - 1))
	        return n;
	      return n + (-1 << length) + 1;
	    }
	    function decodeBaseline(component, zz) {
	      var t = decodeHuffman(component.huffmanTableDC);
	      var diff = t === 0 ? 0 : receiveAndExtend(t);
	      zz[0]= (component.pred += diff);
	      var k = 1;
	      while (k < 64) {
	        var rs = decodeHuffman(component.huffmanTableAC);
	        var s = rs & 15, r = rs >> 4;
	        if (s === 0) {
	          if (r < 15)
	            break;
	          k += 16;
	          continue;
	        }
	        k += r;
	        var z = dctZigZag[k];
	        zz[z] = receiveAndExtend(s);
	        k++;
	      }
	    }
	    function decodeDCFirst(component, zz) {
	      var t = decodeHuffman(component.huffmanTableDC);
	      var diff = t === 0 ? 0 : (receiveAndExtend(t) << successive);
	      zz[0] = (component.pred += diff);
	    }
	    function decodeDCSuccessive(component, zz) {
	      zz[0] |= readBit() << successive;
	    }
	    var eobrun = 0;
	    function decodeACFirst(component, zz) {
	      if (eobrun > 0) {
	        eobrun--;
	        return;
	      }
	      var k = spectralStart, e = spectralEnd;
	      while (k <= e) {
	        var rs = decodeHuffman(component.huffmanTableAC);
	        var s = rs & 15, r = rs >> 4;
	        if (s === 0) {
	          if (r < 15) {
	            eobrun = receive(r) + (1 << r) - 1;
	            break;
	          }
	          k += 16;
	          continue;
	        }
	        k += r;
	        var z = dctZigZag[k];
	        zz[z] = receiveAndExtend(s) * (1 << successive);
	        k++;
	      }
	    }
	    var successiveACState = 0, successiveACNextValue;
	    function decodeACSuccessive(component, zz) {
	      var k = spectralStart, e = spectralEnd, r = 0;
	      while (k <= e) {
	        var z = dctZigZag[k];
	        var direction = zz[z] < 0 ? -1 : 1;
	        switch (successiveACState) {
	        case 0: // initial state
	          var rs = decodeHuffman(component.huffmanTableAC);
	          var s = rs & 15, r = rs >> 4;
	          if (s === 0) {
	            if (r < 15) {
	              eobrun = receive(r) + (1 << r);
	              successiveACState = 4;
	            } else {
	              r = 16;
	              successiveACState = 1;
	            }
	          } else {
	            if (s !== 1)
	              throw new Error("invalid ACn encoding");
	            successiveACNextValue = receiveAndExtend(s);
	            successiveACState = r ? 2 : 3;
	          }
	          continue;
	        case 1: // skipping r zero items
	        case 2:
	          if (zz[z])
	            zz[z] += (readBit() << successive) * direction;
	          else {
	            r--;
	            if (r === 0)
	              successiveACState = successiveACState == 2 ? 3 : 0;
	          }
	          break;
	        case 3: // set value for a zero item
	          if (zz[z])
	            zz[z] += (readBit() << successive) * direction;
	          else {
	            zz[z] = successiveACNextValue << successive;
	            successiveACState = 0;
	          }
	          break;
	        case 4: // eob
	          if (zz[z])
	            zz[z] += (readBit() << successive) * direction;
	          break;
	        }
	        k++;
	      }
	      if (successiveACState === 4) {
	        eobrun--;
	        if (eobrun === 0)
	          successiveACState = 0;
	      }
	    }
	    function decodeMcu(component, decode, mcu, row, col) {
	      var mcuRow = (mcu / mcusPerLine) | 0;
	      var mcuCol = mcu % mcusPerLine;
	      var blockRow = mcuRow * component.v + row;
	      var blockCol = mcuCol * component.h + col;
	      // If the block is missing and we're in tolerant mode, just skip it.
	      if (component.blocks[blockRow] === undefined && opts.tolerantDecoding)
	        return;
	      decode(component, component.blocks[blockRow][blockCol]);
	    }
	    function decodeBlock(component, decode, mcu) {
	      var blockRow = (mcu / component.blocksPerLine) | 0;
	      var blockCol = mcu % component.blocksPerLine;
	      // If the block is missing and we're in tolerant mode, just skip it.
	      if (component.blocks[blockRow] === undefined && opts.tolerantDecoding)
	        return;
	      decode(component, component.blocks[blockRow][blockCol]);
	    }

	    var componentsLength = components.length;
	    var component, i, j, k, n;
	    var decodeFn;
	    if (progressive) {
	      if (spectralStart === 0)
	        decodeFn = successivePrev === 0 ? decodeDCFirst : decodeDCSuccessive;
	      else
	        decodeFn = successivePrev === 0 ? decodeACFirst : decodeACSuccessive;
	    } else {
	      decodeFn = decodeBaseline;
	    }

	    var mcu = 0, marker;
	    var mcuExpected;
	    if (componentsLength == 1) {
	      mcuExpected = components[0].blocksPerLine * components[0].blocksPerColumn;
	    } else {
	      mcuExpected = mcusPerLine * frame.mcusPerColumn;
	    }
	    if (!resetInterval) resetInterval = mcuExpected;

	    var h, v;
	    while (mcu < mcuExpected) {
	      // reset interval stuff
	      for (i = 0; i < componentsLength; i++)
	        components[i].pred = 0;
	      eobrun = 0;

	      if (componentsLength == 1) {
	        component = components[0];
	        for (n = 0; n < resetInterval; n++) {
	          decodeBlock(component, decodeFn, mcu);
	          mcu++;
	        }
	      } else {
	        for (n = 0; n < resetInterval; n++) {
	          for (i = 0; i < componentsLength; i++) {
	            component = components[i];
	            h = component.h;
	            v = component.v;
	            for (j = 0; j < v; j++) {
	              for (k = 0; k < h; k++) {
	                decodeMcu(component, decodeFn, mcu, j, k);
	              }
	            }
	          }
	          mcu++;

	          // If we've reached our expected MCU's, stop decoding
	          if (mcu === mcuExpected) break;
	        }
	      }

	      if (mcu === mcuExpected) {
	        // Skip trailing bytes at the end of the scan - until we reach the next marker
	        do {
	          if (data[offset] === 0xFF) {
	            if (data[offset + 1] !== 0x00) {
	              break;
	            }
	          }
	          offset += 1;
	        } while (offset < data.length - 2);
	      }

	      // find marker
	      bitsCount = 0;
	      marker = (data[offset] << 8) | data[offset + 1];
	      if (marker < 0xFF00) {
	        throw new Error("marker was not found");
	      }

	      if (marker >= 0xFFD0 && marker <= 0xFFD7) { // RSTx
	        offset += 2;
	      }
	      else
	        break;
	    }

	    return offset - startOffset;
	  }

	  function buildComponentData(frame, component) {
	    var lines = [];
	    var blocksPerLine = component.blocksPerLine;
	    var blocksPerColumn = component.blocksPerColumn;
	    var samplesPerLine = blocksPerLine << 3;
	    // Only 1 used per invocation of this function and garbage collected after invocation, so no need to account for its memory footprint.
	    var R = new Int32Array(64), r = new Uint8Array(64);

	    // A port of poppler's IDCT method which in turn is taken from:
	    //   Christoph Loeffler, Adriaan Ligtenberg, George S. Moschytz,
	    //   "Practical Fast 1-D DCT Algorithms with 11 Multiplications",
	    //   IEEE Intl. Conf. on Acoustics, Speech & Signal Processing, 1989,
	    //   988-991.
	    function quantizeAndInverse(zz, dataOut, dataIn) {
	      var qt = component.quantizationTable;
	      var v0, v1, v2, v3, v4, v5, v6, v7, t;
	      var p = dataIn;
	      var i;

	      // dequant
	      for (i = 0; i < 64; i++)
	        p[i] = zz[i] * qt[i];

	      // inverse DCT on rows
	      for (i = 0; i < 8; ++i) {
	        var row = 8 * i;

	        // check for all-zero AC coefficients
	        if (p[1 + row] == 0 && p[2 + row] == 0 && p[3 + row] == 0 &&
	            p[4 + row] == 0 && p[5 + row] == 0 && p[6 + row] == 0 &&
	            p[7 + row] == 0) {
	          t = (dctSqrt2 * p[0 + row] + 512) >> 10;
	          p[0 + row] = t;
	          p[1 + row] = t;
	          p[2 + row] = t;
	          p[3 + row] = t;
	          p[4 + row] = t;
	          p[5 + row] = t;
	          p[6 + row] = t;
	          p[7 + row] = t;
	          continue;
	        }

	        // stage 4
	        v0 = (dctSqrt2 * p[0 + row] + 128) >> 8;
	        v1 = (dctSqrt2 * p[4 + row] + 128) >> 8;
	        v2 = p[2 + row];
	        v3 = p[6 + row];
	        v4 = (dctSqrt1d2 * (p[1 + row] - p[7 + row]) + 128) >> 8;
	        v7 = (dctSqrt1d2 * (p[1 + row] + p[7 + row]) + 128) >> 8;
	        v5 = p[3 + row] << 4;
	        v6 = p[5 + row] << 4;

	        // stage 3
	        t = (v0 - v1+ 1) >> 1;
	        v0 = (v0 + v1 + 1) >> 1;
	        v1 = t;
	        t = (v2 * dctSin6 + v3 * dctCos6 + 128) >> 8;
	        v2 = (v2 * dctCos6 - v3 * dctSin6 + 128) >> 8;
	        v3 = t;
	        t = (v4 - v6 + 1) >> 1;
	        v4 = (v4 + v6 + 1) >> 1;
	        v6 = t;
	        t = (v7 + v5 + 1) >> 1;
	        v5 = (v7 - v5 + 1) >> 1;
	        v7 = t;

	        // stage 2
	        t = (v0 - v3 + 1) >> 1;
	        v0 = (v0 + v3 + 1) >> 1;
	        v3 = t;
	        t = (v1 - v2 + 1) >> 1;
	        v1 = (v1 + v2 + 1) >> 1;
	        v2 = t;
	        t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12;
	        v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12;
	        v7 = t;
	        t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12;
	        v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12;
	        v6 = t;

	        // stage 1
	        p[0 + row] = v0 + v7;
	        p[7 + row] = v0 - v7;
	        p[1 + row] = v1 + v6;
	        p[6 + row] = v1 - v6;
	        p[2 + row] = v2 + v5;
	        p[5 + row] = v2 - v5;
	        p[3 + row] = v3 + v4;
	        p[4 + row] = v3 - v4;
	      }

	      // inverse DCT on columns
	      for (i = 0; i < 8; ++i) {
	        var col = i;

	        // check for all-zero AC coefficients
	        if (p[1*8 + col] == 0 && p[2*8 + col] == 0 && p[3*8 + col] == 0 &&
	            p[4*8 + col] == 0 && p[5*8 + col] == 0 && p[6*8 + col] == 0 &&
	            p[7*8 + col] == 0) {
	          t = (dctSqrt2 * dataIn[i+0] + 8192) >> 14;
	          p[0*8 + col] = t;
	          p[1*8 + col] = t;
	          p[2*8 + col] = t;
	          p[3*8 + col] = t;
	          p[4*8 + col] = t;
	          p[5*8 + col] = t;
	          p[6*8 + col] = t;
	          p[7*8 + col] = t;
	          continue;
	        }

	        // stage 4
	        v0 = (dctSqrt2 * p[0*8 + col] + 2048) >> 12;
	        v1 = (dctSqrt2 * p[4*8 + col] + 2048) >> 12;
	        v2 = p[2*8 + col];
	        v3 = p[6*8 + col];
	        v4 = (dctSqrt1d2 * (p[1*8 + col] - p[7*8 + col]) + 2048) >> 12;
	        v7 = (dctSqrt1d2 * (p[1*8 + col] + p[7*8 + col]) + 2048) >> 12;
	        v5 = p[3*8 + col];
	        v6 = p[5*8 + col];

	        // stage 3
	        t = (v0 - v1 + 1) >> 1;
	        v0 = (v0 + v1 + 1) >> 1;
	        v1 = t;
	        t = (v2 * dctSin6 + v3 * dctCos6 + 2048) >> 12;
	        v2 = (v2 * dctCos6 - v3 * dctSin6 + 2048) >> 12;
	        v3 = t;
	        t = (v4 - v6 + 1) >> 1;
	        v4 = (v4 + v6 + 1) >> 1;
	        v6 = t;
	        t = (v7 + v5 + 1) >> 1;
	        v5 = (v7 - v5 + 1) >> 1;
	        v7 = t;

	        // stage 2
	        t = (v0 - v3 + 1) >> 1;
	        v0 = (v0 + v3 + 1) >> 1;
	        v3 = t;
	        t = (v1 - v2 + 1) >> 1;
	        v1 = (v1 + v2 + 1) >> 1;
	        v2 = t;
	        t = (v4 * dctSin3 + v7 * dctCos3 + 2048) >> 12;
	        v4 = (v4 * dctCos3 - v7 * dctSin3 + 2048) >> 12;
	        v7 = t;
	        t = (v5 * dctSin1 + v6 * dctCos1 + 2048) >> 12;
	        v5 = (v5 * dctCos1 - v6 * dctSin1 + 2048) >> 12;
	        v6 = t;

	        // stage 1
	        p[0*8 + col] = v0 + v7;
	        p[7*8 + col] = v0 - v7;
	        p[1*8 + col] = v1 + v6;
	        p[6*8 + col] = v1 - v6;
	        p[2*8 + col] = v2 + v5;
	        p[5*8 + col] = v2 - v5;
	        p[3*8 + col] = v3 + v4;
	        p[4*8 + col] = v3 - v4;
	      }

	      // convert to 8-bit integers
	      for (i = 0; i < 64; ++i) {
	        var sample = 128 + ((p[i] + 8) >> 4);
	        dataOut[i] = sample < 0 ? 0 : sample > 0xFF ? 0xFF : sample;
	      }
	    }

	    requestMemoryAllocation(samplesPerLine * blocksPerColumn * 8);

	    var i, j;
	    for (var blockRow = 0; blockRow < blocksPerColumn; blockRow++) {
	      var scanLine = blockRow << 3;
	      for (i = 0; i < 8; i++)
	        lines.push(new Uint8Array(samplesPerLine));
	      for (var blockCol = 0; blockCol < blocksPerLine; blockCol++) {
	        quantizeAndInverse(component.blocks[blockRow][blockCol], r, R);

	        var offset = 0, sample = blockCol << 3;
	        for (j = 0; j < 8; j++) {
	          var line = lines[scanLine + j];
	          for (i = 0; i < 8; i++)
	            line[sample + i] = r[offset++];
	        }
	      }
	    }
	    return lines;
	  }

	  function clampTo8bit(a) {
	    return a < 0 ? 0 : a > 255 ? 255 : a;
	  }

	  constructor.prototype = {
	    load: function load(path) {
	      var xhr = new XMLHttpRequest();
	      xhr.open("GET", path, true);
	      xhr.responseType = "arraybuffer";
	      xhr.onload = (function() {
	        // TODO catch parse error
	        var data = new Uint8Array(xhr.response || xhr.mozResponseArrayBuffer);
	        this.parse(data);
	        if (this.onload)
	          this.onload();
	      }).bind(this);
	      xhr.send(null);
	    },
	    parse: function parse(data) {
	      var maxResolutionInPixels = this.opts.maxResolutionInMP * 1000 * 1000;
	      var offset = 0; data.length;
	      function readUint16() {
	        var value = (data[offset] << 8) | data[offset + 1];
	        offset += 2;
	        return value;
	      }
	      function readDataBlock() {
	        var length = readUint16();
	        var array = data.subarray(offset, offset + length - 2);
	        offset += array.length;
	        return array;
	      }
	      function prepareComponents(frame) {
	        // According to the JPEG standard, the sampling factor must be between 1 and 4
	        // See https://github.com/libjpeg-turbo/libjpeg-turbo/blob/9abeff46d87bd201a952e276f3e4339556a403a3/libjpeg.txt#L1138-L1146
	        var maxH = 1, maxV = 1;
	        var component, componentId;
	        for (componentId in frame.components) {
	          if (frame.components.hasOwnProperty(componentId)) {
	            component = frame.components[componentId];
	            if (maxH < component.h) maxH = component.h;
	            if (maxV < component.v) maxV = component.v;
	          }
	        }
	        var mcusPerLine = Math.ceil(frame.samplesPerLine / 8 / maxH);
	        var mcusPerColumn = Math.ceil(frame.scanLines / 8 / maxV);
	        for (componentId in frame.components) {
	          if (frame.components.hasOwnProperty(componentId)) {
	            component = frame.components[componentId];
	            var blocksPerLine = Math.ceil(Math.ceil(frame.samplesPerLine / 8) * component.h / maxH);
	            var blocksPerColumn = Math.ceil(Math.ceil(frame.scanLines  / 8) * component.v / maxV);
	            var blocksPerLineForMcu = mcusPerLine * component.h;
	            var blocksPerColumnForMcu = mcusPerColumn * component.v;
	            var blocksToAllocate = blocksPerColumnForMcu * blocksPerLineForMcu;
	            var blocks = [];

	            // Each block is a Int32Array of length 64 (4 x 64 = 256 bytes)
	            requestMemoryAllocation(blocksToAllocate * 256);

	            for (var i = 0; i < blocksPerColumnForMcu; i++) {
	              var row = [];
	              for (var j = 0; j < blocksPerLineForMcu; j++)
	                row.push(new Int32Array(64));
	              blocks.push(row);
	            }
	            component.blocksPerLine = blocksPerLine;
	            component.blocksPerColumn = blocksPerColumn;
	            component.blocks = blocks;
	          }
	        }
	        frame.maxH = maxH;
	        frame.maxV = maxV;
	        frame.mcusPerLine = mcusPerLine;
	        frame.mcusPerColumn = mcusPerColumn;
	      }
	      var jfif = null;
	      var adobe = null;
	      var frame, resetInterval;
	      var quantizationTables = [], frames = [];
	      var huffmanTablesAC = [], huffmanTablesDC = [];
	      var fileMarker = readUint16();
	      var malformedDataOffset = -1;
	      this.comments = [];
	      if (fileMarker != 0xFFD8) { // SOI (Start of Image)
	        throw new Error("SOI not found");
	      }

	      fileMarker = readUint16();
	      while (fileMarker != 0xFFD9) { // EOI (End of image)
	        var i, j;
	        switch(fileMarker) {
	          case 0xFF00: break;
	          case 0xFFE0: // APP0 (Application Specific)
	          case 0xFFE1: // APP1
	          case 0xFFE2: // APP2
	          case 0xFFE3: // APP3
	          case 0xFFE4: // APP4
	          case 0xFFE5: // APP5
	          case 0xFFE6: // APP6
	          case 0xFFE7: // APP7
	          case 0xFFE8: // APP8
	          case 0xFFE9: // APP9
	          case 0xFFEA: // APP10
	          case 0xFFEB: // APP11
	          case 0xFFEC: // APP12
	          case 0xFFED: // APP13
	          case 0xFFEE: // APP14
	          case 0xFFEF: // APP15
	          case 0xFFFE: // COM (Comment)
	            var appData = readDataBlock();

	            if (fileMarker === 0xFFFE) {
	              var comment = String.fromCharCode.apply(null, appData);
	              this.comments.push(comment);
	            }

	            if (fileMarker === 0xFFE0) {
	              if (appData[0] === 0x4A && appData[1] === 0x46 && appData[2] === 0x49 &&
	                appData[3] === 0x46 && appData[4] === 0) { // 'JFIF\x00'
	                jfif = {
	                  version: { major: appData[5], minor: appData[6] },
	                  densityUnits: appData[7],
	                  xDensity: (appData[8] << 8) | appData[9],
	                  yDensity: (appData[10] << 8) | appData[11],
	                  thumbWidth: appData[12],
	                  thumbHeight: appData[13],
	                  thumbData: appData.subarray(14, 14 + 3 * appData[12] * appData[13])
	                };
	              }
	            }
	            // TODO APP1 - Exif
	            if (fileMarker === 0xFFE1) {
	              if (appData[0] === 0x45 &&
	                appData[1] === 0x78 &&
	                appData[2] === 0x69 &&
	                appData[3] === 0x66 &&
	                appData[4] === 0) { // 'EXIF\x00'
	                this.exifBuffer = appData.subarray(5, appData.length);
	              }
	            }

	            if (fileMarker === 0xFFEE) {
	              if (appData[0] === 0x41 && appData[1] === 0x64 && appData[2] === 0x6F &&
	                appData[3] === 0x62 && appData[4] === 0x65 && appData[5] === 0) { // 'Adobe\x00'
	                adobe = {
	                  version: appData[6],
	                  flags0: (appData[7] << 8) | appData[8],
	                  flags1: (appData[9] << 8) | appData[10],
	                  transformCode: appData[11]
	                };
	              }
	            }
	            break;

	          case 0xFFDB: // DQT (Define Quantization Tables)
	            var quantizationTablesLength = readUint16();
	            var quantizationTablesEnd = quantizationTablesLength + offset - 2;
	            while (offset < quantizationTablesEnd) {
	              var quantizationTableSpec = data[offset++];
	              requestMemoryAllocation(64 * 4);
	              var tableData = new Int32Array(64);
	              if ((quantizationTableSpec >> 4) === 0) { // 8 bit values
	                for (j = 0; j < 64; j++) {
	                  var z = dctZigZag[j];
	                  tableData[z] = data[offset++];
	                }
	              } else if ((quantizationTableSpec >> 4) === 1) { //16 bit
	                for (j = 0; j < 64; j++) {
	                  var z = dctZigZag[j];
	                  tableData[z] = readUint16();
	                }
	              } else
	                throw new Error("DQT: invalid table spec");
	              quantizationTables[quantizationTableSpec & 15] = tableData;
	            }
	            break;

	          case 0xFFC0: // SOF0 (Start of Frame, Baseline DCT)
	          case 0xFFC1: // SOF1 (Start of Frame, Extended DCT)
	          case 0xFFC2: // SOF2 (Start of Frame, Progressive DCT)
	            readUint16(); // skip data length
	            frame = {};
	            frame.extended = (fileMarker === 0xFFC1);
	            frame.progressive = (fileMarker === 0xFFC2);
	            frame.precision = data[offset++];
	            frame.scanLines = readUint16();
	            frame.samplesPerLine = readUint16();
	            frame.components = {};
	            frame.componentsOrder = [];

	            var pixelsInFrame = frame.scanLines * frame.samplesPerLine;
	            if (pixelsInFrame > maxResolutionInPixels) {
	              var exceededAmount = Math.ceil((pixelsInFrame - maxResolutionInPixels) / 1e6);
	              throw new Error(`maxResolutionInMP limit exceeded by ${exceededAmount}MP`);
	            }

	            var componentsCount = data[offset++], componentId;
	            for (i = 0; i < componentsCount; i++) {
	              componentId = data[offset];
	              var h = data[offset + 1] >> 4;
	              var v = data[offset + 1] & 15;
	              var qId = data[offset + 2];

	              if ( h <= 0 || v <= 0 ) {
	                throw new Error('Invalid sampling factor, expected values above 0');
	              }

	              frame.componentsOrder.push(componentId);
	              frame.components[componentId] = {
	                h: h,
	                v: v,
	                quantizationIdx: qId
	              };
	              offset += 3;
	            }
	            prepareComponents(frame);
	            frames.push(frame);
	            break;

	          case 0xFFC4: // DHT (Define Huffman Tables)
	            var huffmanLength = readUint16();
	            for (i = 2; i < huffmanLength;) {
	              var huffmanTableSpec = data[offset++];
	              var codeLengths = new Uint8Array(16);
	              var codeLengthSum = 0;
	              for (j = 0; j < 16; j++, offset++) {
	                codeLengthSum += (codeLengths[j] = data[offset]);
	              }
	              requestMemoryAllocation(16 + codeLengthSum);
	              var huffmanValues = new Uint8Array(codeLengthSum);
	              for (j = 0; j < codeLengthSum; j++, offset++)
	                huffmanValues[j] = data[offset];
	              i += 17 + codeLengthSum;

	              ((huffmanTableSpec >> 4) === 0 ?
	                huffmanTablesDC : huffmanTablesAC)[huffmanTableSpec & 15] =
	                buildHuffmanTable(codeLengths, huffmanValues);
	            }
	            break;

	          case 0xFFDD: // DRI (Define Restart Interval)
	            readUint16(); // skip data length
	            resetInterval = readUint16();
	            break;

	          case 0xFFDC: // Number of Lines marker
	            readUint16(); // skip data length
	            readUint16(); // Ignore this data since it represents the image height
	            break;
	            
	          case 0xFFDA: // SOS (Start of Scan)
	            readUint16();
	            var selectorsCount = data[offset++];
	            var components = [], component;
	            for (i = 0; i < selectorsCount; i++) {
	              component = frame.components[data[offset++]];
	              var tableSpec = data[offset++];
	              component.huffmanTableDC = huffmanTablesDC[tableSpec >> 4];
	              component.huffmanTableAC = huffmanTablesAC[tableSpec & 15];
	              components.push(component);
	            }
	            var spectralStart = data[offset++];
	            var spectralEnd = data[offset++];
	            var successiveApproximation = data[offset++];
	            var processed = decodeScan(data, offset,
	              frame, components, resetInterval,
	              spectralStart, spectralEnd,
	              successiveApproximation >> 4, successiveApproximation & 15, this.opts);
	            offset += processed;
	            break;

	          case 0xFFFF: // Fill bytes
	            if (data[offset] !== 0xFF) { // Avoid skipping a valid marker.
	              offset--;
	            }
	            break;
	          default:
	            if (data[offset - 3] == 0xFF &&
	                data[offset - 2] >= 0xC0 && data[offset - 2] <= 0xFE) {
	              // could be incorrect encoding -- last 0xFF byte of the previous
	              // block was eaten by the encoder
	              offset -= 3;
	              break;
	            }
	            else if (fileMarker === 0xE0 || fileMarker == 0xE1) {
	              // Recover from malformed APP1 markers popular in some phone models.
	              // See https://github.com/eugeneware/jpeg-js/issues/82
	              if (malformedDataOffset !== -1) {
	                throw new Error(`first unknown JPEG marker at offset ${malformedDataOffset.toString(16)}, second unknown JPEG marker ${fileMarker.toString(16)} at offset ${(offset - 1).toString(16)}`);
	              }
	              malformedDataOffset = offset - 1;
	              const nextOffset = readUint16();
	              if (data[offset + nextOffset - 2] === 0xFF) {
	                offset += nextOffset - 2;
	                break;
	              }
	            }
	            throw new Error("unknown JPEG marker " + fileMarker.toString(16));
	        }
	        fileMarker = readUint16();
	      }
	      if (frames.length != 1)
	        throw new Error("only single frame JPEGs supported");

	      // set each frame's components quantization table
	      for (var i = 0; i < frames.length; i++) {
	        var cp = frames[i].components;
	        for (var j in cp) {
	          cp[j].quantizationTable = quantizationTables[cp[j].quantizationIdx];
	          delete cp[j].quantizationIdx;
	        }
	      }

	      this.width = frame.samplesPerLine;
	      this.height = frame.scanLines;
	      this.jfif = jfif;
	      this.adobe = adobe;
	      this.components = [];
	      for (var i = 0; i < frame.componentsOrder.length; i++) {
	        var component = frame.components[frame.componentsOrder[i]];
	        this.components.push({
	          lines: buildComponentData(frame, component),
	          scaleX: component.h / frame.maxH,
	          scaleY: component.v / frame.maxV
	        });
	      }
	    },
	    getData: function getData(width, height) {
	      var scaleX = this.width / width, scaleY = this.height / height;

	      var component1, component2, component3, component4;
	      var component1Line, component2Line, component3Line, component4Line;
	      var x, y;
	      var offset = 0;
	      var Y, Cb, Cr, K, C, M, Ye, R, G, B;
	      var colorTransform;
	      var dataLength = width * height * this.components.length;
	      requestMemoryAllocation(dataLength);
	      var data = new Uint8Array(dataLength);
	      switch (this.components.length) {
	        case 1:
	          component1 = this.components[0];
	          for (y = 0; y < height; y++) {
	            component1Line = component1.lines[0 | (y * component1.scaleY * scaleY)];
	            for (x = 0; x < width; x++) {
	              Y = component1Line[0 | (x * component1.scaleX * scaleX)];

	              data[offset++] = Y;
	            }
	          }
	          break;
	        case 2:
	          // PDF might compress two component data in custom colorspace
	          component1 = this.components[0];
	          component2 = this.components[1];
	          for (y = 0; y < height; y++) {
	            component1Line = component1.lines[0 | (y * component1.scaleY * scaleY)];
	            component2Line = component2.lines[0 | (y * component2.scaleY * scaleY)];
	            for (x = 0; x < width; x++) {
	              Y = component1Line[0 | (x * component1.scaleX * scaleX)];
	              data[offset++] = Y;
	              Y = component2Line[0 | (x * component2.scaleX * scaleX)];
	              data[offset++] = Y;
	            }
	          }
	          break;
	        case 3:
	          // The default transform for three components is true
	          colorTransform = true;
	          // The adobe transform marker overrides any previous setting
	          if (this.adobe && this.adobe.transformCode)
	            colorTransform = true;
	          else if (typeof this.opts.colorTransform !== 'undefined')
	            colorTransform = !!this.opts.colorTransform;

	          component1 = this.components[0];
	          component2 = this.components[1];
	          component3 = this.components[2];
	          for (y = 0; y < height; y++) {
	            component1Line = component1.lines[0 | (y * component1.scaleY * scaleY)];
	            component2Line = component2.lines[0 | (y * component2.scaleY * scaleY)];
	            component3Line = component3.lines[0 | (y * component3.scaleY * scaleY)];
	            for (x = 0; x < width; x++) {
	              if (!colorTransform) {
	                R = component1Line[0 | (x * component1.scaleX * scaleX)];
	                G = component2Line[0 | (x * component2.scaleX * scaleX)];
	                B = component3Line[0 | (x * component3.scaleX * scaleX)];
	              } else {
	                Y = component1Line[0 | (x * component1.scaleX * scaleX)];
	                Cb = component2Line[0 | (x * component2.scaleX * scaleX)];
	                Cr = component3Line[0 | (x * component3.scaleX * scaleX)];

	                R = clampTo8bit(Y + 1.402 * (Cr - 128));
	                G = clampTo8bit(Y - 0.3441363 * (Cb - 128) - 0.71413636 * (Cr - 128));
	                B = clampTo8bit(Y + 1.772 * (Cb - 128));
	              }

	              data[offset++] = R;
	              data[offset++] = G;
	              data[offset++] = B;
	            }
	          }
	          break;
	        case 4:
	          if (!this.adobe)
	            throw new Error('Unsupported color mode (4 components)');
	          // The default transform for four components is false
	          colorTransform = false;
	          // The adobe transform marker overrides any previous setting
	          if (this.adobe && this.adobe.transformCode)
	            colorTransform = true;
	          else if (typeof this.opts.colorTransform !== 'undefined')
	            colorTransform = !!this.opts.colorTransform;

	          component1 = this.components[0];
	          component2 = this.components[1];
	          component3 = this.components[2];
	          component4 = this.components[3];
	          for (y = 0; y < height; y++) {
	            component1Line = component1.lines[0 | (y * component1.scaleY * scaleY)];
	            component2Line = component2.lines[0 | (y * component2.scaleY * scaleY)];
	            component3Line = component3.lines[0 | (y * component3.scaleY * scaleY)];
	            component4Line = component4.lines[0 | (y * component4.scaleY * scaleY)];
	            for (x = 0; x < width; x++) {
	              if (!colorTransform) {
	                C = component1Line[0 | (x * component1.scaleX * scaleX)];
	                M = component2Line[0 | (x * component2.scaleX * scaleX)];
	                Ye = component3Line[0 | (x * component3.scaleX * scaleX)];
	                K = component4Line[0 | (x * component4.scaleX * scaleX)];
	              } else {
	                Y = component1Line[0 | (x * component1.scaleX * scaleX)];
	                Cb = component2Line[0 | (x * component2.scaleX * scaleX)];
	                Cr = component3Line[0 | (x * component3.scaleX * scaleX)];
	                K = component4Line[0 | (x * component4.scaleX * scaleX)];

	                C = 255 - clampTo8bit(Y + 1.402 * (Cr - 128));
	                M = 255 - clampTo8bit(Y - 0.3441363 * (Cb - 128) - 0.71413636 * (Cr - 128));
	                Ye = 255 - clampTo8bit(Y + 1.772 * (Cb - 128));
	              }
	              data[offset++] = 255-C;
	              data[offset++] = 255-M;
	              data[offset++] = 255-Ye;
	              data[offset++] = 255-K;
	            }
	          }
	          break;
	        default:
	          throw new Error('Unsupported color mode');
	      }
	      return data;
	    },
	    copyToImageData: function copyToImageData(imageData, formatAsRGBA) {
	      var width = imageData.width, height = imageData.height;
	      var imageDataArray = imageData.data;
	      var data = this.getData(width, height);
	      var i = 0, j = 0, x, y;
	      var Y, K, C, M, R, G, B;
	      switch (this.components.length) {
	        case 1:
	          for (y = 0; y < height; y++) {
	            for (x = 0; x < width; x++) {
	              Y = data[i++];

	              imageDataArray[j++] = Y;
	              imageDataArray[j++] = Y;
	              imageDataArray[j++] = Y;
	              if (formatAsRGBA) {
	                imageDataArray[j++] = 255;
	              }
	            }
	          }
	          break;
	        case 3:
	          for (y = 0; y < height; y++) {
	            for (x = 0; x < width; x++) {
	              R = data[i++];
	              G = data[i++];
	              B = data[i++];

	              imageDataArray[j++] = R;
	              imageDataArray[j++] = G;
	              imageDataArray[j++] = B;
	              if (formatAsRGBA) {
	                imageDataArray[j++] = 255;
	              }
	            }
	          }
	          break;
	        case 4:
	          for (y = 0; y < height; y++) {
	            for (x = 0; x < width; x++) {
	              C = data[i++];
	              M = data[i++];
	              Y = data[i++];
	              K = data[i++];

	              R = 255 - clampTo8bit(C * (1 - K / 255) + K);
	              G = 255 - clampTo8bit(M * (1 - K / 255) + K);
	              B = 255 - clampTo8bit(Y * (1 - K / 255) + K);

	              imageDataArray[j++] = R;
	              imageDataArray[j++] = G;
	              imageDataArray[j++] = B;
	              if (formatAsRGBA) {
	                imageDataArray[j++] = 255;
	              }
	            }
	          }
	          break;
	        default:
	          throw new Error('Unsupported color mode');
	      }
	    }
	  };


	  // We cap the amount of memory used by jpeg-js to avoid unexpected OOMs from untrusted content.
	  var totalBytesAllocated = 0;
	  var maxMemoryUsageBytes = 0;
	  function requestMemoryAllocation(increaseAmount = 0) {
	    var totalMemoryImpactBytes = totalBytesAllocated + increaseAmount;
	    if (totalMemoryImpactBytes > maxMemoryUsageBytes) {
	      var exceededAmount = Math.ceil((totalMemoryImpactBytes - maxMemoryUsageBytes) / 1024 / 1024);
	      throw new Error(`maxMemoryUsageInMB limit exceeded by at least ${exceededAmount}MB`);
	    }

	    totalBytesAllocated = totalMemoryImpactBytes;
	  }

	  constructor.resetMaxMemoryUsage = function (maxMemoryUsageBytes_) {
	    totalBytesAllocated = 0;
	    maxMemoryUsageBytes = maxMemoryUsageBytes_;
	  };

	  constructor.getBytesAllocated = function () {
	    return totalBytesAllocated;
	  };

	  constructor.requestMemoryAllocation = requestMemoryAllocation;

	  return constructor;
	})();

	{
		module.exports = decode;
	}

	function decode(jpegData, userOpts = {}) {
	  var defaultOpts = {
	    // "undefined" means "Choose whether to transform colors based on the image’s color model."
	    colorTransform: undefined,
	    useTArray: false,
	    formatAsRGBA: true,
	    tolerantDecoding: true,
	    maxResolutionInMP: 100, // Don't decode more than 100 megapixels
	    maxMemoryUsageInMB: 512, // Don't decode if memory footprint is more than 512MB
	  };

	  var opts = {...defaultOpts, ...userOpts};
	  var arr = new Uint8Array(jpegData);
	  var decoder = new JpegImage();
	  decoder.opts = opts;
	  // If this constructor ever supports async decoding this will need to be done differently.
	  // Until then, treating as singleton limit is fine.
	  JpegImage.resetMaxMemoryUsage(opts.maxMemoryUsageInMB * 1024 * 1024);
	  decoder.parse(arr);

	  var channels = (opts.formatAsRGBA) ? 4 : 3;
	  var bytesNeeded = decoder.width * decoder.height * channels;
	  try {
	    JpegImage.requestMemoryAllocation(bytesNeeded);
	    var image = {
	      width: decoder.width,
	      height: decoder.height,
	      exifBuffer: decoder.exifBuffer,
	      data: opts.useTArray ?
	        new Uint8Array(bytesNeeded) :
	        Buffer.alloc(bytesNeeded)
	    };
	    if(decoder.comments.length > 0) {
	      image["comments"] = decoder.comments;
	    }
	  } catch (err) {
	    if (err instanceof RangeError) {
	      throw new Error("Could not allocate enough memory for the image. " +
	                      "Required: " + bytesNeeded);
	    } 
	    
	    if (err instanceof ReferenceError) {
	      if (err.message === "Buffer is not defined") {
	        throw new Error("Buffer is not globally defined in this environment. " +
	                        "Consider setting useTArray to true");
	      }
	    }
	    throw err;
	  }

	  decoder.copyToImageData(image, opts.formatAsRGBA);

	  return image;
	} 
} (decoder));

var decoderExports = decoder.exports;

var encode$1 = encoderExports,
    decode$1 = decoderExports;

var jpegJs = {
  encode: encode$1,
  decode: decode$1
};

function commonjsRequire(path) {
	throw new Error('Could not dynamically require "' + path + '". Please configure the dynamicRequireTargets or/and ignoreDynamicRequires option of @rollup/plugin-commonjs appropriately for this require call to work.');
}

var browser = {exports: {}};

(function (module, exports) {
	(function(f){{module.exports=f();}})(function(){return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof commonjsRequire&&commonjsRequire;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t);}return n[i].exports}for(var u="function"==typeof commonjsRequire&&commonjsRequire,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
	(function (Buffer){(function (){

	let interlaceUtils = require("./interlace");

	let pixelBppMapper = [
	  // 0 - dummy entry
	  function () {},

	  // 1 - L
	  // 0: 0, 1: 0, 2: 0, 3: 0xff
	  function (pxData, data, pxPos, rawPos) {
	    if (rawPos === data.length) {
	      throw new Error("Ran out of data");
	    }

	    let pixel = data[rawPos];
	    pxData[pxPos] = pixel;
	    pxData[pxPos + 1] = pixel;
	    pxData[pxPos + 2] = pixel;
	    pxData[pxPos + 3] = 0xff;
	  },

	  // 2 - LA
	  // 0: 0, 1: 0, 2: 0, 3: 1
	  function (pxData, data, pxPos, rawPos) {
	    if (rawPos + 1 >= data.length) {
	      throw new Error("Ran out of data");
	    }

	    let pixel = data[rawPos];
	    pxData[pxPos] = pixel;
	    pxData[pxPos + 1] = pixel;
	    pxData[pxPos + 2] = pixel;
	    pxData[pxPos + 3] = data[rawPos + 1];
	  },

	  // 3 - RGB
	  // 0: 0, 1: 1, 2: 2, 3: 0xff
	  function (pxData, data, pxPos, rawPos) {
	    if (rawPos + 2 >= data.length) {
	      throw new Error("Ran out of data");
	    }

	    pxData[pxPos] = data[rawPos];
	    pxData[pxPos + 1] = data[rawPos + 1];
	    pxData[pxPos + 2] = data[rawPos + 2];
	    pxData[pxPos + 3] = 0xff;
	  },

	  // 4 - RGBA
	  // 0: 0, 1: 1, 2: 2, 3: 3
	  function (pxData, data, pxPos, rawPos) {
	    if (rawPos + 3 >= data.length) {
	      throw new Error("Ran out of data");
	    }

	    pxData[pxPos] = data[rawPos];
	    pxData[pxPos + 1] = data[rawPos + 1];
	    pxData[pxPos + 2] = data[rawPos + 2];
	    pxData[pxPos + 3] = data[rawPos + 3];
	  },
	];

	let pixelBppCustomMapper = [
	  // 0 - dummy entry
	  function () {},

	  // 1 - L
	  // 0: 0, 1: 0, 2: 0, 3: 0xff
	  function (pxData, pixelData, pxPos, maxBit) {
	    let pixel = pixelData[0];
	    pxData[pxPos] = pixel;
	    pxData[pxPos + 1] = pixel;
	    pxData[pxPos + 2] = pixel;
	    pxData[pxPos + 3] = maxBit;
	  },

	  // 2 - LA
	  // 0: 0, 1: 0, 2: 0, 3: 1
	  function (pxData, pixelData, pxPos) {
	    let pixel = pixelData[0];
	    pxData[pxPos] = pixel;
	    pxData[pxPos + 1] = pixel;
	    pxData[pxPos + 2] = pixel;
	    pxData[pxPos + 3] = pixelData[1];
	  },

	  // 3 - RGB
	  // 0: 0, 1: 1, 2: 2, 3: 0xff
	  function (pxData, pixelData, pxPos, maxBit) {
	    pxData[pxPos] = pixelData[0];
	    pxData[pxPos + 1] = pixelData[1];
	    pxData[pxPos + 2] = pixelData[2];
	    pxData[pxPos + 3] = maxBit;
	  },

	  // 4 - RGBA
	  // 0: 0, 1: 1, 2: 2, 3: 3
	  function (pxData, pixelData, pxPos) {
	    pxData[pxPos] = pixelData[0];
	    pxData[pxPos + 1] = pixelData[1];
	    pxData[pxPos + 2] = pixelData[2];
	    pxData[pxPos + 3] = pixelData[3];
	  },
	];

	function bitRetriever(data, depth) {
	  let leftOver = [];
	  let i = 0;

	  function split() {
	    if (i === data.length) {
	      throw new Error("Ran out of data");
	    }
	    let byte = data[i];
	    i++;
	    let byte8, byte7, byte6, byte5, byte4, byte3, byte2, byte1;
	    switch (depth) {
	      default:
	        throw new Error("unrecognised depth");
	      case 16:
	        byte2 = data[i];
	        i++;
	        leftOver.push((byte << 8) + byte2);
	        break;
	      case 4:
	        byte2 = byte & 0x0f;
	        byte1 = byte >> 4;
	        leftOver.push(byte1, byte2);
	        break;
	      case 2:
	        byte4 = byte & 3;
	        byte3 = (byte >> 2) & 3;
	        byte2 = (byte >> 4) & 3;
	        byte1 = (byte >> 6) & 3;
	        leftOver.push(byte1, byte2, byte3, byte4);
	        break;
	      case 1:
	        byte8 = byte & 1;
	        byte7 = (byte >> 1) & 1;
	        byte6 = (byte >> 2) & 1;
	        byte5 = (byte >> 3) & 1;
	        byte4 = (byte >> 4) & 1;
	        byte3 = (byte >> 5) & 1;
	        byte2 = (byte >> 6) & 1;
	        byte1 = (byte >> 7) & 1;
	        leftOver.push(byte1, byte2, byte3, byte4, byte5, byte6, byte7, byte8);
	        break;
	    }
	  }

	  return {
	    get: function (count) {
	      while (leftOver.length < count) {
	        split();
	      }
	      let returner = leftOver.slice(0, count);
	      leftOver = leftOver.slice(count);
	      return returner;
	    },
	    resetAfterLine: function () {
	      leftOver.length = 0;
	    },
	    end: function () {
	      if (i !== data.length) {
	        throw new Error("extra data found");
	      }
	    },
	  };
	}

	function mapImage8Bit(image, pxData, getPxPos, bpp, data, rawPos) {
	  // eslint-disable-line max-params
	  let imageWidth = image.width;
	  let imageHeight = image.height;
	  let imagePass = image.index;
	  for (let y = 0; y < imageHeight; y++) {
	    for (let x = 0; x < imageWidth; x++) {
	      let pxPos = getPxPos(x, y, imagePass);
	      pixelBppMapper[bpp](pxData, data, pxPos, rawPos);
	      rawPos += bpp; //eslint-disable-line no-param-reassign
	    }
	  }
	  return rawPos;
	}

	function mapImageCustomBit(image, pxData, getPxPos, bpp, bits, maxBit) {
	  // eslint-disable-line max-params
	  let imageWidth = image.width;
	  let imageHeight = image.height;
	  let imagePass = image.index;
	  for (let y = 0; y < imageHeight; y++) {
	    for (let x = 0; x < imageWidth; x++) {
	      let pixelData = bits.get(bpp);
	      let pxPos = getPxPos(x, y, imagePass);
	      pixelBppCustomMapper[bpp](pxData, pixelData, pxPos, maxBit);
	    }
	    bits.resetAfterLine();
	  }
	}

	exports.dataToBitMap = function (data, bitmapInfo) {
	  let width = bitmapInfo.width;
	  let height = bitmapInfo.height;
	  let depth = bitmapInfo.depth;
	  let bpp = bitmapInfo.bpp;
	  let interlace = bitmapInfo.interlace;
	  let bits;

	  if (depth !== 8) {
	    bits = bitRetriever(data, depth);
	  }
	  let pxData;
	  if (depth <= 8) {
	    pxData = Buffer.alloc(width * height * 4);
	  } else {
	    pxData = new Uint16Array(width * height * 4);
	  }
	  let maxBit = Math.pow(2, depth) - 1;
	  let rawPos = 0;
	  let images;
	  let getPxPos;

	  if (interlace) {
	    images = interlaceUtils.getImagePasses(width, height);
	    getPxPos = interlaceUtils.getInterlaceIterator(width, height);
	  } else {
	    let nonInterlacedPxPos = 0;
	    getPxPos = function () {
	      let returner = nonInterlacedPxPos;
	      nonInterlacedPxPos += 4;
	      return returner;
	    };
	    images = [{ width: width, height: height }];
	  }

	  for (let imageIndex = 0; imageIndex < images.length; imageIndex++) {
	    if (depth === 8) {
	      rawPos = mapImage8Bit(
	        images[imageIndex],
	        pxData,
	        getPxPos,
	        bpp,
	        data,
	        rawPos
	      );
	    } else {
	      mapImageCustomBit(
	        images[imageIndex],
	        pxData,
	        getPxPos,
	        bpp,
	        bits,
	        maxBit
	      );
	    }
	  }
	  if (depth === 8) {
	    if (rawPos !== data.length) {
	      throw new Error("extra data found");
	    }
	  } else {
	    bits.end();
	  }

	  return pxData;
	};

	}).call(this);}).call(this,require("buffer").Buffer);
	},{"./interlace":11,"buffer":32}],2:[function(require,module,exports){
	(function (Buffer){(function (){

	let constants = require("./constants");

	module.exports = function (dataIn, width, height, options) {
	  let outHasAlpha =
	    [constants.COLORTYPE_COLOR_ALPHA, constants.COLORTYPE_ALPHA].indexOf(
	      options.colorType
	    ) !== -1;
	  if (options.colorType === options.inputColorType) {
	    let bigEndian = (function () {
	      let buffer = new ArrayBuffer(2);
	      new DataView(buffer).setInt16(0, 256, true /* littleEndian */);
	      // Int16Array uses the platform's endianness.
	      return new Int16Array(buffer)[0] !== 256;
	    })();
	    // If no need to convert to grayscale and alpha is present/absent in both, take a fast route
	    if (options.bitDepth === 8 || (options.bitDepth === 16 && bigEndian)) {
	      return dataIn;
	    }
	  }

	  // map to a UInt16 array if data is 16bit, fix endianness below
	  let data = options.bitDepth !== 16 ? dataIn : new Uint16Array(dataIn.buffer);

	  let maxValue = 255;
	  let inBpp = constants.COLORTYPE_TO_BPP_MAP[options.inputColorType];
	  if (inBpp === 4 && !options.inputHasAlpha) {
	    inBpp = 3;
	  }
	  let outBpp = constants.COLORTYPE_TO_BPP_MAP[options.colorType];
	  if (options.bitDepth === 16) {
	    maxValue = 65535;
	    outBpp *= 2;
	  }
	  let outData = Buffer.alloc(width * height * outBpp);

	  let inIndex = 0;
	  let outIndex = 0;

	  let bgColor = options.bgColor || {};
	  if (bgColor.red === undefined) {
	    bgColor.red = maxValue;
	  }
	  if (bgColor.green === undefined) {
	    bgColor.green = maxValue;
	  }
	  if (bgColor.blue === undefined) {
	    bgColor.blue = maxValue;
	  }

	  function getRGBA() {
	    let red;
	    let green;
	    let blue;
	    let alpha = maxValue;
	    switch (options.inputColorType) {
	      case constants.COLORTYPE_COLOR_ALPHA:
	        alpha = data[inIndex + 3];
	        red = data[inIndex];
	        green = data[inIndex + 1];
	        blue = data[inIndex + 2];
	        break;
	      case constants.COLORTYPE_COLOR:
	        red = data[inIndex];
	        green = data[inIndex + 1];
	        blue = data[inIndex + 2];
	        break;
	      case constants.COLORTYPE_ALPHA:
	        alpha = data[inIndex + 1];
	        red = data[inIndex];
	        green = red;
	        blue = red;
	        break;
	      case constants.COLORTYPE_GRAYSCALE:
	        red = data[inIndex];
	        green = red;
	        blue = red;
	        break;
	      default:
	        throw new Error(
	          "input color type:" +
	            options.inputColorType +
	            " is not supported at present"
	        );
	    }

	    if (options.inputHasAlpha) {
	      if (!outHasAlpha) {
	        alpha /= maxValue;
	        red = Math.min(
	          Math.max(Math.round((1 - alpha) * bgColor.red + alpha * red), 0),
	          maxValue
	        );
	        green = Math.min(
	          Math.max(Math.round((1 - alpha) * bgColor.green + alpha * green), 0),
	          maxValue
	        );
	        blue = Math.min(
	          Math.max(Math.round((1 - alpha) * bgColor.blue + alpha * blue), 0),
	          maxValue
	        );
	      }
	    }
	    return { red: red, green: green, blue: blue, alpha: alpha };
	  }

	  for (let y = 0; y < height; y++) {
	    for (let x = 0; x < width; x++) {
	      let rgba = getRGBA();

	      switch (options.colorType) {
	        case constants.COLORTYPE_COLOR_ALPHA:
	        case constants.COLORTYPE_COLOR:
	          if (options.bitDepth === 8) {
	            outData[outIndex] = rgba.red;
	            outData[outIndex + 1] = rgba.green;
	            outData[outIndex + 2] = rgba.blue;
	            if (outHasAlpha) {
	              outData[outIndex + 3] = rgba.alpha;
	            }
	          } else {
	            outData.writeUInt16BE(rgba.red, outIndex);
	            outData.writeUInt16BE(rgba.green, outIndex + 2);
	            outData.writeUInt16BE(rgba.blue, outIndex + 4);
	            if (outHasAlpha) {
	              outData.writeUInt16BE(rgba.alpha, outIndex + 6);
	            }
	          }
	          break;
	        case constants.COLORTYPE_ALPHA:
	        case constants.COLORTYPE_GRAYSCALE: {
	          // Convert to grayscale and alpha
	          let grayscale = (rgba.red + rgba.green + rgba.blue) / 3;
	          if (options.bitDepth === 8) {
	            outData[outIndex] = grayscale;
	            if (outHasAlpha) {
	              outData[outIndex + 1] = rgba.alpha;
	            }
	          } else {
	            outData.writeUInt16BE(grayscale, outIndex);
	            if (outHasAlpha) {
	              outData.writeUInt16BE(rgba.alpha, outIndex + 2);
	            }
	          }
	          break;
	        }
	        default:
	          throw new Error("unrecognised color Type " + options.colorType);
	      }

	      inIndex += inBpp;
	      outIndex += outBpp;
	    }
	  }

	  return outData;
	};

	}).call(this);}).call(this,require("buffer").Buffer);
	},{"./constants":4,"buffer":32}],3:[function(require,module,exports){
	(function (process,Buffer){(function (){

	let util = require("util");
	let Stream = require("stream");

	let ChunkStream = (module.exports = function () {
	  Stream.call(this);

	  this._buffers = [];
	  this._buffered = 0;

	  this._reads = [];
	  this._paused = false;

	  this._encoding = "utf8";
	  this.writable = true;
	});
	util.inherits(ChunkStream, Stream);

	ChunkStream.prototype.read = function (length, callback) {
	  this._reads.push({
	    length: Math.abs(length), // if length < 0 then at most this length
	    allowLess: length < 0,
	    func: callback,
	  });

	  process.nextTick(
	    function () {
	      this._process();

	      // its paused and there is not enought data then ask for more
	      if (this._paused && this._reads && this._reads.length > 0) {
	        this._paused = false;

	        this.emit("drain");
	      }
	    }.bind(this)
	  );
	};

	ChunkStream.prototype.write = function (data, encoding) {
	  if (!this.writable) {
	    this.emit("error", new Error("Stream not writable"));
	    return false;
	  }

	  let dataBuffer;
	  if (Buffer.isBuffer(data)) {
	    dataBuffer = data;
	  } else {
	    dataBuffer = Buffer.from(data, encoding || this._encoding);
	  }

	  this._buffers.push(dataBuffer);
	  this._buffered += dataBuffer.length;

	  this._process();

	  // ok if there are no more read requests
	  if (this._reads && this._reads.length === 0) {
	    this._paused = true;
	  }

	  return this.writable && !this._paused;
	};

	ChunkStream.prototype.end = function (data, encoding) {
	  if (data) {
	    this.write(data, encoding);
	  }

	  this.writable = false;

	  // already destroyed
	  if (!this._buffers) {
	    return;
	  }

	  // enqueue or handle end
	  if (this._buffers.length === 0) {
	    this._end();
	  } else {
	    this._buffers.push(null);
	    this._process();
	  }
	};

	ChunkStream.prototype.destroySoon = ChunkStream.prototype.end;

	ChunkStream.prototype._end = function () {
	  if (this._reads.length > 0) {
	    this.emit("error", new Error("Unexpected end of input"));
	  }

	  this.destroy();
	};

	ChunkStream.prototype.destroy = function () {
	  if (!this._buffers) {
	    return;
	  }

	  this.writable = false;
	  this._reads = null;
	  this._buffers = null;

	  this.emit("close");
	};

	ChunkStream.prototype._processReadAllowingLess = function (read) {
	  // ok there is any data so that we can satisfy this request
	  this._reads.shift(); // == read

	  // first we need to peek into first buffer
	  let smallerBuf = this._buffers[0];

	  // ok there is more data than we need
	  if (smallerBuf.length > read.length) {
	    this._buffered -= read.length;
	    this._buffers[0] = smallerBuf.slice(read.length);

	    read.func.call(this, smallerBuf.slice(0, read.length));
	  } else {
	    // ok this is less than maximum length so use it all
	    this._buffered -= smallerBuf.length;
	    this._buffers.shift(); // == smallerBuf

	    read.func.call(this, smallerBuf);
	  }
	};

	ChunkStream.prototype._processRead = function (read) {
	  this._reads.shift(); // == read

	  let pos = 0;
	  let count = 0;
	  let data = Buffer.alloc(read.length);

	  // create buffer for all data
	  while (pos < read.length) {
	    let buf = this._buffers[count++];
	    let len = Math.min(buf.length, read.length - pos);

	    buf.copy(data, pos, 0, len);
	    pos += len;

	    // last buffer wasn't used all so just slice it and leave
	    if (len !== buf.length) {
	      this._buffers[--count] = buf.slice(len);
	    }
	  }

	  // remove all used buffers
	  if (count > 0) {
	    this._buffers.splice(0, count);
	  }

	  this._buffered -= read.length;

	  read.func.call(this, data);
	};

	ChunkStream.prototype._process = function () {
	  try {
	    // as long as there is any data and read requests
	    while (this._buffered > 0 && this._reads && this._reads.length > 0) {
	      let read = this._reads[0];

	      // read any data (but no more than length)
	      if (read.allowLess) {
	        this._processReadAllowingLess(read);
	      } else if (this._buffered >= read.length) {
	        // ok we can meet some expectations

	        this._processRead(read);
	      } else {
	        // not enought data to satisfy first request in queue
	        // so we need to wait for more
	        break;
	      }
	    }

	    if (this._buffers && !this.writable) {
	      this._end();
	    }
	  } catch (ex) {
	    this.emit("error", ex);
	  }
	};

	}).call(this);}).call(this,require('_process'),require("buffer").Buffer);
	},{"_process":63,"buffer":32,"stream":65,"util":84}],4:[function(require,module,exports){

	module.exports = {
	  PNG_SIGNATURE: [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a],

	  TYPE_IHDR: 0x49484452,
	  TYPE_IEND: 0x49454e44,
	  TYPE_IDAT: 0x49444154,
	  TYPE_PLTE: 0x504c5445,
	  TYPE_tRNS: 0x74524e53, // eslint-disable-line camelcase
	  TYPE_gAMA: 0x67414d41, // eslint-disable-line camelcase

	  // color-type bits
	  COLORTYPE_GRAYSCALE: 0,
	  COLORTYPE_PALETTE: 1,
	  COLORTYPE_COLOR: 2,
	  COLORTYPE_ALPHA: 4, // e.g. grayscale and alpha

	  // color-type combinations
	  COLORTYPE_PALETTE_COLOR: 3,
	  COLORTYPE_COLOR_ALPHA: 6,

	  COLORTYPE_TO_BPP_MAP: {
	    0: 1,
	    2: 3,
	    3: 1,
	    4: 2,
	    6: 4,
	  },

	  GAMMA_DIVISION: 100000,
	};

	},{}],5:[function(require,module,exports){

	let crcTable = [];

	(function () {
	  for (let i = 0; i < 256; i++) {
	    let currentCrc = i;
	    for (let j = 0; j < 8; j++) {
	      if (currentCrc & 1) {
	        currentCrc = 0xedb88320 ^ (currentCrc >>> 1);
	      } else {
	        currentCrc = currentCrc >>> 1;
	      }
	    }
	    crcTable[i] = currentCrc;
	  }
	})();

	let CrcCalculator = (module.exports = function () {
	  this._crc = -1;
	});

	CrcCalculator.prototype.write = function (data) {
	  for (let i = 0; i < data.length; i++) {
	    this._crc = crcTable[(this._crc ^ data[i]) & 0xff] ^ (this._crc >>> 8);
	  }
	  return true;
	};

	CrcCalculator.prototype.crc32 = function () {
	  return this._crc ^ -1;
	};

	CrcCalculator.crc32 = function (buf) {
	  let crc = -1;
	  for (let i = 0; i < buf.length; i++) {
	    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
	  }
	  return crc ^ -1;
	};

	},{}],6:[function(require,module,exports){
	(function (Buffer){(function (){

	let paethPredictor = require("./paeth-predictor");

	function filterNone(pxData, pxPos, byteWidth, rawData, rawPos) {
	  for (let x = 0; x < byteWidth; x++) {
	    rawData[rawPos + x] = pxData[pxPos + x];
	  }
	}

	function filterSumNone(pxData, pxPos, byteWidth) {
	  let sum = 0;
	  let length = pxPos + byteWidth;

	  for (let i = pxPos; i < length; i++) {
	    sum += Math.abs(pxData[i]);
	  }
	  return sum;
	}

	function filterSub(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
	  for (let x = 0; x < byteWidth; x++) {
	    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
	    let val = pxData[pxPos + x] - left;

	    rawData[rawPos + x] = val;
	  }
	}

	function filterSumSub(pxData, pxPos, byteWidth, bpp) {
	  let sum = 0;
	  for (let x = 0; x < byteWidth; x++) {
	    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
	    let val = pxData[pxPos + x] - left;

	    sum += Math.abs(val);
	  }

	  return sum;
	}

	function filterUp(pxData, pxPos, byteWidth, rawData, rawPos) {
	  for (let x = 0; x < byteWidth; x++) {
	    let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
	    let val = pxData[pxPos + x] - up;

	    rawData[rawPos + x] = val;
	  }
	}

	function filterSumUp(pxData, pxPos, byteWidth) {
	  let sum = 0;
	  let length = pxPos + byteWidth;
	  for (let x = pxPos; x < length; x++) {
	    let up = pxPos > 0 ? pxData[x - byteWidth] : 0;
	    let val = pxData[x] - up;

	    sum += Math.abs(val);
	  }

	  return sum;
	}

	function filterAvg(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
	  for (let x = 0; x < byteWidth; x++) {
	    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
	    let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
	    let val = pxData[pxPos + x] - ((left + up) >> 1);

	    rawData[rawPos + x] = val;
	  }
	}

	function filterSumAvg(pxData, pxPos, byteWidth, bpp) {
	  let sum = 0;
	  for (let x = 0; x < byteWidth; x++) {
	    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
	    let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
	    let val = pxData[pxPos + x] - ((left + up) >> 1);

	    sum += Math.abs(val);
	  }

	  return sum;
	}

	function filterPaeth(pxData, pxPos, byteWidth, rawData, rawPos, bpp) {
	  for (let x = 0; x < byteWidth; x++) {
	    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
	    let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
	    let upleft =
	      pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
	    let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);

	    rawData[rawPos + x] = val;
	  }
	}

	function filterSumPaeth(pxData, pxPos, byteWidth, bpp) {
	  let sum = 0;
	  for (let x = 0; x < byteWidth; x++) {
	    let left = x >= bpp ? pxData[pxPos + x - bpp] : 0;
	    let up = pxPos > 0 ? pxData[pxPos + x - byteWidth] : 0;
	    let upleft =
	      pxPos > 0 && x >= bpp ? pxData[pxPos + x - (byteWidth + bpp)] : 0;
	    let val = pxData[pxPos + x] - paethPredictor(left, up, upleft);

	    sum += Math.abs(val);
	  }

	  return sum;
	}

	let filters = {
	  0: filterNone,
	  1: filterSub,
	  2: filterUp,
	  3: filterAvg,
	  4: filterPaeth,
	};

	let filterSums = {
	  0: filterSumNone,
	  1: filterSumSub,
	  2: filterSumUp,
	  3: filterSumAvg,
	  4: filterSumPaeth,
	};

	module.exports = function (pxData, width, height, options, bpp) {
	  let filterTypes;
	  if (!("filterType" in options) || options.filterType === -1) {
	    filterTypes = [0, 1, 2, 3, 4];
	  } else if (typeof options.filterType === "number") {
	    filterTypes = [options.filterType];
	  } else {
	    throw new Error("unrecognised filter types");
	  }

	  if (options.bitDepth === 16) {
	    bpp *= 2;
	  }
	  let byteWidth = width * bpp;
	  let rawPos = 0;
	  let pxPos = 0;
	  let rawData = Buffer.alloc((byteWidth + 1) * height);

	  let sel = filterTypes[0];

	  for (let y = 0; y < height; y++) {
	    if (filterTypes.length > 1) {
	      // find best filter for this line (with lowest sum of values)
	      let min = Infinity;

	      for (let i = 0; i < filterTypes.length; i++) {
	        let sum = filterSums[filterTypes[i]](pxData, pxPos, byteWidth, bpp);
	        if (sum < min) {
	          sel = filterTypes[i];
	          min = sum;
	        }
	      }
	    }

	    rawData[rawPos] = sel;
	    rawPos++;
	    filters[sel](pxData, pxPos, byteWidth, rawData, rawPos, bpp);
	    rawPos += byteWidth;
	    pxPos += byteWidth;
	  }
	  return rawData;
	};

	}).call(this);}).call(this,require("buffer").Buffer);
	},{"./paeth-predictor":15,"buffer":32}],7:[function(require,module,exports){
	(function (Buffer){(function (){

	let util = require("util");
	let ChunkStream = require("./chunkstream");
	let Filter = require("./filter-parse");

	let FilterAsync = (module.exports = function (bitmapInfo) {
	  ChunkStream.call(this);

	  let buffers = [];
	  let that = this;
	  this._filter = new Filter(bitmapInfo, {
	    read: this.read.bind(this),
	    write: function (buffer) {
	      buffers.push(buffer);
	    },
	    complete: function () {
	      that.emit("complete", Buffer.concat(buffers));
	    },
	  });

	  this._filter.start();
	});
	util.inherits(FilterAsync, ChunkStream);

	}).call(this);}).call(this,require("buffer").Buffer);
	},{"./chunkstream":3,"./filter-parse":9,"buffer":32,"util":84}],8:[function(require,module,exports){
	(function (Buffer){(function (){

	let SyncReader = require("./sync-reader");
	let Filter = require("./filter-parse");

	exports.process = function (inBuffer, bitmapInfo) {
	  let outBuffers = [];
	  let reader = new SyncReader(inBuffer);
	  let filter = new Filter(bitmapInfo, {
	    read: reader.read.bind(reader),
	    write: function (bufferPart) {
	      outBuffers.push(bufferPart);
	    },
	    complete: function () {},
	  });

	  filter.start();
	  reader.process();

	  return Buffer.concat(outBuffers);
	};

	}).call(this);}).call(this,require("buffer").Buffer);
	},{"./filter-parse":9,"./sync-reader":22,"buffer":32}],9:[function(require,module,exports){
	(function (Buffer){(function (){

	let interlaceUtils = require("./interlace");
	let paethPredictor = require("./paeth-predictor");

	function getByteWidth(width, bpp, depth) {
	  let byteWidth = width * bpp;
	  if (depth !== 8) {
	    byteWidth = Math.ceil(byteWidth / (8 / depth));
	  }
	  return byteWidth;
	}

	let Filter = (module.exports = function (bitmapInfo, dependencies) {
	  let width = bitmapInfo.width;
	  let height = bitmapInfo.height;
	  let interlace = bitmapInfo.interlace;
	  let bpp = bitmapInfo.bpp;
	  let depth = bitmapInfo.depth;

	  this.read = dependencies.read;
	  this.write = dependencies.write;
	  this.complete = dependencies.complete;

	  this._imageIndex = 0;
	  this._images = [];
	  if (interlace) {
	    let passes = interlaceUtils.getImagePasses(width, height);
	    for (let i = 0; i < passes.length; i++) {
	      this._images.push({
	        byteWidth: getByteWidth(passes[i].width, bpp, depth),
	        height: passes[i].height,
	        lineIndex: 0,
	      });
	    }
	  } else {
	    this._images.push({
	      byteWidth: getByteWidth(width, bpp, depth),
	      height: height,
	      lineIndex: 0,
	    });
	  }

	  // when filtering the line we look at the pixel to the left
	  // the spec also says it is done on a byte level regardless of the number of pixels
	  // so if the depth is byte compatible (8 or 16) we subtract the bpp in order to compare back
	  // a pixel rather than just a different byte part. However if we are sub byte, we ignore.
	  if (depth === 8) {
	    this._xComparison = bpp;
	  } else if (depth === 16) {
	    this._xComparison = bpp * 2;
	  } else {
	    this._xComparison = 1;
	  }
	});

	Filter.prototype.start = function () {
	  this.read(
	    this._images[this._imageIndex].byteWidth + 1,
	    this._reverseFilterLine.bind(this)
	  );
	};

	Filter.prototype._unFilterType1 = function (
	  rawData,
	  unfilteredLine,
	  byteWidth
	) {
	  let xComparison = this._xComparison;
	  let xBiggerThan = xComparison - 1;

	  for (let x = 0; x < byteWidth; x++) {
	    let rawByte = rawData[1 + x];
	    let f1Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
	    unfilteredLine[x] = rawByte + f1Left;
	  }
	};

	Filter.prototype._unFilterType2 = function (
	  rawData,
	  unfilteredLine,
	  byteWidth
	) {
	  let lastLine = this._lastLine;

	  for (let x = 0; x < byteWidth; x++) {
	    let rawByte = rawData[1 + x];
	    let f2Up = lastLine ? lastLine[x] : 0;
	    unfilteredLine[x] = rawByte + f2Up;
	  }
	};

	Filter.prototype._unFilterType3 = function (
	  rawData,
	  unfilteredLine,
	  byteWidth
	) {
	  let xComparison = this._xComparison;
	  let xBiggerThan = xComparison - 1;
	  let lastLine = this._lastLine;

	  for (let x = 0; x < byteWidth; x++) {
	    let rawByte = rawData[1 + x];
	    let f3Up = lastLine ? lastLine[x] : 0;
	    let f3Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
	    let f3Add = Math.floor((f3Left + f3Up) / 2);
	    unfilteredLine[x] = rawByte + f3Add;
	  }
	};

	Filter.prototype._unFilterType4 = function (
	  rawData,
	  unfilteredLine,
	  byteWidth
	) {
	  let xComparison = this._xComparison;
	  let xBiggerThan = xComparison - 1;
	  let lastLine = this._lastLine;

	  for (let x = 0; x < byteWidth; x++) {
	    let rawByte = rawData[1 + x];
	    let f4Up = lastLine ? lastLine[x] : 0;
	    let f4Left = x > xBiggerThan ? unfilteredLine[x - xComparison] : 0;
	    let f4UpLeft = x > xBiggerThan && lastLine ? lastLine[x - xComparison] : 0;
	    let f4Add = paethPredictor(f4Left, f4Up, f4UpLeft);
	    unfilteredLine[x] = rawByte + f4Add;
	  }
	};

	Filter.prototype._reverseFilterLine = function (rawData) {
	  let filter = rawData[0];
	  let unfilteredLine;
	  let currentImage = this._images[this._imageIndex];
	  let byteWidth = currentImage.byteWidth;

	  if (filter === 0) {
	    unfilteredLine = rawData.slice(1, byteWidth + 1);
	  } else {
	    unfilteredLine = Buffer.alloc(byteWidth);

	    switch (filter) {
	      case 1:
	        this._unFilterType1(rawData, unfilteredLine, byteWidth);
	        break;
	      case 2:
	        this._unFilterType2(rawData, unfilteredLine, byteWidth);
	        break;
	      case 3:
	        this._unFilterType3(rawData, unfilteredLine, byteWidth);
	        break;
	      case 4:
	        this._unFilterType4(rawData, unfilteredLine, byteWidth);
	        break;
	      default:
	        throw new Error("Unrecognised filter type - " + filter);
	    }
	  }

	  this.write(unfilteredLine);

	  currentImage.lineIndex++;
	  if (currentImage.lineIndex >= currentImage.height) {
	    this._lastLine = null;
	    this._imageIndex++;
	    currentImage = this._images[this._imageIndex];
	  } else {
	    this._lastLine = unfilteredLine;
	  }

	  if (currentImage) {
	    // read, using the byte width that may be from the new current image
	    this.read(currentImage.byteWidth + 1, this._reverseFilterLine.bind(this));
	  } else {
	    this._lastLine = null;
	    this.complete();
	  }
	};

	}).call(this);}).call(this,require("buffer").Buffer);
	},{"./interlace":11,"./paeth-predictor":15,"buffer":32}],10:[function(require,module,exports){
	(function (Buffer){(function (){

	function dePalette(indata, outdata, width, height, palette) {
	  let pxPos = 0;
	  // use values from palette
	  for (let y = 0; y < height; y++) {
	    for (let x = 0; x < width; x++) {
	      let color = palette[indata[pxPos]];

	      if (!color) {
	        throw new Error("index " + indata[pxPos] + " not in palette");
	      }

	      for (let i = 0; i < 4; i++) {
	        outdata[pxPos + i] = color[i];
	      }
	      pxPos += 4;
	    }
	  }
	}

	function replaceTransparentColor(indata, outdata, width, height, transColor) {
	  let pxPos = 0;
	  for (let y = 0; y < height; y++) {
	    for (let x = 0; x < width; x++) {
	      let makeTrans = false;

	      if (transColor.length === 1) {
	        if (transColor[0] === indata[pxPos]) {
	          makeTrans = true;
	        }
	      } else if (
	        transColor[0] === indata[pxPos] &&
	        transColor[1] === indata[pxPos + 1] &&
	        transColor[2] === indata[pxPos + 2]
	      ) {
	        makeTrans = true;
	      }
	      if (makeTrans) {
	        for (let i = 0; i < 4; i++) {
	          outdata[pxPos + i] = 0;
	        }
	      }
	      pxPos += 4;
	    }
	  }
	}

	function scaleDepth(indata, outdata, width, height, depth) {
	  let maxOutSample = 255;
	  let maxInSample = Math.pow(2, depth) - 1;
	  let pxPos = 0;

	  for (let y = 0; y < height; y++) {
	    for (let x = 0; x < width; x++) {
	      for (let i = 0; i < 4; i++) {
	        outdata[pxPos + i] = Math.floor(
	          (indata[pxPos + i] * maxOutSample) / maxInSample + 0.5
	        );
	      }
	      pxPos += 4;
	    }
	  }
	}

	module.exports = function (indata, imageData, skipRescale = false) {
	  let depth = imageData.depth;
	  let width = imageData.width;
	  let height = imageData.height;
	  let colorType = imageData.colorType;
	  let transColor = imageData.transColor;
	  let palette = imageData.palette;

	  let outdata = indata; // only different for 16 bits

	  if (colorType === 3) {
	    // paletted
	    dePalette(indata, outdata, width, height, palette);
	  } else {
	    if (transColor) {
	      replaceTransparentColor(indata, outdata, width, height, transColor);
	    }
	    // if it needs scaling
	    if (depth !== 8 && !skipRescale) {
	      // if we need to change the buffer size
	      if (depth === 16) {
	        outdata = Buffer.alloc(width * height * 4);
	      }
	      scaleDepth(indata, outdata, width, height, depth);
	    }
	  }
	  return outdata;
	};

	}).call(this);}).call(this,require("buffer").Buffer);
	},{"buffer":32}],11:[function(require,module,exports){

	// Adam 7
	//   0 1 2 3 4 5 6 7
	// 0 x 6 4 6 x 6 4 6
	// 1 7 7 7 7 7 7 7 7
	// 2 5 6 5 6 5 6 5 6
	// 3 7 7 7 7 7 7 7 7
	// 4 3 6 4 6 3 6 4 6
	// 5 7 7 7 7 7 7 7 7
	// 6 5 6 5 6 5 6 5 6
	// 7 7 7 7 7 7 7 7 7

	let imagePasses = [
	  {
	    // pass 1 - 1px
	    x: [0],
	    y: [0],
	  },
	  {
	    // pass 2 - 1px
	    x: [4],
	    y: [0],
	  },
	  {
	    // pass 3 - 2px
	    x: [0, 4],
	    y: [4],
	  },
	  {
	    // pass 4 - 4px
	    x: [2, 6],
	    y: [0, 4],
	  },
	  {
	    // pass 5 - 8px
	    x: [0, 2, 4, 6],
	    y: [2, 6],
	  },
	  {
	    // pass 6 - 16px
	    x: [1, 3, 5, 7],
	    y: [0, 2, 4, 6],
	  },
	  {
	    // pass 7 - 32px
	    x: [0, 1, 2, 3, 4, 5, 6, 7],
	    y: [1, 3, 5, 7],
	  },
	];

	exports.getImagePasses = function (width, height) {
	  let images = [];
	  let xLeftOver = width % 8;
	  let yLeftOver = height % 8;
	  let xRepeats = (width - xLeftOver) / 8;
	  let yRepeats = (height - yLeftOver) / 8;
	  for (let i = 0; i < imagePasses.length; i++) {
	    let pass = imagePasses[i];
	    let passWidth = xRepeats * pass.x.length;
	    let passHeight = yRepeats * pass.y.length;
	    for (let j = 0; j < pass.x.length; j++) {
	      if (pass.x[j] < xLeftOver) {
	        passWidth++;
	      } else {
	        break;
	      }
	    }
	    for (let j = 0; j < pass.y.length; j++) {
	      if (pass.y[j] < yLeftOver) {
	        passHeight++;
	      } else {
	        break;
	      }
	    }
	    if (passWidth > 0 && passHeight > 0) {
	      images.push({ width: passWidth, height: passHeight, index: i });
	    }
	  }
	  return images;
	};

	exports.getInterlaceIterator = function (width) {
	  return function (x, y, pass) {
	    let outerXLeftOver = x % imagePasses[pass].x.length;
	    let outerX =
	      ((x - outerXLeftOver) / imagePasses[pass].x.length) * 8 +
	      imagePasses[pass].x[outerXLeftOver];
	    let outerYLeftOver = y % imagePasses[pass].y.length;
	    let outerY =
	      ((y - outerYLeftOver) / imagePasses[pass].y.length) * 8 +
	      imagePasses[pass].y[outerYLeftOver];
	    return outerX * 4 + outerY * width * 4;
	  };
	};

	},{}],12:[function(require,module,exports){
	(function (Buffer){(function (){

	let util = require("util");
	let Stream = require("stream");
	let constants = require("./constants");
	let Packer = require("./packer");

	let PackerAsync = (module.exports = function (opt) {
	  Stream.call(this);

	  let options = opt || {};

	  this._packer = new Packer(options);
	  this._deflate = this._packer.createDeflate();

	  this.readable = true;
	});
	util.inherits(PackerAsync, Stream);

	PackerAsync.prototype.pack = function (data, width, height, gamma) {
	  // Signature
	  this.emit("data", Buffer.from(constants.PNG_SIGNATURE));
	  this.emit("data", this._packer.packIHDR(width, height));

	  if (gamma) {
	    this.emit("data", this._packer.packGAMA(gamma));
	  }

	  let filteredData = this._packer.filterData(data, width, height);

	  // compress it
	  this._deflate.on("error", this.emit.bind(this, "error"));

	  this._deflate.on(
	    "data",
	    function (compressedData) {
	      this.emit("data", this._packer.packIDAT(compressedData));
	    }.bind(this)
	  );

	  this._deflate.on(
	    "end",
	    function () {
	      this.emit("data", this._packer.packIEND());
	      this.emit("end");
	    }.bind(this)
	  );

	  this._deflate.end(filteredData);
	};

	}).call(this);}).call(this,require("buffer").Buffer);
	},{"./constants":4,"./packer":14,"buffer":32,"stream":65,"util":84}],13:[function(require,module,exports){
	(function (Buffer){(function (){

	let hasSyncZlib = true;
	let zlib = require("zlib");
	if (!zlib.deflateSync) {
	  hasSyncZlib = false;
	}
	let constants = require("./constants");
	let Packer = require("./packer");

	module.exports = function (metaData, opt) {
	  if (!hasSyncZlib) {
	    throw new Error(
	      "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
	    );
	  }

	  let options = opt || {};

	  let packer = new Packer(options);

	  let chunks = [];

	  // Signature
	  chunks.push(Buffer.from(constants.PNG_SIGNATURE));

	  // Header
	  chunks.push(packer.packIHDR(metaData.width, metaData.height));

	  if (metaData.gamma) {
	    chunks.push(packer.packGAMA(metaData.gamma));
	  }

	  let filteredData = packer.filterData(
	    metaData.data,
	    metaData.width,
	    metaData.height
	  );

	  // compress it
	  let compressedData = zlib.deflateSync(
	    filteredData,
	    packer.getDeflateOptions()
	  );
	  filteredData = null;

	  if (!compressedData || !compressedData.length) {
	    throw new Error("bad png - invalid compressed data response");
	  }
	  chunks.push(packer.packIDAT(compressedData));

	  // End
	  chunks.push(packer.packIEND());

	  return Buffer.concat(chunks);
	};

	}).call(this);}).call(this,require("buffer").Buffer);
	},{"./constants":4,"./packer":14,"buffer":32,"zlib":31}],14:[function(require,module,exports){
	(function (Buffer){(function (){

	let constants = require("./constants");
	let CrcStream = require("./crc");
	let bitPacker = require("./bitpacker");
	let filter = require("./filter-pack");
	let zlib = require("zlib");

	let Packer = (module.exports = function (options) {
	  this._options = options;

	  options.deflateChunkSize = options.deflateChunkSize || 32 * 1024;
	  options.deflateLevel =
	    options.deflateLevel != null ? options.deflateLevel : 9;
	  options.deflateStrategy =
	    options.deflateStrategy != null ? options.deflateStrategy : 3;
	  options.inputHasAlpha =
	    options.inputHasAlpha != null ? options.inputHasAlpha : true;
	  options.deflateFactory = options.deflateFactory || zlib.createDeflate;
	  options.bitDepth = options.bitDepth || 8;
	  // This is outputColorType
	  options.colorType =
	    typeof options.colorType === "number"
	      ? options.colorType
	      : constants.COLORTYPE_COLOR_ALPHA;
	  options.inputColorType =
	    typeof options.inputColorType === "number"
	      ? options.inputColorType
	      : constants.COLORTYPE_COLOR_ALPHA;

	  if (
	    [
	      constants.COLORTYPE_GRAYSCALE,
	      constants.COLORTYPE_COLOR,
	      constants.COLORTYPE_COLOR_ALPHA,
	      constants.COLORTYPE_ALPHA,
	    ].indexOf(options.colorType) === -1
	  ) {
	    throw new Error(
	      "option color type:" + options.colorType + " is not supported at present"
	    );
	  }
	  if (
	    [
	      constants.COLORTYPE_GRAYSCALE,
	      constants.COLORTYPE_COLOR,
	      constants.COLORTYPE_COLOR_ALPHA,
	      constants.COLORTYPE_ALPHA,
	    ].indexOf(options.inputColorType) === -1
	  ) {
	    throw new Error(
	      "option input color type:" +
	        options.inputColorType +
	        " is not supported at present"
	    );
	  }
	  if (options.bitDepth !== 8 && options.bitDepth !== 16) {
	    throw new Error(
	      "option bit depth:" + options.bitDepth + " is not supported at present"
	    );
	  }
	});

	Packer.prototype.getDeflateOptions = function () {
	  return {
	    chunkSize: this._options.deflateChunkSize,
	    level: this._options.deflateLevel,
	    strategy: this._options.deflateStrategy,
	  };
	};

	Packer.prototype.createDeflate = function () {
	  return this._options.deflateFactory(this.getDeflateOptions());
	};

	Packer.prototype.filterData = function (data, width, height) {
	  // convert to correct format for filtering (e.g. right bpp and bit depth)
	  let packedData = bitPacker(data, width, height, this._options);

	  // filter pixel data
	  let bpp = constants.COLORTYPE_TO_BPP_MAP[this._options.colorType];
	  let filteredData = filter(packedData, width, height, this._options, bpp);
	  return filteredData;
	};

	Packer.prototype._packChunk = function (type, data) {
	  let len = data ? data.length : 0;
	  let buf = Buffer.alloc(len + 12);

	  buf.writeUInt32BE(len, 0);
	  buf.writeUInt32BE(type, 4);

	  if (data) {
	    data.copy(buf, 8);
	  }

	  buf.writeInt32BE(
	    CrcStream.crc32(buf.slice(4, buf.length - 4)),
	    buf.length - 4
	  );
	  return buf;
	};

	Packer.prototype.packGAMA = function (gamma) {
	  let buf = Buffer.alloc(4);
	  buf.writeUInt32BE(Math.floor(gamma * constants.GAMMA_DIVISION), 0);
	  return this._packChunk(constants.TYPE_gAMA, buf);
	};

	Packer.prototype.packIHDR = function (width, height) {
	  let buf = Buffer.alloc(13);
	  buf.writeUInt32BE(width, 0);
	  buf.writeUInt32BE(height, 4);
	  buf[8] = this._options.bitDepth; // Bit depth
	  buf[9] = this._options.colorType; // colorType
	  buf[10] = 0; // compression
	  buf[11] = 0; // filter
	  buf[12] = 0; // interlace

	  return this._packChunk(constants.TYPE_IHDR, buf);
	};

	Packer.prototype.packIDAT = function (data) {
	  return this._packChunk(constants.TYPE_IDAT, data);
	};

	Packer.prototype.packIEND = function () {
	  return this._packChunk(constants.TYPE_IEND, null);
	};

	}).call(this);}).call(this,require("buffer").Buffer);
	},{"./bitpacker":2,"./constants":4,"./crc":5,"./filter-pack":6,"buffer":32,"zlib":31}],15:[function(require,module,exports){

	module.exports = function paethPredictor(left, above, upLeft) {
	  let paeth = left + above - upLeft;
	  let pLeft = Math.abs(paeth - left);
	  let pAbove = Math.abs(paeth - above);
	  let pUpLeft = Math.abs(paeth - upLeft);

	  if (pLeft <= pAbove && pLeft <= pUpLeft) {
	    return left;
	  }
	  if (pAbove <= pUpLeft) {
	    return above;
	  }
	  return upLeft;
	};

	},{}],16:[function(require,module,exports){

	let util = require("util");
	let zlib = require("zlib");
	let ChunkStream = require("./chunkstream");
	let FilterAsync = require("./filter-parse-async");
	let Parser = require("./parser");
	let bitmapper = require("./bitmapper");
	let formatNormaliser = require("./format-normaliser");

	let ParserAsync = (module.exports = function (options) {
	  ChunkStream.call(this);

	  this._parser = new Parser(options, {
	    read: this.read.bind(this),
	    error: this._handleError.bind(this),
	    metadata: this._handleMetaData.bind(this),
	    gamma: this.emit.bind(this, "gamma"),
	    palette: this._handlePalette.bind(this),
	    transColor: this._handleTransColor.bind(this),
	    finished: this._finished.bind(this),
	    inflateData: this._inflateData.bind(this),
	    simpleTransparency: this._simpleTransparency.bind(this),
	    headersFinished: this._headersFinished.bind(this),
	  });
	  this._options = options;
	  this.writable = true;

	  this._parser.start();
	});
	util.inherits(ParserAsync, ChunkStream);

	ParserAsync.prototype._handleError = function (err) {
	  this.emit("error", err);

	  this.writable = false;

	  this.destroy();

	  if (this._inflate && this._inflate.destroy) {
	    this._inflate.destroy();
	  }

	  if (this._filter) {
	    this._filter.destroy();
	    // For backward compatibility with Node 7 and below.
	    // Suppress errors due to _inflate calling write() even after
	    // it's destroy()'ed.
	    this._filter.on("error", function () {});
	  }

	  this.errord = true;
	};

	ParserAsync.prototype._inflateData = function (data) {
	  if (!this._inflate) {
	    if (this._bitmapInfo.interlace) {
	      this._inflate = zlib.createInflate();

	      this._inflate.on("error", this.emit.bind(this, "error"));
	      this._filter.on("complete", this._complete.bind(this));

	      this._inflate.pipe(this._filter);
	    } else {
	      let rowSize =
	        ((this._bitmapInfo.width *
	          this._bitmapInfo.bpp *
	          this._bitmapInfo.depth +
	          7) >>
	          3) +
	        1;
	      let imageSize = rowSize * this._bitmapInfo.height;
	      let chunkSize = Math.max(imageSize, zlib.Z_MIN_CHUNK);

	      this._inflate = zlib.createInflate({ chunkSize: chunkSize });
	      let leftToInflate = imageSize;

	      let emitError = this.emit.bind(this, "error");
	      this._inflate.on("error", function (err) {
	        if (!leftToInflate) {
	          return;
	        }

	        emitError(err);
	      });
	      this._filter.on("complete", this._complete.bind(this));

	      let filterWrite = this._filter.write.bind(this._filter);
	      this._inflate.on("data", function (chunk) {
	        if (!leftToInflate) {
	          return;
	        }

	        if (chunk.length > leftToInflate) {
	          chunk = chunk.slice(0, leftToInflate);
	        }

	        leftToInflate -= chunk.length;

	        filterWrite(chunk);
	      });

	      this._inflate.on("end", this._filter.end.bind(this._filter));
	    }
	  }
	  this._inflate.write(data);
	};

	ParserAsync.prototype._handleMetaData = function (metaData) {
	  this._metaData = metaData;
	  this._bitmapInfo = Object.create(metaData);

	  this._filter = new FilterAsync(this._bitmapInfo);
	};

	ParserAsync.prototype._handleTransColor = function (transColor) {
	  this._bitmapInfo.transColor = transColor;
	};

	ParserAsync.prototype._handlePalette = function (palette) {
	  this._bitmapInfo.palette = palette;
	};

	ParserAsync.prototype._simpleTransparency = function () {
	  this._metaData.alpha = true;
	};

	ParserAsync.prototype._headersFinished = function () {
	  // Up until this point, we don't know if we have a tRNS chunk (alpha)
	  // so we can't emit metadata any earlier
	  this.emit("metadata", this._metaData);
	};

	ParserAsync.prototype._finished = function () {
	  if (this.errord) {
	    return;
	  }

	  if (!this._inflate) {
	    this.emit("error", "No Inflate block");
	  } else {
	    // no more data to inflate
	    this._inflate.end();
	  }
	};

	ParserAsync.prototype._complete = function (filteredData) {
	  if (this.errord) {
	    return;
	  }

	  let normalisedBitmapData;

	  try {
	    let bitmapData = bitmapper.dataToBitMap(filteredData, this._bitmapInfo);

	    normalisedBitmapData = formatNormaliser(
	      bitmapData,
	      this._bitmapInfo,
	      this._options.skipRescale
	    );
	    bitmapData = null;
	  } catch (ex) {
	    this._handleError(ex);
	    return;
	  }

	  this.emit("parsed", normalisedBitmapData);
	};

	},{"./bitmapper":1,"./chunkstream":3,"./filter-parse-async":7,"./format-normaliser":10,"./parser":18,"util":84,"zlib":31}],17:[function(require,module,exports){
	(function (Buffer){(function (){

	let hasSyncZlib = true;
	let zlib = require("zlib");
	let inflateSync = require("./sync-inflate");
	if (!zlib.deflateSync) {
	  hasSyncZlib = false;
	}
	let SyncReader = require("./sync-reader");
	let FilterSync = require("./filter-parse-sync");
	let Parser = require("./parser");
	let bitmapper = require("./bitmapper");
	let formatNormaliser = require("./format-normaliser");

	module.exports = function (buffer, options) {
	  if (!hasSyncZlib) {
	    throw new Error(
	      "To use the sync capability of this library in old node versions, please pin pngjs to v2.3.0"
	    );
	  }

	  let err;
	  function handleError(_err_) {
	    err = _err_;
	  }

	  let metaData;
	  function handleMetaData(_metaData_) {
	    metaData = _metaData_;
	  }

	  function handleTransColor(transColor) {
	    metaData.transColor = transColor;
	  }

	  function handlePalette(palette) {
	    metaData.palette = palette;
	  }

	  function handleSimpleTransparency() {
	    metaData.alpha = true;
	  }

	  let gamma;
	  function handleGamma(_gamma_) {
	    gamma = _gamma_;
	  }

	  let inflateDataList = [];
	  function handleInflateData(inflatedData) {
	    inflateDataList.push(inflatedData);
	  }

	  let reader = new SyncReader(buffer);

	  let parser = new Parser(options, {
	    read: reader.read.bind(reader),
	    error: handleError,
	    metadata: handleMetaData,
	    gamma: handleGamma,
	    palette: handlePalette,
	    transColor: handleTransColor,
	    inflateData: handleInflateData,
	    simpleTransparency: handleSimpleTransparency,
	  });

	  parser.start();
	  reader.process();

	  if (err) {
	    throw err;
	  }

	  //join together the inflate datas
	  let inflateData = Buffer.concat(inflateDataList);
	  inflateDataList.length = 0;

	  let inflatedData;
	  if (metaData.interlace) {
	    inflatedData = zlib.inflateSync(inflateData);
	  } else {
	    let rowSize =
	      ((metaData.width * metaData.bpp * metaData.depth + 7) >> 3) + 1;
	    let imageSize = rowSize * metaData.height;
	    inflatedData = inflateSync(inflateData, {
	      chunkSize: imageSize,
	      maxLength: imageSize,
	    });
	  }
	  inflateData = null;

	  if (!inflatedData || !inflatedData.length) {
	    throw new Error("bad png - invalid inflate data response");
	  }

	  let unfilteredData = FilterSync.process(inflatedData, metaData);
	  inflateData = null;

	  let bitmapData = bitmapper.dataToBitMap(unfilteredData, metaData);
	  unfilteredData = null;

	  let normalisedBitmapData = formatNormaliser(
	    bitmapData,
	    metaData,
	    options.skipRescale
	  );

	  metaData.data = normalisedBitmapData;
	  metaData.gamma = gamma || 0;

	  return metaData;
	};

	}).call(this);}).call(this,require("buffer").Buffer);
	},{"./bitmapper":1,"./filter-parse-sync":8,"./format-normaliser":10,"./parser":18,"./sync-inflate":21,"./sync-reader":22,"buffer":32,"zlib":31}],18:[function(require,module,exports){
	(function (Buffer){(function (){

	let constants = require("./constants");
	let CrcCalculator = require("./crc");

	let Parser = (module.exports = function (options, dependencies) {
	  this._options = options;
	  options.checkCRC = options.checkCRC !== false;

	  this._hasIHDR = false;
	  this._hasIEND = false;
	  this._emittedHeadersFinished = false;

	  // input flags/metadata
	  this._palette = [];
	  this._colorType = 0;

	  this._chunks = {};
	  this._chunks[constants.TYPE_IHDR] = this._handleIHDR.bind(this);
	  this._chunks[constants.TYPE_IEND] = this._handleIEND.bind(this);
	  this._chunks[constants.TYPE_IDAT] = this._handleIDAT.bind(this);
	  this._chunks[constants.TYPE_PLTE] = this._handlePLTE.bind(this);
	  this._chunks[constants.TYPE_tRNS] = this._handleTRNS.bind(this);
	  this._chunks[constants.TYPE_gAMA] = this._handleGAMA.bind(this);

	  this.read = dependencies.read;
	  this.error = dependencies.error;
	  this.metadata = dependencies.metadata;
	  this.gamma = dependencies.gamma;
	  this.transColor = dependencies.transColor;
	  this.palette = dependencies.palette;
	  this.parsed = dependencies.parsed;
	  this.inflateData = dependencies.inflateData;
	  this.finished = dependencies.finished;
	  this.simpleTransparency = dependencies.simpleTransparency;
	  this.headersFinished = dependencies.headersFinished || function () {};
	});

	Parser.prototype.start = function () {
	  this.read(constants.PNG_SIGNATURE.length, this._parseSignature.bind(this));
	};

	Parser.prototype._parseSignature = function (data) {
	  let signature = constants.PNG_SIGNATURE;

	  for (let i = 0; i < signature.length; i++) {
	    if (data[i] !== signature[i]) {
	      this.error(new Error("Invalid file signature"));
	      return;
	    }
	  }
	  this.read(8, this._parseChunkBegin.bind(this));
	};

	Parser.prototype._parseChunkBegin = function (data) {
	  // chunk content length
	  let length = data.readUInt32BE(0);

	  // chunk type
	  let type = data.readUInt32BE(4);
	  let name = "";
	  for (let i = 4; i < 8; i++) {
	    name += String.fromCharCode(data[i]);
	  }

	  //console.log('chunk ', name, length);

	  // chunk flags
	  let ancillary = Boolean(data[4] & 0x20); // or critical
	  //    priv = Boolean(data[5] & 0x20), // or public
	  //    safeToCopy = Boolean(data[7] & 0x20); // or unsafe

	  if (!this._hasIHDR && type !== constants.TYPE_IHDR) {
	    this.error(new Error("Expected IHDR on beggining"));
	    return;
	  }

	  this._crc = new CrcCalculator();
	  this._crc.write(Buffer.from(name));

	  if (this._chunks[type]) {
	    return this._chunks[type](length);
	  }

	  if (!ancillary) {
	    this.error(new Error("Unsupported critical chunk type " + name));
	    return;
	  }

	  this.read(length + 4, this._skipChunk.bind(this));
	};

	Parser.prototype._skipChunk = function (/*data*/) {
	  this.read(8, this._parseChunkBegin.bind(this));
	};

	Parser.prototype._handleChunkEnd = function () {
	  this.read(4, this._parseChunkEnd.bind(this));
	};

	Parser.prototype._parseChunkEnd = function (data) {
	  let fileCrc = data.readInt32BE(0);
	  let calcCrc = this._crc.crc32();

	  // check CRC
	  if (this._options.checkCRC && calcCrc !== fileCrc) {
	    this.error(new Error("Crc error - " + fileCrc + " - " + calcCrc));
	    return;
	  }

	  if (!this._hasIEND) {
	    this.read(8, this._parseChunkBegin.bind(this));
	  }
	};

	Parser.prototype._handleIHDR = function (length) {
	  this.read(length, this._parseIHDR.bind(this));
	};
	Parser.prototype._parseIHDR = function (data) {
	  this._crc.write(data);

	  let width = data.readUInt32BE(0);
	  let height = data.readUInt32BE(4);
	  let depth = data[8];
	  let colorType = data[9]; // bits: 1 palette, 2 color, 4 alpha
	  let compr = data[10];
	  let filter = data[11];
	  let interlace = data[12];

	  // console.log('    width', width, 'height', height,
	  //     'depth', depth, 'colorType', colorType,
	  //     'compr', compr, 'filter', filter, 'interlace', interlace
	  // );

	  if (
	    depth !== 8 &&
	    depth !== 4 &&
	    depth !== 2 &&
	    depth !== 1 &&
	    depth !== 16
	  ) {
	    this.error(new Error("Unsupported bit depth " + depth));
	    return;
	  }
	  if (!(colorType in constants.COLORTYPE_TO_BPP_MAP)) {
	    this.error(new Error("Unsupported color type"));
	    return;
	  }
	  if (compr !== 0) {
	    this.error(new Error("Unsupported compression method"));
	    return;
	  }
	  if (filter !== 0) {
	    this.error(new Error("Unsupported filter method"));
	    return;
	  }
	  if (interlace !== 0 && interlace !== 1) {
	    this.error(new Error("Unsupported interlace method"));
	    return;
	  }

	  this._colorType = colorType;

	  let bpp = constants.COLORTYPE_TO_BPP_MAP[this._colorType];

	  this._hasIHDR = true;

	  this.metadata({
	    width: width,
	    height: height,
	    depth: depth,
	    interlace: Boolean(interlace),
	    palette: Boolean(colorType & constants.COLORTYPE_PALETTE),
	    color: Boolean(colorType & constants.COLORTYPE_COLOR),
	    alpha: Boolean(colorType & constants.COLORTYPE_ALPHA),
	    bpp: bpp,
	    colorType: colorType,
	  });

	  this._handleChunkEnd();
	};

	Parser.prototype._handlePLTE = function (length) {
	  this.read(length, this._parsePLTE.bind(this));
	};
	Parser.prototype._parsePLTE = function (data) {
	  this._crc.write(data);

	  let entries = Math.floor(data.length / 3);
	  // console.log('Palette:', entries);

	  for (let i = 0; i < entries; i++) {
	    this._palette.push([data[i * 3], data[i * 3 + 1], data[i * 3 + 2], 0xff]);
	  }

	  this.palette(this._palette);

	  this._handleChunkEnd();
	};

	Parser.prototype._handleTRNS = function (length) {
	  this.simpleTransparency();
	  this.read(length, this._parseTRNS.bind(this));
	};
	Parser.prototype._parseTRNS = function (data) {
	  this._crc.write(data);

	  // palette
	  if (this._colorType === constants.COLORTYPE_PALETTE_COLOR) {
	    if (this._palette.length === 0) {
	      this.error(new Error("Transparency chunk must be after palette"));
	      return;
	    }
	    if (data.length > this._palette.length) {
	      this.error(new Error("More transparent colors than palette size"));
	      return;
	    }
	    for (let i = 0; i < data.length; i++) {
	      this._palette[i][3] = data[i];
	    }
	    this.palette(this._palette);
	  }

	  // for colorType 0 (grayscale) and 2 (rgb)
	  // there might be one gray/color defined as transparent
	  if (this._colorType === constants.COLORTYPE_GRAYSCALE) {
	    // grey, 2 bytes
	    this.transColor([data.readUInt16BE(0)]);
	  }
	  if (this._colorType === constants.COLORTYPE_COLOR) {
	    this.transColor([
	      data.readUInt16BE(0),
	      data.readUInt16BE(2),
	      data.readUInt16BE(4),
	    ]);
	  }

	  this._handleChunkEnd();
	};

	Parser.prototype._handleGAMA = function (length) {
	  this.read(length, this._parseGAMA.bind(this));
	};
	Parser.prototype._parseGAMA = function (data) {
	  this._crc.write(data);
	  this.gamma(data.readUInt32BE(0) / constants.GAMMA_DIVISION);

	  this._handleChunkEnd();
	};

	Parser.prototype._handleIDAT = function (length) {
	  if (!this._emittedHeadersFinished) {
	    this._emittedHeadersFinished = true;
	    this.headersFinished();
	  }
	  this.read(-length, this._parseIDAT.bind(this, length));
	};
	Parser.prototype._parseIDAT = function (length, data) {
	  this._crc.write(data);

	  if (
	    this._colorType === constants.COLORTYPE_PALETTE_COLOR &&
	    this._palette.length === 0
	  ) {
	    throw new Error("Expected palette not found");
	  }

	  this.inflateData(data);
	  let leftOverLength = length - data.length;

	  if (leftOverLength > 0) {
	    this._handleIDAT(leftOverLength);
	  } else {
	    this._handleChunkEnd();
	  }
	};

	Parser.prototype._handleIEND = function (length) {
	  this.read(length, this._parseIEND.bind(this));
	};
	Parser.prototype._parseIEND = function (data) {
	  this._crc.write(data);

	  this._hasIEND = true;
	  this._handleChunkEnd();

	  if (this.finished) {
	    this.finished();
	  }
	};

	}).call(this);}).call(this,require("buffer").Buffer);
	},{"./constants":4,"./crc":5,"buffer":32}],19:[function(require,module,exports){

	let parse = require("./parser-sync");
	let pack = require("./packer-sync");

	exports.read = function (buffer, options) {
	  return parse(buffer, options || {});
	};

	exports.write = function (png, options) {
	  return pack(png, options);
	};

	},{"./packer-sync":13,"./parser-sync":17}],20:[function(require,module,exports){
	(function (process,Buffer){(function (){

	let util = require("util");
	let Stream = require("stream");
	let Parser = require("./parser-async");
	let Packer = require("./packer-async");
	let PNGSync = require("./png-sync");

	let PNG = (exports.PNG = function (options) {
	  Stream.call(this);

	  options = options || {}; // eslint-disable-line no-param-reassign

	  // coerce pixel dimensions to integers (also coerces undefined -> 0):
	  this.width = options.width | 0;
	  this.height = options.height | 0;

	  this.data =
	    this.width > 0 && this.height > 0
	      ? Buffer.alloc(4 * this.width * this.height)
	      : null;

	  if (options.fill && this.data) {
	    this.data.fill(0);
	  }

	  this.gamma = 0;
	  this.readable = this.writable = true;

	  this._parser = new Parser(options);

	  this._parser.on("error", this.emit.bind(this, "error"));
	  this._parser.on("close", this._handleClose.bind(this));
	  this._parser.on("metadata", this._metadata.bind(this));
	  this._parser.on("gamma", this._gamma.bind(this));
	  this._parser.on(
	    "parsed",
	    function (data) {
	      this.data = data;
	      this.emit("parsed", data);
	    }.bind(this)
	  );

	  this._packer = new Packer(options);
	  this._packer.on("data", this.emit.bind(this, "data"));
	  this._packer.on("end", this.emit.bind(this, "end"));
	  this._parser.on("close", this._handleClose.bind(this));
	  this._packer.on("error", this.emit.bind(this, "error"));
	});
	util.inherits(PNG, Stream);

	PNG.sync = PNGSync;

	PNG.prototype.pack = function () {
	  if (!this.data || !this.data.length) {
	    this.emit("error", "No data provided");
	    return this;
	  }

	  process.nextTick(
	    function () {
	      this._packer.pack(this.data, this.width, this.height, this.gamma);
	    }.bind(this)
	  );

	  return this;
	};

	PNG.prototype.parse = function (data, callback) {
	  if (callback) {
	    let onParsed, onError;

	    onParsed = function (parsedData) {
	      this.removeListener("error", onError);

	      this.data = parsedData;
	      callback(null, this);
	    }.bind(this);

	    onError = function (err) {
	      this.removeListener("parsed", onParsed);

	      callback(err, null);
	    }.bind(this);

	    this.once("parsed", onParsed);
	    this.once("error", onError);
	  }

	  this.end(data);
	  return this;
	};

	PNG.prototype.write = function (data) {
	  this._parser.write(data);
	  return true;
	};

	PNG.prototype.end = function (data) {
	  this._parser.end(data);
	};

	PNG.prototype._metadata = function (metadata) {
	  this.width = metadata.width;
	  this.height = metadata.height;

	  this.emit("metadata", metadata);
	};

	PNG.prototype._gamma = function (gamma) {
	  this.gamma = gamma;
	};

	PNG.prototype._handleClose = function () {
	  if (!this._parser.writable && !this._packer.readable) {
	    this.emit("close");
	  }
	};

	PNG.bitblt = function (src, dst, srcX, srcY, width, height, deltaX, deltaY) {
	  // eslint-disable-line max-params
	  // coerce pixel dimensions to integers (also coerces undefined -> 0):
	  /* eslint-disable no-param-reassign */
	  srcX |= 0;
	  srcY |= 0;
	  width |= 0;
	  height |= 0;
	  deltaX |= 0;
	  deltaY |= 0;
	  /* eslint-enable no-param-reassign */

	  if (
	    srcX > src.width ||
	    srcY > src.height ||
	    srcX + width > src.width ||
	    srcY + height > src.height
	  ) {
	    throw new Error("bitblt reading outside image");
	  }

	  if (
	    deltaX > dst.width ||
	    deltaY > dst.height ||
	    deltaX + width > dst.width ||
	    deltaY + height > dst.height
	  ) {
	    throw new Error("bitblt writing outside image");
	  }

	  for (let y = 0; y < height; y++) {
	    src.data.copy(
	      dst.data,
	      ((deltaY + y) * dst.width + deltaX) << 2,
	      ((srcY + y) * src.width + srcX) << 2,
	      ((srcY + y) * src.width + srcX + width) << 2
	    );
	  }
	};

	PNG.prototype.bitblt = function (
	  dst,
	  srcX,
	  srcY,
	  width,
	  height,
	  deltaX,
	  deltaY
	) {
	  // eslint-disable-line max-params

	  PNG.bitblt(this, dst, srcX, srcY, width, height, deltaX, deltaY);
	  return this;
	};

	PNG.adjustGamma = function (src) {
	  if (src.gamma) {
	    for (let y = 0; y < src.height; y++) {
	      for (let x = 0; x < src.width; x++) {
	        let idx = (src.width * y + x) << 2;

	        for (let i = 0; i < 3; i++) {
	          let sample = src.data[idx + i] / 255;
	          sample = Math.pow(sample, 1 / 2.2 / src.gamma);
	          src.data[idx + i] = Math.round(sample * 255);
	        }
	      }
	    }
	    src.gamma = 0;
	  }
	};

	PNG.prototype.adjustGamma = function () {
	  PNG.adjustGamma(this);
	};

	}).call(this);}).call(this,require('_process'),require("buffer").Buffer);
	},{"./packer-async":12,"./parser-async":16,"./png-sync":19,"_process":63,"buffer":32,"stream":65,"util":84}],21:[function(require,module,exports){
	(function (process,Buffer){(function (){

	let assert = require("assert").ok;
	let zlib = require("zlib");
	let util = require("util");

	let kMaxLength = require("buffer").kMaxLength;

	function Inflate(opts) {
	  if (!(this instanceof Inflate)) {
	    return new Inflate(opts);
	  }

	  if (opts && opts.chunkSize < zlib.Z_MIN_CHUNK) {
	    opts.chunkSize = zlib.Z_MIN_CHUNK;
	  }

	  zlib.Inflate.call(this, opts);

	  // Node 8 --> 9 compatibility check
	  this._offset = this._offset === undefined ? this._outOffset : this._offset;
	  this._buffer = this._buffer || this._outBuffer;

	  if (opts && opts.maxLength != null) {
	    this._maxLength = opts.maxLength;
	  }
	}

	function createInflate(opts) {
	  return new Inflate(opts);
	}

	function _close(engine, callback) {

	  // Caller may invoke .close after a zlib error (which will null _handle).
	  if (!engine._handle) {
	    return;
	  }

	  engine._handle.close();
	  engine._handle = null;
	}

	Inflate.prototype._processChunk = function (chunk, flushFlag, asyncCb) {
	  if (typeof asyncCb === "function") {
	    return zlib.Inflate._processChunk.call(this, chunk, flushFlag, asyncCb);
	  }

	  let self = this;

	  let availInBefore = chunk && chunk.length;
	  let availOutBefore = this._chunkSize - this._offset;
	  let leftToInflate = this._maxLength;
	  let inOff = 0;

	  let buffers = [];
	  let nread = 0;

	  let error;
	  this.on("error", function (err) {
	    error = err;
	  });

	  function handleChunk(availInAfter, availOutAfter) {
	    if (self._hadError) {
	      return;
	    }

	    let have = availOutBefore - availOutAfter;
	    assert(have >= 0, "have should not go down");

	    if (have > 0) {
	      let out = self._buffer.slice(self._offset, self._offset + have);
	      self._offset += have;

	      if (out.length > leftToInflate) {
	        out = out.slice(0, leftToInflate);
	      }

	      buffers.push(out);
	      nread += out.length;
	      leftToInflate -= out.length;

	      if (leftToInflate === 0) {
	        return false;
	      }
	    }

	    if (availOutAfter === 0 || self._offset >= self._chunkSize) {
	      availOutBefore = self._chunkSize;
	      self._offset = 0;
	      self._buffer = Buffer.allocUnsafe(self._chunkSize);
	    }

	    if (availOutAfter === 0) {
	      inOff += availInBefore - availInAfter;
	      availInBefore = availInAfter;

	      return true;
	    }

	    return false;
	  }

	  assert(this._handle, "zlib binding closed");
	  let res;
	  do {
	    res = this._handle.writeSync(
	      flushFlag,
	      chunk, // in
	      inOff, // in_off
	      availInBefore, // in_len
	      this._buffer, // out
	      this._offset, //out_off
	      availOutBefore
	    ); // out_len
	    // Node 8 --> 9 compatibility check
	    res = res || this._writeState;
	  } while (!this._hadError && handleChunk(res[0], res[1]));

	  if (this._hadError) {
	    throw error;
	  }

	  if (nread >= kMaxLength) {
	    _close(this);
	    throw new RangeError(
	      "Cannot create final Buffer. It would be larger than 0x" +
	        kMaxLength.toString(16) +
	        " bytes"
	    );
	  }

	  let buf = Buffer.concat(buffers, nread);
	  _close(this);

	  return buf;
	};

	util.inherits(Inflate, zlib.Inflate);

	function zlibBufferSync(engine, buffer) {
	  if (typeof buffer === "string") {
	    buffer = Buffer.from(buffer);
	  }
	  if (!(buffer instanceof Buffer)) {
	    throw new TypeError("Not a string or buffer");
	  }

	  let flushFlag = engine._finishFlushFlag;
	  if (flushFlag == null) {
	    flushFlag = zlib.Z_FINISH;
	  }

	  return engine._processChunk(buffer, flushFlag);
	}

	function inflateSync(buffer, opts) {
	  return zlibBufferSync(new Inflate(opts), buffer);
	}

	module.exports = exports = inflateSync;
	exports.Inflate = Inflate;
	exports.createInflate = createInflate;
	exports.inflateSync = inflateSync;

	}).call(this);}).call(this,require('_process'),require("buffer").Buffer);
	},{"_process":63,"assert":23,"buffer":32,"util":84,"zlib":31}],22:[function(require,module,exports){

	let SyncReader = (module.exports = function (buffer) {
	  this._buffer = buffer;
	  this._reads = [];
	});

	SyncReader.prototype.read = function (length, callback) {
	  this._reads.push({
	    length: Math.abs(length), // if length < 0 then at most this length
	    allowLess: length < 0,
	    func: callback,
	  });
	};

	SyncReader.prototype.process = function () {
	  // as long as there is any data and read requests
	  while (this._reads.length > 0 && this._buffer.length) {
	    let read = this._reads[0];

	    if (
	      this._buffer.length &&
	      (this._buffer.length >= read.length || read.allowLess)
	    ) {
	      // ok there is any data so that we can satisfy this request
	      this._reads.shift(); // == read

	      let buf = this._buffer;

	      this._buffer = buf.slice(read.length);

	      read.func.call(this, buf.slice(0, read.length));
	    } else {
	      break;
	    }
	  }

	  if (this._reads.length > 0) {
	    throw new Error("There are some read requests waitng on finished stream");
	  }

	  if (this._buffer.length > 0) {
	    throw new Error("unrecognised content at end of stream");
	  }
	};

	},{}],23:[function(require,module,exports){
	(function (global){(function (){

	var objectAssign = require('object-assign');

	// compare and isBuffer taken from https://github.com/feross/buffer/blob/680e9e5e488f22aac27599a57dc844a6315928dd/index.js
	// original notice:

	/*!
	 * The buffer module from node.js, for the browser.
	 *
	 * @author   Feross Aboukhadijeh <feross@feross.org> <http://feross.org>
	 * @license  MIT
	 */
	function compare(a, b) {
	  if (a === b) {
	    return 0;
	  }

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break;
	    }
	  }

	  if (x < y) {
	    return -1;
	  }
	  if (y < x) {
	    return 1;
	  }
	  return 0;
	}
	function isBuffer(b) {
	  if (global.Buffer && typeof global.Buffer.isBuffer === 'function') {
	    return global.Buffer.isBuffer(b);
	  }
	  return !!(b != null && b._isBuffer);
	}

	// based on node assert, original notice:
	// NB: The URL to the CommonJS spec is kept just for tradition.
	//     node-assert has evolved a lot since then, both in API and behavior.

	// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
	//
	// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
	//
	// Originally from narwhal.js (http://narwhaljs.org)
	// Copyright (c) 2009 Thomas Robinson <280north.com>
	//
	// Permission is hereby granted, free of charge, to any person obtaining a copy
	// of this software and associated documentation files (the 'Software'), to
	// deal in the Software without restriction, including without limitation the
	// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	// sell copies of the Software, and to permit persons to whom the Software is
	// furnished to do so, subject to the following conditions:
	//
	// The above copyright notice and this permission notice shall be included in
	// all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
	// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

	var util = require('util/');
	var hasOwn = Object.prototype.hasOwnProperty;
	var pSlice = Array.prototype.slice;
	var functionsHaveNames = (function () {
	  return function foo() {}.name === 'foo';
	}());
	function pToString (obj) {
	  return Object.prototype.toString.call(obj);
	}
	function isView(arrbuf) {
	  if (isBuffer(arrbuf)) {
	    return false;
	  }
	  if (typeof global.ArrayBuffer !== 'function') {
	    return false;
	  }
	  if (typeof ArrayBuffer.isView === 'function') {
	    return ArrayBuffer.isView(arrbuf);
	  }
	  if (!arrbuf) {
	    return false;
	  }
	  if (arrbuf instanceof DataView) {
	    return true;
	  }
	  if (arrbuf.buffer && arrbuf.buffer instanceof ArrayBuffer) {
	    return true;
	  }
	  return false;
	}
	// 1. The assert module provides functions that throw
	// AssertionError's when particular conditions are not met. The
	// assert module must conform to the following interface.

	var assert = module.exports = ok;

	// 2. The AssertionError is defined in assert.
	// new assert.AssertionError({ message: message,
	//                             actual: actual,
	//                             expected: expected })

	var regex = /\s*function\s+([^\(\s]*)\s*/;
	// based on https://github.com/ljharb/function.prototype.name/blob/adeeeec8bfcc6068b187d7d9fb3d5bb1d3a30899/implementation.js
	function getName(func) {
	  if (!util.isFunction(func)) {
	    return;
	  }
	  if (functionsHaveNames) {
	    return func.name;
	  }
	  var str = func.toString();
	  var match = str.match(regex);
	  return match && match[1];
	}
	assert.AssertionError = function AssertionError(options) {
	  this.name = 'AssertionError';
	  this.actual = options.actual;
	  this.expected = options.expected;
	  this.operator = options.operator;
	  if (options.message) {
	    this.message = options.message;
	    this.generatedMessage = false;
	  } else {
	    this.message = getMessage(this);
	    this.generatedMessage = true;
	  }
	  var stackStartFunction = options.stackStartFunction || fail;
	  if (Error.captureStackTrace) {
	    Error.captureStackTrace(this, stackStartFunction);
	  } else {
	    // non v8 browsers so we can have a stacktrace
	    var err = new Error();
	    if (err.stack) {
	      var out = err.stack;

	      // try to strip useless frames
	      var fn_name = getName(stackStartFunction);
	      var idx = out.indexOf('\n' + fn_name);
	      if (idx >= 0) {
	        // once we have located the function frame
	        // we need to strip out everything before it (and its line)
	        var next_line = out.indexOf('\n', idx + 1);
	        out = out.substring(next_line + 1);
	      }

	      this.stack = out;
	    }
	  }
	};

	// assert.AssertionError instanceof Error
	util.inherits(assert.AssertionError, Error);

	function truncate(s, n) {
	  if (typeof s === 'string') {
	    return s.length < n ? s : s.slice(0, n);
	  } else {
	    return s;
	  }
	}
	function inspect(something) {
	  if (functionsHaveNames || !util.isFunction(something)) {
	    return util.inspect(something);
	  }
	  var rawname = getName(something);
	  var name = rawname ? ': ' + rawname : '';
	  return '[Function' +  name + ']';
	}
	function getMessage(self) {
	  return truncate(inspect(self.actual), 128) + ' ' +
	         self.operator + ' ' +
	         truncate(inspect(self.expected), 128);
	}

	// At present only the three keys mentioned above are used and
	// understood by the spec. Implementations or sub modules can pass
	// other keys to the AssertionError's constructor - they will be
	// ignored.

	// 3. All of the following functions must throw an AssertionError
	// when a corresponding condition is not met, with a message that
	// may be undefined if not provided.  All assertion methods provide
	// both the actual and expected values to the assertion error for
	// display purposes.

	function fail(actual, expected, message, operator, stackStartFunction) {
	  throw new assert.AssertionError({
	    message: message,
	    actual: actual,
	    expected: expected,
	    operator: operator,
	    stackStartFunction: stackStartFunction
	  });
	}

	// EXTENSION! allows for well behaved errors defined elsewhere.
	assert.fail = fail;

	// 4. Pure assertion tests whether a value is truthy, as determined
	// by !!guard.
	// assert.ok(guard, message_opt);
	// This statement is equivalent to assert.equal(true, !!guard,
	// message_opt);. To test strictly for the value true, use
	// assert.strictEqual(true, guard, message_opt);.

	function ok(value, message) {
	  if (!value) fail(value, true, message, '==', assert.ok);
	}
	assert.ok = ok;

	// 5. The equality assertion tests shallow, coercive equality with
	// ==.
	// assert.equal(actual, expected, message_opt);

	assert.equal = function equal(actual, expected, message) {
	  if (actual != expected) fail(actual, expected, message, '==', assert.equal);
	};

	// 6. The non-equality assertion tests for whether two objects are not equal
	// with != assert.notEqual(actual, expected, message_opt);

	assert.notEqual = function notEqual(actual, expected, message) {
	  if (actual == expected) {
	    fail(actual, expected, message, '!=', assert.notEqual);
	  }
	};

	// 7. The equivalence assertion tests a deep equality relation.
	// assert.deepEqual(actual, expected, message_opt);

	assert.deepEqual = function deepEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'deepEqual', assert.deepEqual);
	  }
	};

	assert.deepStrictEqual = function deepStrictEqual(actual, expected, message) {
	  if (!_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'deepStrictEqual', assert.deepStrictEqual);
	  }
	};

	function _deepEqual(actual, expected, strict, memos) {
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;
	  } else if (isBuffer(actual) && isBuffer(expected)) {
	    return compare(actual, expected) === 0;

	  // 7.2. If the expected value is a Date object, the actual value is
	  // equivalent if it is also a Date object that refers to the same time.
	  } else if (util.isDate(actual) && util.isDate(expected)) {
	    return actual.getTime() === expected.getTime();

	  // 7.3 If the expected value is a RegExp object, the actual value is
	  // equivalent if it is also a RegExp object with the same source and
	  // properties (`global`, `multiline`, `lastIndex`, `ignoreCase`).
	  } else if (util.isRegExp(actual) && util.isRegExp(expected)) {
	    return actual.source === expected.source &&
	           actual.global === expected.global &&
	           actual.multiline === expected.multiline &&
	           actual.lastIndex === expected.lastIndex &&
	           actual.ignoreCase === expected.ignoreCase;

	  // 7.4. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if ((actual === null || typeof actual !== 'object') &&
	             (expected === null || typeof expected !== 'object')) {
	    return strict ? actual === expected : actual == expected;

	  // If both values are instances of typed arrays, wrap their underlying
	  // ArrayBuffers in a Buffer each to increase performance
	  // This optimization requires the arrays to have the same type as checked by
	  // Object.prototype.toString (aka pToString). Never perform binary
	  // comparisons for Float*Arrays, though, since e.g. +0 === -0 but their
	  // bit patterns are not identical.
	  } else if (isView(actual) && isView(expected) &&
	             pToString(actual) === pToString(expected) &&
	             !(actual instanceof Float32Array ||
	               actual instanceof Float64Array)) {
	    return compare(new Uint8Array(actual.buffer),
	                   new Uint8Array(expected.buffer)) === 0;

	  // 7.5 For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else if (isBuffer(actual) !== isBuffer(expected)) {
	    return false;
	  } else {
	    memos = memos || {actual: [], expected: []};

	    var actualIndex = memos.actual.indexOf(actual);
	    if (actualIndex !== -1) {
	      if (actualIndex === memos.expected.indexOf(expected)) {
	        return true;
	      }
	    }

	    memos.actual.push(actual);
	    memos.expected.push(expected);

	    return objEquiv(actual, expected, strict, memos);
	  }
	}

	function isArguments(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	}

	function objEquiv(a, b, strict, actualVisitedObjects) {
	  if (a === null || a === undefined || b === null || b === undefined)
	    return false;
	  // if one is a primitive, the other must be same
	  if (util.isPrimitive(a) || util.isPrimitive(b))
	    return a === b;
	  if (strict && Object.getPrototypeOf(a) !== Object.getPrototypeOf(b))
	    return false;
	  var aIsArgs = isArguments(a);
	  var bIsArgs = isArguments(b);
	  if ((aIsArgs && !bIsArgs) || (!aIsArgs && bIsArgs))
	    return false;
	  if (aIsArgs) {
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return _deepEqual(a, b, strict);
	  }
	  var ka = objectKeys(a);
	  var kb = objectKeys(b);
	  var key, i;
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length !== kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] !== kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!_deepEqual(a[key], b[key], strict, actualVisitedObjects))
	      return false;
	  }
	  return true;
	}

	// 8. The non-equivalence assertion tests for any deep inequality.
	// assert.notDeepEqual(actual, expected, message_opt);

	assert.notDeepEqual = function notDeepEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, false)) {
	    fail(actual, expected, message, 'notDeepEqual', assert.notDeepEqual);
	  }
	};

	assert.notDeepStrictEqual = notDeepStrictEqual;
	function notDeepStrictEqual(actual, expected, message) {
	  if (_deepEqual(actual, expected, true)) {
	    fail(actual, expected, message, 'notDeepStrictEqual', notDeepStrictEqual);
	  }
	}


	// 9. The strict equality assertion tests strict equality, as determined by ===.
	// assert.strictEqual(actual, expected, message_opt);

	assert.strictEqual = function strictEqual(actual, expected, message) {
	  if (actual !== expected) {
	    fail(actual, expected, message, '===', assert.strictEqual);
	  }
	};

	// 10. The strict non-equality assertion tests for strict inequality, as
	// determined by !==.  assert.notStrictEqual(actual, expected, message_opt);

	assert.notStrictEqual = function notStrictEqual(actual, expected, message) {
	  if (actual === expected) {
	    fail(actual, expected, message, '!==', assert.notStrictEqual);
	  }
	};

	function expectedException(actual, expected) {
	  if (!actual || !expected) {
	    return false;
	  }

	  if (Object.prototype.toString.call(expected) == '[object RegExp]') {
	    return expected.test(actual);
	  }

	  try {
	    if (actual instanceof expected) {
	      return true;
	    }
	  } catch (e) {
	    // Ignore.  The instanceof check doesn't work for arrow functions.
	  }

	  if (Error.isPrototypeOf(expected)) {
	    return false;
	  }

	  return expected.call({}, actual) === true;
	}

	function _tryBlock(block) {
	  var error;
	  try {
	    block();
	  } catch (e) {
	    error = e;
	  }
	  return error;
	}

	function _throws(shouldThrow, block, expected, message) {
	  var actual;

	  if (typeof block !== 'function') {
	    throw new TypeError('"block" argument must be a function');
	  }

	  if (typeof expected === 'string') {
	    message = expected;
	    expected = null;
	  }

	  actual = _tryBlock(block);

	  message = (expected && expected.name ? ' (' + expected.name + ').' : '.') +
	            (message ? ' ' + message : '.');

	  if (shouldThrow && !actual) {
	    fail(actual, expected, 'Missing expected exception' + message);
	  }

	  var userProvidedMessage = typeof message === 'string';
	  var isUnwantedException = !shouldThrow && util.isError(actual);
	  var isUnexpectedException = !shouldThrow && actual && !expected;

	  if ((isUnwantedException &&
	      userProvidedMessage &&
	      expectedException(actual, expected)) ||
	      isUnexpectedException) {
	    fail(actual, expected, 'Got unwanted exception' + message);
	  }

	  if ((shouldThrow && actual && expected &&
	      !expectedException(actual, expected)) || (!shouldThrow && actual)) {
	    throw actual;
	  }
	}

	// 11. Expected to throw an error:
	// assert.throws(block, Error_opt, message_opt);

	assert.throws = function(block, /*optional*/error, /*optional*/message) {
	  _throws(true, block, error, message);
	};

	// EXTENSION! This is annoying to write outside this module.
	assert.doesNotThrow = function(block, /*optional*/error, /*optional*/message) {
	  _throws(false, block, error, message);
	};

	assert.ifError = function(err) { if (err) throw err; };

	// Expose a strict only variant of assert
	function strict(value, message) {
	  if (!value) fail(value, true, message, '==', strict);
	}
	assert.strict = objectAssign(strict, assert, {
	  equal: assert.strictEqual,
	  deepEqual: assert.deepStrictEqual,
	  notEqual: assert.notStrictEqual,
	  notDeepEqual: assert.notDeepStrictEqual
	});
	assert.strict.strict = assert.strict;

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];
	  for (var key in obj) {
	    if (hasOwn.call(obj, key)) keys.push(key);
	  }
	  return keys;
	};

	}).call(this);}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	},{"object-assign":51,"util/":26}],24:[function(require,module,exports){
	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    ctor.prototype = Object.create(superCtor.prototype, {
	      constructor: {
	        value: ctor,
	        enumerable: false,
	        writable: true,
	        configurable: true
	      }
	    });
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    ctor.super_ = superCtor;
	    var TempCtor = function () {};
	    TempCtor.prototype = superCtor.prototype;
	    ctor.prototype = new TempCtor();
	    ctor.prototype.constructor = ctor;
	  };
	}

	},{}],25:[function(require,module,exports){
	module.exports = function isBuffer(arg) {
	  return arg && typeof arg === 'object'
	    && typeof arg.copy === 'function'
	    && typeof arg.fill === 'function'
	    && typeof arg.readUInt8 === 'function';
	};
	},{}],26:[function(require,module,exports){
	(function (process,global){(function (){
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  // Allow for deprecating things in the process of starting up.
	  if (isUndefined(global.process)) {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  if (process.noDeprecation === true) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnviron;
	exports.debuglog = function(set) {
	  if (isUndefined(debugEnviron))
	    debugEnviron = process.env.NODE_DEBUG || '';
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').substr(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.substr(1, name.length - 2);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var length = output.reduce(function(prev, cur) {
	    if (cur.indexOf('\n') >= 0) ;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = require('./support/isBuffer');

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = require('inherits');

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	}).call(this);}).call(this,require('_process'),typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	},{"./support/isBuffer":25,"_process":63,"inherits":24}],27:[function(require,module,exports){
	(function (global){(function (){

	var possibleNames = [
		'BigInt64Array',
		'BigUint64Array',
		'Float32Array',
		'Float64Array',
		'Int16Array',
		'Int32Array',
		'Int8Array',
		'Uint16Array',
		'Uint32Array',
		'Uint8Array',
		'Uint8ClampedArray'
	];

	var g = typeof globalThis === 'undefined' ? global : globalThis;

	module.exports = function availableTypedArrays() {
		var out = [];
		for (var i = 0; i < possibleNames.length; i++) {
			if (typeof g[possibleNames[i]] === 'function') {
				out[out.length] = possibleNames[i];
			}
		}
		return out;
	};

	}).call(this);}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	},{}],28:[function(require,module,exports){

	exports.byteLength = byteLength;
	exports.toByteArray = toByteArray;
	exports.fromByteArray = fromByteArray;

	var lookup = [];
	var revLookup = [];
	var Arr = typeof Uint8Array !== 'undefined' ? Uint8Array : Array;

	var code = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
	for (var i = 0, len = code.length; i < len; ++i) {
	  lookup[i] = code[i];
	  revLookup[code.charCodeAt(i)] = i;
	}

	// Support decoding URL-safe base64 strings, as Node.js does.
	// See: https://en.wikipedia.org/wiki/Base64#URL_applications
	revLookup['-'.charCodeAt(0)] = 62;
	revLookup['_'.charCodeAt(0)] = 63;

	function getLens (b64) {
	  var len = b64.length;

	  if (len % 4 > 0) {
	    throw new Error('Invalid string. Length must be a multiple of 4')
	  }

	  // Trim off extra bytes after placeholder bytes are found
	  // See: https://github.com/beatgammit/base64-js/issues/42
	  var validLen = b64.indexOf('=');
	  if (validLen === -1) validLen = len;

	  var placeHoldersLen = validLen === len
	    ? 0
	    : 4 - (validLen % 4);

	  return [validLen, placeHoldersLen]
	}

	// base64 is 4/3 + up to two characters of the original data
	function byteLength (b64) {
	  var lens = getLens(b64);
	  var validLen = lens[0];
	  var placeHoldersLen = lens[1];
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function _byteLength (b64, validLen, placeHoldersLen) {
	  return ((validLen + placeHoldersLen) * 3 / 4) - placeHoldersLen
	}

	function toByteArray (b64) {
	  var tmp;
	  var lens = getLens(b64);
	  var validLen = lens[0];
	  var placeHoldersLen = lens[1];

	  var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));

	  var curByte = 0;

	  // if there are placeholders, only get up to the last complete 4 chars
	  var len = placeHoldersLen > 0
	    ? validLen - 4
	    : validLen;

	  var i;
	  for (i = 0; i < len; i += 4) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 18) |
	      (revLookup[b64.charCodeAt(i + 1)] << 12) |
	      (revLookup[b64.charCodeAt(i + 2)] << 6) |
	      revLookup[b64.charCodeAt(i + 3)];
	    arr[curByte++] = (tmp >> 16) & 0xFF;
	    arr[curByte++] = (tmp >> 8) & 0xFF;
	    arr[curByte++] = tmp & 0xFF;
	  }

	  if (placeHoldersLen === 2) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 2) |
	      (revLookup[b64.charCodeAt(i + 1)] >> 4);
	    arr[curByte++] = tmp & 0xFF;
	  }

	  if (placeHoldersLen === 1) {
	    tmp =
	      (revLookup[b64.charCodeAt(i)] << 10) |
	      (revLookup[b64.charCodeAt(i + 1)] << 4) |
	      (revLookup[b64.charCodeAt(i + 2)] >> 2);
	    arr[curByte++] = (tmp >> 8) & 0xFF;
	    arr[curByte++] = tmp & 0xFF;
	  }

	  return arr
	}

	function tripletToBase64 (num) {
	  return lookup[num >> 18 & 0x3F] +
	    lookup[num >> 12 & 0x3F] +
	    lookup[num >> 6 & 0x3F] +
	    lookup[num & 0x3F]
	}

	function encodeChunk (uint8, start, end) {
	  var tmp;
	  var output = [];
	  for (var i = start; i < end; i += 3) {
	    tmp =
	      ((uint8[i] << 16) & 0xFF0000) +
	      ((uint8[i + 1] << 8) & 0xFF00) +
	      (uint8[i + 2] & 0xFF);
	    output.push(tripletToBase64(tmp));
	  }
	  return output.join('')
	}

	function fromByteArray (uint8) {
	  var tmp;
	  var len = uint8.length;
	  var extraBytes = len % 3; // if we have 1 byte left, pad 2 bytes
	  var parts = [];
	  var maxChunkLength = 16383; // must be multiple of 3

	  // go through the array every three bytes, we'll deal with trailing stuff later
	  for (var i = 0, len2 = len - extraBytes; i < len2; i += maxChunkLength) {
	    parts.push(encodeChunk(uint8, i, (i + maxChunkLength) > len2 ? len2 : (i + maxChunkLength)));
	  }

	  // pad the end with zeros, but make sure to not forget the extra bytes
	  if (extraBytes === 1) {
	    tmp = uint8[len - 1];
	    parts.push(
	      lookup[tmp >> 2] +
	      lookup[(tmp << 4) & 0x3F] +
	      '=='
	    );
	  } else if (extraBytes === 2) {
	    tmp = (uint8[len - 2] << 8) + uint8[len - 1];
	    parts.push(
	      lookup[tmp >> 10] +
	      lookup[(tmp >> 4) & 0x3F] +
	      lookup[(tmp << 2) & 0x3F] +
	      '='
	    );
	  }

	  return parts.join('')
	}

	},{}],29:[function(require,module,exports){

	},{}],30:[function(require,module,exports){
	(function (process,Buffer){(function (){
	/* eslint camelcase: "off" */

	var assert = require('assert');

	var Zstream = require('pako/lib/zlib/zstream');
	var zlib_deflate = require('pako/lib/zlib/deflate.js');
	var zlib_inflate = require('pako/lib/zlib/inflate.js');
	var constants = require('pako/lib/zlib/constants');

	for (var key in constants) {
	  exports[key] = constants[key];
	}

	// zlib modes
	exports.NONE = 0;
	exports.DEFLATE = 1;
	exports.INFLATE = 2;
	exports.GZIP = 3;
	exports.GUNZIP = 4;
	exports.DEFLATERAW = 5;
	exports.INFLATERAW = 6;
	exports.UNZIP = 7;

	var GZIP_HEADER_ID1 = 0x1f;
	var GZIP_HEADER_ID2 = 0x8b;

	/**
	 * Emulate Node's zlib C++ layer for use by the JS layer in index.js
	 */
	function Zlib(mode) {
	  if (typeof mode !== 'number' || mode < exports.DEFLATE || mode > exports.UNZIP) {
	    throw new TypeError('Bad argument');
	  }

	  this.dictionary = null;
	  this.err = 0;
	  this.flush = 0;
	  this.init_done = false;
	  this.level = 0;
	  this.memLevel = 0;
	  this.mode = mode;
	  this.strategy = 0;
	  this.windowBits = 0;
	  this.write_in_progress = false;
	  this.pending_close = false;
	  this.gzip_id_bytes_read = 0;
	}

	Zlib.prototype.close = function () {
	  if (this.write_in_progress) {
	    this.pending_close = true;
	    return;
	  }

	  this.pending_close = false;

	  assert(this.init_done, 'close before init');
	  assert(this.mode <= exports.UNZIP);

	  if (this.mode === exports.DEFLATE || this.mode === exports.GZIP || this.mode === exports.DEFLATERAW) {
	    zlib_deflate.deflateEnd(this.strm);
	  } else if (this.mode === exports.INFLATE || this.mode === exports.GUNZIP || this.mode === exports.INFLATERAW || this.mode === exports.UNZIP) {
	    zlib_inflate.inflateEnd(this.strm);
	  }

	  this.mode = exports.NONE;

	  this.dictionary = null;
	};

	Zlib.prototype.write = function (flush, input, in_off, in_len, out, out_off, out_len) {
	  return this._write(true, flush, input, in_off, in_len, out, out_off, out_len);
	};

	Zlib.prototype.writeSync = function (flush, input, in_off, in_len, out, out_off, out_len) {
	  return this._write(false, flush, input, in_off, in_len, out, out_off, out_len);
	};

	Zlib.prototype._write = function (async, flush, input, in_off, in_len, out, out_off, out_len) {
	  assert.equal(arguments.length, 8);

	  assert(this.init_done, 'write before init');
	  assert(this.mode !== exports.NONE, 'already finalized');
	  assert.equal(false, this.write_in_progress, 'write already in progress');
	  assert.equal(false, this.pending_close, 'close is pending');

	  this.write_in_progress = true;

	  assert.equal(false, flush === undefined, 'must provide flush value');

	  this.write_in_progress = true;

	  if (flush !== exports.Z_NO_FLUSH && flush !== exports.Z_PARTIAL_FLUSH && flush !== exports.Z_SYNC_FLUSH && flush !== exports.Z_FULL_FLUSH && flush !== exports.Z_FINISH && flush !== exports.Z_BLOCK) {
	    throw new Error('Invalid flush value');
	  }

	  if (input == null) {
	    input = Buffer.alloc(0);
	    in_len = 0;
	    in_off = 0;
	  }

	  this.strm.avail_in = in_len;
	  this.strm.input = input;
	  this.strm.next_in = in_off;
	  this.strm.avail_out = out_len;
	  this.strm.output = out;
	  this.strm.next_out = out_off;
	  this.flush = flush;

	  if (!async) {
	    // sync version
	    this._process();

	    if (this._checkError()) {
	      return this._afterSync();
	    }
	    return;
	  }

	  // async version
	  var self = this;
	  process.nextTick(function () {
	    self._process();
	    self._after();
	  });

	  return this;
	};

	Zlib.prototype._afterSync = function () {
	  var avail_out = this.strm.avail_out;
	  var avail_in = this.strm.avail_in;

	  this.write_in_progress = false;

	  return [avail_in, avail_out];
	};

	Zlib.prototype._process = function () {
	  var next_expected_header_byte = null;

	  // If the avail_out is left at 0, then it means that it ran out
	  // of room.  If there was avail_out left over, then it means
	  // that all of the input was consumed.
	  switch (this.mode) {
	    case exports.DEFLATE:
	    case exports.GZIP:
	    case exports.DEFLATERAW:
	      this.err = zlib_deflate.deflate(this.strm, this.flush);
	      break;
	    case exports.UNZIP:
	      if (this.strm.avail_in > 0) {
	        next_expected_header_byte = this.strm.next_in;
	      }

	      switch (this.gzip_id_bytes_read) {
	        case 0:
	          if (next_expected_header_byte === null) {
	            break;
	          }

	          if (this.strm.input[next_expected_header_byte] === GZIP_HEADER_ID1) {
	            this.gzip_id_bytes_read = 1;
	            next_expected_header_byte++;

	            if (this.strm.avail_in === 1) {
	              // The only available byte was already read.
	              break;
	            }
	          } else {
	            this.mode = exports.INFLATE;
	            break;
	          }

	        // fallthrough
	        case 1:
	          if (next_expected_header_byte === null) {
	            break;
	          }

	          if (this.strm.input[next_expected_header_byte] === GZIP_HEADER_ID2) {
	            this.gzip_id_bytes_read = 2;
	            this.mode = exports.GUNZIP;
	          } else {
	            // There is no actual difference between INFLATE and INFLATERAW
	            // (after initialization).
	            this.mode = exports.INFLATE;
	          }

	          break;
	        default:
	          throw new Error('invalid number of gzip magic number bytes read');
	      }

	    // fallthrough
	    case exports.INFLATE:
	    case exports.GUNZIP:
	    case exports.INFLATERAW:
	      this.err = zlib_inflate.inflate(this.strm, this.flush

	      // If data was encoded with dictionary
	      );if (this.err === exports.Z_NEED_DICT && this.dictionary) {
	        // Load it
	        this.err = zlib_inflate.inflateSetDictionary(this.strm, this.dictionary);
	        if (this.err === exports.Z_OK) {
	          // And try to decode again
	          this.err = zlib_inflate.inflate(this.strm, this.flush);
	        } else if (this.err === exports.Z_DATA_ERROR) {
	          // Both inflateSetDictionary() and inflate() return Z_DATA_ERROR.
	          // Make it possible for After() to tell a bad dictionary from bad
	          // input.
	          this.err = exports.Z_NEED_DICT;
	        }
	      }
	      while (this.strm.avail_in > 0 && this.mode === exports.GUNZIP && this.err === exports.Z_STREAM_END && this.strm.next_in[0] !== 0x00) {
	        // Bytes remain in input buffer. Perhaps this is another compressed
	        // member in the same archive, or just trailing garbage.
	        // Trailing zero bytes are okay, though, since they are frequently
	        // used for padding.

	        this.reset();
	        this.err = zlib_inflate.inflate(this.strm, this.flush);
	      }
	      break;
	    default:
	      throw new Error('Unknown mode ' + this.mode);
	  }
	};

	Zlib.prototype._checkError = function () {
	  // Acceptable error states depend on the type of zlib stream.
	  switch (this.err) {
	    case exports.Z_OK:
	    case exports.Z_BUF_ERROR:
	      if (this.strm.avail_out !== 0 && this.flush === exports.Z_FINISH) {
	        this._error('unexpected end of file');
	        return false;
	      }
	      break;
	    case exports.Z_STREAM_END:
	      // normal statuses, not fatal
	      break;
	    case exports.Z_NEED_DICT:
	      if (this.dictionary == null) {
	        this._error('Missing dictionary');
	      } else {
	        this._error('Bad dictionary');
	      }
	      return false;
	    default:
	      // something else.
	      this._error('Zlib error');
	      return false;
	  }

	  return true;
	};

	Zlib.prototype._after = function () {
	  if (!this._checkError()) {
	    return;
	  }

	  var avail_out = this.strm.avail_out;
	  var avail_in = this.strm.avail_in;

	  this.write_in_progress = false;

	  // call the write() cb
	  this.callback(avail_in, avail_out);

	  if (this.pending_close) {
	    this.close();
	  }
	};

	Zlib.prototype._error = function (message) {
	  if (this.strm.msg) {
	    message = this.strm.msg;
	  }
	  this.onerror(message, this.err

	  // no hope of rescue.
	  );this.write_in_progress = false;
	  if (this.pending_close) {
	    this.close();
	  }
	};

	Zlib.prototype.init = function (windowBits, level, memLevel, strategy, dictionary) {
	  assert(arguments.length === 4 || arguments.length === 5, 'init(windowBits, level, memLevel, strategy, [dictionary])');

	  assert(windowBits >= 8 && windowBits <= 15, 'invalid windowBits');
	  assert(level >= -1 && level <= 9, 'invalid compression level');

	  assert(memLevel >= 1 && memLevel <= 9, 'invalid memlevel');

	  assert(strategy === exports.Z_FILTERED || strategy === exports.Z_HUFFMAN_ONLY || strategy === exports.Z_RLE || strategy === exports.Z_FIXED || strategy === exports.Z_DEFAULT_STRATEGY, 'invalid strategy');

	  this._init(level, windowBits, memLevel, strategy, dictionary);
	  this._setDictionary();
	};

	Zlib.prototype.params = function () {
	  throw new Error('deflateParams Not supported');
	};

	Zlib.prototype.reset = function () {
	  this._reset();
	  this._setDictionary();
	};

	Zlib.prototype._init = function (level, windowBits, memLevel, strategy, dictionary) {
	  this.level = level;
	  this.windowBits = windowBits;
	  this.memLevel = memLevel;
	  this.strategy = strategy;

	  this.flush = exports.Z_NO_FLUSH;

	  this.err = exports.Z_OK;

	  if (this.mode === exports.GZIP || this.mode === exports.GUNZIP) {
	    this.windowBits += 16;
	  }

	  if (this.mode === exports.UNZIP) {
	    this.windowBits += 32;
	  }

	  if (this.mode === exports.DEFLATERAW || this.mode === exports.INFLATERAW) {
	    this.windowBits = -1 * this.windowBits;
	  }

	  this.strm = new Zstream();

	  switch (this.mode) {
	    case exports.DEFLATE:
	    case exports.GZIP:
	    case exports.DEFLATERAW:
	      this.err = zlib_deflate.deflateInit2(this.strm, this.level, exports.Z_DEFLATED, this.windowBits, this.memLevel, this.strategy);
	      break;
	    case exports.INFLATE:
	    case exports.GUNZIP:
	    case exports.INFLATERAW:
	    case exports.UNZIP:
	      this.err = zlib_inflate.inflateInit2(this.strm, this.windowBits);
	      break;
	    default:
	      throw new Error('Unknown mode ' + this.mode);
	  }

	  if (this.err !== exports.Z_OK) {
	    this._error('Init error');
	  }

	  this.dictionary = dictionary;

	  this.write_in_progress = false;
	  this.init_done = true;
	};

	Zlib.prototype._setDictionary = function () {
	  if (this.dictionary == null) {
	    return;
	  }

	  this.err = exports.Z_OK;

	  switch (this.mode) {
	    case exports.DEFLATE:
	    case exports.DEFLATERAW:
	      this.err = zlib_deflate.deflateSetDictionary(this.strm, this.dictionary);
	      break;
	  }

	  if (this.err !== exports.Z_OK) {
	    this._error('Failed to set dictionary');
	  }
	};

	Zlib.prototype._reset = function () {
	  this.err = exports.Z_OK;

	  switch (this.mode) {
	    case exports.DEFLATE:
	    case exports.DEFLATERAW:
	    case exports.GZIP:
	      this.err = zlib_deflate.deflateReset(this.strm);
	      break;
	    case exports.INFLATE:
	    case exports.INFLATERAW:
	    case exports.GUNZIP:
	      this.err = zlib_inflate.inflateReset(this.strm);
	      break;
	  }

	  if (this.err !== exports.Z_OK) {
	    this._error('Failed to reset stream');
	  }
	};

	exports.Zlib = Zlib;
	}).call(this);}).call(this,require('_process'),require("buffer").Buffer);
	},{"_process":63,"assert":23,"buffer":32,"pako/lib/zlib/constants":54,"pako/lib/zlib/deflate.js":56,"pako/lib/zlib/inflate.js":58,"pako/lib/zlib/zstream":62}],31:[function(require,module,exports){
	(function (process){(function (){

	var Buffer = require('buffer').Buffer;
	var Transform = require('stream').Transform;
	var binding = require('./binding');
	var util = require('util');
	var assert = require('assert').ok;
	var kMaxLength = require('buffer').kMaxLength;
	var kRangeErrorMessage = 'Cannot create final Buffer. It would be larger ' + 'than 0x' + kMaxLength.toString(16) + ' bytes';

	// zlib doesn't provide these, so kludge them in following the same
	// const naming scheme zlib uses.
	binding.Z_MIN_WINDOWBITS = 8;
	binding.Z_MAX_WINDOWBITS = 15;
	binding.Z_DEFAULT_WINDOWBITS = 15;

	// fewer than 64 bytes per chunk is stupid.
	// technically it could work with as few as 8, but even 64 bytes
	// is absurdly low.  Usually a MB or more is best.
	binding.Z_MIN_CHUNK = 64;
	binding.Z_MAX_CHUNK = Infinity;
	binding.Z_DEFAULT_CHUNK = 16 * 1024;

	binding.Z_MIN_MEMLEVEL = 1;
	binding.Z_MAX_MEMLEVEL = 9;
	binding.Z_DEFAULT_MEMLEVEL = 8;

	binding.Z_MIN_LEVEL = -1;
	binding.Z_MAX_LEVEL = 9;
	binding.Z_DEFAULT_LEVEL = binding.Z_DEFAULT_COMPRESSION;

	// expose all the zlib constants
	var bkeys = Object.keys(binding);
	for (var bk = 0; bk < bkeys.length; bk++) {
	  var bkey = bkeys[bk];
	  if (bkey.match(/^Z/)) {
	    Object.defineProperty(exports, bkey, {
	      enumerable: true, value: binding[bkey], writable: false
	    });
	  }
	}

	// translation table for return codes.
	var codes = {
	  Z_OK: binding.Z_OK,
	  Z_STREAM_END: binding.Z_STREAM_END,
	  Z_NEED_DICT: binding.Z_NEED_DICT,
	  Z_ERRNO: binding.Z_ERRNO,
	  Z_STREAM_ERROR: binding.Z_STREAM_ERROR,
	  Z_DATA_ERROR: binding.Z_DATA_ERROR,
	  Z_MEM_ERROR: binding.Z_MEM_ERROR,
	  Z_BUF_ERROR: binding.Z_BUF_ERROR,
	  Z_VERSION_ERROR: binding.Z_VERSION_ERROR
	};

	var ckeys = Object.keys(codes);
	for (var ck = 0; ck < ckeys.length; ck++) {
	  var ckey = ckeys[ck];
	  codes[codes[ckey]] = ckey;
	}

	Object.defineProperty(exports, 'codes', {
	  enumerable: true, value: Object.freeze(codes), writable: false
	});

	exports.Deflate = Deflate;
	exports.Inflate = Inflate;
	exports.Gzip = Gzip;
	exports.Gunzip = Gunzip;
	exports.DeflateRaw = DeflateRaw;
	exports.InflateRaw = InflateRaw;
	exports.Unzip = Unzip;

	exports.createDeflate = function (o) {
	  return new Deflate(o);
	};

	exports.createInflate = function (o) {
	  return new Inflate(o);
	};

	exports.createDeflateRaw = function (o) {
	  return new DeflateRaw(o);
	};

	exports.createInflateRaw = function (o) {
	  return new InflateRaw(o);
	};

	exports.createGzip = function (o) {
	  return new Gzip(o);
	};

	exports.createGunzip = function (o) {
	  return new Gunzip(o);
	};

	exports.createUnzip = function (o) {
	  return new Unzip(o);
	};

	// Convenience methods.
	// compress/decompress a string or buffer in one step.
	exports.deflate = function (buffer, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  return zlibBuffer(new Deflate(opts), buffer, callback);
	};

	exports.deflateSync = function (buffer, opts) {
	  return zlibBufferSync(new Deflate(opts), buffer);
	};

	exports.gzip = function (buffer, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  return zlibBuffer(new Gzip(opts), buffer, callback);
	};

	exports.gzipSync = function (buffer, opts) {
	  return zlibBufferSync(new Gzip(opts), buffer);
	};

	exports.deflateRaw = function (buffer, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  return zlibBuffer(new DeflateRaw(opts), buffer, callback);
	};

	exports.deflateRawSync = function (buffer, opts) {
	  return zlibBufferSync(new DeflateRaw(opts), buffer);
	};

	exports.unzip = function (buffer, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  return zlibBuffer(new Unzip(opts), buffer, callback);
	};

	exports.unzipSync = function (buffer, opts) {
	  return zlibBufferSync(new Unzip(opts), buffer);
	};

	exports.inflate = function (buffer, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  return zlibBuffer(new Inflate(opts), buffer, callback);
	};

	exports.inflateSync = function (buffer, opts) {
	  return zlibBufferSync(new Inflate(opts), buffer);
	};

	exports.gunzip = function (buffer, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  return zlibBuffer(new Gunzip(opts), buffer, callback);
	};

	exports.gunzipSync = function (buffer, opts) {
	  return zlibBufferSync(new Gunzip(opts), buffer);
	};

	exports.inflateRaw = function (buffer, opts, callback) {
	  if (typeof opts === 'function') {
	    callback = opts;
	    opts = {};
	  }
	  return zlibBuffer(new InflateRaw(opts), buffer, callback);
	};

	exports.inflateRawSync = function (buffer, opts) {
	  return zlibBufferSync(new InflateRaw(opts), buffer);
	};

	function zlibBuffer(engine, buffer, callback) {
	  var buffers = [];
	  var nread = 0;

	  engine.on('error', onError);
	  engine.on('end', onEnd);

	  engine.end(buffer);
	  flow();

	  function flow() {
	    var chunk;
	    while (null !== (chunk = engine.read())) {
	      buffers.push(chunk);
	      nread += chunk.length;
	    }
	    engine.once('readable', flow);
	  }

	  function onError(err) {
	    engine.removeListener('end', onEnd);
	    engine.removeListener('readable', flow);
	    callback(err);
	  }

	  function onEnd() {
	    var buf;
	    var err = null;

	    if (nread >= kMaxLength) {
	      err = new RangeError(kRangeErrorMessage);
	    } else {
	      buf = Buffer.concat(buffers, nread);
	    }

	    buffers = [];
	    engine.close();
	    callback(err, buf);
	  }
	}

	function zlibBufferSync(engine, buffer) {
	  if (typeof buffer === 'string') buffer = Buffer.from(buffer);

	  if (!Buffer.isBuffer(buffer)) throw new TypeError('Not a string or buffer');

	  var flushFlag = engine._finishFlushFlag;

	  return engine._processChunk(buffer, flushFlag);
	}

	// generic zlib
	// minimal 2-byte header
	function Deflate(opts) {
	  if (!(this instanceof Deflate)) return new Deflate(opts);
	  Zlib.call(this, opts, binding.DEFLATE);
	}

	function Inflate(opts) {
	  if (!(this instanceof Inflate)) return new Inflate(opts);
	  Zlib.call(this, opts, binding.INFLATE);
	}

	// gzip - bigger header, same deflate compression
	function Gzip(opts) {
	  if (!(this instanceof Gzip)) return new Gzip(opts);
	  Zlib.call(this, opts, binding.GZIP);
	}

	function Gunzip(opts) {
	  if (!(this instanceof Gunzip)) return new Gunzip(opts);
	  Zlib.call(this, opts, binding.GUNZIP);
	}

	// raw - no header
	function DeflateRaw(opts) {
	  if (!(this instanceof DeflateRaw)) return new DeflateRaw(opts);
	  Zlib.call(this, opts, binding.DEFLATERAW);
	}

	function InflateRaw(opts) {
	  if (!(this instanceof InflateRaw)) return new InflateRaw(opts);
	  Zlib.call(this, opts, binding.INFLATERAW);
	}

	// auto-detect header.
	function Unzip(opts) {
	  if (!(this instanceof Unzip)) return new Unzip(opts);
	  Zlib.call(this, opts, binding.UNZIP);
	}

	function isValidFlushFlag(flag) {
	  return flag === binding.Z_NO_FLUSH || flag === binding.Z_PARTIAL_FLUSH || flag === binding.Z_SYNC_FLUSH || flag === binding.Z_FULL_FLUSH || flag === binding.Z_FINISH || flag === binding.Z_BLOCK;
	}

	// the Zlib class they all inherit from
	// This thing manages the queue of requests, and returns
	// true or false if there is anything in the queue when
	// you call the .write() method.

	function Zlib(opts, mode) {
	  var _this = this;

	  this._opts = opts = opts || {};
	  this._chunkSize = opts.chunkSize || exports.Z_DEFAULT_CHUNK;

	  Transform.call(this, opts);

	  if (opts.flush && !isValidFlushFlag(opts.flush)) {
	    throw new Error('Invalid flush flag: ' + opts.flush);
	  }
	  if (opts.finishFlush && !isValidFlushFlag(opts.finishFlush)) {
	    throw new Error('Invalid flush flag: ' + opts.finishFlush);
	  }

	  this._flushFlag = opts.flush || binding.Z_NO_FLUSH;
	  this._finishFlushFlag = typeof opts.finishFlush !== 'undefined' ? opts.finishFlush : binding.Z_FINISH;

	  if (opts.chunkSize) {
	    if (opts.chunkSize < exports.Z_MIN_CHUNK || opts.chunkSize > exports.Z_MAX_CHUNK) {
	      throw new Error('Invalid chunk size: ' + opts.chunkSize);
	    }
	  }

	  if (opts.windowBits) {
	    if (opts.windowBits < exports.Z_MIN_WINDOWBITS || opts.windowBits > exports.Z_MAX_WINDOWBITS) {
	      throw new Error('Invalid windowBits: ' + opts.windowBits);
	    }
	  }

	  if (opts.level) {
	    if (opts.level < exports.Z_MIN_LEVEL || opts.level > exports.Z_MAX_LEVEL) {
	      throw new Error('Invalid compression level: ' + opts.level);
	    }
	  }

	  if (opts.memLevel) {
	    if (opts.memLevel < exports.Z_MIN_MEMLEVEL || opts.memLevel > exports.Z_MAX_MEMLEVEL) {
	      throw new Error('Invalid memLevel: ' + opts.memLevel);
	    }
	  }

	  if (opts.strategy) {
	    if (opts.strategy != exports.Z_FILTERED && opts.strategy != exports.Z_HUFFMAN_ONLY && opts.strategy != exports.Z_RLE && opts.strategy != exports.Z_FIXED && opts.strategy != exports.Z_DEFAULT_STRATEGY) {
	      throw new Error('Invalid strategy: ' + opts.strategy);
	    }
	  }

	  if (opts.dictionary) {
	    if (!Buffer.isBuffer(opts.dictionary)) {
	      throw new Error('Invalid dictionary: it should be a Buffer instance');
	    }
	  }

	  this._handle = new binding.Zlib(mode);

	  var self = this;
	  this._hadError = false;
	  this._handle.onerror = function (message, errno) {
	    // there is no way to cleanly recover.
	    // continuing only obscures problems.
	    _close(self);
	    self._hadError = true;

	    var error = new Error(message);
	    error.errno = errno;
	    error.code = exports.codes[errno];
	    self.emit('error', error);
	  };

	  var level = exports.Z_DEFAULT_COMPRESSION;
	  if (typeof opts.level === 'number') level = opts.level;

	  var strategy = exports.Z_DEFAULT_STRATEGY;
	  if (typeof opts.strategy === 'number') strategy = opts.strategy;

	  this._handle.init(opts.windowBits || exports.Z_DEFAULT_WINDOWBITS, level, opts.memLevel || exports.Z_DEFAULT_MEMLEVEL, strategy, opts.dictionary);

	  this._buffer = Buffer.allocUnsafe(this._chunkSize);
	  this._offset = 0;
	  this._level = level;
	  this._strategy = strategy;

	  this.once('end', this.close);

	  Object.defineProperty(this, '_closed', {
	    get: function () {
	      return !_this._handle;
	    },
	    configurable: true,
	    enumerable: true
	  });
	}

	util.inherits(Zlib, Transform);

	Zlib.prototype.params = function (level, strategy, callback) {
	  if (level < exports.Z_MIN_LEVEL || level > exports.Z_MAX_LEVEL) {
	    throw new RangeError('Invalid compression level: ' + level);
	  }
	  if (strategy != exports.Z_FILTERED && strategy != exports.Z_HUFFMAN_ONLY && strategy != exports.Z_RLE && strategy != exports.Z_FIXED && strategy != exports.Z_DEFAULT_STRATEGY) {
	    throw new TypeError('Invalid strategy: ' + strategy);
	  }

	  if (this._level !== level || this._strategy !== strategy) {
	    var self = this;
	    this.flush(binding.Z_SYNC_FLUSH, function () {
	      assert(self._handle, 'zlib binding closed');
	      self._handle.params(level, strategy);
	      if (!self._hadError) {
	        self._level = level;
	        self._strategy = strategy;
	        if (callback) callback();
	      }
	    });
	  } else {
	    process.nextTick(callback);
	  }
	};

	Zlib.prototype.reset = function () {
	  assert(this._handle, 'zlib binding closed');
	  return this._handle.reset();
	};

	// This is the _flush function called by the transform class,
	// internally, when the last chunk has been written.
	Zlib.prototype._flush = function (callback) {
	  this._transform(Buffer.alloc(0), '', callback);
	};

	Zlib.prototype.flush = function (kind, callback) {
	  var _this2 = this;

	  var ws = this._writableState;

	  if (typeof kind === 'function' || kind === undefined && !callback) {
	    callback = kind;
	    kind = binding.Z_FULL_FLUSH;
	  }

	  if (ws.ended) {
	    if (callback) process.nextTick(callback);
	  } else if (ws.ending) {
	    if (callback) this.once('end', callback);
	  } else if (ws.needDrain) {
	    if (callback) {
	      this.once('drain', function () {
	        return _this2.flush(kind, callback);
	      });
	    }
	  } else {
	    this._flushFlag = kind;
	    this.write(Buffer.alloc(0), '', callback);
	  }
	};

	Zlib.prototype.close = function (callback) {
	  _close(this, callback);
	  process.nextTick(emitCloseNT, this);
	};

	function _close(engine, callback) {
	  if (callback) process.nextTick(callback);

	  // Caller may invoke .close after a zlib error (which will null _handle).
	  if (!engine._handle) return;

	  engine._handle.close();
	  engine._handle = null;
	}

	function emitCloseNT(self) {
	  self.emit('close');
	}

	Zlib.prototype._transform = function (chunk, encoding, cb) {
	  var flushFlag;
	  var ws = this._writableState;
	  var ending = ws.ending || ws.ended;
	  var last = ending && (!chunk || ws.length === chunk.length);

	  if (chunk !== null && !Buffer.isBuffer(chunk)) return cb(new Error('invalid input'));

	  if (!this._handle) return cb(new Error('zlib binding closed'));

	  // If it's the last chunk, or a final flush, we use the Z_FINISH flush flag
	  // (or whatever flag was provided using opts.finishFlush).
	  // If it's explicitly flushing at some other time, then we use
	  // Z_FULL_FLUSH. Otherwise, use Z_NO_FLUSH for maximum compression
	  // goodness.
	  if (last) flushFlag = this._finishFlushFlag;else {
	    flushFlag = this._flushFlag;
	    // once we've flushed the last of the queue, stop flushing and
	    // go back to the normal behavior.
	    if (chunk.length >= ws.length) {
	      this._flushFlag = this._opts.flush || binding.Z_NO_FLUSH;
	    }
	  }

	  this._processChunk(chunk, flushFlag, cb);
	};

	Zlib.prototype._processChunk = function (chunk, flushFlag, cb) {
	  var availInBefore = chunk && chunk.length;
	  var availOutBefore = this._chunkSize - this._offset;
	  var inOff = 0;

	  var self = this;

	  var async = typeof cb === 'function';

	  if (!async) {
	    var buffers = [];
	    var nread = 0;

	    var error;
	    this.on('error', function (er) {
	      error = er;
	    });

	    assert(this._handle, 'zlib binding closed');
	    do {
	      var res = this._handle.writeSync(flushFlag, chunk, // in
	      inOff, // in_off
	      availInBefore, // in_len
	      this._buffer, // out
	      this._offset, //out_off
	      availOutBefore); // out_len
	    } while (!this._hadError && callback(res[0], res[1]));

	    if (this._hadError) {
	      throw error;
	    }

	    if (nread >= kMaxLength) {
	      _close(this);
	      throw new RangeError(kRangeErrorMessage);
	    }

	    var buf = Buffer.concat(buffers, nread);
	    _close(this);

	    return buf;
	  }

	  assert(this._handle, 'zlib binding closed');
	  var req = this._handle.write(flushFlag, chunk, // in
	  inOff, // in_off
	  availInBefore, // in_len
	  this._buffer, // out
	  this._offset, //out_off
	  availOutBefore); // out_len

	  req.buffer = chunk;
	  req.callback = callback;

	  function callback(availInAfter, availOutAfter) {
	    // When the callback is used in an async write, the callback's
	    // context is the `req` object that was created. The req object
	    // is === this._handle, and that's why it's important to null
	    // out the values after they are done being used. `this._handle`
	    // can stay in memory longer than the callback and buffer are needed.
	    if (this) {
	      this.buffer = null;
	      this.callback = null;
	    }

	    if (self._hadError) return;

	    var have = availOutBefore - availOutAfter;
	    assert(have >= 0, 'have should not go down');

	    if (have > 0) {
	      var out = self._buffer.slice(self._offset, self._offset + have);
	      self._offset += have;
	      // serve some output to the consumer.
	      if (async) {
	        self.push(out);
	      } else {
	        buffers.push(out);
	        nread += out.length;
	      }
	    }

	    // exhausted the output buffer, or used all the input create a new one.
	    if (availOutAfter === 0 || self._offset >= self._chunkSize) {
	      availOutBefore = self._chunkSize;
	      self._offset = 0;
	      self._buffer = Buffer.allocUnsafe(self._chunkSize);
	    }

	    if (availOutAfter === 0) {
	      // Not actually done.  Need to reprocess.
	      // Also, update the availInBefore to the availInAfter value,
	      // so that if we have to hit it a third (fourth, etc.) time,
	      // it'll have the correct byte counts.
	      inOff += availInBefore - availInAfter;
	      availInBefore = availInAfter;

	      if (!async) return true;

	      var newReq = self._handle.write(flushFlag, chunk, inOff, availInBefore, self._buffer, self._offset, self._chunkSize);
	      newReq.callback = callback; // this same function
	      newReq.buffer = chunk;
	      return;
	    }

	    if (!async) return false;

	    // finished with the chunk.
	    cb();
	  }
	};

	util.inherits(Deflate, Zlib);
	util.inherits(Inflate, Zlib);
	util.inherits(Gzip, Zlib);
	util.inherits(Gunzip, Zlib);
	util.inherits(DeflateRaw, Zlib);
	util.inherits(InflateRaw, Zlib);
	util.inherits(Unzip, Zlib);
	}).call(this);}).call(this,require('_process'));
	},{"./binding":30,"_process":63,"assert":23,"buffer":32,"stream":65,"util":84}],32:[function(require,module,exports){
	(function (Buffer){(function (){

	var base64 = require('base64-js');
	var ieee754 = require('ieee754');

	exports.Buffer = Buffer;
	exports.SlowBuffer = SlowBuffer;
	exports.INSPECT_MAX_BYTES = 50;

	var K_MAX_LENGTH = 0x7fffffff;
	exports.kMaxLength = K_MAX_LENGTH;

	/**
	 * If `Buffer.TYPED_ARRAY_SUPPORT`:
	 *   === true    Use Uint8Array implementation (fastest)
	 *   === false   Print warning and recommend using `buffer` v4.x which has an Object
	 *               implementation (most compatible, even IE6)
	 *
	 * Browsers that support typed arrays are IE 10+, Firefox 4+, Chrome 7+, Safari 5.1+,
	 * Opera 11.6+, iOS 4.2+.
	 *
	 * We report that the browser does not support typed arrays if the are not subclassable
	 * using __proto__. Firefox 4-29 lacks support for adding new properties to `Uint8Array`
	 * (See: https://bugzilla.mozilla.org/show_bug.cgi?id=695438). IE 10 lacks support
	 * for __proto__ and has a buggy typed array implementation.
	 */
	Buffer.TYPED_ARRAY_SUPPORT = typedArraySupport();

	if (!Buffer.TYPED_ARRAY_SUPPORT && typeof console !== 'undefined' &&
	    typeof console.error === 'function') {
	  console.error(
	    'This browser lacks typed array (Uint8Array) support which is required by ' +
	    '`buffer` v5.x. Use `buffer` v4.x if you require old browser support.'
	  );
	}

	function typedArraySupport () {
	  // Can typed array instances can be augmented?
	  try {
	    var arr = new Uint8Array(1);
	    arr.__proto__ = { __proto__: Uint8Array.prototype, foo: function () { return 42 } };
	    return arr.foo() === 42
	  } catch (e) {
	    return false
	  }
	}

	Object.defineProperty(Buffer.prototype, 'parent', {
	  enumerable: true,
	  get: function () {
	    if (!Buffer.isBuffer(this)) return undefined
	    return this.buffer
	  }
	});

	Object.defineProperty(Buffer.prototype, 'offset', {
	  enumerable: true,
	  get: function () {
	    if (!Buffer.isBuffer(this)) return undefined
	    return this.byteOffset
	  }
	});

	function createBuffer (length) {
	  if (length > K_MAX_LENGTH) {
	    throw new RangeError('The value "' + length + '" is invalid for option "size"')
	  }
	  // Return an augmented `Uint8Array` instance
	  var buf = new Uint8Array(length);
	  buf.__proto__ = Buffer.prototype;
	  return buf
	}

	/**
	 * The Buffer constructor returns instances of `Uint8Array` that have their
	 * prototype changed to `Buffer.prototype`. Furthermore, `Buffer` is a subclass of
	 * `Uint8Array`, so the returned instances will have all the node `Buffer` methods
	 * and the `Uint8Array` methods. Square bracket notation works as expected -- it
	 * returns a single octet.
	 *
	 * The `Uint8Array` prototype remains unmodified.
	 */

	function Buffer (arg, encodingOrOffset, length) {
	  // Common case.
	  if (typeof arg === 'number') {
	    if (typeof encodingOrOffset === 'string') {
	      throw new TypeError(
	        'The "string" argument must be of type string. Received type number'
	      )
	    }
	    return allocUnsafe(arg)
	  }
	  return from(arg, encodingOrOffset, length)
	}

	// Fix subarray() in ES2016. See: https://github.com/feross/buffer/pull/97
	if (typeof Symbol !== 'undefined' && Symbol.species != null &&
	    Buffer[Symbol.species] === Buffer) {
	  Object.defineProperty(Buffer, Symbol.species, {
	    value: null,
	    configurable: true,
	    enumerable: false,
	    writable: false
	  });
	}

	Buffer.poolSize = 8192; // not used by this implementation

	function from (value, encodingOrOffset, length) {
	  if (typeof value === 'string') {
	    return fromString(value, encodingOrOffset)
	  }

	  if (ArrayBuffer.isView(value)) {
	    return fromArrayLike(value)
	  }

	  if (value == null) {
	    throw TypeError(
	      'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
	      'or Array-like Object. Received type ' + (typeof value)
	    )
	  }

	  if (isInstance(value, ArrayBuffer) ||
	      (value && isInstance(value.buffer, ArrayBuffer))) {
	    return fromArrayBuffer(value, encodingOrOffset, length)
	  }

	  if (typeof value === 'number') {
	    throw new TypeError(
	      'The "value" argument must not be of type number. Received type number'
	    )
	  }

	  var valueOf = value.valueOf && value.valueOf();
	  if (valueOf != null && valueOf !== value) {
	    return Buffer.from(valueOf, encodingOrOffset, length)
	  }

	  var b = fromObject(value);
	  if (b) return b

	  if (typeof Symbol !== 'undefined' && Symbol.toPrimitive != null &&
	      typeof value[Symbol.toPrimitive] === 'function') {
	    return Buffer.from(
	      value[Symbol.toPrimitive]('string'), encodingOrOffset, length
	    )
	  }

	  throw new TypeError(
	    'The first argument must be one of type string, Buffer, ArrayBuffer, Array, ' +
	    'or Array-like Object. Received type ' + (typeof value)
	  )
	}

	/**
	 * Functionally equivalent to Buffer(arg, encoding) but throws a TypeError
	 * if value is a number.
	 * Buffer.from(str[, encoding])
	 * Buffer.from(array)
	 * Buffer.from(buffer)
	 * Buffer.from(arrayBuffer[, byteOffset[, length]])
	 **/
	Buffer.from = function (value, encodingOrOffset, length) {
	  return from(value, encodingOrOffset, length)
	};

	// Note: Change prototype *after* Buffer.from is defined to workaround Chrome bug:
	// https://github.com/feross/buffer/pull/148
	Buffer.prototype.__proto__ = Uint8Array.prototype;
	Buffer.__proto__ = Uint8Array;

	function assertSize (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('"size" argument must be of type number')
	  } else if (size < 0) {
	    throw new RangeError('The value "' + size + '" is invalid for option "size"')
	  }
	}

	function alloc (size, fill, encoding) {
	  assertSize(size);
	  if (size <= 0) {
	    return createBuffer(size)
	  }
	  if (fill !== undefined) {
	    // Only pay attention to encoding if it's a string. This
	    // prevents accidentally sending in a number that would
	    // be interpretted as a start offset.
	    return typeof encoding === 'string'
	      ? createBuffer(size).fill(fill, encoding)
	      : createBuffer(size).fill(fill)
	  }
	  return createBuffer(size)
	}

	/**
	 * Creates a new filled Buffer instance.
	 * alloc(size[, fill[, encoding]])
	 **/
	Buffer.alloc = function (size, fill, encoding) {
	  return alloc(size, fill, encoding)
	};

	function allocUnsafe (size) {
	  assertSize(size);
	  return createBuffer(size < 0 ? 0 : checked(size) | 0)
	}

	/**
	 * Equivalent to Buffer(num), by default creates a non-zero-filled Buffer instance.
	 * */
	Buffer.allocUnsafe = function (size) {
	  return allocUnsafe(size)
	};
	/**
	 * Equivalent to SlowBuffer(num), by default creates a non-zero-filled Buffer instance.
	 */
	Buffer.allocUnsafeSlow = function (size) {
	  return allocUnsafe(size)
	};

	function fromString (string, encoding) {
	  if (typeof encoding !== 'string' || encoding === '') {
	    encoding = 'utf8';
	  }

	  if (!Buffer.isEncoding(encoding)) {
	    throw new TypeError('Unknown encoding: ' + encoding)
	  }

	  var length = byteLength(string, encoding) | 0;
	  var buf = createBuffer(length);

	  var actual = buf.write(string, encoding);

	  if (actual !== length) {
	    // Writing a hex string, for example, that contains invalid characters will
	    // cause everything after the first invalid character to be ignored. (e.g.
	    // 'abxxcd' will be treated as 'ab')
	    buf = buf.slice(0, actual);
	  }

	  return buf
	}

	function fromArrayLike (array) {
	  var length = array.length < 0 ? 0 : checked(array.length) | 0;
	  var buf = createBuffer(length);
	  for (var i = 0; i < length; i += 1) {
	    buf[i] = array[i] & 255;
	  }
	  return buf
	}

	function fromArrayBuffer (array, byteOffset, length) {
	  if (byteOffset < 0 || array.byteLength < byteOffset) {
	    throw new RangeError('"offset" is outside of buffer bounds')
	  }

	  if (array.byteLength < byteOffset + (length || 0)) {
	    throw new RangeError('"length" is outside of buffer bounds')
	  }

	  var buf;
	  if (byteOffset === undefined && length === undefined) {
	    buf = new Uint8Array(array);
	  } else if (length === undefined) {
	    buf = new Uint8Array(array, byteOffset);
	  } else {
	    buf = new Uint8Array(array, byteOffset, length);
	  }

	  // Return an augmented `Uint8Array` instance
	  buf.__proto__ = Buffer.prototype;
	  return buf
	}

	function fromObject (obj) {
	  if (Buffer.isBuffer(obj)) {
	    var len = checked(obj.length) | 0;
	    var buf = createBuffer(len);

	    if (buf.length === 0) {
	      return buf
	    }

	    obj.copy(buf, 0, 0, len);
	    return buf
	  }

	  if (obj.length !== undefined) {
	    if (typeof obj.length !== 'number' || numberIsNaN(obj.length)) {
	      return createBuffer(0)
	    }
	    return fromArrayLike(obj)
	  }

	  if (obj.type === 'Buffer' && Array.isArray(obj.data)) {
	    return fromArrayLike(obj.data)
	  }
	}

	function checked (length) {
	  // Note: cannot use `length < K_MAX_LENGTH` here because that fails when
	  // length is NaN (which is otherwise coerced to zero.)
	  if (length >= K_MAX_LENGTH) {
	    throw new RangeError('Attempt to allocate Buffer larger than maximum ' +
	                         'size: 0x' + K_MAX_LENGTH.toString(16) + ' bytes')
	  }
	  return length | 0
	}

	function SlowBuffer (length) {
	  if (+length != length) { // eslint-disable-line eqeqeq
	    length = 0;
	  }
	  return Buffer.alloc(+length)
	}

	Buffer.isBuffer = function isBuffer (b) {
	  return b != null && b._isBuffer === true &&
	    b !== Buffer.prototype // so Buffer.isBuffer(Buffer.prototype) will be false
	};

	Buffer.compare = function compare (a, b) {
	  if (isInstance(a, Uint8Array)) a = Buffer.from(a, a.offset, a.byteLength);
	  if (isInstance(b, Uint8Array)) b = Buffer.from(b, b.offset, b.byteLength);
	  if (!Buffer.isBuffer(a) || !Buffer.isBuffer(b)) {
	    throw new TypeError(
	      'The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array'
	    )
	  }

	  if (a === b) return 0

	  var x = a.length;
	  var y = b.length;

	  for (var i = 0, len = Math.min(x, y); i < len; ++i) {
	    if (a[i] !== b[i]) {
	      x = a[i];
	      y = b[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	Buffer.isEncoding = function isEncoding (encoding) {
	  switch (String(encoding).toLowerCase()) {
	    case 'hex':
	    case 'utf8':
	    case 'utf-8':
	    case 'ascii':
	    case 'latin1':
	    case 'binary':
	    case 'base64':
	    case 'ucs2':
	    case 'ucs-2':
	    case 'utf16le':
	    case 'utf-16le':
	      return true
	    default:
	      return false
	  }
	};

	Buffer.concat = function concat (list, length) {
	  if (!Array.isArray(list)) {
	    throw new TypeError('"list" argument must be an Array of Buffers')
	  }

	  if (list.length === 0) {
	    return Buffer.alloc(0)
	  }

	  var i;
	  if (length === undefined) {
	    length = 0;
	    for (i = 0; i < list.length; ++i) {
	      length += list[i].length;
	    }
	  }

	  var buffer = Buffer.allocUnsafe(length);
	  var pos = 0;
	  for (i = 0; i < list.length; ++i) {
	    var buf = list[i];
	    if (isInstance(buf, Uint8Array)) {
	      buf = Buffer.from(buf);
	    }
	    if (!Buffer.isBuffer(buf)) {
	      throw new TypeError('"list" argument must be an Array of Buffers')
	    }
	    buf.copy(buffer, pos);
	    pos += buf.length;
	  }
	  return buffer
	};

	function byteLength (string, encoding) {
	  if (Buffer.isBuffer(string)) {
	    return string.length
	  }
	  if (ArrayBuffer.isView(string) || isInstance(string, ArrayBuffer)) {
	    return string.byteLength
	  }
	  if (typeof string !== 'string') {
	    throw new TypeError(
	      'The "string" argument must be one of type string, Buffer, or ArrayBuffer. ' +
	      'Received type ' + typeof string
	    )
	  }

	  var len = string.length;
	  var mustMatch = (arguments.length > 2 && arguments[2] === true);
	  if (!mustMatch && len === 0) return 0

	  // Use a for loop to avoid recursion
	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'ascii':
	      case 'latin1':
	      case 'binary':
	        return len
	      case 'utf8':
	      case 'utf-8':
	        return utf8ToBytes(string).length
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return len * 2
	      case 'hex':
	        return len >>> 1
	      case 'base64':
	        return base64ToBytes(string).length
	      default:
	        if (loweredCase) {
	          return mustMatch ? -1 : utf8ToBytes(string).length // assume utf8
	        }
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	}
	Buffer.byteLength = byteLength;

	function slowToString (encoding, start, end) {
	  var loweredCase = false;

	  // No need to verify that "this.length <= MAX_UINT32" since it's a read-only
	  // property of a typed array.

	  // This behaves neither like String nor Uint8Array in that we set start/end
	  // to their upper/lower bounds if the value passed is out of range.
	  // undefined is handled specially as per ECMA-262 6th Edition,
	  // Section 13.3.3.7 Runtime Semantics: KeyedBindingInitialization.
	  if (start === undefined || start < 0) {
	    start = 0;
	  }
	  // Return early if start > this.length. Done here to prevent potential uint32
	  // coercion fail below.
	  if (start > this.length) {
	    return ''
	  }

	  if (end === undefined || end > this.length) {
	    end = this.length;
	  }

	  if (end <= 0) {
	    return ''
	  }

	  // Force coersion to uint32. This will also coerce falsey/NaN values to 0.
	  end >>>= 0;
	  start >>>= 0;

	  if (end <= start) {
	    return ''
	  }

	  if (!encoding) encoding = 'utf8';

	  while (true) {
	    switch (encoding) {
	      case 'hex':
	        return hexSlice(this, start, end)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Slice(this, start, end)

	      case 'ascii':
	        return asciiSlice(this, start, end)

	      case 'latin1':
	      case 'binary':
	        return latin1Slice(this, start, end)

	      case 'base64':
	        return base64Slice(this, start, end)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return utf16leSlice(this, start, end)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = (encoding + '').toLowerCase();
	        loweredCase = true;
	    }
	  }
	}

	// This property is used by `Buffer.isBuffer` (and the `is-buffer` npm package)
	// to detect a Buffer instance. It's not possible to use `instanceof Buffer`
	// reliably in a browserify context because there could be multiple different
	// copies of the 'buffer' package in use. This method works even for Buffer
	// instances that were created from another copy of the `buffer` package.
	// See: https://github.com/feross/buffer/issues/154
	Buffer.prototype._isBuffer = true;

	function swap (b, n, m) {
	  var i = b[n];
	  b[n] = b[m];
	  b[m] = i;
	}

	Buffer.prototype.swap16 = function swap16 () {
	  var len = this.length;
	  if (len % 2 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 16-bits')
	  }
	  for (var i = 0; i < len; i += 2) {
	    swap(this, i, i + 1);
	  }
	  return this
	};

	Buffer.prototype.swap32 = function swap32 () {
	  var len = this.length;
	  if (len % 4 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 32-bits')
	  }
	  for (var i = 0; i < len; i += 4) {
	    swap(this, i, i + 3);
	    swap(this, i + 1, i + 2);
	  }
	  return this
	};

	Buffer.prototype.swap64 = function swap64 () {
	  var len = this.length;
	  if (len % 8 !== 0) {
	    throw new RangeError('Buffer size must be a multiple of 64-bits')
	  }
	  for (var i = 0; i < len; i += 8) {
	    swap(this, i, i + 7);
	    swap(this, i + 1, i + 6);
	    swap(this, i + 2, i + 5);
	    swap(this, i + 3, i + 4);
	  }
	  return this
	};

	Buffer.prototype.toString = function toString () {
	  var length = this.length;
	  if (length === 0) return ''
	  if (arguments.length === 0) return utf8Slice(this, 0, length)
	  return slowToString.apply(this, arguments)
	};

	Buffer.prototype.toLocaleString = Buffer.prototype.toString;

	Buffer.prototype.equals = function equals (b) {
	  if (!Buffer.isBuffer(b)) throw new TypeError('Argument must be a Buffer')
	  if (this === b) return true
	  return Buffer.compare(this, b) === 0
	};

	Buffer.prototype.inspect = function inspect () {
	  var str = '';
	  var max = exports.INSPECT_MAX_BYTES;
	  str = this.toString('hex', 0, max).replace(/(.{2})/g, '$1 ').trim();
	  if (this.length > max) str += ' ... ';
	  return '<Buffer ' + str + '>'
	};

	Buffer.prototype.compare = function compare (target, start, end, thisStart, thisEnd) {
	  if (isInstance(target, Uint8Array)) {
	    target = Buffer.from(target, target.offset, target.byteLength);
	  }
	  if (!Buffer.isBuffer(target)) {
	    throw new TypeError(
	      'The "target" argument must be one of type Buffer or Uint8Array. ' +
	      'Received type ' + (typeof target)
	    )
	  }

	  if (start === undefined) {
	    start = 0;
	  }
	  if (end === undefined) {
	    end = target ? target.length : 0;
	  }
	  if (thisStart === undefined) {
	    thisStart = 0;
	  }
	  if (thisEnd === undefined) {
	    thisEnd = this.length;
	  }

	  if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
	    throw new RangeError('out of range index')
	  }

	  if (thisStart >= thisEnd && start >= end) {
	    return 0
	  }
	  if (thisStart >= thisEnd) {
	    return -1
	  }
	  if (start >= end) {
	    return 1
	  }

	  start >>>= 0;
	  end >>>= 0;
	  thisStart >>>= 0;
	  thisEnd >>>= 0;

	  if (this === target) return 0

	  var x = thisEnd - thisStart;
	  var y = end - start;
	  var len = Math.min(x, y);

	  var thisCopy = this.slice(thisStart, thisEnd);
	  var targetCopy = target.slice(start, end);

	  for (var i = 0; i < len; ++i) {
	    if (thisCopy[i] !== targetCopy[i]) {
	      x = thisCopy[i];
	      y = targetCopy[i];
	      break
	    }
	  }

	  if (x < y) return -1
	  if (y < x) return 1
	  return 0
	};

	// Finds either the first index of `val` in `buffer` at offset >= `byteOffset`,
	// OR the last index of `val` in `buffer` at offset <= `byteOffset`.
	//
	// Arguments:
	// - buffer - a Buffer to search
	// - val - a string, Buffer, or number
	// - byteOffset - an index into `buffer`; will be clamped to an int32
	// - encoding - an optional encoding, relevant is val is a string
	// - dir - true for indexOf, false for lastIndexOf
	function bidirectionalIndexOf (buffer, val, byteOffset, encoding, dir) {
	  // Empty buffer means no match
	  if (buffer.length === 0) return -1

	  // Normalize byteOffset
	  if (typeof byteOffset === 'string') {
	    encoding = byteOffset;
	    byteOffset = 0;
	  } else if (byteOffset > 0x7fffffff) {
	    byteOffset = 0x7fffffff;
	  } else if (byteOffset < -0x80000000) {
	    byteOffset = -0x80000000;
	  }
	  byteOffset = +byteOffset; // Coerce to Number.
	  if (numberIsNaN(byteOffset)) {
	    // byteOffset: it it's undefined, null, NaN, "foo", etc, search whole buffer
	    byteOffset = dir ? 0 : (buffer.length - 1);
	  }

	  // Normalize byteOffset: negative offsets start from the end of the buffer
	  if (byteOffset < 0) byteOffset = buffer.length + byteOffset;
	  if (byteOffset >= buffer.length) {
	    if (dir) return -1
	    else byteOffset = buffer.length - 1;
	  } else if (byteOffset < 0) {
	    if (dir) byteOffset = 0;
	    else return -1
	  }

	  // Normalize val
	  if (typeof val === 'string') {
	    val = Buffer.from(val, encoding);
	  }

	  // Finally, search either indexOf (if dir is true) or lastIndexOf
	  if (Buffer.isBuffer(val)) {
	    // Special case: looking for empty string/buffer always fails
	    if (val.length === 0) {
	      return -1
	    }
	    return arrayIndexOf(buffer, val, byteOffset, encoding, dir)
	  } else if (typeof val === 'number') {
	    val = val & 0xFF; // Search for a byte value [0-255]
	    if (typeof Uint8Array.prototype.indexOf === 'function') {
	      if (dir) {
	        return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset)
	      } else {
	        return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset)
	      }
	    }
	    return arrayIndexOf(buffer, [ val ], byteOffset, encoding, dir)
	  }

	  throw new TypeError('val must be string, number or Buffer')
	}

	function arrayIndexOf (arr, val, byteOffset, encoding, dir) {
	  var indexSize = 1;
	  var arrLength = arr.length;
	  var valLength = val.length;

	  if (encoding !== undefined) {
	    encoding = String(encoding).toLowerCase();
	    if (encoding === 'ucs2' || encoding === 'ucs-2' ||
	        encoding === 'utf16le' || encoding === 'utf-16le') {
	      if (arr.length < 2 || val.length < 2) {
	        return -1
	      }
	      indexSize = 2;
	      arrLength /= 2;
	      valLength /= 2;
	      byteOffset /= 2;
	    }
	  }

	  function read (buf, i) {
	    if (indexSize === 1) {
	      return buf[i]
	    } else {
	      return buf.readUInt16BE(i * indexSize)
	    }
	  }

	  var i;
	  if (dir) {
	    var foundIndex = -1;
	    for (i = byteOffset; i < arrLength; i++) {
	      if (read(arr, i) === read(val, foundIndex === -1 ? 0 : i - foundIndex)) {
	        if (foundIndex === -1) foundIndex = i;
	        if (i - foundIndex + 1 === valLength) return foundIndex * indexSize
	      } else {
	        if (foundIndex !== -1) i -= i - foundIndex;
	        foundIndex = -1;
	      }
	    }
	  } else {
	    if (byteOffset + valLength > arrLength) byteOffset = arrLength - valLength;
	    for (i = byteOffset; i >= 0; i--) {
	      var found = true;
	      for (var j = 0; j < valLength; j++) {
	        if (read(arr, i + j) !== read(val, j)) {
	          found = false;
	          break
	        }
	      }
	      if (found) return i
	    }
	  }

	  return -1
	}

	Buffer.prototype.includes = function includes (val, byteOffset, encoding) {
	  return this.indexOf(val, byteOffset, encoding) !== -1
	};

	Buffer.prototype.indexOf = function indexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, true)
	};

	Buffer.prototype.lastIndexOf = function lastIndexOf (val, byteOffset, encoding) {
	  return bidirectionalIndexOf(this, val, byteOffset, encoding, false)
	};

	function hexWrite (buf, string, offset, length) {
	  offset = Number(offset) || 0;
	  var remaining = buf.length - offset;
	  if (!length) {
	    length = remaining;
	  } else {
	    length = Number(length);
	    if (length > remaining) {
	      length = remaining;
	    }
	  }

	  var strLen = string.length;

	  if (length > strLen / 2) {
	    length = strLen / 2;
	  }
	  for (var i = 0; i < length; ++i) {
	    var parsed = parseInt(string.substr(i * 2, 2), 16);
	    if (numberIsNaN(parsed)) return i
	    buf[offset + i] = parsed;
	  }
	  return i
	}

	function utf8Write (buf, string, offset, length) {
	  return blitBuffer(utf8ToBytes(string, buf.length - offset), buf, offset, length)
	}

	function asciiWrite (buf, string, offset, length) {
	  return blitBuffer(asciiToBytes(string), buf, offset, length)
	}

	function latin1Write (buf, string, offset, length) {
	  return asciiWrite(buf, string, offset, length)
	}

	function base64Write (buf, string, offset, length) {
	  return blitBuffer(base64ToBytes(string), buf, offset, length)
	}

	function ucs2Write (buf, string, offset, length) {
	  return blitBuffer(utf16leToBytes(string, buf.length - offset), buf, offset, length)
	}

	Buffer.prototype.write = function write (string, offset, length, encoding) {
	  // Buffer#write(string)
	  if (offset === undefined) {
	    encoding = 'utf8';
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, encoding)
	  } else if (length === undefined && typeof offset === 'string') {
	    encoding = offset;
	    length = this.length;
	    offset = 0;
	  // Buffer#write(string, offset[, length][, encoding])
	  } else if (isFinite(offset)) {
	    offset = offset >>> 0;
	    if (isFinite(length)) {
	      length = length >>> 0;
	      if (encoding === undefined) encoding = 'utf8';
	    } else {
	      encoding = length;
	      length = undefined;
	    }
	  } else {
	    throw new Error(
	      'Buffer.write(string, encoding, offset[, length]) is no longer supported'
	    )
	  }

	  var remaining = this.length - offset;
	  if (length === undefined || length > remaining) length = remaining;

	  if ((string.length > 0 && (length < 0 || offset < 0)) || offset > this.length) {
	    throw new RangeError('Attempt to write outside buffer bounds')
	  }

	  if (!encoding) encoding = 'utf8';

	  var loweredCase = false;
	  for (;;) {
	    switch (encoding) {
	      case 'hex':
	        return hexWrite(this, string, offset, length)

	      case 'utf8':
	      case 'utf-8':
	        return utf8Write(this, string, offset, length)

	      case 'ascii':
	        return asciiWrite(this, string, offset, length)

	      case 'latin1':
	      case 'binary':
	        return latin1Write(this, string, offset, length)

	      case 'base64':
	        // Warning: maxLength not taken into account in base64Write
	        return base64Write(this, string, offset, length)

	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return ucs2Write(this, string, offset, length)

	      default:
	        if (loweredCase) throw new TypeError('Unknown encoding: ' + encoding)
	        encoding = ('' + encoding).toLowerCase();
	        loweredCase = true;
	    }
	  }
	};

	Buffer.prototype.toJSON = function toJSON () {
	  return {
	    type: 'Buffer',
	    data: Array.prototype.slice.call(this._arr || this, 0)
	  }
	};

	function base64Slice (buf, start, end) {
	  if (start === 0 && end === buf.length) {
	    return base64.fromByteArray(buf)
	  } else {
	    return base64.fromByteArray(buf.slice(start, end))
	  }
	}

	function utf8Slice (buf, start, end) {
	  end = Math.min(buf.length, end);
	  var res = [];

	  var i = start;
	  while (i < end) {
	    var firstByte = buf[i];
	    var codePoint = null;
	    var bytesPerSequence = (firstByte > 0xEF) ? 4
	      : (firstByte > 0xDF) ? 3
	        : (firstByte > 0xBF) ? 2
	          : 1;

	    if (i + bytesPerSequence <= end) {
	      var secondByte, thirdByte, fourthByte, tempCodePoint;

	      switch (bytesPerSequence) {
	        case 1:
	          if (firstByte < 0x80) {
	            codePoint = firstByte;
	          }
	          break
	        case 2:
	          secondByte = buf[i + 1];
	          if ((secondByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0x1F) << 0x6 | (secondByte & 0x3F);
	            if (tempCodePoint > 0x7F) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 3:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0xC | (secondByte & 0x3F) << 0x6 | (thirdByte & 0x3F);
	            if (tempCodePoint > 0x7FF && (tempCodePoint < 0xD800 || tempCodePoint > 0xDFFF)) {
	              codePoint = tempCodePoint;
	            }
	          }
	          break
	        case 4:
	          secondByte = buf[i + 1];
	          thirdByte = buf[i + 2];
	          fourthByte = buf[i + 3];
	          if ((secondByte & 0xC0) === 0x80 && (thirdByte & 0xC0) === 0x80 && (fourthByte & 0xC0) === 0x80) {
	            tempCodePoint = (firstByte & 0xF) << 0x12 | (secondByte & 0x3F) << 0xC | (thirdByte & 0x3F) << 0x6 | (fourthByte & 0x3F);
	            if (tempCodePoint > 0xFFFF && tempCodePoint < 0x110000) {
	              codePoint = tempCodePoint;
	            }
	          }
	      }
	    }

	    if (codePoint === null) {
	      // we did not generate a valid codePoint so insert a
	      // replacement char (U+FFFD) and advance only 1 byte
	      codePoint = 0xFFFD;
	      bytesPerSequence = 1;
	    } else if (codePoint > 0xFFFF) {
	      // encode to utf16 (surrogate pair dance)
	      codePoint -= 0x10000;
	      res.push(codePoint >>> 10 & 0x3FF | 0xD800);
	      codePoint = 0xDC00 | codePoint & 0x3FF;
	    }

	    res.push(codePoint);
	    i += bytesPerSequence;
	  }

	  return decodeCodePointsArray(res)
	}

	// Based on http://stackoverflow.com/a/22747272/680742, the browser with
	// the lowest limit is Chrome, with 0x10000 args.
	// We go 1 magnitude less, for safety
	var MAX_ARGUMENTS_LENGTH = 0x1000;

	function decodeCodePointsArray (codePoints) {
	  var len = codePoints.length;
	  if (len <= MAX_ARGUMENTS_LENGTH) {
	    return String.fromCharCode.apply(String, codePoints) // avoid extra slice()
	  }

	  // Decode in chunks to avoid "call stack size exceeded".
	  var res = '';
	  var i = 0;
	  while (i < len) {
	    res += String.fromCharCode.apply(
	      String,
	      codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH)
	    );
	  }
	  return res
	}

	function asciiSlice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i] & 0x7F);
	  }
	  return ret
	}

	function latin1Slice (buf, start, end) {
	  var ret = '';
	  end = Math.min(buf.length, end);

	  for (var i = start; i < end; ++i) {
	    ret += String.fromCharCode(buf[i]);
	  }
	  return ret
	}

	function hexSlice (buf, start, end) {
	  var len = buf.length;

	  if (!start || start < 0) start = 0;
	  if (!end || end < 0 || end > len) end = len;

	  var out = '';
	  for (var i = start; i < end; ++i) {
	    out += toHex(buf[i]);
	  }
	  return out
	}

	function utf16leSlice (buf, start, end) {
	  var bytes = buf.slice(start, end);
	  var res = '';
	  for (var i = 0; i < bytes.length; i += 2) {
	    res += String.fromCharCode(bytes[i] + (bytes[i + 1] * 256));
	  }
	  return res
	}

	Buffer.prototype.slice = function slice (start, end) {
	  var len = this.length;
	  start = ~~start;
	  end = end === undefined ? len : ~~end;

	  if (start < 0) {
	    start += len;
	    if (start < 0) start = 0;
	  } else if (start > len) {
	    start = len;
	  }

	  if (end < 0) {
	    end += len;
	    if (end < 0) end = 0;
	  } else if (end > len) {
	    end = len;
	  }

	  if (end < start) end = start;

	  var newBuf = this.subarray(start, end);
	  // Return an augmented `Uint8Array` instance
	  newBuf.__proto__ = Buffer.prototype;
	  return newBuf
	};

	/*
	 * Need to make sure that buffer isn't trying to write out of bounds.
	 */
	function checkOffset (offset, ext, length) {
	  if ((offset % 1) !== 0 || offset < 0) throw new RangeError('offset is not uint')
	  if (offset + ext > length) throw new RangeError('Trying to access beyond buffer length')
	}

	Buffer.prototype.readUIntLE = function readUIntLE (offset, byteLength, noAssert) {
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUIntBE = function readUIntBE (offset, byteLength, noAssert) {
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) {
	    checkOffset(offset, byteLength, this.length);
	  }

	  var val = this[offset + --byteLength];
	  var mul = 1;
	  while (byteLength > 0 && (mul *= 0x100)) {
	    val += this[offset + --byteLength] * mul;
	  }

	  return val
	};

	Buffer.prototype.readUInt8 = function readUInt8 (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  return this[offset]
	};

	Buffer.prototype.readUInt16LE = function readUInt16LE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return this[offset] | (this[offset + 1] << 8)
	};

	Buffer.prototype.readUInt16BE = function readUInt16BE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  return (this[offset] << 8) | this[offset + 1]
	};

	Buffer.prototype.readUInt32LE = function readUInt32LE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return ((this[offset]) |
	      (this[offset + 1] << 8) |
	      (this[offset + 2] << 16)) +
	      (this[offset + 3] * 0x1000000)
	};

	Buffer.prototype.readUInt32BE = function readUInt32BE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] * 0x1000000) +
	    ((this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    this[offset + 3])
	};

	Buffer.prototype.readIntLE = function readIntLE (offset, byteLength, noAssert) {
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var val = this[offset];
	  var mul = 1;
	  var i = 0;
	  while (++i < byteLength && (mul *= 0x100)) {
	    val += this[offset + i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readIntBE = function readIntBE (offset, byteLength, noAssert) {
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) checkOffset(offset, byteLength, this.length);

	  var i = byteLength;
	  var mul = 1;
	  var val = this[offset + --i];
	  while (i > 0 && (mul *= 0x100)) {
	    val += this[offset + --i] * mul;
	  }
	  mul *= 0x80;

	  if (val >= mul) val -= Math.pow(2, 8 * byteLength);

	  return val
	};

	Buffer.prototype.readInt8 = function readInt8 (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 1, this.length);
	  if (!(this[offset] & 0x80)) return (this[offset])
	  return ((0xff - this[offset] + 1) * -1)
	};

	Buffer.prototype.readInt16LE = function readInt16LE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset] | (this[offset + 1] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt16BE = function readInt16BE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 2, this.length);
	  var val = this[offset + 1] | (this[offset] << 8);
	  return (val & 0x8000) ? val | 0xFFFF0000 : val
	};

	Buffer.prototype.readInt32LE = function readInt32LE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset]) |
	    (this[offset + 1] << 8) |
	    (this[offset + 2] << 16) |
	    (this[offset + 3] << 24)
	};

	Buffer.prototype.readInt32BE = function readInt32BE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);

	  return (this[offset] << 24) |
	    (this[offset + 1] << 16) |
	    (this[offset + 2] << 8) |
	    (this[offset + 3])
	};

	Buffer.prototype.readFloatLE = function readFloatLE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, true, 23, 4)
	};

	Buffer.prototype.readFloatBE = function readFloatBE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 4, this.length);
	  return ieee754.read(this, offset, false, 23, 4)
	};

	Buffer.prototype.readDoubleLE = function readDoubleLE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, true, 52, 8)
	};

	Buffer.prototype.readDoubleBE = function readDoubleBE (offset, noAssert) {
	  offset = offset >>> 0;
	  if (!noAssert) checkOffset(offset, 8, this.length);
	  return ieee754.read(this, offset, false, 52, 8)
	};

	function checkInt (buf, value, offset, ext, max, min) {
	  if (!Buffer.isBuffer(buf)) throw new TypeError('"buffer" argument must be a Buffer instance')
	  if (value > max || value < min) throw new RangeError('"value" argument is out of bounds')
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	}

	Buffer.prototype.writeUIntLE = function writeUIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var mul = 1;
	  var i = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUIntBE = function writeUIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  byteLength = byteLength >>> 0;
	  if (!noAssert) {
	    var maxBytes = Math.pow(2, 8 * byteLength) - 1;
	    checkInt(this, value, offset, byteLength, maxBytes, 0);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    this[offset + i] = (value / mul) & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeUInt8 = function writeUInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0xff, 0);
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	Buffer.prototype.writeUInt16LE = function writeUInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  this[offset] = (value & 0xff);
	  this[offset + 1] = (value >>> 8);
	  return offset + 2
	};

	Buffer.prototype.writeUInt16BE = function writeUInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0xffff, 0);
	  this[offset] = (value >>> 8);
	  this[offset + 1] = (value & 0xff);
	  return offset + 2
	};

	Buffer.prototype.writeUInt32LE = function writeUInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  this[offset + 3] = (value >>> 24);
	  this[offset + 2] = (value >>> 16);
	  this[offset + 1] = (value >>> 8);
	  this[offset] = (value & 0xff);
	  return offset + 4
	};

	Buffer.prototype.writeUInt32BE = function writeUInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0xffffffff, 0);
	  this[offset] = (value >>> 24);
	  this[offset + 1] = (value >>> 16);
	  this[offset + 2] = (value >>> 8);
	  this[offset + 3] = (value & 0xff);
	  return offset + 4
	};

	Buffer.prototype.writeIntLE = function writeIntLE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, (8 * byteLength) - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = 0;
	  var mul = 1;
	  var sub = 0;
	  this[offset] = value & 0xFF;
	  while (++i < byteLength && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeIntBE = function writeIntBE (value, offset, byteLength, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) {
	    var limit = Math.pow(2, (8 * byteLength) - 1);

	    checkInt(this, value, offset, byteLength, limit - 1, -limit);
	  }

	  var i = byteLength - 1;
	  var mul = 1;
	  var sub = 0;
	  this[offset + i] = value & 0xFF;
	  while (--i >= 0 && (mul *= 0x100)) {
	    if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
	      sub = 1;
	    }
	    this[offset + i] = ((value / mul) >> 0) - sub & 0xFF;
	  }

	  return offset + byteLength
	};

	Buffer.prototype.writeInt8 = function writeInt8 (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 1, 0x7f, -0x80);
	  if (value < 0) value = 0xff + value + 1;
	  this[offset] = (value & 0xff);
	  return offset + 1
	};

	Buffer.prototype.writeInt16LE = function writeInt16LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  this[offset] = (value & 0xff);
	  this[offset + 1] = (value >>> 8);
	  return offset + 2
	};

	Buffer.prototype.writeInt16BE = function writeInt16BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 2, 0x7fff, -0x8000);
	  this[offset] = (value >>> 8);
	  this[offset + 1] = (value & 0xff);
	  return offset + 2
	};

	Buffer.prototype.writeInt32LE = function writeInt32LE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  this[offset] = (value & 0xff);
	  this[offset + 1] = (value >>> 8);
	  this[offset + 2] = (value >>> 16);
	  this[offset + 3] = (value >>> 24);
	  return offset + 4
	};

	Buffer.prototype.writeInt32BE = function writeInt32BE (value, offset, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) checkInt(this, value, offset, 4, 0x7fffffff, -0x80000000);
	  if (value < 0) value = 0xffffffff + value + 1;
	  this[offset] = (value >>> 24);
	  this[offset + 1] = (value >>> 16);
	  this[offset + 2] = (value >>> 8);
	  this[offset + 3] = (value & 0xff);
	  return offset + 4
	};

	function checkIEEE754 (buf, value, offset, ext, max, min) {
	  if (offset + ext > buf.length) throw new RangeError('Index out of range')
	  if (offset < 0) throw new RangeError('Index out of range')
	}

	function writeFloat (buf, value, offset, littleEndian, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 4);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 23, 4);
	  return offset + 4
	}

	Buffer.prototype.writeFloatLE = function writeFloatLE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeFloatBE = function writeFloatBE (value, offset, noAssert) {
	  return writeFloat(this, value, offset, false, noAssert)
	};

	function writeDouble (buf, value, offset, littleEndian, noAssert) {
	  value = +value;
	  offset = offset >>> 0;
	  if (!noAssert) {
	    checkIEEE754(buf, value, offset, 8);
	  }
	  ieee754.write(buf, value, offset, littleEndian, 52, 8);
	  return offset + 8
	}

	Buffer.prototype.writeDoubleLE = function writeDoubleLE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, true, noAssert)
	};

	Buffer.prototype.writeDoubleBE = function writeDoubleBE (value, offset, noAssert) {
	  return writeDouble(this, value, offset, false, noAssert)
	};

	// copy(targetBuffer, targetStart=0, sourceStart=0, sourceEnd=buffer.length)
	Buffer.prototype.copy = function copy (target, targetStart, start, end) {
	  if (!Buffer.isBuffer(target)) throw new TypeError('argument should be a Buffer')
	  if (!start) start = 0;
	  if (!end && end !== 0) end = this.length;
	  if (targetStart >= target.length) targetStart = target.length;
	  if (!targetStart) targetStart = 0;
	  if (end > 0 && end < start) end = start;

	  // Copy 0 bytes; we're done
	  if (end === start) return 0
	  if (target.length === 0 || this.length === 0) return 0

	  // Fatal error conditions
	  if (targetStart < 0) {
	    throw new RangeError('targetStart out of bounds')
	  }
	  if (start < 0 || start >= this.length) throw new RangeError('Index out of range')
	  if (end < 0) throw new RangeError('sourceEnd out of bounds')

	  // Are we oob?
	  if (end > this.length) end = this.length;
	  if (target.length - targetStart < end - start) {
	    end = target.length - targetStart + start;
	  }

	  var len = end - start;

	  if (this === target && typeof Uint8Array.prototype.copyWithin === 'function') {
	    // Use built-in when available, missing from IE11
	    this.copyWithin(targetStart, start, end);
	  } else if (this === target && start < targetStart && targetStart < end) {
	    // descending copy from end
	    for (var i = len - 1; i >= 0; --i) {
	      target[i + targetStart] = this[i + start];
	    }
	  } else {
	    Uint8Array.prototype.set.call(
	      target,
	      this.subarray(start, end),
	      targetStart
	    );
	  }

	  return len
	};

	// Usage:
	//    buffer.fill(number[, offset[, end]])
	//    buffer.fill(buffer[, offset[, end]])
	//    buffer.fill(string[, offset[, end]][, encoding])
	Buffer.prototype.fill = function fill (val, start, end, encoding) {
	  // Handle string cases:
	  if (typeof val === 'string') {
	    if (typeof start === 'string') {
	      encoding = start;
	      start = 0;
	      end = this.length;
	    } else if (typeof end === 'string') {
	      encoding = end;
	      end = this.length;
	    }
	    if (encoding !== undefined && typeof encoding !== 'string') {
	      throw new TypeError('encoding must be a string')
	    }
	    if (typeof encoding === 'string' && !Buffer.isEncoding(encoding)) {
	      throw new TypeError('Unknown encoding: ' + encoding)
	    }
	    if (val.length === 1) {
	      var code = val.charCodeAt(0);
	      if ((encoding === 'utf8' && code < 128) ||
	          encoding === 'latin1') {
	        // Fast path: If `val` fits into a single byte, use that numeric value.
	        val = code;
	      }
	    }
	  } else if (typeof val === 'number') {
	    val = val & 255;
	  }

	  // Invalid ranges are not set to a default, so can range check early.
	  if (start < 0 || this.length < start || this.length < end) {
	    throw new RangeError('Out of range index')
	  }

	  if (end <= start) {
	    return this
	  }

	  start = start >>> 0;
	  end = end === undefined ? this.length : end >>> 0;

	  if (!val) val = 0;

	  var i;
	  if (typeof val === 'number') {
	    for (i = start; i < end; ++i) {
	      this[i] = val;
	    }
	  } else {
	    var bytes = Buffer.isBuffer(val)
	      ? val
	      : Buffer.from(val, encoding);
	    var len = bytes.length;
	    if (len === 0) {
	      throw new TypeError('The value "' + val +
	        '" is invalid for argument "value"')
	    }
	    for (i = 0; i < end - start; ++i) {
	      this[i + start] = bytes[i % len];
	    }
	  }

	  return this
	};

	// HELPER FUNCTIONS
	// ================

	var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;

	function base64clean (str) {
	  // Node takes equal signs as end of the Base64 encoding
	  str = str.split('=')[0];
	  // Node strips out invalid characters like \n and \t from the string, base64-js does not
	  str = str.trim().replace(INVALID_BASE64_RE, '');
	  // Node converts strings with length < 2 to ''
	  if (str.length < 2) return ''
	  // Node allows for non-padded base64 strings (missing trailing ===), base64-js does not
	  while (str.length % 4 !== 0) {
	    str = str + '=';
	  }
	  return str
	}

	function toHex (n) {
	  if (n < 16) return '0' + n.toString(16)
	  return n.toString(16)
	}

	function utf8ToBytes (string, units) {
	  units = units || Infinity;
	  var codePoint;
	  var length = string.length;
	  var leadSurrogate = null;
	  var bytes = [];

	  for (var i = 0; i < length; ++i) {
	    codePoint = string.charCodeAt(i);

	    // is surrogate component
	    if (codePoint > 0xD7FF && codePoint < 0xE000) {
	      // last char was a lead
	      if (!leadSurrogate) {
	        // no lead yet
	        if (codePoint > 0xDBFF) {
	          // unexpected trail
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        } else if (i + 1 === length) {
	          // unpaired lead
	          if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	          continue
	        }

	        // valid lead
	        leadSurrogate = codePoint;

	        continue
	      }

	      // 2 leads in a row
	      if (codePoint < 0xDC00) {
	        if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	        leadSurrogate = codePoint;
	        continue
	      }

	      // valid surrogate pair
	      codePoint = (leadSurrogate - 0xD800 << 10 | codePoint - 0xDC00) + 0x10000;
	    } else if (leadSurrogate) {
	      // valid bmp char, but last char was a lead
	      if ((units -= 3) > -1) bytes.push(0xEF, 0xBF, 0xBD);
	    }

	    leadSurrogate = null;

	    // encode utf8
	    if (codePoint < 0x80) {
	      if ((units -= 1) < 0) break
	      bytes.push(codePoint);
	    } else if (codePoint < 0x800) {
	      if ((units -= 2) < 0) break
	      bytes.push(
	        codePoint >> 0x6 | 0xC0,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x10000) {
	      if ((units -= 3) < 0) break
	      bytes.push(
	        codePoint >> 0xC | 0xE0,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else if (codePoint < 0x110000) {
	      if ((units -= 4) < 0) break
	      bytes.push(
	        codePoint >> 0x12 | 0xF0,
	        codePoint >> 0xC & 0x3F | 0x80,
	        codePoint >> 0x6 & 0x3F | 0x80,
	        codePoint & 0x3F | 0x80
	      );
	    } else {
	      throw new Error('Invalid code point')
	    }
	  }

	  return bytes
	}

	function asciiToBytes (str) {
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    // Node's code seems to be doing this and not & 0x7F..
	    byteArray.push(str.charCodeAt(i) & 0xFF);
	  }
	  return byteArray
	}

	function utf16leToBytes (str, units) {
	  var c, hi, lo;
	  var byteArray = [];
	  for (var i = 0; i < str.length; ++i) {
	    if ((units -= 2) < 0) break

	    c = str.charCodeAt(i);
	    hi = c >> 8;
	    lo = c % 256;
	    byteArray.push(lo);
	    byteArray.push(hi);
	  }

	  return byteArray
	}

	function base64ToBytes (str) {
	  return base64.toByteArray(base64clean(str))
	}

	function blitBuffer (src, dst, offset, length) {
	  for (var i = 0; i < length; ++i) {
	    if ((i + offset >= dst.length) || (i >= src.length)) break
	    dst[i + offset] = src[i];
	  }
	  return i
	}

	// ArrayBuffer or Uint8Array objects from other contexts (i.e. iframes) do not pass
	// the `instanceof` check but they should be treated as of that type.
	// See: https://github.com/feross/buffer/issues/166
	function isInstance (obj, type) {
	  return obj instanceof type ||
	    (obj != null && obj.constructor != null && obj.constructor.name != null &&
	      obj.constructor.name === type.name)
	}
	function numberIsNaN (obj) {
	  // For IE11 support
	  return obj !== obj // eslint-disable-line no-self-compare
	}

	}).call(this);}).call(this,require("buffer").Buffer);
	},{"base64-js":28,"buffer":32,"ieee754":45}],33:[function(require,module,exports){

	var GetIntrinsic = require('get-intrinsic');

	var callBind = require('./');

	var $indexOf = callBind(GetIntrinsic('String.prototype.indexOf'));

	module.exports = function callBoundIntrinsic(name, allowMissing) {
		var intrinsic = GetIntrinsic(name, !!allowMissing);
		if (typeof intrinsic === 'function' && $indexOf(name, '.prototype.') > -1) {
			return callBind(intrinsic);
		}
		return intrinsic;
	};

	},{"./":34,"get-intrinsic":39}],34:[function(require,module,exports){

	var bind = require('function-bind');
	var GetIntrinsic = require('get-intrinsic');

	var $apply = GetIntrinsic('%Function.prototype.apply%');
	var $call = GetIntrinsic('%Function.prototype.call%');
	var $reflectApply = GetIntrinsic('%Reflect.apply%', true) || bind.call($call, $apply);

	var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);
	var $defineProperty = GetIntrinsic('%Object.defineProperty%', true);
	var $max = GetIntrinsic('%Math.max%');

	if ($defineProperty) {
		try {
			$defineProperty({}, 'a', { value: 1 });
		} catch (e) {
			// IE 8 has a broken defineProperty
			$defineProperty = null;
		}
	}

	module.exports = function callBind(originalFunction) {
		var func = $reflectApply(bind, $call, arguments);
		if ($gOPD && $defineProperty) {
			var desc = $gOPD(func, 'length');
			if (desc.configurable) {
				// original length, plus the receiver, minus any additional arguments (after the receiver)
				$defineProperty(
					func,
					'length',
					{ value: 1 + $max(0, originalFunction.length - (arguments.length - 1)) }
				);
			}
		}
		return func;
	};

	var applyBind = function applyBind() {
		return $reflectApply(bind, $apply, arguments);
	};

	if ($defineProperty) {
		$defineProperty(module.exports, 'apply', { value: applyBind });
	} else {
		module.exports.apply = applyBind;
	}

	},{"function-bind":38,"get-intrinsic":39}],35:[function(require,module,exports){

	var R = typeof Reflect === 'object' ? Reflect : null;
	var ReflectApply = R && typeof R.apply === 'function'
	  ? R.apply
	  : function ReflectApply(target, receiver, args) {
	    return Function.prototype.apply.call(target, receiver, args);
	  };

	var ReflectOwnKeys;
	if (R && typeof R.ownKeys === 'function') {
	  ReflectOwnKeys = R.ownKeys;
	} else if (Object.getOwnPropertySymbols) {
	  ReflectOwnKeys = function ReflectOwnKeys(target) {
	    return Object.getOwnPropertyNames(target)
	      .concat(Object.getOwnPropertySymbols(target));
	  };
	} else {
	  ReflectOwnKeys = function ReflectOwnKeys(target) {
	    return Object.getOwnPropertyNames(target);
	  };
	}

	function ProcessEmitWarning(warning) {
	  if (console && console.warn) console.warn(warning);
	}

	var NumberIsNaN = Number.isNaN || function NumberIsNaN(value) {
	  return value !== value;
	};

	function EventEmitter() {
	  EventEmitter.init.call(this);
	}
	module.exports = EventEmitter;
	module.exports.once = once;

	// Backwards-compat with node 0.10.x
	EventEmitter.EventEmitter = EventEmitter;

	EventEmitter.prototype._events = undefined;
	EventEmitter.prototype._eventsCount = 0;
	EventEmitter.prototype._maxListeners = undefined;

	// By default EventEmitters will print a warning if more than 10 listeners are
	// added to it. This is a useful default which helps finding memory leaks.
	var defaultMaxListeners = 10;

	function checkListener(listener) {
	  if (typeof listener !== 'function') {
	    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
	  }
	}

	Object.defineProperty(EventEmitter, 'defaultMaxListeners', {
	  enumerable: true,
	  get: function() {
	    return defaultMaxListeners;
	  },
	  set: function(arg) {
	    if (typeof arg !== 'number' || arg < 0 || NumberIsNaN(arg)) {
	      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + '.');
	    }
	    defaultMaxListeners = arg;
	  }
	});

	EventEmitter.init = function() {

	  if (this._events === undefined ||
	      this._events === Object.getPrototypeOf(this)._events) {
	    this._events = Object.create(null);
	    this._eventsCount = 0;
	  }

	  this._maxListeners = this._maxListeners || undefined;
	};

	// Obviously not all Emitters should be limited to 10. This function allows
	// that to be increased. Set to zero for unlimited.
	EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
	  if (typeof n !== 'number' || n < 0 || NumberIsNaN(n)) {
	    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + '.');
	  }
	  this._maxListeners = n;
	  return this;
	};

	function _getMaxListeners(that) {
	  if (that._maxListeners === undefined)
	    return EventEmitter.defaultMaxListeners;
	  return that._maxListeners;
	}

	EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
	  return _getMaxListeners(this);
	};

	EventEmitter.prototype.emit = function emit(type) {
	  var args = [];
	  for (var i = 1; i < arguments.length; i++) args.push(arguments[i]);
	  var doError = (type === 'error');

	  var events = this._events;
	  if (events !== undefined)
	    doError = (doError && events.error === undefined);
	  else if (!doError)
	    return false;

	  // If there is no 'error' event listener then throw.
	  if (doError) {
	    var er;
	    if (args.length > 0)
	      er = args[0];
	    if (er instanceof Error) {
	      // Note: The comments on the `throw` lines are intentional, they show
	      // up in Node's output if this results in an unhandled exception.
	      throw er; // Unhandled 'error' event
	    }
	    // At least give some kind of context to the user
	    var err = new Error('Unhandled error.' + (er ? ' (' + er.message + ')' : ''));
	    err.context = er;
	    throw err; // Unhandled 'error' event
	  }

	  var handler = events[type];

	  if (handler === undefined)
	    return false;

	  if (typeof handler === 'function') {
	    ReflectApply(handler, this, args);
	  } else {
	    var len = handler.length;
	    var listeners = arrayClone(handler, len);
	    for (var i = 0; i < len; ++i)
	      ReflectApply(listeners[i], this, args);
	  }

	  return true;
	};

	function _addListener(target, type, listener, prepend) {
	  var m;
	  var events;
	  var existing;

	  checkListener(listener);

	  events = target._events;
	  if (events === undefined) {
	    events = target._events = Object.create(null);
	    target._eventsCount = 0;
	  } else {
	    // To avoid recursion in the case that type === "newListener"! Before
	    // adding it to the listeners, first emit "newListener".
	    if (events.newListener !== undefined) {
	      target.emit('newListener', type,
	                  listener.listener ? listener.listener : listener);

	      // Re-assign `events` because a newListener handler could have caused the
	      // this._events to be assigned to a new object
	      events = target._events;
	    }
	    existing = events[type];
	  }

	  if (existing === undefined) {
	    // Optimize the case of one listener. Don't need the extra array object.
	    existing = events[type] = listener;
	    ++target._eventsCount;
	  } else {
	    if (typeof existing === 'function') {
	      // Adding the second element, need to change to array.
	      existing = events[type] =
	        prepend ? [listener, existing] : [existing, listener];
	      // If we've already got an array, just append.
	    } else if (prepend) {
	      existing.unshift(listener);
	    } else {
	      existing.push(listener);
	    }

	    // Check for listener leak
	    m = _getMaxListeners(target);
	    if (m > 0 && existing.length > m && !existing.warned) {
	      existing.warned = true;
	      // No error code for this since it is a Warning
	      // eslint-disable-next-line no-restricted-syntax
	      var w = new Error('Possible EventEmitter memory leak detected. ' +
	                          existing.length + ' ' + String(type) + ' listeners ' +
	                          'added. Use emitter.setMaxListeners() to ' +
	                          'increase limit');
	      w.name = 'MaxListenersExceededWarning';
	      w.emitter = target;
	      w.type = type;
	      w.count = existing.length;
	      ProcessEmitWarning(w);
	    }
	  }

	  return target;
	}

	EventEmitter.prototype.addListener = function addListener(type, listener) {
	  return _addListener(this, type, listener, false);
	};

	EventEmitter.prototype.on = EventEmitter.prototype.addListener;

	EventEmitter.prototype.prependListener =
	    function prependListener(type, listener) {
	      return _addListener(this, type, listener, true);
	    };

	function onceWrapper() {
	  if (!this.fired) {
	    this.target.removeListener(this.type, this.wrapFn);
	    this.fired = true;
	    if (arguments.length === 0)
	      return this.listener.call(this.target);
	    return this.listener.apply(this.target, arguments);
	  }
	}

	function _onceWrap(target, type, listener) {
	  var state = { fired: false, wrapFn: undefined, target: target, type: type, listener: listener };
	  var wrapped = onceWrapper.bind(state);
	  wrapped.listener = listener;
	  state.wrapFn = wrapped;
	  return wrapped;
	}

	EventEmitter.prototype.once = function once(type, listener) {
	  checkListener(listener);
	  this.on(type, _onceWrap(this, type, listener));
	  return this;
	};

	EventEmitter.prototype.prependOnceListener =
	    function prependOnceListener(type, listener) {
	      checkListener(listener);
	      this.prependListener(type, _onceWrap(this, type, listener));
	      return this;
	    };

	// Emits a 'removeListener' event if and only if the listener was removed.
	EventEmitter.prototype.removeListener =
	    function removeListener(type, listener) {
	      var list, events, position, i, originalListener;

	      checkListener(listener);

	      events = this._events;
	      if (events === undefined)
	        return this;

	      list = events[type];
	      if (list === undefined)
	        return this;

	      if (list === listener || list.listener === listener) {
	        if (--this._eventsCount === 0)
	          this._events = Object.create(null);
	        else {
	          delete events[type];
	          if (events.removeListener)
	            this.emit('removeListener', type, list.listener || listener);
	        }
	      } else if (typeof list !== 'function') {
	        position = -1;

	        for (i = list.length - 1; i >= 0; i--) {
	          if (list[i] === listener || list[i].listener === listener) {
	            originalListener = list[i].listener;
	            position = i;
	            break;
	          }
	        }

	        if (position < 0)
	          return this;

	        if (position === 0)
	          list.shift();
	        else {
	          spliceOne(list, position);
	        }

	        if (list.length === 1)
	          events[type] = list[0];

	        if (events.removeListener !== undefined)
	          this.emit('removeListener', type, originalListener || listener);
	      }

	      return this;
	    };

	EventEmitter.prototype.off = EventEmitter.prototype.removeListener;

	EventEmitter.prototype.removeAllListeners =
	    function removeAllListeners(type) {
	      var listeners, events, i;

	      events = this._events;
	      if (events === undefined)
	        return this;

	      // not listening for removeListener, no need to emit
	      if (events.removeListener === undefined) {
	        if (arguments.length === 0) {
	          this._events = Object.create(null);
	          this._eventsCount = 0;
	        } else if (events[type] !== undefined) {
	          if (--this._eventsCount === 0)
	            this._events = Object.create(null);
	          else
	            delete events[type];
	        }
	        return this;
	      }

	      // emit removeListener for all listeners on all events
	      if (arguments.length === 0) {
	        var keys = Object.keys(events);
	        var key;
	        for (i = 0; i < keys.length; ++i) {
	          key = keys[i];
	          if (key === 'removeListener') continue;
	          this.removeAllListeners(key);
	        }
	        this.removeAllListeners('removeListener');
	        this._events = Object.create(null);
	        this._eventsCount = 0;
	        return this;
	      }

	      listeners = events[type];

	      if (typeof listeners === 'function') {
	        this.removeListener(type, listeners);
	      } else if (listeners !== undefined) {
	        // LIFO order
	        for (i = listeners.length - 1; i >= 0; i--) {
	          this.removeListener(type, listeners[i]);
	        }
	      }

	      return this;
	    };

	function _listeners(target, type, unwrap) {
	  var events = target._events;

	  if (events === undefined)
	    return [];

	  var evlistener = events[type];
	  if (evlistener === undefined)
	    return [];

	  if (typeof evlistener === 'function')
	    return unwrap ? [evlistener.listener || evlistener] : [evlistener];

	  return unwrap ?
	    unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
	}

	EventEmitter.prototype.listeners = function listeners(type) {
	  return _listeners(this, type, true);
	};

	EventEmitter.prototype.rawListeners = function rawListeners(type) {
	  return _listeners(this, type, false);
	};

	EventEmitter.listenerCount = function(emitter, type) {
	  if (typeof emitter.listenerCount === 'function') {
	    return emitter.listenerCount(type);
	  } else {
	    return listenerCount.call(emitter, type);
	  }
	};

	EventEmitter.prototype.listenerCount = listenerCount;
	function listenerCount(type) {
	  var events = this._events;

	  if (events !== undefined) {
	    var evlistener = events[type];

	    if (typeof evlistener === 'function') {
	      return 1;
	    } else if (evlistener !== undefined) {
	      return evlistener.length;
	    }
	  }

	  return 0;
	}

	EventEmitter.prototype.eventNames = function eventNames() {
	  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
	};

	function arrayClone(arr, n) {
	  var copy = new Array(n);
	  for (var i = 0; i < n; ++i)
	    copy[i] = arr[i];
	  return copy;
	}

	function spliceOne(list, index) {
	  for (; index + 1 < list.length; index++)
	    list[index] = list[index + 1];
	  list.pop();
	}

	function unwrapListeners(arr) {
	  var ret = new Array(arr.length);
	  for (var i = 0; i < ret.length; ++i) {
	    ret[i] = arr[i].listener || arr[i];
	  }
	  return ret;
	}

	function once(emitter, name) {
	  return new Promise(function (resolve, reject) {
	    function errorListener(err) {
	      emitter.removeListener(name, resolver);
	      reject(err);
	    }

	    function resolver() {
	      if (typeof emitter.removeListener === 'function') {
	        emitter.removeListener('error', errorListener);
	      }
	      resolve([].slice.call(arguments));
	    }
	    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
	    if (name !== 'error') {
	      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
	    }
	  });
	}

	function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
	  if (typeof emitter.on === 'function') {
	    eventTargetAgnosticAddListener(emitter, 'error', handler, flags);
	  }
	}

	function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
	  if (typeof emitter.on === 'function') {
	    if (flags.once) {
	      emitter.once(name, listener);
	    } else {
	      emitter.on(name, listener);
	    }
	  } else if (typeof emitter.addEventListener === 'function') {
	    // EventTarget does not have `error` event semantics like Node
	    // EventEmitters, we do not listen for `error` events here.
	    emitter.addEventListener(name, function wrapListener(arg) {
	      // IE does not have builtin `{ once: true }` support so we
	      // have to do it manually.
	      if (flags.once) {
	        emitter.removeEventListener(name, wrapListener);
	      }
	      listener(arg);
	    });
	  } else {
	    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
	  }
	}

	},{}],36:[function(require,module,exports){

	var isCallable = require('is-callable');

	var toStr = Object.prototype.toString;
	var hasOwnProperty = Object.prototype.hasOwnProperty;

	var forEachArray = function forEachArray(array, iterator, receiver) {
	    for (var i = 0, len = array.length; i < len; i++) {
	        if (hasOwnProperty.call(array, i)) {
	            if (receiver == null) {
	                iterator(array[i], i, array);
	            } else {
	                iterator.call(receiver, array[i], i, array);
	            }
	        }
	    }
	};

	var forEachString = function forEachString(string, iterator, receiver) {
	    for (var i = 0, len = string.length; i < len; i++) {
	        // no such thing as a sparse string.
	        if (receiver == null) {
	            iterator(string.charAt(i), i, string);
	        } else {
	            iterator.call(receiver, string.charAt(i), i, string);
	        }
	    }
	};

	var forEachObject = function forEachObject(object, iterator, receiver) {
	    for (var k in object) {
	        if (hasOwnProperty.call(object, k)) {
	            if (receiver == null) {
	                iterator(object[k], k, object);
	            } else {
	                iterator.call(receiver, object[k], k, object);
	            }
	        }
	    }
	};

	var forEach = function forEach(list, iterator, thisArg) {
	    if (!isCallable(iterator)) {
	        throw new TypeError('iterator must be a function');
	    }

	    var receiver;
	    if (arguments.length >= 3) {
	        receiver = thisArg;
	    }

	    if (toStr.call(list) === '[object Array]') {
	        forEachArray(list, iterator, receiver);
	    } else if (typeof list === 'string') {
	        forEachString(list, iterator, receiver);
	    } else {
	        forEachObject(list, iterator, receiver);
	    }
	};

	module.exports = forEach;

	},{"is-callable":48}],37:[function(require,module,exports){

	/* eslint no-invalid-this: 1 */

	var ERROR_MESSAGE = 'Function.prototype.bind called on incompatible ';
	var slice = Array.prototype.slice;
	var toStr = Object.prototype.toString;
	var funcType = '[object Function]';

	module.exports = function bind(that) {
	    var target = this;
	    if (typeof target !== 'function' || toStr.call(target) !== funcType) {
	        throw new TypeError(ERROR_MESSAGE + target);
	    }
	    var args = slice.call(arguments, 1);

	    var bound;
	    var binder = function () {
	        if (this instanceof bound) {
	            var result = target.apply(
	                this,
	                args.concat(slice.call(arguments))
	            );
	            if (Object(result) === result) {
	                return result;
	            }
	            return this;
	        } else {
	            return target.apply(
	                that,
	                args.concat(slice.call(arguments))
	            );
	        }
	    };

	    var boundLength = Math.max(0, target.length - args.length);
	    var boundArgs = [];
	    for (var i = 0; i < boundLength; i++) {
	        boundArgs.push('$' + i);
	    }

	    bound = Function('binder', 'return function (' + boundArgs.join(',') + '){ return binder.apply(this,arguments); }')(binder);

	    if (target.prototype) {
	        var Empty = function Empty() {};
	        Empty.prototype = target.prototype;
	        bound.prototype = new Empty();
	        Empty.prototype = null;
	    }

	    return bound;
	};

	},{}],38:[function(require,module,exports){

	var implementation = require('./implementation');

	module.exports = Function.prototype.bind || implementation;

	},{"./implementation":37}],39:[function(require,module,exports){

	var undefined$1;

	var $SyntaxError = SyntaxError;
	var $Function = Function;
	var $TypeError = TypeError;

	// eslint-disable-next-line consistent-return
	var getEvalledConstructor = function (expressionSyntax) {
		try {
			return $Function('"use strict"; return (' + expressionSyntax + ').constructor;')();
		} catch (e) {}
	};

	var $gOPD = Object.getOwnPropertyDescriptor;
	if ($gOPD) {
		try {
			$gOPD({}, '');
		} catch (e) {
			$gOPD = null; // this is IE 8, which has a broken gOPD
		}
	}

	var throwTypeError = function () {
		throw new $TypeError();
	};
	var ThrowTypeError = $gOPD
		? (function () {
			try {
				// eslint-disable-next-line no-unused-expressions, no-caller, no-restricted-properties
				arguments.callee; // IE 8 does not throw here
				return throwTypeError;
			} catch (calleeThrows) {
				try {
					// IE 8 throws on Object.getOwnPropertyDescriptor(arguments, '')
					return $gOPD(arguments, 'callee').get;
				} catch (gOPDthrows) {
					return throwTypeError;
				}
			}
		}())
		: throwTypeError;

	var hasSymbols = require('has-symbols')();

	var getProto = Object.getPrototypeOf || function (x) { return x.__proto__; }; // eslint-disable-line no-proto

	var needsEval = {};

	var TypedArray = typeof Uint8Array === 'undefined' ? undefined$1 : getProto(Uint8Array);

	var INTRINSICS = {
		'%AggregateError%': typeof AggregateError === 'undefined' ? undefined$1 : AggregateError,
		'%Array%': Array,
		'%ArrayBuffer%': typeof ArrayBuffer === 'undefined' ? undefined$1 : ArrayBuffer,
		'%ArrayIteratorPrototype%': hasSymbols ? getProto([][Symbol.iterator]()) : undefined$1,
		'%AsyncFromSyncIteratorPrototype%': undefined$1,
		'%AsyncFunction%': needsEval,
		'%AsyncGenerator%': needsEval,
		'%AsyncGeneratorFunction%': needsEval,
		'%AsyncIteratorPrototype%': needsEval,
		'%Atomics%': typeof Atomics === 'undefined' ? undefined$1 : Atomics,
		'%BigInt%': typeof BigInt === 'undefined' ? undefined$1 : BigInt,
		'%BigInt64Array%': typeof BigInt64Array === 'undefined' ? undefined$1 : BigInt64Array,
		'%BigUint64Array%': typeof BigUint64Array === 'undefined' ? undefined$1 : BigUint64Array,
		'%Boolean%': Boolean,
		'%DataView%': typeof DataView === 'undefined' ? undefined$1 : DataView,
		'%Date%': Date,
		'%decodeURI%': decodeURI,
		'%decodeURIComponent%': decodeURIComponent,
		'%encodeURI%': encodeURI,
		'%encodeURIComponent%': encodeURIComponent,
		'%Error%': Error,
		'%eval%': eval, // eslint-disable-line no-eval
		'%EvalError%': EvalError,
		'%Float32Array%': typeof Float32Array === 'undefined' ? undefined$1 : Float32Array,
		'%Float64Array%': typeof Float64Array === 'undefined' ? undefined$1 : Float64Array,
		'%FinalizationRegistry%': typeof FinalizationRegistry === 'undefined' ? undefined$1 : FinalizationRegistry,
		'%Function%': $Function,
		'%GeneratorFunction%': needsEval,
		'%Int8Array%': typeof Int8Array === 'undefined' ? undefined$1 : Int8Array,
		'%Int16Array%': typeof Int16Array === 'undefined' ? undefined$1 : Int16Array,
		'%Int32Array%': typeof Int32Array === 'undefined' ? undefined$1 : Int32Array,
		'%isFinite%': isFinite,
		'%isNaN%': isNaN,
		'%IteratorPrototype%': hasSymbols ? getProto(getProto([][Symbol.iterator]())) : undefined$1,
		'%JSON%': typeof JSON === 'object' ? JSON : undefined$1,
		'%Map%': typeof Map === 'undefined' ? undefined$1 : Map,
		'%MapIteratorPrototype%': typeof Map === 'undefined' || !hasSymbols ? undefined$1 : getProto(new Map()[Symbol.iterator]()),
		'%Math%': Math,
		'%Number%': Number,
		'%Object%': Object,
		'%parseFloat%': parseFloat,
		'%parseInt%': parseInt,
		'%Promise%': typeof Promise === 'undefined' ? undefined$1 : Promise,
		'%Proxy%': typeof Proxy === 'undefined' ? undefined$1 : Proxy,
		'%RangeError%': RangeError,
		'%ReferenceError%': ReferenceError,
		'%Reflect%': typeof Reflect === 'undefined' ? undefined$1 : Reflect,
		'%RegExp%': RegExp,
		'%Set%': typeof Set === 'undefined' ? undefined$1 : Set,
		'%SetIteratorPrototype%': typeof Set === 'undefined' || !hasSymbols ? undefined$1 : getProto(new Set()[Symbol.iterator]()),
		'%SharedArrayBuffer%': typeof SharedArrayBuffer === 'undefined' ? undefined$1 : SharedArrayBuffer,
		'%String%': String,
		'%StringIteratorPrototype%': hasSymbols ? getProto(''[Symbol.iterator]()) : undefined$1,
		'%Symbol%': hasSymbols ? Symbol : undefined$1,
		'%SyntaxError%': $SyntaxError,
		'%ThrowTypeError%': ThrowTypeError,
		'%TypedArray%': TypedArray,
		'%TypeError%': $TypeError,
		'%Uint8Array%': typeof Uint8Array === 'undefined' ? undefined$1 : Uint8Array,
		'%Uint8ClampedArray%': typeof Uint8ClampedArray === 'undefined' ? undefined$1 : Uint8ClampedArray,
		'%Uint16Array%': typeof Uint16Array === 'undefined' ? undefined$1 : Uint16Array,
		'%Uint32Array%': typeof Uint32Array === 'undefined' ? undefined$1 : Uint32Array,
		'%URIError%': URIError,
		'%WeakMap%': typeof WeakMap === 'undefined' ? undefined$1 : WeakMap,
		'%WeakRef%': typeof WeakRef === 'undefined' ? undefined$1 : WeakRef,
		'%WeakSet%': typeof WeakSet === 'undefined' ? undefined$1 : WeakSet
	};

	try {
		null.error; // eslint-disable-line no-unused-expressions
	} catch (e) {
		// https://github.com/tc39/proposal-shadowrealm/pull/384#issuecomment-1364264229
		var errorProto = getProto(getProto(e));
		INTRINSICS['%Error.prototype%'] = errorProto;
	}

	var doEval = function doEval(name) {
		var value;
		if (name === '%AsyncFunction%') {
			value = getEvalledConstructor('async function () {}');
		} else if (name === '%GeneratorFunction%') {
			value = getEvalledConstructor('function* () {}');
		} else if (name === '%AsyncGeneratorFunction%') {
			value = getEvalledConstructor('async function* () {}');
		} else if (name === '%AsyncGenerator%') {
			var fn = doEval('%AsyncGeneratorFunction%');
			if (fn) {
				value = fn.prototype;
			}
		} else if (name === '%AsyncIteratorPrototype%') {
			var gen = doEval('%AsyncGenerator%');
			if (gen) {
				value = getProto(gen.prototype);
			}
		}

		INTRINSICS[name] = value;

		return value;
	};

	var LEGACY_ALIASES = {
		'%ArrayBufferPrototype%': ['ArrayBuffer', 'prototype'],
		'%ArrayPrototype%': ['Array', 'prototype'],
		'%ArrayProto_entries%': ['Array', 'prototype', 'entries'],
		'%ArrayProto_forEach%': ['Array', 'prototype', 'forEach'],
		'%ArrayProto_keys%': ['Array', 'prototype', 'keys'],
		'%ArrayProto_values%': ['Array', 'prototype', 'values'],
		'%AsyncFunctionPrototype%': ['AsyncFunction', 'prototype'],
		'%AsyncGenerator%': ['AsyncGeneratorFunction', 'prototype'],
		'%AsyncGeneratorPrototype%': ['AsyncGeneratorFunction', 'prototype', 'prototype'],
		'%BooleanPrototype%': ['Boolean', 'prototype'],
		'%DataViewPrototype%': ['DataView', 'prototype'],
		'%DatePrototype%': ['Date', 'prototype'],
		'%ErrorPrototype%': ['Error', 'prototype'],
		'%EvalErrorPrototype%': ['EvalError', 'prototype'],
		'%Float32ArrayPrototype%': ['Float32Array', 'prototype'],
		'%Float64ArrayPrototype%': ['Float64Array', 'prototype'],
		'%FunctionPrototype%': ['Function', 'prototype'],
		'%Generator%': ['GeneratorFunction', 'prototype'],
		'%GeneratorPrototype%': ['GeneratorFunction', 'prototype', 'prototype'],
		'%Int8ArrayPrototype%': ['Int8Array', 'prototype'],
		'%Int16ArrayPrototype%': ['Int16Array', 'prototype'],
		'%Int32ArrayPrototype%': ['Int32Array', 'prototype'],
		'%JSONParse%': ['JSON', 'parse'],
		'%JSONStringify%': ['JSON', 'stringify'],
		'%MapPrototype%': ['Map', 'prototype'],
		'%NumberPrototype%': ['Number', 'prototype'],
		'%ObjectPrototype%': ['Object', 'prototype'],
		'%ObjProto_toString%': ['Object', 'prototype', 'toString'],
		'%ObjProto_valueOf%': ['Object', 'prototype', 'valueOf'],
		'%PromisePrototype%': ['Promise', 'prototype'],
		'%PromiseProto_then%': ['Promise', 'prototype', 'then'],
		'%Promise_all%': ['Promise', 'all'],
		'%Promise_reject%': ['Promise', 'reject'],
		'%Promise_resolve%': ['Promise', 'resolve'],
		'%RangeErrorPrototype%': ['RangeError', 'prototype'],
		'%ReferenceErrorPrototype%': ['ReferenceError', 'prototype'],
		'%RegExpPrototype%': ['RegExp', 'prototype'],
		'%SetPrototype%': ['Set', 'prototype'],
		'%SharedArrayBufferPrototype%': ['SharedArrayBuffer', 'prototype'],
		'%StringPrototype%': ['String', 'prototype'],
		'%SymbolPrototype%': ['Symbol', 'prototype'],
		'%SyntaxErrorPrototype%': ['SyntaxError', 'prototype'],
		'%TypedArrayPrototype%': ['TypedArray', 'prototype'],
		'%TypeErrorPrototype%': ['TypeError', 'prototype'],
		'%Uint8ArrayPrototype%': ['Uint8Array', 'prototype'],
		'%Uint8ClampedArrayPrototype%': ['Uint8ClampedArray', 'prototype'],
		'%Uint16ArrayPrototype%': ['Uint16Array', 'prototype'],
		'%Uint32ArrayPrototype%': ['Uint32Array', 'prototype'],
		'%URIErrorPrototype%': ['URIError', 'prototype'],
		'%WeakMapPrototype%': ['WeakMap', 'prototype'],
		'%WeakSetPrototype%': ['WeakSet', 'prototype']
	};

	var bind = require('function-bind');
	var hasOwn = require('has');
	var $concat = bind.call(Function.call, Array.prototype.concat);
	var $spliceApply = bind.call(Function.apply, Array.prototype.splice);
	var $replace = bind.call(Function.call, String.prototype.replace);
	var $strSlice = bind.call(Function.call, String.prototype.slice);
	var $exec = bind.call(Function.call, RegExp.prototype.exec);

	/* adapted from https://github.com/lodash/lodash/blob/4.17.15/dist/lodash.js#L6735-L6744 */
	var rePropName = /[^%.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|%$))/g;
	var reEscapeChar = /\\(\\)?/g; /** Used to match backslashes in property paths. */
	var stringToPath = function stringToPath(string) {
		var first = $strSlice(string, 0, 1);
		var last = $strSlice(string, -1);
		if (first === '%' && last !== '%') {
			throw new $SyntaxError('invalid intrinsic syntax, expected closing `%`');
		} else if (last === '%' && first !== '%') {
			throw new $SyntaxError('invalid intrinsic syntax, expected opening `%`');
		}
		var result = [];
		$replace(string, rePropName, function (match, number, quote, subString) {
			result[result.length] = quote ? $replace(subString, reEscapeChar, '$1') : number || match;
		});
		return result;
	};
	/* end adaptation */

	var getBaseIntrinsic = function getBaseIntrinsic(name, allowMissing) {
		var intrinsicName = name;
		var alias;
		if (hasOwn(LEGACY_ALIASES, intrinsicName)) {
			alias = LEGACY_ALIASES[intrinsicName];
			intrinsicName = '%' + alias[0] + '%';
		}

		if (hasOwn(INTRINSICS, intrinsicName)) {
			var value = INTRINSICS[intrinsicName];
			if (value === needsEval) {
				value = doEval(intrinsicName);
			}
			if (typeof value === 'undefined' && !allowMissing) {
				throw new $TypeError('intrinsic ' + name + ' exists, but is not available. Please file an issue!');
			}

			return {
				alias: alias,
				name: intrinsicName,
				value: value
			};
		}

		throw new $SyntaxError('intrinsic ' + name + ' does not exist!');
	};

	module.exports = function GetIntrinsic(name, allowMissing) {
		if (typeof name !== 'string' || name.length === 0) {
			throw new $TypeError('intrinsic name must be a non-empty string');
		}
		if (arguments.length > 1 && typeof allowMissing !== 'boolean') {
			throw new $TypeError('"allowMissing" argument must be a boolean');
		}

		if ($exec(/^%?[^%]*%?$/, name) === null) {
			throw new $SyntaxError('`%` may not be present anywhere but at the beginning and end of the intrinsic name');
		}
		var parts = stringToPath(name);
		var intrinsicBaseName = parts.length > 0 ? parts[0] : '';

		var intrinsic = getBaseIntrinsic('%' + intrinsicBaseName + '%', allowMissing);
		var intrinsicRealName = intrinsic.name;
		var value = intrinsic.value;
		var skipFurtherCaching = false;

		var alias = intrinsic.alias;
		if (alias) {
			intrinsicBaseName = alias[0];
			$spliceApply(parts, $concat([0, 1], alias));
		}

		for (var i = 1, isOwn = true; i < parts.length; i += 1) {
			var part = parts[i];
			var first = $strSlice(part, 0, 1);
			var last = $strSlice(part, -1);
			if (
				(
					(first === '"' || first === "'" || first === '`')
					|| (last === '"' || last === "'" || last === '`')
				)
				&& first !== last
			) {
				throw new $SyntaxError('property names with quotes must have matching quotes');
			}
			if (part === 'constructor' || !isOwn) {
				skipFurtherCaching = true;
			}

			intrinsicBaseName += '.' + part;
			intrinsicRealName = '%' + intrinsicBaseName + '%';

			if (hasOwn(INTRINSICS, intrinsicRealName)) {
				value = INTRINSICS[intrinsicRealName];
			} else if (value != null) {
				if (!(part in value)) {
					if (!allowMissing) {
						throw new $TypeError('base intrinsic for ' + name + ' exists, but the property is not available.');
					}
					return void undefined$1;
				}
				if ($gOPD && (i + 1) >= parts.length) {
					var desc = $gOPD(value, part);
					isOwn = !!desc;

					// By convention, when a data property is converted to an accessor
					// property to emulate a data property that does not suffer from
					// the override mistake, that accessor's getter is marked with
					// an `originalValue` property. Here, when we detect this, we
					// uphold the illusion by pretending to see that original data
					// property, i.e., returning the value rather than the getter
					// itself.
					if (isOwn && 'get' in desc && !('originalValue' in desc.get)) {
						value = desc.get;
					} else {
						value = value[part];
					}
				} else {
					isOwn = hasOwn(value, part);
					value = value[part];
				}

				if (isOwn && !skipFurtherCaching) {
					INTRINSICS[intrinsicRealName] = value;
				}
			}
		}
		return value;
	};

	},{"function-bind":38,"has":44,"has-symbols":41}],40:[function(require,module,exports){

	var GetIntrinsic = require('get-intrinsic');

	var $gOPD = GetIntrinsic('%Object.getOwnPropertyDescriptor%', true);

	if ($gOPD) {
		try {
			$gOPD([], 'length');
		} catch (e) {
			// IE 8 has a broken gOPD
			$gOPD = null;
		}
	}

	module.exports = $gOPD;

	},{"get-intrinsic":39}],41:[function(require,module,exports){

	var origSymbol = typeof Symbol !== 'undefined' && Symbol;
	var hasSymbolSham = require('./shams');

	module.exports = function hasNativeSymbols() {
		if (typeof origSymbol !== 'function') { return false; }
		if (typeof Symbol !== 'function') { return false; }
		if (typeof origSymbol('foo') !== 'symbol') { return false; }
		if (typeof Symbol('bar') !== 'symbol') { return false; }

		return hasSymbolSham();
	};

	},{"./shams":42}],42:[function(require,module,exports){

	/* eslint complexity: [2, 18], max-statements: [2, 33] */
	module.exports = function hasSymbols() {
		if (typeof Symbol !== 'function' || typeof Object.getOwnPropertySymbols !== 'function') { return false; }
		if (typeof Symbol.iterator === 'symbol') { return true; }

		var obj = {};
		var sym = Symbol('test');
		var symObj = Object(sym);
		if (typeof sym === 'string') { return false; }

		if (Object.prototype.toString.call(sym) !== '[object Symbol]') { return false; }
		if (Object.prototype.toString.call(symObj) !== '[object Symbol]') { return false; }

		// temp disabled per https://github.com/ljharb/object.assign/issues/17
		// if (sym instanceof Symbol) { return false; }
		// temp disabled per https://github.com/WebReflection/get-own-property-symbols/issues/4
		// if (!(symObj instanceof Symbol)) { return false; }

		// if (typeof Symbol.prototype.toString !== 'function') { return false; }
		// if (String(sym) !== Symbol.prototype.toString.call(sym)) { return false; }

		var symVal = 42;
		obj[sym] = symVal;
		for (sym in obj) { return false; } // eslint-disable-line no-restricted-syntax, no-unreachable-loop
		if (typeof Object.keys === 'function' && Object.keys(obj).length !== 0) { return false; }

		if (typeof Object.getOwnPropertyNames === 'function' && Object.getOwnPropertyNames(obj).length !== 0) { return false; }

		var syms = Object.getOwnPropertySymbols(obj);
		if (syms.length !== 1 || syms[0] !== sym) { return false; }

		if (!Object.prototype.propertyIsEnumerable.call(obj, sym)) { return false; }

		if (typeof Object.getOwnPropertyDescriptor === 'function') {
			var descriptor = Object.getOwnPropertyDescriptor(obj, sym);
			if (descriptor.value !== symVal || descriptor.enumerable !== true) { return false; }
		}

		return true;
	};

	},{}],43:[function(require,module,exports){

	var hasSymbols = require('has-symbols/shams');

	module.exports = function hasToStringTagShams() {
		return hasSymbols() && !!Symbol.toStringTag;
	};

	},{"has-symbols/shams":42}],44:[function(require,module,exports){

	var bind = require('function-bind');

	module.exports = bind.call(Function.call, Object.prototype.hasOwnProperty);

	},{"function-bind":38}],45:[function(require,module,exports){
	/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
	exports.read = function (buffer, offset, isLE, mLen, nBytes) {
	  var e, m;
	  var eLen = (nBytes * 8) - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var nBits = -7;
	  var i = isLE ? (nBytes - 1) : 0;
	  var d = isLE ? -1 : 1;
	  var s = buffer[offset + i];

	  i += d;

	  e = s & ((1 << (-nBits)) - 1);
	  s >>= (-nBits);
	  nBits += eLen;
	  for (; nBits > 0; e = (e * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  m = e & ((1 << (-nBits)) - 1);
	  e >>= (-nBits);
	  nBits += mLen;
	  for (; nBits > 0; m = (m * 256) + buffer[offset + i], i += d, nBits -= 8) {}

	  if (e === 0) {
	    e = 1 - eBias;
	  } else if (e === eMax) {
	    return m ? NaN : ((s ? -1 : 1) * Infinity)
	  } else {
	    m = m + Math.pow(2, mLen);
	    e = e - eBias;
	  }
	  return (s ? -1 : 1) * m * Math.pow(2, e - mLen)
	};

	exports.write = function (buffer, value, offset, isLE, mLen, nBytes) {
	  var e, m, c;
	  var eLen = (nBytes * 8) - mLen - 1;
	  var eMax = (1 << eLen) - 1;
	  var eBias = eMax >> 1;
	  var rt = (mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0);
	  var i = isLE ? 0 : (nBytes - 1);
	  var d = isLE ? 1 : -1;
	  var s = value < 0 || (value === 0 && 1 / value < 0) ? 1 : 0;

	  value = Math.abs(value);

	  if (isNaN(value) || value === Infinity) {
	    m = isNaN(value) ? 1 : 0;
	    e = eMax;
	  } else {
	    e = Math.floor(Math.log(value) / Math.LN2);
	    if (value * (c = Math.pow(2, -e)) < 1) {
	      e--;
	      c *= 2;
	    }
	    if (e + eBias >= 1) {
	      value += rt / c;
	    } else {
	      value += rt * Math.pow(2, 1 - eBias);
	    }
	    if (value * c >= 2) {
	      e++;
	      c /= 2;
	    }

	    if (e + eBias >= eMax) {
	      m = 0;
	      e = eMax;
	    } else if (e + eBias >= 1) {
	      m = ((value * c) - 1) * Math.pow(2, mLen);
	      e = e + eBias;
	    } else {
	      m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
	      e = 0;
	    }
	  }

	  for (; mLen >= 8; buffer[offset + i] = m & 0xff, i += d, m /= 256, mLen -= 8) {}

	  e = (e << mLen) | m;
	  eLen += mLen;
	  for (; eLen > 0; buffer[offset + i] = e & 0xff, i += d, e /= 256, eLen -= 8) {}

	  buffer[offset + i - d] |= s * 128;
	};

	},{}],46:[function(require,module,exports){
	if (typeof Object.create === 'function') {
	  // implementation from standard node.js 'util' module
	  module.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      ctor.prototype = Object.create(superCtor.prototype, {
	        constructor: {
	          value: ctor,
	          enumerable: false,
	          writable: true,
	          configurable: true
	        }
	      });
	    }
	  };
	} else {
	  // old school shim for old browsers
	  module.exports = function inherits(ctor, superCtor) {
	    if (superCtor) {
	      ctor.super_ = superCtor;
	      var TempCtor = function () {};
	      TempCtor.prototype = superCtor.prototype;
	      ctor.prototype = new TempCtor();
	      ctor.prototype.constructor = ctor;
	    }
	  };
	}

	},{}],47:[function(require,module,exports){

	var hasToStringTag = require('has-tostringtag/shams')();
	var callBound = require('call-bind/callBound');

	var $toString = callBound('Object.prototype.toString');

	var isStandardArguments = function isArguments(value) {
		if (hasToStringTag && value && typeof value === 'object' && Symbol.toStringTag in value) {
			return false;
		}
		return $toString(value) === '[object Arguments]';
	};

	var isLegacyArguments = function isArguments(value) {
		if (isStandardArguments(value)) {
			return true;
		}
		return value !== null &&
			typeof value === 'object' &&
			typeof value.length === 'number' &&
			value.length >= 0 &&
			$toString(value) !== '[object Array]' &&
			$toString(value.callee) === '[object Function]';
	};

	var supportsStandardArguments = (function () {
		return isStandardArguments(arguments);
	}());

	isStandardArguments.isLegacyArguments = isLegacyArguments; // for tests

	module.exports = supportsStandardArguments ? isStandardArguments : isLegacyArguments;

	},{"call-bind/callBound":33,"has-tostringtag/shams":43}],48:[function(require,module,exports){

	var fnToStr = Function.prototype.toString;
	var reflectApply = typeof Reflect === 'object' && Reflect !== null && Reflect.apply;
	var badArrayLike;
	var isCallableMarker;
	if (typeof reflectApply === 'function' && typeof Object.defineProperty === 'function') {
		try {
			badArrayLike = Object.defineProperty({}, 'length', {
				get: function () {
					throw isCallableMarker;
				}
			});
			isCallableMarker = {};
			// eslint-disable-next-line no-throw-literal
			reflectApply(function () { throw 42; }, null, badArrayLike);
		} catch (_) {
			if (_ !== isCallableMarker) {
				reflectApply = null;
			}
		}
	} else {
		reflectApply = null;
	}

	var constructorRegex = /^\s*class\b/;
	var isES6ClassFn = function isES6ClassFunction(value) {
		try {
			var fnStr = fnToStr.call(value);
			return constructorRegex.test(fnStr);
		} catch (e) {
			return false; // not a function
		}
	};

	var tryFunctionObject = function tryFunctionToStr(value) {
		try {
			if (isES6ClassFn(value)) { return false; }
			fnToStr.call(value);
			return true;
		} catch (e) {
			return false;
		}
	};
	var toStr = Object.prototype.toString;
	var objectClass = '[object Object]';
	var fnClass = '[object Function]';
	var genClass = '[object GeneratorFunction]';
	var ddaClass = '[object HTMLAllCollection]'; // IE 11
	var ddaClass2 = '[object HTML document.all class]';
	var ddaClass3 = '[object HTMLCollection]'; // IE 9-10
	var hasToStringTag = typeof Symbol === 'function' && !!Symbol.toStringTag; // better: use `has-tostringtag`

	var isIE68 = !(0 in [,]); // eslint-disable-line no-sparse-arrays, comma-spacing

	var isDDA = function isDocumentDotAll() { return false; };
	if (typeof document === 'object') {
		// Firefox 3 canonicalizes DDA to undefined when it's not accessed directly
		var all = document.all;
		if (toStr.call(all) === toStr.call(document.all)) {
			isDDA = function isDocumentDotAll(value) {
				/* globals document: false */
				// in IE 6-8, typeof document.all is "object" and it's truthy
				if ((isIE68 || !value) && (typeof value === 'undefined' || typeof value === 'object')) {
					try {
						var str = toStr.call(value);
						return (
							str === ddaClass
							|| str === ddaClass2
							|| str === ddaClass3 // opera 12.16
							|| str === objectClass // IE 6-8
						) && value('') == null; // eslint-disable-line eqeqeq
					} catch (e) { /**/ }
				}
				return false;
			};
		}
	}

	module.exports = reflectApply
		? function isCallable(value) {
			if (isDDA(value)) { return true; }
			if (!value) { return false; }
			if (typeof value !== 'function' && typeof value !== 'object') { return false; }
			try {
				reflectApply(value, null, badArrayLike);
			} catch (e) {
				if (e !== isCallableMarker) { return false; }
			}
			return !isES6ClassFn(value) && tryFunctionObject(value);
		}
		: function isCallable(value) {
			if (isDDA(value)) { return true; }
			if (!value) { return false; }
			if (typeof value !== 'function' && typeof value !== 'object') { return false; }
			if (hasToStringTag) { return tryFunctionObject(value); }
			if (isES6ClassFn(value)) { return false; }
			var strClass = toStr.call(value);
			if (strClass !== fnClass && strClass !== genClass && !(/^\[object HTML/).test(strClass)) { return false; }
			return tryFunctionObject(value);
		};

	},{}],49:[function(require,module,exports){

	var toStr = Object.prototype.toString;
	var fnToStr = Function.prototype.toString;
	var isFnRegex = /^\s*(?:function)?\*/;
	var hasToStringTag = require('has-tostringtag/shams')();
	var getProto = Object.getPrototypeOf;
	var getGeneratorFunc = function () { // eslint-disable-line consistent-return
		if (!hasToStringTag) {
			return false;
		}
		try {
			return Function('return function*() {}')();
		} catch (e) {
		}
	};
	var GeneratorFunction;

	module.exports = function isGeneratorFunction(fn) {
		if (typeof fn !== 'function') {
			return false;
		}
		if (isFnRegex.test(fnToStr.call(fn))) {
			return true;
		}
		if (!hasToStringTag) {
			var str = toStr.call(fn);
			return str === '[object GeneratorFunction]';
		}
		if (!getProto) {
			return false;
		}
		if (typeof GeneratorFunction === 'undefined') {
			var generatorFunc = getGeneratorFunc();
			GeneratorFunction = generatorFunc ? getProto(generatorFunc) : false;
		}
		return getProto(fn) === GeneratorFunction;
	};

	},{"has-tostringtag/shams":43}],50:[function(require,module,exports){
	(function (global){(function (){

	var forEach = require('for-each');
	var availableTypedArrays = require('available-typed-arrays');
	var callBound = require('call-bind/callBound');

	var $toString = callBound('Object.prototype.toString');
	var hasToStringTag = require('has-tostringtag/shams')();
	var gOPD = require('gopd');

	var g = typeof globalThis === 'undefined' ? global : globalThis;
	var typedArrays = availableTypedArrays();

	var $indexOf = callBound('Array.prototype.indexOf', true) || function indexOf(array, value) {
		for (var i = 0; i < array.length; i += 1) {
			if (array[i] === value) {
				return i;
			}
		}
		return -1;
	};
	var $slice = callBound('String.prototype.slice');
	var toStrTags = {};
	var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
	if (hasToStringTag && gOPD && getPrototypeOf) {
		forEach(typedArrays, function (typedArray) {
			var arr = new g[typedArray]();
			if (Symbol.toStringTag in arr) {
				var proto = getPrototypeOf(arr);
				var descriptor = gOPD(proto, Symbol.toStringTag);
				if (!descriptor) {
					var superProto = getPrototypeOf(proto);
					descriptor = gOPD(superProto, Symbol.toStringTag);
				}
				toStrTags[typedArray] = descriptor.get;
			}
		});
	}

	var tryTypedArrays = function tryAllTypedArrays(value) {
		var anyTrue = false;
		forEach(toStrTags, function (getter, typedArray) {
			if (!anyTrue) {
				try {
					anyTrue = getter.call(value) === typedArray;
				} catch (e) { /**/ }
			}
		});
		return anyTrue;
	};

	module.exports = function isTypedArray(value) {
		if (!value || typeof value !== 'object') { return false; }
		if (!hasToStringTag || !(Symbol.toStringTag in value)) {
			var tag = $slice($toString(value), 8, -1);
			return $indexOf(typedArrays, tag) > -1;
		}
		if (!gOPD) { return false; }
		return tryTypedArrays(value);
	};

	}).call(this);}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	},{"available-typed-arrays":27,"call-bind/callBound":33,"for-each":36,"gopd":40,"has-tostringtag/shams":43}],51:[function(require,module,exports){
	/* eslint-disable no-unused-vars */
	var getOwnPropertySymbols = Object.getOwnPropertySymbols;
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;

	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}

		return Object(val);
	}

	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}

			// Detect buggy property enumeration order in older V8 versions.

			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}

			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !==
					'abcdefghijklmnopqrst') {
				return false;
			}

			return true;
		} catch (err) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}

	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;

		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);

			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}

			if (getOwnPropertySymbols) {
				symbols = getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}

		return to;
	};

	},{}],52:[function(require,module,exports){


	var TYPED_OK =  (typeof Uint8Array !== 'undefined') &&
	                (typeof Uint16Array !== 'undefined') &&
	                (typeof Int32Array !== 'undefined');

	function _has(obj, key) {
	  return Object.prototype.hasOwnProperty.call(obj, key);
	}

	exports.assign = function (obj /*from1, from2, from3, ...*/) {
	  var sources = Array.prototype.slice.call(arguments, 1);
	  while (sources.length) {
	    var source = sources.shift();
	    if (!source) { continue; }

	    if (typeof source !== 'object') {
	      throw new TypeError(source + 'must be non-object');
	    }

	    for (var p in source) {
	      if (_has(source, p)) {
	        obj[p] = source[p];
	      }
	    }
	  }

	  return obj;
	};


	// reduce buffer size, avoiding mem copy
	exports.shrinkBuf = function (buf, size) {
	  if (buf.length === size) { return buf; }
	  if (buf.subarray) { return buf.subarray(0, size); }
	  buf.length = size;
	  return buf;
	};


	var fnTyped = {
	  arraySet: function (dest, src, src_offs, len, dest_offs) {
	    if (src.subarray && dest.subarray) {
	      dest.set(src.subarray(src_offs, src_offs + len), dest_offs);
	      return;
	    }
	    // Fallback to ordinary array
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function (chunks) {
	    var i, l, len, pos, chunk, result;

	    // calculate data length
	    len = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      len += chunks[i].length;
	    }

	    // join chunks
	    result = new Uint8Array(len);
	    pos = 0;
	    for (i = 0, l = chunks.length; i < l; i++) {
	      chunk = chunks[i];
	      result.set(chunk, pos);
	      pos += chunk.length;
	    }

	    return result;
	  }
	};

	var fnUntyped = {
	  arraySet: function (dest, src, src_offs, len, dest_offs) {
	    for (var i = 0; i < len; i++) {
	      dest[dest_offs + i] = src[src_offs + i];
	    }
	  },
	  // Join array of chunks to single array.
	  flattenChunks: function (chunks) {
	    return [].concat.apply([], chunks);
	  }
	};


	// Enable/Disable typed arrays use, for testing
	//
	exports.setTyped = function (on) {
	  if (on) {
	    exports.Buf8  = Uint8Array;
	    exports.Buf16 = Uint16Array;
	    exports.Buf32 = Int32Array;
	    exports.assign(exports, fnTyped);
	  } else {
	    exports.Buf8  = Array;
	    exports.Buf16 = Array;
	    exports.Buf32 = Array;
	    exports.assign(exports, fnUntyped);
	  }
	};

	exports.setTyped(TYPED_OK);

	},{}],53:[function(require,module,exports){

	// Note: adler32 takes 12% for level 0 and 2% for level 6.
	// It isn't worth it to make additional optimizations as in original.
	// Small size is preferable.

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	function adler32(adler, buf, len, pos) {
	  var s1 = (adler & 0xffff) |0,
	      s2 = ((adler >>> 16) & 0xffff) |0,
	      n = 0;

	  while (len !== 0) {
	    // Set limit ~ twice less than 5552, to keep
	    // s2 in 31-bits, because we force signed ints.
	    // in other case %= will fail.
	    n = len > 2000 ? 2000 : len;
	    len -= n;

	    do {
	      s1 = (s1 + buf[pos++]) |0;
	      s2 = (s2 + s1) |0;
	    } while (--n);

	    s1 %= 65521;
	    s2 %= 65521;
	  }

	  return (s1 | (s2 << 16)) |0;
	}


	module.exports = adler32;

	},{}],54:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	module.exports = {

	  /* Allowed flush values; see deflate() and inflate() below for details */
	  Z_NO_FLUSH:         0,
	  Z_PARTIAL_FLUSH:    1,
	  Z_SYNC_FLUSH:       2,
	  Z_FULL_FLUSH:       3,
	  Z_FINISH:           4,
	  Z_BLOCK:            5,
	  Z_TREES:            6,

	  /* Return codes for the compression/decompression functions. Negative values
	  * are errors, positive values are used for special but normal events.
	  */
	  Z_OK:               0,
	  Z_STREAM_END:       1,
	  Z_NEED_DICT:        2,
	  Z_ERRNO:           -1,
	  Z_STREAM_ERROR:    -2,
	  Z_DATA_ERROR:      -3,
	  //Z_MEM_ERROR:     -4,
	  Z_BUF_ERROR:       -5,
	  //Z_VERSION_ERROR: -6,

	  /* compression levels */
	  Z_NO_COMPRESSION:         0,
	  Z_BEST_SPEED:             1,
	  Z_BEST_COMPRESSION:       9,
	  Z_DEFAULT_COMPRESSION:   -1,


	  Z_FILTERED:               1,
	  Z_HUFFMAN_ONLY:           2,
	  Z_RLE:                    3,
	  Z_FIXED:                  4,
	  Z_DEFAULT_STRATEGY:       0,

	  /* Possible values of the data_type field (though see inflate()) */
	  Z_BINARY:                 0,
	  Z_TEXT:                   1,
	  //Z_ASCII:                1, // = Z_TEXT (deprecated)
	  Z_UNKNOWN:                2,

	  /* The deflate compression method */
	  Z_DEFLATED:               8
	  //Z_NULL:                 null // Use -1 or null inline, depending on var type
	};

	},{}],55:[function(require,module,exports){

	// Note: we can't get significant speed boost here.
	// So write code to minimize size - no pregenerated tables
	// and array tools dependencies.

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	// Use ordinary array, since untyped makes no boost here
	function makeTable() {
	  var c, table = [];

	  for (var n = 0; n < 256; n++) {
	    c = n;
	    for (var k = 0; k < 8; k++) {
	      c = ((c & 1) ? (0xEDB88320 ^ (c >>> 1)) : (c >>> 1));
	    }
	    table[n] = c;
	  }

	  return table;
	}

	// Create table on load. Just 255 signed longs. Not a problem.
	var crcTable = makeTable();


	function crc32(crc, buf, len, pos) {
	  var t = crcTable,
	      end = pos + len;

	  crc ^= -1;

	  for (var i = pos; i < end; i++) {
	    crc = (crc >>> 8) ^ t[(crc ^ buf[i]) & 0xFF];
	  }

	  return (crc ^ (-1)); // >>> 0;
	}


	module.exports = crc32;

	},{}],56:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	var utils   = require('../utils/common');
	var trees   = require('./trees');
	var adler32 = require('./adler32');
	var crc32   = require('./crc32');
	var msg     = require('./messages');

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	/* Allowed flush values; see deflate() and inflate() below for details */
	var Z_NO_FLUSH      = 0;
	var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	var Z_FULL_FLUSH    = 3;
	var Z_FINISH        = 4;
	var Z_BLOCK         = 5;
	//var Z_TREES         = 6;


	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	//var Z_NEED_DICT     = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR  = -2;
	var Z_DATA_ERROR    = -3;
	//var Z_MEM_ERROR     = -4;
	var Z_BUF_ERROR     = -5;
	//var Z_VERSION_ERROR = -6;


	/* compression levels */
	//var Z_NO_COMPRESSION      = 0;
	//var Z_BEST_SPEED          = 1;
	//var Z_BEST_COMPRESSION    = 9;
	var Z_DEFAULT_COMPRESSION = -1;


	var Z_FILTERED            = 1;
	var Z_HUFFMAN_ONLY        = 2;
	var Z_RLE                 = 3;
	var Z_FIXED               = 4;
	var Z_DEFAULT_STRATEGY    = 0;

	/* Possible values of the data_type field (though see inflate()) */
	//var Z_BINARY              = 0;
	//var Z_TEXT                = 1;
	//var Z_ASCII               = 1; // = Z_TEXT
	var Z_UNKNOWN             = 2;


	/* The deflate compression method */
	var Z_DEFLATED  = 8;

	/*============================================================================*/


	var MAX_MEM_LEVEL = 9;
	/* Maximum value for memLevel in deflateInit2 */
	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_MEM_LEVEL = 8;


	var LENGTH_CODES  = 29;
	/* number of length codes, not counting the special END_BLOCK code */
	var LITERALS      = 256;
	/* number of literal bytes 0..255 */
	var L_CODES       = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */
	var D_CODES       = 30;
	/* number of distance codes */
	var BL_CODES      = 19;
	/* number of codes used to transfer the bit lengths */
	var HEAP_SIZE     = 2 * L_CODES + 1;
	/* maximum heap size */
	var MAX_BITS  = 15;
	/* All codes must not exceed MAX_BITS bits */

	var MIN_MATCH = 3;
	var MAX_MATCH = 258;
	var MIN_LOOKAHEAD = (MAX_MATCH + MIN_MATCH + 1);

	var PRESET_DICT = 0x20;

	var INIT_STATE = 42;
	var EXTRA_STATE = 69;
	var NAME_STATE = 73;
	var COMMENT_STATE = 91;
	var HCRC_STATE = 103;
	var BUSY_STATE = 113;
	var FINISH_STATE = 666;

	var BS_NEED_MORE      = 1; /* block not completed, need more input or more output */
	var BS_BLOCK_DONE     = 2; /* block flush performed */
	var BS_FINISH_STARTED = 3; /* finish started, need only more output at next deflate */
	var BS_FINISH_DONE    = 4; /* finish done, accept no more input or output */

	var OS_CODE = 0x03; // Unix :) . Don't detect, use this default.

	function err(strm, errorCode) {
	  strm.msg = msg[errorCode];
	  return errorCode;
	}

	function rank(f) {
	  return ((f) << 1) - ((f) > 4 ? 9 : 0);
	}

	function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }


	/* =========================================================================
	 * Flush as much pending output as possible. All deflate() output goes
	 * through this function so some applications may wish to modify it
	 * to avoid allocating a large strm->output buffer and copying into it.
	 * (See also read_buf()).
	 */
	function flush_pending(strm) {
	  var s = strm.state;

	  //_tr_flush_bits(s);
	  var len = s.pending;
	  if (len > strm.avail_out) {
	    len = strm.avail_out;
	  }
	  if (len === 0) { return; }

	  utils.arraySet(strm.output, s.pending_buf, s.pending_out, len, strm.next_out);
	  strm.next_out += len;
	  s.pending_out += len;
	  strm.total_out += len;
	  strm.avail_out -= len;
	  s.pending -= len;
	  if (s.pending === 0) {
	    s.pending_out = 0;
	  }
	}


	function flush_block_only(s, last) {
	  trees._tr_flush_block(s, (s.block_start >= 0 ? s.block_start : -1), s.strstart - s.block_start, last);
	  s.block_start = s.strstart;
	  flush_pending(s.strm);
	}


	function put_byte(s, b) {
	  s.pending_buf[s.pending++] = b;
	}


	/* =========================================================================
	 * Put a short in the pending buffer. The 16-bit value is put in MSB order.
	 * IN assertion: the stream state is correct and there is enough room in
	 * pending_buf.
	 */
	function putShortMSB(s, b) {
	//  put_byte(s, (Byte)(b >> 8));
	//  put_byte(s, (Byte)(b & 0xff));
	  s.pending_buf[s.pending++] = (b >>> 8) & 0xff;
	  s.pending_buf[s.pending++] = b & 0xff;
	}


	/* ===========================================================================
	 * Read a new buffer from the current input stream, update the adler32
	 * and total number of bytes read.  All deflate() input goes through
	 * this function so some applications may wish to modify it to avoid
	 * allocating a large strm->input buffer and copying from it.
	 * (See also flush_pending()).
	 */
	function read_buf(strm, buf, start, size) {
	  var len = strm.avail_in;

	  if (len > size) { len = size; }
	  if (len === 0) { return 0; }

	  strm.avail_in -= len;

	  // zmemcpy(buf, strm->next_in, len);
	  utils.arraySet(buf, strm.input, strm.next_in, len, start);
	  if (strm.state.wrap === 1) {
	    strm.adler = adler32(strm.adler, buf, len, start);
	  }

	  else if (strm.state.wrap === 2) {
	    strm.adler = crc32(strm.adler, buf, len, start);
	  }

	  strm.next_in += len;
	  strm.total_in += len;

	  return len;
	}


	/* ===========================================================================
	 * Set match_start to the longest match starting at the given string and
	 * return its length. Matches shorter or equal to prev_length are discarded,
	 * in which case the result is equal to prev_length and match_start is
	 * garbage.
	 * IN assertions: cur_match is the head of the hash chain for the current
	 *   string (strstart) and its distance is <= MAX_DIST, and prev_length >= 1
	 * OUT assertion: the match length is not greater than s->lookahead.
	 */
	function longest_match(s, cur_match) {
	  var chain_length = s.max_chain_length;      /* max hash chain length */
	  var scan = s.strstart; /* current string */
	  var match;                       /* matched string */
	  var len;                           /* length of current match */
	  var best_len = s.prev_length;              /* best match length so far */
	  var nice_match = s.nice_match;             /* stop if match long enough */
	  var limit = (s.strstart > (s.w_size - MIN_LOOKAHEAD)) ?
	      s.strstart - (s.w_size - MIN_LOOKAHEAD) : 0/*NIL*/;

	  var _win = s.window; // shortcut

	  var wmask = s.w_mask;
	  var prev  = s.prev;

	  /* Stop when cur_match becomes <= limit. To simplify the code,
	   * we prevent matches with the string of window index 0.
	   */

	  var strend = s.strstart + MAX_MATCH;
	  var scan_end1  = _win[scan + best_len - 1];
	  var scan_end   = _win[scan + best_len];

	  /* The code is optimized for HASH_BITS >= 8 and MAX_MATCH-2 multiple of 16.
	   * It is easy to get rid of this optimization if necessary.
	   */
	  // Assert(s->hash_bits >= 8 && MAX_MATCH == 258, "Code too clever");

	  /* Do not waste too much time if we already have a good match: */
	  if (s.prev_length >= s.good_match) {
	    chain_length >>= 2;
	  }
	  /* Do not look for matches beyond the end of the input. This is necessary
	   * to make deflate deterministic.
	   */
	  if (nice_match > s.lookahead) { nice_match = s.lookahead; }

	  // Assert((ulg)s->strstart <= s->window_size-MIN_LOOKAHEAD, "need lookahead");

	  do {
	    // Assert(cur_match < s->strstart, "no future");
	    match = cur_match;

	    /* Skip to next match if the match length cannot increase
	     * or if the match length is less than 2.  Note that the checks below
	     * for insufficient lookahead only occur occasionally for performance
	     * reasons.  Therefore uninitialized memory will be accessed, and
	     * conditional jumps will be made that depend on those values.
	     * However the length of the match is limited to the lookahead, so
	     * the output of deflate is not affected by the uninitialized values.
	     */

	    if (_win[match + best_len]     !== scan_end  ||
	        _win[match + best_len - 1] !== scan_end1 ||
	        _win[match]                !== _win[scan] ||
	        _win[++match]              !== _win[scan + 1]) {
	      continue;
	    }

	    /* The check at best_len-1 can be removed because it will be made
	     * again later. (This heuristic is not always a win.)
	     * It is not necessary to compare scan[2] and match[2] since they
	     * are always equal when the other bytes match, given that
	     * the hash keys are equal and that HASH_BITS >= 8.
	     */
	    scan += 2;
	    match++;
	    // Assert(*scan == *match, "match[2]?");

	    /* We check for insufficient lookahead only every 8th comparison;
	     * the 256th check will be made at strstart+258.
	     */
	    do {
	      /*jshint noempty:false*/
	    } while (_win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             _win[++scan] === _win[++match] && _win[++scan] === _win[++match] &&
	             scan < strend);

	    // Assert(scan <= s->window+(unsigned)(s->window_size-1), "wild scan");

	    len = MAX_MATCH - (strend - scan);
	    scan = strend - MAX_MATCH;

	    if (len > best_len) {
	      s.match_start = cur_match;
	      best_len = len;
	      if (len >= nice_match) {
	        break;
	      }
	      scan_end1  = _win[scan + best_len - 1];
	      scan_end   = _win[scan + best_len];
	    }
	  } while ((cur_match = prev[cur_match & wmask]) > limit && --chain_length !== 0);

	  if (best_len <= s.lookahead) {
	    return best_len;
	  }
	  return s.lookahead;
	}


	/* ===========================================================================
	 * Fill the window when the lookahead becomes insufficient.
	 * Updates strstart and lookahead.
	 *
	 * IN assertion: lookahead < MIN_LOOKAHEAD
	 * OUT assertions: strstart <= window_size-MIN_LOOKAHEAD
	 *    At least one byte has been read, or avail_in == 0; reads are
	 *    performed for at least two bytes (required for the zip translate_eol
	 *    option -- not supported here).
	 */
	function fill_window(s) {
	  var _w_size = s.w_size;
	  var p, n, m, more, str;

	  //Assert(s->lookahead < MIN_LOOKAHEAD, "already enough lookahead");

	  do {
	    more = s.window_size - s.lookahead - s.strstart;

	    // JS ints have 32 bit, block below not needed
	    /* Deal with !@#$% 64K limit: */
	    //if (sizeof(int) <= 2) {
	    //    if (more == 0 && s->strstart == 0 && s->lookahead == 0) {
	    //        more = wsize;
	    //
	    //  } else if (more == (unsigned)(-1)) {
	    //        /* Very unlikely, but possible on 16 bit machine if
	    //         * strstart == 0 && lookahead == 1 (input done a byte at time)
	    //         */
	    //        more--;
	    //    }
	    //}


	    /* If the window is almost full and there is insufficient lookahead,
	     * move the upper half to the lower one to make room in the upper half.
	     */
	    if (s.strstart >= _w_size + (_w_size - MIN_LOOKAHEAD)) {

	      utils.arraySet(s.window, s.window, _w_size, _w_size, 0);
	      s.match_start -= _w_size;
	      s.strstart -= _w_size;
	      /* we now have strstart >= MAX_DIST */
	      s.block_start -= _w_size;

	      /* Slide the hash table (could be avoided with 32 bit values
	       at the expense of memory usage). We slide even when level == 0
	       to keep the hash table consistent if we switch back to level > 0
	       later. (Using level 0 permanently is not an optimal usage of
	       zlib, so we don't care about this pathological case.)
	       */

	      n = s.hash_size;
	      p = n;
	      do {
	        m = s.head[--p];
	        s.head[p] = (m >= _w_size ? m - _w_size : 0);
	      } while (--n);

	      n = _w_size;
	      p = n;
	      do {
	        m = s.prev[--p];
	        s.prev[p] = (m >= _w_size ? m - _w_size : 0);
	        /* If n is not on any hash chain, prev[n] is garbage but
	         * its value will never be used.
	         */
	      } while (--n);

	      more += _w_size;
	    }
	    if (s.strm.avail_in === 0) {
	      break;
	    }

	    /* If there was no sliding:
	     *    strstart <= WSIZE+MAX_DIST-1 && lookahead <= MIN_LOOKAHEAD - 1 &&
	     *    more == window_size - lookahead - strstart
	     * => more >= window_size - (MIN_LOOKAHEAD-1 + WSIZE + MAX_DIST-1)
	     * => more >= window_size - 2*WSIZE + 2
	     * In the BIG_MEM or MMAP case (not yet supported),
	     *   window_size == input_size + MIN_LOOKAHEAD  &&
	     *   strstart + s->lookahead <= input_size => more >= MIN_LOOKAHEAD.
	     * Otherwise, window_size == 2*WSIZE so more >= 2.
	     * If there was sliding, more >= WSIZE. So in all cases, more >= 2.
	     */
	    //Assert(more >= 2, "more < 2");
	    n = read_buf(s.strm, s.window, s.strstart + s.lookahead, more);
	    s.lookahead += n;

	    /* Initialize the hash value now that we have some input: */
	    if (s.lookahead + s.insert >= MIN_MATCH) {
	      str = s.strstart - s.insert;
	      s.ins_h = s.window[str];

	      /* UPDATE_HASH(s, s->ins_h, s->window[str + 1]); */
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + 1]) & s.hash_mask;
	//#if MIN_MATCH != 3
	//        Call update_hash() MIN_MATCH-3 more times
	//#endif
	      while (s.insert) {
	        /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
	        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

	        s.prev[str & s.w_mask] = s.head[s.ins_h];
	        s.head[s.ins_h] = str;
	        str++;
	        s.insert--;
	        if (s.lookahead + s.insert < MIN_MATCH) {
	          break;
	        }
	      }
	    }
	    /* If the whole input has less than MIN_MATCH bytes, ins_h is garbage,
	     * but this is not important since only literal bytes will be emitted.
	     */

	  } while (s.lookahead < MIN_LOOKAHEAD && s.strm.avail_in !== 0);

	  /* If the WIN_INIT bytes after the end of the current data have never been
	   * written, then zero those bytes in order to avoid memory check reports of
	   * the use of uninitialized (or uninitialised as Julian writes) bytes by
	   * the longest match routines.  Update the high water mark for the next
	   * time through here.  WIN_INIT is set to MAX_MATCH since the longest match
	   * routines allow scanning to strstart + MAX_MATCH, ignoring lookahead.
	   */
	//  if (s.high_water < s.window_size) {
	//    var curr = s.strstart + s.lookahead;
	//    var init = 0;
	//
	//    if (s.high_water < curr) {
	//      /* Previous high water mark below current data -- zero WIN_INIT
	//       * bytes or up to end of window, whichever is less.
	//       */
	//      init = s.window_size - curr;
	//      if (init > WIN_INIT)
	//        init = WIN_INIT;
	//      zmemzero(s->window + curr, (unsigned)init);
	//      s->high_water = curr + init;
	//    }
	//    else if (s->high_water < (ulg)curr + WIN_INIT) {
	//      /* High water mark at or above current data, but below current data
	//       * plus WIN_INIT -- zero out to current data plus WIN_INIT, or up
	//       * to end of window, whichever is less.
	//       */
	//      init = (ulg)curr + WIN_INIT - s->high_water;
	//      if (init > s->window_size - s->high_water)
	//        init = s->window_size - s->high_water;
	//      zmemzero(s->window + s->high_water, (unsigned)init);
	//      s->high_water += init;
	//    }
	//  }
	//
	//  Assert((ulg)s->strstart <= s->window_size - MIN_LOOKAHEAD,
	//    "not enough room for search");
	}

	/* ===========================================================================
	 * Copy without compression as much as possible from the input stream, return
	 * the current block state.
	 * This function does not insert new strings in the dictionary since
	 * uncompressible data is probably not useful. This function is used
	 * only for the level=0 compression option.
	 * NOTE: this function should be optimized to avoid extra copying from
	 * window to pending_buf.
	 */
	function deflate_stored(s, flush) {
	  /* Stored blocks are limited to 0xffff bytes, pending_buf is limited
	   * to pending_buf_size, and each stored block has a 5 byte header:
	   */
	  var max_block_size = 0xffff;

	  if (max_block_size > s.pending_buf_size - 5) {
	    max_block_size = s.pending_buf_size - 5;
	  }

	  /* Copy as much as possible from input to output: */
	  for (;;) {
	    /* Fill the window as much as possible: */
	    if (s.lookahead <= 1) {

	      //Assert(s->strstart < s->w_size+MAX_DIST(s) ||
	      //  s->block_start >= (long)s->w_size, "slide too late");
	//      if (!(s.strstart < s.w_size + (s.w_size - MIN_LOOKAHEAD) ||
	//        s.block_start >= s.w_size)) {
	//        throw  new Error("slide too late");
	//      }

	      fill_window(s);
	      if (s.lookahead === 0 && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }

	      if (s.lookahead === 0) {
	        break;
	      }
	      /* flush the current block */
	    }
	    //Assert(s->block_start >= 0L, "block gone");
	//    if (s.block_start < 0) throw new Error("block gone");

	    s.strstart += s.lookahead;
	    s.lookahead = 0;

	    /* Emit a stored block if pending_buf will be full: */
	    var max_start = s.block_start + max_block_size;

	    if (s.strstart === 0 || s.strstart >= max_start) {
	      /* strstart == 0 is possible when wraparound on 16-bit machine */
	      s.lookahead = s.strstart - max_start;
	      s.strstart = max_start;
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/


	    }
	    /* Flush if we may have to slide, otherwise block_start may become
	     * negative and the data will be gone:
	     */
	    if (s.strstart - s.block_start >= (s.w_size - MIN_LOOKAHEAD)) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }

	  s.insert = 0;

	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }

	  if (s.strstart > s.block_start) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }

	  return BS_NEED_MORE;
	}

	/* ===========================================================================
	 * Compress as much as possible from the input stream, return the current
	 * block state.
	 * This function does not perform lazy evaluation of matches and inserts
	 * new strings in the dictionary only for unmatched strings or for short
	 * matches. It is used only for the fast compression options.
	 */
	function deflate_fast(s, flush) {
	  var hash_head;        /* head of the hash chain */
	  var bflush;           /* set if current block must be flushed */

	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) {
	        break; /* flush the current block */
	      }
	    }

	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0/*NIL*/;
	    if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }

	    /* Find the longest match, discarding those <= prev_length.
	     * At this point we have always match_length < MIN_MATCH
	     */
	    if (hash_head !== 0/*NIL*/ && ((s.strstart - hash_head) <= (s.w_size - MIN_LOOKAHEAD))) {
	      /* To simplify the code, we prevent matches with the string
	       * of window index 0 (in particular we have to avoid a match
	       * of the string with itself at the start of the input file).
	       */
	      s.match_length = longest_match(s, hash_head);
	      /* longest_match() sets match_start */
	    }
	    if (s.match_length >= MIN_MATCH) {
	      // check_match(s, s.strstart, s.match_start, s.match_length); // for debug only

	      /*** _tr_tally_dist(s, s.strstart - s.match_start,
	                     s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, s.strstart - s.match_start, s.match_length - MIN_MATCH);

	      s.lookahead -= s.match_length;

	      /* Insert new strings in the hash table only if the match length
	       * is not too large. This saves time but degrades compression.
	       */
	      if (s.match_length <= s.max_lazy_match/*max_insert_length*/ && s.lookahead >= MIN_MATCH) {
	        s.match_length--; /* string at strstart already in table */
	        do {
	          s.strstart++;
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	          /* strstart never exceeds WSIZE-MAX_MATCH, so there are
	           * always MIN_MATCH bytes ahead.
	           */
	        } while (--s.match_length !== 0);
	        s.strstart++;
	      } else
	      {
	        s.strstart += s.match_length;
	        s.match_length = 0;
	        s.ins_h = s.window[s.strstart];
	        /* UPDATE_HASH(s, s.ins_h, s.window[s.strstart+1]); */
	        s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + 1]) & s.hash_mask;

	//#if MIN_MATCH != 3
	//                Call UPDATE_HASH() MIN_MATCH-3 more times
	//#endif
	        /* If lookahead < MIN_MATCH, ins_h is garbage, but it does not
	         * matter since it will be recomputed at next deflate call.
	         */
	      }
	    } else {
	      /* No match, output a literal byte */
	      //Tracevv((stderr,"%c", s.window[s.strstart]));
	      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

	      s.lookahead--;
	      s.strstart++;
	    }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = ((s.strstart < (MIN_MATCH - 1)) ? s.strstart : MIN_MATCH - 1);
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* ===========================================================================
	 * Same as above, but achieves better compression. We use a lazy
	 * evaluation for matches: a match is finally adopted only if there is
	 * no better match at the next window position.
	 */
	function deflate_slow(s, flush) {
	  var hash_head;          /* head of hash chain */
	  var bflush;              /* set if current block must be flushed */

	  var max_insert;

	  /* Process the input block. */
	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the next match, plus MIN_MATCH bytes to insert the
	     * string following the next match.
	     */
	    if (s.lookahead < MIN_LOOKAHEAD) {
	      fill_window(s);
	      if (s.lookahead < MIN_LOOKAHEAD && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) { break; } /* flush the current block */
	    }

	    /* Insert the string window[strstart .. strstart+2] in the
	     * dictionary, and set hash_head to the head of the hash chain:
	     */
	    hash_head = 0/*NIL*/;
	    if (s.lookahead >= MIN_MATCH) {
	      /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	      hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	      s.head[s.ins_h] = s.strstart;
	      /***/
	    }

	    /* Find the longest match, discarding those <= prev_length.
	     */
	    s.prev_length = s.match_length;
	    s.prev_match = s.match_start;
	    s.match_length = MIN_MATCH - 1;

	    if (hash_head !== 0/*NIL*/ && s.prev_length < s.max_lazy_match &&
	        s.strstart - hash_head <= (s.w_size - MIN_LOOKAHEAD)/*MAX_DIST(s)*/) {
	      /* To simplify the code, we prevent matches with the string
	       * of window index 0 (in particular we have to avoid a match
	       * of the string with itself at the start of the input file).
	       */
	      s.match_length = longest_match(s, hash_head);
	      /* longest_match() sets match_start */

	      if (s.match_length <= 5 &&
	         (s.strategy === Z_FILTERED || (s.match_length === MIN_MATCH && s.strstart - s.match_start > 4096/*TOO_FAR*/))) {

	        /* If prev_match is also MIN_MATCH, match_start is garbage
	         * but we will ignore the current match anyway.
	         */
	        s.match_length = MIN_MATCH - 1;
	      }
	    }
	    /* If there was a match at the previous step and the current
	     * match is not better, output the previous match:
	     */
	    if (s.prev_length >= MIN_MATCH && s.match_length <= s.prev_length) {
	      max_insert = s.strstart + s.lookahead - MIN_MATCH;
	      /* Do not insert strings in hash table beyond this. */

	      //check_match(s, s.strstart-1, s.prev_match, s.prev_length);

	      /***_tr_tally_dist(s, s.strstart - 1 - s.prev_match,
	                     s.prev_length - MIN_MATCH, bflush);***/
	      bflush = trees._tr_tally(s, s.strstart - 1 - s.prev_match, s.prev_length - MIN_MATCH);
	      /* Insert in hash table all strings up to the end of the match.
	       * strstart-1 and strstart are already inserted. If there is not
	       * enough lookahead, the last two strings are not inserted in
	       * the hash table.
	       */
	      s.lookahead -= s.prev_length - 1;
	      s.prev_length -= 2;
	      do {
	        if (++s.strstart <= max_insert) {
	          /*** INSERT_STRING(s, s.strstart, hash_head); ***/
	          s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[s.strstart + MIN_MATCH - 1]) & s.hash_mask;
	          hash_head = s.prev[s.strstart & s.w_mask] = s.head[s.ins_h];
	          s.head[s.ins_h] = s.strstart;
	          /***/
	        }
	      } while (--s.prev_length !== 0);
	      s.match_available = 0;
	      s.match_length = MIN_MATCH - 1;
	      s.strstart++;

	      if (bflush) {
	        /*** FLUSH_BLOCK(s, 0); ***/
	        flush_block_only(s, false);
	        if (s.strm.avail_out === 0) {
	          return BS_NEED_MORE;
	        }
	        /***/
	      }

	    } else if (s.match_available) {
	      /* If there was no match at the previous position, output a
	       * single literal. If there was a match but the current match
	       * is longer, truncate the previous match to a single literal.
	       */
	      //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	      /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

	      if (bflush) {
	        /*** FLUSH_BLOCK_ONLY(s, 0) ***/
	        flush_block_only(s, false);
	        /***/
	      }
	      s.strstart++;
	      s.lookahead--;
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	    } else {
	      /* There is no previous match to compare with, wait for
	       * the next step to decide.
	       */
	      s.match_available = 1;
	      s.strstart++;
	      s.lookahead--;
	    }
	  }
	  //Assert (flush != Z_NO_FLUSH, "no flush?");
	  if (s.match_available) {
	    //Tracevv((stderr,"%c", s->window[s->strstart-1]));
	    /*** _tr_tally_lit(s, s.window[s.strstart-1], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart - 1]);

	    s.match_available = 0;
	  }
	  s.insert = s.strstart < MIN_MATCH - 1 ? s.strstart : MIN_MATCH - 1;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }

	  return BS_BLOCK_DONE;
	}


	/* ===========================================================================
	 * For Z_RLE, simply look for runs of bytes, generate matches only of distance
	 * one.  Do not maintain a hash table.  (It will be regenerated if this run of
	 * deflate switches away from Z_RLE.)
	 */
	function deflate_rle(s, flush) {
	  var bflush;            /* set if current block must be flushed */
	  var prev;              /* byte at distance one to match */
	  var scan, strend;      /* scan goes up to strend for length of run */

	  var _win = s.window;

	  for (;;) {
	    /* Make sure that we always have enough lookahead, except
	     * at the end of the input file. We need MAX_MATCH bytes
	     * for the longest run, plus one for the unrolled loop.
	     */
	    if (s.lookahead <= MAX_MATCH) {
	      fill_window(s);
	      if (s.lookahead <= MAX_MATCH && flush === Z_NO_FLUSH) {
	        return BS_NEED_MORE;
	      }
	      if (s.lookahead === 0) { break; } /* flush the current block */
	    }

	    /* See how many times the previous byte repeats */
	    s.match_length = 0;
	    if (s.lookahead >= MIN_MATCH && s.strstart > 0) {
	      scan = s.strstart - 1;
	      prev = _win[scan];
	      if (prev === _win[++scan] && prev === _win[++scan] && prev === _win[++scan]) {
	        strend = s.strstart + MAX_MATCH;
	        do {
	          /*jshint noempty:false*/
	        } while (prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 prev === _win[++scan] && prev === _win[++scan] &&
	                 scan < strend);
	        s.match_length = MAX_MATCH - (strend - scan);
	        if (s.match_length > s.lookahead) {
	          s.match_length = s.lookahead;
	        }
	      }
	      //Assert(scan <= s->window+(uInt)(s->window_size-1), "wild scan");
	    }

	    /* Emit match if have run of MIN_MATCH or longer, else emit literal */
	    if (s.match_length >= MIN_MATCH) {
	      //check_match(s, s.strstart, s.strstart - 1, s.match_length);

	      /*** _tr_tally_dist(s, 1, s.match_length - MIN_MATCH, bflush); ***/
	      bflush = trees._tr_tally(s, 1, s.match_length - MIN_MATCH);

	      s.lookahead -= s.match_length;
	      s.strstart += s.match_length;
	      s.match_length = 0;
	    } else {
	      /* No match, output a literal byte */
	      //Tracevv((stderr,"%c", s->window[s->strstart]));
	      /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	      bflush = trees._tr_tally(s, 0, s.window[s.strstart]);

	      s.lookahead--;
	      s.strstart++;
	    }
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* ===========================================================================
	 * For Z_HUFFMAN_ONLY, do not look for matches.  Do not maintain a hash table.
	 * (It will be regenerated if this run of deflate switches away from Huffman.)
	 */
	function deflate_huff(s, flush) {
	  var bflush;             /* set if current block must be flushed */

	  for (;;) {
	    /* Make sure that we have a literal to write. */
	    if (s.lookahead === 0) {
	      fill_window(s);
	      if (s.lookahead === 0) {
	        if (flush === Z_NO_FLUSH) {
	          return BS_NEED_MORE;
	        }
	        break;      /* flush the current block */
	      }
	    }

	    /* Output a literal byte */
	    s.match_length = 0;
	    //Tracevv((stderr,"%c", s->window[s->strstart]));
	    /*** _tr_tally_lit(s, s.window[s.strstart], bflush); ***/
	    bflush = trees._tr_tally(s, 0, s.window[s.strstart]);
	    s.lookahead--;
	    s.strstart++;
	    if (bflush) {
	      /*** FLUSH_BLOCK(s, 0); ***/
	      flush_block_only(s, false);
	      if (s.strm.avail_out === 0) {
	        return BS_NEED_MORE;
	      }
	      /***/
	    }
	  }
	  s.insert = 0;
	  if (flush === Z_FINISH) {
	    /*** FLUSH_BLOCK(s, 1); ***/
	    flush_block_only(s, true);
	    if (s.strm.avail_out === 0) {
	      return BS_FINISH_STARTED;
	    }
	    /***/
	    return BS_FINISH_DONE;
	  }
	  if (s.last_lit) {
	    /*** FLUSH_BLOCK(s, 0); ***/
	    flush_block_only(s, false);
	    if (s.strm.avail_out === 0) {
	      return BS_NEED_MORE;
	    }
	    /***/
	  }
	  return BS_BLOCK_DONE;
	}

	/* Values for max_lazy_match, good_match and max_chain_length, depending on
	 * the desired pack level (0..9). The values given below have been tuned to
	 * exclude worst case performance for pathological files. Better values may be
	 * found for specific files.
	 */
	function Config(good_length, max_lazy, nice_length, max_chain, func) {
	  this.good_length = good_length;
	  this.max_lazy = max_lazy;
	  this.nice_length = nice_length;
	  this.max_chain = max_chain;
	  this.func = func;
	}

	var configuration_table;

	configuration_table = [
	  /*      good lazy nice chain */
	  new Config(0, 0, 0, 0, deflate_stored),          /* 0 store only */
	  new Config(4, 4, 8, 4, deflate_fast),            /* 1 max speed, no lazy matches */
	  new Config(4, 5, 16, 8, deflate_fast),           /* 2 */
	  new Config(4, 6, 32, 32, deflate_fast),          /* 3 */

	  new Config(4, 4, 16, 16, deflate_slow),          /* 4 lazy matches */
	  new Config(8, 16, 32, 32, deflate_slow),         /* 5 */
	  new Config(8, 16, 128, 128, deflate_slow),       /* 6 */
	  new Config(8, 32, 128, 256, deflate_slow),       /* 7 */
	  new Config(32, 128, 258, 1024, deflate_slow),    /* 8 */
	  new Config(32, 258, 258, 4096, deflate_slow)     /* 9 max compression */
	];


	/* ===========================================================================
	 * Initialize the "longest match" routines for a new zlib stream
	 */
	function lm_init(s) {
	  s.window_size = 2 * s.w_size;

	  /*** CLEAR_HASH(s); ***/
	  zero(s.head); // Fill with NIL (= 0);

	  /* Set the default configuration parameters:
	   */
	  s.max_lazy_match = configuration_table[s.level].max_lazy;
	  s.good_match = configuration_table[s.level].good_length;
	  s.nice_match = configuration_table[s.level].nice_length;
	  s.max_chain_length = configuration_table[s.level].max_chain;

	  s.strstart = 0;
	  s.block_start = 0;
	  s.lookahead = 0;
	  s.insert = 0;
	  s.match_length = s.prev_length = MIN_MATCH - 1;
	  s.match_available = 0;
	  s.ins_h = 0;
	}


	function DeflateState() {
	  this.strm = null;            /* pointer back to this zlib stream */
	  this.status = 0;            /* as the name implies */
	  this.pending_buf = null;      /* output still pending */
	  this.pending_buf_size = 0;  /* size of pending_buf */
	  this.pending_out = 0;       /* next pending byte to output to the stream */
	  this.pending = 0;           /* nb of bytes in the pending buffer */
	  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
	  this.gzhead = null;         /* gzip header information to write */
	  this.gzindex = 0;           /* where in extra, name, or comment */
	  this.method = Z_DEFLATED; /* can only be DEFLATED */
	  this.last_flush = -1;   /* value of flush param for previous deflate call */

	  this.w_size = 0;  /* LZ77 window size (32K by default) */
	  this.w_bits = 0;  /* log2(w_size)  (8..16) */
	  this.w_mask = 0;  /* w_size - 1 */

	  this.window = null;
	  /* Sliding window. Input bytes are read into the second half of the window,
	   * and move to the first half later to keep a dictionary of at least wSize
	   * bytes. With this organization, matches are limited to a distance of
	   * wSize-MAX_MATCH bytes, but this ensures that IO is always
	   * performed with a length multiple of the block size.
	   */

	  this.window_size = 0;
	  /* Actual size of window: 2*wSize, except when the user input buffer
	   * is directly used as sliding window.
	   */

	  this.prev = null;
	  /* Link to older string with same hash index. To limit the size of this
	   * array to 64K, this link is maintained only for the last 32K strings.
	   * An index in this array is thus a window index modulo 32K.
	   */

	  this.head = null;   /* Heads of the hash chains or NIL. */

	  this.ins_h = 0;       /* hash index of string to be inserted */
	  this.hash_size = 0;   /* number of elements in hash table */
	  this.hash_bits = 0;   /* log2(hash_size) */
	  this.hash_mask = 0;   /* hash_size-1 */

	  this.hash_shift = 0;
	  /* Number of bits by which ins_h must be shifted at each input
	   * step. It must be such that after MIN_MATCH steps, the oldest
	   * byte no longer takes part in the hash key, that is:
	   *   hash_shift * MIN_MATCH >= hash_bits
	   */

	  this.block_start = 0;
	  /* Window position at the beginning of the current output block. Gets
	   * negative when the window is moved backwards.
	   */

	  this.match_length = 0;      /* length of best match */
	  this.prev_match = 0;        /* previous match */
	  this.match_available = 0;   /* set if previous match exists */
	  this.strstart = 0;          /* start of string to insert */
	  this.match_start = 0;       /* start of matching string */
	  this.lookahead = 0;         /* number of valid bytes ahead in window */

	  this.prev_length = 0;
	  /* Length of the best match at previous step. Matches not greater than this
	   * are discarded. This is used in the lazy match evaluation.
	   */

	  this.max_chain_length = 0;
	  /* To speed up deflation, hash chains are never searched beyond this
	   * length.  A higher limit improves compression ratio but degrades the
	   * speed.
	   */

	  this.max_lazy_match = 0;
	  /* Attempt to find a better match only when the current match is strictly
	   * smaller than this value. This mechanism is used only for compression
	   * levels >= 4.
	   */
	  // That's alias to max_lazy_match, don't use directly
	  //this.max_insert_length = 0;
	  /* Insert new strings in the hash table only if the match length is not
	   * greater than this length. This saves time but degrades compression.
	   * max_insert_length is used only for compression levels <= 3.
	   */

	  this.level = 0;     /* compression level (1..9) */
	  this.strategy = 0;  /* favor or force Huffman coding*/

	  this.good_match = 0;
	  /* Use a faster search when the previous match is longer than this */

	  this.nice_match = 0; /* Stop searching when current match exceeds this */

	              /* used by trees.c: */

	  /* Didn't use ct_data typedef below to suppress compiler warning */

	  // struct ct_data_s dyn_ltree[HEAP_SIZE];   /* literal and length tree */
	  // struct ct_data_s dyn_dtree[2*D_CODES+1]; /* distance tree */
	  // struct ct_data_s bl_tree[2*BL_CODES+1];  /* Huffman tree for bit lengths */

	  // Use flat array of DOUBLE size, with interleaved fata,
	  // because JS does not support effective
	  this.dyn_ltree  = new utils.Buf16(HEAP_SIZE * 2);
	  this.dyn_dtree  = new utils.Buf16((2 * D_CODES + 1) * 2);
	  this.bl_tree    = new utils.Buf16((2 * BL_CODES + 1) * 2);
	  zero(this.dyn_ltree);
	  zero(this.dyn_dtree);
	  zero(this.bl_tree);

	  this.l_desc   = null;         /* desc. for literal tree */
	  this.d_desc   = null;         /* desc. for distance tree */
	  this.bl_desc  = null;         /* desc. for bit length tree */

	  //ush bl_count[MAX_BITS+1];
	  this.bl_count = new utils.Buf16(MAX_BITS + 1);
	  /* number of codes at each bit length for an optimal tree */

	  //int heap[2*L_CODES+1];      /* heap used to build the Huffman trees */
	  this.heap = new utils.Buf16(2 * L_CODES + 1);  /* heap used to build the Huffman trees */
	  zero(this.heap);

	  this.heap_len = 0;               /* number of elements in the heap */
	  this.heap_max = 0;               /* element of largest frequency */
	  /* The sons of heap[n] are heap[2*n] and heap[2*n+1]. heap[0] is not used.
	   * The same heap array is used to build all trees.
	   */

	  this.depth = new utils.Buf16(2 * L_CODES + 1); //uch depth[2*L_CODES+1];
	  zero(this.depth);
	  /* Depth of each subtree used as tie breaker for trees of equal frequency
	   */

	  this.l_buf = 0;          /* buffer index for literals or lengths */

	  this.lit_bufsize = 0;
	  /* Size of match buffer for literals/lengths.  There are 4 reasons for
	   * limiting lit_bufsize to 64K:
	   *   - frequencies can be kept in 16 bit counters
	   *   - if compression is not successful for the first block, all input
	   *     data is still in the window so we can still emit a stored block even
	   *     when input comes from standard input.  (This can also be done for
	   *     all blocks if lit_bufsize is not greater than 32K.)
	   *   - if compression is not successful for a file smaller than 64K, we can
	   *     even emit a stored file instead of a stored block (saving 5 bytes).
	   *     This is applicable only for zip (not gzip or zlib).
	   *   - creating new Huffman trees less frequently may not provide fast
	   *     adaptation to changes in the input data statistics. (Take for
	   *     example a binary file with poorly compressible code followed by
	   *     a highly compressible string table.) Smaller buffer sizes give
	   *     fast adaptation but have of course the overhead of transmitting
	   *     trees more frequently.
	   *   - I can't count above 4
	   */

	  this.last_lit = 0;      /* running index in l_buf */

	  this.d_buf = 0;
	  /* Buffer index for distances. To simplify the code, d_buf and l_buf have
	   * the same number of elements. To use different lengths, an extra flag
	   * array would be necessary.
	   */

	  this.opt_len = 0;       /* bit length of current block with optimal trees */
	  this.static_len = 0;    /* bit length of current block with static trees */
	  this.matches = 0;       /* number of string matches in current block */
	  this.insert = 0;        /* bytes at end of window left to insert */


	  this.bi_buf = 0;
	  /* Output buffer. bits are inserted starting at the bottom (least
	   * significant bits).
	   */
	  this.bi_valid = 0;
	  /* Number of valid bits in bi_buf.  All bits above the last valid bit
	   * are always zero.
	   */

	  // Used for window memory init. We safely ignore it for JS. That makes
	  // sense only for pointers and memory check tools.
	  //this.high_water = 0;
	  /* High water mark offset in window for initialized bytes -- bytes above
	   * this are set to zero in order to avoid memory check warnings when
	   * longest match routines access bytes past the input.  This is then
	   * updated to the new high water mark.
	   */
	}


	function deflateResetKeep(strm) {
	  var s;

	  if (!strm || !strm.state) {
	    return err(strm, Z_STREAM_ERROR);
	  }

	  strm.total_in = strm.total_out = 0;
	  strm.data_type = Z_UNKNOWN;

	  s = strm.state;
	  s.pending = 0;
	  s.pending_out = 0;

	  if (s.wrap < 0) {
	    s.wrap = -s.wrap;
	    /* was made negative by deflate(..., Z_FINISH); */
	  }
	  s.status = (s.wrap ? INIT_STATE : BUSY_STATE);
	  strm.adler = (s.wrap === 2) ?
	    0  // crc32(0, Z_NULL, 0)
	  :
	    1; // adler32(0, Z_NULL, 0)
	  s.last_flush = Z_NO_FLUSH;
	  trees._tr_init(s);
	  return Z_OK;
	}


	function deflateReset(strm) {
	  var ret = deflateResetKeep(strm);
	  if (ret === Z_OK) {
	    lm_init(strm.state);
	  }
	  return ret;
	}


	function deflateSetHeader(strm, head) {
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  if (strm.state.wrap !== 2) { return Z_STREAM_ERROR; }
	  strm.state.gzhead = head;
	  return Z_OK;
	}


	function deflateInit2(strm, level, method, windowBits, memLevel, strategy) {
	  if (!strm) { // === Z_NULL
	    return Z_STREAM_ERROR;
	  }
	  var wrap = 1;

	  if (level === Z_DEFAULT_COMPRESSION) {
	    level = 6;
	  }

	  if (windowBits < 0) { /* suppress zlib wrapper */
	    wrap = 0;
	    windowBits = -windowBits;
	  }

	  else if (windowBits > 15) {
	    wrap = 2;           /* write gzip wrapper instead */
	    windowBits -= 16;
	  }


	  if (memLevel < 1 || memLevel > MAX_MEM_LEVEL || method !== Z_DEFLATED ||
	    windowBits < 8 || windowBits > 15 || level < 0 || level > 9 ||
	    strategy < 0 || strategy > Z_FIXED) {
	    return err(strm, Z_STREAM_ERROR);
	  }


	  if (windowBits === 8) {
	    windowBits = 9;
	  }
	  /* until 256-byte window bug fixed */

	  var s = new DeflateState();

	  strm.state = s;
	  s.strm = strm;

	  s.wrap = wrap;
	  s.gzhead = null;
	  s.w_bits = windowBits;
	  s.w_size = 1 << s.w_bits;
	  s.w_mask = s.w_size - 1;

	  s.hash_bits = memLevel + 7;
	  s.hash_size = 1 << s.hash_bits;
	  s.hash_mask = s.hash_size - 1;
	  s.hash_shift = ~~((s.hash_bits + MIN_MATCH - 1) / MIN_MATCH);

	  s.window = new utils.Buf8(s.w_size * 2);
	  s.head = new utils.Buf16(s.hash_size);
	  s.prev = new utils.Buf16(s.w_size);

	  // Don't need mem init magic for JS.
	  //s.high_water = 0;  /* nothing written to s->window yet */

	  s.lit_bufsize = 1 << (memLevel + 6); /* 16K elements by default */

	  s.pending_buf_size = s.lit_bufsize * 4;

	  //overlay = (ushf *) ZALLOC(strm, s->lit_bufsize, sizeof(ush)+2);
	  //s->pending_buf = (uchf *) overlay;
	  s.pending_buf = new utils.Buf8(s.pending_buf_size);

	  // It is offset from `s.pending_buf` (size is `s.lit_bufsize * 2`)
	  //s->d_buf = overlay + s->lit_bufsize/sizeof(ush);
	  s.d_buf = 1 * s.lit_bufsize;

	  //s->l_buf = s->pending_buf + (1+sizeof(ush))*s->lit_bufsize;
	  s.l_buf = (1 + 2) * s.lit_bufsize;

	  s.level = level;
	  s.strategy = strategy;
	  s.method = method;

	  return deflateReset(strm);
	}

	function deflateInit(strm, level) {
	  return deflateInit2(strm, level, Z_DEFLATED, MAX_WBITS, DEF_MEM_LEVEL, Z_DEFAULT_STRATEGY);
	}


	function deflate(strm, flush) {
	  var old_flush, s;
	  var beg, val; // for gzip header write only

	  if (!strm || !strm.state ||
	    flush > Z_BLOCK || flush < 0) {
	    return strm ? err(strm, Z_STREAM_ERROR) : Z_STREAM_ERROR;
	  }

	  s = strm.state;

	  if (!strm.output ||
	      (!strm.input && strm.avail_in !== 0) ||
	      (s.status === FINISH_STATE && flush !== Z_FINISH)) {
	    return err(strm, (strm.avail_out === 0) ? Z_BUF_ERROR : Z_STREAM_ERROR);
	  }

	  s.strm = strm; /* just in case */
	  old_flush = s.last_flush;
	  s.last_flush = flush;

	  /* Write the header */
	  if (s.status === INIT_STATE) {

	    if (s.wrap === 2) { // GZIP header
	      strm.adler = 0;  //crc32(0L, Z_NULL, 0);
	      put_byte(s, 31);
	      put_byte(s, 139);
	      put_byte(s, 8);
	      if (!s.gzhead) { // s->gzhead == Z_NULL
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, 0);
	        put_byte(s, s.level === 9 ? 2 :
	                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
	                     4 : 0));
	        put_byte(s, OS_CODE);
	        s.status = BUSY_STATE;
	      }
	      else {
	        put_byte(s, (s.gzhead.text ? 1 : 0) +
	                    (s.gzhead.hcrc ? 2 : 0) +
	                    (!s.gzhead.extra ? 0 : 4) +
	                    (!s.gzhead.name ? 0 : 8) +
	                    (!s.gzhead.comment ? 0 : 16)
	        );
	        put_byte(s, s.gzhead.time & 0xff);
	        put_byte(s, (s.gzhead.time >> 8) & 0xff);
	        put_byte(s, (s.gzhead.time >> 16) & 0xff);
	        put_byte(s, (s.gzhead.time >> 24) & 0xff);
	        put_byte(s, s.level === 9 ? 2 :
	                    (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2 ?
	                     4 : 0));
	        put_byte(s, s.gzhead.os & 0xff);
	        if (s.gzhead.extra && s.gzhead.extra.length) {
	          put_byte(s, s.gzhead.extra.length & 0xff);
	          put_byte(s, (s.gzhead.extra.length >> 8) & 0xff);
	        }
	        if (s.gzhead.hcrc) {
	          strm.adler = crc32(strm.adler, s.pending_buf, s.pending, 0);
	        }
	        s.gzindex = 0;
	        s.status = EXTRA_STATE;
	      }
	    }
	    else // DEFLATE header
	    {
	      var header = (Z_DEFLATED + ((s.w_bits - 8) << 4)) << 8;
	      var level_flags = -1;

	      if (s.strategy >= Z_HUFFMAN_ONLY || s.level < 2) {
	        level_flags = 0;
	      } else if (s.level < 6) {
	        level_flags = 1;
	      } else if (s.level === 6) {
	        level_flags = 2;
	      } else {
	        level_flags = 3;
	      }
	      header |= (level_flags << 6);
	      if (s.strstart !== 0) { header |= PRESET_DICT; }
	      header += 31 - (header % 31);

	      s.status = BUSY_STATE;
	      putShortMSB(s, header);

	      /* Save the adler32 of the preset dictionary: */
	      if (s.strstart !== 0) {
	        putShortMSB(s, strm.adler >>> 16);
	        putShortMSB(s, strm.adler & 0xffff);
	      }
	      strm.adler = 1; // adler32(0L, Z_NULL, 0);
	    }
	  }

	//#ifdef GZIP
	  if (s.status === EXTRA_STATE) {
	    if (s.gzhead.extra/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */

	      while (s.gzindex < (s.gzhead.extra.length & 0xffff)) {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            break;
	          }
	        }
	        put_byte(s, s.gzhead.extra[s.gzindex] & 0xff);
	        s.gzindex++;
	      }
	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (s.gzindex === s.gzhead.extra.length) {
	        s.gzindex = 0;
	        s.status = NAME_STATE;
	      }
	    }
	    else {
	      s.status = NAME_STATE;
	    }
	  }
	  if (s.status === NAME_STATE) {
	    if (s.gzhead.name/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */
	      //int val;

	      do {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            val = 1;
	            break;
	          }
	        }
	        // JS specific: little magic to add zero terminator to end of string
	        if (s.gzindex < s.gzhead.name.length) {
	          val = s.gzhead.name.charCodeAt(s.gzindex++) & 0xff;
	        } else {
	          val = 0;
	        }
	        put_byte(s, val);
	      } while (val !== 0);

	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (val === 0) {
	        s.gzindex = 0;
	        s.status = COMMENT_STATE;
	      }
	    }
	    else {
	      s.status = COMMENT_STATE;
	    }
	  }
	  if (s.status === COMMENT_STATE) {
	    if (s.gzhead.comment/* != Z_NULL*/) {
	      beg = s.pending;  /* start of bytes to update crc */
	      //int val;

	      do {
	        if (s.pending === s.pending_buf_size) {
	          if (s.gzhead.hcrc && s.pending > beg) {
	            strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	          }
	          flush_pending(strm);
	          beg = s.pending;
	          if (s.pending === s.pending_buf_size) {
	            val = 1;
	            break;
	          }
	        }
	        // JS specific: little magic to add zero terminator to end of string
	        if (s.gzindex < s.gzhead.comment.length) {
	          val = s.gzhead.comment.charCodeAt(s.gzindex++) & 0xff;
	        } else {
	          val = 0;
	        }
	        put_byte(s, val);
	      } while (val !== 0);

	      if (s.gzhead.hcrc && s.pending > beg) {
	        strm.adler = crc32(strm.adler, s.pending_buf, s.pending - beg, beg);
	      }
	      if (val === 0) {
	        s.status = HCRC_STATE;
	      }
	    }
	    else {
	      s.status = HCRC_STATE;
	    }
	  }
	  if (s.status === HCRC_STATE) {
	    if (s.gzhead.hcrc) {
	      if (s.pending + 2 > s.pending_buf_size) {
	        flush_pending(strm);
	      }
	      if (s.pending + 2 <= s.pending_buf_size) {
	        put_byte(s, strm.adler & 0xff);
	        put_byte(s, (strm.adler >> 8) & 0xff);
	        strm.adler = 0; //crc32(0L, Z_NULL, 0);
	        s.status = BUSY_STATE;
	      }
	    }
	    else {
	      s.status = BUSY_STATE;
	    }
	  }
	//#endif

	  /* Flush as much pending output as possible */
	  if (s.pending !== 0) {
	    flush_pending(strm);
	    if (strm.avail_out === 0) {
	      /* Since avail_out is 0, deflate will be called again with
	       * more output space, but possibly with both pending and
	       * avail_in equal to zero. There won't be anything to do,
	       * but this is not an error situation so make sure we
	       * return OK instead of BUF_ERROR at next call of deflate:
	       */
	      s.last_flush = -1;
	      return Z_OK;
	    }

	    /* Make sure there is something to do and avoid duplicate consecutive
	     * flushes. For repeated and useless calls with Z_FINISH, we keep
	     * returning Z_STREAM_END instead of Z_BUF_ERROR.
	     */
	  } else if (strm.avail_in === 0 && rank(flush) <= rank(old_flush) &&
	    flush !== Z_FINISH) {
	    return err(strm, Z_BUF_ERROR);
	  }

	  /* User must not provide more input after the first FINISH: */
	  if (s.status === FINISH_STATE && strm.avail_in !== 0) {
	    return err(strm, Z_BUF_ERROR);
	  }

	  /* Start a new block or continue the current one.
	   */
	  if (strm.avail_in !== 0 || s.lookahead !== 0 ||
	    (flush !== Z_NO_FLUSH && s.status !== FINISH_STATE)) {
	    var bstate = (s.strategy === Z_HUFFMAN_ONLY) ? deflate_huff(s, flush) :
	      (s.strategy === Z_RLE ? deflate_rle(s, flush) :
	        configuration_table[s.level].func(s, flush));

	    if (bstate === BS_FINISH_STARTED || bstate === BS_FINISH_DONE) {
	      s.status = FINISH_STATE;
	    }
	    if (bstate === BS_NEED_MORE || bstate === BS_FINISH_STARTED) {
	      if (strm.avail_out === 0) {
	        s.last_flush = -1;
	        /* avoid BUF_ERROR next call, see above */
	      }
	      return Z_OK;
	      /* If flush != Z_NO_FLUSH && avail_out == 0, the next call
	       * of deflate should use the same flush parameter to make sure
	       * that the flush is complete. So we don't have to output an
	       * empty block here, this will be done at next call. This also
	       * ensures that for a very small output buffer, we emit at most
	       * one empty block.
	       */
	    }
	    if (bstate === BS_BLOCK_DONE) {
	      if (flush === Z_PARTIAL_FLUSH) {
	        trees._tr_align(s);
	      }
	      else if (flush !== Z_BLOCK) { /* FULL_FLUSH or SYNC_FLUSH */

	        trees._tr_stored_block(s, 0, 0, false);
	        /* For a full flush, this empty block will be recognized
	         * as a special marker by inflate_sync().
	         */
	        if (flush === Z_FULL_FLUSH) {
	          /*** CLEAR_HASH(s); ***/             /* forget history */
	          zero(s.head); // Fill with NIL (= 0);

	          if (s.lookahead === 0) {
	            s.strstart = 0;
	            s.block_start = 0;
	            s.insert = 0;
	          }
	        }
	      }
	      flush_pending(strm);
	      if (strm.avail_out === 0) {
	        s.last_flush = -1; /* avoid BUF_ERROR at next call, see above */
	        return Z_OK;
	      }
	    }
	  }
	  //Assert(strm->avail_out > 0, "bug2");
	  //if (strm.avail_out <= 0) { throw new Error("bug2");}

	  if (flush !== Z_FINISH) { return Z_OK; }
	  if (s.wrap <= 0) { return Z_STREAM_END; }

	  /* Write the trailer */
	  if (s.wrap === 2) {
	    put_byte(s, strm.adler & 0xff);
	    put_byte(s, (strm.adler >> 8) & 0xff);
	    put_byte(s, (strm.adler >> 16) & 0xff);
	    put_byte(s, (strm.adler >> 24) & 0xff);
	    put_byte(s, strm.total_in & 0xff);
	    put_byte(s, (strm.total_in >> 8) & 0xff);
	    put_byte(s, (strm.total_in >> 16) & 0xff);
	    put_byte(s, (strm.total_in >> 24) & 0xff);
	  }
	  else
	  {
	    putShortMSB(s, strm.adler >>> 16);
	    putShortMSB(s, strm.adler & 0xffff);
	  }

	  flush_pending(strm);
	  /* If avail_out is zero, the application will call deflate again
	   * to flush the rest.
	   */
	  if (s.wrap > 0) { s.wrap = -s.wrap; }
	  /* write the trailer only once! */
	  return s.pending !== 0 ? Z_OK : Z_STREAM_END;
	}

	function deflateEnd(strm) {
	  var status;

	  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
	    return Z_STREAM_ERROR;
	  }

	  status = strm.state.status;
	  if (status !== INIT_STATE &&
	    status !== EXTRA_STATE &&
	    status !== NAME_STATE &&
	    status !== COMMENT_STATE &&
	    status !== HCRC_STATE &&
	    status !== BUSY_STATE &&
	    status !== FINISH_STATE
	  ) {
	    return err(strm, Z_STREAM_ERROR);
	  }

	  strm.state = null;

	  return status === BUSY_STATE ? err(strm, Z_DATA_ERROR) : Z_OK;
	}


	/* =========================================================================
	 * Initializes the compression dictionary from the given byte
	 * sequence without producing any compressed output.
	 */
	function deflateSetDictionary(strm, dictionary) {
	  var dictLength = dictionary.length;

	  var s;
	  var str, n;
	  var wrap;
	  var avail;
	  var next;
	  var input;
	  var tmpDict;

	  if (!strm/*== Z_NULL*/ || !strm.state/*== Z_NULL*/) {
	    return Z_STREAM_ERROR;
	  }

	  s = strm.state;
	  wrap = s.wrap;

	  if (wrap === 2 || (wrap === 1 && s.status !== INIT_STATE) || s.lookahead) {
	    return Z_STREAM_ERROR;
	  }

	  /* when using zlib wrappers, compute Adler-32 for provided dictionary */
	  if (wrap === 1) {
	    /* adler32(strm->adler, dictionary, dictLength); */
	    strm.adler = adler32(strm.adler, dictionary, dictLength, 0);
	  }

	  s.wrap = 0;   /* avoid computing Adler-32 in read_buf */

	  /* if dictionary would fill window, just replace the history */
	  if (dictLength >= s.w_size) {
	    if (wrap === 0) {            /* already empty otherwise */
	      /*** CLEAR_HASH(s); ***/
	      zero(s.head); // Fill with NIL (= 0);
	      s.strstart = 0;
	      s.block_start = 0;
	      s.insert = 0;
	    }
	    /* use the tail */
	    // dictionary = dictionary.slice(dictLength - s.w_size);
	    tmpDict = new utils.Buf8(s.w_size);
	    utils.arraySet(tmpDict, dictionary, dictLength - s.w_size, s.w_size, 0);
	    dictionary = tmpDict;
	    dictLength = s.w_size;
	  }
	  /* insert dictionary into window and hash */
	  avail = strm.avail_in;
	  next = strm.next_in;
	  input = strm.input;
	  strm.avail_in = dictLength;
	  strm.next_in = 0;
	  strm.input = dictionary;
	  fill_window(s);
	  while (s.lookahead >= MIN_MATCH) {
	    str = s.strstart;
	    n = s.lookahead - (MIN_MATCH - 1);
	    do {
	      /* UPDATE_HASH(s, s->ins_h, s->window[str + MIN_MATCH-1]); */
	      s.ins_h = ((s.ins_h << s.hash_shift) ^ s.window[str + MIN_MATCH - 1]) & s.hash_mask;

	      s.prev[str & s.w_mask] = s.head[s.ins_h];

	      s.head[s.ins_h] = str;
	      str++;
	    } while (--n);
	    s.strstart = str;
	    s.lookahead = MIN_MATCH - 1;
	    fill_window(s);
	  }
	  s.strstart += s.lookahead;
	  s.block_start = s.strstart;
	  s.insert = s.lookahead;
	  s.lookahead = 0;
	  s.match_length = s.prev_length = MIN_MATCH - 1;
	  s.match_available = 0;
	  strm.next_in = next;
	  strm.input = input;
	  strm.avail_in = avail;
	  s.wrap = wrap;
	  return Z_OK;
	}


	exports.deflateInit = deflateInit;
	exports.deflateInit2 = deflateInit2;
	exports.deflateReset = deflateReset;
	exports.deflateResetKeep = deflateResetKeep;
	exports.deflateSetHeader = deflateSetHeader;
	exports.deflate = deflate;
	exports.deflateEnd = deflateEnd;
	exports.deflateSetDictionary = deflateSetDictionary;
	exports.deflateInfo = 'pako deflate (from Nodeca project)';

	/* Not implemented
	exports.deflateBound = deflateBound;
	exports.deflateCopy = deflateCopy;
	exports.deflateParams = deflateParams;
	exports.deflatePending = deflatePending;
	exports.deflatePrime = deflatePrime;
	exports.deflateTune = deflateTune;
	*/

	},{"../utils/common":52,"./adler32":53,"./crc32":55,"./messages":60,"./trees":61}],57:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	// See state defs from inflate.js
	var BAD = 30;       /* got a data error -- remain here until reset */
	var TYPE = 12;      /* i: waiting for type bits, including last-flag bit */

	/*
	   Decode literal, length, and distance codes and write out the resulting
	   literal and match bytes until either not enough input or output is
	   available, an end-of-block is encountered, or a data error is encountered.
	   When large enough input and output buffers are supplied to inflate(), for
	   example, a 16K input buffer and a 64K output buffer, more than 95% of the
	   inflate execution time is spent in this routine.

	   Entry assumptions:

	        state.mode === LEN
	        strm.avail_in >= 6
	        strm.avail_out >= 258
	        start >= strm.avail_out
	        state.bits < 8

	   On return, state.mode is one of:

	        LEN -- ran out of enough output space or enough available input
	        TYPE -- reached end of block code, inflate() to interpret next block
	        BAD -- error in block data

	   Notes:

	    - The maximum input bits used by a length/distance pair is 15 bits for the
	      length code, 5 bits for the length extra, 15 bits for the distance code,
	      and 13 bits for the distance extra.  This totals 48 bits, or six bytes.
	      Therefore if strm.avail_in >= 6, then there is enough input to avoid
	      checking for available input while decoding.

	    - The maximum bytes that a single length/distance pair can output is 258
	      bytes, which is the maximum length that can be coded.  inflate_fast()
	      requires strm.avail_out >= 258 for each loop to avoid checking for
	      output space.
	 */
	module.exports = function inflate_fast(strm, start) {
	  var state;
	  var _in;                    /* local strm.input */
	  var last;                   /* have enough input while in < last */
	  var _out;                   /* local strm.output */
	  var beg;                    /* inflate()'s initial strm.output */
	  var end;                    /* while out < end, enough space available */
	//#ifdef INFLATE_STRICT
	  var dmax;                   /* maximum distance from zlib header */
	//#endif
	  var wsize;                  /* window size or zero if not using window */
	  var whave;                  /* valid bytes in the window */
	  var wnext;                  /* window write index */
	  // Use `s_window` instead `window`, avoid conflict with instrumentation tools
	  var s_window;               /* allocated sliding window, if wsize != 0 */
	  var hold;                   /* local strm.hold */
	  var bits;                   /* local strm.bits */
	  var lcode;                  /* local strm.lencode */
	  var dcode;                  /* local strm.distcode */
	  var lmask;                  /* mask for first level of length codes */
	  var dmask;                  /* mask for first level of distance codes */
	  var here;                   /* retrieved table entry */
	  var op;                     /* code bits, operation, extra bits, or */
	                              /*  window position, window bytes to copy */
	  var len;                    /* match length, unused bytes */
	  var dist;                   /* match distance */
	  var from;                   /* where to copy match from */
	  var from_source;


	  var input, output; // JS specific, because we have no pointers

	  /* copy state to local variables */
	  state = strm.state;
	  //here = state.here;
	  _in = strm.next_in;
	  input = strm.input;
	  last = _in + (strm.avail_in - 5);
	  _out = strm.next_out;
	  output = strm.output;
	  beg = _out - (start - strm.avail_out);
	  end = _out + (strm.avail_out - 257);
	//#ifdef INFLATE_STRICT
	  dmax = state.dmax;
	//#endif
	  wsize = state.wsize;
	  whave = state.whave;
	  wnext = state.wnext;
	  s_window = state.window;
	  hold = state.hold;
	  bits = state.bits;
	  lcode = state.lencode;
	  dcode = state.distcode;
	  lmask = (1 << state.lenbits) - 1;
	  dmask = (1 << state.distbits) - 1;


	  /* decode literals and length/distances until end-of-block or not enough
	     input data or output space */

	  top:
	  do {
	    if (bits < 15) {
	      hold += input[_in++] << bits;
	      bits += 8;
	      hold += input[_in++] << bits;
	      bits += 8;
	    }

	    here = lcode[hold & lmask];

	    dolen:
	    for (;;) { // Goto emulation
	      op = here >>> 24/*here.bits*/;
	      hold >>>= op;
	      bits -= op;
	      op = (here >>> 16) & 0xff/*here.op*/;
	      if (op === 0) {                          /* literal */
	        //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	        //        "inflate:         literal '%c'\n" :
	        //        "inflate:         literal 0x%02x\n", here.val));
	        output[_out++] = here & 0xffff/*here.val*/;
	      }
	      else if (op & 16) {                     /* length base */
	        len = here & 0xffff/*here.val*/;
	        op &= 15;                           /* number of extra bits */
	        if (op) {
	          if (bits < op) {
	            hold += input[_in++] << bits;
	            bits += 8;
	          }
	          len += hold & ((1 << op) - 1);
	          hold >>>= op;
	          bits -= op;
	        }
	        //Tracevv((stderr, "inflate:         length %u\n", len));
	        if (bits < 15) {
	          hold += input[_in++] << bits;
	          bits += 8;
	          hold += input[_in++] << bits;
	          bits += 8;
	        }
	        here = dcode[hold & dmask];

	        dodist:
	        for (;;) { // goto emulation
	          op = here >>> 24/*here.bits*/;
	          hold >>>= op;
	          bits -= op;
	          op = (here >>> 16) & 0xff/*here.op*/;

	          if (op & 16) {                      /* distance base */
	            dist = here & 0xffff/*here.val*/;
	            op &= 15;                       /* number of extra bits */
	            if (bits < op) {
	              hold += input[_in++] << bits;
	              bits += 8;
	              if (bits < op) {
	                hold += input[_in++] << bits;
	                bits += 8;
	              }
	            }
	            dist += hold & ((1 << op) - 1);
	//#ifdef INFLATE_STRICT
	            if (dist > dmax) {
	              strm.msg = 'invalid distance too far back';
	              state.mode = BAD;
	              break top;
	            }
	//#endif
	            hold >>>= op;
	            bits -= op;
	            //Tracevv((stderr, "inflate:         distance %u\n", dist));
	            op = _out - beg;                /* max distance in output */
	            if (dist > op) {                /* see if copy from window */
	              op = dist - op;               /* distance back in window */
	              if (op > whave) {
	                if (state.sane) {
	                  strm.msg = 'invalid distance too far back';
	                  state.mode = BAD;
	                  break top;
	                }

	// (!) This block is disabled in zlib defaults,
	// don't enable it for binary compatibility
	//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	//                if (len <= op - whave) {
	//                  do {
	//                    output[_out++] = 0;
	//                  } while (--len);
	//                  continue top;
	//                }
	//                len -= op - whave;
	//                do {
	//                  output[_out++] = 0;
	//                } while (--op > whave);
	//                if (op === 0) {
	//                  from = _out - dist;
	//                  do {
	//                    output[_out++] = output[from++];
	//                  } while (--len);
	//                  continue top;
	//                }
	//#endif
	              }
	              from = 0; // window index
	              from_source = s_window;
	              if (wnext === 0) {           /* very common case */
	                from += wsize - op;
	                if (op < len) {         /* some from window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = _out - dist;  /* rest from output */
	                  from_source = output;
	                }
	              }
	              else if (wnext < op) {      /* wrap around window */
	                from += wsize + wnext - op;
	                op -= wnext;
	                if (op < len) {         /* some from end of window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = 0;
	                  if (wnext < len) {  /* some from start of window */
	                    op = wnext;
	                    len -= op;
	                    do {
	                      output[_out++] = s_window[from++];
	                    } while (--op);
	                    from = _out - dist;      /* rest from output */
	                    from_source = output;
	                  }
	                }
	              }
	              else {                      /* contiguous in window */
	                from += wnext - op;
	                if (op < len) {         /* some from window */
	                  len -= op;
	                  do {
	                    output[_out++] = s_window[from++];
	                  } while (--op);
	                  from = _out - dist;  /* rest from output */
	                  from_source = output;
	                }
	              }
	              while (len > 2) {
	                output[_out++] = from_source[from++];
	                output[_out++] = from_source[from++];
	                output[_out++] = from_source[from++];
	                len -= 3;
	              }
	              if (len) {
	                output[_out++] = from_source[from++];
	                if (len > 1) {
	                  output[_out++] = from_source[from++];
	                }
	              }
	            }
	            else {
	              from = _out - dist;          /* copy direct from output */
	              do {                        /* minimum length is three */
	                output[_out++] = output[from++];
	                output[_out++] = output[from++];
	                output[_out++] = output[from++];
	                len -= 3;
	              } while (len > 2);
	              if (len) {
	                output[_out++] = output[from++];
	                if (len > 1) {
	                  output[_out++] = output[from++];
	                }
	              }
	            }
	          }
	          else if ((op & 64) === 0) {          /* 2nd level distance code */
	            here = dcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
	            continue dodist;
	          }
	          else {
	            strm.msg = 'invalid distance code';
	            state.mode = BAD;
	            break top;
	          }

	          break; // need to emulate goto via "continue"
	        }
	      }
	      else if ((op & 64) === 0) {              /* 2nd level length code */
	        here = lcode[(here & 0xffff)/*here.val*/ + (hold & ((1 << op) - 1))];
	        continue dolen;
	      }
	      else if (op & 32) {                     /* end-of-block */
	        //Tracevv((stderr, "inflate:         end of block\n"));
	        state.mode = TYPE;
	        break top;
	      }
	      else {
	        strm.msg = 'invalid literal/length code';
	        state.mode = BAD;
	        break top;
	      }

	      break; // need to emulate goto via "continue"
	    }
	  } while (_in < last && _out < end);

	  /* return unused bytes (on entry, bits < 8, so in won't go too far back) */
	  len = bits >> 3;
	  _in -= len;
	  bits -= len << 3;
	  hold &= (1 << bits) - 1;

	  /* update state and return */
	  strm.next_in = _in;
	  strm.next_out = _out;
	  strm.avail_in = (_in < last ? 5 + (last - _in) : 5 - (_in - last));
	  strm.avail_out = (_out < end ? 257 + (end - _out) : 257 - (_out - end));
	  state.hold = hold;
	  state.bits = bits;
	  return;
	};

	},{}],58:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	var utils         = require('../utils/common');
	var adler32       = require('./adler32');
	var crc32         = require('./crc32');
	var inflate_fast  = require('./inffast');
	var inflate_table = require('./inftrees');

	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	/* Allowed flush values; see deflate() and inflate() below for details */
	//var Z_NO_FLUSH      = 0;
	//var Z_PARTIAL_FLUSH = 1;
	//var Z_SYNC_FLUSH    = 2;
	//var Z_FULL_FLUSH    = 3;
	var Z_FINISH        = 4;
	var Z_BLOCK         = 5;
	var Z_TREES         = 6;


	/* Return codes for the compression/decompression functions. Negative values
	 * are errors, positive values are used for special but normal events.
	 */
	var Z_OK            = 0;
	var Z_STREAM_END    = 1;
	var Z_NEED_DICT     = 2;
	//var Z_ERRNO         = -1;
	var Z_STREAM_ERROR  = -2;
	var Z_DATA_ERROR    = -3;
	var Z_MEM_ERROR     = -4;
	var Z_BUF_ERROR     = -5;
	//var Z_VERSION_ERROR = -6;

	/* The deflate compression method */
	var Z_DEFLATED  = 8;


	/* STATES ====================================================================*/
	/* ===========================================================================*/


	var    HEAD = 1;       /* i: waiting for magic header */
	var    FLAGS = 2;      /* i: waiting for method and flags (gzip) */
	var    TIME = 3;       /* i: waiting for modification time (gzip) */
	var    OS = 4;         /* i: waiting for extra flags and operating system (gzip) */
	var    EXLEN = 5;      /* i: waiting for extra length (gzip) */
	var    EXTRA = 6;      /* i: waiting for extra bytes (gzip) */
	var    NAME = 7;       /* i: waiting for end of file name (gzip) */
	var    COMMENT = 8;    /* i: waiting for end of comment (gzip) */
	var    HCRC = 9;       /* i: waiting for header crc (gzip) */
	var    DICTID = 10;    /* i: waiting for dictionary check value */
	var    DICT = 11;      /* waiting for inflateSetDictionary() call */
	var        TYPE = 12;      /* i: waiting for type bits, including last-flag bit */
	var        TYPEDO = 13;    /* i: same, but skip check to exit inflate on new block */
	var        STORED = 14;    /* i: waiting for stored size (length and complement) */
	var        COPY_ = 15;     /* i/o: same as COPY below, but only first time in */
	var        COPY = 16;      /* i/o: waiting for input or output to copy stored block */
	var        TABLE = 17;     /* i: waiting for dynamic block table lengths */
	var        LENLENS = 18;   /* i: waiting for code length code lengths */
	var        CODELENS = 19;  /* i: waiting for length/lit and distance code lengths */
	var            LEN_ = 20;      /* i: same as LEN below, but only first time in */
	var            LEN = 21;       /* i: waiting for length/lit/eob code */
	var            LENEXT = 22;    /* i: waiting for length extra bits */
	var            DIST = 23;      /* i: waiting for distance code */
	var            DISTEXT = 24;   /* i: waiting for distance extra bits */
	var            MATCH = 25;     /* o: waiting for output space to copy string */
	var            LIT = 26;       /* o: waiting for output space to write literal */
	var    CHECK = 27;     /* i: waiting for 32-bit check value */
	var    LENGTH = 28;    /* i: waiting for 32-bit length (gzip) */
	var    DONE = 29;      /* finished check, done -- remain here until reset */
	var    BAD = 30;       /* got a data error -- remain here until reset */
	var    MEM = 31;       /* got an inflate() memory error -- remain here until reset */
	var    SYNC = 32;      /* looking for synchronization bytes to restart inflate() */

	/* ===========================================================================*/



	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH =  (ENOUGH_LENS+ENOUGH_DISTS);

	var MAX_WBITS = 15;
	/* 32K LZ77 window */
	var DEF_WBITS = MAX_WBITS;


	function zswap32(q) {
	  return  (((q >>> 24) & 0xff) +
	          ((q >>> 8) & 0xff00) +
	          ((q & 0xff00) << 8) +
	          ((q & 0xff) << 24));
	}


	function InflateState() {
	  this.mode = 0;             /* current inflate mode */
	  this.last = false;          /* true if processing last block */
	  this.wrap = 0;              /* bit 0 true for zlib, bit 1 true for gzip */
	  this.havedict = false;      /* true if dictionary provided */
	  this.flags = 0;             /* gzip header method and flags (0 if zlib) */
	  this.dmax = 0;              /* zlib header max distance (INFLATE_STRICT) */
	  this.check = 0;             /* protected copy of check value */
	  this.total = 0;             /* protected copy of output count */
	  // TODO: may be {}
	  this.head = null;           /* where to save gzip header information */

	  /* sliding window */
	  this.wbits = 0;             /* log base 2 of requested window size */
	  this.wsize = 0;             /* window size or zero if not using window */
	  this.whave = 0;             /* valid bytes in the window */
	  this.wnext = 0;             /* window write index */
	  this.window = null;         /* allocated sliding window, if needed */

	  /* bit accumulator */
	  this.hold = 0;              /* input bit accumulator */
	  this.bits = 0;              /* number of bits in "in" */

	  /* for string and stored block copying */
	  this.length = 0;            /* literal or length of data to copy */
	  this.offset = 0;            /* distance back to copy string from */

	  /* for table and code decoding */
	  this.extra = 0;             /* extra bits needed */

	  /* fixed and dynamic code tables */
	  this.lencode = null;          /* starting table for length/literal codes */
	  this.distcode = null;         /* starting table for distance codes */
	  this.lenbits = 0;           /* index bits for lencode */
	  this.distbits = 0;          /* index bits for distcode */

	  /* dynamic table building */
	  this.ncode = 0;             /* number of code length code lengths */
	  this.nlen = 0;              /* number of length code lengths */
	  this.ndist = 0;             /* number of distance code lengths */
	  this.have = 0;              /* number of code lengths in lens[] */
	  this.next = null;              /* next available space in codes[] */

	  this.lens = new utils.Buf16(320); /* temporary storage for code lengths */
	  this.work = new utils.Buf16(288); /* work area for code table building */

	  /*
	   because we don't have pointers in js, we use lencode and distcode directly
	   as buffers so we don't need codes
	  */
	  //this.codes = new utils.Buf32(ENOUGH);       /* space for code tables */
	  this.lendyn = null;              /* dynamic table for length/literal codes (JS specific) */
	  this.distdyn = null;             /* dynamic table for distance codes (JS specific) */
	  this.sane = 0;                   /* if false, allow invalid distance too far */
	  this.back = 0;                   /* bits back of last unprocessed length/lit */
	  this.was = 0;                    /* initial length of match */
	}

	function inflateResetKeep(strm) {
	  var state;

	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  strm.total_in = strm.total_out = state.total = 0;
	  strm.msg = ''; /*Z_NULL*/
	  if (state.wrap) {       /* to support ill-conceived Java test suite */
	    strm.adler = state.wrap & 1;
	  }
	  state.mode = HEAD;
	  state.last = 0;
	  state.havedict = 0;
	  state.dmax = 32768;
	  state.head = null/*Z_NULL*/;
	  state.hold = 0;
	  state.bits = 0;
	  //state.lencode = state.distcode = state.next = state.codes;
	  state.lencode = state.lendyn = new utils.Buf32(ENOUGH_LENS);
	  state.distcode = state.distdyn = new utils.Buf32(ENOUGH_DISTS);

	  state.sane = 1;
	  state.back = -1;
	  //Tracev((stderr, "inflate: reset\n"));
	  return Z_OK;
	}

	function inflateReset(strm) {
	  var state;

	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  state.wsize = 0;
	  state.whave = 0;
	  state.wnext = 0;
	  return inflateResetKeep(strm);

	}

	function inflateReset2(strm, windowBits) {
	  var wrap;
	  var state;

	  /* get the state */
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;

	  /* extract wrap request from windowBits parameter */
	  if (windowBits < 0) {
	    wrap = 0;
	    windowBits = -windowBits;
	  }
	  else {
	    wrap = (windowBits >> 4) + 1;
	    if (windowBits < 48) {
	      windowBits &= 15;
	    }
	  }

	  /* set number of window bits, free window if different */
	  if (windowBits && (windowBits < 8 || windowBits > 15)) {
	    return Z_STREAM_ERROR;
	  }
	  if (state.window !== null && state.wbits !== windowBits) {
	    state.window = null;
	  }

	  /* update state and reset the rest of it */
	  state.wrap = wrap;
	  state.wbits = windowBits;
	  return inflateReset(strm);
	}

	function inflateInit2(strm, windowBits) {
	  var ret;
	  var state;

	  if (!strm) { return Z_STREAM_ERROR; }
	  //strm.msg = Z_NULL;                 /* in case we return an error */

	  state = new InflateState();

	  //if (state === Z_NULL) return Z_MEM_ERROR;
	  //Tracev((stderr, "inflate: allocated\n"));
	  strm.state = state;
	  state.window = null/*Z_NULL*/;
	  ret = inflateReset2(strm, windowBits);
	  if (ret !== Z_OK) {
	    strm.state = null/*Z_NULL*/;
	  }
	  return ret;
	}

	function inflateInit(strm) {
	  return inflateInit2(strm, DEF_WBITS);
	}


	/*
	 Return state with length and distance decoding tables and index sizes set to
	 fixed code decoding.  Normally this returns fixed tables from inffixed.h.
	 If BUILDFIXED is defined, then instead this routine builds the tables the
	 first time it's called, and returns those tables the first time and
	 thereafter.  This reduces the size of the code by about 2K bytes, in
	 exchange for a little execution time.  However, BUILDFIXED should not be
	 used for threaded applications, since the rewriting of the tables and virgin
	 may not be thread-safe.
	 */
	var virgin = true;

	var lenfix, distfix; // We have no pointers in JS, so keep tables separate

	function fixedtables(state) {
	  /* build fixed huffman tables if first call (may not be thread safe) */
	  if (virgin) {
	    var sym;

	    lenfix = new utils.Buf32(512);
	    distfix = new utils.Buf32(32);

	    /* literal/length table */
	    sym = 0;
	    while (sym < 144) { state.lens[sym++] = 8; }
	    while (sym < 256) { state.lens[sym++] = 9; }
	    while (sym < 280) { state.lens[sym++] = 7; }
	    while (sym < 288) { state.lens[sym++] = 8; }

	    inflate_table(LENS,  state.lens, 0, 288, lenfix,   0, state.work, { bits: 9 });

	    /* distance table */
	    sym = 0;
	    while (sym < 32) { state.lens[sym++] = 5; }

	    inflate_table(DISTS, state.lens, 0, 32,   distfix, 0, state.work, { bits: 5 });

	    /* do this just once */
	    virgin = false;
	  }

	  state.lencode = lenfix;
	  state.lenbits = 9;
	  state.distcode = distfix;
	  state.distbits = 5;
	}


	/*
	 Update the window with the last wsize (normally 32K) bytes written before
	 returning.  If window does not exist yet, create it.  This is only called
	 when a window is already in use, or when output has been written during this
	 inflate call, but the end of the deflate stream has not been reached yet.
	 It is also called to create a window for dictionary data when a dictionary
	 is loaded.

	 Providing output buffers larger than 32K to inflate() should provide a speed
	 advantage, since only the last 32K of output is copied to the sliding window
	 upon return from inflate(), and since all distances after the first 32K of
	 output will fall in the output data, making match copies simpler and faster.
	 The advantage may be dependent on the size of the processor's data caches.
	 */
	function updatewindow(strm, src, end, copy) {
	  var dist;
	  var state = strm.state;

	  /* if it hasn't been done already, allocate space for the window */
	  if (state.window === null) {
	    state.wsize = 1 << state.wbits;
	    state.wnext = 0;
	    state.whave = 0;

	    state.window = new utils.Buf8(state.wsize);
	  }

	  /* copy state->wsize or less output bytes into the circular window */
	  if (copy >= state.wsize) {
	    utils.arraySet(state.window, src, end - state.wsize, state.wsize, 0);
	    state.wnext = 0;
	    state.whave = state.wsize;
	  }
	  else {
	    dist = state.wsize - state.wnext;
	    if (dist > copy) {
	      dist = copy;
	    }
	    //zmemcpy(state->window + state->wnext, end - copy, dist);
	    utils.arraySet(state.window, src, end - copy, dist, state.wnext);
	    copy -= dist;
	    if (copy) {
	      //zmemcpy(state->window, end - copy, copy);
	      utils.arraySet(state.window, src, end - copy, copy, 0);
	      state.wnext = copy;
	      state.whave = state.wsize;
	    }
	    else {
	      state.wnext += dist;
	      if (state.wnext === state.wsize) { state.wnext = 0; }
	      if (state.whave < state.wsize) { state.whave += dist; }
	    }
	  }
	  return 0;
	}

	function inflate(strm, flush) {
	  var state;
	  var input, output;          // input/output buffers
	  var next;                   /* next input INDEX */
	  var put;                    /* next output INDEX */
	  var have, left;             /* available input and output */
	  var hold;                   /* bit buffer */
	  var bits;                   /* bits in bit buffer */
	  var _in, _out;              /* save starting available input and output */
	  var copy;                   /* number of stored or match bytes to copy */
	  var from;                   /* where to copy match bytes from */
	  var from_source;
	  var here = 0;               /* current decoding table entry */
	  var here_bits, here_op, here_val; // paked "here" denormalized (JS specific)
	  //var last;                   /* parent table entry */
	  var last_bits, last_op, last_val; // paked "last" denormalized (JS specific)
	  var len;                    /* length to copy for repeats, bits to drop */
	  var ret;                    /* return code */
	  var hbuf = new utils.Buf8(4);    /* buffer for gzip header crc calculation */
	  var opts;

	  var n; // temporary var for NEED_BITS

	  var order = /* permutation of code lengths */
	    [ 16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15 ];


	  if (!strm || !strm.state || !strm.output ||
	      (!strm.input && strm.avail_in !== 0)) {
	    return Z_STREAM_ERROR;
	  }

	  state = strm.state;
	  if (state.mode === TYPE) { state.mode = TYPEDO; }    /* skip check */


	  //--- LOAD() ---
	  put = strm.next_out;
	  output = strm.output;
	  left = strm.avail_out;
	  next = strm.next_in;
	  input = strm.input;
	  have = strm.avail_in;
	  hold = state.hold;
	  bits = state.bits;
	  //---

	  _in = have;
	  _out = left;
	  ret = Z_OK;

	  inf_leave: // goto emulation
	  for (;;) {
	    switch (state.mode) {
	      case HEAD:
	        if (state.wrap === 0) {
	          state.mode = TYPEDO;
	          break;
	        }
	        //=== NEEDBITS(16);
	        while (bits < 16) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if ((state.wrap & 2) && hold === 0x8b1f) {  /* gzip header */
	          state.check = 0/*crc32(0L, Z_NULL, 0)*/;
	          //=== CRC2(state.check, hold);
	          hbuf[0] = hold & 0xff;
	          hbuf[1] = (hold >>> 8) & 0xff;
	          state.check = crc32(state.check, hbuf, 2, 0);
	          //===//

	          //=== INITBITS();
	          hold = 0;
	          bits = 0;
	          //===//
	          state.mode = FLAGS;
	          break;
	        }
	        state.flags = 0;           /* expect zlib header */
	        if (state.head) {
	          state.head.done = false;
	        }
	        if (!(state.wrap & 1) ||   /* check if zlib header allowed */
	          (((hold & 0xff)/*BITS(8)*/ << 8) + (hold >> 8)) % 31) {
	          strm.msg = 'incorrect header check';
	          state.mode = BAD;
	          break;
	        }
	        if ((hold & 0x0f)/*BITS(4)*/ !== Z_DEFLATED) {
	          strm.msg = 'unknown compression method';
	          state.mode = BAD;
	          break;
	        }
	        //--- DROPBITS(4) ---//
	        hold >>>= 4;
	        bits -= 4;
	        //---//
	        len = (hold & 0x0f)/*BITS(4)*/ + 8;
	        if (state.wbits === 0) {
	          state.wbits = len;
	        }
	        else if (len > state.wbits) {
	          strm.msg = 'invalid window size';
	          state.mode = BAD;
	          break;
	        }
	        state.dmax = 1 << len;
	        //Tracev((stderr, "inflate:   zlib header ok\n"));
	        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
	        state.mode = hold & 0x200 ? DICTID : TYPE;
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        break;
	      case FLAGS:
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.flags = hold;
	        if ((state.flags & 0xff) !== Z_DEFLATED) {
	          strm.msg = 'unknown compression method';
	          state.mode = BAD;
	          break;
	        }
	        if (state.flags & 0xe000) {
	          strm.msg = 'unknown header flags set';
	          state.mode = BAD;
	          break;
	        }
	        if (state.head) {
	          state.head.text = ((hold >> 8) & 1);
	        }
	        if (state.flags & 0x0200) {
	          //=== CRC2(state.check, hold);
	          hbuf[0] = hold & 0xff;
	          hbuf[1] = (hold >>> 8) & 0xff;
	          state.check = crc32(state.check, hbuf, 2, 0);
	          //===//
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = TIME;
	        /* falls through */
	      case TIME:
	        //=== NEEDBITS(32); */
	        while (bits < 32) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (state.head) {
	          state.head.time = hold;
	        }
	        if (state.flags & 0x0200) {
	          //=== CRC4(state.check, hold)
	          hbuf[0] = hold & 0xff;
	          hbuf[1] = (hold >>> 8) & 0xff;
	          hbuf[2] = (hold >>> 16) & 0xff;
	          hbuf[3] = (hold >>> 24) & 0xff;
	          state.check = crc32(state.check, hbuf, 4, 0);
	          //===
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = OS;
	        /* falls through */
	      case OS:
	        //=== NEEDBITS(16); */
	        while (bits < 16) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if (state.head) {
	          state.head.xflags = (hold & 0xff);
	          state.head.os = (hold >> 8);
	        }
	        if (state.flags & 0x0200) {
	          //=== CRC2(state.check, hold);
	          hbuf[0] = hold & 0xff;
	          hbuf[1] = (hold >>> 8) & 0xff;
	          state.check = crc32(state.check, hbuf, 2, 0);
	          //===//
	        }
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = EXLEN;
	        /* falls through */
	      case EXLEN:
	        if (state.flags & 0x0400) {
	          //=== NEEDBITS(16); */
	          while (bits < 16) {
	            if (have === 0) { break inf_leave; }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          state.length = hold;
	          if (state.head) {
	            state.head.extra_len = hold;
	          }
	          if (state.flags & 0x0200) {
	            //=== CRC2(state.check, hold);
	            hbuf[0] = hold & 0xff;
	            hbuf[1] = (hold >>> 8) & 0xff;
	            state.check = crc32(state.check, hbuf, 2, 0);
	            //===//
	          }
	          //=== INITBITS();
	          hold = 0;
	          bits = 0;
	          //===//
	        }
	        else if (state.head) {
	          state.head.extra = null/*Z_NULL*/;
	        }
	        state.mode = EXTRA;
	        /* falls through */
	      case EXTRA:
	        if (state.flags & 0x0400) {
	          copy = state.length;
	          if (copy > have) { copy = have; }
	          if (copy) {
	            if (state.head) {
	              len = state.head.extra_len - state.length;
	              if (!state.head.extra) {
	                // Use untyped array for more convenient processing later
	                state.head.extra = new Array(state.head.extra_len);
	              }
	              utils.arraySet(
	                state.head.extra,
	                input,
	                next,
	                // extra field is limited to 65536 bytes
	                // - no need for additional size check
	                copy,
	                /*len + copy > state.head.extra_max - len ? state.head.extra_max : copy,*/
	                len
	              );
	              //zmemcpy(state.head.extra + len, next,
	              //        len + copy > state.head.extra_max ?
	              //        state.head.extra_max - len : copy);
	            }
	            if (state.flags & 0x0200) {
	              state.check = crc32(state.check, input, copy, next);
	            }
	            have -= copy;
	            next += copy;
	            state.length -= copy;
	          }
	          if (state.length) { break inf_leave; }
	        }
	        state.length = 0;
	        state.mode = NAME;
	        /* falls through */
	      case NAME:
	        if (state.flags & 0x0800) {
	          if (have === 0) { break inf_leave; }
	          copy = 0;
	          do {
	            // TODO: 2 or 1 bytes?
	            len = input[next + copy++];
	            /* use constant limit because in js we should not preallocate memory */
	            if (state.head && len &&
	                (state.length < 65536 /*state.head.name_max*/)) {
	              state.head.name += String.fromCharCode(len);
	            }
	          } while (len && copy < have);

	          if (state.flags & 0x0200) {
	            state.check = crc32(state.check, input, copy, next);
	          }
	          have -= copy;
	          next += copy;
	          if (len) { break inf_leave; }
	        }
	        else if (state.head) {
	          state.head.name = null;
	        }
	        state.length = 0;
	        state.mode = COMMENT;
	        /* falls through */
	      case COMMENT:
	        if (state.flags & 0x1000) {
	          if (have === 0) { break inf_leave; }
	          copy = 0;
	          do {
	            len = input[next + copy++];
	            /* use constant limit because in js we should not preallocate memory */
	            if (state.head && len &&
	                (state.length < 65536 /*state.head.comm_max*/)) {
	              state.head.comment += String.fromCharCode(len);
	            }
	          } while (len && copy < have);
	          if (state.flags & 0x0200) {
	            state.check = crc32(state.check, input, copy, next);
	          }
	          have -= copy;
	          next += copy;
	          if (len) { break inf_leave; }
	        }
	        else if (state.head) {
	          state.head.comment = null;
	        }
	        state.mode = HCRC;
	        /* falls through */
	      case HCRC:
	        if (state.flags & 0x0200) {
	          //=== NEEDBITS(16); */
	          while (bits < 16) {
	            if (have === 0) { break inf_leave; }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          if (hold !== (state.check & 0xffff)) {
	            strm.msg = 'header crc mismatch';
	            state.mode = BAD;
	            break;
	          }
	          //=== INITBITS();
	          hold = 0;
	          bits = 0;
	          //===//
	        }
	        if (state.head) {
	          state.head.hcrc = ((state.flags >> 9) & 1);
	          state.head.done = true;
	        }
	        strm.adler = state.check = 0;
	        state.mode = TYPE;
	        break;
	      case DICTID:
	        //=== NEEDBITS(32); */
	        while (bits < 32) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        strm.adler = state.check = zswap32(hold);
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = DICT;
	        /* falls through */
	      case DICT:
	        if (state.havedict === 0) {
	          //--- RESTORE() ---
	          strm.next_out = put;
	          strm.avail_out = left;
	          strm.next_in = next;
	          strm.avail_in = have;
	          state.hold = hold;
	          state.bits = bits;
	          //---
	          return Z_NEED_DICT;
	        }
	        strm.adler = state.check = 1/*adler32(0L, Z_NULL, 0)*/;
	        state.mode = TYPE;
	        /* falls through */
	      case TYPE:
	        if (flush === Z_BLOCK || flush === Z_TREES) { break inf_leave; }
	        /* falls through */
	      case TYPEDO:
	        if (state.last) {
	          //--- BYTEBITS() ---//
	          hold >>>= bits & 7;
	          bits -= bits & 7;
	          //---//
	          state.mode = CHECK;
	          break;
	        }
	        //=== NEEDBITS(3); */
	        while (bits < 3) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.last = (hold & 0x01)/*BITS(1)*/;
	        //--- DROPBITS(1) ---//
	        hold >>>= 1;
	        bits -= 1;
	        //---//

	        switch ((hold & 0x03)/*BITS(2)*/) {
	          case 0:                             /* stored block */
	            //Tracev((stderr, "inflate:     stored block%s\n",
	            //        state.last ? " (last)" : ""));
	            state.mode = STORED;
	            break;
	          case 1:                             /* fixed block */
	            fixedtables(state);
	            //Tracev((stderr, "inflate:     fixed codes block%s\n",
	            //        state.last ? " (last)" : ""));
	            state.mode = LEN_;             /* decode codes */
	            if (flush === Z_TREES) {
	              //--- DROPBITS(2) ---//
	              hold >>>= 2;
	              bits -= 2;
	              //---//
	              break inf_leave;
	            }
	            break;
	          case 2:                             /* dynamic block */
	            //Tracev((stderr, "inflate:     dynamic codes block%s\n",
	            //        state.last ? " (last)" : ""));
	            state.mode = TABLE;
	            break;
	          case 3:
	            strm.msg = 'invalid block type';
	            state.mode = BAD;
	        }
	        //--- DROPBITS(2) ---//
	        hold >>>= 2;
	        bits -= 2;
	        //---//
	        break;
	      case STORED:
	        //--- BYTEBITS() ---// /* go to byte boundary */
	        hold >>>= bits & 7;
	        bits -= bits & 7;
	        //---//
	        //=== NEEDBITS(32); */
	        while (bits < 32) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        if ((hold & 0xffff) !== ((hold >>> 16) ^ 0xffff)) {
	          strm.msg = 'invalid stored block lengths';
	          state.mode = BAD;
	          break;
	        }
	        state.length = hold & 0xffff;
	        //Tracev((stderr, "inflate:       stored length %u\n",
	        //        state.length));
	        //=== INITBITS();
	        hold = 0;
	        bits = 0;
	        //===//
	        state.mode = COPY_;
	        if (flush === Z_TREES) { break inf_leave; }
	        /* falls through */
	      case COPY_:
	        state.mode = COPY;
	        /* falls through */
	      case COPY:
	        copy = state.length;
	        if (copy) {
	          if (copy > have) { copy = have; }
	          if (copy > left) { copy = left; }
	          if (copy === 0) { break inf_leave; }
	          //--- zmemcpy(put, next, copy); ---
	          utils.arraySet(output, input, next, copy, put);
	          //---//
	          have -= copy;
	          next += copy;
	          left -= copy;
	          put += copy;
	          state.length -= copy;
	          break;
	        }
	        //Tracev((stderr, "inflate:       stored end\n"));
	        state.mode = TYPE;
	        break;
	      case TABLE:
	        //=== NEEDBITS(14); */
	        while (bits < 14) {
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	        }
	        //===//
	        state.nlen = (hold & 0x1f)/*BITS(5)*/ + 257;
	        //--- DROPBITS(5) ---//
	        hold >>>= 5;
	        bits -= 5;
	        //---//
	        state.ndist = (hold & 0x1f)/*BITS(5)*/ + 1;
	        //--- DROPBITS(5) ---//
	        hold >>>= 5;
	        bits -= 5;
	        //---//
	        state.ncode = (hold & 0x0f)/*BITS(4)*/ + 4;
	        //--- DROPBITS(4) ---//
	        hold >>>= 4;
	        bits -= 4;
	        //---//
	//#ifndef PKZIP_BUG_WORKAROUND
	        if (state.nlen > 286 || state.ndist > 30) {
	          strm.msg = 'too many length or distance symbols';
	          state.mode = BAD;
	          break;
	        }
	//#endif
	        //Tracev((stderr, "inflate:       table sizes ok\n"));
	        state.have = 0;
	        state.mode = LENLENS;
	        /* falls through */
	      case LENLENS:
	        while (state.have < state.ncode) {
	          //=== NEEDBITS(3);
	          while (bits < 3) {
	            if (have === 0) { break inf_leave; }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          state.lens[order[state.have++]] = (hold & 0x07);//BITS(3);
	          //--- DROPBITS(3) ---//
	          hold >>>= 3;
	          bits -= 3;
	          //---//
	        }
	        while (state.have < 19) {
	          state.lens[order[state.have++]] = 0;
	        }
	        // We have separate tables & no pointers. 2 commented lines below not needed.
	        //state.next = state.codes;
	        //state.lencode = state.next;
	        // Switch to use dynamic table
	        state.lencode = state.lendyn;
	        state.lenbits = 7;

	        opts = { bits: state.lenbits };
	        ret = inflate_table(CODES, state.lens, 0, 19, state.lencode, 0, state.work, opts);
	        state.lenbits = opts.bits;

	        if (ret) {
	          strm.msg = 'invalid code lengths set';
	          state.mode = BAD;
	          break;
	        }
	        //Tracev((stderr, "inflate:       code lengths ok\n"));
	        state.have = 0;
	        state.mode = CODELENS;
	        /* falls through */
	      case CODELENS:
	        while (state.have < state.nlen + state.ndist) {
	          for (;;) {
	            here = state.lencode[hold & ((1 << state.lenbits) - 1)];/*BITS(state.lenbits)*/
	            here_bits = here >>> 24;
	            here_op = (here >>> 16) & 0xff;
	            here_val = here & 0xffff;

	            if ((here_bits) <= bits) { break; }
	            //--- PULLBYTE() ---//
	            if (have === 0) { break inf_leave; }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	            //---//
	          }
	          if (here_val < 16) {
	            //--- DROPBITS(here.bits) ---//
	            hold >>>= here_bits;
	            bits -= here_bits;
	            //---//
	            state.lens[state.have++] = here_val;
	          }
	          else {
	            if (here_val === 16) {
	              //=== NEEDBITS(here.bits + 2);
	              n = here_bits + 2;
	              while (bits < n) {
	                if (have === 0) { break inf_leave; }
	                have--;
	                hold += input[next++] << bits;
	                bits += 8;
	              }
	              //===//
	              //--- DROPBITS(here.bits) ---//
	              hold >>>= here_bits;
	              bits -= here_bits;
	              //---//
	              if (state.have === 0) {
	                strm.msg = 'invalid bit length repeat';
	                state.mode = BAD;
	                break;
	              }
	              len = state.lens[state.have - 1];
	              copy = 3 + (hold & 0x03);//BITS(2);
	              //--- DROPBITS(2) ---//
	              hold >>>= 2;
	              bits -= 2;
	              //---//
	            }
	            else if (here_val === 17) {
	              //=== NEEDBITS(here.bits + 3);
	              n = here_bits + 3;
	              while (bits < n) {
	                if (have === 0) { break inf_leave; }
	                have--;
	                hold += input[next++] << bits;
	                bits += 8;
	              }
	              //===//
	              //--- DROPBITS(here.bits) ---//
	              hold >>>= here_bits;
	              bits -= here_bits;
	              //---//
	              len = 0;
	              copy = 3 + (hold & 0x07);//BITS(3);
	              //--- DROPBITS(3) ---//
	              hold >>>= 3;
	              bits -= 3;
	              //---//
	            }
	            else {
	              //=== NEEDBITS(here.bits + 7);
	              n = here_bits + 7;
	              while (bits < n) {
	                if (have === 0) { break inf_leave; }
	                have--;
	                hold += input[next++] << bits;
	                bits += 8;
	              }
	              //===//
	              //--- DROPBITS(here.bits) ---//
	              hold >>>= here_bits;
	              bits -= here_bits;
	              //---//
	              len = 0;
	              copy = 11 + (hold & 0x7f);//BITS(7);
	              //--- DROPBITS(7) ---//
	              hold >>>= 7;
	              bits -= 7;
	              //---//
	            }
	            if (state.have + copy > state.nlen + state.ndist) {
	              strm.msg = 'invalid bit length repeat';
	              state.mode = BAD;
	              break;
	            }
	            while (copy--) {
	              state.lens[state.have++] = len;
	            }
	          }
	        }

	        /* handle error breaks in while */
	        if (state.mode === BAD) { break; }

	        /* check for end-of-block code (better have one) */
	        if (state.lens[256] === 0) {
	          strm.msg = 'invalid code -- missing end-of-block';
	          state.mode = BAD;
	          break;
	        }

	        /* build code tables -- note: do not change the lenbits or distbits
	           values here (9 and 6) without reading the comments in inftrees.h
	           concerning the ENOUGH constants, which depend on those values */
	        state.lenbits = 9;

	        opts = { bits: state.lenbits };
	        ret = inflate_table(LENS, state.lens, 0, state.nlen, state.lencode, 0, state.work, opts);
	        // We have separate tables & no pointers. 2 commented lines below not needed.
	        // state.next_index = opts.table_index;
	        state.lenbits = opts.bits;
	        // state.lencode = state.next;

	        if (ret) {
	          strm.msg = 'invalid literal/lengths set';
	          state.mode = BAD;
	          break;
	        }

	        state.distbits = 6;
	        //state.distcode.copy(state.codes);
	        // Switch to use dynamic table
	        state.distcode = state.distdyn;
	        opts = { bits: state.distbits };
	        ret = inflate_table(DISTS, state.lens, state.nlen, state.ndist, state.distcode, 0, state.work, opts);
	        // We have separate tables & no pointers. 2 commented lines below not needed.
	        // state.next_index = opts.table_index;
	        state.distbits = opts.bits;
	        // state.distcode = state.next;

	        if (ret) {
	          strm.msg = 'invalid distances set';
	          state.mode = BAD;
	          break;
	        }
	        //Tracev((stderr, 'inflate:       codes ok\n'));
	        state.mode = LEN_;
	        if (flush === Z_TREES) { break inf_leave; }
	        /* falls through */
	      case LEN_:
	        state.mode = LEN;
	        /* falls through */
	      case LEN:
	        if (have >= 6 && left >= 258) {
	          //--- RESTORE() ---
	          strm.next_out = put;
	          strm.avail_out = left;
	          strm.next_in = next;
	          strm.avail_in = have;
	          state.hold = hold;
	          state.bits = bits;
	          //---
	          inflate_fast(strm, _out);
	          //--- LOAD() ---
	          put = strm.next_out;
	          output = strm.output;
	          left = strm.avail_out;
	          next = strm.next_in;
	          input = strm.input;
	          have = strm.avail_in;
	          hold = state.hold;
	          bits = state.bits;
	          //---

	          if (state.mode === TYPE) {
	            state.back = -1;
	          }
	          break;
	        }
	        state.back = 0;
	        for (;;) {
	          here = state.lencode[hold & ((1 << state.lenbits) - 1)];  /*BITS(state.lenbits)*/
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if (here_bits <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        if (here_op && (here_op & 0xf0) === 0) {
	          last_bits = here_bits;
	          last_op = here_op;
	          last_val = here_val;
	          for (;;) {
	            here = state.lencode[last_val +
	                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
	            here_bits = here >>> 24;
	            here_op = (here >>> 16) & 0xff;
	            here_val = here & 0xffff;

	            if ((last_bits + here_bits) <= bits) { break; }
	            //--- PULLBYTE() ---//
	            if (have === 0) { break inf_leave; }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	            //---//
	          }
	          //--- DROPBITS(last.bits) ---//
	          hold >>>= last_bits;
	          bits -= last_bits;
	          //---//
	          state.back += last_bits;
	        }
	        //--- DROPBITS(here.bits) ---//
	        hold >>>= here_bits;
	        bits -= here_bits;
	        //---//
	        state.back += here_bits;
	        state.length = here_val;
	        if (here_op === 0) {
	          //Tracevv((stderr, here.val >= 0x20 && here.val < 0x7f ?
	          //        "inflate:         literal '%c'\n" :
	          //        "inflate:         literal 0x%02x\n", here.val));
	          state.mode = LIT;
	          break;
	        }
	        if (here_op & 32) {
	          //Tracevv((stderr, "inflate:         end of block\n"));
	          state.back = -1;
	          state.mode = TYPE;
	          break;
	        }
	        if (here_op & 64) {
	          strm.msg = 'invalid literal/length code';
	          state.mode = BAD;
	          break;
	        }
	        state.extra = here_op & 15;
	        state.mode = LENEXT;
	        /* falls through */
	      case LENEXT:
	        if (state.extra) {
	          //=== NEEDBITS(state.extra);
	          n = state.extra;
	          while (bits < n) {
	            if (have === 0) { break inf_leave; }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          state.length += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
	          //--- DROPBITS(state.extra) ---//
	          hold >>>= state.extra;
	          bits -= state.extra;
	          //---//
	          state.back += state.extra;
	        }
	        //Tracevv((stderr, "inflate:         length %u\n", state.length));
	        state.was = state.length;
	        state.mode = DIST;
	        /* falls through */
	      case DIST:
	        for (;;) {
	          here = state.distcode[hold & ((1 << state.distbits) - 1)];/*BITS(state.distbits)*/
	          here_bits = here >>> 24;
	          here_op = (here >>> 16) & 0xff;
	          here_val = here & 0xffff;

	          if ((here_bits) <= bits) { break; }
	          //--- PULLBYTE() ---//
	          if (have === 0) { break inf_leave; }
	          have--;
	          hold += input[next++] << bits;
	          bits += 8;
	          //---//
	        }
	        if ((here_op & 0xf0) === 0) {
	          last_bits = here_bits;
	          last_op = here_op;
	          last_val = here_val;
	          for (;;) {
	            here = state.distcode[last_val +
	                    ((hold & ((1 << (last_bits + last_op)) - 1))/*BITS(last.bits + last.op)*/ >> last_bits)];
	            here_bits = here >>> 24;
	            here_op = (here >>> 16) & 0xff;
	            here_val = here & 0xffff;

	            if ((last_bits + here_bits) <= bits) { break; }
	            //--- PULLBYTE() ---//
	            if (have === 0) { break inf_leave; }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	            //---//
	          }
	          //--- DROPBITS(last.bits) ---//
	          hold >>>= last_bits;
	          bits -= last_bits;
	          //---//
	          state.back += last_bits;
	        }
	        //--- DROPBITS(here.bits) ---//
	        hold >>>= here_bits;
	        bits -= here_bits;
	        //---//
	        state.back += here_bits;
	        if (here_op & 64) {
	          strm.msg = 'invalid distance code';
	          state.mode = BAD;
	          break;
	        }
	        state.offset = here_val;
	        state.extra = (here_op) & 15;
	        state.mode = DISTEXT;
	        /* falls through */
	      case DISTEXT:
	        if (state.extra) {
	          //=== NEEDBITS(state.extra);
	          n = state.extra;
	          while (bits < n) {
	            if (have === 0) { break inf_leave; }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          state.offset += hold & ((1 << state.extra) - 1)/*BITS(state.extra)*/;
	          //--- DROPBITS(state.extra) ---//
	          hold >>>= state.extra;
	          bits -= state.extra;
	          //---//
	          state.back += state.extra;
	        }
	//#ifdef INFLATE_STRICT
	        if (state.offset > state.dmax) {
	          strm.msg = 'invalid distance too far back';
	          state.mode = BAD;
	          break;
	        }
	//#endif
	        //Tracevv((stderr, "inflate:         distance %u\n", state.offset));
	        state.mode = MATCH;
	        /* falls through */
	      case MATCH:
	        if (left === 0) { break inf_leave; }
	        copy = _out - left;
	        if (state.offset > copy) {         /* copy from window */
	          copy = state.offset - copy;
	          if (copy > state.whave) {
	            if (state.sane) {
	              strm.msg = 'invalid distance too far back';
	              state.mode = BAD;
	              break;
	            }
	// (!) This block is disabled in zlib defaults,
	// don't enable it for binary compatibility
	//#ifdef INFLATE_ALLOW_INVALID_DISTANCE_TOOFAR_ARRR
	//          Trace((stderr, "inflate.c too far\n"));
	//          copy -= state.whave;
	//          if (copy > state.length) { copy = state.length; }
	//          if (copy > left) { copy = left; }
	//          left -= copy;
	//          state.length -= copy;
	//          do {
	//            output[put++] = 0;
	//          } while (--copy);
	//          if (state.length === 0) { state.mode = LEN; }
	//          break;
	//#endif
	          }
	          if (copy > state.wnext) {
	            copy -= state.wnext;
	            from = state.wsize - copy;
	          }
	          else {
	            from = state.wnext - copy;
	          }
	          if (copy > state.length) { copy = state.length; }
	          from_source = state.window;
	        }
	        else {                              /* copy from output */
	          from_source = output;
	          from = put - state.offset;
	          copy = state.length;
	        }
	        if (copy > left) { copy = left; }
	        left -= copy;
	        state.length -= copy;
	        do {
	          output[put++] = from_source[from++];
	        } while (--copy);
	        if (state.length === 0) { state.mode = LEN; }
	        break;
	      case LIT:
	        if (left === 0) { break inf_leave; }
	        output[put++] = state.length;
	        left--;
	        state.mode = LEN;
	        break;
	      case CHECK:
	        if (state.wrap) {
	          //=== NEEDBITS(32);
	          while (bits < 32) {
	            if (have === 0) { break inf_leave; }
	            have--;
	            // Use '|' instead of '+' to make sure that result is signed
	            hold |= input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          _out -= left;
	          strm.total_out += _out;
	          state.total += _out;
	          if (_out) {
	            strm.adler = state.check =
	                /*UPDATE(state.check, put - _out, _out);*/
	                (state.flags ? crc32(state.check, output, _out, put - _out) : adler32(state.check, output, _out, put - _out));

	          }
	          _out = left;
	          // NB: crc32 stored as signed 32-bit int, zswap32 returns signed too
	          if ((state.flags ? hold : zswap32(hold)) !== state.check) {
	            strm.msg = 'incorrect data check';
	            state.mode = BAD;
	            break;
	          }
	          //=== INITBITS();
	          hold = 0;
	          bits = 0;
	          //===//
	          //Tracev((stderr, "inflate:   check matches trailer\n"));
	        }
	        state.mode = LENGTH;
	        /* falls through */
	      case LENGTH:
	        if (state.wrap && state.flags) {
	          //=== NEEDBITS(32);
	          while (bits < 32) {
	            if (have === 0) { break inf_leave; }
	            have--;
	            hold += input[next++] << bits;
	            bits += 8;
	          }
	          //===//
	          if (hold !== (state.total & 0xffffffff)) {
	            strm.msg = 'incorrect length check';
	            state.mode = BAD;
	            break;
	          }
	          //=== INITBITS();
	          hold = 0;
	          bits = 0;
	          //===//
	          //Tracev((stderr, "inflate:   length matches trailer\n"));
	        }
	        state.mode = DONE;
	        /* falls through */
	      case DONE:
	        ret = Z_STREAM_END;
	        break inf_leave;
	      case BAD:
	        ret = Z_DATA_ERROR;
	        break inf_leave;
	      case MEM:
	        return Z_MEM_ERROR;
	      case SYNC:
	        /* falls through */
	      default:
	        return Z_STREAM_ERROR;
	    }
	  }

	  // inf_leave <- here is real place for "goto inf_leave", emulated via "break inf_leave"

	  /*
	     Return from inflate(), updating the total counts and the check value.
	     If there was no progress during the inflate() call, return a buffer
	     error.  Call updatewindow() to create and/or update the window state.
	     Note: a memory error from inflate() is non-recoverable.
	   */

	  //--- RESTORE() ---
	  strm.next_out = put;
	  strm.avail_out = left;
	  strm.next_in = next;
	  strm.avail_in = have;
	  state.hold = hold;
	  state.bits = bits;
	  //---

	  if (state.wsize || (_out !== strm.avail_out && state.mode < BAD &&
	                      (state.mode < CHECK || flush !== Z_FINISH))) {
	    if (updatewindow(strm, strm.output, strm.next_out, _out - strm.avail_out)) ;
	  }
	  _in -= strm.avail_in;
	  _out -= strm.avail_out;
	  strm.total_in += _in;
	  strm.total_out += _out;
	  state.total += _out;
	  if (state.wrap && _out) {
	    strm.adler = state.check = /*UPDATE(state.check, strm.next_out - _out, _out);*/
	      (state.flags ? crc32(state.check, output, _out, strm.next_out - _out) : adler32(state.check, output, _out, strm.next_out - _out));
	  }
	  strm.data_type = state.bits + (state.last ? 64 : 0) +
	                    (state.mode === TYPE ? 128 : 0) +
	                    (state.mode === LEN_ || state.mode === COPY_ ? 256 : 0);
	  if (((_in === 0 && _out === 0) || flush === Z_FINISH) && ret === Z_OK) {
	    ret = Z_BUF_ERROR;
	  }
	  return ret;
	}

	function inflateEnd(strm) {

	  if (!strm || !strm.state /*|| strm->zfree == (free_func)0*/) {
	    return Z_STREAM_ERROR;
	  }

	  var state = strm.state;
	  if (state.window) {
	    state.window = null;
	  }
	  strm.state = null;
	  return Z_OK;
	}

	function inflateGetHeader(strm, head) {
	  var state;

	  /* check state */
	  if (!strm || !strm.state) { return Z_STREAM_ERROR; }
	  state = strm.state;
	  if ((state.wrap & 2) === 0) { return Z_STREAM_ERROR; }

	  /* save header structure */
	  state.head = head;
	  head.done = false;
	  return Z_OK;
	}

	function inflateSetDictionary(strm, dictionary) {
	  var dictLength = dictionary.length;

	  var state;
	  var dictid;
	  var ret;

	  /* check state */
	  if (!strm /* == Z_NULL */ || !strm.state /* == Z_NULL */) { return Z_STREAM_ERROR; }
	  state = strm.state;

	  if (state.wrap !== 0 && state.mode !== DICT) {
	    return Z_STREAM_ERROR;
	  }

	  /* check for correct dictionary identifier */
	  if (state.mode === DICT) {
	    dictid = 1; /* adler32(0, null, 0)*/
	    /* dictid = adler32(dictid, dictionary, dictLength); */
	    dictid = adler32(dictid, dictionary, dictLength, 0);
	    if (dictid !== state.check) {
	      return Z_DATA_ERROR;
	    }
	  }
	  /* copy dictionary to window using updatewindow(), which will amend the
	   existing dictionary if appropriate */
	  ret = updatewindow(strm, dictionary, dictLength, dictLength);
	  if (ret) {
	    state.mode = MEM;
	    return Z_MEM_ERROR;
	  }
	  state.havedict = 1;
	  // Tracev((stderr, "inflate:   dictionary set\n"));
	  return Z_OK;
	}

	exports.inflateReset = inflateReset;
	exports.inflateReset2 = inflateReset2;
	exports.inflateResetKeep = inflateResetKeep;
	exports.inflateInit = inflateInit;
	exports.inflateInit2 = inflateInit2;
	exports.inflate = inflate;
	exports.inflateEnd = inflateEnd;
	exports.inflateGetHeader = inflateGetHeader;
	exports.inflateSetDictionary = inflateSetDictionary;
	exports.inflateInfo = 'pako inflate (from Nodeca project)';

	/* Not implemented
	exports.inflateCopy = inflateCopy;
	exports.inflateGetDictionary = inflateGetDictionary;
	exports.inflateMark = inflateMark;
	exports.inflatePrime = inflatePrime;
	exports.inflateSync = inflateSync;
	exports.inflateSyncPoint = inflateSyncPoint;
	exports.inflateUndermine = inflateUndermine;
	*/

	},{"../utils/common":52,"./adler32":53,"./crc32":55,"./inffast":57,"./inftrees":59}],59:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	var utils = require('../utils/common');

	var MAXBITS = 15;
	var ENOUGH_LENS = 852;
	var ENOUGH_DISTS = 592;
	//var ENOUGH = (ENOUGH_LENS+ENOUGH_DISTS);

	var CODES = 0;
	var LENS = 1;
	var DISTS = 2;

	var lbase = [ /* Length codes 257..285 base */
	  3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31,
	  35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0
	];

	var lext = [ /* Length codes 257..285 extra */
	  16, 16, 16, 16, 16, 16, 16, 16, 17, 17, 17, 17, 18, 18, 18, 18,
	  19, 19, 19, 19, 20, 20, 20, 20, 21, 21, 21, 21, 16, 72, 78
	];

	var dbase = [ /* Distance codes 0..29 base */
	  1, 2, 3, 4, 5, 7, 9, 13, 17, 25, 33, 49, 65, 97, 129, 193,
	  257, 385, 513, 769, 1025, 1537, 2049, 3073, 4097, 6145,
	  8193, 12289, 16385, 24577, 0, 0
	];

	var dext = [ /* Distance codes 0..29 extra */
	  16, 16, 16, 16, 17, 17, 18, 18, 19, 19, 20, 20, 21, 21, 22, 22,
	  23, 23, 24, 24, 25, 25, 26, 26, 27, 27,
	  28, 28, 29, 29, 64, 64
	];

	module.exports = function inflate_table(type, lens, lens_index, codes, table, table_index, work, opts)
	{
	  var bits = opts.bits;
	      //here = opts.here; /* table entry for duplication */

	  var len = 0;               /* a code's length in bits */
	  var sym = 0;               /* index of code symbols */
	  var min = 0, max = 0;          /* minimum and maximum code lengths */
	  var root = 0;              /* number of index bits for root table */
	  var curr = 0;              /* number of index bits for current table */
	  var drop = 0;              /* code bits to drop for sub-table */
	  var left = 0;                   /* number of prefix codes available */
	  var used = 0;              /* code entries in table used */
	  var huff = 0;              /* Huffman code */
	  var incr;              /* for incrementing code, index */
	  var fill;              /* index for replicating entries */
	  var low;               /* low bits for current root entry */
	  var mask;              /* mask for low root bits */
	  var next;             /* next available space in table */
	  var base = null;     /* base value table to use */
	  var base_index = 0;
	//  var shoextra;    /* extra bits table to use */
	  var end;                    /* use base and extra for symbol > end */
	  var count = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];    /* number of codes of each length */
	  var offs = new utils.Buf16(MAXBITS + 1); //[MAXBITS+1];     /* offsets in table for each length */
	  var extra = null;
	  var extra_index = 0;

	  var here_bits, here_op, here_val;

	  /*
	   Process a set of code lengths to create a canonical Huffman code.  The
	   code lengths are lens[0..codes-1].  Each length corresponds to the
	   symbols 0..codes-1.  The Huffman code is generated by first sorting the
	   symbols by length from short to long, and retaining the symbol order
	   for codes with equal lengths.  Then the code starts with all zero bits
	   for the first code of the shortest length, and the codes are integer
	   increments for the same length, and zeros are appended as the length
	   increases.  For the deflate format, these bits are stored backwards
	   from their more natural integer increment ordering, and so when the
	   decoding tables are built in the large loop below, the integer codes
	   are incremented backwards.

	   This routine assumes, but does not check, that all of the entries in
	   lens[] are in the range 0..MAXBITS.  The caller must assure this.
	   1..MAXBITS is interpreted as that code length.  zero means that that
	   symbol does not occur in this code.

	   The codes are sorted by computing a count of codes for each length,
	   creating from that a table of starting indices for each length in the
	   sorted table, and then entering the symbols in order in the sorted
	   table.  The sorted table is work[], with that space being provided by
	   the caller.

	   The length counts are used for other purposes as well, i.e. finding
	   the minimum and maximum length codes, determining if there are any
	   codes at all, checking for a valid set of lengths, and looking ahead
	   at length counts to determine sub-table sizes when building the
	   decoding tables.
	   */

	  /* accumulate lengths for codes (assumes lens[] all in 0..MAXBITS) */
	  for (len = 0; len <= MAXBITS; len++) {
	    count[len] = 0;
	  }
	  for (sym = 0; sym < codes; sym++) {
	    count[lens[lens_index + sym]]++;
	  }

	  /* bound code lengths, force root to be within code lengths */
	  root = bits;
	  for (max = MAXBITS; max >= 1; max--) {
	    if (count[max] !== 0) { break; }
	  }
	  if (root > max) {
	    root = max;
	  }
	  if (max === 0) {                     /* no symbols to code at all */
	    //table.op[opts.table_index] = 64;  //here.op = (var char)64;    /* invalid code marker */
	    //table.bits[opts.table_index] = 1;   //here.bits = (var char)1;
	    //table.val[opts.table_index++] = 0;   //here.val = (var short)0;
	    table[table_index++] = (1 << 24) | (64 << 16) | 0;


	    //table.op[opts.table_index] = 64;
	    //table.bits[opts.table_index] = 1;
	    //table.val[opts.table_index++] = 0;
	    table[table_index++] = (1 << 24) | (64 << 16) | 0;

	    opts.bits = 1;
	    return 0;     /* no symbols, but wait for decoding to report error */
	  }
	  for (min = 1; min < max; min++) {
	    if (count[min] !== 0) { break; }
	  }
	  if (root < min) {
	    root = min;
	  }

	  /* check for an over-subscribed or incomplete set of lengths */
	  left = 1;
	  for (len = 1; len <= MAXBITS; len++) {
	    left <<= 1;
	    left -= count[len];
	    if (left < 0) {
	      return -1;
	    }        /* over-subscribed */
	  }
	  if (left > 0 && (type === CODES || max !== 1)) {
	    return -1;                      /* incomplete set */
	  }

	  /* generate offsets into symbol table for each length for sorting */
	  offs[1] = 0;
	  for (len = 1; len < MAXBITS; len++) {
	    offs[len + 1] = offs[len] + count[len];
	  }

	  /* sort symbols by length, by symbol order within each length */
	  for (sym = 0; sym < codes; sym++) {
	    if (lens[lens_index + sym] !== 0) {
	      work[offs[lens[lens_index + sym]]++] = sym;
	    }
	  }

	  /*
	   Create and fill in decoding tables.  In this loop, the table being
	   filled is at next and has curr index bits.  The code being used is huff
	   with length len.  That code is converted to an index by dropping drop
	   bits off of the bottom.  For codes where len is less than drop + curr,
	   those top drop + curr - len bits are incremented through all values to
	   fill the table with replicated entries.

	   root is the number of index bits for the root table.  When len exceeds
	   root, sub-tables are created pointed to by the root entry with an index
	   of the low root bits of huff.  This is saved in low to check for when a
	   new sub-table should be started.  drop is zero when the root table is
	   being filled, and drop is root when sub-tables are being filled.

	   When a new sub-table is needed, it is necessary to look ahead in the
	   code lengths to determine what size sub-table is needed.  The length
	   counts are used for this, and so count[] is decremented as codes are
	   entered in the tables.

	   used keeps track of how many table entries have been allocated from the
	   provided *table space.  It is checked for LENS and DIST tables against
	   the constants ENOUGH_LENS and ENOUGH_DISTS to guard against changes in
	   the initial root table size constants.  See the comments in inftrees.h
	   for more information.

	   sym increments through all symbols, and the loop terminates when
	   all codes of length max, i.e. all codes, have been processed.  This
	   routine permits incomplete codes, so another loop after this one fills
	   in the rest of the decoding tables with invalid code markers.
	   */

	  /* set up for code type */
	  // poor man optimization - use if-else instead of switch,
	  // to avoid deopts in old v8
	  if (type === CODES) {
	    base = extra = work;    /* dummy value--not used */
	    end = 19;

	  } else if (type === LENS) {
	    base = lbase;
	    base_index -= 257;
	    extra = lext;
	    extra_index -= 257;
	    end = 256;

	  } else {                    /* DISTS */
	    base = dbase;
	    extra = dext;
	    end = -1;
	  }

	  /* initialize opts for loop */
	  huff = 0;                   /* starting code */
	  sym = 0;                    /* starting code symbol */
	  len = min;                  /* starting code length */
	  next = table_index;              /* current table to fill in */
	  curr = root;                /* current table index bits */
	  drop = 0;                   /* current bits to drop from code for index */
	  low = -1;                   /* trigger new sub-table when len > root */
	  used = 1 << root;          /* use root table entries */
	  mask = used - 1;            /* mask for comparing low */

	  /* check available table space */
	  if ((type === LENS && used > ENOUGH_LENS) ||
	    (type === DISTS && used > ENOUGH_DISTS)) {
	    return 1;
	  }

	  /* process all codes and make table entries */
	  for (;;) {
	    /* create table entry */
	    here_bits = len - drop;
	    if (work[sym] < end) {
	      here_op = 0;
	      here_val = work[sym];
	    }
	    else if (work[sym] > end) {
	      here_op = extra[extra_index + work[sym]];
	      here_val = base[base_index + work[sym]];
	    }
	    else {
	      here_op = 32 + 64;         /* end of block */
	      here_val = 0;
	    }

	    /* replicate for those indices with low len bits equal to huff */
	    incr = 1 << (len - drop);
	    fill = 1 << curr;
	    min = fill;                 /* save offset to next table */
	    do {
	      fill -= incr;
	      table[next + (huff >> drop) + fill] = (here_bits << 24) | (here_op << 16) | here_val |0;
	    } while (fill !== 0);

	    /* backwards increment the len-bit code huff */
	    incr = 1 << (len - 1);
	    while (huff & incr) {
	      incr >>= 1;
	    }
	    if (incr !== 0) {
	      huff &= incr - 1;
	      huff += incr;
	    } else {
	      huff = 0;
	    }

	    /* go to next symbol, update count, len */
	    sym++;
	    if (--count[len] === 0) {
	      if (len === max) { break; }
	      len = lens[lens_index + work[sym]];
	    }

	    /* create new sub-table if needed */
	    if (len > root && (huff & mask) !== low) {
	      /* if first time, transition to sub-tables */
	      if (drop === 0) {
	        drop = root;
	      }

	      /* increment past last table */
	      next += min;            /* here min is 1 << curr */

	      /* determine length of next table */
	      curr = len - drop;
	      left = 1 << curr;
	      while (curr + drop < max) {
	        left -= count[curr + drop];
	        if (left <= 0) { break; }
	        curr++;
	        left <<= 1;
	      }

	      /* check for enough space */
	      used += 1 << curr;
	      if ((type === LENS && used > ENOUGH_LENS) ||
	        (type === DISTS && used > ENOUGH_DISTS)) {
	        return 1;
	      }

	      /* point entry in root table to sub-table */
	      low = huff & mask;
	      /*table.op[low] = curr;
	      table.bits[low] = root;
	      table.val[low] = next - opts.table_index;*/
	      table[low] = (root << 24) | (curr << 16) | (next - table_index) |0;
	    }
	  }

	  /* fill in remaining table entry if code is incomplete (guaranteed to have
	   at most one remaining entry, since if the code is incomplete, the
	   maximum code length that was allowed to get this far is one bit) */
	  if (huff !== 0) {
	    //table.op[next + huff] = 64;            /* invalid code marker */
	    //table.bits[next + huff] = len - drop;
	    //table.val[next + huff] = 0;
	    table[next + huff] = ((len - drop) << 24) | (64 << 16) |0;
	  }

	  /* set return parameters */
	  //opts.table_index += used;
	  opts.bits = root;
	  return 0;
	};

	},{"../utils/common":52}],60:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	module.exports = {
	  2:      'need dictionary',     /* Z_NEED_DICT       2  */
	  1:      'stream end',          /* Z_STREAM_END      1  */
	  0:      '',                    /* Z_OK              0  */
	  '-1':   'file error',          /* Z_ERRNO         (-1) */
	  '-2':   'stream error',        /* Z_STREAM_ERROR  (-2) */
	  '-3':   'data error',          /* Z_DATA_ERROR    (-3) */
	  '-4':   'insufficient memory', /* Z_MEM_ERROR     (-4) */
	  '-5':   'buffer error',        /* Z_BUF_ERROR     (-5) */
	  '-6':   'incompatible version' /* Z_VERSION_ERROR (-6) */
	};

	},{}],61:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	/* eslint-disable space-unary-ops */

	var utils = require('../utils/common');

	/* Public constants ==========================================================*/
	/* ===========================================================================*/


	//var Z_FILTERED          = 1;
	//var Z_HUFFMAN_ONLY      = 2;
	//var Z_RLE               = 3;
	var Z_FIXED               = 4;
	//var Z_DEFAULT_STRATEGY  = 0;

	/* Possible values of the data_type field (though see inflate()) */
	var Z_BINARY              = 0;
	var Z_TEXT                = 1;
	//var Z_ASCII             = 1; // = Z_TEXT
	var Z_UNKNOWN             = 2;

	/*============================================================================*/


	function zero(buf) { var len = buf.length; while (--len >= 0) { buf[len] = 0; } }

	// From zutil.h

	var STORED_BLOCK = 0;
	var STATIC_TREES = 1;
	var DYN_TREES    = 2;
	/* The three kinds of block type */

	var MIN_MATCH    = 3;
	var MAX_MATCH    = 258;
	/* The minimum and maximum match lengths */

	// From deflate.h
	/* ===========================================================================
	 * Internal compression state.
	 */

	var LENGTH_CODES  = 29;
	/* number of length codes, not counting the special END_BLOCK code */

	var LITERALS      = 256;
	/* number of literal bytes 0..255 */

	var L_CODES       = LITERALS + 1 + LENGTH_CODES;
	/* number of Literal or Length codes, including the END_BLOCK code */

	var D_CODES       = 30;
	/* number of distance codes */

	var BL_CODES      = 19;
	/* number of codes used to transfer the bit lengths */

	var HEAP_SIZE     = 2 * L_CODES + 1;
	/* maximum heap size */

	var MAX_BITS      = 15;
	/* All codes must not exceed MAX_BITS bits */

	var Buf_size      = 16;
	/* size of bit buffer in bi_buf */


	/* ===========================================================================
	 * Constants
	 */

	var MAX_BL_BITS = 7;
	/* Bit length codes must not exceed MAX_BL_BITS bits */

	var END_BLOCK   = 256;
	/* end of block literal code */

	var REP_3_6     = 16;
	/* repeat previous bit length 3-6 times (2 bits of repeat count) */

	var REPZ_3_10   = 17;
	/* repeat a zero length 3-10 times  (3 bits of repeat count) */

	var REPZ_11_138 = 18;
	/* repeat a zero length 11-138 times  (7 bits of repeat count) */

	/* eslint-disable comma-spacing,array-bracket-spacing */
	var extra_lbits =   /* extra bits for each length code */
	  [0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0];

	var extra_dbits =   /* extra bits for each distance code */
	  [0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13];

	var extra_blbits =  /* extra bits for each bit length code */
	  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,2,3,7];

	var bl_order =
	  [16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15];
	/* eslint-enable comma-spacing,array-bracket-spacing */

	/* The lengths of the bit length codes are sent in order of decreasing
	 * probability, to avoid transmitting the lengths for unused bit length codes.
	 */

	/* ===========================================================================
	 * Local data. These are initialized only once.
	 */

	// We pre-fill arrays with 0 to avoid uninitialized gaps

	var DIST_CODE_LEN = 512; /* see definition of array dist_code below */

	// !!!! Use flat array instead of structure, Freq = i*2, Len = i*2+1
	var static_ltree  = new Array((L_CODES + 2) * 2);
	zero(static_ltree);
	/* The static literal tree. Since the bit lengths are imposed, there is no
	 * need for the L_CODES extra codes used during heap construction. However
	 * The codes 286 and 287 are needed to build a canonical tree (see _tr_init
	 * below).
	 */

	var static_dtree  = new Array(D_CODES * 2);
	zero(static_dtree);
	/* The static distance tree. (Actually a trivial tree since all codes use
	 * 5 bits.)
	 */

	var _dist_code    = new Array(DIST_CODE_LEN);
	zero(_dist_code);
	/* Distance codes. The first 256 values correspond to the distances
	 * 3 .. 258, the last 256 values correspond to the top 8 bits of
	 * the 15 bit distances.
	 */

	var _length_code  = new Array(MAX_MATCH - MIN_MATCH + 1);
	zero(_length_code);
	/* length code for each normalized match length (0 == MIN_MATCH) */

	var base_length   = new Array(LENGTH_CODES);
	zero(base_length);
	/* First normalized length for each code (0 = MIN_MATCH) */

	var base_dist     = new Array(D_CODES);
	zero(base_dist);
	/* First normalized distance for each code (0 = distance of 1) */


	function StaticTreeDesc(static_tree, extra_bits, extra_base, elems, max_length) {

	  this.static_tree  = static_tree;  /* static tree or NULL */
	  this.extra_bits   = extra_bits;   /* extra bits for each code or NULL */
	  this.extra_base   = extra_base;   /* base index for extra_bits */
	  this.elems        = elems;        /* max number of elements in the tree */
	  this.max_length   = max_length;   /* max bit length for the codes */

	  // show if `static_tree` has data or dummy - needed for monomorphic objects
	  this.has_stree    = static_tree && static_tree.length;
	}


	var static_l_desc;
	var static_d_desc;
	var static_bl_desc;


	function TreeDesc(dyn_tree, stat_desc) {
	  this.dyn_tree = dyn_tree;     /* the dynamic tree */
	  this.max_code = 0;            /* largest code with non zero frequency */
	  this.stat_desc = stat_desc;   /* the corresponding static tree */
	}



	function d_code(dist) {
	  return dist < 256 ? _dist_code[dist] : _dist_code[256 + (dist >>> 7)];
	}


	/* ===========================================================================
	 * Output a short LSB first on the stream.
	 * IN assertion: there is enough room in pendingBuf.
	 */
	function put_short(s, w) {
	//    put_byte(s, (uch)((w) & 0xff));
	//    put_byte(s, (uch)((ush)(w) >> 8));
	  s.pending_buf[s.pending++] = (w) & 0xff;
	  s.pending_buf[s.pending++] = (w >>> 8) & 0xff;
	}


	/* ===========================================================================
	 * Send a value on a given number of bits.
	 * IN assertion: length <= 16 and value fits in length bits.
	 */
	function send_bits(s, value, length) {
	  if (s.bi_valid > (Buf_size - length)) {
	    s.bi_buf |= (value << s.bi_valid) & 0xffff;
	    put_short(s, s.bi_buf);
	    s.bi_buf = value >> (Buf_size - s.bi_valid);
	    s.bi_valid += length - Buf_size;
	  } else {
	    s.bi_buf |= (value << s.bi_valid) & 0xffff;
	    s.bi_valid += length;
	  }
	}


	function send_code(s, c, tree) {
	  send_bits(s, tree[c * 2]/*.Code*/, tree[c * 2 + 1]/*.Len*/);
	}


	/* ===========================================================================
	 * Reverse the first len bits of a code, using straightforward code (a faster
	 * method would use a table)
	 * IN assertion: 1 <= len <= 15
	 */
	function bi_reverse(code, len) {
	  var res = 0;
	  do {
	    res |= code & 1;
	    code >>>= 1;
	    res <<= 1;
	  } while (--len > 0);
	  return res >>> 1;
	}


	/* ===========================================================================
	 * Flush the bit buffer, keeping at most 7 bits in it.
	 */
	function bi_flush(s) {
	  if (s.bi_valid === 16) {
	    put_short(s, s.bi_buf);
	    s.bi_buf = 0;
	    s.bi_valid = 0;

	  } else if (s.bi_valid >= 8) {
	    s.pending_buf[s.pending++] = s.bi_buf & 0xff;
	    s.bi_buf >>= 8;
	    s.bi_valid -= 8;
	  }
	}


	/* ===========================================================================
	 * Compute the optimal bit lengths for a tree and update the total bit length
	 * for the current block.
	 * IN assertion: the fields freq and dad are set, heap[heap_max] and
	 *    above are the tree nodes sorted by increasing frequency.
	 * OUT assertions: the field len is set to the optimal bit length, the
	 *     array bl_count contains the frequencies for each bit length.
	 *     The length opt_len is updated; static_len is also updated if stree is
	 *     not null.
	 */
	function gen_bitlen(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc;    /* the tree descriptor */
	{
	  var tree            = desc.dyn_tree;
	  var max_code        = desc.max_code;
	  var stree           = desc.stat_desc.static_tree;
	  var has_stree       = desc.stat_desc.has_stree;
	  var extra           = desc.stat_desc.extra_bits;
	  var base            = desc.stat_desc.extra_base;
	  var max_length      = desc.stat_desc.max_length;
	  var h;              /* heap index */
	  var n, m;           /* iterate over the tree elements */
	  var bits;           /* bit length */
	  var xbits;          /* extra bits */
	  var f;              /* frequency */
	  var overflow = 0;   /* number of elements with bit length too large */

	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    s.bl_count[bits] = 0;
	  }

	  /* In a first pass, compute the optimal bit lengths (which may
	   * overflow in the case of the bit length tree).
	   */
	  tree[s.heap[s.heap_max] * 2 + 1]/*.Len*/ = 0; /* root of the heap */

	  for (h = s.heap_max + 1; h < HEAP_SIZE; h++) {
	    n = s.heap[h];
	    bits = tree[tree[n * 2 + 1]/*.Dad*/ * 2 + 1]/*.Len*/ + 1;
	    if (bits > max_length) {
	      bits = max_length;
	      overflow++;
	    }
	    tree[n * 2 + 1]/*.Len*/ = bits;
	    /* We overwrite tree[n].Dad which is no longer needed */

	    if (n > max_code) { continue; } /* not a leaf node */

	    s.bl_count[bits]++;
	    xbits = 0;
	    if (n >= base) {
	      xbits = extra[n - base];
	    }
	    f = tree[n * 2]/*.Freq*/;
	    s.opt_len += f * (bits + xbits);
	    if (has_stree) {
	      s.static_len += f * (stree[n * 2 + 1]/*.Len*/ + xbits);
	    }
	  }
	  if (overflow === 0) { return; }

	  // Trace((stderr,"\nbit length overflow\n"));
	  /* This happens for example on obj2 and pic of the Calgary corpus */

	  /* Find the first bit length which could increase: */
	  do {
	    bits = max_length - 1;
	    while (s.bl_count[bits] === 0) { bits--; }
	    s.bl_count[bits]--;      /* move one leaf down the tree */
	    s.bl_count[bits + 1] += 2; /* move one overflow item as its brother */
	    s.bl_count[max_length]--;
	    /* The brother of the overflow item also moves one step up,
	     * but this does not affect bl_count[max_length]
	     */
	    overflow -= 2;
	  } while (overflow > 0);

	  /* Now recompute all bit lengths, scanning in increasing frequency.
	   * h is still equal to HEAP_SIZE. (It is simpler to reconstruct all
	   * lengths instead of fixing only the wrong ones. This idea is taken
	   * from 'ar' written by Haruhiko Okumura.)
	   */
	  for (bits = max_length; bits !== 0; bits--) {
	    n = s.bl_count[bits];
	    while (n !== 0) {
	      m = s.heap[--h];
	      if (m > max_code) { continue; }
	      if (tree[m * 2 + 1]/*.Len*/ !== bits) {
	        // Trace((stderr,"code %d bits %d->%d\n", m, tree[m].Len, bits));
	        s.opt_len += (bits - tree[m * 2 + 1]/*.Len*/) * tree[m * 2]/*.Freq*/;
	        tree[m * 2 + 1]/*.Len*/ = bits;
	      }
	      n--;
	    }
	  }
	}


	/* ===========================================================================
	 * Generate the codes for a given tree and bit counts (which need not be
	 * optimal).
	 * IN assertion: the array bl_count contains the bit length statistics for
	 * the given tree and the field len is set for all tree elements.
	 * OUT assertion: the field code is set for all tree elements of non
	 *     zero code length.
	 */
	function gen_codes(tree, max_code, bl_count)
	//    ct_data *tree;             /* the tree to decorate */
	//    int max_code;              /* largest code with non zero frequency */
	//    ushf *bl_count;            /* number of codes at each bit length */
	{
	  var next_code = new Array(MAX_BITS + 1); /* next code value for each bit length */
	  var code = 0;              /* running code value */
	  var bits;                  /* bit index */
	  var n;                     /* code index */

	  /* The distribution counts are first used to generate the code values
	   * without bit reversal.
	   */
	  for (bits = 1; bits <= MAX_BITS; bits++) {
	    next_code[bits] = code = (code + bl_count[bits - 1]) << 1;
	  }
	  /* Check that the bit counts in bl_count are consistent. The last code
	   * must be all ones.
	   */
	  //Assert (code + bl_count[MAX_BITS]-1 == (1<<MAX_BITS)-1,
	  //        "inconsistent bit counts");
	  //Tracev((stderr,"\ngen_codes: max_code %d ", max_code));

	  for (n = 0;  n <= max_code; n++) {
	    var len = tree[n * 2 + 1]/*.Len*/;
	    if (len === 0) { continue; }
	    /* Now reverse the bits */
	    tree[n * 2]/*.Code*/ = bi_reverse(next_code[len]++, len);

	    //Tracecv(tree != static_ltree, (stderr,"\nn %3d %c l %2d c %4x (%x) ",
	    //     n, (isgraph(n) ? n : ' '), len, tree[n].Code, next_code[len]-1));
	  }
	}


	/* ===========================================================================
	 * Initialize the various 'constant' tables.
	 */
	function tr_static_init() {
	  var n;        /* iterates over tree elements */
	  var bits;     /* bit counter */
	  var length;   /* length value */
	  var code;     /* code value */
	  var dist;     /* distance index */
	  var bl_count = new Array(MAX_BITS + 1);
	  /* number of codes at each bit length for an optimal tree */

	  // do check in _tr_init()
	  //if (static_init_done) return;

	  /* For some embedded targets, global variables are not initialized: */
	/*#ifdef NO_INIT_GLOBAL_POINTERS
	  static_l_desc.static_tree = static_ltree;
	  static_l_desc.extra_bits = extra_lbits;
	  static_d_desc.static_tree = static_dtree;
	  static_d_desc.extra_bits = extra_dbits;
	  static_bl_desc.extra_bits = extra_blbits;
	#endif*/

	  /* Initialize the mapping length (0..255) -> length code (0..28) */
	  length = 0;
	  for (code = 0; code < LENGTH_CODES - 1; code++) {
	    base_length[code] = length;
	    for (n = 0; n < (1 << extra_lbits[code]); n++) {
	      _length_code[length++] = code;
	    }
	  }
	  //Assert (length == 256, "tr_static_init: length != 256");
	  /* Note that the length 255 (match length 258) can be represented
	   * in two different ways: code 284 + 5 bits or code 285, so we
	   * overwrite length_code[255] to use the best encoding:
	   */
	  _length_code[length - 1] = code;

	  /* Initialize the mapping dist (0..32K) -> dist code (0..29) */
	  dist = 0;
	  for (code = 0; code < 16; code++) {
	    base_dist[code] = dist;
	    for (n = 0; n < (1 << extra_dbits[code]); n++) {
	      _dist_code[dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: dist != 256");
	  dist >>= 7; /* from now on, all distances are divided by 128 */
	  for (; code < D_CODES; code++) {
	    base_dist[code] = dist << 7;
	    for (n = 0; n < (1 << (extra_dbits[code] - 7)); n++) {
	      _dist_code[256 + dist++] = code;
	    }
	  }
	  //Assert (dist == 256, "tr_static_init: 256+dist != 512");

	  /* Construct the codes of the static literal tree */
	  for (bits = 0; bits <= MAX_BITS; bits++) {
	    bl_count[bits] = 0;
	  }

	  n = 0;
	  while (n <= 143) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  while (n <= 255) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 9;
	    n++;
	    bl_count[9]++;
	  }
	  while (n <= 279) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 7;
	    n++;
	    bl_count[7]++;
	  }
	  while (n <= 287) {
	    static_ltree[n * 2 + 1]/*.Len*/ = 8;
	    n++;
	    bl_count[8]++;
	  }
	  /* Codes 286 and 287 do not exist, but we must include them in the
	   * tree construction to get a canonical Huffman tree (longest code
	   * all ones)
	   */
	  gen_codes(static_ltree, L_CODES + 1, bl_count);

	  /* The static distance tree is trivial: */
	  for (n = 0; n < D_CODES; n++) {
	    static_dtree[n * 2 + 1]/*.Len*/ = 5;
	    static_dtree[n * 2]/*.Code*/ = bi_reverse(n, 5);
	  }

	  // Now data ready and we can init static trees
	  static_l_desc = new StaticTreeDesc(static_ltree, extra_lbits, LITERALS + 1, L_CODES, MAX_BITS);
	  static_d_desc = new StaticTreeDesc(static_dtree, extra_dbits, 0,          D_CODES, MAX_BITS);
	  static_bl_desc = new StaticTreeDesc(new Array(0), extra_blbits, 0,         BL_CODES, MAX_BL_BITS);

	  //static_init_done = true;
	}


	/* ===========================================================================
	 * Initialize a new block.
	 */
	function init_block(s) {
	  var n; /* iterates over tree elements */

	  /* Initialize the trees. */
	  for (n = 0; n < L_CODES;  n++) { s.dyn_ltree[n * 2]/*.Freq*/ = 0; }
	  for (n = 0; n < D_CODES;  n++) { s.dyn_dtree[n * 2]/*.Freq*/ = 0; }
	  for (n = 0; n < BL_CODES; n++) { s.bl_tree[n * 2]/*.Freq*/ = 0; }

	  s.dyn_ltree[END_BLOCK * 2]/*.Freq*/ = 1;
	  s.opt_len = s.static_len = 0;
	  s.last_lit = s.matches = 0;
	}


	/* ===========================================================================
	 * Flush the bit buffer and align the output on a byte boundary
	 */
	function bi_windup(s)
	{
	  if (s.bi_valid > 8) {
	    put_short(s, s.bi_buf);
	  } else if (s.bi_valid > 0) {
	    //put_byte(s, (Byte)s->bi_buf);
	    s.pending_buf[s.pending++] = s.bi_buf;
	  }
	  s.bi_buf = 0;
	  s.bi_valid = 0;
	}

	/* ===========================================================================
	 * Copy a stored block, storing first the length and its
	 * one's complement if requested.
	 */
	function copy_block(s, buf, len, header)
	//DeflateState *s;
	//charf    *buf;    /* the input data */
	//unsigned len;     /* its length */
	//int      header;  /* true if block header must be written */
	{
	  bi_windup(s);        /* align on byte boundary */

	  {
	    put_short(s, len);
	    put_short(s, ~len);
	  }
	//  while (len--) {
	//    put_byte(s, *buf++);
	//  }
	  utils.arraySet(s.pending_buf, s.window, buf, len, s.pending);
	  s.pending += len;
	}

	/* ===========================================================================
	 * Compares to subtrees, using the tree depth as tie breaker when
	 * the subtrees have equal frequency. This minimizes the worst case length.
	 */
	function smaller(tree, n, m, depth) {
	  var _n2 = n * 2;
	  var _m2 = m * 2;
	  return (tree[_n2]/*.Freq*/ < tree[_m2]/*.Freq*/ ||
	         (tree[_n2]/*.Freq*/ === tree[_m2]/*.Freq*/ && depth[n] <= depth[m]));
	}

	/* ===========================================================================
	 * Restore the heap property by moving down the tree starting at node k,
	 * exchanging a node with the smallest of its two sons if necessary, stopping
	 * when the heap property is re-established (each father smaller than its
	 * two sons).
	 */
	function pqdownheap(s, tree, k)
	//    deflate_state *s;
	//    ct_data *tree;  /* the tree to restore */
	//    int k;               /* node to move down */
	{
	  var v = s.heap[k];
	  var j = k << 1;  /* left son of k */
	  while (j <= s.heap_len) {
	    /* Set j to the smallest of the two sons: */
	    if (j < s.heap_len &&
	      smaller(tree, s.heap[j + 1], s.heap[j], s.depth)) {
	      j++;
	    }
	    /* Exit if v is smaller than both sons */
	    if (smaller(tree, v, s.heap[j], s.depth)) { break; }

	    /* Exchange v with the smallest son */
	    s.heap[k] = s.heap[j];
	    k = j;

	    /* And continue down the tree, setting j to the left son of k */
	    j <<= 1;
	  }
	  s.heap[k] = v;
	}


	// inlined manually
	// var SMALLEST = 1;

	/* ===========================================================================
	 * Send the block data compressed using the given Huffman trees
	 */
	function compress_block(s, ltree, dtree)
	//    deflate_state *s;
	//    const ct_data *ltree; /* literal tree */
	//    const ct_data *dtree; /* distance tree */
	{
	  var dist;           /* distance of matched string */
	  var lc;             /* match length or unmatched char (if dist == 0) */
	  var lx = 0;         /* running index in l_buf */
	  var code;           /* the code to send */
	  var extra;          /* number of extra bits to send */

	  if (s.last_lit !== 0) {
	    do {
	      dist = (s.pending_buf[s.d_buf + lx * 2] << 8) | (s.pending_buf[s.d_buf + lx * 2 + 1]);
	      lc = s.pending_buf[s.l_buf + lx];
	      lx++;

	      if (dist === 0) {
	        send_code(s, lc, ltree); /* send a literal byte */
	        //Tracecv(isgraph(lc), (stderr," '%c' ", lc));
	      } else {
	        /* Here, lc is the match length - MIN_MATCH */
	        code = _length_code[lc];
	        send_code(s, code + LITERALS + 1, ltree); /* send the length code */
	        extra = extra_lbits[code];
	        if (extra !== 0) {
	          lc -= base_length[code];
	          send_bits(s, lc, extra);       /* send the extra length bits */
	        }
	        dist--; /* dist is now the match distance - 1 */
	        code = d_code(dist);
	        //Assert (code < D_CODES, "bad d_code");

	        send_code(s, code, dtree);       /* send the distance code */
	        extra = extra_dbits[code];
	        if (extra !== 0) {
	          dist -= base_dist[code];
	          send_bits(s, dist, extra);   /* send the extra distance bits */
	        }
	      } /* literal or match pair ? */

	      /* Check that the overlay between pending_buf and d_buf+l_buf is ok: */
	      //Assert((uInt)(s->pending) < s->lit_bufsize + 2*lx,
	      //       "pendingBuf overflow");

	    } while (lx < s.last_lit);
	  }

	  send_code(s, END_BLOCK, ltree);
	}


	/* ===========================================================================
	 * Construct one Huffman tree and assigns the code bit strings and lengths.
	 * Update the total bit length for the current block.
	 * IN assertion: the field freq is set for all tree elements.
	 * OUT assertions: the fields len and code are set to the optimal bit length
	 *     and corresponding code. The length opt_len is updated; static_len is
	 *     also updated if stree is not null. The field max_code is set.
	 */
	function build_tree(s, desc)
	//    deflate_state *s;
	//    tree_desc *desc; /* the tree descriptor */
	{
	  var tree     = desc.dyn_tree;
	  var stree    = desc.stat_desc.static_tree;
	  var has_stree = desc.stat_desc.has_stree;
	  var elems    = desc.stat_desc.elems;
	  var n, m;          /* iterate over heap elements */
	  var max_code = -1; /* largest code with non zero frequency */
	  var node;          /* new node being created */

	  /* Construct the initial heap, with least frequent element in
	   * heap[SMALLEST]. The sons of heap[n] are heap[2*n] and heap[2*n+1].
	   * heap[0] is not used.
	   */
	  s.heap_len = 0;
	  s.heap_max = HEAP_SIZE;

	  for (n = 0; n < elems; n++) {
	    if (tree[n * 2]/*.Freq*/ !== 0) {
	      s.heap[++s.heap_len] = max_code = n;
	      s.depth[n] = 0;

	    } else {
	      tree[n * 2 + 1]/*.Len*/ = 0;
	    }
	  }

	  /* The pkzip format requires that at least one distance code exists,
	   * and that at least one bit should be sent even if there is only one
	   * possible code. So to avoid special checks later on we force at least
	   * two codes of non zero frequency.
	   */
	  while (s.heap_len < 2) {
	    node = s.heap[++s.heap_len] = (max_code < 2 ? ++max_code : 0);
	    tree[node * 2]/*.Freq*/ = 1;
	    s.depth[node] = 0;
	    s.opt_len--;

	    if (has_stree) {
	      s.static_len -= stree[node * 2 + 1]/*.Len*/;
	    }
	    /* node is 0 or 1 so it does not have extra bits */
	  }
	  desc.max_code = max_code;

	  /* The elements heap[heap_len/2+1 .. heap_len] are leaves of the tree,
	   * establish sub-heaps of increasing lengths:
	   */
	  for (n = (s.heap_len >> 1/*int /2*/); n >= 1; n--) { pqdownheap(s, tree, n); }

	  /* Construct the Huffman tree by repeatedly combining the least two
	   * frequent nodes.
	   */
	  node = elems;              /* next internal node of the tree */
	  do {
	    //pqremove(s, tree, n);  /* n = node of least frequency */
	    /*** pqremove ***/
	    n = s.heap[1/*SMALLEST*/];
	    s.heap[1/*SMALLEST*/] = s.heap[s.heap_len--];
	    pqdownheap(s, tree, 1/*SMALLEST*/);
	    /***/

	    m = s.heap[1/*SMALLEST*/]; /* m = node of next least frequency */

	    s.heap[--s.heap_max] = n; /* keep the nodes sorted by frequency */
	    s.heap[--s.heap_max] = m;

	    /* Create a new node father of n and m */
	    tree[node * 2]/*.Freq*/ = tree[n * 2]/*.Freq*/ + tree[m * 2]/*.Freq*/;
	    s.depth[node] = (s.depth[n] >= s.depth[m] ? s.depth[n] : s.depth[m]) + 1;
	    tree[n * 2 + 1]/*.Dad*/ = tree[m * 2 + 1]/*.Dad*/ = node;

	    /* and insert the new node in the heap */
	    s.heap[1/*SMALLEST*/] = node++;
	    pqdownheap(s, tree, 1/*SMALLEST*/);

	  } while (s.heap_len >= 2);

	  s.heap[--s.heap_max] = s.heap[1/*SMALLEST*/];

	  /* At this point, the fields freq and dad are set. We can now
	   * generate the bit lengths.
	   */
	  gen_bitlen(s, desc);

	  /* The field len is now set, we can generate the bit codes */
	  gen_codes(tree, max_code, s.bl_count);
	}


	/* ===========================================================================
	 * Scan a literal or distance tree to determine the frequencies of the codes
	 * in the bit length tree.
	 */
	function scan_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree;   /* the tree to be scanned */
	//    int max_code;    /* and its largest code of non zero frequency */
	{
	  var n;                     /* iterates over all tree elements */
	  var prevlen = -1;          /* last emitted length */
	  var curlen;                /* length of current code */

	  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

	  var count = 0;             /* repeat count of the current code */
	  var max_count = 7;         /* max repeat count */
	  var min_count = 4;         /* min repeat count */

	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }
	  tree[(max_code + 1) * 2 + 1]/*.Len*/ = 0xffff; /* guard */

	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

	    if (++count < max_count && curlen === nextlen) {
	      continue;

	    } else if (count < min_count) {
	      s.bl_tree[curlen * 2]/*.Freq*/ += count;

	    } else if (curlen !== 0) {

	      if (curlen !== prevlen) { s.bl_tree[curlen * 2]/*.Freq*/++; }
	      s.bl_tree[REP_3_6 * 2]/*.Freq*/++;

	    } else if (count <= 10) {
	      s.bl_tree[REPZ_3_10 * 2]/*.Freq*/++;

	    } else {
	      s.bl_tree[REPZ_11_138 * 2]/*.Freq*/++;
	    }

	    count = 0;
	    prevlen = curlen;

	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;

	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;

	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}


	/* ===========================================================================
	 * Send a literal or distance tree in compressed form, using the codes in
	 * bl_tree.
	 */
	function send_tree(s, tree, max_code)
	//    deflate_state *s;
	//    ct_data *tree; /* the tree to be scanned */
	//    int max_code;       /* and its largest code of non zero frequency */
	{
	  var n;                     /* iterates over all tree elements */
	  var prevlen = -1;          /* last emitted length */
	  var curlen;                /* length of current code */

	  var nextlen = tree[0 * 2 + 1]/*.Len*/; /* length of next code */

	  var count = 0;             /* repeat count of the current code */
	  var max_count = 7;         /* max repeat count */
	  var min_count = 4;         /* min repeat count */

	  /* tree[max_code+1].Len = -1; */  /* guard already set */
	  if (nextlen === 0) {
	    max_count = 138;
	    min_count = 3;
	  }

	  for (n = 0; n <= max_code; n++) {
	    curlen = nextlen;
	    nextlen = tree[(n + 1) * 2 + 1]/*.Len*/;

	    if (++count < max_count && curlen === nextlen) {
	      continue;

	    } else if (count < min_count) {
	      do { send_code(s, curlen, s.bl_tree); } while (--count !== 0);

	    } else if (curlen !== 0) {
	      if (curlen !== prevlen) {
	        send_code(s, curlen, s.bl_tree);
	        count--;
	      }
	      //Assert(count >= 3 && count <= 6, " 3_6?");
	      send_code(s, REP_3_6, s.bl_tree);
	      send_bits(s, count - 3, 2);

	    } else if (count <= 10) {
	      send_code(s, REPZ_3_10, s.bl_tree);
	      send_bits(s, count - 3, 3);

	    } else {
	      send_code(s, REPZ_11_138, s.bl_tree);
	      send_bits(s, count - 11, 7);
	    }

	    count = 0;
	    prevlen = curlen;
	    if (nextlen === 0) {
	      max_count = 138;
	      min_count = 3;

	    } else if (curlen === nextlen) {
	      max_count = 6;
	      min_count = 3;

	    } else {
	      max_count = 7;
	      min_count = 4;
	    }
	  }
	}


	/* ===========================================================================
	 * Construct the Huffman tree for the bit lengths and return the index in
	 * bl_order of the last bit length code to send.
	 */
	function build_bl_tree(s) {
	  var max_blindex;  /* index of last bit length code of non zero freq */

	  /* Determine the bit length frequencies for literal and distance trees */
	  scan_tree(s, s.dyn_ltree, s.l_desc.max_code);
	  scan_tree(s, s.dyn_dtree, s.d_desc.max_code);

	  /* Build the bit length tree: */
	  build_tree(s, s.bl_desc);
	  /* opt_len now includes the length of the tree representations, except
	   * the lengths of the bit lengths codes and the 5+5+4 bits for the counts.
	   */

	  /* Determine the number of bit length codes to send. The pkzip format
	   * requires that at least 4 bit length codes be sent. (appnote.txt says
	   * 3 but the actual value used is 4.)
	   */
	  for (max_blindex = BL_CODES - 1; max_blindex >= 3; max_blindex--) {
	    if (s.bl_tree[bl_order[max_blindex] * 2 + 1]/*.Len*/ !== 0) {
	      break;
	    }
	  }
	  /* Update opt_len to include the bit length tree and counts */
	  s.opt_len += 3 * (max_blindex + 1) + 5 + 5 + 4;
	  //Tracev((stderr, "\ndyn trees: dyn %ld, stat %ld",
	  //        s->opt_len, s->static_len));

	  return max_blindex;
	}


	/* ===========================================================================
	 * Send the header for a block using dynamic Huffman trees: the counts, the
	 * lengths of the bit length codes, the literal tree and the distance tree.
	 * IN assertion: lcodes >= 257, dcodes >= 1, blcodes >= 4.
	 */
	function send_all_trees(s, lcodes, dcodes, blcodes)
	//    deflate_state *s;
	//    int lcodes, dcodes, blcodes; /* number of codes for each tree */
	{
	  var rank;                    /* index in bl_order */

	  //Assert (lcodes >= 257 && dcodes >= 1 && blcodes >= 4, "not enough codes");
	  //Assert (lcodes <= L_CODES && dcodes <= D_CODES && blcodes <= BL_CODES,
	  //        "too many codes");
	  //Tracev((stderr, "\nbl counts: "));
	  send_bits(s, lcodes - 257, 5); /* not +255 as stated in appnote.txt */
	  send_bits(s, dcodes - 1,   5);
	  send_bits(s, blcodes - 4,  4); /* not -3 as stated in appnote.txt */
	  for (rank = 0; rank < blcodes; rank++) {
	    //Tracev((stderr, "\nbl code %2d ", bl_order[rank]));
	    send_bits(s, s.bl_tree[bl_order[rank] * 2 + 1]/*.Len*/, 3);
	  }
	  //Tracev((stderr, "\nbl tree: sent %ld", s->bits_sent));

	  send_tree(s, s.dyn_ltree, lcodes - 1); /* literal tree */
	  //Tracev((stderr, "\nlit tree: sent %ld", s->bits_sent));

	  send_tree(s, s.dyn_dtree, dcodes - 1); /* distance tree */
	  //Tracev((stderr, "\ndist tree: sent %ld", s->bits_sent));
	}


	/* ===========================================================================
	 * Check if the data type is TEXT or BINARY, using the following algorithm:
	 * - TEXT if the two conditions below are satisfied:
	 *    a) There are no non-portable control characters belonging to the
	 *       "black list" (0..6, 14..25, 28..31).
	 *    b) There is at least one printable character belonging to the
	 *       "white list" (9 {TAB}, 10 {LF}, 13 {CR}, 32..255).
	 * - BINARY otherwise.
	 * - The following partially-portable control characters form a
	 *   "gray list" that is ignored in this detection algorithm:
	 *   (7 {BEL}, 8 {BS}, 11 {VT}, 12 {FF}, 26 {SUB}, 27 {ESC}).
	 * IN assertion: the fields Freq of dyn_ltree are set.
	 */
	function detect_data_type(s) {
	  /* black_mask is the bit mask of black-listed bytes
	   * set bits 0..6, 14..25, and 28..31
	   * 0xf3ffc07f = binary 11110011111111111100000001111111
	   */
	  var black_mask = 0xf3ffc07f;
	  var n;

	  /* Check for non-textual ("black-listed") bytes. */
	  for (n = 0; n <= 31; n++, black_mask >>>= 1) {
	    if ((black_mask & 1) && (s.dyn_ltree[n * 2]/*.Freq*/ !== 0)) {
	      return Z_BINARY;
	    }
	  }

	  /* Check for textual ("white-listed") bytes. */
	  if (s.dyn_ltree[9 * 2]/*.Freq*/ !== 0 || s.dyn_ltree[10 * 2]/*.Freq*/ !== 0 ||
	      s.dyn_ltree[13 * 2]/*.Freq*/ !== 0) {
	    return Z_TEXT;
	  }
	  for (n = 32; n < LITERALS; n++) {
	    if (s.dyn_ltree[n * 2]/*.Freq*/ !== 0) {
	      return Z_TEXT;
	    }
	  }

	  /* There are no "black-listed" or "white-listed" bytes:
	   * this stream either is empty or has tolerated ("gray-listed") bytes only.
	   */
	  return Z_BINARY;
	}


	var static_init_done = false;

	/* ===========================================================================
	 * Initialize the tree data structures for a new zlib stream.
	 */
	function _tr_init(s)
	{

	  if (!static_init_done) {
	    tr_static_init();
	    static_init_done = true;
	  }

	  s.l_desc  = new TreeDesc(s.dyn_ltree, static_l_desc);
	  s.d_desc  = new TreeDesc(s.dyn_dtree, static_d_desc);
	  s.bl_desc = new TreeDesc(s.bl_tree, static_bl_desc);

	  s.bi_buf = 0;
	  s.bi_valid = 0;

	  /* Initialize the first block of the first file: */
	  init_block(s);
	}


	/* ===========================================================================
	 * Send a stored block
	 */
	function _tr_stored_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  send_bits(s, (STORED_BLOCK << 1) + (last ? 1 : 0), 3);    /* send block type */
	  copy_block(s, buf, stored_len); /* with header */
	}


	/* ===========================================================================
	 * Send one empty static block to give enough lookahead for inflate.
	 * This takes 10 bits, of which 7 may remain in the bit buffer.
	 */
	function _tr_align(s) {
	  send_bits(s, STATIC_TREES << 1, 3);
	  send_code(s, END_BLOCK, static_ltree);
	  bi_flush(s);
	}


	/* ===========================================================================
	 * Determine the best encoding for the current block: dynamic trees, static
	 * trees or store, and output the encoded block to the zip file.
	 */
	function _tr_flush_block(s, buf, stored_len, last)
	//DeflateState *s;
	//charf *buf;       /* input block, or NULL if too old */
	//ulg stored_len;   /* length of input block */
	//int last;         /* one if this is the last block for a file */
	{
	  var opt_lenb, static_lenb;  /* opt_len and static_len in bytes */
	  var max_blindex = 0;        /* index of last bit length code of non zero freq */

	  /* Build the Huffman trees unless a stored block is forced */
	  if (s.level > 0) {

	    /* Check if the file is binary or text */
	    if (s.strm.data_type === Z_UNKNOWN) {
	      s.strm.data_type = detect_data_type(s);
	    }

	    /* Construct the literal and distance trees */
	    build_tree(s, s.l_desc);
	    // Tracev((stderr, "\nlit data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));

	    build_tree(s, s.d_desc);
	    // Tracev((stderr, "\ndist data: dyn %ld, stat %ld", s->opt_len,
	    //        s->static_len));
	    /* At this point, opt_len and static_len are the total bit lengths of
	     * the compressed block data, excluding the tree representations.
	     */

	    /* Build the bit length tree for the above two trees, and get the index
	     * in bl_order of the last bit length code to send.
	     */
	    max_blindex = build_bl_tree(s);

	    /* Determine the best encoding. Compute the block lengths in bytes. */
	    opt_lenb = (s.opt_len + 3 + 7) >>> 3;
	    static_lenb = (s.static_len + 3 + 7) >>> 3;

	    // Tracev((stderr, "\nopt %lu(%lu) stat %lu(%lu) stored %lu lit %u ",
	    //        opt_lenb, s->opt_len, static_lenb, s->static_len, stored_len,
	    //        s->last_lit));

	    if (static_lenb <= opt_lenb) { opt_lenb = static_lenb; }

	  } else {
	    // Assert(buf != (char*)0, "lost buf");
	    opt_lenb = static_lenb = stored_len + 5; /* force a stored block */
	  }

	  if ((stored_len + 4 <= opt_lenb) && (buf !== -1)) {
	    /* 4: two words for the lengths */

	    /* The test buf != NULL is only necessary if LIT_BUFSIZE > WSIZE.
	     * Otherwise we can't have processed more than WSIZE input bytes since
	     * the last block flush, because compression would have been
	     * successful. If LIT_BUFSIZE <= WSIZE, it is never too late to
	     * transform a block into a stored block.
	     */
	    _tr_stored_block(s, buf, stored_len, last);

	  } else if (s.strategy === Z_FIXED || static_lenb === opt_lenb) {

	    send_bits(s, (STATIC_TREES << 1) + (last ? 1 : 0), 3);
	    compress_block(s, static_ltree, static_dtree);

	  } else {
	    send_bits(s, (DYN_TREES << 1) + (last ? 1 : 0), 3);
	    send_all_trees(s, s.l_desc.max_code + 1, s.d_desc.max_code + 1, max_blindex + 1);
	    compress_block(s, s.dyn_ltree, s.dyn_dtree);
	  }
	  // Assert (s->compressed_len == s->bits_sent, "bad compressed size");
	  /* The above check is made mod 2^32, for files larger than 512 MB
	   * and uLong implemented on 32 bits.
	   */
	  init_block(s);

	  if (last) {
	    bi_windup(s);
	  }
	  // Tracev((stderr,"\ncomprlen %lu(%lu) ", s->compressed_len>>3,
	  //       s->compressed_len-7*last));
	}

	/* ===========================================================================
	 * Save the match info and tally the frequency counts. Return true if
	 * the current block must be flushed.
	 */
	function _tr_tally(s, dist, lc)
	//    deflate_state *s;
	//    unsigned dist;  /* distance of matched string */
	//    unsigned lc;    /* match length-MIN_MATCH or unmatched char (if dist==0) */
	{
	  //var out_length, in_length, dcode;

	  s.pending_buf[s.d_buf + s.last_lit * 2]     = (dist >>> 8) & 0xff;
	  s.pending_buf[s.d_buf + s.last_lit * 2 + 1] = dist & 0xff;

	  s.pending_buf[s.l_buf + s.last_lit] = lc & 0xff;
	  s.last_lit++;

	  if (dist === 0) {
	    /* lc is the unmatched char */
	    s.dyn_ltree[lc * 2]/*.Freq*/++;
	  } else {
	    s.matches++;
	    /* Here, lc is the match length - MIN_MATCH */
	    dist--;             /* dist = match distance - 1 */
	    //Assert((ush)dist < (ush)MAX_DIST(s) &&
	    //       (ush)lc <= (ush)(MAX_MATCH-MIN_MATCH) &&
	    //       (ush)d_code(dist) < (ush)D_CODES,  "_tr_tally: bad match");

	    s.dyn_ltree[(_length_code[lc] + LITERALS + 1) * 2]/*.Freq*/++;
	    s.dyn_dtree[d_code(dist) * 2]/*.Freq*/++;
	  }

	// (!) This block is disabled in zlib defaults,
	// don't enable it for binary compatibility

	//#ifdef TRUNCATE_BLOCK
	//  /* Try to guess if it is profitable to stop the current block here */
	//  if ((s.last_lit & 0x1fff) === 0 && s.level > 2) {
	//    /* Compute an upper bound for the compressed length */
	//    out_length = s.last_lit*8;
	//    in_length = s.strstart - s.block_start;
	//
	//    for (dcode = 0; dcode < D_CODES; dcode++) {
	//      out_length += s.dyn_dtree[dcode*2]/*.Freq*/ * (5 + extra_dbits[dcode]);
	//    }
	//    out_length >>>= 3;
	//    //Tracev((stderr,"\nlast_lit %u, in %ld, out ~%ld(%ld%%) ",
	//    //       s->last_lit, in_length, out_length,
	//    //       100L - out_length*100L/in_length));
	//    if (s.matches < (s.last_lit>>1)/*int /2*/ && out_length < (in_length>>1)/*int /2*/) {
	//      return true;
	//    }
	//  }
	//#endif

	  return (s.last_lit === s.lit_bufsize - 1);
	  /* We avoid equality with lit_bufsize because of wraparound at 64K
	   * on 16 bit machines and because stored blocks are restricted to
	   * 64K-1 bytes.
	   */
	}

	exports._tr_init  = _tr_init;
	exports._tr_stored_block = _tr_stored_block;
	exports._tr_flush_block  = _tr_flush_block;
	exports._tr_tally = _tr_tally;
	exports._tr_align = _tr_align;

	},{"../utils/common":52}],62:[function(require,module,exports){

	// (C) 1995-2013 Jean-loup Gailly and Mark Adler
	// (C) 2014-2017 Vitaly Puzrin and Andrey Tupitsin
	//
	// This software is provided 'as-is', without any express or implied
	// warranty. In no event will the authors be held liable for any damages
	// arising from the use of this software.
	//
	// Permission is granted to anyone to use this software for any purpose,
	// including commercial applications, and to alter it and redistribute it
	// freely, subject to the following restrictions:
	//
	// 1. The origin of this software must not be misrepresented; you must not
	//   claim that you wrote the original software. If you use this software
	//   in a product, an acknowledgment in the product documentation would be
	//   appreciated but is not required.
	// 2. Altered source versions must be plainly marked as such, and must not be
	//   misrepresented as being the original software.
	// 3. This notice may not be removed or altered from any source distribution.

	function ZStream() {
	  /* next input byte */
	  this.input = null; // JS specific, because we have no pointers
	  this.next_in = 0;
	  /* number of bytes available at input */
	  this.avail_in = 0;
	  /* total number of input bytes read so far */
	  this.total_in = 0;
	  /* next output byte should be put there */
	  this.output = null; // JS specific, because we have no pointers
	  this.next_out = 0;
	  /* remaining free space at output */
	  this.avail_out = 0;
	  /* total number of bytes output so far */
	  this.total_out = 0;
	  /* last error message, NULL if no error */
	  this.msg = ''/*Z_NULL*/;
	  /* not visible by applications */
	  this.state = null;
	  /* best guess about the data type: binary or text */
	  this.data_type = 2/*Z_UNKNOWN*/;
	  /* adler32 value of the uncompressed data */
	  this.adler = 0;
	}

	module.exports = ZStream;

	},{}],63:[function(require,module,exports){
	// shim for using process in browser
	var process = module.exports = {};

	// cached from whatever global is present so that test runners that stub it
	// don't break things.  But we need to wrap it in a try catch in case it is
	// wrapped in strict mode code which doesn't define any globals.  It's inside a
	// function because try/catches deoptimize in certain engines.

	var cachedSetTimeout;
	var cachedClearTimeout;

	function defaultSetTimout() {
	    throw new Error('setTimeout has not been defined');
	}
	function defaultClearTimeout () {
	    throw new Error('clearTimeout has not been defined');
	}
	(function () {
	    try {
	        if (typeof setTimeout === 'function') {
	            cachedSetTimeout = setTimeout;
	        } else {
	            cachedSetTimeout = defaultSetTimout;
	        }
	    } catch (e) {
	        cachedSetTimeout = defaultSetTimout;
	    }
	    try {
	        if (typeof clearTimeout === 'function') {
	            cachedClearTimeout = clearTimeout;
	        } else {
	            cachedClearTimeout = defaultClearTimeout;
	        }
	    } catch (e) {
	        cachedClearTimeout = defaultClearTimeout;
	    }
	} ());
	function runTimeout(fun) {
	    if (cachedSetTimeout === setTimeout) {
	        //normal enviroments in sane situations
	        return setTimeout(fun, 0);
	    }
	    // if setTimeout wasn't available but was latter defined
	    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
	        cachedSetTimeout = setTimeout;
	        return setTimeout(fun, 0);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedSetTimeout(fun, 0);
	    } catch(e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
	            return cachedSetTimeout.call(null, fun, 0);
	        } catch(e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
	            return cachedSetTimeout.call(this, fun, 0);
	        }
	    }


	}
	function runClearTimeout(marker) {
	    if (cachedClearTimeout === clearTimeout) {
	        //normal enviroments in sane situations
	        return clearTimeout(marker);
	    }
	    // if clearTimeout wasn't available but was latter defined
	    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
	        cachedClearTimeout = clearTimeout;
	        return clearTimeout(marker);
	    }
	    try {
	        // when when somebody has screwed with setTimeout but no I.E. maddness
	        return cachedClearTimeout(marker);
	    } catch (e){
	        try {
	            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
	            return cachedClearTimeout.call(null, marker);
	        } catch (e){
	            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
	            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
	            return cachedClearTimeout.call(this, marker);
	        }
	    }



	}
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    if (!draining || !currentQueue) {
	        return;
	    }
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = runTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    runClearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        runTimeout(drainQueue);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	process.prependListener = noop;
	process.prependOnceListener = noop;

	process.listeners = function (name) { return [] };

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };

	},{}],64:[function(require,module,exports){
	/*! safe-buffer. MIT License. Feross Aboukhadijeh <https://feross.org/opensource> */
	/* eslint-disable node/no-deprecated-api */
	var buffer = require('buffer');
	var Buffer = buffer.Buffer;

	// alternative to using Object.keys for old browsers
	function copyProps (src, dst) {
	  for (var key in src) {
	    dst[key] = src[key];
	  }
	}
	if (Buffer.from && Buffer.alloc && Buffer.allocUnsafe && Buffer.allocUnsafeSlow) {
	  module.exports = buffer;
	} else {
	  // Copy properties from require('buffer')
	  copyProps(buffer, exports);
	  exports.Buffer = SafeBuffer;
	}

	function SafeBuffer (arg, encodingOrOffset, length) {
	  return Buffer(arg, encodingOrOffset, length)
	}

	SafeBuffer.prototype = Object.create(Buffer.prototype);

	// Copy static methods from Buffer
	copyProps(Buffer, SafeBuffer);

	SafeBuffer.from = function (arg, encodingOrOffset, length) {
	  if (typeof arg === 'number') {
	    throw new TypeError('Argument must not be a number')
	  }
	  return Buffer(arg, encodingOrOffset, length)
	};

	SafeBuffer.alloc = function (size, fill, encoding) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  var buf = Buffer(size);
	  if (fill !== undefined) {
	    if (typeof encoding === 'string') {
	      buf.fill(fill, encoding);
	    } else {
	      buf.fill(fill);
	    }
	  } else {
	    buf.fill(0);
	  }
	  return buf
	};

	SafeBuffer.allocUnsafe = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return Buffer(size)
	};

	SafeBuffer.allocUnsafeSlow = function (size) {
	  if (typeof size !== 'number') {
	    throw new TypeError('Argument must be a number')
	  }
	  return buffer.SlowBuffer(size)
	};

	},{"buffer":32}],65:[function(require,module,exports){
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	module.exports = Stream;

	var EE = require('events').EventEmitter;
	var inherits = require('inherits');

	inherits(Stream, EE);
	Stream.Readable = require('readable-stream/lib/_stream_readable.js');
	Stream.Writable = require('readable-stream/lib/_stream_writable.js');
	Stream.Duplex = require('readable-stream/lib/_stream_duplex.js');
	Stream.Transform = require('readable-stream/lib/_stream_transform.js');
	Stream.PassThrough = require('readable-stream/lib/_stream_passthrough.js');
	Stream.finished = require('readable-stream/lib/internal/streams/end-of-stream.js');
	Stream.pipeline = require('readable-stream/lib/internal/streams/pipeline.js');

	// Backwards-compat with node 0.4.x
	Stream.Stream = Stream;



	// old-style streams.  Note that the pipe method (the only relevant
	// part of this class) is overridden in the Readable class.

	function Stream() {
	  EE.call(this);
	}

	Stream.prototype.pipe = function(dest, options) {
	  var source = this;

	  function ondata(chunk) {
	    if (dest.writable) {
	      if (false === dest.write(chunk) && source.pause) {
	        source.pause();
	      }
	    }
	  }

	  source.on('data', ondata);

	  function ondrain() {
	    if (source.readable && source.resume) {
	      source.resume();
	    }
	  }

	  dest.on('drain', ondrain);

	  // If the 'end' option is not supplied, dest.end() will be called when
	  // source gets the 'end' or 'close' events.  Only dest.end() once.
	  if (!dest._isStdio && (!options || options.end !== false)) {
	    source.on('end', onend);
	    source.on('close', onclose);
	  }

	  var didOnEnd = false;
	  function onend() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    dest.end();
	  }


	  function onclose() {
	    if (didOnEnd) return;
	    didOnEnd = true;

	    if (typeof dest.destroy === 'function') dest.destroy();
	  }

	  // don't leave dangling pipes when there are errors.
	  function onerror(er) {
	    cleanup();
	    if (EE.listenerCount(this, 'error') === 0) {
	      throw er; // Unhandled stream error in pipe.
	    }
	  }

	  source.on('error', onerror);
	  dest.on('error', onerror);

	  // remove all the event listeners that were added.
	  function cleanup() {
	    source.removeListener('data', ondata);
	    dest.removeListener('drain', ondrain);

	    source.removeListener('end', onend);
	    source.removeListener('close', onclose);

	    source.removeListener('error', onerror);
	    dest.removeListener('error', onerror);

	    source.removeListener('end', cleanup);
	    source.removeListener('close', cleanup);

	    dest.removeListener('close', cleanup);
	  }

	  source.on('end', cleanup);
	  source.on('close', cleanup);

	  dest.on('close', cleanup);

	  dest.emit('pipe', source);

	  // Allow for unix-like usage: A.pipe(B).pipe(C)
	  return dest;
	};

	},{"events":35,"inherits":46,"readable-stream/lib/_stream_duplex.js":67,"readable-stream/lib/_stream_passthrough.js":68,"readable-stream/lib/_stream_readable.js":69,"readable-stream/lib/_stream_transform.js":70,"readable-stream/lib/_stream_writable.js":71,"readable-stream/lib/internal/streams/end-of-stream.js":75,"readable-stream/lib/internal/streams/pipeline.js":77}],66:[function(require,module,exports){

	function _inheritsLoose(subClass, superClass) { subClass.prototype = Object.create(superClass.prototype); subClass.prototype.constructor = subClass; subClass.__proto__ = superClass; }

	var codes = {};

	function createErrorType(code, message, Base) {
	  if (!Base) {
	    Base = Error;
	  }

	  function getMessage(arg1, arg2, arg3) {
	    if (typeof message === 'string') {
	      return message;
	    } else {
	      return message(arg1, arg2, arg3);
	    }
	  }

	  var NodeError =
	  /*#__PURE__*/
	  function (_Base) {
	    _inheritsLoose(NodeError, _Base);

	    function NodeError(arg1, arg2, arg3) {
	      return _Base.call(this, getMessage(arg1, arg2, arg3)) || this;
	    }

	    return NodeError;
	  }(Base);

	  NodeError.prototype.name = Base.name;
	  NodeError.prototype.code = code;
	  codes[code] = NodeError;
	} // https://github.com/nodejs/node/blob/v10.8.0/lib/internal/errors.js


	function oneOf(expected, thing) {
	  if (Array.isArray(expected)) {
	    var len = expected.length;
	    expected = expected.map(function (i) {
	      return String(i);
	    });

	    if (len > 2) {
	      return "one of ".concat(thing, " ").concat(expected.slice(0, len - 1).join(', '), ", or ") + expected[len - 1];
	    } else if (len === 2) {
	      return "one of ".concat(thing, " ").concat(expected[0], " or ").concat(expected[1]);
	    } else {
	      return "of ".concat(thing, " ").concat(expected[0]);
	    }
	  } else {
	    return "of ".concat(thing, " ").concat(String(expected));
	  }
	} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/startsWith


	function startsWith(str, search, pos) {
	  return str.substr(0 , search.length) === search;
	} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/endsWith


	function endsWith(str, search, this_len) {
	  if (this_len === undefined || this_len > str.length) {
	    this_len = str.length;
	  }

	  return str.substring(this_len - search.length, this_len) === search;
	} // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/includes


	function includes(str, search, start) {
	  if (typeof start !== 'number') {
	    start = 0;
	  }

	  if (start + search.length > str.length) {
	    return false;
	  } else {
	    return str.indexOf(search, start) !== -1;
	  }
	}

	createErrorType('ERR_INVALID_OPT_VALUE', function (name, value) {
	  return 'The value "' + value + '" is invalid for option "' + name + '"';
	}, TypeError);
	createErrorType('ERR_INVALID_ARG_TYPE', function (name, expected, actual) {
	  // determiner: 'must be' or 'must not be'
	  var determiner;

	  if (typeof expected === 'string' && startsWith(expected, 'not ')) {
	    determiner = 'must not be';
	    expected = expected.replace(/^not /, '');
	  } else {
	    determiner = 'must be';
	  }

	  var msg;

	  if (endsWith(name, ' argument')) {
	    // For cases like 'first argument'
	    msg = "The ".concat(name, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
	  } else {
	    var type = includes(name, '.') ? 'property' : 'argument';
	    msg = "The \"".concat(name, "\" ").concat(type, " ").concat(determiner, " ").concat(oneOf(expected, 'type'));
	  }

	  msg += ". Received type ".concat(typeof actual);
	  return msg;
	}, TypeError);
	createErrorType('ERR_STREAM_PUSH_AFTER_EOF', 'stream.push() after EOF');
	createErrorType('ERR_METHOD_NOT_IMPLEMENTED', function (name) {
	  return 'The ' + name + ' method is not implemented';
	});
	createErrorType('ERR_STREAM_PREMATURE_CLOSE', 'Premature close');
	createErrorType('ERR_STREAM_DESTROYED', function (name) {
	  return 'Cannot call ' + name + ' after a stream was destroyed';
	});
	createErrorType('ERR_MULTIPLE_CALLBACK', 'Callback called multiple times');
	createErrorType('ERR_STREAM_CANNOT_PIPE', 'Cannot pipe, not readable');
	createErrorType('ERR_STREAM_WRITE_AFTER_END', 'write after end');
	createErrorType('ERR_STREAM_NULL_VALUES', 'May not write null values to stream', TypeError);
	createErrorType('ERR_UNKNOWN_ENCODING', function (arg) {
	  return 'Unknown encoding: ' + arg;
	}, TypeError);
	createErrorType('ERR_STREAM_UNSHIFT_AFTER_END_EVENT', 'stream.unshift() after end event');
	module.exports.codes = codes;

	},{}],67:[function(require,module,exports){
	(function (process){(function (){
	/*<replacement>*/

	var objectKeys = Object.keys || function (obj) {
	  var keys = [];

	  for (var key in obj) {
	    keys.push(key);
	  }

	  return keys;
	};
	/*</replacement>*/


	module.exports = Duplex;

	var Readable = require('./_stream_readable');

	var Writable = require('./_stream_writable');

	require('inherits')(Duplex, Readable);

	{
	  // Allow the keys array to be GC'ed.
	  var keys = objectKeys(Writable.prototype);

	  for (var v = 0; v < keys.length; v++) {
	    var method = keys[v];
	    if (!Duplex.prototype[method]) Duplex.prototype[method] = Writable.prototype[method];
	  }
	}

	function Duplex(options) {
	  if (!(this instanceof Duplex)) return new Duplex(options);
	  Readable.call(this, options);
	  Writable.call(this, options);
	  this.allowHalfOpen = true;

	  if (options) {
	    if (options.readable === false) this.readable = false;
	    if (options.writable === false) this.writable = false;

	    if (options.allowHalfOpen === false) {
	      this.allowHalfOpen = false;
	      this.once('end', onend);
	    }
	  }
	}

	Object.defineProperty(Duplex.prototype, 'writableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.highWaterMark;
	  }
	});
	Object.defineProperty(Duplex.prototype, 'writableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState && this._writableState.getBuffer();
	  }
	});
	Object.defineProperty(Duplex.prototype, 'writableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.length;
	  }
	}); // the no-half-open enforcer

	function onend() {
	  // If the writable side ended, then we're ok.
	  if (this._writableState.ended) return; // no more data can be written.
	  // But allow more writes to happen in this tick.

	  process.nextTick(onEndNT, this);
	}

	function onEndNT(self) {
	  self.end();
	}

	Object.defineProperty(Duplex.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return false;
	    }

	    return this._readableState.destroyed && this._writableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (this._readableState === undefined || this._writableState === undefined) {
	      return;
	    } // backward compatibility, the user is explicitly
	    // managing destroyed


	    this._readableState.destroyed = value;
	    this._writableState.destroyed = value;
	  }
	});
	}).call(this);}).call(this,require('_process'));
	},{"./_stream_readable":69,"./_stream_writable":71,"_process":63,"inherits":46}],68:[function(require,module,exports){

	module.exports = PassThrough;

	var Transform = require('./_stream_transform');

	require('inherits')(PassThrough, Transform);

	function PassThrough(options) {
	  if (!(this instanceof PassThrough)) return new PassThrough(options);
	  Transform.call(this, options);
	}

	PassThrough.prototype._transform = function (chunk, encoding, cb) {
	  cb(null, chunk);
	};
	},{"./_stream_transform":70,"inherits":46}],69:[function(require,module,exports){
	(function (process,global){(function (){

	module.exports = Readable;
	/*<replacement>*/

	var Duplex;
	/*</replacement>*/

	Readable.ReadableState = ReadableState;
	/*<replacement>*/

	require('events').EventEmitter;

	var EElistenerCount = function EElistenerCount(emitter, type) {
	  return emitter.listeners(type).length;
	};
	/*</replacement>*/

	/*<replacement>*/


	var Stream = require('./internal/streams/stream');
	/*</replacement>*/


	var Buffer = require('buffer').Buffer;

	var OurUint8Array = global.Uint8Array || function () {};

	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}

	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}
	/*<replacement>*/


	var debugUtil = require('util');

	var debug;

	if (debugUtil && debugUtil.debuglog) {
	  debug = debugUtil.debuglog('stream');
	} else {
	  debug = function debug() {};
	}
	/*</replacement>*/


	var BufferList = require('./internal/streams/buffer_list');

	var destroyImpl = require('./internal/streams/destroy');

	var _require = require('./internal/streams/state'),
	    getHighWaterMark = _require.getHighWaterMark;

	var _require$codes = require('../errors').codes,
	    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
	    ERR_STREAM_PUSH_AFTER_EOF = _require$codes.ERR_STREAM_PUSH_AFTER_EOF,
	    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
	    ERR_STREAM_UNSHIFT_AFTER_END_EVENT = _require$codes.ERR_STREAM_UNSHIFT_AFTER_END_EVENT; // Lazy loaded to improve the startup performance.


	var StringDecoder;
	var createReadableStreamAsyncIterator;
	var from;

	require('inherits')(Readable, Stream);

	var errorOrDestroy = destroyImpl.errorOrDestroy;
	var kProxyEvents = ['error', 'close', 'destroy', 'pause', 'resume'];

	function prependListener(emitter, event, fn) {
	  // Sadly this is not cacheable as some libraries bundle their own
	  // event emitter implementation with them.
	  if (typeof emitter.prependListener === 'function') return emitter.prependListener(event, fn); // This is a hack to make sure that our error handler is attached before any
	  // userland ones.  NEVER DO THIS. This is here only because this code needs
	  // to continue to work with older versions of Node.js that do not include
	  // the prependListener() method. The goal is to eventually remove this hack.

	  if (!emitter._events || !emitter._events[event]) emitter.on(event, fn);else if (Array.isArray(emitter._events[event])) emitter._events[event].unshift(fn);else emitter._events[event] = [fn, emitter._events[event]];
	}

	function ReadableState(options, stream, isDuplex) {
	  Duplex = Duplex || require('./_stream_duplex');
	  options = options || {}; // Duplex streams are both readable and writable, but share
	  // the same options object.
	  // However, some cases require setting options to different
	  // values for the readable and the writable sides of the duplex stream.
	  // These options can be provided separately as readableXXX and writableXXX.

	  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag. Used to make read(n) ignore n and to
	  // make all the buffer merging and length checks go away

	  this.objectMode = !!options.objectMode;
	  if (isDuplex) this.objectMode = this.objectMode || !!options.readableObjectMode; // the point at which it stops calling _read() to fill the buffer
	  // Note: 0 is a valid value, means "don't call _read preemptively ever"

	  this.highWaterMark = getHighWaterMark(this, options, 'readableHighWaterMark', isDuplex); // A linked list is used to store data chunks instead of an array because the
	  // linked list can remove elements from the beginning faster than
	  // array.shift()

	  this.buffer = new BufferList();
	  this.length = 0;
	  this.pipes = null;
	  this.pipesCount = 0;
	  this.flowing = null;
	  this.ended = false;
	  this.endEmitted = false;
	  this.reading = false; // a flag to be able to tell if the event 'readable'/'data' is emitted
	  // immediately, or on a later tick.  We set this to true at first, because
	  // any actions that shouldn't happen until "later" should generally also
	  // not happen before the first read call.

	  this.sync = true; // whenever we return null, then we set a flag to say
	  // that we're awaiting a 'readable' event emission.

	  this.needReadable = false;
	  this.emittedReadable = false;
	  this.readableListening = false;
	  this.resumeScheduled = false;
	  this.paused = true; // Should close be emitted on destroy. Defaults to true.

	  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'end' (and potentially 'finish')

	  this.autoDestroy = !!options.autoDestroy; // has it been destroyed

	  this.destroyed = false; // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.

	  this.defaultEncoding = options.defaultEncoding || 'utf8'; // the number of writers that are awaiting a drain event in .pipe()s

	  this.awaitDrain = 0; // if true, a maybeReadMore has been scheduled

	  this.readingMore = false;
	  this.decoder = null;
	  this.encoding = null;

	  if (options.encoding) {
	    if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
	    this.decoder = new StringDecoder(options.encoding);
	    this.encoding = options.encoding;
	  }
	}

	function Readable(options) {
	  Duplex = Duplex || require('./_stream_duplex');
	  if (!(this instanceof Readable)) return new Readable(options); // Checking for a Stream.Duplex instance is faster here instead of inside
	  // the ReadableState constructor, at least with V8 6.5

	  var isDuplex = this instanceof Duplex;
	  this._readableState = new ReadableState(options, this, isDuplex); // legacy

	  this.readable = true;

	  if (options) {
	    if (typeof options.read === 'function') this._read = options.read;
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	  }

	  Stream.call(this);
	}

	Object.defineProperty(Readable.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._readableState === undefined) {
	      return false;
	    }

	    return this._readableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._readableState) {
	      return;
	    } // backward compatibility, the user is explicitly
	    // managing destroyed


	    this._readableState.destroyed = value;
	  }
	});
	Readable.prototype.destroy = destroyImpl.destroy;
	Readable.prototype._undestroy = destroyImpl.undestroy;

	Readable.prototype._destroy = function (err, cb) {
	  cb(err);
	}; // Manually shove something into the read() buffer.
	// This returns true if the highWaterMark has not been hit yet,
	// similar to how Writable.write() returns true if you should
	// write() some more.


	Readable.prototype.push = function (chunk, encoding) {
	  var state = this._readableState;
	  var skipChunkCheck;

	  if (!state.objectMode) {
	    if (typeof chunk === 'string') {
	      encoding = encoding || state.defaultEncoding;

	      if (encoding !== state.encoding) {
	        chunk = Buffer.from(chunk, encoding);
	        encoding = '';
	      }

	      skipChunkCheck = true;
	    }
	  } else {
	    skipChunkCheck = true;
	  }

	  return readableAddChunk(this, chunk, encoding, false, skipChunkCheck);
	}; // Unshift should *always* be something directly out of read()


	Readable.prototype.unshift = function (chunk) {
	  return readableAddChunk(this, chunk, null, true, false);
	};

	function readableAddChunk(stream, chunk, encoding, addToFront, skipChunkCheck) {
	  debug('readableAddChunk', chunk);
	  var state = stream._readableState;

	  if (chunk === null) {
	    state.reading = false;
	    onEofChunk(stream, state);
	  } else {
	    var er;
	    if (!skipChunkCheck) er = chunkInvalid(state, chunk);

	    if (er) {
	      errorOrDestroy(stream, er);
	    } else if (state.objectMode || chunk && chunk.length > 0) {
	      if (typeof chunk !== 'string' && !state.objectMode && Object.getPrototypeOf(chunk) !== Buffer.prototype) {
	        chunk = _uint8ArrayToBuffer(chunk);
	      }

	      if (addToFront) {
	        if (state.endEmitted) errorOrDestroy(stream, new ERR_STREAM_UNSHIFT_AFTER_END_EVENT());else addChunk(stream, state, chunk, true);
	      } else if (state.ended) {
	        errorOrDestroy(stream, new ERR_STREAM_PUSH_AFTER_EOF());
	      } else if (state.destroyed) {
	        return false;
	      } else {
	        state.reading = false;

	        if (state.decoder && !encoding) {
	          chunk = state.decoder.write(chunk);
	          if (state.objectMode || chunk.length !== 0) addChunk(stream, state, chunk, false);else maybeReadMore(stream, state);
	        } else {
	          addChunk(stream, state, chunk, false);
	        }
	      }
	    } else if (!addToFront) {
	      state.reading = false;
	      maybeReadMore(stream, state);
	    }
	  } // We can push more data if we are below the highWaterMark.
	  // Also, if we have no data yet, we can stand some more bytes.
	  // This is to work around cases where hwm=0, such as the repl.


	  return !state.ended && (state.length < state.highWaterMark || state.length === 0);
	}

	function addChunk(stream, state, chunk, addToFront) {
	  if (state.flowing && state.length === 0 && !state.sync) {
	    state.awaitDrain = 0;
	    stream.emit('data', chunk);
	  } else {
	    // update the buffer info.
	    state.length += state.objectMode ? 1 : chunk.length;
	    if (addToFront) state.buffer.unshift(chunk);else state.buffer.push(chunk);
	    if (state.needReadable) emitReadable(stream);
	  }

	  maybeReadMore(stream, state);
	}

	function chunkInvalid(state, chunk) {
	  var er;

	  if (!_isUint8Array(chunk) && typeof chunk !== 'string' && chunk !== undefined && !state.objectMode) {
	    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer', 'Uint8Array'], chunk);
	  }

	  return er;
	}

	Readable.prototype.isPaused = function () {
	  return this._readableState.flowing === false;
	}; // backwards compatibility.


	Readable.prototype.setEncoding = function (enc) {
	  if (!StringDecoder) StringDecoder = require('string_decoder/').StringDecoder;
	  var decoder = new StringDecoder(enc);
	  this._readableState.decoder = decoder; // If setEncoding(null), decoder.encoding equals utf8

	  this._readableState.encoding = this._readableState.decoder.encoding; // Iterate over current buffer to convert already stored Buffers:

	  var p = this._readableState.buffer.head;
	  var content = '';

	  while (p !== null) {
	    content += decoder.write(p.data);
	    p = p.next;
	  }

	  this._readableState.buffer.clear();

	  if (content !== '') this._readableState.buffer.push(content);
	  this._readableState.length = content.length;
	  return this;
	}; // Don't raise the hwm > 1GB


	var MAX_HWM = 0x40000000;

	function computeNewHighWaterMark(n) {
	  if (n >= MAX_HWM) {
	    // TODO(ronag): Throw ERR_VALUE_OUT_OF_RANGE.
	    n = MAX_HWM;
	  } else {
	    // Get the next highest power of 2 to prevent increasing hwm excessively in
	    // tiny amounts
	    n--;
	    n |= n >>> 1;
	    n |= n >>> 2;
	    n |= n >>> 4;
	    n |= n >>> 8;
	    n |= n >>> 16;
	    n++;
	  }

	  return n;
	} // This function is designed to be inlinable, so please take care when making
	// changes to the function body.


	function howMuchToRead(n, state) {
	  if (n <= 0 || state.length === 0 && state.ended) return 0;
	  if (state.objectMode) return 1;

	  if (n !== n) {
	    // Only flow one buffer at a time
	    if (state.flowing && state.length) return state.buffer.head.data.length;else return state.length;
	  } // If we're asking for more than the current hwm, then raise the hwm.


	  if (n > state.highWaterMark) state.highWaterMark = computeNewHighWaterMark(n);
	  if (n <= state.length) return n; // Don't have enough

	  if (!state.ended) {
	    state.needReadable = true;
	    return 0;
	  }

	  return state.length;
	} // you can override either this method, or the async _read(n) below.


	Readable.prototype.read = function (n) {
	  debug('read', n);
	  n = parseInt(n, 10);
	  var state = this._readableState;
	  var nOrig = n;
	  if (n !== 0) state.emittedReadable = false; // if we're doing read(0) to trigger a readable event, but we
	  // already have a bunch of data in the buffer, then just trigger
	  // the 'readable' event and move on.

	  if (n === 0 && state.needReadable && ((state.highWaterMark !== 0 ? state.length >= state.highWaterMark : state.length > 0) || state.ended)) {
	    debug('read: emitReadable', state.length, state.ended);
	    if (state.length === 0 && state.ended) endReadable(this);else emitReadable(this);
	    return null;
	  }

	  n = howMuchToRead(n, state); // if we've ended, and we're now clear, then finish it up.

	  if (n === 0 && state.ended) {
	    if (state.length === 0) endReadable(this);
	    return null;
	  } // All the actual chunk generation logic needs to be
	  // *below* the call to _read.  The reason is that in certain
	  // synthetic stream cases, such as passthrough streams, _read
	  // may be a completely synchronous operation which may change
	  // the state of the read buffer, providing enough data when
	  // before there was *not* enough.
	  //
	  // So, the steps are:
	  // 1. Figure out what the state of things will be after we do
	  // a read from the buffer.
	  //
	  // 2. If that resulting state will trigger a _read, then call _read.
	  // Note that this may be asynchronous, or synchronous.  Yes, it is
	  // deeply ugly to write APIs this way, but that still doesn't mean
	  // that the Readable class should behave improperly, as streams are
	  // designed to be sync/async agnostic.
	  // Take note if the _read call is sync or async (ie, if the read call
	  // has returned yet), so that we know whether or not it's safe to emit
	  // 'readable' etc.
	  //
	  // 3. Actually pull the requested chunks out of the buffer and return.
	  // if we need a readable event, then we need to do some reading.


	  var doRead = state.needReadable;
	  debug('need readable', doRead); // if we currently have less than the highWaterMark, then also read some

	  if (state.length === 0 || state.length - n < state.highWaterMark) {
	    doRead = true;
	    debug('length less than watermark', doRead);
	  } // however, if we've ended, then there's no point, and if we're already
	  // reading, then it's unnecessary.


	  if (state.ended || state.reading) {
	    doRead = false;
	    debug('reading or ended', doRead);
	  } else if (doRead) {
	    debug('do read');
	    state.reading = true;
	    state.sync = true; // if the length is currently zero, then we *need* a readable event.

	    if (state.length === 0) state.needReadable = true; // call internal read method

	    this._read(state.highWaterMark);

	    state.sync = false; // If _read pushed data synchronously, then `reading` will be false,
	    // and we need to re-evaluate how much data we can return to the user.

	    if (!state.reading) n = howMuchToRead(nOrig, state);
	  }

	  var ret;
	  if (n > 0) ret = fromList(n, state);else ret = null;

	  if (ret === null) {
	    state.needReadable = state.length <= state.highWaterMark;
	    n = 0;
	  } else {
	    state.length -= n;
	    state.awaitDrain = 0;
	  }

	  if (state.length === 0) {
	    // If we have nothing in the buffer, then we want to know
	    // as soon as we *do* get something into the buffer.
	    if (!state.ended) state.needReadable = true; // If we tried to read() past the EOF, then emit end on the next tick.

	    if (nOrig !== n && state.ended) endReadable(this);
	  }

	  if (ret !== null) this.emit('data', ret);
	  return ret;
	};

	function onEofChunk(stream, state) {
	  debug('onEofChunk');
	  if (state.ended) return;

	  if (state.decoder) {
	    var chunk = state.decoder.end();

	    if (chunk && chunk.length) {
	      state.buffer.push(chunk);
	      state.length += state.objectMode ? 1 : chunk.length;
	    }
	  }

	  state.ended = true;

	  if (state.sync) {
	    // if we are sync, wait until next tick to emit the data.
	    // Otherwise we risk emitting data in the flow()
	    // the readable code triggers during a read() call
	    emitReadable(stream);
	  } else {
	    // emit 'readable' now to make sure it gets picked up.
	    state.needReadable = false;

	    if (!state.emittedReadable) {
	      state.emittedReadable = true;
	      emitReadable_(stream);
	    }
	  }
	} // Don't emit readable right away in sync mode, because this can trigger
	// another read() call => stack overflow.  This way, it might trigger
	// a nextTick recursion warning, but that's not so bad.


	function emitReadable(stream) {
	  var state = stream._readableState;
	  debug('emitReadable', state.needReadable, state.emittedReadable);
	  state.needReadable = false;

	  if (!state.emittedReadable) {
	    debug('emitReadable', state.flowing);
	    state.emittedReadable = true;
	    process.nextTick(emitReadable_, stream);
	  }
	}

	function emitReadable_(stream) {
	  var state = stream._readableState;
	  debug('emitReadable_', state.destroyed, state.length, state.ended);

	  if (!state.destroyed && (state.length || state.ended)) {
	    stream.emit('readable');
	    state.emittedReadable = false;
	  } // The stream needs another readable event if
	  // 1. It is not flowing, as the flow mechanism will take
	  //    care of it.
	  // 2. It is not ended.
	  // 3. It is below the highWaterMark, so we can schedule
	  //    another readable later.


	  state.needReadable = !state.flowing && !state.ended && state.length <= state.highWaterMark;
	  flow(stream);
	} // at this point, the user has presumably seen the 'readable' event,
	// and called read() to consume some data.  that may have triggered
	// in turn another _read(n) call, in which case reading = true if
	// it's in progress.
	// However, if we're not ended, or reading, and the length < hwm,
	// then go ahead and try to read some more preemptively.


	function maybeReadMore(stream, state) {
	  if (!state.readingMore) {
	    state.readingMore = true;
	    process.nextTick(maybeReadMore_, stream, state);
	  }
	}

	function maybeReadMore_(stream, state) {
	  // Attempt to read more data if we should.
	  //
	  // The conditions for reading more data are (one of):
	  // - Not enough data buffered (state.length < state.highWaterMark). The loop
	  //   is responsible for filling the buffer with enough data if such data
	  //   is available. If highWaterMark is 0 and we are not in the flowing mode
	  //   we should _not_ attempt to buffer any extra data. We'll get more data
	  //   when the stream consumer calls read() instead.
	  // - No data in the buffer, and the stream is in flowing mode. In this mode
	  //   the loop below is responsible for ensuring read() is called. Failing to
	  //   call read here would abort the flow and there's no other mechanism for
	  //   continuing the flow if the stream consumer has just subscribed to the
	  //   'data' event.
	  //
	  // In addition to the above conditions to keep reading data, the following
	  // conditions prevent the data from being read:
	  // - The stream has ended (state.ended).
	  // - There is already a pending 'read' operation (state.reading). This is a
	  //   case where the the stream has called the implementation defined _read()
	  //   method, but they are processing the call asynchronously and have _not_
	  //   called push() with new data. In this case we skip performing more
	  //   read()s. The execution ends in this method again after the _read() ends
	  //   up calling push() with more data.
	  while (!state.reading && !state.ended && (state.length < state.highWaterMark || state.flowing && state.length === 0)) {
	    var len = state.length;
	    debug('maybeReadMore read 0');
	    stream.read(0);
	    if (len === state.length) // didn't get any data, stop spinning.
	      break;
	  }

	  state.readingMore = false;
	} // abstract method.  to be overridden in specific implementation classes.
	// call cb(er, data) where data is <= n in length.
	// for virtual (non-string, non-buffer) streams, "length" is somewhat
	// arbitrary, and perhaps not very meaningful.


	Readable.prototype._read = function (n) {
	  errorOrDestroy(this, new ERR_METHOD_NOT_IMPLEMENTED('_read()'));
	};

	Readable.prototype.pipe = function (dest, pipeOpts) {
	  var src = this;
	  var state = this._readableState;

	  switch (state.pipesCount) {
	    case 0:
	      state.pipes = dest;
	      break;

	    case 1:
	      state.pipes = [state.pipes, dest];
	      break;

	    default:
	      state.pipes.push(dest);
	      break;
	  }

	  state.pipesCount += 1;
	  debug('pipe count=%d opts=%j', state.pipesCount, pipeOpts);
	  var doEnd = (!pipeOpts || pipeOpts.end !== false) && dest !== process.stdout && dest !== process.stderr;
	  var endFn = doEnd ? onend : unpipe;
	  if (state.endEmitted) process.nextTick(endFn);else src.once('end', endFn);
	  dest.on('unpipe', onunpipe);

	  function onunpipe(readable, unpipeInfo) {
	    debug('onunpipe');

	    if (readable === src) {
	      if (unpipeInfo && unpipeInfo.hasUnpiped === false) {
	        unpipeInfo.hasUnpiped = true;
	        cleanup();
	      }
	    }
	  }

	  function onend() {
	    debug('onend');
	    dest.end();
	  } // when the dest drains, it reduces the awaitDrain counter
	  // on the source.  This would be more elegant with a .once()
	  // handler in flow(), but adding and removing repeatedly is
	  // too slow.


	  var ondrain = pipeOnDrain(src);
	  dest.on('drain', ondrain);
	  var cleanedUp = false;

	  function cleanup() {
	    debug('cleanup'); // cleanup event handlers once the pipe is broken

	    dest.removeListener('close', onclose);
	    dest.removeListener('finish', onfinish);
	    dest.removeListener('drain', ondrain);
	    dest.removeListener('error', onerror);
	    dest.removeListener('unpipe', onunpipe);
	    src.removeListener('end', onend);
	    src.removeListener('end', unpipe);
	    src.removeListener('data', ondata);
	    cleanedUp = true; // if the reader is waiting for a drain event from this
	    // specific writer, then it would cause it to never start
	    // flowing again.
	    // So, if this is awaiting a drain, then we just call it now.
	    // If we don't know, then assume that we are waiting for one.

	    if (state.awaitDrain && (!dest._writableState || dest._writableState.needDrain)) ondrain();
	  }

	  src.on('data', ondata);

	  function ondata(chunk) {
	    debug('ondata');
	    var ret = dest.write(chunk);
	    debug('dest.write', ret);

	    if (ret === false) {
	      // If the user unpiped during `dest.write()`, it is possible
	      // to get stuck in a permanently paused state if that write
	      // also returned false.
	      // => Check whether `dest` is still a piping destination.
	      if ((state.pipesCount === 1 && state.pipes === dest || state.pipesCount > 1 && indexOf(state.pipes, dest) !== -1) && !cleanedUp) {
	        debug('false write response, pause', state.awaitDrain);
	        state.awaitDrain++;
	      }

	      src.pause();
	    }
	  } // if the dest has an error, then stop piping into it.
	  // however, don't suppress the throwing behavior for this.


	  function onerror(er) {
	    debug('onerror', er);
	    unpipe();
	    dest.removeListener('error', onerror);
	    if (EElistenerCount(dest, 'error') === 0) errorOrDestroy(dest, er);
	  } // Make sure our error handler is attached before userland ones.


	  prependListener(dest, 'error', onerror); // Both close and finish should trigger unpipe, but only once.

	  function onclose() {
	    dest.removeListener('finish', onfinish);
	    unpipe();
	  }

	  dest.once('close', onclose);

	  function onfinish() {
	    debug('onfinish');
	    dest.removeListener('close', onclose);
	    unpipe();
	  }

	  dest.once('finish', onfinish);

	  function unpipe() {
	    debug('unpipe');
	    src.unpipe(dest);
	  } // tell the dest that it's being piped to


	  dest.emit('pipe', src); // start the flow if it hasn't been started already.

	  if (!state.flowing) {
	    debug('pipe resume');
	    src.resume();
	  }

	  return dest;
	};

	function pipeOnDrain(src) {
	  return function pipeOnDrainFunctionResult() {
	    var state = src._readableState;
	    debug('pipeOnDrain', state.awaitDrain);
	    if (state.awaitDrain) state.awaitDrain--;

	    if (state.awaitDrain === 0 && EElistenerCount(src, 'data')) {
	      state.flowing = true;
	      flow(src);
	    }
	  };
	}

	Readable.prototype.unpipe = function (dest) {
	  var state = this._readableState;
	  var unpipeInfo = {
	    hasUnpiped: false
	  }; // if we're not piping anywhere, then do nothing.

	  if (state.pipesCount === 0) return this; // just one destination.  most common case.

	  if (state.pipesCount === 1) {
	    // passed in one, but it's not the right one.
	    if (dest && dest !== state.pipes) return this;
	    if (!dest) dest = state.pipes; // got a match.

	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;
	    if (dest) dest.emit('unpipe', this, unpipeInfo);
	    return this;
	  } // slow case. multiple pipe destinations.


	  if (!dest) {
	    // remove all.
	    var dests = state.pipes;
	    var len = state.pipesCount;
	    state.pipes = null;
	    state.pipesCount = 0;
	    state.flowing = false;

	    for (var i = 0; i < len; i++) {
	      dests[i].emit('unpipe', this, {
	        hasUnpiped: false
	      });
	    }

	    return this;
	  } // try to find the right one.


	  var index = indexOf(state.pipes, dest);
	  if (index === -1) return this;
	  state.pipes.splice(index, 1);
	  state.pipesCount -= 1;
	  if (state.pipesCount === 1) state.pipes = state.pipes[0];
	  dest.emit('unpipe', this, unpipeInfo);
	  return this;
	}; // set up data events if they are asked for
	// Ensure readable listeners eventually get something


	Readable.prototype.on = function (ev, fn) {
	  var res = Stream.prototype.on.call(this, ev, fn);
	  var state = this._readableState;

	  if (ev === 'data') {
	    // update readableListening so that resume() may be a no-op
	    // a few lines down. This is needed to support once('readable').
	    state.readableListening = this.listenerCount('readable') > 0; // Try start flowing on next tick if stream isn't explicitly paused

	    if (state.flowing !== false) this.resume();
	  } else if (ev === 'readable') {
	    if (!state.endEmitted && !state.readableListening) {
	      state.readableListening = state.needReadable = true;
	      state.flowing = false;
	      state.emittedReadable = false;
	      debug('on readable', state.length, state.reading);

	      if (state.length) {
	        emitReadable(this);
	      } else if (!state.reading) {
	        process.nextTick(nReadingNextTick, this);
	      }
	    }
	  }

	  return res;
	};

	Readable.prototype.addListener = Readable.prototype.on;

	Readable.prototype.removeListener = function (ev, fn) {
	  var res = Stream.prototype.removeListener.call(this, ev, fn);

	  if (ev === 'readable') {
	    // We need to check if there is someone still listening to
	    // readable and reset the state. However this needs to happen
	    // after readable has been emitted but before I/O (nextTick) to
	    // support once('readable', fn) cycles. This means that calling
	    // resume within the same tick will have no
	    // effect.
	    process.nextTick(updateReadableListening, this);
	  }

	  return res;
	};

	Readable.prototype.removeAllListeners = function (ev) {
	  var res = Stream.prototype.removeAllListeners.apply(this, arguments);

	  if (ev === 'readable' || ev === undefined) {
	    // We need to check if there is someone still listening to
	    // readable and reset the state. However this needs to happen
	    // after readable has been emitted but before I/O (nextTick) to
	    // support once('readable', fn) cycles. This means that calling
	    // resume within the same tick will have no
	    // effect.
	    process.nextTick(updateReadableListening, this);
	  }

	  return res;
	};

	function updateReadableListening(self) {
	  var state = self._readableState;
	  state.readableListening = self.listenerCount('readable') > 0;

	  if (state.resumeScheduled && !state.paused) {
	    // flowing needs to be set to true now, otherwise
	    // the upcoming resume will not flow.
	    state.flowing = true; // crude way to check if we should resume
	  } else if (self.listenerCount('data') > 0) {
	    self.resume();
	  }
	}

	function nReadingNextTick(self) {
	  debug('readable nexttick read 0');
	  self.read(0);
	} // pause() and resume() are remnants of the legacy readable stream API
	// If the user uses them, then switch into old mode.


	Readable.prototype.resume = function () {
	  var state = this._readableState;

	  if (!state.flowing) {
	    debug('resume'); // we flow only if there is no one listening
	    // for readable, but we still have to call
	    // resume()

	    state.flowing = !state.readableListening;
	    resume(this, state);
	  }

	  state.paused = false;
	  return this;
	};

	function resume(stream, state) {
	  if (!state.resumeScheduled) {
	    state.resumeScheduled = true;
	    process.nextTick(resume_, stream, state);
	  }
	}

	function resume_(stream, state) {
	  debug('resume', state.reading);

	  if (!state.reading) {
	    stream.read(0);
	  }

	  state.resumeScheduled = false;
	  stream.emit('resume');
	  flow(stream);
	  if (state.flowing && !state.reading) stream.read(0);
	}

	Readable.prototype.pause = function () {
	  debug('call pause flowing=%j', this._readableState.flowing);

	  if (this._readableState.flowing !== false) {
	    debug('pause');
	    this._readableState.flowing = false;
	    this.emit('pause');
	  }

	  this._readableState.paused = true;
	  return this;
	};

	function flow(stream) {
	  var state = stream._readableState;
	  debug('flow', state.flowing);

	  while (state.flowing && stream.read() !== null) {
	  }
	} // wrap an old-style stream as the async data source.
	// This is *not* part of the readable stream interface.
	// It is an ugly unfortunate mess of history.


	Readable.prototype.wrap = function (stream) {
	  var _this = this;

	  var state = this._readableState;
	  var paused = false;
	  stream.on('end', function () {
	    debug('wrapped end');

	    if (state.decoder && !state.ended) {
	      var chunk = state.decoder.end();
	      if (chunk && chunk.length) _this.push(chunk);
	    }

	    _this.push(null);
	  });
	  stream.on('data', function (chunk) {
	    debug('wrapped data');
	    if (state.decoder) chunk = state.decoder.write(chunk); // don't skip over falsy values in objectMode

	    if (state.objectMode && (chunk === null || chunk === undefined)) return;else if (!state.objectMode && (!chunk || !chunk.length)) return;

	    var ret = _this.push(chunk);

	    if (!ret) {
	      paused = true;
	      stream.pause();
	    }
	  }); // proxy all the other methods.
	  // important when wrapping filters and duplexes.

	  for (var i in stream) {
	    if (this[i] === undefined && typeof stream[i] === 'function') {
	      this[i] = function methodWrap(method) {
	        return function methodWrapReturnFunction() {
	          return stream[method].apply(stream, arguments);
	        };
	      }(i);
	    }
	  } // proxy certain important events.


	  for (var n = 0; n < kProxyEvents.length; n++) {
	    stream.on(kProxyEvents[n], this.emit.bind(this, kProxyEvents[n]));
	  } // when we try to consume some more bytes, simply unpause the
	  // underlying stream.


	  this._read = function (n) {
	    debug('wrapped _read', n);

	    if (paused) {
	      paused = false;
	      stream.resume();
	    }
	  };

	  return this;
	};

	if (typeof Symbol === 'function') {
	  Readable.prototype[Symbol.asyncIterator] = function () {
	    if (createReadableStreamAsyncIterator === undefined) {
	      createReadableStreamAsyncIterator = require('./internal/streams/async_iterator');
	    }

	    return createReadableStreamAsyncIterator(this);
	  };
	}

	Object.defineProperty(Readable.prototype, 'readableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.highWaterMark;
	  }
	});
	Object.defineProperty(Readable.prototype, 'readableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState && this._readableState.buffer;
	  }
	});
	Object.defineProperty(Readable.prototype, 'readableFlowing', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.flowing;
	  },
	  set: function set(state) {
	    if (this._readableState) {
	      this._readableState.flowing = state;
	    }
	  }
	}); // exposed for testing purposes only.

	Readable._fromList = fromList;
	Object.defineProperty(Readable.prototype, 'readableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._readableState.length;
	  }
	}); // Pluck off n bytes from an array of buffers.
	// Length is the combined lengths of all the buffers in the list.
	// This function is designed to be inlinable, so please take care when making
	// changes to the function body.

	function fromList(n, state) {
	  // nothing buffered
	  if (state.length === 0) return null;
	  var ret;
	  if (state.objectMode) ret = state.buffer.shift();else if (!n || n >= state.length) {
	    // read it all, truncate the list
	    if (state.decoder) ret = state.buffer.join('');else if (state.buffer.length === 1) ret = state.buffer.first();else ret = state.buffer.concat(state.length);
	    state.buffer.clear();
	  } else {
	    // read part of list
	    ret = state.buffer.consume(n, state.decoder);
	  }
	  return ret;
	}

	function endReadable(stream) {
	  var state = stream._readableState;
	  debug('endReadable', state.endEmitted);

	  if (!state.endEmitted) {
	    state.ended = true;
	    process.nextTick(endReadableNT, state, stream);
	  }
	}

	function endReadableNT(state, stream) {
	  debug('endReadableNT', state.endEmitted, state.length); // Check that we didn't get one last unshift.

	  if (!state.endEmitted && state.length === 0) {
	    state.endEmitted = true;
	    stream.readable = false;
	    stream.emit('end');

	    if (state.autoDestroy) {
	      // In case of duplex streams we need a way to detect
	      // if the writable side is ready for autoDestroy as well
	      var wState = stream._writableState;

	      if (!wState || wState.autoDestroy && wState.finished) {
	        stream.destroy();
	      }
	    }
	  }
	}

	if (typeof Symbol === 'function') {
	  Readable.from = function (iterable, opts) {
	    if (from === undefined) {
	      from = require('./internal/streams/from');
	    }

	    return from(Readable, iterable, opts);
	  };
	}

	function indexOf(xs, x) {
	  for (var i = 0, l = xs.length; i < l; i++) {
	    if (xs[i] === x) return i;
	  }

	  return -1;
	}
	}).call(this);}).call(this,require('_process'),typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	},{"../errors":66,"./_stream_duplex":67,"./internal/streams/async_iterator":72,"./internal/streams/buffer_list":73,"./internal/streams/destroy":74,"./internal/streams/from":76,"./internal/streams/state":78,"./internal/streams/stream":79,"_process":63,"buffer":32,"events":35,"inherits":46,"string_decoder/":80,"util":29}],70:[function(require,module,exports){

	module.exports = Transform;

	var _require$codes = require('../errors').codes,
	    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
	    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
	    ERR_TRANSFORM_ALREADY_TRANSFORMING = _require$codes.ERR_TRANSFORM_ALREADY_TRANSFORMING,
	    ERR_TRANSFORM_WITH_LENGTH_0 = _require$codes.ERR_TRANSFORM_WITH_LENGTH_0;

	var Duplex = require('./_stream_duplex');

	require('inherits')(Transform, Duplex);

	function afterTransform(er, data) {
	  var ts = this._transformState;
	  ts.transforming = false;
	  var cb = ts.writecb;

	  if (cb === null) {
	    return this.emit('error', new ERR_MULTIPLE_CALLBACK());
	  }

	  ts.writechunk = null;
	  ts.writecb = null;
	  if (data != null) // single equals check for both `null` and `undefined`
	    this.push(data);
	  cb(er);
	  var rs = this._readableState;
	  rs.reading = false;

	  if (rs.needReadable || rs.length < rs.highWaterMark) {
	    this._read(rs.highWaterMark);
	  }
	}

	function Transform(options) {
	  if (!(this instanceof Transform)) return new Transform(options);
	  Duplex.call(this, options);
	  this._transformState = {
	    afterTransform: afterTransform.bind(this),
	    needTransform: false,
	    transforming: false,
	    writecb: null,
	    writechunk: null,
	    writeencoding: null
	  }; // start out asking for a readable event once data is transformed.

	  this._readableState.needReadable = true; // we have implemented the _read method, and done the other things
	  // that Readable wants before the first _read call, so unset the
	  // sync guard flag.

	  this._readableState.sync = false;

	  if (options) {
	    if (typeof options.transform === 'function') this._transform = options.transform;
	    if (typeof options.flush === 'function') this._flush = options.flush;
	  } // When the writable side finishes, then flush out anything remaining.


	  this.on('prefinish', prefinish);
	}

	function prefinish() {
	  var _this = this;

	  if (typeof this._flush === 'function' && !this._readableState.destroyed) {
	    this._flush(function (er, data) {
	      done(_this, er, data);
	    });
	  } else {
	    done(this, null, null);
	  }
	}

	Transform.prototype.push = function (chunk, encoding) {
	  this._transformState.needTransform = false;
	  return Duplex.prototype.push.call(this, chunk, encoding);
	}; // This is the part where you do stuff!
	// override this function in implementation classes.
	// 'chunk' is an input chunk.
	//
	// Call `push(newChunk)` to pass along transformed output
	// to the readable side.  You may call 'push' zero or more times.
	//
	// Call `cb(err)` when you are done with this chunk.  If you pass
	// an error, then that'll put the hurt on the whole operation.  If you
	// never call cb(), then you'll never get another chunk.


	Transform.prototype._transform = function (chunk, encoding, cb) {
	  cb(new ERR_METHOD_NOT_IMPLEMENTED('_transform()'));
	};

	Transform.prototype._write = function (chunk, encoding, cb) {
	  var ts = this._transformState;
	  ts.writecb = cb;
	  ts.writechunk = chunk;
	  ts.writeencoding = encoding;

	  if (!ts.transforming) {
	    var rs = this._readableState;
	    if (ts.needTransform || rs.needReadable || rs.length < rs.highWaterMark) this._read(rs.highWaterMark);
	  }
	}; // Doesn't matter what the args are here.
	// _transform does all the work.
	// That we got here means that the readable side wants more data.


	Transform.prototype._read = function (n) {
	  var ts = this._transformState;

	  if (ts.writechunk !== null && !ts.transforming) {
	    ts.transforming = true;

	    this._transform(ts.writechunk, ts.writeencoding, ts.afterTransform);
	  } else {
	    // mark that we need a transform, so that any data that comes in
	    // will get processed, now that we've asked for it.
	    ts.needTransform = true;
	  }
	};

	Transform.prototype._destroy = function (err, cb) {
	  Duplex.prototype._destroy.call(this, err, function (err2) {
	    cb(err2);
	  });
	};

	function done(stream, er, data) {
	  if (er) return stream.emit('error', er);
	  if (data != null) // single equals check for both `null` and `undefined`
	    stream.push(data); // TODO(BridgeAR): Write a test for these two error cases
	  // if there's nothing in the write buffer, then that means
	  // that nothing more will ever be provided

	  if (stream._writableState.length) throw new ERR_TRANSFORM_WITH_LENGTH_0();
	  if (stream._transformState.transforming) throw new ERR_TRANSFORM_ALREADY_TRANSFORMING();
	  return stream.push(null);
	}
	},{"../errors":66,"./_stream_duplex":67,"inherits":46}],71:[function(require,module,exports){
	(function (process,global){(function (){

	module.exports = Writable;
	// there will be only 2 of these for each stream


	function CorkedRequest(state) {
	  var _this = this;

	  this.next = null;
	  this.entry = null;

	  this.finish = function () {
	    onCorkedFinish(_this, state);
	  };
	}
	/* </replacement> */

	/*<replacement>*/


	var Duplex;
	/*</replacement>*/

	Writable.WritableState = WritableState;
	/*<replacement>*/

	var internalUtil = {
	  deprecate: require('util-deprecate')
	};
	/*</replacement>*/

	/*<replacement>*/

	var Stream = require('./internal/streams/stream');
	/*</replacement>*/


	var Buffer = require('buffer').Buffer;

	var OurUint8Array = global.Uint8Array || function () {};

	function _uint8ArrayToBuffer(chunk) {
	  return Buffer.from(chunk);
	}

	function _isUint8Array(obj) {
	  return Buffer.isBuffer(obj) || obj instanceof OurUint8Array;
	}

	var destroyImpl = require('./internal/streams/destroy');

	var _require = require('./internal/streams/state'),
	    getHighWaterMark = _require.getHighWaterMark;

	var _require$codes = require('../errors').codes,
	    ERR_INVALID_ARG_TYPE = _require$codes.ERR_INVALID_ARG_TYPE,
	    ERR_METHOD_NOT_IMPLEMENTED = _require$codes.ERR_METHOD_NOT_IMPLEMENTED,
	    ERR_MULTIPLE_CALLBACK = _require$codes.ERR_MULTIPLE_CALLBACK,
	    ERR_STREAM_CANNOT_PIPE = _require$codes.ERR_STREAM_CANNOT_PIPE,
	    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED,
	    ERR_STREAM_NULL_VALUES = _require$codes.ERR_STREAM_NULL_VALUES,
	    ERR_STREAM_WRITE_AFTER_END = _require$codes.ERR_STREAM_WRITE_AFTER_END,
	    ERR_UNKNOWN_ENCODING = _require$codes.ERR_UNKNOWN_ENCODING;

	var errorOrDestroy = destroyImpl.errorOrDestroy;

	require('inherits')(Writable, Stream);

	function nop() {}

	function WritableState(options, stream, isDuplex) {
	  Duplex = Duplex || require('./_stream_duplex');
	  options = options || {}; // Duplex streams are both readable and writable, but share
	  // the same options object.
	  // However, some cases require setting options to different
	  // values for the readable and the writable sides of the duplex stream,
	  // e.g. options.readableObjectMode vs. options.writableObjectMode, etc.

	  if (typeof isDuplex !== 'boolean') isDuplex = stream instanceof Duplex; // object stream flag to indicate whether or not this stream
	  // contains buffers or objects.

	  this.objectMode = !!options.objectMode;
	  if (isDuplex) this.objectMode = this.objectMode || !!options.writableObjectMode; // the point at which write() starts returning false
	  // Note: 0 is a valid value, means that we always return false if
	  // the entire buffer is not flushed immediately on write()

	  this.highWaterMark = getHighWaterMark(this, options, 'writableHighWaterMark', isDuplex); // if _final has been called

	  this.finalCalled = false; // drain event flag.

	  this.needDrain = false; // at the start of calling end()

	  this.ending = false; // when end() has been called, and returned

	  this.ended = false; // when 'finish' is emitted

	  this.finished = false; // has it been destroyed

	  this.destroyed = false; // should we decode strings into buffers before passing to _write?
	  // this is here so that some node-core streams can optimize string
	  // handling at a lower level.

	  var noDecode = options.decodeStrings === false;
	  this.decodeStrings = !noDecode; // Crypto is kind of old and crusty.  Historically, its default string
	  // encoding is 'binary' so we have to make this configurable.
	  // Everything else in the universe uses 'utf8', though.

	  this.defaultEncoding = options.defaultEncoding || 'utf8'; // not an actual buffer we keep track of, but a measurement
	  // of how much we're waiting to get pushed to some underlying
	  // socket or file.

	  this.length = 0; // a flag to see when we're in the middle of a write.

	  this.writing = false; // when true all writes will be buffered until .uncork() call

	  this.corked = 0; // a flag to be able to tell if the onwrite cb is called immediately,
	  // or on a later tick.  We set this to true at first, because any
	  // actions that shouldn't happen until "later" should generally also
	  // not happen before the first write call.

	  this.sync = true; // a flag to know if we're processing previously buffered items, which
	  // may call the _write() callback in the same tick, so that we don't
	  // end up in an overlapped onwrite situation.

	  this.bufferProcessing = false; // the callback that's passed to _write(chunk,cb)

	  this.onwrite = function (er) {
	    onwrite(stream, er);
	  }; // the callback that the user supplies to write(chunk,encoding,cb)


	  this.writecb = null; // the amount that is being written when _write is called.

	  this.writelen = 0;
	  this.bufferedRequest = null;
	  this.lastBufferedRequest = null; // number of pending user-supplied write callbacks
	  // this must be 0 before 'finish' can be emitted

	  this.pendingcb = 0; // emit prefinish if the only thing we're waiting for is _write cbs
	  // This is relevant for synchronous Transform streams

	  this.prefinished = false; // True if the error was already emitted and should not be thrown again

	  this.errorEmitted = false; // Should close be emitted on destroy. Defaults to true.

	  this.emitClose = options.emitClose !== false; // Should .destroy() be called after 'finish' (and potentially 'end')

	  this.autoDestroy = !!options.autoDestroy; // count buffered requests

	  this.bufferedRequestCount = 0; // allocate the first CorkedRequest, there is always
	  // one allocated and free to use, and we maintain at most two

	  this.corkedRequestsFree = new CorkedRequest(this);
	}

	WritableState.prototype.getBuffer = function getBuffer() {
	  var current = this.bufferedRequest;
	  var out = [];

	  while (current) {
	    out.push(current);
	    current = current.next;
	  }

	  return out;
	};

	(function () {
	  try {
	    Object.defineProperty(WritableState.prototype, 'buffer', {
	      get: internalUtil.deprecate(function writableStateBufferGetter() {
	        return this.getBuffer();
	      }, '_writableState.buffer is deprecated. Use _writableState.getBuffer ' + 'instead.', 'DEP0003')
	    });
	  } catch (_) {}
	})(); // Test _writableState for inheritance to account for Duplex streams,
	// whose prototype chain only points to Readable.


	var realHasInstance;

	if (typeof Symbol === 'function' && Symbol.hasInstance && typeof Function.prototype[Symbol.hasInstance] === 'function') {
	  realHasInstance = Function.prototype[Symbol.hasInstance];
	  Object.defineProperty(Writable, Symbol.hasInstance, {
	    value: function value(object) {
	      if (realHasInstance.call(this, object)) return true;
	      if (this !== Writable) return false;
	      return object && object._writableState instanceof WritableState;
	    }
	  });
	} else {
	  realHasInstance = function realHasInstance(object) {
	    return object instanceof this;
	  };
	}

	function Writable(options) {
	  Duplex = Duplex || require('./_stream_duplex'); // Writable ctor is applied to Duplexes, too.
	  // `realHasInstance` is necessary because using plain `instanceof`
	  // would return false, as no `_writableState` property is attached.
	  // Trying to use the custom `instanceof` for Writable here will also break the
	  // Node.js LazyTransform implementation, which has a non-trivial getter for
	  // `_writableState` that would lead to infinite recursion.
	  // Checking for a Stream.Duplex instance is faster here instead of inside
	  // the WritableState constructor, at least with V8 6.5

	  var isDuplex = this instanceof Duplex;
	  if (!isDuplex && !realHasInstance.call(Writable, this)) return new Writable(options);
	  this._writableState = new WritableState(options, this, isDuplex); // legacy.

	  this.writable = true;

	  if (options) {
	    if (typeof options.write === 'function') this._write = options.write;
	    if (typeof options.writev === 'function') this._writev = options.writev;
	    if (typeof options.destroy === 'function') this._destroy = options.destroy;
	    if (typeof options.final === 'function') this._final = options.final;
	  }

	  Stream.call(this);
	} // Otherwise people can pipe Writable streams, which is just wrong.


	Writable.prototype.pipe = function () {
	  errorOrDestroy(this, new ERR_STREAM_CANNOT_PIPE());
	};

	function writeAfterEnd(stream, cb) {
	  var er = new ERR_STREAM_WRITE_AFTER_END(); // TODO: defer error events consistently everywhere, not just the cb

	  errorOrDestroy(stream, er);
	  process.nextTick(cb, er);
	} // Checks that a user-supplied chunk is valid, especially for the particular
	// mode the stream is in. Currently this means that `null` is never accepted
	// and undefined/non-string values are only allowed in object mode.


	function validChunk(stream, state, chunk, cb) {
	  var er;

	  if (chunk === null) {
	    er = new ERR_STREAM_NULL_VALUES();
	  } else if (typeof chunk !== 'string' && !state.objectMode) {
	    er = new ERR_INVALID_ARG_TYPE('chunk', ['string', 'Buffer'], chunk);
	  }

	  if (er) {
	    errorOrDestroy(stream, er);
	    process.nextTick(cb, er);
	    return false;
	  }

	  return true;
	}

	Writable.prototype.write = function (chunk, encoding, cb) {
	  var state = this._writableState;
	  var ret = false;

	  var isBuf = !state.objectMode && _isUint8Array(chunk);

	  if (isBuf && !Buffer.isBuffer(chunk)) {
	    chunk = _uint8ArrayToBuffer(chunk);
	  }

	  if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (isBuf) encoding = 'buffer';else if (!encoding) encoding = state.defaultEncoding;
	  if (typeof cb !== 'function') cb = nop;
	  if (state.ending) writeAfterEnd(this, cb);else if (isBuf || validChunk(this, state, chunk, cb)) {
	    state.pendingcb++;
	    ret = writeOrBuffer(this, state, isBuf, chunk, encoding, cb);
	  }
	  return ret;
	};

	Writable.prototype.cork = function () {
	  this._writableState.corked++;
	};

	Writable.prototype.uncork = function () {
	  var state = this._writableState;

	  if (state.corked) {
	    state.corked--;
	    if (!state.writing && !state.corked && !state.bufferProcessing && state.bufferedRequest) clearBuffer(this, state);
	  }
	};

	Writable.prototype.setDefaultEncoding = function setDefaultEncoding(encoding) {
	  // node::ParseEncoding() requires lower case.
	  if (typeof encoding === 'string') encoding = encoding.toLowerCase();
	  if (!(['hex', 'utf8', 'utf-8', 'ascii', 'binary', 'base64', 'ucs2', 'ucs-2', 'utf16le', 'utf-16le', 'raw'].indexOf((encoding + '').toLowerCase()) > -1)) throw new ERR_UNKNOWN_ENCODING(encoding);
	  this._writableState.defaultEncoding = encoding;
	  return this;
	};

	Object.defineProperty(Writable.prototype, 'writableBuffer', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState && this._writableState.getBuffer();
	  }
	});

	function decodeChunk(state, chunk, encoding) {
	  if (!state.objectMode && state.decodeStrings !== false && typeof chunk === 'string') {
	    chunk = Buffer.from(chunk, encoding);
	  }

	  return chunk;
	}

	Object.defineProperty(Writable.prototype, 'writableHighWaterMark', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.highWaterMark;
	  }
	}); // if we're already writing something, then just put this
	// in the queue, and wait our turn.  Otherwise, call _write
	// If we return false, then we need a drain event, so set that flag.

	function writeOrBuffer(stream, state, isBuf, chunk, encoding, cb) {
	  if (!isBuf) {
	    var newChunk = decodeChunk(state, chunk, encoding);

	    if (chunk !== newChunk) {
	      isBuf = true;
	      encoding = 'buffer';
	      chunk = newChunk;
	    }
	  }

	  var len = state.objectMode ? 1 : chunk.length;
	  state.length += len;
	  var ret = state.length < state.highWaterMark; // we must ensure that previous needDrain will not be reset to false.

	  if (!ret) state.needDrain = true;

	  if (state.writing || state.corked) {
	    var last = state.lastBufferedRequest;
	    state.lastBufferedRequest = {
	      chunk: chunk,
	      encoding: encoding,
	      isBuf: isBuf,
	      callback: cb,
	      next: null
	    };

	    if (last) {
	      last.next = state.lastBufferedRequest;
	    } else {
	      state.bufferedRequest = state.lastBufferedRequest;
	    }

	    state.bufferedRequestCount += 1;
	  } else {
	    doWrite(stream, state, false, len, chunk, encoding, cb);
	  }

	  return ret;
	}

	function doWrite(stream, state, writev, len, chunk, encoding, cb) {
	  state.writelen = len;
	  state.writecb = cb;
	  state.writing = true;
	  state.sync = true;
	  if (state.destroyed) state.onwrite(new ERR_STREAM_DESTROYED('write'));else if (writev) stream._writev(chunk, state.onwrite);else stream._write(chunk, encoding, state.onwrite);
	  state.sync = false;
	}

	function onwriteError(stream, state, sync, er, cb) {
	  --state.pendingcb;

	  if (sync) {
	    // defer the callback if we are being called synchronously
	    // to avoid piling up things on the stack
	    process.nextTick(cb, er); // this can emit finish, and it will always happen
	    // after error

	    process.nextTick(finishMaybe, stream, state);
	    stream._writableState.errorEmitted = true;
	    errorOrDestroy(stream, er);
	  } else {
	    // the caller expect this to happen before if
	    // it is async
	    cb(er);
	    stream._writableState.errorEmitted = true;
	    errorOrDestroy(stream, er); // this can emit finish, but finish must
	    // always follow error

	    finishMaybe(stream, state);
	  }
	}

	function onwriteStateUpdate(state) {
	  state.writing = false;
	  state.writecb = null;
	  state.length -= state.writelen;
	  state.writelen = 0;
	}

	function onwrite(stream, er) {
	  var state = stream._writableState;
	  var sync = state.sync;
	  var cb = state.writecb;
	  if (typeof cb !== 'function') throw new ERR_MULTIPLE_CALLBACK();
	  onwriteStateUpdate(state);
	  if (er) onwriteError(stream, state, sync, er, cb);else {
	    // Check if we're actually ready to finish, but don't emit yet
	    var finished = needFinish(state) || stream.destroyed;

	    if (!finished && !state.corked && !state.bufferProcessing && state.bufferedRequest) {
	      clearBuffer(stream, state);
	    }

	    if (sync) {
	      process.nextTick(afterWrite, stream, state, finished, cb);
	    } else {
	      afterWrite(stream, state, finished, cb);
	    }
	  }
	}

	function afterWrite(stream, state, finished, cb) {
	  if (!finished) onwriteDrain(stream, state);
	  state.pendingcb--;
	  cb();
	  finishMaybe(stream, state);
	} // Must force callback to be called on nextTick, so that we don't
	// emit 'drain' before the write() consumer gets the 'false' return
	// value, and has a chance to attach a 'drain' listener.


	function onwriteDrain(stream, state) {
	  if (state.length === 0 && state.needDrain) {
	    state.needDrain = false;
	    stream.emit('drain');
	  }
	} // if there's something in the buffer waiting, then process it


	function clearBuffer(stream, state) {
	  state.bufferProcessing = true;
	  var entry = state.bufferedRequest;

	  if (stream._writev && entry && entry.next) {
	    // Fast case, write everything using _writev()
	    var l = state.bufferedRequestCount;
	    var buffer = new Array(l);
	    var holder = state.corkedRequestsFree;
	    holder.entry = entry;
	    var count = 0;
	    var allBuffers = true;

	    while (entry) {
	      buffer[count] = entry;
	      if (!entry.isBuf) allBuffers = false;
	      entry = entry.next;
	      count += 1;
	    }

	    buffer.allBuffers = allBuffers;
	    doWrite(stream, state, true, state.length, buffer, '', holder.finish); // doWrite is almost always async, defer these to save a bit of time
	    // as the hot path ends with doWrite

	    state.pendingcb++;
	    state.lastBufferedRequest = null;

	    if (holder.next) {
	      state.corkedRequestsFree = holder.next;
	      holder.next = null;
	    } else {
	      state.corkedRequestsFree = new CorkedRequest(state);
	    }

	    state.bufferedRequestCount = 0;
	  } else {
	    // Slow case, write chunks one-by-one
	    while (entry) {
	      var chunk = entry.chunk;
	      var encoding = entry.encoding;
	      var cb = entry.callback;
	      var len = state.objectMode ? 1 : chunk.length;
	      doWrite(stream, state, false, len, chunk, encoding, cb);
	      entry = entry.next;
	      state.bufferedRequestCount--; // if we didn't call the onwrite immediately, then
	      // it means that we need to wait until it does.
	      // also, that means that the chunk and cb are currently
	      // being processed, so move the buffer counter past them.

	      if (state.writing) {
	        break;
	      }
	    }

	    if (entry === null) state.lastBufferedRequest = null;
	  }

	  state.bufferedRequest = entry;
	  state.bufferProcessing = false;
	}

	Writable.prototype._write = function (chunk, encoding, cb) {
	  cb(new ERR_METHOD_NOT_IMPLEMENTED('_write()'));
	};

	Writable.prototype._writev = null;

	Writable.prototype.end = function (chunk, encoding, cb) {
	  var state = this._writableState;

	  if (typeof chunk === 'function') {
	    cb = chunk;
	    chunk = null;
	    encoding = null;
	  } else if (typeof encoding === 'function') {
	    cb = encoding;
	    encoding = null;
	  }

	  if (chunk !== null && chunk !== undefined) this.write(chunk, encoding); // .end() fully uncorks

	  if (state.corked) {
	    state.corked = 1;
	    this.uncork();
	  } // ignore unnecessary end() calls.


	  if (!state.ending) endWritable(this, state, cb);
	  return this;
	};

	Object.defineProperty(Writable.prototype, 'writableLength', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    return this._writableState.length;
	  }
	});

	function needFinish(state) {
	  return state.ending && state.length === 0 && state.bufferedRequest === null && !state.finished && !state.writing;
	}

	function callFinal(stream, state) {
	  stream._final(function (err) {
	    state.pendingcb--;

	    if (err) {
	      errorOrDestroy(stream, err);
	    }

	    state.prefinished = true;
	    stream.emit('prefinish');
	    finishMaybe(stream, state);
	  });
	}

	function prefinish(stream, state) {
	  if (!state.prefinished && !state.finalCalled) {
	    if (typeof stream._final === 'function' && !state.destroyed) {
	      state.pendingcb++;
	      state.finalCalled = true;
	      process.nextTick(callFinal, stream, state);
	    } else {
	      state.prefinished = true;
	      stream.emit('prefinish');
	    }
	  }
	}

	function finishMaybe(stream, state) {
	  var need = needFinish(state);

	  if (need) {
	    prefinish(stream, state);

	    if (state.pendingcb === 0) {
	      state.finished = true;
	      stream.emit('finish');

	      if (state.autoDestroy) {
	        // In case of duplex streams we need a way to detect
	        // if the readable side is ready for autoDestroy as well
	        var rState = stream._readableState;

	        if (!rState || rState.autoDestroy && rState.endEmitted) {
	          stream.destroy();
	        }
	      }
	    }
	  }

	  return need;
	}

	function endWritable(stream, state, cb) {
	  state.ending = true;
	  finishMaybe(stream, state);

	  if (cb) {
	    if (state.finished) process.nextTick(cb);else stream.once('finish', cb);
	  }

	  state.ended = true;
	  stream.writable = false;
	}

	function onCorkedFinish(corkReq, state, err) {
	  var entry = corkReq.entry;
	  corkReq.entry = null;

	  while (entry) {
	    var cb = entry.callback;
	    state.pendingcb--;
	    cb(err);
	    entry = entry.next;
	  } // reuse the free corkReq.


	  state.corkedRequestsFree.next = corkReq;
	}

	Object.defineProperty(Writable.prototype, 'destroyed', {
	  // making it explicit this property is not enumerable
	  // because otherwise some prototype manipulation in
	  // userland will fail
	  enumerable: false,
	  get: function get() {
	    if (this._writableState === undefined) {
	      return false;
	    }

	    return this._writableState.destroyed;
	  },
	  set: function set(value) {
	    // we ignore the value if the stream
	    // has not been initialized yet
	    if (!this._writableState) {
	      return;
	    } // backward compatibility, the user is explicitly
	    // managing destroyed


	    this._writableState.destroyed = value;
	  }
	});
	Writable.prototype.destroy = destroyImpl.destroy;
	Writable.prototype._undestroy = destroyImpl.undestroy;

	Writable.prototype._destroy = function (err, cb) {
	  cb(err);
	};
	}).call(this);}).call(this,require('_process'),typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	},{"../errors":66,"./_stream_duplex":67,"./internal/streams/destroy":74,"./internal/streams/state":78,"./internal/streams/stream":79,"_process":63,"buffer":32,"inherits":46,"util-deprecate":81}],72:[function(require,module,exports){
	(function (process){(function (){

	var _Object$setPrototypeO;

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	var finished = require('./end-of-stream');

	var kLastResolve = Symbol('lastResolve');
	var kLastReject = Symbol('lastReject');
	var kError = Symbol('error');
	var kEnded = Symbol('ended');
	var kLastPromise = Symbol('lastPromise');
	var kHandlePromise = Symbol('handlePromise');
	var kStream = Symbol('stream');

	function createIterResult(value, done) {
	  return {
	    value: value,
	    done: done
	  };
	}

	function readAndResolve(iter) {
	  var resolve = iter[kLastResolve];

	  if (resolve !== null) {
	    var data = iter[kStream].read(); // we defer if data is null
	    // we can be expecting either 'end' or
	    // 'error'

	    if (data !== null) {
	      iter[kLastPromise] = null;
	      iter[kLastResolve] = null;
	      iter[kLastReject] = null;
	      resolve(createIterResult(data, false));
	    }
	  }
	}

	function onReadable(iter) {
	  // we wait for the next tick, because it might
	  // emit an error with process.nextTick
	  process.nextTick(readAndResolve, iter);
	}

	function wrapForNext(lastPromise, iter) {
	  return function (resolve, reject) {
	    lastPromise.then(function () {
	      if (iter[kEnded]) {
	        resolve(createIterResult(undefined, true));
	        return;
	      }

	      iter[kHandlePromise](resolve, reject);
	    }, reject);
	  };
	}

	var AsyncIteratorPrototype = Object.getPrototypeOf(function () {});
	var ReadableStreamAsyncIteratorPrototype = Object.setPrototypeOf((_Object$setPrototypeO = {
	  get stream() {
	    return this[kStream];
	  },

	  next: function next() {
	    var _this = this;

	    // if we have detected an error in the meanwhile
	    // reject straight away
	    var error = this[kError];

	    if (error !== null) {
	      return Promise.reject(error);
	    }

	    if (this[kEnded]) {
	      return Promise.resolve(createIterResult(undefined, true));
	    }

	    if (this[kStream].destroyed) {
	      // We need to defer via nextTick because if .destroy(err) is
	      // called, the error will be emitted via nextTick, and
	      // we cannot guarantee that there is no error lingering around
	      // waiting to be emitted.
	      return new Promise(function (resolve, reject) {
	        process.nextTick(function () {
	          if (_this[kError]) {
	            reject(_this[kError]);
	          } else {
	            resolve(createIterResult(undefined, true));
	          }
	        });
	      });
	    } // if we have multiple next() calls
	    // we will wait for the previous Promise to finish
	    // this logic is optimized to support for await loops,
	    // where next() is only called once at a time


	    var lastPromise = this[kLastPromise];
	    var promise;

	    if (lastPromise) {
	      promise = new Promise(wrapForNext(lastPromise, this));
	    } else {
	      // fast path needed to support multiple this.push()
	      // without triggering the next() queue
	      var data = this[kStream].read();

	      if (data !== null) {
	        return Promise.resolve(createIterResult(data, false));
	      }

	      promise = new Promise(this[kHandlePromise]);
	    }

	    this[kLastPromise] = promise;
	    return promise;
	  }
	}, _defineProperty(_Object$setPrototypeO, Symbol.asyncIterator, function () {
	  return this;
	}), _defineProperty(_Object$setPrototypeO, "return", function _return() {
	  var _this2 = this;

	  // destroy(err, cb) is a private API
	  // we can guarantee we have that here, because we control the
	  // Readable class this is attached to
	  return new Promise(function (resolve, reject) {
	    _this2[kStream].destroy(null, function (err) {
	      if (err) {
	        reject(err);
	        return;
	      }

	      resolve(createIterResult(undefined, true));
	    });
	  });
	}), _Object$setPrototypeO), AsyncIteratorPrototype);

	var createReadableStreamAsyncIterator = function createReadableStreamAsyncIterator(stream) {
	  var _Object$create;

	  var iterator = Object.create(ReadableStreamAsyncIteratorPrototype, (_Object$create = {}, _defineProperty(_Object$create, kStream, {
	    value: stream,
	    writable: true
	  }), _defineProperty(_Object$create, kLastResolve, {
	    value: null,
	    writable: true
	  }), _defineProperty(_Object$create, kLastReject, {
	    value: null,
	    writable: true
	  }), _defineProperty(_Object$create, kError, {
	    value: null,
	    writable: true
	  }), _defineProperty(_Object$create, kEnded, {
	    value: stream._readableState.endEmitted,
	    writable: true
	  }), _defineProperty(_Object$create, kHandlePromise, {
	    value: function value(resolve, reject) {
	      var data = iterator[kStream].read();

	      if (data) {
	        iterator[kLastPromise] = null;
	        iterator[kLastResolve] = null;
	        iterator[kLastReject] = null;
	        resolve(createIterResult(data, false));
	      } else {
	        iterator[kLastResolve] = resolve;
	        iterator[kLastReject] = reject;
	      }
	    },
	    writable: true
	  }), _Object$create));
	  iterator[kLastPromise] = null;
	  finished(stream, function (err) {
	    if (err && err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
	      var reject = iterator[kLastReject]; // reject if we are waiting for data in the Promise
	      // returned by next() and store the error

	      if (reject !== null) {
	        iterator[kLastPromise] = null;
	        iterator[kLastResolve] = null;
	        iterator[kLastReject] = null;
	        reject(err);
	      }

	      iterator[kError] = err;
	      return;
	    }

	    var resolve = iterator[kLastResolve];

	    if (resolve !== null) {
	      iterator[kLastPromise] = null;
	      iterator[kLastResolve] = null;
	      iterator[kLastReject] = null;
	      resolve(createIterResult(undefined, true));
	    }

	    iterator[kEnded] = true;
	  });
	  stream.on('readable', onReadable.bind(null, iterator));
	  return iterator;
	};

	module.exports = createReadableStreamAsyncIterator;
	}).call(this);}).call(this,require('_process'));
	},{"./end-of-stream":75,"_process":63}],73:[function(require,module,exports){

	function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

	function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

	function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); return Constructor; }

	var _require = require('buffer'),
	    Buffer = _require.Buffer;

	var _require2 = require('util'),
	    inspect = _require2.inspect;

	var custom = inspect && inspect.custom || 'inspect';

	function copyBuffer(src, target, offset) {
	  Buffer.prototype.copy.call(src, target, offset);
	}

	module.exports =
	/*#__PURE__*/
	function () {
	  function BufferList() {
	    _classCallCheck(this, BufferList);

	    this.head = null;
	    this.tail = null;
	    this.length = 0;
	  }

	  _createClass(BufferList, [{
	    key: "push",
	    value: function push(v) {
	      var entry = {
	        data: v,
	        next: null
	      };
	      if (this.length > 0) this.tail.next = entry;else this.head = entry;
	      this.tail = entry;
	      ++this.length;
	    }
	  }, {
	    key: "unshift",
	    value: function unshift(v) {
	      var entry = {
	        data: v,
	        next: this.head
	      };
	      if (this.length === 0) this.tail = entry;
	      this.head = entry;
	      ++this.length;
	    }
	  }, {
	    key: "shift",
	    value: function shift() {
	      if (this.length === 0) return;
	      var ret = this.head.data;
	      if (this.length === 1) this.head = this.tail = null;else this.head = this.head.next;
	      --this.length;
	      return ret;
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this.head = this.tail = null;
	      this.length = 0;
	    }
	  }, {
	    key: "join",
	    value: function join(s) {
	      if (this.length === 0) return '';
	      var p = this.head;
	      var ret = '' + p.data;

	      while (p = p.next) {
	        ret += s + p.data;
	      }

	      return ret;
	    }
	  }, {
	    key: "concat",
	    value: function concat(n) {
	      if (this.length === 0) return Buffer.alloc(0);
	      var ret = Buffer.allocUnsafe(n >>> 0);
	      var p = this.head;
	      var i = 0;

	      while (p) {
	        copyBuffer(p.data, ret, i);
	        i += p.data.length;
	        p = p.next;
	      }

	      return ret;
	    } // Consumes a specified amount of bytes or characters from the buffered data.

	  }, {
	    key: "consume",
	    value: function consume(n, hasStrings) {
	      var ret;

	      if (n < this.head.data.length) {
	        // `slice` is the same for buffers and strings.
	        ret = this.head.data.slice(0, n);
	        this.head.data = this.head.data.slice(n);
	      } else if (n === this.head.data.length) {
	        // First chunk is a perfect match.
	        ret = this.shift();
	      } else {
	        // Result spans more than one buffer.
	        ret = hasStrings ? this._getString(n) : this._getBuffer(n);
	      }

	      return ret;
	    }
	  }, {
	    key: "first",
	    value: function first() {
	      return this.head.data;
	    } // Consumes a specified amount of characters from the buffered data.

	  }, {
	    key: "_getString",
	    value: function _getString(n) {
	      var p = this.head;
	      var c = 1;
	      var ret = p.data;
	      n -= ret.length;

	      while (p = p.next) {
	        var str = p.data;
	        var nb = n > str.length ? str.length : n;
	        if (nb === str.length) ret += str;else ret += str.slice(0, n);
	        n -= nb;

	        if (n === 0) {
	          if (nb === str.length) {
	            ++c;
	            if (p.next) this.head = p.next;else this.head = this.tail = null;
	          } else {
	            this.head = p;
	            p.data = str.slice(nb);
	          }

	          break;
	        }

	        ++c;
	      }

	      this.length -= c;
	      return ret;
	    } // Consumes a specified amount of bytes from the buffered data.

	  }, {
	    key: "_getBuffer",
	    value: function _getBuffer(n) {
	      var ret = Buffer.allocUnsafe(n);
	      var p = this.head;
	      var c = 1;
	      p.data.copy(ret);
	      n -= p.data.length;

	      while (p = p.next) {
	        var buf = p.data;
	        var nb = n > buf.length ? buf.length : n;
	        buf.copy(ret, ret.length - n, 0, nb);
	        n -= nb;

	        if (n === 0) {
	          if (nb === buf.length) {
	            ++c;
	            if (p.next) this.head = p.next;else this.head = this.tail = null;
	          } else {
	            this.head = p;
	            p.data = buf.slice(nb);
	          }

	          break;
	        }

	        ++c;
	      }

	      this.length -= c;
	      return ret;
	    } // Make sure the linked list only shows the minimal necessary information.

	  }, {
	    key: custom,
	    value: function value(_, options) {
	      return inspect(this, _objectSpread({}, options, {
	        // Only inspect one level.
	        depth: 0,
	        // It should not recurse.
	        customInspect: false
	      }));
	    }
	  }]);

	  return BufferList;
	}();
	},{"buffer":32,"util":29}],74:[function(require,module,exports){
	(function (process){(function (){

	function destroy(err, cb) {
	  var _this = this;

	  var readableDestroyed = this._readableState && this._readableState.destroyed;
	  var writableDestroyed = this._writableState && this._writableState.destroyed;

	  if (readableDestroyed || writableDestroyed) {
	    if (cb) {
	      cb(err);
	    } else if (err) {
	      if (!this._writableState) {
	        process.nextTick(emitErrorNT, this, err);
	      } else if (!this._writableState.errorEmitted) {
	        this._writableState.errorEmitted = true;
	        process.nextTick(emitErrorNT, this, err);
	      }
	    }

	    return this;
	  } // we set destroyed to true before firing error callbacks in order
	  // to make it re-entrance safe in case destroy() is called within callbacks


	  if (this._readableState) {
	    this._readableState.destroyed = true;
	  } // if this is a duplex stream mark the writable part as destroyed as well


	  if (this._writableState) {
	    this._writableState.destroyed = true;
	  }

	  this._destroy(err || null, function (err) {
	    if (!cb && err) {
	      if (!_this._writableState) {
	        process.nextTick(emitErrorAndCloseNT, _this, err);
	      } else if (!_this._writableState.errorEmitted) {
	        _this._writableState.errorEmitted = true;
	        process.nextTick(emitErrorAndCloseNT, _this, err);
	      } else {
	        process.nextTick(emitCloseNT, _this);
	      }
	    } else if (cb) {
	      process.nextTick(emitCloseNT, _this);
	      cb(err);
	    } else {
	      process.nextTick(emitCloseNT, _this);
	    }
	  });

	  return this;
	}

	function emitErrorAndCloseNT(self, err) {
	  emitErrorNT(self, err);
	  emitCloseNT(self);
	}

	function emitCloseNT(self) {
	  if (self._writableState && !self._writableState.emitClose) return;
	  if (self._readableState && !self._readableState.emitClose) return;
	  self.emit('close');
	}

	function undestroy() {
	  if (this._readableState) {
	    this._readableState.destroyed = false;
	    this._readableState.reading = false;
	    this._readableState.ended = false;
	    this._readableState.endEmitted = false;
	  }

	  if (this._writableState) {
	    this._writableState.destroyed = false;
	    this._writableState.ended = false;
	    this._writableState.ending = false;
	    this._writableState.finalCalled = false;
	    this._writableState.prefinished = false;
	    this._writableState.finished = false;
	    this._writableState.errorEmitted = false;
	  }
	}

	function emitErrorNT(self, err) {
	  self.emit('error', err);
	}

	function errorOrDestroy(stream, err) {
	  // We have tests that rely on errors being emitted
	  // in the same tick, so changing this is semver major.
	  // For now when you opt-in to autoDestroy we allow
	  // the error to be emitted nextTick. In a future
	  // semver major update we should change the default to this.
	  var rState = stream._readableState;
	  var wState = stream._writableState;
	  if (rState && rState.autoDestroy || wState && wState.autoDestroy) stream.destroy(err);else stream.emit('error', err);
	}

	module.exports = {
	  destroy: destroy,
	  undestroy: undestroy,
	  errorOrDestroy: errorOrDestroy
	};
	}).call(this);}).call(this,require('_process'));
	},{"_process":63}],75:[function(require,module,exports){

	var ERR_STREAM_PREMATURE_CLOSE = require('../../../errors').codes.ERR_STREAM_PREMATURE_CLOSE;

	function once(callback) {
	  var called = false;
	  return function () {
	    if (called) return;
	    called = true;

	    for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
	      args[_key] = arguments[_key];
	    }

	    callback.apply(this, args);
	  };
	}

	function noop() {}

	function isRequest(stream) {
	  return stream.setHeader && typeof stream.abort === 'function';
	}

	function eos(stream, opts, callback) {
	  if (typeof opts === 'function') return eos(stream, null, opts);
	  if (!opts) opts = {};
	  callback = once(callback || noop);
	  var readable = opts.readable || opts.readable !== false && stream.readable;
	  var writable = opts.writable || opts.writable !== false && stream.writable;

	  var onlegacyfinish = function onlegacyfinish() {
	    if (!stream.writable) onfinish();
	  };

	  var writableEnded = stream._writableState && stream._writableState.finished;

	  var onfinish = function onfinish() {
	    writable = false;
	    writableEnded = true;
	    if (!readable) callback.call(stream);
	  };

	  var readableEnded = stream._readableState && stream._readableState.endEmitted;

	  var onend = function onend() {
	    readable = false;
	    readableEnded = true;
	    if (!writable) callback.call(stream);
	  };

	  var onerror = function onerror(err) {
	    callback.call(stream, err);
	  };

	  var onclose = function onclose() {
	    var err;

	    if (readable && !readableEnded) {
	      if (!stream._readableState || !stream._readableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
	      return callback.call(stream, err);
	    }

	    if (writable && !writableEnded) {
	      if (!stream._writableState || !stream._writableState.ended) err = new ERR_STREAM_PREMATURE_CLOSE();
	      return callback.call(stream, err);
	    }
	  };

	  var onrequest = function onrequest() {
	    stream.req.on('finish', onfinish);
	  };

	  if (isRequest(stream)) {
	    stream.on('complete', onfinish);
	    stream.on('abort', onclose);
	    if (stream.req) onrequest();else stream.on('request', onrequest);
	  } else if (writable && !stream._writableState) {
	    // legacy streams
	    stream.on('end', onlegacyfinish);
	    stream.on('close', onlegacyfinish);
	  }

	  stream.on('end', onend);
	  stream.on('finish', onfinish);
	  if (opts.error !== false) stream.on('error', onerror);
	  stream.on('close', onclose);
	  return function () {
	    stream.removeListener('complete', onfinish);
	    stream.removeListener('abort', onclose);
	    stream.removeListener('request', onrequest);
	    if (stream.req) stream.req.removeListener('finish', onfinish);
	    stream.removeListener('end', onlegacyfinish);
	    stream.removeListener('close', onlegacyfinish);
	    stream.removeListener('finish', onfinish);
	    stream.removeListener('end', onend);
	    stream.removeListener('error', onerror);
	    stream.removeListener('close', onclose);
	  };
	}

	module.exports = eos;
	},{"../../../errors":66}],76:[function(require,module,exports){
	module.exports = function () {
	  throw new Error('Readable.from is not available in the browser')
	};

	},{}],77:[function(require,module,exports){

	var eos;

	function once(callback) {
	  var called = false;
	  return function () {
	    if (called) return;
	    called = true;
	    callback.apply(void 0, arguments);
	  };
	}

	var _require$codes = require('../../../errors').codes,
	    ERR_MISSING_ARGS = _require$codes.ERR_MISSING_ARGS,
	    ERR_STREAM_DESTROYED = _require$codes.ERR_STREAM_DESTROYED;

	function noop(err) {
	  // Rethrow the error if it exists to avoid swallowing it
	  if (err) throw err;
	}

	function isRequest(stream) {
	  return stream.setHeader && typeof stream.abort === 'function';
	}

	function destroyer(stream, reading, writing, callback) {
	  callback = once(callback);
	  var closed = false;
	  stream.on('close', function () {
	    closed = true;
	  });
	  if (eos === undefined) eos = require('./end-of-stream');
	  eos(stream, {
	    readable: reading,
	    writable: writing
	  }, function (err) {
	    if (err) return callback(err);
	    closed = true;
	    callback();
	  });
	  var destroyed = false;
	  return function (err) {
	    if (closed) return;
	    if (destroyed) return;
	    destroyed = true; // request.destroy just do .end - .abort is what we want

	    if (isRequest(stream)) return stream.abort();
	    if (typeof stream.destroy === 'function') return stream.destroy();
	    callback(err || new ERR_STREAM_DESTROYED('pipe'));
	  };
	}

	function call(fn) {
	  fn();
	}

	function pipe(from, to) {
	  return from.pipe(to);
	}

	function popCallback(streams) {
	  if (!streams.length) return noop;
	  if (typeof streams[streams.length - 1] !== 'function') return noop;
	  return streams.pop();
	}

	function pipeline() {
	  for (var _len = arguments.length, streams = new Array(_len), _key = 0; _key < _len; _key++) {
	    streams[_key] = arguments[_key];
	  }

	  var callback = popCallback(streams);
	  if (Array.isArray(streams[0])) streams = streams[0];

	  if (streams.length < 2) {
	    throw new ERR_MISSING_ARGS('streams');
	  }

	  var error;
	  var destroys = streams.map(function (stream, i) {
	    var reading = i < streams.length - 1;
	    var writing = i > 0;
	    return destroyer(stream, reading, writing, function (err) {
	      if (!error) error = err;
	      if (err) destroys.forEach(call);
	      if (reading) return;
	      destroys.forEach(call);
	      callback(error);
	    });
	  });
	  return streams.reduce(pipe);
	}

	module.exports = pipeline;
	},{"../../../errors":66,"./end-of-stream":75}],78:[function(require,module,exports){

	var ERR_INVALID_OPT_VALUE = require('../../../errors').codes.ERR_INVALID_OPT_VALUE;

	function highWaterMarkFrom(options, isDuplex, duplexKey) {
	  return options.highWaterMark != null ? options.highWaterMark : isDuplex ? options[duplexKey] : null;
	}

	function getHighWaterMark(state, options, duplexKey, isDuplex) {
	  var hwm = highWaterMarkFrom(options, isDuplex, duplexKey);

	  if (hwm != null) {
	    if (!(isFinite(hwm) && Math.floor(hwm) === hwm) || hwm < 0) {
	      var name = isDuplex ? duplexKey : 'highWaterMark';
	      throw new ERR_INVALID_OPT_VALUE(name, hwm);
	    }

	    return Math.floor(hwm);
	  } // Default value


	  return state.objectMode ? 16 : 16 * 1024;
	}

	module.exports = {
	  getHighWaterMark: getHighWaterMark
	};
	},{"../../../errors":66}],79:[function(require,module,exports){
	module.exports = require('events').EventEmitter;

	},{"events":35}],80:[function(require,module,exports){

	/*<replacement>*/

	var Buffer = require('safe-buffer').Buffer;
	/*</replacement>*/

	var isEncoding = Buffer.isEncoding || function (encoding) {
	  encoding = '' + encoding;
	  switch (encoding && encoding.toLowerCase()) {
	    case 'hex':case 'utf8':case 'utf-8':case 'ascii':case 'binary':case 'base64':case 'ucs2':case 'ucs-2':case 'utf16le':case 'utf-16le':case 'raw':
	      return true;
	    default:
	      return false;
	  }
	};

	function _normalizeEncoding(enc) {
	  if (!enc) return 'utf8';
	  var retried;
	  while (true) {
	    switch (enc) {
	      case 'utf8':
	      case 'utf-8':
	        return 'utf8';
	      case 'ucs2':
	      case 'ucs-2':
	      case 'utf16le':
	      case 'utf-16le':
	        return 'utf16le';
	      case 'latin1':
	      case 'binary':
	        return 'latin1';
	      case 'base64':
	      case 'ascii':
	      case 'hex':
	        return enc;
	      default:
	        if (retried) return; // undefined
	        enc = ('' + enc).toLowerCase();
	        retried = true;
	    }
	  }
	}
	// Do not cache `Buffer.isEncoding` when checking encoding names as some
	// modules monkey-patch it to support additional encodings
	function normalizeEncoding(enc) {
	  var nenc = _normalizeEncoding(enc);
	  if (typeof nenc !== 'string' && (Buffer.isEncoding === isEncoding || !isEncoding(enc))) throw new Error('Unknown encoding: ' + enc);
	  return nenc || enc;
	}

	// StringDecoder provides an interface for efficiently splitting a series of
	// buffers into a series of JS strings without breaking apart multi-byte
	// characters.
	exports.StringDecoder = StringDecoder;
	function StringDecoder(encoding) {
	  this.encoding = normalizeEncoding(encoding);
	  var nb;
	  switch (this.encoding) {
	    case 'utf16le':
	      this.text = utf16Text;
	      this.end = utf16End;
	      nb = 4;
	      break;
	    case 'utf8':
	      this.fillLast = utf8FillLast;
	      nb = 4;
	      break;
	    case 'base64':
	      this.text = base64Text;
	      this.end = base64End;
	      nb = 3;
	      break;
	    default:
	      this.write = simpleWrite;
	      this.end = simpleEnd;
	      return;
	  }
	  this.lastNeed = 0;
	  this.lastTotal = 0;
	  this.lastChar = Buffer.allocUnsafe(nb);
	}

	StringDecoder.prototype.write = function (buf) {
	  if (buf.length === 0) return '';
	  var r;
	  var i;
	  if (this.lastNeed) {
	    r = this.fillLast(buf);
	    if (r === undefined) return '';
	    i = this.lastNeed;
	    this.lastNeed = 0;
	  } else {
	    i = 0;
	  }
	  if (i < buf.length) return r ? r + this.text(buf, i) : this.text(buf, i);
	  return r || '';
	};

	StringDecoder.prototype.end = utf8End;

	// Returns only complete characters in a Buffer
	StringDecoder.prototype.text = utf8Text;

	// Attempts to complete a partial non-UTF-8 character using bytes from a Buffer
	StringDecoder.prototype.fillLast = function (buf) {
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, this.lastTotal - this.lastNeed, 0, buf.length);
	  this.lastNeed -= buf.length;
	};

	// Checks the type of a UTF-8 byte, whether it's ASCII, a leading byte, or a
	// continuation byte. If an invalid byte is detected, -2 is returned.
	function utf8CheckByte(byte) {
	  if (byte <= 0x7F) return 0;else if (byte >> 5 === 0x06) return 2;else if (byte >> 4 === 0x0E) return 3;else if (byte >> 3 === 0x1E) return 4;
	  return byte >> 6 === 0x02 ? -1 : -2;
	}

	// Checks at most 3 bytes at the end of a Buffer in order to detect an
	// incomplete multi-byte UTF-8 character. The total number of bytes (2, 3, or 4)
	// needed to complete the UTF-8 character (if applicable) are returned.
	function utf8CheckIncomplete(self, buf, i) {
	  var j = buf.length - 1;
	  if (j < i) return 0;
	  var nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 1;
	    return nb;
	  }
	  if (--j < i || nb === -2) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) self.lastNeed = nb - 2;
	    return nb;
	  }
	  if (--j < i || nb === -2) return 0;
	  nb = utf8CheckByte(buf[j]);
	  if (nb >= 0) {
	    if (nb > 0) {
	      if (nb === 2) nb = 0;else self.lastNeed = nb - 3;
	    }
	    return nb;
	  }
	  return 0;
	}

	// Validates as many continuation bytes for a multi-byte UTF-8 character as
	// needed or are available. If we see a non-continuation byte where we expect
	// one, we "replace" the validated continuation bytes we've seen so far with
	// a single UTF-8 replacement character ('\ufffd'), to match v8's UTF-8 decoding
	// behavior. The continuation byte check is included three times in the case
	// where all of the continuation bytes for a character exist in the same buffer.
	// It is also done this way as a slight performance increase instead of using a
	// loop.
	function utf8CheckExtraBytes(self, buf, p) {
	  if ((buf[0] & 0xC0) !== 0x80) {
	    self.lastNeed = 0;
	    return '\ufffd';
	  }
	  if (self.lastNeed > 1 && buf.length > 1) {
	    if ((buf[1] & 0xC0) !== 0x80) {
	      self.lastNeed = 1;
	      return '\ufffd';
	    }
	    if (self.lastNeed > 2 && buf.length > 2) {
	      if ((buf[2] & 0xC0) !== 0x80) {
	        self.lastNeed = 2;
	        return '\ufffd';
	      }
	    }
	  }
	}

	// Attempts to complete a multi-byte UTF-8 character using bytes from a Buffer.
	function utf8FillLast(buf) {
	  var p = this.lastTotal - this.lastNeed;
	  var r = utf8CheckExtraBytes(this, buf);
	  if (r !== undefined) return r;
	  if (this.lastNeed <= buf.length) {
	    buf.copy(this.lastChar, p, 0, this.lastNeed);
	    return this.lastChar.toString(this.encoding, 0, this.lastTotal);
	  }
	  buf.copy(this.lastChar, p, 0, buf.length);
	  this.lastNeed -= buf.length;
	}

	// Returns all complete UTF-8 characters in a Buffer. If the Buffer ended on a
	// partial character, the character's bytes are buffered until the required
	// number of bytes are available.
	function utf8Text(buf, i) {
	  var total = utf8CheckIncomplete(this, buf, i);
	  if (!this.lastNeed) return buf.toString('utf8', i);
	  this.lastTotal = total;
	  var end = buf.length - (total - this.lastNeed);
	  buf.copy(this.lastChar, 0, end);
	  return buf.toString('utf8', i, end);
	}

	// For UTF-8, a replacement character is added when ending on a partial
	// character.
	function utf8End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + '\ufffd';
	  return r;
	}

	// UTF-16LE typically needs two bytes per character, but even if we have an even
	// number of bytes available, we need to check if we end on a leading/high
	// surrogate. In that case, we need to wait for the next two bytes in order to
	// decode the last character properly.
	function utf16Text(buf, i) {
	  if ((buf.length - i) % 2 === 0) {
	    var r = buf.toString('utf16le', i);
	    if (r) {
	      var c = r.charCodeAt(r.length - 1);
	      if (c >= 0xD800 && c <= 0xDBFF) {
	        this.lastNeed = 2;
	        this.lastTotal = 4;
	        this.lastChar[0] = buf[buf.length - 2];
	        this.lastChar[1] = buf[buf.length - 1];
	        return r.slice(0, -1);
	      }
	    }
	    return r;
	  }
	  this.lastNeed = 1;
	  this.lastTotal = 2;
	  this.lastChar[0] = buf[buf.length - 1];
	  return buf.toString('utf16le', i, buf.length - 1);
	}

	// For UTF-16LE we do not explicitly append special replacement characters if we
	// end on a partial character, we simply let v8 handle that.
	function utf16End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) {
	    var end = this.lastTotal - this.lastNeed;
	    return r + this.lastChar.toString('utf16le', 0, end);
	  }
	  return r;
	}

	function base64Text(buf, i) {
	  var n = (buf.length - i) % 3;
	  if (n === 0) return buf.toString('base64', i);
	  this.lastNeed = 3 - n;
	  this.lastTotal = 3;
	  if (n === 1) {
	    this.lastChar[0] = buf[buf.length - 1];
	  } else {
	    this.lastChar[0] = buf[buf.length - 2];
	    this.lastChar[1] = buf[buf.length - 1];
	  }
	  return buf.toString('base64', i, buf.length - n);
	}

	function base64End(buf) {
	  var r = buf && buf.length ? this.write(buf) : '';
	  if (this.lastNeed) return r + this.lastChar.toString('base64', 0, 3 - this.lastNeed);
	  return r;
	}

	// Pass bytes on through for single-byte encodings (e.g. ascii, latin1, hex)
	function simpleWrite(buf) {
	  return buf.toString(this.encoding);
	}

	function simpleEnd(buf) {
	  return buf && buf.length ? this.write(buf) : '';
	}
	},{"safe-buffer":64}],81:[function(require,module,exports){
	(function (global){(function (){

	/**
	 * Module exports.
	 */

	module.exports = deprecate;

	/**
	 * Mark that a method should not be used.
	 * Returns a modified function which warns once by default.
	 *
	 * If `localStorage.noDeprecation = true` is set, then it is a no-op.
	 *
	 * If `localStorage.throwDeprecation = true` is set, then deprecated functions
	 * will throw an Error when invoked.
	 *
	 * If `localStorage.traceDeprecation = true` is set, then deprecated functions
	 * will invoke `console.trace()` instead of `console.error()`.
	 *
	 * @param {Function} fn - the function to deprecate
	 * @param {String} msg - the string to print to the console when `fn` is invoked
	 * @returns {Function} a new "deprecated" version of `fn`
	 * @api public
	 */

	function deprecate (fn, msg) {
	  if (config('noDeprecation')) {
	    return fn;
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (config('throwDeprecation')) {
	        throw new Error(msg);
	      } else if (config('traceDeprecation')) {
	        console.trace(msg);
	      } else {
	        console.warn(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	}

	/**
	 * Checks `localStorage` for boolean values for the given `name`.
	 *
	 * @param {String} name
	 * @returns {Boolean}
	 * @api private
	 */

	function config (name) {
	  // accessing global.localStorage can trigger a DOMException in sandboxed iframes
	  try {
	    if (!global.localStorage) return false;
	  } catch (_) {
	    return false;
	  }
	  var val = global.localStorage[name];
	  if (null == val) return false;
	  return String(val).toLowerCase() === 'true';
	}

	}).call(this);}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	},{}],82:[function(require,module,exports){
	arguments[4][25][0].apply(exports,arguments);
	},{"dup":25}],83:[function(require,module,exports){

	var isArgumentsObject = require('is-arguments');
	var isGeneratorFunction = require('is-generator-function');
	var whichTypedArray = require('which-typed-array');
	var isTypedArray = require('is-typed-array');

	function uncurryThis(f) {
	  return f.call.bind(f);
	}

	var BigIntSupported = typeof BigInt !== 'undefined';
	var SymbolSupported = typeof Symbol !== 'undefined';

	var ObjectToString = uncurryThis(Object.prototype.toString);

	var numberValue = uncurryThis(Number.prototype.valueOf);
	var stringValue = uncurryThis(String.prototype.valueOf);
	var booleanValue = uncurryThis(Boolean.prototype.valueOf);

	if (BigIntSupported) {
	  var bigIntValue = uncurryThis(BigInt.prototype.valueOf);
	}

	if (SymbolSupported) {
	  var symbolValue = uncurryThis(Symbol.prototype.valueOf);
	}

	function checkBoxedPrimitive(value, prototypeValueOf) {
	  if (typeof value !== 'object') {
	    return false;
	  }
	  try {
	    prototypeValueOf(value);
	    return true;
	  } catch(e) {
	    return false;
	  }
	}

	exports.isArgumentsObject = isArgumentsObject;
	exports.isGeneratorFunction = isGeneratorFunction;
	exports.isTypedArray = isTypedArray;

	// Taken from here and modified for better browser support
	// https://github.com/sindresorhus/p-is-promise/blob/cda35a513bda03f977ad5cde3a079d237e82d7ef/index.js
	function isPromise(input) {
		return (
			(
				typeof Promise !== 'undefined' &&
				input instanceof Promise
			) ||
			(
				input !== null &&
				typeof input === 'object' &&
				typeof input.then === 'function' &&
				typeof input.catch === 'function'
			)
		);
	}
	exports.isPromise = isPromise;

	function isArrayBufferView(value) {
	  if (typeof ArrayBuffer !== 'undefined' && ArrayBuffer.isView) {
	    return ArrayBuffer.isView(value);
	  }

	  return (
	    isTypedArray(value) ||
	    isDataView(value)
	  );
	}
	exports.isArrayBufferView = isArrayBufferView;


	function isUint8Array(value) {
	  return whichTypedArray(value) === 'Uint8Array';
	}
	exports.isUint8Array = isUint8Array;

	function isUint8ClampedArray(value) {
	  return whichTypedArray(value) === 'Uint8ClampedArray';
	}
	exports.isUint8ClampedArray = isUint8ClampedArray;

	function isUint16Array(value) {
	  return whichTypedArray(value) === 'Uint16Array';
	}
	exports.isUint16Array = isUint16Array;

	function isUint32Array(value) {
	  return whichTypedArray(value) === 'Uint32Array';
	}
	exports.isUint32Array = isUint32Array;

	function isInt8Array(value) {
	  return whichTypedArray(value) === 'Int8Array';
	}
	exports.isInt8Array = isInt8Array;

	function isInt16Array(value) {
	  return whichTypedArray(value) === 'Int16Array';
	}
	exports.isInt16Array = isInt16Array;

	function isInt32Array(value) {
	  return whichTypedArray(value) === 'Int32Array';
	}
	exports.isInt32Array = isInt32Array;

	function isFloat32Array(value) {
	  return whichTypedArray(value) === 'Float32Array';
	}
	exports.isFloat32Array = isFloat32Array;

	function isFloat64Array(value) {
	  return whichTypedArray(value) === 'Float64Array';
	}
	exports.isFloat64Array = isFloat64Array;

	function isBigInt64Array(value) {
	  return whichTypedArray(value) === 'BigInt64Array';
	}
	exports.isBigInt64Array = isBigInt64Array;

	function isBigUint64Array(value) {
	  return whichTypedArray(value) === 'BigUint64Array';
	}
	exports.isBigUint64Array = isBigUint64Array;

	function isMapToString(value) {
	  return ObjectToString(value) === '[object Map]';
	}
	isMapToString.working = (
	  typeof Map !== 'undefined' &&
	  isMapToString(new Map())
	);

	function isMap(value) {
	  if (typeof Map === 'undefined') {
	    return false;
	  }

	  return isMapToString.working
	    ? isMapToString(value)
	    : value instanceof Map;
	}
	exports.isMap = isMap;

	function isSetToString(value) {
	  return ObjectToString(value) === '[object Set]';
	}
	isSetToString.working = (
	  typeof Set !== 'undefined' &&
	  isSetToString(new Set())
	);
	function isSet(value) {
	  if (typeof Set === 'undefined') {
	    return false;
	  }

	  return isSetToString.working
	    ? isSetToString(value)
	    : value instanceof Set;
	}
	exports.isSet = isSet;

	function isWeakMapToString(value) {
	  return ObjectToString(value) === '[object WeakMap]';
	}
	isWeakMapToString.working = (
	  typeof WeakMap !== 'undefined' &&
	  isWeakMapToString(new WeakMap())
	);
	function isWeakMap(value) {
	  if (typeof WeakMap === 'undefined') {
	    return false;
	  }

	  return isWeakMapToString.working
	    ? isWeakMapToString(value)
	    : value instanceof WeakMap;
	}
	exports.isWeakMap = isWeakMap;

	function isWeakSetToString(value) {
	  return ObjectToString(value) === '[object WeakSet]';
	}
	isWeakSetToString.working = (
	  typeof WeakSet !== 'undefined' &&
	  isWeakSetToString(new WeakSet())
	);
	function isWeakSet(value) {
	  return isWeakSetToString(value);
	}
	exports.isWeakSet = isWeakSet;

	function isArrayBufferToString(value) {
	  return ObjectToString(value) === '[object ArrayBuffer]';
	}
	isArrayBufferToString.working = (
	  typeof ArrayBuffer !== 'undefined' &&
	  isArrayBufferToString(new ArrayBuffer())
	);
	function isArrayBuffer(value) {
	  if (typeof ArrayBuffer === 'undefined') {
	    return false;
	  }

	  return isArrayBufferToString.working
	    ? isArrayBufferToString(value)
	    : value instanceof ArrayBuffer;
	}
	exports.isArrayBuffer = isArrayBuffer;

	function isDataViewToString(value) {
	  return ObjectToString(value) === '[object DataView]';
	}
	isDataViewToString.working = (
	  typeof ArrayBuffer !== 'undefined' &&
	  typeof DataView !== 'undefined' &&
	  isDataViewToString(new DataView(new ArrayBuffer(1), 0, 1))
	);
	function isDataView(value) {
	  if (typeof DataView === 'undefined') {
	    return false;
	  }

	  return isDataViewToString.working
	    ? isDataViewToString(value)
	    : value instanceof DataView;
	}
	exports.isDataView = isDataView;

	// Store a copy of SharedArrayBuffer in case it's deleted elsewhere
	var SharedArrayBufferCopy = typeof SharedArrayBuffer !== 'undefined' ? SharedArrayBuffer : undefined;
	function isSharedArrayBufferToString(value) {
	  return ObjectToString(value) === '[object SharedArrayBuffer]';
	}
	function isSharedArrayBuffer(value) {
	  if (typeof SharedArrayBufferCopy === 'undefined') {
	    return false;
	  }

	  if (typeof isSharedArrayBufferToString.working === 'undefined') {
	    isSharedArrayBufferToString.working = isSharedArrayBufferToString(new SharedArrayBufferCopy());
	  }

	  return isSharedArrayBufferToString.working
	    ? isSharedArrayBufferToString(value)
	    : value instanceof SharedArrayBufferCopy;
	}
	exports.isSharedArrayBuffer = isSharedArrayBuffer;

	function isAsyncFunction(value) {
	  return ObjectToString(value) === '[object AsyncFunction]';
	}
	exports.isAsyncFunction = isAsyncFunction;

	function isMapIterator(value) {
	  return ObjectToString(value) === '[object Map Iterator]';
	}
	exports.isMapIterator = isMapIterator;

	function isSetIterator(value) {
	  return ObjectToString(value) === '[object Set Iterator]';
	}
	exports.isSetIterator = isSetIterator;

	function isGeneratorObject(value) {
	  return ObjectToString(value) === '[object Generator]';
	}
	exports.isGeneratorObject = isGeneratorObject;

	function isWebAssemblyCompiledModule(value) {
	  return ObjectToString(value) === '[object WebAssembly.Module]';
	}
	exports.isWebAssemblyCompiledModule = isWebAssemblyCompiledModule;

	function isNumberObject(value) {
	  return checkBoxedPrimitive(value, numberValue);
	}
	exports.isNumberObject = isNumberObject;

	function isStringObject(value) {
	  return checkBoxedPrimitive(value, stringValue);
	}
	exports.isStringObject = isStringObject;

	function isBooleanObject(value) {
	  return checkBoxedPrimitive(value, booleanValue);
	}
	exports.isBooleanObject = isBooleanObject;

	function isBigIntObject(value) {
	  return BigIntSupported && checkBoxedPrimitive(value, bigIntValue);
	}
	exports.isBigIntObject = isBigIntObject;

	function isSymbolObject(value) {
	  return SymbolSupported && checkBoxedPrimitive(value, symbolValue);
	}
	exports.isSymbolObject = isSymbolObject;

	function isBoxedPrimitive(value) {
	  return (
	    isNumberObject(value) ||
	    isStringObject(value) ||
	    isBooleanObject(value) ||
	    isBigIntObject(value) ||
	    isSymbolObject(value)
	  );
	}
	exports.isBoxedPrimitive = isBoxedPrimitive;

	function isAnyArrayBuffer(value) {
	  return typeof Uint8Array !== 'undefined' && (
	    isArrayBuffer(value) ||
	    isSharedArrayBuffer(value)
	  );
	}
	exports.isAnyArrayBuffer = isAnyArrayBuffer;

	['isProxy', 'isExternal', 'isModuleNamespaceObject'].forEach(function(method) {
	  Object.defineProperty(exports, method, {
	    enumerable: false,
	    value: function() {
	      throw new Error(method + ' is not supported in userland');
	    }
	  });
	});

	},{"is-arguments":47,"is-generator-function":49,"is-typed-array":50,"which-typed-array":85}],84:[function(require,module,exports){
	(function (process){(function (){
	// Copyright Joyent, Inc. and other Node contributors.
	//
	// Permission is hereby granted, free of charge, to any person obtaining a
	// copy of this software and associated documentation files (the
	// "Software"), to deal in the Software without restriction, including
	// without limitation the rights to use, copy, modify, merge, publish,
	// distribute, sublicense, and/or sell copies of the Software, and to permit
	// persons to whom the Software is furnished to do so, subject to the
	// following conditions:
	//
	// The above copyright notice and this permission notice shall be included
	// in all copies or substantial portions of the Software.
	//
	// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
	// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
	// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
	// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
	// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
	// USE OR OTHER DEALINGS IN THE SOFTWARE.

	var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors ||
	  function getOwnPropertyDescriptors(obj) {
	    var keys = Object.keys(obj);
	    var descriptors = {};
	    for (var i = 0; i < keys.length; i++) {
	      descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
	    }
	    return descriptors;
	  };

	var formatRegExp = /%[sdj%]/g;
	exports.format = function(f) {
	  if (!isString(f)) {
	    var objects = [];
	    for (var i = 0; i < arguments.length; i++) {
	      objects.push(inspect(arguments[i]));
	    }
	    return objects.join(' ');
	  }

	  var i = 1;
	  var args = arguments;
	  var len = args.length;
	  var str = String(f).replace(formatRegExp, function(x) {
	    if (x === '%%') return '%';
	    if (i >= len) return x;
	    switch (x) {
	      case '%s': return String(args[i++]);
	      case '%d': return Number(args[i++]);
	      case '%j':
	        try {
	          return JSON.stringify(args[i++]);
	        } catch (_) {
	          return '[Circular]';
	        }
	      default:
	        return x;
	    }
	  });
	  for (var x = args[i]; i < len; x = args[++i]) {
	    if (isNull(x) || !isObject(x)) {
	      str += ' ' + x;
	    } else {
	      str += ' ' + inspect(x);
	    }
	  }
	  return str;
	};


	// Mark that a method should not be used.
	// Returns a modified function which warns once by default.
	// If --no-deprecation is set, then it is a no-op.
	exports.deprecate = function(fn, msg) {
	  if (typeof process !== 'undefined' && process.noDeprecation === true) {
	    return fn;
	  }

	  // Allow for deprecating things in the process of starting up.
	  if (typeof process === 'undefined') {
	    return function() {
	      return exports.deprecate(fn, msg).apply(this, arguments);
	    };
	  }

	  var warned = false;
	  function deprecated() {
	    if (!warned) {
	      if (process.throwDeprecation) {
	        throw new Error(msg);
	      } else if (process.traceDeprecation) {
	        console.trace(msg);
	      } else {
	        console.error(msg);
	      }
	      warned = true;
	    }
	    return fn.apply(this, arguments);
	  }

	  return deprecated;
	};


	var debugs = {};
	var debugEnvRegex = /^$/;

	if (process.env.NODE_DEBUG) {
	  var debugEnv = process.env.NODE_DEBUG;
	  debugEnv = debugEnv.replace(/[|\\{}()[\]^$+?.]/g, '\\$&')
	    .replace(/\*/g, '.*')
	    .replace(/,/g, '$|^')
	    .toUpperCase();
	  debugEnvRegex = new RegExp('^' + debugEnv + '$', 'i');
	}
	exports.debuglog = function(set) {
	  set = set.toUpperCase();
	  if (!debugs[set]) {
	    if (debugEnvRegex.test(set)) {
	      var pid = process.pid;
	      debugs[set] = function() {
	        var msg = exports.format.apply(exports, arguments);
	        console.error('%s %d: %s', set, pid, msg);
	      };
	    } else {
	      debugs[set] = function() {};
	    }
	  }
	  return debugs[set];
	};


	/**
	 * Echos the value of a value. Trys to print the value out
	 * in the best way possible given the different types.
	 *
	 * @param {Object} obj The object to print out.
	 * @param {Object} opts Optional options object that alters the output.
	 */
	/* legacy: obj, showHidden, depth, colors*/
	function inspect(obj, opts) {
	  // default options
	  var ctx = {
	    seen: [],
	    stylize: stylizeNoColor
	  };
	  // legacy...
	  if (arguments.length >= 3) ctx.depth = arguments[2];
	  if (arguments.length >= 4) ctx.colors = arguments[3];
	  if (isBoolean(opts)) {
	    // legacy...
	    ctx.showHidden = opts;
	  } else if (opts) {
	    // got an "options" object
	    exports._extend(ctx, opts);
	  }
	  // set default options
	  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
	  if (isUndefined(ctx.depth)) ctx.depth = 2;
	  if (isUndefined(ctx.colors)) ctx.colors = false;
	  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
	  if (ctx.colors) ctx.stylize = stylizeWithColor;
	  return formatValue(ctx, obj, ctx.depth);
	}
	exports.inspect = inspect;


	// http://en.wikipedia.org/wiki/ANSI_escape_code#graphics
	inspect.colors = {
	  'bold' : [1, 22],
	  'italic' : [3, 23],
	  'underline' : [4, 24],
	  'inverse' : [7, 27],
	  'white' : [37, 39],
	  'grey' : [90, 39],
	  'black' : [30, 39],
	  'blue' : [34, 39],
	  'cyan' : [36, 39],
	  'green' : [32, 39],
	  'magenta' : [35, 39],
	  'red' : [31, 39],
	  'yellow' : [33, 39]
	};

	// Don't use 'blue' not visible on cmd.exe
	inspect.styles = {
	  'special': 'cyan',
	  'number': 'yellow',
	  'boolean': 'yellow',
	  'undefined': 'grey',
	  'null': 'bold',
	  'string': 'green',
	  'date': 'magenta',
	  // "name": intentionally not styling
	  'regexp': 'red'
	};


	function stylizeWithColor(str, styleType) {
	  var style = inspect.styles[styleType];

	  if (style) {
	    return '\u001b[' + inspect.colors[style][0] + 'm' + str +
	           '\u001b[' + inspect.colors[style][1] + 'm';
	  } else {
	    return str;
	  }
	}


	function stylizeNoColor(str, styleType) {
	  return str;
	}


	function arrayToHash(array) {
	  var hash = {};

	  array.forEach(function(val, idx) {
	    hash[val] = true;
	  });

	  return hash;
	}


	function formatValue(ctx, value, recurseTimes) {
	  // Provide a hook for user-specified inspect functions.
	  // Check that value is an object with an inspect function on it
	  if (ctx.customInspect &&
	      value &&
	      isFunction(value.inspect) &&
	      // Filter out the util module, it's inspect function is special
	      value.inspect !== exports.inspect &&
	      // Also filter out any prototype objects using the circular check.
	      !(value.constructor && value.constructor.prototype === value)) {
	    var ret = value.inspect(recurseTimes, ctx);
	    if (!isString(ret)) {
	      ret = formatValue(ctx, ret, recurseTimes);
	    }
	    return ret;
	  }

	  // Primitive types cannot have properties
	  var primitive = formatPrimitive(ctx, value);
	  if (primitive) {
	    return primitive;
	  }

	  // Look up the keys of the object.
	  var keys = Object.keys(value);
	  var visibleKeys = arrayToHash(keys);

	  if (ctx.showHidden) {
	    keys = Object.getOwnPropertyNames(value);
	  }

	  // IE doesn't make error fields non-enumerable
	  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx
	  if (isError(value)
	      && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
	    return formatError(value);
	  }

	  // Some type of object without properties can be shortcutted.
	  if (keys.length === 0) {
	    if (isFunction(value)) {
	      var name = value.name ? ': ' + value.name : '';
	      return ctx.stylize('[Function' + name + ']', 'special');
	    }
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    }
	    if (isDate(value)) {
	      return ctx.stylize(Date.prototype.toString.call(value), 'date');
	    }
	    if (isError(value)) {
	      return formatError(value);
	    }
	  }

	  var base = '', array = false, braces = ['{', '}'];

	  // Make Array say that they are Array
	  if (isArray(value)) {
	    array = true;
	    braces = ['[', ']'];
	  }

	  // Make functions say that they are functions
	  if (isFunction(value)) {
	    var n = value.name ? ': ' + value.name : '';
	    base = ' [Function' + n + ']';
	  }

	  // Make RegExps say that they are RegExps
	  if (isRegExp(value)) {
	    base = ' ' + RegExp.prototype.toString.call(value);
	  }

	  // Make dates with properties first say the date
	  if (isDate(value)) {
	    base = ' ' + Date.prototype.toUTCString.call(value);
	  }

	  // Make error with message first say the error
	  if (isError(value)) {
	    base = ' ' + formatError(value);
	  }

	  if (keys.length === 0 && (!array || value.length == 0)) {
	    return braces[0] + base + braces[1];
	  }

	  if (recurseTimes < 0) {
	    if (isRegExp(value)) {
	      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
	    } else {
	      return ctx.stylize('[Object]', 'special');
	    }
	  }

	  ctx.seen.push(value);

	  var output;
	  if (array) {
	    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
	  } else {
	    output = keys.map(function(key) {
	      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
	    });
	  }

	  ctx.seen.pop();

	  return reduceToSingleString(output, base, braces);
	}


	function formatPrimitive(ctx, value) {
	  if (isUndefined(value))
	    return ctx.stylize('undefined', 'undefined');
	  if (isString(value)) {
	    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '')
	                                             .replace(/'/g, "\\'")
	                                             .replace(/\\"/g, '"') + '\'';
	    return ctx.stylize(simple, 'string');
	  }
	  if (isNumber(value))
	    return ctx.stylize('' + value, 'number');
	  if (isBoolean(value))
	    return ctx.stylize('' + value, 'boolean');
	  // For some reason typeof null is "object", so special case here.
	  if (isNull(value))
	    return ctx.stylize('null', 'null');
	}


	function formatError(value) {
	  return '[' + Error.prototype.toString.call(value) + ']';
	}


	function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
	  var output = [];
	  for (var i = 0, l = value.length; i < l; ++i) {
	    if (hasOwnProperty(value, String(i))) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          String(i), true));
	    } else {
	      output.push('');
	    }
	  }
	  keys.forEach(function(key) {
	    if (!key.match(/^\d+$/)) {
	      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys,
	          key, true));
	    }
	  });
	  return output;
	}


	function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
	  var name, str, desc;
	  desc = Object.getOwnPropertyDescriptor(value, key) || { value: value[key] };
	  if (desc.get) {
	    if (desc.set) {
	      str = ctx.stylize('[Getter/Setter]', 'special');
	    } else {
	      str = ctx.stylize('[Getter]', 'special');
	    }
	  } else {
	    if (desc.set) {
	      str = ctx.stylize('[Setter]', 'special');
	    }
	  }
	  if (!hasOwnProperty(visibleKeys, key)) {
	    name = '[' + key + ']';
	  }
	  if (!str) {
	    if (ctx.seen.indexOf(desc.value) < 0) {
	      if (isNull(recurseTimes)) {
	        str = formatValue(ctx, desc.value, null);
	      } else {
	        str = formatValue(ctx, desc.value, recurseTimes - 1);
	      }
	      if (str.indexOf('\n') > -1) {
	        if (array) {
	          str = str.split('\n').map(function(line) {
	            return '  ' + line;
	          }).join('\n').slice(2);
	        } else {
	          str = '\n' + str.split('\n').map(function(line) {
	            return '   ' + line;
	          }).join('\n');
	        }
	      }
	    } else {
	      str = ctx.stylize('[Circular]', 'special');
	    }
	  }
	  if (isUndefined(name)) {
	    if (array && key.match(/^\d+$/)) {
	      return str;
	    }
	    name = JSON.stringify('' + key);
	    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
	      name = name.slice(1, -1);
	      name = ctx.stylize(name, 'name');
	    } else {
	      name = name.replace(/'/g, "\\'")
	                 .replace(/\\"/g, '"')
	                 .replace(/(^"|"$)/g, "'");
	      name = ctx.stylize(name, 'string');
	    }
	  }

	  return name + ': ' + str;
	}


	function reduceToSingleString(output, base, braces) {
	  var length = output.reduce(function(prev, cur) {
	    if (cur.indexOf('\n') >= 0) ;
	    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
	  }, 0);

	  if (length > 60) {
	    return braces[0] +
	           (base === '' ? '' : base + '\n ') +
	           ' ' +
	           output.join(',\n  ') +
	           ' ' +
	           braces[1];
	  }

	  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
	}


	// NOTE: These type checking functions intentionally don't use `instanceof`
	// because it is fragile and can be easily faked with `Object.create()`.
	exports.types = require('./support/types');

	function isArray(ar) {
	  return Array.isArray(ar);
	}
	exports.isArray = isArray;

	function isBoolean(arg) {
	  return typeof arg === 'boolean';
	}
	exports.isBoolean = isBoolean;

	function isNull(arg) {
	  return arg === null;
	}
	exports.isNull = isNull;

	function isNullOrUndefined(arg) {
	  return arg == null;
	}
	exports.isNullOrUndefined = isNullOrUndefined;

	function isNumber(arg) {
	  return typeof arg === 'number';
	}
	exports.isNumber = isNumber;

	function isString(arg) {
	  return typeof arg === 'string';
	}
	exports.isString = isString;

	function isSymbol(arg) {
	  return typeof arg === 'symbol';
	}
	exports.isSymbol = isSymbol;

	function isUndefined(arg) {
	  return arg === void 0;
	}
	exports.isUndefined = isUndefined;

	function isRegExp(re) {
	  return isObject(re) && objectToString(re) === '[object RegExp]';
	}
	exports.isRegExp = isRegExp;
	exports.types.isRegExp = isRegExp;

	function isObject(arg) {
	  return typeof arg === 'object' && arg !== null;
	}
	exports.isObject = isObject;

	function isDate(d) {
	  return isObject(d) && objectToString(d) === '[object Date]';
	}
	exports.isDate = isDate;
	exports.types.isDate = isDate;

	function isError(e) {
	  return isObject(e) &&
	      (objectToString(e) === '[object Error]' || e instanceof Error);
	}
	exports.isError = isError;
	exports.types.isNativeError = isError;

	function isFunction(arg) {
	  return typeof arg === 'function';
	}
	exports.isFunction = isFunction;

	function isPrimitive(arg) {
	  return arg === null ||
	         typeof arg === 'boolean' ||
	         typeof arg === 'number' ||
	         typeof arg === 'string' ||
	         typeof arg === 'symbol' ||  // ES6 symbol
	         typeof arg === 'undefined';
	}
	exports.isPrimitive = isPrimitive;

	exports.isBuffer = require('./support/isBuffer');

	function objectToString(o) {
	  return Object.prototype.toString.call(o);
	}


	function pad(n) {
	  return n < 10 ? '0' + n.toString(10) : n.toString(10);
	}


	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep',
	              'Oct', 'Nov', 'Dec'];

	// 26 Feb 16:19:34
	function timestamp() {
	  var d = new Date();
	  var time = [pad(d.getHours()),
	              pad(d.getMinutes()),
	              pad(d.getSeconds())].join(':');
	  return [d.getDate(), months[d.getMonth()], time].join(' ');
	}


	// log is just a thin wrapper to console.log that prepends a timestamp
	exports.log = function() {
	  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
	};


	/**
	 * Inherit the prototype methods from one constructor into another.
	 *
	 * The Function.prototype.inherits from lang.js rewritten as a standalone
	 * function (not on Function.prototype). NOTE: If this file is to be loaded
	 * during bootstrapping this function needs to be rewritten using some native
	 * functions as prototype setup using normal JavaScript does not work as
	 * expected during bootstrapping (see mirror.js in r114903).
	 *
	 * @param {function} ctor Constructor function which needs to inherit the
	 *     prototype.
	 * @param {function} superCtor Constructor function to inherit prototype from.
	 */
	exports.inherits = require('inherits');

	exports._extend = function(origin, add) {
	  // Don't do anything if add isn't an object
	  if (!add || !isObject(add)) return origin;

	  var keys = Object.keys(add);
	  var i = keys.length;
	  while (i--) {
	    origin[keys[i]] = add[keys[i]];
	  }
	  return origin;
	};

	function hasOwnProperty(obj, prop) {
	  return Object.prototype.hasOwnProperty.call(obj, prop);
	}

	var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

	exports.promisify = function promisify(original) {
	  if (typeof original !== 'function')
	    throw new TypeError('The "original" argument must be of type Function');

	  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
	    var fn = original[kCustomPromisifiedSymbol];
	    if (typeof fn !== 'function') {
	      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
	    }
	    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
	      value: fn, enumerable: false, writable: false, configurable: true
	    });
	    return fn;
	  }

	  function fn() {
	    var promiseResolve, promiseReject;
	    var promise = new Promise(function (resolve, reject) {
	      promiseResolve = resolve;
	      promiseReject = reject;
	    });

	    var args = [];
	    for (var i = 0; i < arguments.length; i++) {
	      args.push(arguments[i]);
	    }
	    args.push(function (err, value) {
	      if (err) {
	        promiseReject(err);
	      } else {
	        promiseResolve(value);
	      }
	    });

	    try {
	      original.apply(this, args);
	    } catch (err) {
	      promiseReject(err);
	    }

	    return promise;
	  }

	  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));

	  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
	    value: fn, enumerable: false, writable: false, configurable: true
	  });
	  return Object.defineProperties(
	    fn,
	    getOwnPropertyDescriptors(original)
	  );
	};

	exports.promisify.custom = kCustomPromisifiedSymbol;

	function callbackifyOnRejected(reason, cb) {
	  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
	  // Because `null` is a special error value in callbacks which means "no error
	  // occurred", we error-wrap so the callback consumer can distinguish between
	  // "the promise rejected with null" or "the promise fulfilled with undefined".
	  if (!reason) {
	    var newReason = new Error('Promise was rejected with a falsy value');
	    newReason.reason = reason;
	    reason = newReason;
	  }
	  return cb(reason);
	}

	function callbackify(original) {
	  if (typeof original !== 'function') {
	    throw new TypeError('The "original" argument must be of type Function');
	  }

	  // We DO NOT return the promise as it gives the user a false sense that
	  // the promise is actually somehow related to the callback's execution
	  // and that the callback throwing will reject the promise.
	  function callbackified() {
	    var args = [];
	    for (var i = 0; i < arguments.length; i++) {
	      args.push(arguments[i]);
	    }

	    var maybeCb = args.pop();
	    if (typeof maybeCb !== 'function') {
	      throw new TypeError('The last argument must be of type Function');
	    }
	    var self = this;
	    var cb = function() {
	      return maybeCb.apply(self, arguments);
	    };
	    // In true node style we process the callback on `nextTick` with all the
	    // implications (stack, `uncaughtException`, `async_hooks`)
	    original.apply(this, args)
	      .then(function(ret) { process.nextTick(cb.bind(null, null, ret)); },
	            function(rej) { process.nextTick(callbackifyOnRejected.bind(null, rej, cb)); });
	  }

	  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
	  Object.defineProperties(callbackified,
	                          getOwnPropertyDescriptors(original));
	  return callbackified;
	}
	exports.callbackify = callbackify;

	}).call(this);}).call(this,require('_process'));
	},{"./support/isBuffer":82,"./support/types":83,"_process":63,"inherits":46}],85:[function(require,module,exports){
	(function (global){(function (){

	var forEach = require('for-each');
	var availableTypedArrays = require('available-typed-arrays');
	var callBound = require('call-bind/callBound');
	var gOPD = require('gopd');

	var $toString = callBound('Object.prototype.toString');
	var hasToStringTag = require('has-tostringtag/shams')();

	var g = typeof globalThis === 'undefined' ? global : globalThis;
	var typedArrays = availableTypedArrays();

	var $slice = callBound('String.prototype.slice');
	var toStrTags = {};
	var getPrototypeOf = Object.getPrototypeOf; // require('getprototypeof');
	if (hasToStringTag && gOPD && getPrototypeOf) {
		forEach(typedArrays, function (typedArray) {
			if (typeof g[typedArray] === 'function') {
				var arr = new g[typedArray]();
				if (Symbol.toStringTag in arr) {
					var proto = getPrototypeOf(arr);
					var descriptor = gOPD(proto, Symbol.toStringTag);
					if (!descriptor) {
						var superProto = getPrototypeOf(proto);
						descriptor = gOPD(superProto, Symbol.toStringTag);
					}
					toStrTags[typedArray] = descriptor.get;
				}
			}
		});
	}

	var tryTypedArrays = function tryAllTypedArrays(value) {
		var foundName = false;
		forEach(toStrTags, function (getter, typedArray) {
			if (!foundName) {
				try {
					var name = getter.call(value);
					if (name === typedArray) {
						foundName = name;
					}
				} catch (e) {}
			}
		});
		return foundName;
	};

	var isTypedArray = require('is-typed-array');

	module.exports = function whichTypedArray(value) {
		if (!isTypedArray(value)) { return false; }
		if (!hasToStringTag || !(Symbol.toStringTag in value)) { return $slice($toString(value), 8, -1); }
		return tryTypedArrays(value);
	};

	}).call(this);}).call(this,typeof commonjsGlobal !== "undefined" ? commonjsGlobal : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
	},{"available-typed-arrays":27,"call-bind/callBound":33,"for-each":36,"gopd":40,"has-tostringtag/shams":43,"is-typed-array":50}]},{},[20])(20)
	}); 
} (browser));

var browserExports = browser.exports;

var t$1=Object.defineProperty;var o$1=(e,l)=>t$1(e,"name",{value:l,configurable:!0});var n$1=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof global<"u"?global:typeof self<"u"?self:{};function f$1(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}o$1(f$1,"getDefaultExportFromCjs");

var As=Object.defineProperty;var n=(i,o)=>As(i,"name",{value:o,configurable:!0});var fi=(i,o,a)=>{if(!o.has(i))throw TypeError("Cannot "+a)};var O=(i,o,a)=>(fi(i,o,"read from private field"),a?a.call(i):o.get(i)),be=(i,o,a)=>{if(o.has(i))throw TypeError("Cannot add the same private member more than once");o instanceof WeakSet?o.add(i):o.set(i,a);},X=(i,o,a,u)=>(fi(i,o,"write to private field"),o.set(i,a),a);var ve,kt,bt,Cr,Ve,Wt,qt,Ot,ee,zt,Ne,He,It;function js(i){if(!/^data:/i.test(i))throw new TypeError('`uri` does not appear to be a Data URI (must begin with "data:")');i=i.replace(/\r?\n/g,"");const o=i.indexOf(",");if(o===-1||o<=4)throw new TypeError("malformed data: URI");const a=i.substring(5,o).split(";");let u="",l=!1;const p=a[0]||"text/plain";let h=p;for(let E=1;E<a.length;E++)a[E]==="base64"?l=!0:a[E]&&(h+=`;${a[E]}`,a[E].indexOf("charset=")===0&&(u=a[E].substring(8)));!a[0]&&!u.length&&(h+=";charset=US-ASCII",u="US-ASCII");const g=l?"base64":"ascii",A=unescape(i.substring(o+1)),w=Buffer.from(A,g);return w.type=p,w.typeFull=h,w.charset=u,w}n(js,"dataUriToBuffer");var pr={exports:{}};/**
 * @license
 * web-streams-polyfill v3.3.3
 * Copyright 2024 Mattias Buelens, Diwank Singh Tomer and other contributors.
 * This code is released under the MIT license.
 * SPDX-License-Identifier: MIT
 */var di;function Ls(){return di||(di=1,function(i,o){(function(a,u){u(o);})(n$1,function(a){function u(){}n(u,"noop");function l(e){return typeof e=="object"&&e!==null||typeof e=="function"}n(l,"typeIsObject");const p=u;function h(e,t){try{Object.defineProperty(e,"name",{value:t,configurable:!0});}catch{}}n(h,"setFunctionName");const g=Promise,A=Promise.prototype.then,w=Promise.reject.bind(g);function E(e){return new g(e)}n(E,"newPromise");function T(e){return E(t=>t(e))}n(T,"promiseResolvedWith");function b(e){return w(e)}n(b,"promiseRejectedWith");function q(e,t,r){return A.call(e,t,r)}n(q,"PerformPromiseThen");function _(e,t,r){q(q(e,t,r),void 0,p);}n(_,"uponPromise");function V(e,t){_(e,t);}n(V,"uponFulfillment");function I(e,t){_(e,void 0,t);}n(I,"uponRejection");function F(e,t,r){return q(e,t,r)}n(F,"transformPromiseWith");function Q(e){q(e,void 0,p);}n(Q,"setPromiseIsHandledToTrue");let ge=n(e=>{if(typeof queueMicrotask=="function")ge=queueMicrotask;else {const t=T(void 0);ge=n(r=>q(t,r),"_queueMicrotask");}return ge(e)},"_queueMicrotask");function z(e,t,r){if(typeof e!="function")throw new TypeError("Argument is not a function");return Function.prototype.apply.call(e,t,r)}n(z,"reflectCall");function j(e,t,r){try{return T(z(e,t,r))}catch(s){return b(s)}}n(j,"promiseCall");const U=16384,bn=class bn{constructor(){this._cursor=0,this._size=0,this._front={_elements:[],_next:void 0},this._back=this._front,this._cursor=0,this._size=0;}get length(){return this._size}push(t){const r=this._back;let s=r;r._elements.length===U-1&&(s={_elements:[],_next:void 0}),r._elements.push(t),s!==r&&(this._back=s,r._next=s),++this._size;}shift(){const t=this._front;let r=t;const s=this._cursor;let f=s+1;const c=t._elements,d=c[s];return f===U&&(r=t._next,f=0),--this._size,this._cursor=f,t!==r&&(this._front=r),c[s]=void 0,d}forEach(t){let r=this._cursor,s=this._front,f=s._elements;for(;(r!==f.length||s._next!==void 0)&&!(r===f.length&&(s=s._next,f=s._elements,r=0,f.length===0));)t(f[r]),++r;}peek(){const t=this._front,r=this._cursor;return t._elements[r]}};n(bn,"SimpleQueue");let D=bn;const Ft=Symbol("[[AbortSteps]]"),Qn=Symbol("[[ErrorSteps]]"),Ar=Symbol("[[CancelSteps]]"),Br=Symbol("[[PullSteps]]"),kr=Symbol("[[ReleaseSteps]]");function Yn(e,t){e._ownerReadableStream=t,t._reader=e,t._state==="readable"?qr(e):t._state==="closed"?Li(e):Gn(e,t._storedError);}n(Yn,"ReadableStreamReaderGenericInitialize");function Wr(e,t){const r=e._ownerReadableStream;return ie(r,t)}n(Wr,"ReadableStreamReaderGenericCancel");function _e(e){const t=e._ownerReadableStream;t._state==="readable"?Or(e,new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")):$i(e,new TypeError("Reader was released and can no longer be used to monitor the stream's closedness")),t._readableStreamController[kr](),t._reader=void 0,e._ownerReadableStream=void 0;}n(_e,"ReadableStreamReaderGenericRelease");function jt(e){return new TypeError("Cannot "+e+" a stream using a released reader")}n(jt,"readerLockException");function qr(e){e._closedPromise=E((t,r)=>{e._closedPromise_resolve=t,e._closedPromise_reject=r;});}n(qr,"defaultReaderClosedPromiseInitialize");function Gn(e,t){qr(e),Or(e,t);}n(Gn,"defaultReaderClosedPromiseInitializeAsRejected");function Li(e){qr(e),Zn(e);}n(Li,"defaultReaderClosedPromiseInitializeAsResolved");function Or(e,t){e._closedPromise_reject!==void 0&&(Q(e._closedPromise),e._closedPromise_reject(t),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0);}n(Or,"defaultReaderClosedPromiseReject");function $i(e,t){Gn(e,t);}n($i,"defaultReaderClosedPromiseResetToRejected");function Zn(e){e._closedPromise_resolve!==void 0&&(e._closedPromise_resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0);}n(Zn,"defaultReaderClosedPromiseResolve");const Kn=Number.isFinite||function(e){return typeof e=="number"&&isFinite(e)},Di=Math.trunc||function(e){return e<0?Math.ceil(e):Math.floor(e)};function Mi(e){return typeof e=="object"||typeof e=="function"}n(Mi,"isDictionary");function ue(e,t){if(e!==void 0&&!Mi(e))throw new TypeError(`${t} is not an object.`)}n(ue,"assertDictionary");function Z(e,t){if(typeof e!="function")throw new TypeError(`${t} is not a function.`)}n(Z,"assertFunction");function Ui(e){return typeof e=="object"&&e!==null||typeof e=="function"}n(Ui,"isObject");function Jn(e,t){if(!Ui(e))throw new TypeError(`${t} is not an object.`)}n(Jn,"assertObject");function Se(e,t,r){if(e===void 0)throw new TypeError(`Parameter ${t} is required in '${r}'.`)}n(Se,"assertRequiredArgument");function zr(e,t,r){if(e===void 0)throw new TypeError(`${t} is required in '${r}'.`)}n(zr,"assertRequiredField");function Ir(e){return Number(e)}n(Ir,"convertUnrestrictedDouble");function Xn(e){return e===0?0:e}n(Xn,"censorNegativeZero");function xi(e){return Xn(Di(e))}n(xi,"integerPart");function Fr(e,t){const s=Number.MAX_SAFE_INTEGER;let f=Number(e);if(f=Xn(f),!Kn(f))throw new TypeError(`${t} is not a finite number`);if(f=xi(f),f<0||f>s)throw new TypeError(`${t} is outside the accepted range of 0 to ${s}, inclusive`);return !Kn(f)||f===0?0:f}n(Fr,"convertUnsignedLongLongWithEnforceRange");function jr(e,t){if(!We(e))throw new TypeError(`${t} is not a ReadableStream.`)}n(jr,"assertReadableStream");function Qe(e){return new fe(e)}n(Qe,"AcquireReadableStreamDefaultReader");function eo(e,t){e._reader._readRequests.push(t);}n(eo,"ReadableStreamAddReadRequest");function Lr(e,t,r){const f=e._reader._readRequests.shift();r?f._closeSteps():f._chunkSteps(t);}n(Lr,"ReadableStreamFulfillReadRequest");function Lt(e){return e._reader._readRequests.length}n(Lt,"ReadableStreamGetNumReadRequests");function to(e){const t=e._reader;return !(t===void 0||!Ee(t))}n(to,"ReadableStreamHasDefaultReader");const mn=class mn{constructor(t){if(Se(t,1,"ReadableStreamDefaultReader"),jr(t,"First parameter"),qe(t))throw new TypeError("This stream has already been locked for exclusive reading by another reader");Yn(this,t),this._readRequests=new D;}get closed(){return Ee(this)?this._closedPromise:b($t("closed"))}cancel(t=void 0){return Ee(this)?this._ownerReadableStream===void 0?b(jt("cancel")):Wr(this,t):b($t("cancel"))}read(){if(!Ee(this))return b($t("read"));if(this._ownerReadableStream===void 0)return b(jt("read from"));let t,r;const s=E((c,d)=>{t=c,r=d;});return mt(this,{_chunkSteps:c=>t({value:c,done:!1}),_closeSteps:()=>t({value:void 0,done:!0}),_errorSteps:c=>r(c)}),s}releaseLock(){if(!Ee(this))throw $t("releaseLock");this._ownerReadableStream!==void 0&&Ni(this);}};n(mn,"ReadableStreamDefaultReader");let fe=mn;Object.defineProperties(fe.prototype,{cancel:{enumerable:!0},read:{enumerable:!0},releaseLock:{enumerable:!0},closed:{enumerable:!0}}),h(fe.prototype.cancel,"cancel"),h(fe.prototype.read,"read"),h(fe.prototype.releaseLock,"releaseLock"),typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(fe.prototype,Symbol.toStringTag,{value:"ReadableStreamDefaultReader",configurable:!0});function Ee(e){return !l(e)||!Object.prototype.hasOwnProperty.call(e,"_readRequests")?!1:e instanceof fe}n(Ee,"IsReadableStreamDefaultReader");function mt(e,t){const r=e._ownerReadableStream;r._disturbed=!0,r._state==="closed"?t._closeSteps():r._state==="errored"?t._errorSteps(r._storedError):r._readableStreamController[Br](t);}n(mt,"ReadableStreamDefaultReaderRead");function Ni(e){_e(e);const t=new TypeError("Reader was released");ro(e,t);}n(Ni,"ReadableStreamDefaultReaderRelease");function ro(e,t){const r=e._readRequests;e._readRequests=new D,r.forEach(s=>{s._errorSteps(t);});}n(ro,"ReadableStreamDefaultReaderErrorReadRequests");function $t(e){return new TypeError(`ReadableStreamDefaultReader.prototype.${e} can only be used on a ReadableStreamDefaultReader`)}n($t,"defaultReaderBrandCheckException");const Hi=Object.getPrototypeOf(Object.getPrototypeOf(async function*(){}).prototype),yn=class yn{constructor(t,r){this._ongoingPromise=void 0,this._isFinished=!1,this._reader=t,this._preventCancel=r;}next(){const t=n(()=>this._nextSteps(),"nextSteps");return this._ongoingPromise=this._ongoingPromise?F(this._ongoingPromise,t,t):t(),this._ongoingPromise}return(t){const r=n(()=>this._returnSteps(t),"returnSteps");return this._ongoingPromise?F(this._ongoingPromise,r,r):r()}_nextSteps(){if(this._isFinished)return Promise.resolve({value:void 0,done:!0});const t=this._reader;let r,s;const f=E((d,m)=>{r=d,s=m;});return mt(t,{_chunkSteps:d=>{this._ongoingPromise=void 0,ge(()=>r({value:d,done:!1}));},_closeSteps:()=>{this._ongoingPromise=void 0,this._isFinished=!0,_e(t),r({value:void 0,done:!0});},_errorSteps:d=>{this._ongoingPromise=void 0,this._isFinished=!0,_e(t),s(d);}}),f}_returnSteps(t){if(this._isFinished)return Promise.resolve({value:t,done:!0});this._isFinished=!0;const r=this._reader;if(!this._preventCancel){const s=Wr(r,t);return _e(r),F(s,()=>({value:t,done:!0}))}return _e(r),T({value:t,done:!0})}};n(yn,"ReadableStreamAsyncIteratorImpl");let Dt=yn;const no={next(){return oo(this)?this._asyncIteratorImpl.next():b(io("next"))},return(e){return oo(this)?this._asyncIteratorImpl.return(e):b(io("return"))}};Object.setPrototypeOf(no,Hi);function Vi(e,t){const r=Qe(e),s=new Dt(r,t),f=Object.create(no);return f._asyncIteratorImpl=s,f}n(Vi,"AcquireReadableStreamAsyncIterator");function oo(e){if(!l(e)||!Object.prototype.hasOwnProperty.call(e,"_asyncIteratorImpl"))return !1;try{return e._asyncIteratorImpl instanceof Dt}catch{return !1}}n(oo,"IsReadableStreamAsyncIterator");function io(e){return new TypeError(`ReadableStreamAsyncIterator.${e} can only be used on a ReadableSteamAsyncIterator`)}n(io,"streamAsyncIteratorBrandCheckException");const ao=Number.isNaN||function(e){return e!==e};var $r,Dr,Mr;function yt(e){return e.slice()}n(yt,"CreateArrayFromList");function so(e,t,r,s,f){new Uint8Array(e).set(new Uint8Array(r,s,f),t);}n(so,"CopyDataBlockBytes");let we=n(e=>(typeof e.transfer=="function"?we=n(t=>t.transfer(),"TransferArrayBuffer"):typeof structuredClone=="function"?we=n(t=>structuredClone(t,{transfer:[t]}),"TransferArrayBuffer"):we=n(t=>t,"TransferArrayBuffer"),we(e)),"TransferArrayBuffer"),Ae=n(e=>(typeof e.detached=="boolean"?Ae=n(t=>t.detached,"IsDetachedBuffer"):Ae=n(t=>t.byteLength===0,"IsDetachedBuffer"),Ae(e)),"IsDetachedBuffer");function lo(e,t,r){if(e.slice)return e.slice(t,r);const s=r-t,f=new ArrayBuffer(s);return so(f,0,e,t,s),f}n(lo,"ArrayBufferSlice");function Mt(e,t){const r=e[t];if(r!=null){if(typeof r!="function")throw new TypeError(`${String(t)} is not a function`);return r}}n(Mt,"GetMethod");function Qi(e){const t={[Symbol.iterator]:()=>e.iterator},r=async function*(){return yield*t}(),s=r.next;return {iterator:r,nextMethod:s,done:!1}}n(Qi,"CreateAsyncFromSyncIterator");const Ur=(Mr=($r=Symbol.asyncIterator)!==null&&$r!==void 0?$r:(Dr=Symbol.for)===null||Dr===void 0?void 0:Dr.call(Symbol,"Symbol.asyncIterator"))!==null&&Mr!==void 0?Mr:"@@asyncIterator";function uo(e,t="sync",r){if(r===void 0)if(t==="async"){if(r=Mt(e,Ur),r===void 0){const c=Mt(e,Symbol.iterator),d=uo(e,"sync",c);return Qi(d)}}else r=Mt(e,Symbol.iterator);if(r===void 0)throw new TypeError("The object is not iterable");const s=z(r,e,[]);if(!l(s))throw new TypeError("The iterator method must return an object");const f=s.next;return {iterator:s,nextMethod:f,done:!1}}n(uo,"GetIterator");function Yi(e){const t=z(e.nextMethod,e.iterator,[]);if(!l(t))throw new TypeError("The iterator.next() method must return an object");return t}n(Yi,"IteratorNext");function Gi(e){return !!e.done}n(Gi,"IteratorComplete");function Zi(e){return e.value}n(Zi,"IteratorValue");function Ki(e){return !(typeof e!="number"||ao(e)||e<0)}n(Ki,"IsNonNegativeNumber");function fo(e){const t=lo(e.buffer,e.byteOffset,e.byteOffset+e.byteLength);return new Uint8Array(t)}n(fo,"CloneAsUint8Array");function xr(e){const t=e._queue.shift();return e._queueTotalSize-=t.size,e._queueTotalSize<0&&(e._queueTotalSize=0),t.value}n(xr,"DequeueValue");function Nr(e,t,r){if(!Ki(r)||r===1/0)throw new RangeError("Size must be a finite, non-NaN, non-negative number.");e._queue.push({value:t,size:r}),e._queueTotalSize+=r;}n(Nr,"EnqueueValueWithSize");function Ji(e){return e._queue.peek().value}n(Ji,"PeekQueueValue");function Be(e){e._queue=new D,e._queueTotalSize=0;}n(Be,"ResetQueue");function co(e){return e===DataView}n(co,"isDataViewConstructor");function Xi(e){return co(e.constructor)}n(Xi,"isDataView");function ea(e){return co(e)?1:e.BYTES_PER_ELEMENT}n(ea,"arrayBufferViewElementSize");const gn=class gn{constructor(){throw new TypeError("Illegal constructor")}get view(){if(!Hr(this))throw Zr("view");return this._view}respond(t){if(!Hr(this))throw Zr("respond");if(Se(t,1,"respond"),t=Fr(t,"First parameter"),this._associatedReadableByteStreamController===void 0)throw new TypeError("This BYOB request has been invalidated");if(Ae(this._view.buffer))throw new TypeError("The BYOB request's buffer has been detached and so cannot be used as a response");Ht(this._associatedReadableByteStreamController,t);}respondWithNewView(t){if(!Hr(this))throw Zr("respondWithNewView");if(Se(t,1,"respondWithNewView"),!ArrayBuffer.isView(t))throw new TypeError("You can only respond with array buffer views");if(this._associatedReadableByteStreamController===void 0)throw new TypeError("This BYOB request has been invalidated");if(Ae(t.buffer))throw new TypeError("The given view's buffer has been detached and so cannot be used as a response");Vt(this._associatedReadableByteStreamController,t);}};n(gn,"ReadableStreamBYOBRequest");let Re=gn;Object.defineProperties(Re.prototype,{respond:{enumerable:!0},respondWithNewView:{enumerable:!0},view:{enumerable:!0}}),h(Re.prototype.respond,"respond"),h(Re.prototype.respondWithNewView,"respondWithNewView"),typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(Re.prototype,Symbol.toStringTag,{value:"ReadableStreamBYOBRequest",configurable:!0});const _n=class _n{constructor(){throw new TypeError("Illegal constructor")}get byobRequest(){if(!ze(this))throw _t("byobRequest");return Gr(this)}get desiredSize(){if(!ze(this))throw _t("desiredSize");return Ro(this)}close(){if(!ze(this))throw _t("close");if(this._closeRequested)throw new TypeError("The stream has already been closed; do not close it again!");const t=this._controlledReadableByteStream._state;if(t!=="readable")throw new TypeError(`The stream (in ${t} state) is not in the readable state and cannot be closed`);gt(this);}enqueue(t){if(!ze(this))throw _t("enqueue");if(Se(t,1,"enqueue"),!ArrayBuffer.isView(t))throw new TypeError("chunk must be an array buffer view");if(t.byteLength===0)throw new TypeError("chunk must have non-zero byteLength");if(t.buffer.byteLength===0)throw new TypeError("chunk's buffer must have non-zero byteLength");if(this._closeRequested)throw new TypeError("stream is closed or draining");const r=this._controlledReadableByteStream._state;if(r!=="readable")throw new TypeError(`The stream (in ${r} state) is not in the readable state and cannot be enqueued to`);Nt(this,t);}error(t=void 0){if(!ze(this))throw _t("error");K(this,t);}[Ar](t){ho(this),Be(this);const r=this._cancelAlgorithm(t);return xt(this),r}[Br](t){const r=this._controlledReadableByteStream;if(this._queueTotalSize>0){wo(this,t);return}const s=this._autoAllocateChunkSize;if(s!==void 0){let f;try{f=new ArrayBuffer(s);}catch(d){t._errorSteps(d);return}const c={buffer:f,bufferByteLength:s,byteOffset:0,byteLength:s,bytesFilled:0,minimumFill:1,elementSize:1,viewConstructor:Uint8Array,readerType:"default"};this._pendingPullIntos.push(c);}eo(r,t),Ie(this);}[kr](){if(this._pendingPullIntos.length>0){const t=this._pendingPullIntos.peek();t.readerType="none",this._pendingPullIntos=new D,this._pendingPullIntos.push(t);}}};n(_n,"ReadableByteStreamController");let te=_n;Object.defineProperties(te.prototype,{close:{enumerable:!0},enqueue:{enumerable:!0},error:{enumerable:!0},byobRequest:{enumerable:!0},desiredSize:{enumerable:!0}}),h(te.prototype.close,"close"),h(te.prototype.enqueue,"enqueue"),h(te.prototype.error,"error"),typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(te.prototype,Symbol.toStringTag,{value:"ReadableByteStreamController",configurable:!0});function ze(e){return !l(e)||!Object.prototype.hasOwnProperty.call(e,"_controlledReadableByteStream")?!1:e instanceof te}n(ze,"IsReadableByteStreamController");function Hr(e){return !l(e)||!Object.prototype.hasOwnProperty.call(e,"_associatedReadableByteStreamController")?!1:e instanceof Re}n(Hr,"IsReadableStreamBYOBRequest");function Ie(e){if(!ia(e))return;if(e._pulling){e._pullAgain=!0;return}e._pulling=!0;const r=e._pullAlgorithm();_(r,()=>(e._pulling=!1,e._pullAgain&&(e._pullAgain=!1,Ie(e)),null),s=>(K(e,s),null));}n(Ie,"ReadableByteStreamControllerCallPullIfNeeded");function ho(e){Qr(e),e._pendingPullIntos=new D;}n(ho,"ReadableByteStreamControllerClearPendingPullIntos");function Vr(e,t){let r=!1;e._state==="closed"&&(r=!0);const s=po(t);t.readerType==="default"?Lr(e,s,r):ca(e,s,r);}n(Vr,"ReadableByteStreamControllerCommitPullIntoDescriptor");function po(e){const t=e.bytesFilled,r=e.elementSize;return new e.viewConstructor(e.buffer,e.byteOffset,t/r)}n(po,"ReadableByteStreamControllerConvertPullIntoDescriptor");function Ut(e,t,r,s){e._queue.push({buffer:t,byteOffset:r,byteLength:s}),e._queueTotalSize+=s;}n(Ut,"ReadableByteStreamControllerEnqueueChunkToQueue");function bo(e,t,r,s){let f;try{f=lo(t,r,r+s);}catch(c){throw K(e,c),c}Ut(e,f,0,s);}n(bo,"ReadableByteStreamControllerEnqueueClonedChunkToQueue");function mo(e,t){t.bytesFilled>0&&bo(e,t.buffer,t.byteOffset,t.bytesFilled),Ye(e);}n(mo,"ReadableByteStreamControllerEnqueueDetachedPullIntoToQueue");function yo(e,t){const r=Math.min(e._queueTotalSize,t.byteLength-t.bytesFilled),s=t.bytesFilled+r;let f=r,c=!1;const d=s%t.elementSize,m=s-d;m>=t.minimumFill&&(f=m-t.bytesFilled,c=!0);const R=e._queue;for(;f>0;){const y=R.peek(),C=Math.min(f,y.byteLength),P=t.byteOffset+t.bytesFilled;so(t.buffer,P,y.buffer,y.byteOffset,C),y.byteLength===C?R.shift():(y.byteOffset+=C,y.byteLength-=C),e._queueTotalSize-=C,go(e,C,t),f-=C;}return c}n(yo,"ReadableByteStreamControllerFillPullIntoDescriptorFromQueue");function go(e,t,r){r.bytesFilled+=t;}n(go,"ReadableByteStreamControllerFillHeadPullIntoDescriptor");function _o(e){e._queueTotalSize===0&&e._closeRequested?(xt(e),Pt(e._controlledReadableByteStream)):Ie(e);}n(_o,"ReadableByteStreamControllerHandleQueueDrain");function Qr(e){e._byobRequest!==null&&(e._byobRequest._associatedReadableByteStreamController=void 0,e._byobRequest._view=null,e._byobRequest=null);}n(Qr,"ReadableByteStreamControllerInvalidateBYOBRequest");function Yr(e){for(;e._pendingPullIntos.length>0;){if(e._queueTotalSize===0)return;const t=e._pendingPullIntos.peek();yo(e,t)&&(Ye(e),Vr(e._controlledReadableByteStream,t));}}n(Yr,"ReadableByteStreamControllerProcessPullIntoDescriptorsUsingQueue");function ta(e){const t=e._controlledReadableByteStream._reader;for(;t._readRequests.length>0;){if(e._queueTotalSize===0)return;const r=t._readRequests.shift();wo(e,r);}}n(ta,"ReadableByteStreamControllerProcessReadRequestsUsingQueue");function ra(e,t,r,s){const f=e._controlledReadableByteStream,c=t.constructor,d=ea(c),{byteOffset:m,byteLength:R}=t,y=r*d;let C;try{C=we(t.buffer);}catch(B){s._errorSteps(B);return}const P={buffer:C,bufferByteLength:C.byteLength,byteOffset:m,byteLength:R,bytesFilled:0,minimumFill:y,elementSize:d,viewConstructor:c,readerType:"byob"};if(e._pendingPullIntos.length>0){e._pendingPullIntos.push(P),Po(f,s);return}if(f._state==="closed"){const B=new c(P.buffer,P.byteOffset,0);s._closeSteps(B);return}if(e._queueTotalSize>0){if(yo(e,P)){const B=po(P);_o(e),s._chunkSteps(B);return}if(e._closeRequested){const B=new TypeError("Insufficient bytes to fill elements in the given buffer");K(e,B),s._errorSteps(B);return}}e._pendingPullIntos.push(P),Po(f,s),Ie(e);}n(ra,"ReadableByteStreamControllerPullInto");function na(e,t){t.readerType==="none"&&Ye(e);const r=e._controlledReadableByteStream;if(Kr(r))for(;vo(r)>0;){const s=Ye(e);Vr(r,s);}}n(na,"ReadableByteStreamControllerRespondInClosedState");function oa(e,t,r){if(go(e,t,r),r.readerType==="none"){mo(e,r),Yr(e);return}if(r.bytesFilled<r.minimumFill)return;Ye(e);const s=r.bytesFilled%r.elementSize;if(s>0){const f=r.byteOffset+r.bytesFilled;bo(e,r.buffer,f-s,s);}r.bytesFilled-=s,Vr(e._controlledReadableByteStream,r),Yr(e);}n(oa,"ReadableByteStreamControllerRespondInReadableState");function So(e,t){const r=e._pendingPullIntos.peek();Qr(e),e._controlledReadableByteStream._state==="closed"?na(e,r):oa(e,t,r),Ie(e);}n(So,"ReadableByteStreamControllerRespondInternal");function Ye(e){return e._pendingPullIntos.shift()}n(Ye,"ReadableByteStreamControllerShiftPendingPullInto");function ia(e){const t=e._controlledReadableByteStream;return t._state!=="readable"||e._closeRequested||!e._started?!1:!!(to(t)&&Lt(t)>0||Kr(t)&&vo(t)>0||Ro(e)>0)}n(ia,"ReadableByteStreamControllerShouldCallPull");function xt(e){e._pullAlgorithm=void 0,e._cancelAlgorithm=void 0;}n(xt,"ReadableByteStreamControllerClearAlgorithms");function gt(e){const t=e._controlledReadableByteStream;if(!(e._closeRequested||t._state!=="readable")){if(e._queueTotalSize>0){e._closeRequested=!0;return}if(e._pendingPullIntos.length>0){const r=e._pendingPullIntos.peek();if(r.bytesFilled%r.elementSize!==0){const s=new TypeError("Insufficient bytes to fill elements in the given buffer");throw K(e,s),s}}xt(e),Pt(t);}}n(gt,"ReadableByteStreamControllerClose");function Nt(e,t){const r=e._controlledReadableByteStream;if(e._closeRequested||r._state!=="readable")return;const{buffer:s,byteOffset:f,byteLength:c}=t;if(Ae(s))throw new TypeError("chunk's buffer is detached and so cannot be enqueued");const d=we(s);if(e._pendingPullIntos.length>0){const m=e._pendingPullIntos.peek();if(Ae(m.buffer))throw new TypeError("The BYOB request's buffer has been detached and so cannot be filled with an enqueued chunk");Qr(e),m.buffer=we(m.buffer),m.readerType==="none"&&mo(e,m);}if(to(r))if(ta(e),Lt(r)===0)Ut(e,d,f,c);else {e._pendingPullIntos.length>0&&Ye(e);const m=new Uint8Array(d,f,c);Lr(r,m,!1);}else Kr(r)?(Ut(e,d,f,c),Yr(e)):Ut(e,d,f,c);Ie(e);}n(Nt,"ReadableByteStreamControllerEnqueue");function K(e,t){const r=e._controlledReadableByteStream;r._state==="readable"&&(ho(e),Be(e),xt(e),Zo(r,t));}n(K,"ReadableByteStreamControllerError");function wo(e,t){const r=e._queue.shift();e._queueTotalSize-=r.byteLength,_o(e);const s=new Uint8Array(r.buffer,r.byteOffset,r.byteLength);t._chunkSteps(s);}n(wo,"ReadableByteStreamControllerFillReadRequestFromQueue");function Gr(e){if(e._byobRequest===null&&e._pendingPullIntos.length>0){const t=e._pendingPullIntos.peek(),r=new Uint8Array(t.buffer,t.byteOffset+t.bytesFilled,t.byteLength-t.bytesFilled),s=Object.create(Re.prototype);sa(s,e,r),e._byobRequest=s;}return e._byobRequest}n(Gr,"ReadableByteStreamControllerGetBYOBRequest");function Ro(e){const t=e._controlledReadableByteStream._state;return t==="errored"?null:t==="closed"?0:e._strategyHWM-e._queueTotalSize}n(Ro,"ReadableByteStreamControllerGetDesiredSize");function Ht(e,t){const r=e._pendingPullIntos.peek();if(e._controlledReadableByteStream._state==="closed"){if(t!==0)throw new TypeError("bytesWritten must be 0 when calling respond() on a closed stream")}else {if(t===0)throw new TypeError("bytesWritten must be greater than 0 when calling respond() on a readable stream");if(r.bytesFilled+t>r.byteLength)throw new RangeError("bytesWritten out of range")}r.buffer=we(r.buffer),So(e,t);}n(Ht,"ReadableByteStreamControllerRespond");function Vt(e,t){const r=e._pendingPullIntos.peek();if(e._controlledReadableByteStream._state==="closed"){if(t.byteLength!==0)throw new TypeError("The view's length must be 0 when calling respondWithNewView() on a closed stream")}else if(t.byteLength===0)throw new TypeError("The view's length must be greater than 0 when calling respondWithNewView() on a readable stream");if(r.byteOffset+r.bytesFilled!==t.byteOffset)throw new RangeError("The region specified by view does not match byobRequest");if(r.bufferByteLength!==t.buffer.byteLength)throw new RangeError("The buffer of view has different capacity than byobRequest");if(r.bytesFilled+t.byteLength>r.byteLength)throw new RangeError("The region specified by view is larger than byobRequest");const f=t.byteLength;r.buffer=we(t.buffer),So(e,f);}n(Vt,"ReadableByteStreamControllerRespondWithNewView");function To(e,t,r,s,f,c,d){t._controlledReadableByteStream=e,t._pullAgain=!1,t._pulling=!1,t._byobRequest=null,t._queue=t._queueTotalSize=void 0,Be(t),t._closeRequested=!1,t._started=!1,t._strategyHWM=c,t._pullAlgorithm=s,t._cancelAlgorithm=f,t._autoAllocateChunkSize=d,t._pendingPullIntos=new D,e._readableStreamController=t;const m=r();_(T(m),()=>(t._started=!0,Ie(t),null),R=>(K(t,R),null));}n(To,"SetUpReadableByteStreamController");function aa(e,t,r){const s=Object.create(te.prototype);let f,c,d;t.start!==void 0?f=n(()=>t.start(s),"startAlgorithm"):f=n(()=>{},"startAlgorithm"),t.pull!==void 0?c=n(()=>t.pull(s),"pullAlgorithm"):c=n(()=>T(void 0),"pullAlgorithm"),t.cancel!==void 0?d=n(R=>t.cancel(R),"cancelAlgorithm"):d=n(()=>T(void 0),"cancelAlgorithm");const m=t.autoAllocateChunkSize;if(m===0)throw new TypeError("autoAllocateChunkSize must be greater than 0");To(e,s,f,c,d,r,m);}n(aa,"SetUpReadableByteStreamControllerFromUnderlyingSource");function sa(e,t,r){e._associatedReadableByteStreamController=t,e._view=r;}n(sa,"SetUpReadableStreamBYOBRequest");function Zr(e){return new TypeError(`ReadableStreamBYOBRequest.prototype.${e} can only be used on a ReadableStreamBYOBRequest`)}n(Zr,"byobRequestBrandCheckException");function _t(e){return new TypeError(`ReadableByteStreamController.prototype.${e} can only be used on a ReadableByteStreamController`)}n(_t,"byteStreamControllerBrandCheckException");function la(e,t){ue(e,t);const r=e?.mode;return {mode:r===void 0?void 0:ua(r,`${t} has member 'mode' that`)}}n(la,"convertReaderOptions");function ua(e,t){if(e=`${e}`,e!=="byob")throw new TypeError(`${t} '${e}' is not a valid enumeration value for ReadableStreamReaderMode`);return e}n(ua,"convertReadableStreamReaderMode");function fa(e,t){var r;ue(e,t);const s=(r=e?.min)!==null&&r!==void 0?r:1;return {min:Fr(s,`${t} has member 'min' that`)}}n(fa,"convertByobReadOptions");function Co(e){return new ce(e)}n(Co,"AcquireReadableStreamBYOBReader");function Po(e,t){e._reader._readIntoRequests.push(t);}n(Po,"ReadableStreamAddReadIntoRequest");function ca(e,t,r){const f=e._reader._readIntoRequests.shift();r?f._closeSteps(t):f._chunkSteps(t);}n(ca,"ReadableStreamFulfillReadIntoRequest");function vo(e){return e._reader._readIntoRequests.length}n(vo,"ReadableStreamGetNumReadIntoRequests");function Kr(e){const t=e._reader;return !(t===void 0||!Fe(t))}n(Kr,"ReadableStreamHasBYOBReader");const Sn=class Sn{constructor(t){if(Se(t,1,"ReadableStreamBYOBReader"),jr(t,"First parameter"),qe(t))throw new TypeError("This stream has already been locked for exclusive reading by another reader");if(!ze(t._readableStreamController))throw new TypeError("Cannot construct a ReadableStreamBYOBReader for a stream not constructed with a byte source");Yn(this,t),this._readIntoRequests=new D;}get closed(){return Fe(this)?this._closedPromise:b(Qt("closed"))}cancel(t=void 0){return Fe(this)?this._ownerReadableStream===void 0?b(jt("cancel")):Wr(this,t):b(Qt("cancel"))}read(t,r={}){if(!Fe(this))return b(Qt("read"));if(!ArrayBuffer.isView(t))return b(new TypeError("view must be an array buffer view"));if(t.byteLength===0)return b(new TypeError("view must have non-zero byteLength"));if(t.buffer.byteLength===0)return b(new TypeError("view's buffer must have non-zero byteLength"));if(Ae(t.buffer))return b(new TypeError("view's buffer has been detached"));let s;try{s=fa(r,"options");}catch(y){return b(y)}const f=s.min;if(f===0)return b(new TypeError("options.min must be greater than 0"));if(Xi(t)){if(f>t.byteLength)return b(new RangeError("options.min must be less than or equal to view's byteLength"))}else if(f>t.length)return b(new RangeError("options.min must be less than or equal to view's length"));if(this._ownerReadableStream===void 0)return b(jt("read from"));let c,d;const m=E((y,C)=>{c=y,d=C;});return Eo(this,t,f,{_chunkSteps:y=>c({value:y,done:!1}),_closeSteps:y=>c({value:y,done:!0}),_errorSteps:y=>d(y)}),m}releaseLock(){if(!Fe(this))throw Qt("releaseLock");this._ownerReadableStream!==void 0&&da(this);}};n(Sn,"ReadableStreamBYOBReader");let ce=Sn;Object.defineProperties(ce.prototype,{cancel:{enumerable:!0},read:{enumerable:!0},releaseLock:{enumerable:!0},closed:{enumerable:!0}}),h(ce.prototype.cancel,"cancel"),h(ce.prototype.read,"read"),h(ce.prototype.releaseLock,"releaseLock"),typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(ce.prototype,Symbol.toStringTag,{value:"ReadableStreamBYOBReader",configurable:!0});function Fe(e){return !l(e)||!Object.prototype.hasOwnProperty.call(e,"_readIntoRequests")?!1:e instanceof ce}n(Fe,"IsReadableStreamBYOBReader");function Eo(e,t,r,s){const f=e._ownerReadableStream;f._disturbed=!0,f._state==="errored"?s._errorSteps(f._storedError):ra(f._readableStreamController,t,r,s);}n(Eo,"ReadableStreamBYOBReaderRead");function da(e){_e(e);const t=new TypeError("Reader was released");Ao(e,t);}n(da,"ReadableStreamBYOBReaderRelease");function Ao(e,t){const r=e._readIntoRequests;e._readIntoRequests=new D,r.forEach(s=>{s._errorSteps(t);});}n(Ao,"ReadableStreamBYOBReaderErrorReadIntoRequests");function Qt(e){return new TypeError(`ReadableStreamBYOBReader.prototype.${e} can only be used on a ReadableStreamBYOBReader`)}n(Qt,"byobReaderBrandCheckException");function St(e,t){const{highWaterMark:r}=e;if(r===void 0)return t;if(ao(r)||r<0)throw new RangeError("Invalid highWaterMark");return r}n(St,"ExtractHighWaterMark");function Yt(e){const{size:t}=e;return t||(()=>1)}n(Yt,"ExtractSizeAlgorithm");function Gt(e,t){ue(e,t);const r=e?.highWaterMark,s=e?.size;return {highWaterMark:r===void 0?void 0:Ir(r),size:s===void 0?void 0:ha(s,`${t} has member 'size' that`)}}n(Gt,"convertQueuingStrategy");function ha(e,t){return Z(e,t),r=>Ir(e(r))}n(ha,"convertQueuingStrategySize");function pa(e,t){ue(e,t);const r=e?.abort,s=e?.close,f=e?.start,c=e?.type,d=e?.write;return {abort:r===void 0?void 0:ba(r,e,`${t} has member 'abort' that`),close:s===void 0?void 0:ma(s,e,`${t} has member 'close' that`),start:f===void 0?void 0:ya(f,e,`${t} has member 'start' that`),write:d===void 0?void 0:ga(d,e,`${t} has member 'write' that`),type:c}}n(pa,"convertUnderlyingSink");function ba(e,t,r){return Z(e,r),s=>j(e,t,[s])}n(ba,"convertUnderlyingSinkAbortCallback");function ma(e,t,r){return Z(e,r),()=>j(e,t,[])}n(ma,"convertUnderlyingSinkCloseCallback");function ya(e,t,r){return Z(e,r),s=>z(e,t,[s])}n(ya,"convertUnderlyingSinkStartCallback");function ga(e,t,r){return Z(e,r),(s,f)=>j(e,t,[s,f])}n(ga,"convertUnderlyingSinkWriteCallback");function Bo(e,t){if(!Ge(e))throw new TypeError(`${t} is not a WritableStream.`)}n(Bo,"assertWritableStream");function _a(e){if(typeof e!="object"||e===null)return !1;try{return typeof e.aborted=="boolean"}catch{return !1}}n(_a,"isAbortSignal");const Sa=typeof AbortController=="function";function wa(){if(Sa)return new AbortController}n(wa,"createAbortController");const wn=class wn{constructor(t={},r={}){t===void 0?t=null:Jn(t,"First parameter");const s=Gt(r,"Second parameter"),f=pa(t,"First parameter");if(Wo(this),f.type!==void 0)throw new RangeError("Invalid type is specified");const d=Yt(s),m=St(s,1);Ia(this,f,m,d);}get locked(){if(!Ge(this))throw er("locked");return Ze(this)}abort(t=void 0){return Ge(this)?Ze(this)?b(new TypeError("Cannot abort a stream that already has a writer")):Zt(this,t):b(er("abort"))}close(){return Ge(this)?Ze(this)?b(new TypeError("Cannot close a stream that already has a writer")):he(this)?b(new TypeError("Cannot close an already-closing stream")):qo(this):b(er("close"))}getWriter(){if(!Ge(this))throw er("getWriter");return ko(this)}};n(wn,"WritableStream");let de=wn;Object.defineProperties(de.prototype,{abort:{enumerable:!0},close:{enumerable:!0},getWriter:{enumerable:!0},locked:{enumerable:!0}}),h(de.prototype.abort,"abort"),h(de.prototype.close,"close"),h(de.prototype.getWriter,"getWriter"),typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(de.prototype,Symbol.toStringTag,{value:"WritableStream",configurable:!0});function ko(e){return new re(e)}n(ko,"AcquireWritableStreamDefaultWriter");function Ra(e,t,r,s,f=1,c=()=>1){const d=Object.create(de.prototype);Wo(d);const m=Object.create(ke.prototype);return Lo(d,m,e,t,r,s,f,c),d}n(Ra,"CreateWritableStream");function Wo(e){e._state="writable",e._storedError=void 0,e._writer=void 0,e._writableStreamController=void 0,e._writeRequests=new D,e._inFlightWriteRequest=void 0,e._closeRequest=void 0,e._inFlightCloseRequest=void 0,e._pendingAbortRequest=void 0,e._backpressure=!1;}n(Wo,"InitializeWritableStream");function Ge(e){return !l(e)||!Object.prototype.hasOwnProperty.call(e,"_writableStreamController")?!1:e instanceof de}n(Ge,"IsWritableStream");function Ze(e){return e._writer!==void 0}n(Ze,"IsWritableStreamLocked");function Zt(e,t){var r;if(e._state==="closed"||e._state==="errored")return T(void 0);e._writableStreamController._abortReason=t,(r=e._writableStreamController._abortController)===null||r===void 0||r.abort(t);const s=e._state;if(s==="closed"||s==="errored")return T(void 0);if(e._pendingAbortRequest!==void 0)return e._pendingAbortRequest._promise;let f=!1;s==="erroring"&&(f=!0,t=void 0);const c=E((d,m)=>{e._pendingAbortRequest={_promise:void 0,_resolve:d,_reject:m,_reason:t,_wasAlreadyErroring:f};});return e._pendingAbortRequest._promise=c,f||Xr(e,t),c}n(Zt,"WritableStreamAbort");function qo(e){const t=e._state;if(t==="closed"||t==="errored")return b(new TypeError(`The stream (in ${t} state) is not in the writable state and cannot be closed`));const r=E((f,c)=>{const d={_resolve:f,_reject:c};e._closeRequest=d;}),s=e._writer;return s!==void 0&&e._backpressure&&t==="writable"&&ln(s),Fa(e._writableStreamController),r}n(qo,"WritableStreamClose");function Ta(e){return E((r,s)=>{const f={_resolve:r,_reject:s};e._writeRequests.push(f);})}n(Ta,"WritableStreamAddWriteRequest");function Jr(e,t){if(e._state==="writable"){Xr(e,t);return}en(e);}n(Jr,"WritableStreamDealWithRejection");function Xr(e,t){const r=e._writableStreamController;e._state="erroring",e._storedError=t;const s=e._writer;s!==void 0&&zo(s,t),!Aa(e)&&r._started&&en(e);}n(Xr,"WritableStreamStartErroring");function en(e){e._state="errored",e._writableStreamController[Qn]();const t=e._storedError;if(e._writeRequests.forEach(f=>{f._reject(t);}),e._writeRequests=new D,e._pendingAbortRequest===void 0){Kt(e);return}const r=e._pendingAbortRequest;if(e._pendingAbortRequest=void 0,r._wasAlreadyErroring){r._reject(t),Kt(e);return}const s=e._writableStreamController[Ft](r._reason);_(s,()=>(r._resolve(),Kt(e),null),f=>(r._reject(f),Kt(e),null));}n(en,"WritableStreamFinishErroring");function Ca(e){e._inFlightWriteRequest._resolve(void 0),e._inFlightWriteRequest=void 0;}n(Ca,"WritableStreamFinishInFlightWrite");function Pa(e,t){e._inFlightWriteRequest._reject(t),e._inFlightWriteRequest=void 0,Jr(e,t);}n(Pa,"WritableStreamFinishInFlightWriteWithError");function va(e){e._inFlightCloseRequest._resolve(void 0),e._inFlightCloseRequest=void 0,e._state==="erroring"&&(e._storedError=void 0,e._pendingAbortRequest!==void 0&&(e._pendingAbortRequest._resolve(),e._pendingAbortRequest=void 0)),e._state="closed";const r=e._writer;r!==void 0&&Uo(r);}n(va,"WritableStreamFinishInFlightClose");function Ea(e,t){e._inFlightCloseRequest._reject(t),e._inFlightCloseRequest=void 0,e._pendingAbortRequest!==void 0&&(e._pendingAbortRequest._reject(t),e._pendingAbortRequest=void 0),Jr(e,t);}n(Ea,"WritableStreamFinishInFlightCloseWithError");function he(e){return !(e._closeRequest===void 0&&e._inFlightCloseRequest===void 0)}n(he,"WritableStreamCloseQueuedOrInFlight");function Aa(e){return !(e._inFlightWriteRequest===void 0&&e._inFlightCloseRequest===void 0)}n(Aa,"WritableStreamHasOperationMarkedInFlight");function Ba(e){e._inFlightCloseRequest=e._closeRequest,e._closeRequest=void 0;}n(Ba,"WritableStreamMarkCloseRequestInFlight");function ka(e){e._inFlightWriteRequest=e._writeRequests.shift();}n(ka,"WritableStreamMarkFirstWriteRequestInFlight");function Kt(e){e._closeRequest!==void 0&&(e._closeRequest._reject(e._storedError),e._closeRequest=void 0);const t=e._writer;t!==void 0&&an(t,e._storedError);}n(Kt,"WritableStreamRejectCloseAndClosedPromiseIfNeeded");function tn(e,t){const r=e._writer;r!==void 0&&t!==e._backpressure&&(t?xa(r):ln(r)),e._backpressure=t;}n(tn,"WritableStreamUpdateBackpressure");const Rn=class Rn{constructor(t){if(Se(t,1,"WritableStreamDefaultWriter"),Bo(t,"First parameter"),Ze(t))throw new TypeError("This stream has already been locked for exclusive writing by another writer");this._ownerWritableStream=t,t._writer=this;const r=t._state;if(r==="writable")!he(t)&&t._backpressure?rr(this):xo(this),tr(this);else if(r==="erroring")sn(this,t._storedError),tr(this);else if(r==="closed")xo(this),Ma(this);else {const s=t._storedError;sn(this,s),Mo(this,s);}}get closed(){return je(this)?this._closedPromise:b(Le("closed"))}get desiredSize(){if(!je(this))throw Le("desiredSize");if(this._ownerWritableStream===void 0)throw Rt("desiredSize");return za(this)}get ready(){return je(this)?this._readyPromise:b(Le("ready"))}abort(t=void 0){return je(this)?this._ownerWritableStream===void 0?b(Rt("abort")):Wa(this,t):b(Le("abort"))}close(){if(!je(this))return b(Le("close"));const t=this._ownerWritableStream;return t===void 0?b(Rt("close")):he(t)?b(new TypeError("Cannot close an already-closing stream")):Oo(this)}releaseLock(){if(!je(this))throw Le("releaseLock");this._ownerWritableStream!==void 0&&Io(this);}write(t=void 0){return je(this)?this._ownerWritableStream===void 0?b(Rt("write to")):Fo(this,t):b(Le("write"))}};n(Rn,"WritableStreamDefaultWriter");let re=Rn;Object.defineProperties(re.prototype,{abort:{enumerable:!0},close:{enumerable:!0},releaseLock:{enumerable:!0},write:{enumerable:!0},closed:{enumerable:!0},desiredSize:{enumerable:!0},ready:{enumerable:!0}}),h(re.prototype.abort,"abort"),h(re.prototype.close,"close"),h(re.prototype.releaseLock,"releaseLock"),h(re.prototype.write,"write"),typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(re.prototype,Symbol.toStringTag,{value:"WritableStreamDefaultWriter",configurable:!0});function je(e){return !l(e)||!Object.prototype.hasOwnProperty.call(e,"_ownerWritableStream")?!1:e instanceof re}n(je,"IsWritableStreamDefaultWriter");function Wa(e,t){const r=e._ownerWritableStream;return Zt(r,t)}n(Wa,"WritableStreamDefaultWriterAbort");function Oo(e){const t=e._ownerWritableStream;return qo(t)}n(Oo,"WritableStreamDefaultWriterClose");function qa(e){const t=e._ownerWritableStream,r=t._state;return he(t)||r==="closed"?T(void 0):r==="errored"?b(t._storedError):Oo(e)}n(qa,"WritableStreamDefaultWriterCloseWithErrorPropagation");function Oa(e,t){e._closedPromiseState==="pending"?an(e,t):Ua(e,t);}n(Oa,"WritableStreamDefaultWriterEnsureClosedPromiseRejected");function zo(e,t){e._readyPromiseState==="pending"?No(e,t):Na(e,t);}n(zo,"WritableStreamDefaultWriterEnsureReadyPromiseRejected");function za(e){const t=e._ownerWritableStream,r=t._state;return r==="errored"||r==="erroring"?null:r==="closed"?0:$o(t._writableStreamController)}n(za,"WritableStreamDefaultWriterGetDesiredSize");function Io(e){const t=e._ownerWritableStream,r=new TypeError("Writer was released and can no longer be used to monitor the stream's closedness");zo(e,r),Oa(e,r),t._writer=void 0,e._ownerWritableStream=void 0;}n(Io,"WritableStreamDefaultWriterRelease");function Fo(e,t){const r=e._ownerWritableStream,s=r._writableStreamController,f=ja(s,t);if(r!==e._ownerWritableStream)return b(Rt("write to"));const c=r._state;if(c==="errored")return b(r._storedError);if(he(r)||c==="closed")return b(new TypeError("The stream is closing or closed and cannot be written to"));if(c==="erroring")return b(r._storedError);const d=Ta(r);return La(s,t,f),d}n(Fo,"WritableStreamDefaultWriterWrite");const jo={},Tn=class Tn{constructor(){throw new TypeError("Illegal constructor")}get abortReason(){if(!rn(this))throw on("abortReason");return this._abortReason}get signal(){if(!rn(this))throw on("signal");if(this._abortController===void 0)throw new TypeError("WritableStreamDefaultController.prototype.signal is not supported");return this._abortController.signal}error(t=void 0){if(!rn(this))throw on("error");this._controlledWritableStream._state==="writable"&&Do(this,t);}[Ft](t){const r=this._abortAlgorithm(t);return Jt(this),r}[Qn](){Be(this);}};n(Tn,"WritableStreamDefaultController");let ke=Tn;Object.defineProperties(ke.prototype,{abortReason:{enumerable:!0},signal:{enumerable:!0},error:{enumerable:!0}}),typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(ke.prototype,Symbol.toStringTag,{value:"WritableStreamDefaultController",configurable:!0});function rn(e){return !l(e)||!Object.prototype.hasOwnProperty.call(e,"_controlledWritableStream")?!1:e instanceof ke}n(rn,"IsWritableStreamDefaultController");function Lo(e,t,r,s,f,c,d,m){t._controlledWritableStream=e,e._writableStreamController=t,t._queue=void 0,t._queueTotalSize=void 0,Be(t),t._abortReason=void 0,t._abortController=wa(),t._started=!1,t._strategySizeAlgorithm=m,t._strategyHWM=d,t._writeAlgorithm=s,t._closeAlgorithm=f,t._abortAlgorithm=c;const R=nn(t);tn(e,R);const y=r(),C=T(y);_(C,()=>(t._started=!0,Xt(t),null),P=>(t._started=!0,Jr(e,P),null));}n(Lo,"SetUpWritableStreamDefaultController");function Ia(e,t,r,s){const f=Object.create(ke.prototype);let c,d,m,R;t.start!==void 0?c=n(()=>t.start(f),"startAlgorithm"):c=n(()=>{},"startAlgorithm"),t.write!==void 0?d=n(y=>t.write(y,f),"writeAlgorithm"):d=n(()=>T(void 0),"writeAlgorithm"),t.close!==void 0?m=n(()=>t.close(),"closeAlgorithm"):m=n(()=>T(void 0),"closeAlgorithm"),t.abort!==void 0?R=n(y=>t.abort(y),"abortAlgorithm"):R=n(()=>T(void 0),"abortAlgorithm"),Lo(e,f,c,d,m,R,r,s);}n(Ia,"SetUpWritableStreamDefaultControllerFromUnderlyingSink");function Jt(e){e._writeAlgorithm=void 0,e._closeAlgorithm=void 0,e._abortAlgorithm=void 0,e._strategySizeAlgorithm=void 0;}n(Jt,"WritableStreamDefaultControllerClearAlgorithms");function Fa(e){Nr(e,jo,0),Xt(e);}n(Fa,"WritableStreamDefaultControllerClose");function ja(e,t){try{return e._strategySizeAlgorithm(t)}catch(r){return wt(e,r),1}}n(ja,"WritableStreamDefaultControllerGetChunkSize");function $o(e){return e._strategyHWM-e._queueTotalSize}n($o,"WritableStreamDefaultControllerGetDesiredSize");function La(e,t,r){try{Nr(e,t,r);}catch(f){wt(e,f);return}const s=e._controlledWritableStream;if(!he(s)&&s._state==="writable"){const f=nn(e);tn(s,f);}Xt(e);}n(La,"WritableStreamDefaultControllerWrite");function Xt(e){const t=e._controlledWritableStream;if(!e._started||t._inFlightWriteRequest!==void 0)return;if(t._state==="erroring"){en(t);return}if(e._queue.length===0)return;const s=Ji(e);s===jo?$a(e):Da(e,s);}n(Xt,"WritableStreamDefaultControllerAdvanceQueueIfNeeded");function wt(e,t){e._controlledWritableStream._state==="writable"&&Do(e,t);}n(wt,"WritableStreamDefaultControllerErrorIfNeeded");function $a(e){const t=e._controlledWritableStream;Ba(t),xr(e);const r=e._closeAlgorithm();Jt(e),_(r,()=>(va(t),null),s=>(Ea(t,s),null));}n($a,"WritableStreamDefaultControllerProcessClose");function Da(e,t){const r=e._controlledWritableStream;ka(r);const s=e._writeAlgorithm(t);_(s,()=>{Ca(r);const f=r._state;if(xr(e),!he(r)&&f==="writable"){const c=nn(e);tn(r,c);}return Xt(e),null},f=>(r._state==="writable"&&Jt(e),Pa(r,f),null));}n(Da,"WritableStreamDefaultControllerProcessWrite");function nn(e){return $o(e)<=0}n(nn,"WritableStreamDefaultControllerGetBackpressure");function Do(e,t){const r=e._controlledWritableStream;Jt(e),Xr(r,t);}n(Do,"WritableStreamDefaultControllerError");function er(e){return new TypeError(`WritableStream.prototype.${e} can only be used on a WritableStream`)}n(er,"streamBrandCheckException$2");function on(e){return new TypeError(`WritableStreamDefaultController.prototype.${e} can only be used on a WritableStreamDefaultController`)}n(on,"defaultControllerBrandCheckException$2");function Le(e){return new TypeError(`WritableStreamDefaultWriter.prototype.${e} can only be used on a WritableStreamDefaultWriter`)}n(Le,"defaultWriterBrandCheckException");function Rt(e){return new TypeError("Cannot "+e+" a stream using a released writer")}n(Rt,"defaultWriterLockException");function tr(e){e._closedPromise=E((t,r)=>{e._closedPromise_resolve=t,e._closedPromise_reject=r,e._closedPromiseState="pending";});}n(tr,"defaultWriterClosedPromiseInitialize");function Mo(e,t){tr(e),an(e,t);}n(Mo,"defaultWriterClosedPromiseInitializeAsRejected");function Ma(e){tr(e),Uo(e);}n(Ma,"defaultWriterClosedPromiseInitializeAsResolved");function an(e,t){e._closedPromise_reject!==void 0&&(Q(e._closedPromise),e._closedPromise_reject(t),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="rejected");}n(an,"defaultWriterClosedPromiseReject");function Ua(e,t){Mo(e,t);}n(Ua,"defaultWriterClosedPromiseResetToRejected");function Uo(e){e._closedPromise_resolve!==void 0&&(e._closedPromise_resolve(void 0),e._closedPromise_resolve=void 0,e._closedPromise_reject=void 0,e._closedPromiseState="resolved");}n(Uo,"defaultWriterClosedPromiseResolve");function rr(e){e._readyPromise=E((t,r)=>{e._readyPromise_resolve=t,e._readyPromise_reject=r;}),e._readyPromiseState="pending";}n(rr,"defaultWriterReadyPromiseInitialize");function sn(e,t){rr(e),No(e,t);}n(sn,"defaultWriterReadyPromiseInitializeAsRejected");function xo(e){rr(e),ln(e);}n(xo,"defaultWriterReadyPromiseInitializeAsResolved");function No(e,t){e._readyPromise_reject!==void 0&&(Q(e._readyPromise),e._readyPromise_reject(t),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="rejected");}n(No,"defaultWriterReadyPromiseReject");function xa(e){rr(e);}n(xa,"defaultWriterReadyPromiseReset");function Na(e,t){sn(e,t);}n(Na,"defaultWriterReadyPromiseResetToRejected");function ln(e){e._readyPromise_resolve!==void 0&&(e._readyPromise_resolve(void 0),e._readyPromise_resolve=void 0,e._readyPromise_reject=void 0,e._readyPromiseState="fulfilled");}n(ln,"defaultWriterReadyPromiseResolve");function Ha(){if(typeof globalThis<"u")return globalThis;if(typeof self<"u")return self;if(typeof n$1<"u")return n$1}n(Ha,"getGlobals");const un=Ha();function Va(e){if(!(typeof e=="function"||typeof e=="object")||e.name!=="DOMException")return !1;try{return new e,!0}catch{return !1}}n(Va,"isDOMExceptionConstructor");function Qa(){const e=un?.DOMException;return Va(e)?e:void 0}n(Qa,"getFromGlobal");function Ya(){const e=n(function(r,s){this.message=r||"",this.name=s||"Error",Error.captureStackTrace&&Error.captureStackTrace(this,this.constructor);},"DOMException");return h(e,"DOMException"),e.prototype=Object.create(Error.prototype),Object.defineProperty(e.prototype,"constructor",{value:e,writable:!0,configurable:!0}),e}n(Ya,"createPolyfill");const Ga=Qa()||Ya();function Ho(e,t,r,s,f,c){const d=Qe(e),m=ko(t);e._disturbed=!0;let R=!1,y=T(void 0);return E((C,P)=>{let B;if(c!==void 0){if(B=n(()=>{const S=c.reason!==void 0?c.reason:new Ga("Aborted","AbortError"),v=[];s||v.push(()=>t._state==="writable"?Zt(t,S):T(void 0)),f||v.push(()=>e._state==="readable"?ie(e,S):T(void 0)),N(()=>Promise.all(v.map(k=>k())),!0,S);},"abortAlgorithm"),c.aborted){B();return}c.addEventListener("abort",B);}function ae(){return E((S,v)=>{function k(Y){Y?S():q(nt(),k,v);}n(k,"next"),k(!1);})}n(ae,"pipeLoop");function nt(){return R?T(!0):q(m._readyPromise,()=>E((S,v)=>{mt(d,{_chunkSteps:k=>{y=q(Fo(m,k),void 0,u),S(!1);},_closeSteps:()=>S(!0),_errorSteps:v});}))}if(n(nt,"pipeStep"),Te(e,d._closedPromise,S=>(s?J(!0,S):N(()=>Zt(t,S),!0,S),null)),Te(t,m._closedPromise,S=>(f?J(!0,S):N(()=>ie(e,S),!0,S),null)),x(e,d._closedPromise,()=>(r?J():N(()=>qa(m)),null)),he(t)||t._state==="closed"){const S=new TypeError("the destination writable stream closed before all data could be piped to it");f?J(!0,S):N(()=>ie(e,S),!0,S);}Q(ae());function Oe(){const S=y;return q(y,()=>S!==y?Oe():void 0)}n(Oe,"waitForWritesToFinish");function Te(S,v,k){S._state==="errored"?k(S._storedError):I(v,k);}n(Te,"isOrBecomesErrored");function x(S,v,k){S._state==="closed"?k():V(v,k);}n(x,"isOrBecomesClosed");function N(S,v,k){if(R)return;R=!0,t._state==="writable"&&!he(t)?V(Oe(),Y):Y();function Y(){return _(S(),()=>Ce(v,k),ot=>Ce(!0,ot)),null}n(Y,"doTheRest");}n(N,"shutdownWithAction");function J(S,v){R||(R=!0,t._state==="writable"&&!he(t)?V(Oe(),()=>Ce(S,v)):Ce(S,v));}n(J,"shutdown");function Ce(S,v){return Io(m),_e(d),c!==void 0&&c.removeEventListener("abort",B),S?P(v):C(void 0),null}n(Ce,"finalize");})}n(Ho,"ReadableStreamPipeTo");const Cn=class Cn{constructor(){throw new TypeError("Illegal constructor")}get desiredSize(){if(!nr(this))throw ir("desiredSize");return fn(this)}close(){if(!nr(this))throw ir("close");if(!Je(this))throw new TypeError("The stream is not in a state that permits close");$e(this);}enqueue(t=void 0){if(!nr(this))throw ir("enqueue");if(!Je(this))throw new TypeError("The stream is not in a state that permits enqueue");return Ke(this,t)}error(t=void 0){if(!nr(this))throw ir("error");oe(this,t);}[Ar](t){Be(this);const r=this._cancelAlgorithm(t);return or(this),r}[Br](t){const r=this._controlledReadableStream;if(this._queue.length>0){const s=xr(this);this._closeRequested&&this._queue.length===0?(or(this),Pt(r)):Tt(this),t._chunkSteps(s);}else eo(r,t),Tt(this);}[kr](){}};n(Cn,"ReadableStreamDefaultController");let ne=Cn;Object.defineProperties(ne.prototype,{close:{enumerable:!0},enqueue:{enumerable:!0},error:{enumerable:!0},desiredSize:{enumerable:!0}}),h(ne.prototype.close,"close"),h(ne.prototype.enqueue,"enqueue"),h(ne.prototype.error,"error"),typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(ne.prototype,Symbol.toStringTag,{value:"ReadableStreamDefaultController",configurable:!0});function nr(e){return !l(e)||!Object.prototype.hasOwnProperty.call(e,"_controlledReadableStream")?!1:e instanceof ne}n(nr,"IsReadableStreamDefaultController");function Tt(e){if(!Vo(e))return;if(e._pulling){e._pullAgain=!0;return}e._pulling=!0;const r=e._pullAlgorithm();_(r,()=>(e._pulling=!1,e._pullAgain&&(e._pullAgain=!1,Tt(e)),null),s=>(oe(e,s),null));}n(Tt,"ReadableStreamDefaultControllerCallPullIfNeeded");function Vo(e){const t=e._controlledReadableStream;return !Je(e)||!e._started?!1:!!(qe(t)&&Lt(t)>0||fn(e)>0)}n(Vo,"ReadableStreamDefaultControllerShouldCallPull");function or(e){e._pullAlgorithm=void 0,e._cancelAlgorithm=void 0,e._strategySizeAlgorithm=void 0;}n(or,"ReadableStreamDefaultControllerClearAlgorithms");function $e(e){if(!Je(e))return;const t=e._controlledReadableStream;e._closeRequested=!0,e._queue.length===0&&(or(e),Pt(t));}n($e,"ReadableStreamDefaultControllerClose");function Ke(e,t){if(!Je(e))return;const r=e._controlledReadableStream;if(qe(r)&&Lt(r)>0)Lr(r,t,!1);else {let s;try{s=e._strategySizeAlgorithm(t);}catch(f){throw oe(e,f),f}try{Nr(e,t,s);}catch(f){throw oe(e,f),f}}Tt(e);}n(Ke,"ReadableStreamDefaultControllerEnqueue");function oe(e,t){const r=e._controlledReadableStream;r._state==="readable"&&(Be(e),or(e),Zo(r,t));}n(oe,"ReadableStreamDefaultControllerError");function fn(e){const t=e._controlledReadableStream._state;return t==="errored"?null:t==="closed"?0:e._strategyHWM-e._queueTotalSize}n(fn,"ReadableStreamDefaultControllerGetDesiredSize");function Za(e){return !Vo(e)}n(Za,"ReadableStreamDefaultControllerHasBackpressure");function Je(e){const t=e._controlledReadableStream._state;return !e._closeRequested&&t==="readable"}n(Je,"ReadableStreamDefaultControllerCanCloseOrEnqueue");function Qo(e,t,r,s,f,c,d){t._controlledReadableStream=e,t._queue=void 0,t._queueTotalSize=void 0,Be(t),t._started=!1,t._closeRequested=!1,t._pullAgain=!1,t._pulling=!1,t._strategySizeAlgorithm=d,t._strategyHWM=c,t._pullAlgorithm=s,t._cancelAlgorithm=f,e._readableStreamController=t;const m=r();_(T(m),()=>(t._started=!0,Tt(t),null),R=>(oe(t,R),null));}n(Qo,"SetUpReadableStreamDefaultController");function Ka(e,t,r,s){const f=Object.create(ne.prototype);let c,d,m;t.start!==void 0?c=n(()=>t.start(f),"startAlgorithm"):c=n(()=>{},"startAlgorithm"),t.pull!==void 0?d=n(()=>t.pull(f),"pullAlgorithm"):d=n(()=>T(void 0),"pullAlgorithm"),t.cancel!==void 0?m=n(R=>t.cancel(R),"cancelAlgorithm"):m=n(()=>T(void 0),"cancelAlgorithm"),Qo(e,f,c,d,m,r,s);}n(Ka,"SetUpReadableStreamDefaultControllerFromUnderlyingSource");function ir(e){return new TypeError(`ReadableStreamDefaultController.prototype.${e} can only be used on a ReadableStreamDefaultController`)}n(ir,"defaultControllerBrandCheckException$1");function Ja(e,t){return ze(e._readableStreamController)?es(e):Xa(e)}n(Ja,"ReadableStreamTee");function Xa(e,t){const r=Qe(e);let s=!1,f=!1,c=!1,d=!1,m,R,y,C,P;const B=E(x=>{P=x;});function ae(){return s?(f=!0,T(void 0)):(s=!0,mt(r,{_chunkSteps:N=>{ge(()=>{f=!1;const J=N,Ce=N;c||Ke(y._readableStreamController,J),d||Ke(C._readableStreamController,Ce),s=!1,f&&ae();});},_closeSteps:()=>{s=!1,c||$e(y._readableStreamController),d||$e(C._readableStreamController),(!c||!d)&&P(void 0);},_errorSteps:()=>{s=!1;}}),T(void 0))}n(ae,"pullAlgorithm");function nt(x){if(c=!0,m=x,d){const N=yt([m,R]),J=ie(e,N);P(J);}return B}n(nt,"cancel1Algorithm");function Oe(x){if(d=!0,R=x,c){const N=yt([m,R]),J=ie(e,N);P(J);}return B}n(Oe,"cancel2Algorithm");function Te(){}return n(Te,"startAlgorithm"),y=Ct(Te,ae,nt),C=Ct(Te,ae,Oe),I(r._closedPromise,x=>(oe(y._readableStreamController,x),oe(C._readableStreamController,x),(!c||!d)&&P(void 0),null)),[y,C]}n(Xa,"ReadableStreamDefaultTee");function es(e){let t=Qe(e),r=!1,s=!1,f=!1,c=!1,d=!1,m,R,y,C,P;const B=E(S=>{P=S;});function ae(S){I(S._closedPromise,v=>(S!==t||(K(y._readableStreamController,v),K(C._readableStreamController,v),(!c||!d)&&P(void 0)),null));}n(ae,"forwardReaderError");function nt(){Fe(t)&&(_e(t),t=Qe(e),ae(t)),mt(t,{_chunkSteps:v=>{ge(()=>{s=!1,f=!1;const k=v;let Y=v;if(!c&&!d)try{Y=fo(v);}catch(ot){K(y._readableStreamController,ot),K(C._readableStreamController,ot),P(ie(e,ot));return}c||Nt(y._readableStreamController,k),d||Nt(C._readableStreamController,Y),r=!1,s?Te():f&&x();});},_closeSteps:()=>{r=!1,c||gt(y._readableStreamController),d||gt(C._readableStreamController),y._readableStreamController._pendingPullIntos.length>0&&Ht(y._readableStreamController,0),C._readableStreamController._pendingPullIntos.length>0&&Ht(C._readableStreamController,0),(!c||!d)&&P(void 0);},_errorSteps:()=>{r=!1;}});}n(nt,"pullWithDefaultReader");function Oe(S,v){Ee(t)&&(_e(t),t=Co(e),ae(t));const k=v?C:y,Y=v?y:C;Eo(t,S,1,{_chunkSteps:it=>{ge(()=>{s=!1,f=!1;const at=v?d:c;if(v?c:d)at||Vt(k._readableStreamController,it);else {let ui;try{ui=fo(it);}catch(kn){K(k._readableStreamController,kn),K(Y._readableStreamController,kn),P(ie(e,kn));return}at||Vt(k._readableStreamController,it),Nt(Y._readableStreamController,ui);}r=!1,s?Te():f&&x();});},_closeSteps:it=>{r=!1;const at=v?d:c,fr=v?c:d;at||gt(k._readableStreamController),fr||gt(Y._readableStreamController),it!==void 0&&(at||Vt(k._readableStreamController,it),!fr&&Y._readableStreamController._pendingPullIntos.length>0&&Ht(Y._readableStreamController,0)),(!at||!fr)&&P(void 0);},_errorSteps:()=>{r=!1;}});}n(Oe,"pullWithBYOBReader");function Te(){if(r)return s=!0,T(void 0);r=!0;const S=Gr(y._readableStreamController);return S===null?nt():Oe(S._view,!1),T(void 0)}n(Te,"pull1Algorithm");function x(){if(r)return f=!0,T(void 0);r=!0;const S=Gr(C._readableStreamController);return S===null?nt():Oe(S._view,!0),T(void 0)}n(x,"pull2Algorithm");function N(S){if(c=!0,m=S,d){const v=yt([m,R]),k=ie(e,v);P(k);}return B}n(N,"cancel1Algorithm");function J(S){if(d=!0,R=S,c){const v=yt([m,R]),k=ie(e,v);P(k);}return B}n(J,"cancel2Algorithm");function Ce(){}return n(Ce,"startAlgorithm"),y=Go(Ce,Te,N),C=Go(Ce,x,J),ae(t),[y,C]}n(es,"ReadableByteStreamTee");function ts(e){return l(e)&&typeof e.getReader<"u"}n(ts,"isReadableStreamLike");function rs(e){return ts(e)?os(e.getReader()):ns(e)}n(rs,"ReadableStreamFrom");function ns(e){let t;const r=uo(e,"async"),s=u;function f(){let d;try{d=Yi(r);}catch(R){return b(R)}const m=T(d);return F(m,R=>{if(!l(R))throw new TypeError("The promise returned by the iterator.next() method must fulfill with an object");if(Gi(R))$e(t._readableStreamController);else {const C=Zi(R);Ke(t._readableStreamController,C);}})}n(f,"pullAlgorithm");function c(d){const m=r.iterator;let R;try{R=Mt(m,"return");}catch(P){return b(P)}if(R===void 0)return T(void 0);let y;try{y=z(R,m,[d]);}catch(P){return b(P)}const C=T(y);return F(C,P=>{if(!l(P))throw new TypeError("The promise returned by the iterator.return() method must fulfill with an object")})}return n(c,"cancelAlgorithm"),t=Ct(s,f,c,0),t}n(ns,"ReadableStreamFromIterable");function os(e){let t;const r=u;function s(){let c;try{c=e.read();}catch(d){return b(d)}return F(c,d=>{if(!l(d))throw new TypeError("The promise returned by the reader.read() method must fulfill with an object");if(d.done)$e(t._readableStreamController);else {const m=d.value;Ke(t._readableStreamController,m);}})}n(s,"pullAlgorithm");function f(c){try{return T(e.cancel(c))}catch(d){return b(d)}}return n(f,"cancelAlgorithm"),t=Ct(r,s,f,0),t}n(os,"ReadableStreamFromDefaultReader");function is(e,t){ue(e,t);const r=e,s=r?.autoAllocateChunkSize,f=r?.cancel,c=r?.pull,d=r?.start,m=r?.type;return {autoAllocateChunkSize:s===void 0?void 0:Fr(s,`${t} has member 'autoAllocateChunkSize' that`),cancel:f===void 0?void 0:as(f,r,`${t} has member 'cancel' that`),pull:c===void 0?void 0:ss(c,r,`${t} has member 'pull' that`),start:d===void 0?void 0:ls(d,r,`${t} has member 'start' that`),type:m===void 0?void 0:us(m,`${t} has member 'type' that`)}}n(is,"convertUnderlyingDefaultOrByteSource");function as(e,t,r){return Z(e,r),s=>j(e,t,[s])}n(as,"convertUnderlyingSourceCancelCallback");function ss(e,t,r){return Z(e,r),s=>j(e,t,[s])}n(ss,"convertUnderlyingSourcePullCallback");function ls(e,t,r){return Z(e,r),s=>z(e,t,[s])}n(ls,"convertUnderlyingSourceStartCallback");function us(e,t){if(e=`${e}`,e!=="bytes")throw new TypeError(`${t} '${e}' is not a valid enumeration value for ReadableStreamType`);return e}n(us,"convertReadableStreamType");function fs(e,t){return ue(e,t),{preventCancel:!!e?.preventCancel}}n(fs,"convertIteratorOptions");function Yo(e,t){ue(e,t);const r=e?.preventAbort,s=e?.preventCancel,f=e?.preventClose,c=e?.signal;return c!==void 0&&cs(c,`${t} has member 'signal' that`),{preventAbort:!!r,preventCancel:!!s,preventClose:!!f,signal:c}}n(Yo,"convertPipeOptions");function cs(e,t){if(!_a(e))throw new TypeError(`${t} is not an AbortSignal.`)}n(cs,"assertAbortSignal");function ds(e,t){ue(e,t);const r=e?.readable;zr(r,"readable","ReadableWritablePair"),jr(r,`${t} has member 'readable' that`);const s=e?.writable;return zr(s,"writable","ReadableWritablePair"),Bo(s,`${t} has member 'writable' that`),{readable:r,writable:s}}n(ds,"convertReadableWritablePair");const Pn=class Pn{constructor(t={},r={}){t===void 0?t=null:Jn(t,"First parameter");const s=Gt(r,"Second parameter"),f=is(t,"First parameter");if(cn(this),f.type==="bytes"){if(s.size!==void 0)throw new RangeError("The strategy for a byte stream cannot have a size function");const c=St(s,0);aa(this,f,c);}else {const c=Yt(s),d=St(s,1);Ka(this,f,d,c);}}get locked(){if(!We(this))throw De("locked");return qe(this)}cancel(t=void 0){return We(this)?qe(this)?b(new TypeError("Cannot cancel a stream that already has a reader")):ie(this,t):b(De("cancel"))}getReader(t=void 0){if(!We(this))throw De("getReader");return la(t,"First parameter").mode===void 0?Qe(this):Co(this)}pipeThrough(t,r={}){if(!We(this))throw De("pipeThrough");Se(t,1,"pipeThrough");const s=ds(t,"First parameter"),f=Yo(r,"Second parameter");if(qe(this))throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked ReadableStream");if(Ze(s.writable))throw new TypeError("ReadableStream.prototype.pipeThrough cannot be used on a locked WritableStream");const c=Ho(this,s.writable,f.preventClose,f.preventAbort,f.preventCancel,f.signal);return Q(c),s.readable}pipeTo(t,r={}){if(!We(this))return b(De("pipeTo"));if(t===void 0)return b("Parameter 1 is required in 'pipeTo'.");if(!Ge(t))return b(new TypeError("ReadableStream.prototype.pipeTo's first argument must be a WritableStream"));let s;try{s=Yo(r,"Second parameter");}catch(f){return b(f)}return qe(this)?b(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked ReadableStream")):Ze(t)?b(new TypeError("ReadableStream.prototype.pipeTo cannot be used on a locked WritableStream")):Ho(this,t,s.preventClose,s.preventAbort,s.preventCancel,s.signal)}tee(){if(!We(this))throw De("tee");const t=Ja(this);return yt(t)}values(t=void 0){if(!We(this))throw De("values");const r=fs(t,"First parameter");return Vi(this,r.preventCancel)}[Ur](t){return this.values(t)}static from(t){return rs(t)}};n(Pn,"ReadableStream");let L=Pn;Object.defineProperties(L,{from:{enumerable:!0}}),Object.defineProperties(L.prototype,{cancel:{enumerable:!0},getReader:{enumerable:!0},pipeThrough:{enumerable:!0},pipeTo:{enumerable:!0},tee:{enumerable:!0},values:{enumerable:!0},locked:{enumerable:!0}}),h(L.from,"from"),h(L.prototype.cancel,"cancel"),h(L.prototype.getReader,"getReader"),h(L.prototype.pipeThrough,"pipeThrough"),h(L.prototype.pipeTo,"pipeTo"),h(L.prototype.tee,"tee"),h(L.prototype.values,"values"),typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(L.prototype,Symbol.toStringTag,{value:"ReadableStream",configurable:!0}),Object.defineProperty(L.prototype,Ur,{value:L.prototype.values,writable:!0,configurable:!0});function Ct(e,t,r,s=1,f=()=>1){const c=Object.create(L.prototype);cn(c);const d=Object.create(ne.prototype);return Qo(c,d,e,t,r,s,f),c}n(Ct,"CreateReadableStream");function Go(e,t,r){const s=Object.create(L.prototype);cn(s);const f=Object.create(te.prototype);return To(s,f,e,t,r,0,void 0),s}n(Go,"CreateReadableByteStream");function cn(e){e._state="readable",e._reader=void 0,e._storedError=void 0,e._disturbed=!1;}n(cn,"InitializeReadableStream");function We(e){return !l(e)||!Object.prototype.hasOwnProperty.call(e,"_readableStreamController")?!1:e instanceof L}n(We,"IsReadableStream");function qe(e){return e._reader!==void 0}n(qe,"IsReadableStreamLocked");function ie(e,t){if(e._disturbed=!0,e._state==="closed")return T(void 0);if(e._state==="errored")return b(e._storedError);Pt(e);const r=e._reader;if(r!==void 0&&Fe(r)){const f=r._readIntoRequests;r._readIntoRequests=new D,f.forEach(c=>{c._closeSteps(void 0);});}const s=e._readableStreamController[Ar](t);return F(s,u)}n(ie,"ReadableStreamCancel");function Pt(e){e._state="closed";const t=e._reader;if(t!==void 0&&(Zn(t),Ee(t))){const r=t._readRequests;t._readRequests=new D,r.forEach(s=>{s._closeSteps();});}}n(Pt,"ReadableStreamClose");function Zo(e,t){e._state="errored",e._storedError=t;const r=e._reader;r!==void 0&&(Or(r,t),Ee(r)?ro(r,t):Ao(r,t));}n(Zo,"ReadableStreamError");function De(e){return new TypeError(`ReadableStream.prototype.${e} can only be used on a ReadableStream`)}n(De,"streamBrandCheckException$1");function Ko(e,t){ue(e,t);const r=e?.highWaterMark;return zr(r,"highWaterMark","QueuingStrategyInit"),{highWaterMark:Ir(r)}}n(Ko,"convertQueuingStrategyInit");const Jo=n(e=>e.byteLength,"byteLengthSizeFunction");h(Jo,"size");const vn=class vn{constructor(t){Se(t,1,"ByteLengthQueuingStrategy"),t=Ko(t,"First parameter"),this._byteLengthQueuingStrategyHighWaterMark=t.highWaterMark;}get highWaterMark(){if(!ei(this))throw Xo("highWaterMark");return this._byteLengthQueuingStrategyHighWaterMark}get size(){if(!ei(this))throw Xo("size");return Jo}};n(vn,"ByteLengthQueuingStrategy");let Xe=vn;Object.defineProperties(Xe.prototype,{highWaterMark:{enumerable:!0},size:{enumerable:!0}}),typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(Xe.prototype,Symbol.toStringTag,{value:"ByteLengthQueuingStrategy",configurable:!0});function Xo(e){return new TypeError(`ByteLengthQueuingStrategy.prototype.${e} can only be used on a ByteLengthQueuingStrategy`)}n(Xo,"byteLengthBrandCheckException");function ei(e){return !l(e)||!Object.prototype.hasOwnProperty.call(e,"_byteLengthQueuingStrategyHighWaterMark")?!1:e instanceof Xe}n(ei,"IsByteLengthQueuingStrategy");const ti=n(()=>1,"countSizeFunction");h(ti,"size");const En=class En{constructor(t){Se(t,1,"CountQueuingStrategy"),t=Ko(t,"First parameter"),this._countQueuingStrategyHighWaterMark=t.highWaterMark;}get highWaterMark(){if(!ni(this))throw ri("highWaterMark");return this._countQueuingStrategyHighWaterMark}get size(){if(!ni(this))throw ri("size");return ti}};n(En,"CountQueuingStrategy");let et=En;Object.defineProperties(et.prototype,{highWaterMark:{enumerable:!0},size:{enumerable:!0}}),typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(et.prototype,Symbol.toStringTag,{value:"CountQueuingStrategy",configurable:!0});function ri(e){return new TypeError(`CountQueuingStrategy.prototype.${e} can only be used on a CountQueuingStrategy`)}n(ri,"countBrandCheckException");function ni(e){return !l(e)||!Object.prototype.hasOwnProperty.call(e,"_countQueuingStrategyHighWaterMark")?!1:e instanceof et}n(ni,"IsCountQueuingStrategy");function hs(e,t){ue(e,t);const r=e?.cancel,s=e?.flush,f=e?.readableType,c=e?.start,d=e?.transform,m=e?.writableType;return {cancel:r===void 0?void 0:ys(r,e,`${t} has member 'cancel' that`),flush:s===void 0?void 0:ps(s,e,`${t} has member 'flush' that`),readableType:f,start:c===void 0?void 0:bs(c,e,`${t} has member 'start' that`),transform:d===void 0?void 0:ms(d,e,`${t} has member 'transform' that`),writableType:m}}n(hs,"convertTransformer");function ps(e,t,r){return Z(e,r),s=>j(e,t,[s])}n(ps,"convertTransformerFlushCallback");function bs(e,t,r){return Z(e,r),s=>z(e,t,[s])}n(bs,"convertTransformerStartCallback");function ms(e,t,r){return Z(e,r),(s,f)=>j(e,t,[s,f])}n(ms,"convertTransformerTransformCallback");function ys(e,t,r){return Z(e,r),s=>j(e,t,[s])}n(ys,"convertTransformerCancelCallback");const An=class An{constructor(t={},r={},s={}){t===void 0&&(t=null);const f=Gt(r,"Second parameter"),c=Gt(s,"Third parameter"),d=hs(t,"First parameter");if(d.readableType!==void 0)throw new RangeError("Invalid readableType specified");if(d.writableType!==void 0)throw new RangeError("Invalid writableType specified");const m=St(c,0),R=Yt(c),y=St(f,1),C=Yt(f);let P;const B=E(ae=>{P=ae;});gs(this,B,y,C,m,R),Ss(this,d),d.start!==void 0?P(d.start(this._transformStreamController)):P(void 0);}get readable(){if(!oi(this))throw li("readable");return this._readable}get writable(){if(!oi(this))throw li("writable");return this._writable}};n(An,"TransformStream");let tt=An;Object.defineProperties(tt.prototype,{readable:{enumerable:!0},writable:{enumerable:!0}}),typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(tt.prototype,Symbol.toStringTag,{value:"TransformStream",configurable:!0});function gs(e,t,r,s,f,c){function d(){return t}n(d,"startAlgorithm");function m(B){return Ts(e,B)}n(m,"writeAlgorithm");function R(B){return Cs(e,B)}n(R,"abortAlgorithm");function y(){return Ps(e)}n(y,"closeAlgorithm"),e._writable=Ra(d,m,y,R,r,s);function C(){return vs(e)}n(C,"pullAlgorithm");function P(B){return Es(e,B)}n(P,"cancelAlgorithm"),e._readable=Ct(d,C,P,f,c),e._backpressure=void 0,e._backpressureChangePromise=void 0,e._backpressureChangePromise_resolve=void 0,ar(e,!0),e._transformStreamController=void 0;}n(gs,"InitializeTransformStream");function oi(e){return !l(e)||!Object.prototype.hasOwnProperty.call(e,"_transformStreamController")?!1:e instanceof tt}n(oi,"IsTransformStream");function ii(e,t){oe(e._readable._readableStreamController,t),dn(e,t);}n(ii,"TransformStreamError");function dn(e,t){lr(e._transformStreamController),wt(e._writable._writableStreamController,t),hn(e);}n(dn,"TransformStreamErrorWritableAndUnblockWrite");function hn(e){e._backpressure&&ar(e,!1);}n(hn,"TransformStreamUnblockWrite");function ar(e,t){e._backpressureChangePromise!==void 0&&e._backpressureChangePromise_resolve(),e._backpressureChangePromise=E(r=>{e._backpressureChangePromise_resolve=r;}),e._backpressure=t;}n(ar,"TransformStreamSetBackpressure");const Bn=class Bn{constructor(){throw new TypeError("Illegal constructor")}get desiredSize(){if(!sr(this))throw ur("desiredSize");const t=this._controlledTransformStream._readable._readableStreamController;return fn(t)}enqueue(t=void 0){if(!sr(this))throw ur("enqueue");ai(this,t);}error(t=void 0){if(!sr(this))throw ur("error");ws(this,t);}terminate(){if(!sr(this))throw ur("terminate");Rs(this);}};n(Bn,"TransformStreamDefaultController");let pe=Bn;Object.defineProperties(pe.prototype,{enqueue:{enumerable:!0},error:{enumerable:!0},terminate:{enumerable:!0},desiredSize:{enumerable:!0}}),h(pe.prototype.enqueue,"enqueue"),h(pe.prototype.error,"error"),h(pe.prototype.terminate,"terminate"),typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(pe.prototype,Symbol.toStringTag,{value:"TransformStreamDefaultController",configurable:!0});function sr(e){return !l(e)||!Object.prototype.hasOwnProperty.call(e,"_controlledTransformStream")?!1:e instanceof pe}n(sr,"IsTransformStreamDefaultController");function _s(e,t,r,s,f){t._controlledTransformStream=e,e._transformStreamController=t,t._transformAlgorithm=r,t._flushAlgorithm=s,t._cancelAlgorithm=f,t._finishPromise=void 0,t._finishPromise_resolve=void 0,t._finishPromise_reject=void 0;}n(_s,"SetUpTransformStreamDefaultController");function Ss(e,t){const r=Object.create(pe.prototype);let s,f,c;t.transform!==void 0?s=n(d=>t.transform(d,r),"transformAlgorithm"):s=n(d=>{try{return ai(r,d),T(void 0)}catch(m){return b(m)}},"transformAlgorithm"),t.flush!==void 0?f=n(()=>t.flush(r),"flushAlgorithm"):f=n(()=>T(void 0),"flushAlgorithm"),t.cancel!==void 0?c=n(d=>t.cancel(d),"cancelAlgorithm"):c=n(()=>T(void 0),"cancelAlgorithm"),_s(e,r,s,f,c);}n(Ss,"SetUpTransformStreamDefaultControllerFromTransformer");function lr(e){e._transformAlgorithm=void 0,e._flushAlgorithm=void 0,e._cancelAlgorithm=void 0;}n(lr,"TransformStreamDefaultControllerClearAlgorithms");function ai(e,t){const r=e._controlledTransformStream,s=r._readable._readableStreamController;if(!Je(s))throw new TypeError("Readable side is not in a state that permits enqueue");try{Ke(s,t);}catch(c){throw dn(r,c),r._readable._storedError}Za(s)!==r._backpressure&&ar(r,!0);}n(ai,"TransformStreamDefaultControllerEnqueue");function ws(e,t){ii(e._controlledTransformStream,t);}n(ws,"TransformStreamDefaultControllerError");function si(e,t){const r=e._transformAlgorithm(t);return F(r,void 0,s=>{throw ii(e._controlledTransformStream,s),s})}n(si,"TransformStreamDefaultControllerPerformTransform");function Rs(e){const t=e._controlledTransformStream,r=t._readable._readableStreamController;$e(r);const s=new TypeError("TransformStream terminated");dn(t,s);}n(Rs,"TransformStreamDefaultControllerTerminate");function Ts(e,t){const r=e._transformStreamController;if(e._backpressure){const s=e._backpressureChangePromise;return F(s,()=>{const f=e._writable;if(f._state==="erroring")throw f._storedError;return si(r,t)})}return si(r,t)}n(Ts,"TransformStreamDefaultSinkWriteAlgorithm");function Cs(e,t){const r=e._transformStreamController;if(r._finishPromise!==void 0)return r._finishPromise;const s=e._readable;r._finishPromise=E((c,d)=>{r._finishPromise_resolve=c,r._finishPromise_reject=d;});const f=r._cancelAlgorithm(t);return lr(r),_(f,()=>(s._state==="errored"?rt(r,s._storedError):(oe(s._readableStreamController,t),pn(r)),null),c=>(oe(s._readableStreamController,c),rt(r,c),null)),r._finishPromise}n(Cs,"TransformStreamDefaultSinkAbortAlgorithm");function Ps(e){const t=e._transformStreamController;if(t._finishPromise!==void 0)return t._finishPromise;const r=e._readable;t._finishPromise=E((f,c)=>{t._finishPromise_resolve=f,t._finishPromise_reject=c;});const s=t._flushAlgorithm();return lr(t),_(s,()=>(r._state==="errored"?rt(t,r._storedError):($e(r._readableStreamController),pn(t)),null),f=>(oe(r._readableStreamController,f),rt(t,f),null)),t._finishPromise}n(Ps,"TransformStreamDefaultSinkCloseAlgorithm");function vs(e){return ar(e,!1),e._backpressureChangePromise}n(vs,"TransformStreamDefaultSourcePullAlgorithm");function Es(e,t){const r=e._transformStreamController;if(r._finishPromise!==void 0)return r._finishPromise;const s=e._writable;r._finishPromise=E((c,d)=>{r._finishPromise_resolve=c,r._finishPromise_reject=d;});const f=r._cancelAlgorithm(t);return lr(r),_(f,()=>(s._state==="errored"?rt(r,s._storedError):(wt(s._writableStreamController,t),hn(e),pn(r)),null),c=>(wt(s._writableStreamController,c),hn(e),rt(r,c),null)),r._finishPromise}n(Es,"TransformStreamDefaultSourceCancelAlgorithm");function ur(e){return new TypeError(`TransformStreamDefaultController.prototype.${e} can only be used on a TransformStreamDefaultController`)}n(ur,"defaultControllerBrandCheckException");function pn(e){e._finishPromise_resolve!==void 0&&(e._finishPromise_resolve(),e._finishPromise_resolve=void 0,e._finishPromise_reject=void 0);}n(pn,"defaultControllerFinishPromiseResolve");function rt(e,t){e._finishPromise_reject!==void 0&&(Q(e._finishPromise),e._finishPromise_reject(t),e._finishPromise_resolve=void 0,e._finishPromise_reject=void 0);}n(rt,"defaultControllerFinishPromiseReject");function li(e){return new TypeError(`TransformStream.prototype.${e} can only be used on a TransformStream`)}n(li,"streamBrandCheckException"),a.ByteLengthQueuingStrategy=Xe,a.CountQueuingStrategy=et,a.ReadableByteStreamController=te,a.ReadableStream=L,a.ReadableStreamBYOBReader=ce,a.ReadableStreamBYOBRequest=Re,a.ReadableStreamDefaultController=ne,a.ReadableStreamDefaultReader=fe,a.TransformStream=tt,a.TransformStreamDefaultController=pe,a.WritableStream=de,a.WritableStreamDefaultController=ke,a.WritableStreamDefaultWriter=re;});}(pr,pr.exports)),pr.exports}n(Ls,"requirePonyfill_es2018");const $s=65536;if(!globalThis.ReadableStream)try{const i=require("node:process"),{emitWarning:o}=i;try{i.emitWarning=()=>{},Object.assign(globalThis,require("node:stream/web")),i.emitWarning=o;}catch(a){throw i.emitWarning=o,a}}catch{Object.assign(globalThis,Ls());}try{const{Blob:i}=require("buffer");i&&!i.prototype.stream&&(i.prototype.stream=n(function(a){let u=0;const l=this;return new ReadableStream({type:"bytes",async pull(p){const g=await l.slice(u,Math.min(l.size,u+$s)).arrayBuffer();u+=g.byteLength,p.enqueue(new Uint8Array(g)),u===l.size&&p.close();}})},"name"));}catch{}/*! fetch-blob. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */const hi=65536;async function*qn(i,o=!0){for(const a of i)if("stream"in a)yield*a.stream();else if(ArrayBuffer.isView(a))if(o){let u=a.byteOffset;const l=a.byteOffset+a.byteLength;for(;u!==l;){const p=Math.min(l-u,hi),h=a.buffer.slice(u,u+p);u+=h.byteLength,yield new Uint8Array(h);}}else yield a;else {let u=0,l=a;for(;u!==l.size;){const h=await l.slice(u,Math.min(l.size,u+hi)).arrayBuffer();u+=h.byteLength,yield new Uint8Array(h);}}}n(qn,"toIterator");const pi=(Ve=class{constructor(o=[],a={}){be(this,ve,[]);be(this,kt,"");be(this,bt,0);be(this,Cr,"transparent");if(typeof o!="object"||o===null)throw new TypeError("Failed to construct 'Blob': The provided value cannot be converted to a sequence.");if(typeof o[Symbol.iterator]!="function")throw new TypeError("Failed to construct 'Blob': The object must have a callable @@iterator property.");if(typeof a!="object"&&typeof a!="function")throw new TypeError("Failed to construct 'Blob': parameter 2 cannot convert to dictionary.");a===null&&(a={});const u=new TextEncoder;for(const p of o){let h;ArrayBuffer.isView(p)?h=new Uint8Array(p.buffer.slice(p.byteOffset,p.byteOffset+p.byteLength)):p instanceof ArrayBuffer?h=new Uint8Array(p.slice(0)):p instanceof Ve?h=p:h=u.encode(`${p}`),X(this,bt,O(this,bt)+(ArrayBuffer.isView(h)?h.byteLength:h.size)),O(this,ve).push(h);}X(this,Cr,`${a.endings===void 0?"transparent":a.endings}`);const l=a.type===void 0?"":String(a.type);X(this,kt,/^[\x20-\x7E]*$/.test(l)?l:"");}get size(){return O(this,bt)}get type(){return O(this,kt)}async text(){const o=new TextDecoder;let a="";for await(const u of qn(O(this,ve),!1))a+=o.decode(u,{stream:!0});return a+=o.decode(),a}async arrayBuffer(){const o=new Uint8Array(this.size);let a=0;for await(const u of qn(O(this,ve),!1))o.set(u,a),a+=u.length;return o.buffer}stream(){const o=qn(O(this,ve),!0);return new globalThis.ReadableStream({type:"bytes",async pull(a){const u=await o.next();u.done?a.close():a.enqueue(u.value);},async cancel(){await o.return();}})}slice(o=0,a=this.size,u=""){const{size:l}=this;let p=o<0?Math.max(l+o,0):Math.min(o,l),h=a<0?Math.max(l+a,0):Math.min(a,l);const g=Math.max(h-p,0),A=O(this,ve),w=[];let E=0;for(const b of A){if(E>=g)break;const q=ArrayBuffer.isView(b)?b.byteLength:b.size;if(p&&q<=p)p-=q,h-=q;else {let _;ArrayBuffer.isView(b)?(_=b.subarray(p,Math.min(q,h)),E+=_.byteLength):(_=b.slice(p,Math.min(q,h)),E+=_.size),h-=q,w.push(_),p=0;}}const T=new Ve([],{type:String(u).toLowerCase()});return X(T,bt,g),X(T,ve,w),T}get[Symbol.toStringTag](){return "Blob"}static[Symbol.hasInstance](o){return o&&typeof o=="object"&&typeof o.constructor=="function"&&(typeof o.stream=="function"||typeof o.arrayBuffer=="function")&&/^(Blob|File)$/.test(o[Symbol.toStringTag])}},ve=new WeakMap,kt=new WeakMap,bt=new WeakMap,Cr=new WeakMap,n(Ve,"Blob"),Ve);Object.defineProperties(pi.prototype,{size:{enumerable:!0},type:{enumerable:!0},slice:{enumerable:!0}});const Ds=pi,ut=Ds,Ms=(Ot=class extends ut{constructor(a,u,l={}){if(arguments.length<2)throw new TypeError(`Failed to construct 'File': 2 arguments required, but only ${arguments.length} present.`);super(a,l);be(this,Wt,0);be(this,qt,"");l===null&&(l={});const p=l.lastModified===void 0?Date.now():Number(l.lastModified);Number.isNaN(p)||X(this,Wt,p),X(this,qt,String(u));}get name(){return O(this,qt)}get lastModified(){return O(this,Wt)}get[Symbol.toStringTag](){return "File"}static[Symbol.hasInstance](a){return !!a&&a instanceof ut&&/^(File)$/.test(a[Symbol.toStringTag])}},Wt=new WeakMap,qt=new WeakMap,n(Ot,"File"),Ot),Us=Ms,On=Us;/*! formdata-polyfill. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */var{toStringTag:Et,iterator:xs,hasInstance:Ns}=Symbol,bi=Math.random,Hs="append,set,get,getAll,delete,keys,values,entries,forEach,constructor".split(","),mi=n((i,o,a)=>(i+="",/^(Blob|File)$/.test(o&&o[Et])?[(a=a!==void 0?a+"":o[Et]=="File"?o.name:"blob",i),o.name!==a||o[Et]=="blob"?new On([o],a,o):o]:[i,o+""]),"f"),zn=n((i,o)=>(o?i:i.replace(/\r?\n|\r/g,`\r
`)).replace(/\n/g,"%0A").replace(/\r/g,"%0D").replace(/"/g,"%22"),"e$1"),Me=n((i,o,a)=>{if(o.length<a)throw new TypeError(`Failed to execute '${i}' on 'FormData': ${a} arguments required, but only ${o.length} present.`)},"x");const br=(zt=class{constructor(...o){be(this,ee,[]);if(o.length)throw new TypeError("Failed to construct 'FormData': parameter 1 is not of type 'HTMLFormElement'.")}get[Et](){return "FormData"}[xs](){return this.entries()}static[Ns](o){return o&&typeof o=="object"&&o[Et]==="FormData"&&!Hs.some(a=>typeof o[a]!="function")}append(...o){Me("append",arguments,2),O(this,ee).push(mi(...o));}delete(o){Me("delete",arguments,1),o+="",X(this,ee,O(this,ee).filter(([a])=>a!==o));}get(o){Me("get",arguments,1),o+="";for(var a=O(this,ee),u=a.length,l=0;l<u;l++)if(a[l][0]===o)return a[l][1];return null}getAll(o,a){return Me("getAll",arguments,1),a=[],o+="",O(this,ee).forEach(u=>u[0]===o&&a.push(u[1])),a}has(o){return Me("has",arguments,1),o+="",O(this,ee).some(a=>a[0]===o)}forEach(o,a){Me("forEach",arguments,1);for(var[u,l]of this)o.call(a,l,u,this);}set(...o){Me("set",arguments,2);var a=[],u=!0;o=mi(...o),O(this,ee).forEach(l=>{l[0]===o[0]?u&&(u=!a.push(o)):a.push(l);}),u&&a.push(o),X(this,ee,a);}*entries(){yield*O(this,ee);}*keys(){for(var[o]of this)yield o;}*values(){for(var[,o]of this)yield o;}},ee=new WeakMap,n(zt,"FormData"),zt);function Vs(i,o=ut){var a=`${bi()}${bi()}`.replace(/\./g,"").slice(-28).padStart(32,"-"),u=[],l=`--${a}\r
Content-Disposition: form-data; name="`;return i.forEach((p,h)=>typeof p=="string"?u.push(l+zn(h)+`"\r
\r
${p.replace(/\r(?!\n)|(?<!\r)\n/g,`\r
`)}\r
`):u.push(l+zn(h)+`"; filename="${zn(p.name,1)}"\r
Content-Type: ${p.type||"application/octet-stream"}\r
\r
`,p,`\r
`)),u.push(`--${a}--`),new o(u,{type:"multipart/form-data; boundary="+a})}n(Vs,"formDataToBlob");const Un=class Un extends Error{constructor(o,a){super(o),Error.captureStackTrace(this,this.constructor),this.type=a;}get name(){return this.constructor.name}get[Symbol.toStringTag](){return this.constructor.name}};n(Un,"FetchBaseError");let ft=Un;const xn=class xn extends ft{constructor(o,a,u){super(o,a),u&&(this.code=this.errno=u.code,this.erroredSysCall=u.syscall);}};n(xn,"FetchError");let G=xn;const mr=Symbol.toStringTag,yi=n(i=>typeof i=="object"&&typeof i.append=="function"&&typeof i.delete=="function"&&typeof i.get=="function"&&typeof i.getAll=="function"&&typeof i.has=="function"&&typeof i.set=="function"&&typeof i.sort=="function"&&i[mr]==="URLSearchParams","isURLSearchParameters"),yr=n(i=>i&&typeof i=="object"&&typeof i.arrayBuffer=="function"&&typeof i.type=="string"&&typeof i.stream=="function"&&typeof i.constructor=="function"&&/^(Blob|File)$/.test(i[mr]),"isBlob"),Qs=n(i=>typeof i=="object"&&(i[mr]==="AbortSignal"||i[mr]==="EventTarget"),"isAbortSignal"),Ys=n((i,o)=>{const a=new URL(o).hostname,u=new URL(i).hostname;return a===u||a.endsWith(`.${u}`)},"isDomainOrSubdomain"),Gs=n((i,o)=>{const a=new URL(o).protocol,u=new URL(i).protocol;return a===u},"isSameProtocol"),Zs=promisify(me.pipeline),H=Symbol("Body internals"),Nn=class Nn{constructor(o,{size:a=0}={}){let u=null;o===null?o=null:yi(o)?o=Buffer$1.from(o.toString()):yr(o)||Buffer$1.isBuffer(o)||(types.isAnyArrayBuffer(o)?o=Buffer$1.from(o):ArrayBuffer.isView(o)?o=Buffer$1.from(o.buffer,o.byteOffset,o.byteLength):o instanceof me||(o instanceof br?(o=Vs(o),u=o.type.split("=")[1]):o=Buffer$1.from(String(o))));let l=o;Buffer$1.isBuffer(o)?l=me.Readable.from(o):yr(o)&&(l=me.Readable.from(o.stream())),this[H]={body:o,stream:l,boundary:u,disturbed:!1,error:null},this.size=a,o instanceof me&&o.on("error",p=>{const h=p instanceof ft?p:new G(`Invalid response body while trying to fetch ${this.url}: ${p.message}`,"system",p);this[H].error=h;});}get body(){return this[H].stream}get bodyUsed(){return this[H].disturbed}async arrayBuffer(){const{buffer:o,byteOffset:a,byteLength:u}=await In(this);return o.slice(a,a+u)}async formData(){const o=this.headers.get("content-type");if(o.startsWith("application/x-www-form-urlencoded")){const u=new br,l=new URLSearchParams(await this.text());for(const[p,h]of l)u.append(p,h);return u}const{toFormData:a}=await import('./multipart-parser_BrdtzNhF.mjs');return a(this.body,o)}async blob(){const o=this.headers&&this.headers.get("content-type")||this[H].body&&this[H].body.type||"",a=await this.arrayBuffer();return new ut([a],{type:o})}async json(){const o=await this.text();return JSON.parse(o)}async text(){const o=await In(this);return new TextDecoder().decode(o)}buffer(){return In(this)}};n(Nn,"Body");let Ue=Nn;Ue.prototype.buffer=deprecate(Ue.prototype.buffer,"Please use 'response.arrayBuffer()' instead of 'response.buffer()'","node-fetch#buffer"),Object.defineProperties(Ue.prototype,{body:{enumerable:!0},bodyUsed:{enumerable:!0},arrayBuffer:{enumerable:!0},blob:{enumerable:!0},json:{enumerable:!0},text:{enumerable:!0},data:{get:deprecate(()=>{},"data doesn't exist, use json(), text(), arrayBuffer(), or body instead","https://github.com/node-fetch/node-fetch/issues/1000 (response)")}});async function In(i){if(i[H].disturbed)throw new TypeError(`body used already for: ${i.url}`);if(i[H].disturbed=!0,i[H].error)throw i[H].error;const{body:o}=i;if(o===null)return Buffer$1.alloc(0);if(!(o instanceof me))return Buffer$1.alloc(0);const a=[];let u=0;try{for await(const l of o){if(i.size>0&&u+l.length>i.size){const p=new G(`content size at ${i.url} over limit: ${i.size}`,"max-size");throw o.destroy(p),p}u+=l.length,a.push(l);}}catch(l){throw l instanceof ft?l:new G(`Invalid response body while trying to fetch ${i.url}: ${l.message}`,"system",l)}if(o.readableEnded===!0||o._readableState.ended===!0)try{return a.every(l=>typeof l=="string")?Buffer$1.from(a.join("")):Buffer$1.concat(a,u)}catch(l){throw new G(`Could not create Buffer from response body for ${i.url}: ${l.message}`,"system",l)}else throw new G(`Premature close of server response while trying to fetch ${i.url}`)}n(In,"consumeBody");const Fn=n((i,o)=>{let a,u,{body:l}=i[H];if(i.bodyUsed)throw new Error("cannot clone body after it is used");return l instanceof me&&typeof l.getBoundary!="function"&&(a=new PassThrough({highWaterMark:o}),u=new PassThrough({highWaterMark:o}),l.pipe(a),l.pipe(u),i[H].stream=a,l=u),l},"clone"),Ks=deprecate(i=>i.getBoundary(),"form-data doesn't follow the spec and requires special treatment. Use alternative package","https://github.com/node-fetch/node-fetch/issues/1167"),gi=n((i,o)=>i===null?null:typeof i=="string"?"text/plain;charset=UTF-8":yi(i)?"application/x-www-form-urlencoded;charset=UTF-8":yr(i)?i.type||null:Buffer$1.isBuffer(i)||types.isAnyArrayBuffer(i)||ArrayBuffer.isView(i)?null:i instanceof br?`multipart/form-data; boundary=${o[H].boundary}`:i&&typeof i.getBoundary=="function"?`multipart/form-data;boundary=${Ks(i)}`:i instanceof me?null:"text/plain;charset=UTF-8","extractContentType"),Js=n(i=>{const{body:o}=i[H];return o===null?0:yr(o)?o.size:Buffer$1.isBuffer(o)?o.length:o&&typeof o.getLengthSync=="function"&&o.hasKnownLength&&o.hasKnownLength()?o.getLengthSync():null},"getTotalBytes"),Xs=n(async(i,{body:o})=>{o===null?i.end():await Zs(o,i);},"writeToStream"),gr=typeof vt.validateHeaderName=="function"?vt.validateHeaderName:i=>{if(!/^[\^`\-\w!#$%&'*+.|~]+$/.test(i)){const o=new TypeError(`Header name must be a valid HTTP token [${i}]`);throw Object.defineProperty(o,"code",{value:"ERR_INVALID_HTTP_TOKEN"}),o}},jn=typeof vt.validateHeaderValue=="function"?vt.validateHeaderValue:(i,o)=>{if(/[^\t\u0020-\u007E\u0080-\u00FF]/.test(o)){const a=new TypeError(`Invalid character in header content ["${i}"]`);throw Object.defineProperty(a,"code",{value:"ERR_INVALID_CHAR"}),a}},Pr=class Pr extends URLSearchParams{constructor(o){let a=[];if(o instanceof Pr){const u=o.raw();for(const[l,p]of Object.entries(u))a.push(...p.map(h=>[l,h]));}else if(o!=null)if(typeof o=="object"&&!types.isBoxedPrimitive(o)){const u=o[Symbol.iterator];if(u==null)a.push(...Object.entries(o));else {if(typeof u!="function")throw new TypeError("Header pairs must be iterable");a=[...o].map(l=>{if(typeof l!="object"||types.isBoxedPrimitive(l))throw new TypeError("Each header pair must be an iterable object");return [...l]}).map(l=>{if(l.length!==2)throw new TypeError("Each header pair must be a name/value tuple");return [...l]});}}else throw new TypeError("Failed to construct 'Headers': The provided value is not of type '(sequence<sequence<ByteString>> or record<ByteString, ByteString>)");return a=a.length>0?a.map(([u,l])=>(gr(u),jn(u,String(l)),[String(u).toLowerCase(),String(l)])):void 0,super(a),new Proxy(this,{get(u,l,p){switch(l){case"append":case"set":return (h,g)=>(gr(h),jn(h,String(g)),URLSearchParams.prototype[l].call(u,String(h).toLowerCase(),String(g)));case"delete":case"has":case"getAll":return h=>(gr(h),URLSearchParams.prototype[l].call(u,String(h).toLowerCase()));case"keys":return ()=>(u.sort(),new Set(URLSearchParams.prototype.keys.call(u)).keys());default:return Reflect.get(u,l,p)}}})}get[Symbol.toStringTag](){return this.constructor.name}toString(){return Object.prototype.toString.call(this)}get(o){const a=this.getAll(o);if(a.length===0)return null;let u=a.join(", ");return /^content-encoding$/i.test(o)&&(u=u.toLowerCase()),u}forEach(o,a=void 0){for(const u of this.keys())Reflect.apply(o,a,[this.get(u),u,this]);}*values(){for(const o of this.keys())yield this.get(o);}*entries(){for(const o of this.keys())yield [o,this.get(o)];}[Symbol.iterator](){return this.entries()}raw(){return [...this.keys()].reduce((o,a)=>(o[a]=this.getAll(a),o),{})}[Symbol.for("nodejs.util.inspect.custom")](){return [...this.keys()].reduce((o,a)=>{const u=this.getAll(a);return a==="host"?o[a]=u[0]:o[a]=u.length>1?u:u[0],o},{})}};n(Pr,"Headers");let ye=Pr;Object.defineProperties(ye.prototype,["get","entries","forEach","values"].reduce((i,o)=>(i[o]={enumerable:!0},i),{}));function el(i=[]){return new ye(i.reduce((o,a,u,l)=>(u%2===0&&o.push(l.slice(u,u+2)),o),[]).filter(([o,a])=>{try{return gr(o),jn(o,String(a)),!0}catch{return !1}}))}n(el,"fromRawHeaders");const tl=new Set([301,302,303,307,308]),Ln=n(i=>tl.has(i),"isRedirect"),se=Symbol("Response internals"),xe=class xe extends Ue{constructor(o=null,a={}){super(o,a);const u=a.status!=null?a.status:200,l=new ye(a.headers);if(o!==null&&!l.has("Content-Type")){const p=gi(o,this);p&&l.append("Content-Type",p);}this[se]={type:"default",url:a.url,status:u,statusText:a.statusText||"",headers:l,counter:a.counter,highWaterMark:a.highWaterMark};}get type(){return this[se].type}get url(){return this[se].url||""}get status(){return this[se].status}get ok(){return this[se].status>=200&&this[se].status<300}get redirected(){return this[se].counter>0}get statusText(){return this[se].statusText}get headers(){return this[se].headers}get highWaterMark(){return this[se].highWaterMark}clone(){return new xe(Fn(this,this.highWaterMark),{type:this.type,url:this.url,status:this.status,statusText:this.statusText,headers:this.headers,ok:this.ok,redirected:this.redirected,size:this.size,highWaterMark:this.highWaterMark})}static redirect(o,a=302){if(!Ln(a))throw new RangeError('Failed to execute "redirect" on "response": Invalid status code');return new xe(null,{headers:{location:new URL(o).toString()},status:a})}static error(){const o=new xe(null,{status:0,statusText:""});return o[se].type="error",o}static json(o=void 0,a={}){const u=JSON.stringify(o);if(u===void 0)throw new TypeError("data is not JSON serializable");const l=new ye(a&&a.headers);return l.has("content-type")||l.set("content-type","application/json"),new xe(u,{...a,headers:l})}get[Symbol.toStringTag](){return "Response"}};n(xe,"Response");let le=xe;Object.defineProperties(le.prototype,{type:{enumerable:!0},url:{enumerable:!0},status:{enumerable:!0},ok:{enumerable:!0},redirected:{enumerable:!0},statusText:{enumerable:!0},headers:{enumerable:!0},clone:{enumerable:!0}});const rl=n(i=>{if(i.search)return i.search;const o=i.href.length-1,a=i.hash||(i.href[o]==="#"?"#":"");return i.href[o-a.length]==="?"?"?":""},"getSearch");function _i(i,o=!1){return i==null||(i=new URL(i),/^(about|blob|data):$/.test(i.protocol))?"no-referrer":(i.username="",i.password="",i.hash="",o&&(i.pathname="",i.search=""),i)}n(_i,"stripURLForUseAsAReferrer");const Si=new Set(["","no-referrer","no-referrer-when-downgrade","same-origin","origin","strict-origin","origin-when-cross-origin","strict-origin-when-cross-origin","unsafe-url"]),nl="strict-origin-when-cross-origin";function ol(i){if(!Si.has(i))throw new TypeError(`Invalid referrerPolicy: ${i}`);return i}n(ol,"validateReferrerPolicy");function il(i){if(/^(http|ws)s:$/.test(i.protocol))return !0;const o=i.host.replace(/(^\[)|(]$)/g,""),a=isIP(o);return a===4&&/^127\./.test(o)||a===6&&/^(((0+:){7})|(::(0+:){0,6}))0*1$/.test(o)?!0:i.host==="localhost"||i.host.endsWith(".localhost")?!1:i.protocol==="file:"}n(il,"isOriginPotentiallyTrustworthy");function ct(i){return /^about:(blank|srcdoc)$/.test(i)||i.protocol==="data:"||/^(blob|filesystem):$/.test(i.protocol)?!0:il(i)}n(ct,"isUrlPotentiallyTrustworthy");function al(i,{referrerURLCallback:o,referrerOriginCallback:a}={}){if(i.referrer==="no-referrer"||i.referrerPolicy==="")return null;const u=i.referrerPolicy;if(i.referrer==="about:client")return "no-referrer";const l=i.referrer;let p=_i(l),h=_i(l,!0);p.toString().length>4096&&(p=h),o&&(p=o(p)),a&&(h=a(h));const g=new URL(i.url);switch(u){case"no-referrer":return "no-referrer";case"origin":return h;case"unsafe-url":return p;case"strict-origin":return ct(p)&&!ct(g)?"no-referrer":h.toString();case"strict-origin-when-cross-origin":return p.origin===g.origin?p:ct(p)&&!ct(g)?"no-referrer":h;case"same-origin":return p.origin===g.origin?p:"no-referrer";case"origin-when-cross-origin":return p.origin===g.origin?p:h;case"no-referrer-when-downgrade":return ct(p)&&!ct(g)?"no-referrer":p;default:throw new TypeError(`Invalid referrerPolicy: ${u}`)}}n(al,"determineRequestsReferrer");function sl(i){const o=(i.get("referrer-policy")||"").split(/[,\s]+/);let a="";for(const u of o)u&&Si.has(u)&&(a=u);return a}n(sl,"parseReferrerPolicyFromHeader");const $=Symbol("Request internals"),At=n(i=>typeof i=="object"&&typeof i[$]=="object","isRequest"),ll=deprecate(()=>{},".data is not a valid RequestInit property, use .body instead","https://github.com/node-fetch/node-fetch/issues/1000 (request)"),vr=class vr extends Ue{constructor(o,a={}){let u;if(At(o)?u=new URL(o.url):(u=new URL(o),o={}),u.username!==""||u.password!=="")throw new TypeError(`${u} is an url with embedded credentials.`);let l=a.method||o.method||"GET";if(/^(delete|get|head|options|post|put)$/i.test(l)&&(l=l.toUpperCase()),!At(a)&&"data"in a&&ll(),(a.body!=null||At(o)&&o.body!==null)&&(l==="GET"||l==="HEAD"))throw new TypeError("Request with GET/HEAD method cannot have body");const p=a.body?a.body:At(o)&&o.body!==null?Fn(o):null;super(p,{size:a.size||o.size||0});const h=new ye(a.headers||o.headers||{});if(p!==null&&!h.has("Content-Type")){const w=gi(p,this);w&&h.set("Content-Type",w);}let g=At(o)?o.signal:null;if("signal"in a&&(g=a.signal),g!=null&&!Qs(g))throw new TypeError("Expected signal to be an instanceof AbortSignal or EventTarget");let A=a.referrer==null?o.referrer:a.referrer;if(A==="")A="no-referrer";else if(A){const w=new URL(A);A=/^about:(\/\/)?client$/.test(w)?"client":w;}else A=void 0;this[$]={method:l,redirect:a.redirect||o.redirect||"follow",headers:h,parsedURL:u,signal:g,referrer:A},this.follow=a.follow===void 0?o.follow===void 0?20:o.follow:a.follow,this.compress=a.compress===void 0?o.compress===void 0?!0:o.compress:a.compress,this.counter=a.counter||o.counter||0,this.agent=a.agent||o.agent,this.highWaterMark=a.highWaterMark||o.highWaterMark||16384,this.insecureHTTPParser=a.insecureHTTPParser||o.insecureHTTPParser||!1,this.referrerPolicy=a.referrerPolicy||o.referrerPolicy||"";}get method(){return this[$].method}get url(){return format(this[$].parsedURL)}get headers(){return this[$].headers}get redirect(){return this[$].redirect}get signal(){return this[$].signal}get referrer(){if(this[$].referrer==="no-referrer")return "";if(this[$].referrer==="client")return "about:client";if(this[$].referrer)return this[$].referrer.toString()}get referrerPolicy(){return this[$].referrerPolicy}set referrerPolicy(o){this[$].referrerPolicy=ol(o);}clone(){return new vr(this)}get[Symbol.toStringTag](){return "Request"}};n(vr,"Request");let dt=vr;Object.defineProperties(dt.prototype,{method:{enumerable:!0},url:{enumerable:!0},headers:{enumerable:!0},redirect:{enumerable:!0},clone:{enumerable:!0},signal:{enumerable:!0},referrer:{enumerable:!0},referrerPolicy:{enumerable:!0}});const ul=n(i=>{const{parsedURL:o}=i[$],a=new ye(i[$].headers);a.has("Accept")||a.set("Accept","*/*");let u=null;if(i.body===null&&/^(post|put)$/i.test(i.method)&&(u="0"),i.body!==null){const g=Js(i);typeof g=="number"&&!Number.isNaN(g)&&(u=String(g));}u&&a.set("Content-Length",u),i.referrerPolicy===""&&(i.referrerPolicy=nl),i.referrer&&i.referrer!=="no-referrer"?i[$].referrer=al(i):i[$].referrer="no-referrer",i[$].referrer instanceof URL&&a.set("Referer",i.referrer),a.has("User-Agent")||a.set("User-Agent","node-fetch"),i.compress&&!a.has("Accept-Encoding")&&a.set("Accept-Encoding","gzip, deflate, br");let{agent:l}=i;typeof l=="function"&&(l=l(o));const p=rl(o),h={path:o.pathname+p,method:i.method,headers:a[Symbol.for("nodejs.util.inspect.custom")](),insecureHTTPParser:i.insecureHTTPParser,agent:l};return {parsedURL:o,options:h}},"getNodeRequestOptions"),Hn=class Hn extends ft{constructor(o,a="aborted"){super(o,a);}};n(Hn,"AbortError");let _r=Hn;/*! node-domexception. MIT License. Jimmy Wärting <https://jimmy.warting.se/opensource> */if(!globalThis.DOMException)try{const{MessageChannel:i}=require("worker_threads"),o=new i().port1,a=new ArrayBuffer;o.postMessage(a,[a,a]);}catch(i){i.constructor.name==="DOMException"&&(globalThis.DOMException=i.constructor);}var fl=globalThis.DOMException;const cl=f$1(fl),{stat:$n}=promises;n((i,o)=>wi(statSync(i),i,o),"blobFromSync");n((i,o)=>$n(i).then(a=>wi(a,i,o)),"blobFrom");n((i,o)=>$n(i).then(a=>Ri(a,i,o)),"fileFrom");n((i,o)=>Ri(statSync(i),i,o),"fileFromSync");const wi=n((i,o,a="")=>new ut([new Sr({path:o,size:i.size,lastModified:i.mtimeMs,start:0})],{type:a}),"fromBlob"),Ri=n((i,o,a="")=>new On([new Sr({path:o,size:i.size,lastModified:i.mtimeMs,start:0})],basename(o),{type:a,lastModified:i.mtimeMs}),"fromFile"),Er=class Er{constructor(o){be(this,Ne,void 0);be(this,He,void 0);X(this,Ne,o.path),X(this,He,o.start),this.size=o.size,this.lastModified=o.lastModified;}slice(o,a){return new Er({path:O(this,Ne),lastModified:this.lastModified,size:a-o,start:O(this,He)+o})}async*stream(){const{mtimeMs:o}=await $n(O(this,Ne));if(o>this.lastModified)throw new cl("The requested file could not be read, typically due to permission problems that have occurred after a reference to a file was acquired.","NotReadableError");yield*createReadStream(O(this,Ne),{start:O(this,He),end:O(this,He)+this.size-1});}get[Symbol.toStringTag](){return "Blob"}};Ne=new WeakMap,He=new WeakMap,n(Er,"BlobDataItem");let Sr=Er;const ml=new Set(["data:","http:","https:"]);async function Ti(i,o){return new Promise((a,u)=>{const l=new dt(i,o),{parsedURL:p,options:h}=ul(l);if(!ml.has(p.protocol))throw new TypeError(`node-fetch cannot load ${i}. URL scheme "${p.protocol.replace(/:$/,"")}" is not supported.`);if(p.protocol==="data:"){const _=js(l.url),V=new le(_,{headers:{"Content-Type":_.typeFull}});a(V);return}const g=(p.protocol==="https:"?Bs:vt).request,{signal:A}=l;let w=null;const E=n(()=>{const _=new _r("The operation was aborted.");u(_),l.body&&l.body instanceof me.Readable&&l.body.destroy(_),!(!w||!w.body)&&w.body.emit("error",_);},"abort");if(A&&A.aborted){E();return}const T=n(()=>{E(),q();},"abortAndFinalize"),b=g(p.toString(),h);A&&A.addEventListener("abort",T);const q=n(()=>{b.abort(),A&&A.removeEventListener("abort",T);},"finalize");b.on("error",_=>{u(new G(`request to ${l.url} failed, reason: ${_.message}`,"system",_)),q();}),yl(b,_=>{w&&w.body&&w.body.destroy(_);}),process.version<"v14"&&b.on("socket",_=>{let V;_.prependListener("end",()=>{V=_._eventsCount;}),_.prependListener("close",I=>{if(w&&V<_._eventsCount&&!I){const F=new Error("Premature close");F.code="ERR_STREAM_PREMATURE_CLOSE",w.body.emit("error",F);}});}),b.on("response",_=>{b.setTimeout(0);const V=el(_.rawHeaders);if(Ln(_.statusCode)){const z=V.get("Location");let j=null;try{j=z===null?null:new URL(z,l.url);}catch{if(l.redirect!=="manual"){u(new G(`uri requested responds with an invalid redirect URL: ${z}`,"invalid-redirect")),q();return}}switch(l.redirect){case"error":u(new G(`uri requested responds with a redirect, redirect mode is set to error: ${l.url}`,"no-redirect")),q();return;case"manual":break;case"follow":{if(j===null)break;if(l.counter>=l.follow){u(new G(`maximum redirect reached at: ${l.url}`,"max-redirect")),q();return}const U={headers:new ye(l.headers),follow:l.follow,counter:l.counter+1,agent:l.agent,compress:l.compress,method:l.method,body:Fn(l),signal:l.signal,size:l.size,referrer:l.referrer,referrerPolicy:l.referrerPolicy};if(!Ys(l.url,j)||!Gs(l.url,j))for(const Ft of ["authorization","www-authenticate","cookie","cookie2"])U.headers.delete(Ft);if(_.statusCode!==303&&l.body&&o.body instanceof me.Readable){u(new G("Cannot follow redirect with body being a readable stream","unsupported-redirect")),q();return}(_.statusCode===303||(_.statusCode===301||_.statusCode===302)&&l.method==="POST")&&(U.method="GET",U.body=void 0,U.headers.delete("content-length"));const D=sl(V);D&&(U.referrerPolicy=D),a(Ti(new dt(j,U))),q();return}default:return u(new TypeError(`Redirect option '${l.redirect}' is not a valid value of RequestRedirect`))}}A&&_.once("end",()=>{A.removeEventListener("abort",T);});let I=pipeline(_,new PassThrough,z=>{z&&u(z);});process.version<"v12.10"&&_.on("aborted",T);const F={url:l.url,status:_.statusCode,statusText:_.statusMessage,headers:V,size:l.size,counter:l.counter,highWaterMark:l.highWaterMark},Q=V.get("Content-Encoding");if(!l.compress||l.method==="HEAD"||Q===null||_.statusCode===204||_.statusCode===304){w=new le(I,F),a(w);return}const ge={flush:st.Z_SYNC_FLUSH,finishFlush:st.Z_SYNC_FLUSH};if(Q==="gzip"||Q==="x-gzip"){I=pipeline(I,st.createGunzip(ge),z=>{z&&u(z);}),w=new le(I,F),a(w);return}if(Q==="deflate"||Q==="x-deflate"){const z=pipeline(_,new PassThrough,j=>{j&&u(j);});z.once("data",j=>{(j[0]&15)===8?I=pipeline(I,st.createInflate(),U=>{U&&u(U);}):I=pipeline(I,st.createInflateRaw(),U=>{U&&u(U);}),w=new le(I,F),a(w);}),z.once("end",()=>{w||(w=new le(I,F),a(w));});return}if(Q==="br"){I=pipeline(I,st.createBrotliDecompress(),z=>{z&&u(z);}),w=new le(I,F),a(w);return}w=new le(I,F),a(w);}),Xs(b,l).catch(u);})}n(Ti,"fetch$1");function yl(i,o){const a=Buffer$1.from(`0\r
\r
`);let u=!1,l=!1,p;i.on("response",h=>{const{headers:g}=h;u=g["transfer-encoding"]==="chunked"&&!g["content-length"];}),i.on("socket",h=>{const g=n(()=>{if(u&&!l){const w=new Error("Premature close");w.code="ERR_STREAM_PREMATURE_CLOSE",o(w);}},"onSocketClose"),A=n(w=>{l=Buffer$1.compare(w.slice(-5),a)===0,!l&&p&&(l=Buffer$1.compare(p.slice(-3),a.slice(0,3))===0&&Buffer$1.compare(w.slice(-2),a.slice(3))===0),p=w;},"onData");h.prependListener("close",g),h.on("data",A),i.on("close",()=>{h.removeListener("close",g),h.removeListener("data",A);});});}n(yl,"fixResponseChunkedTransferBadEnding");const Ci=new WeakMap,Dn=new WeakMap;function W(i){const o=Ci.get(i);return console.assert(o!=null,"'this' is expected an Event object, but got",i),o}n(W,"pd");function Pi(i){if(i.passiveListener!=null){typeof console<"u"&&typeof console.error=="function"&&console.error("Unable to preventDefault inside passive event listener invocation.",i.passiveListener);return}i.event.cancelable&&(i.canceled=!0,typeof i.event.preventDefault=="function"&&i.event.preventDefault());}n(Pi,"setCancelFlag");function ht(i,o){Ci.set(this,{eventTarget:i,event:o,eventPhase:2,currentTarget:i,canceled:!1,stopped:!1,immediateStopped:!1,passiveListener:null,timeStamp:o.timeStamp||Date.now()}),Object.defineProperty(this,"isTrusted",{value:!1,enumerable:!0});const a=Object.keys(o);for(let u=0;u<a.length;++u){const l=a[u];l in this||Object.defineProperty(this,l,vi(l));}}n(ht,"Event"),ht.prototype={get type(){return W(this).event.type},get target(){return W(this).eventTarget},get currentTarget(){return W(this).currentTarget},composedPath(){const i=W(this).currentTarget;return i==null?[]:[i]},get NONE(){return 0},get CAPTURING_PHASE(){return 1},get AT_TARGET(){return 2},get BUBBLING_PHASE(){return 3},get eventPhase(){return W(this).eventPhase},stopPropagation(){const i=W(this);i.stopped=!0,typeof i.event.stopPropagation=="function"&&i.event.stopPropagation();},stopImmediatePropagation(){const i=W(this);i.stopped=!0,i.immediateStopped=!0,typeof i.event.stopImmediatePropagation=="function"&&i.event.stopImmediatePropagation();},get bubbles(){return !!W(this).event.bubbles},get cancelable(){return !!W(this).event.cancelable},preventDefault(){Pi(W(this));},get defaultPrevented(){return W(this).canceled},get composed(){return !!W(this).event.composed},get timeStamp(){return W(this).timeStamp},get srcElement(){return W(this).eventTarget},get cancelBubble(){return W(this).stopped},set cancelBubble(i){if(!i)return;const o=W(this);o.stopped=!0,typeof o.event.cancelBubble=="boolean"&&(o.event.cancelBubble=!0);},get returnValue(){return !W(this).canceled},set returnValue(i){i||Pi(W(this));},initEvent(){}},Object.defineProperty(ht.prototype,"constructor",{value:ht,configurable:!0,writable:!0}),typeof window<"u"&&typeof window.Event<"u"&&(Object.setPrototypeOf(ht.prototype,window.Event.prototype),Dn.set(window.Event.prototype,ht));function vi(i){return {get(){return W(this).event[i]},set(o){W(this).event[i]=o;},configurable:!0,enumerable:!0}}n(vi,"defineRedirectDescriptor");function gl(i){return {value(){const o=W(this).event;return o[i].apply(o,arguments)},configurable:!0,enumerable:!0}}n(gl,"defineCallDescriptor");function _l(i,o){const a=Object.keys(o);if(a.length===0)return i;function u(l,p){i.call(this,l,p);}n(u,"CustomEvent"),u.prototype=Object.create(i.prototype,{constructor:{value:u,configurable:!0,writable:!0}});for(let l=0;l<a.length;++l){const p=a[l];if(!(p in i.prototype)){const g=typeof Object.getOwnPropertyDescriptor(o,p).value=="function";Object.defineProperty(u.prototype,p,g?gl(p):vi(p));}}return u}n(_l,"defineWrapper");function Ei(i){if(i==null||i===Object.prototype)return ht;let o=Dn.get(i);return o==null&&(o=_l(Ei(Object.getPrototypeOf(i)),i),Dn.set(i,o)),o}n(Ei,"getWrapper");function Sl(i,o){const a=Ei(Object.getPrototypeOf(o));return new a(i,o)}n(Sl,"wrapEvent");function wl(i){return W(i).immediateStopped}n(wl,"isStopped");function Rl(i,o){W(i).eventPhase=o;}n(Rl,"setEventPhase");function Tl(i,o){W(i).currentTarget=o;}n(Tl,"setCurrentTarget");function Ai(i,o){W(i).passiveListener=o;}n(Ai,"setPassiveListener");const Bi=new WeakMap,ki=1,Wi=2,wr=3;function Rr(i){return i!==null&&typeof i=="object"}n(Rr,"isObject");function Bt(i){const o=Bi.get(i);if(o==null)throw new TypeError("'this' is expected an EventTarget object, but got another value.");return o}n(Bt,"getListeners");function Cl(i){return {get(){let a=Bt(this).get(i);for(;a!=null;){if(a.listenerType===wr)return a.listener;a=a.next;}return null},set(o){typeof o!="function"&&!Rr(o)&&(o=null);const a=Bt(this);let u=null,l=a.get(i);for(;l!=null;)l.listenerType===wr?u!==null?u.next=l.next:l.next!==null?a.set(i,l.next):a.delete(i):u=l,l=l.next;if(o!==null){const p={listener:o,listenerType:wr,passive:!1,once:!1,next:null};u===null?a.set(i,p):u.next=p;}},configurable:!0,enumerable:!0}}n(Cl,"defineEventAttributeDescriptor");function qi(i,o){Object.defineProperty(i,`on${o}`,Cl(o));}n(qi,"defineEventAttribute");function Oi(i){function o(){Pe.call(this);}n(o,"CustomEventTarget"),o.prototype=Object.create(Pe.prototype,{constructor:{value:o,configurable:!0,writable:!0}});for(let a=0;a<i.length;++a)qi(o.prototype,i[a]);return o}n(Oi,"defineCustomEventTarget");function Pe(){if(this instanceof Pe){Bi.set(this,new Map);return}if(arguments.length===1&&Array.isArray(arguments[0]))return Oi(arguments[0]);if(arguments.length>0){const i=new Array(arguments.length);for(let o=0;o<arguments.length;++o)i[o]=arguments[o];return Oi(i)}throw new TypeError("Cannot call a class as a function")}n(Pe,"EventTarget"),Pe.prototype={addEventListener(i,o,a){if(o==null)return;if(typeof o!="function"&&!Rr(o))throw new TypeError("'listener' should be a function or an object.");const u=Bt(this),l=Rr(a),h=(l?!!a.capture:!!a)?ki:Wi,g={listener:o,listenerType:h,passive:l&&!!a.passive,once:l&&!!a.once,next:null};let A=u.get(i);if(A===void 0){u.set(i,g);return}let w=null;for(;A!=null;){if(A.listener===o&&A.listenerType===h)return;w=A,A=A.next;}w.next=g;},removeEventListener(i,o,a){if(o==null)return;const u=Bt(this),p=(Rr(a)?!!a.capture:!!a)?ki:Wi;let h=null,g=u.get(i);for(;g!=null;){if(g.listener===o&&g.listenerType===p){h!==null?h.next=g.next:g.next!==null?u.set(i,g.next):u.delete(i);return}h=g,g=g.next;}},dispatchEvent(i){if(i==null||typeof i.type!="string")throw new TypeError('"event.type" should be a string.');const o=Bt(this),a=i.type;let u=o.get(a);if(u==null)return !0;const l=Sl(this,i);let p=null;for(;u!=null;){if(u.once?p!==null?p.next=u.next:u.next!==null?o.set(a,u.next):o.delete(a):p=u,Ai(l,u.passive?u.listener:null),typeof u.listener=="function")try{u.listener.call(this,l);}catch(h){typeof console<"u"&&typeof console.error=="function"&&console.error(h);}else u.listenerType!==wr&&typeof u.listener.handleEvent=="function"&&u.listener.handleEvent(l);if(wl(l))break;u=u.next;}return Ai(l,null),Rl(l,0),Tl(l,null),!l.defaultPrevented}},Object.defineProperty(Pe.prototype,"constructor",{value:Pe,configurable:!0,writable:!0}),typeof window<"u"&&typeof window.EventTarget<"u"&&Object.setPrototypeOf(Pe.prototype,window.EventTarget.prototype);const Vn=class Vn extends Pe{constructor(){throw super(),new TypeError("AbortSignal cannot be constructed directly")}get aborted(){const o=Tr.get(this);if(typeof o!="boolean")throw new TypeError(`Expected 'this' to be an 'AbortSignal' object, but got ${this===null?"null":typeof this}`);return o}};n(Vn,"AbortSignal");let pt=Vn;qi(pt.prototype,"abort");function Pl(){const i=Object.create(pt.prototype);return Pe.call(i),Tr.set(i,!1),i}n(Pl,"createAbortSignal");function vl(i){Tr.get(i)===!1&&(Tr.set(i,!0),i.dispatchEvent({type:"abort"}));}n(vl,"abortSignal");const Tr=new WeakMap;Object.defineProperties(pt.prototype,{aborted:{enumerable:!0}}),typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(pt.prototype,Symbol.toStringTag,{configurable:!0,value:"AbortSignal"});let Mn=(It=class{constructor(){zi.set(this,Pl());}get signal(){return Ii(this)}abort(){vl(Ii(this));}},n(It,"AbortController"),It);const zi=new WeakMap;function Ii(i){const o=zi.get(i);if(o==null)throw new TypeError(`Expected 'this' to be an 'AbortController' object, but got ${i===null?"null":typeof i}`);return o}n(Ii,"getSignal"),Object.defineProperties(Mn.prototype,{signal:{enumerable:!0},abort:{enumerable:!0}}),typeof Symbol=="function"&&typeof Symbol.toStringTag=="symbol"&&Object.defineProperty(Mn.prototype,Symbol.toStringTag,{configurable:!0,value:"AbortController"});var El=Object.defineProperty,Al=n((i,o)=>El(i,"name",{value:o,configurable:!0}),"e");const Fi=Ti;ji();function ji(){!globalThis.process?.versions?.node&&!globalThis.process?.env.DISABLE_NODE_FETCH_NATIVE_WARN&&console.warn("[node-fetch-native] Node.js compatible build of `node-fetch-native` is being used in a non-Node.js environment. Please make sure you are using proper export conditions or report this issue to https://github.com/unjs/node-fetch-native. You can set `process.env.DISABLE_NODE_FETCH_NATIVE_WARN` to disable this warning.");}n(ji,"s"),Al(ji,"checkNodeEnvironment");

var a=Object.defineProperty;var t=(e,r)=>a(e,"name",{value:r,configurable:!0});var f=Object.defineProperty,g=t((e,r)=>f(e,"name",{value:r,configurable:!0}),"e");const o=!!globalThis.process?.env?.FORCE_NODE_FETCH;function l(){return !o&&globalThis.fetch?globalThis.fetch:Fi}t(l,"p"),g(l,"_getFetch");const s=l(),d=!o&&globalThis.Headers||ye,A=!o&&globalThis.AbortController||Mn;

const suspectProtoRx = /"(?:_|\\u0{2}5[Ff]){2}(?:p|\\u0{2}70)(?:r|\\u0{2}72)(?:o|\\u0{2}6[Ff])(?:t|\\u0{2}74)(?:o|\\u0{2}6[Ff])(?:_|\\u0{2}5[Ff]){2}"\s*:/;
const suspectConstructorRx = /"(?:c|\\u0063)(?:o|\\u006[Ff])(?:n|\\u006[Ee])(?:s|\\u0073)(?:t|\\u0074)(?:r|\\u0072)(?:u|\\u0075)(?:c|\\u0063)(?:t|\\u0074)(?:o|\\u006[Ff])(?:r|\\u0072)"\s*:/;
const JsonSigRx = /^\s*["[{]|^\s*-?\d{1,16}(\.\d{1,17})?([Ee][+-]?\d+)?\s*$/;
function jsonParseTransform(key, value) {
  if (key === "__proto__" || key === "constructor" && value && typeof value === "object" && "prototype" in value) {
    warnKeyDropped(key);
    return;
  }
  return value;
}
function warnKeyDropped(key) {
  console.warn(`[destr] Dropping "${key}" key to prevent prototype pollution.`);
}
function destr(value, options = {}) {
  if (typeof value !== "string") {
    return value;
  }
  const _value = value.trim();
  if (
    // eslint-disable-next-line unicorn/prefer-at
    value[0] === '"' && value.endsWith('"') && !value.includes("\\")
  ) {
    return _value.slice(1, -1);
  }
  if (_value.length <= 9) {
    const _lval = _value.toLowerCase();
    if (_lval === "true") {
      return true;
    }
    if (_lval === "false") {
      return false;
    }
    if (_lval === "undefined") {
      return void 0;
    }
    if (_lval === "null") {
      return null;
    }
    if (_lval === "nan") {
      return Number.NaN;
    }
    if (_lval === "infinity") {
      return Number.POSITIVE_INFINITY;
    }
    if (_lval === "-infinity") {
      return Number.NEGATIVE_INFINITY;
    }
  }
  if (!JsonSigRx.test(value)) {
    if (options.strict) {
      throw new SyntaxError("[destr] Invalid JSON");
    }
    return value;
  }
  try {
    if (suspectProtoRx.test(value) || suspectConstructorRx.test(value)) {
      if (options.strict) {
        throw new Error("[destr] Possible prototype pollution");
      }
      return JSON.parse(value, jsonParseTransform);
    }
    return JSON.parse(value);
  } catch (error) {
    if (options.strict) {
      throw error;
    }
    return value;
  }
}

const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const PLUS_RE = /\+/g;
const ENC_CARET_RE = /%5e/gi;
const ENC_BACKTICK_RE = /%60/gi;
const ENC_PIPE_RE = /%7c/gi;
const ENC_SPACE_RE = /%20/gi;
function encode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|");
}
function encodeQueryValue(input) {
  return encode(typeof input === "string" ? input : JSON.stringify(input)).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CARET_RE, "^").replace(SLASH_RE, "%2F");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function decode(text = "") {
  try {
    return decodeURIComponent("" + text);
  } catch {
    return "" + text;
  }
}
function decodeQueryKey(text) {
  return decode(text.replace(PLUS_RE, " "));
}
function decodeQueryValue(text) {
  return decode(text.replace(PLUS_RE, " "));
}

function parseQuery(parametersString = "") {
  const object = {};
  if (parametersString[0] === "?") {
    parametersString = parametersString.slice(1);
  }
  for (const parameter of parametersString.split("&")) {
    const s = parameter.match(/([^=]+)=?(.*)/) || [];
    if (s.length < 2) {
      continue;
    }
    const key = decodeQueryKey(s[1]);
    if (key === "__proto__" || key === "constructor") {
      continue;
    }
    const value = decodeQueryValue(s[2] || "");
    if (object[key] === void 0) {
      object[key] = value;
    } else if (Array.isArray(object[key])) {
      object[key].push(value);
    } else {
      object[key] = [object[key], value];
    }
  }
  return object;
}
function encodeQueryItem(key, value) {
  if (typeof value === "number" || typeof value === "boolean") {
    value = String(value);
  }
  if (!value) {
    return encodeQueryKey(key);
  }
  if (Array.isArray(value)) {
    return value.map((_value) => `${encodeQueryKey(key)}=${encodeQueryValue(_value)}`).join("&");
  }
  return `${encodeQueryKey(key)}=${encodeQueryValue(value)}`;
}
function stringifyQuery(query) {
  return Object.keys(query).filter((k) => query[k] !== void 0).map((k) => encodeQueryItem(k, query[k])).filter(Boolean).join("&");
}

const PROTOCOL_STRICT_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{1,2})/;
const PROTOCOL_REGEX = /^[\s\w\0+.-]{2,}:([/\\]{2})?/;
const PROTOCOL_RELATIVE_REGEX = /^([/\\]\s*){2,}[^/\\]/;
const JOIN_LEADING_SLASH_RE = /^\.?\//;
function hasProtocol(inputString, opts = {}) {
  if (typeof opts === "boolean") {
    opts = { acceptRelative: opts };
  }
  if (opts.strict) {
    return PROTOCOL_STRICT_REGEX.test(inputString);
  }
  return PROTOCOL_REGEX.test(inputString) || (opts.acceptRelative ? PROTOCOL_RELATIVE_REGEX.test(inputString) : false);
}
function hasTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/");
  }
}
function withoutTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return (hasTrailingSlash(input) ? input.slice(0, -1) : input) || "/";
  }
}
function withTrailingSlash(input = "", respectQueryAndFragment) {
  {
    return input.endsWith("/") ? input : input + "/";
  }
}
function withBase(input, base) {
  if (isEmptyURL(base) || hasProtocol(input)) {
    return input;
  }
  const _base = withoutTrailingSlash(base);
  if (input.startsWith(_base)) {
    return input;
  }
  return joinURL(_base, input);
}
function withQuery(input, query) {
  const parsed = parseURL(input);
  const mergedQuery = { ...parseQuery(parsed.search), ...query };
  parsed.search = stringifyQuery(mergedQuery);
  return stringifyParsedURL(parsed);
}
function isEmptyURL(url) {
  return !url || url === "/";
}
function isNonEmptyURL(url) {
  return url && url !== "/";
}
function joinURL(base, ...input) {
  let url = base || "";
  for (const segment of input.filter((url2) => isNonEmptyURL(url2))) {
    if (url) {
      const _segment = segment.replace(JOIN_LEADING_SLASH_RE, "");
      url = withTrailingSlash(url) + _segment;
    } else {
      url = segment;
    }
  }
  return url;
}

const protocolRelative = Symbol.for("ufo:protocolRelative");
function parseURL(input = "", defaultProto) {
  const _specialProtoMatch = input.match(
    /^[\s\0]*(blob:|data:|javascript:|vbscript:)(.*)/i
  );
  if (_specialProtoMatch) {
    const [, _proto, _pathname = ""] = _specialProtoMatch;
    return {
      protocol: _proto.toLowerCase(),
      pathname: _pathname,
      href: _proto + _pathname,
      auth: "",
      host: "",
      search: "",
      hash: ""
    };
  }
  if (!hasProtocol(input, { acceptRelative: true })) {
    return parsePath(input);
  }
  const [, protocol = "", auth, hostAndPath = ""] = input.replace(/\\/g, "/").match(/^[\s\0]*([\w+.-]{2,}:)?\/\/([^/@]+@)?(.*)/) || [];
  let [, host = "", path = ""] = hostAndPath.match(/([^#/?]*)(.*)?/) || [];
  if (protocol === "file:") {
    path = path.replace(/\/(?=[A-Za-z]:)/, "");
  }
  const { pathname, search, hash } = parsePath(path);
  return {
    protocol: protocol.toLowerCase(),
    auth: auth ? auth.slice(0, Math.max(0, auth.length - 1)) : "",
    host,
    pathname,
    search,
    hash,
    [protocolRelative]: !protocol
  };
}
function parsePath(input = "") {
  const [pathname = "", search = "", hash = ""] = (input.match(/([^#?]*)(\?[^#]*)?(#.*)?/) || []).splice(1);
  return {
    pathname,
    search,
    hash
  };
}
function stringifyParsedURL(parsed) {
  const pathname = parsed.pathname || "";
  const search = parsed.search ? (parsed.search.startsWith("?") ? "" : "?") + parsed.search : "";
  const hash = parsed.hash || "";
  const auth = parsed.auth ? parsed.auth + "@" : "";
  const host = parsed.host || "";
  const proto = parsed.protocol || parsed[protocolRelative] ? (parsed.protocol || "") + "//" : "";
  return proto + auth + host + pathname + search + hash;
}

class FetchError extends Error {
  constructor(message, opts) {
    super(message, opts);
    this.name = "FetchError";
    if (opts?.cause && !this.cause) {
      this.cause = opts.cause;
    }
  }
}
function createFetchError(ctx) {
  const errorMessage = ctx.error?.message || ctx.error?.toString() || "";
  const method = ctx.request?.method || ctx.options?.method || "GET";
  const url = ctx.request?.url || String(ctx.request) || "/";
  const requestStr = `[${method}] ${JSON.stringify(url)}`;
  const statusStr = ctx.response ? `${ctx.response.status} ${ctx.response.statusText}` : "<no response>";
  const message = `${requestStr}: ${statusStr}${errorMessage ? ` ${errorMessage}` : ""}`;
  const fetchError = new FetchError(
    message,
    ctx.error ? { cause: ctx.error } : void 0
  );
  for (const key of ["request", "options", "response"]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx[key];
      }
    });
  }
  for (const [key, refKey] of [
    ["data", "_data"],
    ["status", "status"],
    ["statusCode", "status"],
    ["statusText", "statusText"],
    ["statusMessage", "statusText"]
  ]) {
    Object.defineProperty(fetchError, key, {
      get() {
        return ctx.response && ctx.response[refKey];
      }
    });
  }
  return fetchError;
}

const payloadMethods = new Set(
  Object.freeze(["PATCH", "POST", "PUT", "DELETE"])
);
function isPayloadMethod(method = "GET") {
  return payloadMethods.has(method.toUpperCase());
}
function isJSONSerializable(value) {
  if (value === void 0) {
    return false;
  }
  const t = typeof value;
  if (t === "string" || t === "number" || t === "boolean" || t === null) {
    return true;
  }
  if (t !== "object") {
    return false;
  }
  if (Array.isArray(value)) {
    return true;
  }
  if (value.buffer) {
    return false;
  }
  return value.constructor && value.constructor.name === "Object" || typeof value.toJSON === "function";
}
const textTypes = /* @__PURE__ */ new Set([
  "image/svg",
  "application/xml",
  "application/xhtml",
  "application/html"
]);
const JSON_RE = /^application\/(?:[\w!#$%&*.^`~-]*\+)?json(;.+)?$/i;
function detectResponseType(_contentType = "") {
  if (!_contentType) {
    return "json";
  }
  const contentType = _contentType.split(";").shift() || "";
  if (JSON_RE.test(contentType)) {
    return "json";
  }
  if (textTypes.has(contentType) || contentType.startsWith("text/")) {
    return "text";
  }
  return "blob";
}
function mergeFetchOptions(input, defaults, Headers = globalThis.Headers) {
  const merged = {
    ...defaults,
    ...input
  };
  if (defaults?.params && input?.params) {
    merged.params = {
      ...defaults?.params,
      ...input?.params
    };
  }
  if (defaults?.query && input?.query) {
    merged.query = {
      ...defaults?.query,
      ...input?.query
    };
  }
  if (defaults?.headers && input?.headers) {
    merged.headers = new Headers(defaults?.headers || {});
    for (const [key, value] of new Headers(input?.headers || {})) {
      merged.headers.set(key, value);
    }
  }
  return merged;
}

const retryStatusCodes = /* @__PURE__ */ new Set([
  408,
  // Request Timeout
  409,
  // Conflict
  425,
  // Too Early
  429,
  // Too Many Requests
  500,
  // Internal Server Error
  502,
  // Bad Gateway
  503,
  // Service Unavailable
  504
  //  Gateway Timeout
]);
const nullBodyResponses = /* @__PURE__ */ new Set([101, 204, 205, 304]);
function createFetch(globalOptions = {}) {
  const {
    fetch = globalThis.fetch,
    Headers = globalThis.Headers,
    AbortController = globalThis.AbortController
  } = globalOptions;
  async function onError(context) {
    const isAbort = context.error && context.error.name === "AbortError" && !context.options.timeout || false;
    if (context.options.retry !== false && !isAbort) {
      let retries;
      if (typeof context.options.retry === "number") {
        retries = context.options.retry;
      } else {
        retries = isPayloadMethod(context.options.method) ? 0 : 1;
      }
      const responseCode = context.response && context.response.status || 500;
      if (retries > 0 && (Array.isArray(context.options.retryStatusCodes) ? context.options.retryStatusCodes.includes(responseCode) : retryStatusCodes.has(responseCode))) {
        const retryDelay = context.options.retryDelay || 0;
        if (retryDelay > 0) {
          await new Promise((resolve) => setTimeout(resolve, retryDelay));
        }
        return $fetchRaw(context.request, {
          ...context.options,
          retry: retries - 1,
          timeout: context.options.timeout
        });
      }
    }
    const error = createFetchError(context);
    if (Error.captureStackTrace) {
      Error.captureStackTrace(error, $fetchRaw);
    }
    throw error;
  }
  const $fetchRaw = async function $fetchRaw2(_request, _options = {}) {
    const context = {
      request: _request,
      options: mergeFetchOptions(_options, globalOptions.defaults, Headers),
      response: void 0,
      error: void 0
    };
    context.options.method = context.options.method?.toUpperCase();
    if (context.options.onRequest) {
      await context.options.onRequest(context);
    }
    if (typeof context.request === "string") {
      if (context.options.baseURL) {
        context.request = withBase(context.request, context.options.baseURL);
      }
      if (context.options.query || context.options.params) {
        context.request = withQuery(context.request, {
          ...context.options.params,
          ...context.options.query
        });
      }
    }
    if (context.options.body && isPayloadMethod(context.options.method)) {
      if (isJSONSerializable(context.options.body)) {
        context.options.body = typeof context.options.body === "string" ? context.options.body : JSON.stringify(context.options.body);
        context.options.headers = new Headers(context.options.headers || {});
        if (!context.options.headers.has("content-type")) {
          context.options.headers.set("content-type", "application/json");
        }
        if (!context.options.headers.has("accept")) {
          context.options.headers.set("accept", "application/json");
        }
      } else if (
        // ReadableStream Body
        "pipeTo" in context.options.body && typeof context.options.body.pipeTo === "function" || // Node.js Stream Body
        typeof context.options.body.pipe === "function"
      ) {
        if (!("duplex" in context.options)) {
          context.options.duplex = "half";
        }
      }
    }
    if (!context.options.signal && context.options.timeout) {
      const controller = new AbortController();
      setTimeout(() => controller.abort(), context.options.timeout);
      context.options.signal = controller.signal;
    }
    try {
      context.response = await fetch(
        context.request,
        context.options
      );
    } catch (error) {
      context.error = error;
      if (context.options.onRequestError) {
        await context.options.onRequestError(context);
      }
      return await onError(context);
    }
    const hasBody = context.response.body && !nullBodyResponses.has(context.response.status) && context.options.method !== "HEAD";
    if (hasBody) {
      const responseType = (context.options.parseResponse ? "json" : context.options.responseType) || detectResponseType(context.response.headers.get("content-type") || "");
      switch (responseType) {
        case "json": {
          const data = await context.response.text();
          const parseFunction = context.options.parseResponse || destr;
          context.response._data = parseFunction(data);
          break;
        }
        case "stream": {
          context.response._data = context.response.body;
          break;
        }
        default: {
          context.response._data = await context.response[responseType]();
        }
      }
    }
    if (context.options.onResponse) {
      await context.options.onResponse(context);
    }
    if (!context.options.ignoreResponseError && context.response.status >= 400 && context.response.status < 600) {
      if (context.options.onResponseError) {
        await context.options.onResponseError(context);
      }
      return await onError(context);
    }
    return context.response;
  };
  const $fetch = async function $fetch2(request, options) {
    const r = await $fetchRaw(request, options);
    return r._data;
  };
  $fetch.raw = $fetchRaw;
  $fetch.native = (...args) => fetch(...args);
  $fetch.create = (defaultOptions = {}) => createFetch({
    ...globalOptions,
    defaults: {
      ...globalOptions.defaults,
      ...defaultOptions
    }
  });
  return $fetch;
}

function createNodeFetch() {
  const useKeepAlive = JSON.parse(process.env.FETCH_KEEP_ALIVE || "false");
  if (!useKeepAlive) {
    return s;
  }
  const agentOptions = { keepAlive: true };
  const httpAgent = new vt.Agent(agentOptions);
  const httpsAgent = new Bs.Agent(agentOptions);
  const nodeFetchOptions = {
    agent(parsedURL) {
      return parsedURL.protocol === "http:" ? httpAgent : httpsAgent;
    }
  };
  return function nodeFetchWithKeepAlive(input, init) {
    return s(input, { ...nodeFetchOptions, ...init });
  };
}
const fetch$1 = globalThis.fetch || createNodeFetch();
const Headers = globalThis.Headers || d;
const AbortController$1 = globalThis.AbortController || A;
createFetch({ fetch: fetch$1, Headers, AbortController: AbortController$1 });

/**
 * Detect the format of the image. Returns undefined if the format is not supported.
 */
function getFormat(data) {
    // https://en.wikipedia.org/wiki/List_of_file_signatures
    if (data[0] === 0xff && data[1] === 0xd8) {
        return "jpg";
    }
    if (data[0] === 0x89 && data[1] === 0x50) {
        return "png";
    }
}
/**
 * Decodes JPEG or PNG image data into a raw Uint8Array pixel array.
 */
function decodeImageData(imageData, decoders) {
    const format = getFormat(imageData);
    if (format && format in decoders) {
        return decoders[format](imageData);
    }
    throw new Error("Unsupported format");
}
async function getDataFromUrl(url) {
    const response = await fetch$1(url, {
        headers: { Accept: "image/jpeg,image/png,*/*" },
    });
    const data = await response.arrayBuffer();
    return new Uint8Array(data);
}
/**
 * Gets the raw pixel data from an image source.
 * The source can be a URL, a string containing the URL, a Uint8Array containing the image data,
 * or an ArrayBuffer containing the image data.
 */
async function getPixels$1(source, decoders) {
    if (source instanceof URL || typeof source === "string") {
        const data = await getDataFromUrl(source);
        return decodeImageData(data, decoders);
    }
    else if (source instanceof Uint8Array) {
        return decodeImageData(source, decoders);
    }
    else {
        return decodeImageData(new Uint8Array(source), decoders);
    }
}

const decoders = {
    jpg: (image) => jpegJs.decode(image, { useTArray: true }),
    png: (image) => {
        return new Promise((resolve, reject) => {
            const png = new browserExports.PNG({ filterType: 4 });
            png.parse(Buffer$1.from(image), (err, decoded) => {
                if (err) {
                    reject(err);
                }
                else {
                    const { width, height, data } = decoded;
                    resolve({ width, height, data });
                }
            });
        });
    },
};
/**
 * Gets the raw pixel data from an image source.
 * The source can be a URL, a string containing the URL, a Uint8Array containing the image data,
 * or an ArrayBuffer containing the image data.
 */
const getPixels = (source) => {
    return getPixels$1(source, decoders);
};

const specialBackgrounds = ["blurhash", "dominantColor", "lqip"];
function isValidUrl(url) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
async function getBackground(props) {
  if (props.background === "none") {
    return;
  }
  if (!specialBackgrounds.includes(props.background ?? "")) {
    return props.background;
  }
  let aspectRatio = props.aspectRatio;
  if (!aspectRatio) {
    if (props.width && props.height) {
      aspectRatio = props.height / props.width;
    } else {
      aspectRatio = 1;
    }
  }
  const cdn = getCanonicalCdnForUrl(props.src, props.cdn);
  if (!cdn) {
    return;
  }
  const bgImgProps = {
    ...props,
    url: props.src,
    width: 12,
    height: 12 * aspectRatio,
    cdn: cdn.cdn
  };
  if (!cdn) {
    return;
  }
  if (props.background === "lqip") {
    const lowUrl2 = transformUrl(bgImgProps)?.toString();
    if (!lowUrl2) {
      return;
    }
    if (!isValidUrl(lowUrl2)) {
      return;
    }
    const response = await fetch(lowUrl2, {
      headers: {
        Accept: "image/webp,*/*"
      }
    });
    const contentType = response.headers.get("Content-Type");
    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    return "data:" + contentType + ";base64," + buffer.toString("base64");
  }
  const lowUrl = transformUrl({
    ...bgImgProps,
    width: 100,
    height: 100 * aspectRatio
  })?.toString();
  if (!lowUrl) {
    return;
  }
  if (!isValidUrl(lowUrl)) {
    return;
  }
  const pixels = await getPixels(lowUrl);
  if (!pixels) {
    return;
  }
  const data = Uint8ClampedArray.from(pixels.data);
  const { blurhashToDataUri, rgbColorToCssString, getDominantColor } = await import('./index_BVcfRxua.mjs');
  if (props.background === "blurhash") {
    const { encode } = await import('./index_CkGk45UB.mjs');
    const blurhash = encode(data, pixels.width, pixels.height, 4, 3);
    return blurhashToDataUri(blurhash);
  }
  if (props.background === "dominantColor") {
    return rgbColorToCssString(getDominantColor(data));
  }
}

function getDefaultService() {
  if (env.NETLIFY || env.NETLIFY_LOCAL) {
    return "netlify";
  }
  if (env.VERCEL || env.NOW_BUILDER) {
    return "vercel";
  }
  return "astro";
}

function getDefaultImageCdn(config) {
  if (config?.fallbackService === "squoosh" || config?.fallbackService === "sharp") {
    return "astro";
  }
  return config.fallbackService ?? getDefaultService();
}

const $$Astro$5 = createAstro();
const $$Image = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Image;
  const { placeholder, ...props } = Astro2.props;
  let imgProps;
  if (typeof props.src === "object") {
    imgProps = {
      ...props,
      src: props.src.src,
      ...inferImageDimensions(props, props.src)
    };
  } else {
    imgProps = {
      ...props
    };
  }
  const config = imageConfig.service?.config;
  imgProps.layout ||= config?.layout;
  imgProps.background ||= placeholder ?? config?.placeholder;
  if (!imgProps.cdn) {
    imgProps.cdn = getDefaultImageCdn(config);
  }
  imgProps.background = await getBackground(imgProps);
  return renderTemplate`${maybeRenderHead()}<img${spreadAttributes(transformProps(imgProps))}>`;
}, "D:/Code/Astro/hackaton-cloudinary/node_modules/.pnpm/@unpic+astro@0.0.46_astro@4.15.12_@types+node@22.7.7_rollup@4.24.0_typescript@5.6.2_/node_modules/@unpic/astro/src/Image.astro", void 0);

const $$Astro$4 = createAstro();
const $$Source = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$Source;
  const props = Astro2.props;
  let sourceProps;
  if (typeof props.src === "object") {
    sourceProps = {
      ...props,
      src: props.src.src,
      ...inferImageDimensions(props, props.src)
    };
  } else {
    sourceProps = props;
  }
  const config = imageConfig.service?.config;
  sourceProps.layout ||= config?.layout;
  if (!sourceProps.cdn) {
    sourceProps.cdn = getDefaultImageCdn(config);
  }
  return renderTemplate`${maybeRenderHead()}<source${spreadAttributes(transformSourceProps(sourceProps))}>`;
}, "D:/Code/Astro/hackaton-cloudinary/node_modules/.pnpm/@unpic+astro@0.0.46_astro@4.15.12_@types+node@22.7.7_rollup@4.24.0_typescript@5.6.2_/node_modules/@unpic/astro/src/Source.astro", void 0);

const name = "astro-cloudinary";
const version = "1.1.0";
const type = "module";
const license = "MIT";
const module = "./index.ts";
const keywords = [
	"cloudinary",
	"astro",
	"astro-loader"
];
const exports = {
	".": {
		"import": "./index.ts"
	},
	"./helpers": {
		types: "./dist/helpers/index.d.ts",
		"import": "./dist/helpers/index.js"
	},
	"./loaders": {
		types: "./dist/loaders/index.d.ts",
		"import": "./dist/loaders/index.js"
	},
	"./package.json": "./package.json"
};
const files = [
	"dist",
	"helpers",
	"loaders",
	"src",
	"index.ts"
];
const dependencies = {
	"@cloudinary-util/types": "1.5.7",
	"@cloudinary-util/url-loader": "5.10.2",
	"@cloudinary-util/util": "^3.3.2",
	"@cloudinary/url-gen": "^1.20.0",
	"@unpic/astro": "^0.0.46",
	"@unpic/core": "^0.0.49",
	tsup: "^8.2.4",
	unpic: "^3.18.0"
};
const peerDependencies = {
	astro: "^3.2.0 || ^4.0.0"
};
const devDependencies = {
	astro: "^4.15.6"
};
const scripts = {
	dev: "tsup --watch",
	build: "tsup"
};
const pkg = {
	name: name,
	version: version,
	type: type,
	license: license,
	module: module,
	keywords: keywords,
	exports: exports,
	files: files,
	dependencies: dependencies,
	peerDependencies: peerDependencies,
	devDependencies: devDependencies,
	scripts: scripts
};

const ASTRO_CLOUDINARY_ANALYTICS_PRODUCT_ID = "B";
const ASTRO_CLOUDINARY_ANALYTICS_ID = "G";
const ASTRO_VERSION = normalizeVersion(astroPkg.version);
const ASTRO_CLOUDINARY_VERSION = normalizeVersion(pkg.version);
function normalizeVersion(version) {
  let normalized = version;
  if (normalized.includes("-")) {
    normalized = normalized.split("-")[0];
  }
  return normalized;
}

function getCloudinaryConfig(config) {
  const cloudName = config?.cloud?.cloudName ?? "alhedev-gallery";
  if (!cloudName) {
    throw new Error("A Cloudinary Cloud name is required, please make sure PUBLIC_CLOUDINARY_CLOUD_NAME is set and configured in your environment.");
  }
  const apiKey = config?.cloud?.apiKey ?? "372241328758597";
  const secureDistribution = config?.url?.secureDistribution ?? undefined                                                     ;
  const privateCdn = config?.url?.privateCdn ?? undefined                                             ;
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

function generateImageLoader(props, config) {
  const imageProps = { ...props };
  imageProps.width = typeof imageProps.width === "string" ? Number.parseInt(imageProps.width) : imageProps.width;
  imageProps.height = typeof imageProps.height === "string" ? Number.parseInt(imageProps.height) : imageProps.height;
  return function loader(loaderOptions) {
    const options = {
      ...imageProps,
      src: loaderOptions.url,
      width: loaderOptions.width,
      height: loaderOptions.height
    };
    if (typeof loaderOptions?.width === "number" && typeof options.width === "number" && loaderOptions.width !== options.width) {
      const multiplier = loaderOptions.width / options.width;
      options.width = loaderOptions.width;
      if (typeof options.height === "number") {
        options.height = Math.floor(options.height * multiplier);
      }
    } else if (typeof loaderOptions?.width === "number" && typeof options?.width !== "number") {
      options.width = loaderOptions?.width;
    }
    return getCldImageUrl(options, config);
  };
}

const $$Astro$3 = createAstro();
const $$CldImage = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$CldImage;
  const { config, class: className, ...props } = Astro2.props;
  const CLOUDINARY_PROPS = [
    "assetType",
    "deliveryType",
    "dpr",
    "format",
    "quality",
    "strictTransformations"
    // Excluded props that are managed by the component
    // 'height',
    // 'src',
    // 'width'
  ];
  transformationPlugins.forEach(({ props: props2 }) => {
    Object.keys(props2).forEach((prop) => {
      if (CLOUDINARY_PROPS.includes(prop)) {
        throw new Error(`Option ${prop} already exists!`);
      }
      CLOUDINARY_PROPS.push(prop);
    });
  });
  const cldOptions = {
    height: props.height,
    src: props.src,
    width: props.width
  };
  CLOUDINARY_PROPS.forEach((key) => {
    const prop = props[key];
    if (prop) {
      cldOptions[key] = prop;
    }
  });
  const transformer = generateImageLoader(cldOptions, config);
  const src = transformer({
    url: props.src,
    width: props.width,
    height: props.height
  });
  const imageProps = {
    cdn: "cloudinary",
    height: props.height,
    src,
    width: props.width,
    transformer
  };
  Object.entries(props).filter(([key]) => typeof key === "string" && !CLOUDINARY_PROPS.includes(key)).forEach(([key, value]) => imageProps[key] = value);
  let imageClassName = "astro-cloudinary-cldimage";
  if (className) {
    imageClassName = `${imageClassName} ${className}`;
  }
  return renderTemplate`${renderComponent($$result, "Image", $$Image, { "class": imageClassName, ...imageProps })} `;
}, "D:/Code/Astro/hackaton-cloudinary/node_modules/.pnpm/astro-cloudinary@1.1.0_astro@4.15.12_@types+node@22.7.7_rollup@4.24.0_typescript@5.6.2__jiti@_wpvylkz4kv5xs3xtnh7ftmssbe/node_modules/astro-cloudinary/src/components/CldImage.astro", void 0);

const $$Astro$2 = createAstro();
const $$CldVideoPlayer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CldVideoPlayer;
  const PLAYER_VERSION = "2.1.0";
  const props = Astro2.props;
  const { class: className, config, height, id, width } = props;
  const cloudinaryConfig = getCloudinaryConfig(config);
  const playerOptions = getVideoPlayerOptions(props, cloudinaryConfig);
  const { publicId } = playerOptions;
  if (typeof publicId === "undefined") {
    throw new Error("[CldVideoPlayer] Public ID or Cloudinary URL required - please specify a src prop.");
  }
  let playerId = id || `player-${publicId.replace("/", "-")}`;
  const playerHash = createHash("shake256", { outputLength: 4 }).update(JSON.stringify(playerOptions)).digest("hex");
  let playerClassName = "astro-cloudinary-cldvideoplayer cld-video-player cld-fluid";
  if (className) {
    playerClassName = `${playerClassName} ${className}`;
  }
  return renderTemplate`<link${addAttribute(`https://unpkg.com/cloudinary-video-player@${PLAYER_VERSION}/dist/cld-video-player.min.css`, "href")} rel="stylesheet">${maybeRenderHead()}<div${addAttribute(playerId, "id")}${addAttribute({ width: "100%", aspectRatio: `${width} / ${height}` }, "style")}> <video${addAttribute(`${playerId}-${playerHash}`, "id")}${addAttribute(playerClassName, "class")}${addAttribute(width, "width")}${addAttribute(height, "height")}${addAttribute(JSON.stringify(playerOptions), "data-cldvideoplayer-options")}${addAttribute(playerId, "data-cldvideoplayer-id")}></video> </div> `;
}, "D:/Code/Astro/hackaton-cloudinary/node_modules/.pnpm/astro-cloudinary@1.1.0_astro@4.15.12_@types+node@22.7.7_rollup@4.24.0_typescript@5.6.2__jiti@_wpvylkz4kv5xs3xtnh7ftmssbe/node_modules/astro-cloudinary/src/components/CldVideoPlayer.astro", void 0);

const $$Astro$1 = createAstro();
const $$CldUploadWidget = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CldUploadWidget;
  const { class: className, config, id, options, signatureEndpoint, uploadPreset } = Astro2.props;
  const cloudinaryConfig = getCloudinaryConfig(config);
  const uploadOptions = getUploadWidgetOptions({
    uploadPreset: uploadPreset || undefined                                               ,
    ...options
  }, cloudinaryConfig);
  let playerClassName = "astro-cloudinary-clduploadwidget";
  if (typeof className === "string") {
    playerClassName = `${playerClassName} ${className}`;
  }
  return renderTemplate`${maybeRenderHead()}<span${addAttribute(id, "id")}${addAttribute(playerClassName, "class")}${addAttribute(JSON.stringify(uploadOptions), "data-clduploadwidgetupload-options")}${addAttribute(signatureEndpoint, "data-clduploadwidgetupload-signatureendpoint")}> ${renderSlot($$result, $$slots["default"])} </span> `;
}, "D:/Code/Astro/hackaton-cloudinary/node_modules/.pnpm/astro-cloudinary@1.1.0_astro@4.15.12_@types+node@22.7.7_rollup@4.24.0_typescript@5.6.2__jiti@_wpvylkz4kv5xs3xtnh7ftmssbe/node_modules/astro-cloudinary/src/components/CldUploadWidget.astro", void 0);

const $$Input = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div> <label class="text-xl mr-2" for="name">Character name:</label> <input class="py-3 text-lg text-center rounded-lg ring-2 ring-orange-500 " type="text" name="name" id="name" placeholder="Optional"> ${renderComponent($$result, "CldUploadWidget", $$CldUploadWidget, { "id": "upload-event", "uploadPreset": "hackathon-cloudinary", "signatureEndpoint": "/api/sign-cloudinary", "options": {
    sources: ["local"],
    multiple: true,
    maxFiles: 2,
    detection: "captioning"
  } }, { "default": ($$result2) => renderTemplate` <button class="py-4 px-10 mt-8 bg-orange-600 rounded-md my-5 hover:bg-orange-500 transition duration-200 cursor:pointer text-2x">Upload Image</button> ` })} </div> `;
}, "D:/Code/Astro/hackaton-cloudinary/src/components/Input.astro", void 0);

const $$Astro = createAstro();
const $$Index = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "title": "Welcome to Astro.", "data-astro-cid-j7pv25f6": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section data-astro-cid-j7pv25f6> <p class="max-w-[700px] mb-5" data-astro-cid-j7pv25f6>
Upload an image to generate a halloween story, the image will be used as the main character.
</p> <div class="flex flex-col justify-center md:w-1/3 w-full gap-5" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "Input", $$Input, { "data-astro-cid-j7pv25f6": true })} </div> </section> ` })} `;
}, "D:/Code/Astro/hackaton-cloudinary/src/pages/index.astro", void 0);

const $$file = "D:/Code/Astro/hackaton-cloudinary/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { On as O, br as b, page as p };
