import React, { useContext, useState } from "react";
import Input from "./Input";
import Button from "./Button";
import axios from "axios";
import toast from "react-hot-toast";
import { CategoriesContext } from "../context/CategoriesContext";


export default function Modal() {
  const [newCategory, setNewCategory] = useState("")
  const {fetchData} = useContext(CategoriesContext)

  const handleCategory = (value) => {
    setNewCategory(value);
  };

  const submitNewCategory = async () => {
    console.log("here is category",newCategory)
    if (!newCategory.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/categories", {
        category_name: newCategory, 
      });
      fetchData()
      toast.success("Category created successfully!");
      setNewCategory("");
      document.getElementById("my_modal_1").close();
    } catch (error) {
      toast.error("Failed to create category. Please try again.");
    }
  };

  return (
    <div>
      <Button
        onClick={() => document.getElementById("my_modal_1").showModal()}
        label="New category"
      />
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Create new category</h3>
          <Input
            handleChange={(value) => handleCategory(value)}
            value={newCategory}
            placeholder="Enter category name"
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <Button label="Submit" onClick={submitNewCategory} />
          </div>
        </div>
      </dialog>
    </div>
  );
}
