import Pagination from "@/components/pagination/Pagination";
import { useState } from "react";
import { Post } from "../../../assets/type/Post";
import PostItem from "./PostItem";

interface PostsProps {
  postList: Post[];
}

const PostList = ({ postList }: PostsProps) => {
  const [page, setPage] = useState(1);
  const size = 10;

  const firstPage = (page - 1) * size;
  const lastPage = firstPage + size;
  const currentPosts = postList.slice(firstPage, lastPage);

  const handlePageChange = (newPage: number) => {
    const clampedPage = Math.max(1, Math.min(newPage, lastPage));
    setPage(clampedPage);    
  }

  return (
    <>
      {currentPosts.map((post) => (
        <PostItem key={post.id} post={post} />
      ))}
      <Pagination currentPage={page} totalPosts={postList.length} limitPost={size} limitPage={5} setPage={handlePageChange} />
    </>
  );
};

export default PostList;

