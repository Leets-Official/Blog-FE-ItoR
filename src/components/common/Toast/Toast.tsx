import CheckIcon from '@/assets/icon/ic_toast_positive.svg?react';
import ErrorIcon from '@/assets/icon/ic_toast_negative.svg?react';
import { ToastContainer } from '@/components/common/Toast/Toast.styled';

export type ToastType = 'success' | 'error';

export interface ToastProps {
  message: string;
  type?: ToastType;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  const Icon = type === 'success' ? CheckIcon : ErrorIcon;

  return (
    <ToastContainer type={type}>
      <Icon />
      {message}
    </ToastContainer>
  );
};

export default Toast;
