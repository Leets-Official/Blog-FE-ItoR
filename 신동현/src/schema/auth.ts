import { z } from "zod";

const signUpEmailSchema = z.object({
  email: z.string().min(1, { message: "이메일을 입력해주세요." }).email({ message: "이메일 형식이 적합하지 않습니다." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }).min(8, { message: "비밀번호는 최소 8글자 입니다." }).max(20, { message: "비밀번호는 최대 20글자 입니다." }),
  passwordCheck: z.string().min(1, { message: "비밀번호 확인을 입력해주세요." }).min(8, { message: "비밀번호는 최소 8글자 입니다." }).max(20, { message: "비밀번호는 최대 20글자 입니다." }),
  name: z.string().min(1, { message: "이름을 입력해주세요." }).max(10, { message: "이름은 최대 10글자 입니다." }),
  birth: z.string().min(1, { message: "생년월일을 입력해주세요." }).refine((value) => {
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
    return birthRegex.test(value);
  }, { message: "생년월일 형식이 적합하지 않습니다." }),
  nickname: z.string().min(1, { message: "닉네임을 입력해주세요." }).max(20, { message: "닉네임은 최대 20글자 입니다." }),
  bio: z.string().min(1, { message: "한 줄 소개를 입력해주세요." }).max(50, { message: "한 줄 소개는 최대 50글자 입니다." }),
}).refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"]
});

const signUpSocialSchema = z.object({
  nickname: z.string().min(1, { message: "닉네임을 입력해주세요." }).max(20, { message: "닉네임은 최대 20글자 입니다." }),
  birth: z.string().min(1, { message: "생년월일을 입력해주세요." }).refine((value) => {
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
    return birthRegex.test(value);
  }, { message: "생년월일 형식이 적합하지 않습니다." }),
  bio: z.string().min(1, { message: "한 줄 소개를 입력해주세요." }).max(50, { message: "한 줄 소개는 최대 50글자 입니다." }),
});

export { signUpEmailSchema, signUpSocialSchema };
