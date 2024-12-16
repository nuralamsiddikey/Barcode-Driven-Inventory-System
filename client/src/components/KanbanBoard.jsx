import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "./Input";
import Button from "./Button";
import Modal from "./Modal";


const grid = 8;

function KanbanBoard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/categories"
        );
        setCategories(response.data.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);

  // Handle Drag-and-Drop
  const onDragEnd = async (result) => {
    const { source, destination } = result;

    // If dropped outside any category
    if (!destination) return;

    // Prevent unnecessary updates if dropped in the same position
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // Get source and destination categories
    const sourceIndex = categories.findIndex(
      (cat) => cat._id === source.droppableId
    );
    const destinationIndex = categories.findIndex(
      (cat) => cat._id === destination.droppableId
    );

    const sourceCategory = categories[sourceIndex];
    const destinationCategory = categories[destinationIndex];

    // Move the dragged item
    const [movedItem] = sourceCategory.products.splice(source.index, 1);
    movedItem.category = destinationCategory._id;
    destinationCategory.products.splice(destination.index, 0, movedItem);

    // Optimistically update the state
    const updatedCategories = [...categories];
    updatedCategories[sourceIndex] = sourceCategory;
    updatedCategories[destinationIndex] = destinationCategory;
    setCategories(updatedCategories);

    try {
      await axios.put(
        `http://localhost:8080/api/products/category/${movedItem._id}`,
        {
          category: destinationCategory._id, 
        }
      );
      toast.success("Successfully updated category");
    } catch (error) {
      console.error("Failed to update category:", error);

      sourceCategory.products.splice(source.index, 0, movedItem);
      destinationCategory.products.splice(destination.index, 1);
      setCategories([...categories]);
    }
  };

  return (
    <div className="mt-10">
      <div className="flex items-center justify-between mb-10">
        <h3 className="text-2xl">Product list</h3>
        <div className="flex items-center gap-5">
          <Input />
          <Modal/>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex gap-10 justify-center">
          {categories.map((category) => (
            <Droppable key={category._id} droppableId={category._id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className="card bg-base-300 w-96 shadow-xl"
                  {...provided.droppableProps}
                  
                >
                  <h3 className="capitalize font-bold text-xl">{category.category_name}</h3>
                  {category.products.map((product, index) => (
                    <Draggable
                      key={product._id}
                      draggableId={product._id}
                      index={index}
                    >
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                           className="card bg-base-100 my-4"
                        >
                          <p>
                            <strong>Material:</strong> {product.material}
                          </p>
                          <p>
                            <strong>Description:</strong> {product.description}
                          </p>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default KanbanBoard;
