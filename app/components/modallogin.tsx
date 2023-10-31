"use client"
import { Session } from 'next-auth'
import { signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import {FcGoogle} from 'react-icons/fc'
import { useDispatch } from 'react-redux'
import { AppDispatch, useAppSelector } from '../store/store'
import { stat } from 'fs'
import { changeGuestLogin } from '../store/features/playlistSlice'

function ModalLogin() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch<AppDispatch>();
    const guestLogin = useAppSelector((state) => state.songs.guestLogin);
    const { data: session, status } = useSession()

    useEffect(() => {
        if(status=="authenticated" || guestLogin || status=="loading"){
            setOpen(false)
        }else if(status == "unauthenticated" || !guestLogin){
            setOpen(true)
        }
    }, [guestLogin, status])

  return (
    <div className={`fixed h-screen w-screen inset-0 transition-colors flex justify-center items-center bg-gray-400 bg-opacity-75 z-10 overflow-y-scroll ${open ? "visible scale-100 bg-opacity-60" : "invisible scale-0 opacity-0"}`}>
      <div className=' w-[500px]'>
        <div className='w-full space-y-6 p-6 bg-gray-700 flex flex-col'>
           <div className='flex flex-col space-y-4'>
           <span className='text-md font-bold'>Seems you&quot;re not login yet.</span>
            <span className='text-sm'>Consider to make an account or login as guest.</span>
           </div>
            <div className='w-full flex flex-row justify-between items-center px-8'>
            <button onClick={() => {
                dispatch(changeGuestLogin(true))
            }} className="flex flex-row space-x-4 items-center p-2"><span className='underline'>Continue as guest</span></button>
                <button onClick={() => {
                    signIn('google')
                }} className="flex flex-row space-x-4 items-center p-2 border border-white"><FcGoogle/> <span>Login Google</span></button>
            </div>
        </div>
      </div>
    </div>
  )
}

export default ModalLogin