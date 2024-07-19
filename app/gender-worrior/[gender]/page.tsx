import Image from 'next/image'
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

export default async function page({params}:{params:{gender:string}}) {

  const gender = params.gender

  const genderId = await prisma.gender.findFirst({
    where:{
      type:gender
    },

   include:{
    article:true
   }
  })

  const articles = await prisma.article.findMany({
    where:{
      genderId:genderId?.id
    },
    orderBy:{
      createdAt:"desc"
    }
  })

  const quotes = await prisma.quotes.findMany()
  const count = await prisma.quotes.count()

  const index = Math.floor(Math.random() * count)

  return (
    <div className=''>
      <div className='grid grid-cols-1 md:grid-cols-2'>
        <div className='flex items-center justify-center text-center'>
            <div>
                <h2 className='text-[red] font-bold'>GENDER</h2>
                <p className='text-3xl'>{gender}</p>
            </div>
            {/* <section>
            <div className="noise h-60 w-60">
              
            </div>
            </section> */}
        </div>
            <Image
            width={800}
            height={500}
                src={`${genderId?.img}`}
                alt="Article Thumbnail"
                className='w-full'
            />
      </div>
      <div className='container mx-auto my-20 px-5 md:px-0 '>
      <div className='text-white mb-5 bg-blue-500 w-fit py-1 px-5'>Todays</div>
        <div className='grid md:grid-cols-2 gap-20'>
            <div className='flex flex-col gap-5'>
            <h2 className='text-5xl'>Breaking the Glass Ceiling</h2>
            <img
                  src={`${articles[0].img}`}
                  alt={articles[0].title}
                  className="h-96 aspect-[4/4] object-cover"
                />
            </div>
            <div
            dangerouslySetInnerHTML={{ __html: articles[0].content }}
            className='md:text-lg mt-5'/>
        </div>
        
      </div>
      <div className='container ml-auto border-t py-5 px-5 md:px-0'>
        <h2 className='text-5xl max-w-xl'>{gender==="male" ? "Males": "Females"} who are doing tremendous work</h2>
        <p className='max-w-xl mb-5'> Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere et dolorem, odit enim 
                sequi quae reiciendis, delectus voluptate, animi 
                iste velit sapiente quia aliquid doloremque sunt molestiae quod nam neque!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum sapiente, nisi,
                neque placeat eum fugit debitis, deserunt quam hic dolorum tempora provident mollitia maiores!
                Dolorem pariatur incidunt eius, voluptas debitis, consectetur dolorum saepe iure quos 
                voluptates minus amet voluptatibus alias perspiciatis ducimus nihil deleniti, dolor consequuntur nam rerum ut et.
            </p>
        <Carousel
        opts={{
            align: "start",
        }}
        className=" py-5"
        >
        <CarouselContent className=''>
            {articles.map((article, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                <div className="p-1">
                <div className="relative  ">
                <img
                  src={`${article.img}`}
                  alt={article.title}
                  width={900}
                  height={600}
                  className="rounded object-cover object-top transition-transform duration-500 ease-in-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                    <h3 className="bg-[green] text-white text-xs py-1 px-4 w-fit">{article.catSlug}</h3>
                    <h2 className="text-2xl md:text-3xl font-bold my-2">{article.title}</h2>
                    <p className="text-gray-300 mb-2 line-clamp-2">
                      {stripHtml(article.content)}
                    </p>
                  
                  </div>
                </div>
                </div>
            </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious  />
        <CarouselNext className='ml-2' />
        </Carousel>
      </div>
      <div className='bg-black bg-opacity-90 py-20 text-white'>
        <div className='container mx-auto flex justify-center px-5 md:px-0' >
            <div className='max-w-3xl p-5 border-8 border-red-100'>
                <p className='md:text-2xl'>{quotes[index].content}
                     </p>
                     <div className='flex items-center mt-5 gap-3'>
                        <Avatar>
                        <AvatarImage src="/soccer.jpeg" />
                        <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div className='text-xs'>
                            <p >{quotes[index].author}</p>
                            <p >CEO of dctfusion</p>
                        </div>
                     </div>
            </div>
        </div>
      </div>
    </div>
  )
}
