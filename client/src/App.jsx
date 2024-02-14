import { useEffect, useState } from 'react'
import './App.css'
import LoginPage from './components/LoginPage'
import {
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";
import NavigationBar from './components/NavigationBar';
import TopBar from './components/TopBar';
import HomeScreen from './components/HomeScreen';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, ThemeProvider } from '@mui/material';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
]);

function App() {
  const [count, setCount] = useState(0)

  const [backendData, setBackendData] = useState([{}])

/*   useEffect(() => {
    fetch("/api").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
        console.log(backendData.users)
      }
    )
  }, []) */
  
  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline />
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  )
}
  
export default App
