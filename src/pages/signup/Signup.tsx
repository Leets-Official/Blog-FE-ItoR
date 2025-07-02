import SignupForm from '@/components/signup/SignupForm';
import SignupTitle from '@/components/signup/SignupTitle';
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
