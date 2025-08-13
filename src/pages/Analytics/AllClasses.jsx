import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import ContentBox from '../../components/ContentBox/ContentBox.jsx';
import Asset1 from '../../assets/SVGs/Asset 1.svg';
import Asset2 from '../../assets/SVGs/Asset 2.svg';
import Asset3 from '../../assets/SVGs/Asset 3.svg';
import Asset4 from '../../assets/SVGs/Asset 4.svg';
import Asset5 from '../../assets/SVGs/Asset 5.svg';
import Asset6 from '../../assets/SVGs/Asset 6.svg';
import Asset7 from '../../assets/SVGs/Asset 7.svg';
import Asset8 from '../../assets/SVGs/Asset 8.svg';
import Asset9 from '../../assets/SVGs/Asset 9.svg';
import Asset10 from '../../assets/SVGs/Asset 10.svg';
import Asset11 from '../../assets/SVGs/Asset 11.svg';
import Asset12 from '../../assets/SVGs/Asset 12.svg';
import Asset13 from '../../assets/SVGs/Asset 13.svg';
import Asset14 from '../../assets/SVGs/Asset 14.svg';
import Asset15 from '../../assets/SVGs/Asset 15.svg';
import Asset16 from '../../assets/SVGs/Asset 16.svg';
import Asset17 from '../../assets/SVGs/Asset 17.svg';
import Asset18 from '../../assets/SVGs/Asset 18.svg';
import Asset19 from '../../assets/SVGs/Asset 19.svg';
import Asset20 from '../../assets/SVGs/Asset 20.svg';
import {
  MoreHorizontal,
  Monitor,
  Plus,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  Search as SearchIcon,
} from 'lucide-react';

// Import Mock Classes Data
import mockClasses from '../Grades/GradesData.js';

// Available icons for randomization
const availableIcons = [
  Asset1,
  Asset2,
  Asset3,
  Asset4,
  Asset5,
  Asset6,
  Asset7,
  Asset8,
  Asset9,
  Asset10,
  Asset11,
  Asset12,
  Asset13,
  Asset14,
  Asset15,
  Asset16,
  Asset17,
  Asset18,
  Asset19,
  Asset20,
];

// Sort teachers alphabetically in every class
mockClasses.forEach((cls) => {
  cls.teachers.sort((a, b) => a.name.localeCompare(b.name));
});

function AllClasses() {
  const navigate = useNavigate();
  // State Management
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [hues, setHues] = useState([]);
  const [subjectHues, setSubjectHues] = useState({});
  const [classIcons, setClassIcons] = useState({});

  // Generate random hues and icons for class cards on component mount
  useEffect(() => {
    const generatedHues = mockClasses.map(() =>
      Math.floor(Math.random() * 361)
    );
    setHues(generatedHues);

    // Generate random icons for each class
    const iconMap = {};
    mockClasses.forEach((cls) => {
      const randomIndex = Math.floor(Math.random() * availableIcons.length);
      iconMap[cls.id] = availableIcons[randomIndex];
    });
    setClassIcons(iconMap);

    const subjectHueMap = {};
    mockClasses.forEach((cls, cIndex) => {
      subjectHueMap[cIndex] = cls.subjects.map(() =>
        Math.floor(Math.random() * 361)
      );
    });
    setSubjectHues(subjectHueMap);
  }, []);

  // Filter classes based on search query
  const filteredClasses = mockClasses.filter((cls) =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get currently selected class
  const selectedClass = mockClasses[selectedIndex];

  // Handle class card selection
  const handleClassSelection = (originalIndex) => {
    const className = mockClasses[originalIndex].name;
    navigate(`/analytics/classes/${className}`);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Generate hue-based color for icon background
  const getIconBackgroundStyle = (hue) => {
    return hue !== undefined
      ? {
          backgroundColor: `hsl(${hue}, 20%, 50%)`,
          color: 'white',
        }
      : {
          backgroundColor: '#64748b',
          color: 'white',
        };
  };

  // Render Class Cards
  const renderClassCards = () => {
    return filteredClasses.map((cls) => {
      const originalIndex = mockClasses.findIndex((s) => s.id === cls.id);
      const isSelected = selectedIndex === originalIndex;
      const IconComponent = classIcons[cls.id] || Monitor;
      const classHue = hues[originalIndex];

      return (
        <div
          key={cls.id}
          className={`class-card-new ${isSelected ? 'selected' : ''}`}
          onClick={() => handleClassSelection(originalIndex)}
        >
          <div className="class-card-header">
            <MoreHorizontal size={16} className="class-menu-icon" />
          </div>
          <div className="class-card-icon-container">
            <div
              className="class-card-icon"
              style={getIconBackgroundStyle(classHue)}
            >
              <img
                src={IconComponent}
                className="class-card-icon-img"
                alt={cls.name}
              />
            </div>
          </div>
          <div className="class-card-name">{cls.name}</div>
        </div>
      );
    });
  };

  return (
    <div className="body-container">
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
            Select Class
          </span>
        }
      >
        <div className="classes-content-container">
          {/* LEFT PANEL - Classes List */}
          <div
            className="all-classes h-[70vh] max-h-[615px] min-h-[450px]"
            style={{
              width: '821px',
            }}
          >
            {/* Header with Search */}
            <div className="classes-header">
              <h2 className="classes-title">All Classes</h2>
              <div className="class-search-bar">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="search-input"
                />
                <SearchIcon className="search-icon" />
              </div>
            </div>

            {/* Classes Container */}
            <div className="classes-container">{renderClassCards()}</div>
          </div>
        </div>
      </ContentBox>
    </div>
  );
}

export default AllClasses;
