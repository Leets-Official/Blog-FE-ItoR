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
  editable?: boolean;
  isAlwaysDisabled?: boolean;
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
  editable,
  isAlwaysDisabled,
}: SignupInputProps) => {
  let backgroundColor = '#FFF';

  if (isAlwaysDisabled) {
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
        style={
          (!disabled && editable) || isMyPage || isAlwaysDisabled
            ? { background: backgroundColor }
            : undefined
        }
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default SignupInput;
