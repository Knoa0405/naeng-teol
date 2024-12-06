import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const comment = await prisma.comment.findUnique({
    where: { id: BigInt(id) },
  });

  return NextResponse.json({ comment }, { status: 200 });
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  const body = await request.json();

  const comment = await prisma.comment.update({
    where: { id: BigInt(id) },
    data: body,
  });

  return NextResponse.json({ comment }, { status: 200 });
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  const comment = await prisma.comment.delete({
    where: { id: BigInt(id) },
  });

  return NextResponse.json({ comment }, { status: 200 });
}
