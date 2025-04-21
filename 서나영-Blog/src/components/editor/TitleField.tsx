import styled from 'styled-components';

const TitleFieldContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 12px 16px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  margin-bottom: 32px;
  margin-top: 203px;
  border-bottom: 1px solid #f5f5f5;
`;

const TextBox = styled.input`
  display: flex;
  margin: 0 auto;
  width: 100%;
  max-width: 688px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  align-self: stretch;
  font-size: 16px;
  letter-spacing: -0.04px;
  border: none;
  padding: 12px 16px;

  &::placeholder {
    color: #ccc;
  }

  &:focus {
    outline: none;
    box-shadow: none;
  }
`;

interface TitleFieldProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const TitleField = ({ value, onChange, placeholder = '제목' }: TitleFieldProps) => {
  return (
    <TitleFieldContainer>
      <TextBox value={value} onChange={onChange} placeholder={placeholder} />
    </TitleFieldContainer>
  );
};

export default TitleField;
