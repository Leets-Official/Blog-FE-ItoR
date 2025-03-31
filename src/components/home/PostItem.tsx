import { flexAlignCenter, flexColumn } from '@/styles/common.styled';
import theme from '@/styles/theme.styled';
import { Post } from '@/types/post';
import styled from 'styled-components';
import Image from '../common/Image/Image';

interface PostItemProps {
  post: Post;
}

type TextColor = 'black' | 'gray33' | 'gray56' | 'gray20';

export const Text = styled.div<{
  fontSize?: keyof typeof theme.FONT_SIZE;
  fontWeight?: keyof typeof theme.FONT_WEIGHT;
  color?: TextColor;
}>`
  font-weight: ${({ theme, fontWeight = 'regular' }) => theme.FONT_WEIGHT[fontWeight]};
  font-size: ${({ theme, fontSize = 'sm' }) => theme.FONT_SIZE[fontSize]};
  color: ${({ theme, color = 'black' }) => {
    switch (color) {
      case 'gray33':
        return theme.COLORS.gray[33];
      case 'gray56':
        return theme.COLORS.gray[56];
      case 'gray20':
        return theme.COLORS.gray[20];
      case 'black':
      default:
        return theme.COLORS.black;
    }
  }};
  line-height: 1.6;
`;

const FlexItem = styled.div`
  ${flexAlignCenter};
  gap: 15px;
`;

const ItemContainer = styled.div`
  ${flexColumn}
  gap:36px;
  padding-bottom: 24px;
`;

const PostItem: React.FC<PostItemProps> = ({ post }) => {
  return (
    <ItemContainer>
      <FlexItem>
        <div>
          <Text fontWeight="medium" fontSize="md">
            {post.title}
          </Text>
          <Text color="gray33">{post.content}</Text>
        </div>
        {post.image && (
          <Image
            src={post.image!}
            width="220px"
            alt="post-image"
            borderRadius="2px"
            objectFit="cover"
            thumbnail
          />
        )}
      </FlexItem>
      <FlexItem>
        <Image
          src={post.profileImage!}
          alt="profile-img"
          width="20px"
          height="20px"
          borderRadius="9999px"
          objectFit="cover"
        />

        <Text color="gray20">{post.nickName}</Text>
        <Text color="gray56">{post.createAt}</Text>
        <Text color="gray56">댓글 {post.commentCount}</Text>
      </FlexItem>
    </ItemContainer>
  );
};

export default PostItem;
