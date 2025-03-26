import { useState } from "react";
import Button from "@/components/ui/Button";
import Image from "@/components/ui/Image";
import Modal from "@/components/ui/Modal";
import { Chat, Clear } from "@/assets/index";

function App() {

  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  }

  const closeModal = () => {
    setModalOpen(false);
  }

  return (
    <>
      <div>
        <Button width="300px" height="45px" fontSize="16px" color="000000" backgroundcolor="#FEE500" disabled={false} onClick={() => { }} icon={<Chat />} style={{
          border: "none",
          borderRadius: "6px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px"
        }}>카카오 로그인</Button>
      </div >
      <div>
        <Button
          width="300px"
          height="45px"
          fontSize="16px"
          color="#FFFFFF"
          backgroundcolor="#000000"
          onClick={openModal}
          disabled={false}
        >
          모달 열기
        </Button>
      </div>

      <hr />

      <Image
        src="https://picsum.photos/300"
        alt="chat image"
        width="300px"
        height="300px"
        $objectFit="cover"
      />
    
    <Clear/>
      <Modal open={modalOpen} title="가입되지 않은 계정이에요." subTitle="회원가입을 진행할까요?" buttonComponents = {[{text: "취소", onClick: closeModal, type: "secondary"}, {text: "회원가입 하기", onClick: closeModal, type: "primary"}]} onClose={closeModal} width="500px" height="200px" animation="fadeIn">
      </Modal>

    </>
  )
}

export default App
