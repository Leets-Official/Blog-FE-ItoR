import { api } from "./api";

const postBlog = async (title: string, content: string, contentOrder: number, contentType: string) => {
  try {
    const response = await api.post("/posts", {
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
      message: error.response?.data?.message || "블로그 작성에 실패했습니다."
    };
  }
};

const getBlogList = async (size: number, page: number) => {
  try {
    const response = await api.get("/posts/all", {
      params: {
        size: size,
        page: page
      }
    });
    return response.data;
  } catch (error: any) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || "블로그 리스트 조회에 실패했습니다."
    };
  }
};

const getBlogDetail = async (id: string) => {
  try {
    const response = await api.get('/posts',
      {
        params: {
          postId: id
        }
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(error);
    return {
      error: true,
      message: error.response?.data?.message || "블로그 조회에 실패했습니다."
    };
  }
};


export { postBlog, getBlogList, getBlogDetail };
