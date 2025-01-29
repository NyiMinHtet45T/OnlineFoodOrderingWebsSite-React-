import { Accordion, AccordionDetails, AccordionSummary, Button, Card, Chip, FormControl, MenuItem, Select, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { cancelOrderItem, getOrderItemByUserId, updateOrderState } from '../State/Order/Thunk';
import { ArrowDownward, ArrowDownwardOutlined, ArrowDropDown } from '@mui/icons-material';
import { Field, Form, Formik } from 'formik';

export default function OrderCard() {

   const dispatch = useDispatch();

   const userId = useSelector(state => state.auth.user?.id);
   const orderItemList = useSelector(state => state.order.orderItemList);

   useEffect(() => {
      dispatch(getOrderItemByUserId(userId))
   }, [])

   const handleOrderState = ( orderItemId ,orederState) => {
      if(orederState === "CANCELLED") {
         dispatch(cancelOrderItem(orderItemId, userId))
         dispatch(updateOrderState(orderItemId, orederState, null, userId));
      }else {
         dispatch(updateOrderState(orderItemId, orederState, null, userId));
      }
      
   }

   return (
      <div>
         {
            orderItemList.map(orderItem => (
               <div key={orderItem.id} className='mb-2'>
                  <Accordion >
                     <AccordionSummary
                        expandIcon={<ArrowDropDown />}
                        aria-controls="panel2-content"
                        id="panel2-header"
                     >
                        <Card className="items-center flex  p-1 ">
                           <div className="flex items-center space-x-5">
                              <img src={`/imgae/dishes/${orderItem.foodImage}`} alt="" className='h-16 w-16 rounded-sm' />
                              <div className='w-36'>
                                 <p>{orderItem.foodName}</p>
                                 <p>{orderItem.totalPrice} Ks</p>
                              </div>
                           </div>
                           <div className='flex-1 w-36 text-center'>
                              <p>TotalItem</p>
                              <p>{orderItem.quantity}</p>
                           </div>
                           <div className='flex-1 w-40 text-center'>
                              {
                                 orderItem.orderItemState === "COMPLETED" ? <p className='text-lime-600'>COMPLETED</p> :
                                    <div className='items-center'>
                                       <FormControl>
                                          <Select
                                             size='small'
                                             as={Select}
                                             labelId='demo-simple-select-label'
                                             id='available'
                                             name='available'
                                             sx={{
                                                '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                                                   borderColor: orderItem.orderItemState !== "CANCELLED" ? orderItem.orderItemState === "PENDING" ? "yellow" : "green" : "red"
                                                }
                                             }}
                                             MenuProps={{
                                                sx: {
                                                   '& .MuiMenuItem-root.Mui-selected': {
                                                      color: orderItem.orderItemState !== "CANCELLED" ? orderItem.orderItemState === "PENDING" ? "yellow" : "green" : "red",
                                                   }
                                                }
                                             }}

                                             variant='outlined'
                                             value={orderItem.orderItemState}
                                             onChange={(e) => handleOrderState(orderItem.id, e.target.value)}>
                                             <MenuItem value={"PENDING"}>PENDING</MenuItem>
                                             <MenuItem value={"CANCELLED"}>CANCELLED</MenuItem>
                                          </Select>
                                       </FormControl>
                                    </div>
                              }

                           </div>
                        </Card>
                     </AccordionSummary>
                     <AccordionDetails>
                        <div className=" space-x-2">
                           {orderItem.ingredients.map(ingredient => <Chip label={ingredient} />)}
                        </div>
                     </AccordionDetails>
                  </Accordion>
               </div>
            ))
         }
      </div>
   )
}
