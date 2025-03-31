import { flexAlignCenter } from '@/styles/common.styled';
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface LazyImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  objectFit?: 'cover' | 'contain' | 'fill';
  borderRadius?: string;
  placeholder?: React.ReactNode;
}

const ImageWrapper = styled.div<{
  width?: string;
  height?: string;
  borderRadius?: string;
}>`
  position: relative;
  width: ${({ width }) => width || '100%'};
  width: ${({ height }) => height || 'auto'};
  overflow: hidden;
  border-radius: ${({ borderRadius }) => borderRadius || '0'};
  background-color: ${({ theme }) => theme.COLORS.gray[56]};
`;

const StyledImage = styled.img<{
  isLoaded: boolean;
  objectFit?: 'cover' | 'contain' | 'fill';
  borderRadius?: string;
}>`
  width: 100%;
  height: 100%;
  object-fit: ${({ objectFit }) => objectFit || 'cover'};
  border-radius: ${({ borderRadius }) => borderRadius || '0'};
  opacity: ${({ isLoaded }) => (isLoaded ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
  display: block;
`;

const Placeholder = styled.div`
  ${flexAlignCenter}
  position: absolute;
  inset: 0;
  color: ${({ theme }) => theme.COLORS.gray[56]};
  font-size: ${({ theme }) => theme.FONT_SIZE.sm};
`;

const Image: React.FC<LazyImageProps> = ({
  src,
  alt,
  width,
  height,
  objectFit = 'cover',
  borderRadius,
  placeholder = 'Loading...',
  ...props
}) => {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setShouldLoad(true);
        observer.disconnect();
      }
    });

    if (wrapperRef.current) {
      observer.observe(wrapperRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <ImageWrapper ref={wrapperRef} width={width} height={height} borderRadius={borderRadius}>
      {!isLoaded && <Placeholder>{placeholder}</Placeholder>}
      {shouldLoad && (
        <StyledImage
          src={src}
          alt={alt}
          objectFit={objectFit}
          borderRadius={borderRadius}
          isLoaded={isLoaded}
          onLoad={() => setIsLoaded(true)}
          {...props}
        />
      )}
    </ImageWrapper>
  );
};

export default Image;
