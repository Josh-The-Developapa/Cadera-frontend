import React, { useState, useEffect, useContext } from 'react';
import {
  MoreHorizontal,
  Check,
  Plus,
  Search,
  BadgeCheck,
  X,
  TrendingUp,
  Gem,
} from 'lucide-react';
import Context from '../../Context/Context';

// Import all the asset icons (same as original)
import Asset1 from '../../assets/SVGs/Asset 1.svg';
import Asset2 from '../../assets/SVGs/Asset 2.svg';
import Asset3 from '../../assets/SVGs/Asset 3.svg';
import Asset4 from '../../assets/SVGs/Asset 4.svg';
import Asset5 from '../../assets/SVGs/Asset 5.svg';
import Asset6 from '../../assets/SVGs/Asset 6.svg';
import Asset7 from '../../assets/SVGs/Asset 7.svg';
import Asset8 from '../../assets/SVGs/Asset 8.svg';
import Asset9 from '../../assets/SVGs/Asset 9.svg';
import Asset10 from '../../assets/SVGs/Asset 10.svg';
import Asset11 from '../../assets/SVGs/Asset 11.svg';
import Asset12 from '../../assets/SVGs/Asset 12.svg';
import Asset13 from '../../assets/SVGs/Asset 13.svg';
import Asset14 from '../../assets/SVGs/Asset 14.svg';
import Asset15 from '../../assets/SVGs/Asset 15.svg';
import Asset16 from '../../assets/SVGs/Asset 16.svg';
import Asset17 from '../../assets/SVGs/Asset 17.svg';
import Asset18 from '../../assets/SVGs/Asset 18.svg';
import Asset19 from '../../assets/SVGs/Asset 19.svg';
import Asset20 from '../../assets/SVGs/Asset 20.svg';

// Mock Data (same as original)
const mockStudents = [
  {
    id: 1,
    name: 'Kevin Kent Asiimwe',
    className: 'P7P',
    spc: 'B98A2D',
    classId: 1,
  },
  { id: 2, name: 'Sarah Johnson', className: 'P7P', spc: 'C45F8G', classId: 1 },
  { id: 3, name: 'Michael Brown', className: 'P7K', spc: 'D78H9J', classId: 2 },
  { id: 4, name: 'Emma Wilson', className: 'P6A', spc: 'E12K3L', classId: 3 },
  { id: 5, name: 'James Davis', className: 'P6B', spc: 'F45M6N', classId: 4 },
  { id: 6, name: 'Olivia Miller', className: 'P5C', spc: 'G78P9Q', classId: 5 },
  {
    id: 7,
    name: 'William Garcia',
    className: 'P5D',
    spc: 'H01R2S',
    classId: 6,
  },
  {
    id: 8,
    name: 'Sophia Martinez',
    className: 'P4E',
    spc: 'I34T5U',
    classId: 7,
  },
  { id: 9, name: 'Benjamin Lee', className: 'P4F', spc: 'J67V8W', classId: 8 },
  {
    id: 10,
    name: 'Isabella Anderson',
    className: 'P3G',
    spc: 'K90X1Y',
    classId: 9,
  },
  {
    id: 11,
    name: 'Lucas Thompson',
    className: 'P3H',
    spc: 'L23Z4A',
    classId: 10,
  },
  { id: 12, name: 'Mia Taylor', className: 'P7P', spc: 'M56B7C', classId: 1 },
];

const mockClasses = [
  {
    id: 1,
    name: 'P7P',
    level: 'Primary 7',
    students: mockStudents.filter((s) => s.classId === 1),
  },
  {
    id: 2,
    name: 'P7K',
    level: 'Primary 7',
    students: mockStudents.filter((s) => s.classId === 2),
  },
  {
    id: 3,
    name: 'P6A',
    level: 'Primary 6',
    students: mockStudents.filter((s) => s.classId === 3),
  },
  {
    id: 4,
    name: 'P6B',
    level: 'Primary 6',
    students: mockStudents.filter((s) => s.classId === 4),
  },
  {
    id: 5,
    name: 'P5C',
    level: 'Primary 5',
    students: mockStudents.filter((s) => s.classId === 5),
  },
  {
    id: 6,
    name: 'P5D',
    level: 'Primary 5',
    students: mockStudents.filter((s) => s.classId === 6),
  },
];

const PromoteClassesModal = ({
  isOpen,
  onClose,
  onPromote,
  context = useContext(Context),
}) => {
  const [selectedClasses, setSelectedClasses] = useState([]);
  const [exemptStudents, setExemptStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [classIcons, setClassIcons] = useState({});

  // Available icons for randomization
  const availableIcons = [
    Asset1,
    Asset2,
    Asset3,
    Asset4,
    Asset5,
    Asset6,
    Asset7,
    Asset8,
    Asset9,
    Asset10,
    Asset11,
    Asset12,
    Asset13,
    Asset14,
    Asset15,
    Asset16,
    Asset17,
    Asset18,
    Asset19,
    Asset20,
  ];

  // Generate random icons for each class on component mount
  useEffect(() => {
    const iconMap = {};
    mockClasses.forEach((cls) => {
      const randomIndex = Math.floor(Math.random() * availableIcons.length);
      iconMap[cls.id] = availableIcons[randomIndex];
    });
    setClassIcons(iconMap);
  }, []);

  if (!isOpen) return null;

  const filteredClasses = mockClasses.filter((cls) =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClassSelect = (classId) => {
    setSelectedClasses((prev) =>
      prev.includes(classId)
        ? prev.filter((id) => id !== classId)
        : [...prev, classId]
    );
  };

  const handlePromote = () => {
    const selectedClassesData = mockClasses.filter((cls) =>
      selectedClasses.includes(cls.id)
    );
    onPromote({ type: 'bulk', classes: selectedClassesData, exemptStudents });
    onClose();
  };

  // Get all students from selected classes for exemption
  const allStudentsFromSelectedClasses = selectedClasses.flatMap((classId) => {
    const classData = mockClasses.find((c) => c.id === classId);
    return classData ? classData.students : [];
  });

  return (
    <div
      className="modal-backdrop text-black"
      style={{
        left: context.isExpanded ? '170px' : '70px',
      }}
    >
      <div className="modal-container" style={{ width: '910px' }}>
        <div className="modal-header">
          <h2 className="text-[18px] font-[500]">Promote Classes</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          {/* Left Panel - Select Classes */}
          <div className="modal-section">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-medium text-sm">1. Select Classes</h3>
              <BadgeCheck size={16} stroke="#00BF76" />
            </div>

            <div className="form-container">
              <div className="students-header">
                <h4 className="text-[#404040] text-[14px] font-normal">
                  Choose class ({selectedClasses.length} Selected)
                </h4>
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

              <div
                className="classes-container"
                style={{ maxHeight: '300px', overflowY: 'auto' }}
              >
                {filteredClasses.map((cls) => {
                  const isSelected = selectedClasses.includes(cls.id);
                  const IconComponent = classIcons[cls.id];
                  return (
                    <div
                      key={cls.id}
                      className={`class-card-new ${
                        isSelected ? 'selected' : ''
                      }`}
                      onClick={() => handleClassSelect(cls.id)}
                      style={{
                        width: '170px',
                        height: '170px',
                        marginBottom: '16px',
                      }}
                    >
                      <div className="class-card-header">
                        <MoreHorizontal size={16} className="class-menu-icon" />
                      </div>
                      <div className="class-card-icon-container">
                        <div
                          className="class-card-icon"
                          style={{
                            backgroundColor: '#387B4A',
                            color: 'white',
                          }}
                        >
                          {IconComponent && (
                            <img
                              src={IconComponent}
                              className="class-card-icon-img"
                              style={{ height: '32px', width: '32px' }}
                              alt={cls.name}
                            />
                          )}
                        </div>
                      </div>

                      <div className="class-card-name">{cls.name}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Panel - Exempt Students */}
          <div className="w-96">
            <h3 className="font-medium mb-4 text-sm">
              2. Exempt Students (Optional)
            </h3>

            <div
              className="form-container"
              style={{ height: 'auto', maxHeight: '400px' }}
            >
              <div className="class-header">
                <span className="class-label">
                  Name ({exemptStudents.length} Selected)
                </span>
              </div>

              {/* Table Header */}
              <div className="class-list-header">
                <span>Name</span>
                <span>Class</span>
                <span>SPC</span>
              </div>

              {/* Table Body */}
              <div
                className="class-list-container"
                style={{ maxHeight: '300px' }}
              >
                {allStudentsFromSelectedClasses.map((student, index) => {
                  const isExempted = exemptStudents.includes(student.id);
                  return (
                    <div
                      key={student.id}
                      className={`class-item ${isExempted ? 'selected' : ''}`}
                      onClick={() => {
                        if (isExempted) {
                          setExemptStudents((prev) =>
                            prev.filter((id) => id !== student.id)
                          );
                        } else {
                          setExemptStudents((prev) => [...prev, student.id]);
                        }
                      }}
                    >
                      <div className="class-select-icon">
                        {isExempted && <Check size={16} />}
                      </div>
                      <span className="class-name" style={{ flex: '2' }}>
                        {student.name}
                      </span>
                      <span
                        className="student-count"
                        style={{ flex: '1', textAlign: 'center' }}
                      >
                        {student.className}
                      </span>
                      <span
                        className="student-count"
                        style={{ flex: '1', textAlign: 'center' }}
                      >
                        {student.spc}
                      </span>
                    </div>
                  );
                })}

                {allStudentsFromSelectedClasses.length === 0 && (
                  <div className="text-center text-gray-500 py-4">
                    Select classes to view students
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div
          className="modal-footer"
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            padding: '20px 24px',
            borderTop: '1px solid #e5e5e5',
          }}
        >
          <button
            onClick={handlePromote}
            disabled={selectedClasses.length === 0}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 20px',
              backgroundColor:
                selectedClasses.length === 0 ? '#ccc' : '#7F3F98',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '500',
              cursor: selectedClasses.length === 0 ? 'not-allowed' : 'pointer',
            }}
          >
            <Gem size={16} />
            Promote Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoteClassesModal;
