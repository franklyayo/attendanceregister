"use client"
import { useTheme } from 'next-themes'
import React, { useEffect, useState } from 'react'
import MonthSelection from '../_components/MonthSelection'
import GradeSelect from '../_components/GradeSelect'
import GlobalApi from '../_services/GlobalApi'
import moment from 'moment'
import StatusList from './_components/StatusList'
import BarChartComponent from './_components/BarChartComponent'
import { Pie, PieChart } from 'recharts'
import PieChartComponent from './_components/PieChartComponent'
const data01 = [
  {
    "name": "Group A",
    "value": 400
  },
  {
    "name": "Group B",
    "value": 300
  },
  {
    "name": "Group C",
    "value": 300
  },
  {
    "name": "Group D",
    "value": 200
  },
  {
    "name": "Group E",
    "value": 278
  },
  {
    "name": "Group F",
    "value": 189
  }
];

function Dashboard() {
    const { setTheme } = useTheme()
    const [selectedMonth,setSelectedMonth]=useState();
    const [selectedGrade,setSelectedGrade]=useState('Technical');
    const [attendanceList,setAttendanceList]=useState();
    const [totalPresentData,setTotalPresentData]=useState([]);
    useEffect(()=>{

        GetTotalPresentCountByDay();
        getStudentAttendance();
       
    },[selectedMonth||selectedGrade])

    useEffect(()=>{

      GetTotalPresentCountByDay();
      getStudentAttendance();
     
  },[selectedGrade])


  /**
   * Used to get Student Attendace for Give Month and Date
   */
    const getStudentAttendance=()=>{
      
      GlobalApi.GetAttendanceList(selectedGrade,moment(selectedMonth).format('MM/yyyy'))
      .then(resp=>{
        setAttendanceList(resp.data)
      })
    }

    const GetTotalPresentCountByDay=()=>{
      
      GlobalApi.TotalPresentCountByDay(moment(selectedMonth).format('MM/yyyy'),selectedGrade)
      .then(resp=>{
        setTotalPresentData(resp.data);
      })
    }

  return (
    <div className='p-10'>
      <div className='flex items-center justify-between'>
          <h2 className='font-bold text-2xl'>Dashboard</h2>

          <div className='flex items-center gap-4'>
            <MonthSelection selectedMonth={setSelectedMonth} />
            <GradeSelect selectedGrade={(v)=>{setSelectedGrade(v);console.log(v)}}/>
          </div>
        </div>

        <StatusList attendanceList={attendanceList} />

        <div className='grid grid-cols-1 md:grid-cols-3 gap-5'>
          <div className='md:col-span-2'>
            <BarChartComponent attendanceList={attendanceList}
            totalPresentData={totalPresentData}/>
          </div>
          <div>
            <PieChartComponent  attendanceList={attendanceList} />
          </div>
        </div>
    </div>
  )
}

export default Dashboard