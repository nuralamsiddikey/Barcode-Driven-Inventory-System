import React, { useRef, useState, useEffect } from 'react';
import Quagga from 'quagga';

const BarcodeScanner = ({ onDetected }) => {
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [barcode, setBarcode] = useState("");
  const [quaggaInitialized, setQuaggaInitialized] = useState(false); // Track Quagga initialization

  const startScanner = () => {
    if (!scannerRef.current) {
      console.error("Scanner container not initialized");
      return;
    }

    // Initialize Quagga if not already initialized
    if (!quaggaInitialized) {
      Quagga.init(
        {
          inputStream: {
            type: 'LiveStream',
            target: scannerRef.current, // Ensure this is a rendered DOM element
            constraints: {
              facingMode: 'environment', // Use the back camera
            },
          },
          decoder: {
            readers: ['code_128_reader', 'ean_reader', 'ean_8_reader'], // Add more formats if needed
          },
        },
        (err) => {
          if (err) {
            console.error("Quagga initialization failed:", err);
            return;
          }
         // setQuaggaInitialized(true); // Mark Quagga as initialized
          Quagga.start();
          setScanning(true);
        }
      );

      // Access the canvas element and set the willReadFrequently attribute
      const canvasElement = document.querySelector('canvas');
      if (canvasElement) {
        const context = canvasElement.getContext('2d');
        context.willReadFrequently = true; // Optimize canvas read performance
      }

      Quagga.onDetected(handleDetected);
    }
  };

  const stopScanner = () => {
    // Only call stop if Quagga is initialized
    if (quaggaInitialized) {
      Quagga.stop();
      setScanning(false);
      setQuaggaInitialized(false); // Reset initialization flag
      Quagga.offDetected(handleDetected);
    }
  };

  const handleDetected = (data) => {
    const detectedCode = data.codeResult.code;
    setBarcode(detectedCode);
    onDetected(detectedCode);
    stopScanner();
  };

  useEffect(() => {
    return () => {
      // Cleanup Quagga when component unmounts
      stopScanner(); // Ensure Quagga is stopped when component unmounts
    };
  }, []);

  return (
    <div>
      <button onClick={startScanner} disabled={scanning}>
        {scanning ? "Scanning..." : "Start Scanning"}
      </button>
      <button onClick={stopScanner} disabled={!scanning}>
        Stop Scanning
      </button>
      <div
        ref={scannerRef}
        style={{
          width: '100%',
          height: '300px',
          marginTop: '10px',
          border: scanning ? '2px solid #4caf50' : '2px solid #ccc',
          borderRadius: '4px',
          backgroundColor: '#f9f9f9',
        }}
      />
      {barcode && <p>Detected Barcode: {barcode}</p>}
    </div>
  );
};

export default BarcodeScanner;
