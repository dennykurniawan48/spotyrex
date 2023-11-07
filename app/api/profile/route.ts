import { getToken } from "next-auth/jwt"
import { NextRequest } from "next/server"
const jwt = require("jsonwebtoken")

export async function GET(req: Request){
    const token = await getToken({ req: req as NextRequest, secret: process.env.NEXTAUTH_SECRET, raw: true })
    console.log(token);
    const user = jwt.verify(token, process.env.NEXTAUTH_SECRET)
    console.log(user)
    return Response.json({data: user})
}