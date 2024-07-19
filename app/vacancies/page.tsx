import { EventsSignin } from '@/components/events-signin'
import Link from 'next/link'
import React from 'react'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { prisma } from '@/lib/connect'
import { stripHtml } from '@/lib/stripHtml'
import { VacancyForm } from '@/components/vacancyForm'

export default async function page() {

    const vacancies = await prisma.vacancy.findMany({
        orderBy:{
            createdAt:"desc"
        }
    })

    const currentDate = new Date();

    const activeVacancies = vacancies.filter(vacancy => {
        const closingDate = new Date(vacancy.endDate);
        return closingDate >= currentDate;
      });

  return (
    <div>
      <div className="relative  w-full shadow-2xl mb-1 md:mb-0">
         <video 
            autoPlay 
            muted 
            loop 
            className='w-full'>
            <source src="https://videos.pexels.com/video-files/3209176/3209176-uhd_2560_1440_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
            </video>
        <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
            <div className="absolute top-20 left-0 right-0 max-w-4xl p-6 text-white">
            <h3 className="bg-[purple] text-white  py-1 px-4 w-fit">Vacancies</h3>
            <h2 className="text-xl md:text-3xl font-bold my-2">Find vacancies from us</h2>
            <p className="hidden md:block text-white mb-2 max-w-xl ">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste aperiam commodi dicta. Ex et ut laudantium, labore consectetur accusantium repellat?
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat quod ea officia deserunt aliquam veritatis ducimus adipisci et iste nisi.
            </p>
            </div>
        </div>
        <div className='container mx-auto my-20 px-5 md:px-0'>
            <h2 className='my-20 border-b'>Vancancies</h2>
            <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                <div className="bg-gray-100 h-fit p-6 dark:bg-gray-800">
                    <h2 className="font-bold mb-4">Filters</h2>
                    <Accordion type="single" collapsible>
                        <AccordionItem value="category">
                        <AccordionTrigger className="text-lg font-medium">Category</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid gap-2 ">
                            <Label className="flex items-center gap-2 font-normal">
                                <Checkbox id="category-marketing" /> Marketing
                            </Label>
                            <Label className="flex items-center gap-2 font-normal">
                                <Checkbox id="category-engineering" /> Engineering
                            </Label>
                            <Label className="flex items-center gap-2 font-normal">
                                <Checkbox id="category-design" /> Design
                            </Label>
                            <Label className="flex items-center gap-2 font-normal">
                                <Checkbox id="category-sales" /> Sales
                            </Label>
                            <Label className="flex items-center gap-2 font-normal">
                                <Checkbox id="category-finance" /> Finance
                            </Label>
                            </div>
                        </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="job-type">
                        <AccordionTrigger className="text-lg font-medium">Job Type</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid gap-2">
                            <Label className="flex items-center gap-2 font-normal">
                                <Checkbox id="job-type-full-time" /> Full-Time
                            </Label>
                            <Label className="flex items-center gap-2 font-normal">
                                <Checkbox id="job-type-part-time" /> Part-Time
                            </Label>
                            <Label className="flex items-center gap-2 font-normal">
                                <Checkbox id="job-type-contract" /> Contract
                            </Label>
                            <Label className="flex items-center gap-2 font-normal">
                                <Checkbox id="job-type-internship" /> Internship
                            </Label>
                            </div>
                        </AccordionContent>
                        </AccordionItem>
                        <AccordionItem value="location">
                        <AccordionTrigger className="text-lg font-medium">Location</AccordionTrigger>
                        <AccordionContent>
                            <div className="grid gap-2">
                            <Label className="flex items-center gap-2 font-normal">
                                <Checkbox id="location-new-york" /> New York
                            </Label>
                            <Label className="flex items-center gap-2 font-normal">
                                <Checkbox id="location-san-francisco" /> San Francisco
                            </Label>
                            <Label className="flex items-center gap-2 font-normal">
                                <Checkbox id="location-london" /> London
                            </Label>
                            <Label className="flex items-center gap-2 font-normal">
                                <Checkbox id="location-remote" /> Remote
                            </Label>
                            </div>
                        </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                </div>
                <div className='grid grid-cols-1  gap-10'>
                {
                activeVacancies.map(vacancy=>(
                    <div key={vacancy.id}>
                        <div className='text-white bg-blue-500 w-fit  py-1 px-5'>{vacancy.company}</div>
                        <h2 className='text-2xl text-[red] mt-5'>{vacancy.title}</h2>
                        <p className='text-xs text-gray-500'>{vacancy.startDate.toDateString()}-{vacancy.endDate.toDateString()}, / {vacancy.location}</p>
                        <p className=' line-clamp-3'>
                            {stripHtml(vacancy.content)}
                        </p>
                        <Link href={`/vacancies/${vacancy.id}`} className='text-xs hover:underline text-blue-500'>
                            View this vacancy
                        </Link>
                </div>
                ))
                }
              
                </div>
                </div>
            </div>
            <div>
        </div>
        <div className='bg-black bg-opacity-90 text-white  px-5 md:px-0'>
        <div className='max-w-6xl mx-auto grid items-center md:grid-cols-2'>
            <h1 className="text-3xl font-bold mt-20 md:mt-0">Stay Informed About PO Vacancies</h1>
            <VacancyForm />
        
        </div>
        </div>
    </div>
  )
}
