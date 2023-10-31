"use client";
import { changePlaylist } from "@/app/store/features/playlistSlice";
import { AppDispatch, useAppSelector } from "@/app/store/store";
import { formatDuration } from "@/helper/function/formatduration";
import { DetailArtist } from "@/helper/response/detailartist/DetailArtist";
import { Song } from "@/helper/types/song/Song";
import React, { useEffect, useState } from "react";
import { MdPlayArrow, MdPlayCircleFilled } from "react-icons/md";
import { useDispatch } from "react-redux";

function SongTable(props: { data: DetailArtist }) {
  const dispatch = useDispatch<AppDispatch>();
  const [data, setData] = useState<Song[]>([]);

  useEffect(() => {
    const playlist: Song[] = props.data.songs.map((item) => {
      return {
        _id: item._id,
        title: item.title,
        image: item.image,
        artistId: item.artistId,
        url: item.url,
        duration: item.duration,
        artist: props.data.name,
      };
    });
    setData(playlist);
  }, [props.data]);

  return (
    <>
      <div className="flex flex-row items-end">
        <img src={props.data.image} className="w-36 h-36" />
        <div className="flex flex-col justify-end px-6">
          <span className="text-5xl">{props.data.name}</span>
          <button
            className="mt-4"
            onClick={() => {
              dispatch(changePlaylist({ songs: data, index: 0 }));
            }}
          >
            <MdPlayCircleFilled className="w-12 h-12" />
          </button>
        </div>
      </div>
      <div className="w-full flex flex-col mt-12">
        <div className="flex w-full mb-2">
          <span className="w-1/12 text-center">#</span>
          <span className="w-4/12">Song title</span>
          <span className="w-4/12">Artist name</span>
          <span className="w-2/12">Duration</span>
        </div>
        {props.data.songs.map((song, index) => (
          <div key={song._id} className="flex w-full py-2">
            <button
              className="w-1/12 flex justify-center items-center"
              onClick={() => {
                dispatch(changePlaylist({ songs: data, index }));
              }}
            >
              <MdPlayArrow className="w-6 h-6" />
            </button>
            <span className="w-4/12">{song.title}</span>
            <span className="w-4/12">{props.data.name}</span>
            <span className="w-2/12">{formatDuration(song.duration)}</span>
          </div>
        ))}
      </div>
    </>
  );
}

export default SongTable;
