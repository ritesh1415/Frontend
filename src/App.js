import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './Pages/Home';
import CustomField from './Pages/CustomField';
import View from './View';

function App() {
  return (
    <div className="App">
      <h1>hi</h1>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/multiple' element={<CustomField/>} />
          <Route path='/view' element={<View/>} />


        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
