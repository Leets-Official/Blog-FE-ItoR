import SignupForm from '@/components/auth/signup/SignupForm';
import SignupHeader from '@/components/auth/signup/SignupHeader';
import Header from '@/components/layout/header/Header';

const Signup = () => {
  return (
    <>
      <Header type='None' />
      <SignupHeader />
      <SignupForm />
    </>
  );
};

export default Signup;
