import PoEventVideoReview from '@/components/PoEventVideoReview'
import { EventsSignin } from '@/components/events-signin'
import { prisma } from '@/lib/connect'
import { PlayCircle,} from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export default async function page() {

  const vacancies = await prisma.event.findMany({
    orderBy:{
        createdAt:"desc"
    }
})

  const currentDate = new Date();

  const activeEvents = vacancies.filter(event => {
      const closingDate = new Date(event.endDate);
      return closingDate >= currentDate;
    });

  const pastEvents = vacancies.filter(event => {
    const closingDate = new Date(event.endDate);
    return closingDate < currentDate;
  });

  return (
    <div>
      <div className="relative  w-full bg-black shadow-2xl mb-1 md:mb-0">
            <video 
              autoPlay 
              muted 
              loop 
              className='w-full h-[80vh] md:h-full'>
              <source src="https://videos.pexels.com/video-files/7647790/7647790-hd_1920_1080_30fps--.mp4" type="video/mp4" />
              Your browser does not support the video tag.
          </video>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
                  <div className="absolute top-20 left-0 right-0 max-w-4xl p-6 text-white">
                    <h3 className="bg-[green] text-white text-xs py-1 px-4 w-fit">Events</h3>
                    <h2 className="text-xl md:text-3xl font-bold my-2">Stay informed with the latest events outside there</h2>
                    <p className=" text-gray-300 mb-2 max-w-xl ">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Animi, quasi.
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat quod ea officia deserunt aliquam veritatis ducimus adipisci et iste nisi.
                    </p>
                  </div>
                </div>
                <div className='max-w-6xl mx-auto mt-20 px-5 md:px-0'>
                    <h2 className='my-20 border-b'>Upcoming Events</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                      {activeEvents.map(events=>(
                          <div key={events.id}>
                            <div className='text-white bg-blue-500 w-fit text-xs py-1 px-5'>public</div>
                            <h2 className='text-2xl text-[red] mt-5'>{events.title}</h2>
                            <p className='text-xs text-gray-500'>{events.startDate.toDateString()} - {events.endDate.toDateString()}, {events.startTime} - {events.location}</p>
                            <p className='my-5 line-clamp-3'>
                                {events.description}
                            </p>
                            <Link href={'#'}>
                                View Event
                            </Link>
                        </div>
                      ))} 
                    </div>
                </div>
                  <PoEventVideoReview />
              <div className='bg-black bg-opacity-90 text-white  px-5 md:px-0'>
                <div className='max-w-6xl mx-auto grid items-center md:grid-cols-2'>
                  <p className="text-3xl  mt-20 md:mt-0">Stay Informed About PO Events</p>
                  <EventsSignin />
                </div>
              </div>
              <div className='max-w-6xl mx-auto mt-20 px-5 md:px-0'>
                    <h2 className='my-20 border-b'>Past Events</h2>
                    <div className='grid grid-cols-1 md:grid-cols-3 gap-10'>
                    {pastEvents.map(events=>(
                          <div key={events.id}>
                            <div className='text-white bg-blue-500 w-fit  py-1 px-5'>public</div>
                            <h2 className='text-2xl text-[red] mt-5'>{events.title}</h2>
                            <p className=' text-gray-500'>{events.startDate.toDateString()} - {events.endDate.toDateString()}, {events.startTime} - {events.location}</p>
                            <p className='my-5 line-clamp-3'>
                                {events.description}
                            </p>
                            <Link className='text-xs hover:underline' href={'#'}>
                                View Event
                            </Link>
                        </div>
                      ))} 
                    </div>
                </div>
    </div>
  )
}
