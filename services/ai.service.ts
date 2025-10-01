import api from './api';

export interface AIMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface AIContext {
  lessonId?: string;
  problemId?: string;
  algorithmId?: string;
  code?: string;
}

export const aiService = {
  async sendMessage(
    messages: AIMessage[],
    context?: AIContext
  ): Promise<string> {
    const response = await api.post('/api/ai/chat', {
      messages,
      context,
    });
    return response.data.message;
  },

  async explainCode(code: string, language: string): Promise<string> {
    const response = await api.post('/api/ai/explain-code', {
      code,
      language,
    });
    return response.data.explanation;
  },

  async debugCode(code: string, language: string, error: string): Promise<string> {
    const response = await api.post('/api/ai/debug', {
      code,
      language,
      error,
    });
    return response.data.suggestion;
  },

  async getHint(problemId: string, currentCode?: string): Promise<string> {
    const response = await api.post('/api/ai/hint', {
      problemId,
      currentCode,
    });
    return response.data.hint;
  },

  async optimizeCode(code: string, language: string): Promise<string> {
    const response = await api.post('/api/ai/optimize', {
      code,
      language,
    });
    return response.data.optimizedCode;
  },
};
