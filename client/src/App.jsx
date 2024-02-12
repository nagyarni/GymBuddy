import { useState } from 'react'
import './App.css'
import LoginPage from './components/LoginPage'
import {
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";
import NavigationBar from './components/NavigationBar';

const router = createBrowserRouter([
  {
    path: "/",
    element: <h1>welcome!</h1>,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  const [count, setCount] = useState(0)
  
  return (
    <>
      <NavigationBar />
      <RouterProvider router={router} />
    </>
  )
}
  
export default App
