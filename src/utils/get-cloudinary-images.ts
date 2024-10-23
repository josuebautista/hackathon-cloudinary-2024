import type { Story } from "../models/types";
import { getCldImageUrl } from "astro-cloudinary/helpers";
import type { GetCldImageUrlOptions } from "astro-cloudinary/helpers";

export const getImagesGenerated = (story: Story, id: string): string[] => {
  if (id === null) return [];
  let results: string[] = [];
  story.images.forEach((image) => {
    let effects: GetCldImageUrlOptions = { src: id };
    if (image.effects) {
      effects = {
        src: id,
        ...image.effects.reduce((obj, effect) => {
          obj[effect] = true;
          return obj;
        }, {} as { [key: string]: boolean }),
      }
    }
    const url = getCldImageUrl({
      crop: {
        type: "fill",
        source: true,
      },
      format: 'auto',
      flags: 'attachment',
      replaceBackground: image.prompt + ' at ' + image.time_day,
      ...effects
    })
    results.push(url);
  });
  //console.log({results})
  return results
}
