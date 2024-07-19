/**
* This code was generated by v0 by Vercel.
* @see https://v0.dev/t/wcLWWbKg7Ks
* Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
*/

/** Add fonts into your Next.js project:

import { Inter } from 'next/font/google'

inter({
  subsets: ['latin'],
  display: 'swap',
})

To read more about using these font, please visit the Next.js documentation:
- App Directory: https://nextjs.org/docs/app/building-your-application/optimizing/fonts
- Pages Directory: https://nextjs.org/docs/pages/building-your-application/optimizing/fonts
**/

"use client"
import Link from "next/link"
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet"
import { Button } from "@/components/ui/button"
import { NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuItem, NavigationMenuTrigger, NavigationMenuContent } from "@/components/ui/navigation-menu"
import Image from "next/image"
import { Search } from "lucide-react"
import { SignInModal } from "./SigninModal"
import { Category, Gender } from '@prisma/client'
import axios from 'axios'
import { Loader2 } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function Navbar() {

  const [categories,setCategories] = useState<Category[]>()
  const [genders,setGender] = useState<Gender[]>()
  const [isLoading,setIsLoading] = useState<boolean>(false)


  useEffect(()=>{
      setIsLoading(true)
      const fetchCat = async () => {
          const res = await axios.get('/api/categories')
          const {categoryList, gender}= res.data
          setCategories(categoryList)
          setGender(gender)
      }
      fetchCat()
      setIsLoading(false)
  },[])
  return (
    <header className="fixed top-0 z-50 w-screen flex items-center bg-black text-white shadow-sm dark:bg-gray-950">
      <div className="container flex justify-between md:justify-start h-16 items-center gap-2 px-4 md:px-6">
        <Image src={'/logo.png'} alt="logo" width={50} height={50} className="hidden md:block" />
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className=" bg-black bg-opacity-60">
            <div className="grid gap-4 p-4">
              <Link
                href="/"
                className="flex items-center gap-2 bg-gray-100 p-2 cursor-pointer rounded-md px-3 py-2 text-sm font-medium d"
                prefetch={false}
              >
                <HomeIcon className="h-5 w-5" />
                Home
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 bg-gray-100 p-2 cursor-pointer rounded-md px-3 py-2 text-sm font-medium d"
                prefetch={false}
              >
                <FileTextIcon className="h-5 w-5" />
                Blog
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 bg-gray-100 p-2 cursor-pointer rounded-md px-3 py-2 text-sm font-medium d"
                prefetch={false}
              >
                <UserIcon className="h-5 w-5" />
                About
              </Link>
              <Link
                href="#"
                className="flex items-center gap-2 bg-gray-100 p-2 cursor-pointer rounded-md px-3 py-2 text-sm font-medium d"
                prefetch={false}
              >
                <MailIcon className="h-5 w-5" />
                Contact
              </Link>
            </div>
          </SheetContent>
        </Sheet>
        <Image src={'/logo.png'} alt="logo" width={50} height={50} className="md:hidden" />
        <div className="md:hidden">
        <SignInModal />
        </div>
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList>
            <NavigationMenuLink asChild>
              <Link
                href="/"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:underline focus:underline focus:outline-none disabled:pointer-events-none disabled:opacity-50 "
                prefetch={false}
              >
                Home
              </Link>
            </NavigationMenuLink>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
              <NavigationMenuContent>
              <div className="w-[90vw] h-[50vh] p-2 flex text-xs gap-2">
                  <Image
                  width={500}
                  height={500}
                        src="https:/dct4life-files.s3.af-south-1.amazonaws.com/uploads/mens.png"
                        alt="Article Thumbnail"
                    />
                    <div>
                    <p className='text-xs text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat, explicabo!</p>
                        <div className="grid grid-cols-4 h-[50vh] w-full  overflow-y-auto gap-2">
                        {isLoading && <Loader2 className='h-4 w-4 animate-spin text-black' />}
                            {categories?.map(category=>(
                                
                            <Link href={`/categories/${category.title}`} key={category.id} className="flex items-center gap-2 border-b  p-2 cursor-pointer hover:underline">
                                <Image
                                    src={`${category.img}`}
                                    alt="Article Thumbnail"
                                    width={500}
                                    height={500}
                                    className="aspect-[4/4] shrink-0 w-20 h-20 overflow-hidden rounded-xl object-cover"
                                />
                                <div className="">
                                    <h3 className="text-xl font-bold text-black">{category.title}</h3>
                                    <p className='text-xs text-gray-600'>{category.description}</p>
                                </div>
                            </Link>
                            ))}
                        </div>
                    </div>
                    
                
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Gender</NavigationMenuTrigger>
              <NavigationMenuContent>
              <div className="w-[50vw] h-[50vh] p-2 flex text-xs gap-2">
                  <Image
                  width={500}
                  height={500}
                        src="https:/dct4life-files.s3.af-south-1.amazonaws.com/uploads/mens.png"
                        alt="Article Thumbnail"
                        className='rounded shadow-2xl'
                    />
                  <div className="flex flex-col w-full gap-2">
                  {genders?.map(gender=>(
                      <Link href={`/gender-worrior/${gender.type}`} key={gender.id} className="flex items-center gap-2 border-b  p-2 cursor-pointer hover:underline">
                          <Image
                              src={`${gender.img}`}
                              alt="Article Thumbnail"
                              width={500}
                              height={500}
                              className="aspect-[4/4] shrink-0 w-20 h-20 overflow-hidden rounded-xl object-cover"
                          />
                          <div className="">
                              <h3 className="text-xl font-bold text-black">{gender.type}</h3>
                              <p className='text-xs text-gray-600'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Placeat, explicabo!</p>
                          </div>
                      </Link>
                      ))}
                      <div className="relative w-full h-60 rounded-md shadow-2xl">
                      <Image
                        src="/soccer.jpeg"
                        alt="Featured Article"
                        width={100}
                        height={100}
                        className="w-full h-full object-cover rounded-md object-top transition-transform duration-500 ease-in-out hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-70" />
                        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                          <p className="text-gray-300 mb-2 line-clamp-2">
                            Explore the latest trends and technologies shaping the future of web development.
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repellat quod ea officia deserunt aliquam veritatis ducimus adipisci et iste nisi.
                          </p>
                        </div>
                      </div>
                  </div>
                
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuLink asChild>
              <Link
                href="/about/"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:underline focus:underline focus:outline-none disabled:pointer-events-none disabled:opacity-50 "
                prefetch={false}
              >
                About
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="/events"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:underline focus:underline focus:outline-none disabled:pointer-events-none disabled:opacity-50 "
                prefetch={false}
              >
                Events
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="/vacancies"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:underline focus:underline focus:outline-none disabled:pointer-events-none disabled:opacity-50 "
                prefetch={false}
              >
                Vacancies
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="#"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:underline focus:underline focus:outline-none disabled:pointer-events-none disabled:opacity-50 "
                prefetch={false}
              >
                Market
              </Link>
            </NavigationMenuLink>
            <NavigationMenuLink asChild>
              <Link
                href="/contact"
                className="inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium transition-colors hover:underline focus:underline focus:outline-none disabled:pointer-events-none disabled:opacity-50 "
                prefetch={false}
              >
                Contact
              </Link>
            </NavigationMenuLink>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="hidden md:flex items-center gap-20">
        <Search className="h-6 w-6 text-white" />
        <div className="md:flex items-center gap-2">
          <Button className="bg-[red]">Subscribe</Button>
          <SignInModal />
        </div>
          
        <nav className="mr-20 flex items-center gap-4">
          <Avatar className="w-5 h-5">
            <AvatarImage src="/facebook.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>

          <Avatar className="w-5 h-5">
            <AvatarImage src="/youtube.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
      </nav>
        </div>
    </header>
  )
}

function XIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}

function FacebookIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  )
}


function InstagramIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  )
}


function LinkedinIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}


function MountainIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  )
}


function TwitterIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
    </svg>
  )
}

function FileTextIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  )
}


function HomeIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  )
}


function MailIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  )
}


function MenuIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <line x1="4" x2="20" y1="6" y2="6" />
      <line x1="4" x2="20" y1="18" y2="18" />
    </svg>
  )
}


function NewspaperIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-2 2Zm0 0a2 2 0 0 1-2-2v-9c0-1.1.9-2 2-2h2" />
      <path d="M18 14h-8" />
      <path d="M15 18h-5" />
      <path d="M10 6h8v4h-8V6Z" />
    </svg>
  )
}


function UserIcon(props: React.JSX.IntrinsicAttributes & React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  )
}
