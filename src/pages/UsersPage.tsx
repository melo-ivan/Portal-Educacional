import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  Filter, 
  Plus, 
  UserCheck, 
  UserX, 
  Mail, 
  Phone,
  MoreVertical,
  Edit3,
  Trash2,
  Shield,
  User,
  GraduationCap
} from 'lucide-react';

interface UserData {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar: string;
  status: 'active' | 'inactive' | 'suspended';
  lastLogin: string;
  joinedDate: string;
  courses: number;
  phone?: string;
}

const mockUsers: UserData[] = [
  {
    id: '1',
    name: 'João Silva',
    email: 'joao@student.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?w=100&h=100&fit=crop',
    status: 'active',
    lastLogin: '2024-01-15T14:30:00Z',
    joinedDate: '2023-09-15',
    courses: 5,
    phone: '+55 11 99999-9999'
  },
  {
    id: '2',
    name: 'Maria Santos',
    email: 'maria@teacher.com',
    role: 'teacher',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?w=100&h=100&fit=crop',
    status: 'active',
    lastLogin: '2024-01-15T16:45:00Z',
    joinedDate: '2023-02-10',
    courses: 8,
    phone: '+55 11 88888-8888'
  },
  {
    id: '3',
    name: 'Carlos Admin',
    email: 'admin@portal.com',
    role: 'admin',
    avatar: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg?w=100&h=100&fit=crop',
    status: 'active',
    lastLogin: '2024-01-15T18:20:00Z',
    joinedDate: '2023-01-01',
    courses: 0
  },
  {
    id: '4',
    name: 'Ana Costa',
    email: 'ana@student.com',
    role: 'student',
    avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=100&h=100&fit=crop',
    status: 'inactive',
    lastLogin: '2024-01-10T10:00:00Z',
    joinedDate: '2023-11-20',
    courses: 3,
    phone: '+55 11 77777-7777'
  },
  {
    id: '5',
    name: 'Roberto Lima',
    email: 'roberto@teacher.com',
    role: 'teacher',
    avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?w=100&h=100&fit=crop',
    status: 'suspended',
    lastLogin: '2024-01-05T09:15:00Z',
    joinedDate: '2023-06-01',
    courses: 4
  }
];

const UsersPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [showFilters, setShowFilters] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  const [showUserModal, setShowUserModal] = useState(false);

  const roles = ['all', 'student', 'teacher', 'admin'];
  const statuses = ['all', 'active', 'inactive', 'suspended'];

  const filteredUsers = mockUsers.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === 'all' || user.role === selectedRole;
    const matchesStatus = selectedStatus === 'all' || user.status === selectedStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'student': return User;
      case 'teacher': return GraduationCap;
      case 'admin': return Shield;
      default: return User;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'student': return 'text-blue-600 bg-blue-100';
      case 'teacher': return 'text-green-600 bg-green-100';
      case 'admin': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-600 bg-green-100';
      case 'inactive': return 'text-yellow-600 bg-yellow-100';
      case 'suspended': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getRoleText = (role: string) => {
    switch (role) {
      case 'student': return 'Estudante';
      case 'teacher': return 'Professor';
      case 'admin': return 'Administrador';
      default: return role;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Ativo';
      case 'inactive': return 'Inativo';
      case 'suspended': return 'Suspenso';
      default: return status;
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  const formatLastLogin = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));

    if (hours < 24) {
      return `${hours}h atrás`;
    } else {
      const days = Math.floor(hours / 24);
      return `${days}d atrás`;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Gerenciar Usuários</h1>
          <p className="text-gray-600 mt-1">Administre todos os usuários da plataforma</p>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowUserModal(true)}
          className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-xl hover:bg-blue-700 transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Novo Usuário</span>
        </motion.button>
      </motion.div>

      {/* Search and Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100"
      >
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
          {/* Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar usuários..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Filter Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-colors ${
              showFilters ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50'
            }`}
          >
            <Filter className="w-4 h-4" />
            <span>Filtros</span>
          </button>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-6 pt-6 border-t border-gray-200"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Função
                  </label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {roles.map(role => (
                      <option key={role} value={role}>
                        {role === 'all' ? 'Todas as funções' : getRoleText(role)}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    {statuses.map(status => (
                      <option key={status} value={status}>
                        {status === 'all' ? 'Todos os status' : getStatusText(status)}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Results Count */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="flex items-center justify-between"
      >
        <p className="text-gray-600">
          {filteredUsers.length} usuário{filteredUsers.length !== 1 ? 's' : ''} encontrado{filteredUsers.length !== 1 ? 's' : ''}
        </p>
      </motion.div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Usuário</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Função</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Status</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Último Login</th>
                <th className="text-left px-6 py-4 text-sm font-medium text-gray-900">Cursos</th>
                <th className="text-right px-6 py-4 text-sm font-medium text-gray-900">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredUsers.map((user, index) => {
                const RoleIcon = getRoleIcon(user.role);
                
                return (
                  <motion.tr
                    key={user.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-medium text-gray-900">{user.name}</h3>
                          <p className="text-sm text-gray-500">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-lg text-sm font-medium ${getRoleColor(user.role)}`}>
                        <RoleIcon className="w-3 h-3" />
                        <span>{getRoleText(user.role)}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 rounded-lg text-sm font-medium ${getStatusColor(user.status)}`}>
                        {getStatusText(user.status)}
                      </span>
                    </td>
                    
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatLastLogin(user.lastLogin)}
                    </td>
                    
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.courses}
                    </td>
                    
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end space-x-2">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => {
                            setSelectedUser(user);
                            setShowUserModal(true);
                          }}
                          className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                        >
                          <Edit3 className="w-4 h-4" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </motion.button>
                        
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                          <MoreVertical className="w-4 h-4" />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {filteredUsers.length === 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center py-12"
        >
          <div className="text-gray-400 mb-4">
            <Search className="w-16 h-16 mx-auto" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            Nenhum usuário encontrado
          </h3>
          <p className="text-gray-600">
            Tente ajustar os filtros ou termos de busca
          </p>
        </motion.div>
      )}

      {/* User Modal - Placeholder for now */}
      <AnimatePresence>
        {showUserModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowUserModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full"
              onClick={(e) => e.stopPropagation()}
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {selectedUser ? 'Editar Usuário' : 'Novo Usuário'}
              </h2>
              <p className="text-gray-600 mb-6">
                Funcionalidade em desenvolvimento...
              </p>
              <button
                onClick={() => {
                  setShowUserModal(false);
                  setSelectedUser(null);
                }}
                className="w-full bg-gray-100 text-gray-700 py-2 rounded-xl hover:bg-gray-200 transition-colors"
              >
                Fechar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default UsersPage;