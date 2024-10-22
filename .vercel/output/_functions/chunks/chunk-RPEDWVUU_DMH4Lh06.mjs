const name = "astro";
const version = "4.15.12";
const description = "Astro is a modern site builder with web best practices, performance, and DX front-of-mind.";
const type = "module";
const author = "withastro";
const license = "MIT";
const repository = {
	type: "git",
	url: "https://github.com/withastro/astro.git",
	directory: "packages/astro"
};
const bugs = "https://github.com/withastro/astro/issues";
const homepage = "https://astro.build";
const types = "./index.d.ts";
const typesVersions = {
	"*": {
		app: [
			"./dist/core/app/index"
		],
		"app/*": [
			"./dist/core/app/*"
		],
		middleware: [
			"./dist/virtual-modules/middleware.d.ts"
		]
	}
};
const exports = {
	".": {
		types: "./index.d.ts",
		"default": "./dist/core/index.js"
	},
	"./env": "./env.d.ts",
	"./env/runtime": "./dist/env/runtime.js",
	"./env/setup": "./dist/env/setup.js",
	"./types": "./types.d.ts",
	"./client": "./client.d.ts",
	"./astro-jsx": "./astro-jsx.d.ts",
	"./tsconfigs/*.json": "./tsconfigs/*",
	"./tsconfigs/*": "./tsconfigs/*.json",
	"./jsx/*": "./dist/jsx/*",
	"./jsx-runtime": {
		types: "./jsx-runtime.d.ts",
		"default": "./dist/jsx-runtime/index.js"
	},
	"./compiler-runtime": "./dist/runtime/compiler/index.js",
	"./runtime/*": "./dist/runtime/*",
	"./config": {
		types: "./config.d.ts",
		"default": "./config.mjs"
	},
	"./container": {
		types: "./dist/container/index.d.ts",
		"default": "./dist/container/index.js"
	},
	"./app": "./dist/core/app/index.js",
	"./app/node": "./dist/core/app/node.js",
	"./client/*": "./dist/runtime/client/*",
	"./components": "./components/index.ts",
	"./components/*": "./components/*",
	"./toolbar": "./dist/toolbar/index.js",
	"./actions/runtime/*": "./dist/actions/runtime/*",
	"./assets": "./dist/assets/index.js",
	"./assets/utils": "./dist/assets/utils/index.js",
	"./assets/utils/inferRemoteSize.js": "./dist/assets/utils/remoteProbe.js",
	"./assets/endpoint/*": "./dist/assets/endpoint/*.js",
	"./assets/services/sharp": "./dist/assets/services/sharp.js",
	"./assets/services/squoosh": "./dist/assets/services/squoosh.js",
	"./assets/services/noop": "./dist/assets/services/noop.js",
	"./loaders": "./dist/content/loaders/index.js",
	"./content/runtime": "./dist/content/runtime.js",
	"./content/runtime-assets": "./dist/content/runtime-assets.js",
	"./debug": "./components/Debug.astro",
	"./package.json": "./package.json",
	"./zod": {
		types: "./zod.d.ts",
		"default": "./zod.mjs"
	},
	"./errors": "./dist/core/errors/userError.js",
	"./middleware": {
		types: "./dist/core/middleware/index.d.ts",
		"default": "./dist/core/middleware/index.js"
	},
	"./virtual-modules/*": "./dist/virtual-modules/*"
};
const bin = {
	astro: "astro.js"
};
const files = [
	"components",
	"tsconfigs",
	"dist",
	"types",
	"astro.js",
	"index.d.ts",
	"config.d.ts",
	"config.mjs",
	"zod.d.ts",
	"zod.mjs",
	"env.d.ts",
	"client.d.ts",
	"jsx-runtime.d.ts",
	"templates",
	"astro-jsx.d.ts",
	"types.d.ts",
	"README.md",
	"vendor"
];
const dependencies = {
	"@astrojs/compiler": "^2.10.3",
	"@babel/core": "^7.25.7",
	"@babel/plugin-transform-react-jsx": "^7.25.7",
	"@babel/types": "^7.25.7",
	"@oslojs/encoding": "^1.1.0",
	"@rollup/pluginutils": "^5.1.2",
	"@types/babel__core": "^7.20.5",
	"@types/cookie": "^0.6.0",
	acorn: "^8.12.1",
	"aria-query": "^5.3.2",
	"axobject-query": "^4.1.0",
	boxen: "8.0.1",
	"ci-info": "^4.0.0",
	clsx: "^2.1.1",
	"common-ancestor-path": "^1.0.1",
	cookie: "^0.7.2",
	cssesc: "^3.0.0",
	debug: "^4.3.7",
	"deterministic-object-hash": "^2.0.2",
	devalue: "^5.1.1",
	diff: "^5.2.0",
	dlv: "^1.1.3",
	dset: "^3.1.4",
	"es-module-lexer": "^1.5.4",
	esbuild: "^0.21.5",
	"estree-walker": "^3.0.3",
	"fast-glob": "^3.3.2",
	fastq: "^1.17.1",
	flattie: "^1.1.1",
	"github-slugger": "^2.0.0",
	"gray-matter": "^4.0.3",
	"html-escaper": "^3.0.3",
	"http-cache-semantics": "^4.1.1",
	"js-yaml": "^4.1.0",
	kleur: "^4.1.5",
	"magic-string": "^0.30.11",
	magicast: "^0.3.5",
	micromatch: "^4.0.8",
	mrmime: "^2.0.0",
	neotraverse: "^0.6.18",
	ora: "^8.1.0",
	"p-limit": "^6.1.0",
	"p-queue": "^8.0.1",
	"preferred-pm": "^4.0.0",
	prompts: "^2.4.2",
	rehype: "^13.0.2",
	semver: "^7.6.3",
	shiki: "^1.22.0",
	"string-width": "^7.2.0",
	tinyexec: "^0.3.0",
	tsconfck: "^3.1.3",
	"unist-util-visit": "^5.0.0",
	vfile: "^6.0.3",
	vite: "^5.4.8",
	vitefu: "^1.0.2",
	"which-pm": "^3.0.0",
	"xxhash-wasm": "^1.0.2",
	"yargs-parser": "^21.1.1",
	zod: "^3.23.8",
	"zod-to-json-schema": "^3.23.3",
	"zod-to-ts": "^1.2.0",
	"@astrojs/internal-helpers": "0.4.1",
	"@astrojs/markdown-remark": "5.2.0",
	"@astrojs/telemetry": "3.1.0"
};
const optionalDependencies = {
	sharp: "^0.33.3"
};
const devDependencies = {
	"@astrojs/check": "^0.9.4",
	"@playwright/test": "^1.47.2",
	"@types/aria-query": "^5.0.4",
	"@types/common-ancestor-path": "^1.0.2",
	"@types/cssesc": "^3.0.2",
	"@types/debug": "^4.1.12",
	"@types/diff": "^5.2.2",
	"@types/dlv": "^1.1.4",
	"@types/hast": "^3.0.4",
	"@types/html-escaper": "^3.0.2",
	"@types/http-cache-semantics": "^4.0.4",
	"@types/js-yaml": "^4.0.9",
	"@types/micromatch": "^4.0.9",
	"@types/prompts": "^2.4.9",
	"@types/semver": "^7.5.8",
	"@types/yargs-parser": "^21.0.3",
	cheerio: "1.0.0",
	eol: "^0.10.0",
	execa: "^8.0.1",
	"expect-type": "^1.0.0",
	"mdast-util-mdx": "^3.0.0",
	"mdast-util-mdx-jsx": "^3.1.3",
	memfs: "^4.12.0",
	"node-mocks-http": "^1.16.1",
	"parse-srcset": "^1.0.2",
	"rehype-autolink-headings": "^7.1.0",
	"rehype-slug": "^6.0.0",
	"rehype-toc": "^3.0.2",
	"remark-code-titles": "^0.1.2",
	rollup: "^4.24.0",
	sass: "^1.79.4",
	undici: "^6.19.8",
	unified: "^11.0.5",
	"astro-scripts": "0.0.14"
};
const engines = {
	node: "^18.17.1 || ^20.3.0 || >=21.0.0",
	npm: ">=9.6.5",
	pnpm: ">=7.1.0"
};
const publishConfig = {
	provenance: true
};
const scripts = {
	prebuild: "astro-scripts prebuild --to-string \"src/runtime/server/astro-island.ts\" \"src/runtime/client/{idle,load,media,only,visible}.ts\"",
	build: "pnpm run prebuild && astro-scripts build \"src/**/*.{ts,js}\" --copy-wasm && tsc",
	"build:ci": "pnpm run prebuild && astro-scripts build \"src/**/*.{ts,js}\" --copy-wasm",
	dev: "astro-scripts dev --copy-wasm --prebuild \"src/runtime/server/astro-island.ts\" --prebuild \"src/runtime/client/{idle,load,media,only,visible}.ts\" \"src/**/*.{ts,js}\"",
	test: "pnpm run test:node && pnpm run test:types",
	"test:match": "pnpm run test:node --match",
	"test:e2e": "pnpm test:e2e:chrome && pnpm test:e2e:firefox",
	"test:e2e:match": "playwright test -g",
	"test:e2e:chrome": "playwright test",
	"test:e2e:firefox": "playwright test --config playwright.firefox.config.js",
	"test:types": "tsc --project tsconfig.tests.json",
	"test:node": "astro-scripts test \"test/**/*.test.js\""
};
const astroPkg = {
	name: name,
	version: version,
	description: description,
	type: type,
	author: author,
	license: license,
	repository: repository,
	bugs: bugs,
	homepage: homepage,
	types: types,
	typesVersions: typesVersions,
	exports: exports,
	bin: bin,
	files: files,
	dependencies: dependencies,
	optionalDependencies: optionalDependencies,
	devDependencies: devDependencies,
	engines: engines,
	publishConfig: publishConfig,
	scripts: scripts
};

// src/lib/cloudinary.ts
var REGEX_VERSION = /\/v\d+\//;
var REGEX_FORMAT = /\.(ai|avif|gif|png|webp|bmp|bw|djvu|dng|ps|ept|eps|eps3|fbx|flif|gif|glb|gltf|heif|heic|ico|indd|jpg|jpe|jpeg|jp2|wdp|jxr|hdp|obj|pdf|ply|png|psd|arw|cr2|svg|tga|tif|tiff|u3ma|usdz|webp|3g2|3gp|avi|flv|m3u8|ts|m2ts|mts|mov|mkv|mp4|mpeg|mpd|mxf|ogv|webm|wmv)$/i;
var REGEX_URL = /https?:\/\/(?<host>[^/]+)\/(?<cloudName>[^/]+)?\/?(?<assetType>image|images|video|videos|raw|files)\/(?<deliveryType>upload|fetch|private|authenticated|sprite|facebook|twitter|youtube|vimeo)?\/?(?<signature>s--([a-zA-Z0-9_-]{8}|[a-zA-Z0-9_-]{32})--)?\/?(?<transformations>(?:[^_/]+_[^,/]+,?\/?)*\/)*(?<version>v\d+|\w{1,2})\/(?<publicId>[^\s]+)$/;
var ASSET_TYPES_SEO = ["images", "videos", "files"];
var CLOUDINARY_DEFAULT_HOST = "res.cloudinary.com";
function parseUrl(src) {
  if (typeof src !== "string") {
    throw new Error(`Failed to parse URL - Invalid src: Is not a string`);
  }
  const hasVersion = REGEX_VERSION.test(src);
  if (!hasVersion) {
    throw new Error(
      `Failed to parse URL - Invalid src: Does not include version (Ex: /v1234/)`
    );
  }
  const [baseUrlWithExtension, queryString] = src.split("?");
  const format = getFormat(baseUrlWithExtension);
  let baseUrl = baseUrlWithExtension;
  if (format) {
    baseUrl = baseUrlWithExtension.replace(new RegExp(`${format}$`), "");
  }
  const results = baseUrl.match(REGEX_URL);
  const transformations = results?.groups?.transformations?.split("/").filter((t) => !!t);
  const parts = {
    ...results?.groups,
    format,
    seoSuffix: void 0,
    transformations: transformations || [],
    queryParams: {},
    version: results?.groups?.version ? parseInt(results.groups.version.replace("v", "")) : void 0
  };
  if (parts.host === CLOUDINARY_DEFAULT_HOST && !parts.cloudName) {
    throw new Error(
      "Failed to parse URL - Invalid src: Cloudinary URL delivered from res.cloudinary.com must include Cloud Name (ex: res.cloudinary.com/<Cloud Name>/image/...)"
    );
  }
  if (queryString) {
    parts.queryParams = queryString.split("&").reduce((prev, curr) => {
      const [key, value] = curr.split("=");
      prev[key] = value;
      return prev;
    }, {});
  }
  if (parts.assetType && ASSET_TYPES_SEO.includes(parts.assetType)) {
    const publicIdParts = parts.publicId?.split("/") || [];
    parts.seoSuffix = publicIdParts.pop();
    parts.publicId = publicIdParts.join("/");
  }
  if (parts.publicId) {
    parts.publicId = decodeURIComponent(parts.publicId);
  }
  return parts;
}
function getTransformations(src) {
  const { transformations = [] } = parseUrl(src) || {};
  return transformations.map((t) => t.split(","));
}
function getFormat(src) {
  const matches = src.match(REGEX_FORMAT);
  if (matches === null) return;
  return matches[0];
}

// src/lib/colors.ts
function testColorIsHex(value) {
  if (typeof value !== "string") return false;
  return !!value.startsWith("#");
}
function convertColorHexToRgb(value) {
  return `rgb:${value.replace("#", "")}`;
}

// src/lib/util.ts
function encodeBase64(value) {
  if (typeof btoa === "function") {
    return btoa(value);
  }
  if (typeof Buffer !== "undefined") {
    return Buffer.from(value).toString("base64");
  }
}
function objectHasKey(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key);
}
function sortByKey(array = [], key, type = "asc") {
  function compare(a, b) {
    let keyA = a[key];
    let keyB = b[key];
    if (typeof keyA === "string") {
      keyA = keyA.toLowerCase();
    }
    if (typeof keyB === "string") {
      keyB = keyB.toLowerCase();
    }
    if (keyA < keyB) {
      return -1;
    }
    if (keyA > keyB) {
      return 1;
    }
    return 0;
  }
  let newArray = [...array];
  newArray = newArray.sort(compare);
  if (type === "desc") {
    return newArray.reverse();
  }
  return newArray;
}

var util;
(function (util) {
    util.assertEqual = (val) => val;
    function assertIs(_arg) { }
    util.assertIs = assertIs;
    function assertNever(_x) {
        throw new Error();
    }
    util.assertNever = assertNever;
    util.arrayToEnum = (items) => {
        const obj = {};
        for (const item of items) {
            obj[item] = item;
        }
        return obj;
    };
    util.getValidEnumValues = (obj) => {
        const validKeys = util.objectKeys(obj).filter((k) => typeof obj[obj[k]] !== "number");
        const filtered = {};
        for (const k of validKeys) {
            filtered[k] = obj[k];
        }
        return util.objectValues(filtered);
    };
    util.objectValues = (obj) => {
        return util.objectKeys(obj).map(function (e) {
            return obj[e];
        });
    };
    util.objectKeys = typeof Object.keys === "function" // eslint-disable-line ban/ban
        ? (obj) => Object.keys(obj) // eslint-disable-line ban/ban
        : (object) => {
            const keys = [];
            for (const key in object) {
                if (Object.prototype.hasOwnProperty.call(object, key)) {
                    keys.push(key);
                }
            }
            return keys;
        };
    util.find = (arr, checker) => {
        for (const item of arr) {
            if (checker(item))
                return item;
        }
        return undefined;
    };
    util.isInteger = typeof Number.isInteger === "function"
        ? (val) => Number.isInteger(val) // eslint-disable-line ban/ban
        : (val) => typeof val === "number" && isFinite(val) && Math.floor(val) === val;
    function joinValues(array, separator = " | ") {
        return array
            .map((val) => (typeof val === "string" ? `'${val}'` : val))
            .join(separator);
    }
    util.joinValues = joinValues;
    util.jsonStringifyReplacer = (_, value) => {
        if (typeof value === "bigint") {
            return value.toString();
        }
        return value;
    };
})(util || (util = {}));
var objectUtil;
(function (objectUtil) {
    objectUtil.mergeShapes = (first, second) => {
        return {
            ...first,
            ...second, // second overwrites first
        };
    };
})(objectUtil || (objectUtil = {}));
const ZodParsedType = util.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
]);
const getParsedType = (data) => {
    const t = typeof data;
    switch (t) {
        case "undefined":
            return ZodParsedType.undefined;
        case "string":
            return ZodParsedType.string;
        case "number":
            return isNaN(data) ? ZodParsedType.nan : ZodParsedType.number;
        case "boolean":
            return ZodParsedType.boolean;
        case "function":
            return ZodParsedType.function;
        case "bigint":
            return ZodParsedType.bigint;
        case "symbol":
            return ZodParsedType.symbol;
        case "object":
            if (Array.isArray(data)) {
                return ZodParsedType.array;
            }
            if (data === null) {
                return ZodParsedType.null;
            }
            if (data.then &&
                typeof data.then === "function" &&
                data.catch &&
                typeof data.catch === "function") {
                return ZodParsedType.promise;
            }
            if (typeof Map !== "undefined" && data instanceof Map) {
                return ZodParsedType.map;
            }
            if (typeof Set !== "undefined" && data instanceof Set) {
                return ZodParsedType.set;
            }
            if (typeof Date !== "undefined" && data instanceof Date) {
                return ZodParsedType.date;
            }
            return ZodParsedType.object;
        default:
            return ZodParsedType.unknown;
    }
};

const ZodIssueCode = util.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
]);
const quotelessJson = (obj) => {
    const json = JSON.stringify(obj, null, 2);
    return json.replace(/"([^"]+)":/g, "$1:");
};
class ZodError extends Error {
    constructor(issues) {
        super();
        this.issues = [];
        this.addIssue = (sub) => {
            this.issues = [...this.issues, sub];
        };
        this.addIssues = (subs = []) => {
            this.issues = [...this.issues, ...subs];
        };
        const actualProto = new.target.prototype;
        if (Object.setPrototypeOf) {
            // eslint-disable-next-line ban/ban
            Object.setPrototypeOf(this, actualProto);
        }
        else {
            this.__proto__ = actualProto;
        }
        this.name = "ZodError";
        this.issues = issues;
    }
    get errors() {
        return this.issues;
    }
    format(_mapper) {
        const mapper = _mapper ||
            function (issue) {
                return issue.message;
            };
        const fieldErrors = { _errors: [] };
        const processError = (error) => {
            for (const issue of error.issues) {
                if (issue.code === "invalid_union") {
                    issue.unionErrors.map(processError);
                }
                else if (issue.code === "invalid_return_type") {
                    processError(issue.returnTypeError);
                }
                else if (issue.code === "invalid_arguments") {
                    processError(issue.argumentsError);
                }
                else if (issue.path.length === 0) {
                    fieldErrors._errors.push(mapper(issue));
                }
                else {
                    let curr = fieldErrors;
                    let i = 0;
                    while (i < issue.path.length) {
                        const el = issue.path[i];
                        const terminal = i === issue.path.length - 1;
                        if (!terminal) {
                            curr[el] = curr[el] || { _errors: [] };
                            // if (typeof el === "string") {
                            //   curr[el] = curr[el] || { _errors: [] };
                            // } else if (typeof el === "number") {
                            //   const errorArray: any = [];
                            //   errorArray._errors = [];
                            //   curr[el] = curr[el] || errorArray;
                            // }
                        }
                        else {
                            curr[el] = curr[el] || { _errors: [] };
                            curr[el]._errors.push(mapper(issue));
                        }
                        curr = curr[el];
                        i++;
                    }
                }
            }
        };
        processError(this);
        return fieldErrors;
    }
    static assert(value) {
        if (!(value instanceof ZodError)) {
            throw new Error(`Not a ZodError: ${value}`);
        }
    }
    toString() {
        return this.message;
    }
    get message() {
        return JSON.stringify(this.issues, util.jsonStringifyReplacer, 2);
    }
    get isEmpty() {
        return this.issues.length === 0;
    }
    flatten(mapper = (issue) => issue.message) {
        const fieldErrors = {};
        const formErrors = [];
        for (const sub of this.issues) {
            if (sub.path.length > 0) {
                fieldErrors[sub.path[0]] = fieldErrors[sub.path[0]] || [];
                fieldErrors[sub.path[0]].push(mapper(sub));
            }
            else {
                formErrors.push(mapper(sub));
            }
        }
        return { formErrors, fieldErrors };
    }
    get formErrors() {
        return this.flatten();
    }
}
ZodError.create = (issues) => {
    const error = new ZodError(issues);
    return error;
};

const errorMap = (issue, _ctx) => {
    let message;
    switch (issue.code) {
        case ZodIssueCode.invalid_type:
            if (issue.received === ZodParsedType.undefined) {
                message = "Required";
            }
            else {
                message = `Expected ${issue.expected}, received ${issue.received}`;
            }
            break;
        case ZodIssueCode.invalid_literal:
            message = `Invalid literal value, expected ${JSON.stringify(issue.expected, util.jsonStringifyReplacer)}`;
            break;
        case ZodIssueCode.unrecognized_keys:
            message = `Unrecognized key(s) in object: ${util.joinValues(issue.keys, ", ")}`;
            break;
        case ZodIssueCode.invalid_union:
            message = `Invalid input`;
            break;
        case ZodIssueCode.invalid_union_discriminator:
            message = `Invalid discriminator value. Expected ${util.joinValues(issue.options)}`;
            break;
        case ZodIssueCode.invalid_enum_value:
            message = `Invalid enum value. Expected ${util.joinValues(issue.options)}, received '${issue.received}'`;
            break;
        case ZodIssueCode.invalid_arguments:
            message = `Invalid function arguments`;
            break;
        case ZodIssueCode.invalid_return_type:
            message = `Invalid function return type`;
            break;
        case ZodIssueCode.invalid_date:
            message = `Invalid date`;
            break;
        case ZodIssueCode.invalid_string:
            if (typeof issue.validation === "object") {
                if ("includes" in issue.validation) {
                    message = `Invalid input: must include "${issue.validation.includes}"`;
                    if (typeof issue.validation.position === "number") {
                        message = `${message} at one or more positions greater than or equal to ${issue.validation.position}`;
                    }
                }
                else if ("startsWith" in issue.validation) {
                    message = `Invalid input: must start with "${issue.validation.startsWith}"`;
                }
                else if ("endsWith" in issue.validation) {
                    message = `Invalid input: must end with "${issue.validation.endsWith}"`;
                }
                else {
                    util.assertNever(issue.validation);
                }
            }
            else if (issue.validation !== "regex") {
                message = `Invalid ${issue.validation}`;
            }
            else {
                message = "Invalid";
            }
            break;
        case ZodIssueCode.too_small:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `more than`} ${issue.minimum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? "exactly" : issue.inclusive ? `at least` : `over`} ${issue.minimum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact
                    ? `exactly equal to `
                    : issue.inclusive
                        ? `greater than or equal to `
                        : `greater than `}${issue.minimum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact
                    ? `exactly equal to `
                    : issue.inclusive
                        ? `greater than or equal to `
                        : `greater than `}${new Date(Number(issue.minimum))}`;
            else
                message = "Invalid input";
            break;
        case ZodIssueCode.too_big:
            if (issue.type === "array")
                message = `Array must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `less than`} ${issue.maximum} element(s)`;
            else if (issue.type === "string")
                message = `String must contain ${issue.exact ? `exactly` : issue.inclusive ? `at most` : `under`} ${issue.maximum} character(s)`;
            else if (issue.type === "number")
                message = `Number must be ${issue.exact
                    ? `exactly`
                    : issue.inclusive
                        ? `less than or equal to`
                        : `less than`} ${issue.maximum}`;
            else if (issue.type === "bigint")
                message = `BigInt must be ${issue.exact
                    ? `exactly`
                    : issue.inclusive
                        ? `less than or equal to`
                        : `less than`} ${issue.maximum}`;
            else if (issue.type === "date")
                message = `Date must be ${issue.exact
                    ? `exactly`
                    : issue.inclusive
                        ? `smaller than or equal to`
                        : `smaller than`} ${new Date(Number(issue.maximum))}`;
            else
                message = "Invalid input";
            break;
        case ZodIssueCode.custom:
            message = `Invalid input`;
            break;
        case ZodIssueCode.invalid_intersection_types:
            message = `Intersection results could not be merged`;
            break;
        case ZodIssueCode.not_multiple_of:
            message = `Number must be a multiple of ${issue.multipleOf}`;
            break;
        case ZodIssueCode.not_finite:
            message = "Number must be finite";
            break;
        default:
            message = _ctx.defaultError;
            util.assertNever(issue);
    }
    return { message };
};

let overrideErrorMap = errorMap;
function setErrorMap(map) {
    overrideErrorMap = map;
}
function getErrorMap() {
    return overrideErrorMap;
}

const makeIssue = (params) => {
    const { data, path, errorMaps, issueData } = params;
    const fullPath = [...path, ...(issueData.path || [])];
    const fullIssue = {
        ...issueData,
        path: fullPath,
    };
    if (issueData.message !== undefined) {
        return {
            ...issueData,
            path: fullPath,
            message: issueData.message,
        };
    }
    let errorMessage = "";
    const maps = errorMaps
        .filter((m) => !!m)
        .slice()
        .reverse();
    for (const map of maps) {
        errorMessage = map(fullIssue, { data, defaultError: errorMessage }).message;
    }
    return {
        ...issueData,
        path: fullPath,
        message: errorMessage,
    };
};
const EMPTY_PATH = [];
function addIssueToContext(ctx, issueData) {
    const overrideMap = getErrorMap();
    const issue = makeIssue({
        issueData: issueData,
        data: ctx.data,
        path: ctx.path,
        errorMaps: [
            ctx.common.contextualErrorMap,
            ctx.schemaErrorMap,
            overrideMap,
            overrideMap === errorMap ? undefined : errorMap, // then global default map
        ].filter((x) => !!x),
    });
    ctx.common.issues.push(issue);
}
class ParseStatus {
    constructor() {
        this.value = "valid";
    }
    dirty() {
        if (this.value === "valid")
            this.value = "dirty";
    }
    abort() {
        if (this.value !== "aborted")
            this.value = "aborted";
    }
    static mergeArray(status, results) {
        const arrayValue = [];
        for (const s of results) {
            if (s.status === "aborted")
                return INVALID;
            if (s.status === "dirty")
                status.dirty();
            arrayValue.push(s.value);
        }
        return { status: status.value, value: arrayValue };
    }
    static async mergeObjectAsync(status, pairs) {
        const syncPairs = [];
        for (const pair of pairs) {
            const key = await pair.key;
            const value = await pair.value;
            syncPairs.push({
                key,
                value,
            });
        }
        return ParseStatus.mergeObjectSync(status, syncPairs);
    }
    static mergeObjectSync(status, pairs) {
        const finalObject = {};
        for (const pair of pairs) {
            const { key, value } = pair;
            if (key.status === "aborted")
                return INVALID;
            if (value.status === "aborted")
                return INVALID;
            if (key.status === "dirty")
                status.dirty();
            if (value.status === "dirty")
                status.dirty();
            if (key.value !== "__proto__" &&
                (typeof value.value !== "undefined" || pair.alwaysSet)) {
                finalObject[key.value] = value.value;
            }
        }
        return { status: status.value, value: finalObject };
    }
}
const INVALID = Object.freeze({
    status: "aborted",
});
const DIRTY = (value) => ({ status: "dirty", value });
const OK = (value) => ({ status: "valid", value });
const isAborted = (x) => x.status === "aborted";
const isDirty = (x) => x.status === "dirty";
const isValid = (x) => x.status === "valid";
const isAsync = (x) => typeof Promise !== "undefined" && x instanceof Promise;

/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __classPrivateFieldGet(receiver, state, kind, f) {
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return state.get(receiver);
}

function __classPrivateFieldSet(receiver, state, value, kind, f) {
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (state.set(receiver, value)), value;
}

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

var errorUtil;
(function (errorUtil) {
    errorUtil.errToObj = (message) => typeof message === "string" ? { message } : message || {};
    errorUtil.toString = (message) => typeof message === "string" ? message : message === null || message === void 0 ? void 0 : message.message;
})(errorUtil || (errorUtil = {}));

var _ZodEnum_cache, _ZodNativeEnum_cache;
class ParseInputLazyPath {
    constructor(parent, value, path, key) {
        this._cachedPath = [];
        this.parent = parent;
        this.data = value;
        this._path = path;
        this._key = key;
    }
    get path() {
        if (!this._cachedPath.length) {
            if (this._key instanceof Array) {
                this._cachedPath.push(...this._path, ...this._key);
            }
            else {
                this._cachedPath.push(...this._path, this._key);
            }
        }
        return this._cachedPath;
    }
}
const handleResult = (ctx, result) => {
    if (isValid(result)) {
        return { success: true, data: result.value };
    }
    else {
        if (!ctx.common.issues.length) {
            throw new Error("Validation failed but no issues detected.");
        }
        return {
            success: false,
            get error() {
                if (this._error)
                    return this._error;
                const error = new ZodError(ctx.common.issues);
                this._error = error;
                return this._error;
            },
        };
    }
};
function processCreateParams(params) {
    if (!params)
        return {};
    const { errorMap, invalid_type_error, required_error, description } = params;
    if (errorMap && (invalid_type_error || required_error)) {
        throw new Error(`Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`);
    }
    if (errorMap)
        return { errorMap: errorMap, description };
    const customMap = (iss, ctx) => {
        var _a, _b;
        const { message } = params;
        if (iss.code === "invalid_enum_value") {
            return { message: message !== null && message !== void 0 ? message : ctx.defaultError };
        }
        if (typeof ctx.data === "undefined") {
            return { message: (_a = message !== null && message !== void 0 ? message : required_error) !== null && _a !== void 0 ? _a : ctx.defaultError };
        }
        if (iss.code !== "invalid_type")
            return { message: ctx.defaultError };
        return { message: (_b = message !== null && message !== void 0 ? message : invalid_type_error) !== null && _b !== void 0 ? _b : ctx.defaultError };
    };
    return { errorMap: customMap, description };
}
class ZodType {
    constructor(def) {
        /** Alias of safeParseAsync */
        this.spa = this.safeParseAsync;
        this._def = def;
        this.parse = this.parse.bind(this);
        this.safeParse = this.safeParse.bind(this);
        this.parseAsync = this.parseAsync.bind(this);
        this.safeParseAsync = this.safeParseAsync.bind(this);
        this.spa = this.spa.bind(this);
        this.refine = this.refine.bind(this);
        this.refinement = this.refinement.bind(this);
        this.superRefine = this.superRefine.bind(this);
        this.optional = this.optional.bind(this);
        this.nullable = this.nullable.bind(this);
        this.nullish = this.nullish.bind(this);
        this.array = this.array.bind(this);
        this.promise = this.promise.bind(this);
        this.or = this.or.bind(this);
        this.and = this.and.bind(this);
        this.transform = this.transform.bind(this);
        this.brand = this.brand.bind(this);
        this.default = this.default.bind(this);
        this.catch = this.catch.bind(this);
        this.describe = this.describe.bind(this);
        this.pipe = this.pipe.bind(this);
        this.readonly = this.readonly.bind(this);
        this.isNullable = this.isNullable.bind(this);
        this.isOptional = this.isOptional.bind(this);
    }
    get description() {
        return this._def.description;
    }
    _getType(input) {
        return getParsedType(input.data);
    }
    _getOrReturnCtx(input, ctx) {
        return (ctx || {
            common: input.parent.common,
            data: input.data,
            parsedType: getParsedType(input.data),
            schemaErrorMap: this._def.errorMap,
            path: input.path,
            parent: input.parent,
        });
    }
    _processInputParams(input) {
        return {
            status: new ParseStatus(),
            ctx: {
                common: input.parent.common,
                data: input.data,
                parsedType: getParsedType(input.data),
                schemaErrorMap: this._def.errorMap,
                path: input.path,
                parent: input.parent,
            },
        };
    }
    _parseSync(input) {
        const result = this._parse(input);
        if (isAsync(result)) {
            throw new Error("Synchronous parse encountered promise.");
        }
        return result;
    }
    _parseAsync(input) {
        const result = this._parse(input);
        return Promise.resolve(result);
    }
    parse(data, params) {
        const result = this.safeParse(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    safeParse(data, params) {
        var _a;
        const ctx = {
            common: {
                issues: [],
                async: (_a = params === null || params === void 0 ? void 0 : params.async) !== null && _a !== void 0 ? _a : false,
                contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
            },
            path: (params === null || params === void 0 ? void 0 : params.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: getParsedType(data),
        };
        const result = this._parseSync({ data, path: ctx.path, parent: ctx });
        return handleResult(ctx, result);
    }
    async parseAsync(data, params) {
        const result = await this.safeParseAsync(data, params);
        if (result.success)
            return result.data;
        throw result.error;
    }
    async safeParseAsync(data, params) {
        const ctx = {
            common: {
                issues: [],
                contextualErrorMap: params === null || params === void 0 ? void 0 : params.errorMap,
                async: true,
            },
            path: (params === null || params === void 0 ? void 0 : params.path) || [],
            schemaErrorMap: this._def.errorMap,
            parent: null,
            data,
            parsedType: getParsedType(data),
        };
        const maybeAsyncResult = this._parse({ data, path: ctx.path, parent: ctx });
        const result = await (isAsync(maybeAsyncResult)
            ? maybeAsyncResult
            : Promise.resolve(maybeAsyncResult));
        return handleResult(ctx, result);
    }
    refine(check, message) {
        const getIssueProperties = (val) => {
            if (typeof message === "string" || typeof message === "undefined") {
                return { message };
            }
            else if (typeof message === "function") {
                return message(val);
            }
            else {
                return message;
            }
        };
        return this._refinement((val, ctx) => {
            const result = check(val);
            const setError = () => ctx.addIssue({
                code: ZodIssueCode.custom,
                ...getIssueProperties(val),
            });
            if (typeof Promise !== "undefined" && result instanceof Promise) {
                return result.then((data) => {
                    if (!data) {
                        setError();
                        return false;
                    }
                    else {
                        return true;
                    }
                });
            }
            if (!result) {
                setError();
                return false;
            }
            else {
                return true;
            }
        });
    }
    refinement(check, refinementData) {
        return this._refinement((val, ctx) => {
            if (!check(val)) {
                ctx.addIssue(typeof refinementData === "function"
                    ? refinementData(val, ctx)
                    : refinementData);
                return false;
            }
            else {
                return true;
            }
        });
    }
    _refinement(refinement) {
        return new ZodEffects({
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "refinement", refinement },
        });
    }
    superRefine(refinement) {
        return this._refinement(refinement);
    }
    optional() {
        return ZodOptional.create(this, this._def);
    }
    nullable() {
        return ZodNullable.create(this, this._def);
    }
    nullish() {
        return this.nullable().optional();
    }
    array() {
        return ZodArray.create(this, this._def);
    }
    promise() {
        return ZodPromise.create(this, this._def);
    }
    or(option) {
        return ZodUnion.create([this, option], this._def);
    }
    and(incoming) {
        return ZodIntersection.create(this, incoming, this._def);
    }
    transform(transform) {
        return new ZodEffects({
            ...processCreateParams(this._def),
            schema: this,
            typeName: ZodFirstPartyTypeKind.ZodEffects,
            effect: { type: "transform", transform },
        });
    }
    default(def) {
        const defaultValueFunc = typeof def === "function" ? def : () => def;
        return new ZodDefault({
            ...processCreateParams(this._def),
            innerType: this,
            defaultValue: defaultValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodDefault,
        });
    }
    brand() {
        return new ZodBranded({
            typeName: ZodFirstPartyTypeKind.ZodBranded,
            type: this,
            ...processCreateParams(this._def),
        });
    }
    catch(def) {
        const catchValueFunc = typeof def === "function" ? def : () => def;
        return new ZodCatch({
            ...processCreateParams(this._def),
            innerType: this,
            catchValue: catchValueFunc,
            typeName: ZodFirstPartyTypeKind.ZodCatch,
        });
    }
    describe(description) {
        const This = this.constructor;
        return new This({
            ...this._def,
            description,
        });
    }
    pipe(target) {
        return ZodPipeline.create(this, target);
    }
    readonly() {
        return ZodReadonly.create(this);
    }
    isOptional() {
        return this.safeParse(undefined).success;
    }
    isNullable() {
        return this.safeParse(null).success;
    }
}
const cuidRegex = /^c[^\s-]{8,}$/i;
const cuid2Regex = /^[0-9a-z]+$/;
const ulidRegex = /^[0-9A-HJKMNP-TV-Z]{26}$/;
// const uuidRegex =
//   /^([a-f0-9]{8}-[a-f0-9]{4}-[1-5][a-f0-9]{3}-[a-f0-9]{4}-[a-f0-9]{12}|00000000-0000-0000-0000-000000000000)$/i;
const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i;
const nanoidRegex = /^[a-z0-9_-]{21}$/i;
const durationRegex = /^[-+]?P(?!$)(?:(?:[-+]?\d+Y)|(?:[-+]?\d+[.,]\d+Y$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:(?:[-+]?\d+W)|(?:[-+]?\d+[.,]\d+W$))?(?:(?:[-+]?\d+D)|(?:[-+]?\d+[.,]\d+D$))?(?:T(?=[\d+-])(?:(?:[-+]?\d+H)|(?:[-+]?\d+[.,]\d+H$))?(?:(?:[-+]?\d+M)|(?:[-+]?\d+[.,]\d+M$))?(?:[-+]?\d+(?:[.,]\d+)?S)?)??$/;
// from https://stackoverflow.com/a/46181/1550155
// old version: too slow, didn't support unicode
// const emailRegex = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i;
//old email regex
// const emailRegex = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@((?!-)([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{1,})[^-<>()[\].,;:\s@"]$/i;
// eslint-disable-next-line
// const emailRegex =
//   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\])|(\[IPv6:(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))\])|([A-Za-z0-9]([A-Za-z0-9-]*[A-Za-z0-9])*(\.[A-Za-z]{2,})+))$/;
// const emailRegex =
//   /^[a-zA-Z0-9\.\!\#\$\%\&\'\*\+\/\=\?\^\_\`\{\|\}\~\-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
// const emailRegex =
//   /^(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])$/i;
const emailRegex = /^(?!\.)(?!.*\.\.)([A-Z0-9_'+\-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i;
// const emailRegex =
//   /^[a-z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9\-]+)*$/i;
// from https://thekevinscott.com/emojis-in-javascript/#writing-a-regular-expression
const _emojiRegex = `^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$`;
let emojiRegex;
// faster, simpler, safer
const ipv4Regex = /^(?:(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])\.){3}(?:25[0-5]|2[0-4][0-9]|1[0-9][0-9]|[1-9][0-9]|[0-9])$/;
const ipv6Regex = /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/;
// https://stackoverflow.com/questions/7860392/determine-if-string-is-in-base64-using-javascript
const base64Regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
// simple
// const dateRegexSource = `\\d{4}-\\d{2}-\\d{2}`;
// no leap year validation
// const dateRegexSource = `\\d{4}-((0[13578]|10|12)-31|(0[13-9]|1[0-2])-30|(0[1-9]|1[0-2])-(0[1-9]|1\\d|2\\d))`;
// with leap year validation
const dateRegexSource = `((\\d\\d[2468][048]|\\d\\d[13579][26]|\\d\\d0[48]|[02468][048]00|[13579][26]00)-02-29|\\d{4}-((0[13578]|1[02])-(0[1-9]|[12]\\d|3[01])|(0[469]|11)-(0[1-9]|[12]\\d|30)|(02)-(0[1-9]|1\\d|2[0-8])))`;
const dateRegex = new RegExp(`^${dateRegexSource}$`);
function timeRegexSource(args) {
    // let regex = `\\d{2}:\\d{2}:\\d{2}`;
    let regex = `([01]\\d|2[0-3]):[0-5]\\d:[0-5]\\d`;
    if (args.precision) {
        regex = `${regex}\\.\\d{${args.precision}}`;
    }
    else if (args.precision == null) {
        regex = `${regex}(\\.\\d+)?`;
    }
    return regex;
}
function timeRegex(args) {
    return new RegExp(`^${timeRegexSource(args)}$`);
}
// Adapted from https://stackoverflow.com/a/3143231
function datetimeRegex(args) {
    let regex = `${dateRegexSource}T${timeRegexSource(args)}`;
    const opts = [];
    opts.push(args.local ? `Z?` : `Z`);
    if (args.offset)
        opts.push(`([+-]\\d{2}:?\\d{2})`);
    regex = `${regex}(${opts.join("|")})`;
    return new RegExp(`^${regex}$`);
}
function isValidIP(ip, version) {
    if ((version === "v4" || !version) && ipv4Regex.test(ip)) {
        return true;
    }
    if ((version === "v6" || !version) && ipv6Regex.test(ip)) {
        return true;
    }
    return false;
}
class ZodString extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = String(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.string) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.string,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const status = new ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.length < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.length > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "string",
                        inclusive: true,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "length") {
                const tooBig = input.data.length > check.value;
                const tooSmall = input.data.length < check.value;
                if (tooBig || tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    if (tooBig) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.too_big,
                            maximum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    else if (tooSmall) {
                        addIssueToContext(ctx, {
                            code: ZodIssueCode.too_small,
                            minimum: check.value,
                            type: "string",
                            inclusive: true,
                            exact: true,
                            message: check.message,
                        });
                    }
                    status.dirty();
                }
            }
            else if (check.kind === "email") {
                if (!emailRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "email",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "emoji") {
                if (!emojiRegex) {
                    emojiRegex = new RegExp(_emojiRegex, "u");
                }
                if (!emojiRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "emoji",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "uuid") {
                if (!uuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "uuid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "nanoid") {
                if (!nanoidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "nanoid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid") {
                if (!cuidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cuid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "cuid2") {
                if (!cuid2Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "cuid2",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ulid") {
                if (!ulidRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "ulid",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "url") {
                try {
                    new URL(input.data);
                }
                catch (_a) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "url",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "regex") {
                check.regex.lastIndex = 0;
                const testResult = check.regex.test(input.data);
                if (!testResult) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "regex",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "trim") {
                input.data = input.data.trim();
            }
            else if (check.kind === "includes") {
                if (!input.data.includes(check.value, check.position)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: { includes: check.value, position: check.position },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "toLowerCase") {
                input.data = input.data.toLowerCase();
            }
            else if (check.kind === "toUpperCase") {
                input.data = input.data.toUpperCase();
            }
            else if (check.kind === "startsWith") {
                if (!input.data.startsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: { startsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "endsWith") {
                if (!input.data.endsWith(check.value)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: { endsWith: check.value },
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "datetime") {
                const regex = datetimeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: "datetime",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "date") {
                const regex = dateRegex;
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: "date",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "time") {
                const regex = timeRegex(check);
                if (!regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_string,
                        validation: "time",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "duration") {
                if (!durationRegex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "duration",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "ip") {
                if (!isValidIP(input.data, check.version)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "ip",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "base64") {
                if (!base64Regex.test(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        validation: "base64",
                        code: ZodIssueCode.invalid_string,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    _regex(regex, validation, message) {
        return this.refinement((data) => regex.test(data), {
            validation,
            code: ZodIssueCode.invalid_string,
            ...errorUtil.errToObj(message),
        });
    }
    _addCheck(check) {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    email(message) {
        return this._addCheck({ kind: "email", ...errorUtil.errToObj(message) });
    }
    url(message) {
        return this._addCheck({ kind: "url", ...errorUtil.errToObj(message) });
    }
    emoji(message) {
        return this._addCheck({ kind: "emoji", ...errorUtil.errToObj(message) });
    }
    uuid(message) {
        return this._addCheck({ kind: "uuid", ...errorUtil.errToObj(message) });
    }
    nanoid(message) {
        return this._addCheck({ kind: "nanoid", ...errorUtil.errToObj(message) });
    }
    cuid(message) {
        return this._addCheck({ kind: "cuid", ...errorUtil.errToObj(message) });
    }
    cuid2(message) {
        return this._addCheck({ kind: "cuid2", ...errorUtil.errToObj(message) });
    }
    ulid(message) {
        return this._addCheck({ kind: "ulid", ...errorUtil.errToObj(message) });
    }
    base64(message) {
        return this._addCheck({ kind: "base64", ...errorUtil.errToObj(message) });
    }
    ip(options) {
        return this._addCheck({ kind: "ip", ...errorUtil.errToObj(options) });
    }
    datetime(options) {
        var _a, _b;
        if (typeof options === "string") {
            return this._addCheck({
                kind: "datetime",
                precision: null,
                offset: false,
                local: false,
                message: options,
            });
        }
        return this._addCheck({
            kind: "datetime",
            precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
            offset: (_a = options === null || options === void 0 ? void 0 : options.offset) !== null && _a !== void 0 ? _a : false,
            local: (_b = options === null || options === void 0 ? void 0 : options.local) !== null && _b !== void 0 ? _b : false,
            ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message),
        });
    }
    date(message) {
        return this._addCheck({ kind: "date", message });
    }
    time(options) {
        if (typeof options === "string") {
            return this._addCheck({
                kind: "time",
                precision: null,
                message: options,
            });
        }
        return this._addCheck({
            kind: "time",
            precision: typeof (options === null || options === void 0 ? void 0 : options.precision) === "undefined" ? null : options === null || options === void 0 ? void 0 : options.precision,
            ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message),
        });
    }
    duration(message) {
        return this._addCheck({ kind: "duration", ...errorUtil.errToObj(message) });
    }
    regex(regex, message) {
        return this._addCheck({
            kind: "regex",
            regex: regex,
            ...errorUtil.errToObj(message),
        });
    }
    includes(value, options) {
        return this._addCheck({
            kind: "includes",
            value: value,
            position: options === null || options === void 0 ? void 0 : options.position,
            ...errorUtil.errToObj(options === null || options === void 0 ? void 0 : options.message),
        });
    }
    startsWith(value, message) {
        return this._addCheck({
            kind: "startsWith",
            value: value,
            ...errorUtil.errToObj(message),
        });
    }
    endsWith(value, message) {
        return this._addCheck({
            kind: "endsWith",
            value: value,
            ...errorUtil.errToObj(message),
        });
    }
    min(minLength, message) {
        return this._addCheck({
            kind: "min",
            value: minLength,
            ...errorUtil.errToObj(message),
        });
    }
    max(maxLength, message) {
        return this._addCheck({
            kind: "max",
            value: maxLength,
            ...errorUtil.errToObj(message),
        });
    }
    length(len, message) {
        return this._addCheck({
            kind: "length",
            value: len,
            ...errorUtil.errToObj(message),
        });
    }
    /**
     * @deprecated Use z.string().min(1) instead.
     * @see {@link ZodString.min}
     */
    nonempty(message) {
        return this.min(1, errorUtil.errToObj(message));
    }
    trim() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "trim" }],
        });
    }
    toLowerCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toLowerCase" }],
        });
    }
    toUpperCase() {
        return new ZodString({
            ...this._def,
            checks: [...this._def.checks, { kind: "toUpperCase" }],
        });
    }
    get isDatetime() {
        return !!this._def.checks.find((ch) => ch.kind === "datetime");
    }
    get isDate() {
        return !!this._def.checks.find((ch) => ch.kind === "date");
    }
    get isTime() {
        return !!this._def.checks.find((ch) => ch.kind === "time");
    }
    get isDuration() {
        return !!this._def.checks.find((ch) => ch.kind === "duration");
    }
    get isEmail() {
        return !!this._def.checks.find((ch) => ch.kind === "email");
    }
    get isURL() {
        return !!this._def.checks.find((ch) => ch.kind === "url");
    }
    get isEmoji() {
        return !!this._def.checks.find((ch) => ch.kind === "emoji");
    }
    get isUUID() {
        return !!this._def.checks.find((ch) => ch.kind === "uuid");
    }
    get isNANOID() {
        return !!this._def.checks.find((ch) => ch.kind === "nanoid");
    }
    get isCUID() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid");
    }
    get isCUID2() {
        return !!this._def.checks.find((ch) => ch.kind === "cuid2");
    }
    get isULID() {
        return !!this._def.checks.find((ch) => ch.kind === "ulid");
    }
    get isIP() {
        return !!this._def.checks.find((ch) => ch.kind === "ip");
    }
    get isBase64() {
        return !!this._def.checks.find((ch) => ch.kind === "base64");
    }
    get minLength() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxLength() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
ZodString.create = (params) => {
    var _a;
    return new ZodString({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodString,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params),
    });
};
// https://stackoverflow.com/questions/3966484/why-does-modulus-operator-return-fractional-number-in-javascript/31711034#31711034
function floatSafeRemainder(val, step) {
    const valDecCount = (val.toString().split(".")[1] || "").length;
    const stepDecCount = (step.toString().split(".")[1] || "").length;
    const decCount = valDecCount > stepDecCount ? valDecCount : stepDecCount;
    const valInt = parseInt(val.toFixed(decCount).replace(".", ""));
    const stepInt = parseInt(step.toFixed(decCount).replace(".", ""));
    return (valInt % stepInt) / Math.pow(10, decCount);
}
class ZodNumber extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
        this.step = this.multipleOf;
    }
    _parse(input) {
        if (this._def.coerce) {
            input.data = Number(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.number) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.number,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        let ctx = undefined;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "int") {
                if (!util.isInteger(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.invalid_type,
                        expected: "integer",
                        received: "float",
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "min") {
                const tooSmall = check.inclusive
                    ? input.data < check.value
                    : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        minimum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive
                    ? input.data > check.value
                    : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        maximum: check.value,
                        type: "number",
                        inclusive: check.inclusive,
                        exact: false,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (floatSafeRemainder(input.data, check.value) !== 0) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "finite") {
                if (!Number.isFinite(input.data)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.not_finite,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodNumber({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodNumber({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    int(message) {
        return this._addCheck({
            kind: "int",
            message: errorUtil.toString(message),
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: 0,
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: 0,
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value: value,
            message: errorUtil.toString(message),
        });
    }
    finite(message) {
        return this._addCheck({
            kind: "finite",
            message: errorUtil.toString(message),
        });
    }
    safe(message) {
        return this._addCheck({
            kind: "min",
            inclusive: true,
            value: Number.MIN_SAFE_INTEGER,
            message: errorUtil.toString(message),
        })._addCheck({
            kind: "max",
            inclusive: true,
            value: Number.MAX_SAFE_INTEGER,
            message: errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
    get isInt() {
        return !!this._def.checks.find((ch) => ch.kind === "int" ||
            (ch.kind === "multipleOf" && util.isInteger(ch.value)));
    }
    get isFinite() {
        let max = null, min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "finite" ||
                ch.kind === "int" ||
                ch.kind === "multipleOf") {
                return true;
            }
            else if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
            else if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return Number.isFinite(min) && Number.isFinite(max);
    }
}
ZodNumber.create = (params) => {
    return new ZodNumber({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodNumber,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params),
    });
};
class ZodBigInt extends ZodType {
    constructor() {
        super(...arguments);
        this.min = this.gte;
        this.max = this.lte;
    }
    _parse(input) {
        if (this._def.coerce) {
            input.data = BigInt(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.bigint) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.bigint,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        let ctx = undefined;
        const status = new ParseStatus();
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                const tooSmall = check.inclusive
                    ? input.data < check.value
                    : input.data <= check.value;
                if (tooSmall) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        type: "bigint",
                        minimum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                const tooBig = check.inclusive
                    ? input.data > check.value
                    : input.data >= check.value;
                if (tooBig) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        type: "bigint",
                        maximum: check.value,
                        inclusive: check.inclusive,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "multipleOf") {
                if (input.data % check.value !== BigInt(0)) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.not_multiple_of,
                        multipleOf: check.value,
                        message: check.message,
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return { status: status.value, value: input.data };
    }
    gte(value, message) {
        return this.setLimit("min", value, true, errorUtil.toString(message));
    }
    gt(value, message) {
        return this.setLimit("min", value, false, errorUtil.toString(message));
    }
    lte(value, message) {
        return this.setLimit("max", value, true, errorUtil.toString(message));
    }
    lt(value, message) {
        return this.setLimit("max", value, false, errorUtil.toString(message));
    }
    setLimit(kind, value, inclusive, message) {
        return new ZodBigInt({
            ...this._def,
            checks: [
                ...this._def.checks,
                {
                    kind,
                    value,
                    inclusive,
                    message: errorUtil.toString(message),
                },
            ],
        });
    }
    _addCheck(check) {
        return new ZodBigInt({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    positive(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    negative(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: false,
            message: errorUtil.toString(message),
        });
    }
    nonpositive(message) {
        return this._addCheck({
            kind: "max",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    nonnegative(message) {
        return this._addCheck({
            kind: "min",
            value: BigInt(0),
            inclusive: true,
            message: errorUtil.toString(message),
        });
    }
    multipleOf(value, message) {
        return this._addCheck({
            kind: "multipleOf",
            value,
            message: errorUtil.toString(message),
        });
    }
    get minValue() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min;
    }
    get maxValue() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max;
    }
}
ZodBigInt.create = (params) => {
    var _a;
    return new ZodBigInt({
        checks: [],
        typeName: ZodFirstPartyTypeKind.ZodBigInt,
        coerce: (_a = params === null || params === void 0 ? void 0 : params.coerce) !== null && _a !== void 0 ? _a : false,
        ...processCreateParams(params),
    });
};
class ZodBoolean extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = Boolean(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.boolean) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.boolean,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodBoolean.create = (params) => {
    return new ZodBoolean({
        typeName: ZodFirstPartyTypeKind.ZodBoolean,
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        ...processCreateParams(params),
    });
};
class ZodDate extends ZodType {
    _parse(input) {
        if (this._def.coerce) {
            input.data = new Date(input.data);
        }
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.date) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.date,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (isNaN(input.data.getTime())) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_date,
            });
            return INVALID;
        }
        const status = new ParseStatus();
        let ctx = undefined;
        for (const check of this._def.checks) {
            if (check.kind === "min") {
                if (input.data.getTime() < check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_small,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        minimum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else if (check.kind === "max") {
                if (input.data.getTime() > check.value) {
                    ctx = this._getOrReturnCtx(input, ctx);
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.too_big,
                        message: check.message,
                        inclusive: true,
                        exact: false,
                        maximum: check.value,
                        type: "date",
                    });
                    status.dirty();
                }
            }
            else {
                util.assertNever(check);
            }
        }
        return {
            status: status.value,
            value: new Date(input.data.getTime()),
        };
    }
    _addCheck(check) {
        return new ZodDate({
            ...this._def,
            checks: [...this._def.checks, check],
        });
    }
    min(minDate, message) {
        return this._addCheck({
            kind: "min",
            value: minDate.getTime(),
            message: errorUtil.toString(message),
        });
    }
    max(maxDate, message) {
        return this._addCheck({
            kind: "max",
            value: maxDate.getTime(),
            message: errorUtil.toString(message),
        });
    }
    get minDate() {
        let min = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "min") {
                if (min === null || ch.value > min)
                    min = ch.value;
            }
        }
        return min != null ? new Date(min) : null;
    }
    get maxDate() {
        let max = null;
        for (const ch of this._def.checks) {
            if (ch.kind === "max") {
                if (max === null || ch.value < max)
                    max = ch.value;
            }
        }
        return max != null ? new Date(max) : null;
    }
}
ZodDate.create = (params) => {
    return new ZodDate({
        checks: [],
        coerce: (params === null || params === void 0 ? void 0 : params.coerce) || false,
        typeName: ZodFirstPartyTypeKind.ZodDate,
        ...processCreateParams(params),
    });
};
class ZodSymbol extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.symbol) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.symbol,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodSymbol.create = (params) => {
    return new ZodSymbol({
        typeName: ZodFirstPartyTypeKind.ZodSymbol,
        ...processCreateParams(params),
    });
};
class ZodUndefined extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.undefined,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodUndefined.create = (params) => {
    return new ZodUndefined({
        typeName: ZodFirstPartyTypeKind.ZodUndefined,
        ...processCreateParams(params),
    });
};
class ZodNull extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.null) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.null,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodNull.create = (params) => {
    return new ZodNull({
        typeName: ZodFirstPartyTypeKind.ZodNull,
        ...processCreateParams(params),
    });
};
class ZodAny extends ZodType {
    constructor() {
        super(...arguments);
        // to prevent instances of other classes from extending ZodAny. this causes issues with catchall in ZodObject.
        this._any = true;
    }
    _parse(input) {
        return OK(input.data);
    }
}
ZodAny.create = (params) => {
    return new ZodAny({
        typeName: ZodFirstPartyTypeKind.ZodAny,
        ...processCreateParams(params),
    });
};
class ZodUnknown extends ZodType {
    constructor() {
        super(...arguments);
        // required
        this._unknown = true;
    }
    _parse(input) {
        return OK(input.data);
    }
}
ZodUnknown.create = (params) => {
    return new ZodUnknown({
        typeName: ZodFirstPartyTypeKind.ZodUnknown,
        ...processCreateParams(params),
    });
};
class ZodNever extends ZodType {
    _parse(input) {
        const ctx = this._getOrReturnCtx(input);
        addIssueToContext(ctx, {
            code: ZodIssueCode.invalid_type,
            expected: ZodParsedType.never,
            received: ctx.parsedType,
        });
        return INVALID;
    }
}
ZodNever.create = (params) => {
    return new ZodNever({
        typeName: ZodFirstPartyTypeKind.ZodNever,
        ...processCreateParams(params),
    });
};
class ZodVoid extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.undefined) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.void,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return OK(input.data);
    }
}
ZodVoid.create = (params) => {
    return new ZodVoid({
        typeName: ZodFirstPartyTypeKind.ZodVoid,
        ...processCreateParams(params),
    });
};
class ZodArray extends ZodType {
    _parse(input) {
        const { ctx, status } = this._processInputParams(input);
        const def = this._def;
        if (ctx.parsedType !== ZodParsedType.array) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.array,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (def.exactLength !== null) {
            const tooBig = ctx.data.length > def.exactLength.value;
            const tooSmall = ctx.data.length < def.exactLength.value;
            if (tooBig || tooSmall) {
                addIssueToContext(ctx, {
                    code: tooBig ? ZodIssueCode.too_big : ZodIssueCode.too_small,
                    minimum: (tooSmall ? def.exactLength.value : undefined),
                    maximum: (tooBig ? def.exactLength.value : undefined),
                    type: "array",
                    inclusive: true,
                    exact: true,
                    message: def.exactLength.message,
                });
                status.dirty();
            }
        }
        if (def.minLength !== null) {
            if (ctx.data.length < def.minLength.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_small,
                    minimum: def.minLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.minLength.message,
                });
                status.dirty();
            }
        }
        if (def.maxLength !== null) {
            if (ctx.data.length > def.maxLength.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_big,
                    maximum: def.maxLength.value,
                    type: "array",
                    inclusive: true,
                    exact: false,
                    message: def.maxLength.message,
                });
                status.dirty();
            }
        }
        if (ctx.common.async) {
            return Promise.all([...ctx.data].map((item, i) => {
                return def.type._parseAsync(new ParseInputLazyPath(ctx, item, ctx.path, i));
            })).then((result) => {
                return ParseStatus.mergeArray(status, result);
            });
        }
        const result = [...ctx.data].map((item, i) => {
            return def.type._parseSync(new ParseInputLazyPath(ctx, item, ctx.path, i));
        });
        return ParseStatus.mergeArray(status, result);
    }
    get element() {
        return this._def.type;
    }
    min(minLength, message) {
        return new ZodArray({
            ...this._def,
            minLength: { value: minLength, message: errorUtil.toString(message) },
        });
    }
    max(maxLength, message) {
        return new ZodArray({
            ...this._def,
            maxLength: { value: maxLength, message: errorUtil.toString(message) },
        });
    }
    length(len, message) {
        return new ZodArray({
            ...this._def,
            exactLength: { value: len, message: errorUtil.toString(message) },
        });
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
ZodArray.create = (schema, params) => {
    return new ZodArray({
        type: schema,
        minLength: null,
        maxLength: null,
        exactLength: null,
        typeName: ZodFirstPartyTypeKind.ZodArray,
        ...processCreateParams(params),
    });
};
function deepPartialify(schema) {
    if (schema instanceof ZodObject) {
        const newShape = {};
        for (const key in schema.shape) {
            const fieldSchema = schema.shape[key];
            newShape[key] = ZodOptional.create(deepPartialify(fieldSchema));
        }
        return new ZodObject({
            ...schema._def,
            shape: () => newShape,
        });
    }
    else if (schema instanceof ZodArray) {
        return new ZodArray({
            ...schema._def,
            type: deepPartialify(schema.element),
        });
    }
    else if (schema instanceof ZodOptional) {
        return ZodOptional.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodNullable) {
        return ZodNullable.create(deepPartialify(schema.unwrap()));
    }
    else if (schema instanceof ZodTuple) {
        return ZodTuple.create(schema.items.map((item) => deepPartialify(item)));
    }
    else {
        return schema;
    }
}
class ZodObject extends ZodType {
    constructor() {
        super(...arguments);
        this._cached = null;
        /**
         * @deprecated In most cases, this is no longer needed - unknown properties are now silently stripped.
         * If you want to pass through unknown properties, use `.passthrough()` instead.
         */
        this.nonstrict = this.passthrough;
        // extend<
        //   Augmentation extends ZodRawShape,
        //   NewOutput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
        //       ? Augmentation[k]["_output"]
        //       : k extends keyof Output
        //       ? Output[k]
        //       : never;
        //   }>,
        //   NewInput extends util.flatten<{
        //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
        //       ? Augmentation[k]["_input"]
        //       : k extends keyof Input
        //       ? Input[k]
        //       : never;
        //   }>
        // >(
        //   augmentation: Augmentation
        // ): ZodObject<
        //   extendShape<T, Augmentation>,
        //   UnknownKeys,
        //   Catchall,
        //   NewOutput,
        //   NewInput
        // > {
        //   return new ZodObject({
        //     ...this._def,
        //     shape: () => ({
        //       ...this._def.shape(),
        //       ...augmentation,
        //     }),
        //   }) as any;
        // }
        /**
         * @deprecated Use `.extend` instead
         *  */
        this.augment = this.extend;
    }
    _getCached() {
        if (this._cached !== null)
            return this._cached;
        const shape = this._def.shape();
        const keys = util.objectKeys(shape);
        return (this._cached = { shape, keys });
    }
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.object) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const { status, ctx } = this._processInputParams(input);
        const { shape, keys: shapeKeys } = this._getCached();
        const extraKeys = [];
        if (!(this._def.catchall instanceof ZodNever &&
            this._def.unknownKeys === "strip")) {
            for (const key in ctx.data) {
                if (!shapeKeys.includes(key)) {
                    extraKeys.push(key);
                }
            }
        }
        const pairs = [];
        for (const key of shapeKeys) {
            const keyValidator = shape[key];
            const value = ctx.data[key];
            pairs.push({
                key: { status: "valid", value: key },
                value: keyValidator._parse(new ParseInputLazyPath(ctx, value, ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (this._def.catchall instanceof ZodNever) {
            const unknownKeys = this._def.unknownKeys;
            if (unknownKeys === "passthrough") {
                for (const key of extraKeys) {
                    pairs.push({
                        key: { status: "valid", value: key },
                        value: { status: "valid", value: ctx.data[key] },
                    });
                }
            }
            else if (unknownKeys === "strict") {
                if (extraKeys.length > 0) {
                    addIssueToContext(ctx, {
                        code: ZodIssueCode.unrecognized_keys,
                        keys: extraKeys,
                    });
                    status.dirty();
                }
            }
            else if (unknownKeys === "strip") ;
            else {
                throw new Error(`Internal ZodObject error: invalid unknownKeys value.`);
            }
        }
        else {
            // run catchall validation
            const catchall = this._def.catchall;
            for (const key of extraKeys) {
                const value = ctx.data[key];
                pairs.push({
                    key: { status: "valid", value: key },
                    value: catchall._parse(new ParseInputLazyPath(ctx, value, ctx.path, key) //, ctx.child(key), value, getParsedType(value)
                    ),
                    alwaysSet: key in ctx.data,
                });
            }
        }
        if (ctx.common.async) {
            return Promise.resolve()
                .then(async () => {
                const syncPairs = [];
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    syncPairs.push({
                        key,
                        value,
                        alwaysSet: pair.alwaysSet,
                    });
                }
                return syncPairs;
            })
                .then((syncPairs) => {
                return ParseStatus.mergeObjectSync(status, syncPairs);
            });
        }
        else {
            return ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get shape() {
        return this._def.shape();
    }
    strict(message) {
        errorUtil.errToObj;
        return new ZodObject({
            ...this._def,
            unknownKeys: "strict",
            ...(message !== undefined
                ? {
                    errorMap: (issue, ctx) => {
                        var _a, _b, _c, _d;
                        const defaultError = (_c = (_b = (_a = this._def).errorMap) === null || _b === void 0 ? void 0 : _b.call(_a, issue, ctx).message) !== null && _c !== void 0 ? _c : ctx.defaultError;
                        if (issue.code === "unrecognized_keys")
                            return {
                                message: (_d = errorUtil.errToObj(message).message) !== null && _d !== void 0 ? _d : defaultError,
                            };
                        return {
                            message: defaultError,
                        };
                    },
                }
                : {}),
        });
    }
    strip() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "strip",
        });
    }
    passthrough() {
        return new ZodObject({
            ...this._def,
            unknownKeys: "passthrough",
        });
    }
    // const AugmentFactory =
    //   <Def extends ZodObjectDef>(def: Def) =>
    //   <Augmentation extends ZodRawShape>(
    //     augmentation: Augmentation
    //   ): ZodObject<
    //     extendShape<ReturnType<Def["shape"]>, Augmentation>,
    //     Def["unknownKeys"],
    //     Def["catchall"]
    //   > => {
    //     return new ZodObject({
    //       ...def,
    //       shape: () => ({
    //         ...def.shape(),
    //         ...augmentation,
    //       }),
    //     }) as any;
    //   };
    extend(augmentation) {
        return new ZodObject({
            ...this._def,
            shape: () => ({
                ...this._def.shape(),
                ...augmentation,
            }),
        });
    }
    /**
     * Prior to zod@1.0.12 there was a bug in the
     * inferred type of merged objects. Please
     * upgrade if you are experiencing issues.
     */
    merge(merging) {
        const merged = new ZodObject({
            unknownKeys: merging._def.unknownKeys,
            catchall: merging._def.catchall,
            shape: () => ({
                ...this._def.shape(),
                ...merging._def.shape(),
            }),
            typeName: ZodFirstPartyTypeKind.ZodObject,
        });
        return merged;
    }
    // merge<
    //   Incoming extends AnyZodObject,
    //   Augmentation extends Incoming["shape"],
    //   NewOutput extends {
    //     [k in keyof Augmentation | keyof Output]: k extends keyof Augmentation
    //       ? Augmentation[k]["_output"]
    //       : k extends keyof Output
    //       ? Output[k]
    //       : never;
    //   },
    //   NewInput extends {
    //     [k in keyof Augmentation | keyof Input]: k extends keyof Augmentation
    //       ? Augmentation[k]["_input"]
    //       : k extends keyof Input
    //       ? Input[k]
    //       : never;
    //   }
    // >(
    //   merging: Incoming
    // ): ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"],
    //   NewOutput,
    //   NewInput
    // > {
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    setKey(key, schema) {
        return this.augment({ [key]: schema });
    }
    // merge<Incoming extends AnyZodObject>(
    //   merging: Incoming
    // ): //ZodObject<T & Incoming["_shape"], UnknownKeys, Catchall> = (merging) => {
    // ZodObject<
    //   extendShape<T, ReturnType<Incoming["_def"]["shape"]>>,
    //   Incoming["_def"]["unknownKeys"],
    //   Incoming["_def"]["catchall"]
    // > {
    //   // const mergedShape = objectUtil.mergeShapes(
    //   //   this._def.shape(),
    //   //   merging._def.shape()
    //   // );
    //   const merged: any = new ZodObject({
    //     unknownKeys: merging._def.unknownKeys,
    //     catchall: merging._def.catchall,
    //     shape: () =>
    //       objectUtil.mergeShapes(this._def.shape(), merging._def.shape()),
    //     typeName: ZodFirstPartyTypeKind.ZodObject,
    //   }) as any;
    //   return merged;
    // }
    catchall(index) {
        return new ZodObject({
            ...this._def,
            catchall: index,
        });
    }
    pick(mask) {
        const shape = {};
        util.objectKeys(mask).forEach((key) => {
            if (mask[key] && this.shape[key]) {
                shape[key] = this.shape[key];
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    omit(mask) {
        const shape = {};
        util.objectKeys(this.shape).forEach((key) => {
            if (!mask[key]) {
                shape[key] = this.shape[key];
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => shape,
        });
    }
    /**
     * @deprecated
     */
    deepPartial() {
        return deepPartialify(this);
    }
    partial(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key) => {
            const fieldSchema = this.shape[key];
            if (mask && !mask[key]) {
                newShape[key] = fieldSchema;
            }
            else {
                newShape[key] = fieldSchema.optional();
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    required(mask) {
        const newShape = {};
        util.objectKeys(this.shape).forEach((key) => {
            if (mask && !mask[key]) {
                newShape[key] = this.shape[key];
            }
            else {
                const fieldSchema = this.shape[key];
                let newField = fieldSchema;
                while (newField instanceof ZodOptional) {
                    newField = newField._def.innerType;
                }
                newShape[key] = newField;
            }
        });
        return new ZodObject({
            ...this._def,
            shape: () => newShape,
        });
    }
    keyof() {
        return createZodEnum(util.objectKeys(this.shape));
    }
}
ZodObject.create = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.strictCreate = (shape, params) => {
    return new ZodObject({
        shape: () => shape,
        unknownKeys: "strict",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
ZodObject.lazycreate = (shape, params) => {
    return new ZodObject({
        shape,
        unknownKeys: "strip",
        catchall: ZodNever.create(),
        typeName: ZodFirstPartyTypeKind.ZodObject,
        ...processCreateParams(params),
    });
};
class ZodUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const options = this._def.options;
        function handleResults(results) {
            // return first issue-free validation if it exists
            for (const result of results) {
                if (result.result.status === "valid") {
                    return result.result;
                }
            }
            for (const result of results) {
                if (result.result.status === "dirty") {
                    // add issues from dirty option
                    ctx.common.issues.push(...result.ctx.common.issues);
                    return result.result;
                }
            }
            // return invalid
            const unionErrors = results.map((result) => new ZodError(result.ctx.common.issues));
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union,
                unionErrors,
            });
            return INVALID;
        }
        if (ctx.common.async) {
            return Promise.all(options.map(async (option) => {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                return {
                    result: await option._parseAsync({
                        data: ctx.data,
                        path: ctx.path,
                        parent: childCtx,
                    }),
                    ctx: childCtx,
                };
            })).then(handleResults);
        }
        else {
            let dirty = undefined;
            const issues = [];
            for (const option of options) {
                const childCtx = {
                    ...ctx,
                    common: {
                        ...ctx.common,
                        issues: [],
                    },
                    parent: null,
                };
                const result = option._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: childCtx,
                });
                if (result.status === "valid") {
                    return result;
                }
                else if (result.status === "dirty" && !dirty) {
                    dirty = { result, ctx: childCtx };
                }
                if (childCtx.common.issues.length) {
                    issues.push(childCtx.common.issues);
                }
            }
            if (dirty) {
                ctx.common.issues.push(...dirty.ctx.common.issues);
                return dirty.result;
            }
            const unionErrors = issues.map((issues) => new ZodError(issues));
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union,
                unionErrors,
            });
            return INVALID;
        }
    }
    get options() {
        return this._def.options;
    }
}
ZodUnion.create = (types, params) => {
    return new ZodUnion({
        options: types,
        typeName: ZodFirstPartyTypeKind.ZodUnion,
        ...processCreateParams(params),
    });
};
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
//////////                                 //////////
//////////      ZodDiscriminatedUnion      //////////
//////////                                 //////////
/////////////////////////////////////////////////////
/////////////////////////////////////////////////////
const getDiscriminator = (type) => {
    if (type instanceof ZodLazy) {
        return getDiscriminator(type.schema);
    }
    else if (type instanceof ZodEffects) {
        return getDiscriminator(type.innerType());
    }
    else if (type instanceof ZodLiteral) {
        return [type.value];
    }
    else if (type instanceof ZodEnum) {
        return type.options;
    }
    else if (type instanceof ZodNativeEnum) {
        // eslint-disable-next-line ban/ban
        return util.objectValues(type.enum);
    }
    else if (type instanceof ZodDefault) {
        return getDiscriminator(type._def.innerType);
    }
    else if (type instanceof ZodUndefined) {
        return [undefined];
    }
    else if (type instanceof ZodNull) {
        return [null];
    }
    else if (type instanceof ZodOptional) {
        return [undefined, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodNullable) {
        return [null, ...getDiscriminator(type.unwrap())];
    }
    else if (type instanceof ZodBranded) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodReadonly) {
        return getDiscriminator(type.unwrap());
    }
    else if (type instanceof ZodCatch) {
        return getDiscriminator(type._def.innerType);
    }
    else {
        return [];
    }
};
class ZodDiscriminatedUnion extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const discriminator = this.discriminator;
        const discriminatorValue = ctx.data[discriminator];
        const option = this.optionsMap.get(discriminatorValue);
        if (!option) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_union_discriminator,
                options: Array.from(this.optionsMap.keys()),
                path: [discriminator],
            });
            return INVALID;
        }
        if (ctx.common.async) {
            return option._parseAsync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
        else {
            return option._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
        }
    }
    get discriminator() {
        return this._def.discriminator;
    }
    get options() {
        return this._def.options;
    }
    get optionsMap() {
        return this._def.optionsMap;
    }
    /**
     * The constructor of the discriminated union schema. Its behaviour is very similar to that of the normal z.union() constructor.
     * However, it only allows a union of objects, all of which need to share a discriminator property. This property must
     * have a different value for each object in the union.
     * @param discriminator the name of the discriminator property
     * @param types an array of object schemas
     * @param params
     */
    static create(discriminator, options, params) {
        // Get all the valid discriminator values
        const optionsMap = new Map();
        // try {
        for (const type of options) {
            const discriminatorValues = getDiscriminator(type.shape[discriminator]);
            if (!discriminatorValues.length) {
                throw new Error(`A discriminator value for key \`${discriminator}\` could not be extracted from all schema options`);
            }
            for (const value of discriminatorValues) {
                if (optionsMap.has(value)) {
                    throw new Error(`Discriminator property ${String(discriminator)} has duplicate value ${String(value)}`);
                }
                optionsMap.set(value, type);
            }
        }
        return new ZodDiscriminatedUnion({
            typeName: ZodFirstPartyTypeKind.ZodDiscriminatedUnion,
            discriminator,
            options,
            optionsMap,
            ...processCreateParams(params),
        });
    }
}
function mergeValues(a, b) {
    const aType = getParsedType(a);
    const bType = getParsedType(b);
    if (a === b) {
        return { valid: true, data: a };
    }
    else if (aType === ZodParsedType.object && bType === ZodParsedType.object) {
        const bKeys = util.objectKeys(b);
        const sharedKeys = util
            .objectKeys(a)
            .filter((key) => bKeys.indexOf(key) !== -1);
        const newObj = { ...a, ...b };
        for (const key of sharedKeys) {
            const sharedValue = mergeValues(a[key], b[key]);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newObj[key] = sharedValue.data;
        }
        return { valid: true, data: newObj };
    }
    else if (aType === ZodParsedType.array && bType === ZodParsedType.array) {
        if (a.length !== b.length) {
            return { valid: false };
        }
        const newArray = [];
        for (let index = 0; index < a.length; index++) {
            const itemA = a[index];
            const itemB = b[index];
            const sharedValue = mergeValues(itemA, itemB);
            if (!sharedValue.valid) {
                return { valid: false };
            }
            newArray.push(sharedValue.data);
        }
        return { valid: true, data: newArray };
    }
    else if (aType === ZodParsedType.date &&
        bType === ZodParsedType.date &&
        +a === +b) {
        return { valid: true, data: a };
    }
    else {
        return { valid: false };
    }
}
class ZodIntersection extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const handleParsed = (parsedLeft, parsedRight) => {
            if (isAborted(parsedLeft) || isAborted(parsedRight)) {
                return INVALID;
            }
            const merged = mergeValues(parsedLeft.value, parsedRight.value);
            if (!merged.valid) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.invalid_intersection_types,
                });
                return INVALID;
            }
            if (isDirty(parsedLeft) || isDirty(parsedRight)) {
                status.dirty();
            }
            return { status: status.value, value: merged.data };
        };
        if (ctx.common.async) {
            return Promise.all([
                this._def.left._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
                this._def.right._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                }),
            ]).then(([left, right]) => handleParsed(left, right));
        }
        else {
            return handleParsed(this._def.left._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }), this._def.right._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            }));
        }
    }
}
ZodIntersection.create = (left, right, params) => {
    return new ZodIntersection({
        left: left,
        right: right,
        typeName: ZodFirstPartyTypeKind.ZodIntersection,
        ...processCreateParams(params),
    });
};
class ZodTuple extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.array) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.array,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        if (ctx.data.length < this._def.items.length) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.too_small,
                minimum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            return INVALID;
        }
        const rest = this._def.rest;
        if (!rest && ctx.data.length > this._def.items.length) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.too_big,
                maximum: this._def.items.length,
                inclusive: true,
                exact: false,
                type: "array",
            });
            status.dirty();
        }
        const items = [...ctx.data]
            .map((item, itemIndex) => {
            const schema = this._def.items[itemIndex] || this._def.rest;
            if (!schema)
                return null;
            return schema._parse(new ParseInputLazyPath(ctx, item, ctx.path, itemIndex));
        })
            .filter((x) => !!x); // filter nulls
        if (ctx.common.async) {
            return Promise.all(items).then((results) => {
                return ParseStatus.mergeArray(status, results);
            });
        }
        else {
            return ParseStatus.mergeArray(status, items);
        }
    }
    get items() {
        return this._def.items;
    }
    rest(rest) {
        return new ZodTuple({
            ...this._def,
            rest,
        });
    }
}
ZodTuple.create = (schemas, params) => {
    if (!Array.isArray(schemas)) {
        throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
    }
    return new ZodTuple({
        items: schemas,
        typeName: ZodFirstPartyTypeKind.ZodTuple,
        rest: null,
        ...processCreateParams(params),
    });
};
class ZodRecord extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.object) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.object,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const pairs = [];
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        for (const key in ctx.data) {
            pairs.push({
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, key)),
                value: valueType._parse(new ParseInputLazyPath(ctx, ctx.data[key], ctx.path, key)),
                alwaysSet: key in ctx.data,
            });
        }
        if (ctx.common.async) {
            return ParseStatus.mergeObjectAsync(status, pairs);
        }
        else {
            return ParseStatus.mergeObjectSync(status, pairs);
        }
    }
    get element() {
        return this._def.valueType;
    }
    static create(first, second, third) {
        if (second instanceof ZodType) {
            return new ZodRecord({
                keyType: first,
                valueType: second,
                typeName: ZodFirstPartyTypeKind.ZodRecord,
                ...processCreateParams(third),
            });
        }
        return new ZodRecord({
            keyType: ZodString.create(),
            valueType: first,
            typeName: ZodFirstPartyTypeKind.ZodRecord,
            ...processCreateParams(second),
        });
    }
}
class ZodMap extends ZodType {
    get keySchema() {
        return this._def.keyType;
    }
    get valueSchema() {
        return this._def.valueType;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.map) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.map,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const keyType = this._def.keyType;
        const valueType = this._def.valueType;
        const pairs = [...ctx.data.entries()].map(([key, value], index) => {
            return {
                key: keyType._parse(new ParseInputLazyPath(ctx, key, ctx.path, [index, "key"])),
                value: valueType._parse(new ParseInputLazyPath(ctx, value, ctx.path, [index, "value"])),
            };
        });
        if (ctx.common.async) {
            const finalMap = new Map();
            return Promise.resolve().then(async () => {
                for (const pair of pairs) {
                    const key = await pair.key;
                    const value = await pair.value;
                    if (key.status === "aborted" || value.status === "aborted") {
                        return INVALID;
                    }
                    if (key.status === "dirty" || value.status === "dirty") {
                        status.dirty();
                    }
                    finalMap.set(key.value, value.value);
                }
                return { status: status.value, value: finalMap };
            });
        }
        else {
            const finalMap = new Map();
            for (const pair of pairs) {
                const key = pair.key;
                const value = pair.value;
                if (key.status === "aborted" || value.status === "aborted") {
                    return INVALID;
                }
                if (key.status === "dirty" || value.status === "dirty") {
                    status.dirty();
                }
                finalMap.set(key.value, value.value);
            }
            return { status: status.value, value: finalMap };
        }
    }
}
ZodMap.create = (keyType, valueType, params) => {
    return new ZodMap({
        valueType,
        keyType,
        typeName: ZodFirstPartyTypeKind.ZodMap,
        ...processCreateParams(params),
    });
};
class ZodSet extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.set) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.set,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const def = this._def;
        if (def.minSize !== null) {
            if (ctx.data.size < def.minSize.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_small,
                    minimum: def.minSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.minSize.message,
                });
                status.dirty();
            }
        }
        if (def.maxSize !== null) {
            if (ctx.data.size > def.maxSize.value) {
                addIssueToContext(ctx, {
                    code: ZodIssueCode.too_big,
                    maximum: def.maxSize.value,
                    type: "set",
                    inclusive: true,
                    exact: false,
                    message: def.maxSize.message,
                });
                status.dirty();
            }
        }
        const valueType = this._def.valueType;
        function finalizeSet(elements) {
            const parsedSet = new Set();
            for (const element of elements) {
                if (element.status === "aborted")
                    return INVALID;
                if (element.status === "dirty")
                    status.dirty();
                parsedSet.add(element.value);
            }
            return { status: status.value, value: parsedSet };
        }
        const elements = [...ctx.data.values()].map((item, i) => valueType._parse(new ParseInputLazyPath(ctx, item, ctx.path, i)));
        if (ctx.common.async) {
            return Promise.all(elements).then((elements) => finalizeSet(elements));
        }
        else {
            return finalizeSet(elements);
        }
    }
    min(minSize, message) {
        return new ZodSet({
            ...this._def,
            minSize: { value: minSize, message: errorUtil.toString(message) },
        });
    }
    max(maxSize, message) {
        return new ZodSet({
            ...this._def,
            maxSize: { value: maxSize, message: errorUtil.toString(message) },
        });
    }
    size(size, message) {
        return this.min(size, message).max(size, message);
    }
    nonempty(message) {
        return this.min(1, message);
    }
}
ZodSet.create = (valueType, params) => {
    return new ZodSet({
        valueType,
        minSize: null,
        maxSize: null,
        typeName: ZodFirstPartyTypeKind.ZodSet,
        ...processCreateParams(params),
    });
};
class ZodFunction extends ZodType {
    constructor() {
        super(...arguments);
        this.validate = this.implement;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.function) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.function,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        function makeArgsIssue(args, error) {
            return makeIssue({
                data: args,
                path: ctx.path,
                errorMaps: [
                    ctx.common.contextualErrorMap,
                    ctx.schemaErrorMap,
                    getErrorMap(),
                    errorMap,
                ].filter((x) => !!x),
                issueData: {
                    code: ZodIssueCode.invalid_arguments,
                    argumentsError: error,
                },
            });
        }
        function makeReturnsIssue(returns, error) {
            return makeIssue({
                data: returns,
                path: ctx.path,
                errorMaps: [
                    ctx.common.contextualErrorMap,
                    ctx.schemaErrorMap,
                    getErrorMap(),
                    errorMap,
                ].filter((x) => !!x),
                issueData: {
                    code: ZodIssueCode.invalid_return_type,
                    returnTypeError: error,
                },
            });
        }
        const params = { errorMap: ctx.common.contextualErrorMap };
        const fn = ctx.data;
        if (this._def.returns instanceof ZodPromise) {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return OK(async function (...args) {
                const error = new ZodError([]);
                const parsedArgs = await me._def.args
                    .parseAsync(args, params)
                    .catch((e) => {
                    error.addIssue(makeArgsIssue(args, e));
                    throw error;
                });
                const result = await Reflect.apply(fn, this, parsedArgs);
                const parsedReturns = await me._def.returns._def.type
                    .parseAsync(result, params)
                    .catch((e) => {
                    error.addIssue(makeReturnsIssue(result, e));
                    throw error;
                });
                return parsedReturns;
            });
        }
        else {
            // Would love a way to avoid disabling this rule, but we need
            // an alias (using an arrow function was what caused 2651).
            // eslint-disable-next-line @typescript-eslint/no-this-alias
            const me = this;
            return OK(function (...args) {
                const parsedArgs = me._def.args.safeParse(args, params);
                if (!parsedArgs.success) {
                    throw new ZodError([makeArgsIssue(args, parsedArgs.error)]);
                }
                const result = Reflect.apply(fn, this, parsedArgs.data);
                const parsedReturns = me._def.returns.safeParse(result, params);
                if (!parsedReturns.success) {
                    throw new ZodError([makeReturnsIssue(result, parsedReturns.error)]);
                }
                return parsedReturns.data;
            });
        }
    }
    parameters() {
        return this._def.args;
    }
    returnType() {
        return this._def.returns;
    }
    args(...items) {
        return new ZodFunction({
            ...this._def,
            args: ZodTuple.create(items).rest(ZodUnknown.create()),
        });
    }
    returns(returnType) {
        return new ZodFunction({
            ...this._def,
            returns: returnType,
        });
    }
    implement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    strictImplement(func) {
        const validatedFunc = this.parse(func);
        return validatedFunc;
    }
    static create(args, returns, params) {
        return new ZodFunction({
            args: (args
                ? args
                : ZodTuple.create([]).rest(ZodUnknown.create())),
            returns: returns || ZodUnknown.create(),
            typeName: ZodFirstPartyTypeKind.ZodFunction,
            ...processCreateParams(params),
        });
    }
}
class ZodLazy extends ZodType {
    get schema() {
        return this._def.getter();
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const lazySchema = this._def.getter();
        return lazySchema._parse({ data: ctx.data, path: ctx.path, parent: ctx });
    }
}
ZodLazy.create = (getter, params) => {
    return new ZodLazy({
        getter: getter,
        typeName: ZodFirstPartyTypeKind.ZodLazy,
        ...processCreateParams(params),
    });
};
class ZodLiteral extends ZodType {
    _parse(input) {
        if (input.data !== this._def.value) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodIssueCode.invalid_literal,
                expected: this._def.value,
            });
            return INVALID;
        }
        return { status: "valid", value: input.data };
    }
    get value() {
        return this._def.value;
    }
}
ZodLiteral.create = (value, params) => {
    return new ZodLiteral({
        value: value,
        typeName: ZodFirstPartyTypeKind.ZodLiteral,
        ...processCreateParams(params),
    });
};
function createZodEnum(values, params) {
    return new ZodEnum({
        values,
        typeName: ZodFirstPartyTypeKind.ZodEnum,
        ...processCreateParams(params),
    });
}
class ZodEnum extends ZodType {
    constructor() {
        super(...arguments);
        _ZodEnum_cache.set(this, void 0);
    }
    _parse(input) {
        if (typeof input.data !== "string") {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            addIssueToContext(ctx, {
                expected: util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodIssueCode.invalid_type,
            });
            return INVALID;
        }
        if (!__classPrivateFieldGet(this, _ZodEnum_cache)) {
            __classPrivateFieldSet(this, _ZodEnum_cache, new Set(this._def.values));
        }
        if (!__classPrivateFieldGet(this, _ZodEnum_cache).has(input.data)) {
            const ctx = this._getOrReturnCtx(input);
            const expectedValues = this._def.values;
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return INVALID;
        }
        return OK(input.data);
    }
    get options() {
        return this._def.values;
    }
    get enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Values() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    get Enum() {
        const enumValues = {};
        for (const val of this._def.values) {
            enumValues[val] = val;
        }
        return enumValues;
    }
    extract(values, newDef = this._def) {
        return ZodEnum.create(values, {
            ...this._def,
            ...newDef,
        });
    }
    exclude(values, newDef = this._def) {
        return ZodEnum.create(this.options.filter((opt) => !values.includes(opt)), {
            ...this._def,
            ...newDef,
        });
    }
}
_ZodEnum_cache = new WeakMap();
ZodEnum.create = createZodEnum;
class ZodNativeEnum extends ZodType {
    constructor() {
        super(...arguments);
        _ZodNativeEnum_cache.set(this, void 0);
    }
    _parse(input) {
        const nativeEnumValues = util.getValidEnumValues(this._def.values);
        const ctx = this._getOrReturnCtx(input);
        if (ctx.parsedType !== ZodParsedType.string &&
            ctx.parsedType !== ZodParsedType.number) {
            const expectedValues = util.objectValues(nativeEnumValues);
            addIssueToContext(ctx, {
                expected: util.joinValues(expectedValues),
                received: ctx.parsedType,
                code: ZodIssueCode.invalid_type,
            });
            return INVALID;
        }
        if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache)) {
            __classPrivateFieldSet(this, _ZodNativeEnum_cache, new Set(util.getValidEnumValues(this._def.values)));
        }
        if (!__classPrivateFieldGet(this, _ZodNativeEnum_cache).has(input.data)) {
            const expectedValues = util.objectValues(nativeEnumValues);
            addIssueToContext(ctx, {
                received: ctx.data,
                code: ZodIssueCode.invalid_enum_value,
                options: expectedValues,
            });
            return INVALID;
        }
        return OK(input.data);
    }
    get enum() {
        return this._def.values;
    }
}
_ZodNativeEnum_cache = new WeakMap();
ZodNativeEnum.create = (values, params) => {
    return new ZodNativeEnum({
        values: values,
        typeName: ZodFirstPartyTypeKind.ZodNativeEnum,
        ...processCreateParams(params),
    });
};
class ZodPromise extends ZodType {
    unwrap() {
        return this._def.type;
    }
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        if (ctx.parsedType !== ZodParsedType.promise &&
            ctx.common.async === false) {
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.promise,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        const promisified = ctx.parsedType === ZodParsedType.promise
            ? ctx.data
            : Promise.resolve(ctx.data);
        return OK(promisified.then((data) => {
            return this._def.type.parseAsync(data, {
                path: ctx.path,
                errorMap: ctx.common.contextualErrorMap,
            });
        }));
    }
}
ZodPromise.create = (schema, params) => {
    return new ZodPromise({
        type: schema,
        typeName: ZodFirstPartyTypeKind.ZodPromise,
        ...processCreateParams(params),
    });
};
class ZodEffects extends ZodType {
    innerType() {
        return this._def.schema;
    }
    sourceType() {
        return this._def.schema._def.typeName === ZodFirstPartyTypeKind.ZodEffects
            ? this._def.schema.sourceType()
            : this._def.schema;
    }
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        const effect = this._def.effect || null;
        const checkCtx = {
            addIssue: (arg) => {
                addIssueToContext(ctx, arg);
                if (arg.fatal) {
                    status.abort();
                }
                else {
                    status.dirty();
                }
            },
            get path() {
                return ctx.path;
            },
        };
        checkCtx.addIssue = checkCtx.addIssue.bind(checkCtx);
        if (effect.type === "preprocess") {
            const processed = effect.transform(ctx.data, checkCtx);
            if (ctx.common.async) {
                return Promise.resolve(processed).then(async (processed) => {
                    if (status.value === "aborted")
                        return INVALID;
                    const result = await this._def.schema._parseAsync({
                        data: processed,
                        path: ctx.path,
                        parent: ctx,
                    });
                    if (result.status === "aborted")
                        return INVALID;
                    if (result.status === "dirty")
                        return DIRTY(result.value);
                    if (status.value === "dirty")
                        return DIRTY(result.value);
                    return result;
                });
            }
            else {
                if (status.value === "aborted")
                    return INVALID;
                const result = this._def.schema._parseSync({
                    data: processed,
                    path: ctx.path,
                    parent: ctx,
                });
                if (result.status === "aborted")
                    return INVALID;
                if (result.status === "dirty")
                    return DIRTY(result.value);
                if (status.value === "dirty")
                    return DIRTY(result.value);
                return result;
            }
        }
        if (effect.type === "refinement") {
            const executeRefinement = (acc) => {
                const result = effect.refinement(acc, checkCtx);
                if (ctx.common.async) {
                    return Promise.resolve(result);
                }
                if (result instanceof Promise) {
                    throw new Error("Async refinement encountered during synchronous parse operation. Use .parseAsync instead.");
                }
                return acc;
            };
            if (ctx.common.async === false) {
                const inner = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inner.status === "aborted")
                    return INVALID;
                if (inner.status === "dirty")
                    status.dirty();
                // return value is ignored
                executeRefinement(inner.value);
                return { status: status.value, value: inner.value };
            }
            else {
                return this._def.schema
                    ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
                    .then((inner) => {
                    if (inner.status === "aborted")
                        return INVALID;
                    if (inner.status === "dirty")
                        status.dirty();
                    return executeRefinement(inner.value).then(() => {
                        return { status: status.value, value: inner.value };
                    });
                });
            }
        }
        if (effect.type === "transform") {
            if (ctx.common.async === false) {
                const base = this._def.schema._parseSync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (!isValid(base))
                    return base;
                const result = effect.transform(base.value, checkCtx);
                if (result instanceof Promise) {
                    throw new Error(`Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.`);
                }
                return { status: status.value, value: result };
            }
            else {
                return this._def.schema
                    ._parseAsync({ data: ctx.data, path: ctx.path, parent: ctx })
                    .then((base) => {
                    if (!isValid(base))
                        return base;
                    return Promise.resolve(effect.transform(base.value, checkCtx)).then((result) => ({ status: status.value, value: result }));
                });
            }
        }
        util.assertNever(effect);
    }
}
ZodEffects.create = (schema, effect, params) => {
    return new ZodEffects({
        schema,
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        effect,
        ...processCreateParams(params),
    });
};
ZodEffects.createWithPreprocess = (preprocess, schema, params) => {
    return new ZodEffects({
        schema,
        effect: { type: "preprocess", transform: preprocess },
        typeName: ZodFirstPartyTypeKind.ZodEffects,
        ...processCreateParams(params),
    });
};
class ZodOptional extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.undefined) {
            return OK(undefined);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodOptional.create = (type, params) => {
    return new ZodOptional({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodOptional,
        ...processCreateParams(params),
    });
};
class ZodNullable extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType === ZodParsedType.null) {
            return OK(null);
        }
        return this._def.innerType._parse(input);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodNullable.create = (type, params) => {
    return new ZodNullable({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodNullable,
        ...processCreateParams(params),
    });
};
class ZodDefault extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        let data = ctx.data;
        if (ctx.parsedType === ZodParsedType.undefined) {
            data = this._def.defaultValue();
        }
        return this._def.innerType._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    removeDefault() {
        return this._def.innerType;
    }
}
ZodDefault.create = (type, params) => {
    return new ZodDefault({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodDefault,
        defaultValue: typeof params.default === "function"
            ? params.default
            : () => params.default,
        ...processCreateParams(params),
    });
};
class ZodCatch extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        // newCtx is used to not collect issues from inner types in ctx
        const newCtx = {
            ...ctx,
            common: {
                ...ctx.common,
                issues: [],
            },
        };
        const result = this._def.innerType._parse({
            data: newCtx.data,
            path: newCtx.path,
            parent: {
                ...newCtx,
            },
        });
        if (isAsync(result)) {
            return result.then((result) => {
                return {
                    status: "valid",
                    value: result.status === "valid"
                        ? result.value
                        : this._def.catchValue({
                            get error() {
                                return new ZodError(newCtx.common.issues);
                            },
                            input: newCtx.data,
                        }),
                };
            });
        }
        else {
            return {
                status: "valid",
                value: result.status === "valid"
                    ? result.value
                    : this._def.catchValue({
                        get error() {
                            return new ZodError(newCtx.common.issues);
                        },
                        input: newCtx.data,
                    }),
            };
        }
    }
    removeCatch() {
        return this._def.innerType;
    }
}
ZodCatch.create = (type, params) => {
    return new ZodCatch({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodCatch,
        catchValue: typeof params.catch === "function" ? params.catch : () => params.catch,
        ...processCreateParams(params),
    });
};
class ZodNaN extends ZodType {
    _parse(input) {
        const parsedType = this._getType(input);
        if (parsedType !== ZodParsedType.nan) {
            const ctx = this._getOrReturnCtx(input);
            addIssueToContext(ctx, {
                code: ZodIssueCode.invalid_type,
                expected: ZodParsedType.nan,
                received: ctx.parsedType,
            });
            return INVALID;
        }
        return { status: "valid", value: input.data };
    }
}
ZodNaN.create = (params) => {
    return new ZodNaN({
        typeName: ZodFirstPartyTypeKind.ZodNaN,
        ...processCreateParams(params),
    });
};
const BRAND = Symbol("zod_brand");
class ZodBranded extends ZodType {
    _parse(input) {
        const { ctx } = this._processInputParams(input);
        const data = ctx.data;
        return this._def.type._parse({
            data,
            path: ctx.path,
            parent: ctx,
        });
    }
    unwrap() {
        return this._def.type;
    }
}
class ZodPipeline extends ZodType {
    _parse(input) {
        const { status, ctx } = this._processInputParams(input);
        if (ctx.common.async) {
            const handleAsync = async () => {
                const inResult = await this._def.in._parseAsync({
                    data: ctx.data,
                    path: ctx.path,
                    parent: ctx,
                });
                if (inResult.status === "aborted")
                    return INVALID;
                if (inResult.status === "dirty") {
                    status.dirty();
                    return DIRTY(inResult.value);
                }
                else {
                    return this._def.out._parseAsync({
                        data: inResult.value,
                        path: ctx.path,
                        parent: ctx,
                    });
                }
            };
            return handleAsync();
        }
        else {
            const inResult = this._def.in._parseSync({
                data: ctx.data,
                path: ctx.path,
                parent: ctx,
            });
            if (inResult.status === "aborted")
                return INVALID;
            if (inResult.status === "dirty") {
                status.dirty();
                return {
                    status: "dirty",
                    value: inResult.value,
                };
            }
            else {
                return this._def.out._parseSync({
                    data: inResult.value,
                    path: ctx.path,
                    parent: ctx,
                });
            }
        }
    }
    static create(a, b) {
        return new ZodPipeline({
            in: a,
            out: b,
            typeName: ZodFirstPartyTypeKind.ZodPipeline,
        });
    }
}
class ZodReadonly extends ZodType {
    _parse(input) {
        const result = this._def.innerType._parse(input);
        const freeze = (data) => {
            if (isValid(data)) {
                data.value = Object.freeze(data.value);
            }
            return data;
        };
        return isAsync(result)
            ? result.then((data) => freeze(data))
            : freeze(result);
    }
    unwrap() {
        return this._def.innerType;
    }
}
ZodReadonly.create = (type, params) => {
    return new ZodReadonly({
        innerType: type,
        typeName: ZodFirstPartyTypeKind.ZodReadonly,
        ...processCreateParams(params),
    });
};
function custom(check, params = {}, 
/**
 * @deprecated
 *
 * Pass `fatal` into the params object instead:
 *
 * ```ts
 * z.string().custom((val) => val.length > 5, { fatal: false })
 * ```
 *
 */
fatal) {
    if (check)
        return ZodAny.create().superRefine((data, ctx) => {
            var _a, _b;
            if (!check(data)) {
                const p = typeof params === "function"
                    ? params(data)
                    : typeof params === "string"
                        ? { message: params }
                        : params;
                const _fatal = (_b = (_a = p.fatal) !== null && _a !== void 0 ? _a : fatal) !== null && _b !== void 0 ? _b : true;
                const p2 = typeof p === "string" ? { message: p } : p;
                ctx.addIssue({ code: "custom", ...p2, fatal: _fatal });
            }
        });
    return ZodAny.create();
}
const late = {
    object: ZodObject.lazycreate,
};
var ZodFirstPartyTypeKind;
(function (ZodFirstPartyTypeKind) {
    ZodFirstPartyTypeKind["ZodString"] = "ZodString";
    ZodFirstPartyTypeKind["ZodNumber"] = "ZodNumber";
    ZodFirstPartyTypeKind["ZodNaN"] = "ZodNaN";
    ZodFirstPartyTypeKind["ZodBigInt"] = "ZodBigInt";
    ZodFirstPartyTypeKind["ZodBoolean"] = "ZodBoolean";
    ZodFirstPartyTypeKind["ZodDate"] = "ZodDate";
    ZodFirstPartyTypeKind["ZodSymbol"] = "ZodSymbol";
    ZodFirstPartyTypeKind["ZodUndefined"] = "ZodUndefined";
    ZodFirstPartyTypeKind["ZodNull"] = "ZodNull";
    ZodFirstPartyTypeKind["ZodAny"] = "ZodAny";
    ZodFirstPartyTypeKind["ZodUnknown"] = "ZodUnknown";
    ZodFirstPartyTypeKind["ZodNever"] = "ZodNever";
    ZodFirstPartyTypeKind["ZodVoid"] = "ZodVoid";
    ZodFirstPartyTypeKind["ZodArray"] = "ZodArray";
    ZodFirstPartyTypeKind["ZodObject"] = "ZodObject";
    ZodFirstPartyTypeKind["ZodUnion"] = "ZodUnion";
    ZodFirstPartyTypeKind["ZodDiscriminatedUnion"] = "ZodDiscriminatedUnion";
    ZodFirstPartyTypeKind["ZodIntersection"] = "ZodIntersection";
    ZodFirstPartyTypeKind["ZodTuple"] = "ZodTuple";
    ZodFirstPartyTypeKind["ZodRecord"] = "ZodRecord";
    ZodFirstPartyTypeKind["ZodMap"] = "ZodMap";
    ZodFirstPartyTypeKind["ZodSet"] = "ZodSet";
    ZodFirstPartyTypeKind["ZodFunction"] = "ZodFunction";
    ZodFirstPartyTypeKind["ZodLazy"] = "ZodLazy";
    ZodFirstPartyTypeKind["ZodLiteral"] = "ZodLiteral";
    ZodFirstPartyTypeKind["ZodEnum"] = "ZodEnum";
    ZodFirstPartyTypeKind["ZodEffects"] = "ZodEffects";
    ZodFirstPartyTypeKind["ZodNativeEnum"] = "ZodNativeEnum";
    ZodFirstPartyTypeKind["ZodOptional"] = "ZodOptional";
    ZodFirstPartyTypeKind["ZodNullable"] = "ZodNullable";
    ZodFirstPartyTypeKind["ZodDefault"] = "ZodDefault";
    ZodFirstPartyTypeKind["ZodCatch"] = "ZodCatch";
    ZodFirstPartyTypeKind["ZodPromise"] = "ZodPromise";
    ZodFirstPartyTypeKind["ZodBranded"] = "ZodBranded";
    ZodFirstPartyTypeKind["ZodPipeline"] = "ZodPipeline";
    ZodFirstPartyTypeKind["ZodReadonly"] = "ZodReadonly";
})(ZodFirstPartyTypeKind || (ZodFirstPartyTypeKind = {}));
const instanceOfType = (
// const instanceOfType = <T extends new (...args: any[]) => any>(
cls, params = {
    message: `Input not instance of ${cls.name}`,
}) => custom((data) => data instanceof cls, params);
const stringType = ZodString.create;
const numberType = ZodNumber.create;
const nanType = ZodNaN.create;
const bigIntType = ZodBigInt.create;
const booleanType = ZodBoolean.create;
const dateType = ZodDate.create;
const symbolType = ZodSymbol.create;
const undefinedType = ZodUndefined.create;
const nullType = ZodNull.create;
const anyType = ZodAny.create;
const unknownType = ZodUnknown.create;
const neverType = ZodNever.create;
const voidType = ZodVoid.create;
const arrayType = ZodArray.create;
const objectType = ZodObject.create;
const strictObjectType = ZodObject.strictCreate;
const unionType = ZodUnion.create;
const discriminatedUnionType = ZodDiscriminatedUnion.create;
const intersectionType = ZodIntersection.create;
const tupleType = ZodTuple.create;
const recordType = ZodRecord.create;
const mapType = ZodMap.create;
const setType = ZodSet.create;
const functionType = ZodFunction.create;
const lazyType = ZodLazy.create;
const literalType = ZodLiteral.create;
const enumType = ZodEnum.create;
const nativeEnumType = ZodNativeEnum.create;
const promiseType = ZodPromise.create;
const effectsType = ZodEffects.create;
const optionalType = ZodOptional.create;
const nullableType = ZodNullable.create;
const preprocessType = ZodEffects.createWithPreprocess;
const pipelineType = ZodPipeline.create;
const ostring = () => stringType().optional();
const onumber = () => numberType().optional();
const oboolean = () => booleanType().optional();
const coerce = {
    string: ((arg) => ZodString.create({ ...arg, coerce: true })),
    number: ((arg) => ZodNumber.create({ ...arg, coerce: true })),
    boolean: ((arg) => ZodBoolean.create({
        ...arg,
        coerce: true,
    })),
    bigint: ((arg) => ZodBigInt.create({ ...arg, coerce: true })),
    date: ((arg) => ZodDate.create({ ...arg, coerce: true })),
};
const NEVER = INVALID;

var z = /*#__PURE__*/Object.freeze({
    __proto__: null,
    defaultErrorMap: errorMap,
    setErrorMap: setErrorMap,
    getErrorMap: getErrorMap,
    makeIssue: makeIssue,
    EMPTY_PATH: EMPTY_PATH,
    addIssueToContext: addIssueToContext,
    ParseStatus: ParseStatus,
    INVALID: INVALID,
    DIRTY: DIRTY,
    OK: OK,
    isAborted: isAborted,
    isDirty: isDirty,
    isValid: isValid,
    isAsync: isAsync,
    get util () { return util; },
    get objectUtil () { return objectUtil; },
    ZodParsedType: ZodParsedType,
    getParsedType: getParsedType,
    ZodType: ZodType,
    datetimeRegex: datetimeRegex,
    ZodString: ZodString,
    ZodNumber: ZodNumber,
    ZodBigInt: ZodBigInt,
    ZodBoolean: ZodBoolean,
    ZodDate: ZodDate,
    ZodSymbol: ZodSymbol,
    ZodUndefined: ZodUndefined,
    ZodNull: ZodNull,
    ZodAny: ZodAny,
    ZodUnknown: ZodUnknown,
    ZodNever: ZodNever,
    ZodVoid: ZodVoid,
    ZodArray: ZodArray,
    ZodObject: ZodObject,
    ZodUnion: ZodUnion,
    ZodDiscriminatedUnion: ZodDiscriminatedUnion,
    ZodIntersection: ZodIntersection,
    ZodTuple: ZodTuple,
    ZodRecord: ZodRecord,
    ZodMap: ZodMap,
    ZodSet: ZodSet,
    ZodFunction: ZodFunction,
    ZodLazy: ZodLazy,
    ZodLiteral: ZodLiteral,
    ZodEnum: ZodEnum,
    ZodNativeEnum: ZodNativeEnum,
    ZodPromise: ZodPromise,
    ZodEffects: ZodEffects,
    ZodTransformer: ZodEffects,
    ZodOptional: ZodOptional,
    ZodNullable: ZodNullable,
    ZodDefault: ZodDefault,
    ZodCatch: ZodCatch,
    ZodNaN: ZodNaN,
    BRAND: BRAND,
    ZodBranded: ZodBranded,
    ZodPipeline: ZodPipeline,
    ZodReadonly: ZodReadonly,
    custom: custom,
    Schema: ZodType,
    ZodSchema: ZodType,
    late: late,
    get ZodFirstPartyTypeKind () { return ZodFirstPartyTypeKind; },
    coerce: coerce,
    any: anyType,
    array: arrayType,
    bigint: bigIntType,
    boolean: booleanType,
    date: dateType,
    discriminatedUnion: discriminatedUnionType,
    effect: effectsType,
    'enum': enumType,
    'function': functionType,
    'instanceof': instanceOfType,
    intersection: intersectionType,
    lazy: lazyType,
    literal: literalType,
    map: mapType,
    nan: nanType,
    nativeEnum: nativeEnumType,
    never: neverType,
    'null': nullType,
    nullable: nullableType,
    number: numberType,
    object: objectType,
    oboolean: oboolean,
    onumber: onumber,
    optional: optionalType,
    ostring: ostring,
    pipeline: pipelineType,
    preprocess: preprocessType,
    promise: promiseType,
    record: recordType,
    set: setType,
    strictObject: strictObjectType,
    string: stringType,
    symbol: symbolType,
    transformer: effectsType,
    tuple: tupleType,
    'undefined': undefinedType,
    union: unionType,
    unknown: unknownType,
    'void': voidType,
    NEVER: NEVER,
    ZodIssueCode: ZodIssueCode,
    quotelessJson: quotelessJson,
    ZodError: ZodError
});

/**
 *
 * @private
 * @param {any} a
 */
function isObject(a) {
    if (typeof a !== 'object' || a instanceof Array) {
        return false;
    }
    else {
        return true;
    }
}
class Config {
    filterOutNonSupportedKeys(userProvidedConfig, validKeys) {
        const obj = Object.create({});
        if (isObject(userProvidedConfig)) {
            Object.keys(userProvidedConfig).forEach((key) => {
                if (validKeys.indexOf(key) >= 0) {
                    obj[key] = userProvidedConfig[key];
                }
                else {
                    console.warn('Warning - unsupported key provided to configuration: ', key);
                }
            });
            return obj;
        }
        else {
            return Object.create({});
        }
    }
}

/**
 * This file is for internal constants only.
 * It is not intended for public use and is not part of the public API
 */
/**
 * @private
 */
const ALLOWED_URL_CONFIG = [
    'cname',
    'secureDistribution',
    'privateCdn',
    'signUrl',
    'longUrlSignature',
    'shorten',
    'useRootPath',
    'secure',
    'forceVersion',
    'analytics',
    'queryParams'
];

class URLConfig extends Config {
    /**
     * @param {IURLConfig} userURLConfig
     */
    constructor(userURLConfig) {
        super();
        const urlConfig = this.filterOutNonSupportedKeys(userURLConfig, ALLOWED_URL_CONFIG);
        Object.assign(this, {
            secure: true
        }, urlConfig);
    }
    extend(userURLConfig) {
        const urlConfig = this.filterOutNonSupportedKeys(userURLConfig, ALLOWED_URL_CONFIG);
        return new URLConfig(Object.assign({}, this, urlConfig));
    }
    /**
     * @param {string} value Sets the cname
     */
    setCname(value) {
        this.cname = value;
        return this;
    }
    /**
     * @param {string} value Sets the secureDistribution
     */
    setSecureDistribution(value) {
        this.secureDistribution = value;
        return this;
    }
    /**
     * @param {boolean} value Sets whether to use a private CDN (Removes cloudName from URL)
     */
    setPrivateCdn(value) {
        this.privateCdn = value;
        return this;
    }
    /**
     * @param value Sets whether or not to sign the URL
     */
    setSignUrl(value) {
        this.signUrl = value;
        return this;
    }
    /**
     * @param value Sets whether or not to use a long signature
     */
    setLongUrlSignature(value) {
        this.longUrlSignature = value;
        return this;
    }
    /**
     * @param value Sets whether or not to shorten the URL
     */
    setShorten(value) {
        this.shorten = value;
        return this;
    }
    /**
     * @param value Sets whether or not to use a root path
     */
    setUseRootPath(value) {
        this.useRootPath = value;
        return this;
    }
    /**
     * @param value Sets whether or not to deliver the asset through https
     */
    setSecure(value) {
        this.secure = value;
        return this;
    }
    /**
     * @param value Sets whether to force a version in the URL
     */
    setForceVersion(value) {
        this.forceVersion = value;
        return this;
    }
    /**
     * @param params Sets additional params
     */
    setQueryParams(params) {
        this.queryParams = params;
        return this;
    }
}

/**
 * @summary SDK
 * @memberOf SDK
 */
class QualifierValue {
    /**
     *
     * @param {QualifierValue | QualifierValue[] | any[] | string | number}qualifierValue
     */
    constructor(qualifierValue) {
        this.values = [];
        this.delimiter = ':'; // {value}{delimiter}{value}...
        if (this.hasValue(qualifierValue)) {
            this.addValue(qualifierValue);
        }
    }
    /**
     * @description Joins the provided values with the provided delimiter
     */
    toString() {
        return this.values.join(this.delimiter);
    }
    /**
     * @description Checks if the provided argument has a value
     * @param {any} v
     * @private
     * @return {boolean}
     */
    hasValue(v) {
        return typeof v !== 'undefined' && v !== null && v !== '';
    }
    /**
     * @desc Adds a value for the this qualifier instance
     * @param {any} value
     * @return {this}
     */
    addValue(value) {
        // Append value or array of values
        if (Array.isArray(value)) {
            this.values = this.values.concat(value);
        }
        else {
            this.values.push(value);
        }
        // Remove falsy values
        this.values = this.values.filter((v) => this.hasValue(v));
        return this;
    }
    /**
     * @description Sets the delimiter for this instance
     * @param delimiter
     */
    setDelimiter(delimiter) {
        this.delimiter = delimiter;
        return this;
    }
}

class UnsupportedError extends Error {
    constructor(message = 'Unsupported') {
        super(message);
    }
}
/**
 * Creates a new UnsupportedError
 * @param message
 */
function createUnsupportedError(message) {
    return new UnsupportedError(message);
}

/**
 * Returns the action's model
 */
function qualifierToJson() {
    return this._qualifierModel || { error: createUnsupportedError(`unsupported qualifier ${this.constructor.name}`) };
}

class QualifierModel {
    constructor() {
        this._qualifierModel = {};
    }
    toJson() {
        return qualifierToJson.apply(this);
    }
}

/**
 * @summary SDK
 * @memberOf SDK
 */
class Qualifier extends QualifierModel {
    constructor(key, qualifierValue) {
        super();
        this.delimiter = '_'; // {key}{delimiter}{qualifierValue}
        this.key = key;
        if (qualifierValue instanceof QualifierValue) {
            this.qualifierValue = qualifierValue;
        }
        else {
            this.qualifierValue = new QualifierValue();
            this.qualifierValue.addValue(qualifierValue);
        }
    }
    toString() {
        const { key, delimiter, qualifierValue } = this;
        return `${key}${delimiter}${qualifierValue.toString()}`;
    }
    addValue(value) {
        this.qualifierValue.addValue(value);
        return this;
    }
}

/**
 * @memberOf Qualifiers.Flag
 * @extends {SDK.Qualifier}
 * @description the FlagQualifier class
 */
class FlagQualifier extends Qualifier {
    constructor(flagType, flagValue) {
        let qualifierValue;
        if (flagValue) {
            qualifierValue = new QualifierValue([flagType, `${flagValue}`]).setDelimiter(':');
        }
        else {
            qualifierValue = flagType;
        }
        super('fl', qualifierValue);
        this.flagValue = flagValue;
    }
    toString() {
        return super.toString().replace(/\./g, '%2E');
    }
    getFlagValue() {
        return this.flagValue;
    }
}

/**
 * Sort a map by key
 * @private
 * @param map <string, any>
 * @Return array of map's values sorted by key
 */
function mapToSortedArray(map, flags) {
    const array = Array.from(map.entries());
    // objects from the Array.from() method above are stored in array of arrays:
    // [[qualifierKey, QualifierObj], [qualifierKey, QualifierObj]]
    // Flags is an array of FlagQualifierObj
    // We need to convert it to the same form: [flagQualifier] =>  ['fl', flagQualifier]
    flags.forEach((flag) => {
        array.push(['fl', flag]); // push ['fl', flagQualifier]
    });
    return array.sort().map((v) => v[1]);
}

/**
 * Returns the action's model
 */
function actionToJson() {
    var _a, _b, _c;
    const actionModelIsNotEmpty = this._actionModel && Object.keys(this._actionModel).length;
    const sourceTransformationError = (_c = (_b = (_a = this._actionModel) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.transformation) === null || _c === void 0 ? void 0 : _c.error;
    // Should return error when there is unsupported transformation inside
    if (sourceTransformationError && sourceTransformationError instanceof Error) {
        return { error: sourceTransformationError };
    }
    if (actionModelIsNotEmpty) {
        return this._actionModel;
    }
    return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
}

class ActionModel {
    constructor() {
        this._actionModel = {};
    }
    toJson() {
        return actionToJson.apply(this);
    }
}

/**
 * @summary SDK
 * @memberOf SDK
 * @description Defines the category of transformation to perform.
 */
class Action extends ActionModel {
    constructor() {
        super(...arguments);
        // We're using map, to overwrite existing keys. for example:
        // addParam(w_100).addQualifier(w_200) should result in w_200. and not w_100,w_200
        this.qualifiers = new Map();
        // Unlike regular qualifiers, there can be multiple flags in each url component /fl_1,fl_2/
        // If the falgs are added to the qualifiers map, only a single flag could exist in a component (it's a map)
        // So flags are stored separately until the very end because of that reason
        this.flags = [];
        this.delimiter = ','; // {qualifier}{delimiter}{qualifier} for example: `${'w_100'}${','}${'c_fill'}`
        this.actionTag = ''; // A custom name tag to identify this action in the future
    }
    prepareQualifiers() { }
    /**
     * @description Returns the custom name tag that was given to this action
     * @return {string}
     */
    getActionTag() {
        return this.actionTag;
    }
    /**
     * @description Sets the custom name tag for this action
     * @return {this}
     */
    setActionTag(tag) {
        this.actionTag = tag;
        return this;
    }
    /**
     * @description Calls toString() on all child qualifiers (implicitly by using .join()).
     * @return {string}
     */
    toString() {
        this.prepareQualifiers();
        return mapToSortedArray(this.qualifiers, this.flags).join(this.delimiter);
    }
    /**
     * @description Adds the parameter to the action.
     * @param {SDK.Qualifier} qualifier
     * @return {this}
     */
    addQualifier(qualifier) {
        // if string, find the key and value
        if (typeof qualifier === 'string') {
            const [key, value] = qualifier.toLowerCase().split('_');
            if (key === 'fl') {
                // if string qualifier is a flag, store it in the flags arrays
                this.flags.push(new FlagQualifier(value));
            }
            else {
                // if the string qualifier is not a flag, create a new qualifier from it
                this.qualifiers.set(key, new Qualifier(key, value));
            }
        }
        else {
            // if a qualifier object, insert to the qualifiers map
            this.qualifiers.set(qualifier.key, qualifier);
        }
        return this;
    }
    /**
     * @description Adds a flag to the current action.
     * @param {Qualifiers.Flag} flag
     * @return {this}
     */
    addFlag(flag) {
        if (typeof flag === 'string') {
            this.flags.push(new FlagQualifier(flag));
        }
        else {
            if (flag instanceof FlagQualifier) {
                this.flags.push(flag);
            }
        }
        return this;
    }
    addValueToQualifier(qualifierKey, qualifierValue) {
        this.qualifiers.get(qualifierKey).addValue(qualifierValue);
        return this;
    }
}

/**
 * Returns RGB or Color
 * @private
 * @param color
 */
function prepareColor(color) {
    if (color) {
        return color.match(/^#/) ? `rgb:${color.substr(1)}` : color;
    }
    else {
        return color;
    }
}

/**
 * @extends SDK.Action
 * @description A class for background transformations.
 */
class BackgroundColor extends Action {
    constructor(color) {
        super();
        this._actionModel = {};
        this.addQualifier(new Qualifier('b', new QualifierValue(prepareColor(color)).setDelimiter('_')));
        this._actionModel.color = color;
        this._actionModel.actionType = 'backgroundColor';
    }
    static fromJson(actionModel) {
        const { color } = actionModel;
        // We are using this() to allow inheriting classes to use super.fromJson.apply(this, [actionModel])
        // This allows the inheriting classes to determine the class to be created
        const result = new this(color);
        return result;
    }
}

/**
 * @summary SDK
 * @memberOf SDK
 * @description Defines an action that's a string literal, no validations or manipulations are performed
 */
class RawAction {
    constructor(raw) {
        this.raw = raw;
    }
    toString() {
        return this.raw;
    }
    toJson() {
        return { error: createUnsupportedError(`unsupported action ${this.constructor.name}`) };
    }
}

/**
 * Validates obj is an instance of IErrorObject
 * @param obj
 */
function isErrorObject(obj) {
    const errorObj = obj;
    return ('error' in errorObj) && !!errorObj.error;
}

/**
 * @description Defines flags that you can use to alter the default transformation behavior.
 * @namespace Flag
 * @memberOf Qualifiers
 */
/**
 * @summary qualifier
 * @memberOf Qualifiers.Flag
 * @description Automatically use lossy compression when delivering animated GIF files.
 *
 * This flag can also be used as a conditional flag for delivering PNG files: it tells Cloudinary to deliver the
 * image in PNG format (as requested) unless there is no transparency channel - in which case deliver in JPEG
 * format.
 * @return {Qualifiers.Flag.FlagQualifier}
 */
function lossy() {
    return new FlagQualifier('lossy');
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Flag
 * @description When used with automatic fetch_format (f_auto): ensures that images with a transparency channel will be
 * delivered in PNG format.
 * @return {Qualifiers.Flag.FlagQualifier}
 */
function preserveTransparency() {
    return new FlagQualifier('preserve_transparency');
}
/**
 * @summary qualifier
 * @memberOf Qualifiers.Flag
 * @description Generates a JPG image using the progressive (interlaced) JPG format.
 *
 * This format allows the browser to quickly show a low-quality rendering of the image until the full-quality
 * image is loaded.
 *
 * @param {string} mode? The mode to determine a specific progressive outcome as follows:
 * * semi - A smart optimization of the decoding time, compression level and progressive rendering
 *          (less iterations). This is the default mode when using q_auto.
 * * steep - Delivers a preview very quickly, and in a single later phase improves the image to
 *           the required resolution.
 * * none  - Use this to deliver a non-progressive image. This is the default mode when setting
 *           a specific value for quality.
 * @return {Qualifiers.Flag.FlagQualifier}
 */
function progressive(mode) {
    return new FlagQualifier('progressive', mode);
}

/**
 * @memberOf Qualifiers.Format
 * @extends {SDK.QualifierValue}
 */
class FormatQualifier extends QualifierValue {
    constructor(val) {
        super(val);
        this.val = val;
    }
    getValue() {
        return this.val;
    }
}

/**
 * Flip keys and values for given object
 * @param obj
 */
function objectFlip(obj) {
    const result = {};
    Object.keys(obj).forEach((key) => {
        result[obj[key]] = key;
    });
    return result;
}

/**
 * This file is for internal constants only.
 * It is not intended for public use and is not part of the public API
 */
const ACTION_TYPE_TO_CROP_MODE_MAP = {
    limitFit: 'limit',
    limitFill: 'lfill',
    minimumFit: 'mfit',
    thumbnail: 'thumb',
    limitPad: 'lpad',
    minimumPad: 'mpad',
    autoPad: 'auto_pad'
};
const ACTION_TYPE_TO_DELIVERY_MODE_MAP = {
    colorSpace: 'cs',
    dpr: 'dpr',
    density: 'dn',
    defaultImage: 'd',
    format: 'f',
    quality: 'q'
};
const ACTION_TYPE_TO_EFFECT_MODE_MAP = {
    redEye: 'redeye',
    advancedRedEye: 'adv_redeye',
    oilPaint: 'oil_paint',
    unsharpMask: 'unsharp_mask',
    makeTransparent: 'make_transparent',
    generativeRestore: 'gen_restore',
    upscale: 'upscale'
};
const ACTION_TYPE_TO_QUALITY_MODE_MAP = {
    autoBest: 'auto:best',
    autoEco: 'auto:eco',
    autoGood: 'auto:good',
    autoLow: 'auto:low',
    jpegminiHigh: 'jpegmini:1',
    jpegminiMedium: 'jpegmini:2',
    jpegminiBest: 'jpegmini:0'
};
const ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP = {
    fullHd: 'full_hd',
    fullHdWifi: 'full_hd_wifi',
    fullHdLean: 'full_hd_lean',
    hdLean: 'hd_lean'
};
const CHROMA_VALUE_TO_CHROMA_MODEL_ENUM = {
    444: "CHROMA_444",
    420: "CHROMA_420"
};
const COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP = {
    'noCmyk': 'no_cmyk',
    'keepCmyk': 'keep_cmyk',
    'tinySrgb': 'tinysrgb',
    'srgbTrueColor': 'srgb:truecolor'
};
objectFlip(CHROMA_VALUE_TO_CHROMA_MODEL_ENUM);
objectFlip(COLOR_SPACE_MODEL_MODE_TO_COLOR_SPACE_MODE_MAP);
objectFlip(ACTION_TYPE_TO_CROP_MODE_MAP);
const DELIVERY_MODE_TO_ACTION_TYPE_MAP = objectFlip(ACTION_TYPE_TO_DELIVERY_MODE_MAP);
objectFlip(ACTION_TYPE_TO_EFFECT_MODE_MAP);
objectFlip(ACTION_TYPE_TO_QUALITY_MODE_MAP);
objectFlip(ACTION_TYPE_TO_STREAMING_PROFILE_MODE_MAP);

/**
 * @description Qualifies the delivery of an asset.
 * @memberOf Actions.Delivery
 * @extends SDK.Action
 */
class DeliveryAction extends Action {
    /**
     * @param {string} deliveryKey A generic Delivery Action Key (such as q, f, dn, etc.)
     * @param {string} deliveryType A Format Qualifiers for the action, such as Quality.auto()
     * @param {string} modelProperty internal model property of the action, for example quality uses `level` while dpr uses `density`
     * @see Visit {@link Actions.Delivery|Delivery} for an example
     */
    constructor(deliveryKey, deliveryType, modelProperty) {
        super();
        this._actionModel = {};
        let deliveryTypeValue;
        if (deliveryType instanceof FormatQualifier) {
            deliveryTypeValue = deliveryType.getValue();
        }
        else {
            deliveryTypeValue = deliveryType;
        }
        this._actionModel.actionType = DELIVERY_MODE_TO_ACTION_TYPE_MAP[deliveryKey];
        this._actionModel[modelProperty] = deliveryTypeValue;
        this.addQualifier(new Qualifier(deliveryKey, deliveryType));
    }
}

/**
 * @description Contains functions to select the mode when using a progressive format.
 * <b>Learn more</b>: {@link https://cloudinary.com/documentation/transformation_reference#fl_progressive|Progressive modes}
 * @memberOf Qualifiers
 * @namespace Progressive
 * @example
 * import {Cloudinary} from "@cloudinary/url-gen";
 * import {format} from "@cloudinary/url-gen/actions/delivery";
 * import {jpg} from "@cloudinary/url-gen/qualifiers/format";
 * import {steep} from "@cloudinary/url-gen/qualifiers/progressive";
 *
 * const yourCldInstance = new Cloudinary({cloud: {cloudName: 'demo'}});
 * const image = yourCldInstance.image('woman');
 * image.delivery(format(jpg()).progressive(steep()))
 */
class ProgressiveQualifier extends FlagQualifier {
    constructor(mode) {
        super('progressive', mode);
    }
}

/**
 * @memberOf Actions.Delivery
 * @extends {Actions.Delivery.DeliveryAction}
 * @see Visit {@link Actions.Delivery|Delivery} for an example
 */
class DeliveryFormatAction extends DeliveryAction {
    constructor(deliveryKey, deliveryType) {
        super(deliveryKey, deliveryType, 'formatType');
    }
    /**
     * @description Uses lossy compression when delivering animated GIF files.
     * @return {this}
     */
    lossy() {
        this._actionModel.lossy = true;
        this.addFlag(lossy());
        return this;
    }
    /**
     * @description Uses progressive compression when delivering JPG file format.
     * @return {this}
     */
    progressive(mode) {
        if (mode instanceof ProgressiveQualifier) {
            this._actionModel.progressive = { mode: mode.getFlagValue() };
            this.addFlag(mode);
        }
        else {
            this._actionModel.progressive = { mode: mode };
            this.addFlag(progressive(mode));
        }
        return this;
    }
    /**
     * @description Ensures that images with a transparency channel are delivered in PNG format.
     */
    preserveTransparency() {
        this._actionModel.preserveTransparency = true;
        this.addFlag(preserveTransparency());
        return this;
    }
    static fromJson(actionModel) {
        const { formatType, lossy, progressive, preserveTransparency } = actionModel;
        let result;
        if (formatType) {
            result = new this('f', formatType);
        }
        else {
            result = new this('f');
        }
        if (progressive) {
            if (progressive.mode) {
                result.progressive(progressive.mode);
            }
            else {
                result.progressive();
            }
        }
        lossy && result.lossy();
        preserveTransparency && result.preserveTransparency();
        return result;
    }
}

/**
 * @summary SDK
 * @description - Defines how to transform an asset
 * @memberOf SDK
 */
class Transformation {
    constructor() {
        this.actions = [];
    }
    /**
     * @param {SDK.Action | string} action
     * @return {this}
     */
    addAction(action) {
        let actionToAdd;
        if (typeof action === 'string') {
            if (action.indexOf('/') >= 0) {
                throw 'addAction cannot accept a string with a forward slash in it - /, use .addTransformation() instead';
            }
            else {
                actionToAdd = new RawAction(action);
            }
        }
        else {
            actionToAdd = action;
        }
        this.actions.push(actionToAdd);
        return this;
    }
    /**
     * @description Allows the injection of a raw transformation as a string into the transformation, or a Transformation instance that was previously created
     * @param {string | SDK.Transformation} tx
     * @example
     * import {Transformation} from "@cloudinary/url-gen";
     *
     * const transformation = new Transformation();
     * transformation.addTransformation('w_100/w_200/w_300');
     * @return {this}
     */
    addTransformation(tx) {
        if (tx instanceof Transformation) {
            // Concat the new actions into the existing actions
            this.actions = this.actions.concat(tx.actions);
        }
        else {
            this.actions.push(new RawAction(tx));
        }
        return this;
    }
    /**
     * @return {string}
     */
    toString() {
        return this.actions
            .map((action) => {
            return action.toString();
        })
            .filter((a) => a)
            .join('/');
    }
    /**
     * @description Delivers an animated GIF.
     * @param {AnimatedAction} animatedAction
     * @return {this}
     */
    animated(animatedAction) {
        return this.addAction(animatedAction);
    }
    /**
     * @description Adds a border around the image.
     * @param {Border} borderAction
     * @return {this}
     */
    border(borderAction) {
        return this.addAction(borderAction);
    }
    /**
     * @description Adjusts the shape of the delivered image. </br>
     * <b>Learn more:</b> {@link https://cloudinary.com/documentation/effects_and_artistic_enhancements#distort|Shape changes and distortion effects}
     * @param {IReshape} reshapeAction
     * @return {this}
     */
    reshape(reshapeAction) {
        return this.addAction(reshapeAction);
    }
    /**
     * @description Resize the asset using provided resize action
     * @param {ResizeSimpleAction} resizeAction
     * @return {this}
     */
    resize(resizeAction) {
        return this.addAction(resizeAction);
    }
    /**
     * @desc An alias to Action Delivery.quality
     * @param {string|number} quality
     * @return {this}
     */
    quality(quality) {
        this.addAction(new DeliveryFormatAction('q', quality));
        return this;
    }
    /**
     * @desc An alias to Action Delivery.format
     * @param {string} format
     * @return {this}
     */
    format(format) {
        this.addAction(new DeliveryFormatAction('f', format));
        return this;
    }
    /**
     * @description Rounds the specified corners of an image.
     * @param roundCornersAction
     * @return {this}
     */
    roundCorners(roundCornersAction) {
        return this.addAction(roundCornersAction);
    }
    /**
     * @description Adds an overlay over the base image.
     * @param {LayerAction} overlayAction
     * @return {this}
     */
    overlay(overlayAction) {
        return this.addAction(overlayAction);
    }
    /**
     * @description Adds an underlay under the base image.
     * @param {LayerAction} underlayAction
     * @return {this}
     */
    underlay(underlayAction) {
        underlayAction.setLayerType('u');
        return this.addAction(underlayAction);
    }
    /**
     * @description Defines an new user variable.
     * @param {VariableAction} variableAction
     * @return {this}
     */
    addVariable(variableAction) {
        return this.addAction(variableAction);
    }
    /**
     * @description Specifies a condition to be met before applying a transformation.
     * @param {ConditionalAction} conditionAction
     * @return {this}
     */
    conditional(conditionAction) {
        return this.addAction(conditionAction);
    }
    /**
     * @description Applies a filter or an effect on an asset.
     * @param {SimpleEffectAction} effectAction
     * @return {this}
     */
    effect(effectAction) {
        return this.addAction(effectAction);
    }
    /**
     * @description Applies adjustment effect on an asset.
     * @param action
     * @return {this}
     */
    adjust(action) {
        return this.addAction(action);
    }
    /**
     * @description Rotates the asset by the given angle.
     * @param {RotateAction} rotateAction
     * @return {this}
     */
    rotate(rotateAction) {
        return this.addAction(rotateAction);
    }
    /**
     * @description Applies a pre-defined named transformation of the given name.
     * @param {NamedTransformation} namedTransformation
     * @return {this}
     */
    namedTransformation(namedTransformation) {
        return this.addAction(namedTransformation);
    }
    /**
     * @description Applies delivery action.
     * @param deliveryAction
     * @return {this}
     */
    delivery(deliveryAction) {
        return this.addAction(deliveryAction);
    }
    /**
     * @description Sets the color of the background.
     * @param {Qualifiers.Color} color
     * @return {this}
     */
    backgroundColor(color) {
        return this.addAction(new BackgroundColor(color));
    }
    /**
     * @description Adds a layer in a Photoshop document.
     * @param action
     * @return {this}
     */
    psdTools(action) {
        return this.addAction(action);
    }
    /**
     * @description Extracts an image or a page using an index, a range, or a name from a layered media asset.
     * @param action
     * @return {this}
     */
    extract(action) {
        return this.addAction(action);
    }
    /**
     * @description Adds a flag as a separate action.
     * @param {Qualifiers.Flag | string} flagQualifier
     * @return {this}
     */
    addFlag(flagQualifier) {
        const action = new Action();
        let flagToAdd = flagQualifier;
        if (typeof flagQualifier === 'string') {
            flagToAdd = new FlagQualifier(flagQualifier);
        }
        action.addQualifier(flagToAdd);
        return this.addAction(action);
    }
    /**
     * @description Inject a custom function into the image transformation pipeline.
     * @return {this}
     */
    customFunction(customFunction) {
        return this.addAction(customFunction);
    }
    /**
     * Transcodes the video (or audio) to another format.
     * @param {Action} action
     * @return {this}
     */
    transcode(action) {
        return this.addAction(action);
    }
    /**
     * Applies the specified video edit action.
     *
     * @param {videoEditType} action
     * @return {this}
     */
    videoEdit(action) {
        return this.addAction(action);
    }
    toJson() {
        const actions = [];
        for (const action of this.actions) {
            const json = action.toJson();
            if (isErrorObject(json)) {
                // Fail early and return an IErrorObject
                return json;
            }
            actions.push(json);
        }
        return { actions };
    }
}

/**
 * @summary SDK
 * @extends {SDK.Transformation}
 * @memberOf SDK
 */
class ImageTransformation extends Transformation {
}

/**
 * @summary SDK
 * @extends {SDK.Transformation}
 * @memberOf SDK
 */
class VideoTransformation extends Transformation {
}

/**
 *
 * @param publicID
 */
function isUrl(publicID) {
    return publicID.match(/^https?:\//);
}

/**
 *
 * @param publicID
 */
function isFileName(publicID) {
    return publicID.indexOf('/') < 0;
}

/**
 *
 * @param publicID
 */
function publicIDContainsVersion(publicID) {
    return publicID.match(/^v[0-9]+/);
}

/**
 * Create the URL prefix for Cloudinary resources.
 * Available use cases
 * http://res.cloudinary.com/{cloudName}
 * https://res.cloudinary.com/{cloudName}
 * https://{cloudName}-res.cloudinary.com/
 * http://{domain}/${cloudName}
 * https://{domain}/${cloudName}
 * https://{domain}
 * @private
 *
 * @param {string} cloudName
 * @param {IURLConfig} urlConfig
 */
function getUrlPrefix(cloudName, urlConfig) {
    const secure = urlConfig.secure;
    const privateCDN = urlConfig.privateCdn;
    const cname = urlConfig.cname;
    const secureDistribution = urlConfig.secureDistribution;
    if (!secure && !cname) {
        return `http://res.cloudinary.com/${cloudName}`;
    }
    if (secure && !secureDistribution && privateCDN) {
        return `https://${cloudName}-res.cloudinary.com`;
    }
    if (secure && !secureDistribution) {
        return `https://res.cloudinary.com/${cloudName}`;
    }
    if (secure && secureDistribution && privateCDN) {
        return `https://${secureDistribution}`;
    }
    if (secure && secureDistribution) {
        return `https://${secureDistribution}/${cloudName}`;
    }
    if (!secure && cname) {
        return `http://${cname}/${cloudName}`;
    }
    else {
        return 'ERROR';
    }
}
/**
 * @private
 * @param assetType
 */
function handleAssetType(assetType) {
    //default to image
    if (!assetType) {
        return 'image';
    }
    return assetType;
}
/**
 * @private
 * @param deliveryType
 */
function handleDeliveryType(deliveryType) {
    //default to upload
    if (!deliveryType) {
        return 'upload';
    }
    return deliveryType;
}
/**
 *
 * @param {string} publicID
 * @param {number} version
 * @param {boolean} forceVersion
 */
function getUrlVersion(publicID, version, forceVersion) {
    const shouldForceVersion = forceVersion !== false;
    if (version) {
        return `v${version}`;
    }
    // In all these conditions we never force a version
    if (publicIDContainsVersion(publicID) || isUrl(publicID) || isFileName(publicID)) {
        return '';
    }
    return shouldForceVersion ? 'v1' : '';
}

/**
 * @private
 * @description Adds left padding to a string with the desired substring the provided number of times
 * @example stringPad(foo, 3, 'a'') // -> aaafoo
 * @param {string} value
 * @param {number} _targetLength
 * @param {string} _padString
 */
function stringPad(value, _targetLength, _padString) {
    let targetLength = _targetLength >> 0; //truncate if number or convert non-number to 0;
    let padString = String((_padString ));
    if (value.length > targetLength) {
        return String(value);
    }
    else {
        targetLength = targetLength - value.length;
        if (targetLength > padString.length) {
            padString += repeatStringNumTimes(padString, targetLength / padString.length);
        }
        return padString.slice(0, targetLength) + String(value);
    }
}
/**
 * @description Repeat a string multiple times, cross-browser-safe alternative to string.repeat()
 * @param string
 * @param _times
 */
function repeatStringNumTimes(string, _times) {
    let times = _times;
    let repeatedString = "";
    while (times > 0) {
        repeatedString += string;
        times--;
    }
    return repeatedString;
}

/**
 * This file maps sequences of 6 bit binary digits to a character in base64.
 * 000000 -> A
 * 110011 -> Z
 * 111111 -> /
 */
const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const base64Map = {};
let num = 0;
chars.split('').forEach((char) => {
    let key = num.toString(2);
    key = stringPad(key, 6, '0');
    base64Map[key] = char;
    num++;
});

/**
 * @private
 * @description Reverses the version positions, x.y.z turns to z.y.x
 *              Pads each segment with '0' so they have length of 2
 *              Example: 1.2.3 -> 03.02.01
 * @param {string} semVer Input can be either x.y.z or x.y
 * @return {string} in the form of zz.yy.xx (
 */
function reverseVersion(semVer) {
    if (semVer.split('.').length < 2) {
        throw new Error('invalid semVer, must have at least two segments');
    }
    // Split by '.', reverse, create new array with padded values and concat it together
    return semVer.split('.').reverse().map((segment) => {
        // try to cast to number
        const asNumber = +segment;
        if (isNaN(asNumber) || asNumber < 0) {
            throw 'Invalid version number provided';
        }
        return stringPad(segment, 2, '0');
    }).join('.');
}

/**
 * @private
 * @description Encodes a semVer-like version string
 * @param {string} semVer Input can be either x.y.z or x.y
 * @return {string} A string built from 3 characters of the base64 table that encode the semVer
 */
function encodeVersion(semVer) {
    let strResult = '';
    // support x.y or x.y.z by using 'parts' as a variable
    const parts = semVer.split('.').length;
    const paddedStringLength = parts * 6; // we pad to either 12 or 18 characters
    // reverse (but don't mirror) the version. 1.5.15 -> 15.5.1
    // Pad to two spaces, 15.5.1 -> 15.05.01
    const paddedReversedSemver = reverseVersion(semVer);
    // turn 15.05.01 to a string '150501' then to a number 150501
    const num = parseInt(paddedReversedSemver.split('.').join(''));
    // Represent as binary, add left padding to 12 or 18 characters.
    // 150,501 -> 100100101111100101
    let paddedBinary = num.toString(2);
    paddedBinary = stringPad(paddedBinary, paddedStringLength, '0');
    // Stop in case an invalid version number was provided
    // paddedBinary must be built from sections of 6 bits
    if (paddedBinary.length % 6 !== 0) {
        throw 'Version must be smaller than 43.21.26)';
    }
    // turn every 6 bits into a character using the base64Map
    paddedBinary.match(/.{1,6}/g).forEach((bitString) => {
        // console.log(bitString);
        strResult += base64Map[bitString];
    });
    return strResult;
}

/**
 * @private
 * @description Gets the analyticsOptions from options- should include sdkSemver, techVersion, sdkCode, and feature
 * @param {ITrackedPropertiesThroughAnalytics} options
 * @returns {IAnalyticsOptions}
 */
function getAnalyticsOptions(options) {
    const analyticsOptions = {
        sdkSemver: options.sdkSemver,
        techVersion: options.techVersion,
        sdkCode: options.sdkCode,
        product: options.product,
        feature: '0',
    };
    if (options.accessibility) {
        analyticsOptions.feature = 'D';
    }
    if (options.lazyload) {
        analyticsOptions.feature = 'C';
    }
    if (options.responsive) {
        analyticsOptions.feature = 'A';
    }
    if (options.placeholder) {
        analyticsOptions.feature = 'B';
    }
    return analyticsOptions;
}

const packageVersion = '1.15.0';

/**
 * @private
 * @description Try to get the node version out of process, if browser just return 0.0.0
 */
function getNodeVersion() {
    const failedVersion = '0.0.0';
    if (typeof window !== 'undefined') {
        return failedVersion;
    }
    else {
        // node env
        try {
            return process.versions.node || failedVersion;
        }
        catch (e) {
            return failedVersion;
        }
    }
}
/**
 * @private
 * @description Ensure that all values ITrackedPropertiesThroughAnalytics are populated.
 * Accept a partial map of values and returns the complete interface of ITrackedPropertiesThroughAnalytics
 * @param {ITrackedPropertiesThroughAnalytics} trackedAnalytics
 * @param {ITrackedPropertiesThroughAnalytics} trackedAnalytics
 */
function ensureShapeOfTrackedProperties(trackedAnalytics) {
    // try to get the process version from node, but if we're on the client return 0.0.0
    const defaults = {
        techVersion: getNodeVersion(),
        sdkCode: 'T',
        sdkSemver: packageVersion.split('-')[0],
        product: 'A',
        responsive: false,
        placeholder: false,
        lazyload: false,
        accessibility: false
    };
    if (!trackedAnalytics) {
        return defaults;
    }
    else {
        return Object.assign(Object.assign({}, defaults), trackedAnalytics);
    }
}
/**
 * @private
 * @description Creates the complete SDK signature by using all the values provided by ITrackedPropertiesThroughAnalytics
 *              Creation of the signature
 *              - Set the AlgoVersion of the encoding, this is an internal letter that represents the version
 *                of our encoding algorithm, it will allow us to perform breaking changes if we'll need them.
 *              - Take the constant SDK code (Arbitrary letter chosen for each SDK, for Base that letter is 'T')
 *                this is used to tell apart which SDK is being tracked.
 *              - Take the {major.minor} versions of the node version (techVersion) (14.2, 16.2 etc.)
 *              - Take the full semver of the SDK you wish to track
 *              - Take the features used(lazy, placeholder etc.) and turn them to a letter (for example accessibility -> D)
 *              - Before appending the string, the Versions must be encoded, see the function `encodeVersion` for more details
 *              - Append all the variables to a single string
 *              - In any case of an error, return the single letter 'E'
 *
 * @return {string} sdkAnalyticsSignature
 */
function getSDKAnalyticsSignature(_trackedAnalytics) {
    const trackedAnalytics = ensureShapeOfTrackedProperties(_trackedAnalytics);
    const analyticsOptions = getAnalyticsOptions(trackedAnalytics);
    try {
        const twoPartVersion = removePatchFromSemver(analyticsOptions.techVersion);
        const encodedSDKVersion = encodeVersion(analyticsOptions.sdkSemver);
        const encodedTechVersion = encodeVersion(twoPartVersion);
        const featureCode = analyticsOptions.feature;
        const SDKCode = analyticsOptions.sdkCode;
        const product = analyticsOptions.product;
        const algoVersion = 'B'; // The algo version is determined here, it should not be an argument
        return `${algoVersion}${product}${SDKCode}${encodedSDKVersion}${encodedTechVersion}${featureCode}`;
    }
    catch (e) {
        // Either SDK or Node versions were unparsable
        return 'E';
    }
}
/**
 * @private
 * @description Removes patch version from the semver if it exists
 *              Turns x.y.z OR x.y into x.y
 * @param {'x.y.z' | 'x.y' | string} semVerStr
 */
function removePatchFromSemver(semVerStr) {
    const parts = semVerStr.split('.');
    return `${parts[0]}.${parts[1]}`;
}

/**
 * This const contains all the valid combination of asset/delivery for URL shortening purposes
 * It's exported because it's used in a test, but it's not really shared enough to belong in a separate file
 */
const SEO_TYPES = {
    "image/upload": "images",
    "image/private": "private_images",
    "image/authenticated": "authenticated_images",
    "raw/upload": "files",
    "video/upload": "videos"
};
/**
 * @description Cloudinary file without a transformation
 * @summary SDK
 * @memberOf SDK
 */
class CloudinaryFile {
    constructor(publicID, cloudConfig = {}, urlConfig) {
        this.setPublicID(publicID);
        this.setCloudConfig(cloudConfig);
        this.setURLConfig(urlConfig);
    }
    /**
     * @description Sets the URL Config for this asset
     * @param urlConfig
     * @return {this}
     */
    setURLConfig(urlConfig) {
        this.urlConfig = new URLConfig(urlConfig);
        return this;
    }
    /**
     * @description Sets the Cloud Config for this asset
     * @param urlConfig
     * @return {this}
     */
    setCloudConfig(cloudConfig) {
        this.cloudName = cloudConfig.cloudName;
        this.apiKey = cloudConfig.apiKey;
        this.apiSecret = cloudConfig.apiSecret;
        this.authToken = cloudConfig.authToken;
        return this;
    }
    /**
     * @description Sets the public ID of the asset.
     * @param {string} publicID The public ID of the asset.
     * @return {this}
     */
    setPublicID(publicID) {
        // PublicID must be a string!
        this.publicID = publicID ? publicID.toString() : '';
        return this;
    }
    /**
     * @description Sets the delivery type of the asset.
     * @param {DELIVERY_TYPE | string} newType The type of the asset.
     * @return {this}
     */
    setDeliveryType(newType) {
        this.deliveryType = newType;
        return this;
    }
    /**
     * @description Sets the URL SEO suffix of the asset.
     * @param {string} newSuffix The SEO suffix.
     * @return {this}
     */
    setSuffix(newSuffix) {
        this.suffix = newSuffix;
        return this;
    }
    /**
     * @description Sets the signature of the asset.
     * @param {string} signature The signature.
     * @return {this}
     */
    setSignature(signature) {
        this.signature = signature;
        return this;
    }
    /**
     * @description Sets the version of the asset.
     * @param {string} newVersion The version of the asset.
     * @return {this}
     */
    setVersion(newVersion) {
        if (newVersion) {
            this.version = newVersion;
        }
        return this;
    }
    /**
     * @description Sets the asset type.
     * @param {string} newType The type of the asset.
     * @return {this}
     */
    setAssetType(newType) {
        if (newType) {
            this.assetType = newType;
        }
        return this;
    }
    sign() {
        return this;
    }
    /**
     * @description Serializes to URL string
     * @param overwriteOptions
     */
    toURL(overwriteOptions = {}) {
        return this.createCloudinaryURL(null, overwriteOptions.trackedAnalytics);
    }
    /**
     * @description Validate various options before attempting to create a URL
     * The function will throw in case a violation
     * @throws Validation errors
     */
    validateAssetForURLCreation() {
        if (typeof this.cloudName === 'undefined') {
            throw 'You must supply a cloudName when initializing the asset';
        }
        const suffixContainsDot = this.suffix && this.suffix.indexOf('.') >= 0;
        const suffixContainsSlash = this.suffix && this.suffix.indexOf('/') >= 0;
        if (suffixContainsDot || suffixContainsSlash) {
            throw '`suffix`` should not include . or /';
        }
    }
    /**
     * @description return an SEO friendly name for a combination of asset/delivery, some examples:
     * * image/upload -> images
     * * video/upload -> videos
     * If no match is found, return `{asset}/{delivery}`
     */
    getResourceType() {
        const assetType = handleAssetType(this.assetType);
        const deliveryType = handleDeliveryType(this.deliveryType);
        const hasSuffix = !!this.suffix;
        const regularSEOType = `${assetType}/${deliveryType}`;
        const shortSEOType = SEO_TYPES[`${assetType}/${deliveryType}`];
        const useRootPath = this.urlConfig.useRootPath;
        const shorten = this.urlConfig.shorten;
        // Quick exit incase of useRootPath
        if (useRootPath) {
            if (regularSEOType === 'image/upload') {
                return ''; // For image/upload we're done, just return nothing
            }
            else {
                throw new Error(`useRootPath can only be used with assetType: 'image' and deliveryType: 'upload'. Provided: ${regularSEOType} instead`);
            }
        }
        if (shorten && regularSEOType === 'image/upload') {
            return 'iu';
        }
        if (hasSuffix) {
            if (shortSEOType) {
                return shortSEOType;
            }
            else {
                throw new Error(`URL Suffix only supported for ${Object.keys(SEO_TYPES).join(', ')}, Provided: ${regularSEOType} instead`);
            }
        }
        // If all else fails, return the regular image/upload combination (asset/delivery)
        return regularSEOType;
    }
    getSignature() {
        if (this.signature) {
            return `s--${this.signature}--`;
        }
        else {
            return '';
        }
    }
    /**
     *
     * @description Creates a fully qualified CloudinaryURL
     * @return {string} CloudinaryURL
     * @throws Validation Errors
     */
    createCloudinaryURL(transformation, trackedAnalytics) {
        // In accordance with the existing implementation, if no publicID exists we should return nothing.
        if (!this.publicID) {
            return '';
        }
        // Throws if some options are mis-configured
        // See the function for more information on when it throws
        this.validateAssetForURLCreation();
        const prefix = getUrlPrefix(this.cloudName, this.urlConfig);
        const transformationString = transformation ? transformation.toString() : '';
        const version = getUrlVersion(this.publicID, this.version, this.urlConfig.forceVersion);
        const publicID = this.publicID;
        if (typeof transformation === 'string') {
            const url = [prefix, this.getResourceType(), this.getSignature(), transformationString, version, publicID.replace(/,/g, '%2C'), this.suffix]
                .filter((a) => a)
                .join('/');
            return url;
        }
        else {
            // Avoid applying encodeURI on entire string in case where we have transformations with comma (i.e. f_auto,q_auto)
            // Since encodeURI does not encode commas we replace commas *only* on the publicID
            const safeURL = [
                encodeURI(prefix),
                this.getResourceType(),
                this.getSignature(),
                encodeURI(transformationString),
                version,
                encodeURI(publicID).replace(/,/g, '%2C'),
                this.suffix && encodeURI(this.suffix)
            ]
                .filter((a) => a)
                .join('/')
                .replace(/\?/g, '%3F')
                .replace(/=/g, '%3D');
            const shouldAddAnalytics = this.urlConfig.analytics !== false && !(publicID.includes('?'));
            let queryParamsString = '';
            if (typeof (this.urlConfig.queryParams) === 'object') {
                try {
                    const queryParams = new URLSearchParams(this.urlConfig.queryParams);
                    if (shouldAddAnalytics) {
                        queryParams.set("_a", getSDKAnalyticsSignature(trackedAnalytics));
                    }
                    queryParamsString = queryParams.toString();
                }
                catch (err) {
                    console.error('Error: URLSearchParams is not available so the queryParams object cannot be parsed, please try passing as an already parsed string');
                }
            }
            else {
                queryParamsString = this.urlConfig.queryParams || '';
                if (shouldAddAnalytics) {
                    queryParamsString += `${(queryParamsString.length > 0 ? '&' : '')}_a=${getSDKAnalyticsSignature(trackedAnalytics)}`;
                }
            }
            if (queryParamsString) {
                return `${safeURL}?${queryParamsString}`;
            }
            else {
                return safeURL;
            }
        }
    }
}

/**
 * @desc Cloudinary Transformable interface, extended by any class that needs a Transformation Interface
 * @summary SDK
 * @memberOf SDK
 */
class CloudinaryTransformable extends CloudinaryFile {
    constructor(publicID, cloudConfig, urlConfig, transformation) {
        /* istanbul ignore next */
        super(publicID, cloudConfig, urlConfig);
        this.transformation = transformation;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Animated} animated
     * @return {this}
     */
    animated(animated) {
        this.transformation.animated(animated);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Border} border
     * @return {this}
     */
    border(border) {
        this.transformation.border(border);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Reshape} reshape
     * @return {this}
     */
    reshape(reshape) {
        this.transformation.reshape(reshape);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Resize} resize
     * @return {this}
     */
    resize(resize) {
        this.transformation.resize(resize);
        return this;
    }
    /**
     * @desc An alias to Action Delivery.quality
     * @param {string|number} quality
     * @return {this}
     */
    quality(quality) {
        this.addAction(new DeliveryFormatAction('q', quality));
        return this;
    }
    /**
     * @desc An alias to Action Delivery.format
     * @param {string} format
     * @return {this}
     */
    format(format) {
        this.addAction(new DeliveryFormatAction('f', format));
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.RoundCorners} roundCorners
     * @return {this}
     */
    roundCorners(roundCorners) {
        this.transformation.roundCorners(roundCorners);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @return {this}
     */
    overlay(overlayAction) {
        this.transformation.overlay(overlayAction);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Variable} variableAction
     * @return {this}
     */
    addVariable(variableAction) {
        this.transformation.addVariable(variableAction);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Condition} conditionalAction
     * @return {this}
     */
    conditional(conditionalAction) {
        this.transformation.conditional(conditionalAction);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Effect} effect
     * @return {this}
     */
    effect(effect) {
        this.transformation.effect(effect);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Adjust} action
     * @return {this}
     */
    adjust(action) {
        this.transformation.adjust(action);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Rotate} rotate
     * @return {this}
     */
    rotate(rotate) {
        this.transformation.rotate(rotate);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.NamedTransformation} namedTransformation
     * @return {this}
     */
    namedTransformation(namedTransformation) {
        this.transformation.namedTransformation(namedTransformation);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Delivery} deliveryAction
     * @return {this}
     */
    delivery(deliveryAction) {
        this.transformation.delivery(deliveryAction);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Qualifiers.color} color
     * @return {this}
     */
    backgroundColor(color) {
        this.transformation.backgroundColor(color);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.PSDTools} action
     * @return {this}
     */
    psdTools(action) {
        this.transformation.psdTools(action);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Extract} action
     * @return {this}
     */
    extract(action) {
        this.transformation.extract(action);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Qualifiers.Flag | string} flagQualifier
     * @return {this}
     */
    addFlag(flagQualifier) {
        this.transformation.addFlag(flagQualifier);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.CustomFunction} customFunction
     * @return {this}
     */
    customFunction(customFunction) {
        this.transformation.customFunction(customFunction);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {SDK.Action | string} action
     * @return {this}
     */
    addAction(action) {
        this.transformation.addAction(action);
        return this;
    }
    /**
     * @description Extend your transformation with another transformation
     * @param { string | SDK.Transformation } tx
     */
    addTransformation(tx) {
        this.transformation.addTransformation(tx);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @return {string}
     */
    toString() {
        return this.transformation.toString();
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @return {this}
     */
    underlay(underlayAction) {
        this.transformation.underlay(underlayAction);
        return this;
    }
    toURL(overwriteOptions = {}) {
        return this.createCloudinaryURL(this.transformation, overwriteOptions === null || overwriteOptions === void 0 ? void 0 : overwriteOptions.trackedAnalytics);
    }
}

/**
 * @desc Cloudinary image asset, with image-related transformations
 * @summary SDK
 * @memberOf SDK
 */
class CloudinaryImage extends CloudinaryTransformable {
    constructor(publicID, cloudConfig, urlConfig) {
        /* istanbul ignore next */
        super(publicID, cloudConfig, urlConfig, new ImageTransformation());
    }
}

/**
 * @desc Cloudinary video asset, with video-related transformations
 * @summary SDK
 * @memberOf SDK
 */
class CloudinaryVideo extends CloudinaryTransformable {
    constructor(publicID, cloudConfig, urlConfig) {
        /* istanbul ignore next */
        super(publicID, cloudConfig, urlConfig, new VideoTransformation());
        this.assetType = 'video';
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.Transcode} action
     * @return {this}
     */
    transcode(action) {
        this.transformation.transcode(action);
        return this;
    }
    /**
     * @desc A proxy to {@link SDK.Transformation| Transformation} - Calls the same method contained in this.transformation
     * @param {Actions.VideoEdit} action
     * @return {this}
     */
    videoEdit(action) {
        this.transformation.videoEdit(action);
        return this;
    }
}

class Cloudinary {
    constructor(cloudinaryConfig) {
        if (cloudinaryConfig) {
            this.cloudinaryConfig = cloudinaryConfig;
        }
    }
    image(publicID) {
        return new CloudinaryImage(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
    }
    video(publicID) {
        return new CloudinaryVideo(publicID, this.cloudinaryConfig.cloud, this.cloudinaryConfig.url);
    }
    setConfig(cloudinaryConfig) {
        this.cloudinaryConfig = cloudinaryConfig;
        return this;
    }
    getConfig() {
        return this.cloudinaryConfig;
    }
    extendConfig() {
        // Future implementation
    }
}

var __defProp = Object.defineProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};

// src/constants/parameters.ts
var parameters_exports = {};
__export(parameters_exports, {
  angle: () => angle,
  aspectRatio: () => aspectRatio,
  aspectRatioModesEnum: () => aspectRatioModesEnum,
  crop: () => crop,
  cropModesEnum: () => cropModesEnum,
  extractMode: () => extractMode,
  extractModesEnum: () => extractModesEnum,
  flags: () => flags,
  flagsEnum: () => flagsEnum,
  format: () => format,
  gravity: () => gravity,
  height: () => height,
  multiple: () => multiple,
  prompt: () => prompt,
  width: () => width,
  x: () => x,
  y: () => y,
  zoom: () => zoom
});
var cropModesEnum = z.enum([
  "auto",
  "fill",
  "lfill",
  "fill_pad",
  "crop",
  "thumb",
  "scale",
  "fit",
  "limit",
  "mfit",
  "pad",
  "lpad",
  "mpad",
  "imagga_scale",
  "imagga_crop"
]);
var extractModesEnum = z.enum([
  "content",
  "mask"
]);
var flagsEnum = z.enum([
  "animated",
  "any_format",
  "apng",
  "attachment",
  "awebp",
  "clip",
  "clip_evenodd",
  "cutter",
  "force_icc",
  "force_strip",
  "getinfo",
  "group4",
  "hlsv3",
  "ignore_aspect_ratio",
  "ignore_mask_channels",
  "immutable_cache",
  "keep_attribution",
  "keep_dar",
  "keep_iptc",
  "layer_apply",
  "lossy",
  "mono",
  "no_overflow",
  "no_stream",
  "png8_fl_png24_fl_png32",
  "preserve_transparency",
  "progressive",
  "rasterize",
  "region_relative",
  "relative",
  "replace_image",
  "sanitize",
  "splice",
  "streaming_attachment",
  "strip_profile",
  "text_disallow_overflow",
  "text_no_trim",
  "tiff8_lzw",
  "tiled",
  "truncate_ts",
  "waveform"
]);
var angle = {
  qualifier: "a",
  schema: z.union([z.string(), z.number()]).describe(
    JSON.stringify({
      text: "Rotates or flips an asset by the specified number of degrees or automatically according to its orientation or available metadata.",
      url: "https://cloudinary.com/documentation/transformation_reference#a_angle"
    })
  )
};
var aspectRatioModesEnum = z.enum([
  "vflip",
  "hflip",
  "ignore",
  "auto_right",
  "auto_left"
]);
var aspectRatioSchema = z.union([
  z.number(),
  aspectRatioModesEnum,
  z.intersection(z.string(), z.object({}))
  // Quirk to allow enum + string
]);
var aspectRatio = {
  qualifier: "ar",
  schema: aspectRatioSchema.describe(
    JSON.stringify({
      text: "Crops or resizes the asset to a new aspect ratio.",
      url: "https://cloudinary.com/documentation/transformation_reference#ar_aspect_ratio"
    })
  )
};
var cropSchema = cropModesEnum;
var crop = {
  qualifier: "c",
  schema: cropSchema.describe(
    JSON.stringify({
      text: "Mode to use when cropping an asset.",
      url: "https://cloudinary.com/documentation/transformation_reference#c_crop_resize"
    })
  )
};
var extractModeSchema = extractModesEnum;
var extractMode = {
  schema: extractModeSchema.default("content").describe(
    JSON.stringify({
      text: "Whether to keep the content of the extracted area, or to replace it with a mask.",
      url: "https://cloudinary.com/documentation/transformation_reference#e_extract"
    })
  )
};
var flags = {
  qualifier: "fl",
  schema: z.union([flagsEnum, z.array(flagsEnum)]).describe(
    JSON.stringify({
      text: "Alters the regular behavior of another transformation or the overall delivery behavior.",
      url: "https://cloudinary.com/documentation/transformation_reference#fl_flag"
    })
  )
};
var format = {
  qualifier: "f",
  // @TODO: enum
  schema: z.string().describe(
    JSON.stringify({
      text: "Converts (if necessary) and delivers an asset in the specified format regardless of the file extension used in the delivery URL.",
      url: "https://cloudinary.com/documentation/transformation_reference#f_format"
    })
  )
};
var gravitySchema = z.union([
  z.enum([
    "auto",
    "auto_content_aware",
    "center",
    "custom",
    "east",
    "face",
    "face_center",
    "multi_face",
    "north",
    "north_east",
    "north_west",
    "south",
    "south_east",
    "south_west",
    "west"
  ]),
  // Quirk to allow enum + string
  z.intersection(z.string(), z.object({}))
]);
var gravity = {
  qualifier: "g",
  schema: gravitySchema.describe(
    JSON.stringify({
      text: "Determines which part of an asset to focus on. Note: Default of auto is applied for supported crop modes only.",
      url: "https://cloudinary.com/documentation/transformation_reference#g_gravity"
    })
  )
};
var heightSchema = z.union([z.number(), z.string()]);
var height = {
  qualifier: "h",
  schema: heightSchema.describe(
    JSON.stringify({
      text: "A qualifier that determines the height of a transformed asset or an overlay.",
      url: "https://cloudinary.com/documentation/transformation_reference#h_height"
    })
  )
};
var multipleSchema = z.boolean();
var multiple = {
  schema: multipleSchema.describe(
    JSON.stringify({
      text: "Should generative AI features detect multiple instances."
    })
  )
};
var prompt = {
  schema: z.string().describe(
    JSON.stringify({
      text: "Natural language descriptions used for generative AI capabilities."
    })
  )
};
var widthSchema = z.union([z.number(), z.string()]);
var width = {
  qualifier: "w",
  schema: widthSchema.describe(
    JSON.stringify({
      text: "A qualifier that sets the desired width of an asset using a specified value, or automatically based on the available width.",
      url: "https://cloudinary.com/documentation/transformation_reference#w_width"
    })
  )
};
var x = {
  qualifier: "x",
  schema: z.union([z.string(), z.number()]).describe(
    JSON.stringify({
      text: "Adjusts the starting location or offset of the x axis.",
      url: "https://cloudinary.com/documentation/transformation_reference#x_y_coordinates"
    })
  )
};
var y = {
  qualifier: "y",
  schema: z.union([z.string(), z.number()]).describe(
    JSON.stringify({
      text: "Adjusts the starting location or offset of the y axis.",
      url: "https://cloudinary.com/documentation/transformation_reference#x_y_coordinates"
    })
  )
};
var zoomSchema = z.string();
var zoom = {
  schema: zoomSchema.describe(
    JSON.stringify({
      text: "Controls how close to crop to the detected coordinates when using face-detection, custom-coordinate, or object-specific gravity.",
      url: "https://cloudinary.com/documentation/transformation_reference#z_zoom"
    })
  )
};

// src/constants/qualifiers.ts
var convertersColors = [
  {
    test: testColorIsHex,
    convert: convertColorHexToRgb
  }
];
var primary = {
  aspectRatio,
  crop,
  gravity,
  height,
  width
};
var position = {
  angle,
  gravity,
  x,
  y
};
var text = {
  alignment: {
    qualifier: false,
    order: 6
  },
  antialias: {
    qualifier: "antialias"
  },
  border: {
    qualifier: "bo",
    location: "primary"
  },
  color: {
    qualifier: "co",
    location: "primary",
    converters: convertersColors
  },
  fontFamily: {
    qualifier: false,
    order: 1
  },
  fontSize: {
    qualifier: false,
    order: 2
  },
  fontStyle: {
    qualifier: false,
    order: 4
  },
  fontWeight: {
    qualifier: false,
    order: 3
  },
  hinting: {
    qualifier: "hinting"
  },
  letterSpacing: {
    qualifier: "letter_spacing"
  },
  lineSpacing: {
    qualifier: "line_spacing"
  },
  stroke: {
    qualifier: "self",
    order: 7
  },
  textDecoration: {
    qualifier: false,
    order: 5
  }
};
var effects = {
  angle,
  art: {
    prefix: "e",
    qualifier: "art",
    schema: z.string().describe(
      JSON.stringify({
        text: "Applies the selected artistic filter.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_art"
      })
    )
  },
  autoBrightness: {
    prefix: "e",
    qualifier: "auto_brightness",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Automatically adjusts the image brightness and blends the result with the original image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_auto_brightness"
      })
    )
  },
  autoColor: {
    prefix: "e",
    qualifier: "auto_color",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Automatically adjusts the image color balance and blends the result with the original image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_auto_color"
      })
    )
  },
  autoContrast: {
    prefix: "e",
    qualifier: "auto_contrast",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Automatically adjusts the image contrast and blends the result with the original image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_auto_contrast"
      })
    )
  },
  assistColorblind: {
    prefix: "e",
    qualifier: "assist_colorblind",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies stripes or color adjustment to help people with common color blind conditions to differentiate between colors that are similar for them.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_assist_colorblind"
      })
    )
  },
  background: {
    qualifier: "b",
    schema: z.string().describe(
      JSON.stringify({
        text: "Applies a background to empty or transparent areas.",
        url: "https://cloudinary.com/documentation/transformation_reference#b_background"
      })
    )
  },
  blackwhite: {
    prefix: "e",
    qualifier: "blackwhite",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Converts an image to black and white.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_blackwhite"
      })
    )
  },
  blur: {
    prefix: "e",
    qualifier: "blur",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a blurring filter to an asset.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_blur"
      })
    )
  },
  blurFaces: {
    prefix: "e",
    qualifier: "blur_faces",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Blurs all detected faces in an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_blur_faces"
      })
    )
  },
  blurRegion: {
    prefix: "e",
    qualifier: "blur_region",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a blurring filter to the region of an image specified by x, y, width and height, or an area of text. If no region is specified, the whole image is blurred.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_blur_region"
      })
    )
  },
  border: {
    qualifier: "bo",
    schema: z.string().describe(
      JSON.stringify({
        text: "Adds a solid border around an image or video.",
        url: "https://cloudinary.com/documentation/transformation_reference#bo_border"
      })
    )
  },
  brightness: {
    prefix: "e",
    qualifier: "brightness",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts the image or video brightness.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_brightness"
      })
    )
  },
  brightnessHSB: {
    prefix: "e",
    qualifier: "brightness_hsb",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts image brightness modulation in HSB to prevent artifacts in some images.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_brightness_hsb"
      })
    )
  },
  cartoonify: {
    prefix: "e",
    qualifier: "cartoonify",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a cartoon effect to an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_cartoonify"
      })
    )
  },
  color: {
    qualifier: "co",
    schema: z.string().describe(
      JSON.stringify({
        text: "A qualifier that specifies the color to use with the corresponding transformation.",
        url: "https://cloudinary.com/documentation/transformation_reference#co_color"
      })
    ),
    converters: convertersColors
  },
  colorize: {
    prefix: "e",
    qualifier: "colorize",
    schema: z.string().describe(
      JSON.stringify({
        text: "Colorizes an image. By default, gray is used for colorization. You can specify a different color using the color qualifier.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_colorize"
      })
    )
  },
  contrast: {
    prefix: "e",
    qualifier: "contrast",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts an image or video contrast.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_contrast"
      })
    )
  },
  displace: {
    prefix: "e",
    qualifier: "distort",
    schema: z.string().describe(
      JSON.stringify({
        text: "Displaces the pixels in an image according to the color channels of the pixels in another specified image (a gradient map specified with the overlay parameter).",
        url: "https://cloudinary.com/documentation/transformation_reference#e_displace"
      })
    )
  },
  distort: {
    prefix: "e",
    qualifier: "distort",
    schema: z.string().describe(
      JSON.stringify({
        text: "Distorts an image to a new shape by either adjusting its corners or by warping it into an arc.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_distort"
      })
    )
  },
  fillLight: {
    prefix: "e",
    qualifier: "fill_light",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts the fill light and optionally blends the result with the original image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_fill_light"
      })
    )
  },
  gamma: {
    prefix: "e",
    qualifier: "gamma",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts the image or video gamma level.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_gamma"
      })
    )
  },
  gradientFade: {
    prefix: "e",
    qualifier: "gradient_fade",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a gradient fade effect from the edge of an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_gradient_fade"
      })
    )
  },
  grayscale: {
    prefix: "e",
    qualifier: "grayscale",
    schema: z.boolean().describe(
      JSON.stringify({
        text: "Converts an image to grayscale (multiple shades of gray).",
        url: "https://cloudinary.com/documentation/transformation_reference#e_grayscale"
      })
    )
  },
  hue: {
    prefix: "e",
    qualifier: "hue",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts an image's hue.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_hue"
      })
    )
  },
  improve: {
    prefix: "e",
    qualifier: "improve",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts an image's colors, contrast and brightness to improve its appearance.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_improve"
      })
    )
  },
  loop: {
    prefix: "e",
    qualifier: "loop",
    schema: z.union([z.boolean(), z.number(), z.string()]).describe(
      JSON.stringify({
        text: "Loops a video or animated image the specified number of times.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_loop"
      })
    )
  },
  multiply: {
    prefix: "e",
    qualifier: "multiply",
    schema: z.boolean().describe(
      JSON.stringify({
        text: "A qualifier that blends image layers using the multiply blend mode",
        url: "https://cloudinary.com/documentation/transformation_reference#e_multiply"
      })
    )
  },
  negate: {
    prefix: "e",
    qualifier: "negate",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "https://cloudinary.com/documentation/transformation_reference#e_negate",
        url: "https://cloudinary.com/documentation/transformation_reference#e_negate"
      })
    )
  },
  noise: {
    prefix: "e",
    qualifier: "noise",
    schema: z.boolean().describe(
      JSON.stringify({
        text: "https://cloudinary.com/documentation/transformation_reference#e_noise",
        url: "https://cloudinary.com/documentation/transformation_reference#e_noise"
      })
    )
  },
  oilPaint: {
    prefix: "e",
    qualifier: "oil_paint",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "https://cloudinary.com/documentation/transformation_reference#e_oil_paint",
        url: "https://cloudinary.com/documentation/transformation_reference#e_oil_paint"
      })
    )
  },
  opacity: {
    qualifier: "o",
    schema: z.union([z.string(), z.number()]).describe(
      JSON.stringify({
        text: "Adjusts the opacity of an asset and makes it semi-transparent.",
        url: "https://cloudinary.com/documentation/transformation_reference#o_opacity"
      })
    )
  },
  outline: {
    prefix: "e",
    qualifier: "outline",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adds an outline effect to an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_outline"
      })
    )
  },
  pixelate: {
    prefix: "e",
    qualifier: "pixelate",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a pixelation effect.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_pixelate"
      })
    )
  },
  pixelateFaces: {
    prefix: "e",
    qualifier: "pixelate_faces",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Pixelates all detected faces in an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_pixelate_faces"
      })
    )
  },
  pixelateRegion: {
    prefix: "e",
    qualifier: "pixelate_region",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Pixelates the region of an image specified by x, y, width and height, or an area of text.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_pixelate_region"
      })
    )
  },
  radius: {
    qualifier: "r",
    schema: z.union([z.string(), z.number()]).describe(
      JSON.stringify({
        text: "Rounds the corners of an image or video.",
        url: "https://cloudinary.com/documentation/transformation_reference#r_round_corners"
      })
    )
  },
  redeye: {
    prefix: "e",
    qualifier: "redeye",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Automatically removes red eyes in an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_redeye"
      })
    )
  },
  replaceColor: {
    prefix: "e",
    qualifier: "replace_color",
    schema: z.string().describe(
      JSON.stringify({
        text: "Maps an input color and those similar to the input color to corresponding shades of a specified output color.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_replace_color"
      })
    )
  },
  saturation: {
    prefix: "e",
    qualifier: "saturation",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adjusts an image or video saturation level.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_saturation"
      })
    )
  },
  screen: {
    prefix: "e",
    qualifier: "screen",
    schema: z.boolean().describe(
      JSON.stringify({
        text: "A qualifier that blends image layers using the screen blend mode.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_screen"
      })
    )
  },
  sepia: {
    prefix: "e",
    qualifier: "sepia",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Changes the color scheme of an image to sepia.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_sepia"
      })
    )
  },
  shadow: {
    prefix: "e",
    qualifier: "shadow",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Adds a gray shadow to the bottom right of an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_shadow"
      })
    )
  },
  sharpen: {
    prefix: "e",
    qualifier: "sharpen",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a sharpening filter.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_sharpen"
      })
    )
  },
  shear: {
    prefix: "e",
    qualifier: "shear",
    schema: z.string().describe(
      JSON.stringify({
        text: "Skews an image according to the two specified values in degrees.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_shear"
      })
    )
  },
  simulateColorblind: {
    prefix: "e",
    qualifier: "simulate_colorblind",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Simulates the way an image would appear to someone with the specified color blind condition.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_simulate_colorblind"
      })
    )
  },
  tint: {
    prefix: "e",
    qualifier: "tint",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Blends an image with one or more tint colors at a specified intensity.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_tint"
      })
    )
  },
  trim: {
    prefix: "e",
    qualifier: "trim",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Detects and removes image edges whose color is similar to the corner pixels.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_trim"
      })
    )
  },
  unsharpMask: {
    prefix: "e",
    qualifier: "unsharp_mask",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies an unsharp mask filter to an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_unsharp_mask"
      })
    )
  },
  vectorize: {
    prefix: "e",
    qualifier: "vectorize",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Vectorizes an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_vectorize"
      })
    )
  },
  vibrance: {
    prefix: "e",
    qualifier: "vibrance",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a vibrance filter to an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_vibrance"
      })
    )
  },
  vignette: {
    prefix: "e",
    qualifier: "vignette",
    schema: z.union([z.string(), z.boolean()]).describe(
      JSON.stringify({
        text: "Applies a vignette effect to an image.",
        url: "https://cloudinary.com/documentation/transformation_reference#e_vignette"
      })
    )
  }
};

// src/lib/transformations.ts
function constructTransformation({
  prefix,
  qualifier,
  value,
  converters
}) {
  let transformation = "";
  if (prefix) {
    transformation = `${prefix}_`;
  }
  let transformationValue = value;
  converters?.forEach(({ test, convert }) => {
    if (!test(transformationValue)) return;
    transformationValue = convert(transformationValue);
  });
  if (transformationValue === true || transformationValue === "true") {
    return `${transformation}${qualifier}`;
  }
  if (typeof transformationValue === "string" || typeof transformationValue === "number") {
    if (prefix) {
      return `${transformation}${qualifier}:${transformationValue}`;
    } else {
      return `${qualifier}_${transformationValue}`;
    }
  }
}
function promptArrayToString(promptArray) {
  return `(${promptArray.join(";")})`;
}
function normalizeNumberParameter(param) {
  if (typeof param !== "string") return param;
  return parseInt(param);
}

// src/plugins/cropping.ts
var cropsAspectRatio = ["auto", "crop", "fill", "lfill", "fill_pad", "thumb"];
var cropsGravityAuto = ["auto", "crop", "fill", "lfill", "fill_pad", "thumb"];
var cropsWithZoom = ["crop", "thumb"];
var DEFAULT_CROP = "limit";
var cropOptionsSchema = z.object({
  aspectRatio: aspectRatio.schema.optional(),
  type: crop.schema,
  gravity: gravity.schema.optional(),
  height: height.schema.optional(),
  width: width.schema.optional(),
  x: x.schema.optional(),
  y: y.schema.optional(),
  zoom: zoom.schema.optional(),
  source: z.boolean().optional()
});
var croppingProps = {
  aspectRatio: aspectRatio.schema.optional(),
  crop: z.union([
    crop.schema,
    cropOptionsSchema,
    z.array(cropOptionsSchema)
  ]).default(DEFAULT_CROP).optional(),
  gravity: gravity.schema.optional(),
  zoom: zoom.schema.optional()
};
var croppingPlugin = {
  props: croppingProps,
  assetTypes: ["image", "images", "video", "videos"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    let crops = [];
    if (typeof options.crop === "string" || typeof options.crop === "undefined") {
      crops.push({
        aspectRatio: options.aspectRatio,
        height: options.height,
        gravity: options.gravity,
        type: options.crop || DEFAULT_CROP,
        width: options.width,
        zoom: options.zoom
      });
    } else if (typeof options.crop === "object" && !Array.isArray(options.crop)) {
      crops.push(options.crop);
    } else if (Array.isArray(options.crop)) {
      crops = options.crop;
    }
    if (crops.length === 1 && crops[0].source === true) {
      crops.push({
        aspectRatio: options.aspectRatio,
        width: options.width,
        height: options.height,
        gravity: options.gravity,
        type: DEFAULT_CROP,
        zoom: options.zoom
      });
    }
    const finalTransformations = [];
    const sourceTransformations = [];
    for (const crop2 of crops) {
      const cropDimensions = {
        width: crop2.width,
        height: crop2.height
      };
      if (typeof cropDimensions.width === "undefined" && typeof crop2.aspectRatio === "undefined") {
        cropDimensions.width = options.width;
        if (typeof cropDimensions.height === "undefined") {
          cropDimensions.height = options.height;
        }
      }
      const transformations = collectTransformations({
        aspectRatio: crop2.aspectRatio,
        gravity: crop2.gravity,
        type: crop2.type || DEFAULT_CROP,
        x: crop2.x,
        y: crop2.y,
        zoom: crop2.zoom,
        ...cropDimensions
      });
      if (transformations.length > 0) {
        if (crop2.source === true) {
          sourceTransformations.push(transformations);
        } else {
          finalTransformations.push(transformations);
        }
      }
    }
    sourceTransformations.forEach((transformation) => {
      if (transformation.length > 0) {
        cldAsset.addTransformation(transformation.join(","));
      }
    });
    const results = {
      options: {}
    };
    if (results.options && finalTransformations.length > 0) {
      results.options.resize = finalTransformations.map((transformation) => transformation.join(",")).join("/");
    }
    return results;
  }
};
function collectTransformations(collectOptions) {
  const { aspectRatio: aspectRatio2, type: crop2, x: x2, y: y2, zoom: zoom2 } = collectOptions;
  let gravity2 = collectOptions.gravity;
  const height2 = normalizeNumberParameter(collectOptions.height);
  const width2 = normalizeNumberParameter(collectOptions.width);
  const transformations = [];
  const hasDefinedDimensions = height2 || width2;
  const hasValidAspectRatio = aspectRatio2 && cropsAspectRatio.includes(crop2);
  const hasXCoordinate = typeof x2 === "number" || typeof x2 === "string";
  const hasYCoordinate = typeof y2 === "number" || typeof y2 === "string";
  const hasDefinedCoordinates = hasXCoordinate || hasYCoordinate;
  if (crop2 && (hasDefinedDimensions || hasValidAspectRatio || hasDefinedCoordinates)) {
    transformations.push(`c_${crop2}`);
  }
  if (hasValidAspectRatio) {
    transformations.push(`ar_${aspectRatio2}`);
  }
  if (width2) {
    transformations.push(`w_${width2}`);
  }
  if (!["limit"].includes(crop2) && typeof height2 === "number") {
    transformations.push(`h_${height2}`);
  }
  if (hasXCoordinate) {
    transformations.push(`x_${x2}`);
  }
  if (hasYCoordinate) {
    transformations.push(`y_${y2}`);
  }
  if (!gravity2 && cropsGravityAuto.includes(crop2) && !hasDefinedCoordinates) {
    gravity2 = "auto";
  }
  if (gravity2) {
    if (gravity2 === "auto" && !cropsGravityAuto.includes(crop2)) {
      console.warn(
        `Auto gravity can only be used with crop modes: ${cropsGravityAuto.join(
          ", "
        )}. Not applying gravity.`
      );
    } else {
      transformations.push(`g_${gravity2}`);
    }
  }
  if (zoom2) {
    if (zoom2 === "auto" && !cropsWithZoom.includes(crop2)) {
      console.warn(
        `Zoom can only be used with crop modes: ${cropsWithZoom.join(
          ", "
        )}. Not applying zoom.`
      );
    } else {
      transformations.push(`z_${zoom2}`);
    }
  }
  return transformations;
}
var effectProps = {
  angle: effects.angle.schema.optional(),
  art: effects.art.schema.optional(),
  autoBrightness: effects.autoBrightness.schema.optional(),
  autoColor: effects.autoColor.schema.optional(),
  autoContrast: effects.autoContrast.schema.optional(),
  assistColorblind: effects.assistColorblind.schema.optional(),
  background: effects.background.schema.optional(),
  blackwhite: effects.blackwhite.schema.optional(),
  blur: effects.blur.schema.optional(),
  blurFaces: effects.blurFaces.schema.optional(),
  blurRegion: effects.blurRegion.schema.optional(),
  border: effects.border.schema.optional(),
  brightness: effects.brightness.schema.optional(),
  brightnessHSB: effects.brightnessHSB.schema.optional(),
  cartoonify: effects.cartoonify.schema.optional(),
  color: effects.color.schema.optional(),
  colorize: effects.colorize.schema.optional(),
  contrast: effects.contrast.schema.optional(),
  distort: effects.distort.schema.optional(),
  fillLight: effects.fillLight.schema.optional(),
  gamma: effects.gamma.schema.optional(),
  gradientFade: effects.gradientFade.schema.optional(),
  grayscale: effects.grayscale.schema.optional(),
  improve: effects.improve.schema.optional(),
  loop: effects.loop.schema.optional(),
  multiply: effects.multiply.schema.optional(),
  negate: effects.negate.schema.optional(),
  oilPaint: effects.oilPaint.schema.optional(),
  opacity: effects.opacity.schema.optional(),
  outline: effects.outline.schema.optional(),
  pixelate: effects.pixelate.schema.optional(),
  pixelateFaces: effects.pixelateFaces.schema.optional(),
  pixelateRegion: effects.pixelateRegion.schema.optional(),
  radius: effects.radius.schema.optional(),
  redeye: effects.redeye.schema.optional(),
  replaceColor: effects.replaceColor.schema.optional(),
  saturation: effects.saturation.schema.optional(),
  screen: effects.screen.schema.optional(),
  sepia: effects.sepia.schema.optional(),
  shadow: effects.shadow.schema.optional(),
  sharpen: effects.sharpen.schema.optional(),
  shear: effects.shear.schema.optional(),
  simulateColorblind: effects.simulateColorblind.schema.optional(),
  tint: effects.tint.schema.optional(),
  trim: effects.trim.schema.optional(),
  unsharpMask: effects.unsharpMask.schema.optional(),
  vectorize: effects.vectorize.schema.optional(),
  vibrance: effects.vibrance.schema.optional(),
  vignette: effects.vignette.schema.optional()
};
var effectsProps = {
  effects: z.array(z.object(effectProps)).describe(
    JSON.stringify({
      text: "Array of objects specifying transformations to be applied to asset."
    })
  ).optional(),
  ...effectProps
};
var effectsPlugin = {
  props: effectsProps,
  assetTypes: ["image", "images", "video", "videos"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    const transformationStrings = constructTransformationString({
      effects,
      options
    });
    transformationStrings.filter((t) => !!t).forEach((transformation) => cldAsset.effect(transformation));
    if (Array.isArray(options?.effects)) {
      options?.effects.forEach((effectsSet) => {
        const transformationString = constructTransformationString({
          effects,
          options: effectsSet
        }).filter((t) => !!t).join(",");
        cldAsset.effect(transformationString);
      });
    }
    function constructTransformationString({
      effects: effects2,
      options: options2
    }) {
      return Object.keys(effects2).map(
        (key) => {
          const { prefix, qualifier, converters } = effects2[key];
          return constructTransformation({
            qualifier,
            prefix,
            value: options2?.[key],
            converters
          });
        }
      );
    }
    return {};
  }
};

// src/plugins/flags.ts
var { flagsEnum: flagsEnum2 } = parameters_exports;
var flagsProps = {
  flags: flags.schema.optional()
};
var flagsPlugin = {
  props: flagsProps,
  assetTypes: ["image", "images", "video", "videos"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    const { flags: flags2 = [] } = options;
    if (Array.isArray(flags2) && flags2.length > 0) {
      flags2.forEach((flag) => {
        const { success } = flagsEnum2.safeParse(flag);
        if (!success) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`Invalid flag ${flag}, not applying.`);
          }
          return;
        }
        cldAsset.addFlag(flag);
      });
    } else if (typeof flags2 === "object") {
      Object.entries(flags2).forEach(([qualifier, value]) => {
        const { success } = flagsEnum2.safeParse(qualifier);
        if (!success) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`Invalid flag ${qualifier}, not applying.`);
          }
          return;
        }
        cldAsset.addTransformation(`fl_${qualifier}:${value}`);
      });
    }
    return {};
  }
};
var NamedTransformationSchema = z.string();
var namedTransformationsProps = {
  namedTransformations: z.union([NamedTransformationSchema, z.array(NamedTransformationSchema)]).describe(
    JSON.stringify({
      text: "Named transformations to apply to asset.",
      url: "https://cloudinary.com/documentation/image_transformations#named_transformations"
    })
  ).optional(),
  /**
   * @deprecated use {@link `namedTransformations`} instead
   */
  transformations: z.union([NamedTransformationSchema, z.array(NamedTransformationSchema)]).describe(
    JSON.stringify({
      text: "Deprecated: use namedTransformations instead",
      url: "https://cloudinary.com/documentation/image_transformations#named_transformations"
    })
  ).optional()
};
var namedTransformationsPlugin = {
  props: namedTransformationsProps,
  strict: true,
  assetTypes: ["image", "images", "video", "videos"],
  plugin: ({ cldAsset, options }) => {
    const { transformations, namedTransformations } = options;
    if (transformations && process.env.NODE_ENVIRONMENT === "development") {
      console.warn(
        "The transformations prop is deprecated. Please use namedTransformations instead."
      );
    }
    let _namedTransformations = namedTransformations || transformations || [];
    if (!Array.isArray(_namedTransformations)) {
      _namedTransformations = [_namedTransformations];
    }
    _namedTransformations.forEach((transformation) => {
      cldAsset.addTransformation(`t_${transformation}`);
    });
    return {};
  }
};
var overlayTextSchema = z.object({
  alignment: z.string().optional(),
  antialias: z.string().optional(),
  border: z.string().optional(),
  color: z.string().optional(),
  fontFamily: z.string().optional(),
  fontSize: z.number().optional(),
  fontStyle: z.union([z.string(), z.number()]).optional(),
  fontWeight: z.string().optional(),
  hinting: z.union([z.string(), z.number()]).optional(),
  letterSpacing: z.union([z.string(), z.number()]).optional(),
  lineSpacing: z.union([z.string(), z.number()]).optional(),
  stroke: z.string().optional(),
  text: z.string()
  // Required if using object format
});
var overlayPositionSchema = z.object({
  angle: angle.schema.optional(),
  gravity: gravity.schema.optional(),
  x: x.schema.optional(),
  y: y.schema.optional()
});
var overlaySchema = z.object({
  appliedEffects: z.array(z.object({})).optional(),
  appliedFlags: flags.schema.optional(),
  effects: z.array(z.object({})).optional(),
  crop: crop.schema.optional(),
  flags: flags.schema.optional(),
  height: height.schema.optional(),
  position: overlayPositionSchema.optional(),
  publicId: z.string().optional(),
  text: z.union([z.string(), overlayTextSchema]).optional(),
  url: z.string().optional(),
  width: width.schema.optional()
});
var DEFAULT_TEXT_OPTIONS = {
  color: "black",
  fontFamily: "Arial",
  fontSize: 200,
  fontWeight: "bold"
};
var overlaysProps = {
  overlay: overlaySchema.describe(
    JSON.stringify({
      text: "Image or text layer that is applied on top of the base image.",
      url: "https://cloudinary.com/documentation/transformation_reference#l_layer"
    })
  ).optional(),
  overlays: z.array(overlaySchema).describe(
    JSON.stringify({
      text: "Image or text layers that are applied on top of the base image.",
      url: "https://cloudinary.com/documentation/transformation_reference#l_layer"
    })
  ).optional(),
  text: z.string().describe(
    JSON.stringify({
      text: "Text to be overlaid on asset.",
      url: "https://cloudinary.com/documentation/image_transformations#transformation_url_structure"
    })
  ).optional()
};
var overlaysPlugin = {
  props: overlaysProps,
  assetTypes: ["image", "images", "video", "videos"],
  plugin: ({ cldAsset, options }) => {
    const { text: text2, overlays = [] } = options;
    const type = "overlay";
    const typeQualifier = "l";
    if (Array.isArray(overlays)) {
      overlays.forEach(applyOverlay);
    }
    if (typeof text2 === "string") {
      applyOverlay({
        text: Object.assign({}, DEFAULT_TEXT_OPTIONS, {
          text: text2
        })
      });
    } else if (typeof text2 === "object") {
      applyOverlay({
        text: Object.assign({}, DEFAULT_TEXT_OPTIONS, text2)
      });
    }
    function applyOverlay({
      publicId,
      url,
      position: position2,
      text: text3,
      effects: layerEffects = [],
      appliedEffects = [],
      flags: layerFlags = [],
      appliedFlags = [],
      ...options2
    }) {
      const hasPublicId = typeof publicId === "string";
      const hasUrl = typeof url === "string";
      const hasText = typeof text3 === "object" || typeof text3 === "string";
      const hasPosition = typeof position2 === "object";
      if (!hasPublicId && !hasUrl && !hasText) {
        console.warn(`An ${type} is missing Public ID, URL, or Text`);
        return;
      }
      let layerTransformation;
      if (hasText) {
        layerTransformation = `${typeQualifier}_text`;
      } else if (hasPublicId) {
        layerTransformation = `${typeQualifier}_${publicId.replace(
          /\//g,
          ":"
        )}`;
      } else if (hasUrl) {
        layerTransformation = `${typeQualifier}_fetch:${encodeBase64(url)}`;
      }
      const primary2 = [];
      const applied = [];
      Object.keys(options2).forEach((key) => {
        if (!objectHasKey(primary, key)) return;
        const { qualifier, converters } = primary[key];
        const transformation = constructTransformation({
          qualifier,
          value: options2[key],
          converters
        });
        if (transformation) {
          primary2.push(transformation);
        }
      });
      layerEffects.forEach((effect) => {
        Object.keys(effect).forEach((key) => {
          const effectQualifier = primary[key] || effects[key] || position[key];
          if (!effectQualifier) return;
          const { qualifier, prefix, converters } = effectQualifier;
          const transformation = constructTransformation({
            qualifier,
            prefix,
            value: effect[key],
            converters
          });
          if (transformation) {
            primary2.push(transformation);
          }
        });
      });
      appliedEffects.forEach((effect) => {
        Object.keys(effect).forEach((key) => {
          const effectQualifier = primary[key] || effects[key] || position[key];
          if (!effectQualifier) return;
          const { qualifier, prefix, converters } = effectQualifier;
          const transformation = constructTransformation({
            qualifier,
            prefix,
            value: effect[key],
            converters
          });
          if (transformation) {
            applied.push(transformation);
          }
        });
      });
      const activeLayerFlags = Array.isArray(layerFlags) ? layerFlags : [layerFlags];
      activeLayerFlags.forEach((flag) => {
        const { success } = flagsEnum.safeParse(flag);
        if (!success) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`Invalid flag ${flag}, not applying.`);
          }
          return;
        }
        primary2.push(`fl_${flag}`);
      });
      const activeAppliedFlags = Array.isArray(appliedFlags) ? appliedFlags : [appliedFlags];
      activeAppliedFlags.forEach((flag) => {
        const { success } = flagsEnum.safeParse(flag);
        if (!success) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`Invalid flag ${flag}, not applying.`);
          }
          return;
        }
        applied.push(`fl_${flag}`);
      });
      if (hasText) {
        if (typeof text3 === "string") {
          text3 = {
            ...DEFAULT_TEXT_OPTIONS,
            text: text3
          };
        }
        const textTransformations = [];
        if (typeof text3 === "object") {
          const textOptions = Object.keys(text3).filter((key) => objectHasKey(text, key)).map((key) => {
            const value = text3 && objectHasKey(text3, key) && text3[key];
            return {
              ...text[key],
              key,
              value,
              order: text[key].order || 99
            };
          });
          const sortedTextOptions = sortByKey(textOptions, "order");
          for (const textOption of sortedTextOptions) {
            const { key, value, qualifier, location, converters } = textOption;
            let textValue = value;
            converters?.forEach(({ test, convert }) => {
              if (!test(value)) return;
              textValue = convert(value);
            });
            if (location === "primary") {
              primary2.push(`${qualifier}_${textValue}`);
            } else if (qualifier === "self") {
              textTransformations.push(key);
            } else if (qualifier) {
              textTransformations.push(`${qualifier}_${textValue}`);
            } else {
              textTransformations.push(textValue);
            }
          }
        }
        const specialCharacters = {
          ".": "%2E",
          ",": "%2C",
          "/": "%2F"
        };
        let layerText = text3?.text || "";
        if (typeof layerText === "string") {
          Object.keys(specialCharacters)?.forEach((character) => {
            layerText = layerText?.replace(
              character,
              specialCharacters[character]
            );
          });
        }
        layerTransformation = `${layerTransformation}:${textTransformations.join(
          "_"
        )}:${layerText}`;
      }
      if (hasPosition) {
        Object.keys(position2).forEach((key) => {
          if (!objectHasKey(position, key) || !objectHasKey(position2, key))
            return;
          const { qualifier, converters } = position[key];
          const transformation = constructTransformation({
            qualifier,
            value: position2[key],
            converters
          });
          if (transformation) {
            applied.push(transformation);
          }
        });
      }
      if (primary2.length > 0) {
        layerTransformation = `${layerTransformation},${primary2.join(",")}`;
      }
      layerTransformation = `${layerTransformation}/fl_layer_apply,fl_no_overflow`;
      if (applied.length > 0) {
        layerTransformation = `${layerTransformation},${applied.join(",")}`;
      }
      cldAsset.addTransformation(layerTransformation);
    }
    return {};
  }
};
var preserveTransformationsProps = {
  preserveTransformations: z.boolean().describe(
    JSON.stringify({
      text: "Preserves transformations from a Cloudinary URL when using using a Cloudinary URL as the asset source (src)."
    })
  ).optional()
};
var preserveTransformationsPlugin = {
  props: preserveTransformationsProps,
  assetTypes: ["image", "images", "video", "videos"],
  plugin: ({ cldAsset, options }) => {
    const { preserveTransformations = false } = options;
    if (preserveTransformations) {
      try {
        const transformations = getTransformations(options.src).map((t) => t.join(","));
        transformations.flat().forEach((transformation) => {
          cldAsset.addTransformation(transformation);
        });
      } catch (e) {
        console.warn(`Failed to preserve transformations: ${e.message}`);
      }
    }
    return {};
  }
};
var RawTransformationSchema = z.string();
var rawTransformationsProps = {
  rawTransformations: z.union([RawTransformationSchema, z.array(RawTransformationSchema)]).describe(
    JSON.stringify({
      text: "Array of transformation parameters using the Cloudinary URL API to apply to an asset.",
      url: "https://cloudinary.com/documentation/transformation_reference"
    })
  ).optional()
};
var rawTransformationsPlugin = {
  props: rawTransformationsProps,
  assetTypes: ["image", "images", "video", "videos"],
  plugin: ({ cldAsset, options }) => {
    let { rawTransformations = [] } = options;
    if (!Array.isArray(rawTransformations)) {
      rawTransformations = [rawTransformations];
    }
    rawTransformations.forEach((transformation) => {
      cldAsset.addTransformation(transformation);
    });
    return {};
  }
};
var removeBackgroundProps = {
  removeBackground: z.boolean().describe(
    JSON.stringify({
      text: "Removes the background of an image using the Cloudinary AI Background Removal Add-On (Required).",
      url: "https://cloudinary.com/documentation/cloudinary_ai_background_removal_addon"
    })
  ).optional()
};
var removeBackgroundPlugin = {
  props: removeBackgroundProps,
  assetTypes: ["image", "images"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    const { removeBackground = false } = options;
    if (removeBackground) {
      cldAsset.effect("e_background_removal");
    }
    return {};
  }
};
var sanitizeProps = {
  sanitize: z.boolean().describe(
    JSON.stringify({
      text: "Runs a sanitizer on SVG images.",
      url: "https://cloudinary.com/documentation/transformation_reference#fl_sanitize"
    })
  ).optional()
};
var sanitizePlugin = {
  props: sanitizeProps,
  assetTypes: ["image", "images"],
  plugin: ({ cldAsset, options }) => {
    const { sanitize = true } = options;
    const shouldApplySanitizer = sanitize && (options.format === "svg" || cldAsset.publicID.endsWith(".svg"));
    if (shouldApplySanitizer) {
      cldAsset.effect("fl_sanitize");
    }
    return {};
  }
};
var seoProps = {
  seoSuffix: z.string().describe(
    JSON.stringify({
      text: "Configures the URL to include an SEO-friendly suffix in the URL",
      url: "https://cloudinary.com/documentation/advanced_url_delivery_options#seo_friendly_media_asset_urls"
    })
  ).optional()
};
var seoPlugin = {
  props: seoProps,
  assetTypes: ["image", "images", "video", "videos"],
  plugin: ({ cldAsset, options }) => {
    const { seoSuffix } = options;
    if (typeof seoSuffix === "string") {
      if (options.deliveryType === "fetch") {
        console.warn(
          "SEO suffix is not supported with a delivery type of fetch"
        );
      } else {
        cldAsset.setSuffix(seoSuffix);
      }
    }
    return {};
  }
};
var underlayPositionSchema = z.object({
  angle: angle.schema.optional(),
  gravity: gravity.schema.optional(),
  x: x.schema.optional(),
  y: y.schema.optional()
});
var underlaySchema = z.object({
  appliedEffects: z.array(z.object({})).optional(),
  appliedFlags: flags.schema.optional(),
  effects: z.array(z.object({})).optional(),
  crop: crop.schema.optional(),
  flags: flags.schema.optional(),
  height: height.schema.optional(),
  position: underlayPositionSchema.optional(),
  publicId: z.string().optional(),
  type: z.string().optional(),
  url: z.string().optional(),
  width: width.schema.optional()
});
var underlaysProps = {
  underlay: z.string().describe(
    JSON.stringify({
      text: "Public ID of image that is applied under the base image.",
      url: "https://cloudinary.com/documentation/transformation_reference#l_layer"
    })
  ).optional(),
  underlays: z.array(underlaySchema).describe(
    JSON.stringify({
      text: "Image layers that are applied under the base image.",
      url: "https://cloudinary.com/documentation/transformation_reference#l_layer"
    })
  ).optional()
};
var underlaysPlugin = {
  props: underlaysProps,
  assetTypes: ["image", "images", "video", "videos"],
  plugin: ({ cldAsset, options }) => {
    const { underlay, underlays = [] } = options;
    const typeQualifier = "u";
    if (Array.isArray(underlays)) {
      underlays.forEach(applyUnderlay);
    }
    if (typeof underlay === "string") {
      const underlayOptions = {
        publicId: underlay,
        crop: "fill",
        width: "1.0",
        height: "1.0",
        flags: ["relative"]
      };
      applyUnderlay(underlayOptions);
    }
    function applyUnderlay({
      publicId,
      type,
      position: position2,
      effects: layerEffects = [],
      flags: layerFlags = [],
      appliedFlags = [],
      ...options2
    }) {
      const hasPublicId = typeof publicId === "string";
      const hasPosition = typeof position2 === "object";
      if (!hasPublicId) {
        console.warn(`An ${type} is missing a Public ID`);
        return;
      }
      let layerTransformation = `${typeQualifier}_${publicId.replace(
        /\//g,
        ":"
      )}`;
      const primary2 = [];
      const applied = [];
      Object.keys(options2).forEach((key) => {
        if (!objectHasKey(primary, key)) return;
        const { qualifier } = primary[key];
        primary2.push(`${qualifier}_${options2[key]}`);
      });
      layerEffects.forEach((effect) => {
        Object.keys(effect).forEach((key) => {
          if (!objectHasKey(primary, key)) return;
          const { qualifier } = primary[key];
          primary2.push(`${qualifier}_${effect[key]}`);
        });
      });
      if (hasPosition) {
        Object.keys(position2).forEach(
          (key) => {
            if (!objectHasKey(position, key)) return;
            const { qualifier } = position[key];
            applied.push(`${qualifier}_${position2[key]}`);
          }
        );
      }
      const activeLayerFlags = Array.isArray(layerFlags) ? layerFlags : [layerFlags];
      activeLayerFlags.forEach((flag) => {
        const { success } = flagsEnum.safeParse(flag);
        if (!success) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`Invalid flag ${flag}, not applying.`);
          }
          return;
        }
        primary2.push(`fl_${flag}`);
      });
      const activeAppliedFlags = Array.isArray(appliedFlags) ? appliedFlags : [appliedFlags];
      activeAppliedFlags.forEach((flag) => {
        const { success } = flagsEnum.safeParse(flag);
        if (!success) {
          if (process.env.NODE_ENV === "development") {
            console.warn(`Invalid flag ${flag}, not applying.`);
          }
          return;
        }
        applied.push(`fl_${flag}`);
      });
      layerTransformation = `${layerTransformation},${primary2.join(",")}`;
      layerTransformation = `${layerTransformation}/fl_layer_apply,fl_no_overflow`;
      if (applied.length > 0) {
        layerTransformation = `${layerTransformation},${applied.join(",")}`;
      }
      cldAsset.addTransformation(layerTransformation);
    }
    return {};
  }
};
var versionProps = {
  version: z.union([z.number(), z.string()]).describe(
    JSON.stringify({
      text: "Custom version number to apply to asset URL.",
      url: "https://cloudinary.com/documentation/advanced_url_delivery_options#asset_versions"
    })
  ).optional()
};
var versionPlugin = {
  props: versionProps,
  assetTypes: ["image", "images", "video", "videos"],
  plugin: ({ cldAsset, options }) => {
    const { version } = options;
    if (typeof version === "string" || typeof version === "number") {
      cldAsset.setVersion(`${version}`.replace("v", ""));
    }
    return {};
  }
};

// src/types/asset.ts
var assetOptionsSchema = z.object({
  assetType: z.string().default("image").describe(
    JSON.stringify({
      text: "The type of asset to deliver.",
      url: "https://cloudinary.com/documentation/image_transformations#transformation_url_structure"
    })
  ).optional(),
  deliveryType: z.string().default("upload").describe(
    JSON.stringify({
      text: "Delivery method of the asset.",
      url: "https://cloudinary.com/documentation/image_transformations#delivery_types"
    })
  ).optional(),
  dpr: z.union([z.string(), z.number()]).describe(
    JSON.stringify({
      text: "Delivery method of the asset.",
      url: "https://cloudinary.com/documentation/image_transformations#delivery_types"
    })
  ).optional(),
  format: z.string().default("auto").describe(
    JSON.stringify({
      text: "Converts (if necessary) and delivers an asset in the specified format.",
      url: "https://cloudinary.com/documentation/transformation_reference#f_format"
    })
  ).optional(),
  height: z.union([z.string(), z.number()]).describe(
    JSON.stringify({
      text: "Height of the given asset."
    })
  ).optional(),
  quality: z.union([z.string(), z.number(), z.string()]).default("auto").describe(
    JSON.stringify({
      text: "Quality of the delivered asset",
      url: "https://cloudinary.com/documentation/transformation_reference#q_quality"
    })
  ).optional(),
  src: z.string().describe(
    JSON.stringify({
      text: "Cloudinary Public ID or versioned Cloudinary URL (/v1234/)"
    })
  ),
  strictTransformations: z.boolean().describe(
    JSON.stringify({
      text: "Gives you the ability to have more control over what transformations are permitted to be used from your Cloudinary account.",
      url: "https://cloudinary.com/documentation/control_access_to_media#strict_transformations"
    })
  ).optional(),
  width: z.union([z.string(), z.number()]).describe(
    JSON.stringify({
      text: "Width of the given asset."
    })
  ).optional(),
  // Spreading plugins instead of extend or merge to avoid excessive schema warning
  // https://github.com/microsoft/TypeScript/issues/34933#issuecomment-1772787785
  ...croppingProps,
  ...effectsProps,
  ...flagsProps,
  ...namedTransformationsProps,
  ...overlaysProps,
  ...preserveTransformationsProps,
  ...rawTransformationsProps,
  ...removeBackgroundProps,
  ...sanitizeProps,
  ...seoProps,
  ...underlaysProps,
  ...versionProps
});
var defaultImageProps = {
  defaultImage: z.string().describe(
    JSON.stringify({
      text: "Configures the default image to use in case the given public ID is not available. Must include file extension.",
      url: "https://cloudinary.com/documentation/transformation_reference#d_default_image"
    })
  ).optional()
};
var defaultImagePlugin = {
  props: defaultImageProps,
  assetTypes: ["image", "images"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    const { defaultImage } = options;
    if (typeof defaultImage === "string") {
      if (!getFormat(defaultImage)) {
        console.warn(
          `The defaultImage prop may be missing a format and must include it along with the public ID. (Ex: myimage.jpg)`
        );
      }
      const defaultImageId = defaultImage.replace(/\//g, ":");
      cldAsset.addTransformation(`d_${defaultImageId}`);
    }
    return {};
  }
};
var enhanceProps = {
  enhance: z.boolean().describe(
    JSON.stringify({
      text: "Uses AI to analyze an image and make adjustments to enhance the appeal of the image.",
      url: "https://cloudinary.com/documentation/transformation_reference#e_enhance"
    })
  ).optional()
};
var enhancePlugin = {
  props: enhanceProps,
  assetTypes: ["image", "images"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    const { enhance = false } = options;
    if (enhance) {
      cldAsset.effect("e_enhance");
    }
    return {};
  }
};
var extractProps = {
  extract: z.union([
    prompt.schema.optional(),
    z.array(prompt.schema).optional(),
    z.object({
      invert: z.boolean().default(false).optional(),
      mode: extractMode.schema.optional(),
      multiple: multiple.schema.default(false).optional(),
      prompt: z.union([prompt.schema, z.array(prompt.schema)]).optional()
    })
  ]).describe(
    JSON.stringify({
      text: "Extracts an area or multiple areas of an image, described in natural language.",
      url: "https://cloudinary.com/documentation/transformation_reference#e_extract"
    })
  ).optional()
};
var extractPlugin = {
  props: extractProps,
  assetTypes: ["image", "images"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    const { extract } = options;
    if (!extract || typeof extract === "undefined") return {};
    const properties = [];
    if (typeof extract === "string") {
      properties.push(`prompt_${extract}`);
    } else if (Array.isArray(extract)) {
      properties.push(`prompt_${formatPrompts(extract)}`);
    } else if (typeof extract === "object" && !Array.isArray(extract)) {
      const prompt2 = formatPrompts(extract.prompt);
      if (prompt2) {
        properties.push(`prompt_${prompt2}`);
      }
      if (extract.invert === true) {
        properties.push("invert_true");
      }
      if (typeof extract.mode === "string") {
        properties.push(`mode_${extract.mode}`);
      }
      if (extract.multiple === true) {
        properties.push("multiple_true");
      }
    }
    if (properties.length > 0) {
      const transformation = `e_extract:${properties.join(";")}`;
      cldAsset.addTransformation(transformation);
    }
    return {};
  }
};
function formatPrompts(prompt2) {
  if (typeof prompt2 === "string") return prompt2;
  if (Array.isArray(prompt2)) {
    return `(${prompt2.filter((prompt3) => typeof prompt3 === "string").join(";")})`;
  }
  return void 0;
}
var defaultCrop = "pad";
var fillBackgroundProps = {
  fillBackground: z.union([
    z.boolean(),
    z.object({
      crop: crop.schema.optional(),
      gravity: gravity.schema.optional(),
      prompt: z.string().optional()
    })
  ]).describe(
    JSON.stringify({
      text: "Uses Generative Fill to extended padded image with AI",
      url: "https://cloudinary.com/documentation/transformation_reference#b_gen_fill"
    })
  ).optional()
};
var fillBackgroundPlugin = {
  props: fillBackgroundProps,
  assetTypes: ["image", "images"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    const { fillBackground } = options;
    if (typeof fillBackground === "undefined") return {};
    const width2 = normalizeNumberParameter(options.width);
    const height2 = normalizeNumberParameter(options.height);
    const hasDefinedDimensions = typeof height2 === "number" && typeof width2 === "number";
    let aspectRatio2 = options.aspectRatio;
    if (!aspectRatio2 && hasDefinedDimensions) {
      aspectRatio2 = `${width2}:${height2}`;
    }
    if (!aspectRatio2) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          `Could not determine aspect ratio based on available options to use fillBackground. Please specify width and height or an aspect ratio.`
        );
      }
      return {};
    }
    if (fillBackground === true) {
      const properties = [
        "b_gen_fill",
        `ar_${aspectRatio2}`,
        `c_${defaultCrop}`
      ];
      cldAsset.addTransformation(properties.join(","));
    } else if (typeof fillBackground === "object") {
      const { crop: crop2 = defaultCrop, gravity: gravity2, prompt: prompt2 } = fillBackground;
      const properties = [`ar_${aspectRatio2}`, `c_${crop2}`];
      if (typeof prompt2 === "string") {
        properties.unshift(`b_gen_fill:${prompt2}`);
      } else {
        properties.unshift(`b_gen_fill`);
      }
      if (typeof gravity2 === "string") {
        properties.push(`g_${gravity2}`);
      }
      cldAsset.addTransformation(properties.join(","));
    }
    return {};
  }
};
var imageOptionsRecolorPromptSchema = z.union([
  z.string(),
  z.array(z.string())
]);
var imageOptionsRecolorSchema = z.object({
  prompt: imageOptionsRecolorPromptSchema.optional(),
  to: z.string().optional(),
  multiple: z.boolean().optional()
});
var recolorProps = {
  recolor: z.union([imageOptionsRecolorPromptSchema, imageOptionsRecolorSchema]).describe(
    JSON.stringify({
      text: "Uses generative AI to recolor parts of your image, maintaining the relative shading.",
      url: "https://cloudinary.com/documentation/transformation_reference#e_gen_recolor"
    })
  ).optional()
};
var recolorPlugin = {
  props: recolorProps,
  assetTypes: ["image", "images"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    const { recolor } = options;
    const recolorOptions = {
      prompt: void 0,
      "to-color": void 0,
      multiple: void 0
    };
    if (Array.isArray(recolor)) {
      if (Array.isArray(recolor[0])) {
        recolorOptions.prompt = promptArrayToString(recolor[0]);
      } else {
        recolorOptions.prompt = recolor[0];
      }
      if (typeof recolor[1] === "string") {
        recolorOptions["to-color"] = recolor[1];
      }
    } else if (typeof recolor === "object") {
      if (typeof recolor.prompt === "string") {
        recolorOptions.prompt = recolor.prompt;
      } else if (Array.isArray(recolor.prompt)) {
        recolorOptions.prompt = promptArrayToString(recolor.prompt);
      }
      if (typeof recolor.to === "string") {
        recolorOptions["to-color"] = recolor.to;
      }
      if (recolor.multiple === true) {
        recolorOptions.multiple = `true`;
      }
    }
    const transformation = Object.entries(recolorOptions).filter(([, value]) => !!value).map(([key, value]) => `${key}_${value}`).join(";");
    if (transformation) {
      cldAsset.addTransformation(`e_gen_recolor:${transformation}`);
    }
    return {};
  }
};
var imageOptionsRemovePromptSchema = z.union([
  z.string(),
  z.array(z.string())
]);
var imageOptionsRemoveSchema = z.object({
  prompt: imageOptionsRemovePromptSchema.optional(),
  region: z.union([z.array(z.number()), z.array(z.array(z.number()))]).optional(),
  multiple: z.boolean().optional(),
  removeShadow: z.boolean().optional()
});
var removeProps = {
  remove: z.union([imageOptionsRemovePromptSchema, imageOptionsRemoveSchema]).describe(
    JSON.stringify({
      text: "Applies zooming and/or panning to an image, resulting in a video or animated image.",
      url: "https://cloudinary.com/documentation/transformation_reference#e_zoompan"
    })
  ).optional()
};
var removePlugin = {
  props: removeProps,
  assetTypes: ["image", "images"],
  plugin: ({ cldAsset, options }) => {
    const { remove } = options;
    const removeOptions = {
      prompt: void 0,
      region: void 0,
      multiple: void 0,
      "remove-shadow": void 0
    };
    if (typeof remove === "string") {
      removeOptions.prompt = remove;
    } else if (Array.isArray(remove)) {
      removeOptions.prompt = promptArrayToString(remove);
    } else if (typeof remove === "object") {
      const hasPrompt = typeof remove.prompt === "string" || Array.isArray(remove.prompt);
      const hasRegion = Array.isArray(remove.region);
      if (hasPrompt && hasRegion) {
        throw new Error(
          "Invalid remove options: you can not have both a prompt and a region. More info: https://cloudinary.com/documentation/transformation_reference#e_gen_remove"
        );
      }
      if (typeof remove.prompt === "string") {
        removeOptions.prompt = remove.prompt;
      } else if (Array.isArray(remove.prompt)) {
        removeOptions.prompt = promptArrayToString(remove.prompt);
      }
      if (Array.isArray(remove.region)) {
        removeOptions.region = regionArrayToString(remove.region);
      }
      if (remove.multiple === true) {
        removeOptions.multiple = `true`;
      }
      if (remove.removeShadow === true) {
        removeOptions["remove-shadow"] = `true`;
      }
    }
    const transformation = Object.entries(removeOptions).filter(([, value]) => !!value).map(([key, value]) => `${key}_${value}`).join(";");
    if (transformation) {
      cldAsset.addTransformation(`e_gen_remove:${transformation}`);
    }
    return {};
  }
};
function regionArrayToString(regionArray) {
  const indexes = {
    0: "x",
    1: "y",
    2: "w",
    3: "h"
  };
  const regionString = regionArray.map((region, index) => {
    if (Array.isArray(region)) {
      return regionArrayToString(region);
    }
    const key = indexes[index];
    return `${key}_${region}`;
  }).join(";");
  return `(${regionString})`;
}
var replaceBackgroundProps = {
  replaceBackground: z.union([
    z.boolean(),
    z.string(),
    z.object({
      seed: z.number().optional(),
      prompt: z.string().optional()
    })
  ]).describe(
    JSON.stringify({
      text: "Replaces the background of an image with an AI-generated background.",
      url: "https://cloudinary.com/documentation/transformation_reference#e_gen_background_replace"
    })
  ).optional()
};
var replaceBackgroundPlugin = {
  props: replaceBackgroundProps,
  assetTypes: ["image", "images"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    const { replaceBackground } = options;
    if (!replaceBackground || typeof replaceBackground === "undefined") return {};
    const properties = [];
    if (typeof replaceBackground === "object") {
      if (typeof replaceBackground.prompt !== "undefined") {
        properties.push(`prompt_${replaceBackground.prompt}`);
      }
      if (typeof replaceBackground.seed === "number") {
        properties.push(`seed_${replaceBackground.seed}`);
      }
    } else if (typeof replaceBackground === "string") {
      properties.push(`prompt_${replaceBackground}`);
    }
    let transformation = "e_gen_background_replace";
    if (properties.length > 0) {
      transformation = `${transformation}:${properties.join(";")}`;
    }
    cldAsset.addTransformation(transformation);
    return {};
  }
};
var replaceProps = {
  replace: z.union([
    z.array(z.string()),
    z.array(z.boolean()),
    z.object({
      to: z.string(),
      from: z.string(),
      preserveGeometry: z.boolean().optional()
    })
  ]).describe(
    JSON.stringify({
      text: "Uses generative AI to replace parts of your image with something else.",
      url: "https://cloudinary.com/documentation/transformation_reference#e_gen_replace"
    })
  ).optional()
};
var replacePlugin = {
  props: replaceProps,
  assetTypes: ["image", "images"],
  plugin: ({ cldAsset, options }) => {
    const { replace = null } = options;
    if (replace) {
      let from, to, preserveGeometry = false;
      if (Array.isArray(replace)) {
        from = replace[0];
        to = replace[1];
        preserveGeometry = replace[2] || false;
      } else {
        from = replace.from;
        to = replace.to;
        preserveGeometry = replace.preserveGeometry || false;
      }
      const properties = [`e_gen_replace:from_${from}`, `to_${to}`];
      if (preserveGeometry) {
        properties.push(`preserve-geometry_${preserveGeometry}`);
      }
      cldAsset.effect(properties.join(";"));
    }
    return {};
  }
};
var restoreProps = {
  restore: z.boolean().describe(
    JSON.stringify({
      text: "Uses generative AI to restore details in poor quality images or images that may have become degraded through repeated processing and compression.",
      url: "https://cloudinary.com/documentation/transformation_reference#e_gen_restore"
    })
  ).optional()
};
var restorePlugin = {
  props: restoreProps,
  assetTypes: ["image", "images"],
  plugin: ({ cldAsset, options }) => {
    const { restore = false } = options;
    if (restore) {
      cldAsset.effect("e_gen_restore");
    }
    return {};
  }
};
var zoompanProps = {
  zoompan: z.union([
    z.string(),
    z.boolean(),
    z.object({
      loop: effects.loop.schema.optional(),
      options: z.string()
    })
  ]).describe(
    JSON.stringify({
      text: "Applies zooming and/or panning to an image, resulting in a video or animated image.",
      url: "https://cloudinary.com/documentation/transformation_reference#e_zoompan"
    })
  ).optional()
};
var zoompanPlugin = {
  props: zoompanProps,
  assetTypes: ["image", "images"],
  plugin: ({ cldAsset, options }) => {
    const { zoompan = false } = options;
    const overrides = {
      format: void 0
    };
    if (zoompan === true) {
      cldAsset.effect("e_zoompan");
    } else if (typeof zoompan === "string") {
      if (zoompan === "loop") {
        cldAsset.effect("e_zoompan");
        cldAsset.effect("e_loop");
      } else {
        cldAsset.effect(`e_zoompan:${zoompan}`);
      }
    } else if (typeof zoompan === "object") {
      let zoompanEffect = "e_zoompan";
      if (typeof zoompan.options === "string") {
        zoompanEffect = `${zoompanEffect}:${zoompan.options}`;
      }
      cldAsset.effect(zoompanEffect);
      let loopEffect;
      if (zoompan.loop === true) {
        loopEffect = "e_loop";
      } else if (typeof zoompan.loop === "string" || typeof zoompan.loop === "number") {
        loopEffect = `e_loop:${zoompan.loop}`;
      }
      if (loopEffect) {
        cldAsset.effect(loopEffect);
      }
    }
    if (zoompan !== false) {
      overrides.format = "auto:animated";
    }
    return {
      options: overrides
    };
  }
};

// src/types/image.ts
var imageOptionsSchema = assetOptionsSchema.merge(
  z.object({
    // Spreading plugins instead of extend or merge to avoid excessive schema warning
    // https://github.com/microsoft/TypeScript/issues/34933#issuecomment-1772787785
    ...defaultImageProps,
    ...enhanceProps,
    ...extractProps,
    ...fillBackgroundProps,
    ...recolorProps,
    ...removeProps,
    ...replaceProps,
    ...replaceBackgroundProps,
    ...restoreProps,
    ...zoompanProps
  })
);
var abrProps = {
  streamingProfile: z.string().describe(
    JSON.stringify({
      text: "The streaming profile to apply when delivering a video using adaptive bitrate streaming.",
      url: "https://cloudinary.com/documentation/transformation_reference#sp_streaming_profile"
    })
  ).optional()
};
var abrPlugin = {
  props: abrProps,
  assetTypes: ["video", "videos"],
  plugin: (settings) => {
    const { cldAsset, options } = settings;
    const { streamingProfile } = options;
    if (typeof streamingProfile === "string") {
      cldAsset.addTransformation(`sp_${streamingProfile}`);
    }
    return {};
  }
};

// src/types/video.ts
var videoOptionsSchema = assetOptionsSchema.merge(
  z.object({
    // Spreading plugins instead of extend or merge to avoid excessive schema warning
    // https://github.com/microsoft/TypeScript/issues/34933#issuecomment-1772787785
    ...abrProps
  })
);
var analyticsOptionsSchema = z.any();
var configOptionsSchema = z.any();

// src/lib/cloudinary.ts
var transformationPlugins = [
  // Some features *must* be the first transformation applied
  // thus their plugins *must* come first in the chain
  enhancePlugin,
  extractPlugin,
  recolorPlugin,
  removeBackgroundPlugin,
  removePlugin,
  replacePlugin,
  replaceBackgroundPlugin,
  restorePlugin,
  // Cropping needs to be before any other general transformations
  // as it provides the option of 2-step resizing where someone
  // can resize the "base" canvas as well as the final resize
  // mechanism commonly used for responsive resizing
  croppingPlugin,
  // Raw transformations should always come before
  // other arguments to avoid conflicting with
  // added options via the component
  preserveTransformationsPlugin,
  rawTransformationsPlugin,
  abrPlugin,
  defaultImagePlugin,
  effectsPlugin,
  fillBackgroundPlugin,
  flagsPlugin,
  overlaysPlugin,
  sanitizePlugin,
  namedTransformationsPlugin,
  seoPlugin,
  underlaysPlugin,
  versionPlugin,
  zoompanPlugin
];
var constructUrlOptionsSchema = z.union([imageOptionsSchema, videoOptionsSchema]).describe(
  JSON.stringify({
    text: "Asset options (Image or Video) that define delivery URL including public ID and transformations.",
    path: "/url-loader/assetoptions"
  })
);
z.object({
  analytics: z.union([analyticsOptionsSchema, z.boolean()]).describe(
    JSON.stringify({
      text: "Tech, dependency, and feature identifiers for tracking SDK usage related to Cloudinary.",
      path: "/url-loader/analyticsoptions"
    })
  ).optional(),
  config: configOptionsSchema.describe(
    JSON.stringify({
      text: "Configuration parameters for environment and Cloudinary account.",
      url: "https://cloudinary.com/documentation/cloudinary_sdks#configuration_parameters",
      path: "/url-loader/analyticsoptions"
    })
  ).optional(),
  options: constructUrlOptionsSchema
});
function constructCloudinaryUrl({
  options,
  config = {},
  analytics
}) {
  if (analytics === false) {
    if (typeof config?.url === "undefined") {
      config.url = {};
    }
    config.url.analytics = false;
  }
  const cld = new Cloudinary(config);
  if (typeof options?.src !== "string") {
    throw Error(
      `Failed to construct Cloudinary URL: Missing source (src) in options.`
    );
  }
  if (!options?.assetType) {
    options.assetType = "image";
  }
  const propsCheck = [];
  transformationPlugins.forEach(({ props }) => {
    const pluginProps = Object.keys(props);
    pluginProps.forEach((prop) => {
      if (propsCheck.includes(prop)) {
        throw new Error(`Option ${prop} already exists!`);
      }
      propsCheck.push(prop);
    });
  });
  const parsedOptions = {};
  let publicId;
  if (typeof options.src === "string" && /^https?:\/\//.test(options.src)) {
    try {
      const parts = parseUrl(options.src);
      publicId = parts?.publicId;
      parsedOptions.seoSuffix = parts?.seoSuffix;
      parsedOptions.version = parts?.version;
    } catch (e) {
    }
  }
  if (!publicId) {
    publicId = options.src;
  }
  Object.keys(parsedOptions).forEach(
    (key) => {
      if (objectHasKey(options, key)) return;
      options[key] = parsedOptions[key];
    }
  );
  options.version ?? (options.version = 1);
  let cldAsset = void 0;
  if (["image", "images"].includes(options.assetType)) {
    cldAsset = cld.image(publicId);
  } else if (["video", "videos"].includes(options.assetType)) {
    cldAsset = cld.video(publicId);
  }
  if (typeof cldAsset === "undefined") {
    throw new Error("Invalid asset type.");
  }
  const pluginEffects = {};
  transformationPlugins.forEach(
    ({ plugin, assetTypes, props, strict }) => {
      const supportedAssetType = options?.assetType !== void 0 && assetTypes.includes(options.assetType);
      const pluginProps = Object.keys(props);
      const optionsKeys = Object.keys(options);
      const attemptedUse = pluginProps.map((prop) => optionsKeys.includes(prop)).filter((isUsed) => !!isUsed).length > 0;
      if (!supportedAssetType) {
        if (attemptedUse) {
          console.warn(
            `One of the following props [${pluginProps.join(
              ", "
            )}] was used with an unsupported asset type [${options?.assetType}]`
          );
        }
        return;
      }
      if (options.strictTransformations && !strict) {
        if (attemptedUse) {
          console.warn(
            `One of the following props [${pluginProps.join(
              ", "
            )}] was used that is not supported with Strict Transformations.`
          );
        }
        return;
      }
      const results = plugin({
        cldAsset,
        options
      });
      const { options: pluginOptions } = results || { options: void 0 };
      Object.assign(pluginEffects, pluginOptions);
    }
  );
  if (typeof pluginEffects.resize === "string") {
    cldAsset.addTransformation(pluginEffects.resize);
  }
  cldAsset.setDeliveryType(options?.deliveryType || "upload");
  if (!options.strictTransformations) {
    if (options?.dpr) {
      let dpr = options.dpr;
      if (typeof dpr === "number") {
        dpr = dpr.toFixed(1);
      }
      cldAsset.addTransformation(`dpr_${dpr}`);
    }
    const defaultFormat = options?.format === "default";
    const rawContainsFormat = searchAssetRawTransformations("f_", cldAsset, {
      matchType: "startsWith"
    });
    const rawContainsFormatAndExplicit = rawContainsFormat && typeof options?.format !== "undefined";
    if (pluginEffects?.format || !defaultFormat && (!rawContainsFormat || rawContainsFormatAndExplicit)) {
      cldAsset.format(options?.format || pluginEffects?.format || "auto");
    }
    const defaultQuality = options?.quality === "default";
    const rawContainsQuality = searchAssetRawTransformations("q_", cldAsset, {
      matchType: "startsWith"
    });
    const rawContainsQualityAndExplicit = rawContainsQuality && typeof options?.quality !== "undefined";
    if (!defaultQuality && (!rawContainsQuality || rawContainsQualityAndExplicit)) {
      cldAsset.quality(options?.quality || "auto");
    }
  }
  return cldAsset.toURL({
    trackedAnalytics: analytics
  });
}
function searchAssetRawTransformations(query, asset, options) {
  if (typeof asset.transformation === "undefined") return;
  const { matchType = "includes" } = options || {};
  const transformations = asset.transformation.actions.flatMap(
    (transformation) => {
      return transformation.toString().split("/").flatMap((seg) => seg.split(","));
    }
  );
  const matches = transformations.filter((transformation) => {
    if (matchType === "startsWith") {
      return transformation.startsWith(query);
    } else {
      return transformation.includes(query);
    }
  });
  return matches.length > 0;
}

export { astroPkg as a, constructCloudinaryUrl as c, parseUrl as p, transformationPlugins as t };
