import React, { useEffect, useState } from 'react';
import './Teachers.css';
import ContentBox from '../../../components/ContentBox/ContentBox';
import TeacherIcon from '../../../assets/teacher.png';
import { Trash2 } from 'lucide-react';
import SearchIcon from '../../../assets/search-1.svg';

// Mock data representing registered teachers
import teachers from './TeachersData.js';

function Teachers() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [hues, setHues] = useState([]);
  const [subjectHues, setSubjectHues] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const generatedHues = teachers.map(() => Math.floor(Math.random() * 361));
    setHues(generatedHues);

    const subjectHueMap = {};
    teachers.forEach((teacher, tIndex) => {
      subjectHueMap[tIndex] = teacher.subjects.map(() =>
        Math.floor(Math.random() * 361)
      );
    });
    setSubjectHues(subjectHueMap);
  }, []);

  const filteredTeachers = teachers.filter((teacher) =>
    teacher.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedTeacher = teachers[selectedIndex];

  return (
    <div className="body-container">
      <ContentBox contentHeading="Manage Teachers">
        <div className="teachers-content-container text-gray-800">
          <div className="all-teachers">
            <div className="flex flex-row justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">All Teachers</h2>
              <div className="teacher-search-bar">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img
                  src={SearchIcon}
                  alt="Search"
                  className="teacher-search-icon"
                />
              </div>
            </div>

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

            <div className="space-y-2 teacher-list">
              {filteredTeachers.map((teacher, index) => {
                const originalIndex = teachers.findIndex(
                  (t) => t.id === teacher.id
                );
                const hue = hues[originalIndex];
                const gradientStyle =
                  hue !== undefined
                    ? {
                        background: `linear-gradient(to right, hsla(${hue}, 30%, 35%, 0.1), hsla(${hue}, 30%, 65%, 0.1))`,
                        border:
                          selectedIndex === originalIndex
                            ? '2px solid #00BF76'
                            : '1px solid #d1d5db',
                      }
                    : {};

                return (
                  <div
                    key={originalIndex}
                    className="teacher-info-container cursor-pointer h-[70px]"
                    onClick={() => setSelectedIndex(originalIndex)}
                    style={gradientStyle}
                  >
                    <span
                      style={{
                        width: '20%',
                        display: 'flex',
                        justifyContent: 'flex-start',
                        alignItems: 'flex-start',
                        textAlign: 'left',
                      }}
                    >
                      {teacher.name}
                    </span>
                    <span
                      style={{
                        width: '20%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                      }}
                    >
                      {teacher.subjects.join(', ')}
                    </span>
                    <span
                      style={{
                        width: '20%',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    >
                      {teacher.classCount}
                    </span>
                    <span
                      style={{
                        width: '20%',
                        display: 'flex',
                        justifyContent: 'center',

                        alignItems: 'center',
                      }}
                    >
                      {teacher.id}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <div
              className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center h-[75vh] w-[360px]"
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
              <p className=" text-gray-500 mb-0">Teacher</p>
              <div className="flex flex-wrap justify-center gap-2 mb-[10%] w-[250px] mt-[10%]">
                {selectedTeacher.subjects.map((subj, idx) => {
                  const subjHue = subjectHues[selectedIndex]?.[idx];
                  const style =
                    subjHue !== undefined
                      ? {
                          backgroundColor: `hsla(${subjHue}, 70%, 80%, 0.3)`,
                          color: `hsl(${subjHue}, 30%, 20%)`,
                          fontSize: '12px',
                        }
                      : {};
                  return (
                    <span
                      key={idx}
                      style={style}
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
              <button className="bg-black text-white px-4 py-2 rounded-md mb-[25px] w-[180px]">
                Assign Classes
              </button>
              <div className="flex flex-row justify-between items-end w-full h-[100px]">
                <p className="text-xs text-gray-400 mb-1">
                  Staff ID: {selectedTeacher.id} <br /> Profile Modified:
                  20/03/2025
                </p>
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
