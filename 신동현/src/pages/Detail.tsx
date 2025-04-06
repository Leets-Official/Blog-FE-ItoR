import Header from "@/components/layout/header/Header";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import CommentItem from "@/components/layout/comment/CommentItem";
import { Profile } from "@/assets";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CommentContainer = styled.div`
  width: 668px;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const CommentTitleContainer = styled.div`
  width: 100%;
  display: flex;
  gap: 10px;
  align-items: center;
`;

const CommentTitle = styled.h2`
  font-size: 16px;
  font-weight: 500;
`;

const CommentCount = styled.p`
  font-size: 16px;
  font-weight: 401;
  color: #00A1FF;
`;

const CommentListContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 50px;
`;

const CommentEmptyContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const CommentEmpty = styled.p`
  color: #C8C8C8;
  font-size: 14px;
  font-weight: 300;
  margin : 0;
`;

const Detail = () => {
  const { id } = useParams();
  const [commentCount, setCommentCount] = useState(1);

  console.log(id);

  return (
    <>
      <Header type="detail" />
      <Wrapper>
        <div>Detail</div>
        <CommentContainer>
          <CommentTitleContainer>
            <CommentTitle>댓글</CommentTitle>
            <CommentCount>{commentCount}</CommentCount>
          </CommentTitleContainer>
          {commentCount === 0 ? (
            <CommentEmptyContainer>
              <CommentEmpty>작성된 댓글이 없습니다.</CommentEmpty>
              <CommentEmpty>응원의 첫 번째 댓글을 달아주세요.</CommentEmpty>
            </CommentEmptyContainer>
          ) : (
            <CommentListContainer>
              <CommentItem profileImage={<Profile />} nickname="닉네임" date="작성일" content="댓글 내용" />
              <CommentItem profileImage={<Profile />} nickname="닉네임" date="작성일" content="댓글 내용" />
            </CommentListContainer>
          )}
        </CommentContainer>
      </Wrapper>
    </>
  )
}

export default Detail;
