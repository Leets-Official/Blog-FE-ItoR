import { CommentSvg, MeatballSvg } from '@/assets';
import { SectionWrapper } from '@/components/common/Header/Header.styled';
import { useState } from 'react';
import DetailModal from '../Modal/DetailModal';

const DetailRight: React.FC<{ onClick?: (action: string) => void }> = ({ onClick }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const handleAction = (action: 'edit' | 'delete') => {
    onClick?.(action);
    setIsModalOpen(false);
  };

  const handleCommentClick = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
    onClick?.('comment');
  };

  return (
    <SectionWrapper>
      <CommentSvg onClick={handleCommentClick} />
      <MeatballSvg onClick={handleModalOpen} />

      {isModalOpen && <DetailModal onClose={() => setIsModalOpen(false)} onAction={handleAction} />}
    </SectionWrapper>
  );
};

export default DetailRight;
