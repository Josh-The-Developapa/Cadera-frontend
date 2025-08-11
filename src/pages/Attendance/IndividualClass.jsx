import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  ChevronLeft,
  Calendar,
  CircleCheck,
  XCircle,
  Circle,
  Info,
} from 'lucide-react';
import ContentBox from '../../components/ContentBox/ContentBox';
import { Link } from 'react-router-dom';
import CalendarCard from '../Home/CalendarCard';

// Sample data matching the image structure
const sampleStudents = [
  { id: 1, name: 'Keith Kateesi Katumwe' },
  { id: 2, name: 'Aisha Namukasa' },
  { id: 3, name: 'Brian Kaggwa Ssenyonga' },
  { id: 4, name: 'Martha Nansubuga' },
  { id: 5, name: 'Daniel Tumusiime' },
  { id: 6, name: 'Josephine Nakato' },
  { id: 7, name: 'Michael Muwanga' },
  { id: 8, name: 'Ruth Nankunda' },
  { id: 9, name: 'Samuel Kagimu' },
  { id: 10, name: 'Grace Nabirye' },
  { id: 11, name: 'Emmanuel Ssebunya' },
  { id: 12, name: 'Irene Nakazibwe' },
  { id: 13, name: 'Paul Bbosa' },
  { id: 14, name: 'Sarah Kyomuhendo' },
  { id: 15, name: 'James Mugisha' },
  { id: 16, name: 'Patricia Nansamba' },
  { id: 17, name: 'David Lumu' },
  { id: 18, name: 'Esther Nabbosa' },
  { id: 19, name: 'Henry Katongole' },
  { id: 20, name: 'Florence Nakayiza' },
];

function IndividualClass() {
  const class_name = 'Sample Class';
  const [currentWeek, setCurrentWeek] = useState(5);
  const [selectedDate, setSelectedDate] = useState(5);

  // Initialize attendance state - storing attendance for each student for each day
  const [attendance, setAttendance] = useState(() => {
    const initialAttendance = {};
    sampleStudents.forEach((student) => {
      initialAttendance[student.id] = {
        monday: 'present',
        tuesday: 'present',
        wednesday: 'present',
        thursday: 'not-recorded',
        friday: 'absent',
      };
    });
    return initialAttendance;
  });

  const days = ['M', 'T', 'W', 'TH', 'F'];
  const dayNames = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];

  const handleAttendanceChange = (studentId, day, status) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: {
        ...prev[studentId],
        [day]: status,
      },
    }));
  };

  const getAttendanceIcon = (studentId, day, status) => {
    const currentStatus = attendance[studentId]?.[day] || 'not-recorded';

    if (status === 'present' && currentStatus === 'present') {
      return <CircleCheck className="w-4 h-4 text-[#00d583]" />;
    } else if (status === 'absent' && currentStatus === 'absent') {
      return <XCircle className="w-4 h-4 text-[#BF4040]" />;
    } else if (status === 'not-recorded' && currentStatus === 'not-recorded') {
      return <Circle className="w-4 h-4 text-[#A6A6A6]" />;
    }

    // Inactive states
    if (status === 'present') {
      return (
        <CircleCheck className="w-4 h-4 text-gray-300 hover:text-[#00B36E] cursor-pointer transition-colors" />
      );
    } else if (status === 'absent') {
      return (
        <XCircle className="w-4 h-4 text-gray-300 hover:text-[#BF4040] cursor-pointer transition-colors" />
      );
    }

    return null;
  };

  // Calculate attendance summary
  const getTotalPresent = () => {
    let total = 0;
    sampleStudents.forEach((student) => {
      dayNames.forEach((day) => {
        if (attendance[student.id]?.[day] === 'present') total++;
      });
    });
    return total;
  };

  const getTotalAbsent = () => {
    let total = 0;
    sampleStudents.forEach((student) => {
      dayNames.forEach((day) => {
        if (attendance[student.id]?.[day] === 'absent') total++;
      });
    });
    return total;
  };

  const getTotalNotRecorded = () => {
    let total = 0;
    sampleStudents.forEach((student) => {
      dayNames.forEach((day) => {
        if (attendance[student.id]?.[day] === 'not-recorded') total++;
      });
    });
    return total;
  };

  return (
    <div className="body-container">
      <ContentBox
        contentHeading={
          <span>
            <Link to="/attendance" style={{ color: '#A6A6A6' }}>
              Attendance
            </Link>
            <ChevronRight
              className="inline w-5 h-5 mx-1 align-middle mb-[2px] ml-[4px]"
              strokeWidth={3}
              style={{ color: '#A6A6A6' }}
            />
            <span className="font-[500]">{class_name}</span>
          </span>
        }
      >
        <div className="flex gap-[8px]  h-[73vh] max-h-[507px] min-h-[450px] mt-[15px]">
          {/* Main Attendance Table */}
          <div className="w-[640px] bg-white shadow-[2px_6px_15px_rgba(0,0,0,0.1)] rounded-[10px] px-8 py-6">
            {/* Week Navigation */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-6">
                <ChevronLeft
                  className="w-4 h-4 text-[#737373] cursor-pointer"
                  strokeWidth={1.25}
                  onClick={() =>
                    setCurrentWeek((prev) => Math.max(1, prev - 1))
                  }
                />
                <span className="text-sm font-normal text-[#0D0D0D] font-['Lexend_Deca'] leading-[105%]">
                  Week {currentWeek}
                </span>
                <ChevronRight
                  className="w-4 h-4 text-[#737373] cursor-pointer"
                  strokeWidth={1.25}
                  onClick={() => setCurrentWeek((prev) => prev + 1)}
                />
              </div>
              <button className="flex items-center gap-[6px] px-4 py-2 bg-white border border-[#737373] rounded-[5px] text-sm text-[#737373] font-['Lexend_Deca'] leading-[105%]">
                <Calendar className="w-4 h-4" strokeWidth={1.25} />
                Jump to Today
              </button>
            </div>

            {/* Attendance Table */}
            <div
              style={{
                maxHeight: '90%',
                overflowY: 'auto',
              }}
            >
              <table
                className="w-full"
                style={{
                  width: '100%',
                  borderSpacing: '0 4px',
                  fontSize: '13px',
                  borderCollapse: 'separate',
                }}
              >
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2 text-sm font-normal text-[#404040] font-['Lexend_Deca'] leading-[105%]">
                      Name
                    </th>
                    {days.map((day) => (
                      <th
                        key={day}
                        className="text-center px-4 py-2 text-sm font-normal text-[#404040] font-['Lexend_Deca'] leading-[105%] w-16"
                      >
                        {day}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {sampleStudents.map((student, index) => (
                    <tr key={student.id}>
                      <td
                        className={`px-4 py-2 text-[13px] font-light text-[#404040] font-['Lexend_Deca'] leading-[105%] rounded-l-[5px] ${
                          index % 2 === 0 ? 'bg-[#F6F6F6]' : 'bg-[#F6FCFD]'
                        }`}
                      >
                        {student.name}
                      </td>
                      {dayNames.map((day, dayIndex) => (
                        <td
                          key={day}
                          className={`px-4 py-2 text-center ${
                            index % 2 === 0 ? 'bg-[#F6F6F6]' : 'bg-[#F6FCFD]'
                          } ${
                            dayIndex === dayNames.length - 1
                              ? 'rounded-r-[5px]'
                              : ''
                          }`}
                          style={{
                            fontSize: '14px',
                            fontWeight: '300',
                            color: '#111827',
                            padding: '6px 8px',
                            height: '32px',
                          }}
                        >
                          <div className="flex items-center justify-center gap-1">
                            <button
                              onClick={() =>
                                handleAttendanceChange(
                                  student.id,
                                  day,
                                  'present'
                                )
                              }
                            >
                              {getAttendanceIcon(student.id, day, 'present')}
                            </button>
                            <button
                              onClick={() =>
                                handleAttendanceChange(
                                  student.id,
                                  day,
                                  'absent'
                                )
                              }
                            >
                              {getAttendanceIcon(student.id, day, 'absent')}
                            </button>
                          </div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-[400px] h-[73vh] max-h-[615px] min-h-[450px] flex flex-col space-y-6">
            {/* Date Info and Attendance Summary Card */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 pt-[24px] pl-[24px] pr-[24px] pb-[30px]">
              {/* Header with selected date */}
              <div className="flex items-center justify-start mb-[15px] gap-[6px]">
                <Info className="w-4 h-4 text-[#737373]" strokeWidth={1.25} />
                <span className="text-sm font-medium text-gray-900">
                  Thursday, Sep {selectedDate}
                </span>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-2 gap-[32px]">
                {/* Left Column - Date/Term Info */}
                <div className="flex flex-col gap-[5px]">
                  <div className="flex flex-row justify-between">
                    <div className="text-sm text-gray-600">Term:</div>
                    <div className="text-sm font-medium text-gray-900">1</div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="text-sm text-gray-600">End Date:</div>
                    <div className="text-sm font-medium text-gray-900">
                      09/12/2025
                    </div>
                  </div>
                  <div className="flex flex-row justify-between">
                    <div className="text-sm text-gray-600 mb-1">
                      Academic Year:
                    </div>
                    <div className="text-sm font-medium text-gray-900">
                      2025
                    </div>
                  </div>
                </div>

                {/* Right Column - Attendance Summary */}
                <div className="flex flex-col gap-[5px]">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CircleCheck className="w-4 h-4 text-[#00B36E]" />
                      <span className="text-sm text-gray-700">Present</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {getTotalPresent()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <XCircle className="w-4 h-4 text-[#BF4040]" />
                      <span className="text-sm text-gray-700">Absent</span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {getTotalAbsent()}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Circle className="w-4 h-4 text-[#A6A6A6]" />
                      <span className="text-sm text-gray-700">
                        Not Recorded
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      {getTotalNotRecorded()}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar Card */}
            <CalendarCard height={'318px'} />
          </div>
        </div>
      </ContentBox>
    </div>
  );
}

export default IndividualClass;
