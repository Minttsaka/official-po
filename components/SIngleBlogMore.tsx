import { prisma } from '@/lib/connect'
import { stripHtml } from '@/lib/stripHtml'
import Link from 'next/link'
import React from 'react'

export default async function UnpopularArticles() {

    const unTrendArticles = await prisma.article.findMany({

        where:{
            isTrending:false,
            views: {
                lt: 50,
              },
              isAnnouncement:false
              
        },
        take:10
    })
  return (
    <div className='bg-gray-100 py-10'>
        <div  className='max-w-lg mx-auto px-5 space-y-2 text-xs md:text-sm md:px-0'>
            <h2 className='mb-10 border-b'>Other articles you may like</h2>
      {
          unTrendArticles.map(article=>(
            <div key={article.id} className="grid grid-cols-[200px_1fr] items-center gap-6 border-b">
                <img
                    src={`${article.img}`}
                    width="200"
                    height="150"
                    alt="Article Thumbnail"
                    className="aspect-[4/3] overflow-hidden object-cover"
                />
                <div className="space-y-2">
                  <Link href={`/view/${article?.id}?cat=${article?.catSlug}`} className="font-bold hover:underline text-black">{article.title}</Link>
                    <Link href={`/view/${article?.id}?cat=${article?.catSlug}`} className="text-gray-500 hover:underline dark:text-gray-400 line-clamp-2">
                      {stripHtml(article.content)}
                    </Link>
                    
                </div>
              </div>
          ))
        }
        </div>
    </div>
  )
}
