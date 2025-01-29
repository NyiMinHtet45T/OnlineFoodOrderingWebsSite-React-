import { AddCircleOutline, Delete, RemoveCircleOutline } from '@mui/icons-material'
import { Chip, IconButton } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addCartQuantity, getCartByUserId, removeCartItem } from '../State/Cart/Thunk'

export default function CartItem() {

   const { cart } = useSelector(state => state.cart)

   const dispatch = useDispatch();

   const userId = useSelector(state => state.auth.user?.id);

   var totalQuantity = 0;

   const addingQuantity = (itemId, quantity, isIncrement) => {
      if(isIncrement) {
         totalQuantity = quantity + 1;
         dispatch(addCartQuantity(itemId, totalQuantity, cart?.id));
         
      }else {
         totalQuantity = quantity -1;
         dispatch(addCartQuantity(itemId, totalQuantity, cart?.id));
      }
   }

   const handleItemDelete = (itemId) => {
      if(userId) {
         dispatch(removeCartItem(itemId, userId))
      }
   }
   
   return (
      <div>
         {
            cart?.cartItemDto.map(item => (
               <div className='px-5 mb-3' key={item.id}>
                  <div className="lg:flex items-center lg:space-x-5">
                     <div>
                        <img src={`/imgae/dishes/${item.image}`} alt="" className='w-[5rem] h-[5rem] object-cover' />
                     </div>
                     <div className="flex items-center justify-between lg:w-[60%]">
                        <div className="space-y-1 lg:space-y-2 text-sm w-full">
                           <p>{item.foodName}</p>
                           <div className="flex justify-between items-center">
                              <div className="flex items-center space-x-1">
                                 <IconButton onClick={() => addingQuantity(item.id, item.quantity, false)}>
                                    <RemoveCircleOutline />
                                 </IconButton>
                                 <div className="w-5 h-5 text-xs flex items-center justify-center">
                                    {item.quantity}
                                 </div>
                                 <IconButton onClick={() => addingQuantity(item.id, item.quantity, true)}>
                                    <AddCircleOutline />
                                 </IconButton>
                              </div>
                           </div>
                        </div>
                        <p>{item.totalPrice + "ks"}</p>
                     </div>
                     <div>
                           <IconButton onClick={() => handleItemDelete(item.id)}>
                              <Delete sx={{color: "red"}}/>
                           </IconButton>
                        </div>
                  </div>
                  <div className="pt-3 space-x-2">
                     {item.ingredients.map(ingredient => <Chip label={ingredient} />)}
                  </div>
               </div>
            ))
         }
      </div>
   )
}
