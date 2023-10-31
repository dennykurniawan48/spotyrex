import Link from 'next/link'
import React from 'react'

function NotFound() {
  return (
    <div className="h-screen w-full flex flex-col space-y-16 justify-center items-center">
      <img src="/notfound.svg" className="w-48 h-48" />
      <span className="text-3xl">Page Not Found</span> 
      <Link href='/' className='px-4 py-2 border border-gray-400 text-white text-xl'>Back to home</Link>
    </div>
  )
}

export default NotFound