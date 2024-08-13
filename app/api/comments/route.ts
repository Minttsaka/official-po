import { prisma } from "@/lib/connect";
import { NextRequest, NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";


const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

export async function POST(req: NextRequest) {
    try {
     

      const data = await req.json()

      const {desc, id}= data

      const existPost = await prisma.article.findUnique({
          where:{
            id
          }
      })


      const response = await openai.createModeration({
        input: desc,
      });

      console.log(response.data)
    
      const isFlagged = response.data.results.some(result => result.flagged);
  
      const updateforms = await prisma.comment.create({
       data:{
        desc,
        userEmail:"minttsaka@gmail.com",
        flagged:isFlagged,
        article:{
          connect:{
            id:existPost?.id
          }
        }


       }
      });
  
      console.log("created comment", updateforms)
  
      if (!updateforms) {
        throw new Error("Form not found");
      }
  
      return NextResponse.json(updateforms)
    } catch (error: any) {
      console.error("Error creating form:", error);
      console.log(error)
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
  