import { Button } from '@/components/index';
import { DefaultProfileSvg } from '@/assets';
import { Overlay, SidebarWrapper } from './SideBar.styled';
import { useState } from 'react';

interface SideBarProps {
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  return (
    <>
      <Overlay onClick={handleClose} />
      <SidebarWrapper isClosing={isClosing}>
        {/* Todo: 토큰 유무에 따른 컴포넌트 분리 */}
        <DefaultProfileSvg width="64px" height="64px" />
        <div>
          You can make anything by <br /> writing
        </div>
        <Button variant="primary-outline" size="md" rounded="full">
          깃로그 시작하기
        </Button>
      </SidebarWrapper>
    </>
  );
};

export default SideBar;
