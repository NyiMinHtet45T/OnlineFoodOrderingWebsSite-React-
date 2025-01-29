import { AdminPanelSettings, Category, Dashboard, Event, FastfoodOutlined, Logout, ShoppingBag, ShopTwoOutlined } from '@mui/icons-material'
import { Divider, Drawer, useMediaQuery } from '@mui/material'
import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { restaurantLogout } from '../../component/State/Restaurant/Thunk'

const menu = [
   { title: "Dashboard", icon: <Dashboard />, path: "/" },
   { title: "Orders", icon: <ShoppingBag />, path: "/orders" },
   { title: "Menu", icon: <ShopTwoOutlined />, path: "/menu" },
   { title: "Food Category", icon: <Category />, path: "/category" },
   { title: "Ingredient", icon: <FastfoodOutlined />, path: "/ingredients" },
   { title: "Events", icon: <Event />, path: "/events" },
   { title: "Details", icon: <AdminPanelSettings />, path: "/details" },
   { title: "Logout", icon: <Logout /> },
]

export default function AdminSideBar({ handleClose }) {

   const isSmallScreen = useMediaQuery("(max-width:1080px)")

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const handleNavigate = (item) => {
      if(item.title === "Logout") {
         dispatch(restaurantLogout(navigate));
      }else {
         navigate(`/admin/restaurant${item.path}`)
      }
   }

   return (
      <div>
         <div>
            <Drawer variant={isSmallScreen ? "temporary" : "permanent"}
               onClose={handleClose} 
               open={isSmallScreen ? false : true}
               anchor='left' 
               sx={{ zIndex: -10 }}>
               <div className='w-[70vw] lg:w-[20vw] h-[90vh] flex flex-col justify-center text-xl space-y-[1.65rem]'>
                  {
                     menu.map((item, index) => (
                        <div key={index} >
                           <div className='px-5 flex items-center gap-5 space-y-4 cursor-pointer' onClick={() => handleNavigate(item)}>
                              {item.icon}
                              <span>{item.title}</span>
                           </div>
                           {index !== menu.length-1 && <Divider/>} 
                        </div>
                     ))
                  }
               </div>
            </Drawer>
         </div>
      </div>
   )
}
