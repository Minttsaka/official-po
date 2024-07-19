import React from 'react'
import Link from "next/link"
import { htmlToText } from 'html-to-text';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { prisma } from '@/lib/connect'

export default async function NewArticleLanding() {

    const latestArticle = await prisma.article.findFirst({
        orderBy: {
          createdAt: 'desc',
        }
        
      });

      function stripHtml() {
        return htmlToText(latestArticle?.content!, {
            selectors: [
                { selector: 'p', format: 'inline' },
                { selector: 'img', format: 'skip' }, // Skip images
                { selector: 'video', format: 'skip' }, // Skip videos
                { selector: 'a', options: { ignoreHref: true } }, // Ignore links
                // Add more selectors as needed
              ],
          });
      }
      
    
  return (
    <Link href={`/view/${latestArticle?.id}?cat=${latestArticle?.catSlug}`} className="relative  md:h-[70vh] overflow-hidden w-full shadow-2xl mb-1 md:mb-0">
        <img
            src={`${latestArticle?.img}`}
            alt="Featured Article"
            width={800}
            height={600}
            className="w-full h-full object-cover object-top transition-transform duration-500 ease-in-out hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <h3 className="bg-[green] text-white text-xs py-1 px-4 w-fit">New</h3>
            <h2 className="text-2xl md:text-3xl font-bold my-2">{latestArticle?.title}</h2>
            <p className="text-gray-300 mb-2 line-clamp-2">
                {stripHtml()}
            </p>
            <div className="flex items-center gap-2 text-xs">
                <Avatar>
                    <AvatarImage src={`${latestArticle?.img}`} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <p>{latestArticle?.authorName}</p>
                <p className="text-gray-400">{latestArticle?.createdAt.toDateString()}</p>
            </div>
            </div>
         </Link>
        )
    }
