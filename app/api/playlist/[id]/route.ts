import Artists from "@/helper/database/model/artistModel";
import Playlists from "@/helper/database/model/playlistModel";
import Songs from "@/helper/database/model/songModel";

export async function GET(req: Request){
    const url = new URL(req.url)
    const pathname = url.pathname.split('/')
    const id = pathname[pathname.length - 1]
    const data = await Playlists.findOne({_id: id})
  .populate({
    path: 'songs',
    model: Songs, // The model to use for populating
    populate:{
        path: 'artistId',
        model: Artists
    }
  })
  .then((res:any) => {
    return res
  }).catch((err: any) => {
    //catch error
    console.log(err)
    return null
  });
    return Response.json({ data: data })
}