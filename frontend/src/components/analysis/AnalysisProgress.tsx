import React from 'react';
import { Loader2, Sparkles, FileCheck, AlertCircle } from 'lucide-react';
import { AnalysisProgressProps } from './types';

export function AnalysisProgress({ steps, error }: AnalysisProgressProps) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-center gap-3 text-purple-600 mb-6">
        <Sparkles className="w-6 h-6" />
        <h2 className="text-lg font-medium">AI Analysis in Progress</h2>
      </div>

      <div className="space-y-4">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center gap-3">
            {step.status === 'active' && (
              <Loader2 className="w-5 h-5 text-purple-600 animate-spin" />
            )}
            {step.status === 'completed' && (
              <FileCheck className="w-5 h-5 text-green-500" />
            )}
            {step.status === 'error' && (
              <AlertCircle className="w-5 h-5 text-red-500" />
            )}
            {step.status === 'pending' && (
              <div className="w-5 h-5 rounded-full border-2 border-gray-200" />
            )}
            <span className={`text-sm ${
              step.status === 'active' ? 'text-purple-600 font-medium' :
              step.status === 'completed' ? 'text-green-600' :
              step.status === 'error' ? 'text-red-600' :
              'text-gray-500'
            }`}>
              {step.label}
            </span>
          </div>
        ))}
      </div>

      {error && (
        <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-md text-sm">
          {error}
        </div>
      )}
    </div>
  );
}
