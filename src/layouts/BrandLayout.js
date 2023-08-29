import React from 'react'
import { Outlet } from 'react-router-dom'

const BrandLayout = () => {
  return (
    <div className='w-[70%]'>BrandLayout <Outlet /></div>
  )
}

export default BrandLayout