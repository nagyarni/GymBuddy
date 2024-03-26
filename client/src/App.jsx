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
import CoachFetchWrapper from './components/coach/CoachFetchWrapper'
import CyclesPageNew from './components/CyclesPageNew'
import WorkoutTableNew from './components/WorkoutTableNew'
import AdminPage from './components/admin/AdminPage'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    info : {
      main: '#ce71af',
      light: '#e6bb18',
      dark: '#018080',
    },
    customColor1: {
      main: '#ce71af',
      contrastText: '#ffffff',
    },
    customColor2: {
      main: '#e6bb18',
      contrastText: '#ffffff',
    },
    customColor3: {
      main: '#018080',
      contrastText: '#ffffff',
    }
  },
  typography: {
    caption: {
      fontFamily: 'Roboto',
    },
  },
})

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/:clientid/cycles",
    element: <CyclesPageNew />,
  },
  {
    path: "/:clientid/cycles/:cycleid",
    element: <WorkoutTableNew />
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
    path: "/users",
    element: <AdminPage />
  }
]);

function App() {  
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
