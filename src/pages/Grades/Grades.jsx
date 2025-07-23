import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Grades.css';
import ContentBox from '../../components/ContentBox/ContentBox';
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
  Search as SearchIcon,
} from 'lucide-react';

// Import Mock Classes Data
import mockClasses from './GradesData.js';

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

function Classes() {
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
    navigate(`/grades/${className}`);
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

  // Generate gradient style for class banner
  const getBannerGradientStyle = () => {
    return {
      background: `hsla(${hues[selectedIndex]}, 20%, 50%)`,
    };
  };

  // Generate style for "others" avatar circle
  const getOthersAvatarStyle = () => {
    return {
      width: '40px',
      height: '40px',
      borderRadius: '50%',
      background: `hsl(${hues[selectedIndex]}, 20%, 50%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '18px',
      fontWeight: '300',
      marginBottom: '8px',
    };
  };

  // Generate style for "others" text
  const getOthersTextStyle = () => {
    return {
      color: `hsl(${hues[selectedIndex]}, 30%, 40%)`,
      fontWeight: '500',
      fontSize: '12px',
    };
  };

  // Render Create New Class Card
  const renderCreateClassCard = () => (
    <div className="create-class-card-new">
      <Plus size={24} />
      <p className="create-class-text">Create New Class</p>
    </div>
  );

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

  // Render Teacher Avatars
  const renderTeacherAvatars = () => {
    const displayedTeachers = selectedClass.teachers.slice(0, 3);
    const remainingTeachers = selectedClass.teachers.length - 3;

    return (
      <div className="teacher-avatars">
        {displayedTeachers.map((teacher, idx) => (
          <div key={idx} className="avatar-wrapper">
            <img
              src={teacher.avatar || 'https://i.pravatar.cc/150?img=1'}
              alt={teacher.name}
              className="teacher-avatar"
            />
            <p className="teacher-name">
              {teacher.name.split(' ').map((word, i) => (
                <React.Fragment key={i}>
                  {word}
                  <br />
                </React.Fragment>
              ))}
            </p>
          </div>
        ))}

        {remainingTeachers > 0 && (
          <div className="avatar-wrapper others-avatar">
            <div
              className="others-avatar-circle"
              style={getOthersAvatarStyle()}
            >
              +{remainingTeachers}
            </div>
            <p style={getOthersTextStyle()}>{remainingTeachers} Others</p>
          </div>
        )}
      </div>
    );
  };

  // Render Subject Tags
  const renderSubjectTags = () => {
    return selectedClass.subjects.map((subject, i) => {
      return (
        <span key={i} className="subject-tag">
          {subject}
        </span>
      );
    });
  };

  // Render Student Count
  const renderStudentCount = () => (
    <div className="student-count-box">
      <p className="student-count-label">Students</p>
      <p className="student-count-number">{Number(selectedClass.students)}</p>
    </div>
  );

  return (
    <div className="body-container">
      <ContentBox contentHeading="Grades">
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

export default Classes;
