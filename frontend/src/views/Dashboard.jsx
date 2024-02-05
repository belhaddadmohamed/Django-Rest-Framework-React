import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'

function Dashboard() {
  const {user} = useContext(AuthContext)

  return (
    <>
      <h1>This is the Dashboard</h1>
      <h2>Hello, MR. {user.name}</h2>
      <h4 className='text-success'>{user.bio}</h4>
    </>
  )
}

export default Dashboard