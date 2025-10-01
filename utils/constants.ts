export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const ROUTES = {
  HOME: '/',
  LOGIN: '/login',
  SIGNUP: '/signup',
  DASHBOARD: '/dashboard',
  COURSES: '/courses',
  COURSE_DETAIL: '/courses/:courseId',
  LESSON: '/courses/:courseId/modules/:moduleId/lessons/:lessonId',
  ALGORITHMS: '/algorithms',
  ALGORITHM_DETAIL: '/algorithms/:algorithmId',
  PROBLEMS: '/problems',
  PROBLEM_DETAIL: '/problems/:problemId',
  PRACTICE: '/practice',
  PROFILE: '/profile',
  ADMIN: '/admin',
} as const;

export const DIFFICULTY_COLORS = {
  easy: 'text-green-600 bg-green-100',
  medium: 'text-yellow-600 bg-yellow-100',
  hard: 'text-red-600 bg-red-100',
} as const;

export const LEVEL_COLORS = {
  beginner: 'text-blue-600 bg-blue-100',
  intermediate: 'text-purple-600 bg-purple-100',
  advanced: 'text-orange-600 bg-orange-100',
} as const;

export const SUPPORTED_LANGUAGES = [
  { id: 'python', name: 'Python', extension: 'py' },
  { id: 'javascript', name: 'JavaScript', extension: 'js' },
  { id: 'typescript', name: 'TypeScript', extension: 'ts' },
  { id: 'cpp', name: 'C++', extension: 'cpp' },
  { id: 'java', name: 'Java', extension: 'java' },
] as const;

export const ALGORITHM_CATEGORIES = [
  { id: 'sorting', name: 'Sorting Algorithms' },
  { id: 'searching', name: 'Searching Algorithms' },
  { id: 'graph', name: 'Graph Algorithms' },
  { id: 'dynamic-programming', name: 'Dynamic Programming' },
  { id: 'greedy', name: 'Greedy Algorithms' },
  { id: 'tree', name: 'Tree Algorithms' },
  { id: 'string', name: 'String Algorithms' },
  { id: 'backtracking', name: 'Backtracking' },
] as const;
