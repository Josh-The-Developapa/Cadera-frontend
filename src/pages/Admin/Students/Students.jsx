import React, { useEffect, useState } from 'react';
import './Students.css';
import ContentBox from '../../../components/ContentBox/ContentBox';
import StudentIcon from '../../../assets/student.png';
import { Trash2, Plus, Edit, Loader, AlertCircle } from 'lucide-react';
import SearchIcon from '../../../assets/search-1.svg';
import CreateStudentsModal from '../../../components/CreateStudentsModal/StudentsModal.jsx';
import EditStudentsModal from '../../../components/EditStudentsModal/StudentsModal.jsx';
import { api, APIError } from '../../../utils/apiFetch';

function Students() {
  // ==================== STATE MANAGEMENT ====================
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [subjectHues, setSubjectHues] = useState({});
  const [selectedAll, setSelectedAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentsList, setStudentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);

  // ==================== API FUNCTIONS ====================
  const fetchStudents = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.get('/students');
      
      // Transform the data to match your existing component structure
      const transformedStudents = data.map(student => ({
        id: student.id,
        name: student.name,
        class: student.class ? `${student.class.level}-${student.class.stream}` : 'Unknown',
        dateOfBirth: student.dob,
        parentEmails: student.parentEmails || [],
        classId: student.classId,
        // Extract subjects from subject records
        subjects: student.subjectRecords?.map(record => record.subject.name) || []
      }));
      
      setStudentsList(transformedStudents);
      
      // Auto-select first student if available
      if (transformedStudents.length > 0 && selectedIndex >= transformedStudents.length) {
        setSelectedIndex(0);
      }
    } catch (err) {
      console.error('Error fetching students:', err);
      const errorMessage = err instanceof APIError 
        ? err.message 
        : 'Failed to load students. Please try again.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const fetchClasses = async () => {
    try {
      const data = await api.get('/students/classes');
      setClasses(data);
    } catch (err) {
      console.error('Error fetching classes:', err);
      // Non-critical error, don't show to user but log it
    }
  };

  const fetchSubjects = async () => {
    try {
      const data = await api.get('/students/subjects');
      setSubjects(data);
    } catch (err) {
      console.error('Error fetching subjects:', err);
      // Non-critical error, don't show to user but log it
    }
  };

  const createStudent = async (studentData) => {
    try {
      setActionLoading(true);
      const newStudent = await api.post('/students', {
        name: studentData.name,
        dob: studentData.dateOfBirth,
        classId: studentData.classId,
        parentEmails: studentData.parentEmails || [],
      });
      
      // Transform the response to match component structure
      const transformedStudent = {
        id: newStudent.id,
        name: newStudent.name,
        class: newStudent.class ? `${newStudent.class.level}-${newStudent.class.stream}` : 'Unknown',
        dateOfBirth: newStudent.dob,
        parentEmails: newStudent.parentEmails || [],
        classId: newStudent.classId,
        subjects: studentData.subjects || []
      };
      
      setStudentsList(prev => [...prev, transformedStudent]);
      setSelectedIndex(studentsList.length); // Select the new student
      
      return newStudent;
    } catch (err) {
      console.error('Error creating student:', err);
      const errorMessage = err instanceof APIError 
        ? err.message 
        : 'Failed to create student. Please try again.';
      throw new Error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  const updateStudent = async (id, studentData) => {
    try {
      setActionLoading(true);
      const updatedStudent = await api.patch(`/students/${id}`, {
        name: studentData.name,
        dob: studentData.dateOfBirth,
        classId: studentData.classId,
        parentEmails: studentData.parentEmails || [],
      });
      
      // Transform and update in local state
      const transformedStudent = {
        id: updatedStudent.id,
        name: updatedStudent.name,
        class: updatedStudent.class ? `${updatedStudent.class.level}-${updatedStudent.class.stream}` : 'Unknown',
        dateOfBirth: updatedStudent.dob,
        parentEmails: updatedStudent.parentEmails || [],
        classId: updatedStudent.classId,
        subjects: studentData.subjects || []
      };
      
      setStudentsList(prev => 
        prev.map(student => student.id === id ? transformedStudent : student)
      );
      
      return updatedStudent;
    } catch (err) {
      console.error('Error updating student:', err);
      const errorMessage = err instanceof APIError 
        ? err.message 
        : 'Failed to update student. Please try again.';
      throw new Error(errorMessage);
    } finally {
      setActionLoading(false);
    }
  };

  // ==================== EFFECTS ====================
  useEffect(() => {
    const initializeData = async () => {
      await Promise.all([
        fetchStudents(),
        fetchClasses(),
        fetchSubjects()
      ]);
    };
    
    initializeData();
  }, []);

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

  const handleRefresh = () => {
    fetchStudents();
  };

  // --- Create Modal Handlers ---
  const handleOpenCreateModal = () => {
    setIsCreateModalOpen(true);
  };

  const handleCloseCreateModal = () => {
    setIsCreateModalOpen(false);
  };

  const handleCreateStudent = async (newStudentData) => {
    try {
      await createStudent(newStudentData);
      handleCloseCreateModal();
    } catch (err) {
      // Error is already logged, you might want to show a toast notification here
      throw err; // Re-throw so modal can handle it
    }
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

  const handleUpdateStudent = async (updatedStudentData) => {
    try {
      await updateStudent(updatedStudentData.id, updatedStudentData);
      handleCloseEditModal();
    } catch (err) {
      // Error is already logged, you might want to show a toast notification here
      throw err; // Re-throw so modal can handle it
    }
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
        <button 
          className="add-student-btn" 
          onClick={handleOpenCreateModal}
          disabled={actionLoading}
        >
          {actionLoading ? <Loader className="animate-spin" size={16} /> : <Plus size={16} />}
          Add New Student
        </button>
        <div className="student-search-bar">
          <input
            type="text"
            placeholder="Search students..."
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

  const renderStudentTable = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center p-8">
          <Loader className="animate-spin" size={24} />
          <span className="ml-2">Loading students...</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col justify-center items-center p-8 text-red-600 bg-red-50 rounded-lg mx-4">
          <div className="flex items-center mb-3">
            <AlertCircle size={20} className="mr-2" />
            <span className="font-medium">Error Loading Students</span>
          </div>
          <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
          <button 
            onClick={handleRefresh}
            disabled={loading}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
          >
            {loading ? <Loader className="animate-spin" size={16} /> : null}
            Try Again
          </button>
        </div>
      );
    }

    if (filteredStudents.length === 0) {
      return (
        <div className="flex justify-center items-center p-8 text-gray-500">
          {searchQuery 
            ? `No students found matching "${searchQuery}".` 
            : 'No students found. Add your first student!'}
        </div>
      );
    }

    return (
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
                  key={student.id}
                  onClick={() => handleStudentSelect(originalIndex)}
                  style={{
                    backgroundColor: isSelected ? selectedColor : baseColor,
                    transition: 'all 0.2s ease-in-out',
                    height: '32px',
                    cursor: 'pointer',
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
  };

  const renderStudentProfile = () => {
    if (loading) {
      return (
        <div className="bg-white rounded-xl shadow-md p-10 flex flex-col justify-center items-center h-[70vh] max-h-[615px] min-h-[450px] min-w-[360px] w-[331px]">
          <Loader className="animate-spin" size={32} />
          <div className="mt-4 text-gray-500">Loading profile...</div>
        </div>
      );
    }

    if (!selectedStudent) {
      return (
        <div className="bg-white rounded-xl shadow-md p-10 flex flex-col justify-center items-center h-[70vh] max-h-[615px] min-h-[450px] min-w-[360px] w-[331px]">
          <div className="text-gray-500 text-center">
            {studentsList.length === 0 ? 'Add a student to get started' : 'Select a student to view profile'}
          </div>
        </div>
      );
    }

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
          {selectedStudent.subjects.length === 0 ? (
            <span className="text-sm text-gray-400 italic">No subjects assigned</span>
          ) : (
            selectedStudent.subjects.map((subj, idx) => {
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
            })
          )}
        </div>

        <button
          onClick={() => handleOpenEditModal(selectedStudent)}
          disabled={actionLoading}
          className="bg-black text-white px-4 py-2 rounded-md mb-3 w-[180px] flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {actionLoading ? <Loader className="animate-spin" size={16} /> : <Edit size={16} />}
          Edit Profile
        </button>

        <div className="flex flex-row justify-between items-end w-full h-[200px]">
          <p className="text-xs text-gray-400 mb-1">
            Student ID: {selectedStudent.id} <br />
            Profile Modified: {new Date().toLocaleDateString()}
          </p>
          <button className="text-red-500 mt-4" disabled={actionLoading}>
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
        classes={classes}
        subjects={subjects}
        loading={actionLoading}
      />

      {/* Edit Student Modal */}
      {editingStudent && (
        <EditStudentsModal
          isOpen={isEditModalOpen}
          onClose={handleCloseEditModal}
          onUpdateStudent={handleUpdateStudent}
          studentData={editingStudent}
          classes={classes}
          subjects={subjects}
          loading={actionLoading}
        />
      )}
    </div>
  );
}

export default Students;
