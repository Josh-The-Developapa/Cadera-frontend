import React, { useEffect, useState } from 'react';
import './Teachers.css';
import ContentBox from '../../../components/ContentBox/ContentBox';
import TeacherIcon from '../../../assets/teacher.png';
import { Trash2 } from 'lucide-react';
import SearchIcon from '../../../assets/search-1.svg';
import TeacherAssignModal from '../../../components/TeacherAssignModal/TeacherAssignModal.jsx'; // Import the modal component
import teachers from './TeachersData.js';
import CreateStaffModal from '../../../components/CreateTeacherModal/CreateTeacherModal.jsx';

function Teachers() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hues, setHues] = useState([]);
  const [subjectHues, setSubjectHues] = useState({});
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const [teachersList, setTeachersList] = useState(teachers); // Make teachers list mutable

  useEffect(() => {
    const generatedHues = teachersList.map(() =>
      Math.floor(Math.random() * 361)
    );
    setHues(generatedHues);

    const subjectHueMap = {};
    teachersList.forEach((teacher, tIndex) => {
      subjectHueMap[tIndex] = teacher.subjects.map(() =>
        Math.floor(Math.random() * 361)
      );
    });
    setSubjectHues(subjectHueMap);
  }, [teachersList]);

  const filteredTeachers = teachersList.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTeacher = teachersList[selectedIndex];

  const getSubjectTagStyle = (subjIndex) => {
    const subjHue = subjectHues[selectedIndex]?.[subjIndex];
    if (subjHue === undefined) return {};
    return {
      backgroundColor: `hsla(${subjHue}, 70%, 80%, 0.3)`,
      color: `hsl(${subjHue}, 30%, 20%)`,
      fontSize: '12px',
    };
  };

  const handleTeacherSelect = (originalIndex) => {
    setSelectedIndex(originalIndex);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveChanges = (assignmentData) => {
    // Update the selected teacher's assigned classes
    setTeachersList((prevTeachers) =>
      prevTeachers.map((teacher, index) =>
        index === selectedIndex
          ? {
              ...teacher,
              assignedClasses: assignmentData.classes,
              subjectAssignments: assignmentData.subjects,
            }
          : teacher
      )
    );
  };

  return (
    <div className="body-container">
      <ContentBox contentHeading="Manage Teachers">
        <div className="teachers-content-container text-gray-800">
          <div className="all-teachers">
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="text-[16px]">All Teachers</h2>
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

            <div className="teacher-list">
              <table className="teacher-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Subjects</th>
                    <th>Classes</th>
                    <th>Staff ID</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTeachers.map((teacher) => {
                    const originalIndex = teachersList.findIndex(
                      (t) => t.id === teacher.id
                    );
                    const isSelected = selectedIndex === originalIndex;

                    const baseColor =
                      originalIndex % 2 === 0
                        ? 'hsla(189, 64%, 95%, 1)'
                        : 'hsla(0, 0%, 98%, 1)';

                    const selectedColor =
                      originalIndex % 2 === 0
                        ? 'hsla(189, 64%, 85%, 1)'
                        : 'hsla(0, 0%, 85%, 1)';

                    return (
                      <tr
                        key={originalIndex}
                        onClick={() => handleTeacherSelect(originalIndex)}
                        style={{
                          backgroundColor: isSelected
                            ? selectedColor
                            : baseColor,
                          // borderRadius: '10px',
                          transition: 'all 0.2s ease-in-out',
                        }}
                      >
                        <td>{teacher.name}</td>
                        <td>{teacher.subjects.join(', ')}</td>
                        <td>{teacher.classCount}</td>
                        <td
                          style={{
                            borderTopRightRadius: '10px',
                            borderBottomRightRadius: '10px',
                          }}
                        >
                          {teacher.id}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <div
              className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center h-[70vh] max-h-[615px] min-h-[450px] w-[391px]"
              style={{ boxShadow: '2px 6px 15px rgba(0, 0, 0, 0.1)' }}
            >
              <img
                src={TeacherIcon}
                alt="Teacher-Icon"
                style={{ height: '40%', width: 'auto' }}
              />
              <h3 className="text-black font-semibold text-xl mb-[10px]">
                {selectedTeacher.name}
              </h3>
              <p className="text-gray-500 mb-0">Teacher</p>

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

              <div className="text-center bg-gray-50 rounded-md py-3 px-4 text-sm mb-4">
                <p className="font-medium">Assigned Classes</p>
                <p>{selectedTeacher.assignedClasses?.join(', ') || 'None'}</p>
              </div>

              <button
                className="bg-black text-white px-4 py-2 rounded-md mb-[25px] w-[180px]"
                onClick={handleOpenModal}
              >
                Assign Classes
              </button>

              <div className="flex flex-row justify-between items-end w-full h-[100px]">
                <p className="text-xs text-gray-400 mb-1">
                  Staff ID: {selectedTeacher.id} <br />
                  Profile Modified: {new Date().toLocaleDateString('en-GB')}
                </p>
                <button className="text-red-500 mt-4">
                  <Trash2 />
                </button>
              </div>
            </div>
          </div>
        </div>
      </ContentBox>

      {/* Modal Component */}
      <CreateStaffModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        teacher={selectedTeacher}
        onSaveChanges={handleSaveChanges}
      />
    </div>
  );
}

export default Teachers;
