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
import { Content, PostAtom } from "@/type/Post/Post";
import PostForm from "@/components/layout/post/PostForm";
import { useMutation } from "@tanstack/react-query";

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

  const createSubmitData = async (postElements: PostAtom[]) => {
    const contents = await Promise.all(postElements.map(async (element, index): Promise<Content> => { 
      if (element.type === "paragraph") {
        return {
          contentOrder: (index + 1).toString(),
          content: element.content,
          contentType: "TEXT",
        }
      } else {
        const presignedUrl = await getPresignedUrl(encodeURIComponent(element.file!.name));
        await uploadImage(element.file!, presignedUrl.data);
        return {
          contentOrder: (index + 1).toString(),
          content: presignedUrl.data.split("?")[0],
          contentType: "IMAGE",
        }
      }
    }));
    return contents;
  }
  const postBlogMutation = useMutation({
    mutationFn: (data: { title: string; contents: Content[] }) => postBlog(data.title, data.contents),
    onSuccess: () => {
      setToast({ message: "블로그 작성에 성공했습니다!", type: "success" });
      setTimeout(() => {
        navigate("/", { replace: true });
        window.location.reload();
      }, 1000);
    },
    onError: () => {
      setToast({ message: "블로그 작성에 실패했습니다.", type: "error" });
    },
  });
  
  const onSubmit = async (data: z.infer<typeof postFormSchema>) => {
    const { title } = data;

    if (postElements.length === 0) {
      setToast({ message: "내용을 입력해주세요.", type: "error" });
      return;
    }
    const contents = await createSubmitData(postElements);
    postBlogMutation.mutate({ title, contents });
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
