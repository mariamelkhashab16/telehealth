import { NextResponse } from "next/server";

export function genericErrorResponse(message: string, statusCode: number) {
    return NextResponse.json({ error: message }, { status: statusCode });
  }

  export function genericSuccessResponse(data: object, message: string , statusCode: number) {
    return NextResponse.json({ message, data }, { status: statusCode });
  }