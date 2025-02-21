import { PrismaClient, Gender } from '@prisma/client';

const prisma = new PrismaClient();



async function createPatient(
 userId: number,
  weight: number,
  height: number,
  gender: Gender,
  dateOfBirth: string,
  medicalHistory: string
) {
  try {

    const newPatient = await prisma.patient.create({
      data: {
        userId,
        weight,
        height,
        gender,
        dateOfBirth: new Date(dateOfBirth),
        medicalHistory,
      },
    });

    return newPatient;
  } catch (error) {
    console.error("Error creating patient:", error);
    throw new Error("An error occurred while creating the patient.");
  }
}

export { createPatient };
