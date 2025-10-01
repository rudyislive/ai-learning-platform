import api from './api';
import { Submission, TestResult } from '@/types/problem.types';

export interface ExecutionResult {
  output: string;
  error?: string;
  executionTime: number;
  memory: number;
}

export const codeExecutionService = {
  async runCode(
    code: string,
    language: string,
    input?: string
  ): Promise<ExecutionResult> {
    const response = await api.post('/api/code/run', {
      code,
      language,
      input,
    });
    return response.data;
  },

  async submitSolution(
    problemId: string,
    code: string,
    language: string
  ): Promise<Submission> {
    const response = await api.post('/api/code/submit', {
      problemId,
      code,
      language,
    });
    return response.data;
  },

  async getSubmissions(problemId: string): Promise<Submission[]> {
    const response = await api.get(`/api/code/submissions/${problemId}`);
    return response.data;
  },
};
