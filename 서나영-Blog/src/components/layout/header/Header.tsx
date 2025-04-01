import { useState } from 'react';
import { GITLOG, Reorder } from '@/assets';
import ChatandMore from './ChatandMore';
import DelandCreate from './DelandCreate';
import Button from '@/components/ui/Button';
import Sidebar from '../Sidebar/Sidebar';
import styled from 'styled-components';

type HeaderType = 'DelandCreate' | 'ChatandMore' | 'CreateLog' | 'None';

interface HeaderProps {
  type: HeaderType;
}

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  z-index: 1000;
  display: flex;
  width: 100%;
  align-items: center;
  padding: 16px 16px 16px 12px;
  justify-content: space-between;
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(2px);
  border-bottom: 1px solid #f5f5f5;
`;

const HeaderLeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const HeaderRightSection = styled.div`
  display: flex;
  align-items: center;
`;

const getRightComponent = (type: HeaderType) => {
  switch (type) {
    case 'CreateLog':
      return (
        <Button type='Create' style={{ color: '#909090', border: 'none' }}>
          깃로그 쓰기
        </Button>
      );
    case 'DelandCreate':
      return <DelandCreate />;
    case 'ChatandMore':
      return <ChatandMore />;
    case 'None':
      return null;
    default:
      return null;
  }
};

const Header = ({ type }: HeaderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      <HeaderContainer>
        <HeaderLeftSection>
          <Reorder
            width='24px'
            height='24px'
            style={{ padding: '8px', cursor: 'pointer' }}
            onClick={() => setIsSidebarOpen(true)}
          />
          {/* GITLOG 보이지 않음... (수정 예정!!) */}
          <GITLOG width='67px' height='28px' style={{ padding: '6px 5px', cursor: 'pointer' }} />
        </HeaderLeftSection>
        <HeaderRightSection>{getRightComponent(type)}</HeaderRightSection>
      </HeaderContainer>

      {/* Sidebar 컴포넌트 */}
      <Sidebar isOpen={isSidebarOpen} isLogin={true} onClose={() => setIsSidebarOpen(false)} />
    </>
  );
};
export default Header;
