import prince from '../assets/prince.png';
import '../css/App.css';
import { ResultsPage } from './resultsPage';
import { useState } from "react";
import { requestAnalysis } from '../ApiCalls';

export default function App() {
  // --- STATE HOOKS ---

  // State for the text in the input box
  const [inputValue, setInputValue] = useState('');

  // State to hold the JSON data from the API.
  // This is the key fix. It starts as null.
  const [analysisData, setAnalysisData] = useState(null);

  // State to control which view is showing (input vs. results)
  const [isInputView, setInputView] = useState(true);

  // State for any error messages
  const [errorMessage, setErrorMessage] = useState('');


  // --- EVENT HANDLERS ---

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // The main function that runs when the "Submit" button is clicked
  const handleClick = () => {
    setErrorMessage(''); // Clear previous errors

    if (validURL(inputValue)) {
      // Show some kind of loading state here if you want
      console.log("Requesting analysis for:", inputValue);

      requestAnalysis(inputValue).then(
        (returnedJson) => {
          // --- THIS IS THE FIX ---
          // 1. We get the JSON back from the API call.
          console.log("API returned successfully:", returnedJson);
          
          // 2. We update our new state variable with the returned data.
          //    This tells React to re-render the component.
          setAnalysisData(returnedJson);
          
          // 3. We switch to the results page view.
          setInputView(false);
        }
      ).catch((error) => {
        // It's better to use .catch() for errors
        console.error("API call failed:", error);
        setErrorMessage("Something went wrong on the server, please try again.");
      });

    } else {
      // Handle client-side validation failure
      setErrorMessage("Invalid URL. Please use a valid link from Amazon or eBay.");
      console.log("Invalid URL provided.");
    }
  };

  // Function to go back to the input screen from the results page
  const handleGoBack = () => {
      setInputView(true);
      setInputValue(''); // Clear the input box
      setAnalysisData(null);
  };


  // --- URL VALIDATION ---
  
  const VALIDHOSTS = ["www.amazon.co.uk", "www.amazon.com", "www.ebay.co.uk", "www.ebay.com"];
  
  function validURL(userURL) {
    try {
      const url = new URL(userURL);
      return VALIDHOSTS.includes(url.host);
    } catch {
      return false;
    }
  }

  // --- COMPONENT RENDER ---
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Prince the cat's Review Checker
        </h1>
        <img src={prince} className="App-logo" alt="logo" />

        {isInputView ? (
          // --- INPUT VIEW ---
          <>
            <p>Insert a link (meow)</p>
            <div className="textbox">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Paste product URL here (e.g., from Amazon, eBay)"
              />
              <button onClick={handleClick}>Submit</button>
            </div>
            {/* Show error message if it exists */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </>
        ) : (
          // --- RESULTS VIEW ---
          <>
            {/* We check if analysisData is not null before trying to render the results.
              This prevents errors if the API call is still in progress.
            */}
            {analysisData ? ResultsPage(analysisData) : <p>Loading results...</p>}
            
            {/* A "Go Back" button is good practice for your demo! */}
            <button onClick={handleGoBack} className="back-button">
              Analyze Another URL
            </button>
          </>
        )}
      </header>
    </div>
  );
}