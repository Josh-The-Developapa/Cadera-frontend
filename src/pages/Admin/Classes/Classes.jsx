import React, { useEffect, useState } from 'react';
import './Classes.css';
import ContentBox from '../../../components/ContentBox/ContentBox';
import SearchIcon from '../../../assets/search-1.svg';
import { Plus, MoreHorizontal } from 'lucide-react';
import MaleSVG from '../../../assets/male.svg';
import FemaleSVG from '../../../assets/female.svg';
import BothGendersSVG from '../../../assets/both-genders.svg';

// Import Mock Classes Data
import mockClasses from './ClassesData.js';

// Sort teachers alphabetically in every class
mockClasses.forEach((cls) => {
  cls.teachers.sort((a, b) => a.name.localeCompare(b.name));
});

function Classes() {
  // State Management
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [hues, setHues] = useState([]);
  const [subjectHues, setSubjectHues] = useState({});

  // Generate random hues for class cards and subjects on component mount
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

  // Filter classes based on search query
  const filteredClasses = mockClasses.filter((cls) =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get currently selected class
  const selectedClass = mockClasses[selectedIndex];

  // Handle class card selection
  const handleClassSelection = (originalIndex) => {
    setSelectedIndex(originalIndex);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Generate gradient style for class cards
  const getCardGradientStyle = (hue) => {
    return hue !== undefined
      ? {
          background: `linear-gradient(to right, hsla(${hue}, 30%, 35%), hsla(${hue}, 30%, 65%))`,
          borderRadius: '5px 5px 0 0',
        }
      : {};
  };

  // Generate gradient style for class banner
  const getBannerGradientStyle = () => {
    return {
      background: `linear-gradient(to right, hsla(${hues[selectedIndex]}, 30%, 35%), hsla(${hues[selectedIndex]}, 30%, 65%))`,
    };
  };

  // Generate style for subject tags
  const getSubjectTagStyle = (subjHue) => {
    return subjHue !== undefined
      ? {
          backgroundColor: `hsla(${subjHue}, 70%, 80%, 0.3)`,
          color: `hsl(${subjHue}, 30%, 20%)`,
        }
      : {};
  };

  // Generate style for "others" avatar circle
  const getOthersAvatarStyle = () => {
    return {
      width: '40px',
      height: '40px',
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
    <div className="create-class-card">
      <Plus size={28} />
      <p className="mt-2 text-sm font-medium">Create New Class</p>
    </div>
  );

  // Render Class Cards
  const renderClassCards = () => {
    return filteredClasses.map((cls) => {
      const originalIndex = mockClasses.findIndex((s) => s.id === cls.id);
      const hue = hues[originalIndex];
      const isSelected = selectedIndex === originalIndex;

      return (
        <div
          key={cls.id}
          className="class-card-holder"
          style={{
            backgroundColor: isSelected ? '#A6A6A6' : '#ffffff',
          }}
        >
          <div
            className="class-card"
            style={getCardGradientStyle(hue)}
            onClick={() => handleClassSelection(originalIndex)}
          >
            <MoreHorizontal size={20} className="class-card-menu" />
            <div className="class-card-content">
              <span className="class-level">{cls.level}</span>
            </div>
          </div>
          <div className="class-card-footer">
            <p
              className="class-name"
              style={{
                color: isSelected ? '#F2F2F2' : '#000000',
              }}
            >
              {cls.name}
            </p>
          </div>
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
      const subjHue = subjectHues[selectedIndex]?.[i];

      return (
        <span
          key={i}
          className="subject-tag"
          style={getSubjectTagStyle(subjHue)}
        >
          {subject}
        </span>
      );
    });
  };

  // Render Student Count
  const renderStudentCount = () => (
    <div className="student-count-box">
      <p className="student-count-label">Students</p>
      <div className="student-count-stats">
        <div className="student-stat">
          <img src={MaleSVG} alt="Male" className="gender-icon" />
          <span className="student-count-number">{selectedClass.male}</span>
        </div>
        <div className="student-stat">
          <img src={FemaleSVG} alt="Female" className="gender-icon" />
          <span className="student-count-number">{selectedClass.female}</span>
        </div>
        <div className="student-stat">
          <img
            src={BothGendersSVG}
            alt="Total Students"
            className="gender-icon"
          />
          <span className="student-count-number">{selectedClass.students}</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="body-container">
      <ContentBox contentHeading="Manage Classes">
        <div className="classes-content-container">
          {/* LEFT PANEL - Classes List */}
          <div className="all-classes">
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
                <img src={SearchIcon} alt="Search" className="search-icon" />
              </div>
            </div>

            {/* Classes Grid */}
            <div className="classes-grid">
              {renderCreateClassCard()}
              {renderClassCards()}
            </div>
          </div>

          {/* RIGHT PANEL - Class Details */}
          <div className="class-details-panel">
            {/* Class Banner */}
            <div className="class-banner" style={getBannerGradientStyle()}>
              <h2 className="class-banner-title">{selectedClass.name}</h2>
            </div>

            {/* Class Information */}
            <div className="class-info-section">
              {/* Teachers Section */}
              <div className="teacher-subsection">
                <p className="section-label">Teachers</p>
                {renderTeacherAvatars()}
              </div>

              {/* Subjects Section */}
              <div className="subjects-section">
                <p className="section-label">Subjects</p>
                <div className="subjects-container">{renderSubjectTags()}</div>
              </div>

              {/* Students Section */}
              <div className="students-section">{renderStudentCount()}</div>

              {/* Edit Button */}
              <div className="edit-section">
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
