"use client";
import React, { useEffect, useRef, useState } from "react";
import { AppDispatch, useAppSelector } from "../store/store";
import { useDispatch } from "react-redux";
import Link from "next/link";
import {
  MdPauseCircleFilled,
  MdPlayCircleFilled,
  MdShuffle,
  MdShuffleOn,
  MdRepeat,
  MdRepeatOn,
  MdSkipPrevious,
  MdSkipNext
} from "react-icons/md";
import ReactHowler from "react-howler";
import {
  changePlaylist,
  changeRepeat,
  changeShuffle,
  nextSong,
} from "../store/features/playlistSlice";

function Player() {
  const playlist = useAppSelector((state) => state.songs.playlist);
  const index = useAppSelector((state) => state.songs.index);
  const firstLoad = useAppSelector((state) => state.songs.firstLoad);
  const repeat = useAppSelector((state) => state.songs.repeat);
  const shuffle = useAppSelector((state) => state.songs.shuffle);
  const dispatch = useDispatch<AppDispatch>();
  const [isPlaying, setIsPlaying] = useState(false);
  const songRef = useRef(null);
  const [position, setPosition] = useState(0.0);

  useEffect(() => {
    if (!firstLoad) {
      if (playlist.length > 0 && index <= playlist.length - 1) {
        setIsPlaying(true);
      }
    }
  }, [playlist, index, firstLoad]);

  useEffect(() => {
    let idTimeout;

    if (isPlaying && songRef.current) {
      const f = () => {
        setPosition(songRef.current.seek());
        idTimeout = requestAnimationFrame(f);
      };

      idTimeout = requestAnimationFrame(f);
      console.log(idTimeout)
      return () => cancelAnimationFrame(idTimeout);
    }

    cancelAnimationFrame(idTimeout);
  }, [isPlaying]);

  function onEnd() {
    if (playlist.length - 1 > index) {
      dispatch(nextSong(index + 1));
    } else {
      if (!repeat) {
        setIsPlaying(false);
        setPosition(0.0);
        dispatch(changePlaylist({ songs: playlist, index: 0 }));
      } else {
        dispatch(nextSong(0));
      }
    }
  }

  return (
    <div className="w-full h-24 bg-gray-800 absolute bottom-0 px-2">
      <input
        id="minmax-range"
        type="range"
        min={0}
        max={playlist.at(index)?.duration ?? 0}
        value={position}
        className="w-full h-1 rounded-lg appearance-none cursor-pointer bg-gray-700"
      />
      <div className="w-full flex flex-row h-16 items-center justify-center mt-2">
        {playlist.length > 0 && index < playlist.length && (
          <div className="hidden md:flex flex-row">
            <img
              src={playlist.at(index)?.image}
              className=" w-14 aspect-square"
            />
            <div className=" ml-20 absolute flex-col space-y-2 items-center justify-center">
              <div className="w-full flex flex-col space-y-2">
                <span className="text-sm">{playlist.at(index)?.title}</span>
                <Link
                  href={`/artist/${playlist.at(index)?._id}`}
                  className="text-xs"
                >
                  {playlist.at(index)?.artist}
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className="w-full h-full flex items-center justify-center space-x-8">
        <button
              onClick={() => {
                if(index > 0 && playlist.length > 0){
                    dispatch(nextSong(index-1))
                }
              }}
            >
              <MdSkipPrevious className="w-8 h-8" />
            </button>
          {isPlaying ? (
            <button
              onClick={() => {
                setIsPlaying(false);
              }}
            >
              <MdPauseCircleFilled className="w-12 h-12" />
            </button>
          ) : (
            <button
              onClick={() => {
                setIsPlaying(true);
              }}
            >
              <MdPlayCircleFilled className="w-12 h-12" />
            </button>
          )}

<button
              onClick={() => {
                onEnd()
              }}
            >
              <MdSkipNext className="w-8 h-8" />
            </button>

          {repeat ? (
            <button
              onClick={() => {
                dispatch(changeRepeat(false));
              }}
            >
              <MdRepeatOn className="w-8 h-8" />
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(changeRepeat(true));
              }}
            >
              <MdRepeat className="w-8 h-8" />
            </button>
          )}

          {shuffle ? (
            <button
              onClick={() => {
                dispatch(changeShuffle(false));
              }}
            >
              <MdShuffleOn className="w-8 h-8" />
            </button>
          ) : (
            <button
              onClick={() => {
                dispatch(changeShuffle(true));
              }}
            >
              <MdShuffle className="w-8 h-8" />
            </button>
          )}

          {playlist.length > 0 && index <= playlist.length - 1 && (
            <ReactHowler
              src={playlist.at(index)?.url!}
              playing={isPlaying}
              ref={songRef}
              onEnd={onEnd}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Player;
