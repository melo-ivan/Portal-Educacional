import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { SidebarProvider } from './contexts/SidebarContext';
import Layout from './components/Layout/Layout';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import CoursesPage from './pages/CoursesPage';
import CourseDetailPage from './pages/CourseDetailPage';
import AssignmentsPage from './pages/AssignmentsPage';
import GradesPage from './pages/GradesPage';
import LibraryPage from './pages/LibraryPage';
import MessagesPage from './pages/MessagesPage';
import UsersPage from './pages/UsersPage';
import ReportsPage from './pages/ReportsPage';
import SettingsPage from './pages/SettingsPage';
import StudentsPage from './pages/StudentsPage';
import SchedulePage from './pages/SchedulePage';
import EventsPage from './pages/EventsPage';

const ProtectedRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando...</p>
        </div>
      </div>
    );
  }
  
  return user ? <>{children}</> : <Navigate to="/login" replace />;
};

function App() {
  return (
    <LanguageProvider>
      <AuthProvider>
        <SidebarProvider>
          <Router>
            <Routes>
              {/* Redirect root to login */}
              <Route path="/" element={<Navigate to="/login" replace />} />
              <Route path="/login" element={<LoginPage />} />
              <Route
                path="/*"
                element={
                  <ProtectedRoute>
                    <Layout>
                      <Routes>
                        <Route path="/dashboard" element={<DashboardPage />} />
                        <Route path="/courses" element={<CoursesPage />} />
                        <Route path="/courses/:id" element={<CourseDetailPage />} />
                        <Route path="/assignments" element={<AssignmentsPage />} />
                        <Route path="/grades" element={<GradesPage />} />
                        <Route path="/library" element={<LibraryPage />} />
                        <Route path="/messages" element={<MessagesPage />} />
                        <Route path="/users" element={<UsersPage />} />
                        <Route path="/reports" element={<ReportsPage />} />
                        <Route path="/students" element={<StudentsPage />} />
                        <Route path="/schedule" element={<SchedulePage />} />
                        <Route path="/events" element={<EventsPage />} />
                        <Route path="/settings" element={<SettingsPage />} />
                        {/* Redirect any unmatched route to dashboard */}
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                      </Routes>
                    </Layout>
                  </ProtectedRoute>
                }
              />
            </Routes>
          </Router>
        </SidebarProvider>
      </AuthProvider>
    </LanguageProvider>
  );
}

export default App;