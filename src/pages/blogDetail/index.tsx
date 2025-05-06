import { Header } from '@/components';
import { mockPosts } from '@/__mocks__/mockPost';
import TitleSection from '@/components/blogDetail/TitleSection';
import { useParams } from 'react-router-dom';
import ContentSection from '@/components/blogDetail/ContentSection';
import CommentSection from '@/components/blogDetail/CommentSection';
import { ContentWrapper } from '@/pages/post';
import styled from 'styled-components';
import BlogFooter from '@/components/blogDetail/BlogFooter';

const DetailWrapper = styled(ContentWrapper)`
  margin-top: 120px;
`;

const BlogDetail: React.FC = () => {
  const { postId } = useParams<{ postId: string }>();

  const isLoggedIn = Boolean(localStorage.getItem('accessToken'));
  const post = mockPosts.find((post) => post.postId === Number(postId));
  if (!post) {
    return <div>게시글을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <Header variant="detail" />
      <DetailWrapper>
        <TitleSection
          title={post.title}
          nickName={post.nickName}
          profileImage={post.profileImage || ''}
          createAt={post.createAt}
          commentCount={post.commentCount || 0}
        />
        <ContentSection content={post.content} image={post.image} />
        <CommentSection
          commentCount={post.commentCount}
          isLoggedIn={isLoggedIn}
          comments={post.comments}
        />
        <BlogFooter />
      </DetailWrapper>
    </div>
  );
};

export default BlogDetail;
