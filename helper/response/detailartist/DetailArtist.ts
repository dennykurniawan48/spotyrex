import { ArtistSong } from "./ArtistSong"

export type DetailArtist = {
    _id: string,
    name: string,
    desc: string,
    image: string,
    songs: ArtistSong[]
}