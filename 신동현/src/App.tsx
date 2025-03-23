import Button from "./components/Button";

function App() {
  return (
    <>
      <Button 
        width="200px" 
        height="100px" 
        fontSize="10px" 
        color="white"
        backgroundColor="black"
        onClick={() => {}}
        disabled={false}
      >
        버튼
      </Button>
      <h1>HI</h1>
    </>
  )
}

export default App
