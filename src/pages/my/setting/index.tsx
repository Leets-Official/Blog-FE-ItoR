import { Header, Input } from '@/components';
import ProfileSection from '@/components/my/ProfileSection';

const MyPageSetting = () => {
  const handleEdit = () => {};
  return (
    <div>
      <Header variant="action" confirmLabel="수정하기" onClickConfirm={handleEdit} />
      <ProfileSection />
    </div>
  );
};

export default MyPageSetting;
