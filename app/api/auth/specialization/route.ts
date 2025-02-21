import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const specializations = await prisma.specialization.findMany(); 
    return NextResponse.json({ specializations }, { status: 200 });
  } catch (error) {
    console.error("Error fetching specializations:", error);
    return NextResponse.json({ error: "Failed to fetch specializations" }, { status: 500 });
  }
}
