import React from 'react';
import { User, Mail, Calendar, Award, TrendingUp, BookOpen, Code } from 'lucide-react';
import { useAppSelector } from '@/store/hooks';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const Profile: React.FC = () => {
  const { user } = useAppSelector((state) => state.auth);

  const stats = [
    { label: 'Courses Completed', value: '3', icon: BookOpen, color: 'text-blue-600' },
    { label: 'Problems Solved', value: '47', icon: Code, color: 'text-green-600' },
    { label: 'Total Points', value: '1,250', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Achievements', value: '12', icon: Award, color: 'text-yellow-600' },
  ];

  const achievements = [
    { id: 1, name: 'First Steps', description: 'Complete your first lesson', earned: true, icon: '🎯' },
    { id: 2, name: 'Problem Solver', description: 'Solve 10 problems', earned: true, icon: '💡' },
    { id: 3, name: 'Code Master', description: 'Solve 50 problems', earned: false, icon: '🏆' },
    { id: 4, name: 'Learning Streak', description: '7 days in a row', earned: true, icon: '🔥' },
    { id: 5, name: 'Course Champion', description: 'Complete 5 courses', earned: false, icon: '📚' },
    { id: 6, name: 'Algorithm Expert', description: 'Master all visualizations', earned: false, icon: '🧠' },
  ];

  const recentActivity = [
    { date: '2025-10-01', activity: 'Completed Neural Networks Basics', type: 'course' },
    { date: '2025-09-30', activity: 'Solved Binary Search Tree', type: 'problem' },
    { date: '2025-09-29', activity: 'Earned Problem Solver Badge', type: 'achievement' },
    { date: '2025-09-28', activity: 'Started Deep Learning Fundamentals', type: 'course' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Profile</h1>
        <p className="text-gray-600">Manage your account and track your progress</p>
      </div>

      {/* Profile Card */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {user?.name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{user?.name || 'User'}</h2>
              <div className="space-y-2 text-gray-600">
                <div className="flex items-center gap-2">
                  <Mail size={16} />
                  <span>{user?.email || 'user@example.com'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Joined October 2024</span>
                </div>
              </div>
              <div className="mt-4">
                <Button variant="outline">Edit Profile</Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index}>
              <CardContent className="pt-6 text-center">
                <Icon className={`mx-auto mb-2 ${stat.color}`} size={32} />
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Achievements */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Achievements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {achievements.map((achievement) => (
                  <div
                    key={achievement.id}
                    className={`p-4 rounded-lg border ${
                      achievement.earned
                        ? 'border-yellow-200 bg-yellow-50'
                        : 'border-gray-200 bg-gray-50 opacity-60'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{achievement.name}</h3>
                        <p className="text-sm text-gray-600">{achievement.description}</p>
                        {achievement.earned && (
                          <span className="text-xs text-yellow-600 font-medium mt-1 inline-block">
                            ✓ Earned
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{item.activity}</p>
                    <p className="text-xs text-gray-500">{item.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Learning Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Learning Progress</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Python for AI</span>
                <span className="font-medium text-gray-900">100%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-600 h-2 rounded-full" style={{ width: '100%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Neural Networks Basics</span>
                <span className="font-medium text-gray-900">75%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-gray-600">Deep Learning Fundamentals</span>
                <span className="font-medium text-gray-900">30%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '30%' }}></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Profile;
