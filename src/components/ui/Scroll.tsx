import React from 'react'
import Image from 'next/image'
import { Button } from "@/components/ui/button"

function Scroll() {
  return (
    <div >
       <Image src="/scroll.jpeg" width={456} height={256} alt='Movie Logo'/>
       <div className='flex flex-col p-[26px] gap-4'>
        <div className='flex justify-between'>
            <div><p className='text-[14px]'>Now playing:</p>
            <h1 className='text-[24px] font-bold'>Wicked</h1></div>
            <div className='flex items-center'>
            <Image src="/star.svg" width={20} height={50} alt='Movie Logo'/>
                <p className='text-[#71717A]'><span className='font-bold text-[18px
                ] text-black'>6.9</span>/10</p>
            </div>
        </div>
        <p className='text-[14px] '>Elphaba, a misunderstood young woman because of her green skin, and Glinda, a popular girl, become friends at Shiz University in the Land of Oz. After an encounter with the Wonderful Wizard of Oz, their friendship reaches a crossroads.</p>
        <Button className="w-[150px] h-[40px]">   <Image src="/play.svg" width={16} height={50} alt='Movie Logo'/> Watch Trailer</Button>
       </div>
    </div>
  )
}

export default Scroll
