import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Bell, Globe, ChevronDown, Menu } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Language } from '../../types';
import { useSidebar } from '../../contexts/SidebarContext';

const Header: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { isCollapsed, toggleSidebar } = useSidebar();
  const [showLanguageMenu, setShowLanguageMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const languages = [
    { code: 'pt' as Language, name: 'Português', flag: '🇧🇷' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' }
  ];

  const notifications = [
    { id: 1, message: 'Nova aula disponível: React Hooks', time: '5 min', unread: true },
    { id: 2, message: 'Tarefa entregue: Projeto Final', time: '1h', unread: true },
    { id: 3, message: 'Nota atribuída: 8.5', time: '2h', unread: false }
  ];

  return (
    <header className={`fixed top-0 right-0 h-16 bg-white/80 backdrop-blur-lg border-b border-gray-200 z-20 transition-all duration-300 ${
      isCollapsed ? 'left-16' : 'left-70'
    }`}>
      <div className="flex items-center justify-between h-full px-6">
        {/* Mobile Menu Button */}
        <button
          onClick={toggleSidebar}
          className="lg:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Search */}
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input
              type="text"
              placeholder={t('common.search')}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          {/* Technology Stack Icons */}
          <div className="hidden md:flex items-center space-x-3 px-4 py-2 bg-gray-50 rounded-xl">
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
                <span className="text-xs font-bold text-white">R</span>
              </div>
              <span className="text-xs text-gray-600">{t('tech.frontend')}</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center">
                <span className="text-xs font-bold text-white">N</span>
              </div>
              <span className="text-xs text-gray-600">{t('tech.backend')}</span>
            </div>
            <div className="w-px h-4 bg-gray-300"></div>
            <div className="flex items-center space-x-2">
              <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                <span className="text-xs font-bold text-white">P</span>
              </div>
              <span className="text-xs text-gray-600">{t('tech.database')}</span>
            </div>
          </div>

          {/* Notifications */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
            >
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                2
              </span>
            </button>

            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
                >
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`px-4 py-3 hover:bg-gray-50 cursor-pointer border-l-4 ${
                        notification.unread ? 'border-blue-500 bg-blue-50/30' : 'border-transparent'
                      }`}
                    >
                      <p className="text-sm font-medium text-gray-900">{notification.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <button
              onClick={() => setShowLanguageMenu(!showLanguageMenu)}
              className="flex items-center space-x-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all"
            >
              <Globe className="w-4 h-4" />
              <span className="text-sm font-medium">
                {languages.find(l => l.code === language)?.flag}
              </span>
              <ChevronDown className="w-3 h-3" />
            </button>

            <AnimatePresence>
              {showLanguageMenu && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-lg border border-gray-200 py-2"
                >
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        setLanguage(lang.code);
                        setShowLanguageMenu(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                        language === lang.code ? 'bg-blue-50 text-blue-700' : 'text-gray-700'
                      }`}
                    >
                      <span className="mr-3">{lang.flag}</span>
                      {lang.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;