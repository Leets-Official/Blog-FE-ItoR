import { CheckSvg, ErrorSvg } from '@/assets';
import { ToastContainer } from '@/components/common/Toast/Toast.styled';

export type ToastType = 'success' | 'error';

export interface ToastProps {
  message: string;
  type?: ToastType;
}

const Toast: React.FC<ToastProps> = ({ message, type = 'success' }) => {
  const Icon = type === 'success' ? CheckSvg : ErrorSvg;

  return (
    <ToastContainer type={type}>
      <Icon />
      {message}
    </ToastContainer>
  );
};

export default Toast;
