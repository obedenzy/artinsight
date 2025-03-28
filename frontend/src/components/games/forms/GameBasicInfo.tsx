import React, { useState } from 'react';

interface Props {
  formData: {
    title: string;
    description: string;
    tags: string[];
  };
  onChange: (data: Partial<Props['formData']>) => void;
  onNext: () => void;
}

export function GameBasicInfo({ formData, onChange, onNext }: Props) {
  const [tag, setTag] = useState('');

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (tag.trim() && !formData.tags.includes(tag.trim())) {
        onChange({ tags: [...formData.tags, tag.trim()] });
        setTag('');
      }
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    onChange({ tags: formData.tags.filter(t => t !== tagToRemove) });
  };

  return (
    <div className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Game Title
        </label>
        <input
          type="text"
          value={formData.title}
          onChange={e => onChange({ title: e.target.value })}
          className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={e => onChange({ description: e.target.value })}
          rows={4}
          className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tags
        </label>
        <input
          type="text"
          value={tag}
          onChange={e => setTag(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Add tags and press Enter"
          className="w-full rounded-lg border-gray-300 focus:border-purple-500 focus:ring-purple-500"
        />
        <div className="mt-2 flex flex-wrap gap-2">
          {formData.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="hover:text-purple-600"
              >
                ×
              </button>
            </span>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="button"
          onClick={onNext}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          Next
        </button>
      </div>
    </div>
  );
}
