import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './Components/Header/Header';
import Dashboard from './Components/Home/Dashboard/Dashboard';
import LoginRoutes from './Components/Login/LoginRoutes';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="App">
        <Routes>
          <Route path='/' element={<Dashboard />}/>
          <Route path='login/*' element={<LoginRoutes />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
