import { FooterItem } from '@/components/home/PostItem';
import { Image } from '@/components';
import { formatPostDate } from '@/utils/formatPostDate';
import { Text } from '@/components/home/PostItem';
import styled from 'styled-components';
import { flexColumn } from '@/styles/common.styled';

interface TitleSectionProps {
  title: string;
  nickName: string;
  profileImage: string;
  createAt: string;
  commentCount: number;
}

const TitleSectionWrapper = styled.div`
  ${flexColumn}
  gap:52px;
  width: 100%;
`;

const Line = styled.div`
  width: 100vw;
  height: 1px;
  background-color: ${({ theme }) => theme.COLORS.gray[96]};
  margin: 0 calc(-50vw + 50%);
`;

const TitleSection: React.FC<TitleSectionProps> = ({
  title,
  nickName,
  profileImage,
  createAt,
  commentCount,
}) => {
  return (
    <>
      <TitleSectionWrapper>
        <Text fontSize="xl" fontWeight="medium">
          {title}
        </Text>
        <FooterItem>
          <Image
            src={profileImage!}
            alt="profile-img"
            width="20px"
            height="20px"
            borderRadius="50%"
            objectFit="cover"
          />

          <Text color="gray20">{nickName}</Text>
          <Text color="gray56">{formatPostDate(createAt)}</Text>
          <Text color="gray56">댓글{commentCount}</Text>
        </FooterItem>
      </TitleSectionWrapper>

      <Line />
    </>
  );
};

export default TitleSection;
