import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledInput = styled.input<{ noneBorder?: boolean }>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "40px"};
  border: ${({ noneBorder }) => noneBorder ? "none" : "1px solid #E0E0E0"};
  border-radius: 4px;
  padding: 0px;
  background-color: ${({ disabled }) => disabled ? "#E6E6E6" : "#FFFFFF"};
  color: ${({ disabled }) => disabled ? "#909090" : "#000000"};
  text-align: left;
  text-indent: 16px;
  ::placeholder {
    color: #C8C8C8;
    font-size: 14px;
    font-weight: 300;
  }

  ${({ noneBorder }) => noneBorder && `
    &:focus {
      outline: none;
    }
  `}
`;

const Title = styled.div`
  margin-left: 8px;
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 300;
  color: #909090;
`;

const SubTitle = styled(Title)`
  font-size: 12px;
  color: #909090;
`;

interface InputProps {
  title?: string;
  subTitle?: string;
  width?: string;
  height?: string;
  type: string;
  placeholder: string;
  value: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  noneBorder?: boolean;
  style?: React.CSSProperties;
}

const Input = ({ title, subTitle, type, placeholder, value, disabled, onChange, noneBorder, ...rest }: InputProps) => {

  return (
    <Container>
      {title && <Title>{title}</Title>}
      <StyledInput
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        noneBorder={noneBorder}
        {...rest}
      />
      {subTitle && <SubTitle>{subTitle}</SubTitle>}
    </Container>
  )
}

export default Input;
