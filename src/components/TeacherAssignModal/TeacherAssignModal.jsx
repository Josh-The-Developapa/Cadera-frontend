import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Check, Save } from 'lucide-react';
import './TeacherAssignModal.css';

// Mock data for classes and subjects
const CLASSES = ['P7P', 'S1A', 'S1B', 'S2A', 'S2B', 'S3A', 'P7B', 'P6A'];

const SUBJECTS = ['P7P', 'S1A', 'S1B', 'S2A', 'S2B', 'S3A', 'P7B', 'P6A'];

const TeacherAssignModal = ({ isOpen, onClose, teacher, onSaveChanges }) => {
  const [selectedClasses, setSelectedClasses] = useState({});
  const [subjectAssignments, setSubjectAssignments] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);

  const handleClassToggle = (classIndex) => {
    setSelectedClasses((prev) => ({
      ...prev,
      [classIndex]: !prev[classIndex],
    }));
  };

  const handleSubjectToggle = (classIndex, subject) => {
    const key = `${classIndex}-${subject}`;
    setSubjectAssignments((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getSelectedClassCount = () => {
    return Object.values(selectedClasses).filter(Boolean).length;
  };

  const handleSaveChanges = () => {
    // Show success animation
    setShowSuccess(true);

    // Call parent function to save changes
    const assignedClasses = Object.keys(selectedClasses)
      .filter((key) => selectedClasses[key])
      .map((index) => CLASSES[index]);

    const assignedSubjects = Object.keys(subjectAssignments)
      .filter((key) => subjectAssignments[key])
      .map((key) => {
        const [classIndex, subject] = key.split('-');
        return { class: CLASSES[classIndex], subject };
      });

    onSaveChanges({
      classes: assignedClasses,
      subjects: assignedSubjects,
    });

    // Close modal after animation
    setTimeout(() => {
      setShowSuccess(false);
      resetForm();
      onClose();
    }, 2000);
  };

  const resetForm = () => {
    setSelectedClasses({});
    setSubjectAssignments({});
    setSearchQuery('');
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
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 50,
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 25,
        stiffness: 300,
      },
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50,
      transition: {
        duration: 0.2,
      },
    },
  };

  const successVariants = {
    hidden: { opacity: 0, scale: 0.5 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        damping: 15,
        stiffness: 300,
      },
    },
  };

  if (!teacher) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="modal-backdrop"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <AnimatePresence>
            {!showSuccess ? (
              <motion.div
                className="assign-modal-container"
                variants={modalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Header */}
                <div className="assign-modal-header">
                  <h2 className="assign-modal-title">Assign Classes</h2>
                  <button
                    onClick={handleClose}
                    className="assign-modal-close-btn"
                  >
                    <X size={20} />
                  </button>
                </div>

                {/* Content */}
                <div className="assign-modal-content">
                  {/* Left Panel - Teacher Info */}
                  <div className="teacher-info-panel">
                    <div className="teacher-avatar">
                      <img
                        src="/api/placeholder/120/120"
                        alt="Kevin Kent Musinguzi"
                        className="teacher-image"
                      />
                    </div>
                    <h3 className="teacher-name">Kevin Kent Musinguzi</h3>
                    <p className="teacher-role">Teacher</p>

                    <div className="teacher-subjects">
                      {['HIS', 'GEO'].map((subject, index) => (
                        <span key={index} className="subject-badge">
                          {subject}
                        </span>
                      ))}
                    </div>

                    <div className="assigned-classes-info">
                      <h4 className="assigned-title">Assigned Classes</h4>
                      <p className="assigned-list">P7P, P7K, S1N, S2Q</p>
                    </div>
                  </div>

                  {/* Right Panel - Class Assignment */}
                  <div className="class-assignment-panel">
                    <div className="assignment-header">
                      <span className="selected-count">
                        ({getSelectedClassCount()} Class
                        {getSelectedClassCount() !== 1 ? 'es' : ''} Selected)
                      </span>
                      <div className="search-container">
                        <input
                          type="text"
                          placeholder="Search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="search-input"
                        />
                        <Search size={16} className="search-icon" />
                      </div>
                    </div>

                    <div className="assignment-table-container">
                      <table className="assignment-table">
                        <thead>
                          <tr>
                            <th className="class-header">Class</th>
                            {SUBJECTS.map((subject) => (
                              <th key={subject} className="subject-header">
                                {subject}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {CLASSES.map((className, classIndex) => (
                            <tr
                              key={classIndex}
                              className={`assignment-row ${
                                selectedClasses[classIndex] ? 'selected' : ''
                              }`}
                            >
                              <td className="class-cell">
                                <button
                                  className={`class-radio ${
                                    selectedClasses[classIndex] ? 'active' : ''
                                  }`}
                                  onClick={() => handleClassToggle(classIndex)}
                                >
                                  <div
                                    className={`radio-dot ${
                                      selectedClasses[classIndex]
                                        ? 'active'
                                        : ''
                                    }`}
                                  />
                                </button>
                                <span className="class-name">{className}</span>
                              </td>

                              {SUBJECTS.map((subject) => (
                                <td key={subject} className="subject-cell">
                                  <button
                                    className={`subject-checkbox ${
                                      subjectAssignments[
                                        `${classIndex}-${subject}`
                                      ]
                                        ? 'checked'
                                        : ''
                                    }`}
                                    onClick={() =>
                                      handleSubjectToggle(classIndex, subject)
                                    }
                                    disabled={!selectedClasses[classIndex]}
                                  >
                                    {subjectAssignments[
                                      `${classIndex}-${subject}`
                                    ] && <Check size={12} />}
                                  </button>
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="assign-modal-footer">
                  <button
                    onClick={handleSaveChanges}
                    className="save-changes-btn"
                  >
                    <Save size={16} />
                    Save Changes
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
                <h3 className="success-title">Changes Saved!</h3>
                <p className="success-message">
                  Class assignments have been successfully updated.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TeacherAssignModal;
