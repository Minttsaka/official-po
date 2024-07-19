
"use client"
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"

export function About() {

    const plugin = React.useRef(
        Autoplay({ delay: 3000, stopOnInteraction: true })
      )

  return (
    <div>
      <div className="relative w-full bg-black shadow-2xl mb-1 md:mb-0">
         <video 
            autoPlay 
            muted 
            loop 
            className='w-full h-[80vh] md:h-full'>
            <source src="https://videos.pexels.com/video-files/7649279/7649279-uhd_2560_1440_30fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black opacity-50" />
            <div className='absolute top-20 left-0 right-0 flex justify-center'>
                <div className=" max-w-4xl p-6 text-white">
                    <h2 className="text-xl md:text-4xl font-bold my-2">Welcome to poly observer</h2>
                    <p className="text-white mb-2 max-w-xl ">
                        Explore the latest trends and technologies shaping the future of web development.
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat quod ea officia deserunt aliquam veritatis ducimus adipisci et iste nisi.
                    </p>
                </div>
            </div>
        </div>
        <div className='bg-black pb-20 text-white'>
            <div className='max-w-6xl mx-auto'>
                <h3 className='border-b py-5'>Poly observer at grance</h3>
                <div className='grid  md:grid-cols-4'>
                    <div className='p-5 border-r'>
                        <h1 className='text-5xl'>1.9K+ </h1>
                        <p>Digital audience</p>
                    </div>
                    <div className='p-5 border-r'>
                        <h1 className='text-5xl'>1K+ </h1>
                        <p>Digital audience</p>
                    </div>
                    <div className='p-5 border-r'>
                        <h1 className='text-5xl'>1K+ </h1>
                        <p>Digital audience</p>
                    </div>
                    <div className='p-5 border-l'>
                        <h1 className='text-5xl'>1K+ </h1>
                        <p>Digital audience</p>
                    </div>
                </div>
            </div>
            

        </div>
        <div className='max-w-6xl mt-20 mx-auto'>
            <h3 className='border-b py-5'>How we started</h3>
            <div className='mt-20 grid md:grid-cols-2 items-center'>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Itaque cupiditate unde at eveniet repellendus libero odit distinctio 
                    in sequi porro accusamus quisquam nobis 
                    velit, nulla ipsum veritatis optio doloribus molestias accusantium magni,
                     minus, fugit doloremque! Error ea saepe similique quas.
                </p>
                <Image
                    src="/soccer.jpeg"
                    alt="Featured Article"
                    width={300}
                    height={400}
                    className="object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105"
                  />
            </div>
        </div>
        <div className=' bg-black text-white mt-20 mx-auto'>
            <div className='max-w-6xl mx-auto'>
            <h3 className='border-b py-5'>Partners</h3>
            <div className='mt-20 grid pb-20 md:grid-cols-2 items-center'>
            <Carousel
                plugins={[plugin.current]}
                className="w-full max-w-xs"
                onMouseEnter={plugin.current.stop}
                onMouseLeave={plugin.current.reset}
                >
                <CarouselContent>
                    {Array.from({ length: 5 }).map((_, index) => (
                    <CarouselItem key={index}>
                        <Image alt="logo" src={"/logo.png"} height={300} width={300} />
                    </CarouselItem>
                    ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
                </Carousel>
                <p>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. 
                    Itaque cupiditate unde at eveniet repellendus libero odit distinctio 
                    in sequi porro accusamus quisquam nobis 
                    velit, nulla ipsum veritatis optio doloribus molestias accusantium magni,
                     minus, fugit doloremque! Error ea saepe similique quas.
                </p>
                
            </div>
            </div>
            
        </div>
        <div className='bg-black bg-opacity-90 pb-20 text-white'>
            <div className='max-w-6xl mx-auto'>
                <h3 className='border-b text-center py-5'>Advertise with polyobserver</h3>
                <div className='grid  md:grid-cols-2'>
                    <div className='p-5 border-r'>
                        <h1 className='md:text-2xl text-center'>Polyobserver market </h1>
                        <p className='text-center text-gray-400'>Digital audience</p>
                        <div className='flex  justify-center'>
                            <Button className='text-grat-400 bg-black mt-5'>Explore more</Button>
                        </div>
                        
                    </div>
                    <div className='p-5 '>
                        <h1 className='md:text-2xl text-center'>Polyobserver news </h1>
                        <p className='text-center text-gray-400'>Digital audience</p>
                        <div className='flex  justify-center'>
                            <Button className='text-grat-400 bg-black mt-5'>Explore more</Button>
                        </div>
                    </div>
                   
                </div>
            </div>
            

        </div>
    </div>
  )
}

function AxeIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m14 12-8.5 8.5a2.12 2.12 0 1 1-3-3L11 9" />
        <path d="M15 13 9 7l4-4 6 6h3a8 8 0 0 1-7 7z" />
      </svg>
    )
  }
  
