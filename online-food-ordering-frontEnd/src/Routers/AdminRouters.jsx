import React, { useEffect } from 'react'
import { Route, Routes } from 'react-router-dom'
import CreateRestaurant from '../AdminComponent/CreateRestaurantForm/CreateRestaurant'
import Admin from '../AdminComponent/Admin/Admin'
import Navbar from '../component/Navbar/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantByOwnerId } from '../component/State/Restaurant/Thunk'

export default function AdminRouters() {

  const userId = useSelector(state => state.auth.user?.id);

  const restaurant = useSelector(state => state.restaurant.restaurant);

  return (
    <div>
      <Routes>
         <Route path='/*' element={ restaurant?.ownerId == userId ?  <Admin/> : <CreateRestaurant/>}/>
      </Routes>
    </div>
  )
}
