import { connectMongo } from "@/helper/database/conn";
import Artists from "@/helper/database/model/artistModel";
import Songs from "@/helper/database/model/songModel";

export async function GET(req: Request){
    const url = new URL(req.url)
    const pathname = url.pathname.split('/')
    const id = pathname[pathname.length - 1]

    connectMongo().catch((err) => {
        console.log("error")
    });

    const artist = await Artists.findOne({_id: id}).lean()
    const songs = await Songs.find({artistId: id})
    const data = {...artist, songs}
    return Response.json({data})
}