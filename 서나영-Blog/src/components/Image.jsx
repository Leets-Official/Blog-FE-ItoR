import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const StyledImage = styled.img`
  width: 100%;
  height: 100%;
  border-radius: ${(props) => props.$borderRadius || '0px'};
  object-fit: ${(props) => props.$objectFit || 'cover'};
`;

const ImageFrame = styled.div`
  position: relative;
  width: ${(props) => props.$width || '100%'};
  height: ${(props) => props.$height || 'auto'};
  max-width: ${(props) => props.$maxWidth || 'none'};
  border-radius: ${(props) => props.$borderRadius || '0'};
  aspect-ratio: ${(props) => props.$aspectRatio || 'auto'}
  background-color: #fff;
  overflow: hidden;
`;

const Image = ({
  src,
  alt,
  width = '100%',
  height = 'auto',
  borderRadius = '0px',
  objectFit = 'cover',
  thumbnail = false,
  maxWidth,
}) => {
  return (
    <ImageFrame
      $width={thumbnail ? '124px' : width}
      $height={thumbnail ? '116px' : height}
      $maxWidth={maxWidth}
      $borderRadius={borderRadius}
      $aspectRatio={thumbnail ? '1/1' : 'auto'}
    >
      <StyledImage
        src={src}
        alt={alt}
        width='100%'
        height='100%'
        $borderRadius={borderRadius}
        $objectFit={objectFit}
      />
    </ImageFrame>
  );
};

// PropTypes 설정
Image.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  width: PropTypes.string,
  height: PropTypes.string,
  maxWidth: PropTypes.string,
  borderRadius: PropTypes.string,
  objectFit: PropTypes.oneOf(['contain', 'cover', 'fill']), // 이미지 크기 조절 방식
  thumnail: PropTypes.bool,
};

export default Image;
