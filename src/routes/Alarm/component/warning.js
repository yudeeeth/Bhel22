import React, { useState } from "react";
import Alarm from "./alarm.png";
import "./warning.css";



export default function Modal() {
 
  let [modal, setModal] = useState(false);
  let [value, setValue] = useState("");

  const toggleModal = () => {
    setModal(!modal);
  };

  
  const handleChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    toggleModal();
    //setValue("");
    
  }

  if(modal) {
    document.body.classList.add('active-modal')
  } else {
    document.body.classList.remove('active-modal')
  }

  return (
    <>
    <form onSubmit={handleSubmit}>
          
          <input className="btn-modal" placeholder="Error"type="number" value={value} onChange={handleChange} />
        <button type="submit"  className="btn-modal">
          Trigger
        </button>
    </form>
      

      {modal && (
        <div className="modal">
          <div onClick={toggleModal} className="overlay"></div>
          <div className="modal-content">
            <img className="img-cont" src={Alarm} alt="sensor detection error warning image"  height="300" width="400"/>
            <p className="error-content">#{value}</p>
            <button className="close-modal" onClick={toggleModal}>
              {/* CLOSE */}
            </button>
          </div>
        </div>
      )}
    </>
  );
}