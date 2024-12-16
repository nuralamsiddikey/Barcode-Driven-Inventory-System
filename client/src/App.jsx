import "./App.css";
import KanbanBoard from "./components/KanbanBoard";
import BarcodeScanner from "./components/BarcodeScanner";
import { CategoriesProvider } from "./context/CategoriesContext";

function App() {
  const handleBarcodeDetected = (barcode) => {
    console.log("Detected barcode:", barcode);
  };

  return (
    <>
      <CategoriesProvider>
        <BarcodeScanner onDetected={handleBarcodeDetected} />
        <KanbanBoard />
      </CategoriesProvider>
    </>
  );
}

export default App;
