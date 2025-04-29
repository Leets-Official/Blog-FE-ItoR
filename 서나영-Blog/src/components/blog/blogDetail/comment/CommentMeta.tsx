import styled from 'styled-components';
import { useState } from 'react';
import { BlogPost } from '@/types/blogPost';
import { formatPostDate } from '@/utils/date';
import { MoreVert, Profile } from '@/assets';
import Modal from '@/components/ui/Modal';
import Dropdown from '@/components/ui/Dropdown';
import useDropdown from '@/hooks/useDropdown';
import { useToast } from '@/components/ui/Toast';

const CommentMetaContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 688px;
  height: 65px;
  padding: 0px 16px;
  align-items: center;
`;

const LeftSection = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 6px;
`;

const ProfileImage = styled.img`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  object-fit: cover;
`;

const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const StyledNickName = styled.div`
  color: #333;
  font-family: 'Noto Sans R';
  font-size: 14px;
  letter-spacing: -0.07px;
`;

const StyledCreatedAt = styled.span`
  color: #909090;
  font-family: 'Noto Sans L';
  font-size: 12px;
  font-weight: 300;
`;

const IconWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

interface CommentMetaProps {
  post: BlogPost;
  isInput?: boolean;
}

const CommentMeta: React.FC<CommentMetaProps> = ({ post, isInput = false }) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const displayName = isInput ? 'Guest' : post.nickName;

  const { showToast } = useToast();
  const { isOpen, toggleDropdown, closeDropdown, ref } = useDropdown();

  const handleDropdownSelect = (item: string) => {
    if (item === '삭제하기') {
      setModalOpen(true);
    }
    closeDropdown();
  };

  const handleConfirmDelete = () => {
    setModalOpen(false);
    console.log('댓글 삭제됨');
    showToast('삭제가 완료되었습니다!', 'positive');
  };

  return (
    <CommentMetaContainer>
      <LeftSection>
        {isInput ? (
          <Profile width={20} height={20} />
        ) : post.profileUrl && post.profileUrl.trim() !== '' ? (
          <ProfileImage src={post.profileUrl} alt='profile' />
        ) : (
          <Profile width={20} height={20} />
        )}

        <TextWrapper>
          <StyledNickName>{displayName}</StyledNickName>
          {!isInput && <StyledCreatedAt>{formatPostDate(post.createdAt)}</StyledCreatedAt>}
        </TextWrapper>
      </LeftSection>

      {!isInput && (
        <IconWrapper ref={ref}>
          <MoreVert
            width={24}
            height={24}
            cursor={'pointer'}
            style={{ padding: '8px' }}
            onClick={toggleDropdown}
          />
          {isOpen && (
            <Dropdown isOpen={isOpen} menuItems={['삭제하기']} onSelect={handleDropdownSelect} />
          )}
        </IconWrapper>
      )}

      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title='댓글을 삭제할까요?'
        LeftButtonText='취소'
        RightButtonText='삭제하기'
        RightButtonColor='#FF5A5A'
      />
    </CommentMetaContainer>
  );
};

export default CommentMeta;
