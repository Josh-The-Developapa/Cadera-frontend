import React, { useEffect, useState } from 'react';
import './Teachers.css';
import ContentBox from '../../../components/ContentBox/ContentBox';
import TeacherIcon from '../../../assets/teacher.png';
import { Trash2 } from 'lucide-react';
import SearchIcon from '../../../assets/search-1.svg';

// Mock data representing registered teachers
import teachers from './TeachersData.js';

function Teachers() {
  // State management
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hues, setHues] = useState([]);
  const [subjectHues, setSubjectHues] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // Generate random hues for teachers and their subjects on component mount
  useEffect(() => {
    // Generate random hues for teacher cards
    const generatedHues = teachers.map(() => Math.floor(Math.random() * 361));
    setHues(generatedHues);

    // Generate random hues for subject tags
    const subjectHueMap = {};
    teachers.forEach((teacher, tIndex) => {
      subjectHueMap[tIndex] = teacher.subjects.map(() =>
        Math.floor(Math.random() * 361)
      );
    });
    setSubjectHues(subjectHueMap);
  }, []);

  // Filter teachers based on search query
  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get currently selected teacher
  const selectedTeacher = teachers[selectedIndex];

  // Generate dynamic gradient style for teacher cards
  const getTeacherCardStyle = (originalIndex) => {
    const hue = hues[originalIndex];
    if (hue === undefined) return {};

    return {
      background: `linear-gradient(to right, hsla(${hue}, 30%, 35%, 0.1), hsla(${hue}, 30%, 65%, 0.1))`,
      border:
        selectedIndex === originalIndex
          ? '2px solid #00BF76'
          : '1px solid #d1d5db',
    };
  };

  // Generate dynamic style for subject tags
  const getSubjectTagStyle = (subjIndex) => {
    const subjHue = subjectHues[selectedIndex]?.[subjIndex];
    if (subjHue === undefined) return {};

    return {
      backgroundColor: `hsla(${subjHue}, 70%, 80%, 0.3)`,
      color: `hsl(${subjHue}, 30%, 20%)`,
      fontSize: '12px',
    };
  };

  // Handle teacher selection
  const handleTeacherSelect = (originalIndex) => {
    setSelectedIndex(originalIndex);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="body-container">
      <ContentBox contentHeading="Manage Teachers">
        <div className="teachers-content-container text-gray-800">
          {/* Teachers List Section */}
          <div className="all-teachers">
            {/* Search Header */}
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">All Teachers</h2>
              <div className="teacher-search-bar">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <img
                  src={SearchIcon}
                  alt="Search"
                  className="teacher-search-icon"
                />
              </div>
            </div>

            {/* Table Header */}
            <div className="teacher-info-container font-semibold">
              <div style={{ width: '25%' }}>Name</div>
              <div
                style={{
                  width: '25%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                Subjects
              </div>
              <div
                style={{
                  width: '25%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                Classes
              </div>
              <div
                style={{
                  width: '25%',
                  display: 'flex',
                  justifyContent: 'center',
                }}
              >
                Staff ID
              </div>
            </div>

            {/* Teachers List */}
            <div className="space-y-2 teacher-list">
              {filteredTeachers.map((teacher, index) => {
                const originalIndex = teachers.findIndex(
                  (t) => t.id === teacher.id
                );
                const cardStyle = getTeacherCardStyle(originalIndex);

                return (
                  <div
                    key={originalIndex}
                    className="teacher-info-container cursor-pointer h-[70px]"
                    onClick={() => handleTeacherSelect(originalIndex)}
                    style={cardStyle}
                  >
                    {/* Teacher Name */}
                    <span
                      style={{
                        width: '25%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        textAlign: 'left',
                        fontSize: '14px',
                        fontWeight: '400',
                      }}
                    >
                      {teacher.name}
                    </span>

                    {/* Teacher Subjects */}
                    <span
                      style={{
                        width: '20%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        fontSize: '14px',
                        fontWeight: '400',
                      }}
                    >
                      {teacher.subjects.join(', ')}
                    </span>

                    {/* Class Count */}
                    <span
                      style={{
                        width: '20%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '14px',
                        fontWeight: '400',
                      }}
                    >
                      {teacher.classCount}
                    </span>

                    {/* Staff ID */}
                    <span
                      style={{
                        width: '20%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        fontSize: '14px',
                        fontWeight: '400',
                      }}
                    >
                      {teacher.id}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Teacher Details Section */}
          <div>
            <div
              className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center h-[70vh] max-h-[615px] min-h-[450px] w-[391px]"
              style={{ boxShadow: '2px 6px 15px rgba(0, 0, 0, 0.1)' }}
            >
              {/* Teacher Avatar */}
              <img
                src={TeacherIcon}
                alt="Teacher-Icon"
                style={{ height: '40%', width: 'auto' }}
              />

              {/* Teacher Name and Role */}
              <h3 className="text-black font-semibold text-xl mb-[10px]">
                {selectedTeacher.name}
              </h3>
              <p className="text-gray-500 mb-0">Teacher</p>

              {/* Subject Tags */}
              <div className="flex flex-wrap justify-center gap-2 mb-[10%] w-[250px] mt-[10%]">
                {selectedTeacher.subjects.map((subj, idx) => {
                  const tagStyle = getSubjectTagStyle(idx);
                  return (
                    <span
                      key={idx}
                      style={tagStyle}
                      className="text-sm px-3 py-1 rounded-[5px]"
                    >
                      {subj}
                    </span>
                  );
                })}
              </div>

              {/* Assigned Classes Info */}
              <div className="text-center bg-gray-50 rounded-md py-3 px-4 text-sm mb-4">
                <p className="font-medium">Assigned Classes</p>
                <p>{selectedTeacher.assignedClasses?.join(', ') || 'None'}</p>
              </div>

              {/* Assign Classes Button */}
              <button className="bg-black text-white px-4 py-2 rounded-md mb-[25px] w-[180px]">
                Assign Classes
              </button>

              {/* Footer Section */}
              <div className="flex flex-row justify-between items-end w-full h-[100px]">
                {/* Staff Info */}
                <p className="text-xs text-gray-400 mb-1">
                  Staff ID: {selectedTeacher.id} <br />
                  Profile Modified: 20/03/2025
                </p>

                {/* Delete Button */}
                <button className="text-red-500 mt-4">
                  <Trash2 />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ContentBox>
    </div>
  );
}

export default Teachers;
