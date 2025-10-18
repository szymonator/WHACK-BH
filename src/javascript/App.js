import logo from '../assets/logo.svg';
import '../css/App.css';
import { MyTextbox } from './MyTextbox';

function App() {
  return (
    <div className="App">
      <h1>
        Amazon Review Checker
      </h1>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          insert an amazon link
        </p>

        <MyTextbox/>

      </header>
    </div>
  );
}

export default App;
