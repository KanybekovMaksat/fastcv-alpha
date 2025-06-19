import React from 'react';
import { useApp } from '../context/AppContext';
import { User, LogOut, FileText, Home } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  showHeader?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, showHeader = true }) => {
  const { user, logout, setCurrentPage, currentPage } = useApp();

  if (!showHeader) {
    return <div className="min-h-screen bg-white">{children}</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <button
                onClick={() => setCurrentPage(user ? 'dashboard' : 'home')}
                className="flex items-center space-x-2 text-xl font-bold text-gray-900 hover:text-blue-600 transition-colors"
              >
               <img src="/fastcv.png" className='w-9 h-9' alt="" />
                <span>FastCV</span>
              </button>
            </div>
            
            <nav className="flex items-center space-x-4">
              {user ? (
                <>
                  <button
                    onClick={() => setCurrentPage('dashboard')}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === 'dashboard'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <Home className="w-4 h-4" />
                    <span>Дашборд</span>
                  </button>
                  
                  <button
                    onClick={() => setCurrentPage('profile')}
                    className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      currentPage === 'profile'
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Профиль</span>
                  </button>
                  
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span>{user.name}</span>
                  </div>
                  
                  <button
                    onClick={logout}
                    className="flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    <span>Выход</span>
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => setCurrentPage('login')}
                    className="text-gray-600 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Войти
                  </button>
                  <button
                    onClick={() => setCurrentPage('register')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
                  >
                    Регистрация
                  </button>
                </>
              )}
            </nav>
          </div>
        </div>
      </header>
      
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
};

export default Layout;