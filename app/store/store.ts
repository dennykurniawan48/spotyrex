
import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useSelector } from "react-redux";
import { playlistSlice } from "./features/playlistSlice";
import { listenerMiddleware } from "./middleware";
import { Song } from "@/helper/types/song/Song";

export type PlaySong ={
    playlist: Song[],
    index: number,
    repeat: boolean,
    shuffle: boolean,
    firstLoad: boolean,
    guestLogin: boolean
}

const initialState: PlaySong = JSON.parse(localStorage.getItem("playlist") || '{ "playlist": [],"index": 0, "repeat": false, "shuffle": false, "firstLoad": true, "guestLogin": false}');
const store = configureStore({
    preloadedState: {
        songs: initialState === null ? { playlist:[], index:0, repeat: false, shuffle: false, firstLoad: true, guestLogin: false } : initialState
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