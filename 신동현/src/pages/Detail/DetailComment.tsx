import CommentItem from "@/components/layout/comment/CommentItem";
import DummyCommentList from "@/components/layout/comment/DummyCommentList";
import dayjs from "dayjs";

import styled from "styled-components";

const CommentContainer = styled.div`
  width: 100%;
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

interface DetailCommentProps {
  commentCount: number;
}

const DetailComment = ({ commentCount }: DetailCommentProps) => {
  const commentList = DummyCommentList({ commentCount });

  return (
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
          {commentList.map((comment) => (
            <CommentItem key={comment.id} profileImage={comment.profileImage} nickname={comment.nickname} date={dayjs(comment.writeDate).format("MMM DD.YYYY.").toString()} content={comment.content} isMyComment={true} />
          ))} 
        </CommentListContainer>
      )}
    </CommentContainer>
  );
};

export default DetailComment;
