import React, { useEffect, useState, useMemo, useCallback } from 'react';
import './Students.css';
import ContentBox from '../../../components/ContentBox/ContentBox';
import StudentIcon from '../../../assets/student.png';
import { Trash2, Plus, Edit, Loader, AlertCircle } from 'lucide-react';
import SearchIcon from '../../../assets/search-1.svg';
import CreateStudentsModal from './Modals/CreateStudent/CreateStudent.jsx';
import EditStudentsModal from './Modals/EditStudent/EditStudent.jsx';
import { api, APIError } from '../../../utils/apiFetch';
import { FixedSizeList as List } from 'react-window';

// ==================== STUDENT TABLE COMPONENT ====================
// Handles displaying the list of students with virtualization for performance.
// Uses divs instead of table/tr/td to allow react-window optimization.
// Accepts selected states, search query, loading/error states, and callbacks for selection.
const StudentTable = React.memo(function StudentTable({
  loading,
  error,
  filteredStudents,
  selectedAll,
  selectedIndex,
  onSelectAll,
  onSelectStudent,
  searchQuery,
  onRefresh,
}) {
  // Loading state: show spinner and message
  if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <Loader className="animate-spin" size={24} />
        <span className="ml-2">Loading students...</span>
      </div>
    );
  }

  // Error state: display error message and retry button
  if (error) {
    return (
      <div className="flex flex-col justify-center items-center p-8 text-red-600 bg-red-50 rounded-lg mx-4">
        <div className="flex items-center mb-3">
          <AlertCircle size={20} className="mr-2" />
          <span className="font-medium">Error Loading Students</span>
        </div>
        <p className="text-sm text-red-500 mb-4 text-center">{error}</p>
        <button
          onClick={onRefresh}
          disabled={loading}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 disabled:opacity-50 flex items-center gap-2"
        >
          {loading ? <Loader className="animate-spin" size={16} /> : null}
          Try Again
        </button>
      </div>
    );
  }

  // Empty state: no students found
  if (filteredStudents.length === 0) {
    return (
      <div className="flex justify-center items-center p-8 text-gray-500">
        {searchQuery
          ? `No students found matching "${searchQuery}".`
          : 'No students found. Add your first student!'}
      </div>
    );
  }

  // Row renderer: used by react-window to render each visible student
  const Row = ({ index, style }) => {
    const student = filteredStudents[index];
    const isSelected = selectedIndex === student.originalIndex;

    // Row colors for alternating rows and selected state
    const baseColor = index % 2 === 0 ? '#FAFAFA' : '#F6FCFD';
    const selectedColor = index % 2 === 0 ? '#e9e9e9' : '#b2e3eb';

    return (
      <div
        style={{
          ...style,
          backgroundColor: isSelected ? selectedColor : baseColor,
          marginBottom: '8px', // spacing between rows
          height: '32px', // fixed row height
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          paddingLeft: '16px',
          paddingRight: '16px',
          fontSize: '13px',
          fontWeight: '300',
        }}
        className="student-row"
        onClick={() => onSelectStudent(student.originalIndex)}
      >
        {/* Checkbox for selection */}
        <div className="w-[48px] flex justify-center items-center">
          <input
            type="checkbox"
            checked={selectedAll || isSelected}
            readOnly
            className="custom-checkbox"
          />
        </div>
        {/* Student name */}
        <div className="flex-1 text-left pl-2">{student.name}</div>
        {/* Student ID */}
        <div className="flex-1 text-center">{student.id}</div>
        {/* Student class */}
        <div className="flex-1 text-center">{student.class}</div>
      </div>
    );
  };

  return (
    <div className="student-list">
      {/* Table header: fixed, not virtualized */}
      <div className="student-table-header flex mb-2 items-center px-4 h-[32px]">
        <div className="w-[48px] flex justify-center items-center">
          <input
            type="checkbox"
            checked={selectedAll}
            readOnly
            className="custom-checkbox"
            onClick={onSelectAll}
          />
        </div>
        <div className="flex-1 text-left pl-2">Name</div>
        <div className="flex-1 text-center">Class</div>
        <div className="flex-1 text-center">SPC</div>
      </div>

      {/* Virtualized list of students */}
      <List
        height={400} // container height
        itemCount={filteredStudents.length} // total items
        itemSize={40} // row height + spacing
        width="100%"
      >
        {Row}
      </List>
    </div>
  );
});

// ==================== STUDENT PROFILE COMPONENT ====================
// Shows selected student's profile including name, class, subjects, and actions
const StudentProfile = React.memo(function StudentProfile({
  loading,
  student,
  subjectHues,
  onEdit,
  actionLoading,
}) {
  // Loading state: show spinner
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10 flex flex-col justify-center items-center h-[73vh] max-h-[484px] min-h-[450px] min-w-[360px] w-[331px]">
        <Loader className="animate-spin" size={32} />
        <div className="mt-4 text-gray-500">Loading profile...</div>
      </div>
    );
  }

  // Empty state: no student selected
  if (!student) {
    return (
      <div className="bg-white rounded-xl shadow-md p-10 flex flex-col justify-center items-center h-[70vh] max-h-[484px] min-h-[450px] min-w-[360px] w-[331px]">
        <div className="text-gray-500 text-center">No student selected</div>
      </div>
    );
  }

  // Profile view
  return (
    <div
      className="bg-white rounded-xl shadow-md p-10 flex flex-col justify-center items-center h-[70vh] max-h-[484px] min-h-[450px] min-w-[360px] w-[331px] pt-[50px]"
      style={{ boxShadow: '2px 6px 15px rgba(0, 0, 0, 0.1)' }}
    >
      <img
        src={StudentIcon}
        alt="Student-Icon"
        style={{ height: '114px', width: '114px' }}
      />
      <h3 className="profile-name">{student.name}</h3>
      <p className="profile-class">{student.class}</p>

      {/* Subjects list with dynamic colors */}
      <div className="flex flex-wrap justify-center gap-2 mb-[35px] w-[250px] mt-[17px]">
        {student.subjects.length === 0 ? (
          <span className="text-sm text-gray-400 italic">
            No subjects assigned
          </span>
        ) : (
          student.subjects.map((subj, idx) => {
            const subjHue = subjectHues[student.id]?.[idx];
            return (
              <span
                key={idx}
                style={{
                  backgroundColor: `hsla(${subjHue}, 70%, 80%, 0.3)`,
                  color: `hsl(${subjHue}, 30%, 20%)`,
                  fontSize: '12px',
                }}
                className="text-sm px-3 py-1 rounded-[5px]"
              >
                {subj}
              </span>
            );
          })
        )}
      </div>

      {/* Edit button */}
      <button
        onClick={() => onEdit(student)}
        disabled={actionLoading}
        className="bg-black hover:bg-gray-800 cursor-pointer text-white px-4 py-2 rounded-md mb-3 w-[180px] flex items-center justify-center gap-2 disabled:opacity-50"
      >
        {actionLoading ? (
          <Loader className="animate-spin" size={16} />
        ) : (
          <Edit size={16} />
        )}
        Edit Profile
      </button>

      {/* Footer: ID and delete button */}
      <div className="flex flex-row justify-between items-end w-full h-[200px]">
        <p className="text-xs text-gray-400 mb-1">
          Student ID: {student.id} <br />
          Profile Modified: {new Date().toLocaleDateString()}
        </p>
        <button className="text-red-500 mt-4" disabled={actionLoading}>
          <Trash2 />
        </button>
      </div>
    </div>
  );
});

// ==================== MAIN COMPONENT ====================
// Combines table and profile, handles API fetching, search, modals, and selection
function Students() {
  // ==================== STATE ====================
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedAll, setSelectedAll] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState(null);
  const [studentsList, setStudentsList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [classes, setClasses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [actionLoading, setActionLoading] = useState(false);
  const [subjectHues, setSubjectHues] = useState({});

  // ==================== DEBOUNCE SEARCH ====================
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedQuery(searchQuery), 200);
    return () => clearTimeout(handler);
  }, [searchQuery]);

  // ==================== API CALLS ====================
  const fetchStudents = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.get('/students');
      const transformed = data.map((student) => {
        const subjects =
          student.subjectRecords?.map((r) => r.subject.name) || [];
        return {
          id: student.id,
          name: student.name,
          class: student.class
            ? `${student.class.level}-${student.class.stream}`
            : 'Unknown',
          dateOfBirth: student.dob,
          parentEmails: student.parentEmails || [],
          classId: student.classId,
          subjects,
          subjectHues: subjects.map(() => Math.floor(Math.random() * 361)),
        };
      });
      setStudentsList(transformed);
    } catch (err) {
      setError(
        err instanceof APIError ? err.message : 'Failed to load students.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchClasses = useCallback(async () => {
    try {
      setClasses(await api.get('/students/classes'));
    } catch {}
  }, []);

  const fetchSubjects = useCallback(async () => {
    try {
      setSubjects(await api.get('/students/subjects'));
    } catch {}
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    Promise.all([fetchStudents(), fetchClasses(), fetchSubjects()]);
  }, [fetchStudents, fetchClasses, fetchSubjects]);

  // ==================== MEMOIZED VALUES ====================
  // Map student IDs to indices for easy lookup
  const studentIndexMap = useMemo(() => {
    const map = new Map();
    studentsList.forEach((s, i) => map.set(s.id, i));
    return map;
  }, [studentsList]);

  // Filter students by debounced search query
  const filteredStudents = useMemo(() => {
    return studentsList
      .filter((student) =>
        student.name.toLowerCase().includes(debouncedQuery.toLowerCase())
      )
      .map((student) => ({
        ...student,
        originalIndex: studentIndexMap.get(student.id),
      }));
  }, [studentsList, debouncedQuery, studentIndexMap]);

  const selectedStudent = useMemo(
    () => studentsList[selectedIndex],
    [studentsList, selectedIndex]
  );

  // ==================== EVENT HANDLERS ====================
  const handleSelectAll = useCallback(() => {
    setSelectedAll(true);
    if (studentsList.length) setSelectedIndex(0);
  }, [studentsList]);

  const handleStudentSelect = useCallback((index) => {
    setSelectedIndex(index);
    setSelectedAll(false);
  }, []);

  const handleOpenEditModal = useCallback((student) => {
    setEditingStudent(student);
    setIsEditModalOpen(true);
  }, []);

  return (
    <div className="body-container">
      <ContentBox contentHeading="Manage Students">
        <div className="students-content-container text-gray-800">
          <div className="all-students">
            {/* Header with search and add button */}
            <div className="students-header">
              <h2 className="students-title">All Students</h2>
              <div className="header-controls">
                <button
                  className="add-student-btn"
                  onClick={() => setIsCreateModalOpen(true)}
                  disabled={actionLoading}
                >
                  {actionLoading ? (
                    <Loader className="animate-spin" size={16} />
                  ) : (
                    <Plus size={16} />
                  )}
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

            {/* Virtualized student table */}
            <StudentTable
              loading={loading}
              error={error}
              filteredStudents={filteredStudents}
              selectedAll={selectedAll}
              selectedIndex={selectedIndex}
              onSelectAll={handleSelectAll}
              onSelectStudent={handleStudentSelect}
              searchQuery={searchQuery}
              onRefresh={fetchStudents}
            />
          </div>

          {/* Selected student profile */}
          <StudentProfile
            loading={loading}
            student={selectedStudent}
            subjectHues={subjectHues}
            onEdit={handleOpenEditModal}
            actionLoading={actionLoading}
          />
        </div>
      </ContentBox>

      {/* Create student modal */}
      <CreateStudentsModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateStudent={() => {}}
        classes={classes}
        subjects={subjects}
        loading={actionLoading}
      />

      {/* Edit student modal */}
      {editingStudent && (
        <EditStudentsModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          onUpdateStudent={() => {}}
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
