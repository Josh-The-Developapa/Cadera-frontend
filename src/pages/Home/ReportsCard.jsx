import React from 'react';
import { NavLink } from 'react-router-dom';
import { FileText, FilePlus2 } from 'lucide-react';

function ReportsCard() {
  return (
    <div
      style={{
        background: '#ffffff',
        borderRadius: '12px',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        padding: '20px',
        transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        height: 'calc(40% - 8px)',
        display: 'flex',
        flexDirection: 'column',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
      }}
    >
      {/* Header */}
      <h3
        style={{
          fontSize: '16px',
          fontWeight: '500',
          color: '#1f2937',
          marginBottom: '12px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <FilePlus2 size={20} />
        Generate Reports
      </h3>

      {/* Description */}
      <p
        style={{
          color: '#6b7280',
          fontSize: '14px',
          marginBottom: '16px',
          fontWeight: '300',
          lineHeight: '1.5',
          flex: 1,
        }}
      >
        Generate comprehensive academic reports for individual students or classes.
      </p>

      {/* Call-to-Action Button */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'flex-start',
          alignItems: 'flex-end',
        }}
      >
        <NavLink
          style={{
            background: '#007EA7',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 16px',
            color: 'white',
            fontWeight: '400',
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            textDecoration: 'none',
          }}
          to="reports"
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#0089b7';
            e.currentTarget.style.transform = 'translateY(-1px)';
            e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 126, 167, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#007EA7';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          <FileText size={16} /> Go To Reports
        </NavLink>
      </div>
    </div>
  );
}

export default ReportsCard;
