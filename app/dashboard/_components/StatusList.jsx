import { getUniqueRecord } from '@/app/_services/service';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import Card from './Card';
import { GraduationCap, TrendingDown, TrendingUp } from 'lucide-react';

function StatusList({ attendanceList, selectedMonth }) {
    const [totalStudent, setTotalStudent] = useState(0);
    const [presentPerc, setPresentPerc] = useState(0);
    const [maxDay, setMaxDay] = useState(0);

    useEffect(() => {
        if (!attendanceList || attendanceList.length === 0 || !selectedMonth) {
            setTotalStudent(0);
            setPresentPerc(0);
            setMaxDay(0);
            return;
        }

        const uniqueStudents = getUniqueRecord(attendanceList);
        const totalStudents = uniqueStudents.length;

        const daysWithData = [...new Set(attendanceList.map(item => item.day))];
        const latestDay = daysWithData.length > 0 ? Math.max(...daysWithData) : 0;
        setMaxDay(latestDay);

        const totalPossible = totalStudents * daysWithData.length;
        const totalPresent = attendanceList.length;

        const presentPercentage = totalPossible > 0
            ? Math.round((totalPresent / totalPossible) * 100 * 10) / 10
            : 0;

        setTotalStudent(totalStudents);
        setPresentPerc(presentPercentage);
    }, [attendanceList, selectedMonth]);

    const absentPerc = 100 - presentPerc;

    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 my-6'>
            <Card 
                icon={<GraduationCap />} 
                title='Total Members' 
                value={totalStudent} 
            />
            <Card 
                icon={<TrendingUp />} 
                title='Total Present' 
                value={presentPerc.toFixed(1) + '%'} 
                subtitle={maxDay > 0 ? `(as of day ${maxDay})` : ''}
            />
            <Card 
                icon={<TrendingDown />} 
                title='Total Absent' 
                value={absentPerc.toFixed(1) + '%'} 
                subtitle={maxDay > 0 ? `(as of day ${maxDay})` : ''}
            />
        </div>
    );
}

export default StatusList;
