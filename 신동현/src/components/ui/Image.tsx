import styled from 'styled-components';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: string;
  height?: string;
  $objectFit?: 'cover' | 'contain' | 'fill';
}

const StyledImage = styled.img<{
    width?: string;
    height?: string;
    $objectFit?: 'cover' | 'contain' | 'fill';
}>`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
    object-fit: ${(props) => props.$objectFit};
`;


const Image = ({
    src,
    alt,
    width,
    height,
    $objectFit,
    ...rest
}: ImageProps) => {
    return (
        <StyledImage src={src} alt={alt} width={width} height={height} $objectFit={$objectFit} {...rest} />
    )
}

export default Image;
