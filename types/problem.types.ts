export interface Problem {
  id: string;
  title: string;
  description: string;
  difficulty: 'easy' | 'medium' | 'hard';
  category: string[];
  inputFormat: string;
  outputFormat: string;
  constraints: string[];
  testCases: TestCase[];
  solutionExplanation?: string;
  algorithmTags: string[];
  hints?: string[];
}

export interface TestCase {
  id: string;
  input: string;
  expectedOutput: string;
  isHidden: boolean;
}

export interface Submission {
  id: string;
  userId: string;
  problemId: string;
  code: string;
  language: string;
  status: 'passed' | 'failed' | 'error' | 'timeout';
  executionTime?: number;
  memory?: number;
  testResults?: TestResult[];
  submittedAt: string;
}

export interface TestResult {
  testCaseId: string;
  passed: boolean;
  actualOutput?: string;
  error?: string;
}
