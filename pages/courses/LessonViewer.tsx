import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight, CheckCircle, Youtube, Code } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import CodeEditor from '@/components/code/CodeEditor';

const LessonViewer: React.FC = () => {
  const { courseId, lessonId } = useParams();
  const navigate = useNavigate();
  const [isCompleted, setIsCompleted] = useState(false);

  // Mock lesson data - in real app, fetch from API
  const lesson = {
    id: lessonId,
    title: 'Introduction to Neural Networks',
    content: `
# Neural Networks Fundamentals

Neural networks are computing systems inspired by biological neural networks in animal brains. They consist of interconnected nodes (neurons) organized in layers.

## Key Components

### 1. Input Layer
The input layer receives the initial data. Each neuron in this layer represents a feature of your input data.

### 2. Hidden Layers
Hidden layers perform computations and feature extraction. Deep learning refers to networks with multiple hidden layers.

### 3. Output Layer
The output layer produces the final prediction or classification.

## Activation Functions

Activation functions introduce non-linearity into the network:
- **ReLU**: f(x) = max(0, x)
- **Sigmoid**: f(x) = 1 / (1 + e^(-x))
- **Tanh**: f(x) = (e^x - e^(-x)) / (e^x + e^(-x))

## Forward Propagation

Data flows from input to output through the network, with each layer transforming the data using weights and activation functions.
    `,
    youtubeUrl: 'https://www.youtube.com/embed/aircAruvnKk',
    codeExamples: [
      {
        id: '1',
        language: 'python',
        code: `import numpy as np

class NeuralNetwork:
    def __init__(self, input_size, hidden_size, output_size):
        # Initialize weights
        self.W1 = np.random.randn(input_size, hidden_size)
        self.W2 = np.random.randn(hidden_size, output_size)
        
    def sigmoid(self, x):
        return 1 / (1 + np.exp(-x))
    
    def forward(self, X):
        # Forward propagation
        self.z1 = np.dot(X, self.W1)
        self.a1 = self.sigmoid(self.z1)
        self.z2 = np.dot(self.a1, self.W2)
        self.a2 = self.sigmoid(self.z2)
        return self.a2

# Example usage
nn = NeuralNetwork(input_size=3, hidden_size=4, output_size=1)
X = np.array([[0.5, 0.1, 0.8]])
output = nn.forward(X)
print(f"Network output: {output}")`,
        description: 'Simple neural network implementation',
      },
    ],
    estimatedTime: 30,
  };

  const handleComplete = () => {
    setIsCompleted(true);
    // In real app, update backend
  };

  const handleNext = () => {
    // Navigate to next lesson
    navigate(`/courses/${courseId}`);
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={() => navigate(`/courses/${courseId}`)}
        >
          <ChevronLeft size={20} className="mr-2" />
          Back to Course
        </Button>
        <div className="flex gap-2">
          <Button variant="outline">
            <ChevronLeft size={20} />
            Previous
          </Button>
          <Button onClick={handleNext}>
            Next
            <ChevronRight size={20} className="ml-2" />
          </Button>
        </div>
      </div>

      {/* Lesson Header */}
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">{lesson.title}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-gray-600 mt-2">
            <span>⏱️ {lesson.estimatedTime} minutes</span>
            {isCompleted && (
              <span className="flex items-center gap-1 text-green-600">
                <CheckCircle size={16} />
                Completed
              </span>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Video */}
      {lesson.youtubeUrl && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Youtube className="text-red-600" size={24} />
              Video Lecture
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="aspect-video">
              <iframe
                src={lesson.youtubeUrl}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Content */}
      <Card>
        <CardHeader>
          <CardTitle>Lesson Content</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
              {lesson.content}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Code Examples */}
      {lesson.codeExamples && lesson.codeExamples.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Code size={24} />
              Code Examples
            </CardTitle>
          </CardHeader>
          <CardContent>
            {lesson.codeExamples.map((example) => (
              <div key={example.id} className="space-y-2">
                {example.description && (
                  <p className="text-sm text-gray-600">{example.description}</p>
                )}
                <CodeEditor
                  initialCode={example.code}
                  language={example.language}
                  readOnly={false}
                />
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Complete Lesson */}
      {!isCompleted && (
        <Card>
          <CardContent className="py-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Ready to move on?
              </h3>
              <p className="text-gray-600 mb-4">
                Mark this lesson as complete to unlock the next one
              </p>
              <Button onClick={handleComplete}>
                <CheckCircle size={20} className="mr-2" />
                Mark as Complete
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LessonViewer;
