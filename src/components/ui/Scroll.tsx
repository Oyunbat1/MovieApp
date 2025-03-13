import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useMediaQuery } from "react-responsive";
import { useState, useEffect } from "react";
import Autoplay from "embla-carousel-autoplay"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

function Scroll() {
  const isMobileQuery = useMediaQuery({ maxWidth: 639 });
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    setIsMobile(isMobileQuery);
  }, [isMobileQuery]);


  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
 
  return (
    <div className="flex justify-center w-screen ">
      {isMobile && (
        <div className="mb-[20px] mt-[10px]">
          <div>
          <Carousel className="w-screen"
             plugins={[plugin.current]}
          >
      <CarouselContent >
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
                    <div>
          <Image
            src="/scroll.jpeg"
            width={1920}
            height={1080}
            className="w-screen h-auto object-cover"
            alt="Movie Logo"
          />
          <div className="flex flex-col p-[26px] gap-4">
            <div className="flex justify-between">
              <div>
                <p className="text-[14px]">Now playing:</p>
                <h1 className="text-[24px] font-bold">Wicked</h1>
              </div>
              <div className="flex items-center">
                <Image
                  src="/star.svg"
                  width={20}
                  height={50}
                  alt="Movie Logo"
                />
                <p className="text-[#71717A]">
                  <span
                    className="font-bold text-[18px
                      ] text-black"
                  >
                    6.9
                  </span>
                  /10
                </p>
              </div>
            </div>
            <p className="text-[14px] ">
              Elphaba, a misunderstood young woman because of her green skin,
              and Glinda, a popular girl, become friends at Shiz University in
              the Land of Oz. After an encounter with the Wonderful Wizard of
              Oz, their friendship reaches a crossroads.
            </p>
            <Button className="w-[150px] h-[40px]">
              {" "}
              <Image
                src="/play.svg"
                width={16}
                height={50}
                alt="Movie Logo"
              />{" "}
              Watch Trailer
            </Button>
          </div>
        </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      {/* <CarouselPrevious />
      <CarouselNext /> */}
    </Carousel>
          </div>


        </div>
      )}
      {!isMobile && (
<div>
<div>
<Carousel className="w-screen"  plugins={[plugin.current]}>
      <CarouselContent>
        {Array.from({ length: 5 }).map((_, index) => (
          <CarouselItem key={index}>
          <div className="relative  text-white mb-[30px]">
          <Image
            src="/desktop/Feature.png"
            width={1920}
            height={1080}
            className="w-screen h-auto object-cover "
            alt="Movie Logo"
          />
          <div className="flex flex-col p-[46px] gap-4 lg:gap-12 absolute z-10 top-1/2 left-1/3 lg:left-1/4 transform -translate-x-1/2 -translate-y-1/2 w-[404px]">
            <div className="flex flex-col justify-between text-white">
              <div>
                <p className="text-[14px] lg:text-[18px] xl:text-[24px]">
                  Now playing:
                </p>
                <h1 className="text-[24px] lg:text-[32px] xl:text-[46px] font-bold">
                  Wicked
                </h1>
              </div>
              <div className="flex items-center">
                <Image
                  src="/star.svg"
                  width={20}
                  height={50}
                  alt="Movie Logo"
                />
                <p className="text-[#71717A] xl-text-[20px]">
                  <span
                    className="font-bold text-[18px
                ] xl:text-[20px] text-white"
                  >
                    6.9
                  </span>
                  /10
                </p>
              </div>
            </div>
            <p className="text-[14px] xl:text-[18px] lg:leading-loose xl:w-[480px]">
              Elphaba, a misunderstood young woman because of her green skin,
              and Glinda, a popular girl, become friends at Shiz University in
              the Land of Oz. After an encounter with the Wonderful Wizard of
              Oz, their friendship reaches a crossroads.
            </p>
            <Button className="w-[150px] h-[40px] bg-white text-black">
              {" "}
              <Image
                src="/desktop/play-desktop.svg"
                width={16}
                height={50}
                alt="Movie Logo"
              />{" "}
              Watch Trailer
            </Button>
          </div>
        </div>
          </CarouselItem>
        ))}
      </CarouselContent>
    
    </Carousel>
</div>

</div>
      )}
    </div>
  );
}

export default Scroll;
