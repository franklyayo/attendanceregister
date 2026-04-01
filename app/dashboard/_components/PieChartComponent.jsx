import { getUniqueRecord } from '@/app/_services/service'
import moment from 'moment'
import React, { useEffect, useState } from 'react'
import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip, Legend } from 'recharts'

function PieChartComponent({ attendanceList, selectedMonth }) {
    const [data, setData] = useState([])
    const [maxDay, setMaxDay] = useState(0)

    useEffect(() => {
        if (!attendanceList || attendanceList.length === 0 || !selectedMonth) {
            setData([])
            setMaxDay(0)
            return
        }

        const uniqueStudents = getUniqueRecord(attendanceList)
        const totalStudents = uniqueStudents.length

        // Get the highest day that has attendance records
        const daysWithData = [...new Set(attendanceList.map(item => item.day))]
        const latestDay = daysWithData.length > 0 ? Math.max(...daysWithData) : 0
        setMaxDay(latestDay)

        const totalPossible = totalStudents * daysWithData.length
        const totalPresent = attendanceList.length

        const presentPercentage = totalPossible > 0
            ? Math.round((totalPresent / totalPossible) * 100 * 10) / 10
            : 0

        const absentPercentage = 100 - presentPercentage

        setData([
            { name: 'Total Present', value: presentPercentage, fill: '#4c8cf8' },
            { name: 'Total Absent',  value: absentPercentage,  fill: '#1fe6d1' }
        ])
    }, [attendanceList, selectedMonth])

    return (
        <div className='border p-5 rounded-lg'>
            <div className='flex justify-between items-baseline'>
                <h2 className='font-bold text-lg'>Monthly Attendance</h2>
                {maxDay > 0 && (
                    <p className='text-sm text-gray-500'>as of day {maxDay}</p>
                )}
            </div>
            
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
