export interface Podcast {
  id: string;
  title: string;
  categoryName: string;
  description: string;
  images: {
    default: string;
    featured: string;
  };
}
