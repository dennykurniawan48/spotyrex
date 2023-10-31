import { Song } from "./Song"

export type DetailPlaylist = {
    _id: string,
    name: string,
    image: string,
    songs: Song[]
}