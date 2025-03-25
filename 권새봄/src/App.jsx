import React, { useState } from "react";
import Button from "./components/Button";
import Toast from "./components/Toast";
import theme from "./styles/theme";

import styled from "styled-components";

function App() {
  const [toastMessage, setToastMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastColor, setToastColor] = useState(theme.colors.white);

  const handleButtonClick = (message, color) => {
    setToastMessage(message);
    setToastColor(color);
    setShowToast(true);
  };

  const handleCloseToast = () => {
    setShowToast(false);
  };

  return (
    <>
      <Container>
        <Button
          onClick={() =>
            handleButtonClick("내용을 입력해주세요", theme.colors.negative)
          }
          width="145px"
          height="40px"
          fontSize="14px"
          color={theme.colors.point}
        >
          깃로그 시작하기
        </Button>

        <Button
          onClick={() =>
            handleButtonClick("저장되었습니다!", theme.colors.positive)
          }
          width="145px"
          height="40px"
          fontSize="14px"
          color={theme.colors.gray56}
        >
          깃로그 시작하기
        </Button>

        <Button
          onClick={() =>
            handleButtonClick("저장되었습니다!", theme.colors.positive)
          }
          width="145px"
          height="40px"
          fontSize="14px"
          color={theme.colors.white}
          background={theme.colors.black}
        >
          깃로그 시작하기
        </Button>
      </Container>
      {showToast && (
        <Toast
          message={toastMessage}
          color={toastColor}
          onClose={handleCloseToast}
        />
      )}
    </>
  );
}

const Container = styled.div`
  position: fixed;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);

  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export default App;
