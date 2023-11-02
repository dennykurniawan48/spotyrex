import { connectMongo } from "@/helper/database/conn";
import Users from "@/helper/database/model/userModel";
import verifyGoogleToken from "@/helper/function/verifyGoogleToken";
import { GoogleLogin } from "@/helper/response/google/GoogleResult";
const jwt = require('jsonwebtoken')


export async function GET(req: Request) {
    connectMongo().catch((err) => {
        console.log("error")
    });

    const { searchParams } = new URL(req.url)
    const token = searchParams.get('token') ?? ""
    const expirationTime = Math.floor(Date.now() / 1000) + 30 * 24 * 60 * 60; // 30 days

    if (token) {
        const result: GoogleLogin = await verifyGoogleToken(token);
        if (result.success) {
            const exist = await Users.findOne({ email: result.data?.email }).lean()
            if (!exist) {
                const user = await Users.create({
                        email: result.data?.email,
                        name: result.data?.name
                }).lean();
                if (user) {
                    const formatUser = {...user, _id: exist._id.toString()}
                    const token = jwt.sign(formatUser, process.env.NEXTAUTH_SECRET, { expiresIn: expirationTime })
                    const data = { ...formatUser, accessToken: token, expiresIn: expirationTime, google: true }

                    return Response.json({ data: data });
                } else {
                    return new Response(JSON.stringify({ "error": "Something went wrong." }), {
                        status: 500,
                    })
                }
            } else {
                const formatUser = {...exist, _id: exist._id.toString()}
                const token = jwt.sign(formatUser, process.env.NEXTAUTH_SECRET, { expiresIn: expirationTime })
                const data = { ...formatUser, accessToken: token, expiresIn: expirationTime, google: true }

                return Response.json({ data: data });
            }
        } else {
            return new Response(JSON.stringify({ "error": "Something went wrong." }), {
                status: 500,
            })
        }
    } else {
        return new Response(JSON.stringify({ "error": "Wrong credentials." }), {
            status: 401,
        })
    }
}