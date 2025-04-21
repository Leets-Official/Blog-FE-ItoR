import styled from 'styled-components';

interface DropdownProps {
  menuItems: string[];
  onSelect?: (item: string) => void;
  isOpen: boolean;
}

const DropdownWrapper = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
`;

const DropdownMenu = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  right: 16px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  width: 160px;
  z-index: 9999;
`;

const MenuItem = styled.div<{ danger?: boolean }>`
  display: flex;
  padding: 12px;
  font-family: 'Noto Sans R';
  font-size: 14px;
  letter-spacing: -0.07px;
  color: ${({ danger }) => (danger ? '#FF3F3F' : '#000')};
  cursor: pointer;

  &:hover {
    color: #00a1ff;
  }
`;

const Dropdown = ({ menuItems, isOpen, onSelect }: DropdownProps) => {
  if (!isOpen) return null;

  return (
    <DropdownWrapper>
      <DropdownMenu>
        {menuItems.map((item, index) => (
          <MenuItem key={index} danger={item === '삭제하기'} onClick={() => onSelect?.(item)}>
            {item}
          </MenuItem>
        ))}
      </DropdownMenu>
    </DropdownWrapper>
  );
};

export default Dropdown;
