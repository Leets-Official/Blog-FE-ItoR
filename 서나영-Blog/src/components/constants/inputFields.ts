export type InputField = {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  disabled?: boolean;
};

export const getInputFields = (isKakaoLogin: boolean): InputField[] => {
  const commonFields: InputField[] = [
    {
      name: 'birthDate',
      label: '생년월일',
      type: 'date',
      placeholder: 'YYYY-MM-DD',
    },
    {
      name: 'nickname',
      label: '닉네임',
      type: 'text',
      placeholder: '닉네임',
    },
    {
      name: 'introduction',
      label: '한 줄 소개',
      type: 'text',
      placeholder: '한 줄 소개',
    },
  ];

  const kakaoFields: InputField[] = [
    {
      name: 'email',
      label: '이메일',
      type: 'email',
      placeholder: '이메일',
    },
    {
      name: 'name',
      label: '이름',
      type: 'text',
      placeholder: '이름',
    },
  ];

  const normalFields: InputField[] = [
    {
      name: 'email',
      label: '이메일',
      type: 'email',
      placeholder: '이메일',
    },
    {
      name: 'password',
      label: '비밀번호',
      type: 'password',
      placeholder: '비밀번호',
    },
    {
      name: 'confirmPassword',
      label: '비밀번호 확인',
      type: 'password',
      placeholder: '비밀번호 확인',
    },
    {
      name: 'name',
      label: '이름',
      type: 'text',
      placeholder: '이름',
    },
  ];

  return [...(isKakaoLogin ? kakaoFields : normalFields), ...commonFields];
};
