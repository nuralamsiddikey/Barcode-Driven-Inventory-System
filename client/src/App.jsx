import "./App.css";
import KanbanBoard from "./components/KanbanBoard";
import BarcodeScanner from "./components/BarcodeScanner";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import "preline/preline";

function App() {
  const handleBarcodeDetected = (barcode) => {
    console.log("Detected barcode:", barcode);
  };

  const location = useLocation();

  useEffect(() => {
    window.HSStaticMethods.autoInit();
  }, [location.pathname]);

  return (
    <>
      <BarcodeScanner onDetected={handleBarcodeDetected} />
      <KanbanBoard />
    </>
  );
}

export default App;
