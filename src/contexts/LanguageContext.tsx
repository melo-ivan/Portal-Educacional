import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  pt: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.courses': 'Cursos',
    'nav.assignments': 'Tarefas',
    'nav.grades': 'Notas',
    'nav.library': 'Biblioteca',
    'nav.messages': 'Mensagens',
    'nav.users': 'Usuários',
    'nav.reports': 'Relatórios',
    'nav.settings': 'Configurações',
    'nav.logout': 'Sair',
    
    // Common
    'common.welcome': 'Bem-vindo',
    'common.loading': 'Carregando...',
    'common.search': 'Pesquisar',
    'common.filter': 'Filtrar',
    'common.save': 'Salvar',
    'common.cancel': 'Cancelar',
    'common.edit': 'Editar',
    'common.delete': 'Excluir',
    'common.view': 'Ver',
    'common.add': 'Adicionar',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Visão Geral',
    'dashboard.totalCourses': 'Total de Cursos',
    'dashboard.totalStudents': 'Total de Alunos',
    'dashboard.totalAssignments': 'Total de Tarefas',
    'dashboard.averageGrade': 'Nota Média',
    
    // Courses
    'courses.title': 'Meus Cursos',
    'courses.allCourses': 'Todos os Cursos',
    'courses.enrolled': 'Matriculado',
    'courses.progress': 'Progresso',
    'courses.instructor': 'Instrutor',
    'courses.duration': 'Duração',
    'courses.level': 'Nível',
    'courses.students': 'estudantes',
    
    // Login
    'login.title': 'Entrar no Portal Educacional',
    'login.subtitle': 'Acesse sua conta para continuar aprendendo',
    'login.email': 'Email',
    'login.password': 'Senha',
    'login.signIn': 'Entrar',
    'login.demoAccounts': 'Contas Demo:',
    'login.student': 'Estudante',
    'login.teacher': 'Professor',
    'login.admin': 'Administrador',
    
    // Technologies
    'tech.frontend': 'Frontend',
    'tech.backend': 'Backend',
    'tech.database': 'Banco de Dados',
  },
  
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.courses': 'Courses',
    'nav.assignments': 'Assignments',
    'nav.grades': 'Grades',
    'nav.library': 'Library',
    'nav.messages': 'Messages',
    'nav.users': 'Users',
    'nav.reports': 'Reports',
    'nav.settings': 'Settings',
    'nav.logout': 'Logout',
    
    // Common
    'common.welcome': 'Welcome',
    'common.loading': 'Loading...',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.view': 'View',
    'common.add': 'Add',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Overview',
    'dashboard.totalCourses': 'Total Courses',
    'dashboard.totalStudents': 'Total Students',
    'dashboard.totalAssignments': 'Total Assignments',
    'dashboard.averageGrade': 'Average Grade',
    
    // Courses
    'courses.title': 'My Courses',
    'courses.allCourses': 'All Courses',
    'courses.enrolled': 'Enrolled',
    'courses.progress': 'Progress',
    'courses.instructor': 'Instructor',
    'courses.duration': 'Duration',
    'courses.level': 'Level',
    'courses.students': 'students',
    
    // Login
    'login.title': 'Sign in to Educational Portal',
    'login.subtitle': 'Access your account to continue learning',
    'login.email': 'Email',
    'login.password': 'Password',
    'login.signIn': 'Sign In',
    'login.demoAccounts': 'Demo Accounts:',
    'login.student': 'Student',
    'login.teacher': 'Teacher',
    'login.admin': 'Administrator',
    
    // Technologies
    'tech.frontend': 'Frontend',
    'tech.backend': 'Backend',
    'tech.database': 'Database',
  },
  
  de: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.courses': 'Kurse',
    'nav.assignments': 'Aufgaben',
    'nav.grades': 'Noten',
    'nav.library': 'Bibliothek',
    'nav.messages': 'Nachrichten',
    'nav.users': 'Benutzer',
    'nav.reports': 'Berichte',
    'nav.settings': 'Einstellungen',
    'nav.logout': 'Abmelden',
    
    // Common
    'common.welcome': 'Willkommen',
    'common.loading': 'Lädt...',
    'common.search': 'Suchen',
    'common.filter': 'Filter',
    'common.save': 'Speichern',
    'common.cancel': 'Abbrechen',
    'common.edit': 'Bearbeiten',
    'common.delete': 'Löschen',
    'common.view': 'Ansehen',
    'common.add': 'Hinzufügen',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.overview': 'Überblick',
    'dashboard.totalCourses': 'Gesamte Kurse',
    'dashboard.totalStudents': 'Gesamte Studenten',
    'dashboard.totalAssignments': 'Gesamte Aufgaben',
    'dashboard.averageGrade': 'Durchschnittsnote',
    
    // Courses
    'courses.title': 'Meine Kurse',
    'courses.allCourses': 'Alle Kurse',
    'courses.enrolled': 'Angemeldet',
    'courses.progress': 'Fortschritt',
    'courses.instructor': 'Kursleiter',
    'courses.duration': 'Dauer',
    'courses.level': 'Level',
    'courses.students': 'Studenten',
    
    // Login
    'login.title': 'Beim Bildungsportal anmelden',
    'login.subtitle': 'Zugang zu Ihrem Konto für weiteres Lernen',
    'login.email': 'E-Mail',
    'login.password': 'Passwort',
    'login.signIn': 'Anmelden',
    'login.demoAccounts': 'Demo-Konten:',
    'login.student': 'Student',
    'login.teacher': 'Lehrer',
    'login.admin': 'Administrator',
    
    // Technologies
    'tech.frontend': 'Frontend',
    'tech.backend': 'Backend',
    'tech.database': 'Datenbank',
  },
  
  es: {
    // Navigation
    'nav.dashboard': 'Panel',
    'nav.courses': 'Cursos',
    'nav.assignments': 'Tareas',
    'nav.grades': 'Calificaciones',
    'nav.library': 'Biblioteca',
    'nav.messages': 'Mensajes',
    'nav.users': 'Usuarios',
    'nav.reports': 'Reportes',
    'nav.settings': 'Configuración',
    'nav.logout': 'Cerrar Sesión',
    
    // Common
    'common.welcome': 'Bienvenido',
    'common.loading': 'Cargando...',
    'common.search': 'Buscar',
    'common.filter': 'Filtrar',
    'common.save': 'Guardar',
    'common.cancel': 'Cancelar',
    'common.edit': 'Editar',
    'common.delete': 'Eliminar',
    'common.view': 'Ver',
    'common.add': 'Agregar',
    
    // Dashboard
    'dashboard.title': 'Panel',
    'dashboard.overview': 'Resumen',
    'dashboard.totalCourses': 'Total de Cursos',
    'dashboard.totalStudents': 'Total de Estudiantes',
    'dashboard.totalAssignments': 'Total de Tareas',
    'dashboard.averageGrade': 'Calificación Promedio',
    
    // Courses
    'courses.title': 'Mis Cursos',
    'courses.allCourses': 'Todos los Cursos',
    'courses.enrolled': 'Inscrito',
    'courses.progress': 'Progreso',
    'courses.instructor': 'Instructor',
    'courses.duration': 'Duración',
    'courses.level': 'Nivel',
    'courses.students': 'estudiantes',
    
    // Login
    'login.title': 'Iniciar sesión en Portal Educativo',
    'login.subtitle': 'Accede a tu cuenta para continuar aprendiendo',
    'login.email': 'Correo',
    'login.password': 'Contraseña',
    'login.signIn': 'Iniciar Sesión',
    'login.demoAccounts': 'Cuentas Demo:',
    'login.student': 'Estudiante',
    'login.teacher': 'Profesor',
    'login.admin': 'Administrador',
    
    // Technologies
    'tech.frontend': 'Frontend',
    'tech.backend': 'Backend',
    'tech.database': 'Base de Datos',
  }
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('pt');

  useEffect(() => {
    const storedLang = localStorage.getItem('language') as Language;
    if (storedLang && translations[storedLang]) {
      setLanguage(storedLang);
    }
  }, []);

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};