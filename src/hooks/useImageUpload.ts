import { useCallback, useState } from 'react';

export const useImageUpload = () => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileUrl = URL.createObjectURL(file);
    setPreviewUrl(fileUrl);
    setImageFile(file);
  }, []);

  const reset = () => {
    setPreviewUrl(null);
    setImageFile(null);
  };

  return {
    previewUrl,
    imageFile,
    handleImageChange,
    reset,
  };
};
