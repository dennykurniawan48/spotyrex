import { connectMongo } from "@/helper/database/conn";
import Playlists from "@/helper/database/model/playlistModel"

export async function GET(req: Request){
    connectMongo().catch((err) => {
        console.log("error")
    });
    const data = await Playlists.find({})
    return Response.json({data: data})
}