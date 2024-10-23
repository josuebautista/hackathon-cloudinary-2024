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
