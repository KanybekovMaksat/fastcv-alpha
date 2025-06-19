import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import { LoginPage, RegisterPage } from './components/AuthPages';
import Dashboard from './components/Dashboard';
import ProfileForm from './components/ProfileForm';
import ResumeEditor from './components/ResumeEditor';

const AppContent: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'login':
        return <LoginPage />;
      case 'register':
        return <RegisterPage />;
      case 'dashboard':
        return <Dashboard />;
      case 'profile':
        return <ProfileForm />;
      case 'editor':
        return <ResumeEditor />;
      default:
        return <HomePage />;
    }
  };

  const showHeader = !['login', 'register'].includes(currentPage);

  return (
    <Layout showHeader={showHeader}>
      {renderPage()}
    </Layout>
  );
};

function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;