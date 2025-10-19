import prince from '../assets/prince.png';
import '../css/App.css';
import { ResultsPage } from './resultsPage';
import { useState } from "react";
import { requestAnalysis } from '../ApiCalls';
import { Spinner } from '../../src/components/Spinner.jsx'


export default function App() {

  const [ inputValue, setInputValue ] = useState('');
  const [ analysisData, setAnalysisData ] = useState(null);
  const [ isInputView, setInputView ] = useState(true);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ isntLoading, setIsntLoading ] = useState(true)


  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  // The main function that runs when the "Submit" button is clicked
  const handleClick = () => {
    setErrorMessage(''); // Clear previous errors
    setIsntLoading(false)

      // Show some kind of loading state here if you want

      console.log("Requesting analysis for:", inputValue);
      requestAnalysis(inputValue).then(
        (returnedJson) => {
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
  };

  // Function to go back to the input screen from the results page
  const handleGoBack = () => {
      setInputView(true);
      setInputValue(''); // Clear the input box
      setAnalysisData(null);
      setIsntLoading(true);
  };


  // --- COMPONENT RENDER ---
  return (
    <div className="App">
      <header className="App-header">
        <h1>
          Website Review Checker
        </h1>
        <img src={prince} className="App-logo" alt="logo" />

        {isInputView ? (
          <>
            <p>Insert a link: </p>
            <div className="textbox">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Paste product URL here (e.g., from Amazon, eBay)"
              />
              { isntLoading ? (<button className="submitButton" onClick={handleClick}>Submit</button>) : (<Spinner className="mr-2"/>) }


            </div>
            {/* Show error message if it exists */}
            {errorMessage && <p className="error-message">{errorMessage}</p>}
          </>
        ) : (
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