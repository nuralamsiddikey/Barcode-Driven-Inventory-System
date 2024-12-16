import React, { useEffect, useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import toast from "react-hot-toast";


const grid = 8;


const getItemStyle = (isDragging, draggableStyle) => ({
  userSelect: "none",
  padding: grid * 2,
  margin: `0 0 ${grid}px 0`,
  background: isDragging ? "lightgreen" : "grey",
  ...draggableStyle,
});

const getListStyle = (isDraggingOver) => ({
  background: isDraggingOver ? "lightblue" : "lightgrey",
  padding: grid,
  width: 300,
});

function KanbanBoard() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/categories");
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
          category: destinationCategory._id, // New category ID
        }
      );
      toast.success('Successfully updated category')
    } catch (error) {
      console.error("Failed to update category:", error);

      sourceCategory.products.splice(source.index, 0, movedItem);
      destinationCategory.products.splice(destination.index, 1);
      setCategories([...categories]);
    }
  };

  return (
    <div>
      <h1>Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          {categories.map((category) => (
            <Droppable key={category._id} droppableId={category._id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  <h3 className="">{category.category_name}</h3>
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
                          style={getItemStyle(
                            snapshot.isDragging,
                            provided.draggableProps.style
                          )}
                        >
                          <p><strong>Barcode:</strong> {product.barcode}</p>
                          <p><strong>Description:</strong> {product.description}</p>
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
