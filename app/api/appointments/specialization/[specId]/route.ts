import { NextRequest } from "next/server";
import { genericErrorResponse, genericSuccessResponse } from "@/app/utils/responseMessage"

import { PrismaClient } from '@prisma/client';


export async function GET(req: NextRequest, { params }: { params: { specId: string } }) {

  const prisma = new PrismaClient();
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
      return genericErrorResponse("Specialization not found", 404);  
    }

    return genericSuccessResponse( { specialization, doctors: specialization.doctors } , "", 200);

  } catch (error) {
    console.error("Error fetching doctors:", error);
    return genericErrorResponse("Failed to fetch doctors", 500);  
  }
}
