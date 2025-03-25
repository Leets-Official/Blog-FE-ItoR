import HamburgerSvg from '@/assets/icon/ic_hamburger.svg?react';
import LogoSvg from '@/assets/icon/ic_gitlog_logo.svg?react';
import WriteRight from '@/components/common/Header/WriteRight';
import DetailRight from '@/components/common/Header/DetailRight';
import ActionRight from '@/components/common/Header/ActionRight';
import { HeaderContainer, SectionWrapper } from '@/components/common/Header/Header.styled';

type HeaderVariant = 'default' | 'write' | 'detail' | 'action';

interface HeaderProps {
  variant?: HeaderVariant;
  onClick?: (action: string) => void;

  // action 타입에만 필요한 props
  negativeLabel?: string;
  confirmLabel?: string;
  onClickNegative?: () => void;
  onClickConfirm?: () => void;
}

const renderRightSection = (
  variant: HeaderVariant,
  onClick?: (action: string) => void,
  negativeLabel?: string,
  confirmLabel?: string,
  onClickNegative?: () => void,
  onClickConfirm?: () => void,
) => {
  switch (variant) {
    case 'write':
      return <WriteRight onClick={onClick} />;
    case 'detail':
      return <DetailRight onClick={onClick} />;
    case 'action':
      return (
        <ActionRight
          negativeLabel={negativeLabel ?? '취소하기'}
          confirmLabel={confirmLabel ?? '저장하기'}
          onClickNegative={onClickNegative ?? (() => {})}
          onClickConfirm={onClickConfirm ?? (() => {})}
        />
      );
    default:
      return null;
  }
};

const Header: React.FC<HeaderProps> = ({
  variant = 'default',
  onClick,
  negativeLabel,
  confirmLabel,
  onClickConfirm,
  onClickNegative,
}) => {
  return (
    <HeaderContainer>
      <SectionWrapper>
        <HamburgerSvg onClick={() => alert('사이드바 열림')} />
        <LogoSvg />
      </SectionWrapper>
      <SectionWrapper>
        {renderRightSection(
          variant,
          onClick,
          negativeLabel,
          confirmLabel,
          onClickNegative,
          onClickConfirm,
        )}
      </SectionWrapper>
    </HeaderContainer>
  );
};

export default Header;
