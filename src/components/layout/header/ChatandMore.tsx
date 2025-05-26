import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { Chat, MoreVert } from '@/assets';
import styled from 'styled-components';
import Modal from '@/components/ui/Modal';
import useDropdown from '@/hooks/useDropdown';
import Dropdown from '@/components/ui/Dropdown';
import { useToast } from '@/components/ui/Toast';
import { deletePost } from '@/api/blog/postDetailAPI';
import { BlogPostDetail } from '@/types/blogPost';

interface ChatandMoreProps {
  commentRef?: React.RefObject<HTMLDivElement | null>;
  postId?: string;
  post?: BlogPostDetail;
}

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
`;

const IconWrapper = styled.div`
  padding: 8px;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const ChatandMore = ({ commentRef, postId, post }: ChatandMoreProps) => {
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const { isOpen, toggleDropdown, closeDropdown } = useDropdown();
  const { showToast } = useToast();
  const navigate = useNavigate();

  const handleDropdownSelect = (item: string) => {
    if (item === '삭제하기') {
      setModalOpen(true);
    } else if (item === '수정하기') {
      if (postId) {
        navigate(`/blog/editor/${postId}`, {
          state: {
            postId,
            title: post?.title,
            contents: post?.contents,
          },
        });
      }
    }
    closeDropdown();
  };

  const handleConfirmDelete = async () => {
    if (!postId) {
      showToast('삭제할 게시글이 없습니다.', 'negative');
      return;
    }

    try {
      await deletePost(postId);
      setModalOpen(false);
      showToast('삭제가 완료되었습니다!', 'positive');
      navigate('/');
    } catch (error) {
      console.error('삭제 실패:', error);
      showToast('삭제에 실패했습니다. 다시 시도해주세요.', 'negative');
    }
  };

  const scrollToComments = () => {
    commentRef?.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // 바깥 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, closeDropdown]);

  return (
    <>
      <Container>
        <IconWrapper onClick={scrollToComments}>
          <Chat width={24} height={24} />
        </IconWrapper>
        <IconWrapper onClick={toggleDropdown}>
          <MoreVert width={24} height={24} />
        </IconWrapper>
      </Container>
      {post?.isOwner && isOpen && (
        <Dropdown
          ref={dropdownRef}
          isOpen={isOpen}
          menuItems={['수정하기', '삭제하기']}
          onSelect={handleDropdownSelect}
        />
      )}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        onConfirm={handleConfirmDelete}
        title='해당 블로그를 삭제하시겠어요?'
        description='삭제된 블로그는 다시 확인할 수 없어요.'
        LeftButtonText='취소'
        RightButtonText='삭제하기'
        RightButtonColor='#FF5A5A'
      />
    </>
  );
};

export default ChatandMore;
