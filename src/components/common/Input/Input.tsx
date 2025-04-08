import {
  ErrorText,
  IconWrapper,
  InputBox,
  InputWrapper,
  Label,
  StyledInput,
} from '@/components/common/Input/Input.styled';

interface InputProps {
  label?: string;
  as?: 'input' | 'textarea';
  placeholder?: string;
  rows?: number; // textarea 인 경우에만 사용 ( rows 값으로 높이 제한 )
  type?: string;
  errorMessage?: string;
  value?: string | number;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  onClick?: () => void;
  readOnly?: boolean;
  disabled?: boolean;
  textColor?: string;
  borderColor?: string;
  icon?: React.ReactNode;
  showBorder?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  as = 'input',
  placeholder,
  rows,
  type = 'text',
  errorMessage,
  value,
  onChange,
  readOnly = false,
  disabled = false,
  textColor,
  borderColor,
  icon,
  showBorder = true,
}) => {
  return (
    <InputWrapper>
      {label && <Label>{label}</Label>}
      <InputBox>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <StyledInput
          as={as}
          type={as === 'input' ? type : undefined}
          rows={as === 'textarea' ? rows : undefined}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          readOnly={readOnly}
          disabled={disabled}
          textColor={textColor}
          borderColor={borderColor}
          hasIcon={!!icon}
          showBorder={showBorder}
        />
      </InputBox>
      {errorMessage && <ErrorText>{errorMessage}</ErrorText>}
    </InputWrapper>
  );
};

export default Input;
