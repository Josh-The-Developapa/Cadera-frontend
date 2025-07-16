import React from 'react';
import {
  FileText,
  Clock,
  Send,
  Download,
  Plus,
  FileStack,
  File,
  FilePlus2,
  History,
  CircleAlert,
  FileClock,
} from 'lucide-react';
import './Reports.css';
import ContentBox from '../../components/ContentBox/ContentBox';

function Reports() {
  // Sample data - replace with your actual data
  const recentReport = {
    id: 'GSFA1EAN2',
    dateCreated: '14/07/2025',
    students: 214,
    classes: 9,
    expiresIn: '1d 13h 26m',
  };

  const historyData = [
    {
      type: 'Bulk',
      reportId: 'GSFA1EAN',
      dateCreated: '14/07/2025',
      students: 214,
      classes: 9,
    },
    {
      type: 'Bulk',
      reportId: 'GSFA1EAN',
      dateCreated: '14/07/2025',
      students: 214,
      classes: 9,
    },
    {
      type: 'Bulk',
      reportId: 'GSFA1EAN',
      dateCreated: '14/07/2025',
      students: 214,
      classes: 9,
    },
    {
      type: 'Bulk',
      reportId: 'GSFA1EAN',
      dateCreated: '14/07/2025',
      students: 214,
      classes: 9,
    },
    {
      type: 'Bulk',
      reportId: 'GSFA1EAN',
      dateCreated: '14/07/2025',
      students: 214,
      classes: 9,
    },
    {
      type: 'Bulk',
      reportId: 'GSFA1EAN',
      dateCreated: '14/07/2025',
      students: 214,
      classes: 9,
    },
    {
      type: 'Bulk',
      reportId: 'GSFA1EAN',
      dateCreated: '14/07/2025',
      students: 214,
      classes: 9,
    },
    {
      type: 'Bulk',
      reportId: 'GSFA1EAN',
      dateCreated: '14/07/2025',
      students: 214,
      classes: 9,
    },
    {
      type: 'Bulk',
      reportId: 'GSFA1EAN',
      dateCreated: '14/07/2025',
      students: 214,
      classes: 9,
    },
  ];

  return (
    <div className="body-container">
      <ContentBox contentHeading="Reports">
        <div className="reports-container">
          {/* Left Panel */}
          <div className="left-panel">
            {/* Generate New Reports Section */}
            <div className="section" id="generate-reports">
              <div className="section-header">
                <FilePlus2 className="w-[16px] h-[16px]" color="#000000" />
                <h3 className="section-title m-0">Generate New Reports</h3>
              </div>
              <div className="button-group">
                <button className="bulk-button">
                  <FileStack className="w-[16px] h-[16px]" />
                  Bulk
                </button>
                <button className="single-button">
                  <File className="w-[16px] h-[16px]" />
                  Single
                </button>
              </div>
            </div>

            {/* Recently Generated Section */}
            <div className="section" id="recently-generated-reports">
              <div className="section-header pt-[24px] pl-[24px]">
                <History className="w-[16px] h-[16px]" color="#000000" />
                <h3 className="section-title m-0">Recently Generated</h3>
              </div>

              <div className="recent-report-card">
                <div className="report-info-grid">
                  <div className="info-item">
                    <span className="info-label">Report ID</span>
                    <span className="info-value">{recentReport.id}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Date Created</span>
                    <span className="info-value">
                      {recentReport.dateCreated}
                    </span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Students</span>
                    <span className="info-value">{recentReport.students}</span>
                  </div>
                  <div className="info-item">
                    <span className="info-label">Classes</span>
                    <span className="info-value">{recentReport.classes}</span>
                  </div>
                </div>

                <div className="expires-info">
                  {' '}
                  <span className="info-label">Expires In</span>{' '}
                  <div className="flex flex-row justify-start items-center ">
                    <CircleAlert
                      className="w-[16px] h-[16px] mr-[5px]"
                      color="hsla(0, 50%, 50%, 1)"
                    />
                    <span className="expires-time">
                      {recentReport.expiresIn}
                    </span>
                  </div>
                </div>

                <div className="action-buttons">
                  <button className="send-button text-[14px] w-[159px]">
                    <Send className="w-[16px] h-[16px]" />
                    Send To Parents
                  </button>
                  <div className="flex flex-row justify-start items-center gap-[15px] w-[100%]">
                    <button className="download-button w-[159px] text-[14px]">
                      <Download className="w-[16px] h-[16px]" />
                      Download (PDF)
                    </button>
                    <span className="file-size">
                      Approx. <br />
                      240.0 MB
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - History */}
          <div className="right-panel">
            <div className="section p-[24px]">
              <div className="section-header">
                <FileClock className="w-5 h-5" color="#000000" />
                <h3 className="section-title">History</h3>
              </div>

              <div className="history-table">
                <div className="table-header">
                  <div className="header-cell">Type</div>
                  <div className="header-cell">Report ID</div>
                  <div className="header-cell">Date Created</div>
                  <div className="header-cell">Students</div>
                  <div className="header-cell">Classes</div>
                </div>

                <div className="table-body">
                  {historyData.map((item, index) => (
                    <div key={index} className="table-row">
                      <div className="table-cell">{item.type}</div>
                      <div className="table-cell">{item.reportId}</div>
                      <div className="table-cell">{item.dateCreated}</div>
                      <div className="table-cell">{item.students}</div>
                      <div className="table-cell">{item.classes}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </ContentBox>
    </div>
  );
}

export default Reports;
