import "server-only";
import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { and, eq } from "drizzle-orm";
import { redirect } from "next/navigation";
import analyticsServerClient from "./analytics";
import prisma from "lib/prisma";

export async function getMyImages() {
  const user = auth();

  if (!user.userId) throw new Error("Unauthorized");

  const images = await prisma.post.findMany({
    where: {
      createdById: user.userId,
    },
    orderBy: {
      id: 'desc',
    },
  });

  return images;
}

export async function getImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  const image = await prisma.post.findFirst({
    where: {
      id: id,
    },
  });
  if (!image) throw new Error("Image not found");

  if (image.createdById !== user.userId) throw new Error("Unauthorized");

  return image;
}

export async function deleteImage(id: number) {
  const user = auth();
  if (!user.userId) throw new Error("Unauthorized");

  await prisma.post.deleteMany({
    where: {
      id: id,
      createdById: user.userId,
    },
  });

  analyticsServerClient.capture({
    distinctId: user.userId,
    event: "delete image",
    properties: {
      imageId: id,
    },
  });

  redirect("/");
}
