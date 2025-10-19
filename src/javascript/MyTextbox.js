



import React, { useState } from "react";
export function MyTextbox({inputValue,handleInputChange,errorMessage,handleClick}) {
  const VALIDHOSTS = ["amazon.co.uk", "amazon.com"];
  // returns whether the given input is a valid url
  function validURL(userURL) {
    // if url malformed, URL constructor throws an error
    try {
      const url = new URL(userURL);

      console.log(url.host)
      //return whether host is within allowed list
      return VALIDHOSTS.includes(url.host);

    }
    // return false if url was malformed
    catch {
      return false
    }
  }


  async function sendRequest(link) {
    const url = ""
    try {
      const response = await fetch(url, {
        method: "POST",
        body: link
      })






  return (

    <div className="textbox">
      
      <input className="text"type="text" value={inputValue} onChange={handleInputChange}>
      </input>
      <input name="submit"className="submitButton"type='button' onClick={handleClick}></input>
      
      <p>{errorMessage}</p>
    </div>
  );
}
