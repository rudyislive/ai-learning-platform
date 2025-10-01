import React, { useState } from 'react';
import { Play, Pause, RotateCcw, ChevronRight } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';

const AlgorithmVisualizer: React.FC = () => {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('bubble-sort');
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(50);
  const [array, setArray] = useState([64, 34, 25, 12, 22, 11, 90]);

  const algorithms = [
    { id: 'bubble-sort', name: 'Bubble Sort', category: 'Sorting' },
    { id: 'quick-sort', name: 'Quick Sort', category: 'Sorting' },
    { id: 'merge-sort', name: 'Merge Sort', category: 'Sorting' },
    { id: 'binary-search', name: 'Binary Search', category: 'Search' },
    { id: 'bfs', name: 'Breadth-First Search', category: 'Graph' },
    { id: 'dfs', name: 'Depth-First Search', category: 'Graph' },
    { id: 'dijkstra', name: 'Dijkstra\'s Algorithm', category: 'Graph' },
    { id: 'knn', name: 'K-Nearest Neighbors', category: 'ML' },
  ];

  const algorithmInfo = {
    'bubble-sort': {
      description: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
      timeComplexity: 'O(n²)',
      spaceComplexity: 'O(1)',
      bestCase: 'O(n)',
      worstCase: 'O(n²)',
    },
  };

  const currentInfo = algorithmInfo[selectedAlgorithm as keyof typeof algorithmInfo] || algorithmInfo['bubble-sort'];

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // Animation logic would go here
  };

  const handleReset = () => {
    setArray([64, 34, 25, 12, 22, 11, 90]);
    setIsPlaying(false);
  };

  const handleRandomize = () => {
    const newArray = Array.from({ length: 7 }, () => Math.floor(Math.random() * 100) + 1);
    setArray(newArray);
    setIsPlaying(false);
  };

  const maxValue = Math.max(...array);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Algorithm Visualizer</h1>
        <p className="text-gray-600">See algorithms come to life with interactive visualizations</p>
      </div>

      <div className="grid lg:grid-cols-4 gap-6">
        {/* Algorithm List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Algorithms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {algorithms.map((algo) => (
                <button
                  key={algo.id}
                  onClick={() => setSelectedAlgorithm(algo.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    selectedAlgorithm === algo.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <div className="font-medium">{algo.name}</div>
                  <div className="text-xs text-gray-500">{algo.category}</div>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Visualization Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Controls */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between gap-4">
                <div className="flex gap-2">
                  <Button onClick={handlePlay}>
                    {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                  </Button>
                  <Button variant="outline" onClick={handleReset}>
                    <RotateCcw size={20} />
                  </Button>
                  <Button variant="outline" onClick={handleRandomize}>
                    Randomize
                  </Button>
                </div>
                <div className="flex items-center gap-4">
                  <label className="text-sm text-gray-600">Speed:</label>
                  <input
                    type="range"
                    min="1"
                    max="100"
                    value={speed}
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="w-32"
                  />
                  <span className="text-sm text-gray-600 w-12">{speed}%</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Visualization */}
          <Card>
            <CardHeader>
              <CardTitle>Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end justify-center gap-2 bg-gray-50 rounded-lg p-4">
                {array.map((value, index) => (
                  <div
                    key={index}
                    className="flex flex-col items-center gap-2"
                    style={{ width: `${100 / array.length}%` }}
                  >
                    <div
                      className="bg-blue-600 rounded-t transition-all duration-300 w-full"
                      style={{
                        height: `${(value / maxValue) * 100}%`,
                      }}
                    ></div>
                    <span className="text-xs text-gray-600">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Algorithm Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Description</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700">{currentInfo.description}</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Complexity Analysis</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Time Complexity:</span>
                    <span className="font-mono font-semibold text-gray-900">{currentInfo.timeComplexity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Space Complexity:</span>
                    <span className="font-mono font-semibold text-gray-900">{currentInfo.spaceComplexity}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Best Case:</span>
                    <span className="font-mono font-semibold text-green-600">{currentInfo.bestCase}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Worst Case:</span>
                    <span className="font-mono font-semibold text-red-600">{currentInfo.worstCase}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Code Implementation */}
          <Card>
            <CardHeader>
              <CardTitle>Implementation</CardTitle>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto">
                <code>{`def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
    return arr

# Example usage
arr = [64, 34, 25, 12, 22, 11, 90]
sorted_arr = bubble_sort(arr)
print(sorted_arr)`}</code>
              </pre>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;
