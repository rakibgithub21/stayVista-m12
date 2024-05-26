import { createBrowserRouter } from 'react-router-dom'
import Main from '../layouts/Main'
import Home from '../pages/Home/Home'
import ErrorPage from '../pages/ErrorPage'
import Login from '../pages/Login/Login'
import SignUp from '../pages/SignUp/SignUp'
import RoomDetails from '../pages/RoomDetails/RoomDetails'
import PrivateRoute from './PrivateRoute'
import DashboardLayOut from '../layouts/DashboardLayOut'
import Statistics from '../pages/Dashboard/Common/Statistics'
import AddRoom from '../pages/Dashboard/Host/AddRoom'
import MyListings from '../pages/Dashboard/Host/MyListings'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/room/:id',
        element: <PrivateRoute><RoomDetails /></PrivateRoute>,
      },
    ],
  },
  { path: '/login', element: <Login /> },
  { path: '/signup', element: <SignUp /> },

  // for dashboard:
  {
    path: '/dashboard',
    element: <DashboardLayOut></DashboardLayOut>,
    children: [
      {
        index: true,
        element:<Statistics></Statistics>
      },
      {
        path: '/dashboard/add-room',
        element:<AddRoom></AddRoom>
      },
      {
        path: '/dashboard/my-listings',
        element:<MyListings></MyListings>
      },
    ]
  }
])
