import { useRef, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/header/Header';
import BlogTitle from '@/components/blog/blogDetail/BlogTitle';
import BlogContent from '@/components/blog/blogDetail/BlogContent';
import CommentList from '@/components/blog/blogDetail/comment/CommentList';
import InfoFooter from '@/components/blog/blogDetail/InfoFooter';
import { getPostDetail } from '@/api/blog/postDetailAPI';
import { BlogPostDetail } from '@/types/blogPost';

const BlogDetail = () => {
  const { postId } = useParams();
  const [post, setPost] = useState<BlogPostDetail | null>(null);
  const commentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        if (!postId) return;
        const data = await getPostDetail(postId);
        setPost(data);
      } catch (error) {
        console.error('게시글을 불러오지 못했습니다.', error);
      }
    };

    fetchPost();
  }, [postId]);

  if (!post) {
    return <div>해당 포스트를 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <Header type='ChatandMore' commentRef={commentRef} postId={postId} post={post} />
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
