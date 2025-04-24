import { Button, LoginModal, ActionModal } from '@/components';
import { DefaultProfileSvg } from '@/assets';
import {
  Flex,
  FlexRow,
  Overlay,
  SidebarContent,
  SidebarWrapper,
} from '@/components/common/SideBar/SideBar.styled';
import { useState } from 'react';
import { Text } from '@/components/home/PostItem';
import { useNavigate } from 'react-router-dom';

interface SideBarProps {
  onClose: () => void;
}

const SideBar: React.FC<SideBarProps> = ({ onClose }) => {
  const token = localStorage.getItem('accessToken');
  const [isClosing, setIsClosing] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const nav = useNavigate();

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  const handleClick = {
    write: () => nav('/post/write'),
    logout: () => setIsLogoutModalOpen(true),
  };

  return (
    <>
      <Overlay onClick={handleClose} />
      <SidebarWrapper isClosing={isClosing}>
        <SidebarContent>
          <Flex>
            <DefaultProfileSvg width="64px" height="64px" />
            {/* 프로필 섹션 */}
            {token ? (
              <Flex>
                <Text fontSize="xl" fontWeight="medium" color="black">
                  닉네임
                </Text>
                <Text fontSize="sm" fontWeight="light" color="gray20">
                  한 줄 소개
                </Text>
              </Flex>
            ) : (
              <Text color="gray20" fontWeight="light">
                You can make anything by <br /> writing
              </Text>
            )}
          </Flex>

          {/* 버튼 섹션 */}
          {token ? (
            <FlexRow>
              <Button variant="primary-outline" size="md" rounded="full">
                나의 깃로그
              </Button>
              <Button
                variant="primary-outline"
                size="md"
                rounded="full"
                onClick={handleClick.write}
              >
                깃로그 쓰기
              </Button>
            </FlexRow>
          ) : (
            <Button
              variant="primary-outline"
              size="md"
              rounded="full"
              onClick={() => setIsLoginModalOpen(true)}
            >
              깃로그 시작하기
            </Button>
          )}
        </SidebarContent>

        {/* 하단 섹션 */}
        {token && (
          <FlexRow>
            <Button variant="secondary" size="sm" rounded="full">
              설정
            </Button>
            <Button variant="secondary" size="sm" rounded="full" onClick={handleClick.logout}>
              로그아웃
            </Button>
          </FlexRow>
        )}
      </SidebarWrapper>

      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />

      <ActionModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        message="로그아웃을 진행할게요"
        actionText="로그아웃"
        cancelText="취소"
        type="positive"
        onConfirm={() => {
          localStorage.removeItem('accessToken');
          setIsLogoutModalOpen(false);
          window.location.reload();
          nav('/');
        }}
      />
    </>
  );
};

export default SideBar;
