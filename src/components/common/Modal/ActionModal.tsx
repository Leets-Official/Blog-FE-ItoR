import { flexAlignCenter, flexColumn } from '@/styles/common.styled';
import Button from '@/components/common/Button/Button';
import BaseModal from '@/components/common/Modal/BaseModal';
import styled from 'styled-components';
import { Text } from '@/components/home/PostItem';

interface ActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  message: string;
  type?: 'negative' | 'positive';
  actionText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  subMessage?: string;
}

const TitleWrapper = styled.div`
  ${flexColumn}
  gap: 8px;
  margin-top: 16px;
`;

const ButtonWrapper = styled.div`
  ${flexAlignCenter}
  gap: 8px;
  margin-top: 16px;
`;

const Wrapper = styled.div`
  ${flexColumn}
  gap: 16px;
  padding: 24px;
  width: 326px;
  height: auto;
  border-radius: 4px;
  background-color: ${({ theme }) => theme.COLORS.white};
`;

const ActionModal: React.FC<ActionModalProps> = ({
  isOpen,
  onClose,
  message,
  type = 'positive',
  actionText = '로그인하기',
  cancelText = '확인',
  onConfirm,
  subMessage,
}) => {
  return (
    <BaseModal isOpen={isOpen} onRequestClose={onClose}>
      <Wrapper>
        <TitleWrapper>
          <Text fontSize="sm" fontWeight="regular">
            {message}
          </Text>
          {subMessage && (
            <Text fontSize="xs" fontWeight="regular" color="gray56">
              {subMessage}
            </Text>
          )}
        </TitleWrapper>
        <ButtonWrapper>
          <Button variant="text" size="md" rounded="sm" onClick={onClose}>
            {cancelText}
          </Button>
          <Button
            variant={type === 'positive' ? 'primary' : 'negative'}
            size="md"
            rounded="sm"
            onClick={onConfirm}
          >
            {actionText}
          </Button>
        </ButtonWrapper>
      </Wrapper>
    </BaseModal>
  );
};

export default ActionModal;
