import React, { useState } from 'react';
import {
  ChevronDown,
  ChevronRight,
  Search,
  Info,
  MessagesSquare,
} from 'lucide-react';
import ContentBox from '../../components/ContentBox/ContentBox';
import { Link, useParams } from 'react-router-dom';
// Mock data for students and comments (Ugandan names)
const sampleStudents = [
  { id: 1, name: 'Keith Kateesi Katumwe', finalMark: 65 },
  { id: 2, name: 'Aisha Namusoke', finalMark: 78 },
  { id: 3, name: 'Daniel Kato Ssebunya', finalMark: 82 },
  { id: 4, name: 'Grace Nakalema', finalMark: 74 },
  { id: 5, name: 'Michael Mukasa', finalMark: 59 },
  { id: 6, name: 'Ruth Nabirye', finalMark: 88 },
  { id: 7, name: 'Paul Ssemakula', finalMark: 70 },
  { id: 8, name: 'Sarah Nanyonga', finalMark: 92 },
];

const subjects = [
  { name: 'General' },
  { name: 'English' },
  { name: 'French' },
  { name: 'Mathematics' },
  { name: 'Chemistry' },
];

// Initial mock comments data per subject
const initialComments = {
  General: {
    1: 'Shows great leadership and responsibility.',
    2: 'Cooperative and participates actively in discussions.',
    3: 'Polite and respectful towards peers.',
    4: 'Consistent and dependable in all activities.',
    5: 'Has shown significant improvement in attitude.',
    6: 'Maintains good discipline throughout the term.',
    7: 'Friendly and supportive to classmates.',
    8: 'A positive influence in group work.',
  },
  English: {
    1: 'Excellent vocabulary and sentence construction.',
    2: 'Needs to work on spelling and punctuation.',
    3: 'Strong comprehension skills, especially in literature.',
    4: 'Fluent in reading but should work on creative writing.',
    5: 'Needs to improve grammar usage in essays.',
    6: 'Actively participates in class discussions.',
    7: 'Good at summarizing passages and identifying key points.',
    8: 'Exceptional performance in oral presentations.',
  },
  French: {
    1: 'Good pronunciation and understanding of basic grammar.',
    2: 'Needs more confidence in speaking French.',
    3: 'Memorizes vocabulary well but struggles with tenses.',
    4: 'Shows improvement in conversational skills.',
    5: 'Enjoys role-play activities in class.',
    6: 'Should focus on written assignments for better accuracy.',
    7: 'Responds well to listening comprehension exercises.',
    8: 'Excellent grasp of everyday French phrases.',
  },
  Mathematics: {
    1: 'Strong problem-solving abilities, especially in algebra.',
    2: 'Needs to work on fractions and percentages.',
    3: 'Quick learner, grasps new concepts easily.',
    4: 'Should practice more on geometry and measurements.',
    5: 'Good at mental arithmetic but needs to check work for errors.',
    6: 'Enjoys tackling challenging problems.',
    7: 'Understands concepts but should improve speed.',
    8: 'Consistently scores high in class tests.',
  },
  Chemistry: {
    1: 'Good understanding of chemical equations.',
    2: 'Needs more practice in balancing reactions.',
    3: 'Strong in theoretical knowledge but needs lab skills improvement.',
    4: 'Shows interest in experiments and practical work.',
    5: 'Should revise atomic structure and periodic table.',
    6: 'Excellent accuracy in titration experiments.',
    7: 'Pays attention to safety in the laboratory.',
    8: 'Applies chemistry knowledge well in real-life examples.',
  },
};

// Subject Sidebar Component
const SubjectSidebar = ({ subjects, selectedSubject, setSelectedSubject }) => (
  <aside
    className="md:w-48 flex-shrink-0 h-[73vh] max-h-[484px] min-h-[450px] w-[100px] pt-[30px]"
    style={{
      background: '#FFFFFFB2',
      boxShadow: '2px 6px 15px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
    }}
  >
    <nav className="space-y-2">
      {subjects.map((subject) => (
        <div
          key={subject.name}
          className={`nav-link-div ${
            selectedSubject === subject.name ? 'active' : ''
          }`}
        >
          <button
            onClick={() => setSelectedSubject(subject.name)}
            className={`w-full flex items-center gap-2 text-left px-3 py-2 rounded text-sm font-medium transition-colors ${
              selectedSubject === subject.name
                ? 'bg-gradient-to-r from-[#C16CE2] to-[#CB9136] text-transparent bg-clip-text'
                : 'nav-link-text'
            }`}
          >
            {subject.name === 'General' && (
              <MessagesSquare
                size={16}
                className={
                  selectedSubject === subject.name
                    ? 'text-[#C16CE2]'
                    : 'text-gray-500'
                }
              />
            )}
            {subject.name}
          </button>
        </div>
      ))}
    </nav>
  </aside>
);

function CommentsPage() {
  const { class_name } = useParams();
  const [selectedSubject, setSelectedSubject] = useState('English');
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [searchQuery, setSearchQuery] = useState('');
  const [commentsBySubject, setCommentsBySubject] = useState(initialComments);

  const handleCommentChange = (studentId, comment) => {
    setCommentsBySubject((prev) => ({
      ...prev,
      [selectedSubject]: {
        ...prev[selectedSubject],
        [studentId]: comment,
      },
    }));
  };

  const filteredStudents = sampleStudents.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate statistics
  const totalStudents = sampleStudents.length;
  const subjectComments = commentsBySubject[selectedSubject] || {};
  const commentsEntered = Object.keys(subjectComments).filter((key) =>
    subjectComments[key]?.trim()
  ).length;
  const missingComments = totalStudents - commentsEntered;

  return (
    <ContentBox
      contentHeading={
        <span>
          <Link to="/comments" style={{ color: '#A6A6A6' }}>
            Comments
          </Link>
          <ChevronRight
            className="inline w-5 h-5 mx-1 align-middle mb-[2px] ml-[4px]"
            strokeWidth={3}
            style={{ color: '#A6A6A6' }}
          />
          <span className="font-[500]">{class_name}</span>
        </span>
      }
    >
      <div className="flex flex-row gap-[16px] mt-[30px] items-start">
        {/* Subject Sidebar */}
        <SubjectSidebar
          subjects={subjects}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />

        {/* Main Comments Table */}
        <div className="w-[474px] bg-white shadow-[2px_6px_15px_rgba(0,0,0,0.1)] rounded-[10px] px-8 py-6 h-[73vh] max-h-[484px] min-h-[450px]">
          {/* Header Controls */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-4">
              <span className="text-[14px] font-[400] text-[#0D0D0D] font-['Lexend_Deca'] leading-[105%]">
                All Students
              </span>

              {/* Year Dropdown */}
              <div className="relative">
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  className="font-[400] text-[#737373] text-[12px] bg-white px-[10px] py-[6px] rounded-md border-[1px] border-[#A6A6A6] hover:bg-gray-50 w-[84px] h-[32px] appearance-none cursor-pointer pr-[28px]"
                >
                  <option value="2024">2024</option>
                  <option value="2023">2023</option>
                  <option value="2022">2022</option>
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-[8px] top-1/2 transform -translate-y-1/2 pointer-events-none text-[#737373]"
                />
              </div>

              {/* Term Dropdown */}
              <div className="relative">
                <select
                  value={selectedTerm}
                  onChange={(e) => setSelectedTerm(e.target.value)}
                  className="font-[400] text-[#737373] text-[12px] bg-white px-[10px] py-[6px] rounded-md border-[1px] border-[#A6A6A6] hover:bg-gray-50 w-[84px] h-[32px] appearance-none cursor-pointer pr-[28px]"
                >
                  <option value="Term 1">Term 1</option>
                  <option value="Term 2">Term 2</option>
                  <option value="Term 3">Term 3</option>
                </select>
                <ChevronDown
                  size={12}
                  className="absolute right-[8px] top-1/2 transform -translate-y-1/2 pointer-events-none text-[#737373]"
                />
              </div>
            </div>

            {/* Search */}
            <div className="relative bg-[#F7F7F7] rounded-[5px]">
              <input
                type="text"
                placeholder="Search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-2 pr-10 py-2 border-0 rounded-[5px] text-[14px] text-[#707070] font-[300] font-['Lexend_Deca'] leading-[105%] w-[100px]"
              />
              <Search
                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4"
                stroke="#959595"
              />
            </div>
          </div>

          {/* Comments Table */}
          <div style={{ maxHeight: '90%', overflowY: 'auto' }}>
            <table
              className="w-full"
              style={{
                width: '100%',
                borderSpacing: '0 4px',
                fontSize: '13px',
                borderCollapse: 'separate',
              }}
            >
              <thead>
                <tr>
                  <th className="text-left px-4 py-2 text-sm font-normal text-[#404040] font-['Lexend_Deca'] leading-[105%] w-[200px]">
                    Name
                  </th>
                  <th className="text-center px-4 py-2 text-sm font-normal text-[#404040] font-['Lexend_Deca'] leading-[105%] w-[100px]">
                    Final Mark
                  </th>
                  <th className="text-left px-4 py-2 text-sm font-normal text-[#404040] font-['Lexend_Deca'] leading-[105%]">
                    Comments
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student, index) => (
                  <tr key={student.id}>
                    <td
                      className={`px-4 py-2 text-[13px] font-light text-[#404040] font-['Lexend_Deca'] leading-[105%] rounded-l-[5px] ${
                        index % 2 === 0 ? 'bg-[#F6F6F6]' : 'bg-[#F6FCFD]'
                      }`}
                    >
                      {student.name}
                    </td>
                    <td
                      className={`px-4 py-2 text-center text-[13px] font-light text-[#404040] font-['Lexend_Deca'] leading-[105%] ${
                        index % 2 === 0 ? 'bg-[#F6F6F6]' : 'bg-[#F6FCFD]'
                      }`}
                    >
                      {student.finalMark}
                    </td>
                    <td
                      className={`px-4 py-2 rounded-r-[5px] ${
                        index % 2 === 0 ? 'bg-[#F6F6F6]' : 'bg-[#F6FCFD]'
                      }`}
                    >
                      <input
                        type="text"
                        placeholder="Enter Comment"
                        value={
                          commentsBySubject[selectedSubject]?.[student.id] || ''
                        }
                        onChange={(e) =>
                          handleCommentChange(student.id, e.target.value)
                        }
                        className="w-full px-2 py-1 text-[13px] font-light text-[#737373] font-['Lexend_Deca'] leading-[105%] bg-transparent border-none focus:outline-none focus:bg-white focus:border focus:border-[#A6A6A6] focus:rounded"
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Sidebar - Date Info and Comments Summary */}
        <div className="w-[400px] h-[73vh] max-h-[615px] min-h-[450px]">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 pt-[24px] pl-[24px] pr-[24px] pb-[30px]">
            {/* Header with selected date */}
            <div className="flex items-center justify-start mb-[15px] gap-[6px]">
              <Info className="w-4 h-4 text-[#737373]" strokeWidth={1.25} />
              <span className="text-sm font-medium text-gray-900">
                Thursday, Sep 5
              </span>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-2 gap-[32px]">
              {/* Left Column - Date/Term Info */}
              <div className="flex flex-col gap-[5px]">
                <div className="flex flex-row justify-between">
                  <div className="text-sm text-gray-600">Term:</div>
                  <div className="text-sm font-medium text-gray-900">1</div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="text-sm text-gray-600">End Date:</div>
                  <div className="text-sm font-medium text-gray-900">
                    09/12/2025
                  </div>
                </div>
                <div className="flex flex-row justify-between">
                  <div className="text-sm text-gray-600 mb-1">
                    Academic Year:
                  </div>
                  <div className="text-sm font-medium text-gray-900">2025</div>
                </div>
              </div>

              {/* Right Column - Comments Summary */}
              <div className="flex flex-col gap-[5px]">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Comments Entered:
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {commentsEntered}
                  </span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-700">
                    Missing Comments:
                  </span>
                  <span className="text-sm font-medium text-gray-900">
                    {missingComments}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </ContentBox>
  );
}

export default CommentsPage;
