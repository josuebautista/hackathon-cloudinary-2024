import {v2 as cloudinary, type AdminAndResourceOptions} from "cloudinary";

cloudinary.config({
  cloud_name: import.meta.env.PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: import.meta.env.PUBLIC_CLOUDINARY_API_KEY,
  api_secret: import.meta.env.CLOUDINARY_API_SECRET,
  secure: true,
}); 


export const getAssetInfo = async (publicId: string): Promise<string | null> => {
  // Return all in the response
  const options: AdminAndResourceOptions = {
    all: true
  };

  try {
      // Get details about the asset
      const result: {
        info: {
          detection: { captioning: { data: { caption: string } } };
        };
      } = await cloudinary.api.resource(publicId, options);
      //console.log(result);
      return result.info.detection.captioning.data.caption;
      } catch (error) {
      console.error(error);
      return null;
  }
};