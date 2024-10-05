import { UnsplashImage } from "@/models/unplash-image";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Dynamic Fetching - NextJS 13.4 Image Gallery",
};

export const revalidate = 0;

export default async function Page() {
  const response = await fetch(
    `https://api.unsplash.com/photos/random?client_id=${process.env.API_KEY}`,
    // { cache: "no-cache" }
    // { next: { revalidate: 0 } }
  );
  const image: UnsplashImage = await response.json();

  const width = Math.min(image.width, 500);
  const height = (width / image.width) * image.height;

  return (
    <div>
      <Image
        src={image.urls.raw}
        alt={image.description}
        width={width}
        height={height}
      />
      <h2>
        By{" "}
        <Link href={`/users/${image.user.username}`}>
          {image.user.username}
        </Link>
      </h2>
      <p>{image.description}</p>
    </div>
  );
}
