import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/header/Header';
import BlogTitle from '@/components/blog/blogDetail/BlogTitle';
import BlogContent from '@/components/blog/blogDetail/BlogContent';
import CommentList from '@/components/blog/blogDetail/comment/CommentList';
import InfoFooter from '@/components/blog/blogDetail/InfoFooter';
import { getPostDetail } from '@/api/blog/postDetailAPI';
import { BlogPostDetail } from '@/types/blogPost';
import { useQuery } from '@tanstack/react-query';

const BlogDetail = () => {
  const { postId } = useParams<{ postId: string }>();
  const commentRef = useRef<HTMLDivElement>(null);

  const {
    data: post,
    isLoading,
    isError,
  } = useQuery<BlogPostDetail>({
    queryKey: ['postDetail', postId],
    queryFn: () => getPostDetail(postId!),
    enabled: !!postId, // postId가 있을 때만 실행
  });

  if (isLoading) {
    return <div>로딩 중입니다...</div>;
  }

  if (isError || !post) {
    return <div>해당 포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <Header type='ChatandMore' commentRef={commentRef} postId={postId!} post={post} />
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
