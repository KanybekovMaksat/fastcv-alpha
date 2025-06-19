export interface User {
  id: string;
  email: string;
  name: string;
  profileComplete: boolean;
  resumeCount: number;
}

export interface UserProfile {
  // Личная информация
  fullName: string;
  email: string;
  phone: string;
  birthYear: number;
  location: string;
  photo?: string;
  
  // Социальные сети
  linkedin?: string;
  github?: string;
  website?: string;
  
  // Профессиональная информация
  position: string;
  summary: string;
  
  // Образование
  education: Education[];
  
  // Опыт работы
  experience: Experience[];
  
  // Навыки
  skills: Skill[];
  
  // Достижения и сертификаты
  achievements: string[];
  certificates: Certificate[];
  
  // Проекты
  projects: Project[];
  
  // Языки
  languages: Language[];
  
  // Дополнительная информация
  additionalInfo?: string;
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number;
  gpa?: string;
  description?: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  location: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'Начинающий' | 'Средний' | 'Продвинутый' | 'Эксперт';
  category: string;
}

export interface Certificate {
  id: string;
  name: string;
  organization: string;
  date: string;
  url?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  url?: string;
  github?: string;
}

export interface Language {
  id: string;
  name: string;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2' | 'Родной';
}

export interface Resume {
  id: string;
  userId: string;
  templateId: string;
  title: string;
  profile: UserProfile;
  createdAt: string;
  updatedAt: string;
  isPublic: boolean;
  publicUrl?: string;
}

export type Page = 
  | 'home' 
  | 'login' 
  | 'register' 
  | 'dashboard' 
  | 'profile' 
  | 'editor' 
  | 'preview'
  | 'public-resume';