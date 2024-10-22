import { v2 } from 'cloudinary';
export { renderers } from '../../renderers.mjs';

v2.config({
  cloud_name: "alhedev-gallery",
  api_key: "372241328758597",
  api_secret: "e8uC25CDcaNLeVbuGWULPc-A8lI"
});
const prerender = false;
const POST = async ({ request }) => {
  const body = await request.json();
  const { paramsToSign } = body;
  const signature = v2.utils.api_sign_request(paramsToSign, "e8uC25CDcaNLeVbuGWULPc-A8lI");
  return Response.json({ signature });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
