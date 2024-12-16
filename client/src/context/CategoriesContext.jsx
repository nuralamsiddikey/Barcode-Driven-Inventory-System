import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories");
      setCategories(response.data.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    
    fetchData();
  }, []);

  return (
    <CategoriesContext.Provider value={{ categories, setCategories ,fetchData}}>
      {children}
    </CategoriesContext.Provider>
  );
};
