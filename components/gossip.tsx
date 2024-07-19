/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/oX5PsGoaaMA
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { DM_Serif_Display } from 'next/font/google'

dm_serif_display({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { prisma } from "@/lib/connect"
import { stripHtml } from "@/lib/stripHtml"

export async function Gossip() {

  const [newGossip, gossips] = await prisma.$transaction([

    prisma.article.findFirst({
      where:{
        isGossip:true
      },
      orderBy: {
        createdAt: 'desc',
      }
    }),

    prisma.article.findMany({
      where:{
        isGossip:true
      },
      orderBy: {
        createdAt: 'asc',
      }
    })

  ])

 

  return (
    <div className="container mx-auto border-y my-12 pb-12">
      <div className='py-1 px-5 bg-[purple] my-5 text-white w-fit'>GOSSIPs</div>
       <div className="relative w-full h-[70vh] overflow-hidden mb-10">
                <img
                  src={`${newGossip?.img}`}
                  alt="Featured Article"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover object-center "
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                  <h2 className="text-2xl md:text-3xl font-bold mb-2">{newGossip?.title}</h2>
                  <p className="text-gray-300 line-clamp-2 max-w-lg">
                    {stripHtml(newGossip?.content!)}
                  </p>
                  <Link href={`/view/${newGossip?.id}?cat=${newGossip?.catSlug}`} className="text-pink-500 font-bold hover:underline" prefetch={false}>
                    Read More
                  </Link>
                </div>
              </div>

        <Carousel
      opts={{
        align: "start",
      }}
      className="container mx-auto w-full"
    >
      <CarouselContent className="border-t pt-5">
        {gossips.map((gossip, index) => (
          <CarouselItem className="md:basis-1/2 lg:basis-1/3" key={index}>
             <div className="border-s  overflow-hidden">
              <img src="/placeholder.svg" alt="Celebrity" width={300} height={200} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{gossip.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {stripHtml(gossip.content)}
                </p>
                <Link href={`/view/${gossip?.id}?cat=${gossip?.catSlug}`}  className="text-pink-500 font-bold hover:underline" prefetch={false}>
                  Read More
                </Link>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious  />
      <CarouselNext className='ml-2' />
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