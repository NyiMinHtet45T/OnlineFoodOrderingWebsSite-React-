import React from 'react'
import { Route, Routes } from 'react-router-dom'
import AdminRouters from './AdminRouters'
import CustomerRouters from './CustomerRouters'

export default function Routers() {
   return (
      <div>
         <Routes>
            <Route path='/admin/restaurant/*' element={<AdminRouters />}></Route>
            <Route path='/*' element={<CustomerRouters />}></Route>
         </Routes>
      </div>
   )
}
