import { NextRequest } from "next/server";
import { genericErrorResponse, genericSuccessResponse } from "../../../utils/responseMessage";
import { hashPassword } from  "../../../utils/jwt";
import { getUserByPhoneNumber, createUser } from "../../../services/user"
import { createPatient } from "../../../services/patient"


export async function POST(req: NextRequest) {
  try {
    const {
      username,
      password,
      phonenumber,
      weight,
      height,
      gender,
      dateOfBirth,
      medicalHistory,
    } = await req.json();


    const existingUser = await getUserByPhoneNumber(phonenumber)
    if (existingUser) {
      return genericErrorResponse("Phonenumber already exists", 400);  
    }

    const newPassword = await hashPassword(password)


    // Create the User
    const user = await createUser(username, newPassword, phonenumber, 3) // TODO: get it by ORM 

    // Create the Patient
    const patient = await createPatient(user.id,weight,height,gender,dateOfBirth,medicalHistory)

    return genericSuccessResponse( patient , "Registered successful", 201);

} catch (error) {
    console.error(error);
    return genericErrorResponse("Server error", 500);  
}
}
