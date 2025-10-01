import React from 'react';
import { Link } from 'react-router-dom';
import { Brain, BookOpen, Code, Zap, Award, Users } from 'lucide-react';
import { Button } from '@/components/ui/Button';

const Home: React.FC = () => {
  const features = [
    {
      icon: BookOpen,
      title: 'Comprehensive Courses',
      description: '18 structured modules from beginner to advanced AI/ML topics',
    },
    {
      icon: Code,
      title: 'Interactive Coding',
      description: 'Practice with 250+ problems and real-time code execution',
    },
    {
      icon: Brain,
      title: 'AI-Powered Assistant',
      description: 'Get personalized help and hints whenever you need them',
    },
    {
      icon: Zap,
      title: 'Algorithm Visualization',
      description: 'See algorithms come to life with step-by-step visualizations',
    },
    {
      icon: Award,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed analytics',
    },
    {
      icon: Users,
      title: 'Learn at Your Pace',
      description: 'Self-paced learning designed for your schedule',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="text-blue-600" size={40} />
            <span className="text-2xl font-bold text-gray-900">AI Learning Platform</span>
          </div>
          <div className="flex gap-4">
            <Link to="/login">
              <Button variant="outline">Login</Button>
            </Link>
            <Link to="/register">
              <Button>Get Started</Button>
            </Link>
          </div>
        </nav>
      </header>

      <main>
        {/* Hero */}
        <section className="container mx-auto px-4 py-20 text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Master AI & Machine Learning
            <br />
            <span className="text-blue-600">with Interactive Learning</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            From Python basics to advanced deep learning. Learn, practice, and visualize
            algorithms with AI-powered assistance every step of the way.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Start Learning Free
              </Button>
            </Link>
            <Link to="/login">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Sign In
              </Button>
            </Link>
          </div>
        </section>

        {/* Features */}
        <section className="container mx-auto px-4 py-20">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">
            Everything You Need to Learn AI/ML
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
                >
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-blue-600" size={24} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* CTA */}
        <section className="container mx-auto px-4 py-20">
          <div className="bg-blue-600 rounded-2xl p-12 text-center text-white">
            <h2 className="text-4xl font-bold mb-4">Ready to Start Your AI Journey?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of learners mastering AI and machine learning
            </p>
            <Link to="/register">
              <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-gray-100 text-lg px-8 py-6">
                Create Free Account
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-4 py-8 text-center text-gray-600">
        <p>&copy; 2025 AI Learning Platform. Built with ❤️ for the AI learning community.</p>
      </footer>
    </div>
  );
};

export default Home;
