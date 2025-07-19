import React, { useEffect, useState } from 'react';
import './Students.css';
import ContentBox from '../../../components/ContentBox/ContentBox';
import StudentIcon from '../../../assets/student.png';
import { Trash2, Plus } from 'lucide-react';
import SearchIcon from '../../../assets/search-1.svg';

// Mock data representing registered students
import students from './StudentsData.js';

function Students() {
  // ==================== STATE MANAGEMENT ====================
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [subjectHues, setSubjectHues] = useState({});
  const [selectedAll, setSelectedAll] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // ==================== EFFECTS ====================
  // Generate random hues for student subjects on component mount
  useEffect(() => {
    const subjectHueMap = {};
    students.forEach((student, sIndex) => {
      subjectHueMap[sIndex] = student.subjects.map(() =>
        Math.floor(Math.random() * 361)
      );
    });
    setSubjectHues(subjectHueMap);
  }, []);

  // ==================== EVENT HANDLERS ====================
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

  const handleAddStudent = () => {
    if (inputValue.trim()) {
      console.log('Adding student:', inputValue);
      setInputValue('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAddStudent();
  };

  const handleStudentSelect = (originalIndex) => {
    setSelectedIndex(originalIndex);
    setSelectedAll(false);
  };

  // ==================== COMPUTED VALUES ====================
  const selectedStudent = students[selectedIndex];
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==================== RENDER FUNCTIONS ====================
  // Render student list header with search
  const renderListHeader = () => (
    <div className="students-header">
      <h2 className="students-title">All Students</h2>
      <div className="header-controls">
        <button className="add-student-btn">
          <Plus size={16} />
          Add New Student
        </button>
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
    </div>
  );

  // Render add student input section
  const renderAddStudentSection = () => (
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
  );

  // Render the entire student table
  const renderStudentTable = () => (
    <div className="student-list">
      <table className="student-table">
        <thead>
          <tr onClick={handleSelectAll}>
            <th>
              <input
                type="checkbox"
                checked={selectedAll}
                readOnly
                className="custom-checkbox"
              />
            </th>
            <th>Name</th>
            <th>Student ID</th>
            <th>Class</th>
          </tr>
        </thead>
        <tbody>
          {filteredStudents.map((student, index) => {
            const originalIndex = students.findIndex(
              (s) => s.id === student.id
            );
            const isSelected = selectedIndex === originalIndex;

            const baseColor =
              index % 2 === 0
                ? 'hsla(189, 64%, 95%, 1)'
                : 'hsla(0, 0%, 98%, 1)';
            const selectedColor =
              index % 2 === 0
                ? 'hsla(189, 64%, 85%, 1)'
                : 'hsla(0, 0%, 85%, 1)';

            return (
              <tr
                key={originalIndex}
                onClick={() => handleStudentSelect(originalIndex)}
                style={{
                  backgroundColor: isSelected ? selectedColor : baseColor,
                  transition: 'all 0.2s ease-in-out',
                  height: '32px',
                }}
                className="student-row"
              >
                <td className="rounded-left">
                  <input
                    type="checkbox"
                    checked={selectedAll || isSelected}
                    readOnly
                    className="custom-checkbox"
                  />
                </td>
                <td>{student.name}</td>
                <td>{student.id}</td>
                <td className="rounded-right">{student.class}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  // Render student profile details
  const renderStudentProfile = () => {
    if (!selectedStudent) return null; // Handle case where no student is selected

    return (
      <div
        className="bg-white rounded-xl shadow-md p-10 flex flex-col justify-center items-center h-[70vh] max-h-[615px] min-h-[450px] min-w-[360px] w-[331px] pt-[50px]"
        style={{ boxShadow: '2px 6px 15px rgba(0, 0, 0, 0.1)' }}
      >
        <img
          src={StudentIcon}
          alt="Student-Icon"
          style={{ height: '114px', width: '114px', margin: 0 }}
        />
        <h3 className="profile-name">{selectedStudent.name}</h3>
        <p className="profile-class">{selectedStudent.class}</p>

        {/* Subjects */}
        <div className="flex flex-wrap justify-center gap-2 mb-[35px] w-[250px] mt-[17px]">
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

        {/* Footer */}
        <div className="flex flex-row justify-between items-end w-full h-[200px]">
          <p className="text-xs text-gray-400 mb-1">
            Student ID: {selectedStudent.id} <br />
            Profile Modified: 16/07/2025
          </p>
          <button className="text-red-500 mt-4">
            <Trash2 />
          </button>
        </div>
      </div>
    );
  };

  // ==================== MAIN RENDER ====================
  return (
    <div className="body-container">
      <ContentBox contentHeading="Manage Students">
        <div className="students-content-container text-gray-800">
          <div className="all-students">
            {renderListHeader()}
            {/* {renderAddStudentSection()} */}
            {renderStudentTable()}
          </div>
          {renderStudentProfile()}
        </div>
      </ContentBox>
    </div>
  );
}

export default Students;
