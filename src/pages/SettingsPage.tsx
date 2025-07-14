import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Palette, 
  Save,
  Camera,
  Mail,
  Phone,
  MapPin,
  Calendar
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const SettingsPage: React.FC = () => {
  const { user } = useAuth();
  const { language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');
  
  // Profile form state
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: '+55 11 99999-9999',
    bio: 'Desenvolvedor Full Stack apaixonado por tecnologia e educação.',
    location: 'São Paulo, SP',
    birthDate: '1990-01-15',
    website: 'https://meuportfolio.com'
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    newCourses: true,
    assignments: true,
    grades: true,
    messages: true,
    marketing: false
  });

  // Security settings
  const [security, setSecurity] = useState({
    twoFactor: false,
    loginAlerts: true,
    sessionTimeout: '30'
  });

  const tabs = [
    { id: 'profile', label: 'Perfil', icon: User },
    { id: 'notifications', label: 'Notificações', icon: Bell },
    { id: 'security', label: 'Segurança', icon: Shield },
    { id: 'language', label: 'Idioma', icon: Globe },
    { id: 'appearance', label: 'Aparência', icon: Palette }
  ];

  const handleProfileChange = (field: string, value: string) => {
    setProfileData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleNotificationChange = (field: string, value: boolean) => {
    setNotifications(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSecurityChange = (field: string, value: string | boolean) => {
    setSecurity(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const languages = [
    { code: 'pt', name: 'Português (Brasil)', flag: '🇧🇷' },
    { code: 'en', name: 'English (United States)', flag: '🇺🇸' },
    { code: 'de', name: 'Deutsch (Deutschland)', flag: '🇩🇪' },
    { code: 'es', name: 'Español (España)', flag: '🇪🇸' }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Configurações</h1>
          <p className="text-gray-600 mt-1">Gerencie suas preferências e configurações de conta</p>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar Navigation */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 h-fit"
        >
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all ${
                  activeTab === tab.id
                    ? 'bg-blue-50 text-blue-700 shadow-sm'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium">{tab.label}</span>
              </button>
            ))}
          </nav>
        </motion.div>

        {/* Content Area */}
        <div className="lg:col-span-3">
          {/* Profile Settings */}
          {activeTab === 'profile' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Informações do Perfil</h2>
              
              {/* Avatar Section */}
              <div className="flex items-center space-x-6 mb-8">
                <div className="relative">
                  <img
                    src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop'}
                    alt={user?.name}
                    className="w-20 h-20 rounded-full object-cover"
                  />
                  <button className="absolute -bottom-1 -right-1 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors">
                    <Camera className="w-4 h-4" />
                  </button>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{user?.name}</h3>
                  <p className="text-sm text-gray-500 capitalize">{user?.role}</p>
                  <button className="text-sm text-blue-600 hover:text-blue-700 mt-1">
                    Alterar foto
                  </button>
                </div>
              </div>

              {/* Form Fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nome completo
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleProfileChange('name', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleProfileChange('email', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Telefone
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleProfileChange('phone', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data de nascimento
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="date"
                      value={profileData.birthDate}
                      onChange={(e) => handleProfileChange('birthDate', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Localização
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleProfileChange('location', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Biografia
                  </label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleProfileChange('bio', e.target.value)}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Conte um pouco sobre você..."
                  />
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar alterações</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Notifications Settings */}
          {activeTab === 'notifications' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Preferências de Notificação</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Métodos de Notificação</h3>
                  <div className="space-y-4">
                    {Object.entries({
                      email: 'Email',
                      push: 'Notificações Push',
                      sms: 'SMS'
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-gray-900">{label}</h4>
                          <p className="text-sm text-gray-500">
                            Receber notificações via {label.toLowerCase()}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[key as keyof typeof notifications]}
                            onChange={(e) => handleNotificationChange(key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Tipos de Notificação</h3>
                  <div className="space-y-4">
                    {Object.entries({
                      newCourses: 'Novos cursos disponíveis',
                      assignments: 'Novas tarefas e prazos',
                      grades: 'Notas e feedback',
                      messages: 'Mensagens e comunicados',
                      marketing: 'Ofertas e promoções'
                    }).map(([key, label]) => (
                      <div key={key} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                        <div>
                          <h4 className="font-medium text-gray-900">{label}</h4>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[key as keyof typeof notifications]}
                            onChange={(e) => handleNotificationChange(key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar preferências</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Language Settings */}
          {activeTab === 'language' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Configurações de Idioma</h2>
              
              <div className="space-y-4">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={`w-full flex items-center justify-between p-4 rounded-xl border-2 transition-all ${
                      language === lang.code
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span className="text-2xl">{lang.flag}</span>
                      <span className="font-medium text-gray-900">{lang.name}</span>
                    </div>
                    {language === lang.code && (
                      <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                    )}
                  </button>
                ))}
              </div>

              <div className="mt-8 p-4 bg-blue-50 rounded-xl">
                <h3 className="font-medium text-blue-900 mb-2">Stack Tecnológico</h3>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-500 rounded-md flex items-center justify-center">
                      <span className="text-xs font-bold text-white">R</span>
                    </div>
                    <span className="text-sm text-blue-800">React.js + TypeScript</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-green-500 rounded-md flex items-center justify-center">
                      <span className="text-xs font-bold text-white">N</span>
                    </div>
                    <span className="text-sm text-blue-800">Node.js + Express</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-6 h-6 bg-blue-600 rounded-md flex items-center justify-center">
                      <span className="text-xs font-bold text-white">P</span>
                    </div>
                    <span className="text-sm text-blue-800">PostgreSQL</span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Security Settings */}
          {activeTab === 'security' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Configurações de Segurança</h2>
              
              <div className="space-y-6">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-medium text-gray-900">Autenticação de dois fatores</h4>
                    <p className="text-sm text-gray-500">
                      Adicione uma camada extra de segurança à sua conta
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.twoFactor}
                      onChange={(e) => handleSecurityChange('twoFactor', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                  <div>
                    <h4 className="font-medium text-gray-900">Alertas de login</h4>
                    <p className="text-sm text-gray-500">
                      Receba notificações quando alguém fizer login na sua conta
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={security.loginAlerts}
                      onChange={(e) => handleSecurityChange('loginAlerts', e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeout da sessão (minutos)
                  </label>
                  <select
                    value={security.sessionTimeout}
                    onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="15">15 minutos</option>
                    <option value="30">30 minutos</option>
                    <option value="60">1 hora</option>
                    <option value="120">2 horas</option>
                    <option value="never">Nunca</option>
                  </select>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Alterar senha</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Senha atual
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Digite sua senha atual"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Nova senha
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Digite sua nova senha"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmar nova senha
                      </label>
                      <input
                        type="password"
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Confirme sua nova senha"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end mt-8">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition-colors"
                >
                  <Save className="w-4 h-4" />
                  <span>Salvar configurações</span>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Appearance Settings */}
          {activeTab === 'appearance' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
            >
              <h2 className="text-xl font-semibold text-gray-900 mb-6">Configurações de Aparência</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Tema</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {['Claro', 'Escuro', 'Automático'].map((theme) => (
                      <button
                        key={theme}
                        className="p-4 border-2 border-gray-200 rounded-xl hover:border-blue-500 transition-all"
                      >
                        <div className={`w-full h-20 rounded-lg mb-3 ${
                          theme === 'Claro' ? 'bg-white border' :
                          theme === 'Escuro' ? 'bg-gray-900' : 
                          'bg-gradient-to-r from-white to-gray-900'
                        }`}></div>
                        <p className="font-medium text-gray-900">{theme}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Cores de destaque</h3>
                  <div className="grid grid-cols-6 gap-3">
                    {['#3b82f6', '#10b981', '#8b5cf6', '#f59e0b', '#ef4444', '#6366f1'].map((color) => (
                      <button
                        key={color}
                        className="w-12 h-12 rounded-xl border-2 border-gray-200 hover:scale-110 transition-transform"
                        style={{ backgroundColor: color }}
                      ></button>
                    ))}
                  </div>
                </div>

                <div className="p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                  <h3 className="font-medium text-gray-900 mb-2">✨ Em desenvolvimento</h3>
                  <p className="text-sm text-gray-600">
                    Novas opções de personalização chegando em breve, incluindo temas personalizados e mais cores.
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;