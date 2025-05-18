import { useUser } from '@/context/UserContext';
import { FooterContent, FooterWrapper } from '@/components/blogDetail/BlogFooter';
import { DefaultProfileSvg } from '@/assets';
import Image from '@/components/common/Image/Image';
import Input from '../common/Input/Input';
import { Text } from '../home/PostItem';
import { useImageUpload } from '@/hooks/useImageUpload';

interface ProfileSectionProps {
  isEditing: boolean;
}

const ProfileSection: React.FC = ({ isEditing }) => {
  const { user } = useUser();
  const { previewUrl, handleImageChange } = useImageUpload();

  return (
    <FooterWrapper>
      <FooterContent>
        {user?.profilePicture ? (
          <Image
            src={user.profilePicture}
            alt="profile-image"
            width="80px"
            height="80px"
            borderRadius="50%"
            objectFit="cover"
          />
        ) : (
          <DefaultProfileSvg width="80px" height="80px" />
        )}
        <div style={{ display: 'flex', gap: '6px', flexDirection: 'column' }}>
          <Input
            type="text"
            value={user?.nickname}
            readOnly
            readOnlyBgColor="#F5F5F5"
            fontSize="xl"
            readOnlyBorderColor="#e6e6e6"
          />
          <Text fontSize="xs" color="gray78">
            * 20글자 이내
          </Text>
        </div>
        <Input
          type="text"
          value={user?.introduction}
          readOnly
          readOnlyBgColor="#F5F5F5"
          readOnlyBorderColor="#e6e6e6"
        />
      </FooterContent>
    </FooterWrapper>
  );
};

export default ProfileSection;
