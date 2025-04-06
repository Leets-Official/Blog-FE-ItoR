import React from 'react';
import styled from 'styled-components';

interface ImageProps {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  maxWidth?: string;
  borderRadius?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  thumbnail?: boolean;
  aspectRatio?: string;
}

const StyledImage = styled.img<ImageProps>`
  width: 100%;
  height: 100%;
  border-radius: ${({ borderRadius }) => borderRadius || '0px'};
  object-fit: ${({ objectFit }) => objectFit || 'cover'};
`;

const ImageFrame = styled.div<ImageProps>`
  position: relative;
  width: ${({ width, thumbnail }) => (thumbnail ? '124px' : width || '100%')};
  height: ${({ height, thumbnail }) => (thumbnail ? '116px' : height || 'auto')};
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  border-radius: ${({ borderRadius }) => borderRadius || '0'};
  aspect-ratio: ${({ aspectRatio, thumbnail }) => (thumbnail ? '1/1' : aspectRatio || 'auto')};
  background-color: #fff;
  overflow: hidden;
`;

const Image = ({ thumbnail = false, ...props }: ImageProps) => {
  return (
    <ImageFrame {...props} thumbnail={thumbnail}>
      <StyledImage {...props} />
    </ImageFrame>
  );
};

export default Image;
