import { prisma } from '@/lib/connect';
import { stripHtml } from '@/lib/stripHtml';
import Link from 'next/link';
import React from 'react'

export default async function SixthSec() {

  const categories = await prisma.category.findMany({
    orderBy:{
      visitors:"desc"
    }
  });

const [otherArticles,newArticles] = await prisma.$transaction([
  prisma.article.findMany({
    where: {

      catSlug:categories[2].title,
      OR: [
        { isTrending: true },
      ],
    },
    orderBy: {
      likes: 'desc',
    },
    take:3
  }),

  prisma.article.findFirst({
    where: {
      cat: {
        title: categories[2].title
      }
    },
    orderBy: {
      publishDate: 'desc'
    },
    include: {
      author: true,
      cat: true
    },
 
  })
]);



  return (
    <div className="container border-b mx-auto py-10 dark:bg-gray-900">
      <main>
        <section className="dark:bg-gray-800">
            <div className='bg-purple-500 w-fit px-5 py-1 mb-5 text-white'>{categories[2].title}</div>
          <div className="container mx-auto px-4">
            <div className="md:flex gap-8">
              
              <div className="md:w-2/6">
                {otherArticles.map(article=>(
                  <div key={article.id} className="dark:bg-gray-800 grid grid-cols-1 border-b pb-2 gap-2">
                  <img
                    src={`${article?.img}`}
                    alt="Article 1"
                    width={400}
                    height={225}
                    className="w-full h-48 object-cover object-center"
                  />
                   <Link href={`/view/${article?.id}?cat=${article?.catSlug}`} className='line-clamp-2 hover:underline font-bold text-xs'>{stripHtml(article.content)}</Link>
               
                </div>
                ))}
                
              </div>
              <div className="relative w-full h-[70vh] overflow-hidden">
                <img
                  src={`${newArticles?.img}`}
                  alt="Featured Article"
                  width={800}
                  height={600}
                  className="w-full h-full object-cover object-center transition-transform duration-500 ease-in-out hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <Link href={`/view/${newArticles?.id}?cat=${newArticles?.catSlug}`} className="text-2xl md:text-3xl hover:underline font-bold mb-2">{newArticles?.title}</Link>
                  <Link href={`/view/${newArticles?.id}?cat=${newArticles?.catSlug}`} className="text-gray-300 hover:underline line-clamp-2">
                  {stripHtml(newArticles?.content!)}
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
