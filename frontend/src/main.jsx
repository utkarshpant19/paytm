import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom'
import { Error } from './pages/Error.jsx'
import { Signup } from './pages/Signup.jsx'
import { SignIn } from './pages/Signin.jsx'
import { Dashboard } from './pages/Dashboard.jsx'
import { SendMoney } from './pages/SendMoney.jsx'

const router = createBrowserRouter([
  {
    path: '/', 
    element: <App/>,
    errorElement: <Error/>,
    children: [
      {path: '/', element: <Signup/> },
      {path: '/signup', element: <Signup/> },
      {path: '/signin', element: <SignIn/> },
      {path: '/dashboard', element: <Dashboard/> },
      {path: '/send-money', element: <SendMoney/> },

    ]

  },
])

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <RouterProvider router={router}/>
  </React.StrictMode>,
)
