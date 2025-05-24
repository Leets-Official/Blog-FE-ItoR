import Pagination from "@/components/pagination/Pagination";
import { useEffect, useState } from "react";
import { Post } from "../../../type/Post/Post";
import PostItem from "./PostItem";
import { getPostList } from "@/api/post/post";

interface PostListProps {
  totalPostCount: number;
  loadMyPage?: boolean;
  postList?: any;
}

const PostList = ({ totalPostCount, loadMyPage = false }: PostListProps) => {
  const [page, setPage] = useState(1);
  const size = 10;

  const firstPage = (page - 1) * size;
  const lastPage = firstPage + size;

  const [postList, setPostList] = useState<Post[]>([]);

  const fetchBlogList = async () => {
    const response = await getPostList(10, page - 1);
    if (loadMyPage) {
      const postList: Post[] = [];
      response.data.post.map((post: Post) => {
        if (post.isOwner) {
          postList.push(post);
        }
      });
      setPostList(postList);
    } else {
      setPostList(response.data.post);
    }
  }

  useEffect(() => {
    fetchBlogList();
  }, [page]);

  const handlePageChange = (newPage: number) => {
    const clampedPage = Math.max(1, Math.min(newPage, lastPage));
    setPage(clampedPage);
  }

  return (
    <>
      {postList.map((post) => (
        <PostItem key={post.postId + new Date().getTime()} post={post} />
      ))}
      <Pagination currentPage={page} totalPosts={totalPostCount} limitPost={size} limitPage={5} setPage={handlePageChange} />
    </>
  );
};

export default PostList;

