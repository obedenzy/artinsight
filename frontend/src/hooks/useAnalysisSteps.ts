import { useState, useCallback } from 'react';
import { Step } from '../components/analysis/types';
import { INITIAL_ANALYSIS_STEPS } from '../components/analysis/constants';

export function useAnalysisSteps() {
  const [steps, setSteps] = useState<Step[]>(INITIAL_ANALYSIS_STEPS);

  const updateStepStatus = useCallback((index: number, status: Step['status']) => {
    setSteps(prev => prev.map((step, i) => 
      i === index ? { ...step, status } : step
    ));
  }, []);

  const completeAllSteps = useCallback(() => {
    setSteps(prev => prev.map(step => ({ ...step, status: 'completed' })));
  }, []);

  const markActiveStepAsError = useCallback(() => {
    setSteps(prev => prev.map(step => ({
      ...step,
      status: step.status === 'active' ? 'error' : step.status
    })));
  }, []);

  return {
    steps,
    updateStepStatus,
    completeAllSteps,
    markActiveStepAsError
  };
}
