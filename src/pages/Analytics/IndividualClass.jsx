import React, { useState } from 'react';
import ContentBox from '../../components/ContentBox/ContentBox';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight } from 'lucide-react';
import rightPanelIcon from '../../assets/classes-right-panel-icon.svg';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
} from 'recharts';

// --- Mock Data ---
import ClassesData from '../Admin/Classes/ClassesData';

// Custom tooltip component for the bar chart
const CustomBarTooltip = ({ active, payload, label }) => {
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

// Performance Chart Component
const PerformanceChart = ({
  className,
  selectedSubject,
  setSelectedSubject,
  subjects,
  selectedYear,
  setSelectedYear,
  selectedTerm,
  setSelectedTerm,
}) => {
  // Mock data that matches the image - this would change based on selectedSubject, year, and term
  const getChartData = (subject, year, term) => {
    // You can customize this data based on the selected subject, year, and term
    const baseData = {
      History: [
        { name: 'Mid Term', score: 24.5 },
        { name: 'End of Term', score: 23.0 },
        { name: 'Final', score: 25.2 },
      ],
      Mathematics: [
        { name: 'Mid Term', score: 22.0 },
        { name: 'End of Term', score: 24.5 },
        { name: 'Final', score: 23.8 },
      ],
      Science: [
        { name: 'Mid Term', score: 26.0 },
        { name: 'End of Term', score: 22.5 },
        { name: 'Final', score: 24.0 },
      ],
    };
    return baseData[subject] || baseData['History'];
  };

  const chartData = getChartData(selectedSubject, selectedYear, selectedTerm);

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
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200"
      style={{ width: '580px', height: '500px' }}
    >
      {/* Header with dropdowns */}
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

            {/* Subject Select */}
            <div className="relative">
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                className="
                  font-[400] text-[#737373] text-[12px] bg-white 
                  px-[10px] py-[6px] rounded-md border-[1px] border-[#A6A6A6] 
                  hover:bg-gray-50 w-[120px] h-[32px] mb-[5px]
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
                {subjects.map((subject) => (
                  <option key={subject.name} value={subject.name}>
                    {subject.name}
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

      {/* Chart Title */}
      <h3 className="text-lg font-medium text-gray-800 mb-6 ml-[40px]">
        Subject Performance Overview
      </h3>

      {/* Chart */}
      <div className="flex-grow flex flex-col mt-[15px], mr-[10px]">
        <ResponsiveContainer
          width={496}
          height={250}
          style={{ padding: '0px' }}
        >
          <BarChart data={chartData} height="100%" width="100%">
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 14, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
            />
            <YAxis
              tick={{ fontSize: 12, fill: '#6b7280' }}
              axisLine={{ stroke: '#d1d5db' }}
              tickLine={{ stroke: '#d1d5db' }}
              domain={[0, 30]}
            />
            <Tooltip content={<CustomBarTooltip />} />
            <Bar dataKey="score" radius={[4, 4, 0, 0]}>
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={['#003459', '#00A8E8', '#00BF76'][index % 3]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pass Rate Box */}
      <div className="mt-6 flex justify-center">
        <div className="border border-[#404040] rounded-lg px-6 py-3 bg-white">
          <span className="text-[14px] font-[400] text-[#404040]">
            {selectedSubject} Pass Rate: <span className="font-bold">75%</span>
          </span>
        </div>
      </div>
    </div>
  );
};

// Grade Distribution Pie Chart
const GradeDistributionChart = ({ selectedSubject }) => {
  // Mock data for grade distribution
  const gradeData = [
    { name: 'Division 1', value: 45, color: '#ef4444' },
    { name: 'Division 2', value: 27, color: '#22c55e' },
    { name: 'Division 3', value: 28, color: '#3b82f6' },
    { name: 'Division 4', value: 28, color: '#eab308' },
  ];

  return (
    <div
      className="bg-white rounded-xl shadow-sm border border-gray-200 p-6"
      style={{ width: '400px', height: '500px' }}
    >
      <h3 className="text-lg font-medium text-gray-800 mb-6 text-center">
        Grade Distribution
      </h3>

      <div className="flex flex-col items-center">
        {/* Pie Chart */}
        <div style={{ height: '280px', width: '100%' }}>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={gradeData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label={false}
              >
                {gradeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Legend */}
        <div className="w-full mt-4">
          {gradeData.map((item, index) => (
            <div key={index} className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div
                  className="w-3 h-3 rounded-full mr-3"
                  style={{ backgroundColor: item.color }}
                ></div>
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
              <span className="text-sm font-medium text-gray-700">
                {item.value}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
export default function IndividualClass() {
  const { class_name } = useParams();

  // Find the correct class object from the real data
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
    subjects[0]?.name || 'History'
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
          <Link to="/analytics" style={{ color: '#A6A6A6' }}>
            Analytics
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
      <div className="flex flex-row gap-8 mt-[30px] ">
        <PerformanceChart
          className={className}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
          subjects={subjects}
          selectedYear={selectedYear}
          setSelectedYear={setSelectedYear}
          selectedTerm={selectedTerm}
          setSelectedTerm={setSelectedTerm}
        />
        <GradeDistributionChart selectedSubject={selectedSubject} />
      </div>
    </ContentBox>
  );
}
