import { SignedIn, SignedOut } from "@clerk/nextjs";
import Link from "next/link";
import Image from "next/image";
import prisma from "../../lib/prisma";

export const dynamic = "force-dynamic";

async function Images() {
  const images = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });
  // const images = await getMyImages();

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {images.map((image) => (
        <div key={image.id} className="flex h-48 w-48 flex-col">
          <Link href={`/img/${image.id}`}>
            <Image
              src={image.imageUrl}
              style={{ objectFit: "contain" }}
              width={192}
              height={192}
              alt={image.title}
            />
          </Link>
          <div>{image.title}</div>
        </div>
      ))}
    </div>
  );
}

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-wrap items-center justify-center gap-4 px-4 py-16">
        <SignedOut>
          <div className="h-full w-full text-center text-2xl">
            Please sign in above
          </div>
        </SignedOut>
        <SignedIn>
          <Images />
        </SignedIn>
      </div>
    </main>
  );
}
