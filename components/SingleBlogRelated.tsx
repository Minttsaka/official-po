import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import Link from 'next/link'
import { prisma } from '@/lib/connect'
import { stripHtml } from '@/lib/stripHtml'

export default async function Featured() {


  const featuredArticle= await prisma.article.findMany({

    where:{
      isFeatured:true
    }

  })

  return (
    <div>
      <Carousel
      opts={{
        align: "start",
      }}
      className="container mx-auto mt-20 w-full"
    >
        <div className='text-white bg-blue-500 w-fit py-1 px-5'>Featured</div>
      <CarouselContent>
        {featuredArticle.map((article, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3 border-s">
            <div className="p-1 text-center">
                <img
                        src={`${article.img}`}
                        alt="Article 2"
                        width={400}
                        height={225}
                        className="w-full h-48 object-cover object-top"
                    />
                    <div className="p-6">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                        {article.title}
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 line-clamp-3 mb-4">
                        {stripHtml(article.content)}
                        </p>
                        <Link href={`/view/${article?.id}?cat=${article?.catSlug}`}
                          className="inline-flex items-center text-blue-600 hover:underline dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
                          prefetch={false}
                          >
                          Read More
                          <ArrowRightIcon className="ml-2 w-4 h-4" />
                        </Link>
                    </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className='flex gap-2 mb-2'>
        <CarouselPrevious  />
        <CarouselNext />
      </div>
    </Carousel>
    </div>
  )
}

function ArrowRightIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
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
        <path d="M5 12h14" />
        <path d="m12 5 7 7-7 7" />
      </svg>
    )
  }