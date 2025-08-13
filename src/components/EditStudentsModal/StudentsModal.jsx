import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  X,
  User,
  Check,
  BadgeCheck,
  UserPen,
  CalendarDays,
  SearchIcon,
  Hash,
  Mail,
} from 'lucide-react';
import './StudentsModal.css';
import Context from '../../Context/Context';

// Mock data for classes and subjects
const CLASSES = [
  { name: 'P7P', students: 15 },
  { name: 'S1A', students: 18 },
  { name: 'S1B', students: 16 },
  { name: 'S2A', students: 20 },
  { name: 'S2B', students: 19 },
  { name: 'S3A', students: 17 },
  { name: 'P7B', students: 15 },
  { name: 'P6A', students: 21 },
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

const StudentsModal = ({ isOpen, onClose, onCreateStudent }) => {
  const context = useContext(Context);
  const [studentName, setStudentName] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [schoolPayCode, setSchoolPayCode] = useState('');
  const [parent1Email, setParent1Email] = useState('');
  const [parent2Email, setParent2Email] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [selectedSubjects, setSelectedSubjects] = useState([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleSubjectToggle = (subject) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleCreateStudent = () => {
    if (studentName.trim() && dateOfBirth && selectedClass) {
      const newStudent = {
        name: studentName,
        dateOfBirth,
        schoolPayCode,
        parent1Email,
        parent2Email,
        class: selectedClass,
        subjects: selectedSubjects,
      };

      setShowSuccess(true);
      onCreateStudent(newStudent);

      setTimeout(() => {
        setShowSuccess(false);
        resetForm();
        onClose();
      }, 2000);
    }
  };

  const resetForm = () => {
    setStudentName('');
    setDateOfBirth('');
    setSchoolPayCode('');
    setParent1Email('');
    setParent2Email('');
    setSelectedClass('');
    setSelectedSubjects([]);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

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

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          style={{
            left: context.isExpanded ? '170px' : '70px',
          }}
        >
          <AnimatePresence>
            {!showSuccess ? (
              <motion.div
                className="modal-container"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Header */}
                <div className="modal-header">
                  <h2 className="modal-title">Edit Student</h2>
                  <button onClick={handleClose} className="modal-close-btn">
                    <X size={20} />
                  </button>
                </div>

                {/* Content */}
                <div className="modal-content">
                  {/* Step 1: Student Details */}
                  <div className="modal-section">
                    <div className="step-header">
                      <span className="step-number">1.</span>
                      <span className="step-title">
                        Student Details{' '}
                        <BadgeCheck size={16} stroke="#00BF76" />
                      </span>
                    </div>

                    <div className="form-container">
                      <div className="form-group">
                        <label className="form-label">Student Name</label>
                        <div className="input-container">
                          <UserPen className="input-icon" size={16} />
                          <input
                            type="text"
                            value={studentName}
                            onChange={(e) => setStudentName(e.target.value)}
                            placeholder="John Smith Katumba"
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Date of Birth</label>
                        <div className="input-container">
                          <CalendarDays className="input-icon" size={16} />
                          <input
                            type="text"
                            value={dateOfBirth}
                            onChange={(e) => setDateOfBirth(e.target.value)}
                            placeholder="02/08/2009"
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">School Pay Code</label>
                        <div className="input-container">
                          <Hash className="input-icon" size={16} />
                          <input
                            type="text"
                            value={schoolPayCode}
                            onChange={(e) => setSchoolPayCode(e.target.value)}
                            placeholder="02/08/2009"
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Parent 1 Email Address
                        </label>
                        <div className="input-container">
                          <Mail className="input-icon" size={16} />
                          <input
                            type="email"
                            value={parent1Email}
                            onChange={(e) => setParent1Email(e.target.value)}
                            placeholder="email@example.com"
                            className="form-input"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          Parent 2 Email Address
                        </label>
                        <div className="input-container">
                          <Mail className="input-icon" size={16} />
                          <input
                            type="email"
                            value={parent2Email}
                            onChange={(e) => setParent2Email(e.target.value)}
                            placeholder="email@example.com"
                            className="form-input"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step 2: Assign to class */}
                  <div className="modal-section">
                    <div className="step-header">
                      <span className="step-number">2.</span>
                      <span className="step-title">Assign to class</span>
                    </div>
                    <div
                      className="form-container"
                      style={{ paddingTop: '10px' }}
                    >
                      <div className="class-header">
                        <span className="class-label">Select Class</span>
                        <div className="search-container">
                          <input
                            type="text"
                            placeholder="Search"
                            className="modal-search-input"
                          />
                          <SearchIcon
                            size={16}
                            stroke="#959595"
                            className="search-icon"
                          />
                        </div>
                      </div>

                      {/* Class List Header */}
                      <div className="class-list-header">
                        <span>Class</span>
                        <span>Students</span>
                      </div>

                      {/* Class List Body */}
                      <div className="class-list-container">
                        {CLASSES.map((classItem, index) => {
                          const isSelected = selectedClass === classItem.name;
                          return (
                            <div
                              key={index}
                              className={`class-item ${
                                isSelected ? 'selected' : ''
                              }`}
                              onClick={() => setSelectedClass(classItem.name)}
                            >
                              <div className="class-select-icon">
                                {isSelected && <Check size={8} />}
                              </div>
                              <span className="class-name">
                                {classItem.name}
                              </span>
                              <span className="student-count">
                                {classItem.students}
                              </span>
                            </div>
                          );
                        })}
                      </div>

                      {/* Select Subjects */}
                      <div className="subjects-section">
                        <label className="form-label">Select Subjects</label>
                        <div className="subjects-grid">
                          {[...new Set(SUBJECTS)].map((subject, index) => (
                            <button
                              key={index}
                              onClick={() => handleSubjectToggle(subject)}
                              className={`subject-tag ${
                                selectedSubjects.includes(subject)
                                  ? 'selected'
                                  : ''
                              }`}
                            >
                              {subject}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                  <button
                    onClick={handleCreateStudent}
                    className="create-btn"
                    disabled={
                      !studentName.trim() || !dateOfBirth || !selectedClass
                    }
                  >
                    <User size={16} />
                    Edit Student
                  </button>
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
                <h3 className="success-title">Student Created!</h3>
                <p className="success-message">
                  The student has been successfully added to the system.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StudentsModal;
