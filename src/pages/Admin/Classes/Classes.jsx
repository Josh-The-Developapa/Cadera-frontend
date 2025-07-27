import React, { useEffect, useState } from 'react';
import './Classes.css';
import ContentBox from '../../../components/ContentBox/ContentBox';
import rightPanelIcon from '../../../assets/classes-right-panel-icon.svg';
import Asset1 from '../../../assets/SVGs/Asset 1.svg';
import Asset2 from '../../../assets/SVGs/Asset 2.svg';
import Asset3 from '../../../assets/SVGs/Asset 3.svg';
import Asset4 from '../../../assets/SVGs/Asset 4.svg';
import Asset5 from '../../../assets/SVGs/Asset 5.svg';
import Asset6 from '../../../assets/SVGs/Asset 6.svg';
import Asset7 from '../../../assets/SVGs/Asset 7.svg';
import Asset8 from '../../../assets/SVGs/Asset 8.svg';
import Asset9 from '../../../assets/SVGs/Asset 9.svg';
import Asset10 from '../../../assets/SVGs/Asset 10.svg';
import Asset11 from '../../../assets/SVGs/Asset 11.svg';
import Asset12 from '../../../assets/SVGs/Asset 12.svg';
import Asset13 from '../../../assets/SVGs/Asset 13.svg';
import Asset14 from '../../../assets/SVGs/Asset 14.svg';
import Asset15 from '../../../assets/SVGs/Asset 15.svg';
import Asset16 from '../../../assets/SVGs/Asset 16.svg';
import Asset17 from '../../../assets/SVGs/Asset 17.svg';
import Asset18 from '../../../assets/SVGs/Asset 18.svg';
import Asset19 from '../../../assets/SVGs/Asset 19.svg';
import Asset20 from '../../../assets/SVGs/Asset 20.svg';
import {
  MoreHorizontal,
  Monitor,
  Plus,
  Search as SearchIcon,
  SquarePen,
} from 'lucide-react';

// Import Mock Classes Data
import mockClasses from './ClassesData.js';

// Import the new CreateClassModal
import CreateClassModal from '../../../components/CreateClassModal/CreateClassModal.jsx';
import EditClassModal from '../../../components/EditClassModal/EditClassModal.jsx';

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
  // State Management
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [hues, setHues] = useState([]);
  const [subjectHues, setSubjectHues] = useState({});
  const [classIcons, setClassIcons] = useState({});
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [classes, setClasses] = useState(mockClasses);

  // Generate random hues and icons for class cards on component mount
  useEffect(() => {
    const generatedHues = classes.map(() => Math.floor(Math.random() * 361));
    setHues(generatedHues);

    // Generate random icons for each class
    const iconMap = {};
    classes.forEach((cls) => {
      const randomIndex = Math.floor(Math.random() * availableIcons.length);
      iconMap[cls.id] = availableIcons[randomIndex];
    });
    setClassIcons(iconMap);

    const subjectHueMap = {};
    classes.forEach((cls, cIndex) => {
      subjectHueMap[cIndex] = cls.subjects.map(() =>
        Math.floor(Math.random() * 361)
      );
    });
    setSubjectHues(subjectHueMap);
  }, [classes]);

  // Filter classes based on search query
  const filteredClasses = classes.filter((cls) =>
    cls.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get currently selected class
  const selectedClass = classes[selectedIndex];

  // Handle class card selection
  const handleClassSelection = (originalIndex) => {
    setSelectedIndex(originalIndex);
  };

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle create new class
  const handleCreateClass = (newClassData) => {
    const newClass = {
      id: classes.length + 1,
      name: newClassData.name,
      level: newClassData.level,
      teachers: newClassData.teachers,
      students: newClassData.students.length,
      subjects: newClassData.subjects.map((subject) => ({ name: subject })),
    };

    setClasses((prev) => [...prev, newClass]);
    console.log('New class created:', newClass);
  };

  // Handle edit class
  const handleEditClass = (updatedClassData) => {
    setClasses((prev) =>
      prev.map((cls, index) =>
        index === selectedIndex
          ? {
              ...cls,
              name: updatedClassData.name,
              level: updatedClassData.level,
              teachers: updatedClassData.teachers,
              students: updatedClassData.students.length,
              subjects: updatedClassData.subjects.map((subject) => ({
                name: subject,
              })),
            }
          : cls
      )
    );
    console.log('Class updated:', updatedClassData);
  };

  // Handle opening edit modal
  const handleOpenEditModal = () => {
    setIsEditModalOpen(true);
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
      width: '32px',
      height: '32px',
      borderRadius: '50%',
      background: `hsl(${hues[selectedIndex]}, 20%, 50%)`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '10px',
      fontWeight: '300',
      marginBottom: '8px',
    };
  };

  // Generate style for "others" text
  const getOthersTextStyle = () => {
    return {
      color: `hsl(${hues[selectedIndex]}, 30%, 40%)`,
      fontWeight: '300',
      fontSize: '10px',
    };
  };

  // Render Create New Class Card
  const renderCreateClassCard = () => (
    <div
      className="create-class-card-new"
      onClick={() => setIsCreateModalOpen(true)}
    >
      <Plus size={24} />
      <p className="create-class-text">Create New Class</p>
    </div>
  );

  // Render Class Cards
  const renderClassCards = () => {
    return filteredClasses.map((cls) => {
      const originalIndex = classes.findIndex((s) => s.id === cls.id);
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
          {subject.name.slice(0, 3).toUpperCase()}
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
                <SearchIcon className="search-icon" />
              </div>
            </div>

            {/* Classes Container */}
            <div className="classes-container">
              {renderCreateClassCard()}
              {renderClassCards()}
            </div>
          </div>

          {/* RIGHT PANEL - Class Details */}
          <div className="class-details-panel">
            {/* Class Banner */}
            <div className="class-banner" style={getBannerGradientStyle()}>
              <img
                src={rightPanelIcon}
                alt="RightPanelIcon"
                style={{
                  position: 'relative',
                  height: '100%',
                  width: '100%',
                  top: 65,
                  left: -120,
                }}
              />
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
                <button
                  className="edit-class-btn"
                  onClick={handleOpenEditModal}
                >
                  <div className="flex flex-row justify-center items-center gap-[10px]">
                    <SquarePen size={20} stroke="#ffffff" />
                    Edit Class
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </ContentBox>

      {/* Create Class Modal */}
      <CreateClassModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onCreateClass={handleCreateClass}
      />

      {/* Edit Class Modal */}
      <EditClassModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onEditClass={handleEditClass}
        classData={selectedClass}
      />
    </div>
  );
}

export default Classes;
