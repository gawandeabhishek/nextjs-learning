import { UnsplashImage } from "@/models/unplash-image";
import { Metadata } from "next";
import Image from "next/image";

interface PageProps {
  params: { topic: string };
  // searchParams: { [key: string]: string | string[] | undefined },
}

// export const dynamicParams = false;

export function generateMetadata({params: { topic }}: PageProps): Metadata {
  return {
    title: `Unsplash Images for ${topic}`,
  }
}

export async function generateStaticParams() {
  return ["health", "fitness", "coding"].map((topic) => ({ topic }));
}

export default async function Page({ params: { topic } }: PageProps) {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?query=${topic}&count=30&client_id=${process.env.API_KEY}`
  );
  const images: UnsplashImage[] = await response.json();

  return (
    <div>
      <h1>{topic}</h1>
      {images.map((image, index) => (
        <Image
          key={index}
          src={image.urls.raw}
          width={250}
          height={250}
          alt={image.description}
        />
      ))}
    </div>
  );
}
