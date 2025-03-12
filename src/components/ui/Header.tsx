import React from 'react'
import Image from 'next/image'
function Header() {
  return (
    <div className='h-[60px] bg-red-400 w-full flex items-center justify-around gap-20 sm:bg-amber-500  md:bg-blue-500  lg:bg-green-500  xl:bg-pink-500'>
      <div>
        <Image src="/Logo.png" width={100} height={50} alt='Movie Logo'/>
      </div>
      <div className='flex gap-4'>
        <div >btn1</div>
        <div>btn2</div>
      </div>
    </div>
  )
}

export default Header
