import type { getCldImageUrl } from 'astro-cloudinary/helpers'

export type StoryPrompt = {
  title: string;
  prompt: string;
  environment: string;
  time_day: string;
}


type ImageGenerator = {
  prompt: string;
  effects: string[];
  time_day: string;
}

type Paragraph = {
  text: string;
  index_image: number | null;
}

export type Story = {
  title: string;
  paragraphs: Paragraph[];
  images: ImageGenerator[];
}
