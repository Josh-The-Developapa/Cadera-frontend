import React, { useEffect, useState } from 'react';
import './Classes.css';
import ContentBox from '../../../components/ContentBox/ContentBox';
import SearchIcon from '../../../assets/search-1.svg';
import { Plus, MoreHorizontal } from 'lucide-react';
import MaleSVG from '../../../assets/male.svg';
import FemaleSVG from '../../../assets/female.svg';
import BothGendersSVG from '../../../assets/both-genders.svg';

// MOCK DATA
const mockClasses = [
  {
    id: 'C1',
    name: 'P7P',
    level: 'P7',
    subjects: ['HIS', 'GEO', 'MAT', 'CHE', 'HIS', 'KIS', 'FRE', 'FRE'],
    students: 76,
    male: 35,
    female: 41,
    teachers: [
      { name: 'Emmanuel Asiimwe', avatar: 'https://i.pravatar.cc/150?img=12' },
      { name: 'Joshua Mukisa', avatar: 'https://i.pravatar.cc/150?img=14' },
      { name: 'Kevin Porter', avatar: 'https://i.pravatar.cc/150?img=8' },
      { name: 'Other1' },
      { name: 'Other2' },
    ],
  },
  {
    id: 'C2',
    name: 'S5S',
    level: 'S5',
    subjects: ['HIS', 'GEO', 'MAT', 'CHE', 'HIS', 'KIS', 'FRE', 'FRE'],
    students: 76,
    male: 35,
    female: 41,
    teachers: [
      { name: 'Emmanuel Asiimwe', avatar: 'https://i.pravatar.cc/150?img=12' },
      { name: 'Joshua Mukisa', avatar: 'https://i.pravatar.cc/150?img=14' },
      { name: 'Kevin Porter', avatar: 'https://i.pravatar.cc/150?img=8' },
      { name: 'Other1' },
      { name: 'Other2' },
    ],
  },
  {
    id: 'C3',
    name: 'P6P',
    level: 'P6',
    subjects: ['ENG', 'MAT', 'BIO', 'CHE'],
    students: 60,
    male: 28,
    female: 32,
    teachers: [
      { name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=6' },
      { name: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=7' },
    ],
  },
  {
    id: 'C4',
    name: 'P5S',
    level: 'P5',
    subjects: ['ENG', 'MAT', 'BIO', 'CHE'],
    students: 60,
    male: 28,
    female: 32,
    teachers: [
      { name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=6' },
      { name: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=7' },
    ],
  },
  {
    id: 'C5',
    name: 'P3P',
    level: 'P3',
    subjects: ['ENG', 'MAT', 'BIO', 'CHE'],
    students: 60,
    male: 28,
    female: 32,
    teachers: [
      { name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=6' },
      { name: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=7' },
    ],
  },
  {
    id: 'C6',
    name: 'P4N',
    level: 'P4',
    subjects: ['ENG', 'MAT', 'BIO', 'CHE'],
    students: 60,
    male: 28,
    female: 32,
    teachers: [
      { name: 'Jane Doe', avatar: 'https://i.pravatar.cc/150?img=6' },
      { name: 'John Smith', avatar: 'https://i.pravatar.cc/150?img=7' },
    ],
  },
];

function Classes() {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [hues, setHues] = useState([]);
  const [subjectHues, setSubjectHues] = useState({});

  useEffect(() => {
    const generatedHues = mockClasses.map(() =>
      Math.floor(Math.random() * 361)
    );
    setHues(generatedHues);

    const subjectHueMap = {};
    mockClasses.forEach((cls, cIndex) => {
      subjectHueMap[cIndex] = cls.subjects.map(() =>
        Math.floor(Math.random() * 361)
      );
    });
    setSubjectHues(subjectHueMap);
  }, []);

  const filteredClasses = mockClasses.filter((cls) =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const selectedClass = mockClasses[selectedIndex];

  return (
    <div className="body-container">
      <ContentBox contentHeading="Manage Classes">
        <div className="classes-content-container">
          {/* LEFT PANEL */}
          <div className="all-classes">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold text-gray-700">
                All Classes
              </h2>
              <div className="class-search-bar">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <img
                  src={SearchIcon}
                  alt="Search"
                  className="class-search-icon"
                />
              </div>
            </div>

            <div className="flex flex-wrap gap-[15px] h-[60vh] overflow-y-auto pr-2">
              {/* Create New Class Card */}
              <div className="flex flex-col items-center justify-center bg-white border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:bg-gray-50 hover:border-gray-400 cursor-pointer transition-colors w-[225px] h-[250px]">
                <Plus size={28} />
                <p className="mt-2 text-sm font-medium">Create New Class</p>
              </div>

              {/* Class Cards */}
              {filteredClasses.map((cls) => {
                const originalIndex = mockClasses.findIndex(
                  (s) => s.id === cls.id
                );
                const hue = hues[originalIndex];
                const gradientStyle =
                  hue !== undefined
                    ? {
                        background: `linear-gradient(to right, hsla(${hue}, 30%, 35%), hsla(${hue}, 30%, 65%))`,
                        borderRadius: '5px 5px 0 0',
                      }
                    : {};

                return (
                  <div
                    className="class-card-holder w-[225px] rounded-[5px]"
                    style={{
                      backgroundColor:
                        selectedIndex === originalIndex ? '#A6A6A6' : '#ffffff',
                    }}
                  >
                    <div
                      key={cls.id}
                      className={`relative h-[80%] w-[100%] text-white p-4 flex flex-col justify-between cursor-pointer transition-all duration-300 rounded-[5px]`}
                      style={gradientStyle}
                      onClick={() => setSelectedIndex(originalIndex)}
                    >
                      <MoreHorizontal
                        size={20}
                        className="absolute top-3 right-3 text-white"
                      />
                      <div className="flex-grow flex items-center justify-center">
                        <span className="text-5xl font-thin text-[60px]">
                          {cls.level}
                        </span>
                      </div>
                    </div>
                    <div className="text-center">
                      <p
                        className="font-normal"
                        style={{
                          marginTop: '10px',
                          color:
                            selectedIndex === originalIndex
                              ? '#F2F2F2'
                              : '#000000',
                        }}
                      >
                        {cls.name}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="class-details-panel">
            <div
              className="class-banner"
              style={{
                background: `linear-gradient(to right, hsla(${hues[selectedIndex]}, 30%, 35%), hsla(${hues[selectedIndex]}, 30%, 65%))`,
              }}
            >
              <h2 className="font-thin text-[55px]">{selectedClass.name}</h2>
            </div>
            <div className="class-info-section">
              // Replace the teacher-subsection div in your code with this:
              <div className="teacher-subsection">
                <p className="text-[#404040]">Teachers</p>
                <div className="teacher-avatars">
                  {selectedClass.teachers.slice(0, 3).map((t, idx) => (
                    <div key={idx} className="avatar-wrapper">
                      <img
                        src={t.avatar || 'https://i.pravatar.cc/150?img=1'}
                        alt={t.name}
                      />
                      <p>
                        {t.name.split(' ').map((word, i) => (
                          <React.Fragment key={i}>
                            {word}
                            <br />
                          </React.Fragment>
                        ))}
                      </p>
                    </div>
                  ))}

                  {selectedClass.teachers.length > 3 && (
                    <div
                      className="avatar-wrapper"
                      style={{ background: 'none' }}
                    >
                      <div
                        className="others-avatar-circle"
                        style={{
                          width: '50px',
                          height: '50px',
                          borderRadius: '50%',
                          background: `linear-gradient(135deg, hsla(${hues[selectedIndex]}, 40%, 50%, 0.8), hsla(${hues[selectedIndex]}, 40%, 65%, 0.8))`,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'white',
                          fontSize: '18px',
                          fontWeight: '500',
                          marginBottom: '8px',
                          boxShadow: `0 2px 8px hsla(${hues[selectedIndex]}, 40%, 30%, 0.3)`,
                        }}
                      >
                        +{selectedClass.teachers.length - 3}
                      </div>
                      <p
                        style={{
                          color: `hsl(${hues[selectedIndex]}, 30%, 40%)`,
                          fontWeight: '500',
                          fontSize: '12px',
                        }}
                      >
                        {selectedClass.teachers.length - 3} Others
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="subjects-list">
                <p className="text-[#404040]">Subjects</p>
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    gap: '10px',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '80%',
                    flexWrap: 'wrap',
                  }}
                >
                  {selectedClass.subjects.map((subj, i) => {
                    const subjHue = subjectHues[selectedIndex]?.[i];
                    const style =
                      subjHue !== undefined
                        ? {
                            backgroundColor: `hsla(${subjHue}, 70%, 80%, 0.3)`,
                            color: `hsl(${subjHue}, 30%, 20%)`,
                          }
                        : {};

                    return (
                      <span key={i} className="subject-tag" style={style}>
                        {subj}
                      </span>
                    );
                  })}
                </div>
              </div>
              {/* <div className="flex w-[100%] items-center justify-center"></div> */}
              <div className="flex w-[100%] items-center justify-center">
                <div className="student-count-box flex items-center gap-4 w-[180px]">
                  <p className="text-[#404040]">Students</p>
                  <div className="flex flex-row gap-[18px]">
                    {' '}
                    <div className="flex items-center gap-[1px]">
                      <img src={MaleSVG} alt="Male" className="w-5 h-5" />
                      <span className="text-[#A6A6A6]">
                        {selectedClass.male}
                      </span>
                    </div>
                    <div className="flex items-center gap-[1px]">
                      <img src={FemaleSVG} alt="Female" className="w-5 h-5" />
                      <span className="text-[#A6A6A6]">
                        {selectedClass.female}
                      </span>
                    </div>
                    <div className="flex items-center gap-[5px]">
                      <img
                        src={BothGendersSVG}
                        alt="Total Students"
                        className="w-5 h-5"
                      />
                      <span className="text-[#A6A6A6]">
                        {selectedClass.students}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-center items-center w-[100%]">
                {' '}
                <button className="edit-class-btn">Edit Class</button>
              </div>
            </div>
          </div>
        </div>
      </ContentBox>
    </div>
  );
}

export default Classes;
