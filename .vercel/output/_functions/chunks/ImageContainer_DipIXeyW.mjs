import { c as createComponent, r as renderTemplate, m as maybeRenderHead, d as addAttribute, a as renderComponent, b as createAstro } from './astro/server_n6-e6VbM.mjs';
import { v2 } from 'cloudinary';
import { jsxs, Fragment, jsx } from 'react/jsx-runtime';
import { useState } from 'react';
import { IoIosInformationCircleOutline, IoMdDownload } from 'react-icons/io';

v2.config({
  cloud_name: "alhedev-gallery",
  api_key: "372241328758597",
  api_secret: "e8uC25CDcaNLeVbuGWULPc-A8lI",
  secure: true
});
const getAssetInfo = async (publicId) => {
  const options = {
    all: true
  };
  try {
    const result = await v2.api.resource(publicId, options);
    return result.info.detection.captioning.data.caption;
  } catch (error) {
    console.error(error);
    return "Error Loading Description";
  }
};

const ImageDescription = ({ description }) => {
  const [showDescription, setShowDescription] = useState(false);
  const [activeButton, setActiveButton] = useState(false);
  const handleDescription = () => {
    setShowDescription(!showDescription);
    setActiveButton(!activeButton);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(
      "button",
      {
        onClick: () => handleDescription(),
        className: `h-[30px] p-1 group`,
        children: /* @__PURE__ */ jsx("span", { className: `opacity-80 transition duration-200 ${activeButton ? "text-orange-500 hover:opacity-100" : "hover:opacity-100"}`, title: showDescription ? "Hide Description" : "Show Description", children: /* @__PURE__ */ jsx(IoIosInformationCircleOutline, { size: 30 }) })
      }
    ),
    showDescription && /* @__PURE__ */ jsx(
      "div",
      {
        className: "absolute inset-x-0 top-[50px] \r\n          invisible group-hover:visible\r\n          bg-solid mx-5 h-auto rounded-xl p-2\r\n          group-hover:ease-in-out duration-300 opacity-0 group-hover:opacity-100 overflow-hidden",
        children: /* @__PURE__ */ jsx("p", { className: "text-sm", children: description })
      }
    )
  ] });
};

const $$Astro = createAstro();
const $$ImageContainer = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ImageContainer;
  const { id, url } = Astro2.props;
  const description = await getAssetInfo(id);
  return renderTemplate`${maybeRenderHead()}<div class="relative mx-auto max-w-[500px] h-auto rounded-2xl object-fit overflow-hidden group"> <div class="absolute inset-x-0 top-0 invisible group-hover:visible
    bg-solid-to-transparency
    w-full mx-auto h-[120px] p-2 
    group-hover:ease-in-out duration-300 opacity-0 group-hover:opacity-100
    flex gap-3 justify-end
    "> <a class="h-[30px] p-1"${addAttribute(url, "href")} download> <span class=" hover:opacity-100 opacity-80 active:text-orange-500 transition duration-200" title="Download"> ${renderComponent($$result, "IoMdDownload", IoMdDownload, { "size": 30 })} </span> </a> ${renderComponent($$result, "ImageDescription", ImageDescription, { "client:load": true, "description": description, "client:component-hydration": "load", "client:component-path": "D:/Code/Astro/hackaton-cloudinary/src/components/react/Description", "client:component-export": "ImageDescription" })} </div> <img${addAttribute(url, "src")}${addAttribute(description, "alt")}> </div>`;
}, "D:/Code/Astro/hackaton-cloudinary/src/components/ImageContainer.astro", void 0);

const $$file = "D:/Code/Astro/hackaton-cloudinary/src/components/ImageContainer.astro";
const $$url = undefined;

export { $$ImageContainer as default, $$file as file, $$url as url };
