import { Button, SwipeableDrawer, IconButton, Drawer, Box, Typography, Divider, List } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react'
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const NavigationBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const navigate = useNavigate()
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn)
  const isClient = useSelector((state) => state.auth.isClient)
  const isCoach = useSelector((state) => state.auth.isCoach)
  const isAdmin = useSelector((state) => state.auth.isAdmin)


  const handleHomepageClick = (event) => (
    navigate('/')
  )
  const handleMyCyclesClick = (event) => (
    navigate('/cycles')
  )
  const handleMyProfileClick = (event) => (
    navigate('/profile')
  )
  const handleMyClientsClick = (event) => {
    navigate('/clients')
  }
  const handleManageUsersClick = (event) => {
    navigate('/users')
  }

  return (
    <>
      <IconButton 
        size='large'
        edge='start'
        color='inherit'
        aria-label="logo" 
        onClick={() => setIsDrawerOpen(true)}
      >
        <MenuIcon />
      </IconButton>
      
      <Drawer
        variant="temporary"
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box
          p={2}
          width={'250px'}
          textAlign='center'
          role='presentation'
        >
          <Typography variant="h6" color='text'>
            Menu
          </Typography>
          <Divider />
          <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleHomepageClick}>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary={"Homepage"} />
            </ListItemButton>
          </ListItem>

            { isClient ? 
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleMyCyclesClick} disabled={!isLoggedIn}>
                    <ListItemIcon>
                      <FormatListBulletedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"My Cycles"} />
                  </ListItemButton>
                </ListItem>
              </>
              : ""
            }

            { isCoach ? 
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleMyClientsClick} disabled={!isLoggedIn}>
                    <ListItemIcon>
                      <FormatListBulletedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"My Clients"} />
                  </ListItemButton>
                </ListItem>
              </>
              : ""  
            }

            { isAdmin ? 
              <>
                <ListItem disablePadding>
                  <ListItemButton onClick={handleManageUsersClick} disabled={!isLoggedIn}>
                    <ListItemIcon>
                      <FormatListBulletedIcon />
                    </ListItemIcon>
                    <ListItemText primary={"Manage users"} />
                  </ListItemButton>
                </ListItem>
              </>
              : ""    
            }

            <Divider />
            <ListItem disablePadding>
              <ListItemButton onClick={handleMyProfileClick} disabled={!isLoggedIn}>
                <ListItemIcon>
                  <AccountBoxIcon />
                </ListItemIcon>
              <ListItemText primary={"My Profile"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>  
  )
}

export default NavigationBar
