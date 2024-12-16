import React, { useContext } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";
import toast from "react-hot-toast";
import Input from "./Input";
import Modal from "./Modal";
import { CategoriesContext } from "../context/CategoriesContext";

function KanbanBoard() {
  const { categories, setCategories,fetchData } = useContext(CategoriesContext);

  const onDragEnd = async (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    const sourceIndex = categories.findIndex(
      (cat) => cat._id === source.droppableId
    );
    const destinationIndex = categories.findIndex(
      (cat) => cat._id === destination.droppableId
    );

    const sourceCategory = categories[sourceIndex];
    const destinationCategory = categories[destinationIndex];

    const [movedItem] = sourceCategory.products.splice(source.index, 1);
    movedItem.category = destinationCategory._id;
    destinationCategory.products.splice(destination.index, 0, movedItem);

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
  }

 const handleSearch = (value)=> {
    fetchData(value)
  }

  return (
    <div className="mt-10">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-5">
        <div className="flex items-center gap-5">
          <Modal />
          <Input label="Search" handleChange={(value)=>handleSearch(value)}/>
        </div>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-5">
          {categories.map((category) => (
            <Droppable key={category._id} droppableId={category._id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  className={`card bg-base-300 shadow-xl p-4`}
                  {...provided.droppableProps}
                >
                  <h3 className="capitalize font-bold text-xl mb-4">
                    {category.category_name}
                  </h3>
                  <div>
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
                            className="card bg-base-100 my-2 p-3"
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
