import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-size: ${props => props.fontSize || '16px'};
  color: ${props => props.color || 'white'};
  background-color: ${props => props.bgColor || 'blue'};
  width: ${props => props.width || '100%'};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Button = ({ children, width, color, bgColor, fontSize, onClick }) => {
  return (
    <StyledButton 
      width = {width} 
      color = {color} 
      bgColor = {bgColor}
      fontSize={fontSize} 
      onClick={onClick} 
    >
    {children}
    </StyledButton>
  );
};

export default Button;