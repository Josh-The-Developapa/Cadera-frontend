import React, { useEffect, useState } from 'react';
import './Students.css';
import ContentBox from '../../../components/ContentBox/ContentBox';
import StudentIcon from '../../../assets/student.png';
import { Trash2, Plus, Edit } from 'lucide-react'; // Added Edit icon
import SearchIcon from '../../../assets/search-1.svg';
import CreateStudentsModal from '../../../components/CreateStudentsModal/StudentsModal.jsx';
import EditStudentsModal from '../../../components/EditStudentsModal/StudentsModal.jsx'; // Assuming this is the correct path

// Mock data representing registered students
import students from './StudentsData.js';

function Students() {
  // ==================== STATE MANAGEMENT ====================
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [subjectHues, setSubjectHues] = useState({});
  const [selectedAll, setSelectedAll] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false); // State for create modal
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // State for edit modal
  const [editingStudent, setEditingStudent] = useState(null); // State to hold the student being edited
  const [studentsList, setStudentsList] = useState(students);

  // ==================== EFFECTS ====================
  useEffect(() => {
    const subjectHueMap = {};
    studentsList.forEach((student, sIndex) => {
      subjectHueMap[sIndex] = student.subjects.map(() =>
        Math.floor(Math.random() * 361)
      );
    });
    setSubjectHues(subjectHueMap);
  }, [studentsList]);

  // ==================== EVENT HANDLERS ====================
  const handleSelectAll = () => {
    if (studentsList.length > 0) {
      setSelectedAll(true);
      const sorted = [...studentsList].sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      const firstIndex = studentsList.findIndex(
        (student) => student.name === sorted[0].name
      );
      setSelectedIndex(firstIndex);
    }
  };

  const handleStudentSelect = (originalIndex) => {
    setSelectedIndex(originalIndex);
    setSelectedAll(false);
  };

  // --- Create Modal Handlers ---
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateStudent = (newStudentData) => {
    const newId = `ST${(studentsList.length + 1).toString().padStart(3, '0')}`;
    const newStudent = {
      id: newId,
      name: newStudentData.name,
      class: newStudentData.class,
      subjects: newStudentData.subjects,
      dateOfBirth: newStudentData.dateOfBirth,
    };
    const updatedList = [...studentsList, newStudent];
    setStudentsList(updatedList);
    setSelectedIndex(updatedList.length - 1); // Select the new student
  };

  // --- Edit Modal Handlers ---
  const handleOpenEditModal = (studentToEdit) => {
    setEditingStudent(studentToEdit);
    setIsEditModalOpen(true);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditingStudent(null);
  };

  const handleUpdateStudent = (updatedStudentData) => {
    setStudentsList((prevStudents) =>
      prevStudents.map((student) =>
        student.id === updatedStudentData.id ? updatedStudentData : student
      )
    );
    // Optionally, you can find the index of the updated student and keep it selected
    const updatedIndex = studentsList.findIndex(
      (s) => s.id === updatedStudentData.id
    );
    setSelectedIndex(updatedIndex);
    handleCloseEditModal(); // Close modal after update
  };

  // ==================== COMPUTED VALUES ====================
  const selectedStudent = studentsList[selectedIndex];
  const filteredStudents = studentsList.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // ==================== RENDER FUNCTIONS ====================
  const renderListHeader = () => (
    <div className="students-header">
      <h2 className="students-title">All Students</h2>
      <div className="header-controls">
        <button className="add-student-btn" onClick={handleOpenCreateModal}>
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
            const originalIndex = studentsList.findIndex(
              (s) => s.id === student.id
            );
            const isSelected = selectedIndex === originalIndex;

            const baseColor = index % 2 === 0 ? '#FAFAFA' : '#F6FCFD';
            const selectedColor = index % 2 === 0 ? '#e9e9e9' : '#b2e3eb';

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

  const renderStudentProfile = () => {
    if (!selectedStudent) return null;

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

        <button
          onClick={() => handleOpenEditModal(selectedStudent)}
          className="bg-black text-white px-4 py-2 rounded-md mb-3 w-[180px] flex items-center justify-center gap-2"
        >
          <Edit size={16} />
          Edit Profile
        </button>

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
            {renderStudentTable()}
          </div>
          {renderStudentProfile()}
        </div>
      </ContentBox>

      {/* Create Student Modal */}
      <CreateStudentsModal
        isOpen={isCreateModalOpen}
        onClose={handleCloseCreateModal}
        onCreateStudent={handleCreateStudent}
      />

      {/* Edit Student Modal */}
      {editingStudent && (
        <EditStudentsModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onUpdateStudent={handleUpdateStudent}
          studentData={editingStudent}
        />
      )}
    </div>
  );
}

export default Students;
