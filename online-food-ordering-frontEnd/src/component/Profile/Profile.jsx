import React, { useState, useEffect } from 'react'
import ProfileNavigation from './ProfileNavigation'
import { Route, Routes } from 'react-router-dom';
import UserProfile from './UserProfile';
import Order from './Order';
import Favorite from './Favorite';
import Address from './Address';
import Events from './Events';
import { useDispatch, useSelector } from 'react-redux'
import { getAllFavouriteByUserId } from '../State/Restaurant/Thunk';

export default function Profile() {

   const [openSlideBar, setOpenBar] = useState(false);

   const dispatch = useDispatch();
 
  return (
    <div>
      <div className="lg:flex justify-between">
         <div className="sticky h-[80] lg:w-[20%]">
            <ProfileNavigation open={openSlideBar}/>
         </div>
         <div className="lg:w-[80%]">
          <Routes>
            <Route path='/' element={<UserProfile/>}/>
            <Route path='/orders' element={<Order/>}/>
            <Route path='/address' element={<Address/>}/>
            <Route path='/favorite' element={<Favorite/>}/>
            <Route path='/events' element={<Events/>}/>
          </Routes>
         </div>
      </div>
    </div>
  )
}
