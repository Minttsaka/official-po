
import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'
import { prisma } from '@/lib/connect';
import { htmlToText } from 'html-to-text';
import Link from 'next/link';


export default async function MostViewedLanding() {

  const editorsPicks = await prisma.article.findFirst({
    where: {
      isEditorsPick: false,
    },
    take: 5,
  });


  function stripHtml() {
    return htmlToText(editorsPicks?.content!, {
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
    <Link href={`/view/${editorsPicks?.id}?cat=${editorsPicks?.catSlug}`} className="relative md:h-[35vh]  bg-black  shadow-lg">
      
    <img
      src={`${editorsPicks?.img}`}
      alt="Featured Article"
      width={800}
      height={600}
      className="w-full md:h-[35vh] object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
      <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
        <h3 className="bg-[green] text-white text-xs py-1 px-4 w-fit">Evergreen</h3>
        <h2 className="font-bold my-2">{editorsPicks?.title}</h2>
        <p className="text-gray-300 mb-2 text-xs line-clamp-2">
          {stripHtml()}
        </p>
        <div className="flex items-center gap-2 text-xs">
        <Avatar>
          <AvatarImage src={`${editorsPicks?.img}`} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <p>{editorsPicks?.authorName}</p>
        <p className="text-gray-400">{editorsPicks?.createdAt.toDateString()}</p>
        </div>
      </div>
  </Link>
  )
}
