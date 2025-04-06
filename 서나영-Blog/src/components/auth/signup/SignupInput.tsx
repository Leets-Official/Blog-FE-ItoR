import styled from 'styled-components';
import TextInput from '@/components/ui/TextInput';

interface SignupInputProps {
  name: string;
  label: string;
  type: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  error?: string;
  register: any;
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
`;

const ErrorMessage = styled.p`
  color: #ff3f3f;
  font-size: 12px;
  font-weight: 300;
  margin-top: 2px;
  margin-left: 4px;
`;

const SignupInput = ({ name, label, type, placeholder, error, register }: SignupInputProps) => {
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
      />
      {error && <ErrorMessage>{error}</ErrorMessage>}
    </InputContainer>
  );
};

export default SignupInput;
