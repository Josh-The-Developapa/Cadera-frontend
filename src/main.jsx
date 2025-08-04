import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import ContextProvider from './Context/ContextProvider.jsx';
import Login from './pages/Login/Login.jsx';
import Error from './pages/Error/Error.jsx';
import Students from './pages/Admin/Students/Students.jsx';
import Teachers from './pages/Admin/Teachers/Teachers.jsx';
import Classes from './pages/Admin/Classes/Classes.jsx';
import MainLayout from './pages/MainLayout/MainLayout.jsx';
import Analytics from './pages/Analytics/Analytics.jsx';
import Grades from './pages/Grades/Grades.jsx';
import Settings from './pages/Settings/Settings.jsx';
import Reports from './pages/Reports/Reports.jsx';
import IndividualClass from './pages/Grades/Class/IndividualClass.jsx';
import Performance from './pages/Grades/Class/Performance/Performance.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />, // Shared layout route
    children: [
      { index: true, element: <Home /> }, // path: '/'
      { path: 'dashboard', element: <Navigate to="/" replace /> }, // redirect alias
      { path: 'admin/teachers', element: <Teachers /> },
      { path: 'admin/students', element: <Students /> },
      { path: 'admin/classes', element: <Classes /> },
      { path: 'analytics', element: <Analytics /> },
      { path: 'grades', element: <Grades /> },
      { path: 'settings', element: <Settings /> },
      { path: 'reports', element: <Reports /> },
      {
        path: 'grades/:class_name',
        element: <IndividualClass />,
      },
      {
        path: 'grades/:class_name/student-performance',
        element: <Performance />,
      },
    ],
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/error',
    element: <Error />,
  },
]);
// const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <Home />,
//   },
//   {
//     path: '/login',
//     element: <Login />,
//   },
//   {
//     path: '/error',
//     element: <Error />,
//   },
//   {
//     path: '/admin/students',
//     element: <Students />,
//   },
//   {
//     path: '/admin/teachers',
//     element: <Teachers />,
//   },
//   {
//     path: '/admin/classes',
//     element: <Classes />,
//   },
// ]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
  </StrictMode>
);
