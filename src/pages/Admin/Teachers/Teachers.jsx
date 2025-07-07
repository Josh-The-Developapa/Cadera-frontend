import React, { useEffect, useState } from 'react';
import './Teachers.css';
import ContentBox from '../../../components/ContentBox/ContentBox';
import TeacherIcon from '../../../assets/teacher.png';
import { Trash2 } from 'lucide-react';
import SearchIcon from '../../../assets/search-1.svg';

const teachers = [
  {
    name: 'Kevin Kent Asiimwe',
    id: 'B98A2D',
    subjects: ['HIS', 'GEO', 'SST'],
    classCount: 3,
    assignedClasses: ['P7Y', 'S1S', 'S3S'],
  },
  {
    name: 'Kevin Kent Musinguzi',
    id: 'ADMH001',
    subjects: ['HIS', 'GEO'],
    classCount: 4,
    assignedClasses: ['P7P', 'P7K', 'S1N', 'S2Q'],
  },
  {
    name: 'Brenda Namatovu',
    id: 'UGT7832',
    subjects: ['ENG', 'LIT'],
    classCount: 2,
    assignedClasses: ['S2E', 'S3W'],
  },
  {
    name: 'Ronald Kaggwa',
    id: 'UGX1145',
    subjects: ['MAT', 'PHY'],
    classCount: 3,
    assignedClasses: ['S1N', 'S2S', 'S4W'],
  },
  {
    name: 'Sarah Akello',
    id: 'KLA9217',
    subjects: ['BIO', 'CHE'],
    classCount: 3,
    assignedClasses: ['S2N', 'S3E', 'S4E'],
  },
  {
    name: 'Julius Okumu',
    id: 'MBA6403',
    subjects: ['AGR', 'SST'],
    classCount: 2,
    assignedClasses: ['P6A', 'P7N'],
  },
  {
    name: 'Stella Namaganda',
    id: 'ENT4598',
    subjects: ['FRE', 'ENG'],
    classCount: 1,
    assignedClasses: ['S3N'],
  },
  {
    name: 'Brian Ssentongo',
    id: 'JIN2379',
    subjects: ['ICT', 'PHY'],
    classCount: 3,
    assignedClasses: ['S2W', 'S3E', 'S4S'],
  },
  {
    name: 'Joan Nabakka',
    id: 'ARU1110',
    subjects: ['MAT', 'ENG'],
    classCount: 4,
    assignedClasses: ['S1W', 'S2N', 'S3S', 'S4N'],
  },
  {
    name: 'Moses Kintu',
    id: 'KYE7420',
    subjects: ['GEO', 'HIS'],
    classCount: 2,
    assignedClasses: ['S2E', 'S4W'],
  },
];

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
            <div className="bg-white rounded-xl shadow-md p-10 flex flex-col items-center h-[600px] w-[360px]">
              <img
                src={TeacherIcon}
                alt="Teacher-Icon"
                style={{ height: '150px', width: '150px' }}
              />
              <h3 className="text-black font-semibold mb-1 text-xl">
                {selectedTeacher.name}
              </h3>
              <p className="mb-4 text-gray-500">Teacher</p>
              <div className="flex flex-wrap justify-center gap-2 mb-[35px] w-[250px] mt-[20px]">
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
