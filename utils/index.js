import { drizzle } from "drizzle-orm/mysql2";
import mysql from "mysql2/promise";

const connection = await mysql.createPool({
//  host: process.env.NEXT_PUBLIC_HOST,
host: '109.70.148.55',
  user: "quodeshi_attend",
  database: 'quodeshi_attendanceapp',
  password: 'Attendance123#',
  port: '3306'
});

export const db = drizzle(connection);