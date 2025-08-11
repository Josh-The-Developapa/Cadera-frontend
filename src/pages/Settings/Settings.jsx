import React, { useState } from 'react';
import { Pencil, RotateCcwKey, ShieldEllipsis, Trash2 } from 'lucide-react';
import './Settings.css';
import ContentBox from '../../components/ContentBox/ContentBox';

function Settings() {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');

  return (
    <ContentBox contentHeading="Settings">
      <div className="bg-white rounded-lg border border-gray-200 p-6 w-[400px] h-[73vh] max-h-[484px] min-h-[450px] mt-[20px]">
        <h3 className="text-lg font-medium text-gray-900 mb-6">
          Basic Information
        </h3>
        {/* Profile Picture Section */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Profile Picture
          </label>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-gray-300 overflow-hidden">
              <img
                src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='48' height='48' viewBox='0 0 48 48'%3E%3Ccircle cx='24' cy='24' r='24' fill='%236B7280'/%3E%3Cpath d='M24 12c3.3 0 6 2.7 6 6s-2.7 6-6 6-6-2.7-6-6 2.7-6 6-6zm0 28c-4.4 0-8.3-2.3-10.5-6 2.3-3.8 6.5-6 10.5-6s8.2 2.2 10.5 6c-2.2 3.7-6.1 6-10.5 6z' fill='white'/%3E%3C/svg%3E"
                alt="Profile"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-gray-800 text-white text-sm font-medium rounded-md hover:bg-gray-700 transition-colors">
                <Pencil size={14} />
                Change Picture
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2 border border-gray-300 text-gray-700 text-sm font-medium rounded-md hover:bg-gray-50 transition-colors">
                <Trash2 size={14} />
                Remove
              </button>
            </div>
          </div>
        </div>
        {/* Full Name Field */}
        <div className="mb-6">
          <label
            htmlFor="fullName"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Full Name
          </label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter Full Name"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] text-[#737373] font-[300] placeholder-[#737373] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {/* Email Address Field */}
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Email Address
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="email@example.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-[14px] text-[#737373] font-[300] placeholder-[#737373] focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        {/* Password & Edit Mode Section */}
        <div>
          <h4 className="text-sm font-medium text-gray-700 mb-3">
            Password & Edit Mode
          </h4>
          <div className="flex gap-3">
            <button className="inline-flex items-center px-4 py-2 border border-red-300 text-red-600 text-sm font-medium rounded-md hover:bg-red-50 transition-colors">
              <RotateCcwKey size={14} style={{ marginRight: '5px' }} /> Reset
              Password
            </button>
            <button className="inline-flex items-center px-4 py-2 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors">
              <ShieldEllipsis size={14} style={{ marginRight: '5px' }} /> Reset
              Edit PIN
            </button>
          </div>
        </div>
      </div>
    </ContentBox>
  );
}

export default Settings;
