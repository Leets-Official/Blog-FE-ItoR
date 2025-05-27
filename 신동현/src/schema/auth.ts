import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "이메일 형식이 적합하지 않습니다." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }).min(8, { message: "비밀번호는 최소 8글자 입니다." }).max(64, { message: "비밀번호는 최대 64글자 입니다." }).refine((value) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;
    return passwordRegex.test(value);
  }, { message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다." }),
});

const signUpEmailSchema = z.object({
  email: z.string().min(1, { message: "이메일을 입력해주세요." }).email({ message: "이메일 형식이 적합하지 않습니다." }),
  password: z.string().min(1, { message: "비밀번호를 입력해주세요." }).min(8, { message: "비밀번호는 최소 8글자 입니다." }).max(64, { message: "비밀번호는 최대 64글자 입니다." }).refine((value) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;
    return passwordRegex.test(value);
  }, { message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다." }),
  passwordCheck: z.string().min(1, { message: "비밀번호 확인을 입력해주세요." }).min(8, { message: "비밀번호는 최소 8글자 입니다." }).max(64, { message: "비밀번호는 최대 64글자 입니다." }).refine((value) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/;
    return passwordRegex.test(value);
  }, { message: "비밀번호는 영문, 숫자, 특수문자를 포함해야 합니다." }),
  name: z.string().min(1, { message: "이름을 입력해주세요." }).max(10, { message: "이름은 최대 10글자 입니다." }).refine((value) => {
    const nameRegex = /^[가-힣]{1,10}$/;
    return nameRegex.test(value);
  }, { message: "이름은 한글만 가능합니다." }),
  birth: z.string().min(1, { message: "생년월일을 입력해주세요." }).refine((value) => {
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
    return birthRegex.test(value);
  }, { message: "생년월일 형식이 적합하지 않습니다." }),
  nickname: z.string().min(1, { message: "닉네임을 입력해주세요." }).max(20, { message: "닉네임은 최대 20글자 입니다." }).refine((value) => {
    const nicknameRegex = /^[a-zA-Z0-9]{1,20}$/;
    return nicknameRegex.test(value);
  }, { message: "닉네임은 영문, 숫자만 가능합니다." }),
  bio: z.string().min(1, { message: "한 줄 소개를 입력해주세요." }).max(50, { message: "한 줄 소개는 최대 50글자 입니다." }),
}).refine((data) => data.password === data.passwordCheck, {
  message: "비밀번호가 일치하지 않습니다.",
  path: ["passwordCheck"]
});

const signUpSocialSchema = z.object({
  email: z.string().min(1, { message: "이메일을 입력해주세요." }).email({ message: "이메일 형식이 적합하지 않습니다." }),
  nickname: z.string().min(1, { message: "닉네임을 입력해주세요." }).max(20, { message: "닉네임은 최대 20글자 입니다." }).refine((value) => {
    const nicknameRegex = /^[a-zA-Z0-9]{1,20}$/;
    return nicknameRegex.test(value);
  }, { message: "닉네임은 영문, 숫자만 가능합니다." }),
  birth: z.string().min(1, { message: "생년월일을 입력해주세요." }).refine((value) => {
    const birthRegex = /^\d{4}-\d{2}-\d{2}$/;
    return birthRegex.test(value);
  }, { message: "생년월일 형식이 적합하지 않습니다." }),
  bio: z.string().min(1, { message: "한 줄 소개를 입력해주세요." }).max(50, { message: "한 줄 소개는 최대 50글자 입니다." }),
});

const postFormSchema = z.object({
  title: z.string().min(1, { message: "제목을 입력해주세요." }).max(100, { message: "제목은 최대 100글자 입니다." }),
});

const commentSchema = z.object({
  content: z.string().min(1, { message: "댓글을 입력해주세요." }).max(1000, { message: "댓글은 최대 1000글자 입니다." }),
});

export { loginSchema, signUpEmailSchema, signUpSocialSchema, postFormSchema, commentSchema };
