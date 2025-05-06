import { Outlet, useNavigate } from "react-router-dom";
import Header from "@/components/layout/header/Header";
import { writeSchema } from "@/schema/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Control } from "react-hook-form";
import { z } from "zod";
import { createContext, useEffect, useState } from "react";
import { postBlog } from "@/api/post";
import Toast from "@/components/ui/Toast";

export const FormControlContext = createContext<{ control: Control<z.infer<typeof writeSchema>> } | null>(null);

const Write = () => {
  const navigate = useNavigate();
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);  
  const { control: controlWrite, handleSubmit: handleSubmitWrite, formState: { errors } } = useForm<z.infer<typeof writeSchema>>({
    resolver: zodResolver(writeSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });

  useEffect(() => {
    if (errors.content) {
      setToast({ message: "내용을 입력해주세요.", type: "error" });
    } else {
      setToast(null);
    }
  }, [errors.content]);

  const onSubmit = async (data: z.infer<typeof writeSchema>) => {
    const { title, content } = data;
    try {
      const response = await postBlog(title, content, 1, "TEXT");
      if (response.error) {
        setToast({ message: response.message, type: "error" });
      } else {
        setToast({ message: "블로그 작성에 성공했습니다!", type: "success" });
        setTimeout(() => {
          navigate("/", { replace: true });
        }, 1000);
      }
    } catch (error: any) {
      console.log(error);
    }
  };

  return (
    <FormControlContext.Provider value={{ control: controlWrite }}>
      <Header type="write" onPublish={handleSubmitWrite(onSubmit)} />
      {toast && <Toast key={Date.now()} message={toast.message} type={toast.type} />}
      <Outlet />
    </FormControlContext.Provider>
  );
};

export default Write;
