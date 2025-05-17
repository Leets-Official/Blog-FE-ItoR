import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { Profile, Settings } from '@/assets';
import TextInput from '@/components/ui/TextInput';
import { profileSchema, ProfileSchema } from '@/schema/auth';
import { UpdateUserInfoRequest } from '@/types/user';
import ProfileUpload from '../signup/ProfileUpload';

const MyPageTitleWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  background-color: #f5f5f5;
  padding: 136px 16px 20px 16px;
`;

const ContentWrapper = styled.div`
  display: flex;
  width: 100%;
  max-width: 688px;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px 16px;
  gap: 16px;
  margin: 0 auto;
  box-sizing: border-box;
`;

const NickName = styled.div`
  color: #000;
  font-size: 32px;
  font-weight: 500;
  padding-top: 24px;
`;

const Description = styled.div`
  color: #333;
  font-family: 'Noto Sans L';
  font-size: 14px;
  font-weight: 300;
  letter-spacing: -0.07px;
`;

const ButtonWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  width: 100%;
  max-width: 688px;
  padding: 12px 16px;
  gap: 10px;
  margin: 0 auto;
`;

const SettingButton = styled.button`
  display: flex;
  width: 120px;
  padding: 4px 8px 2px 8px;
  justify-content: center;
  gap: 4px;
  cursor: pointer;
  border-radius: 2px;
  border: 1px solid #e6e6e6;

  font-size: 12px;
  color: #909090;
  background-color: #f5f5f5;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
`;

const ErrorMessage = styled.p`
  color: #ff3f3f;
  font-size: 12px;
  font-weight: 300;
  margin-top: 2px;
  margin-left: 4px;
  font-family: 'Noto Sans L';
`;

interface MyPageTitleProps {
  isMyPageSetting?: boolean;
  editable?: boolean;
  setEditData?: React.Dispatch<React.SetStateAction<UpdateUserInfoRequest>>;
}

const MyPageTitle: React.FC<MyPageTitleProps> = ({
  isMyPageSetting = false,
  editable = false,
  setEditData,
}) => {
  const navigate = useNavigate();

  const profilePicture = localStorage.getItem('profilePicture') || '';
  const nickname = localStorage.getItem('nickname') || '닉네임';
  const introduction = localStorage.getItem('introduction') || 'You can make anything by writing';

  const {
    register,
    formState: { errors },
  } = useForm<ProfileSchema>({
    resolver: zodResolver(profileSchema),
    mode: 'onBlur',
  });

  const handleMyPageSettingClick = () => {
    navigate('/mypage/setting');
  };

  return (
    <MyPageTitleWrapper>
      <ContentWrapper>
        {!isMyPageSetting ? (
          <>
            {profilePicture ? (
              <img
                src={profilePicture}
                alt='프로필'
                width={60}
                height={60}
                style={{ borderRadius: '50%' }}
              />
            ) : (
              <Profile width={60} height={60} />
            )}
            <NickName>{nickname}</NickName>
            <Description>{introduction}</Description>
          </>
        ) : (
          <>
            <ProfileUpload
              initialImage={profilePicture}
              onImageChange={(url) => setEditData?.((prev) => ({ ...prev, profilePicture: url }))}
              size={60}
              showLabel={false}
              hideButton
            />
            <InputWrapper>
              <TextInput
                {...register('nickName')}
                name='nickName'
                width='100%'
                placeholder={nickname}
                style={{
                  borderRadius: '4px',
                  fontFamily: 'Noto Sans M',
                  fontSize: '24px',
                  fontWeight: '500',
                  lineHeight: '160%',
                  backgroundColor: '#F5F5F5',
                }}
                disabled={!editable}
                onChange={(e) => {
                  setEditData?.((prev) => ({ ...prev, nickname: e.target.value }));
                }}
              />
              {!errors.nickName && (
                <span
                  style={{
                    color: '#C8C8C8',
                    fontFamily: 'Noto Sans L',
                    fontSize: '12px',
                    fontWeight: '300',
                    lineHeight: '160%',
                    padding: '0 6px',
                  }}
                >
                  * 20글자 이내
                </span>
              )}
              {errors.nickName && <ErrorMessage>{errors.nickName.message}</ErrorMessage>}
            </InputWrapper>

            <TextInput
              {...register('introduction')}
              name='introduction'
              width='100%'
              placeholder={introduction}
              style={{
                borderRadius: '4px',
                fontFamily: 'Noto Sans L',
                fontSize: '14px',
                fontWeight: '300',
                lineHeight: '160%',
                letterSpacing: ' -0.07px',
                backgroundColor: '#F5F5F5',
              }}
              disabled={!editable}
              onChange={(e) => {
                register('introduction').onChange(e);
                setEditData?.((prev) => ({ ...prev, introduction: e.target.value }));
              }}
            />
            {errors.introduction && <ErrorMessage>{errors.introduction.message}</ErrorMessage>}
          </>
        )}
      </ContentWrapper>

      {!isMyPageSetting && (
        <ButtonWrapper>
          <SettingButton onClick={handleMyPageSettingClick}>
            <Settings width={16} height={16} />내 프로필 설정
          </SettingButton>
        </ButtonWrapper>
      )}
    </MyPageTitleWrapper>
  );
};

export default MyPageTitle;
