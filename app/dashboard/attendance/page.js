"use client"
import GradeSelect from '@/app/_components/GradeSelect'
import MonthSelection from '@/app/_components/MonthSelection'
import GlobalApi from '@/app/_services/GlobalApi'
import { Button } from '@/components/ui/button'
import moment from 'moment'
import React, { useState, useEffect } from 'react'
import AttendanceGrid from './_components/AttendanceGrid'

function Attendance() {
    const [selectedMonth, setSelectedMonth] = useState(moment()); // default = current month
    const [selectedGrade, setSelectedGrade] = useState('Technical');
    const [attendanceList, setAttendanceList] = useState([]);
    const [loading, setLoading] = useState(true);

    // Auto-load on page open
    useEffect(() => {
        const month = moment(selectedMonth).format('MM/YYYY');
        setLoading(true);

        GlobalApi.GetAttendanceList(selectedGrade, month)
            .then(resp => {
                console.log("Attendance loaded:", resp.data);
                setAttendanceList(resp.data || []);
            })
            .catch(err => {
                console.error("Attendance fetch error:", err);
                setAttendanceList([]);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [selectedGrade, selectedMonth]);

    const onSearchHandler = () => {
        const month = moment(selectedMonth).format('MM/YYYY');
        setLoading(true);

        GlobalApi.GetAttendanceList(selectedGrade, month)
            .then(resp => {
                console.log("Search result:", resp.data);
                setAttendanceList(resp.data || []);
            })
            .catch(err => {
                console.error(err);
                setAttendanceList([]);
            })
            .finally(() => setLoading(false));
    };

    return (
        <div className='p-10'>
            <h2 className='text-2xl font-bold'>Service Unit Attendance</h2>

            {/* Search option */}
            <div className='flex gap-5 my-5 p-5 border rounded-lg shadow-sm'>
                <div className='flex gap-2 items-center'>
                    <label>Select Month:</label>
                    <MonthSelection selectedMonth={(value) => setSelectedMonth(value)} />
                </div>
                <div className='flex gap-2 items-center'>
                    <label>Select Unit:</label>
                    <GradeSelect selectedGrade={(v) => setSelectedGrade(v)} />
                </div>
                <Button onClick={onSearchHandler}>Search</Button>
            </div>

            {/* Student Attendance Grid */}
            <AttendanceGrid 
                attendanceList={attendanceList} 
                selectedMonth={selectedMonth}
                loading={loading}          // ← pass loading state
            />
        </div>
    )
}

export default Attendance
