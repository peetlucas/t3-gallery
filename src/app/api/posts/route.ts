import { auth } from "@clerk/nextjs/server";
import { type NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma';

interface PostRequestBody {
  title: string;
  imageUrl: string;
  userId: string;
}

export async function GET() {
  const posts = await prisma.post.findMany({
    include: {
      createdBy: true,
      likes: true,
    },
  });
  return NextResponse.json(posts);
}

export async function POST(request: NextRequest) {
  const user = auth();
  if (!user.userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { title, imageUrl } = await request.json() as PostRequestBody;
  const newPost = await prisma.post.create({
    data: {
      title,
      imageUrl,
      createdById: user.userId,
    },
  });
  return NextResponse.json(newPost, { status: 201 });
}
