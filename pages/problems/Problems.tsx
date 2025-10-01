import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Code, Search, Filter } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';

interface Problem {
  id: string;
  title: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  acceptance: number;
  solved: boolean;
}

const Problems: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');

  // Mock problems data
  const problems: Problem[] = [
    { id: '1', title: 'Two Sum', difficulty: 'easy', category: 'Arrays', acceptance: 85, solved: true },
    { id: '2', title: 'Binary Search', difficulty: 'easy', category: 'Search', acceptance: 78, solved: true },
    { id: '3', title: 'Merge Sort Implementation', difficulty: 'medium', category: 'Sorting', acceptance: 65, solved: false },
    { id: '4', title: 'Longest Substring Without Repeating', difficulty: 'medium', category: 'Strings', acceptance: 58, solved: false },
    { id: '5', title: 'Binary Tree Maximum Path Sum', difficulty: 'hard', category: 'Trees', acceptance: 42, solved: false },
    { id: '6', title: 'K-Nearest Neighbors', difficulty: 'medium', category: 'ML Algorithms', acceptance: 55, solved: false },
    { id: '7', title: 'Linear Regression from Scratch', difficulty: 'medium', category: 'ML Algorithms', acceptance: 62, solved: true },
    { id: '8', title: 'Neural Network Backpropagation', difficulty: 'hard', category: 'Deep Learning', acceptance: 38, solved: false },
  ];

  const filteredProblems = problems.filter(problem => {
    const matchesSearch = problem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         problem.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesDifficulty = difficultyFilter === 'all' || problem.difficulty === difficultyFilter;
    return matchesSearch && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'text-green-600';
      case 'medium': return 'text-yellow-600';
      case 'hard': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const stats = {
    total: problems.length,
    solved: problems.filter(p => p.solved).length,
    easy: problems.filter(p => p.difficulty === 'easy').length,
    medium: problems.filter(p => p.difficulty === 'medium').length,
    hard: problems.filter(p => p.difficulty === 'hard').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Coding Problems</h1>
        <p className="text-gray-600">Practice algorithms and data structures</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-gray-900">{stats.solved}/{stats.total}</div>
            <div className="text-sm text-gray-600">Solved</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-green-600">{stats.easy}</div>
            <div className="text-sm text-gray-600">Easy</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-yellow-600">{stats.medium}</div>
            <div className="text-sm text-gray-600">Medium</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-red-600">{stats.hard}</div>
            <div className="text-sm text-gray-600">Hard</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6 text-center">
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((stats.solved / stats.total) * 100)}%
            </div>
            <div className="text-sm text-gray-600">Progress</div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <Input
                type="text"
                placeholder="Search problems..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              {['all', 'easy', 'medium', 'hard'].map((difficulty) => (
                <Button
                  key={difficulty}
                  variant={difficultyFilter === difficulty ? 'default' : 'outline'}
                  onClick={() => setDifficultyFilter(difficulty as any)}
                  className="capitalize"
                >
                  {difficulty}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Problems List */}
      <Card>
        <CardHeader>
          <CardTitle>All Problems</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {filteredProblems.map((problem) => (
              <Link
                key={problem.id}
                to={`/problems/${problem.id}`}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-8 h-8 flex items-center justify-center">
                    {problem.solved ? (
                      <div className="w-6 h-6 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xs">✓</span>
                      </div>
                    ) : (
                      <Code className="text-gray-400" size={20} />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{problem.title}</h3>
                    <p className="text-sm text-gray-600">{problem.category}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-sm text-gray-600">
                    {problem.acceptance}% acceptance
                  </div>
                  <div className={`font-medium capitalize ${getDifficultyColor(problem.difficulty)} min-w-[80px] text-right`}>
                    {problem.difficulty}
                  </div>
                  <Button size="sm">Solve</Button>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Problems;
