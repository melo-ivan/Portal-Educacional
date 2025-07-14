import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, GraduationCap, User, UserCheck, Shield, Eye, EyeOff, UserPlus } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<'student' | 'teacher'>('student');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const { login, register } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (isLogin) {
        await login(email, password);
        // Redirect to dashboard after successful login
        navigate('/dashboard');
      } else {
        // Validation for registration
        if (password !== confirmPassword) {
          throw new Error('As senhas não coincidem');
        }
        if (password.length < 6) {
          throw new Error('A senha deve ter pelo menos 6 caracteres');
        }
        if (name.trim().length < 2) {
          throw new Error('O nome deve ter pelo menos 2 caracteres');
        }
        
        await register(name.trim(), email, password, role);
        setSuccess('Conta criada com sucesso! Redirecionando...');
        // Redirect to dashboard after successful registration
        setTimeout(() => {
          navigate('/dashboard');
        }, 1500);
      }
    } catch (err: any) {
      setError(err.message || 'Erro inesperado');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setConfirmPassword('');
    setRole('student');
    setError('');
    setSuccess('');
  };

  const switchMode = () => {
    setIsLogin(!isLogin);
    resetForm();
  };

  const demoAccounts = [
    { 
      email: 'joao@student.com', 
      password: '123456',
      role: 'student', 
      icon: User, 
      label: t('login.student'),
      description: 'Acesso completo como estudante'
    },
    { 
      email: 'maria@teacher.com', 
      password: '123456',
      role: 'teacher', 
      icon: UserCheck, 
      label: t('login.teacher'),
      description: 'Gerencie cursos e alunos'
    },
    { 
      email: 'admin@portal.com', 
      password: '123456',
      role: 'admin', 
      icon: Shield, 
      label: t('login.admin'),
      description: 'Controle total do sistema'
    }
  ];

  const handleDemoLogin = (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail);
    setPassword(demoPassword);
    setIsLogin(true);
    // Auto-submit after setting demo credentials
    setTimeout(() => {
      const form = document.querySelector('form');
      if (form) {
        form.requestSubmit();
      }
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full flex items-center justify-center">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center lg:text-left"
          >
            <div className="flex items-center justify-center lg:justify-start mb-8">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-4">
                <GraduationCap className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">EduPortal</h1>
                <p className="text-gray-600">Sistema Educacional Completo</p>
              </div>
            </div>

            <h2 className="text-4xl font-bold text-gray-900 mb-6">
              {isLogin ? 'Bem-vindo de volta!' : 'Junte-se a nós!'}
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              {isLogin 
                ? 'Acesse sua conta e continue sua jornada de aprendizado'
                : 'Crie sua conta e comece a aprender com a melhor plataforma educacional'
              }
            </p>

            {/* Technology Stack */}
            <div className="grid grid-cols-3 gap-4 mb-8">
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-sm">R</span>
                </div>
                <p className="text-sm font-medium text-gray-900">React.js</p>
                <p className="text-xs text-gray-600">{t('tech.frontend')}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-white font-bold text-sm">N</span>
                </div>
                <p className="text-sm font-medium text-gray-900">Node.js</p>
                <p className="text-xs text-gray-600">{t('tech.backend')}</p>
              </div>
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center mb-2">
                  <span className="text-xs font-bold text-white">PG</span>
                </div>
                <p className="text-sm font-medium text-gray-900">PostgreSQL</p>
                <p className="text-xs text-gray-600">{t('tech.database')}</p>
              </div>
            </div>
          </motion.div>

          {/* Right Side - Login/Register Form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                {isLogin ? t('login.title') : 'Criar Nova Conta'}
              </h3>
              <p className="text-gray-600">
                {isLogin ? t('login.subtitle') : 'Preencha os dados para criar sua conta'}
              </p>
            </div>

            {/* Toggle Buttons */}
            <div className="flex bg-gray-100 rounded-xl p-1 mb-6">
              <button
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  isLogin 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Entrar
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                  !isLogin 
                    ? 'bg-white text-blue-600 shadow-sm' 
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                Criar Conta
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nome completo
                        </label>
                        <div className="relative">
                          <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                            placeholder="Seu nome completo"
                            required={!isLogin}
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Tipo de conta
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                          <button
                            type="button"
                            onClick={() => setRole('student')}
                            className={`p-3 rounded-xl border-2 transition-all ${
                              role === 'student'
                                ? 'border-blue-500 bg-blue-50 text-blue-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <User className="w-5 h-5 mx-auto mb-1" />
                            <span className="text-sm font-medium">Estudante</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setRole('teacher')}
                            className={`p-3 rounded-xl border-2 transition-all ${
                              role === 'teacher'
                                ? 'border-green-500 bg-green-50 text-green-700'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                          >
                            <UserCheck className="w-5 h-5 mx-auto mb-1" />
                            <span className="text-sm font-medium">Professor</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('login.email')}
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="seu@email.com"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t('login.password')}
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <AnimatePresence mode="wait">
                {!isLogin && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Confirmar senha
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                          className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                          placeholder="••••••••"
                          required={!isLogin}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-red-50 border border-red-200 rounded-xl"
                >
                  <p className="text-sm text-red-600">{error}</p>
                </motion.div>
              )}

              {success && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 bg-green-50 border border-green-200 rounded-xl"
                >
                  <p className="text-sm text-green-600">{success}</p>
                </motion.div>
              )}

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-700 hover:to-purple-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>{isLogin ? 'Entrando...' : 'Criando conta...'}</span>
                  </div>
                ) : (
                  <div className="flex items-center justify-center space-x-2">
                    {isLogin ? <User className="w-4 h-4" /> : <UserPlus className="w-4 h-4" />}
                    <span>{isLogin ? t('login.signIn') : 'Criar Conta'}</span>
                  </div>
                )}
              </motion.button>
            </form>

            {/* Demo Accounts - Only show for login */}
            {isLogin && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="text-center mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">{t('login.demoAccounts')}</p>
                  <p className="text-xs text-gray-500">Clique para preencher automaticamente</p>
                </div>
                
                <div className="grid grid-cols-1 gap-3">
                  {demoAccounts.map((account, index) => (
                    <motion.button
                      key={account.email}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      onClick={() => handleDemoLogin(account.email, account.password)}
                      className="flex items-center space-x-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-blue-50 hover:to-purple-50 rounded-xl transition-all duration-200 text-left group border border-gray-200 hover:border-blue-200"
                    >
                      <div className={`p-2 rounded-lg ${
                        account.role === 'student' ? 'bg-blue-100 text-blue-600' :
                        account.role === 'teacher' ? 'bg-green-100 text-green-600' :
                        'bg-purple-100 text-purple-600'
                      }`}>
                        <account.icon className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <p className="text-sm font-medium text-gray-900 group-hover:text-blue-700 transition-colors">
                            {account.label}
                          </p>
                          <div className="flex items-center space-x-2 text-xs text-gray-500">
                            <span className="bg-gray-200 px-2 py-1 rounded">
                              {account.email}
                            </span>
                            <span className="bg-gray-200 px-2 py-1 rounded font-mono">
                              {account.password}
                            </span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{account.description}</p>
                      </div>
                    </motion.button>
                  ))}
                </div>

                {/* Quick Access Info */}
                <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-200">
                  <div className="flex items-start space-x-2">
                    <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center mt-0.5">
                      <span className="text-white text-xs">!</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-blue-900">Acesso Rápido</p>
                      <p className="text-xs text-blue-700 mt-1">
                        Todas as contas demo usam a senha <span className="font-mono bg-blue-100 px-1 rounded">123456</span>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Switch Mode */}
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                {isLogin ? 'Não tem uma conta?' : 'Já tem uma conta?'}
                <button
                  onClick={switchMode}
                  className="ml-1 text-blue-600 hover:text-blue-700 font-medium transition-colors"
                >
                  {isLogin ? 'Criar conta' : 'Fazer login'}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;