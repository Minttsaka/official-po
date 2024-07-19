import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React from 'react'

export default function page() {
  return (
    <div>
      <div className="relative h-80 md:h-screen w-full shadow-2xl mb-1 md:mb-0">
    <img
        src="/po.png"
        alt="Featured Article"
        width={800}
        height={600}
        className="w-full h-full object-cover object-top transition-transform duration-500 ease-in-out hover:scale-105"
    />
    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-90" />
        <div className="absolute  max-w-lg  bottom-0 left-0 right-0 p-6 text-white">
        <h2 className="text-2xl md:text-5xl font-bold my-2">Driving systemic change in business, culture and society.</h2>
        <p className="text-gray-300 mb-2 line-clamp-2">
            Poly observer brings this mindset to everything we do, the coverage we deliver and the communities we connect.
        </p>
        
        </div>
    </div>
    <div className='container mx-auto px-5 md:px-0'>
        <div className='grid grid-cols-1 md:grid-cols-2 py-20'>
          <h2 className='text-2xl'>PO Mission</h2>
          <p>Poly observer gives people the knowledge, resources, inspiration, and connections they need to achieve success. </p>  
        </div>
        <h2 className='text-3xl border-y p-10 mb'>TEAM OF WARDIA</h2>
        <div className='grid grid-cols-2 md:grid-cols-5 gap-3 mt-10'>
            <div>
                <div className="">
                <Image
                    src="/po.png"
                    alt="Featured Article"
                    width={200}
                    height={100}
                    className='rounded-lg'
                />
                <p className=" text-xs my-2 border-b">LOKA ROBERT/ CEO</p>
                </div>
            </div>
            <div>
                <div className="">
                <Image
                    src="/po.png"
                    alt="Featured Article"
                    width={200}
                    height={100}
                    className='rounded-lg'
                />
                <p className=" text-xs my-2 border-b">LOKA ROBERT/ CEO</p>
                </div>
            </div>
            <div>
                <div className="">
                <Image
                    src="/po.png"
                    alt="Featured Article"
                    width={200}
                    height={100}
                    className='rounded-lg'
                />
                <p className=" text-xs my-2 border-b">LOKA ROBERT/ CEO</p>
                </div>
            </div>
            <div>
                <div className="">
                <Image
                    src="/po.png"
                    alt="Featured Article"
                    width={200}
                    height={100}
                    className='rounded-lg'
                />
                <p className=" text-xs my-2 border-b">LOKA ROBERT/ CEO</p>
                </div>
            </div>
            <div>
                <div className="">
                <Image
                    src="/po.png"
                    alt="Featured Article"
                    width={200}
                    height={100}
                    className='rounded-lg'
                />
                <p className=" text-xs my-2 border-b">LOKA ROBERT/ CEO</p>
                </div>
            </div>
       
        </div>
    </div>
    <div className='bg-gray-100 px-5'>
        <div className='container mx-auto py-10 grid grid-cols-1 md:grid-cols-2 gap-3 items-center'>
            <div className=' '>
                <h2 className='text-2xl'>JOIN TEAM PO</h2>
                <p className='my-5 max-w-md'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi repellendus aliquid, quaerat, eum magnam qui iste similique provident enim ad ex ducimus,
                        eaque temporibus libero aut cum. Facilis voluptatum laborum autem eaque quae. Consequuntur ducimus aspernatur hic, in sint a?
                </p>
                <Button>
                    Contact us
                </Button>
            </div>
            <Image
            src="/po.png"
            alt="Featured Article"
            width={500}
            height={500}
        />
        </div>
    </div>
    
</div>
  )
}
