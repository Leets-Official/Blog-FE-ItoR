import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: ${(props) => props.width || 'auto'};
  height: ${(props) => props.height || '40px'};
  cursor: pointer;
  border-radius: ${(props) => props.borderRadius || '4px'};
  border: ${(props) => props.border || 'none'};

  &:disabled {
    background-color: #e6e6e6;
    cursor: not-allowed;
  }
`;

const IconWrapper = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Button = ({ children, width, height, style, onClick, disabled, icon }) => {
  return (
    <StyledButton width={width} height={height} style={style} onClick={onClick} disabled={disabled}>
      {icon && <IconWrapper>{icon}</IconWrapper>}
      {children}
    </StyledButton>
  );
};

// PropTypes 설정
Button.propTypes = {
  children: PropTypes.node.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  style: PropTypes.object,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
  icon: PropTypes.node,
};

export default Button;
