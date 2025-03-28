import { useForm } from 'react-hook-form';
import { DetailedArtwork } from '../types/artwork';

interface ArtworkFormData extends Partial<DetailedArtwork> {
  imageFile?: FileList;
}

export function useArtworkForm() {
  return useForm<ArtworkFormData>({
    defaultValues: {
      dimensions: {
        unit: 'cm'
      },
      style: '',
      movement: '',
      influences: [],
      techniques: [],
      colorPalette: []
    }
  });
}
