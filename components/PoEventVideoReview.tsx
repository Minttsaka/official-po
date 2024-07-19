
"use client"
import React, { useEffect, useState } from 'react'
import { stripHtml } from '@/lib/stripHtml';
import { prisma } from '@/lib/connect';

export default async function PoEventVideoReview() {

  const video = await prisma.video.findFirst({

    orderBy:{
      articleId:"desc"
    }
  });

  return (
    <div className=" w-full h-fit mt-10 ">
        <video src={`${video?.url}`} > </video>    
    </div>
  )
}
