import { Chat, MoreVert } from '@/assets';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const ChatandMore = () => (
  <Container>
    <Chat
      width='24px'
      height='24px'
      style={{
        padding: '8px',
        alignItems: 'center',
      }}
    />
    <MoreVert
      width='24px'
      height='24px'
      style={{
        padding: '8px',
        alignItems: 'center',
      }}
    />
  </Container>
);

export default ChatandMore;
