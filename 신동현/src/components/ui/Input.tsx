import styled from "styled-components";
import { Control, Controller, FieldValues, Path } from "react-hook-form";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const StyledInput = styled.input<{ $noneBorder?: boolean }>`
  width: ${({ width }) => width || "100%"};
  height: ${({ height }) => height || "40px"};
  border: ${({ $noneBorder }) => $noneBorder ? "none" : "1px solid #E0E0E0"};
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

  ${({ $noneBorder }) => $noneBorder && `
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

const ErrorText = styled.p`
  color: #ff3f3f;
  font-size: 12px;
  font-weight: 300;
  padding-left: 2px;
  margin-top: 6px;
`;

interface InputProps<T extends FieldValues> extends React.InputHTMLAttributes<HTMLInputElement> {
  title?: string;
  subTitle?: string;
  width?: string;
  height?: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  noneBorder?: boolean;
  style?: React.CSSProperties;
  control?: Control<T>;
  name: Path<T>;
}

const Input = <T extends FieldValues>({ title, subTitle, type, placeholder, disabled, onChange, noneBorder, name, control, ...rest }: InputProps<T>) => {

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <Container>
          {title && <Title>{title}</Title>}
          <StyledInput
            type={type}
            placeholder={placeholder}
            onChange={field.onChange}
            value={field.value ?? ""}
            disabled={disabled}
            $noneBorder={noneBorder}
            {...rest}
          />
          {subTitle && <SubTitle>{subTitle}</SubTitle>}
          {fieldState.error && <ErrorText>{fieldState.error.message}</ErrorText>}
        </Container>
      )}
    />
  )
}

export default Input;
