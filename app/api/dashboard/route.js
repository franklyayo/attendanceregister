import { db } from "@/utils";
import { ATTENDANCE, STUDENTS } from "@/utils/schema";
import { and, desc, eq, sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export const dynamic = 'force-dynamic';   // ← Add this

export async function GET(req) {
  const searchParams = req.nextUrl.searchParams;
  const date = searchParams.get('date');
  const grade = searchParams.get('grade');

  if (!date || !grade) {
    return NextResponse.json({ error: "Missing date or grade" }, { status: 400 });
  }

  const result = await db
    .select({
      day: ATTENDANCE.day,
      presentCount: sql`COUNT(${ATTENDANCE.day})`,
    })
    .from(ATTENDANCE)
    .leftJoin(STUDENTS, eq(ATTENDANCE.studentId, STUDENTS.id))
    .where(
      and(
        eq(ATTENDANCE.date, date),      // ← moved here (much faster)
        eq(STUDENTS.grade, grade)
      )
    )
    .groupBy(ATTENDANCE.day)
    .orderBy(desc(ATTENDANCE.day))
    .limit(7);

  return NextResponse.json(result);
}
