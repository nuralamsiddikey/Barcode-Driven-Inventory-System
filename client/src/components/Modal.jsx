import React from "react";
import Input from "./Input";
import Button from "./Button";

export default function Modal() {
  return (
    <div>
      <Button
        onClick={() => document.getElementById("my_modal_1").showModal()}
        label="New category"
      />
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg mb-3">Create new category</h3>
          <Input/>
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
            <Button label="Submit"/>
          </div>
        </div>
      </dialog>
    </div>
  );
}
