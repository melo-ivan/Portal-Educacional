import React from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import StatCard from '../components/Dashboard/StatCard';
import RecentActivity from '../components/Dashboard/RecentActivity';
import ProgressChart from '../components/Dashboard/ProgressChart';
import CourseProgress from '../components/Dashboard/CourseProgress';
import QuickActions from '../components/Dashboard/QuickActions';
import { 
  BookOpen, 
  Users, 
  FileText, 
  Award, 
  TrendingUp,
  Clock
} from 'lucide-react';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { t } = useLanguage();

  const getStatsForRole = () => {
    if (user?.role === 'student') {
      return [
        {
          title: t('dashboard.totalCourses'),
          value: '12',
          change: '+2 este mês',
          positive: true,
          icon: BookOpen,
          gradient: 'bg-gradient-to-br from-blue-500 to-blue-600'
        },
        {
          title: t('dashboard.totalAssignments'),
          value: '8',
          change: '3 pendentes',
          positive: false,
          icon: FileText,
          gradient: 'bg-gradient-to-br from-orange-500 to-orange-600'
        },
        {
          title: t('dashboard.averageGrade'),
          value: '8.7',
          change: '+0.3 este mês',
          positive: true,
          icon: Award,
          gradient: 'bg-gradient-to-br from-green-500 to-green-600'
        },
        {
          title: 'Horas de Estudo',
          value: '48h',
          change: '+12h esta semana',
          positive: true,
          icon: Clock,
          gradient: 'bg-gradient-to-br from-purple-500 to-purple-600'
        }
      ];
    } else if (user?.role === 'teacher') {
      return [
        {
          title: 'Cursos Ministrados',
          value: '6',
          change: '+1 este mês',
          positive: true,
          icon: BookOpen,
          gradient: 'bg-gradient-to-br from-blue-500 to-blue-600'
        },
        {
          title: t('dashboard.totalStudents'),
          value: '248',
          change: '+15 este mês',
          positive: true,
          icon: Users,
          gradient: 'bg-gradient-to-br from-green-500 to-green-600'
        },
        {
          title: 'Tarefas Corrigidas',
          value: '156',
          change: '24 pendentes',
          positive: false,
          icon: FileText,
          gradient: 'bg-gradient-to-br from-orange-500 to-orange-600'
        },
        {
          title: 'Taxa de Aprovação',
          value: '92%',
          change: '+3% este mês',
          positive: true,
          icon: TrendingUp,
          gradient: 'bg-gradient-to-br from-purple-500 to-purple-600'
        }
      ];
    } else {
      return [
        {
          title: t('dashboard.totalCourses'),
          value: '124',
          change: '+8 este mês',
          positive: true,
          icon: BookOpen,
          gradient: 'bg-gradient-to-br from-blue-500 to-blue-600'
        },
        {
          title: t('dashboard.totalStudents'),
          value: '2,847',
          change: '+125 este mês',
          positive: true,
          icon: Users,
          gradient: 'bg-gradient-to-br from-green-500 to-green-600'
        },
        {
          title: 'Professores',
          value: '89',
          change: '+3 este mês',
          positive: true,
          icon: Award,
          gradient: 'bg-gradient-to-br from-purple-500 to-purple-600'
        },
        {
          title: 'Taxa de Engajamento',
          value: '94%',
          change: '+2% este mês',
          positive: true,
          icon: TrendingUp,
          gradient: 'bg-gradient-to-br from-orange-500 to-orange-600'
        }
      ];
    }
  };

  const stats = getStatsForRole();

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            {t('common.welcome')}, {user?.name}!
          </h1>
          <p className="text-gray-600 mt-1">
            {user?.role === 'student' && 'Continue seu aprendizado e complete suas tarefas'}
            {user?.role === 'teacher' && 'Gerencie seus cursos e acompanhe o progresso dos alunos'}
            {user?.role === 'admin' && 'Supervisione a plataforma e analise métricas importantes'}
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <div className="text-right">
            <p className="text-sm text-gray-500">Última atividade</p>
            <p className="font-medium text-gray-900">Hoje às 14:30</p>
          </div>
          <img
            src={user?.avatar || 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop'}
            alt={user?.name}
            className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-md"
          />
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <StatCard {...stat} />
          </motion.div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Progress Chart */}
        <div className="lg:col-span-2">
          <ProgressChart />
        </div>

        {/* Recent Activity */}
        <div>
          <RecentActivity />
        </div>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Course Progress */}
        <CourseProgress />
        
        {/* Quick Actions */}
        <QuickActions />
      </div>
    </div>
  );
};

export default DashboardPage;