import ContentBox from '../../components/ContentBox/ContentBox';
import Context from '../../Context/Context';
import schoolLogo from '/Users/joshuamukisa/Desktop/cadera/src/Makarios Report HTML/makarios.png';
import VectorImage from '/Users/joshuamukisa/Desktop/cadera/src/Makarios Report HTML/Vector.png';
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
} from 'lucide-react';
import './Reports.css';
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

// Generate mock grades for students
const generateMockGrades = (student) => ({
  englishLanguage: {
    midTerm: Math.floor(Math.random() * 40) + 60,
    endTerm: Math.floor(Math.random() * 40) + 60,
  },
  mathematics: {
    midTerm: Math.floor(Math.random() * 40) + 50,
    endTerm: Math.floor(Math.random() * 40) + 50,
  },
  religiousEducation: {
    midTerm: Math.floor(Math.random() * 30) + 70,
    endTerm: Math.floor(Math.random() * 30) + 70,
  },
  computerStudies: {
    midTerm: Math.floor(Math.random() * 35) + 55,
    endTerm: Math.floor(Math.random() * 35) + 55,
  },
  literacy1: {
    midTerm: Math.floor(Math.random() * 40) + 60,
    endTerm: Math.floor(Math.random() * 40) + 60,
  },
  literacy2: {
    midTerm: Math.floor(Math.random() * 40) + 60,
    endTerm: Math.floor(Math.random() * 40) + 60,
  },
});

const getGrade = (percentage) => {
  if (percentage >= 90) return 'D1';
  if (percentage >= 75) return 'D2';
  if (percentage >= 70) return 'C3';
  if (percentage >= 60) return 'C4';
  if (percentage >= 55) return 'C5';
  if (percentage >= 50) return 'C6';
  if (percentage >= 40) return 'P7';
  if (percentage >= 30) return 'P8';
  return 'F9';
};

// Modal Components
const BulkReportsModal = ({
  isOpen,
  onClose,
  onGenerate,
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

  const handleGenerate = () => {
    const selectedClassesData = mockClasses.filter((cls) =>
      selectedClasses.includes(cls.id)
    );
    onGenerate({ type: 'bulk', classes: selectedClassesData, exemptStudents });
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
          <h2 className="text-[18px] font-[500]">Generate Bulk Reports</h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          {/* Left Panel - Select Classes */}
          <div className="modal-section">
            <div className="flex items-center gap-2 mb-4">
              <h3 className="font-medium text-sm">1. Select Class</h3>
              <BadgeCheck size={16} stroke="#00BF76" />
            </div>

            <div className="form-container">
              <div className="students-header">
                <h4 className="text-[#404040] text-[14px] font-normal">
                  Choose class
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

        <div className="modal-footer">
          <button
            onClick={handleGenerate}
            disabled={selectedClasses.length === 0}
            className="create-btn"
          >
            <FilePlus size={16} />
            Generate Reports
          </button>
        </div>
      </div>
    </div>
  );
};

const IndividualReportsModal = ({ isOpen, onClose, onGenerate }) => {
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

  const handleGenerate = () => {
    if (selectedStudents.length === 0) return;
    const studentsToInclude = mockStudents.filter((student) =>
      selectedStudents.includes(student.id)
    );
    onGenerate({ type: 'individual', students: studentsToInclude });
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
          <h2 className="text-[18px] font-[500]">
            Generate Individual Reports
          </h2>
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
              {/* <table className="w-full"> */}
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
            onClick={handleGenerate}
            disabled={selectedStudents.length === 0}
            className="create-btn"
          >
            <FilePlus size={16} />
            Generate Reports
          </button>
        </div>
      </div>
    </div>
  );
};

const PreviewModal = ({ isOpen, onClose, reportData }) => {
  const context = useContext(Context);
  const [currentStudentIndex, setCurrentStudentIndex] = useState(0);
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');

  if (!isOpen || !reportData) return null;

  const students =
    reportData.type === 'bulk'
      ? reportData.classes.flatMap((cls) => cls.students)
      : reportData.students;

  const currentStudent = students[currentStudentIndex];
  const grades = generateMockGrades(currentStudent);

  const calculateFinalMark = (subject) => {
    return Math.round((subject.midTerm + subject.endTerm) / 2);
  };

  const calculateTotal = () => {
    return Object.values(grades).reduce((total, subject) => {
      return total + calculateFinalMark(subject);
    }, 0);
  };

  // Convert image to base64 and embed it
  const convertImageToBase64 = async (imagePath) => {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.readAsDataURL(blob);
      });
    } catch (error) {
      console.error('Error converting image to base64:', error);
      return null;
    }
  };

  // Updated generateReportHTML function with proper A4 page breaks
  const generateReportHTML = async (student, grades) => {
    const total = calculateTotal();

    // Convert images to base64
    const logoBase64 = await convertImageToBase64(schoolLogo);
    const vectorBase64 = await convertImageToBase64(VectorImage);

    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Report Card - ${student.name}</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Lexend+Deca:wght@100..900&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: "Arial", sans-serif;
            font-size: 12pt;
            line-height: 1.2;
        }

        @page {
            size: A4 portrait;
            margin: 1cm;
        }

        .page {
            width: 21cm;
            height: 29.7cm;
            padding: 1cm;
            page-break-after: always;
            display: flex;
            flex-direction: column;
            box-sizing: border-box;
        }

        .page:last-child {
            page-break-after: avoid;
        }

        /* COVER PAGE STYLES */
        .cover-page {
            border: 3px solid purple;
            padding: 2cm;
            height: 100%;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            text-align: center;
        }

        .cover-logo {
            width: 120px;
            height: 120px;
            object-fit: contain;
            margin: 0 auto 1cm auto;
            padding: 10px;
        }

        .cover-title {
            margin-bottom: 2cm;
        }

        .cover-title h1 {
            font-size: 28pt;
            font-weight: bold;
            color: #1a1a1a;
            margin-bottom: 0.5cm;
        }

        .cover-title h2 {
            font-size: 20pt;
            color: #666;
            margin-bottom: 0.3cm;
        }

        .cover-title h3 {
            font-size: 16pt;
            color: #666;
        }

        .cover-info {
            text-align: left;
            font-size: 14pt;
            line-height: 1.5;
        }

        .cover-info p {
            margin-bottom: 0.3cm;
        }

        /* MAIN REPORT PAGE STYLES */
        .report-page {
            border: 3px solid purple;
            padding: 0.8cm;
            height: 100%;
            position: relative;
        }

        .report-logo {
            width: 60px;
            height: 60px;
            object-fit: contain;
            position: absolute;
            top: 0.5cm;
            left: 0.5cm;
        }

        .report-header {
            text-align: center;
            margin-bottom: 0.8cm;
            padding-top: 0.5cm;
        }

        .report-header h2 {
            font-size: 18pt;
            font-weight: bold;
            margin-bottom: 0.3cm;
        }

        .school-info {
            font-size: 10pt;
            color: #666;
        }

        .student-info {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 1cm;
            margin-bottom: 0.8cm;
            font-size: 11pt;
        }

        .student-info div {
            display: flex;
            flex-direction: column;
            gap: 0.2cm;
        }

        .grades-section {
            margin-bottom: 0.8cm;
        }

        .grades-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 10pt;
        }

        .grades-table th {
            background-color: #f8f9fa;
            font-weight: bold;
            padding: 8px;
            border: 1px solid #000;
            text-align: center;
        }

        .grades-table td {
            padding: 6px 8px;
            border: 1px solid #000;
            text-align: center;
        }

        .grades-table td:first-child {
            text-align: left;
        }

        .term-header {
            background-color: #e9ecef;
            font-weight: bold;
        }

        .total-row {
            background-color: #f8f9fa;
            font-weight: bold;
        }

        .grading-scale {
            margin-bottom: 0.8cm;
        }

        .scale-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 8pt;
        }

        .scale-table th,
        .scale-table td {
            border: 1px solid #000;
            padding: 4px;
            text-align: center;
        }

        .attendance-comments {
            display: grid;
            grid-template-columns: 1fr;
            gap: 0.5cm;
        }

        .attendance-table,
        .comments-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 11pt;
        }

        .attendance-table th,
        .attendance-table td,
        .comments-table th,
        .comments-table td {
            border: 1px solid #000;
            padding: 8px;
            text-align: left;
        }

        .comments-table th {
            background-color: #f8f9fa;
            width: 25%;
        }

        .vector-image {
            position: absolute;
            bottom: 1cm;
            right: 1cm;
            width: 80px;
            height: auto;
        }

        @media print {
            body {
                print-color-adjust: exact;
                -webkit-print-color-adjust: exact;
            }
            
            .page {
                margin: 0;
                padding: 1cm;
            }
        }
    </style>
</head>
<body>

    <!-- COVER PAGE -->
    <div class="page">
        <div class="cover-page">
            <div class="cover-title">
                ${
                  logoBase64
                    ? `<img class="cover-logo" src="${logoBase64}" alt="School Logo">`
                    : '<div class="cover-logo" style="background-color: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666;">School Logo</div>'
                }
                <h1>Makarios Junior School</h1>
                <h2>Progress Report</h2>
                <h3>Academic Year ${selectedYear}</h3>
            </div>

            <div class="cover-info">
                <p><strong>Name:</strong> ${student.name}</p>
                <p><strong>Class:</strong> ${student.className}</p>
                <p><strong>Class Teacher:</strong> ${
                  student.classTeacher || 'Robert Kim'
                }</p>
            </div>
        </div>
    </div>

    <!-- MAIN REPORT PAGE -->
    <div class="page">
        <div class="report-page">
            ${
              logoBase64
                ? `<img class="report-logo" src="${logoBase64}" alt="Logo">`
                : '<div class="report-logo" style="background-color: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666; font-size: 8pt;">Logo</div>'
            }

            <div class="report-header">
                <h2>Makarios Junior School</h2>
                <div class="school-info">
                    <p>P.O. Box 600071 Kajjansi, Uganda</p>
                    <p>Tel: +256774258797 | Email: makariosjuniorschool@gmail.com</p>
                </div>
            </div>

            <div class="student-info">
                <div>
                    <p><strong>Student Name:</strong> ${student.name}</p>
                    <p><strong>Class:</strong> ${student.className}</p>
                </div>
                <div>
                    <p><strong>SPC:</strong> ${student.spc}</p>
                    <p><strong>Class Teacher:</strong> ${
                      student.classTeacher || 'Robert Kim'
                    }</p>
                    <p><strong>Section:</strong> Primary</p>
                </div>
            </div>

            <div class="grades-section">
                <table class="grades-table">
                    <tr class="term-header">
                        <th colspan="7">${selectedTerm.toUpperCase()} (May 26th ${selectedYear} - August 22nd, ${selectedYear}) Mid Term Report</th>
                    </tr>
                    <tr>
                        <th>Subject</th>
                        <th>Mid Term</th>
                        <th>End of Term</th>
                        <th>Final Mark</th>
                        <th>Grade</th>
                        <th>Teacher's Comment</th>
                        <th>Initials</th>
                    </tr>
                    <tr>
                        <td>English Language</td>
                        <td>${grades.englishLanguage.midTerm}</td>
                        <td>${grades.englishLanguage.endTerm}</td>
                        <td>${calculateFinalMark(grades.englishLanguage)}</td>
                        <td>${getGrade(
                          calculateFinalMark(grades.englishLanguage)
                        )}</td>
                        <td>Good progress</td>
                        <td>RK</td>
                    </tr>
                    <tr>
                        <td>Mathematics</td>
                        <td>${grades.mathematics.midTerm}</td>
                        <td>${grades.mathematics.endTerm}</td>
                        <td>${calculateFinalMark(grades.mathematics)}</td>
                        <td>${getGrade(
                          calculateFinalMark(grades.mathematics)
                        )}</td>
                        <td>Needs improvement</td>
                        <td>RK</td>
                    </tr>
                    <tr>
                        <td>Religious Education</td>
                        <td>${grades.religiousEducation.midTerm}</td>
                        <td>${grades.religiousEducation.endTerm}</td>
                        <td>${calculateFinalMark(
                          grades.religiousEducation
                        )}</td>
                        <td>${getGrade(
                          calculateFinalMark(grades.religiousEducation)
                        )}</td>
                        <td>Excellent</td>
                        <td>RK</td>
                    </tr>
                    <tr>
                        <td>Computer Studies</td>
                        <td>${grades.computerStudies.midTerm}</td>
                        <td>${grades.computerStudies.endTerm}</td>
                        <td>${calculateFinalMark(grades.computerStudies)}</td>
                        <td>${getGrade(
                          calculateFinalMark(grades.computerStudies)
                        )}</td>
                        <td>Good work</td>
                        <td>RK</td>
                    </tr>
                    <tr>
                        <td>Literacy 1 (Sci & SST)</td>
                        <td>${grades.literacy1.midTerm}</td>
                        <td>${grades.literacy1.endTerm}</td>
                        <td>${calculateFinalMark(grades.literacy1)}</td>
                        <td>${getGrade(
                          calculateFinalMark(grades.literacy1)
                        )}</td>
                        <td>Satisfactory</td>
                        <td>RK</td>
                    </tr>
                    <tr>
                        <td>Literacy 2 (Reading & Writing)</td>
                        <td>${grades.literacy2.midTerm}</td>
                        <td>${grades.literacy2.endTerm}</td>
                        <td>${calculateFinalMark(grades.literacy2)}</td>
                        <td>${getGrade(
                          calculateFinalMark(grades.literacy2)
                        )}</td>
                        <td>Good effort</td>
                        <td>RK</td>
                    </tr>
                    <tr class="total-row">
                        <td><strong>Total</strong></td>
                        <td colspan="2"></td>
                        <td><strong>${total}</strong></td>
                        <td colspan="3"><strong>(out of 600)</strong></td>
                    </tr>
                </table>
            </div>

            <div class="grading-scale">
                <table class="scale-table">
                    <tr>
                        <th>Grades</th>
                        <th>D1</th>
                        <th>D2</th>
                        <th>C3</th>
                        <th>C4</th>
                        <th>C5</th>
                        <th>C6</th>
                        <th>P7</th>
                        <th>P8</th>
                        <th>F9</th>
                    </tr>
                    <tr>
                        <th>Descriptive</th>
                        <td>Excellent</td>
                        <td>Very Good</td>
                        <td>Good</td>
                        <td>Satisfactory</td>
                        <td>Below Avg.</td>
                        <td>Below Avg.</td>
                        <td>Cause For Concern</td>
                        <td>Cause For Concern</td>
                        <td>Fail</td>
                    </tr>
                    <tr>
                        <th>Ranges</th>
                        <td>90% - 100%</td>
                        <td>75% - 89%</td>
                        <td>70% - 74%</td>
                        <td>60% - 69%</td>
                        <td>55% - 59%</td>
                        <td>50% - 54%</td>
                        <td>40% - 49%</td>
                        <td>30% - 39%</td>
                        <td>0% - 29%</td>
                    </tr>
                </table>
            </div>

            <div class="attendance-comments">
                <table class="attendance-table">
                    <tr>
                        <th>Expected attendance</th>
                        <td style="width: 80px;">95</td>
                        <th>Actual attendance</th>
                        <td style="width: 80px;">90</td>
                    </tr>
                </table>
                
                <table class="comments-table">
                    <tr>
                        <th>General Comments</th>
                        <td>Excellent performance overall. Keep up the good work!</td>
                        <th>Signature</th>
                    </tr>
                    <tr>
                        <th>Class Teacher's Comments</th>
                        <td>${
                          student.name
                        } shows great potential and dedication.</td>
                        <td></td>
                    </tr>
                    <tr>
                        <th>Head Teacher's Comments</th>
                        <td>Well done. Continue working hard.</td>
                        <td></td>
                    </tr>
                </table>
            </div>
            
            ${
              vectorBase64
                ? `<img class="vector-image" src="${vectorBase64}" alt="Vector">`
                : '<div class="vector-image" style="background-color: #f0f0f0; display: flex; align-items: center; justify-content: center; color: #666; font-size: 8pt;">Vector</div>'
            }
        </div>
    </div>
</body>
</html>`;
  };

  // Generate PDF using modern approach
  const generatePDF = async () => {
    setIsGenerating(true);

    try {
      // Generate HTML with embedded base64 images
      const htmlContent = await generateReportHTML(currentStudent, grades);

      // Create a blob and use it to generate PDF
      const blob = new Blob([htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);

      // Open in new window for printing to PDF
      const printWindow = window.open(url, '_blank');

      printWindow.onload = () => {
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
          URL.revokeObjectURL(url);
        }, 1000);
      };
    } catch (error) {
      console.error('Error generating report:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // Helper function to get grade based on mark
  const getGrade = (mark) => {
    if (mark >= 90) return 'D1';
    if (mark >= 75) return 'D2';
    if (mark >= 70) return 'C3';
    if (mark >= 60) return 'C4';
    if (mark >= 55) return 'C5';
    if (mark >= 50) return 'C6';
    if (mark >= 40) return 'P7';
    if (mark >= 30) return 'P8';
    return 'F9';
  };

  const total = calculateTotal();

  return (
    <div
      className="modal-backdrop text-black gap-[16px]"
      style={{
        left: context.isExpanded ? '170px' : '70px',
      }}
    >
      <div
        className="modal-container"
        style={{ width: '319px', height: '331px' }}
      >
        {/* Header */}
        <div className="modal-header">
          <h2 className="modal-title">Preview Reports</h2>
          <button onClick={onClose} className="modal-close-btn">
            <X size={20} />
          </button>
        </div>

        {/* Main Content */}
        <div className="flex">
          {/* Left Panel - Controls */}
          <div className="bg-white flex flex-col w-[100%] justify-center items-center mt-[25px]">
            {/* Academic Year Selection */}
            <div className="mb-6 text-center">
              <h3 className="text-sm font-medium text-gray-900 mb-3">
                Academic Year
              </h3>
              <div className="flex gap-2 justify-center">
                <select
                  className="border border-[#737373] rounded-[5px] w-[76px] h-[30px] text-[12px] font-normal text-[#737373] px-2 appearance-none leading-none"
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none',
                    backgroundImage:
                      "url(\"data:image/svg+xml;charset=US-ASCII,%3Csvg width='10' height='5' viewBox='0 0 10 5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l5 5 5-5z' fill='%23737373'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '0.6rem',
                  }}
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                >
                  <option value="2024">2024</option>
                  <option value="2025">2025</option>
                </select>

                <select
                  className="border border-[#737373] rounded-[5px] w-[84px] h-[30px] text-[12px] font-normal text-[#737373] px-2 appearance-none leading-none"
                  style={{
                    WebkitAppearance: 'none',
                    MozAppearance: 'none',
                    appearance: 'none',
                    backgroundImage:
                      "url(\"data:image/svg+xml;charset=US-ASCII,%3Csvg width='10' height='5' viewBox='0 0 10 5' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0l5 5 5-5z' fill='%23737373'/%3E%3C/svg%3E\")",
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'right 0.5rem center',
                    backgroundSize: '0.6rem',
                  }}
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                >
                  <option value="Term 1">Term 1</option>
                  <option value="Term 2">Term 2</option>
                  <option value="Term 3">Term 3</option>
                </select>
              </div>
            </div>

            {/* Select Student */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-[#0D0D0D] mb-3 text-center">
                Select Student {'  '}
                <span className="font-[300] text-[#737373]">
                  ({currentStudentIndex + 1} of {students.length})
                </span>
              </h3>

              {/* Student Navigation */}
              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() =>
                    setCurrentStudentIndex(Math.max(0, currentStudentIndex - 1))
                  }
                  disabled={currentStudentIndex === 0}
                  className="p-2 rounded-md  disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 19l-7-7 7-7"
                    />
                  </svg>
                </button>

                <div className="flex items-center gap-3 w-[200px]">
                  <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center">
                    <span className="text-white font-medium text-sm">
                      {currentStudent.name
                        .split(' ')
                        .map((n) => n[0])
                        .join('')
                        .substring(0, 2)}
                    </span>
                  </div>
                  <div>
                    <div className="font-[400] text-[14px] text-gray-900">
                      {currentStudent.name}
                    </div>
                    <div className="text-[#767676] text-[12px] font-[300]">
                      {currentStudent.className}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() =>
                    setCurrentStudentIndex(
                      Math.min(students.length - 1, currentStudentIndex + 1)
                    )
                  }
                  disabled={currentStudentIndex === students.length - 1}
                  className="p-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 flex flex-row gap-[10px]">
              <button
                onClick={onClose}
                className="h-[32px] w-[104px] gap-[5px] border-[1px] border-[#404040] rounded-[5px] text-[14px] font-[400] text-[#404040] flex flex-row items-center justify-center"
              >
                <ChevronLeft size={16} /> <span>Go Back</span>
              </button>

              <button
                onClick={generatePDF}
                disabled={isGenerating}
                className="h-[32px] w-[169px] bg-[#00BF76] text-white rounded-[5px] text-[14px] font-[300] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isGenerating ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <FilePlus size={16} />
                    Generate Reports
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Right Panel - Preview */}
      <div className="w-[769px] bg-white h-[550px] min-h-[400px]">
        <div className="grid grid-cols-2 gap-[0px] p-4 h-[500px]">
          {/* Cover Page Preview */}
          <div className="">
            <div
              className="transform scale-[0.45] origin-top-left"
              style={{ width: '21cm', height: '29.7cm' }}
            >
              <div className="border-4 border-[purple] p-8 h-[100%] flex flex-col justify-between text-center">
                <div className="mb-8">
                  <div className="w-32 h-32 mx-auto mb-4 rounded flex items-center justify-center">
                    <img src={schoolLogo} class />
                  </div>
                  <h1 className="text-4xl font-bold text-gray-900 mb-2">
                    Makarios Junior School
                  </h1>
                  <h2 className="text-2xl text-gray-600 mb-1">
                    Progress Report
                  </h2>
                  <h3 className="text-xl text-gray-600">
                    Academic Year {selectedYear}
                  </h3>
                </div>

                <div className="text-left space-y-2 text-lg">
                  <p>
                    <strong>Name:</strong> {currentStudent.name}
                  </p>
                  <p>
                    <strong>Class:</strong> {currentStudent.className}
                  </p>
                  <p>
                    <strong>Class Teacher:</strong>{' '}
                    {currentStudent.classTeacher || 'Robert Kim'}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Main Report Page Preview */}
          <div className="">
            <div
              className="transform scale-[0.45] origin-top-left"
              style={{ width: '21cm', height: '29.7cm' }}
            >
              <div className="border-4 border-[purple] p-6 h-full relative bg-white">
                <div className="w-16 h-16absolute top-4 left-4 rounded flex items-center justify-center text-xs">
                  <img src={schoolLogo} class />
                </div>

                <div className="text-center mb-6 pt-4">
                  <h2 className="text-2xl font-bold mb-2">
                    Makarios Junior School
                  </h2>
                  <div className="text-sm text-gray-600">
                    <p>P.O. Box 600071 Kajjansi, Uganda</p>
                    <p>
                      Tel: +256774258797 | Email: makariosjuniorschool@gmail.com
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-8 mb-6 text-sm">
                  <div className="space-y-1">
                    <p>
                      <strong>Student Name:</strong> {currentStudent.name}
                    </p>
                    <p>
                      <strong>Class:</strong> {currentStudent.className}
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p>
                      <strong>SPC:</strong> {currentStudent.spc}
                    </p>
                    <p>
                      <strong>Class Teacher:</strong>{' '}
                      {currentStudent.classTeacher || 'Robert Kim'}
                    </p>
                    <p>
                      <strong>Section:</strong> Primary
                    </p>
                  </div>
                </div>

                <div className="mb-6">
                  <table className="w-full border-collapse text-xs">
                    <tr className="bg-gray-200 font-bold">
                      <th colSpan="7" className="border border-black p-2">
                        {selectedTerm.toUpperCase()} (May 26th {selectedYear} -
                        August 22nd, {selectedYear}) Mid Term Report
                      </th>
                    </tr>
                    <tr>
                      <th className="border border-black p-2 bg-gray-100">
                        Subject
                      </th>
                      <th className="border border-black p-2 bg-gray-100">
                        Mid Term
                      </th>
                      <th className="border border-black p-2 bg-gray-100">
                        End of Term
                      </th>
                      <th className="border border-black p-2 bg-gray-100">
                        Final Mark
                      </th>
                      <th className="border border-black p-2 bg-gray-100">
                        Grade
                      </th>
                      <th className="border border-black p-2 bg-gray-100">
                        Teacher's Comment
                      </th>
                      <th className="border border-black p-2 bg-gray-100">
                        Initials
                      </th>
                    </tr>
                    <tr>
                      <td className="border border-black p-1 text-left">
                        English Language
                      </td>
                      <td className="border border-black p-1 text-center">
                        {grades.englishLanguage.midTerm}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {grades.englishLanguage.endTerm}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {calculateFinalMark(grades.englishLanguage)}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {getGrade(calculateFinalMark(grades.englishLanguage))}
                      </td>
                      <td className="border border-black p-1 text-center">
                        Good progress
                      </td>
                      <td className="border border-black p-1 text-center">
                        RK
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1 text-left">
                        Mathematics
                      </td>
                      <td className="border border-black p-1 text-center">
                        {grades.mathematics.midTerm}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {grades.mathematics.endTerm}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {calculateFinalMark(grades.mathematics)}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {getGrade(calculateFinalMark(grades.mathematics))}
                      </td>
                      <td className="border border-black p-1 text-center">
                        Needs improvement
                      </td>
                      <td className="border border-black p-1 text-center">
                        RK
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1 text-left">
                        Religious Education
                      </td>
                      <td className="border border-black p-1 text-center">
                        {grades.religiousEducation.midTerm}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {grades.religiousEducation.endTerm}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {calculateFinalMark(grades.religiousEducation)}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {getGrade(
                          calculateFinalMark(grades.religiousEducation)
                        )}
                      </td>
                      <td className="border border-black p-1 text-center">
                        Excellent
                      </td>
                      <td className="border border-black p-1 text-center">
                        RK
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1 text-left">
                        Computer Studies
                      </td>
                      <td className="border border-black p-1 text-center">
                        {grades.computerStudies.midTerm}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {grades.computerStudies.endTerm}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {calculateFinalMark(grades.computerStudies)}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {getGrade(calculateFinalMark(grades.computerStudies))}
                      </td>
                      <td className="border border-black p-1 text-center">
                        Good work
                      </td>
                      <td className="border border-black p-1 text-center">
                        RK
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1 text-left">
                        Literacy 1 (Sci & SST)
                      </td>
                      <td className="border border-black p-1 text-center">
                        {grades.literacy1.midTerm}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {grades.literacy1.endTerm}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {calculateFinalMark(grades.literacy1)}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {getGrade(calculateFinalMark(grades.literacy1))}
                      </td>
                      <td className="border border-black p-1 text-center">
                        Satisfactory
                      </td>
                      <td className="border border-black p-1 text-center">
                        RK
                      </td>
                    </tr>
                    <tr>
                      <td className="border border-black p-1 text-left">
                        Literacy 2 (Reading & Writing)
                      </td>
                      <td className="border border-black p-1 text-center">
                        {grades.literacy2.midTerm}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {grades.literacy2.endTerm}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {calculateFinalMark(grades.literacy2)}
                      </td>
                      <td className="border border-black p-1 text-center">
                        {getGrade(calculateFinalMark(grades.literacy2))}
                      </td>
                      <td className="border border-black p-1 text-center">
                        Good effort
                      </td>
                      <td className="border border-black p-1 text-center">
                        RK
                      </td>
                    </tr>
                    <tr className="bg-gray-100 font-bold">
                      <td className="border border-black p-1 text-left">
                        <strong>Total</strong>
                      </td>
                      <td className="border border-black p-1" colSpan="2"></td>
                      <td className="border border-black p-1 text-center">
                        <strong>{total}</strong>
                      </td>
                      <td
                        className="border border-black p-1 text-center"
                        colSpan="3"
                      >
                        <strong>(out of 600)</strong>
                      </td>
                    </tr>
                  </table>
                </div>

                <div className="mb-4">
                  <table className="w-full border-collapse text-xs">
                    <tr>
                      <th className="border border-black p-1 bg-gray-100">
                        Grades
                      </th>
                      <th className="border border-black p-1 bg-gray-100">
                        D1
                      </th>
                      <th className="border border-black p-1 bg-gray-100">
                        D2
                      </th>
                      <th className="border border-black p-1 bg-gray-100">
                        C3
                      </th>
                      <th className="border border-black p-1 bg-gray-100">
                        C4
                      </th>
                      <th className="border border-black p-1 bg-gray-100">
                        C5
                      </th>
                      <th className="border border-black p-1 bg-gray-100">
                        C6
                      </th>
                      <th className="border border-black p-1 bg-gray-100">
                        P7
                      </th>
                      <th className="border border-black p-1 bg-gray-100">
                        P8
                      </th>
                      <th className="border border-black p-1 bg-gray-100">
                        F9
                      </th>
                    </tr>
                    <tr>
                      <th className="border border-black p-1 bg-gray-100">
                        Descriptive
                      </th>
                      <td className="border border-black p-1 text-center">
                        Excellent
                      </td>
                      <td className="border border-black p-1 text-center">
                        Very Good
                      </td>
                      <td className="border border-black p-1 text-center">
                        Good
                      </td>
                      <td className="border border-black p-1 text-center">
                        Satisfactory
                      </td>
                      <td className="border border-black p-1 text-center">
                        Below Avg.
                      </td>
                      <td className="border border-black p-1 text-center">
                        Below Avg.
                      </td>
                      <td className="border border-black p-1 text-center">
                        Cause For Concern
                      </td>
                      <td className="border border-black p-1 text-center">
                        Cause For Concern
                      </td>
                      <td className="border border-black p-1 text-center">
                        Fail
                      </td>
                    </tr>
                    <tr>
                      <th className="border border-black p-1 bg-gray-100">
                        Ranges
                      </th>
                      <td className="border border-black p-1 text-center">
                        90% - 100%
                      </td>
                      <td className="border border-black p-1 text-center">
                        75% - 89%
                      </td>
                      <td className="border border-black p-1 text-center">
                        70% - 74%
                      </td>
                      <td className="border border-black p-1 text-center">
                        60% - 69%
                      </td>
                      <td className="border border-black p-1 text-center">
                        55% - 59%
                      </td>
                      <td className="border border-black p-1 text-center">
                        50% - 54%
                      </td>
                      <td className="border border-black p-1 text-center">
                        40% - 49%
                      </td>
                      <td className="border border-black p-1 text-center">
                        30% - 39%
                      </td>
                      <td className="border border-black p-1 text-center">
                        0% - 29%
                      </td>
                    </tr>
                  </table>
                </div>

                <div className="space-y-2">
                  <table className="w-full border-collapse text-xs">
                    <tr>
                      <th className="border border-black p-2 bg-gray-100 text-left">
                        Expected attendance
                      </th>
                      <td className="border border-black p-2 w-20">95</td>
                      <th className="border border-black p-2 bg-gray-100 text-left">
                        Actual attendance
                      </th>
                      <td className="border border-black p-2 w-20">90</td>
                    </tr>
                  </table>

                  <table className="w-full border-collapse text-xs">
                    <tr>
                      <th className="border border-black p-2 bg-gray-100 w-1/4">
                        General Comments
                      </th>
                      <td className="border border-black p-2">
                        Excellent performance overall. Keep up the good work!
                      </td>
                      <th className="border border-black p-2 bg-gray-100">
                        Signature
                      </th>
                    </tr>
                    <tr>
                      <th className="border border-black p-2 bg-gray-100">
                        Class Teacher's Comments
                      </th>
                      <td className="border border-black p-2">
                        {currentStudent.name} shows great potential and
                        dedication.
                      </td>
                      <td className="border border-black p-2"></td>
                    </tr>
                    <tr>
                      <th className="border border-black p-2 bg-gray-100">
                        Head Teacher's Comments
                      </th>
                      <td className="border border-black p-2">
                        Well done. Continue working hard.
                      </td>
                      <td className="border border-black p-2"></td>
                    </tr>
                  </table>
                </div>

                <div className="absolute bottom-4 right-4 w-20 h-16 rounded flex items-center justify-center">
                  <img src={VectorImage} class />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
// Progress Component
const ProgressIndicator = ({ isGenerating, progress, estimatedTime }) => {
  if (!isGenerating) return null;

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
      <div className="flex items-center gap-3 mb-3">
        <Loader2 size={16} className="animate-spin text-blue-600" />
        <span className="font-medium">Generating Reports...</span>
      </div>

      <div className="w-full bg-gray-200 rounded-full h-2 mb-2">
        <div
          className="h-2 rounded-full transition-all duration-300"
          style={{
            width: `${progress}%`,
            backgroundColor: '#007EA7',
          }}
        ></div>
      </div>

      <div className="flex justify-between text-sm text-gray-600">
        <span>{progress}% Complete</span>
        <span>Estimated time: {estimatedTime}</span>
      </div>
    </div>
  );
};

// Main Reports Component
function Reports() {
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);
  const [isIndividualModalOpen, setIsIndividualModalOpen] = useState(false);
  const [isPreviewModalOpen, setIsPreviewModalOpen] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState('');
  const [currentReportData, setCurrentReportData] = useState(null);
  const [reportsHistory, setReportsHistory] = useState([
    {
      type: 'Bulk',
      reportId: 'GSFA1EAN',
      dateCreated: '14/07/2025',
      students: 214,
      classes: 9,
    },
    {
      type: 'Bulk',
      reportId: 'GSFA1EAN',
      dateCreated: '14/07/2025',
      students: 214,
      classes: 9,
    },
    {
      type: 'Bulk',
      reportId: 'GSFA1EAN',
      dateCreated: '14/07/2025',
      students: 214,
      classes: 9,
    },
    {
      type: 'Bulk',
      reportId: 'GSFA1EAN',
      dateCreated: '14/07/2025',
      students: 214,
      classes: 9,
    },
    {
      type: 'Bulk',
      reportId: 'GSFA1EAN',
      dateCreated: '14/07/2025',
      students: 214,
      classes: 9,
    },
    {
      type: 'Bulk',
      reportId: 'GSFA1EAN',
      dateCreated: '14/07/2025',
      students: 214,
      classes: 9,
    },
    {
      type: 'Individual',
      reportId: 'IGSF2BCD',
      dateCreated: '13/07/2025',
      students: 5,
      classes: 3,
    },
    {
      type: 'Individual',
      reportId: 'IGSF2BCD',
      dateCreated: '13/07/2025',
      students: 5,
      classes: 3,
    },
    {
      type: 'Individual',
      reportId: 'IGSF2BCD',
      dateCreated: '13/07/2025',
      students: 5,
      classes: 3,
    },
  ]);

  const recentReport = {
    id: 'GSFA1EAN2',
    dateCreated: '14/07/2025',
    students: 214,
    classes: 9,
    expiresIn: '1d 13h 26m',
  };

  const handleGenerateReports = async (reportData) => {
    setCurrentReportData(reportData);
    setIsGenerating(true);
    setProgress(0);

    const totalStudents =
      reportData.type === 'bulk'
        ? reportData.classes.reduce((sum, cls) => sum + cls.students.length, 0)
        : reportData.students.length;

    const baseTime = totalStudents * 0.5; // 0.5 seconds per student
    setEstimatedTime(`${Math.ceil(baseTime)}s`);

    // Simulate progress
    for (let i = 0; i <= 100; i += 10) {
      await new Promise((resolve) => setTimeout(resolve, baseTime * 10));
      setProgress(i);
      if (i < 100) {
        const remainingTime = Math.ceil((baseTime * (100 - i)) / 100);
        setEstimatedTime(`${remainingTime}s`);
      }
    }

    // Add to history
    const newHistoryItem = {
      type: reportData.type === 'bulk' ? 'Bulk' : 'Individual',
      reportId: Math.random().toString(36).substr(2, 8).toUpperCase(),
      dateCreated: new Date().toLocaleDateString('en-GB'),
      students: totalStudents,
      classes:
        reportData.type === 'bulk'
          ? reportData.classes.length
          : new Set(reportData.students.map((s) => s.className)).size,
    };

    setReportsHistory((prev) => [newHistoryItem, ...prev]);
    setIsGenerating(false);
    setIsPreviewModalOpen(true);
  };

  return (
    <div className="body-container">
      <ContentBox contentHeading="Reports">
        <div className="reports-container">
          {/* Left Panel */}
          <div className="left-panel">
            {/* Generate New Reports Section */}
            <div className="section" id="generate-reports">
              <div className="section-header">
                {isGenerating ? (
                  <Loader2
                    className="w-[16px] h-[16px] animate-spin"
                    color="#000000"
                  />
                ) : (
                  <FilePlus2 className="w-[16px] h-[16px]" color="#000000" />
                )}
                <h3 className="section-title m-0">
                  {isGenerating ? 'Generating Reports' : 'Generate New Reports'}
                </h3>
              </div>

              <ProgressIndicator
                isGenerating={isGenerating}
                progress={progress}
                estimatedTime={estimatedTime}
              />

              <div className="button-group">
                <button
                  className="bulk-button"
                  onClick={() => setIsBulkModalOpen(true)}
                  disabled={isGenerating}
                >
                  <FileStack className="w-[16px] h-[16px]" />
                  Bulk
                </button>
                <button
                  className="single-button"
                  onClick={() => setIsIndividualModalOpen(true)}
                  disabled={isGenerating}
                >
                  <File className="w-[16px] h-[16px]" />
                  Single
                </button>
              </div>
            </div>

            {/* Recently Generated Section */}
            <div className="section" id="recently-generated-reports">
              <div className="section-header pt-[24px] pl-[24px]">
                <History className="w-[16px] h-[16px]" color="#000000" />
                <h3 className="section-title m-0">Recently Generated</h3>
              </div>

              <div className="recent-report-card">
                <div className="report-info-grid">
                  <div className="info-item">
                    <span className="info-label">Report ID</span>
                    <span className="info-value">{recentReport.id}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Date Created</span>
                    <span className="info-value">
                      {recentReport.dateCreated}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Students</span>
                    <span className="info-value">{recentReport.students}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Classes</span>
                    <span className="info-value">{recentReport.classes}</span>
                  </div>
                </div>

                <div className="expires-info">
                  <span className="info-label">Expires In</span>
                  <div className="flex flex-row justify-start items-center">
                    <CircleAlert
                      className="w-[16px] h-[16px] mr-[5px]"
                      color="hsla(0, 50%, 50%, 1)"
                    />
                    <span className="expires-time">
                      {recentReport.expiresIn}
                    </span>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="send-button text-[14px] w-[159px]">
                    <Send className="w-[16px] h-[16px]" />
                    Send To Parents
                  </button>
                  <div className="flex flex-row justify-start items-center gap-[15px] w-[100%]">
                    <button className="download-button w-[159px] text-[14px]">
                      <Download className="w-[16px] h-[16px]" />
                      Download (PDF)
                    </button>
                    <span className="file-size">
                      Approx. <br />
                      240.0 MB
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - History */}
          <div className="right-panel">
            <div className="section p-[24px]">
              <div className="section-header">
                <FileClock className="w-[16px] h-[16px]" color="#000000" />
                <h3 className="section-title">History</h3>
              </div>

              {/* Scrollable table container */}
              <div className="history-table overflow-y-auto max-h-[900px]">
                <table className="history-table-element w-full text-left border-collapse">
                  <thead>
                    <tr className="table-header">
                      <th className="header-cell">Type</th>
                      <th className="header-cell">Report ID</th>
                      <th className="header-cell">Date Created</th>
                      <th className="header-cell">Students</th>
                      <th className="header-cell">Classes</th>
                    </tr>
                  </thead>
                  <tbody className="table-body">
                    {reportsHistory.map((item, index) => (
                      <tr key={index} className="table-row">
                        <td className="table-cell">{item.type}</td>
                        <td className="table-cell">{item.reportId}</td>
                        <td className="table-cell">{item.dateCreated}</td>
                        <td className="table-cell">{item.students}</td>
                        <td className="table-cell">{item.classes}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </ContentBox>

      {/* Modals */}
      <BulkReportsModal
        isOpen={isBulkModalOpen}
        onClose={() => setIsBulkModalOpen(false)}
        onGenerate={handleGenerateReports}
      />

      <IndividualReportsModal
        isOpen={isIndividualModalOpen}
        onClose={() => setIsIndividualModalOpen(false)}
        onGenerate={handleGenerateReports}
      />

      <PreviewModal
        isOpen={isPreviewModalOpen}
        onClose={() => setIsPreviewModalOpen(false)}
        reportData={currentReportData}
      />
    </div>
  );
}

export default Reports;
