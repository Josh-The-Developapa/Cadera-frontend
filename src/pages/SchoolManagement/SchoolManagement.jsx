import React, { useState } from 'react';
import {
  Calendar,
  Users,
  Search,
  ChevronDown,
  Info,
  CircleAlert,
  Gem,
  UserPlus,
} from 'lucide-react';
import ContentBox from '../../components/ContentBox/ContentBox';
import StaffModal from './CreateTeacherModal'; // Add this import

// Fictitious staff data
const staffData = [
  {
    id: 1,
    name: 'Kevin Kent Asiimwe',
    subjects: ['HIS', 'GEO', 'SST'],
    classes: 12,
    role: 'Teacher',
  },
  {
    id: 2,
    name: 'Sarah Johnson',
    subjects: ['MAT', 'PHY'],
    classes: 8,
    role: 'Teacher',
  },
  {
    id: 3,
    name: 'Michael Brown',
    subjects: ['ENG', 'LIT'],
    classes: 10,
    role: 'Teacher',
  },
  {
    id: 4,
    name: 'Emily Davis',
    subjects: ['CHE', 'BIO'],
    classes: 9,
    role: 'Teacher',
  },
  {
    id: 5,
    name: 'David Wilson',
    subjects: ['ART', 'MUS'],
    classes: 6,
    role: 'Teacher',
  },
  {
    id: 6,
    name: 'Lisa Anderson',
    subjects: ['PE', 'HEA'],
    classes: 15,
    role: 'Teacher',
  },
  {
    id: 7,
    name: 'Robert Taylor',
    subjects: ['FRE', 'SPA'],
    classes: 7,
    role: 'Teacher',
  },
  {
    id: 8,
    name: 'Jennifer White',
    subjects: ['MAT', 'STA'],
    classes: 11,
    role: 'Teacher',
  },
  {
    id: 9,
    name: 'James Miller',
    subjects: ['HIS', 'POL'],
    classes: 5,
    role: 'Teacher',
  },
  {
    id: 10,
    name: 'Maria Garcia',
    subjects: ['ENG', 'DRA'],
    classes: 8,
    role: 'Teacher',
  },
];

function SchoolManagement() {
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');
  const [startDate, setStartDate] = useState('02/08/2025');
  const [endDate, setEndDate] = useState('02/08/2025');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRow, setSelectedRow] = useState(null);
  const [promotionMode, setPromotionMode] = useState('classes');

  // Add these new state variables for the modal
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [staffList, setStaffList] = useState(staffData);

  const filteredStaff = staffList.filter(
    (staff) =>
      staff.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.subjects.some((subject) =>
        subject.toLowerCase().includes(searchQuery.toLowerCase())
      )
  );

  const handleRowClick = (index) => {
    setSelectedRow(index);
  };

  // Add handler to open the modal
  const handleCreateStaffClick = () => {
    setIsStaffModalOpen(true);
  };

  // Add handler to close the modal
  const handleCloseModal = () => {
    setIsStaffModalOpen(false);
  };

  // Add handler to create new staff
  const handleCreateStaff = (newStaff) => {
    const staffWithId = {
      ...newStaff,
      id: staffList.length + 1,
      classes: Math.floor(Math.random() * 10) + 5, // Random number for demo
      role: 'Teacher',
    };
    setStaffList([...staffList, staffWithId]);
  };

  return (
    <div className="body-container">
      <ContentBox contentHeading="School Management">
        <div className="flex gap-[16px] h-[73vh] max-h-[484px] min-h-[450px] mt-[20px]">
          {/* Left Panel */}
          <div className="bg-white rounded-lg border border-gray-200 p-6 w-[400px] h-[73vh] max-h-[484px] min-h-[450px]">
            {/* Edit Term Dates Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Calendar className="w-5 h-5 text-gray-600" />
                <h2 className="text-[14px] font-[400] text-gray-900">
                  Edit Term Dates
                </h2>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4 text-[13px] font-[300] text-[#404040]">
                <div>
                  <label className="block mb-2">Academic Year</label>
                  <div className="relative text-[#737373]">
                    <select
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="2024">2024</option>
                      <option value="2025">2025</option>
                      <option value="2026">2026</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                <div>
                  <label className="block mb-2">Term</label>
                  <div className="relative text-[#737373]">
                    <select
                      value={selectedTerm}
                      onChange={(e) => setSelectedTerm(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                      <option value="Term 1">Term 1</option>
                      <option value="Term 2">Term 2</option>
                      <option value="Term 3">Term 3</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-2.5 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 text-[13px] font-[300] text-[#404040]">
                <div>
                  <label className="block mb-2">Start Date</label>
                  <div className="relative text-[#737373]">
                    <input
                      type="text"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block mb-2">End Date</label>
                  <div className="relative text-[#737373]">
                    <input
                      type="text"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      className="w-full px-3 py-2 pl-10 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                  </div>
                </div>
              </div>
            </div>

            {/* Automatic Promotion Section */}
            <div className="mb-8">
              <div className="flex items-center gap-2 mb-4">
                <Gem className="w-5 h-5 text-gray-600" />
                <h2 className="text-[14px] font-[400] text-gray-900">
                  Automatic Promotion
                </h2>
                <CircleAlert className="w-4 h-4 text-red-500 ml-1" />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setPromotionMode('classes')}
                  className={`px-4 py-2 rounded-md text-[14px] font-[300] transition-colors ${
                    promotionMode === 'classes'
                      ? 'bg-red-50 text-red-600 border border-red-200'
                      : ' text-gray-600 border border-gray-200'
                  }`}
                >
                  Promote Classes
                </button>
                <button
                  onClick={() => setPromotionMode('individuals')}
                  className={`px-4 py-2 rounded-md text-[14px] font-[300] transition-colors ${
                    promotionMode === 'individuals'
                      ? 'bg-red-50 text-red-600 border border-red-200'
                      : ' text-gray-600 border border-gray-200'
                  }`}
                >
                  Promote Individuals
                </button>
              </div>
            </div>

            {/* Staff Accounts Section */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <UserPlus className="w-5 h-5 text-gray-600" />
                <h2 className="text-[14px] font-[400] text-[#0D0D0D]">
                  Staff Accounts
                </h2>
              </div>

              <button
                onClick={handleCreateStaffClick}
                className="py-[5px] px-[10px] bg-[#7F3F98] cursor-pointer text-white text-[14px] rounded-md font-[300] hover:bg-[#5b2171] transition-colors"
              >
                Create Staff Member
              </button>
            </div>
          </div>

          {/* Right Panel */}
          <div className="w-[701px] bg-white shadow-[2px_6px_15px_rgba(0,0,0,0.1)] rounded-[10px] px-8 py-6 h-[73vh] max-h-[484px] min-h-[450px]">
            {/* Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center justify-between gap-4 w-[100%]">
                <h2 className="text-[14px] font-[400] text-[#0D0D0D] font-['Lexend_Deca'] leading-[105%]">
                  All Staff
                </h2>
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
            </div>

            {/* Staff Table */}
            <div
              style={{
                maxHeight: '90%',
                overflowY: 'auto',
                paddingRight: '10px',
              }}
            >
              <table
                className="w-full"
                style={{
                  width: '100%',
                  borderSpacing: '0 8px',
                  fontSize: '13px',
                  borderCollapse: 'separate',
                }}
              >
                <thead>
                  <tr>
                    <th className="text-left px-4 py-2 text-sm font-normal text-[#404040] font-['Lexend_Deca'] leading-[105%] w-[200px]">
                      Name
                    </th>
                    <th className="text-left px-4 py-2 text-sm font-normal text-[#404040] font-['Lexend_Deca'] leading-[105%] w-[200px]">
                      Subjects
                    </th>
                    <th className="text-left px-4 py-2 text-sm font-normal text-[#404040] font-['Lexend_Deca'] leading-[105%] w-[200px]">
                      Classes
                    </th>
                    <th className="text-left px-4 py-2 text-sm font-normal text-[#404040] font-['Lexend_Deca'] leading-[105%] w-[200px]">
                      Role
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStaff.map((staff, index) => (
                    <tr key={staff.id}>
                      <td
                        className={`px-4 py-3 text-center text-[13px] font-light text-[#404040] font-['Lexend_Deca'] leading-[105%] rounded-l-[5px] ${
                          index % 2 === 0 ? 'bg-[#F6F6F6]' : 'bg-[#F6FCFD]'
                        }`}
                      >
                        {staff.name}
                      </td>
                      <td
                        className={`px-4 py-3 text-center text-[13px] font-light text-[#404040] font-['Lexend_Deca'] leading-[105%] ${
                          index % 2 === 0 ? 'bg-[#F6F6F6]' : 'bg-[#F6FCFD]'
                        }`}
                      >
                        {staff.subjects ? staff.subjects.join(', ') : ''}
                      </td>
                      <td
                        className={`px-4 py-3 text-center text-[13px] font-light text-[#404040] font-['Lexend_Deca'] leading-[105%] ${
                          index % 2 === 0 ? 'bg-[#F6F6F6]' : 'bg-[#F6FCFD]'
                        }`}
                      >
                        {staff.classes}
                      </td>
                      <td
                        className={`px-4 py-3 text-center text-[13px] font-light text-[#404040] font-['Lexend_Deca'] leading-[105%] rounded-r-[5px] ${
                          index % 2 === 0 ? 'bg-[#F6F6F6]' : 'bg-[#F6FCFD]'
                        }`}
                      >
                        {staff.role}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Add the StaffModal component */}
        <StaffModal
          isOpen={isStaffModalOpen}
          onClose={handleCloseModal}
          onCreateStaff={handleCreateStaff}
        />
      </ContentBox>
    </div>
  );
}

export default SchoolManagement;
