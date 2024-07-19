import { prisma } from '@/lib/connect'
import { stripHtml } from '@/lib/stripHtml'
import Link from 'next/link'
import React from 'react'

export  default async function SingleCategoryMore({category}:{category:string}) {

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
    <div>
      <div className='max-w-lg mx-auto mt-20'>
            <h2 className="mb-4 bg-[green] w-fit py-1 px-5 text-white">More</h2>
            {
          unTrendArticles.map(article=>(
            <div key={article.id} className="border-b mb-5 text-sm border-gray-400 py-3">
                <Link href={`/view/${article?.id}?cat=${article?.catSlug}`} className="text-gray-600 hover:underline font-bold dark:text-gray-400 line-clamp-3">
                    {stripHtml(article.content)}
                </Link>
                <div className="flex text-gray-600 text-xs gap-2 items-center">
                    <p>By {article.authorName}</p>
                    <p>{article.createdAt.toDateString()}</p>
                </div>
            </div>
          ))}
            
            
        </div>
    </div>
  )
}
