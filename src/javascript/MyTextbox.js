
import React, { useState } from "react";
export function MyTextbox() {

  // state for textbox
  const [inputValue, setInputValue] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }


  function handleClick() {
    if (validURL(inputValue)) {
      console.log("hell yea");

      sendRequest(inputValue).then( function(json) {



      },
      function(error) {

      }
    );
    }

    else {
      console.log(":(")
    }




    console.log("presto vro");
  }

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

// sends post request to specific url and recieves json file in return
  async function sendRequest(link ) {
    const url = ""
    try {
      const response = await fetch(url, {
        method: "POST",
        body: link
      })

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      return await response.json()

    }

    catch (error) {
      console.error(error.message)
    }

  }


  return (

    <div className="textbox">
      <input type="text" value={inputValue} onChange={handleInputChange}>
      </input>
      <input type='button' onClick={handleClick}></input>
    </div>
  );
}
