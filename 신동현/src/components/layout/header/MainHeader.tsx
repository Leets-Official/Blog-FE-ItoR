import { Create } from "@/assets";
import Button from "@/components/ui/Button/Button";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Toast from "@/components/ui/Toast";
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const MainHeader = () => {
  const navigate = useNavigate();
  const isLogin = localStorage.getItem("refreshToken") ? true : false;
  const [toast, setToast] = useState<{ message: string; type: "success" | "error" } | null>(null);
  
  const handleWriteClick = () => {
    if (isLogin) {
      navigate("/write");
    } else {
      setToast({ message: "로그인 후 이용해주세요.", type: "error" });
      setTimeout(() => {
        setToast(null);
      }, 750);
    }
  };

  return (
    <Container>
      <Button
        width="120px"
        height="40px"
        fontSize="14px"
        color="#909090"
        backgroundColor="#FFFFFF"
        icon={<Create width="24px" height="24px" fill="#333333" />}
        onClick={handleWriteClick}
      >
        깃로그 쓰기
      </Button>
      {toast && <Toast key={Date.now()} message={toast.message} type={toast.type} />}
    </Container>
  );
};

export default MainHeader;  