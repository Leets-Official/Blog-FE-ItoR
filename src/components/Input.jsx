import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: ${(props) => props.width || "200px"};
  height: ${(props) => props.height || "40px"};
  font-size: ${props => props.fontSize || '16px'};
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Input = ({ width, height, fontSize, placeholder }) => {
  return <StyledInput width={width} height={height} fontSize ={fontSize} placeholder = {placeholder} />
};

export default Input;