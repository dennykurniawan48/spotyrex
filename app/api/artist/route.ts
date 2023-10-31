import { connectMongo } from "@/helper/database/conn";
import Artists from "@/helper/database/model/artistModel";

export async function GET(req: Request){
    connectMongo().catch((err) => {
        console.log("error")
    });
    const data = await Artists.find()
    return Response.json({data})
}