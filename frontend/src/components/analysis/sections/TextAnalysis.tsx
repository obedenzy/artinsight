import React from 'react';
import { MessageSquare } from 'lucide-react';

interface Props {
  text: string;
}

export function TextAnalysis({ text }: Props) {
  const sections = text.split(/\d+\./).filter(Boolean).map(s => s.trim());

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-purple-600" />
        <h3 className="text-lg font-semibold">Detailed Analysis</h3>
      </div>

      <div className="prose prose-purple max-w-none">
        {sections.map((section, index) => {
          const [title, ...content] = section.split('\n').filter(Boolean);
          
          return (
            <div key={index} className="mb-6 last:mb-0">
              <h4 className="text-lg font-medium text-gray-900 mb-3">
                {title.replace(/^[:-]\s*/, '')}
              </h4>
              {content.map((paragraph, pIndex) => (
                <p key={pIndex} className="text-gray-700 leading-relaxed mb-3 last:mb-0">
                  {paragraph.trim()}
                </p>
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
