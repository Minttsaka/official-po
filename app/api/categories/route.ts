import { prisma } from "@/lib/connect";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {

    const [gender, categoryList] = await prisma.$transaction([

      prisma.gender.findMany(),
      prisma.category.findMany()

    ])

    return new NextResponse(JSON.stringify({categoryList, gender}));
  } catch (err) {
    console.log(err);
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" })
    );
  }
};
