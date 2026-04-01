# Attendance Register

A modern web application for managing service unit attendance. Built with Next.js 14, Drizzle ORM, Azure MySQL, and deployed on Vercel.

## ✨ Features

- Secure authentication using **Kinde Auth**
- Add, view, and manage students/members
- Mark daily attendance with inline editing in a powerful data grid
- Filter attendance records by **Month** and **Service Unit (Grade)**
- Dashboard with attendance summaries
- Clean, responsive UI built with Tailwind CSS and shadcn/ui
- Fast and interactive attendance table using **AG Grid**

## 🛠 Tech Stack

| Layer              | Technology                              |
|--------------------|-----------------------------------------|
| Frontend           | Next.js 14 (App Router) + React         |
| Styling            | Tailwind CSS + shadcn/ui                |
| Database           | Azure Database for MySQL (Flexible Server) |
| ORM                | Drizzle ORM                             |
| Authentication     | Kinde Auth                              |
| Data Table         | AG Grid React                           |
| HTTP Client        | Axios (via GlobalApi)                   |
| Deployment         | Vercel                                  |

## 📁 Project Structure

```bash
app/
├── api/                          # API Routes
│   ├── grade/
│   ├── student/
│   ├── attendance/
│   ├── dashboard/
│   └── auth/                     # Kinde authentication routes
├── dashboard/
│   ├── attendance/
│   │   └── _components/AttendanceGrid.jsx
│   ├── students/
│   └── page.js
├── _components/                  # Reusable UI components
│   ├── GradeSelect.jsx
│   └── MonthSelection.jsx
├── _services/
│   └── GlobalApi.js              # Centralized API service
utils/
├── index.js                      # Database connection (Drizzle + mysql2)
└── schema.js                     # Database schema definitions

git clone https://github.com/franklyayo/attendanceregister.git
cd attendanceregister

npm install

# Database Configuration (Azure MySQL)
NEXT_PUBLIC_HOST=attendanceappserver2.mysql.database.azure.com
NEXT_PUBLIC_DATABASE=attendancedb
NEXT_PUBLIC_USER=attendanceuser@attendanceappserver2
NEXT_DB_PASSWORD=YourStrongPasswordHere

# Kinde Authentication
KINDE_CLIENT_ID=your_kinde_client_id
KINDE_CLIENT_SECRET=your_kinde_client_secret
KINDE_ISSUER_URL=https://your-domain.kinde.com
KINDE_SITE_URL=http://localhost:3000
KINDE_POST_LOGOUT_REDIRECT_URL=http://localhost:3000
KINDE_POST_LOGIN_REDIRECT_URL=http://localhost:3000/dashboard

npm run dev

Database

Host: Azure Database for MySQL (Flexible Server)
Tables: grades, students, attendance
ORM: Drizzle ORM
Key indexes are added on date, grade, and studentId for performance.

🔑 Important Notes

The database connection is initialized in utils/index.js
All API calls are centralized in app/_services/GlobalApi.js
Azure MySQL requires SSL configuration (rejectUnauthorized: false)
The attendance grid supports inline cell editing for marking present/absent

🚀 Deployment

Deployed on Vercel with automatic deployments from GitHub
Live URL: https://attendanceregister.vercel.app

📝 For New Developers

API Routes: Located in app/api/[route]/route.js
Main Pages: app/dashboard/*
Database Schema: Check utils/schema.js
Global API Service: app/_services/GlobalApi.js

🤝 Contributing

Fork the project
Create your feature branch (git checkout -b feature/your-feature)
Commit your changes (git commit -m 'Add your feature')
Push to the branch (git push origin feature/your-feature)
Open a Pull Request

📄 License
This project is open source and available under the MIT License.
