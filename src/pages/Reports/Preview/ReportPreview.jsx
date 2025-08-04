import React, { useState } from 'react';
import { ArrowLeft, Download, ChevronLeft, ChevronRight } from 'lucide-react';

const ReportPreview = ({ reportData, onBack, onDownloadAll }) => {
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [academicYear] = useState('2024');
  const [term] = useState('Term 1');
  const [currentPage, setCurrentPage] = useState('cover'); // 'cover' or 'report'

  const currentStudent = reportData.students[currentStudentIndex];

  const subjects = [
    'English Language',
    'Mathematics',
    'Religious Education',
    'Computer Studies',
    'Literacy 1 (Sci & SST)',
    'Literacy 2 (Reading & Writing)',
  ];

  const calculateGrade = (score) => {
    if (score >= 90) return 'D1';
    if (score >= 75) return 'D2';
    if (score >= 70) return 'C3';
    if (score >= 60) return 'C4';
    if (score >= 55) return 'C5';
    if (score >= 50) return 'C6';
    if (score >= 40) return 'P7';
    if (score >= 30) return 'P8';
    return 'F9';
  };

  const getGradeDescription = (grade) => {
    const descriptions = {
      D1: 'Excellent',
      D2: 'Very Good',
      C3: 'Good',
      C4: 'Satisfactory',
      C5: 'Below Avg.',
      C6: 'Below Avg.',
      P7: 'Cause For Concern',
      P8: 'Cause For Concern',
      F9: 'Fail',
    };
    return descriptions[grade] || '';
  };

  const calculateTotal = () => {
    return subjects.reduce(
      (total, subject) => total + (currentStudent.subjects[subject] || 0),
      0
    );
  };

  const calculateAverage = () => {
    return Math.round(calculateTotal() / subjects.length);
  };

  const generateCoverPage = () => {
    return (
      <div
        style={{
          border: '0.2cm solid #7f3f98',
          padding: '2cm',
          height: '27cm',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          boxSizing: 'border-box',
          fontFamily: 'Arial, sans-serif',
          background: 'white',
        }}
      >
        <div
          style={{
            marginTop: '3cm',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5cm',
          }}
        >
          <div
            style={{
              width: '5cm',
              height: '5cm',
              borderRadius: '50%',
              background: '#7f3f98',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontSize: '48px',
              fontWeight: 'bold',
            }}
          >
            MJS
          </div>
          <h1
            style={{
              fontSize: '24pt',
              margin: '0.5cm 0 0 0',
              textAlign: 'center',
            }}
          >
            Makarios Junior School
          </h1>
          <h2 style={{ fontSize: '20pt', margin: '0', textAlign: 'center' }}>
            Progress Report
          </h2>
          <h2
            style={{
              fontSize: '16pt',
              fontWeight: 'normal',
              margin: '0',
              textAlign: 'center',
            }}
          >
            Academic Year 2025
          </h2>
        </div>

        <div
          style={{
            fontSize: '14pt',
            marginTop: '5cm',
            lineHeight: '1em',
            textAlign: 'left',
          }}
        >
          <p style={{ margin: '0.3cm 0' }}>Name: {currentStudent.name}</p>
          <p style={{ margin: '0.3cm 0' }}>Class: {currentStudent.className}</p>
          <p style={{ margin: '0.3cm 0' }}>Class Teacher: Kevin Hart</p>
        </div>
      </div>
    );
  };

  const generateReportCard = () => {
    return (
      <div
        style={{
          border: '0.1cm solid #7f3f98',
          padding: '0.5cm',
          height: '26cm',
          boxSizing: 'border-box',
          fontFamily: 'Arial, sans-serif',
          fontSize: '12pt',
          background: 'white',
          position: 'relative',
        }}
      >
        {/* Logo */}
        <div
          style={{
            position: 'absolute',
            top: '0.5cm',
            left: '0.5cm',
            width: '2cm',
            height: '2cm',
            borderRadius: '50%',
            background: '#7f3f98',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '14px',
            fontWeight: 'bold',
          }}
        >
          MJS
        </div>

        {/* Header */}
        <div
          style={{
            textAlign: 'center',
            marginBottom: '10px',
            paddingLeft: '3cm',
          }}
        >
          <h2 style={{ margin: '0', fontSize: '18pt' }}>
            Makarios Junior School
          </h2>
          <div style={{ fontSize: '10pt' }}>
            <p style={{ margin: '2px 0' }}>P.O. Box 600071 Kajjansi, Uganda</p>
            <p style={{ margin: '2px 0' }}>Tel: +25677425879</p>
            <p style={{ margin: '2px 0' }}>
              Email: makariosjuniorschool@gmail.com
            </p>
          </div>
        </div>

        {/* Student Info */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.2cm',
            marginBottom: '0.3cm',
            fontSize: '10pt',
          }}
        >
          <div style={{ display: 'flex', gap: '1cm' }}>
            <p style={{ margin: 0 }}>Student Name: {currentStudent.name}</p>
            <p style={{ margin: 0 }}>SPC: {currentStudent.spc}</p>
          </div>
          <div style={{ display: 'flex', gap: '1cm' }}>
            <p style={{ margin: 0 }}>Class: {currentStudent.className}</p>
            <p style={{ margin: 0 }}>Class Teacher: Robert Kim</p>
            <p style={{ margin: 0 }}>Section: Primary</p>
          </div>
        </div>

        {/* Grades Table */}
        <div style={{ marginBottom: '0.5cm' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '12pt',
            }}
          >
            <thead>
              <tr>
                <th
                  colSpan="7"
                  style={{
                    border: '1px solid black',
                    padding: '4px',
                    textAlign: 'center',
                    background: '#f0f0f0',
                  }}
                >
                  TERM 2 (May 26th 2025 - August 22nd, 2025) Mid Term Report
                </th>
              </tr>
              <tr>
                {[
                  'Subject',
                  'Mid Term',
                  'End of Term',
                  'Final Mark',
                  'Grade',
                  "Teacher's Comment",
                  'Initials',
                ].map((header) => (
                  <th
                    key={header}
                    style={{
                      border: '1px solid black',
                      padding: '4px',
                      textAlign: 'center',
                      background: '#f0f0f0',
                    }}
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => {
                const score = currentStudent.subjects[subject] || 0;
                const grade = calculateGrade(score);
                return (
                  <tr key={index}>
                    <td
                      style={{
                        border: '1px solid black',
                        padding: '4px',
                        textAlign: 'center',
                      }}
                    >
                      {subject}
                    </td>
                    <td
                      style={{
                        border: '1px solid black',
                        padding: '4px',
                        textAlign: 'center',
                      }}
                    >
                      {score || ''}
                    </td>
                    <td
                      style={{
                        border: '1px solid black',
                        padding: '4px',
                        textAlign: 'center',
                      }}
                    ></td>
                    <td
                      style={{
                        border: '1px solid black',
                        padding: '4px',
                        textAlign: 'center',
                      }}
                    >
                      {score || ''}
                    </td>
                    <td
                      style={{
                        border: '1px solid black',
                        padding: '4px',
                        textAlign: 'center',
                      }}
                    >
                      {score ? grade : ''}
                    </td>
                    <td
                      style={{
                        border: '1px solid black',
                        padding: '4px',
                        textAlign: 'center',
                      }}
                    >
                      {score ? getGradeDescription(grade) : ''}
                    </td>
                    <td
                      style={{
                        border: '1px solid black',
                        padding: '4px',
                        textAlign: 'center',
                      }}
                    ></td>
                  </tr>
                );
              })}
              <tr>
                <td
                  style={{
                    border: '1px solid black',
                    padding: '4px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  Total
                </td>
                <td
                  colSpan="2"
                  style={{
                    border: '1px solid black',
                    padding: '4px',
                    textAlign: 'center',
                  }}
                ></td>
                <td
                  style={{
                    border: '1px solid black',
                    padding: '4px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  {calculateTotal()}
                </td>
                <td
                  colSpan="3"
                  style={{
                    border: '1px solid black',
                    padding: '4px',
                    textAlign: 'center',
                    fontWeight: 'bold',
                  }}
                >
                  (out of 600)
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Grading Scale */}
        <div style={{ marginBottom: '0.5cm' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '8pt',
            }}
          >
            <tr>
              <th
                style={{
                  border: '1px solid black',
                  padding: '4px',
                  textAlign: 'center',
                  background: '#f0f0f0',
                }}
              >
                Grades
              </th>
              {['D1', 'D2', 'C3', 'C4', 'C5', 'C6', 'P7', 'P8', 'F9'].map(
                (grade) => (
                  <th
                    key={grade}
                    style={{
                      border: '1px solid black',
                      padding: '4px',
                      textAlign: 'center',
                      background: '#f0f0f0',
                    }}
                  >
                    {grade}
                  </th>
                )
              )}
            </tr>
            <tr>
              <th
                style={{
                  border: '1px solid black',
                  padding: '4px',
                  textAlign: 'center',
                  background: '#f0f0f0',
                }}
              >
                Descriptive
              </th>
              {[
                'Excellent',
                'Very Good',
                'Good',
                'Satisfactory',
                'Below Avg.',
                'Below Avg.',
                'Cause For Concern',
                'Cause For Concern',
                'Fail',
              ].map((desc) => (
                <td
                  key={desc}
                  style={{
                    border: '1px solid black',
                    padding: '4px',
                    textAlign: 'center',
                  }}
                >
                  {desc}
                </td>
              ))}
            </tr>
            <tr>
              <th
                style={{
                  border: '1px solid black',
                  padding: '4px',
                  textAlign: 'center',
                  background: '#f0f0f0',
                }}
              >
                Ranges
              </th>
              {[
                '90% - 100%',
                '75% - 89%',
                '70% - 74%',
                '60% - 69%',
                '55% - 59%',
                '50% - 54%',
                '40% - 49%',
                '30% - 39%',
                '0% - 29%',
              ].map((range) => (
                <td
                  key={range}
                  style={{
                    border: '1px solid black',
                    padding: '4px',
                    textAlign: 'center',
                  }}
                >
                  {range}
                </td>
              ))}
            </tr>
          </table>
        </div>

        {/* Attendance */}
        <div style={{ marginBottom: '0.5cm' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '12pt',
            }}
          >
            <tr>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                Expected attendance
              </td>
              <td
                style={{
                  border: '1px solid black',
                  padding: '8px',
                  width: '2cm',
                }}
              >
                100
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}>
                Actual attendance
              </td>
              <td
                style={{
                  border: '1px solid black',
                  padding: '8px',
                  width: '2cm',
                }}
              >
                {currentStudent.attendance}
              </td>
            </tr>
          </table>
        </div>

        {/* Comments */}
        <div style={{ marginBottom: '0.5cm' }}>
          <table
            style={{
              width: '100%',
              borderCollapse: 'collapse',
              fontSize: '12pt',
            }}
          >
            <tr>
              <th
                style={{
                  border: '1px solid black',
                  padding: '8px',
                  textAlign: 'left',
                  width: '25%',
                  height: '2em',
                  background: '#f0f0f0',
                }}
              >
                General Comments
              </th>
              <td
                style={{
                  border: '1px solid black',
                  padding: '8px',
                  minHeight: '2em',
                }}
              >
                {calculateAverage() >= 75
                  ? 'Commendable performance. Well done!'
                  : 'Encouraged to work harder next term.'}
              </td>
              <th
                style={{
                  border: '1px solid black',
                  padding: '8px',
                  textAlign: 'left',
                  width: '25%',
                  background: '#f0f0f0',
                }}
              >
                Signature
              </th>
            </tr>
            <tr>
              <th
                style={{
                  border: '1px solid black',
                  padding: '8px',
                  textAlign: 'left',
                  height: '2em',
                  width: '30%',
                  background: '#f0f0f0',
                }}
              >
                Class Teacher's Comments
              </th>
              <td
                style={{
                  border: '1px solid black',
                  padding: '8px',
                  minHeight: '2em',
                }}
              >
                {currentStudent.behavior === 'Excellent'
                  ? 'Outstanding student with excellent behavior and academic performance.'
                  : currentStudent.behavior === 'Good'
                  ? 'Good student who participates well in class activities.'
                  : 'Shows potential but needs more focus and dedication.'}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}></td>
            </tr>
            <tr>
              <th
                style={{
                  border: '1px solid black',
                  padding: '8px',
                  textAlign: 'left',
                  height: '2em',
                  background: '#f0f0f0',
                }}
              >
                Head Teacher's Comments
              </th>
              <td
                style={{
                  border: '1px solid black',
                  padding: '8px',
                  minHeight: '2em',
                }}
              >
                {calculateAverage() >= 75
                  ? 'Commendable performance. Keep it up!'
                  : 'Work harder to improve performance.'}
              </td>
              <td style={{ border: '1px solid black', padding: '8px' }}></td>
            </tr>
          </table>
        </div>

        {/* Footer Logo */}
        <div
          style={{
            position: 'absolute',
            bottom: '0.5cm',
            right: '1cm',
            fontSize: '14px',
            fontStyle: 'italic',
            color: '#666',
          }}
        >
          adera
        </div>
      </div>
    );
  };

  const handlePrevious = () => {
    if (currentStudentIndex > 0) {
      setCurrentStudentIndex(currentStudentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentStudentIndex < reportData.students.length - 1) {
      setCurrentStudentIndex(currentStudentIndex + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <button
                onClick={onBack}
                className="flex items-center gap-2 px-4 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
              >
                <ArrowLeft size={16} />
                Go Back
              </button>

              <div>
                <h1 className="text-lg font-semibold text-gray-900">
                  Preview Reports
                </h1>
                <div className="flex gap-2 mt-1">
                  <select
                    className="text-xs bg-gray-100 border border-gray-300 rounded px-2 py-1"
                    value={academicYear}
                    readOnly
                  >
                    <option value="2024">2024</option>
                  </select>
                  <select
                    className="text-xs bg-gray-100 border border-gray-300 rounded px-2 py-1"
                    value={term}
                    readOnly
                  >
                    <option value="Term 1">Term 1</option>
                  </select>
                </div>
              </div>
            </div>

            <button
              onClick={onDownloadAll}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
            >
              <Download size={16} />
              Generate Reports
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex">
        {/* Sidebar */}
        <div className="flex-shrink-0 w-80 p-6">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-4">
                Select Student
              </h3>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center text-white font-medium">
                  {currentStudent.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')}
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {currentStudent.name}
                  </div>
                  <div className="text-sm text-gray-500">
                    {currentStudent.className}
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500">
                  ({currentStudentIndex + 1} of {reportData.students.length})
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={handlePrevious}
                    disabled={currentStudentIndex === 0}
                    className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <button
                    onClick={handleNext}
                    disabled={
                      currentStudentIndex === reportData.students.length - 1
                    }
                    className="p-1 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>

            {/* Page Toggle */}
            <div className="border-t pt-4">
              <div className="flex bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setCurrentPage('cover')}
                  className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                    currentPage === 'cover'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Cover Page
                </button>
                <button
                  onClick={() => setCurrentPage('report')}
                  className={`flex-1 px-3 py-2 text-sm rounded-md transition-colors ${
                    currentPage === 'report'
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Report Card
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-6">
          <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
            <div
              className="p-6 bg-white"
              style={{
                width: '21cm',
                minHeight: '29.7cm',
                margin: '0 auto',
                transform: 'scale(0.6)',
                transformOrigin: 'top left',
                boxSizing: 'border-box',
              }}
            >
              {currentPage === 'cover'
                ? generateCoverPage()
                : generateReportCard()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportPreview;
