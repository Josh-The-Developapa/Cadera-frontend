import React, { useEffect, useState } from 'react';
import './Teachers.css';
import ContentBox from '../../../components/ContentBox/ContentBox';
import TeacherIcon from '../../../assets/teacher.png';
import { ClipboardPlus, Trash2 } from 'lucide-react';
import SearchIcon from '../../../assets/search-1.svg';
import TeacherAssignModal from './Modals/TeacherAssign/TeacherAssign.jsx'; // Import the modal component
import CreateTeacher from './Modals/CreateTeacher/CreateTeacherModal.jsx';
import teachers from './TeachersData.js';

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
                            borderTopRightRadius: '5px',
                            borderBottomRightRadius: '5px',
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
              className="bg-white rounded-xl shadow-md pt-[40px] flex flex-col items-center h-[73vh] max-h-[484px] min-h-[450px] w-[331px]"
              style={{ boxShadow: '2px 6px 15px rgba(0, 0, 0, 0.1)' }}
            >
              <img
                src={TeacherIcon}
                alt="Teacher-Icon"
                style={{ height: '114px', width: '114px', objectFit: 'cover' }}
              />
              <h3 className="text-black font-[400] text-[14px] mb-[0px]">
                {selectedTeacher.name}
              </h3>
              <p className="text-[14px] font-[300] text-[#727272]">Teacher</p>

              <div className="flex flex-wrap justify-center gap-2 mb-[24px] w-[250px] mt-[18px]">
                {selectedTeacher.subjects.map((subj, idx) => {
                  return (
                    <span
                      key={idx}
                      className="text-[10px] text-[#000000] border border-[#A6A6A6] font-[300] px-3 py-1 rounded-[5px]"
                    >
                      {subj}
                    </span>
                  );
                })}
              </div>

              <div className="text-center bg-gray-50 rounded-md py-3 px-4 text-sm mb-[24px] text-[#6d6d6d]">
                <p className="font-[500] text-[13px] ">Assigned Classes</p>
                <p className="text-[13px] font-[300]">
                  {selectedTeacher.assignedClasses?.join(', ') || 'None'}
                </p>
              </div>

              <button
                className="bg-[#7F3F98] text-[14px] font-[300] text-white px-4 py-2 rounded-md  w-[180px] flex flex-row justify-center items-center gap-[5px]"
                onClick={handleOpenModal}
              >
                <ClipboardPlus size={16} />
                Assign Classes
              </button>

              <div className="flex flex-row justify-between items-center px-[24px] w-full h-[100px]">
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
      <TeacherAssignModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        teacher={selectedTeacher}
        onSaveChanges={handleSaveChanges}
      />
      {/* <CreateTeacher
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        teacher={selectedTeacher}
        onSaveChanges={handleSaveChanges}
      /> */}
    </div>
  );
}

export default Teachers;
