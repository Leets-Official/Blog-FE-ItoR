import { z } from 'zod';

const today = new Date();

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: '반드시 입력해야하는 필수 사항입니다.' })
    .email({ message: '이메일 형식이 적합하지 않습니다.' }),

  password: z.string().min(1, { message: '반드시 입력해야하는 필수 사항입니다.' }),
});

const baseSignupSchema = z.object({
  email: z
    .string()
    .min(1, { message: '반드시 입력해야하는 필수 사항입니다.' })
    .email({ message: '이메일 형식이 적합하지 않습니다.' }),

  password: z.string().min(1, { message: '반드시 입력해야하는 필수 사항입니다.' }),
  confirmPassword: z.string().min(1, { message: '반드시 입력해야하는 필수 사항입니다.' }),
  name: z.string().min(1, { message: '반드시 입력해야하는 필수 사항입니다.' }),
  nickname: z
    .string()
    .min(1, { message: '반드시 입력해야하는 필수 사항입니다.' })
    .max(20, { message: '닉네임은 최대 20글자입니다.' }),

  birthDate: z
    .string()
    .min(1, { message: '반드시 입력해야하는 필수 사항입니다.' })
    .refine(
      (date) => {
        const InputDate = new Date(date);
        return InputDate < today;
      },
      {
        message: `${today.getFullYear()}년 ${today.getMonth() + 1}월 ${today.getDate()}일 이전의 수만 가능합니다.`,
      },
    ),

  introduction: z.string().max(30, { message: '한 줄 소개는 최대 30글자입니다.' }),
});

export const signupSchema = baseSignupSchema.refine(
  (data) => data.password === data.confirmPassword,
  {
    message: '비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  },
);

export const kakaoSignupSchema = baseSignupSchema.omit({
  password: true,
  confirmPassword: true,
});

export type SignupSchema = z.infer<typeof signupSchema>;
export type LoginSchema = z.infer<typeof loginSchema>;
export type KakaoSignupSchema = z.infer<typeof kakaoSignupSchema>;
