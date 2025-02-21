import { NextRequest } from "next/server";
import { getUserByUsername, validateUserRole } from "@/app/services/user"
import { generateToken, validatePassword } from "@/app/utils/jwt";
import { genericErrorResponse, genericSuccessResponse } from "@/app/utils/responseMessage"



export async function POST(req: NextRequest) {
  try {
    const { username, password, role } = await req.json();

    const user = await getUserByUsername(username);
    if (!user) {
      return genericErrorResponse("User not found", 404);  
    }

    const isValidRole = validateUserRole(user, role);
    if (!isValidRole) {
      return genericErrorResponse("Invalid credentials", 401);  
    }
    
    const isValidPassword = await validatePassword(password, user.password);
    if (!isValidPassword) {
        return genericErrorResponse("Invalid credentials", 401);  
      }

    const token = generateToken({ id: user.id, roleId: user.role });

    return genericSuccessResponse( {token: token, role: user.role.name} , "Login successful", 200);
  } 
  catch (error) {
        return genericErrorResponse("Server error", 500);  
  }
}
