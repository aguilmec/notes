import './App.css';
import BoardsPage from './Pages/BoardsPage';
import Navbar from '../src/Components/Navbar';
import BoardDetail from './Pages/BoardDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {

 return(
  <div className='App w-screen flex h-screen bg-gray-800'>
    <Navbar>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<BoardsPage />} />
          <Route path='/board/:id' element={<BoardDetail />} />
        </Routes>
      </BrowserRouter>
    </Navbar>
  </div>
 );
};

export default App;
