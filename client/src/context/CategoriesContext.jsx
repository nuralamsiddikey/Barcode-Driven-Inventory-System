import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CategoriesContext = createContext();

export const CategoriesProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);

  const fetchData = async (searchQuery = "") => {
    try {
      const url = searchQuery 
        ? `http://localhost:8080/api/categories?searchQuery=${encodeURIComponent(searchQuery)}` 
        : `http://localhost:8080/api/categories`;
  
      const response = await axios.get(url);
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
