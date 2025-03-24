import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  font-size: ${props => props.fontSize || '16px'};
  color: ${props => props.color || 'white'};
  background-color: ${props => props.bgColor || 'blue'};
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const Button = ({ children, weight, color, fontSize }) => {
  return <StyledButton weight = {weight} color = {color} fontSize={fontSize}>{children}</StyledButton>
};

export default Button;