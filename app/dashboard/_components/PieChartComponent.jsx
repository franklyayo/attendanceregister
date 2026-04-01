import { getUniqueRecord } from '@/app/_services/service'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts'

function PieChartComponent({ attendanceList, selectedMonth }) {
    const [data, setData] = useState([])

    useEffect(() => {
        if (!attendanceList || !selectedMonth) return

        const uniqueStudents = getUniqueRecord(attendanceList)
        const totalStudents = uniqueStudents.length

        // Number of days in the selected month
        const daysInMonth = moment(selectedMonth).daysInMonth()

        // Total possible attendance records
        const totalPossible = totalStudents * daysInMonth

        // Total present records (attendanceList only contains presents)
        const totalPresent = attendanceList.length

        const presentPercentage = totalPossible > 0 
            ? Math.round((totalPresent / totalPossible) * 100 * 10) / 10 
            : 0

        const absentPercentage = 100 - presentPercentage

        setData([
            {
                name: 'Total Present',
                value: presentPercentage,
                fill: '#4c8cf8',
            },
            {
                name: 'Total Absent',
                value: absentPercentage,
                fill: '#1fe6d1',
            }
        ])
    }, [attendanceList, selectedMonth])

    return (
        <div className='border p-5 rounded-lg'>
            <h2 className='font-bold text-lg'>Monthly Attendance</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={data}
                        dataKey="value"
                        nameKey="name"
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        label={({ value }) => `${value}%`}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    )
}

export default PieChartComponent
