import { redirect } from 'next/navigation'
import React from 'react'

const Dashboard = () => {
  return redirect('/profile')
}

export default Dashboard