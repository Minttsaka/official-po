import React from 'react'
import SingleBlogRelated from '@/components/SingleBlogRelated'
import SIngleBlogMore from '@/components/SIngleBlogMore'
import { prisma } from '@/lib/connect'
import Head from 'next/head'
import Image from 'next/image'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export default async function page({params}:{params:{
  id:string
}}) {

  const id=params.id

  const article = await prisma.article.findUnique(
    {
      where:{
        id
      }
    }
  )

  return (
    <div className='mt-20 p-5 md:p-0'>
      <Head>
        <title>{article?.title} - My Blog</title>
        <meta name="description" content={`Read about ${article?.title}`} />
        <meta property="og:title" content={article?.title} />
        <meta property="og:description" content={`Read about ${article?.title}`} />
        <meta property="og:image" content={article?.img || undefined} />
        <meta property="og:url" content={`https://myblog.com/articles/${article?.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            "headline": article?.title,
            "image": article?.img,
            "author": {
              "@type": "Person",
              "name": article?.authorName
            },
            "datePublished": article?.publishDate,
            "dateModified": article?.updatedAt
          })}
        </script>
      </Head>
      <article className="prose prose-gray max-w-3xl mx-auto dark:prose-invert">
        <h2 className='text-xl mb-2 md:text-5xl max-w-xl font-bold'>{article?.title}</h2>
        <img src={`${article?.img}`} height={100} width={100} alt={article?.catSlug!} className='w-full h-full mb-2' loading='lazy'/>
        <div className="flex items-center gap-2 text-xs">
            <Avatar>
                <AvatarImage src={`${article?.img}`} />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <p>By {article?.authorName}</p>
            <p className="text-gray-400">{article?.createdAt.toDateString()}</p>
            </div>
          {article && <div
            dangerouslySetInnerHTML={{ __html: article?.content! }}
          className='md:text-lg mt-5'/> }
        </article>
        <SingleBlogRelated />
        <SIngleBlogMore />
    </div>
  )
}
