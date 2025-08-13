import React, { useState } from 'react';
import { ChevronRight, ChevronDown, ArrowLeft, Edit } from 'lucide-react';
import ContentBox from '../../../../components/ContentBox/ContentBox';
import './Performance.css';
import { Link, useParams } from 'react-router-dom';

// Mock data for students and subjects
const mockSubjects = [
  { name: 'French', color: 'bg-green-100 border-l-4 border-l-green-500' },
  { name: 'English', color: 'bg-gray-100' },
  { name: 'Mathematics', color: 'bg-gray-100' },
  { name: 'Science', color: 'bg-gray-100' },
  { name: 'SST', color: 'bg-gray-100' },
  { name: 'History', color: 'bg-gray-100' },
];

const mockStudents = [
  { name: 'Kevin Kent Asiimwe', reading: 12, writing: 12, listening: 12 },
  { name: 'Sarah Johnson', reading: 15, writing: 14, listening: 13 },
  { name: 'Michael Chen', reading: 18, writing: 16, listening: 17 },
  { name: 'Emma Wilson', reading: 11, writing: 13, listening: 12 },
  { name: 'David Brown', reading: 19, writing: 18, listening: 20 },
  { name: 'Lisa Garcia', reading: 14, writing: 15, listening: 14 },
  { name: 'James Miller', reading: 16, writing: 17, listening: 15 },
  { name: 'Anna Davis', reading: 13, writing: 12, listening: 14 },
  { name: 'Robert Taylor', reading: 17, writing: 16, listening: 18 },
];

// Left Sidebar Component
const SubjectSidebar = ({ subjects, selectedSubject, setSelectedSubject }) => (
  <aside
    className="md:w-48 flex-shrink-0 h-[73vh] max-h-[484px] min-h-[450px] w-[142px] p-[30px] pr-0"
    style={{
      background: '#FFFFFFB2',
      boxShadow: '2px 6px 15px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
    }}
  >
    <nav className="space-y-2">
      {subjects.map((subject) => (
        <div
          key={subject.name}
          className={`nav-link-div ${
            selectedSubject === subject.name ? 'active' : ''
          }`}
        >
          <button
            onClick={() => setSelectedSubject(subject.name)}
            className={`nav-icon-link  ${
              selectedSubject === subject.name
                ? 'bg-gradient-to-r from-[#C16CE2] to-[#CB9136] text-transparent bg-clip-text'
                : 'nav-link-text'
            }`}
          >
            {subject.name}
          </button>
        </div>
      ))}
    </nav>
  </aside>
);

// Main Content Component
const StudentPerformanceTable = ({ selectedTerm, students }) => {
  const [selectedStudent, setSelectedStudent] = useState(null);

  const calculateAverage = (student) => {
    return Math.round(
      (student.reading + student.writing + student.listening) / 3
    );
  };

  const getTermData = (student) => {
    if (selectedTerm === 'All') {
      return {
        reading: student.reading,
        writing: student.writing,
        listening: student.listening,
        average: calculateAverage(student),
        final: calculateAverage(student),
      };
    }
    // For specific terms, we'll use the same data but could vary it
    return {
      reading:
        student.reading +
        (selectedTerm === 'Term 1' ? 0 : selectedTerm === 'Term 2' ? 1 : 2),
      writing:
        student.writing +
        (selectedTerm === 'Term 1' ? 0 : selectedTerm === 'Term 2' ? -1 : 1),
      listening:
        student.listening +
        (selectedTerm === 'Term 1' ? 0 : selectedTerm === 'Term 2' ? 1 : -1),
      average: calculateAverage(student),
      final: calculateAverage(student),
    };
  };

  return (
    <div className="bg-white rounded-xl overflow-scroll h-[90%]">
      <table className="w-full h-[100%]">
        <thead>
          <tr className="bg-gray-50 border-b border-gray-200">
            <th className="text-left px-6 py-4 text-[14px] font-[400] text-gray-700">
              Name
            </th>
            <th className="text-center px-6 py-4 text-[14px] font-[400] text-gray-700">
              Reading
            </th>
            <th className="text-center px-6 py-4 text-[14px] font-[400] text-gray-700">
              Writing
            </th>
            <th className="text-center px-6 py-4 text-[14px] font-[400] text-gray-700">
              Listening
            </th>
            <th className="text-center px-6 py-4 text-[14px] font-[400] text-gray-700">
              Avg.
            </th>
            <th className="text-center px-6 py-4 text-[14px] font-[400] text-gray-700">
              Final
            </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => {
            const termData = getTermData(student);
            const isEven = index % 2 === 0;
            const isSelected = selectedStudent === index;

            return (
              <tr
                key={index}
                onClick={() => setSelectedStudent(isSelected ? null : index)}
                className="border-b border-gray-100 cursor-pointer transition-colors duration-200"
                style={{
                  backgroundColor: isSelected
                    ? isEven
                      ? 'hsla(189, 64%, 85%, 1)'
                      : 'hsla(0, 0%, 85%, 1)'
                    : isEven
                    ? 'hsla(189, 64%, 98%, 1)'
                    : 'hsla(0, 0%, 98%, 1)',
                }}
                onMouseEnter={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = isEven
                      ? 'hsla(189, 64%, 95%, 1)'
                      : 'hsla(0, 0%, 95%, 1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isSelected) {
                    e.currentTarget.style.backgroundColor = isEven
                      ? 'hsla(189, 64%, 98%, 1)'
                      : 'hsla(0, 0%, 98%, 1)';
                  }
                }}
              >
                <td className="px-[24px] py-[9px] text-[14px] font-[300] text-gray-800">
                  {student.name}
                </td>
                <td className="px-6 py-[9px] text-[14px] font-[300] text-center text-gray-600">
                  {termData.reading}
                </td>
                <td className="px-6 py-[9px] text-[14px] font-[300] text-center text-gray-600">
                  {termData.writing}
                </td>
                <td className="px-6 py-[9px] text-[14px] font-[300] text-center text-gray-600">
                  {termData.listening}
                </td>
                <td className="px-6 py-[9px] text-[14px] font-[300] text-center text-gray-600">
                  {termData.average}
                </td>
                <td className="px-6 py-[9px] text-sm text-center text-[14px] font-[300] text-gray-800">
                  {termData.final}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

// Main Performance Component
const Performance = () => {
  const { class_name } = useParams();
  const [selectedSubject, setSelectedSubject] = useState('French');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [showYearDropdown, setShowYearDropdown] = useState(false);
  const [showTermDropdown, setShowTermDropdown] = useState(false);

  const years = ['2024', '2023', '2022'];
  const terms = ['Term 1', 'Term 2', 'Term 3', 'All'];
  return (
    <div className="body-container">
      {/* Content Box */}
      <ContentBox
        contentHeading={
          <span>
            <Link to="/grades" style={{ color: '#A6A6A6' }}>
              Grades
            </Link>
            <ChevronRight
              className="inline w-5 h-5 mx-1 align-middle mb-[2px] ml-[4px]"
              strokeWidth={3}
              style={{ color: '#A6A6A6' }}
            />
            <span className="font-[500]">{class_name}</span>
            <ChevronRight
              className="inline w-5 h-5 mx-1 align-middle mb-[2px] ml-[4px]"
              strokeWidth={3}
              style={{ color: '#A6A6A6' }}
            />
            <span className="font-[500]">Student Performance</span>
          </span>
        }
      >
        {/* Main Content */}
        <div className="grades-main-content flex flex-col md:flex-row gap-[16px] mt-[30px]">
          {/* Left Sidebar */}
          <SubjectSidebar
            subjects={mockSubjects}
            selectedSubject={selectedSubject}
            setSelectedSubject={setSelectedSubject}
          />

          {/* Right Content */}
          <div className="grades-right-panel p-[24px]">
            {/* Header with dropdowns and buttons */}
            <div className="flex justify-between items-center mb-[23px]">
              {/* Year and Term Dropdowns */}
              <div className="flex items-center space-x-2">
                {/* Year Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowYearDropdown(!showYearDropdown)}
                    className="flex items-center space-x-1 text-sm font-[400] text-gray-600 bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <span>{selectedYear}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  {showYearDropdown && (
                    <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[80px]">
                      {years.map((year) => (
                        <button
                          key={year}
                          onClick={() => {
                            setSelectedYear(year);
                            setShowYearDropdown(false);
                          }}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {year}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Term Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowTermDropdown(!showTermDropdown)}
                    className="flex items-center space-x-1 text-sm font-[400] text-gray-600 bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200 transition-colors"
                  >
                    <span>{selectedTerm}</span>
                    <ChevronDown className="w-4 h-4" />
                  </button>
                  {showTermDropdown && (
                    <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-md shadow-lg z-10 min-w-[100px]">
                      {terms.map((term) => (
                        <button
                          key={term}
                          onClick={() => {
                            setSelectedTerm(term);
                            setShowTermDropdown(false);
                          }}
                          className="block w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          {term}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 text-gray-600 bg-gray-100 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors">
                  <ArrowLeft className="w-4 h-4" />
                  <span>Back to Overview</span>
                </button>
                <button className="flex items-center space-x-2 bg-[#007ea8] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                  <Edit className="w-4 h-4" />
                  <span>Edit</span>
                </button>
              </div>
            </div>

            {/* Student Performance Table */}
            <StudentPerformanceTable
              selectedTerm={selectedTerm}
              students={mockStudents}
            />
          </div>
        </div>
      </ContentBox>
    </div>
  );
};

export default Performance;
