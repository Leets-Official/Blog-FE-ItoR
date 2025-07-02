import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { DeleteImg } from '@/assets';

interface ImageStyleProps {
  $borderRadius?: string;
  $thumbnail?: boolean;
  $aspectRatio?: string;
  $objectFit?: 'cover' | 'contain' | 'fill';
  width?: string;
  height?: string;
  $maxWidth?: string;
  $fromContentEditor?: boolean;
  $selected?: boolean;
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
  fromContentEditor?: boolean;
  onSelect?: () => void;
  onDelete?: () => void;
  isSelected?: boolean;
}

const ImageContainer = styled.div`
  position: relative;
  display: inline-block;
`;

const StyledImage = styled.img<ImageStyleProps>`
  width: 100%;
  max-width: 100%;
  height: 100%;
  border-radius: ${({ $borderRadius }) => $borderRadius ?? '2px'};
  aspect-ratio: ${({ $aspectRatio, $thumbnail }) => ($thumbnail ? '1/1' : $aspectRatio || 'auto')};
  object-fit: ${({ $objectFit }) => $objectFit || 'cover'};
`;

const ImageFrame = styled.div<ImageStyleProps>`
  position: relative;
  width: ${({ width, $thumbnail }) => ($thumbnail ? '124px' : width || '100%')};
  height: ${({ height, $thumbnail }) => ($thumbnail ? '116px' : height || 'auto')};
  max-width: ${({ $maxWidth }) => $maxWidth || '100%'};
  border-radius: ${({ $borderRadius }) => $borderRadius || '2px'};
  box-sizing: border-box;
  background-color: #fff;
  overflow: hidden;
  padding: 12px 16px;

  ${({ $fromContentEditor, $selected }) =>
    $fromContentEditor &&
    `
      border: 1px solid ${$selected ? ' #00A1FF' : ' #E6E6E6'};
      cursor: pointer;
    `}
`;

const StyledDeleteImg = styled(DeleteImg)`
  position: absolute;
  top: -40px;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 999;
  cursor: pointer;
`;

const Image = ({
  thumbnail = false,
  borderRadius,
  aspectRatio,
  objectFit,
  width,
  height,
  maxWidth,
  fromContentEditor = false,
  onSelect,
  onDelete,
  isSelected = false,
  ...rest
}: ImageProps) => {
  const frameRef = useRef<HTMLDivElement>(null);

  const styleProps = {
    $thumbnail: thumbnail,
    $borderRadius: borderRadius,
    $aspectRatio: aspectRatio,
    $objectFit: objectFit,
    width,
    height,
    $maxWidth: maxWidth,
    $fromContentEditor: fromContentEditor,
    $selected: isSelected,
  };

  const handleClick = (e: React.MouseEvent) => {
    if (fromContentEditor) {
      e.stopPropagation();
      onSelect?.();
    }
  };

  useEffect(() => {
    if (!fromContentEditor) return;

    const handleClickOutside = (event: MouseEvent) => {
      if (
        frameRef.current &&
        !frameRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('[data-delete-button]')
      ) {
        onSelect?.();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [fromContentEditor]);

  return (
    <ImageContainer>
      {isSelected && fromContentEditor && (
        <StyledDeleteImg
          data-delete-button
          onClick={(e) => {
            e.stopPropagation();
            onDelete?.();
          }}
        />
      )}
      <ImageFrame ref={frameRef} {...styleProps} onClick={handleClick}>
        <StyledImage loading='lazy' {...styleProps} {...rest} />
      </ImageFrame>
    </ImageContainer>
  );
};

export default Image;
