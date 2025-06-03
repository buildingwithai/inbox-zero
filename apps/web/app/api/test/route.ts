import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

interface QueryResult {
  currentTime: Date;
}

export async function GET() {
  try {
    // Test the database connection by getting the current time
    const result = await prisma.$queryRaw<
      QueryResult[]
    >`SELECT NOW() as "currentTime"`;

    // Log the result for debugging
    console.log("Database test result:", result);

    // Return a success response with the current time
    return NextResponse.json({
      success: true,
      message: "Successfully connected to the database!",
      currentTime: result[0]?.currentTime,
      database: "Vercel Postgres (Neon)",
    });
  } catch (error: any) {
    console.error("Database connection error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to connect to the database",
        details: error.message,
      },
      { status: 500 },
    );
  }
}
