import { api } from "./api";

const getPresignedUrl = async (image: string) => {
  try {
    const response = await api.get("/images/presigned-url", {
      params: {
        fileName: image,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log("convertImage Error", error);
    return {
      error: true,
      message: error.response?.data?.message || "이미지 변환에 실패했습니다.",
    };
  }
};

const uploadImage = async (file: File, url: string) => {
  try {
    const response = await fetch(url, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });
    if (!response.ok) {
      throw new Error('이미지 업로드에 실패했습니다.');
    }
    return response.url;
  } catch (error: any) {
    console.log("uploadImage Error", error);
    throw error;
  }
};

export { getPresignedUrl, uploadImage };
