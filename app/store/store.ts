
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { playlistSlice } from "./features/playlistSlice";
import { listenerMiddleware } from "./middleware";
import { Song } from "@/helper/types/song/Song";

export type PlaySong = {
    playlist: Song[],
    index: number,
    repeat: boolean,
    shuffle: boolean,
    firstLoad: boolean,
    guestLogin: boolean
}

const initial = '{ "playlist": [],"index": 0, "repeat": false, "shuffle": false, "firstLoad": true, "guestLogin": false}'

let item: string | null = initial

if (typeof window !== 'undefined') {
    item = localStorage.getItem("playlist")
}

const initialState: PlaySong = JSON.parse(item ?? initial);
const store = configureStore({
    preloadedState: {
        songs: initialState === null ? { playlist: [], index: 0, repeat: false, shuffle: false, firstLoad: true, guestLogin: false } : initialState
    },
    reducer: { songs: playlistSlice.reducer },
    middleware: (getDefaultMiddleware) => [
        ...getDefaultMiddleware(),
        listenerMiddleware.middleware
    ]
})

export default store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;