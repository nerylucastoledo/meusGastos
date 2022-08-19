import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { DatabaseStorage } from './DatabaseContext';
import Header from './Components/Header/Header';
import LoginRoutes from './Components/Login/LoginRoutes';

import Dashboard from './Components/Home/Dashboard/Dashboard';
import Invoice from './Components/Invoice/Invoice';

import './App.css';
import NewCard from './Components/NewCard/NewCard';
import NewExpense from './Components/NewExpense/NewExpense';

function App() {
  return (
    <DatabaseStorage>
      <BrowserRouter>
        <Header />
        <main className="App">
          <Routes>
            <Route path='/' element={<Dashboard />}/>
            <Route path='/invoice/:card' element={<Invoice />}/>
            <Route path='new-card' element={<NewCard />}/>
            <Route path='new-expense' element={<NewExpense />}/>
            <Route path='login/*' element={<LoginRoutes />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </DatabaseStorage>
  );
}

export default App;
