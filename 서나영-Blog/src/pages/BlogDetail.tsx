import { useRef } from 'react';
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
  const commentRef = useRef<HTMLDivElement>(null);

  if (!post) {
    return <div>해당 포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <Header type='ChatandMore' commentRef={commentRef} />
      <BlogTitle post={post} />
      <BlogContent contents={post.contents} />
      <div ref={commentRef}>
        <CommentList post={post} />
      </div>
      <InfoFooter post={post} />
    </div>
  );
};

export default BlogDetail;
