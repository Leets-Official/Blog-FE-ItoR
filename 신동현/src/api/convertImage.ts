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
    const response = await api.put(url, file, {
      headers: {
        'Content-Type': file.type,
      },
    });
    return response.data;
  } catch (error: any) {
    console.log("uploadImage Error", error);
    return {
      error: true,
      message: error.response?.data?.message || "이미지 업로드에 실패했습니다.",
    };
  }
};

export { getPresignedUrl, uploadImage };
