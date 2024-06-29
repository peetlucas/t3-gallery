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

export default async function Home() {
  const hello = await api.post.hello({ text: "from tRPC" });
  const session = await getSession();
  const posts = await prisma.post.findMany();
  console.log(posts);

  const mockUrls = [
    "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/3012c68d-d895-4c4d-8e3f-52c3fcd482dc-qorhd7.jpg",
    "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/c13f418b-7dc8-4ad1-bdb8-7adf0877ee44-kft8eg.jpg",
    "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/6c154e09-344d-4ec7-b928-df05158dc2b4-pot1wn.jpg",
    "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/8434335e-c94c-4d7b-85f5-416bd3c3bf19-mcvv0e.jpg",
    "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/91a9c4c6-94a1-4736-9ab5-3b3bb90ddbd8-w2v8ba.jpg",
    "https://uploadthing-prod-sea1.s3.us-west-2.amazonaws.com/feb9d4d3-ab33-40dd-ba2c-6d1f05b29983-i7hufi.jpg",
  ];

  const mockImages = mockUrls.map((url, index) => ({
    id: index + 1,
    url,
  }));

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-wrap items-center justify-center gap-4 px-4 py-16">
        {posts.map((post) => (
          <div key={post.id}>{post.imageUrl}</div>
        ))}
        {mockImages.map((image, index) => (
          <div key={image.id + "-" + index} className="w-48">
            <img src={image.url} />
          </div>
        ))}
      </div>
    </main>
  );
}
