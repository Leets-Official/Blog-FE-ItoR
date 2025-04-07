import { useParams } from 'react-router-dom';
import Header from '@/components/layout/header/Header';
import BlogTitle from '@/components/blog/blogDetail/BlogTitle';
import { mockPosts } from '@/mocks/mockPosts';
import BlogContent from '@/components/blog/blogDetail/BlogContent';
import CommentList from '@/components/blog/blogDetail/comment/CommentList';
import InfoFooter from '@/components/blog/blogDetail/InfoFooter';

const BlogDetail = () => {
  const { postId } = useParams();
  const post = mockPosts.find((p) => p.postId === postId);

  if (!post) {
    return <div>해당 포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <Header type='ChatandMore' />
      <BlogTitle post={post} />
      <BlogContent contents={post.contents} />
      <CommentList post={post} />
      <InfoFooter post={post} />
    </div>
  );
};

export default BlogDetail;
