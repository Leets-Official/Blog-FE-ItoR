import React, { useState, forwardRef, InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';

type InputState = 'default' | 'input' | 'click' | 'disabled';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  width?: string;
  maxWidth?: string;
  disabled?: boolean;
  name: string;
}

const inputStyles = {
  default: css`
    color: #c8c8c8;
    border-radius: 4px;
    border: 1px solid var(--Gray90, #e6e6e6);
    background: #fff;
  `,
  input: css`
    color: #000;
    border-radius: 4px;
    border: 1px solid var(--Gray90, #e6e6e6);
    background: #fff;
  `,
  click: css`
    color: #000;
    border-radius: 4px;
    border: 1px solid var(--Gray-33, #555);
    background: #fff;
  `,
  disabled: css`
    color: #909090;
    border-radius: 4px;
    border: 1px solid var(--Gray90, #e6e6e6);
    background: var(--Gray90, #e6e6e6);
    color: #a0a0a0;
    cursor: not-allowed;
  `,
};

const StyledInputContainer = styled.div<{ width?: string; $maxWidth?: string; $state: InputState }>`
  display: flex;
  align-items: center;
  width: ${({ width }) => width || '100%'};
  max-width: ${({ $maxWidth }) => $maxWidth || 'none'};
  ${({ $state }) => inputStyles[$state]};
`;

const StyledInput = styled.input`
  border: none;
  outline: none;
  width: 100%;
  font-size: 14px;
  background: transparent;
  color: inherit;
  padding: 12px 16px;
  font-family: 'Noto Sans L';
`;

const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  ({ width, maxWidth, disabled, name, type = 'text', onChange, onBlur, ...props }, ref) => {
    const [state, setState] = useState<InputState>('default');

    const handleFocus = () => setState('click');
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setState('input');
      if (onBlur) onBlur(e);
    };

    return (
      <StyledInputContainer
        width={width}
        $maxWidth={maxWidth}
        $state={disabled ? 'disabled' : state}
      >
        <StyledInput
          {...props}
          ref={ref}
          id={name}
          name={name}
          type={type}
          disabled={disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={onChange}
        />
      </StyledInputContainer>
    );
  },
);

TextInput.displayName = 'TextInput';

export default TextInput;
