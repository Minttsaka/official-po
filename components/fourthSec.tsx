
import React from 'react'
import Link from 'next/link';
import { stripHtml } from '@/lib/stripHtml';
import { prisma } from '@/lib/connect';

export default async function Videos() {

  const newVideo = await prisma.video.findFirst({

    orderBy:{
      articleId:"desc"
    }
  });

  const [videoArticle, videoList] = await prisma.$transaction([

    prisma.article.findFirst(
      {
  
          where:{
            id:newVideo?.articleId
          }
      }
  ),

    prisma.article.findMany(
      {
  
          include:{
              featuredVideo:true
          },
          take:3
      }
  ),
  ])



// {videos?.[2]?.featuredVideo?.[0].url}

  return (
    <div className="container flex gap-2 border-y mx-auto w-full py-10 ">
      <div className='w-[70%]'>
        <video src={`${newVideo?.url}`} controls controlsList="nodownload" className='w-full '></video>
        <Link href={`/view/${videoArticle?.id}?cat=${videoArticle?.catSlug}`}  className='line-clamp-2 text-gray-700 text-xs hover:underline'>{stripHtml(videoArticle?.content!)}</Link>
      </div>
      <div className="space-y-2 md:w-[30%]">
        {videoList?.map(article=>(
            <div key={article.id} className="dark:bg-gray-800 grid grid-cols-1 border-b pb-2 gap-2">
              <video src={`${article.featuredVideo[0]?.url}`} controls controlsList="nodownload" className=''></video>
              <Link href={`/view/${article?.id}?cat=${article?.catSlug}`}  className='line-clamp-2 text-gray-700 text-xs hover:underline'>{stripHtml(article.content)}</Link>
          
          </div>            
        ))}               
            
      </div>
    </div>
  )
}
