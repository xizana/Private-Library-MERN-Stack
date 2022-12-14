import React from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthContext } from './hooks/useAuthContext'


// components && pages
import Navbar from './Components/Navbar'
import Home from './pages/Home'
import Signup from './pages/Signup'
import Login from './pages/Login'
import Recomendations from './pages/Recomendations'
import WelcomePage from './Components/WelcomePage'
import ResetPassword from "./Components/ResetPassword"
import ForgotPassword from "./Components/ForgotPassword"

export default function App() {
  const { user } = useAuthContext()

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <div className="pages">
          <Routes>
            <Route
              path="/recomendations"
              element={!user ? <Recomendations /> : <Navigate to="/" />}
            />
            <Route
              path="/"
              element={user ? <Home /> : <WelcomePage />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/" />}
            />
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/" />}
            />
            <Route
              path='/sendpasswordlink'
              element={!user && <ResetPassword />}
            />
            <Route
              path='/forgotpassword/:id/:token'
              element={!user && <ForgotPassword />}
            />
          </Routes>
        </div>

      </BrowserRouter>
    </div>
  )
}
