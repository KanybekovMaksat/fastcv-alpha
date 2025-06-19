import React, { useState, useRef } from 'react';
import { useApp } from '../context/AppContext';
import { ResumeTemplate } from './ResumeTemplates';
import { exportToPDF, exportToWord } from '../utils/exportUtils';
import { 
  ArrowLeft,
  Download,
  Share2,
  Eye,
  Palette,
  Save,
  ExternalLink,
  QrCode,
  FileText,
  Loader2
} from 'lucide-react';

const ResumeEditor: React.FC = () => {
  const { currentResume, updateResume, setCurrentPage } = useApp();
  const [selectedTemplate, setSelectedTemplate] = useState(currentResume?.templateId || 'modern');
  const [isPublic, setIsPublic] = useState(currentResume?.isPublic || false);
  const [showQR, setShowQR] = useState(false);
  const [isExporting, setIsExporting] = useState<'pdf' | 'word' | null>(null);
  const resumeRef = useRef<HTMLDivElement>(null);

  if (!currentResume) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <p className="text-gray-600">Резюме не найдено</p>
        <button
          onClick={() => setCurrentPage('dashboard')}
          className="mt-4 text-blue-600 hover:text-blue-700"
        >
          Вернуться к дашборду
        </button>
      </div>
    );
  }

  const templates = [
    { id: 'modern', name: 'Современный', color: 'bg-blue-100 border-blue-300' },
    { id: 'classic', name: 'Классический', color: 'bg-gray-100 border-gray-300' },
    { id: 'creative', name: 'Креативный', color: 'bg-purple-100 border-purple-300' },
    { id: 'executive', name: 'Руководитель', color: 'bg-gray-400 border-gray-700' }
  ];

  const handleTemplateChange = (templateId: string) => {
    setSelectedTemplate(templateId);
    updateResume(currentResume.id, { templateId });
  };

  const handlePublishToggle = () => {
    const newIsPublic = !isPublic;
    setIsPublic(newIsPublic);
    
    const publicUrl = newIsPublic ? `https://fastcv.com/r/${currentResume.id}` : undefined;
    
    updateResume(currentResume.id, { 
      isPublic: newIsPublic,
      publicUrl
    });
  };

  const handleDownloadPDF = async () => {
    if (!currentResume.profile) return;
    
    setIsExporting('pdf');
    try {
      await exportToPDF('resume-preview', `${currentResume.title}.pdf`);
    } catch (error) {
      alert('Ошибка при создании PDF: ' + (error as Error).message);
    } finally {
      setIsExporting(null);
    }
  };

  const handleDownloadWord = async () => {
    if (!currentResume.profile) return;
    
    setIsExporting('word');
    try {
      await exportToWord(
        currentResume.profile, 
        selectedTemplate, 
        `${currentResume.title}.docx`
      );
    } catch (error) {
      alert('Ошибка при создании Word документа: ' + (error as Error).message);
    } finally {
      setIsExporting(null);
    }
  };

  const generateQRCode = () => {
    setShowQR(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setCurrentPage('dashboard')}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Назад</span>
              </button>
              <div className="border-l border-gray-300 pl-4">
                <h1 className="text-lg font-semibold text-gray-900">{currentResume.title}</h1>
                <p className="text-sm text-gray-500">
                  Последнее обновление: {new Date(currentResume.updatedAt).toLocaleDateString('ru-RU')}
                </p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <button
                onClick={handleDownloadPDF}
                disabled={isExporting === 'pdf'}
                className="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors"
              >
                {isExporting === 'pdf' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Download className="w-4 h-4" />
                )}
                <span>PDF</span>
              </button>
              
              <button
                onClick={handleDownloadWord}
                disabled={isExporting === 'word'}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
              >
                {isExporting === 'word' ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <FileText className="w-4 h-4" />
                )}
                <span>Word</span>
              </button>
              
              <button
                onClick={handlePublishToggle}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                  isPublic
                    ? 'bg-green-600 text-white hover:bg-green-700'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Share2 className="w-4 h-4" />
                <span>{isPublic ? 'Опубликовано' : 'Опубликовать'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-8">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <Palette className="w-5 h-5 mr-2 text-blue-600" />
                Шаблоны
              </h2>
              
              <div className="space-y-3">
                {templates.map((template) => (
                  <button
                    key={template.id}
                    onClick={() => handleTemplateChange(template.id)}
                    className={`w-full p-3 rounded-lg border-2 transition-all ${
                      selectedTemplate === template.id
                        ? 'border-blue-500 bg-blue-50'
                        : template.color
                    }`}
                  >
                    <div className="text-sm font-medium text-gray-900">
                      {template.name}
                    </div>
                  </button>
                ))}
              </div>

              {/* Export Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-md font-semibold text-gray-900 mb-4">
                  Экспорт
                </h3>
                
                <div className="space-y-3">
                  <button
                    onClick={handleDownloadPDF}
                    disabled={isExporting === 'pdf'}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:bg-red-400 transition-colors"
                  >
                    {isExporting === 'pdf' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    <span>Скачать PDF</span>
                  </button>
                  
                  <button
                    onClick={handleDownloadWord}
                    disabled={isExporting === 'word'}
                    className="w-full flex items-center justify-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                  >
                    {isExporting === 'word' ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <FileText className="w-4 h-4" />
                    )}
                    <span>Скачать Word</span>
                  </button>
                </div>
              </div>

              {/* Publish Section */}
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-md font-semibold text-gray-900 mb-4">
                  Публикация
                </h3>
                
                <div className="space-y-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      checked={isPublic}
                      onChange={handlePublishToggle}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="ml-2 text-sm text-gray-700">
                      Сделать резюме публичным
                    </span>
                  </label>
                  
                  {isPublic && (
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm text-green-800 mb-2">
                        Ваше резюме доступно по ссылке:
                      </p>
                      <div className="flex items-center space-x-2 mb-2">
                        <input
                          type="text"
                          value={currentResume.publicUrl || ''}
                          readOnly
                          className="flex-1 px-2 py-1 text-xs bg-white border border-green-200 rounded"
                        />
                        <button
                          onClick={() => navigator.clipboard.writeText(currentResume.publicUrl || '')}
                          className="text-green-600 hover:text-green-800"
                        >
                          <ExternalLink className="w-4 h-4" />
                        </button>
                      </div>
                      <button
                        onClick={generateQRCode}
                        className="flex items-center space-x-1 text-sm text-green-600 hover:text-green-800"
                      >
                        <QrCode className="w-4 h-4" />
                        <span>Создать QR-код</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold text-gray-900 flex items-center">
                  <Eye className="w-5 h-5 mr-2 text-blue-600" />
                  Предпросмотр
                </h2>
                
                <div className="text-sm text-gray-500">
                  Шаблон: {templates.find(t => t.id === selectedTemplate)?.name}
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50 p-4">
                <div 
                  id="resume-preview"
                  ref={resumeRef}
                  className="transform scale-75 origin-top-left" 
                  style={{ width: '133.33%' }}
                >
                  <ResumeTemplate 
                    profile={currentResume.profile} 
                    templateId={selectedTemplate}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* QR Code Modal */}
      {showQR && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full mx-4">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
              QR-код резюме
            </h3>
            <div className="flex justify-center mb-4">
              <div className="w-48 h-48 bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-500">
                  <QrCode className="w-12 h-12 mx-auto mb-2" />
                  <p className="text-sm">QR-код будет здесь</p>
                  <p className="text-xs mt-1">В полной версии</p>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 text-center mb-4">
              Отсканируйте код для быстрого доступа к резюме
            </p>
            <button
              onClick={() => setShowQR(false)}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Закрыть
            </button>
          </div>
        </div>
      )}

      {/* Loading Overlay */}
      {isExporting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 flex items-center space-x-4">
            <Loader2 className="w-6 h-6 animate-spin text-blue-600" />
            <span className="text-gray-900">
              {isExporting === 'pdf' ? 'Создание PDF...' : 'Создание Word документа...'}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResumeEditor;