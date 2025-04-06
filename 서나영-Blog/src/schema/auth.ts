import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: '* 이메일 형식이 적합하지 않습니다.' }),
  password: z.string().min(6, { message: '* 비밀번호는 최소 6자 이상이어야 합니다.' }),
});

export const signupSchema = z
  .object({
    email: z
      .string()
      .nonempty({ message: '* 반드시 입력해야하는 필수 사항입니다.' })
      .email({ message: '* 이메일 형식이 적합하지 않습니다.' }),
    password: z.string().min(6, { message: '* 비밀번호는 최소 6자 이상이어야 합니다.' }),
    confirmPassword: z.string().min(6, { message: '* 비밀번호는 최소 6자 이상이어야 합니다.' }),
    name: z.string().nonempty({ message: '* 반드시 입력해야하는 필수 사항입니다.' }),
    birthDate: z.string().refine(
      (date) => {
        const today = new Date();
        const enteredDate = new Date(date);
        return enteredDate < today;
      },
      { message: `* ${new Date().toISOString().split('T')[0]} 보다 이전 날짜여야 합니다.` },
    ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: '* 비밀번호가 일치하지 않습니다.',
    path: ['confirmPassword'],
  });

export type LoginSchema = z.infer<typeof loginSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
