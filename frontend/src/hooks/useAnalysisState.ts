import { useState, useCallback } from 'react';
import { AnalysisState, ANALYSIS_STEPS } from '../components/analysis/analysisStates';

// No need to re-export AnalysisState here

export function useAnalysisState() {
  const [currentState, setCurrentState] = useState<AnalysisState>('idle');

  const transition = useCallback((state: AnalysisState) => {
    setCurrentState(state);
  }, []);

  const getStepStatus = useCallback((state: AnalysisState) => {
    if (currentState === 'error') {
      return state === currentState ? 'error' : 'pending';
    }

    const states = Object.keys(ANALYSIS_STEPS) as AnalysisState[];
    const currentIndex = states.indexOf(currentState);
    const stateIndex = states.indexOf(state);

    if (stateIndex < currentIndex) return 'completed';
    if (stateIndex === currentIndex) return 'active';
    return 'pending';
  }, [currentState]);

  return {
    currentState,
    transition,
    getStepStatus
  };
}
