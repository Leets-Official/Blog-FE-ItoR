import CommentSvg from '@/assets/icon/ic_comment.svg?react';
import MeatballSvg from '@/assets/icon/ic_column_meatball.svg?react';
import { SectionWrapper } from './Header';

const DetailRight: React.FC<{ onClick?: (action: string) => void }> = ({ onClick }) => {
  return (
    <SectionWrapper>
      <CommentSvg onClick={() => onClick?.('comment')} />
      <MeatballSvg onClick={() => onClick?.('meatball')} />
    </SectionWrapper>
  );
};

export default DetailRight;
