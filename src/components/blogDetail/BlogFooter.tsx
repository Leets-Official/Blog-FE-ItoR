import { flexColumn } from '@/styles/common.styled';
import { faker } from '@faker-js/faker';
import styled from 'styled-components';
import { Image } from '@/components';
import { Text } from '@/components/home/PostItem';

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  background-color: ${({ theme }) => theme.COLORS.gray[96]};
  margin-bottom: 60px;
  padding: 20px 0;
`;

const FooterContent = styled.div`
  ${flexColumn}
  gap:16px;
  width: 100%;
  max-width: 720px;
  padding: 0 20px;
`;

const myData = {
  profileImage: faker.image.avatar(),
  name: '다현쓰',
  bio: '이건 제 한줄소개입니다',
};

const BlogFooter: React.FC = () => {
  return (
    <FooterWrapper>
      <FooterContent>
        <Image
          src={myData.profileImage}
          alt="profile-image"
          width="80px"
          height="80px"
          borderRadius="50%"
          objectFit="cover"
        />
        <Text fontSize="xl" fontWeight="medium">
          {myData.name}
        </Text>
        <Text fontSize="sm" fontWeight="light" color="gray20">
          {myData.bio}
        </Text>
      </FooterContent>
    </FooterWrapper>
  );
};

export default BlogFooter;
