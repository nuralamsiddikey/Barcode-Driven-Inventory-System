import "./App.css";
import KanbanBoard from "./components/KanbanBoard";
import BarcodeScanner from "./components/BarcodeScanner";
import {
  CategoriesContext,
  CategoriesProvider,
} from "./context/CategoriesContext";
import axios from "axios";
import { useContext } from "react";
import toast from "react-hot-toast";

function App() {
  const { fetchData } = useContext(CategoriesContext);



  const handleBarcodeDetected = async (barcode) => {
    const numericBarcode = Number(barcode);

    try {
      // Fetch product data from external API
      const productResponse = await axios.get(`/api/product/${numericBarcode}`);
      if (productResponse?.status === 200 && productResponse?.data?.product) {
        const product = productResponse.data.product;

        try {
          // Save the product to local server
          const saveResponse = await axios.post(
            "http://localhost:8080/api/products",
            product
          );

          if (saveResponse?.status === 200) {
            toast.success(saveResponse.data.message || "Product saved successfully!");
            fetchData(); // Refresh data after successful save
          } else {
            throw new Error("Failed to save product");
          }
        } catch (saveError) {
          console.error("Save Product Error:", saveError);
          toast.error(saveError?.response?.data?.message || "Error saving product");
        }
      } else {
        throw new Error("Failed to fetch product from external API");
      }
    } catch (fetchError) {
      console.error("Fetch Product Error:", fetchError);
      toast.error(fetchError?.response?.data?.message || "Error fetching product");
    }
  };

  return (
    <>
      <BarcodeScanner onDetected={handleBarcodeDetected} />
      <KanbanBoard />
    </>
  );
}

export default App;
