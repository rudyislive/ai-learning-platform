import api from './api';
import { Course, Lesson } from '@/types/course.types';

export const courseService = {
  async getAllCourses(): Promise<Course[]> {
    const response = await api.get('/api/courses');
    return response.data;
  },

  async getCourseById(courseId: string): Promise<Course> {
    const response = await api.get(`/api/courses/${courseId}`);
    return response.data;
  },

  async getLessonById(lessonId: string): Promise<Lesson> {
    const response = await api.get(`/api/lessons/${lessonId}`);
    return response.data;
  },

  async markLessonComplete(lessonId: string): Promise<void> {
    await api.post(`/api/lessons/${lessonId}/complete`);
  },

  async getUserProgress(userId: string): Promise<any> {
    const response = await api.get(`/api/users/${userId}/progress`);
    return response.data;
  },
};
