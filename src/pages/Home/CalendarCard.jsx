import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

function CalendarCard() {
  // Calendar state management - initialize to current date
  const [currentDate, setCurrentDate] = useState(new Date());

  // Calendar functions
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Calendar helper functions
  const getMonthName = (date) => {
    return date.toLocaleString('default', { month: 'long' });
  };

  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDayOfWeek = new Date(year, month, 1).getDay();
    const days = [];

    // Add empty slots for days before the first day of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = generateCalendarDays(currentDate);
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const today = new Date(); // Get today's full date for comparison

  return (
    <div
      style={{
        background: '#FFFFFFB2',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        height: '60%',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Calendar Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '16px',
        }}
      >
        <ChevronLeft
          size={16}
          onClick={() => changeMonth(-1)}
          style={{ 
            color: '#6b7280', 
            cursor: 'pointer',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#374151')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
        />
        <h3
          style={{
            fontSize: '14px',
            fontWeight: '400',
            color: '#1f2937',
            margin: 0,
          }}
        >
          {`${getMonthName(currentDate)} ${currentDate.getFullYear()}`}
        </h3>
        <ChevronRight
          size={16}
          onClick={() => changeMonth(1)}
          style={{ 
            color: '#6b7280', 
            cursor: 'pointer',
            transition: 'color 0.2s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#374151')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#6b7280')}
        />
      </div>

      {/* Week Days */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          marginBottom: '8px',
        }}
      >
        {weekDays.map((day) => (
          <div
            key={day}
            style={{
              textAlign: 'center',
              fontSize: '10px',
              fontWeight: '400',
              color: '#6b7280',
              padding: '4px',
            }}
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: '4px',
          flex: 1,
        }}
      >
        {calendarDays.map((day, index) => {
          // Check if the rendered day is today's date
          const isToday =
            day === today.getDate() &&
            currentDate.getMonth() === today.getMonth() &&
            currentDate.getFullYear() === today.getFullYear();

          return (
            <div
              key={index}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '32px',
                width: '32px',
                fontSize: '14px',
                backgroundColor: isToday ? '#007EA7' : 'transparent',
                color: isToday ? 'white' : '#374151',
                borderRadius: '50%',
                cursor: day ? 'pointer' : 'default',
                fontWeight: '400',
                transition: 'background-color 0.2s ease, color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (day && !isToday) {
                  e.currentTarget.style.backgroundColor = '#f3f4f6';
                }
              }}
              onMouseLeave={(e) => {
                if (day && !isToday) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              {day || ''}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default CalendarCard;
