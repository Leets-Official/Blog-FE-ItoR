import Button from "./components/ui/Button";
import Image from "./components/ui/Image";
import test_Img from "./assets/test_Img.jpg";

function App() {
  return (
    <>
      <Button 
        width="200px" 
        height="100px" 
        fontSize="10px" 
        color="white"
        backgroundColor="black"
        hoverColor="black"
        hoverBackgroundColor="white"
        onClick={() => {}}
        disabled={false}
      >
        버튼
      </Button>
      <Image src={test_Img} alt="chat image" width="300px" height="300px" $objectFit="cover" />
      <h1>HI</h1>
    </>
  )
}

export default App
