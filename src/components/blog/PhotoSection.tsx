import { PhotoSvg } from '@/assets';
import { Text } from '@/components/home/PostItem';
import { flexCenter } from '@/styles/common.styled';
import styled from 'styled-components';

const Wrapper = styled.div`
  ${flexCenter}
  gap: 8px;
  width: 100%;
`;

const PhotoSection: React.FC = () => {
  return (
    <Wrapper>
      <PhotoSvg />
      <Text color="gray56" fontSize="xs" fontWeight="regular">
        사진 추가하기
      </Text>
    </Wrapper>
  );
};

export default PhotoSection;
