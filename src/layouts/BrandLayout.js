import React from 'react'
import { Outlet } from 'react-router-dom'

const BrandLayout = () => {
  return (
    <div className='w-[100%]'> <Outlet /></div>
  )
}

export default BrandLayout