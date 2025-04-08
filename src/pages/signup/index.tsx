import { useState } from 'react';
import { Header, SignupHeader, SignupSelection } from '@/components';
import { Flex } from '@/components/common/SideBar/SideBar.styled';
import SignupField from '@/components/signup/SignupField';

const Signup: React.FC = () => {
  const [signupType, setSignupType] = useState<'email' | 'kakao' | null>(null);

  return (
    <Flex>
      <Header variant="default" />
      <SignupHeader title="회원가입" hasSubTitle={signupType !== null} />

      {signupType === null ? (
        <SignupSelection onSelect={(type) => setSignupType(type)} />
      ) : (
        <SignupField signupType={signupType} />
      )}
    </Flex>
  );
};

export default Signup;
