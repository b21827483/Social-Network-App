import React, {Fragment, useState} from 'react'
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";

import './App.css'
import LoginPage from "./pages/Login/LoginPage";
import SignUpPage from "./pages/Signup/SignupPage";
import Layout from "./components/UI/Layout";
import HomePage from "./pages/Home/HomePage";
import ProfilePage from "./pages/Profile/ProfilePage";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(true);

    const ProtectedRouter = ({children}) => {
        if (!isLoggedIn) {
            return <Navigate to='login' />;
        }

        return children
    }

    const router = createBrowserRouter([
        {
            path: '/',
            element: <ProtectedRouter><Layout /></ProtectedRouter>,
            children: [
                {path: '/', element: <HomePage />},
                {path: '/profile/:id', element: <ProfilePage />}
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
