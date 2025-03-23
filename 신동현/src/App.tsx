import { useState } from "react";
import Button from "./components/ui/Button";
import Image from "./components/ui/Image";
import Modal from "./components/ui/Modal";

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
        <Button
          width="180px"
          height="45px"
          fontSize="15px"
          color="white"
          backgroundColor="#6366f1"
          hoverColor="white"
          hoverBackgroundColor="#4f46e5"
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
      
      <Modal open={modalOpen} onClose={closeModal} width="500px" height="500px" animation="fadeIn">
        <h2>환영합니다!</h2>
        <p>이것은 멋진 모달입니다.</p>
      </Modal>

    </>
  )
}

export default App
