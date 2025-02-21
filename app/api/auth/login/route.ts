import { NextRequest } from "next/server";
import { getUserByUsername } from "@/app/services/user"
import { generateToken, validatePassword } from "@/app/utils/jwt";
import { genericErrorResponse, genericSuccessResponse } from "@/app/utils/responseMessage"



export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const user = await getUserByUsername(username)
    if (!user) {
        return genericErrorResponse("User Not found", 404);    }

    const isValidPassword = await validatePassword(password, user.password);
    if (!isValidPassword) {
        return genericErrorResponse("Invalid credentials", 401);  
      }

    const token = generateToken({ id: user.id, roleId: user.role });

    return genericSuccessResponse( {token: token, role: user.roleId} , "Login successful", 200);
  } 
  catch (error) {
        return genericErrorResponse("Server error", 500);  
  }
}
