import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GITLOG, Reorder } from '@/assets';
import ChatandMore from '@/components/layout/header/ChatandMore';
import DelandCreate from '@/components/layout/header/DelandCreate';
import CancelandSave from '@/components/layout/header/CancelandSave';
import Button from '@/components/ui/Button';
import Sidebar from '@/components/layout/sidebar/Sidebar';
import styled from 'styled-components';
import { BlogPostDetail, Block } from '@/types/blogPost';
import { UpdateUserInfoRequest } from '@/types/user';

type HeaderType = 'DelandCreate' | 'ChatandMore' | 'CreateLog' | 'Edit' | 'CancelandSave' | 'None';

interface HeaderProps {
  type: HeaderType;
  onEditClick?: () => void;
  navigateEditor?: ReturnType<typeof useNavigate>;
  title?: string;
  content?: string;
  blocks?: Block[];
  commentRef?: React.RefObject<HTMLDivElement | null>;
  postId?: string;
  post?: BlogPostDetail;
  editData?: UpdateUserInfoRequest;
}

const HeaderContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 72px;
  padding: 16px 16px 16px 12px;

  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(2px);
  border-bottom: 1px solid #f5f5f5;
  box-sizing: border-box;
`;

const HeaderLeftSection = styled.div`
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  gap: 10px;
`;

const HeaderRightSection = styled.div`
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);

  display: flex;
  align-items: center;
  gap: 10px;
`;

const getRightComponent = ({
  type,
  onEditClick,
  navigateEditor,
  title,
  content,
  blocks,
  commentRef,
  postId,
  post,
  editData,
}: HeaderProps) => {
  switch (type) {
    case 'CreateLog':
      return (
        <Button
          type='Create'
          iconFill='#909090'
          onClick={() => navigateEditor?.('/blog/editor')}
          style={{ color: '#909090', border: 'none', backgroundColor: 'transparent' }}
        >
          깃로그 쓰기
        </Button>
      );
    case 'DelandCreate':
      return (
        <DelandCreate
          title={title ?? ''}
          content={content ?? ''}
          blocks={blocks ?? []}
          postId={postId}
        />
      );
    case 'ChatandMore':
      return <ChatandMore commentRef={commentRef} postId={postId} post={post} />;
    case 'CancelandSave':
      return <CancelandSave editData={editData} />;
    case 'Edit':
      return (
        <Button type='None' style={{ color: '#000', border: 'none' }} onClick={onEditClick}>
          수정하기
        </Button>
      );
    case 'None':
      return null;
    default:
      return null;
  }
};

const Header = ({
  type,
  onEditClick,
  title,
  content,
  blocks,
  commentRef,
  postId,
  post,
  editData,
}: HeaderProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

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
          <GITLOG
            width='67px'
            height='28px'
            fill='#000'
            style={{ padding: '6px 5px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          />
        </HeaderLeftSection>
        <HeaderRightSection>
          {getRightComponent({
            type,
            onEditClick,
            navigateEditor: navigate,
            title,
            content,
            blocks,
            commentRef,
            postId,
            post,
            editData,
          })}
        </HeaderRightSection>
      </HeaderContainer>

      {/* Sidebar 컴포넌트 */}
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        onLogout={() => {
          setIsSidebarOpen(false);
        }}
      />
    </>
  );
};
export default Header;
