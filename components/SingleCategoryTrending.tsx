import React from 'react'
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { prisma } from '@/lib/connect'
import { stripHtml } from '@/lib/stripHtml'
import Link from 'next/link'

export default async function SingleCategoryTrending({category}:{category:string}) {

  const trendingArticle = await prisma.article.findMany({

    where: {
      isAnnouncement: false ,
      catSlug: category ,
      OR: [
        
        { isTrending: true },
        { isAnnouncement: false }
      ],
    },
    orderBy: {
      views: 'desc',
    },
    
  })

  return (
    <div className='container ml-auto border-t pt-5'>
        {trendingArticle.length> 0 && <h3 className="bg-[green] text-white text-xs py-1 px-4 w-fit">Trending</h3>}
        {trendingArticle.length> 0 && <Carousel
        opts={{
            align: "start",
        }}
        className="w-full "
        >
        <CarouselContent className=''>
            {trendingArticle.map((article, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                <div className="relative w-full ">
                <img
                  src={`${article.img}`}
                  alt="Featured Article"
                  width={900}
                  height={600}
                  className=" object-cover object-top transition-transform h-[500px] duration-500 ease-in-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="bg-[green] text-white text-xs py-1 px-4 w-fit">{article.catSlug}</h3>
                    <Link href={`/view/${article?.id}?cat=${article?.catSlug}`} className="text-2xl md:text-3xl hover:underline font-bold my-2">{article.title}</Link>
                    <Link href={`/view/${article?.id}?cat=${article?.catSlug}`} className="text-gray-300 mb-2 hover:underline line-clamp-2">
                      {stripHtml(article.content)}
                    </Link>
                  
                  </div>
                </div>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious  />
        <CarouselNext className='ml-2' />
        </Carousel>}
    </div>
  )
}
