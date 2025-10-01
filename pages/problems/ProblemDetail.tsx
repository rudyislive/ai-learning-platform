import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ChevronLeft, Play, CheckCircle, XCircle, Lightbulb } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import CodeEditor from '@/components/code/CodeEditor';
import { codeExecutionService } from '@/services/code-execution.service';

const ProblemDetail: React.FC = () => {
  const { problemId } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState('');
  const [language, setLanguage] = useState('python');
  const [isRunning, setIsRunning] = useState(false);
  const [testResults, setTestResults] = useState<any[]>([]);
  const [showHint, setShowHint] = useState(false);

  // Mock problem data
  const problem = {
    id: problemId,
    title: 'Two Sum',
    difficulty: 'easy',
    description: `Given an array of integers nums and an integer target, return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    examples: [
      {
        input: 'nums = [2,7,11,15], target = 9',
        output: '[0,1]',
        explanation: 'Because nums[0] + nums[1] == 9, we return [0, 1].',
      },
      {
        input: 'nums = [3,2,4], target = 6',
        output: '[1,2]',
        explanation: 'Because nums[1] + nums[2] == 6, we return [1, 2].',
      },
    ],
    constraints: [
      '2 <= nums.length <= 10^4',
      '-10^9 <= nums[i] <= 10^9',
      '-10^9 <= target <= 10^9',
      'Only one valid answer exists.',
    ],
    hints: [
      'Try using a hash map to store numbers you\'ve seen',
      'For each number, check if target - number exists in the hash map',
    ],
    starterCode: {
      python: `def two_sum(nums, target):
    """
    :type nums: List[int]
    :type target: int
    :rtype: List[int]
    """
    # Write your code here
    pass

# Test your solution
print(two_sum([2, 7, 11, 15], 9))`,
      javascript: `function twoSum(nums, target) {
    // Write your code here
}

// Test your solution
console.log(twoSum([2, 7, 11, 15], 9));`,
    },
  };

  const handleRun = async () => {
    setIsRunning(true);
    try {
      const result = await codeExecutionService.executeCode({
        code,
        language,
        input: '',
      });
      
      // Mock test results
      setTestResults([
        { id: 1, input: '[2,7,11,15], 9', expected: '[0,1]', actual: '[0,1]', passed: true },
        { id: 2, input: '[3,2,4], 6', expected: '[1,2]', actual: '[1,2]', passed: true },
        { id: 3, input: '[3,3], 6', expected: '[0,1]', actual: '[0,1]', passed: true },
      ]);
    } catch (error) {
      console.error('Execution error:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmit = () => {
    // Submit solution
    alert('Solution submitted successfully!');
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'hard': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="space-y-6">
      {/* Navigation */}
      <Button variant="outline" onClick={() => navigate('/problems')}>
        <ChevronLeft size={20} className="mr-2" />
        Back to Problems
      </Button>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Problem Description */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between">
                <CardTitle className="text-2xl">{problem.title}</CardTitle>
                <span className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </span>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose max-w-none">
                <p className="text-gray-700 whitespace-pre-wrap">{problem.description}</p>
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Examples:</h3>
                {problem.examples.map((example, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg mb-3">
                    <p className="text-sm font-mono">
                      <strong>Input:</strong> {example.input}
                    </p>
                    <p className="text-sm font-mono">
                      <strong>Output:</strong> {example.output}
                    </p>
                    {example.explanation && (
                      <p className="text-sm text-gray-600 mt-2">
                        <strong>Explanation:</strong> {example.explanation}
                      </p>
                    )}
                  </div>
                ))}
              </div>

              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Constraints:</h3>
                <ul className="list-disc list-inside space-y-1 text-sm text-gray-700">
                  {problem.constraints.map((constraint, index) => (
                    <li key={index}>{constraint}</li>
                  ))}
                </ul>
              </div>

              {/* Hints */}
              <div>
                <Button
                  variant="outline"
                  onClick={() => setShowHint(!showHint)}
                  className="mb-2"
                >
                  <Lightbulb size={16} className="mr-2" />
                  {showHint ? 'Hide Hints' : 'Show Hints'}
                </Button>
                {showHint && (
                  <div className="bg-yellow-50 p-4 rounded-lg space-y-2">
                    {problem.hints.map((hint, index) => (
                      <p key={index} className="text-sm text-gray-700">
                        💡 <strong>Hint {index + 1}:</strong> {hint}
                      </p>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Code Editor */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Code Editor</CardTitle>
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value);
                    setCode(problem.starterCode[e.target.value as keyof typeof problem.starterCode] || '');
                  }}
                  className="px-3 py-1 border border-gray-300 rounded-lg text-sm"
                >
                  <option value="python">Python</option>
                  <option value="javascript">JavaScript</option>
                  <option value="cpp">C++</option>
                  <option value="java">Java</option>
                </select>
              </div>
            </CardHeader>
            <CardContent>
              <CodeEditor
                initialCode={code || problem.starterCode.python}
                language={language}
                onChange={setCode}
              />
              <div className="flex gap-2 mt-4">
                <Button onClick={handleRun} disabled={isRunning} className="flex-1">
                  <Play size={16} className="mr-2" />
                  {isRunning ? 'Running...' : 'Run Code'}
                </Button>
                <Button onClick={handleSubmit} variant="outline" className="flex-1">
                  Submit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Test Results */}
          {testResults.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Test Results</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {testResults.map((result) => (
                    <div
                      key={result.id}
                      className={`p-3 rounded-lg border ${
                        result.passed
                          ? 'bg-green-50 border-green-200'
                          : 'bg-red-50 border-red-200'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        {result.passed ? (
                          <CheckCircle className="text-green-600" size={20} />
                        ) : (
                          <XCircle className="text-red-600" size={20} />
                        )}
                        <span className="font-medium">
                          Test Case {result.id} {result.passed ? 'Passed' : 'Failed'}
                        </span>
                      </div>
                      <div className="text-sm space-y-1">
                        <p><strong>Input:</strong> {result.input}</p>
                        <p><strong>Expected:</strong> {result.expected}</p>
                        <p><strong>Actual:</strong> {result.actual}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemDetail;
