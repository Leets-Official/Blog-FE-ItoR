import styled from 'styled-components';
import { Text } from '@/components/home/PostItem';
import { flexColumn } from '@/styles/common.styled';

interface SignupHeaderProps {
  title: string;
  hasSubTitle?: boolean;
}

export const HeaderContainer = styled.div`
  background-color: ${({ theme }) => theme.COLORS.gray[96]};
  width: 100%;
  margin-top: 72px;
  padding: 32px 0px;
`;

export const Wrapper = styled.div`
  ${flexColumn}
  gap:12px;
  margin: 0 auto;
  width: 890px;
  padding: 20px 100px;
`;

const SignupHeader: React.FC<SignupHeaderProps> = ({ title, hasSubTitle = false }) => {
  return (
    <HeaderContainer>
      <Wrapper>
        <Text fontSize="xl" fontWeight="medium">
          {title}
        </Text>
        {hasSubTitle && (
          <Text color="gray20" fontWeight="light" fontSize="sm">
            가입을 위해 회원님의 정보를 입력해주세요.
          </Text>
        )}
      </Wrapper>
    </HeaderContainer>
  );
};

export default SignupHeader;
