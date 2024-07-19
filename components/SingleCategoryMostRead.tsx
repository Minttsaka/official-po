import { prisma } from '@/lib/connect'
import { stripHtml } from '@/lib/stripHtml'
import Link from 'next/link'
import React from 'react'

export default async function SingleCategoryMostRead({ category }:{ category:string }) {

  const mostReadArticle = await prisma.article.findMany({

    where: {
      catSlug: category
    },
    orderBy: {
      views: 'desc',
    },
    take:3
  })

  const newArticle = await prisma.article.findFirst({

    where: {
      catSlug: category
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return (
    <div className="container border-y mx-auto  mt-10 dark:bg-gray-900">
      <main>
        <section className="dark:bg-gray-800  py-5 ">
            <div className='bg-purple-500 w-fit px-5 py-1 mb-5 text-white'>Most read</div>
          <div className="container mx-auto px-4">
            <div className="md:flex gap-8">
              
              <div className="md:w-2/6">
              {mostReadArticle.map((article) => (
                <div key={article.id} className="dark:bg-gray-800 grid grid-cols-1 border-b pb-2 gap-2">
                  <img
                    src={`${article.img}`}
                    alt="Article 1"
                    width={400}
                    height={225}
                    className="w-full h-48 object-cover object-center"
                  />
                  <Link href={`/view/${article?.id}?cat=${article?.catSlug}`} className='line-clamp-2 hover:underline font-bold text-xs'>
                    {stripHtml(article.content)}
                  </Link>
               
                </div>  
              ))}            
              </div>
              <div className="relative w-full h-[70vh] overflow-hidden">
                <img
                  src={`${newArticle?.img}`}
                  alt="Featured Article"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <Link href={`/view/${newArticle?.id}?cat=${newArticle?.catSlug}`} className="text-2xl md:text-3xl hover:underline font-bold mb-2">{newArticle?.title}</Link>
                  <Link href={`/view/${newArticle?.id}?cat=${newArticle?.catSlug}`} className="text-gray-300 hover:underline line-clamp-2">
                    {stripHtml(newArticle?.content!)}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>       
      </main>

    </div>
  )
}
