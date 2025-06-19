import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, UserProfile, Resume, Page } from '../types';

interface AppContextType {
  // Навигация
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
  
  // Пользователь
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  
  // Профиль
  profile: UserProfile | null;
  updateProfile: (profile: Partial<UserProfile>) => void;
  
  // Резюме
  resumes: Resume[];
  currentResume: Resume | null;
  createResume: (templateId: string, title: string) => string;
  updateResume: (id: string, updates: Partial<Resume>) => void;
  selectResume: (id: string) => void;
  
  // Публичное резюме
  publicResumeId: string | null;
  setPublicResumeId: (id: string | null) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

const mockUsers: { [email: string]: { password: string; user: User } } = {};

const generateId = () => Math.random().toString(36).substring(2) + Date.now().toString(36);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [currentResume, setCurrentResume] = useState<Resume | null>(null);
  const [publicResumeId, setPublicResumeId] = useState<string | null>(null);

  // Инициализация с localStorage
  useEffect(() => {
    const savedUser = localStorage.getItem('fastcv-user');
    const savedProfile = localStorage.getItem('fastcv-profile');
    const savedResumes = localStorage.getItem('fastcv-resumes');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setCurrentPage('dashboard');
    }
    if (savedProfile) {
      setProfile(JSON.parse(savedProfile));
    }
    if (savedResumes) {
      setResumes(JSON.parse(savedResumes));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Симуляция API вызова
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const userData = mockUsers[email];
    if (userData && userData.password === password) {
      setUser(userData.user);
      localStorage.setItem('fastcv-user', JSON.stringify(userData.user));
      setCurrentPage('dashboard');
      return true;
    }
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Симуляция API вызова
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    if (mockUsers[email]) {
      return false; // Пользователь уже существует
    }
    
    const newUser: User = {
      id: generateId(),
      email,
      name,
      profileComplete: false,
      resumeCount: 0
    };
    
    mockUsers[email] = { password, user: newUser };
    setUser(newUser);
    localStorage.setItem('fastcv-user', JSON.stringify(newUser));
    setCurrentPage('profile');
    return true;
  };

  const logout = () => {
    setUser(null);
    setProfile(null);
    setResumes([]);
    setCurrentResume(null);
    localStorage.removeItem('fastcv-user');
    localStorage.removeItem('fastcv-profile');
    localStorage.removeItem('fastcv-resumes');
    setCurrentPage('home');
  };

  const updateProfile = (profileUpdates: Partial<UserProfile>) => {
    const updatedProfile = profile ? { ...profile, ...profileUpdates } : profileUpdates as UserProfile;
    setProfile(updatedProfile);
    localStorage.setItem('fastcv-profile', JSON.stringify(updatedProfile));
    
    if (user && !user.profileComplete && updatedProfile.fullName && updatedProfile.email) {
      const updatedUser = { ...user, profileComplete: true };
      setUser(updatedUser);
      localStorage.setItem('fastcv-user', JSON.stringify(updatedUser));
    }
  };

  const createResume = (templateId: string, title: string): string => {
    if (!user || !profile) return '';
    
    const newResume: Resume = {
      id: generateId(),
      userId: user.id,
      templateId,
      title,
      profile: { ...profile },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      isPublic: false
    };
    
    const updatedResumes = [...resumes, newResume];
    setResumes(updatedResumes);
    setCurrentResume(newResume);
    localStorage.setItem('fastcv-resumes', JSON.stringify(updatedResumes));
    
    const updatedUser = { ...user, resumeCount: user.resumeCount + 1 };
    setUser(updatedUser);
    localStorage.setItem('fastcv-user', JSON.stringify(updatedUser));
    
    return newResume.id;
  };

  const updateResume = (id: string, updates: Partial<Resume>) => {
    const updatedResumes = resumes.map(resume => 
      resume.id === id 
        ? { ...resume, ...updates, updatedAt: new Date().toISOString() }
        : resume
    );
    setResumes(updatedResumes);
    localStorage.setItem('fastcv-resumes', JSON.stringify(updatedResumes));
    
    if (currentResume?.id === id) {
      setCurrentResume({ ...currentResume, ...updates });
    }
  };

  const selectResume = (id: string) => {
    const resume = resumes.find(r => r.id === id);
    setCurrentResume(resume || null);
  };

  return (
    <AppContext.Provider value={{
      currentPage,
      setCurrentPage,
      user,
      login,
      register,
      logout,
      profile,
      updateProfile,
      resumes,
      currentResume,
      createResume,
      updateResume,
      selectResume,
      publicResumeId,
      setPublicResumeId
    }}>
      {children}
    </AppContext.Provider>
  );
};