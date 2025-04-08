import styled from 'styled-components';
import MyPageTitle from '@/components/mypage/MyPageTitle';
import Home from '@/pages/Home';

const MyPageContainer = styled.div`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
`;

const MyPage = () => {
  return (
    <MyPageContainer>
      <MyPageTitle />
      <Home />
    </MyPageContainer>
  );
};

export default MyPage;
