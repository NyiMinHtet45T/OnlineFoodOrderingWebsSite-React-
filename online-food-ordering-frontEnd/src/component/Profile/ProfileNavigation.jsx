import { AccountBalance, AccountBalanceWalletOutlined, AddReaction, Event, Favorite, Logout, NotificationsActiveOutlined, ShoppingBagOutlined } from '@mui/icons-material'
import { Divider, Drawer, useMediaQuery } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { logout } from '../State/Authentication/Thunk'
import { getAllFavouriteByUserId } from '../State/Restaurant/Thunk'
import { cartlogoutSuccess, getCartSuccess, getCartTotalPriceAndItems, getFinalTotalPrice } from '../State/Cart/Reducer'
import { reciveMessageSuccess } from '../State/MessageReducer'

const menu = [
   { title: "Orders", icon: <ShoppingBagOutlined /> },
   { title: "Favorite", icon: <Favorite /> },
   { title: "Address", icon: <AddReaction /> },
   { title: "Payment", icon: <AccountBalanceWalletOutlined /> },
   { title: "Notification", icon: <NotificationsActiveOutlined /> },
   { title: "Events", icon: <Event /> },
   { title: "Logout", icon: <Logout /> },
]



export default function ProfileNavigation(open, handleClose) {

   const isSmallScreen = useMediaQuery("(max-width:1080px)")

   const navigate = useNavigate();

   const dispatch = useDispatch();

   const handleNavigate = item => {
      
      if (item.title === "Logout") {
         dispatch(logout(navigate));
         dispatch(cartlogoutSuccess())
         dispatch(reciveMessageSuccess("Successfully Logout!"))
      }else {
         navigate(`/my-profile/${item.title.toLowerCase()}`)
      }
}

   return (
      <div>
         <Drawer variant={isSmallScreen ? "temporary" : "permanent"} 
         anchor="left" 
         onClose={handleClose} 
         open={isSmallScreen ? open : true} 
         sx={{ zIndex: -10 }}>
            <div className='w-[50vw] lg:w-[20vw] h-[90vh] flex flex-col justify-center text-xl gap-8 pt-28'>
               {
                  menu.map((item, i) => <>
                     <div onClick={() => handleNavigate(item)} className="px-5 flex items-center space-x-5 cursor-pointer">
                        {item.icon}
                        <span>{item.title}</span>
                     </div>
                     {i !== menu.length-1 && <Divider/> }
                  </>)
               }

            </div>
         </Drawer>
      </div>
   )
}
