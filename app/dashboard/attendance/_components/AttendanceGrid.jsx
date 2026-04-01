import React, { useEffect, useState } from 'react'
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import moment from 'moment';
import GlobalApi from '@/app/_services/GlobalApi';
import { toast } from 'sonner';

const pagination = true;
const paginationPageSize = 10;
const paginationPageSizeSelector = [25, 50, 100];

function AttendanceGrid({ attendanceList, selectedMonth, loading }) {
    const [rowData, setRowData] = useState([]);
    const [colDefs, setColDefs] = useState([]);

    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    useEffect(() => {
        if (!selectedMonth || !attendanceList) return;

        const year = moment(selectedMonth).format('YYYY');
        const month = moment(selectedMonth).format('MM');
        const numberOfDays = daysInMonth(year, month);
        const daysArrays = Array.from({ length: numberOfDays }, (_, i) => i + 1);

        // Build columns
        const columns = [
            { field: 'studentId', headerName: "SU Member ID", filter: true },
            { field: 'name', filter: true },
        ];

        daysArrays.forEach(date => {
            columns.push({
                field: date.toString(),
                width: 50,
                editable: true
            });
        });

        setColDefs(columns);

        // Build rows
        const userList = getUniqueRecord();
        userList.forEach(obj => {
            daysArrays.forEach(date => {
                obj[date] = isPresent(obj.studentId, date);
            });
        });

        setRowData(userList);
    }, [attendanceList, selectedMonth]);

    const isPresent = (studentId, day) => {
        return attendanceList.some(item => item.day == day && item.studentId == studentId);
    };

    const getUniqueRecord = () => {
        const uniqueRecord = [];
        const existingUser = new Set();
        attendanceList?.forEach(record => {
            if (!existingUser.has(record.studentId)) {
                existingUser.add(record.studentId);
                uniqueRecord.push({ ...record });
            }
        });
        return uniqueRecord;
    };

    const onMarkAttendance = (day, studentId, presentStatus) => {
        const date = moment(selectedMonth).format('MM/YYYY');
        if (presentStatus) {
            const data = { day, studentId, present: presentStatus, date };
            GlobalApi.MarkAttendance(data).then(() => {
                toast("Member Id: " + studentId + " Marked as present");
            });
        } else {
            GlobalApi.MarkAbsent(studentId, day, date).then(() => {
                toast("Member Id: " + studentId + " Marked as absent");
            });
        }
    };

    return (
        <div>
            <div className="ag-theme-quartz" style={{ height: 500 }}>
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    onCellValueChanged={(e) => onMarkAttendance(e.colDef.field, e.data.studentId, e.newValue)}
                    pagination={pagination}
                    paginationPageSize={paginationPageSize}
                    paginationPageSizeSelector={paginationPageSizeSelector}
                    loadingOverlayComponent={loading ? () => <div className="text-center py-10">Loading attendance...</div> : undefined}
                />
            </div>
        </div>
    );
}

export default AttendanceGrid;
