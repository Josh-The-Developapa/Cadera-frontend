import React, { useState } from 'react';
import './IndividualClass.css';
import ContentBox from '../../../components/ContentBox/ContentBox';
import { Link, useParams } from 'react-router-dom';
import { ChevronDown, ChevronRight, PlusCircle } from 'lucide-react';

// --- Mock Data ---
// Expanded fictitious data to ensure all subjects have performance metrics.
import ClassesData from '../../Admin/Classes/ClassesData';

// Left Sidebar for selecting subjects (Unchanged)
const SubjectSidebar = ({ subjects, selectedSubject, setSelectedSubject }) => (
  <aside
    className="md:w-48 flex-shrink-0 h-[615px] w-[142px] p-[30px]"
    style={{
      background: 'rgba(255, 255, 255, 0.7)',
      boxShadow: '2px 6px 15px rgba(0, 0, 0, 0.1)',
      borderRadius: '10px',
    }}
  >
    <nav className="space-y-2">
      {subjects.map((subject) => (
        <button
          key={subject.name}
          onClick={() => setSelectedSubject(subject.name)}
          className={`w-full text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
            selectedSubject === subject.name
              ? 'bg-green-100 text-green-700'
              : 'text-gray-600 hover:bg-gray-100'
          }`}
        >
          {subject.name}
        </button>
      ))}
    </nav>
  </aside>
);

// Card for Weighting section (Unchanged)
const WeightingCard = ({ weighting }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-[265px] w-[302px]">
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

// Card for Assessment Components (Unchanged)
const AssessmentComponentsCard = ({ components }) => (
  <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 h-[325px] w-[302px]">
    <h3 className="font-semibold text-gray-800 mb-4">Assessment Components</h3>
    <button className="w-full flex items-center justify-center space-x-2 border-2 border-dashed border-gray-300 text-gray-500 py-2 rounded-lg hover:bg-gray-50 transition-colors mb-4">
      <PlusCircle className="w-4 h-4" />
      <span className="text-sm font-medium">Add New Component</span>
    </button>
    <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
      {components.map((component, index) => (
        <div
          key={index}
          className="bg-gray-50 border border-gray-200 p-3 rounded-lg text-sm text-gray-700"
        >
          {component}
        </div>
      ))}
    </div>
  </div>
);

// --- REBUILT Performance Overview Chart ---
const PerformanceChart = ({ performanceData, className }) => {
  const maxValue = 30;
  // Create a realistic, evenly-spaced Y-axis
  const yAxisLabels = [30, 22.5, 15, 7.5, 0];

  return (
    <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200 flex flex-col w-[624px] h-[615px]">
      {/* Chart Header */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-1 text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200">
            <span>2024</span>
            <ChevronRight className="w-4 h-4" />
          </button>
          <button className="flex items-center space-x-1 text-sm font-medium text-gray-600 bg-gray-100 px-3 py-1 rounded-md hover:bg-gray-200">
            <span>Term 1</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </div>
        <h2 className="text-2xl font-light text-gray-400">{className}</h2>
      </div>

      <h3 className="font-semibold text-gray-800 mb-4">Performance Overview</h3>

      {/* Chart Body */}
      <div className="flex-grow flex flex-col">
        <div className="flex-grow flex">
          {/* Y-Axis Labels (Fixed width for alignment) */}
          <div className="w-10 flex flex-col justify-between text-xs text-right text-gray-500 pr-2">
            {yAxisLabels.map((label) => (
              <span key={label}>{label.toFixed(1)}</span>
            ))}
          </div>

          {/* Chart Area: Gridlines and Bars */}
          <div className="flex-grow relative border-l border-gray-200">
            {/* Horizontal Gridlines */}
            <div className="absolute inset-0 grid grid-rows-4">
              {yAxisLabels.slice(0, -1).map((label) => (
                <div key={label} className="border-b border-gray-200"></div>
              ))}
            </div>

            {/* Bars */}
            <div className="absolute inset-0 flex items-end justify-around gap-6 pl-[20px] pr-[20px]">
              {performanceData.length > 0 ? (
                performanceData.map((item, index) => (
                  <div
                    key={index}
                    className="w-1/2 rounded-t-md z-10 transition-all duration-300 ease-out"
                    style={{
                      height: `${(item.score / maxValue) * 100}%`,
                      backgroundColor: ['#2dd4bf', '#34d399', '#38bdf8'][
                        index % 3
                      ],
                    }}
                    title={`${item.name}: ${item.score}`}
                  ></div>
                ))
              ) : (
                <div className="z-10 text-gray-500">No performance data.</div>
              )}
            </div>
          </div>
        </div>

        {/* X-Axis Labels (Padded left to align with chart) */}
        <div className="w-full flex justify-around pl-10 pt-2">
          {performanceData.map((item) => (
            <span
              key={item.name}
              className="text-xs text-gray-600 w-1/2 text-center"
            >
              {item.name}
            </span>
          ))}
        </div>
      </div>

      {/* Bottom Button */}
      <div className="mt-8 text-center">
        <button className="bg-gray-800 text-white px-6 py-2 rounded-lg text-sm font-semibold hover:bg-gray-700 transition-colors">
          Edit Student Grades
        </button>
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

  const subjectData = subjects.find((s) => s.name === selectedSubject) || {
    weighting: [],
    assessmentComponents: [],
    performance: {},
  };

  const performanceData = subjectData.performance?.['2024']?.['Term 1'] || [];

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
      <div className="flex flex-col md:flex-row gap-8 mt-[30px]">
        <SubjectSidebar
          subjects={subjects}
          selectedSubject={selectedSubject}
          setSelectedSubject={setSelectedSubject}
        />
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1 flex flex-col gap-6">
            <WeightingCard weighting={subjectData.weighting} />
            <AssessmentComponentsCard
              components={subjectData.assessmentComponents}
            />
          </div>
          <div className="lg:col-span-2">
            <PerformanceChart
              performanceData={performanceData}
              className={className}
            />
          </div>
        </main>
      </div>
    </ContentBox>
  );
}
