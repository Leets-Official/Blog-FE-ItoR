import React from 'react';
import styled from 'styled-components';

interface ImageStyleProps {
  $borderRadius?: string;
  $thumbnail?: boolean;
  aspectRatio?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  width?: string;
  height?: string;
  maxWidth?: string;
}

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
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

const StyledImage = styled.img<ImageStyleProps>`
  width: 100%;
  height: 100%;
  border-radius: ${({ $borderRadius }) => $borderRadius ?? '2px'};
  aspect-ratio: ${({ aspectRatio, $thumbnail }) => ($thumbnail ? '1/1' : aspectRatio || 'auto')};
  object-fit: ${({ objectFit }) => objectFit || 'cover'};
`;

const ImageFrame = styled.div<ImageStyleProps>`
  position: relative;
  width: ${({ width, $thumbnail }) => ($thumbnail ? '124px' : width || '100%')};
  height: ${({ height, $thumbnail }) => ($thumbnail ? '116px' : height || 'auto')};
  max-width: ${({ maxWidth }) => maxWidth || 'none'};
  border-radius: ${({ $borderRadius }) => $borderRadius || '0'};
  background-color: #fff;
  overflow: hidden;
`;

const Image = ({
  thumbnail = false,
  borderRadius,
  aspectRatio,
  objectFit,
  width,
  height,
  maxWidth,
  ...rest
}: ImageProps) => {
  const styleProps = {
    $thumbnail: thumbnail,
    $borderRadius: borderRadius,
    aspectRatio,
    objectFit,
    width,
    height,
    maxWidth,
  };
  return (
    <ImageFrame {...styleProps}>
      <StyledImage {...styleProps} {...rest} />
    </ImageFrame>
  );
};

export default Image;
