import { getPostDetail } from "@/api/post/post";
import { useParams } from "react-router-dom";
import { updatePost } from "@/api/post/post";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "@/components/layout/header/Header";
import { writeSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Control } from "react-hook-form";
import { z } from "zod";
import { createContext, useEffect, useState } from "react";
import Toast from "@/components/ui/Toast";
import { PostContent } from "@/assets/type/PostContent";

export const FormControlContext = createContext<{ control: Control<z.infer<typeof writeSchema>> } | null>(null);

const Update = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  const { id } = useParams();
  const [postContent, setPostContent] = useState<PostContent>({
    title: "",
    contentOrder: 0,
    content: "",
    contentType: "",
    nickName: "",
    profileUrl: "",
    createdAt: "",
    commentCount: 0,
  });
  const { control: controlUpdate, handleSubmit: handleSubmitUpdate, formState: { errors }, reset } = useForm<z.infer<typeof writeSchema>>({
    resolver: zodResolver(writeSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    const fetchBlogDetail = async () => {
      if (!id) return;
      try {
        const response = await getPostDetail(id);
        if (response.code === 200) {
          setPostContent({
            title: response.data.title,
            contentOrder: response.data.contents[0].contentOrder,
            content: response.data.contents[0].content,
            contentType: response.data.contents[0].contentType,
            nickName: response.data.nickName,
            profileUrl: response.data.profileUrl,
            createdAt: response.data.createdAt,
            commentCount: response.data.comments.length,
          });
        }
      } catch (error: any) {
        console.error(error);
      }
    };
    fetchBlogDetail();
  }, []);


  useEffect(() => {
    if (errors.content) {
      setToast({ message: "내용을 입력해주세요.", type: "error" });
    } else {
      setToast(null);
    }
  }, [errors.content]);

  useEffect(() => {
    if (postContent) {
      reset({
        title: postContent.title,
        content: postContent.content,
      });
    }
  }, [postContent, reset]);

  const onSubmit = async (data: z.infer<typeof writeSchema>) => {
    const { title, content } = data;
    try {
      const response = await updatePost(id as string, title, content, postContent.contentOrder, postContent.contentType);
      if (response.error) {
        setToast({ message: response.message, type: "error" });
      } else {
        setToast({ message: "블로그 내용을 성공적으로 수정했어요!", type: "success" });
        setTimeout(() => {
          navigate(`/detail/${id}`, { replace: true });
        }, 1000);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <FormControlContext.Provider value={{ control: controlUpdate }}>
      <Header type="write" onPublish={handleSubmitUpdate(onSubmit)} />
      {toast && <Toast key={Date.now()} message={toast.message} type={toast.type} />}
      <Outlet />
    </FormControlContext.Provider>
  );
};

export default Update;
