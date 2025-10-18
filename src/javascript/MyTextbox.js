



import React, { useState } from "react";
export function MyTextbox({inputValue,handleInputChange,errorMessage,handleClick}) {






  return (

    <div className="textbox">
      
      <input className="text"type="text" value={inputValue} onChange={handleInputChange}>
      </input>
      <input name="submit"className="submitButton"type='button' onClick={handleClick}></input>
      
      <p>{errorMessage}</p>
    </div>
  );
}
