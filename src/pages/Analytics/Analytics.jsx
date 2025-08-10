import React from 'react';
import { Download, BarChart3, Users, GraduationCap } from 'lucide-react';
import { PieChart, Pie, Cell } from 'recharts';

import './Analytics.css';
import ContentBox from '../../components/ContentBox/ContentBox';
import { Link } from 'react-router-dom';

const AnalyticsDashboard = () => {
  const topClasses = [
    { rank: 1, name: 'P7P', average: 75.1 },
    { rank: 2, name: 'P7P', average: 75.1 },
    { rank: 3, name: 'P6A', average: 72.8 },
    { rank: 4, name: 'P6B', average: 71.5 },
    { rank: 5, name: 'P5A', average: 69.2 },
    { rank: 6, name: 'P5B', average: 68.7 },
    { rank: 7, name: 'P4A', average: 67.3 },
    { rank: 8, name: 'P4B', average: 66.9 },
    { rank: 9, name: 'P3A', average: 65.4 },
    { rank: 10, name: 'P3B', average: 64.8 },
  ];

  const topStudents = [
    { rank: 1, name: 'Ben Frank Katumba', average: 75.1 },
    { rank: 2, name: 'Sarah Michelle Obama', average: 74.8 },
    { rank: 3, name: 'David Johnson Mills', average: 74.2 },
    { rank: 4, name: 'Maria Elena Rodriguez', average: 73.9 },
    { rank: 5, name: 'James Robert Wilson', average: 73.5 },
    { rank: 6, name: 'Ashley Nicole Brown', average: 73.1 },
    { rank: 7, name: 'Michael Anthony Davis', average: 72.8 },
    { rank: 8, name: 'Jennifer Marie Taylor', average: 72.4 },
    { rank: 9, name: 'Christopher Lee', average: 72.1 },
    { rank: 10, name: 'Amanda Grace', average: 71.7 },
  ];

  const gradeDistribution = [
    { division: 'Division 1', percentage: 45, color: '#EF4444' },
    { division: 'Division 2', percentage: 27, color: '#22C55E' },
    { division: 'Division 3', percentage: 28, color: '#3B82F6' },
    { division: 'Division 4', percentage: 28, color: '#EAB308' },
  ];

  const formatName = (fullName) => {
    const parts = fullName.trim().split(' ');
    if (parts.length <= 2) return fullName;

    const firstTwo = parts.slice(0, 2).join(' ');
    const initials = parts
      .slice(2)
      .map((n) => n[0].toUpperCase() + '.')
      .join(' ');
    return `${firstTwo} ${initials}`;
  };

  // Define the panel height for consistency
  const panelHeight = 'calc(70vh - 40px)'; // Accounting for margins
  const minPanelHeight = '450px';
  const maxPanelHeight = '615px';

  return (
    <ContentBox contentHeading="Analytics">
      {/* Dashboard Container */}
      <div
        style={{
          display: 'flex',
          gap: '24px',
          flexWrap: 'wrap',
          marginTop: '20px',
        }}
      >
        {/* Left Panel - Combined Tables Card */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            padding: '20px',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            width: '100%',
            maxWidth: '504px',
            minWidth: '480px',
            height: panelHeight,
            maxHeight: maxPanelHeight,
            minHeight: minPanelHeight,
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
          {/* Two Column Tables Container */}
          <div
            style={{
              display: 'flex',
              gap: '16px',
              flex: '1',
              overflow: 'hidden',
            }}
          >
            {/* Top Classes Table */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                width: '186px',
                minWidth: '186px',
                height: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#1f2937',
                  gap: '8px',
                  marginBottom: '12px',
                  height: 'auto',
                  flexShrink: 0,
                }}
              >
                <GraduationCap size={16} />
                <span>Top Classes</span>
              </div>

              <div
                style={{
                  flex: '1',
                  overflowY: 'auto',
                  minHeight: 0,
                }}
              >
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
                          padding: '4px',
                          textAlign: 'left',
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
                          padding: '4px',
                          textAlign: 'center',
                        }}
                      >
                        Average
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topClasses.map((item, index) => {
                      const baseColor =
                        index % 2 === 0
                          ? 'hsla(189, 64%, 95%, 1)'
                          : 'hsla(0, 0%, 98%, 1)';
                      const hoverColor =
                        index % 2 === 0
                          ? 'hsla(189, 64%, 85%, 1)'
                          : 'hsla(0, 0%, 85%, 1)';

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
            </div>

            {/* Top Students Table */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                flex: '1',
                minWidth: '270px',
                height: '100%',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#1f2937',
                  gap: '8px',
                  marginBottom: '12px',
                  height: 'auto',
                  flexShrink: 0,
                }}
              >
                <Users size={16} />
                <span>Top Students</span>
              </div>

              <div
                style={{
                  flex: '1',
                  overflowY: 'auto',
                  minHeight: 0,
                }}
              >
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
                          padding: '4px 4px 4px 30px',
                          textAlign: 'left',
                        }}
                      >
                        Name
                      </th>
                      <th
                        style={{
                          fontWeight: '400',
                          fontSize: '14px',
                          color: '#6b7280',
                          borderBottom: '1px solid hsl(220, 13%, 91%)',
                          padding: '4px',
                          textAlign: 'center',
                        }}
                      >
                        Average
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {topStudents.map((student, index) => {
                      const baseColor =
                        index % 2 === 0
                          ? 'hsla(189, 64%, 95%, 1)'
                          : 'hsla(0, 0%, 98%, 1)';
                      const hoverColor =
                        index % 2 === 0
                          ? 'hsla(189, 64%, 85%, 1)'
                          : 'hsla(0, 0%, 85%, 1)';

                      return (
                        <tr
                          key={`student-${student.rank}`}
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
                              {student.rank}.
                            </span>{' '}
                            {formatName(student.name)}
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
                            {student.average}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Export Button */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'flex-end',
              paddingRight: '10px',
              marginTop: '16px',
              flexShrink: 0,
            }}
          >
            <button
              style={{
                border: '1px solid #737373',
                borderRadius: '8px',
                padding: '8px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                color: '#737373',
                fontWeight: '400',
                cursor: 'pointer',
                fontSize: '14px',
                background: 'transparent',
                transition: 'all 0.2s ease',
              }}
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
              <Download size={16} stroke="#737373" />
              Export .xlsx
            </button>
          </div>
        </div>

        {/* Right Panel */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            width: '500px',
            height: panelHeight,
            maxHeight: maxPanelHeight,
            minHeight: minPanelHeight,
            gap: '16px',
          }}
        >
          {/* Grade Distribution Card - 60% */}
          <div
            style={{
              background: '#ffffff',
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
              e.currentTarget.style.boxShadow =
                '0 4px 12px rgba(0, 0, 0, 0.15)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
            }}
          >
            <div className=" flex flex-row justify-center items-center">
              <h2
                style={{
                  fontSize: '18px',
                  fontWeight: '400',
                  color: '#1f2937',
                  marginBottom: '16px',
                }}
              >
                Grade Distribution
              </h2>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '16px',
                flex: '1',
              }}
            >
              <div style={{ flex: '1', minWidth: '250px' }}>
                <PieChart width={250} height={200}>
                  <Pie
                    data={gradeDistribution}
                    dataKey="percentage"
                    nameKey="division"
                    cx="50%"
                    cy="50%"
                    outerRadius="100%"
                    label={({
                      cx,
                      cy,
                      midAngle,
                      innerRadius,
                      outerRadius,
                      percent,
                      index,
                    }) => {
                      const RADIAN = Math.PI / 180;
                      const radius =
                        innerRadius + (outerRadius - innerRadius) / 2;
                      const x = cx + radius * Math.cos(-midAngle * RADIAN);
                      const y = cy + radius * Math.sin(-midAngle * RADIAN);

                      return (
                        <text
                          x={x}
                          y={y}
                          fill="#fff"
                          textAnchor="middle"
                          dominantBaseline="central"
                          fontSize={14}
                          fontWeight={400}
                        >
                          {`${gradeDistribution[index].percentage}%`}
                        </text>
                      );
                    }}
                    labelLine={false}
                  >
                    {gradeDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                </PieChart>
              </div>

              <div
                style={{
                  width: '185px',
                  minWidth: '150px',
                }}
              >
                {gradeDistribution.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      marginBottom: '12px',
                    }}
                  >
                    <div
                      style={{
                        width: '12px',
                        height: '12px',
                        borderRadius: '50%',
                        backgroundColor: item.color,
                      }}
                    ></div>
                    <span
                      style={{
                        color: '#6b7280',
                        fontSize: '14px',
                        flex: '1',
                      }}
                    >
                      {item.division}
                    </span>
                    <span
                      style={{
                        fontWeight: '400',
                        color: '#737373',
                        fontSize: '14px',
                      }}
                    >
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Individual Student Performance Card - 40% */}
          <div
            style={{
              background: '#ffffff',
              borderRadius: '12px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              transition: 'transform 0.2s ease, box-shadow 0.2s ease',
              height: 'calc(40% - 8px)', // Subtracting half the gap
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
            <h3
              style={{
                fontWeight: '400',
                color: '#1f2937',
                marginBottom: '12px',
                fontSize: '16px',
              }}
            >
              Individual Student Performance
            </h3>

            <p
              style={{
                color: '#737373',
                fontSize: '14px',
                marginBottom: '16px',
                fontWeight: '300',
                lineHeight: '1.5',
                flex: '1',
              }}
            >
              Track each student's academic progress in detail, reviewing
              subject-wise scores, identifying strengths, and pinpointing areas
              needing improvement.
            </p>

            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'flex-end',
              }}
            >
              <Link
                to="/analytics/classes"
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
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#a44fc6';
                  e.currentTarget.style.transform = 'translateY(-1px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#7F3F98';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <BarChart3 size={16} />
                View Class Analytics
              </Link>
            </div>
          </div>
        </div>
      </div>
    </ContentBox>
  );
};

export default AnalyticsDashboard;
