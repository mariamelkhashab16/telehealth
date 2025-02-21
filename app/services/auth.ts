// src/services/userService.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserByUsername(username: string) {
  try {
    const user = await prisma.user.findFirst({ where: { username } });
    return user;
  } catch (error) {
    throw new Error("Error fetching user by username");
  }
}
