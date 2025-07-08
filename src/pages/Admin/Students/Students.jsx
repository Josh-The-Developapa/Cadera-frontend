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
  const [hues, setHues] = useState([]);
  const [subjectHues, setSubjectHues] = useState({});
  const [selectedAll, setSelectedAll] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // ==================== EFFECTS ====================
  // Generate random hues for students and their subjects on component mount
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

  // ==================== EVENT HANDLERS ====================
  // Handle selecting all students
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

  // Handle adding a new student
  const handleAddStudent = () => {
    if (inputValue.trim()) {
      console.log('Adding student:', inputValue);
      setInputValue('');
    }
  };

  // Handle enter key press in add student input
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleAddStudent();
  };

  // Handle individual student selection
  const handleStudentSelect = (originalIndex) => {
    setSelectedIndex(originalIndex);
    setSelectedAll(false);
  };

  // ==================== COMPUTED VALUES ====================
  const selectedStudent = students[selectedIndex];

  // Filter students based on search query
  const filteredStudents = students.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==================== RENDER FUNCTIONS ====================
  // Render student list header
  const renderStudentListHeader = () => (
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

  // Render student list column headers
  const renderStudentListHeaders = () => (
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
  );

  // Render individual student row
  const renderStudentRow = (student, index) => {
    const originalIndex = students.findIndex((s) => s.id === student.id);
    const backgroundColor = index % 2 === 0 ? '#FAFAFA' : '#F6FCFD';
    const isSelected = selectedIndex === originalIndex;

    const style = {
      background: backgroundColor,
      border: isSelected ? '2px solid' : '1px solid #d1d5db',
      borderImage: isSelected
        ? 'linear-gradient(to right, #007EA7, #00BF76) 1'
        : '',
    };

    return (
      <div
        key={originalIndex}
        className="student-info-container"
        onClick={() => handleStudentSelect(originalIndex)}
        style={style}
      >
        <input
          type="checkbox"
          checked={selectedAll || isSelected}
          readOnly
          className="custom-checkbox"
        />
        <span className="text-sm font-medium" style={{ color: '#404040' }}>
          {student.name}
        </span>
        <span className="text-sm font-medium" style={{ color: '#404040' }}>
          {student.id}
        </span>
        <span className="text-sm font-medium" style={{ color: '#404040' }}>
          {student.class}
        </span>
      </div>
    );
  };

  // Render student list
  const renderStudentList = () => (
    <div className="space-y-2 student-list">
      {filteredStudents.map((student, index) =>
        renderStudentRow(student, index)
      )}
    </div>
  );

  // Render student profile avatar and basic info
  const renderStudentProfileHeader = () => (
    <>
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
      <p className="mb-4" style={{ color: '#262626', fontSize: '16px' }}>
        {selectedStudent.class}
      </p>
    </>
  );

  // Render student subjects with colored tags
  const renderStudentSubjects = () => (
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
  );

  // Render student profile footer with actions
  const renderStudentProfileFooter = () => (
    <div className="flex flex-row justify-between items-end w-full h-[200px]">
      <p className="text-xs text-gray-400 mb-1">
        Student ID: {selectedStudent.id} <br />
        Profile Modified: 20/03/2025
      </p>
      <button className="text-red-500 mt-4">
        <Trash2 />
      </button>
    </div>
  );

  // Render left panel with all students
  const renderLeftPanel = () => (
    <div className="all-students">
      {renderStudentListHeader()}
      {renderAddStudentSection()}
      {renderStudentListHeaders()}
      {renderStudentList()}
    </div>
  );

  // Render right panel with selected student profile
  const renderRightPanel = () => (
    <div>
      <div className="bg-white rounded-xl shadow-md p-15 flex flex-col items-center h-[600px] min-w-[360px]">
        {renderStudentProfileHeader()}
        {renderStudentSubjects()}
        <button className="bg-black text-white px-4 py-2 rounded-md mb-3 w-[180px]">
          Edit Profile
        </button>
        {renderStudentProfileFooter()}
      </div>
    </div>
  );

  // ==================== MAIN RENDER ====================
  return (
    <div className="body-container">
      <ContentBox contentHeading="Manage Students">
        <div className="students-content-container text-gray-800">
          {renderLeftPanel()}
          {renderRightPanel()}
        </div>
      </ContentBox>
    </div>
  );
}

export default Students;
