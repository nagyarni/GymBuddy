import { Button, SwipeableDrawer, IconButton, Drawer, Box, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react'

const NavigationBar = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

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
        </Box>
      </Drawer>
    </>  
  )
}

export default NavigationBar
