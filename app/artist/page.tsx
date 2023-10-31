import Link from "next/link";
import React from "react";

async function Page() {
  const data: SongArtist[] = []
  // await fetch(
  //   `${process.env.NEXTAUTH_URL}/api/artist`,
  //   { cache: "no-cache" }
  // )
  //   .then((res) => {
  //     if (res.ok) {
  //       return res.json();
  //     }
  //   })
  //   .then((res) => res.data)
  //   .catch((err) => {
  //     console.log(err);
  //     return [];
  //   });
  return (
    <div className="flex flex-col md:w-3/4 lg:w-4/5 h-full bg-black p-8 overflow-y-scroll">
      <span className="text-3xl font-bold text-white">Our artist</span>
      <div className="grid grid-flow-row grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mt-6">
        {data.map((artist) => {
          return (
            <Link
              key={`${artist._id}`}
              href={`/artist/${artist._id}`}
              className="flex flex-col space-y-3 p-6 border border-slate-700 border-1 rounded-md hover:bg-slate-700"
            >
              <img src={artist.image} className="w-full aspect-square" />
              <div className="flex flex-col">
                <span className="text-sm text-white">{artist.name}</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Page;
