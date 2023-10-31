export type Song = {
    _id: string,
    title: string,
    image: string,
    artistId: SongArtist,
    url: string,
    duration: number,
}