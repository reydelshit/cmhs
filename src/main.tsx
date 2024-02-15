import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './components/Login'
import LayoutFarmer from './root/LayoutFarmer'
import FarmerRoot from './root/FarmerRoot'
import LayoutQA from './root/LayoutQA'
import QualityARoot from './root/QualityARoot'

const logoutUser = async () => {
  localStorage.removeItem('token')
  window.location.href = '/login'
}
const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <LayoutFarmer>
        <FarmerRoot />
      </LayoutFarmer>
    ),
    errorElement: <div>Not found</div>,
  },

  {
    path: '/login',
    element: <Login />,
    errorElement: <div>Not found</div>,
  },

  {
    path: 'qa',
    element: (
      <LayoutQA>
        <QualityARoot />
      </LayoutQA>
    ),
    errorElement: <div>Not found</div>,

    children: [
      {
        path: 'visit',
        element: <div>yes</div>,
      },
    ],
  },

  {
    path: 'logout',
    action: logoutUser,
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
