import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

const grid = 8;

// Style helpers
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

// Transform API response into grouped categories
const transformDataToKanban = (data) => {
  const categoryMap = {};
  data.forEach((item) => {
    const category = item.category || "Uncategorized";
    if (!categoryMap[category]) {
      categoryMap[category] = [];
    }
    categoryMap[category].push(item);
  });

  return Object.entries(categoryMap).map(([name, items]) => ({
    name,
    items,
  }));
};

function KanbanBoard() {
  const [categories, setCategories] = useState([]);

  // Fetch data from API on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/products"); // Update with your API endpoint
        const transformed = transformDataToKanban(response.data.data);
        setCategories(transformed);
      } catch (error) {
        console.error("Error fetching data:", error);
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
      (cat) => cat.name === source.droppableId
    );
    const destinationIndex = categories.findIndex(
      (cat) => cat.name === destination.droppableId
    );

    const sourceCategory = categories[sourceIndex];
    const destinationCategory = categories[destinationIndex];

    // Move the dragged item
    const [movedItem] = sourceCategory.items.splice(source.index, 1);
    movedItem.category = destinationCategory.name; // Update the item's category
    destinationCategory.items.splice(destination.index, 0, movedItem);

    // Optimistically update the state
    const updatedCategories = [...categories];
    updatedCategories[sourceIndex] = sourceCategory;
    updatedCategories[destinationIndex] = destinationCategory;
    setCategories(updatedCategories);

    // Persist the change in the backend
    // try {
    //   await axios.put(`/api/products/${movedItem._id}`, {
    //     category: movedItem.category,
    //   });
    //   console.log("Category updated successfully");
    // } catch (error) {
    //   console.error("Failed to update category:", error);

    //   // Revert the state if the API call fails
    //   sourceCategory.items.splice(source.index, 0, movedItem);
    //   destinationCategory.items.splice(destination.index, 1);
    //   setCategories([...categories]);
    //}
  };

  return (
    <div>
      <h1>Kanban Board</h1>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: "flex", gap: "20px" }}>
          {categories.map((category) => (
            <Droppable key={category.name} droppableId={category.name}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  style={getListStyle(snapshot.isDraggingOver)}
                  {...provided.droppableProps}
                >
                  <h3>{category.name}</h3>
                  {category.items.map((item, index) => (
                    <Draggable
                      key={item._id}
                      draggableId={item._id}
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
                          <p><strong>Barcode:</strong> {item.barcode}</p>
                          <p><strong>Description:</strong> {item.description}</p>
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

export default KanbanBoard