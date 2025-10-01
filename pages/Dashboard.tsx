import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Code, Brain, TrendingUp, Award, Clock } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@/store/hooks';
import { fetchCourses } from '@/store/slices/courseSlice';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const Dashboard: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);
  const { courses, loading } = useAppSelector((state) => state.course);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchCourses());
  }, [dispatch]);

  const stats = [
    {
      icon: BookOpen,
      label: 'Courses Enrolled',
      value: '3',
      color: 'bg-blue-100 text-blue-600',
    },
    {
      icon: Code,
      label: 'Problems Solved',
      value: '47',
      color: 'bg-green-100 text-green-600',
    },
    {
      icon: Clock,
      label: 'Learning Hours',
      value: '24',
      color: 'bg-purple-100 text-purple-600',
    },
    {
      icon: Award,
      label: 'Achievements',
      value: '12',
      color: 'bg-yellow-100 text-yellow-600',
    },
  ];

  const recentActivity = [
    { type: 'course', title: 'Completed: Neural Networks Basics', time: '2 hours ago' },
    { type: 'problem', title: 'Solved: Binary Search Tree', time: '5 hours ago' },
    { type: 'achievement', title: 'Earned: Problem Solver Badge', time: '1 day ago' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back, {user?.name || 'Learner'}! 👋
        </h1>
        <p className="text-gray-600">Continue your AI learning journey</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${stat.color} flex items-center justify-center`}>
                    <Icon size={24} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Continue Learning */}
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
            </CardHeader>
            <CardContent>
              {loading ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                </div>
              ) : courses.length > 0 ? (
                <div className="space-y-4">
                  {courses.slice(0, 3).map((course) => (
                    <div
                      key={course.id}
                      className="flex items-center gap-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-colors"
                    >
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                        {course.title.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{course.title}</h3>
                        <p className="text-sm text-gray-600">{course.description}</p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="flex-1 bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                          </div>
                          <span className="text-sm text-gray-600">45%</span>
                        </div>
                      </div>
                      <Link to={`/courses/${course.id}`}>
                        <Button>Continue</Button>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <BookOpen className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600 mb-4">No courses yet. Start learning!</p>
                  <Link to="/courses">
                    <Button>Browse Courses</Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <div className="grid md:grid-cols-3 gap-4">
            <Link to="/courses" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <BookOpen className="mx-auto text-blue-600 mb-2" size={32} />
                  <h3 className="font-semibold text-gray-900">Browse Courses</h3>
                </CardContent>
              </Card>
            </Link>
            <Link to="/problems" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <Code className="mx-auto text-green-600 mb-2" size={32} />
                  <h3 className="font-semibold text-gray-900">Solve Problems</h3>
                </CardContent>
              </Card>
            </Link>
            <Link to="/algorithms" className="block">
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <Brain className="mx-auto text-purple-600 mb-2" size={32} />
                  <h3 className="font-semibold text-gray-900">Visualize Algorithms</h3>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex gap-3">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.title}</p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Learning Streak */}
          <Card>
            <CardHeader>
              <CardTitle>Learning Streak 🔥</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-4xl font-bold text-orange-600 mb-2">7</div>
                <p className="text-sm text-gray-600">Days in a row</p>
                <p className="text-xs text-gray-500 mt-2">Keep it up!</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
