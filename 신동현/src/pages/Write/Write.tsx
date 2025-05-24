import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/header/Header";
import { postFormSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Control } from "react-hook-form";
import { z } from "zod";
import { createContext, useState } from "react";
import { postBlog } from "@/api/post/post";
import Toast from "@/components/ui/Toast";
import { postElementsAtom } from "@/Atoms/atoms";
import { useAtomValue } from "jotai";
import { getPresignedUrl, uploadImage } from "@/api/convertImage";
import { Content } from "@/assets/type/PostContent";
import PostForm from "@/components/layout/post/PostForm";

export const FormControlContext = createContext<{ control: Control<z.infer<typeof postFormSchema>> } | null>(null);

const Write = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const postElements = useAtomValue(postElementsAtom);
  const { control, handleSubmit: handleSubmitWrite } = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof postFormSchema>) => {
    const { title } = data;

    if (postElements.length === 0) {
      setToast({ message: "내용을 입력해주세요.", type: "error" });
      return;
    }
    try {
      const contents = await Promise.all(postElements.map(async (element): Promise<Content> => {
        if (element.type === "paragraph") {
          return {
            content: element.content,
            contentType: "TEXT",
          }
        } else {
          const presignedUrl = await getPresignedUrl(encodeURIComponent(element.file!.name));
          console.log("presignedUrl:", presignedUrl);
          const uploadImageResponse = await uploadImage(element.file!, presignedUrl.data);
          console.log("uploadImageResponse:", uploadImageResponse);
          return {
            content: presignedUrl.data.split("?")[0],
            contentType: "IMAGE", 
          }
        }
      }));

      const response = await postBlog(title, contents);
      if (response.error) {
        setToast({ message: response.message, type: "error" });
        return;
      }
      setToast({ message: "블로그 작성에 성공했습니다!", type: "success" });
      setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
      }, 1000);
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Header type="write" onPublish={handleSubmitWrite(onSubmit)} />
      {toast && <Toast key={Date.now()} message={toast.message} type={toast.type} />}
      <PostForm FormControl={control} />
    </>
  );
};

export default Write;
