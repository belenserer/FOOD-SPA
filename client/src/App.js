import './App.css';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import LandingPage from './components/LandingPage';
import Home from './components/Home';
import Created from './components/Created';
import Details from './components/Details';


function App() {
  return (
  <div className="App">
    <BrowserRouter>
    
      <Routes>
        <Route exact path='/' element= { <LandingPage/> }/>
        <Route path ='/home' element = { <Home/> }/>
        <Route path = '/home/create' element = { <Created/>} />
        <Route path= '/home/detail/:id' element = {<Details/>} />
      </Routes>
    
    </BrowserRouter>
    </div>
  );
}

export default App;
