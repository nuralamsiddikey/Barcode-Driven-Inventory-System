import "./App.css";
import KanbanBoard from "./components/KanbanBoard";
import BarcodeScanner from "./components/BarcodeScanner";

function App() {
  const handleBarcodeDetected = (barcode) => {
    console.log("Detected barcode:", barcode);
  };


  return (
    <>
      <BarcodeScanner onDetected={handleBarcodeDetected} />
      <KanbanBoard />
    </>
  );
}

export default App;
