import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit";
import type { RootState } from "./store";
import { changeGuestLogin, changePlaylist, changeRepeat, changeShuffle, nextSong, prevSong } from "./features/playlistSlice";

export const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  matcher: isAnyOf(changePlaylist, nextSong, prevSong, changeRepeat, changeShuffle, changeGuestLogin),
  effect: (action, listenerApi) =>
    localStorage.setItem(
      "playlist",
      JSON.stringify({...(listenerApi.getState() as RootState).songs, firstLoad: true})
    )
}
);