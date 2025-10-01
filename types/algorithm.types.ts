export interface Algorithm {
  id: string;
  name: string;
  category: AlgorithmCategory;
  description: string;
  timeComplexity: string;
  spaceComplexity: string;
  visualizationData?: VisualizationStep[];
  codeImplementation: CodeImplementation[];
  useCases: string[];
  realWorldExamples: RealWorldExample[];
  whenToUse: string;
  alternatives: string[];
}

export type AlgorithmCategory =
  | 'sorting'
  | 'searching'
  | 'graph'
  | 'dynamic-programming'
  | 'greedy'
  | 'tree'
  | 'string'
  | 'backtracking';

export interface VisualizationStep {
  step: number;
  description: string;
  data: any;
  highlightedIndices?: number[];
}

export interface CodeImplementation {
  language: string;
  code: string;
  explanation: string;
}

export interface RealWorldExample {
  title: string;
  description: string;
  industry: string;
}
