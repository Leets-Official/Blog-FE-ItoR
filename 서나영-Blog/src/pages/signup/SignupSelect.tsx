import SignupTitle from '@/components/signup/SignupTitle';
import Header from '@/components/layout/header/Header';
import SignupOption from '@/components/signup/SignupOption';

const SignupSelect = () => {
  return (
    <>
      <Header type='None' />
      <SignupTitle hideDescription />
      <SignupOption />
    </>
  );
};

export default SignupSelect;
