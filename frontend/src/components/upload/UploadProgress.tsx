import React from 'react';
import { Loader2 } from 'lucide-react';

interface Props {
  message: string;
}

export function UploadProgress({ message }: Props) {
  return (
    <div className="text-center py-12">
      <Loader2 className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
      <p className="text-lg text-gray-600">{message}</p>
    </div>
  );
}
