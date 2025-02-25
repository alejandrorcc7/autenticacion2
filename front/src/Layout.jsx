import React from 'react'
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import Navbar from './components/Navbar'
import PagSecreta from './views/PagSecreta'
import PrivateRoute from './views/PrivateRoute'
import Register from './views/Register'
import Login from './views/Login'

const Layout = () => {
    return (
        <AuthProvider>
            <BrowserRouter>
                <Navbar />
                <Routes>
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path='/pagsecreta' element={
                       <PrivateRoute>
                           <PagSecreta />
                       </PrivateRoute>
                    } />
                    <Route path='/register' element={<Register />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='*' element={ <h1> Page not found (404) </h1> } />
                </Routes>
            </BrowserRouter>
        </AuthProvider>
    )
}

export default Layout