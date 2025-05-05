import Pagination from "@/components/pagination/Pagination";
import { useEffect, useState } from "react";
import { Post } from "../../../assets/type/Post";
import PostItem from "./PostItem";
import { getBlogList } from "@/api/blog";

interface PostListProps {
  totalPostCount: number;
}

const PostList = ({ totalPostCount }: PostListProps) => {
  const [page, setPage] = useState(1);
  const size = 10;

  const firstPage = (page - 1) * size;
  const lastPage = firstPage + size;

  const [postList, setPostList] = useState<Post[]>([]);

  const fetchBlogList = async () => {
    const response = await getBlogList(10, page - 1);
    setPostList(response.data);
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
        <PostItem key={post.postId} post={post} />
      ))}
      <Pagination currentPage={page} totalPosts={totalPostCount} limitPost={size} limitPage={5} setPage={handlePageChange} />
    </>
  );
};

export default PostList;

