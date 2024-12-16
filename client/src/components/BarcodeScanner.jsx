import React, { useRef, useState, useEffect } from "react";
import Quagga from "quagga";

const BarcodeScanner = ({ onDetected }) => {
  const scannerRef = useRef(null);
  const [scanning, setScanning] = useState(false);
  const [barcode, setBarcode] = useState("");

  const startScanner = () => {
    if (!scannerRef.current) {
      console.error("Scanner container not initialized");
      return;
    }

    Quagga.init(
      {
        inputStream: {
          type: "LiveStream",
          target: scannerRef.current,
          constraints: {
            facingMode: "environment", // Use rear camera
          },
        },
        decoder: {
          readers: ["code_128_reader", "ean_reader", "ean_8_reader"], // Add supported barcode types
        },
        locate: true, // Enable locating the barcode for better accuracy
        numOfWorkers: navigator.hardwareConcurrency || 4, // Use available cores
        frequency: 10, // Check every 10 frames for detection
      },
      (err) => {
        if (err) {
          console.error("Quagga initialization failed:", err);
          return;
        }
        Quagga.start();
        setScanning(true);

        // Attach the detection handler
        Quagga.onDetected(handleDetected);
      }
    );
  };

  const stopScanner = () => {
    if (scanning) {
      Quagga.stop(() => {
        Quagga.offDetected(handleDetected); // Remove detection handler
        setScanning(false);
      });
    }
    document.getElementById("my_modal_1").close();
  };

  const handleDetected = (data) => {
    const detectedCode = data.codeResult.code;

    // Validate detected code (basic validation to reduce false positives)
    if (detectedCode && detectedCode.length >= 8) {
      setBarcode(detectedCode);
      onDetected(detectedCode);

      // Stop scanner after detection
      stopScanner();
      document.getElementById("my_modal_1").close();
    }
  };

  useEffect(() => {
    return () => {
      // Ensure resources are released when component unmounts
      if (scanning) {
        Quagga.stop();
        Quagga.offDetected(handleDetected);
      }
    };
  }, [scanning]);

  return (
    <div>
      <div className="flex gap-5 justify-center">
        <button
          className="btn"
          onClick={() => {
            document.getElementById("my_modal_1").showModal();
            startScanner();
          }}
        >
          Start Scan
        </button>
      </div>

      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-5">
            Hello! Set the barcode in front of the camera.
          </h3>
          <div ref={scannerRef} className="max-h-96 w-full"></div>
          <div className="modal-action">
            <button className="btn bg-red-500" onClick={stopScanner}>
              Stop
            </button>
          </div>
        </div>
      </dialog>

      {barcode && <p className="text-center mt-5">Detected Barcode: {barcode}</p>}
    </div>
  );
};

export default BarcodeScanner;
