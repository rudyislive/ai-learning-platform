export interface Course {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  thumbnail: string;
  modules: Module[];
  createdAt: string;
  updatedAt: string;
}

export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  moduleId: string;
  title: string;
  content: string;
  youtubeUrl?: string;
  codeExamples?: CodeExample[];
  order: number;
  estimatedTime: number; // in minutes
  isCompleted?: boolean;
}

export interface CodeExample {
  id: string;
  language: string;
  code: string;
  description?: string;
}
