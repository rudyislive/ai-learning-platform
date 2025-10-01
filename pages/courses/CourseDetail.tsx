import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { BookOpen, Clock, PlayCircle, CheckCircle, Lock } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchCourseById } from '@/store/slices/courseSlice';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const CourseDetail: React.FC = () => {
  const { courseId } = useParams<{ courseId: string }>();
  const { selectedCourse, loading } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (courseId) {
      dispatch(fetchCourseById(courseId));
    }
  }, [courseId, dispatch]);

  if (loading) {
    return (
      <div className="text-center py-12">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
        <p className="text-gray-600 mt-4">Loading course...</p>
      </div>
    );
  }

  if (!selectedCourse) {
    return (
      <Card>
        <CardContent className="py-12 text-center">
          <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Course not found</h3>
          <Link to="/courses">
            <Button>Back to Courses</Button>
          </Link>
        </CardContent>
      </Card>
    );
  }

  const totalLessons = selectedCourse.modules?.reduce((acc, module) => acc + (module.lessons?.length || 0), 0) || 0;
  const completedLessons = selectedCourse.modules?.reduce(
    (acc, module) => acc + (module.lessons?.filter(l => l.isCompleted).length || 0), 
    0
  ) || 0;
  const progress = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* Course Header */}
      <Card>
        <div className="h-64 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-t-lg flex items-center justify-center">
          <BookOpen className="text-white" size={96} />
        </div>
        <CardHeader>
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <CardTitle className="text-3xl mb-2">{selectedCourse.title}</CardTitle>
              <p className="text-gray-600 mb-4">{selectedCourse.description}</p>
              <div className="flex items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <BookOpen size={16} />
                  <span>{selectedCourse.modules?.length || 0} modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <PlayCircle size={16} />
                  <span>{totalLessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={16} />
                  <span>~20 hours</span>
                </div>
              </div>
            </div>
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium capitalize">
              {selectedCourse.level}
            </span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Course Progress</span>
              <span className="font-medium text-gray-900">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-blue-600 h-3 rounded-full transition-all duration-300" 
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Modules */}
      <div className="space-y-4">
        <h2 className="text-2xl font-bold text-gray-900">Course Content</h2>
        {selectedCourse.modules?.map((module, moduleIndex) => (
          <Card key={module.id}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <span className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-sm font-bold">
                  {moduleIndex + 1}
                </span>
                {module.title}
              </CardTitle>
              <p className="text-sm text-gray-600 mt-2">{module.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {module.lessons?.map((lesson, lessonIndex) => {
                  const isLocked = lessonIndex > 0 && !module.lessons[lessonIndex - 1].isCompleted;
                  return (
                    <Link
                      key={lesson.id}
                      to={isLocked ? '#' : `/courses/${courseId}/lessons/${lesson.id}`}
                      className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                        isLocked 
                          ? 'border-gray-200 bg-gray-50 cursor-not-allowed' 
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                      onClick={(e) => isLocked && e.preventDefault()}
                    >
                      <div className="flex items-center gap-3 flex-1">
                        {lesson.isCompleted ? (
                          <CheckCircle className="text-green-600" size={20} />
                        ) : isLocked ? (
                          <Lock className="text-gray-400" size={20} />
                        ) : (
                          <PlayCircle className="text-blue-600" size={20} />
                        )}
                        <div>
                          <p className={`font-medium ${isLocked ? 'text-gray-400' : 'text-gray-900'}`}>
                            {lesson.title}
                          </p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Clock size={12} />
                            <span>{lesson.estimatedTime} min</span>
                          </div>
                        </div>
                      </div>
                      {!isLocked && !lesson.isCompleted && (
                        <Button size="sm">Start</Button>
                      )}
                    </Link>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
