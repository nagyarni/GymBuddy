import { useEffect, useState } from 'react'
import './App.css'
import LoginPage from './components/auth/LoginPage'
import RegisterPage from './components/auth/RegisterPage'
import AccountPage from './components/auth/AccountPage'
import {
  createBrowserRouter,
  Navigate,
  Router,
  RouterProvider,
} from "react-router-dom";
import NavigationBar from './components/util/NavigationBar';
import TopBar from './components/util/TopBar';
import HomeScreen from './components/HomeScreen';
import { createTheme } from '@mui/material/styles';
import { CssBaseline, ThemeProvider } from '@mui/material';
import ClientsPage from './components/coach/ClientsPage'
import CyclesPageNew from './components/CyclesPageNew'
import WorkoutTableNew from './components/WorkoutTableNew'
import AdminPage from './components/admin/AdminPage'
import Chat from './components/chat/Chat'
import { useSelector } from 'react-redux'
import { useSnackbar } from './components/util/SnackBarContext'

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


// ProtectedRoute component to protect routes
const ProtectedRouteClient = ({ component: Component, props }) => {
const { setSnackbarMessage } = useSnackbar()
const isClient = useSelector((state) => state.auth.isClient);

  if (!isClient) {
    setSnackbarMessage({ message: "Please log in before accessing this page!", isError: true });
    return <> {Navigate({to:"/login"})} </>;
  }

  return <Component {...props} />;
};

const ProtectedRouteCoach = ({ component: Component, props }) => {
const { setSnackbarMessage } = useSnackbar()
const isCoach = useSelector((state) => state.auth.isCoach);

  if (!isCoach) {
    setSnackbarMessage({ message: "Please log in before accessing this page!", isError: true });
    return <> {Navigate({to:"/login"})} </>;
  }

  return <Component {...props} />;
};

const ProtectedRouteClientOrCoach = ({ component: Component, props }) => {
const { setSnackbarMessage } = useSnackbar()
const isClient = useSelector((state) => state.auth.isClient);
  const isCoach = useSelector((state) => state.auth.isCoach);

  if (!isClient && !isCoach) {
    setSnackbarMessage({ message: "Please log in before accessing this page!", isError: true });
    return <> {Navigate({to:"/login"})} </>;
  }

  return <Component {...props} />;
};

const ProtectedRouteAdmin = ({ component: Component, props }) => {
const { setSnackbarMessage } = useSnackbar()
const isAdmin = useSelector((state) => state.auth.isAdmin);

  if (!isAdmin) {
    setSnackbarMessage({ message: "Please log in before accessing this page!", isError: true });
    return <> {Navigate({to:"/login"})} </>;
  }

  return <Component {...props} />;
};

const ProtectedRouteLoggedIn = ({ component: Component, props }) => {
const { setSnackbarMessage } = useSnackbar()
const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  if (!isLoggedIn) {
    setSnackbarMessage({ message: "Please log in before accessing this page!", isError: true });
    return <> {Navigate({to:"/login"})} </>;
  }

  return <Component {...props} />;
};


const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeScreen />,
  },
  {
    path: "/:clientid/cycles",
    element: <ProtectedRouteClientOrCoach component={CyclesPageNew} />,
  },
  {
    path: "/:clientid/cycles/:cycleid",
    element: <ProtectedRouteClientOrCoach component={WorkoutTableNew} />
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
    element: <ProtectedRouteLoggedIn component={AccountPage} />
  },
  {
    path: "/clients",
    element: <ProtectedRouteCoach component={ClientsPage} />
  },
  {
    path: "/users",
    element: <ProtectedRouteAdmin component={AdminPage} />
  },
  {
    path: "/chat/:clientid/:coachid",
    element: <ProtectedRouteClientOrCoach component={Chat} />
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
