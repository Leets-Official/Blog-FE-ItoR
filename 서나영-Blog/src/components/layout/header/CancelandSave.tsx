import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/Toast';
import {
  updateUserInfo,
  updateNickname,
  updatePassword,
  updateProfilePicture,
} from '@/api/user/userAPI';
import { UpdateUserInfoRequest } from '@/types/user';

type TextType = 'Cancel' | 'Save';

type CancelandSaveProps = {
  editData?: UpdateUserInfoRequest;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const Text = styled.p<{ type: TextType }>`
  font-size: 14px;
  letter-spacing: -0.07px;
  padding: 8px 12px;
  color: ${({ type }) => (type === 'Cancel' ? '#FF3F3F' : '#000')};
  cursor: pointer;
`;

const CancelandSave = ({ editData }: CancelandSaveProps) => {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleCancel = () => {
    navigate(-1);
  };

  const handleSave = async () => {
    try {
      if (!editData) return;

      const { nickname, profilePicture, password, confirmPassword, ...rest } = editData;
      const localUpdates: Record<string, string> = {};
      const hasOtherData = Object.values(rest).some((v) => v !== '');

      if (password && confirmPassword && !hasOtherData && !nickname && !profilePicture) {
        await updatePassword(password);
      }

      if (!hasOtherData && nickname && !profilePicture && !password) {
        await updateNickname(nickname);
        localUpdates.nickname = nickname;
      }

      if (!hasOtherData && !nickname && profilePicture && !password) {
        await updateProfilePicture(profilePicture);
        localUpdates.profilePicture = profilePicture;
      }

      if (hasOtherData) {
        const userInfoUpdateData: UpdateUserInfoRequest = {
          ...editData,
        };

        await updateUserInfo(userInfoUpdateData);

        if (nickname) localUpdates.nickname = nickname;
        if (profilePicture) localUpdates.profilePicture = profilePicture;
        if (editData.introduction) localUpdates.introduction = editData.introduction;
      }

      // 저장된 항목 localStorage에 반영
      Object.entries(localUpdates).forEach(([key, value]) => {
        localStorage.setItem(key, value);
      });

      showToast('저장되었습니다!', 'positive');
      navigate('/mypage');
    } catch (error: any) {
      showToast(error.response?.data?.message || '저장 중 오류가 발생했습니다.', 'negative');
      console.error('에러:', error.response?.data?.message || error);
    }
  };

  return (
    <Container>
      <Text type='Cancel' onClick={handleCancel}>
        취소하기
      </Text>
      <Text type='Save' onClick={handleSave}>
        저장하기
      </Text>
    </Container>
  );
};

export default CancelandSave;
