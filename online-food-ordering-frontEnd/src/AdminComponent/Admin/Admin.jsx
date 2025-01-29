import React from 'react'
import AdminSideBar from './AdminSideBar'
import { Route, Routes } from 'react-router-dom'
import Order from '../Order/Order'
import Menu from '../Menu/Menu'
import FoodCategory from '../FoodCategory/FoodCategory'
import Ingredient from '../Ingredient/Ingredient'
import Events from '../Events/Events'
import Details from '../Details/Details'
import CreateMenuForm from '../Menu/CreateMenuForm'
import DashBoard from '../DashBoard/DashBoard'
import CreateRestaurant from '../CreateRestaurantForm/CreateRestaurant'

export default function Admin() {

   const handleClose= () => {

   }

  return (
    <div>
      <div className="lg:flex justify-between">
         <div >
            <AdminSideBar handleClose={handleClose}/>
         </div>
         <div className="lg:w-[80vw]">
            <Routes>
               <Route path='/' element={<DashBoard/>}/>
               <Route path='/orders' element={<Order/>}/>
               <Route path='/menu' element={<Menu/>}/>
               <Route path='/category/' element={<FoodCategory/>}/>
               <Route path='/ingredients/' element={<Ingredient/>}/>
               <Route path='/events' element={<Events/>}/>
               <Route path='/details' element={<Details/>}/>
               <Route path='/add-menu/:id' element={<CreateMenuForm/>}/>
               <Route path='/update/:id' element={<CreateRestaurant/>}/>
            </Routes>
         </div>
      </div>
    </div>
  )
}
