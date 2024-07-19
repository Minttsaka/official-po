import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export default function Footer() {
  return (
    <div className='text-xs bg-black text-gray-400 flex flex-col gap-10 py-5 '>
      <div className='flex  justify-center pb-5 border-b'>
        <div>
            <div className='flex justify-center'>
                <Image src={'/logo.png'} alt="logo" width={50} height={50} className="h" />
            </div>
            <p className='text-center'>poly observer media. All right reserved</p>
        </div>
      </div>
      <div className='grid md:flex  grid-cols-3 flex-row ml-10 md:ml-0 justify-center  gap-10'>
        <Link href='/about/'>
           About
        </Link>
        <Link href='/about-us/'>
            About us
        </Link>
        <Link href='/events'>
            events
        </Link>
        <Link href='/gender-worrior/male'>
            Gender
        </Link>
        <Link href='/vacancies'>
           Vacancies
        </Link>
        <Link href='/contact'>
            Contact us
        </Link>
        <Link href='/privacy'>
            Help
        </Link>
        <Link href='/privacy'>
            Market
        </Link>
        <Link href='/privacy'>
            Privacy
        </Link>
      </div>
    </div>
  )
}
