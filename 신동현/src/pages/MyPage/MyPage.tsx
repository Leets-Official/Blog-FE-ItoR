import { useState, useEffect } from "react";
import Posts from "@/components/layout/post/PostList";
import { getPostList } from "@/api/post/post";
import styled from "styled-components";
import { useNavigate, useParams } from "react-router-dom";
import UserInfo from "@/components/layout/common/UserInfo";
import Header from "@/components/layout/header/Header";
import Button from "@/components/ui/Button/Button";
import { Settings } from "@/assets";
import { useQuery } from "@tanstack/react-query";
import { PostContent, PostListResponse } from "@/type/Post/Post";

const UserInfoWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #F5F5F5;
`;

const UserInfoContainer = styled.div`
  width: 668px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin: 50px 0;

  @media (max-width: 700px) {
    width: 90%;
  }  
`;

const ProfileSettingButton = styled(Button)`
  width: 106px;
  height: 25px;
  color: #909090;
  border: 1px solid #E6E6E6;
  background-color: #F5F5F5;
  font-size: 12px;
  gap: 5px;
`;

const MyPage = () => {
  const navigate = useNavigate();
  const [totalPostCount, setTotalPostCount] = useState(0);
  const { userNickname } = useParams();
  const isKakaoLogin = localStorage.getItem("isKakaoLogin");
  const nickName = localStorage.getItem("nickName");

  const queryKey = ['post'];
  const queryFn = () => getPostList(100, 0);

  const { data, isLoading, isError } = useQuery<PostListResponse>({
    queryKey,
    queryFn
  });

  useEffect(() => {
    if (data) {
      let count = 0;
      data?.post.map((post: PostContent) => {
        if (post.isOwner) {
          count++;
        }
      });
      setTotalPostCount(count);
    }
  }, [data]);

  const userProfileImage = localStorage.getItem("profilePicture");
  const userName = localStorage.getItem("nickName");
  const userBio = localStorage.getItem("bio");

  if (isLoading) return <div>Loading...</div>
  if (isError) return <div>Error</div>

  return (
    <>
      <Header type="main" />
      {nickName === userNickname ? (
        <UserInfoWrapper>
          <UserInfoContainer>
            <UserInfo
              userProfileImage={userProfileImage as string}
              userName={userName as string}
              userBio={userBio as string}
            />
            <ProfileSettingButton icon={<Settings fill="#909090" width="14px" height="14px" />} onClick={() => { isKakaoLogin === "true" ? navigate("/mypage/detail/kakao") : navigate("/mypage/detail/email") }}>내 프로필 설정</ProfileSettingButton>
          </UserInfoContainer>
        </UserInfoWrapper>
      ) : null}
      <Posts totalPostCount={totalPostCount} loadMyPage={true} />
    </>
  )
}

export default MyPage;
