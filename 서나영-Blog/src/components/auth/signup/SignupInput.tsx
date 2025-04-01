import styled from 'styled-components';
import TextInput from '@/components/ui/TextInput';

interface SignupInputProps {
  name: string;
  label: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
}

const InputContainer = styled.div`
  display: flex;
  width: 100%;
  max-width: 688px;
  padding: 12px 16px;
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

const SignupInput = ({ name, label, type, value, onChange, placeholder }: SignupInputProps) => {
  return (
    <InputContainer>
      <Label>{label}</Label>
      <TextInput
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        width='100%'
      />
    </InputContainer>
  );
};

export default SignupInput;
