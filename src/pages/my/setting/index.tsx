import { Header, Input } from '@/components';
import ProfileSection from '@/components/my/ProfileSection';
import { settingFields } from '@/constants';
import { flexColumn } from '@/styles/common.styled';
import styled from 'styled-components';
import { getMyInfo } from '@/api/my/my.api';
import { useEffect, useState } from 'react';

const InputWrapper = styled.div`
  ${flexColumn}
  gap: 16px;
  width: 100%;
  padding: 0 30px 60px 30px;
  max-width: 720px;
  margin: 0 auto;
`;

const MyPageSetting = () => {
  const [email, setEmail] = useState('');

  useEffect(() => {
    const fetchMyInfo = async () => {
      try {
        const data = await getMyInfo();
        setEmail(data.email);
      } catch (error) {
        console.error('내 정보를 가져오는 데 실패했습니다.', error);
      }
    };
    fetchMyInfo();
  }, []);

  const handleEdit = () => {};
  return (
    <div>
      <Header variant="action" confirmLabel="수정하기" onClickConfirm={handleEdit} />
      <ProfileSection />
      <InputWrapper>
        {settingFields.map((field) =>
          field.name === 'email' ? (
            <Input
              key="email"
              label="메일"
              value={email}
              readOnly
              readOnlyBgColor="#fff"
              readOnlyTextColor="#c8c8c8"
              readOnlyBorderColor="#c8c8c8"
            />
          ) : (
            <Input
              key={field.name}
              label={field.label}
              placeholder={field.placeholder}
              type={field.type}
              readOnly
              readOnlyBgColor="#fff"
              readOnlyTextColor="#c8c8c8"
              readOnlyBorderColor="#c8c8c8"
            />
          ),
        )}
      </InputWrapper>
    </div>
  );
};

export default MyPageSetting;
