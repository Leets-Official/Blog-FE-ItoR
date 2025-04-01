import { useState } from 'react';
import styled from 'styled-components';
import ProfileUpload from './ProfileUpload';
import SignupInput from './SignupInput';
import Button from '@/components/ui/Button';

const FormContainer = styled.div`
  width: 100%;
  max-width: 688px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  padding: 12px;
`;

const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  padding: 8px 12px;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  margin-bottom: 64px;
`;

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [nickname, setNickname] = useState('');
  const [bio, setBio] = useState('');

  return (
    <FormContainer>
      <ProfileUpload />
      <SignupInput
        name='email'
        label='이메일'
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder='이메일'
      />
      <SignupInput
        name='password'
        label='비밀번호'
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder='비밀번호'
      />
      <SignupInput
        name='confirmPassword'
        label='비밀번호 확인'
        type='password'
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        placeholder='비밀번호 확인'
      />
      <SignupInput
        name='name'
        label='이름'
        type='text'
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder='이름'
      />
      <SignupInput
        name='birthDate'
        label='생년월일'
        type='date'
        value={birthDate}
        onChange={(e) => setBirthDate(e.target.value)}
        placeholder='YYYY-MM-DD'
      />
      <SignupInput
        name='nickname'
        label='닉네임'
        type='text'
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
        placeholder='닉네임'
      />
      <SignupInput
        name='bio'
        label='한 줄 소개'
        type='text'
        value={bio}
        onChange={(e) => setBio(e.target.value)}
        placeholder='한 줄 소개'
      />
      <ButtonWrapper>
        <Button
          width='100%'
          onClick={() => console.log('회원가입')}
          style={{
            color: '#00A1FF',
            borderRadius: '25px',
            backgroundColor: '#FFF',
            border: '1px solid #00A1FF',
          }}
        >
          회원가입 완료
        </Button>
      </ButtonWrapper>
    </FormContainer>
  );
};

export default SignupForm;
