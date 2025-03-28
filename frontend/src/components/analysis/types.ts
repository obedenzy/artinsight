export interface Step {
  label: string;
  status: 'pending' | 'active' | 'completed' | 'error';
}

export interface AnalysisProgressProps {
  steps: Step[];
  error?: string;
}
