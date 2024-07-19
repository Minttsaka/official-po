import React from 'react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from './ui/button'
import Image from 'next/image'
import { prisma } from '@/lib/connect'
import { stripHtml } from '@/lib/stripHtml'
import Link from 'next/link'

export default async function Announcement() {

  const announcements = await prisma.article.findMany({
    where:{
      isAnnouncement:true
    },
    orderBy:{
      createdAt:"desc"
    }
  })
  return (
    <div className='container mx-auto border-y py-4 '>
        <div className='py-1 px-5 bg-[purple] my-5 text-white w-fit'>ANNOUNCEMENTS</div>
       <Carousel className="w-full">
      <CarouselContent>
        {announcements.map((announcement, index) => (
          <CarouselItem key={index}>
            <div className="relative w-full h-[70vh] overflow-hidden">
                <img
                  src={`${announcement.img}`}
                  alt="Featured Article"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white text-center bg-black bg-opacity-25">
                  <h2 className="text-2xl md:text-3xl font-bold">{announcement.title}</h2>
                  <p className="text-gray-300 max-w-lg mx-auto line-clamp-2 my-2">
                    {stripHtml(announcement.content)}
                  </p>
                  <div className='flex justify-center'>
                  <Link href={`/view/${announcement?.id}?cat=${announcement?.catSlug}`} className='hover:underline'>
                      Read this Announcement
                    </Link>
                  </div>
                </div>
              </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='flex gap-2 mt-2'>
        <CarouselPrevious  />
        <CarouselNext />
      </div>
      
    </Carousel>
    </div>
  )
}
