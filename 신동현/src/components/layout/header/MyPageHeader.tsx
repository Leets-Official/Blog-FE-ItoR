import Button from "@/components/ui/Button/Button";
import styled from "styled-components";
import { useAtom } from "jotai";
import { isModifyAtom } from "@/Atoms/atoms";
import { useEffect } from "react";

const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MyPageHeader = ({ onPublish }: { onPublish: () => void }) => {
  const [isModify, setIsModify] = useAtom(isModifyAtom);
  const handleModifyClick = () => {
    setIsModify((prev) => !prev);
  }

  useEffect(() => {
    setIsModify(false);
  }, []);

  return (
    <Container>
      {isModify ? (
        <>
          <Button
            width="76px"
            height="40px"
            fontSize="14px"
            color="#FF3F3F"
            backgroundColor="#FFFFFF"
            onClick={handleModifyClick}
          > 취소하기
          </Button>
          <Button
            width="76px"
            height="40px"
            fontSize="14px"
            color="#000000"
            backgroundColor="#FFFFFF"
            onClick={onPublish}
          > 저장하기
          </Button>
        </>
      ) : (
        <Button
          width="76px"
          height="40px"
          fontSize="14px"
          color="#000000"
          backgroundColor="#FFFFFF"
          onClick={handleModifyClick}
        > 수정하기
        </Button>
      )}
    </Container>
  );
};

export default MyPageHeader;
