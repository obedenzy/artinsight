import React from 'react';
import { UseFormRegister } from 'react-hook-form';

interface Props {
  register: UseFormRegister<any>;
  errors: any;
}

export function ProvenanceForm({ register, errors }: Props) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">Provenance & Location</h2>
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Origin</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                {...register('origin.location', { required: 'Origin location is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="e.g., Paris, France"
              />
              {errors.origin?.location && (
                <p className="mt-1 text-sm text-red-600">{errors.origin.location.message}</p>
              )}
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700">First Exhibition Date</label>
              <input
                type="text"
                {...register('origin.date', { required: 'Origin date is required' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="e.g., March 1889"
              />
              {errors.origin?.date && (
                <p className="mt-1 text-sm text-red-600">{errors.origin.date.message}</p>
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Current Location</label>
          <input
            type="text"
            {...register('currentLocation', { required: 'Current location is required' })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="e.g., Museum of Modern Art, New York"
          />
          {errors.currentLocation && (
            <p className="mt-1 text-sm text-red-600">{errors.currentLocation.message}</p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Estimated Value (USD)</label>
          <input
            type="number"
            {...register('estimatedValue')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
            placeholder="e.g., 5000"
          />
        </div>

        <div>
          <h3 className="text-lg font-medium mb-2">Exhibition History</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Exhibition Name</label>
                <input
                  type="text"
                  {...register('exhibitions.0.name')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Exhibition Name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Location</label>
                <input
                  type="text"
                  {...register('exhibitions.0.location')}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  placeholder="Location"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Date</label>
              <input
                type="text"
                {...register('exhibitions.0.date')}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                placeholder="e.g., 2023"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
