import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import { DatabaseStorage } from './DatabaseContext'
import ProtectedRoute from './ProtectedRoute'

import Header from './Components/Header/Header'
import Dashboard from './Components/Home/Dashboard/Dashboard'
import Invoice from './Components/Invoice/Invoice'
import NewCard from './Components/NewCard/NewCard'
import NewExpense from './Components/NewExpense/NewExpense'
import LoginRoutes from './Components/Login/LoginRoutes'

import './App.css'
import Debts from './Components/Debts/Debts'
import PageNotFound from './Components/PageNotFound/PageNotFound'

function App() {
  return (
    <DatabaseStorage>
      <BrowserRouter>
        <Header />
        <main className="App">
          <Routes>
            <Route path='/'
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route path='/invoice/:card'
              element={
                <ProtectedRoute>
                  <Invoice />
                </ProtectedRoute>
              }
            />
            <Route path='new-card'
              element={
                <ProtectedRoute>
                  <NewCard />
                </ProtectedRoute>
              }
            />
            <Route path='new-expense'
              element={
                <ProtectedRoute>
                  <NewExpense />
                </ProtectedRoute>
              }
            />
            <Route path='debts'
              element={
                <ProtectedRoute>
                  <Debts />
                </ProtectedRoute>
              }
            />
            <Route path='login/*' element={<LoginRoutes />}></Route>
            <Route path='*' element={<PageNotFound />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </DatabaseStorage>
  )
}

export default App
