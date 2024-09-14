import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Signup from './Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/Signup' element={<Signup/>}></Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
