//Reports Individual Class

import React, { useState } from 'react';
import './IndividualClass.css';
import ContentBox from '../../../components/ContentBox/ContentBox';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, ChartBar } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import rightPanelIcon from '../../../assets/classes-right-panel-icon.svg';
import '../../../components/NavMenu/NavMenu.css';

// --- Mock Data ---
// Expanded fictitious data to ensure all subjects have performance metrics.
import ClassesData from '../../Admin/Classes/ClassesData';

// Left Sidebar for selecting subjects (Unchanged)
const SubjectSidebar = ({ subjects, selectedSubject, setSelectedSubject }) => (
  <aside
    className="md:w-48 flex-shrink-0 h-[73vh] max-h-[484px] min-h-[450px] w-[142px] p-[30px] pr-0"
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
            className={`nav-icon-link  ${
              selectedSubject === subject.name
                ? 'bg-gradient-to-r from-[#C16CE2] to-[#CB9136] text-transparent bg-clip-text'
                : 'nav-link-text'
            }`}
          >
            {subject.name}
          </button>
        </div>
      ))}
    </nav>
  </aside>
);

// Card for Weighting section (Resized for right sidebar)
const WeightingCard = ({ weighting }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-[265px] w-[280px]">
    <h3 className="font-semibold text-gray-800 mb-4">Weighting</h3>
    {weighting.length > 0 ? (
      <>
        <div className="w-full bg-gray-200 rounded-full h-4 mb-4 flex overflow-hidden">
          {weighting.map((item, index) => (
            <div
              key={index}
              className={`${item.color} h-4`}
              style={{ width: `${item.percentage}%` }}
              title={`${item.component}: ${item.percentage}%`}
            ></div>
          ))}
        </div>
        <ul className="space-y-2 text-sm">
          {weighting.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center">
                <span
                  className={`w-3 h-3 rounded-full ${item.color} mr-3`}
                ></span>
                <span className="text-gray-600">{item.component}</span>
              </div>
              <span className="font-medium text-gray-700">
                {item.percentage}%
              </span>
            </li>
          ))}
        </ul>
      </>
    ) : (
      <p className="text-sm text-gray-500">No weighting data available.</p>
    )}
    <div className="mt-6 text-center">
      <button className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors">
        Modify
      </button>
    </div>
  </div>
);

// Custom tooltip component for the chart
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
        <p className="text-sm font-medium text-gray-800">{`${label}`}</p>
        <p className="text-sm text-blue-600">{`Score: ${payload[0].value}`}</p>
      </div>
    );
  }
  return null;
};

// --- REBUILT Performance Overview Chart with Recharts ---
const PerformanceChart = ({
  performanceData,
  className,
  selectedYear,
  setSelectedYear,
  selectedTerm,
  setSelectedTerm,
}) => {
  // Transform data for Recharts format
  const chartData = performanceData.map((item, index) => ({
    name: item.name,
    score: item.score,
    // Cycle through colors for variety
    fill: ['#003459', '#00A8E8', '#00BF76'][index % 3],
  }));

  // Available years and terms
  const years = [
    { name: '2024', value: '2024' },
    { name: '2023', value: '2023' },
    { name: '2022', value: '2022' },
  ];

  const terms = [
    { name: 'Term 1', value: 'Term 1' },
    { name: 'Term 2', value: 'Term 2' },
    { name: 'Term 3', value: 'Term 3' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm flex flex-col w-[580px] h-[73vh] max-h-[484px] min-h-[450px]">
      {/* Chart Header */}
      <div
        className="flex flex-row justify-between items-end pr-[32px] mb-[15px]"
        style={{
          background:
            'linear-gradient(to left, #FFFFFF -5.22%, #BFBFBF 202.05%)',
        }}
      >
        <div className="flex flex-row items-end">
          <img
            src={rightPanelIcon}
            alt="RightPanelIcon"
            style={{
              height: '100%',
            }}
          />
          <div className="flex flex-row gap-[8px]">
            {/* Year Select */}
            <div className="relative">
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                className="
                  font-[400] text-[#737373] text-[12px] bg-white 
                  px-[10px] py-[6px] rounded-md border-[1px] border-[#A6A6A6] 
                  hover:bg-gray-50 w-[84px] h-[32px] mb-[5px]
                  appearance-none cursor-pointer
                  pr-[28px]
                "
                style={{
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  lineHeight: '1.2',
                  minHeight: '32px',
                }}
              >
                {years.map((year) => (
                  <option key={year.value} value={year.value}>
                    {year.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={12}
                className="absolute right-[8px] top-1/2 transform -translate-y-1/2 pointer-events-none text-[#737373]"
              />
            </div>

            {/* Term Select */}
            <div className="relative">
              <select
                value={selectedTerm}
                onChange={(e) => setSelectedTerm(e.target.value)}
                className="
                  font-[400] text-[#737373] text-[12px] bg-white 
                  px-[10px] py-[6px] rounded-md border-[1px] border-[#A6A6A6] 
                  hover:bg-gray-50 w-[84px] h-[32px] mb-[5px]
                  appearance-none cursor-pointer
                  pr-[28px]
                "
                style={{
                  WebkitAppearance: 'none',
                  MozAppearance: 'none',
                  lineHeight: '1.2',
                  minHeight: '32px',
                }}
              >
                {terms.map((term) => (
                  <option key={term.value} value={term.value}>
                    {term.name}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={12}
                className="absolute right-[8px] top-1/2 transform -translate-y-1/2 pointer-events-none text-[#737373]"
              />
            </div>
          </div>
        </div>
        <h2 className="text-[#404040] text-[40px] font-[100] mb-[5px] leading-none">
          {className}
        </h2>
      </div>

      <div className="flex flex-col gap-[15px] justify-center items-start mb-[15px]">
        <h3 className="font-[400] text-[14px] text-[#0D0D0D] ml-[30px]">
          Performance Overview
        </h3>
        {/* Chart Body with Recharts */}
        <div className="flex-grow flex flex-col mt-[15px], mr-[10px]">
          {performanceData.length > 0 ? (
            <ResponsiveContainer
              width={496}
              height={250}
              style={{ padding: '0px' }}
            >
              <BarChart data={chartData} height="100%" width="100%">
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 14, fill: '#404040' }}
                  axisLine={{ stroke: '#d1d5db' }}
                  tickLine={{ stroke: '#d1d5db' }}
                  interval={0}
                  // height={60}
                />
                <YAxis
                  tick={{ fontSize: 14, fill: '#A6A6A6' }}
                  axisLine={{ stroke: '#d1d5db' }}
                  tickLine={{ stroke: '#d1d5db' }}
                  domain={[0, 30]}
                  ticks={[0, 7.5, 15, 22.5, 30]}
                />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="score" barSize={75}>
                  {chartData.map((entry, index) => (
                    <Bar key={`bar-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex-grow flex items-center justify-center text-gray-500">
              No performance data available.
            </div>
          )}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="text-center flex flex-row justify-center items-center">
        <Link to={`/grades/${className}/student-performance`}>
          <button className="cursor-pointer mb-[32px] bg-[#7F3F98] text-white px-6 py-2 rounded-lg text-[14px] font-[300] transition-colors flex flex-row justify-center items-center">
            <ChartBar className="w-[16px] h-[16px] mr-2" />
            Edit Student Grades
          </button>
        </Link>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function IndividualClass() {
  const { class_name } = useParams();

  // 🔍 Find the correct class object from the real data
  const classData = ClassesData.find(
    (c) => c.name === class_name || c.className === class_name
  );

  if (!classData) {
    return (
      <ContentBox>
        <div className="p-8 text-center text-red-600 font-semibold">
          Class "{class_name}" not found.
        </div>
      </ContentBox>
    );
  }

  const { name: className, subjects } = classData;

  const [selectedSubject, setSelectedSubject] = useState(
    subjects[0]?.name || ''
  );
  const [selectedYear, setSelectedYear] = useState('2024');
  const [selectedTerm, setSelectedTerm] = useState('Term 1');

  const subjectData = subjects.find((s) => s.name === selectedSubject) || {
    weighting: [],
    assessmentComponents: [],
    performance: {},
  };

  const performanceData =
    subjectData.performance?.[selectedYear]?.[selectedTerm] || [];

  return (
    <ContentBox
      contentHeading={
        <span>
          <Link to="/grades" style={{ color: '#A6A6A6' }}>
            Grades
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
      <div className="flex flex-row gap-8 mt-[30px] items-start">
        <SubjectSidebar
          subjects={subjects}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
        <PerformanceChart
          performanceData={performanceData}
          className={className}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
        />
        <WeightingCard weighting={subjectData.weighting} />
      </div>
    </ContentBox>
  );
}
