import { NextResponse } from "next/server";
import prisma from "@/lib/prismadb"; 

export async function GET() {
  try {
       const categories = await prisma.category.findMany();
    return NextResponse.json(categories);
  } catch (error) {
   
    console.error("Error fetching categories:", error);
    
    return NextResponse.json({ message: "Something went wrong" });
  }
}