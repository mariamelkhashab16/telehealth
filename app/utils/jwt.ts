import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

const SECRET_KEY: string = process.env.JWT_SECRET || '';

if (!SECRET_KEY) {
  throw new Error("Missing JWT_SECRET in environment variables");
}

export function generateToken(payload: object, expiresIn: string = "1d") {
  return jwt.sign(payload, SECRET_KEY, { expiresIn });
}

export function verifyToken(token: string) {
    return jwt.verify(token, SECRET_KEY);
}


export function validatePassword(requestPassword: string, userPassword: string)
{
 return bcrypt.compare(requestPassword, userPassword)
}

export function hashPassword(inputPassword : string)
{
  return  bcrypt.hash(inputPassword, 10);
}