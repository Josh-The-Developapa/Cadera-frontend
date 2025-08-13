import ContentBox from '../../components/ContentBox/ContentBox';
import Context from '../../Context/Context';
import schoolLogo from '../../assets/makarios.png';
import VectorImage from '../../assets/Vector.png';
import React, { useState, useEffect, useContext } from 'react';
import {
  MoreHorizontal,
  Check,
  Send,
  Download,
  Plus,
  FileStack,
  File,
  FilePlus2,
  History,
  CircleAlert,
  FileClock,
  Loader2,
  X,
  Search,
  BadgeCheck,
  CheckCircle,
  FilePlus,
  ChevronLeft,
  ChevronRight,
  Gem,
} from 'lucide-react';

// Mock Data
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

const PromoteIndividualsModal = ({ isOpen, onClose, onPromote }) => {
  const context = useContext(Context);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  if (!isOpen) return null;

  const filteredStudents = mockStudents.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStudentSelect = (studentId, isSelected) => {
    if (isSelected) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
      setSelectAll(false);
    }
  };

  const handleSelectAll = (isSelected) => {
    setSelectAll(isSelected);
    if (isSelected) {
      setSelectedStudents(filteredStudents.map((student) => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  const handlePromote = () => {
    if (selectedStudents.length === 0) return;
    const studentsToPromote = mockStudents.filter((student) =>
      selectedStudents.includes(student.id)
    );
    onPromote({ type: 'individual', students: studentsToPromote });
    onClose();
  };

  return (
    <div
      className="modal-backdrop text-black"
      style={{
        left: context.isExpanded ? '170px' : '70px',
      }}
    >
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="text-[18px] font-[500]">Promote Individuals</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center gap-[8px] mb-6">
            <span className="step-title">
              1. Select Students <BadgeCheck size={16} stroke="#00BF76" />
            </span>
          </div>

          <div className="form-container">
            <div className="students-header">
              <h4 className="text-[14px] font-[400]">All Students</h4>
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

            <div className="max-h-[350px] overflow-y-auto">
              <table className="student-table">
                <thead>
                  <tr>
                    <th className="text-left px-4 py-3 w-12">
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                        className="custom-checkbox"
                      />
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-[#404040]">
                      Name ({selectedStudents.length} Selected)
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-[#404040]">
                      Class
                    </th>
                    <th className="text-left px-4 py-3 font-medium text-[#404040]">
                      SPC
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStudents.map((student, index) => {
                    const isSelected = selectedStudents.includes(student.id);

                    const baseColor = index % 2 === 0 ? '#FAFAFA' : '#F6FCFD';
                    const selectedColor =
                      index % 2 === 0 ? '#e9e9e9' : '#b2e3eb';

                    return (
                      <tr
                        key={student.id}
                        onClick={() =>
                          handleStudentSelect(student.id, !isSelected)
                        }
                        style={{
                          backgroundColor: isSelected
                            ? selectedColor
                            : baseColor,
                          transition: 'all 0.2s ease-in-out',
                          height: '32px',
                        }}
                        className="student-row"
                      >
                        <td className="rounded-left">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="custom-checkbox"
                          />
                        </td>
                        <td className="px-4 py-3 text-[#404040]">
                          {student.name}
                        </td>
                        <td className="px-4 py-3 text-[#404040]">
                          {student.className}
                        </td>
                        <td className="px-4 py-3 text-[#404040]">
                          {student.spc}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
          <button
            onClick={handlePromote}
            disabled={selectedStudents.length === 0}
            className="px-6 py-2 bg-[#7F3F98] text-white rounded-md disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-[14px] font-medium"
          >
            <Gem size={16} stroke="#FFFFFF" />
            Promote Selection
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoteIndividualsModal;
