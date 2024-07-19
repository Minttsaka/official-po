import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { prisma } from '@/lib/connect';
import { htmlToText } from 'html-to-text';
import Link from 'next/link';

export default async function MostTrendingLanding() {

    const trendingArticle = await prisma.article.findFirst({
        where: {
          OR: [
            {
              isTrending: true, // Include articles manually marked as trending
            },
            {
              AND: [
                { isTrending: false }, // Only consider articles not marked as trending
                {
                  OR: [
                    { views: { gt: 1000 } }, // Example automated metric
                    { likes: { gt: 500 } },
                    { shares: { gt: 200 } },
                    { commentsCount: { gt: 100 } },
                    { socialMediaMentions: { gt: 50 } },
                  ],
                },
              ],
            },
          ],
        },
        take: 1, 
      });

      function stripHtml() {
        return htmlToText(trendingArticle?.content!, {
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
    <Link href={`/view/${trendingArticle?.id}?cat=${trendingArticle?.catSlug}`} className="relative md:h-[35vh] bg-black shadow-lg">
    <img
      src={`${trendingArticle?.img}`}
      alt="Featured Article"
      width={800}
      height={600}
      className="w-full md:h-[35vh]  object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
    <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
      <h3 className="bg-[green] text-white text-xs py-1 px-4 w-fit">Most trending</h3>
      <h2 className=" font-bold my-2">{trendingArticle?.title}</h2>
      <p className="text-gray-300 mb-2 text-xs line-clamp-2">
        {stripHtml()}
      </p>
      <div className="flex items-center gap-2 text-xs">
      <Avatar>
        <AvatarImage src={`${trendingArticle?.img}`} />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p>{trendingArticle?.authorName}</p>
      <p className="text-gray-400">{trendingArticle?.createdAt.toDateString()}</p>
      </div>
    </div>
  </Link>
  )
}
