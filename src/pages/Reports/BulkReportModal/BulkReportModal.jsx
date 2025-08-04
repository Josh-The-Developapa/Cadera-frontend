import React, { useState, useEffect } from 'react';
import { X, Search, BadgeCheck, FilePlus, MoreHorizontal } from 'lucide-react';
import './BulkReportModal.css';

// Generate fictitious student data
const generateStudentsForClass = (className, classId, count) => {
  const firstNames = [
    'John',
    'Emma',
    'Michael',
    'Sarah',
    'David',
    'Lisa',
    'James',
    'Anna',
    'Robert',
    'Maria',
    'William',
    'Jennifer',
    'Daniel',
    'Jessica',
    'Matthew',
    'Ashley',
    'Christopher',
    'Amanda',
    'Andrew',
    'Stephanie',
  ];
  const lastNames = [
    'Smith',
    'Johnson',
    'Williams',
    'Brown',
    'Jones',
    'Garcia',
    'Miller',
    'Davis',
    'Rodriguez',
    'Martinez',
    'Hernandez',
    'Lopez',
    'Gonzalez',
    'Wilson',
    'Anderson',
    'Thomas',
    'Taylor',
    'Moore',
    'Jackson',
    'Martin',
  ];

  const students = [];
  for (let i = 0; i < count; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    students.push({
      id: `${classId}-${i + 1}`,
      name: `${firstName} ${lastName}`,
      className: className,
      spc: Math.floor(Math.random() * 100) + 1,
      subjects: {
        'English Language': Math.floor(Math.random() * 40) + 60,
        Mathematics: Math.floor(Math.random() * 40) + 60,
        Science: Math.floor(Math.random() * 40) + 60,
        'Social Studies': Math.floor(Math.random() * 40) + 60,
        'Physical Education': Math.floor(Math.random() * 40) + 60,
        Art: Math.floor(Math.random() * 40) + 60,
        Music: Math.floor(Math.random() * 40) + 60,
      },
      attendance: Math.floor(Math.random() * 20) + 80,
      behavior: ['Excellent', 'Good', 'Satisfactory', 'Needs Improvement'][
        Math.floor(Math.random() * 4)
      ],
    });
  }
  return students;
};

// Generate class data with students
const generateClassData = () => {
  const classes = [
    { id: 'p7p-1', name: 'P7P', studentCount: 25 },
    { id: 'p6a-1', name: 'P6A', studentCount: 28 },
    { id: 'p6b-1', name: 'P6B', studentCount: 24 },
    { id: 'p5a-1', name: 'P5A', studentCount: 30 },
    { id: 'p5b-1', name: 'P5B', studentCount: 26 },
    { id: 'p4a-1', name: 'P4A', studentCount: 32 },
  ];

  return classes.map((cls) => ({
    ...cls,
    students: generateStudentsForClass(cls.name, cls.id, cls.studentCount),
    hue: Math.floor(Math.random() * 361),
  }));
};

const BulkReportsModal = ({ isOpen, onClose, onGenerateReports }) => {
  const [selectedClass, setSelectedClass] = useState(null);
  const [exemptStudents, setExemptStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [classes] = useState(generateClassData());

  useEffect(() => {
    if (isOpen) {
      setSelectedClass(null);
      setExemptStudents([]);
      setSearchQuery('');
    }
  }, [isOpen]);

  const handleClassSelect = (classData) => {
    setSelectedClass(classData);
    setExemptStudents([]);
  };

  const handleStudentExempt = (studentId, isExempt) => {
    if (isExempt) {
      setExemptStudents([...exemptStudents, studentId]);
    } else {
      setExemptStudents(exemptStudents.filter((id) => id !== studentId));
    }
  };

  const filteredStudents = selectedClass
    ? selectedClass.students.filter((student) =>
        student.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const handleGenerateReports = () => {
    if (!selectedClass) return;

    const studentsToInclude = selectedClass.students.filter(
      (student) => !exemptStudents.includes(student.id)
    );

    onGenerateReports({
      type: 'bulk',
      className: selectedClass.name,
      students: studentsToInclude,
      exemptedCount: exemptStudents.length,
    });

    onClose();
  };

  const getIconBackgroundStyle = (hue) => ({
    backgroundColor: `hsl(${hue}, 20%, 50%)`,
    color: 'white',
  });

  if (!isOpen) return null;

  return (
    <div className="modal-backdrop">
      <div className="modal-container" style={{ width: '910px' }}>
        <div className="modal-header">
          <h2 className="modal-title">Generate Bulk Reports</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          {/* Step 1: Select Class */}
          <div className="step-section">
            <div className="step-header">
              <h3 className="step-title">
                1. Select Class
                {selectedClass && (
                  <BadgeCheck size={16} className="check-icon" />
                )}
              </h3>
            </div>

            <div className="class-selection-container">
              <div className="class-selection-header">
                <span className="choose-class-text">Choose class</span>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search"
                    className="search-input"
                  />
                  <Search size={16} className="search-icon" />
                </div>
              </div>

              <div className="classes-grid">
                {classes.map((cls) => (
                  <div
                    key={cls.id}
                    className={`class-card ${
                      selectedClass?.id === cls.id ? 'selected' : ''
                    }`}
                    onClick={() => handleClassSelect(cls)}
                  >
                    <div className="class-card-header">
                      <MoreHorizontal size={16} className="class-menu-icon" />
                    </div>
                    <div className="class-card-icon-container">
                      <div
                        className="class-card-icon"
                        style={getIconBackgroundStyle(cls.hue)}
                      >
                        <span className="class-icon-text">🎵</span>
                      </div>
                    </div>
                    <div className="class-card-name">{cls.name}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step 2: Exempt Students */}
          {selectedClass && (
            <div className="step-section">
              <div className="step-header">
                <h3 className="step-title">2. Exempt Students (Optional)</h3>
              </div>

              <div className="exempt-students-container">
                <div className="exempt-header">
                  <span className="exempt-count">
                    ({exemptStudents.length} Selected)
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

                <div className="students-table-container">
                  <table className="students-table">
                    <thead>
                      <tr>
                        <th>Name</th>
                        <th>Class</th>
                        <th>SPC</th>
                        <th>Exempt</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredStudents.map((student, index) => {
                        const isExempt = exemptStudents.includes(student.id);
                        const baseColor =
                          index % 2 === 0 ? '#FAFAFA' : '#F6FCFD';

                        return (
                          <tr
                            key={student.id}
                            style={{ backgroundColor: baseColor }}
                            className="student-row"
                          >
                            <td>{student.name}</td>
                            <td>{student.className}</td>
                            <td>{student.spc}</td>
                            <td>
                              <input
                                type="checkbox"
                                checked={isExempt}
                                onChange={(e) =>
                                  handleStudentExempt(
                                    student.id,
                                    e.target.checked
                                  )
                                }
                                className="exempt-checkbox"
                              />
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button
            className="generate-button"
            onClick={handleGenerateReports}
            disabled={!selectedClass}
          >
            <FilePlus size={16} />
            Generate Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default BulkReportsModal;
