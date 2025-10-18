



import React, { useState } from "react";
export function MyTextbox() {

  // state for textbox
  const [inputValue, setInputValue] = useState('');

  const [errorOccured, setError] = useState('');

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleError = (event) => {
    setError(event)
  }


  function handleClick() {
    if (validURL(inputValue)) {
      
      sendRequest(inputValue).then( function(json) {
        console.log(":)")
        return json
      },

      function(error) {
        console.log(">:(")
        handleError("Something went wrong, please try again.");
      }
    );
    }

    else {
      handleError("invalid URL, please try again");
      console.log(":(")
    }

  }

  const VALIDHOSTS = ["www.amazon.co.uk", "www.amazon.com"];
  // returns whether the given input is a valid url
  function validURL(userURL) {
    // if url malformed, URL constructor throws an error
    try {
      const url = new URL(userURL);

      console.log()
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
    
      const response = await fetch(url, {
        method: "POST",
        body: link
      })

      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`)
      }

      return await response.json()

    


  }


  return (

    <div className="textbox">
      <input type="text" value={inputValue} onChange={handleInputChange}>
      </input>
      <input type='button' onClick={handleClick}></input>
      {errorOccured && <p>Something went wrong: please try again</p>}
    </div>
  );
}
