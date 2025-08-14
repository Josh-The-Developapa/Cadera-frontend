import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';

import { AuthProvider } from './auth/AuthContext.jsx';
import ContextProvider from './Context/ContextProvider.jsx';

import ProtectedRoute from './components/ProtectedRoute.jsx';

import MainLayout from './pages/MainLayout/MainLayout.jsx';
import Home from './pages/Home/Home.jsx';
import Login from './pages/Login/Login.jsx';
import Error from './pages/Error/Error.jsx';

import Teachers from './pages/Admin/Teachers/Teachers.jsx';
import Students from './pages/Admin/Students/Students.jsx';
import Classes from './pages/Admin/Classes/Classes.jsx';

import Analytics from './pages/Analytics/Analytics.jsx';
import SelectClass from './pages/Analytics/AllClasses.jsx';
import AnalysisIndividualClass from './pages/Analytics/IndividualClass.jsx';

import Attendance from './pages/Attendance/Attendance.jsx';
import AttendanceIndividualClass from './pages/Attendance/IndividualClass.jsx';

import Comments from './pages/Comments/Comments.jsx';
import CommentsIndividualClass from './pages/Comments/IndividualClass.jsx';

import Grades from './pages/Grades/Grades.jsx';
import IndividualClass from './pages/Grades/Class/IndividualClass.jsx';
import Performance from './pages/Grades/Class/Performance/Performance.jsx';

import Settings from './pages/Settings/Settings.jsx';
import Reports from './pages/Reports/Reports.jsx';

import SchoolManagement from './pages/SchoolManagement/SchoolManagement.jsx';

// Define router
const router = createBrowserRouter([
  // Protected branch
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <MainLayout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Home /> },
      { path: 'dashboard', element: <Navigate to="/" replace /> },
      { path: 'admin/teachers', element: <Teachers /> },
      { path: 'admin/students', element: <Students /> },
      { path: 'admin/classes', element: <Classes /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'analytics/classes', element: <SelectClass /> },
      {
        path: 'analytics/classes/:class_name',
        element: <AnalysisIndividualClass />,
      },
      { path: 'school', element: <SchoolManagement /> },
      { path: 'attendance', element: <Attendance /> },
      {
        path: 'attendance/:class_name',
        element: <AttendanceIndividualClass />,
      },
      { path: 'comments', element: <Comments /> },
      { path: 'comments/:class_name', element: <CommentsIndividualClass /> },
      { path: 'settings', element: <Settings /> },
      { path: 'reports', element: <Reports /> },
      { path: 'grades', element: <Grades /> },
      { path: 'grades/:class_name', element: <IndividualClass /> },
      {
        path: 'grades/:class_name/student-performance',
        element: <Performance />,
      },
    ],
  },
  // Public routes
  { path: '/login', element: <Login /> },
  { path: '/error', element: <Error /> },
]);

// Render
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <ContextProvider>
        <RouterProvider router={router} />
      </ContextProvider>
    </AuthProvider>
  </StrictMode>
);
