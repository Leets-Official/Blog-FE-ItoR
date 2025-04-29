import Header from '@/components/layout/header/Header';
import MyPageTitle from '@/components/mypage/MyPageTitle';
import MyPageForm from '@/components/mypage/MyPageForm';
import styled from 'styled-components';
import { useState } from 'react';

const MyPageSettingContainer = styled.div`
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 70px;
`;

const MyPageSetting = () => {
  const [isEditable, setIsEditable] = useState(false);
  const [headerType, setHeaderType] = useState<'Edit' | 'CancelandSave'>('Edit');

  const handleEditClick = () => {
    setIsEditable(true);
    setHeaderType('CancelandSave');
  };

  return (
    <MyPageSettingContainer>
      <Header type={headerType} onEditClick={handleEditClick} />
      <MyPageTitle isMyPageSetting editable={isEditable} />
      <MyPageForm editable={isEditable} />
    </MyPageSettingContainer>
  );
};

export default MyPageSetting;
