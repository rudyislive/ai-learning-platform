import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Clock, BarChart } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchCourses } from '@/store/slices/courseSlice';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const Courses: React.FC = () => {
  const { courses, loading } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();
  const [filter, setFilter] = useState<'all' | 'beginner' | 'intermediate' | 'advanced'>('all');

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const filteredCourses = filter === 'all' 
    ? courses 
    : courses.filter(course => course.level === filter);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'beginner': return 'bg-green-100 text-green-700';
      case 'intermediate': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">AI/ML Courses</h1>
        <p className="text-gray-600">Master artificial intelligence and machine learning from scratch</p>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['all', 'beginner', 'intermediate', 'advanced'].map((level) => (
          <Button
            key={level}
            variant={filter === level ? 'default' : 'outline'}
            onClick={() => setFilter(level as any)}
            className="capitalize"
          >
            {level}
          </Button>
        ))}
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 mt-4">Loading courses...</p>
        </div>
      ) : filteredCourses.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCourses.map((course) => (
            <Card key={course.id} className="hover:shadow-xl transition-shadow">
              <div className="h-48 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-t-lg flex items-center justify-center">
                <BookOpen className="text-white" size={64} />
              </div>
              <CardHeader>
                <div className="flex items-start justify-between mb-2">
                  <CardTitle className="flex-1">{course.title}</CardTitle>
                  <span className={`px-2 py-1 rounded text-xs font-medium ${getLevelColor(course.level)}`}>
                    {course.level}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{course.description}</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
                  <div className="flex items-center gap-1">
                    <BookOpen size={16} />
                    <span>{course.modules?.length || 0} modules</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>~20 hours</span>
                  </div>
                </div>
                <Link to={`/courses/${course.id}`}>
                  <Button className="w-full">View Course</Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="py-12 text-center">
            <BookOpen className="mx-auto text-gray-400 mb-4" size={64} />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No courses found</h3>
            <p className="text-gray-600">Try adjusting your filters</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default Courses;
