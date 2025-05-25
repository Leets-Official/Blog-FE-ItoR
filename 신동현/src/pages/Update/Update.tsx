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
import { Content, PostAtom, PostContent } from "@/type/Post/Post";
import PostForm from "@/components/layout/post/PostForm";
import { uploadImage } from "@/api/convertImage";
import { getPresignedUrl } from "@/api/convertImage";
import { useMutation, useQuery } from "@tanstack/react-query";


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

  const queryKey = ["post", id];
  const queryFn = () => getPostDetail(id as string);

  const { data, isLoading, error } = useQuery<PostContent>({
    queryKey,
    queryFn,
    });

  useEffect(() => {
    if (isLoading || !data) return;
    setValue("title", data.title);
    setPostElements(data.contents.map((content: Content) => ({
      type: content.contentType === "TEXT" ? "paragraph" : "image",
      content: content.content,
      url: content.contentType === "IMAGE" ? content.content : "",
    })));
  }, [data, isLoading, setValue, setPostElements]);

  const createSubmitData = async (postElements: PostAtom[]) => {
    const contents = await Promise.all(postElements.map(async (element, index): Promise<Content> => {
      if (element.type === "paragraph") {
        return {
          contentOrder: (index + 1).toString(),
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
            contentOrder: (index + 1).toString(),
            content: presignedUrl.data.split("?")[0],
            contentType: "IMAGE",
          }
        } else {
          return {
            contentOrder: (index + 1).toString(),
            content: element.url!,
            contentType: "IMAGE",
          }
        }
      }
    }));
    return contents;
  }

  const postBlogMutation = useMutation({
    mutationFn: (data: { title: string; contents: Content[] }) => updatePost(id as string, data.title, data.contents),
    onSuccess: () => {
      setToast({ message: "저장되었습니다!", type: "success" });
      setTimeout(() => {
        navigate(`/detail/${id}`, { replace: true });
      }, 1000);
    },
    onError: () => {
      setToast({ message: "저장에 실패했습니다.", type: "error" });
    },
  });

  const onSubmit = async (data: z.infer<typeof postFormSchema>) => {
    const { title } = data;
    const contents = await createSubmitData(postElements);
    postBlogMutation.mutate({ title, contents });
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <Header type="write" onPublish={handleSubmitUpdate(onSubmit)} />
      {toast && <Toast key={Date.now()} message={toast.message} type={toast.type} />}
      <PostForm FormControl={controlUpdate} />
    </>
  );
};

export default Update;
