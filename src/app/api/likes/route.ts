import { type NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

interface LikeData {
  postId: number; 
  userId: string; 
}

export async function POST(request: NextRequest) {
  const { postId, userId }: LikeData = await request.json() as LikeData;
  const newLike = await prisma.like.create({
    data: {
      postId,
      userId,
    },
  });
  return NextResponse.json(newLike, { status: 201 });
}
