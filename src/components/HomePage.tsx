import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  Download, 
  Share2, 
  Zap, 
  Shield, 
  Palette,
  ArrowRight,
  CheckCircle,
  Users,
  Globe,
  Smartphone
} from 'lucide-react';

const HomePage: React.FC = () => {
  const { setCurrentPage } = useApp();

  const features = [
    {
      icon: <Palette className="w-8 h-8" />,
      title: 'Профессиональные шаблоны',
      description: 'Множество красивых шаблонов для любой сферы деятельности'
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: 'Экспорт в PDF и Word',
      description: 'Скачивайте резюме в популярных форматах для отправки работодателям'
    },
    {
      icon: <Share2 className="w-8 h-8" />,
      title: 'Онлайн-резюме с QR-кодом',
      description: 'Делитесь резюме через уникальную ссылку и QR-код'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Быстрое создание',
      description: 'Создайте профессиональное резюме за считанные минуты'
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: 'Безопасность данных',
      description: 'Ваши личные данные надежно защищены'
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: 'Адаптивный дизайн',
      description: 'Работает идеально на всех устройствах'
    }
  ];

  const stats = [
    { number: '50,000+', label: 'Созданных резюме' },
    { number: '25,000+', label: 'Довольных пользователей' },
    { number: '95%', label: 'Показатель успеха' },
    { number: '24/7', label: 'Поддержка' }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-100 pt-16 pb-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-8">
              <div className="relative">
                <FileText className="w-20 h-20 text-blue-600" />
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 text-white" />
                </div>
              </div>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Создайте идеальное
              <span className="text-blue-600 block">резюме за минуты</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              FastCV поможет вам создать профессиональное резюме, которое выделит вас среди других кандидатов. 
              Выберите шаблон, заполните данные и получите готовое резюме в PDF или Word.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button
                onClick={() => setCurrentPage('register')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center space-x-2"
              >
                <span>Начать бесплатно</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => setCurrentPage('login')}
                className="border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300"
              >
                Уже есть аккаунт? Войти
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-blue-100 text-sm md:text-base">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Почему выбирают FastCV?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Мы предоставляем все необходимые инструменты для создания профессионального резюме
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-blue-600 mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Как это работает?
            </h2>
            <p className="text-xl text-gray-600">
              Создайте резюме всего за 3 простых шага
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                1. Заполните профиль
              </h3>
              <p className="text-gray-600">
                Внесите свою информацию: образование, опыт работы, навыки и достижения
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Palette className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                2. Выберите шаблон
              </h3>
              <p className="text-gray-600">
                Выберите из множества профессиональных шаблонов тот, который подходит вам
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Download className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">
                3. Скачайте или поделитесь
              </h3>
              <p className="text-gray-600">
                Экспортируйте в PDF/Word или получите онлайн-ссылку с QR-кодом
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 to-blue-800">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <Globe className="w-16 h-16 text-blue-200 mx-auto mb-6" />
          <h2 className="text-4xl font-bold text-white mb-6">
            Готовы создать свое идеальное резюме?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Присоединяйтесь к тысячам профессионалов, которые уже нашли работу мечты с FastCV
          </p>
          <button
            onClick={() => setCurrentPage('register')}
            className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Создать резюме бесплатно
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-2 mb-4">
              <FileText className="w-8 h-8 text-blue-500" />
              <span className="text-2xl font-bold text-white">FastCV</span>
            </div>
            <p className="text-gray-400 mb-4">
              Профессиональные резюме для успешной карьеры
            </p>
            <div className="border-t border-gray-700 pt-4">
              <p className="text-sm text-gray-500">
                © Создано с 💙 OurEra Team.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;