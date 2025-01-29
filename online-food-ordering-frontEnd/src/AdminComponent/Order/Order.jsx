import { Card, FormControl, FormControlLabel, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import OrderTable from './OrderTable';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderItemByRestaurantId } from '../../component/State/Order/Thunk';

const orderStatus = [
   {id:1, label:"All", value:"All"},
   {id:2 ,label:"Pending", value:"PENDING"},
   {id:3 ,label:"Completed", value:"COMPLETED"}
]

export default function Order() {

   const [filterValue, setFilterValue] = useState("All");

   const handleFilter = (e) => {
      e.preventDefault();
      setFilterValue(e.target.value);
   }

   const restaurant = useSelector(state => state.restaurant.restaurant);

   const dispatch = useDispatch();

   useEffect(() => {
      dispatch(getOrderItemByRestaurantId(restaurant?.id,filterValue));
   },[filterValue])

  return (
    <div>
      <div className='px-2'>
         <Card className='p-4'>
            <Typography sx={{paddingBottom:"1rem"}} variant='h6' >Order Status</Typography>
            <FormControl>
               <RadioGroup onChange={handleFilter} row name='category' value={filterValue}>
                  {orderStatus.map(status => (
                     <FormControlLabel key={status.id} value={status.value} control={<Radio/>} label={status.label} sx={{color: "gay"}}/>
                  ))}
               </RadioGroup>   
            </FormControl>
         </Card>
         <OrderTable/>  
      </div>
    </div>
  )
}
