import { useState, useEffect } from "react";
import Posts from "@/components/layout/post/PostList";
import { getPostList } from "@/api/post/post";
import styled from "styled-components";
import { useParams } from "react-router-dom";

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

const MyPage = () => {
  const [totalPostCount, setTotalPostCount] = useState(0);
  const { userNickname } = useParams();

  const nickName = localStorage.getItem("nickName");

  const getTotalPage = async () => {
    try {
      const response = await getPostList(100, 0);
      setTotalPostCount(response.data.post.length);
      
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getTotalPage();
  }, []);

  console.log(nickName, userNickname);

  return (
    <>
      {nickName === userNickname ? (
        <UserInfoWrapper>
          <UserInfoContainer>
            <h1>My Page</h1>
          </UserInfoContainer>
        </UserInfoWrapper>
      ) : null}
      <Posts totalPostCount={totalPostCount} />
    </>
  )
}

export default MyPage;
