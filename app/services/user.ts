// src/services/userService.ts
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function getUserByUsername(username: string) {
  try {
    const user = await prisma.user.findFirst({ where: { username }, include: {role: true} });
    return user;
  } catch (error) {
    throw new Error("Error fetching user by username");
  }
}


export async function getUserByPhoneNumber(phonenumber: string)
{
  try {
    const user = await prisma.user.findUnique({
      where: {
        phonenumber,
      },
    });
    return user;
  } catch (error) {
    throw new Error("Error fetching user by phonenumber");
  }
}


export async function createUser(username: string,password: string, phonenumber:string ,roleId: number)
   { 
    console.log(username,
      password,
      phonenumber,
      roleId)
    try {
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        phonenumber,
        roleId,
      },
    });
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("An error occurred while creating the user.");
  }
}