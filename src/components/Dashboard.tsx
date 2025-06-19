import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Plus, 
  FileText, 
  Edit3, 
  Share2, 
  Download,
  Calendar,
  Eye,
  Trash2,
  AlertCircle
} from 'lucide-react';

const Dashboard: React.FC = () => {
  const { user, resumes, profile, setCurrentPage, selectResume, createResume } = useApp();

  const handleCreateResume = (templateId: string) => {
    if (!profile) {
      setCurrentPage('profile');
      return;
    }
    
    const title = `Резюме ${resumes.length + 1}`;
    const resumeId = createResume(templateId, title);
    selectResume(resumeId);
    setCurrentPage('editor');
  };

  const handleEditResume = (resumeId: string) => {
    selectResume(resumeId);
    setCurrentPage('editor');
  };

  const templates = [
    { id: 'modern', name: 'Современный', description: 'Чистый и минималистичный дизайн' },
    { id: 'classic', name: 'Классический', description: 'Традиционный профессиональный стиль' },
    { id: 'creative', name: 'Креативный', description: 'Яркий дизайн для творческих профессий' },
    { id: 'executive', name: 'Руководитель', description: 'Элегантный стиль для топ-менеджеров' }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Добро пожаловать, {user?.name}!
        </h1>
        <p className="text-gray-600">
          Управляйте своими резюме и создавайте новые
        </p>
      </div>

      {/* Profile Status */}
      {!profile && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-8">
          <div className="flex items-start space-x-3">
            <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5" />
            <div>
              <h3 className="font-medium text-amber-800">Заполните профиль</h3>
              <p className="text-amber-700 text-sm mt-1">
                Для создания резюме необходимо сначала заполнить информацию о себе.
              </p>
              <button
                onClick={() => setCurrentPage('profile')}
                className="mt-2 text-amber-800 hover:text-amber-900 font-medium underline"
              >
                Заполнить профиль →
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <FileText className="w-8 h-8 text-blue-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">{user?.resumeCount || 0}</p>
              <p className="text-sm text-gray-600">Создано резюме</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Eye className="w-8 h-8 text-green-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">
                {resumes.filter(r => r.isPublic).length}
              </p>
              <p className="text-sm text-gray-600">Опубликовано</p>
            </div>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center">
            <Download className="w-8 h-8 text-purple-600" />
            <div className="ml-4">
              <p className="text-2xl font-bold text-gray-900">0</p>
              <p className="text-sm text-gray-600">Скачиваний</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create New Resume */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Создать новое резюме</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {templates.map((template) => (
            <div
              key={template.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow cursor-pointer group"
              onClick={() => handleCreateResume(template.id)}
            >
              <div className="flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4 group-hover:bg-blue-200 transition-colors">
                <FileText className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{template.name}</h3>
              <p className="text-sm text-gray-600 mb-4">{template.description}</p>
              <div className="flex items-center text-blue-600 text-sm font-medium">
                <Plus className="w-4 h-4 mr-1" />
                Создать
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Existing Resumes */}
      {resumes.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Мои резюме</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {resumes.map((resume) => (
              <div
                key={resume.id}
                className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{resume.title}</h3>
                      <p className="text-sm text-gray-600">
                        Шаблон: {templates.find(t => t.id === resume.templateId)?.name}
                      </p>
                    </div>
                    {resume.isPublic && (
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                        Опубликовано
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-4">
                    <Calendar className="w-4 h-4 mr-1" />
                    Обновлено: {new Date(resume.updatedAt).toLocaleDateString('ru-RU')}
                  </div>
                  
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleEditResume(resume.id)}
                      className="flex items-center space-x-1 px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors text-sm"
                    >
                      <Edit3 className="w-4 h-4" />
                      <span>Редактировать</span>
                    </button>
                    
                    <button className="flex items-center space-x-1 px-3 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                      <Share2 className="w-4 h-4" />
                      <span>Поделиться</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {resumes.length === 0 && profile && (
        <div className="text-center py-12">
          <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">
            У вас пока нет резюме
          </h3>
          <p className="text-gray-600 mb-6">
            Создайте свое первое резюме, выбрав один из шаблонов выше
          </p>
        </div>
      )}
    </div>
  );
};

export default Dashboard;