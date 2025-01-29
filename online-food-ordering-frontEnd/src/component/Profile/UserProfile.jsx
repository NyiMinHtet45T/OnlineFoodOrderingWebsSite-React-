import { AccountCircle } from '@mui/icons-material'
import { Button } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../State/Authentication/Thunk';
import { cartlogoutSuccess } from '../State/Cart/Reducer';
import { reciveMessageSuccess } from '../State/MessageReducer';
import { useNavigate } from 'react-router-dom';

export default function UserProfile() {

   const {user} = useSelector(state => state.auth);

   const dispatch = useDispatch();

   const navigate = useNavigate()

   const handleLogout = () => {
      dispatch(logout(navigate));
      dispatch(cartlogoutSuccess())
      dispatch(reciveMessageSuccess("Successfully Logout!"))
   }

   return (
      <div>
         <div className="min-h-[80vh] flex flex-col justify-center text-center">
            <div className="flex flex-col items-center justify-center">
               <AccountCircle sx={{ fontSize: "9rem" }} />
               <h1 className="py-5 text-2xl font-semibold">{user?.username}</h1>
               <p>Email:{user?.email}</p>
               <Button variant='contained' onClick={handleLogout} sx={{ margin: "2rem 0rem" }}>Logout</Button>
            </div>
         </div>
      </div>
   )
}
