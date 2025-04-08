import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import styled from 'styled-components';
import SignupInput from '../signup/SignupInput';
import { signupSchema, SignupSchema } from '@/schema/auth';

const FormContainer = styled.div`
  width: 100%;
  max-width: 688px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 32px 16px 0px;
  overflow-x: hidden;
  box-sizing: border-box;
  gap: 20px;
`;

const inputFields = [
  { name: 'email', label: '메일', type: 'email', placeholder: '이메일' },
  { name: 'password', label: '비밀번호', type: 'password', placeholder: '비밀번호' },
  {
    name: 'confirmPassword',
    label: '비밀번호 확인',
    type: 'password',
    placeholder: '비밀번호 확인',
  },
  { name: 'name', label: '이름', type: 'text', placeholder: '이름' },
  { name: 'birthDate', label: '생년월일', type: 'date', placeholder: 'YYYY-MM-DD' },
];

const MyPageForm = ({ editable = false }: { editable?: boolean }) => {
  const {
    register,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(signupSchema),
    mode: 'onBlur',
  });

  return (
    <FormContainer>
      {inputFields.map((field) => {
        const isAlwaysDisabled = field.name === 'email' || field.name === 'name';
        return (
          <SignupInput
            key={field.name}
            name={field.name}
            label={field.label}
            type={field.type}
            placeholder={field.placeholder}
            error={errors[field.name as keyof SignupSchema]?.message}
            register={register}
            disabled={isAlwaysDisabled || !editable}
            isMyPage
          />
        );
      })}
    </FormContainer>
  );
};

export default MyPageForm;
