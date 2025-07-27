import React, { useState, useContext } from 'react';
import Context from '../../Context/Context';
import {
  X,
  User,
  Check,
  BadgeCheck,
  UserPen,
  CalendarDays,
  SearchIcon,
  Plus,
  Minus,
  ChevronLeft,
  ChevronRight,
  Users,
  BookOpen,
  School,
} from 'lucide-react';

// Mock data for teachers and students
const MOCK_TEACHERS = [
  {
    id: 1,
    name: 'Emmanuel Asiimwe',
    avatar: 'https://i.pravatar.cc/150?img=1',
    classes: 12,
  },
  {
    id: 2,
    name: 'Joshua Mukisa',
    avatar: 'https://i.pravatar.cc/150?img=2',
    classes: 8,
  },
  {
    id: 3,
    name: 'Kevin Porter',
    avatar: 'https://i.pravatar.cc/150?img=3',
    classes: 15,
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    avatar: 'https://i.pravatar.cc/150?img=4',
    classes: 10,
  },
  {
    id: 5,
    name: 'Michael Chen',
    avatar: 'https://i.pravatar.cc/150?img=5',
    classes: 14,
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    avatar: 'https://i.pravatar.cc/150?img=6',
    classes: 9,
  },
];

const MOCK_STUDENTS = [
  {
    id: 1,
    name: 'Kevin Kent Asiimwe',
    studentId: 'FAS341',
    subjects: ['HIS', 'GEO', 'MAT'],
  },
  {
    id: 2,
    name: 'Alice Johnson',
    studentId: 'STU001',
    subjects: ['CHE', 'BIO', 'PHY'],
  },
  {
    id: 3,
    name: 'Bob Wilson',
    studentId: 'STU002',
    subjects: ['KIS', 'FRE', 'ENG'],
  },
  {
    id: 4,
    name: 'Carol Davis',
    studentId: 'STU003',
    subjects: ['HIS', 'MAT', 'ENG'],
  },
  {
    id: 5,
    name: 'David Brown',
    studentId: 'STU004',
    subjects: ['GEO', 'CHE', 'BIO'],
  },
  {
    id: 6,
    name: 'Emma Taylor',
    studentId: 'STU005',
    subjects: ['PHY', 'MAT', 'FRE'],
  },
];

const ALL_SUBJECTS = [
  'HIS',
  'GEO',
  'MAT',
  'CHE',
  'BIO',
  'PHY',
  'KIS',
  'FRE',
  'ENG',
];

const CreateClassModal = ({ isOpen, onClose, onCreateClass }) => {
  const context = useContext(Context);

  // Modal state
  const [currentStep, setCurrentStep] = useState(0);
  const [showSuccess, setShowSuccess] = useState(false);

  // Form data
  const [className, setClassName] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [availableSubjects, setAvailableSubjects] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null); // For subject selection

  // Search states
  const [teacherSearch, setTeacherSearch] = useState('');
  const [studentSearch, setStudentSearch] = useState('');
  const [addedStudentSearch, setAddedStudentSearch] = useState('');

  // Filter functions
  const filteredTeachers = MOCK_TEACHERS.filter((teacher) =>
    teacher.name.toLowerCase().includes(teacherSearch.toLowerCase())
  );

  const filteredStudents = MOCK_STUDENTS.filter(
    (student) =>
      student.name.toLowerCase().includes(studentSearch.toLowerCase()) &&
      !selectedStudents.find((s) => s.id === student.id)
  );

  const filteredAddedStudents = selectedStudents.filter((student) =>
    student.name.toLowerCase().includes(addedStudentSearch.toLowerCase())
  );

  // Handler functions
  const handleTeacherToggle = (teacher) => {
    setSelectedTeachers((prev) => {
      const isSelected = prev.find((t) => t.id === teacher.id);
      if (isSelected) {
        return prev.filter((t) => t.id !== teacher.id);
      } else {
        return [...prev, teacher];
      }
    });
  };

  const handleStudentSelect = (student) => {
    setSelectedStudent(student);
  };

  const handleSubjectToggle = (subject) => {
    if (!selectedStudent) return;

    setSelectedStudent((prev) => {
      const hasSubject = prev.subjects.includes(subject);
      const newSubjects = hasSubject
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject];

      return { ...prev, subjects: newSubjects };
    });
  };

  const handleAddStudent = () => {
    if (!selectedStudent) return;

    setSelectedStudents((prev) => [...prev, selectedStudent]);

    // Update available subjects
    const allSubjects = new Set(availableSubjects);
    selectedStudent.subjects.forEach((subject) => allSubjects.add(subject));
    setAvailableSubjects(Array.from(allSubjects));

    setSelectedStudent(null);
  };

  const handleRemoveStudent = (studentId) => {
    setSelectedStudents((prev) => {
      const newStudents = prev.filter((s) => s.id !== studentId);

      // Update available subjects based on remaining students
      const allSubjects = new Set();
      newStudents.forEach((student) => {
        student.subjects.forEach((subject) => allSubjects.add(subject));
      });
      setAvailableSubjects(Array.from(allSubjects));

      return newStudents;
    });
  };

  const handleNext = () => {
    if (currentStep < 2) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleCreateClass = () => {
    const newClassData = {
      name: className,
      level: classLevel,
      teachers: selectedTeachers,
      students: selectedStudents,
      subjects: availableSubjects,
    };

    setShowSuccess(true);
    onCreateClass(newClassData);

    setTimeout(() => {
      setShowSuccess(false);
      resetForm();
      onClose();
    }, 2000);
  };

  const resetForm = () => {
    setCurrentStep(0);
    setClassName('');
    setClassLevel('');
    setSelectedTeachers([]);
    setSelectedStudents([]);
    setAvailableSubjects([]);
    setSelectedStudent(null);
    setTeacherSearch('');
    setStudentSearch('');
    setAddedStudentSearch('');
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  // Validation functions
  const isStep1Valid = selectedTeachers.length > 0;
  const isStep2Valid = selectedStudents.length > 0;
  const isStep3Valid = className.trim() && classLevel.trim();

  if (!isOpen) return null;

  // Render Step 1: Add Teachers
  const renderStep1 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '13px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{ fontWeight: '600', color: '#111827', fontSize: '14px' }}
          >
            1.
          </span>
          <span
            style={{
              fontWeight: '500',
              color: '#111827',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            Add Teachers
            {isStep1Valid && <BadgeCheck size={16} stroke="#00BF76" />}
          </span>
        </div>
      </div>

      <div
        style={{
          border: '1px solid #a6a6a6',
          padding: '24px',
          borderRadius: '10px',
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '12px',
          }}
        >
          <span
            style={{ fontSize: '13px', fontWeight: '500', color: '#374151' }}
          >
            Select Teachers ({selectedTeachers.length} Selected)
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              background: '#f5f5f5',
              borderRadius: '5px',
              padding: '5px 10px',
              height: '34px',
            }}
          >
            <input
              type="text"
              placeholder="Search"
              value={teacherSearch}
              onChange={(e) => setTeacherSearch(e.target.value)}
              style={{
                border: 'none',
                background: 'transparent',
                outline: 'none',
                fontWeight: '300',
                fontSize: '14px',
                color: '#707070',
                width: '80px',
              }}
            />
            <SearchIcon
              style={{
                cursor: 'pointer',
                height: '14px',
                width: '14px',
                color: '#959595',
              }}
            />
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: '0 12px 4px 52px',
            fontSize: '14px',
            fontWeight: '400',
            color: '#6b7280',
            borderBottom: '1px solid hsl(220, 13%, 91%)',
            marginBottom: '8px',
          }}
        >
          <span>Name</span>
          <span>Classes</span>
        </div>

        <div
          style={{
            maxHeight: '300px',
            overflowY: 'auto',
            paddingRight: '4px',
            flex: 1,
          }}
        >
          {filteredTeachers.map((teacher, index) => {
            const isSelected = selectedTeachers.find(
              (t) => t.id === teacher.id
            );
            return (
              <div
                key={teacher.id}
                onClick={() => handleTeacherToggle(teacher)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '8px',
                  borderRadius: '8px',
                  marginBottom: '4px',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s ease',
                  border: '1px solid transparent',
                  backgroundColor: index % 2 === 0 ? '#f6fcfd' : '#fafafa',
                }}
              >
                <div
                  style={{
                    width: '16px',
                    height: '16px',
                    border:
                      '1.5px solid ' + (isSelected ? '#404040' : '#d1d5db'),
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '12px',
                    flexShrink: 0,
                    transition: 'all 0.2s ease',
                    color: isSelected ? '#404040' : 'transparent',
                  }}
                >
                  {isSelected && <Check size={8} />}
                </div>
                <img
                  src={teacher.avatar}
                  alt={teacher.name}
                  style={{
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    marginRight: '12px',
                  }}
                />
                <span
                  style={{
                    flexGrow: 1,
                    fontSize: '14px',
                    fontWeight: '300',
                    color: '#737373',
                  }}
                >
                  {teacher.name}
                </span>
                <span
                  style={{
                    fontSize: '14px',
                    fontWeight: '300',
                    color: '#737373',
                    width: '60px',
                    textAlign: 'center',
                  }}
                >
                  {teacher.classes}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  // Render Step 2: Add Students (Three Column Layout)
  const renderStep2 = () => (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ marginBottom: '13px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{ fontWeight: '600', color: '#111827', fontSize: '14px' }}
          >
            2.
          </span>
          <span
            style={{
              fontWeight: '500',
              color: '#111827',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '5px',
            }}
          >
            Add Students
            {isStep2Valid && <BadgeCheck size={16} stroke="#00BF76" />}
          </span>
        </div>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          gap: '16px',
          height: '100%',
          flex: 1,
        }}
      >
        {/* Left Column - New Students */}
        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}
            >
              New Students
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f5f5f5',
                borderRadius: '4px',
                padding: '4px 8px',
                height: '28px',
              }}
            >
              <input
                type="text"
                placeholder="Search"
                value={studentSearch}
                onChange={(e) => setStudentSearch(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '12px',
                  color: '#707070',
                  width: '60px',
                }}
              />
              <SearchIcon size={12} style={{ color: '#959595' }} />
            </div>
          </div>

          <div style={{ padding: '8px 12px 4px 12px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                fontWeight: '400',
                color: '#6b7280',
                paddingBottom: '4px',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <span>Name</span>
              <span>Student ID</span>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '4px 8px',
            }}
          >
            {filteredStudents.map((student, index) => (
              <div
                key={student.id}
                onClick={() => handleStudentSelect(student)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '8px',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  backgroundColor:
                    selectedStudent?.id === student.id
                      ? '#e0f2fe'
                      : index % 2 === 0
                      ? '#f9fafb'
                      : 'white',
                  border:
                    selectedStudent?.id === student.id
                      ? '1px solid #0ea5e9'
                      : '1px solid transparent',
                  marginBottom: '2px',
                  transition: 'all 0.2s ease',
                }}
              >
                <span style={{ fontSize: '12px', color: '#374151' }}>
                  {student.name}
                </span>
                <span style={{ fontSize: '12px', color: '#6b7280' }}>
                  {student.studentId}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Middle Column - Select Subjects */}
        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #e5e7eb',
              textAlign: 'center',
            }}
          >
            <span
              style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}
            >
              Select Subjects
            </span>
          </div>

          {selectedStudent ? (
            <div style={{ padding: '16px', flex: 1 }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginBottom: '16px',
                  padding: '8px',
                  backgroundColor: '#f8fafc',
                  borderRadius: '6px',
                }}
              >
                <div
                  style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: '#64748b',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginRight: '8px',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '500',
                  }}
                >
                  {selectedStudent.name.charAt(0)}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: '13px',
                      fontWeight: '500',
                      color: '#374151',
                    }}
                  >
                    {selectedStudent.name}
                  </div>
                  <div style={{ fontSize: '11px', color: '#6b7280' }}>
                    {selectedStudent.studentId}
                  </div>
                </div>
              </div>

              <div style={{ marginBottom: '16px' }}>
                <div
                  style={{
                    fontSize: '12px',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '8px',
                  }}
                >
                  Available Subjects
                </div>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr 1fr',
                    gap: '8px',
                  }}
                >
                  {ALL_SUBJECTS.map((subject) => {
                    const isSelected =
                      selectedStudent.subjects.includes(subject);
                    return (
                      <div
                        key={subject}
                        onClick={() => handleSubjectToggle(subject)}
                        style={{
                          padding: '6px 8px',
                          border: `1px solid ${
                            isSelected ? '#10b981' : '#d1d5db'
                          }`,
                          borderRadius: '4px',
                          textAlign: 'center',
                          cursor: 'pointer',
                          backgroundColor: isSelected ? '#10b981' : 'white',
                          color: isSelected ? 'white' : '#374151',
                          fontSize: '11px',
                          fontWeight: '500',
                          transition: 'all 0.2s ease',
                        }}
                      >
                        {subject}
                      </div>
                    );
                  })}
                </div>
              </div>

              <button
                onClick={handleAddStudent}
                disabled={selectedStudent.subjects.length === 0}
                style={{
                  width: '100%',
                  padding: '8px 16px',
                  backgroundColor:
                    selectedStudent.subjects.length > 0 ? '#10b981' : '#9ca3af',
                  color: 'white',
                  border: 'none',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '500',
                  cursor:
                    selectedStudent.subjects.length > 0
                      ? 'pointer'
                      : 'not-allowed',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '4px',
                }}
              >
                <Plus size={14} />
                Add Student
              </button>
            </div>
          ) : (
            <div
              style={{
                flex: 1,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#6b7280',
                fontSize: '13px',
                textAlign: 'center',
                padding: '20px',
              }}
            >
              Select a student from the left to choose their subjects
            </div>
          )}
        </div>

        {/* Right Column - Added Students */}
        <div
          style={{
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <div
            style={{
              padding: '12px 16px',
              borderBottom: '1px solid #e5e7eb',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <span
              style={{ fontSize: '14px', fontWeight: '500', color: '#374151' }}
            >
              ({selectedStudents.length} Added)
            </span>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                background: '#f5f5f5',
                borderRadius: '4px',
                padding: '4px 8px',
                height: '28px',
              }}
            >
              <input
                type="text"
                placeholder="Search"
                value={addedStudentSearch}
                onChange={(e) => setAddedStudentSearch(e.target.value)}
                style={{
                  border: 'none',
                  background: 'transparent',
                  outline: 'none',
                  fontSize: '12px',
                  color: '#707070',
                  width: '60px',
                }}
              />
              <SearchIcon size={12} style={{ color: '#959595' }} />
            </div>
          </div>

          <div style={{ padding: '8px 12px 4px 12px' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                fontSize: '12px',
                fontWeight: '400',
                color: '#6b7280',
                paddingBottom: '4px',
                borderBottom: '1px solid #e5e7eb',
              }}
            >
              <span>Name</span>
              <span>Student ID</span>
            </div>
          </div>

          <div
            style={{
              flex: 1,
              overflowY: 'auto',
              padding: '4px 8px',
            }}
          >
            {filteredAddedStudents.map((student, index) => (
              <div
                key={student.id}
                style={{
                  padding: '8px',
                  borderRadius: '4px',
                  backgroundColor: index % 2 === 0 ? '#f9fafb' : 'white',
                  marginBottom: '2px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '4px',
                  }}
                >
                  <span
                    style={{
                      fontSize: '12px',
                      color: '#374151',
                      fontWeight: '500',
                    }}
                  >
                    {student.name}
                  </span>
                  <button
                    onClick={() => handleRemoveStudent(student.id)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ef4444',
                      cursor: 'pointer',
                      padding: '2px',
                      borderRadius: '2px',
                    }}
                  >
                    <X size={12} />
                  </button>
                </div>
                <div
                  style={{
                    fontSize: '10px',
                    color: '#6b7280',
                    marginBottom: '4px',
                  }}
                >
                  {student.studentId}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2px' }}>
                  {student.subjects.map((subject, i) => (
                    <span
                      key={i}
                      style={{
                        fontSize: '8px',
                        padding: '1px 4px',
                        backgroundColor: '#10b981',
                        color: 'white',
                        borderRadius: '2px',
                      }}
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Render Step 3: Class Details & Preview
  const renderStep3 = () => {
    const randomHue = Math.floor(Math.random() * 361);

    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          height: '100%',
        }}
      >
        {/* Left Side - Class Details Form */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontWeight: '600',
                  color: '#111827',
                  fontSize: '14px',
                }}
              >
                3.
              </span>
              <span
                style={{
                  fontWeight: '500',
                  color: '#111827',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                }}
              >
                Class Details
                {isStep3Valid && <BadgeCheck size={16} stroke="#00BF76" />}
              </span>
            </div>
          </div>

          <div
            style={{
              border: '1px solid #a6a6a6',
              padding: '24px',
              borderRadius: '10px',
              flex: 1,
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#374151',
                  marginBottom: '6px',
                }}
              >
                Class Name
              </label>
              <div style={{ position: 'relative' }}>
                <School
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    zIndex: 1,
                  }}
                  size={16}
                />
                <input
                  type="text"
                  value={className}
                  onChange={(e) => setClassName(e.target.value)}
                  placeholder="Enter Class Name"
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 40px',
                    border: '1px solid #737373',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '300',
                    color: '#737373',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <label
                style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '400',
                  color: '#374151',
                  marginBottom: '6px',
                }}
              >
                Class Level
              </label>
              <div style={{ position: 'relative' }}>
                <span
                  style={{
                    position: 'absolute',
                    left: '12px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#9ca3af',
                    zIndex: 1,
                    fontSize: '16px',
                    fontWeight: 'bold',
                  }}
                >
                  #
                </span>
                <input
                  type="text"
                  value={classLevel}
                  onChange={(e) => setClassLevel(e.target.value)}
                  placeholder="Enter Number (0-9)"
                  style={{
                    width: '100%',
                    padding: '9px 12px 9px 40px',
                    border: '1px solid #737373',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '300',
                    color: '#737373',
                    backgroundColor: 'white',
                    transition: 'all 0.2s ease',
                    outline: 'none',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Preview */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div style={{ marginBottom: '13px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span
                style={{
                  fontWeight: '600',
                  color: '#111827',
                  fontSize: '14px',
                }}
              >
                4.
              </span>
              <span
                style={{
                  fontWeight: '500',
                  color: '#111827',
                  fontSize: '14px',
                }}
              >
                Preview
              </span>
            </div>
          </div>

          <div
            style={{
              background: `hsl(${randomHue}, 20%, 50%)`,
              borderRadius: '12px',
              padding: '24px',
              color: 'white',
              textAlign: 'center',
              marginBottom: '16px',
              minHeight: '120px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <h2 style={{ fontSize: '32px', fontWeight: '600', margin: 0 }}>
              {className || 'Class Name'}
            </h2>
          </div>

          <div
            style={{
              background: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              padding: '16px',
            }}
          >
            <div style={{ marginBottom: '16px' }}>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#6b7280',
                  margin: '0 0 8px 0',
                }}
              >
                Teachers
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {selectedTeachers.slice(0, 3).map((teacher, idx) => (
                  <div
                    key={idx}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '48px',
                    }}
                  >
                    <img
                      src={teacher.avatar}
                      alt={teacher.name}
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        marginBottom: '4px',
                      }}
                    />
                    <p
                      style={{
                        fontSize: '8px',
                        textAlign: 'center',
                        margin: 0,
                        color: '#6b7280',
                      }}
                    >
                      {teacher.name.split(' ')[0]}
                    </p>
                  </div>
                ))}
                {selectedTeachers.length > 3 && (
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      width: '48px',
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: `hsl(${randomHue}, 20%, 50%)`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '10px',
                        fontWeight: '300',
                        marginBottom: '4px',
                      }}
                    >
                      +{selectedTeachers.length - 3}
                    </div>
                    <p
                      style={{
                        fontSize: '8px',
                        textAlign: 'center',
                        margin: 0,
                        color: '#6b7280',
                      }}
                    >
                      Others
                    </p>
                  </div>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '16px' }}>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#6b7280',
                  margin: '0 0 8px 0',
                }}
              >
                Subjects
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
                {availableSubjects.map((subject, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '10px',
                      padding: '2px 6px',
                      backgroundColor: '#f3f4f6',
                      border: '1px solid #e5e7eb',
                      borderRadius: '3px',
                      color: '#374151',
                    }}
                  >
                    {subject}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p
                style={{
                  fontSize: '12px',
                  fontWeight: '500',
                  color: '#6b7280',
                  margin: '0 0 4px 0',
                }}
              >
                Students
              </p>
              <div
                style={{
                  backgroundColor: '#f9fafb',
                  padding: '8px',
                  borderRadius: '6px',
                  textAlign: 'center',
                }}
              >
                <p
                  style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: '#111827',
                    margin: 0,
                  }}
                >
                  {selectedStudents.length}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className="modal-backdrop"
      style={{
        left: context.isExpanded ? '170px' : '70px',
      }}
    >
      {!showSuccess ? (
        <div
          style={{
            width: '900px',
            height: '600px',
            background: 'white',
            borderRadius: '12px',
            boxShadow:
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          {/* Header */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingTop: '16px',
              paddingLeft: '24px',
              paddingRight: '24px',
            }}
          >
            <h2
              style={{
                fontSize: '18px',
                fontWeight: '500',
                color: '#111827',
                margin: 0,
              }}
            >
              Create New Class
            </h2>
            <button
              onClick={handleClose}
              style={{
                background: 'none',
                border: 'none',
                color: '#bf4040',
                cursor: 'pointer',
                padding: '4px',
                borderRadius: '4px',
                transition: 'all 0.2s ease',
              }}
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div style={{ flex: 1, padding: '24px', overflow: 'hidden' }}>
            <div style={{ height: '100%' }}>
              {currentStep === 0 && renderStep1()}
              {currentStep === 1 && renderStep2()}
              {currentStep === 2 && renderStep3()}
            </div>
          </div>

          {/* Footer */}
          <div
            style={{
              padding: '16px 32px 24px',
              borderTop: '1px solid #f3f4f6',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
              }}
            >
              {currentStep > 0 && (
                <button
                  onClick={handleBack}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: 'none',
                    border: '1px solid #d1d5db',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    color: '#374151',
                  }}
                >
                  <ChevronLeft size={16} />
                  Back
                </button>
              )}
              <span style={{ fontSize: '14px', color: '#6b7280' }}>
                Step {currentStep + 1} of 3
              </span>
            </div>

            <div>
              {currentStep < 2 ? (
                <button
                  onClick={handleNext}
                  disabled={
                    (currentStep === 0 && !isStep1Valid) ||
                    (currentStep === 1 && !isStep2Valid)
                  }
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor:
                      (currentStep === 0 && !isStep1Valid) ||
                      (currentStep === 1 && !isStep2Valid)
                        ? '#9ca3af'
                        : '#10b981',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor:
                      (currentStep === 0 && !isStep1Valid) ||
                      (currentStep === 1 && !isStep2Valid)
                        ? 'not-allowed'
                        : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  Next
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={handleCreateClass}
                  disabled={!isStep3Valid}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    backgroundColor: !isStep3Valid ? '#9ca3af' : '#10b981',
                    color: 'white',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: !isStep3Valid ? 'not-allowed' : 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <School size={16} />
                  Create Class
                </button>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div
          style={{
            background: 'white',
            borderRadius: '12px',
            padding: '48px',
            textAlign: 'center',
            boxShadow:
              '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            maxWidth: '400px',
          }}
        >
          <div
            style={{
              width: '80px',
              height: '80px',
              backgroundColor: '#10b981',
              color: 'white',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 24px',
            }}
          >
            <Check size={48} />
          </div>
          <h3
            style={{
              fontSize: '24px',
              fontWeight: '600',
              color: '#111827',
              margin: '0 0 8px',
            }}
          >
            Class Created!
          </h3>
          <p
            style={{
              fontSize: '16px',
              color: '#6b7280',
              margin: 0,
              lineHeight: '1.5',
            }}
          >
            The class has been successfully created and added to the system.
          </p>
        </div>
      )}
    </div>
  );
};

export default CreateClassModal;
