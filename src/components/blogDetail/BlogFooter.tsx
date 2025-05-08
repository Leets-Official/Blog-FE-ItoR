import { flexColumn } from '@/styles/common.styled';
import styled from 'styled-components';
import { Image } from '@/components';
import { Text } from '@/components/home/PostItem';
import { useUser } from '@/context/UserContext';
import { DefaultProfileSvg } from '@/assets';

const FooterWrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100vw;
  background-color: ${({ theme }) => theme.COLORS.gray[96]};
  margin-bottom: 60px;
  padding: 60px 0;
`;

const FooterContent = styled.div`
  ${flexColumn}
  gap:16px;
  width: 100%;
  max-width: 720px;
  padding: 0 20px;
`;

const BlogFooter: React.FC = () => {
  const { user } = useUser();

  return (
    <FooterWrapper>
      <FooterContent>
        {user?.profilePicture ? (
          <Image
            src={user.profilePicture}
            alt="profile-image"
            width="80px"
            height="80px"
            borderRadius="50%"
            objectFit="cover"
          />
        ) : (
          <DefaultProfileSvg width="80px" height="80px" />
        )}
        <Text fontSize="xl" fontWeight="medium">
          {user?.nickname}
        </Text>
        <Text fontSize="sm" fontWeight="light" color="gray20">
          {user?.introduction}
        </Text>
      </FooterContent>
    </FooterWrapper>
  );
};

export default BlogFooter;
