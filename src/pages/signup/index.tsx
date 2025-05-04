import { Header, SignupHeader, SignupSelection } from '@/components';
import { Flex } from '@/components/common/SideBar/SideBar.styled';
import SignupField from '@/components/signup/SignupField';
import { useParams } from 'react-router-dom';

const Signup: React.FC = () => {
  const { type } = useParams();

  return (
    <Flex>
      <Header variant="default" />
      <SignupHeader title="회원가입" hasSubTitle={type !== undefined} />

      {type === undefined ? (
        <SignupSelection />
      ) : type === 'email' || type === 'kakao' ? (
        <SignupField signupType={type} />
      ) : (
        <div>잘못된 접근입니다.</div>
      )}
    </Flex>
  );
};

export default Signup;
