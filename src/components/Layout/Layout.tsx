import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { useSidebar } from '../../contexts/SidebarContext';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar />
      <div className={`flex-1 transition-all duration-300 ${isCollapsed ? 'ml-16' : 'ml-70'}`}>
        <Header />
        <main className="pt-16 p-6 h-full overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;