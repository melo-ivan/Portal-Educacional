export interface User {
  id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  avatar?: string;
  createdAt: Date;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  students: number;
  duration: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  progress?: number;
  rating: number;
  category: string;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  videoUrl?: string;
  materials: string[];
  completed?: boolean;
  order: number;
}

export interface Assignment {
  id: string;
  courseId: string;
  title: string;
  description: string;
  dueDate: Date;
  points: number;
  submitted?: boolean;
  grade?: number;
  status: 'pending' | 'submitted' | 'graded';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  createdAt: Date;
}

export type Language = 'pt' | 'en' | 'de' | 'es';