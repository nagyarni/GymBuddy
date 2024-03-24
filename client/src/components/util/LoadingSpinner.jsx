import { Box, CircularProgress } from '@mui/material'
import React from 'react'

function LoadingSpinner() {
  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <CircularProgress />
      </Box>
    </>
  )
}

export default LoadingSpinner