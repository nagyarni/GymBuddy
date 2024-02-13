import React from 'react'
import TopBar from './TopBar'
import WorkoutTable from './WorkoutTable'

function HomeScreen() {
  return (
    <>
      <TopBar title='Home Screen' />
      <WorkoutTable />
    </>
  )
}

export default HomeScreen