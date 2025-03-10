import React from 'react'
import Navbar from '../component/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from '../component/Home/Home'
import RestaurantDetail from '../component/Restaurant/RestaurantDetail'
import Cart from '../component/Cart/Cart'
import Profile from '../component/Profile/Profile'
import Auth from '../component/Auth/Auth'
import SearchFood from '../component/Restaurant/SearchFood'

export default function CustomerRouters() {

  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/account/:register' element={<Home />} />
        <Route path='/restaurantDetail/:id' element={<RestaurantDetail />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='/my-Profile/*' element={<Profile />} />
        <Route path='/search' element={<SearchFood />} />
      </Routes>
      <Auth />
    </div>
  )
}
