import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Search, Check, Save } from 'lucide-react';
import './TeacherAssign.css';
import Context from '../../../../../Context/Context';
import TeacherImg from '../../../../../assets/teacher.png';

// Mock data for classes and subjects
const CLASSES = ['P7P', 'S1A', 'S1B', 'S2A', 'S2B', 'S3A', 'P7B', 'P6A'];

const SUBJECTS = [
  'CT',
  'HIS',
  'GEO',
  'MAT',
  'ENG',
  'SCI',
  'FRE',
  'ART',
  'MUS',
  'PE',
];

const TeacherAssignModal = ({ isOpen, onClose, teacher, onSaveChanges }) => {
  const context = useContext(Context);
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

  const filteredClasses = CLASSES.filter((className) =>
    className.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
                  <h2 className="modal-title">Assign Classes</h2>
                  <button onClick={handleClose} className="modal-close-btn">
                    <X size={20} />
                  </button>
                </div>

                {/* Content */}
                <div className="tam-modal-content">
                  {/* Left Panel - Teacher Info */}
                  <div className="tam-teacher-info-panel">
                    <img
                      src={TeacherImg}
                      alt="Teacher Image"
                      className="tam-teacher-image"
                    />
                    <h3 className="text-[#2F2F2F] text-[16px] font-[400]">
                      Kevin Kent Musinguzi
                    </h3>
                    <p className="tam-teacher-role">Teacher</p>

                    <div className="tam-teacher-subjects">
                      {['HIS', 'GEO'].map((subject, index) => (
                        <span key={index} className="tam-subject-badge">
                          {subject}
                        </span>
                      ))}
                    </div>

                    <div className="tam-assigned-classes-info">
                      <h4 className="tam-assigned-title">Assigned Classes</h4>
                      <p className="tam-assigned-list">P7P, P7K, S1N, S2Q</p>
                    </div>
                  </div>

                  {/* Right Panel - Class Assignment */}
                  <div className="tam-class-assignment-panel">
                    <div className="tam-assignment-header">
                      <span className="tam-selected-count">
                        ({getSelectedClassCount()} Class
                        {getSelectedClassCount() !== 1 ? 'es' : ''} Selected)
                      </span>
                      <div className="search-container">
                        <input
                          type="text"
                          placeholder="Search"
                          value={searchQuery}
                          onChange={(e) => setSearchQuery(e.target.value)}
                          className="modal-search-input"
                        />
                        <Search size={16} className="search-icon" />
                      </div>
                    </div>

                    <div className="tam-assignment-table-container">
                      <div className="tam-table-wrapper">
                        <table className="tam-assignment-table">
                          <thead>
                            <tr>
                              <th className="tam-class-header tam-sticky-column">
                                Class
                              </th>
                              {SUBJECTS.map((subject) => (
                                <th
                                  key={subject}
                                  className="tam-subject-header"
                                >
                                  {subject}
                                </th>
                              ))}
                            </tr>
                          </thead>
                          <tbody>
                            {filteredClasses.map((className, displayIndex) => {
                              const classIndex = CLASSES.indexOf(className);
                              return (
                                <tr
                                  key={classIndex}
                                  className={`tam-assignment-row ${
                                    selectedClasses[classIndex]
                                      ? 'tam-selected'
                                      : ''
                                  }`}
                                >
                                  <td className="tam-class-cell tam-sticky-column">
                                    <div className="tam-class-cell-content">
                                      <button
                                        className={`tam-class-radio ${
                                          selectedClasses[classIndex]
                                            ? 'tam-active'
                                            : ''
                                        }`}
                                        onClick={() =>
                                          handleClassToggle(classIndex)
                                        }
                                      >
                                        <div
                                          className={`tam-radio-dot ${
                                            selectedClasses[classIndex]
                                              ? 'tam-active'
                                              : ''
                                          }`}
                                        />
                                      </button>
                                      <span className="tam-class-name">
                                        {className}
                                      </span>
                                    </div>
                                  </td>

                                  {SUBJECTS.map((subject) => (
                                    <td
                                      key={subject}
                                      className="tam-subject-cell"
                                    >
                                      <button
                                        className={`tam-subject-checkbox ${
                                          subjectAssignments[
                                            `${classIndex}-${subject}`
                                          ]
                                            ? 'tam-checked'
                                            : ''
                                        } ${
                                          !selectedClasses[classIndex]
                                            ? 'tam-disabled'
                                            : ''
                                        }`}
                                        onClick={() =>
                                          handleSubjectToggle(
                                            classIndex,
                                            subject
                                          )
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
                              );
                            })}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="modal-footer">
                  <button onClick={handleSaveChanges} className="create-btn">
                    <Save size={16} />
                    Save Changes
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                className="tam-success-container"
                variants={successVariants}
                initial="hidden"
                animate="visible"
              >
                <motion.div
                  className="tam-success-icon"
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
                <h3 className="tam-success-title">Changes Saved!</h3>
                <p className="tam-success-message">
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
