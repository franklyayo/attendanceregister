export default {
    schema: "./utils/schema.js",
    driver: 'mysql2',
    dbCredentials: {
  //host: process.env.NEXT_PUBLIC_HOST,
  host: "109.70.148.55",
  user: "quodeshi_attend",
  database: "quodeshi_attendanceapp",
  password:"Attendance123#",
        port:'3306'
    }
  };