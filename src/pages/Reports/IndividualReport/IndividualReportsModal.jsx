import React, { useState, useEffect, useContext } from 'react';
import { X, Search, BadgeCheck, FilePlus } from 'lucide-react';
import { getAllStudents } from '../StudentData';
import './IndividualReportsModal.css';
import Context from '../../../Context/Context';

const IndividualReportsModal = ({ isOpen, onClose, onGenerateReports }) => {
  const context = useContext(Context);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectAll, setSelectAll] = useState(false);

  const allStudents = getAllStudents();

  useEffect(() => {
    if (isOpen) {
      setSelectedStudents([]);
      setSearchQuery('');
      setSelectAll(false);
    }
  }, [isOpen]);

  const filteredStudents = allStudents.filter((student) =>
    student.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleStudentSelect = (studentId, isSelected) => {
    if (isSelected) {
      setSelectedStudents([...selectedStudents, studentId]);
    } else {
      setSelectedStudents(selectedStudents.filter((id) => id !== studentId));
      setSelectAll(false);
    }
  };

  const handleSelectAll = (isSelected) => {
    setSelectAll(isSelected);
    if (isSelected) {
      setSelectedStudents(filteredStudents.map((student) => student.id));
    } else {
      setSelectedStudents([]);
    }
  };

  useEffect(() => {
    if (
      selectedStudents.length === filteredStudents.length &&
      filteredStudents.length > 0
    ) {
      setSelectAll(true);
    } else {
      setSelectAll(false);
    }
  }, [selectedStudents, filteredStudents]);

  const handleGenerateReports = () => {
    if (selectedStudents.length === 0) return;

    const studentsToInclude = allStudents.filter((student) =>
      selectedStudents.includes(student.id)
    );

    onGenerateReports({
      type: 'individual',
      students: studentsToInclude,
    });

    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="modal-backdrop text-black"
      style={{
        left: context.isExpanded ? '170px' : '70px',
      }}
    >
      <div className="modal-container">
        <div className="modal-header">
          <h2 className="text-[18px] font-[500]">
            Generate Individual Reports
          </h2>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="modal-content">
          <div className="step-section">
            <div className="text-[14px] font-[500] mb-[16px]">
              <h3 className="flex flex-row justify-start items-center gap-[16px]">
                1. Select Students
                <BadgeCheck size={16} stroke="#00BF76" />
              </h3>
            </div>

            <div className="form-container">
              <div className="students-header">
                <div className="text-[14px] font-[400]">All Students</div>
                <div className="search-container">
                  <input
                    type="text"
                    placeholder="Search"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="modal-search-input"
                  />
                  <Search size={16} className="search-icon" />
                </div>
              </div>

              <div
                className="students-table-container"
                style={{ border: 'none' }}
              >
                <table className="student-table">
                  <thead>
                    <tr onClick={() => handleSelectAll(true)}>
                      <th>
                        <input
                          type="checkbox"
                          checked={selectAll}
                          readOnly
                          className="custom-checkbox"
                        />
                      </th>
                      <th>Name ({selectedStudents.length} Selected)</th>
                      <th>Class</th>
                      <th>SPC</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredStudents.map((student, index) => {
                      const isSelected = selectedStudents.includes(student.id);
                      const baseColor = index % 2 === 0 ? '#FAFAFA' : '#F6FCFD';
                      const selectedColor =
                        index % 2 === 0 ? '#e9e9e9' : '#b2e3eb';

                      return (
                        <tr
                          key={student.id}
                          onClick={() =>
                            handleStudentSelect(student.id, !isSelected)
                          }
                          style={{
                            backgroundColor: isSelected
                              ? selectedColor
                              : baseColor,
                            transition: 'all 0.2s ease-in-out',
                            height: '32px',
                          }}
                          className="student-row"
                        >
                          <td className="rounded-left">
                            <input
                              type="checkbox"
                              checked={isSelected}
                              readOnly
                              className="custom-checkbox"
                            />
                          </td>
                          <td>{student.name}</td>
                          <td>{student.className}</td>
                          <td className="rounded-right">{student.spc}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button
            className="generate-button"
            onClick={handleGenerateReports}
            disabled={selectedStudents.length === 0}
          >
            <FilePlus size={16} /> Generate Reports
          </button>
        </div>
      </div>
    </div>
  );
};

export default IndividualReportsModal;
