
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PlaySong } from "../store";
import { Song } from "@/helper/types/song/Song";

const initialState: PlaySong = { playlist:[], index:0, repeat: false, shuffle: false, firstLoad: true, guestLogin: false };

export type PlaylistItem = {
    songs: Song[],
    index: number
}

export const playlistSlice = createSlice({
    name: "playlist",
    initialState,
    reducers: {
        changePlaylist(state, action: PayloadAction<PlaylistItem>) {
            state.playlist = action.payload.songs
            state.index = action.payload.index
            state.firstLoad = false
        },
        nextSong(state, action: PayloadAction<number>){
            state.index = action.payload
            state.firstLoad = false
        },
        prevSong(state, action: PayloadAction<number>){
            state.index = action.payload
            state.firstLoad = false
        },
        changeRepeat(state, action: PayloadAction<boolean>){
            state.repeat = action.payload
            state.firstLoad = false
        },changeShuffle(state, action: PayloadAction<boolean>){
            state.shuffle = action.payload
            state.firstLoad = false
        },changeGuestLogin(state, action: PayloadAction<boolean>){
            state.guestLogin = action.payload
        }
    }
})

export const {changePlaylist, nextSong, prevSong, changeRepeat, changeShuffle, changeGuestLogin} = playlistSlice.actions