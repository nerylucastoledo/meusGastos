import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DatabaseStorage } from './DatabaseContext';
import Header from './Components/Header/Header';
import Dashboard from './Components/Home/Dashboard/Dashboard';
import LoginRoutes from './Components/Login/LoginRoutes';

import './App.css';

function App() {
  return (
    <DatabaseStorage>
      <BrowserRouter>
        <Header />
        <main className="App">
          <Routes>
            <Route path='/' element={<Dashboard />}/>
            <Route path='login/*' element={<LoginRoutes />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </DatabaseStorage>
  );
}

export default App;
