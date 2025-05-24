import { getPostDetail } from "@/api/post/post";
import { useParams } from "react-router-dom";
import { updatePost } from "@/api/post/post";
import { useNavigate } from "react-router-dom";
import Header from "@/components/layout/header/Header";
import { postFormSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import Toast from "@/components/ui/Toast";
import { postElementsAtom } from "@/Atoms/atoms";
import { useAtom } from "jotai";
import { Content } from "@/assets/type/PostContent";
import PostForm from "@/components/layout/post/PostForm";
import { uploadImage } from "@/api/convertImage";
import { getPresignedUrl } from "@/api/convertImage";


const Update = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const { id } = useParams();
  const [postElements, setPostElements] = useAtom(postElementsAtom);
  const { control: controlUpdate, handleSubmit: handleSubmitUpdate, setValue } = useForm<z.infer<typeof postFormSchema>>({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: "",
    },
  });

  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!id) return;
      try {
        const response = await getPostDetail(id);
        if (response.code === 200) {
          setValue("title", response.data.title);
          setPostElements(response.data.contents.map((content: Content) => ({
            type: content.contentType === "TEXT" ? "paragraph" : "image",
            content: content.content,
            url: content.contentType === "IMAGE" ? content.content : "",
          })));
        }
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchBlogDetail();
  }, []);

  const onSubmit = async (data: z.infer<typeof postFormSchema>) => {
    const { title } = data;
    try {
      const contents = await Promise.all(postElements.map(async (element): Promise<Content> => {
        if (element.type === "paragraph") {
          return {
            content: element.content,
            contentType: "TEXT",
          }
        } else {
          if (element.file) {
            const presignedUrl = await getPresignedUrl(encodeURIComponent(element.file!.name));
            console.log("presignedUrl:", presignedUrl);
            const uploadImageResponse = await uploadImage(element.file!, presignedUrl.data);
            console.log("uploadImageResponse:", uploadImageResponse);
            return {
              content: presignedUrl.data.split("?")[0],
              contentType: "IMAGE",
            }
          } else {
            return {
              content: element.url!,
              contentType: "IMAGE",
            }
          }
        }
      }));
      const response = await updatePost(id as string, title, contents);
      if (response.error) {
        setToast({ message: response.message, type: "error" });
      } else {
        setToast({ message: "저장되었습니다!", type: "success" });
        setTimeout(() => {
          navigate(`/detail/${id}`, { replace: true });
        }, 1000);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <>
      <Header type="write" onPublish={handleSubmitUpdate(onSubmit)} />
      {toast && <Toast key={Date.now()} message={toast.message} type={toast.type} />}
      <PostForm FormControl={controlUpdate} />
    </>
  );
};

export default Update;
