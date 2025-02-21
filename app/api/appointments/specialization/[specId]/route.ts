import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(req: NextRequest, { params }: { params: { specId: string } }) {
  try {

    const specialization = await prisma.specialization.findUnique({
      where: { id: parseInt(params.specId, 10) },
      include: {
        doctors: {
          include: { user: true }, 
        },
      },
    });

    if (!specialization) {
      return NextResponse.json({ error: "Specialization not found" }, { status: 404 });
    }

    return NextResponse.json({ specialization, doctors: specialization.doctors }, { status: 200 });
  } catch (error) {
    console.error("Error fetching doctors:", error);
    return NextResponse.json({ error: "Failed to fetch doctors" }, { status: 500 });
  }
}
