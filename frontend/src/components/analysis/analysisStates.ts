export type AnalysisState = 
  | 'idle'
  | 'preparing'
  | 'analyzing'
  | 'generating'
  | 'completed'
  | 'error';

export const ANALYSIS_STEPS = {
  idle: { label: 'Preparing image for analysis', next: 'preparing' },
  preparing: { label: 'Analyzing artwork style and composition', next: 'analyzing' },
  analyzing: { label: 'Identifying technical details', next: 'generating' },
  generating: { label: 'Generating detailed insights', next: 'completed' },
  completed: { label: 'Analysis complete', next: null },
  error: { label: 'Analysis failed', next: null }
} as const;
