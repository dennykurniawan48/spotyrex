import { DetailArtist } from "@/helper/response/detailartist/DetailArtist";
import { DetailPlaylist } from "@/helper/response/detailplaylist/DetailPlaylist";
import { notFound } from "next/navigation";
import React from "react";
import { MdPlayArrow, MdPlayCircleFilled } from "react-icons/md";
import SongTable from "./songtable";

async function Page(props: { params: { id: string } }) {
  const data: DetailArtist | null = await fetch(
    `http://192.168.43.30:3000/api/artist/${props.params.id}`, {cache: 'no-cache'}
  )
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
    })
    .then((res) =>  res.data)
    .catch((err) => {
      console.log(err);
      return null;
    });

  if (!data) {
    notFound();
  }
  return (
    <div className="flex flex-col md:w-3/4 lg:w-4/5 h-full bg-black p-4 lg:p-8 overflow-y-scroll text-white">
      <SongTable data={data}/>
    </div>
  );
}

export default Page;
