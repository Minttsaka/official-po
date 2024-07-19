import { SingleCategory } from '@/components/SingleCategory'
import SingleCategoryMore from '@/components/SingleCategoryMore'
import SingleCategoryMostRead from '@/components/SingleCategoryMostRead'
import SingleCategoryTrending from '@/components/SingleCategoryTrending'
import React from 'react'

export default function page({params}:{params:{category:string}}) {

  const requiredCategory = params.category
  
  return (
    <div>
      <SingleCategory category={requiredCategory} />
      <SingleCategoryTrending category={requiredCategory} />
      <SingleCategoryMostRead category={requiredCategory} />
      <SingleCategoryMore category={requiredCategory} />
    </div>
  )
}
