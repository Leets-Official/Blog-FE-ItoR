import SignupForm from '@/components/auth/signup/SignupForm';
import SignupTitle from '@/components/auth/signup/SignupTitle';
import Header from '@/components/layout/header/Header';

const Signup = () => {
  return (
    <>
      <Header type='None' />
      <SignupTitle />
      <SignupForm />
    </>
  );
};

export default Signup;
