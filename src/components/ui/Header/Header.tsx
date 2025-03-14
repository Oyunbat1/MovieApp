"use client"
import React from 'react'
import Image from 'next/image'
import First from './firstStep/First'
import Second from './secondStep/Second'
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button"
import { Search } from 'lucide-react';


function Header() {

    const [search , setSearch] = useState(null)

    const searchFirst = ()=>{ 
        setSearch("first")
    }
    const searchSecond = ()=>{  
      setSearch("second")
    }
  return (
    <div className='h-[60px] bg-white w-full flex items-center justify-around gap-20 sm:bg-amber-500  md:bg-blue-500  lg:bg-green-500  xl:bg-pink-500'>
       
        {search === null && (
        <div className="w-full  flex justify-around sm:bg-amber-500 md:bg-blue-500 lg:bg-green-500 xl:bg-pink-500">
          <Image src="/Logo.png" width={100} height={50} alt='Movie Logo'/>
      <div>
      <Button className='w-[35px] text-[10px] bg-white text-black ' onClick={searchFirst}><Search /></Button>
       
       <Button className='w-[35px] text-[10px] bg-white text-black ' onClick={searchFirst}><Search /></Button>
      </div>
        </div>
      )}
        <div className='w-full'>
            {search === "first" && <First/> }
            {search === "second" && <Second/> }
        </div>
    </div>
  )
}

export default Header
