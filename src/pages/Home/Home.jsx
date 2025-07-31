import React, { useState, useEffect } from 'react';
import {
  Download,
  GraduationCap,
  FileText,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Plus,
  CheckCircle2,
  CheckCheck,
  Trash2,
  ClipboardList,
  FilePlus2,
  ChartPie, // <-- 1. Imported Trash icon for delete functionality
} from 'lucide-react';
import ContentBox from '../../components/ContentBox/ContentBox';
import './Home.css';
import { NavLink } from 'react-router-dom';

function Home() {
  const getGreeting = () => {
    const currentHour = new Date().getHours();
    if (currentHour < 12) {
      return 'Good morning';
    } else if (currentHour < 16) {
      return 'Good afternoon';
    } else {
      return 'Good evening';
    }
  };

  // ToDo state management with local storage initialization
  const [newTask, setNewTask] = useState('');

  // 1.1: Lazy initialize state from local storage
  const [todoItems, setTodoItems] = useState(() => {
    const savedTasks = localStorage.getItem('todoTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [completedItems, setCompletedItems] = useState(() => {
    const savedTasks = localStorage.getItem('completedTasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  // 1.2: Use useEffect to update local storage whenever tasks change
  useEffect(() => {
    localStorage.setItem('todoTasks', JSON.stringify(todoItems));
  }, [todoItems]);

  useEffect(() => {
    localStorage.setItem('completedTasks', JSON.stringify(completedItems));
  }, [completedItems]);

  // Calendar state management
  // 2.1: Initialize calendar to the current date, not a static one
  const [currentDate, setCurrentDate] = useState(new Date());

  // ToDo functions
  const addTask = () => {
    if (newTask.trim()) {
      // Use a more robust ID, like a timestamp
      const newId = Date.now();
      setTodoItems([
        ...todoItems,
        { id: newId, text: newTask.trim(), completed: false },
      ]);
      setNewTask('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      addTask();
    }
  };

  const toggleTask = (id) => {
    const taskToMove = todoItems.find((item) => item.id === id);
    if (taskToMove) {
      setTodoItems(todoItems.filter((item) => item.id !== id));
      setCompletedItems([
        ...completedItems,
        { ...taskToMove, completed: true },
      ]);
    }
  };

  const uncompleteTask = (id) => {
    const taskToMove = completedItems.find((item) => item.id === id);
    if (taskToMove) {
      setCompletedItems(completedItems.filter((item) => item.id !== id));
      setTodoItems([...todoItems, { ...taskToMove, completed: false }]);
    }
  };

  // 1.3: Add a function to delete a task from either list
  const deleteTask = (id) => {
    setTodoItems(todoItems.filter((item) => item.id !== id));
    setCompletedItems(completedItems.filter((item) => item.id !== id));
  };

  // Calendar functions
  const changeMonth = (direction) => {
    const newDate = new Date(currentDate);
    newDate.setMonth(currentDate.getMonth() + direction);
    setCurrentDate(newDate);
  };

  // Sample data for top classes (reusing Analytics style)
  const topClasses = [
    { rank: 1, name: 'P7P', average: 75.1 },
    { rank: 2, name: 'P7P', average: 75.1 },
    { rank: 3, name: 'P7P', average: 75.1 },
    { rank: 4, name: 'P7P', average: 75.1 },
    { rank: 5, name: 'P7P', average: 75.1 },
    { rank: 6, name: 'P7P', average: 75.1 },
    { rank: 7, name: 'P7P', average: 75.1 },
    { rank: 8, name: 'P7P', average: 75.1 },
  ];

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

    for (let i = 0; i < firstDayOfWeek; i++) {
      days.push(null);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }

    return days;
  };

  const calendarDays = generateCalendarDays(currentDate);
  const weekDays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const today = new Date(); // Get today's full date for comparison

  return (
    <div className="body-container">
      <ContentBox contentHeading={getGreeting()}>
        <div
          style={{
            display: 'flex',
            gap: '16px',
            flexWrap: 'wrap',
            marginTop: '20px',
            maxHeight: '484px',
            minHeight: '450px',
            height: 'calc(70vh - 40px)',
          }}
        >
          {/* Left Column - To Do List */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              width: '100%',
              maxWidth: '380px',
              minWidth: '360px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            {/* To Do Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: '16px',
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#1f2937',
                  margin: 0,
                }}
              >
                <div className="flex flex-row gap-[5px] justify-center items-center text-[14px] font-[400]">
                  <ClipboardList size={16} /> To Do{' '}
                  <span style={{ color: '#9ca3af', fontWeight: '400' }}>
                    ({todoItems.length})
                  </span>
                </div>
                {/* 1.4: Make task count dynamic */}
              </h3>
            </div>

            {/* Add Task Input */}
            <div
              style={{
                position: 'relative',
                marginBottom: '20px',
              }}
            >
              <input
                type="text"
                placeholder="Describe a Task..."
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                onKeyPress={handleKeyPress}
                style={{
                  width: '100%',
                  padding: '10px 40px 10px 16px',
                  border: '1px solid #404040',
                  borderRadius: '5px',
                  fontSize: '14px',
                  fontWeight: '300',
                  color: '#404040',
                  outline: 'none',
                  backgroundColor: '#ffffff',
                }}
              />
              <Plus
                size={20}
                onClick={addTask}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#6b7280',
                  cursor: 'pointer',
                }}
              />
            </div>

            {/* To Do Items */}
            <div style={{ flex: 1, overflowY: 'auto' }}>
              {todoItems.map((item) => (
                <div
                  key={item.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '12px',
                    padding: '12px 16px',
                    marginBottom: '8px',
                    backgroundColor: '#f9fafb',
                    borderRadius: '5px',
                    border: '1px solid #f3f4f6',
                  }}
                >
                  <div
                    onClick={() => toggleTask(item.id)}
                    style={{
                      width: '20px',
                      height: '20px',
                      border: '2px solid #d1d5db',
                      borderRadius: '50%',
                      marginTop: '2px',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#3b82f6';
                      e.currentTarget.style.backgroundColor = '#eff6ff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#d1d5db';
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  ></div>
                  <span
                    style={{
                      fontSize: '14px',
                      color: '#374151',
                      fontWeight: 300,
                      lineHeight: '1.4',
                      flex: 1,
                    }}
                  >
                    {item.text}
                  </span>
                  {/* 1.5: Added delete button for pending tasks */}
                  <Trash2
                    size={18}
                    onClick={() => deleteTask(item.id)}
                    style={{
                      color: '#9ca3af',
                      cursor: 'pointer',
                      marginTop: '2px',
                      transition: 'color 0.2s ease',
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.color = '#ef4444')
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.color = '#9ca3af')
                    }
                  />
                </div>
              ))}

              {/* Completed Section */}
              {completedItems.length > 0 && (
                <div style={{ marginTop: '24px' }}>
                  <h4
                    style={{
                      fontSize: '14px',
                      fontWeight: '500',
                      color: '#1f2937',
                      marginBottom: '12px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                    }}
                  >
                    <CheckCheck size={16} />
                    Completed{' '}
                    <span style={{ color: '#9ca3af', fontWeight: '400' }}>
                      ({completedItems.length})
                    </span>
                  </h4>

                  {completedItems.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '12px',
                        padding: '12px 16px',
                        marginBottom: '8px',
                        backgroundColor: '#f9fafb',
                        borderRadius: '5px',
                        opacity: 0.7,
                      }}
                    >
                      <CheckCircle2
                        size={20}
                        onClick={() => uncompleteTask(item.id)}
                        style={{
                          color: '#10b981',
                          marginTop: '2px',
                          cursor: 'pointer',
                        }}
                      />
                      <span
                        style={{
                          fontSize: '14px',
                          color: '#6b7280',
                          lineHeight: '1.4',
                          flex: 1,
                          textDecoration: 'line-through',
                        }}
                      >
                        {item.text}
                      </span>
                      {/* 1.6: Added delete button for completed tasks */}
                      <Trash2
                        size={18}
                        onClick={() => deleteTask(item.id)}
                        style={{
                          color: '#9ca3af',
                          cursor: 'pointer',
                          marginTop: '2px',
                          transition: 'color 0.2s ease',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = '#ef4444')
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = '#9ca3af')
                        }
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Middle Column - Top Classes */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              // boxShadow: '2px 6px 15px 0px #0000001A',
              padding: '20px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              width: '234px',
              maxWidth: '300px',
              minWidth: '234px',
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow =
                '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            {/* Header */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '14px',
                fontWeight: '400',
                color: '#1f2937',
                gap: '8px',
                marginBottom: '16px',
              }}
            >
              <GraduationCap size={20} />
              <span> Top Classes</span>
            </div>

            {/* Table */}
            <div style={{ flex: 1, overflowY: 'auto' }} className="Table Div">
              <table
                style={{
                  width: '100%',
                  borderSpacing: '0 4px',
                  fontSize: '13px',
                  borderCollapse: 'separate',
                }}
              >
                <thead>
                  <tr>
                    <th
                      style={{
                        fontWeight: '400',
                        fontSize: '14px',
                        color: '#6b7280',
                        borderBottom: '1px solid hsl(220, 13%, 91%)',
                        padding: '8px 4px',
                        textAlign: 'center',
                      }}
                    >
                      Class
                    </th>
                    <th
                      style={{
                        fontWeight: '400',
                        fontSize: '14px',
                        color: '#6b7280',
                        borderBottom: '1px solid hsl(220, 13%, 91%)',
                        padding: '8px 4px',
                        textAlign: 'center',
                      }}
                    >
                      Average
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {topClasses.map((item, index) => {
                    const baseColor = index % 2 === 0 ? '#F6F6F6' : '#F6FCFD';
                    const hoverColor =
                      index % 2 === 0
                        ? 'hsla(0, 0%, 85%, 1)'
                        : 'hsla(189, 64%, 85%, 1)';

                    return (
                      <tr
                        key={`class-${item.rank}`}
                        style={{
                          backgroundColor: baseColor,
                          transition: 'background-color 0.3s ease',
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.backgroundColor = hoverColor)
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.backgroundColor = baseColor)
                        }
                      >
                        <td
                          style={{
                            fontSize: '14px',
                            fontWeight: '300',
                            color: '#111827',
                            padding: '6px 8px',
                            height: '32px',
                          }}
                        >
                          <span
                            style={{
                              color: '#404040',
                              borderRadius: '8px',
                              padding: '2px 6px',
                              fontSize: '14px',
                              fontWeight: '300',
                              display: 'inline-block',
                              textAlign: 'center',
                            }}
                          >
                            {item.rank}.
                          </span>{' '}
                          {item.name}
                        </td>
                        <td
                          style={{
                            fontSize: '14px',
                            fontWeight: '300',
                            color: '#111827',
                            padding: '6px 8px',
                            textAlign: 'center',
                            height: '32px',
                          }}
                        >
                          {item.average}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Go to Analytics Button */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                marginTop: '16px',
              }}
            >
              <NavLink
                style={{
                  border: '1px solid #d1d5db',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: '#6b7280',
                  fontWeight: '400',
                  cursor: 'pointer',
                  fontSize: '14px',
                  background: 'transparent',
                  transition: 'all 0.2s ease',
                }}
                to="analytics"
                onMouseEnter={(e) => {
                  e.currentTarget.style.background =
                    'linear-gradient(135deg, #e5e7eb 0%, #d1d5db 100%)';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <ChartPie size={16} /> Go To Analytics
              </NavLink>
            </div>
          </div>

          {/* Right Column */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '350px',
              height: '100%',
              gap: '16px',
            }}
          >
            {/* Calendar Card */}
            <div
              style={{
                background: '#FFFFFFB2',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                height: '60%',
                // width: '306px',
                display: 'flex',
                flexDirection: 'column',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 1px 3px rgba(0, 0, 0, 0.1)';
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
                {/* 2.2: Add onClick handlers to change month */}
                <ChevronLeft
                  size={16}
                  onClick={() => changeMonth(-1)}
                  style={{ color: '#6b7280', cursor: 'pointer' }}
                />
                <h3
                  style={{
                    fontSize: '14px',
                    fontWeight: '400',
                    color: '#1f2937',
                    margin: 0,
                  }}
                >
                  {/* 2.3: Make month and year dynamic */}
                  {`${getMonthName(currentDate)} ${currentDate.getFullYear()}`}
                </h3>
                <ChevronRight
                  size={16}
                  onClick={() => changeMonth(1)}
                  style={{ color: '#6b7280', cursor: 'pointer' }}
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
                  // 2.4: Check if the rendered day is today's date
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
                        // 2.5: Dynamically style today's date
                        backgroundColor: isToday ? '#7F3F98' : 'transparent',
                        color: isToday ? 'white' : '#374151',
                        borderRadius: '50%',
                        cursor: day ? 'pointer' : 'default',
                        fontWeight: '400',
                      }}
                    >
                      {day || ''}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Generate Reports Card */}
            <div
              style={{
                background: '#ffffff',
                borderRadius: '12px',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                padding: '20px',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                height: 'calc(40% - 8px)',
                display: 'flex',
                flexDirection: 'column',
                // width: '306px',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 4px 12px rgba(0, 0, 0, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow =
                  '0 1px 3px rgba(0, 0, 0, 0.1)';
              }}
            >
              <h3
                style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: '#1f2937',
                  marginBottom: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <FilePlus2 size={20} />
                Generate Reports
              </h3>

              <p
                style={{
                  color: '#6b7280',
                  fontSize: '14px',
                  marginBottom: '16px',
                  fontWeight: '300',
                  lineHeight: '1.5',
                  flex: 1,
                }}
              >
                Generate comprehensive academic reports for individual students
                or classes.
              </p>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  alignItems: 'flex-end',
                }}
              >
                <NavLink
                  style={{
                    background: '#7F3F98',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 16px',
                    color: 'white',
                    fontWeight: '400',
                    fontSize: '14px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  to="reports"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#9247af';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = '#7F3F98';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <FileText size={16} /> Go To Reports
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </ContentBox>
    </div>
  );
}

export default Home;
