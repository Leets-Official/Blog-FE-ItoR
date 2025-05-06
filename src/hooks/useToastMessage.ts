import { ToastType } from '@/components/common/Toast/Toast';
import { useState } from 'react';

const useToastMessage = () => {
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState<ToastType>('success');
  const [showToast, setShowToast] = useState(false);

  const showToastMessage = (message: string, type: ToastType = 'error') => {
    setToastMessage(message);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return {
    toastMessage,
    toastType,
    showToast,
    showToastMessage,
  };
};

export default useToastMessage;
