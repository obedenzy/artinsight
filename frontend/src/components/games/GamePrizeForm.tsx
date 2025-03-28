import React, { useState } from 'react';
import { Plus, Minus, DollarSign, Gift, Upload, X } from 'lucide-react';
import { GamePrize } from '../../types/game';

interface Props {
  prizes: GamePrize[];
  onChange: (prizes: GamePrize[]) => void;
}

export function GamePrizeForm({ prizes, onChange }: Props) {
  const [imageUploadIndex, setImageUploadIndex] = useState<number | null>(null);

  const addPrize = () => {
    const newPrize: GamePrize = {
      rank: prizes.length + 1,
      type: 'monetary',
      amount: 0
    };
    onChange([...prizes, newPrize]);
  };

  const removePrize = (index: number) => {
    const updatedPrizes = prizes.filter((_, i) => i !== index)
      .map((prize, i) => ({ ...prize, rank: i + 1 }));
    onChange(updatedPrizes);
  };

  const updatePrize = (index: number, updates: Partial<GamePrize>) => {
    const updatedPrizes = prizes.map((prize, i) => {
      if (i === index) {
        return { ...prize, ...updates };
      }
      return prize;
    });
    onChange(updatedPrizes);
  };

  const handleImageUpload = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Create a temporary URL for the uploaded image
      const imageUrl = URL.createObjectURL(file);
      updatePrize(index, { imageUrl });
    }
  };

  const totalMonetaryPrizes = prizes
    .filter(p => p.type === 'monetary')
    .reduce((sum, prize) => sum + (prize.amount || 0), 0);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Prize Distribution</h3>
        <button
          type="button"
          onClick={addPrize}
          className="inline-flex items-center gap-1 text-sm text-purple-600 hover:text-purple-700"
        >
          <Plus className="w-4 h-4" />
          Add Prize
        </button>
      </div>

      <div className="space-y-3">
        {prizes.map((prize, index) => (
          <div key={index} className="flex items-center gap-4">
            <div className="w-24">
              <span className="text-sm font-medium text-gray-700">
                {index + 1}{index === 0 ? 'st' : index === 1 ? 'nd' : index === 2 ? 'rd' : 'th'} Place
              </span>
            </div>
            
            <div className="flex-1 space-y-2">
              <select
                value={prize.type}
                onChange={(e) => updatePrize(index, { 
                  type: e.target.value as 'monetary' | 'custom',
                  // Reset values when switching types
                  amount: e.target.value === 'monetary' ? 0 : undefined,
                  description: e.target.value === 'custom' ? '' : undefined,
                  imageUrl: e.target.value === 'custom' ? undefined : undefined
                })}
                className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
              >
                <option value="monetary">Money Prize</option>
                <option value="custom">Custom Prize</option>
              </select>

              {prize.type === 'monetary' ? (
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                  <input
                    type="number"
                    min="0"
                    value={prize.amount || 0}
                    onChange={(e) => updatePrize(index, { amount: Number(e.target.value) })}
                    className="pl-8 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Enter prize amount"
                  />
                </div>
              ) : (
                <div className="space-y-2">
                  <input
                    type="text"
                    value={prize.description || ''}
                    onChange={(e) => updatePrize(index, { description: e.target.value })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                    placeholder="Describe the prize"
                  />
                  
                  <div className="flex items-center gap-2">
                    <div className="flex-1">
                      <input
                        type="url"
                        value={prize.imageUrl || ''}
                        onChange={(e) => updatePrize(index, { imageUrl: e.target.value })}
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                        placeholder="Enter image URL or upload"
                      />
                    </div>
                    <div className="relative">
                      <input
                        type="file"
                        id={`prize-image-${index}`}
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => handleImageUpload(index, e)}
                      />
                      <label
                        htmlFor={`prize-image-${index}`}
                        className="inline-flex items-center gap-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 cursor-pointer"
                      >
                        <Upload className="w-4 h-4" />
                        Upload
                      </label>
                    </div>
                  </div>

                  {prize.imageUrl && (
                    <div className="relative inline-block">
                      <img
                        src={prize.imageUrl}
                        alt={prize.description || 'Prize'}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => updatePrize(index, { imageUrl: undefined })}
                        className="absolute -top-2 -right-2 p-1 bg-white rounded-full shadow-md hover:bg-gray-100"
                      >
                        <X className="w-4 h-4 text-gray-500" />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={() => removePrize(index)}
              className="p-2 text-gray-400 hover:text-red-500"
              title="Remove prize"
            >
              <Minus className="w-4 h-4" />
            </button>
          </div>
        ))}

        {prizes.length === 0 && (
          <p className="text-sm text-gray-500 text-center py-4">
            Add prizes for game winners
          </p>
        )}
      </div>

      {totalMonetaryPrizes > 0 && (
        <div className="bg-purple-50 p-4 rounded-lg space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm text-purple-800 font-medium">Total Money Prize Pool</p>
            <p className="text-lg font-bold text-purple-800">${totalMonetaryPrizes}</p>
          </div>
          <p className="text-xs text-purple-600">
            Entry fee per player: $2
          </p>
        </div>
      )}
    </div>
  );
}
