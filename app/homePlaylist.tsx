import Link from "next/link";
import React from "react";

async function HomePlaylist() {
  const data: Playlist[] = []
  // await fetch(`${process.env.NEXTAUTH_URL}/api/playlist`, {cache: 'no-cache'})
  //   .then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //   })
  //   .then((res) => {
  //     return res.data;
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //     return [];
  //   });
  return (
    <div className="flex flex-col w-full md:w-3/4 lg:w-4/5 h-full bg-black p-8 overflow-y-scroll">
      <span className="text-3xl font-bold text-white">Our playlist</span>
      <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {data.map((playlist) => {
          return (
            <Link scroll={false} key={playlist._id}
              href={`/${playlist._id}`}
              className="flex flex-col space-y-3 p-6 border border-slate-700 border-1 rounded-md hover:bg-slate-700"
            >
              <img src={playlist.image} className="w-full aspect-square" />
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">
                  {playlist.name}
                </span>
                <span className="text-xs text-slate-300">
                  {playlist.songs.length} songs
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default HomePlaylist;
