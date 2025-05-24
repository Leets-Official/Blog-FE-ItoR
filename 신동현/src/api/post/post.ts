import { Content } from "@/assets/type/PostContent";
import { api } from "../api";

const postBlog = async (title: string, contents: Content[]) => {
  try {
    console.log(contents.map((content, index) => ({
      contentOrder: index + 1,
      content: content.content,
      contentType: content.contentType
    })));    
    const response = await api.post("/posts", {
      title: title,
      contents: contents.map((content, index) => ({
        contentOrder: index + 1,
        content: content.content,
        contentType: content.contentType
      }))
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || "블로그 작성에 실패했습니다."
    };
  }
};

const getPostList = async (size: number, page: number) => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      const response = await api.get("/posts/all", {
        params: {
          size: size,
          page: page
        }
      });
      return response.data;
    } else {
      const response = await api.get("/posts/all/token", {
        params: {
          size: size,
          page: page
        }
      });
      return response.data;
    }
  } catch (error: any) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || "블로그 리스트 조회에 실패했습니다."
    };
  }
};

const getPostDetail = async (id: string) => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      const response = await api.get('/posts',
        {
          params: {
            postId: id
          }
        }
      );
      return response.data;
    } else {
      const response = await api.get('/posts/token',
        {
          params: {
            postId: id
          }
        }
      );
      return response.data;
    }
  } catch (error: any) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || "블로그 조회에 실패했습니다."
    };
  }
};

const postComment = async (postId: string, content: string) => {
  try {
    const response = await api.post(`/comments/${postId}`, {
      content: content
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || "댓글 작성에 실패했습니다."
    };
  }
};

const deleteComment = async (commentId: string) => {
  try {
    const response = await api.delete(`/comments/${commentId}`);
    return response.data;
  } catch (error: any) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || "댓글 삭제에 실패했습니다."
    };
  }
};

const deletePost = async (postId: string) => {
  try {
    const response = await api.delete('/posts', {
      params: {
        postId: postId
      }
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || "블로그 삭제에 실패했습니다."
    };
  }
};

const updatePost = async (postId: string, title: string, content: string, contentOrder: number, contentType: string) => {
  try {
    const response = await api.patch(`/posts?postId=${postId}`, {
      title: title,
      contents: [
        {
          contentOrder: contentOrder,
          content: content,
          contentType: contentType
        }
      ]
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || "블로그 수정에 실패했습니다."
    };
  }
};

export { postBlog, getPostList, getPostDetail, postComment, deleteComment, deletePost, updatePost };
