import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledInput = styled.input`
  width: ${({ width }) => width};
  height: ${({ height }) => height};
  border: 1px solid #E0E0E0;
  border-radius: 4px;
  padding: 0 16px;

  ::placeholder {
    color: #C8C8C8;
    font-size: 14px;
    font-weight: 300;
  }
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 300;
  color: #909090;
`;

interface InputProps {
  title ?: string;
  width: string;
  height: string;
  type: string;
  placeholder: string;
  value: string;
  onChange ?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ title, type, placeholder, value, onChange, ...rest }: InputProps) => {
  return (
    <Container>
      {title && <Title>{title}</Title>}
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...rest}
      />
    </Container>
  )
}

export default Input;
