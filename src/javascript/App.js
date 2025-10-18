import logo from '../assets/logo.svg';
import prince from '../assets/prince.png'
import '../css/App.css';
import { MyTextbox } from './MyTextbox';
import { ResultsPage } from './resultsPage';
import React, { useState } from "react";

function App() {
  

  const [contentFlag, setInputValue] = useState(true);
  
    const handleInputChange = (event) => {
      setInputValue(!contentFlag)
    }
  
  let json = require('./test.json');

  
  return (
    
    

    <div className="App">

      <header className="App-header">

      {console.log(json.productName)}
      <h1>
        Amazon Review Checker
      </h1>
        
        <img src={prince} className="App-logo" alt="logo" />

        {contentFlag ?
           
         <><p>
            insert an  link
          </p><MyTextbox /></>
          : 
          
          <>

          {ResultsPage(json)}
          

          
          
          </>


          
          
          
          }
          <input type='button' onClick={function() {handleInputChange()}}></input>
     

      </header>
    </div>
  );
}

export default App;

