import { useEffect, useState } from 'react'
import './App.css'
import LoginPage from './components/login/LoginPage'
import {
  createBrowserRouter,
  Router,
  RouterProvider,
} from "react-router-dom";
import NavigationBar from './components/layout/NavigationBar';
import TopBar from './components/layout/TopBar';
import HomeScreen from './components/layout/HomeScreen';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, ThemeProvider } from '@mui/material';
import CyclesPage from './components/tables/CyclesPage';
import WorkoutTable from './components/tables/WorkoutTable';
import CyclesPageEditable from './components/tables/CyclesPageEditable';
import WorkoutTableEditable from './components/tables/WorkoutTableEditable'

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
  {
    path: "/cycles",
    element: <CyclesPage />,
  },
  {
    path: "/cycles/:id",
    element: <WorkoutTable />
  },
  {
    path: "/cyclesedit",
    element: <CyclesPageEditable />
  },
  {
    path: "/cyclesedit/:id",
    element: <WorkoutTableEditable />
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
