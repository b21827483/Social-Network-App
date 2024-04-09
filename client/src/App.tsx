import React, {Fragment, useContext} from 'react'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";

import './App.scss'
import {AuthContext} from "./context/AuthContext";

import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/Signup/SignupPage";
import Layout from "./components/UI/Bars/Layout";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";

function App() {

    const {currentUser} = useContext(AuthContext);

    const ProtectedRoute = ({children}) => {
        if (!currentUser) {
            return <Navigate to='login' />;
        }

        return children
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <ProtectedRoute><Layout /></ProtectedRoute>,
            children: [
                {path: '/', element: <HomePage />},
                {path: '/profile/', element: <ProfilePage />}
            ]
        },
        {
            path: '/login',
            element: <LoginPage />
        },
        {
            path: '/signup',
            element: <SignUpPage />
        }
        ]
    )

  return (
    <Fragment>
      <RouterProvider router={router} />
    </Fragment>
  )
}

export default App
