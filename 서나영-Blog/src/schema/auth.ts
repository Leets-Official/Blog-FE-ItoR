import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email({ message: '* 이메일 형식이 적합하지 않습니다.' }),
  password: z.string().min(6, { message: '* 비밀번호는 최소 6자 이상이어야 합니다.' }),
});

export const signupSchema = z
  .object({
    email: z.string().email({ message: '* 이메일 형식이 적합하지 않습니다.' }).optional(),

    password: z.string().min(6, { message: '* 비밀번호는 최소 6자 이상이어야 합니다.' }).optional(),
    confirmPassword: z
      .string()
      .min(6, { message: '* 비밀번호는 최소 6자 이상이어야 합니다.' })
      .optional(),

    name: z.string().nonempty({ message: '* 반드시 입력해야하는 필수 사항입니다.' }),

    birthDate: z.string().refine(
      (date) => {
        const today = new Date();
        const enteredDate = new Date(date);
        return enteredDate < today;
      },
      { message: `* ${new Date().toISOString().split('T')[0]} 보다 이전 날짜여야 합니다.` },
    ),

    nickname: z.string().max(20, '* 닉네임은 20자 이내로 입력해주세요.').optional(),
    introduction: z.string().max(50, '한 줄 소개는 50자 이내로 입력해주세요.').optional(),
    profilePicture: z.string().optional(),
  })
  .superRefine((data, ctx) => {
    const isOAuth = !data.password && !data.confirmPassword;

    if (!isOAuth && !data.email) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        path: ['email'],
        message: '* 반드시 입력해야하는 필수 사항입니다.',
      });
    }

    if (!isOAuth) {
      if (!data.password) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['password'],
          message: '* 비밀번호는 필수입니다.',
        });
      }

      if (!data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['confirmPassword'],
          message: '* 비밀번호 확인은 필수입니다.',
        });
      }

      if (data.password !== data.confirmPassword) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          path: ['confirmPassword'],
          message: '* 비밀번호가 일치하지 않습니다.',
        });
      }
    }
  });

export const profileSchema = z.object({
  nickName: z
    .string()
    .min(1, '* 닉네임을 입력해주세요.')
    .max(20, '* 닉네임은 20자 이내로 입력해주세요.'),
  introduction: z.string().max(50, '한 줄 소개는 50자 이내로 입력해주세요.').optional(),
});

export type LoginSchema = z.infer<typeof loginSchema>;
export type SignupSchema = z.infer<typeof signupSchema>;
export type ProfileSchema = z.infer<typeof profileSchema>;
