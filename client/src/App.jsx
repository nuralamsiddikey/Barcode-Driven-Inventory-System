import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import KanbanBoard from './components/KanbanBoard'
import BarcodeScanner from './components/BarcodeScanner'


function App() {
  const handleBarcodeDetected = (barcode) => {
    console.log('Detected barcode:', barcode);
    // Use the detected barcode (e.g., send to backend, fetch product info, etc.)
  };

  return (
    <>
     <BarcodeScanner onDetected={handleBarcodeDetected} />
     <KanbanBoard/>
    </>
  )
}

export default App
