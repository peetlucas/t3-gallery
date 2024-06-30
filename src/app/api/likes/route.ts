import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

interface LikeData {
  postId: number; 
  userId: string; 
}

export async function POST(request: NextRequest) {
  const user = auth();
  if (!user.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { postId }: LikeData = await request.json() as LikeData;
  const existingLike = await prisma.like.findUnique({
    where: { postId_userId: { postId, userId: user.userId } },
  });

  if (existingLike) {
    return NextResponse.json({ message: "Already liked" }, { status: 400 });
  }

  const newLike = await prisma.like.create({
    data: {
      postId,
      userId: user.userId,
    },
  });
  return NextResponse.json(newLike, { status: 201 });
}
