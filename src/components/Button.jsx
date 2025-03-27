import React from 'react';
import styled from 'styled-components';
import Icon from '@/assets/create.svg?react';

const StyledButton = styled.button`
  font-size: ${(props) => props.fontSize || '16px'};
  color: ${(props) => props.color || 'white'};
  background-color: ${(props) => props.bgColor || 'blue'};
  width: ${(props) => props.width || '100%'};
  padding: 10px 20px;
  border: 1px solid skyblue;
  border-radius: 25px;
  cursor: pointer;

  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const StyledIcon = styled(Icon)`
  width: ${(props) => props.size || '20px'};
  height: ${(props) => props.size || '20px'};
  color: 'skyblue';
`;

const Button = ({ children, width, color, bgColor, fontSize, iconSize, onClick }) => {
  return (
    <StyledButton
      width={width}
      color={color}
      bgColor={bgColor}
      fontSize={fontSize}
      onClick={onClick}
    >
      <StyledIcon size={iconSize} />
      {children}
    </StyledButton>
  );
};

export default Button;
