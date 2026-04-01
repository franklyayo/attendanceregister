"use client"
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import MonthSelection from '../_components/MonthSelection'
import GradeSelect from '../_components/GradeSelect'
import GlobalApi from '../_services/GlobalApi'
import StatusList from './_components/StatusList'
import BarChartComponent from './_components/BarChartComponent'
import PieChartComponent from './_components/PieChartComponent'

function Dashboard() {
    const [selectedMonth, setSelectedMonth] = useState(moment());           // Default = current month
    const [selectedGrade, setSelectedGrade] = useState('Technical');
    const [attendanceList, setAttendanceList] = useState([]);
    const [totalPresentData, setTotalPresentData] = useState([]);

    // Fetch data whenever month or grade changes
    useEffect(() => {
        if (!selectedMonth) return;

        const monthStr = moment(selectedMonth).format('MM/YYYY');

        // Get attendance list for the selected month + grade
        GlobalApi.GetAttendanceList(selectedGrade, monthStr)
            .then(resp => setAttendanceList(resp.data || []))
            .catch(err => console.error(err));

        // Get daily present count for bar chart
        GlobalApi.TotalPresentCountByDay(monthStr, selectedGrade)
            .then(resp => setTotalPresentData(resp.data || []))
            .catch(err => console.error(err));

    }, [selectedMonth, selectedGrade]);

    return (
        <div className='p-10'>
            <div className='flex items-center justify-between mb-6'>
                <h2 className='font-bold text-2xl'>Dashboard</h2>
                <div className='flex items-center gap-4'>
                    <MonthSelection selectedMonth={setSelectedMonth} />
                    <GradeSelect selectedGrade={setSelectedGrade} />
                </div>
            </div>

            {/* Cards (Total Present / Absent / etc.) */}
          <StatusList 
            attendanceList={attendanceList} 
            selectedMonth={selectedMonth} 
          />

            <div className='grid grid-cols-1 md:grid-cols-3 gap-5 mt-8'>
                {/* Bar Chart */}
                <div className='md:col-span-2'>
                    <BarChartComponent 
                        attendanceList={attendanceList} 
                        totalPresentData={totalPresentData} 
                    />
                </div>

                {/* Pie Chart - NOW receives selectedMonth */}
                <div>
                    <PieChartComponent 
                        attendanceList={attendanceList} 
                        selectedMonth={selectedMonth} 
                    />
                </div>
            </div>
        </div>
    )
}

export default Dashboard
