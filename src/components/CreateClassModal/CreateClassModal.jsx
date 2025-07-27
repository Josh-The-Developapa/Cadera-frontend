import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  Check,
  BadgeCheck,
  Search as SearchIcon,
  ArrowLeft,
  ArrowRight,
  Plus,
  User,
  Hash,
  Users,
} from 'lucide-react';
import './CreateClassModal.css';
// import Context from '../../Context/Context'; // Uncomment if Context is available

// Mock data for teachers and students
const MOCK_TEACHERS = [
  {
    id: 1,
    name: 'Kevin Kent Asiimwe',
    classes: 12,
    avatar: 'https://i.pravatar.cc/150?img=1',
  },
  {
    id: 2,
    name: 'Emmanuel Mukisa',
    classes: 8,
    avatar: 'https://i.pravatar.cc/150?img=2',
  },
  {
    id: 3,
    name: 'Joshua Porter',
    classes: 15,
    avatar: 'https://i.pravatar.cc/150?img=3',
  },
  {
    id: 4,
    name: 'Sarah Johnson',
    classes: 10,
    avatar: 'https://i.pravatar.cc/150?img=4',
  },
  {
    id: 5,
    name: 'Michael Brown',
    classes: 6,
    avatar: 'https://i.pravatar.cc/150?img=5',
  },
  {
    id: 6,
    name: 'Lisa Davis',
    classes: 12,
    avatar: 'https://i.pravatar.cc/150?img=6',
  },
];

const MOCK_STUDENTS = [
  {
    id: 1,
    name: 'Kevin Kent Asiimwe',
    studentId: 'FAS341',
    subjects: ['HIS', 'GEO', 'MAT'],
  },
  { id: 2, name: 'John Doe', studentId: '12', subjects: ['CHE', 'BIO', 'PHY'] },
  {
    id: 3,
    name: 'Jane Smith',
    studentId: '13',
    subjects: ['KIS', 'FRE', 'ENG'],
  },
  {
    id: 4,
    name: 'Bob Wilson',
    studentId: '14',
    subjects: ['HIS', 'MAT', 'ENG'],
  },
  {
    id: 5,
    name: 'Alice Cooper',
    studentId: '15',
    subjects: ['GEO', 'BIO', 'FRE'],
  },
];

const SUBJECTS = [
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
  // const context = useContext(Context); // Uncomment if Context is available
  const [currentStep, setCurrentStep] = useState(0);
  const [searchQueries, setSearchQueries] = useState({
    teachers: '',
    students: '',
  });
  const [showSuccess, setShowSuccess] = useState(false);

  // Form data
  const [selectedTeachers, setSelectedTeachers] = useState([]);
  const [classTeachers, setClassTeachers] = useState([]);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [addedStudents, setAddedStudents] = useState([]);
  const [className, setClassName] = useState('');
  const [classLevel, setClassLevel] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);

  const steps = [
    { title: 'Add Teachers', subtitle: 'Select Class Teachers' },
    { title: 'Add Students', subtitle: '' },
    { title: 'Class Details', subtitle: 'Preview' },
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      if (currentStep === 0) {
        // Move selected teachers to class teachers
        setClassTeachers([...selectedTeachers]);
        setSelectedTeachers([]);
      }
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleTeacherToggle = (teacher) => {
    setSelectedTeachers((prev) =>
      prev.find((t) => t.id === teacher.id)
        ? prev.filter((t) => t.id !== teacher.id)
        : [...prev, teacher]
    );
  };

  const handleClassTeacherToggle = (teacher) => {
    setClassTeachers((prev) =>
      prev.find((t) => t.id === teacher.id)
        ? prev.filter((t) => t.id !== teacher.id)
        : [...prev, teacher]
    );
  };

  const handleStudentToggle = (student) => {
    setSelectedStudents((prev) =>
      prev.find((s) => s.id === student.id)
        ? prev.filter((s) => s.id !== student.id)
        : [...prev, student]
    );
  };

  const handleAddStudent = () => {
    if (selectedStudents.length > 0) {
      setAddedStudents((prev) => [...prev, ...selectedStudents]);
      setSelectedStudents([]);
    }
  };

  const handleRemoveAddedStudent = (studentId) => {
    setAddedStudents((prev) => prev.filter((s) => s.id !== studentId));
  };

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleCreateClass = () => {
    const newClass = {
      name: className,
      level: classLevel,
      teachers: classTeachers,
      students: addedStudents,
      subjects: selectedSubjects,
    };

    setShowSuccess(true);
    onCreateClass(newClass);

    setTimeout(() => {
      setShowSuccess(false);
      resetForm();
      onClose();
    }, 2000);
  };

  const resetForm = () => {
    setCurrentStep(0);
    setSelectedTeachers([]);
    setClassTeachers([]);
    setSelectedStudents([]);
    setAddedStudents([]);
    setClassName('');
    setClassLevel('');
    setSelectedSubjects([]);
    setSearchQueries({ teachers: '', students: '' });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const filteredTeachers = MOCK_TEACHERS.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQueries.teachers.toLowerCase())
  );

  const filteredStudents = MOCK_STUDENTS.filter(
    (student) =>
      student.name
        .toLowerCase()
        .includes(searchQueries.students.toLowerCase()) &&
      !addedStudents.find((s) => s.id === student.id)
  );

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.8, y: 50 },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: { type: 'spring', damping: 25, stiffness: 300 },
    },
    exit: { opacity: 0, scale: 0.8, y: 50, transition: { duration: 0.2 } },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { type: 'spring', damping: 15, stiffness: 300 },
    },
  };

  // Step 1: Add Teachers
  const renderStep1 = () => (
    <div className="modal-content-step">
      <div className="teachers-section">
        <div className="teachers-header">
          <span className="teachers-count">
            ({selectedTeachers.length} Selected)
          </span>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchQueries.teachers}
              onChange={(e) =>
                setSearchQueries((prev) => ({
                  ...prev,
                  teachers: e.target.value,
                }))
              }
              className="modal-search-input"
            />
            <SearchIcon size={16} stroke="#959595" className="search-icon" />
          </div>
        </div>

        <div className="teachers-list-header">
          <span>Name</span>
          <span>Classes</span>
        </div>

        <div className="teachers-list-container">
          {filteredTeachers.map((teacher) => {
            const isSelected = selectedTeachers.find(
              (t) => t.id === teacher.id
            );
            return (
              <div
                key={teacher.id}
                className={`teacher-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleTeacherToggle(teacher)}
              >
                <div className="teacher-select-icon">
                  {isSelected && <Check size={8} />}
                </div>
                <span className="teacher-name">{teacher.name}</span>
                <span className="teacher-classes">{teacher.classes}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="class-teachers-section">
        <div className="class-teachers-header">
          <span className="class-teachers-count">
            ({classTeachers.length} Selected)
          </span>
        </div>

        <div className="class-teachers-list-header">
          <span>Name</span>
        </div>

        <div className="class-teachers-list-container">
          {classTeachers.map((teacher) => (
            <div key={teacher.id} className="class-teacher-item">
              <div
                className="class-teacher-remove-icon"
                onClick={() => handleClassTeacherToggle(teacher)}
              >
                <X size={8} />
              </div>
              <span className="class-teacher-name">{teacher.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 2: Add Students
  const renderStep2 = () => (
    <div className="modal-content-step">
      <div className="students-section">
        <div className="students-header">
          <span className="students-title">New Students</span>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              value={searchQueries.students}
              onChange={(e) =>
                setSearchQueries((prev) => ({
                  ...prev,
                  students: e.target.value,
                }))
              }
              className="modal-search-input"
            />
            <SearchIcon size={16} stroke="#959595" className="search-icon" />
          </div>
        </div>

        <div className="students-list-header">
          <span>Name</span>
          <span>Student ID</span>
        </div>

        <div className="students-list-container">
          {filteredStudents.map((student) => {
            const isSelected = selectedStudents.find(
              (s) => s.id === student.id
            );
            return (
              <div
                key={student.id}
                className={`student-item ${isSelected ? 'selected' : ''}`}
                onClick={() => handleStudentToggle(student)}
              >
                <div className="student-select-icon">
                  <Plus size={12} />
                </div>
                <span className="student-name">{student.name}</span>
                <span className="student-id">{student.studentId}</span>
              </div>
            );
          })}
        </div>
      </div>

      <div className="student-preview-section">
        {selectedStudents.length > 0 && (
          <div className="selected-student-preview">
            <div className="preview-header">
              <div className="preview-avatar">
                <User size={24} />
              </div>
              <div className="preview-info">
                <h4>{selectedStudents[0].name}</h4>
                <span>{selectedStudents[0].studentId}</span>
              </div>
            </div>

            <div className="preview-subjects">
              <span className="subjects-label">Select Subjects</span>
              <div className="subjects-grid">
                {SUBJECTS.map((subject) => (
                  <button
                    key={subject}
                    onClick={() => handleSubjectToggle(subject)}
                    className={`subject-tag ${
                      selectedSubjects.includes(subject) ? 'selected' : ''
                    }`}
                  >
                    {subject}
                  </button>
                ))}
              </div>
            </div>

            <button className="add-student-btn" onClick={handleAddStudent}>
              <Users size={16} />
              Add Student
            </button>
          </div>
        )}
      </div>

      <div className="added-students-section">
        <div className="added-students-header">
          <span className="added-students-count">
            ({addedStudents.length} Added)
          </span>
          <div className="search-container">
            <input
              type="text"
              placeholder="Search"
              className="modal-search-input"
            />
            <SearchIcon size={16} stroke="#959595" className="search-icon" />
          </div>
        </div>

        <div className="added-students-list-header">
          <span>Name</span>
          <span>Student ID</span>
        </div>

        <div className="added-students-list-container">
          {addedStudents.map((student) => (
            <div key={student.id} className="added-student-item">
              <div
                className="added-student-remove-icon"
                onClick={() => handleRemoveAddedStudent(student.id)}
              >
                <X size={8} />
              </div>
              <span className="added-student-name">{student.name}</span>
              <span className="added-student-id">{student.studentId}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Step 3: Class Details & Preview
  const renderStep3 = () => (
    <div className="modal-content-step">
      <div className="class-details-form">
        <h3 className="form-section-title">Class Details</h3>

        <div className="form-group">
          <label className="form-label">Class Name</label>
          <div className="input-container">
            <Hash className="input-icon" size={16} />
            <input
              type="text"
              value={className}
              onChange={(e) => setClassName(e.target.value)}
              placeholder="Enter Class Name"
              className="form-input"
            />
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Class Level</label>
          <div className="input-container">
            <Hash className="input-icon" size={16} />
            <input
              type="text"
              value={classLevel}
              onChange={(e) => setClassLevel(e.target.value)}
              placeholder="Enter Number (0-9)"
              className="form-input"
            />
          </div>
        </div>
      </div>

      <div className="class-preview">
        <h3 className="form-section-title">Preview</h3>

        <div className="preview-card">
          <div className="preview-card-header">
            <h2 className="preview-class-name">{className || 'P4A'}</h2>
          </div>

          <div className="preview-teachers">
            <span className="preview-section-label">Teachers</span>
            <div className="preview-teacher-avatars">
              {classTeachers.slice(0, 3).map((teacher, idx) => (
                <div key={idx} className="preview-avatar-wrapper">
                  <img
                    src={teacher.avatar}
                    alt={teacher.name}
                    className="preview-teacher-avatar"
                  />
                  <p className="preview-teacher-name">
                    {teacher.name.split(' ').slice(0, 2).join(' ')}
                  </p>
                </div>
              ))}
              {classTeachers.length > 3 && (
                <div className="preview-others-wrapper">
                  <div className="preview-others-avatar">
                    +{classTeachers.length - 3}
                  </div>
                  <p className="preview-others-text">
                    {classTeachers.length - 3} Others
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="preview-subjects">
            <span className="preview-section-label">Subjects</span>
            <div className="preview-subjects-container">
              {selectedSubjects.map((subject, i) => (
                <span key={i} className="preview-subject-tag">
                  {subject}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="create-class-modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{
            // left: context?.isExpanded ? '170px' : '70px', // Uncomment if Context is available
            left: '170px', // Default positioning
          }}
        >
          <AnimatePresence>
            {!showSuccess ? (
              <motion.div
                className="create-class-modal-container"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Header */}
                <div className="create-class-modal-header">
                  <h2 className="create-class-modal-title">Create New Class</h2>
                  <button
                    onClick={handleClose}
                    className="create-class-modal-close-btn"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Step Indicators */}
                <div className="step-indicators">
                  <div className="step-header">
                    <span className="step-number">{currentStep + 1}.</span>
                    <span className="step-title">
                      {steps[currentStep].title}
                      {currentStep < 2 && (
                        <BadgeCheck size={16} stroke="#00BF76" />
                      )}
                    </span>
                    {steps[currentStep].subtitle && (
                      <>
                        <span className="step-number">{currentStep + 2}.</span>
                        <span className="step-title">
                          {steps[currentStep].subtitle}
                        </span>
                      </>
                    )}
                  </div>
                </div>

                {/* Content */}
                <div className="create-class-modal-content">
                  {currentStep === 0 && renderStep1()}
                  {currentStep === 1 && renderStep2()}
                  {currentStep === 2 && renderStep3()}
                </div>

                {/* Footer */}
                <div className="create-class-modal-footer">
                  {currentStep > 0 && (
                    <button onClick={handleBack} className="back-btn">
                      <ArrowLeft size={16} />
                      Back
                    </button>
                  )}

                  <div className="step-indicator-text">
                    Step {currentStep + 1} of {steps.length}
                  </div>

                  {currentStep < steps.length - 1 ? (
                    <button
                      onClick={handleNext}
                      className="next-btn"
                      disabled={
                        (currentStep === 0 &&
                          selectedTeachers.length === 0 &&
                          classTeachers.length === 0) ||
                        (currentStep === 1 && addedStudents.length === 0)
                      }
                    >
                      Next
                      <ArrowRight size={16} />
                    </button>
                  ) : (
                    <button
                      onClick={handleCreateClass}
                      className="create-class-btn"
                      disabled={!className.trim() || !classLevel.trim()}
                    >
                      <Plus size={16} />
                      Create Class
                    </button>
                  )}
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="success-container"
                variants={successVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="success-icon"
                  animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 10, -10, 0],
                  }}
                  transition={{
                    duration: 0.6,
                    repeat: 1,
                  }}
                >
                  <Check size={48} />
                </motion.div>
                <h3 className="success-title">Class Created!</h3>
                <p className="success-message">
                  The class has been successfully created and added to the
                  system.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CreateClassModal;
