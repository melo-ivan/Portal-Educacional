import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  BookOpen,
  FileText,
  GraduationCap,
  Library,
  MessageSquare,
  Users,
  BarChart3,
  Settings,
  LogOut,
  Calendar,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { useLanguage } from '../../contexts/LanguageContext';
import { useSidebar } from '../../contexts/SidebarContext';

const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isCollapsed, toggleSidebar } = useSidebar();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getMenuItems = () => {
    const baseItems = [
      { to: '/dashboard', icon: LayoutDashboard, label: t('nav.dashboard') },
      { to: '/courses', icon: BookOpen, label: t('nav.courses') },
      { to: '/library', icon: Library, label: t('nav.library') },
      { to: '/messages', icon: MessageSquare, label: t('nav.messages') },
      { to: '/settings', icon: Settings, label: t('nav.settings') }
    ];

    if (user?.role === 'student') {
      return [
        ...baseItems.slice(0, 2),
        { to: '/assignments', icon: FileText, label: t('nav.assignments') },
        { to: '/grades', icon: GraduationCap, label: t('nav.grades') },
        { to: '/schedule', icon: Calendar, label: 'Agenda' },
        ...baseItems.slice(2)
      ];
    }

    if (user?.role === 'teacher') {
      return [
        ...baseItems.slice(0, 2),
        { to: '/assignments', icon: FileText, label: t('nav.assignments') },
        { to: '/grades', icon: GraduationCap, label: t('nav.grades') },
        { to: '/students', icon: Users, label: 'Alunos' },
        { to: '/schedule', icon: Calendar, label: 'Agenda' },
        ...baseItems.slice(2)
      ];
    }

    if (user?.role === 'admin') {
      return [
        ...baseItems.slice(0, 2),
        { to: '/users', icon: Users, label: t('nav.users') },
        { to: '/reports', icon: BarChart3, label: t('nav.reports') },
        { to: '/events', icon: Calendar, label: 'Eventos' },
        ...baseItems.slice(2)
      ];
    }

    return baseItems;
  };

  const menuItems = getMenuItems();

  return (
    <motion.div
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className={`fixed left-0 top-0 h-full bg-white shadow-xl border-r border-gray-200 z-30 transition-all duration-300 ${
        isCollapsed ? 'w-16' : 'w-70'
      }`}
    >
      <div className="flex flex-col h-full">
        {/* Toggle Button */}
        <button
          onClick={toggleSidebar}
          className="absolute -right-3 top-6 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-40"
        >
          {isCollapsed ? (
            <ChevronRight className="w-3 h-3 text-gray-600" />
          ) : (
            <ChevronLeft className="w-3 h-3 text-gray-600" />
          )}
        </button>

        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-white" />
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h1 className="text-xl font-bold text-gray-900">EduPortal</h1>
                  <p className="text-sm text-gray-500">Sistema Educacional</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* User Info */}
        <div className={`p-6 border-b border-gray-200 ${isCollapsed ? 'px-3' : ''}`}>
          <div className="flex items-center space-x-3">
            <img
              src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop'}
              alt={user?.name}
              className={`rounded-full object-cover ${isCollapsed ? 'w-8 h-8' : 'w-12 h-12'}`}
            />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.div
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <h3 className="font-semibold text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Navigation */}
        <nav className={`flex-1 py-6 space-y-1 ${isCollapsed ? 'px-2' : 'px-4'}`}>
          {menuItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center py-3 rounded-xl transition-all duration-200 group relative ${
                  isCollapsed ? 'px-2 justify-center' : 'px-4'
                } ${
                  isActive
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
              title={isCollapsed ? item.label : ''}
            >
              {({ isActive }) => (
                <>
                  <item.icon 
                    className={`w-5 h-5 transition-colors ${
                      isCollapsed ? '' : 'mr-3'
                    } ${
                      isActive ? 'text-blue-700' : 'text-gray-400 group-hover:text-gray-600'
                    }`} 
                  />
                  <AnimatePresence>
                    {!isCollapsed && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="font-medium"
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                  
                  {/* Tooltip for collapsed state */}
                  {isCollapsed && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                    </div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Logout */}
        <div className={`border-t border-gray-200 ${isCollapsed ? 'p-2' : 'p-4'}`}>
          <button
            onClick={handleLogout}
            className={`flex items-center w-full py-3 text-gray-600 hover:bg-red-50 hover:text-red-700 rounded-xl transition-all duration-200 group relative ${
              isCollapsed ? 'px-2 justify-center' : 'px-4'
            }`}
            title={isCollapsed ? t('nav.logout') : ''}
          >
            <LogOut className={`w-5 h-5 text-gray-400 group-hover:text-red-700 ${isCollapsed ? '' : 'mr-3'}`} />
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, width: 0 }}
                  animate={{ opacity: 1, width: 'auto' }}
                  exit={{ opacity: 0, width: 0 }}
                  transition={{ duration: 0.2 }}
                  className="font-medium"
                >
                  {t('nav.logout')}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;