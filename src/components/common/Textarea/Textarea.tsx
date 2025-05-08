import { TextareaWrapper, StyledTextarea } from './Textarea.styled';
import theme from '@/styles/theme.styled';

interface TextareaProps {
  placeholder?: string;
  rows?: number;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onInput?: (e: React.FormEvent<HTMLTextAreaElement>) => void;
  readOnly?: boolean;
  hasBorder?: boolean;
  placeholderColor?: string;
  placeholderSize?: keyof typeof theme.FONT_SIZE;
  placeholderWeight?: keyof typeof theme.FONT_WEIGHT;
  inputColor?: string;
  inputSize?: keyof typeof theme.FONT_SIZE;
  inputWeight?: keyof typeof theme.FONT_WEIGHT;
}

const Textarea: React.FC<TextareaProps> = ({
  placeholder,
  rows = 5,
  value,
  onChange,
  onInput,
  readOnly = false,
  hasBorder = true,
  placeholderColor,
  placeholderSize = 'md',
  placeholderWeight = 'regular',
  inputColor,
  inputSize = 'md',
  inputWeight = 'regular',
}) => {
  return (
    <TextareaWrapper>
      <StyledTextarea
        placeholder={placeholder}
        rows={rows}
        value={value}
        onChange={onChange}
        readOnly={readOnly}
        hasBorder={hasBorder}
        placeholderColor={placeholderColor}
        placeholderSize={placeholderSize}
        placeholderWeight={placeholderWeight}
        inputColor={inputColor}
        inputSize={inputSize}
        inputWeight={inputWeight}
        onInput={onInput}
      />
    </TextareaWrapper>
  );
};

export default Textarea;
