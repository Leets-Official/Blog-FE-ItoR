import styled from 'styled-components';
import TextInput from '@/components/ui/TextInput';

interface SignupInputProps {
  name: string;
  label: string;
  type: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  register: any;
  disabled?: boolean;
  isMyPage?: boolean;
}

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 688px;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
`;

const Label = styled.label`
  color: #909090;
  font-size: 14px;
  font-weight: 300;
  line-height: 160%;
  letter-spacing: -0.07px;
  font-family: 'Noto Sans L';
`;

const ErrorMessage = styled.p`
  color: #ff3f3f;
  font-size: 12px;
  font-weight: 300;
  margin-top: 2px;
  margin-left: 4px;
  font-family: 'Noto Sans L';
`;

const SignupInput = ({
  name,
  label,
  type,
  placeholder,
  error,
  register,
  disabled,
  isMyPage,
}: SignupInputProps) => {
  let backgroundColor = '#FFF';

  if (isMyPage && (name === 'email' || name === 'name') && disabled) {
    backgroundColor = '#E6E6E6';
  }

  return (
    <InputContainer>
      <Label htmlFor={name}>{label}</Label>
      <TextInput
        {...register(name)}
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        width='100%'
        disabled={disabled}
        style={{
          background: backgroundColor,
        }}
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default SignupInput;
