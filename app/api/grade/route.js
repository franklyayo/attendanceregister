import { db } from "@/utils";
import { GRADES } from "@/utils/schema";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const result = await db.select().from(GRADES).limit(50);  // add limit as safety
    return NextResponse.json(result);
  } catch (error) {
    console.error("Grade API error:", error);
    return NextResponse.json({ error: "Database error" }, { status: 500 });
  }
}
