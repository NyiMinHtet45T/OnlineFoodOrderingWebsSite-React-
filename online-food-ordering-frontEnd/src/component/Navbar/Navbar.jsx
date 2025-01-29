import { Avatar, Badge, Button, IconButton } from '@mui/material'
import React, { createContext, useEffect, useState } from 'react'
import { red } from '@mui/material/colors';
import { Person, SearchOutlined, ShoppingCart } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import SearchFood from '../Restaurant/SearchFood';
import { cleanSearchFoodSuccess } from '../State/FoodCategoryAndFood/Reducer';
import GlobalMessageBox from './GlobalMessageBox';

export default function Navbar() {

   const auth = useSelector(state => state.auth)

   const { cartTotalItems } = useSelector(state => state.cart)

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const handleAvatorClick = () => {
      if (auth.user?.roleName !== null && auth.user?.roleName === "ROLE_CUSTOMER") {
         navigate("/my-profile/")
      } else {
         navigate("/admin/restaurant")
      }
   }

   const [searchText , setsearchText] = useState(null);

   const handleSearch = (value) => {
      if(value !== "") {
         setsearchText(value)
      }else {
         dispatch(cleanSearchFoodSuccess());
      }
     
   }

   return (
      <div>
         <div className="px-5 z-50 sticky py-[.8rem] bg-red-800 lg:px-20 flex justify-between">
            <div className="flex items-center space-x-4">
               <div className="lg:mr-10 cursor-pointer-flex items-center space-x-4">
                  <h1 className="logo list-none font-semibold cursor-pointer text-gray-300 text-3xl" onClick={() => navigate("/")}>
                     EatMal
                  </h1>
               </div>
            </div>
            <div className="flex  space-x-2 lg:space-x-10">
               <div className="bg-red-900 pl-3 rounded-full items-center">
                  <input onChange={(e) => handleSearch(e.target.value)} type="text" placeholder='search food ...' className='w-[230px] rounded-full pl-3 focus:outline-none text-sm py-0.5 bg-gray-300 text-black' />
                  <IconButton >
                     <SearchOutlined sx={{ fontSize: "1.5rem" }} />
                  </IconButton>
               </div>
               <div className=" cursor-pointer">
                  {
                     auth.user ? (<Avatar sx={{ bgcolor: "white", color: red[700] }} onClick={() => handleAvatorClick()}>{auth.user?.username[0].toUpperCase()}
                     </Avatar>) : (<IconButton onClick={() => navigate("/account/login")}><Person /></IconButton>)
                  }
               </div>
               <div className="">
                  <IconButton onClick={() => navigate("/cart")}>
                     <Badge badgeContent={cartTotalItems}>
                        <ShoppingCart sx={{ fontSize: "1.5rem" }} />
                     </Badge>
                  </IconButton>
               </div>
            </div>
         </div> 
         <div >
            <div className='absolute  container mx-auto'>
               <SearchFood search={searchText}/>
            </div>
         </div>
         <div >
            <div className=' justify-center  container mx-auto'>
               <GlobalMessageBox messages={"Hello"}/>
            </div>
         </div>  
      </div>
   )
}
