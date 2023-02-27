import { useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";
import TodoPage from './pages/TodoPage/TodoPage';
import LoginPage from './pages/LoginPage/LoginPage';

function App() {

  const navigate = useNavigate();

  useEffect(() => {
    navigate('/login');
   }, [])
  
  

  return (
    <div className="App">

    <Routes>
      <Route path="/" element={<TodoPage />} />
      <Route path="/login" element={<LoginPage />}  />
    </Routes>


    </div>
  );
}

export default App;
