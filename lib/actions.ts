"use server"

import { prisma } from "./connect"

export const fetchCategories = async () => {

    const categories = await prisma.category.findMany()

    if(!categories) throw new Error("no category found")
    
    return categories
}

export const fetchgender = async () => {

    const gender = await prisma.gender.findMany()

    if(!gender) throw new Error("no category found")
    
    return gender
}