import React from 'react';
import { Download, BarChart3, Users, GraduationCap } from 'lucide-react';
import './Analytics.css';
import ContentBox from '../../components/ContentBox/ContentBox';

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
    { rank: 9, name: 'Christopher Lee Anderson', average: 72.1 },
    { rank: 10, name: 'Amanda Grace Thompson', average: 71.7 },
  ];

  const gradeDistribution = [
    { division: 'Division 1', percentage: 45, color: '#EF4444' },
    { division: 'Division 2', percentage: 27, color: '#22C55E' },
    { division: 'Division 3', percentage: 28, color: '#3B82F6' },
    { division: 'Division 4', percentage: 28, color: '#EAB308' },
  ];

  return (
    <ContentBox contentHeading="Analysis">
      <div className="dashboard-container">
        <div className="analysis-grid">
          {/* Left side - Top Classes and Students */}
          <div className="card combined-card">
            <div className="two-column-tables">
              {/* Top Classes */}
              <div className="table-section">
                <div className="section-header">
                  <GraduationCap size={16} />
                  <span>Top Classes</span>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Class</th>
                      <th>Avg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topClasses.map((item) => (
                      <tr key={`class-${item.rank}`}>
                        <td className="text-[14px] font-[300]">
                          <span className="rank-badge">{item.rank}.</span>
                          {item.name}
                        </td>
                        <td className="text-[14px] font-[300]">
                          {item.average}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Top Students */}
              <div className="table-section">
                <div className="section-header">
                  <Users size={16} />
                  <span>Top Students</span>
                </div>
                <table className="data-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Avg</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topStudents.map((student) => (
                      <tr key={`student-${student.rank}`}>
                        <td className="text-[14px] font-[300]">
                          <span className="rank-badge">{student.rank}.</span>
                          {student.name}
                        </td>
                        <td className="text-[14px] font-[300]">
                          {student.average}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="export-container">
                  <button className="export-button">
                    <Download size={16} />
                    Export .xlsx
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Grade distribution and analytics */}
          <div className="right-column w-[480px] bg-amber-700">
            <div className="card">
              <h2 className="text-lg font-semibold text-gray-800 mb-6">
                Grade Distribution
              </h2>
              <div className="flex flex-col items-center">
                <div className="pie-chart mb-8"></div>
                <div className="w-full space-y-1">
                  {gradeDistribution.map((item, index) => (
                    <div key={index} className="legend-item">
                      <div
                        className="legend-dot"
                        style={{ backgroundColor: item.color }}
                      ></div>
                      <span className="text-gray-600 text-sm flex-1">
                        {item.division}
                      </span>
                      <span className="font-semibold text-gray-900 text-sm">
                        {item.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="card mt-6">
              <h3 className="font-semibold text-gray-800 mb-3">
                Individual Student Performance
              </h3>
              <p className="text-gray-600 text-sm mb-4">
                Track each student's academic progress in detail, reviewing
                subject-wise scores, identifying strengths, and pinpointing
                areas needing improvement.
              </p>
              <button className="view-analytics-button">
                <BarChart3 size={16} />
                View Student Analytics
              </button>
            </div>
          </div>
        </div>
      </div>
    </ContentBox>
  );
};

export default AnalyticsDashboard;
