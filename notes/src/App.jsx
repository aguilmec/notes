import './App.css';
import BoardsPage from './Pages/BoardsPage';
import Navbar from '../src/Components/Navbar';
import BoardDetail from './Pages/BoardDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import AuthContextProvider from './Context/authContext';
import ProtectedRoutes from './Components/ProtectedRoutes';

function App() {

 return(
  <div className='App w-screen flex h-screen bg-gray-800'>
    <AuthContextProvider>
      <Navbar>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<ProtectedRoutes><BoardsPage /></ProtectedRoutes>} />
            <Route path = '/mierda' element={<div>Mierdaaaaaaaaaaaa</div>} />
            <Route path='/board/:id' element={<BoardDetail />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
          </Routes>
        </BrowserRouter>
      </Navbar>
    </AuthContextProvider>
  </div>
 );
};

export default App;
