import React, { useEffect, useState } from 'react';
import './Students.css';
import ContentBox from '../../../components/ContentBox/ContentBox';
import StudentIcon from '../../../assets/student.png';
import { Trash2, Plus } from 'lucide-react';
import SearchIcon from '../../../assets/search-1.svg';

// Mock data representing registered students
const students = [
  {
    name: 'Derrick Mugisha',
    id: 'BAI21912',
    class: 'S3E',
    subjects: ['ENG', 'MAT', 'BIO', 'CHE', 'HIS', 'PHY', 'PSY'],
  },
  {
    name: 'Sharon Nansubuga',
    id: 'KYA20194',
    class: 'S2N',
    subjects: ['ENG', 'MAT', 'GEO', 'LIT', 'BIO', 'CHE', 'HIS'],
  },
  {
    name: 'Ivan Lwanga',
    id: 'NTU14856',
    class: 'S1S',
    subjects: ['HIS', 'MAT', 'CHE', 'PHY', 'KIS', 'PSY'],
  },
  {
    name: 'Prisca Namutebi',
    id: 'JJA38271',
    class: 'S4W',
    subjects: ['MAT', 'ENG', 'BIO', 'CHE', 'FRE'],
  },
  {
    name: 'Julius Okello',
    id: 'GUL93247',
    class: 'S3N',
    subjects: ['ENG', 'CHE', 'GEO', 'HIS', 'AGR'],
  },
  {
    name: 'Maria Atuhairwe',
    id: 'MBR74019',
    class: 'S2E',
    subjects: ['ENG', 'BIO', 'HIS', 'LIT', 'MAT'],
  },
  {
    name: 'Brian Kaggwa',
    id: 'KLA12097',
    class: 'S1W',
    subjects: ['PHY', 'MAT', 'ENG', 'CHE', 'BIO'],
  },
  {
    name: 'Faith Nakayenga',
    id: 'ENT39824',
    class: 'S4S',
    subjects: ['ENG', 'BIO', 'CHE', 'HIS', 'GEO'],
  },
];

function Students() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hues, setHues] = useState([]);
  const [subjectHues, setSubjectHues] = useState({});
  const [selectedAll, setSelectedAll] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const generatedHues = students.map(() => Math.floor(Math.random() * 361));
    setHues(generatedHues);

    const subjectHueMap = {};
    students.forEach((student, sIndex) => {
      subjectHueMap[sIndex] = student.subjects.map(() =>
        Math.floor(Math.random() * 361)
      );
    });
    setSubjectHues(subjectHueMap);
  }, []);

  const handleSelectAll = () => {
    if (students.length > 0) {
      setSelectedAll(true);
      const sorted = [...students].sort((a, b) => a.name.localeCompare(b.name));
      const firstIndex = students.findIndex(
        (student) => student.name === sorted[0].name
      );
      setSelectedIndex(firstIndex);
    }
  };

  const selectedStudent = students[selectedIndex];

  const handleAddStudent = () => {
    if (inputValue.trim()) {
      console.log('Adding student:', inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAddStudent();
  };

  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="body-container">
      <ContentBox contentHeading="Manage Students">
        <div className="students-content-container text-gray-800">
          {/* LEFT PANEL - All students */}
          <div className="all-students">
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">All Students</h2>
              <div className="student-search-bar">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img
                  src={SearchIcon}
                  alt="Search-Icon"
                  className="student-search-icon"
                />
              </div>
            </div>

            <div className="add-student-container">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add new student"
                className="add-student-input"
              />
              <button
                onClick={handleAddStudent}
                className="add-student-button"
                disabled={!inputValue.trim()}
              >
                <Plus className="plus-icon" size={20} />
              </button>
            </div>

            <div
              className="student-info-container font-semibold cursor-pointer"
              onClick={handleSelectAll}
              style={{ background: 'rgba(0, 0, 0, 0.05)' }}
            >
              <input
                type="checkbox"
                checked={selectedAll}
                readOnly
                className="custom-checkbox"
              />
              <div>Student Name</div>
              <div>ID</div>
              <div>Class</div>
            </div>

            <div className="space-y-2 student-list">
              {filteredStudents.map((student, index) => {
                const originalIndex = students.findIndex(
                  (s) => s.id === student.id
                );
                const hue = hues[originalIndex];
                const gradientStyle =
                  hue !== undefined
                    ? {
                        background: `linear-gradient(to right, hsla(${hue}, 30%, 35%, 0.15), hsla(${hue}, 30%, 65%, 0.15))`,
                        border:
                          selectedIndex === originalIndex
                            ? '2px solid #00b341'
                            : '1px solid #d1d5db',
                      }
                    : {};

                return (
                  <div
                    key={originalIndex}
                    className="student-info-container"
                    onClick={() => {
                      setSelectedIndex(originalIndex);
                      setSelectedAll(false);
                    }}
                    style={gradientStyle}
                  >
                    <input
                      type="checkbox"
                      checked={selectedAll || selectedIndex === originalIndex}
                      readOnly
                      className="custom-checkbox"
                    />
                    <span
                      className="text-sm font-medium"
                      style={{ color: '#404040' }}
                    >
                      {student.name}
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: '#404040' }}
                    >
                      {student.id}
                    </span>
                    <span
                      className="text-sm font-medium"
                      style={{ color: '#404040' }}
                    >
                      {student.class}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANEL - Selected student profile */}
          <div>
            <div className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center h-[550px] w-[360px]">
              <img
                src={StudentIcon}
                alt="Student-Icon"
                style={{ height: '150px', width: '150px' }}
              />
              <h3
                className="text-black font-semibold mb-1"
                style={{ color: '#262626', fontSize: '24px' }}
              >
                {selectedStudent.name}
              </h3>
              <p
                className="mb-4"
                style={{ color: '#262626', fontSize: '16px' }}
              >
                {selectedStudent.class}
              </p>
              <div className="flex flex-wrap justify-center gap-2 mb-[35px] w-[250px] mt-[20px]">
                {selectedStudent.subjects.map((subj, idx) => {
                  const subjHue = subjectHues[selectedIndex]?.[idx];
                  const style =
                    subjHue !== undefined
                      ? {
                          backgroundColor: `hsla(${subjHue}, 70%, 80%, 0.3)`,
                          color: `hsl(${subjHue}, 30%, 20%)`,
                          fontSize: '12px',
                        }
                      : {};

                  return (
                    <span
                      key={idx}
                      style={style}
                      className="text-sm px-3 py-1 rounded-[5px]"
                    >
                      {subj}
                    </span>
                  );
                })}
              </div>
              <button className="bg-black text-white px-4 py-2 rounded-md mb-3 w-[180px]">
                Edit Profile
              </button>
              <div className="flex flex-row justify-between items-end w-full h-[200px]">
                <p className="text-xs text-gray-400 mb-1">
                  Student ID: {selectedStudent.id} <br /> Profile Modified:
                  20/03/2025
                </p>
                <button className="text-red-500 mt-4">
                  <Trash2 />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ContentBox>
    </div>
  );
}

export default Students;
