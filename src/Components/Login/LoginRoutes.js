import React from 'react'
import { Route, Routes } from 'react-router-dom'

import SignIn from './SignIn/SignIn'
import CreateAccount from './CreateAccount/CreateAccount'
import LostPassword from './LostPassword/LostPassword'
import PageNotFound from '../PageNotFound/PageNotFound'

function LoginRoutes() {
  return (
    <Routes>
    <Route path='/' element={<SignIn />}></Route>
    <Route path='criar' element={<CreateAccount />}></Route>
    <Route path='perdeu' element={<LostPassword />}></Route>
    <Route path='*' element={<PageNotFound />}></Route>
  </Routes>
  )
}

export default LoginRoutes