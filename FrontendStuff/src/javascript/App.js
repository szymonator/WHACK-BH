import prince from '../assets/prince.png'
import '../css/App.css';
import { ResultsPage } from './resultsPage';
import { useState } from "react";
import { sendRequest } from '../ApiCalls';

export default function App() {


  // state for textbox
  const [inputValue, setInputValue] = useState('');
  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  //State and handler for current state website is in: false is output state
  const [contentFlag, setFlagValue] = useState(true);
  const handleFlagChange = (event) => {
    setFlagValue(!contentFlag)
  }


  // state and handler for error message displayed by website. shows up if input is bad
  const [errorOccured, setError] = useState('');
  const handleError = (event) => {
    setError(event)
  }

  // json set to default for testing purposes, holds data of what needs to be displayed
  let json = require('./test.json');


// run when submit button is clicked
  function handleClick() {
    //client side validation
    if (validURL(inputValue)) {

      // depending on whether request returns:
      sendRequest(inputValue).then(

        //return obtained json
        function (json) {
        console.log(":)")
        return json
      },
      // spit out erro
        function (error) {
          console.log(">:(")
          handleError("Something went wrong, please try again.");
        }
      );
    }

    // spit out error if client side validation fails
    else {
      handleError("invalid URL, please try again");
      console.log(":(")
    }

  }

  //contains valid hosts
  const VALIDHOSTS = ["www.amazon.co.uk", "www.amazon.com","www.ebay.co.uk","www.ebay.com"];
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
  // html view for app
  return (

    <div className="App">

      <header className="App-header">

        {console.log(json.productName)}
        <h1>
          Prince the cat's Review Checker
        </h1>

        <img src={prince} className="App-logo" alt="logo" />

        {contentFlag ?
          //if content flag active
          <><p>
            insert a  link (meow)
          </p>
            <div className="textbox">
              <input
                    type="text"
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Paste product URL here (e.g., from Amazon, eBay)"
                  />
              <button onClick={handleClick}>Submit</button>
            </div>

          </>
          //else
          :
          <>

            {ResultsPage(json)}
          </>
        }
        
        {// button to test flag change, remove before submit
        }
        {/* <input type='button' onClick={function () { handleFlagChange() }}></input> */}
      </header>
    </div>
  );
}

