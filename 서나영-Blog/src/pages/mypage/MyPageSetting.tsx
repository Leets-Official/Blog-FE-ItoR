import Header from '@/components/layout/header/Header';
import MyPageTitle from '@/components/mypage/MyPageTitle';
import MyPageForm from '@/components/mypage/MyPageForm';
import styled from 'styled-components';
import { useState } from 'react';
import { fetchMyInfo } from '@/api/user/userAPI';
import { useQuery } from '@tanstack/react-query';
import { UpdateUserInfoRequest } from '@/types/user';

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
  const [editData, setEditData] = useState<UpdateUserInfoRequest>({
    nickname: '',
    introduction: '',
    profilePicture: '',
    password: '',
    birthDate: '',
    name: '',
  });

  const {
    data: userInfo,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ['myInfo'],
    queryFn: fetchMyInfo,
    staleTime: 1000 * 60 * 5, // 5분 동안 캐시 유지
  });

  const handleEditClick = () => {
    setIsEditable(true);
    setHeaderType('CancelandSave');
  };

  if (isLoading) return <div>로딩 중...</div>;
  if (isError || !userInfo) return <div>유저 정보를 불러오는 데 실패했습니다.</div>;

  return (
    <MyPageSettingContainer>
      <Header type={headerType} onEditClick={handleEditClick} editData={editData} />
      {userInfo && (
        <>
          <MyPageTitle isMyPageSetting editable={isEditable} setEditData={setEditData} />
          <MyPageForm editable={isEditable} userInfo={userInfo} setEditData={setEditData} />
        </>
      )}
    </MyPageSettingContainer>
  );
};

export default MyPageSetting;
