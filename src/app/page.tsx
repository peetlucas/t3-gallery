import Link from "next/link";
import { CreatePost } from "~/app/_components/create-post";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";
import { getSession } from "next-auth/react";
import SessionProviderWrapper from "./components/SessionProviderWrapper";
import InteractiveButton from "./components/InteractiveButton";
import { getProviders } from "next-auth/react";
import { db } from "~/server/db";
import prisma from "../../lib/prisma";

export const dynamic = "force-dynamic";

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getSession();
  const images = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-wrap items-center justify-center gap-4 px-4 py-16">
        {images.map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
            <img src={image.imageUrl} />
            <div>{image.title}</div>
          </div>
        ))}
      </div>
    </main>
  );
}
