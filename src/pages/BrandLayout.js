import React from 'react'
import { Outlet } from 'react-router-dom'

const BrandLayout = () => {
  return (
      <div>BrandLayout
          <Outlet />
    </div>
  )
}

export default BrandLayout