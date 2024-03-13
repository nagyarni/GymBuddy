import { useEffect, useState } from 'react'
import './App.css'
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'
import AccountPage from './components/auth/AccountPage'
import {
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";
import NavigationBar from './components/util/NavigationBar';
import TopBar from './components/util/TopBar';
import HomeScreen from './components/HomeScreen';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, ThemeProvider } from '@mui/material';
import CyclesPage from './components/client/CyclesPage';
import WorkoutTable from './components/client/WorkoutTable';
import CyclesPageEditable from './components/coach/CyclesPageEditable';
import WorkoutTableEditable from './components/coach/WorkoutTableEditable'
import ClientsPage from './components/coach/ClientsPage'
import FetchTesting from './components/util/FetchTesting'
import ClientFetchWrapper from './components/client/ClientFetchWrapper'

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
    path: "/cycles",
    element: <ClientFetchWrapper content={0} />,
  },
  {
    path: "/cycles/:id",
    element: <ClientFetchWrapper content={1} />
  },
  {
    path: "/cyclesedit",
    element: <CyclesPageEditable />
  },
  {
    path: "/cyclesedit/:id",
    element: <WorkoutTableEditable />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/account",
    element: <AccountPage />
  },
  {
    path: "/clients",
    element: <ClientsPage />
  },
  {
    path: "/test",
    element: <FetchTesting />
  }
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
