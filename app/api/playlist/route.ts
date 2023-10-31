import Playlists from "@/helper/database/model/playlistModel"

export async function GET(req: Request){
    const data = await Playlists.find({})
    return Response.json({data: data})
}