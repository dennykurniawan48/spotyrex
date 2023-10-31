"use client";
import { signOut, useSession } from "next-auth/react";
import React from "react";
import { MdLogout } from "react-icons/md";
import { AppDispatch, useAppSelector } from "../store/store";
import { useDispatch } from "react-redux";
import { changeGuestLogin } from "../store/features/playlistSlice";

function UserInfo() {
    const dispatch = useDispatch<AppDispatch>();
  const { data: session, status } = useSession();
  return (
    <div className="p-4 flex flex-row w-full h-16 items-center">
      <div className="flex flex-1 flex-col">
        <span className="text-xs">Hello</span>
        <span>{session ? session.user?.name : "Guest"}</span>
      </div>
      <button onClick={() =>{
        if(session){
            signOut()
        }else{
            dispatch(changeGuestLogin(false))
        }
      }}>
        <MdLogout className="w-8 h-8" />
      </button>
    </div>
  );
}

export default UserInfo;
