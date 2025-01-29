import { Box, Card, CardHeader, FormControl, MenuItem, Paper, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateFoodAvailable } from '../../component/State/FoodCategoryAndFood/Thunk';
import { getOrderItemByRestaurantId, updateOrderState } from '../../component/State/Order/Thunk';

export default function OrderTable() {

   const orderItemList = useSelector(state => state.order.orderItemList)

   const restaurant = useSelector(state => state.restaurant.restaurant);

   const dispatch = useDispatch();

   const handleOrderState = (orderId ,value) => {
      dispatch(updateOrderState(orderId, value, restaurant?.id, null ));
   }

   return (
      <div>
         <Box>
            <Card className='mt-1'>
               <CardHeader
                  title={"All Orders"}
                  sx={{ pt: 1, alignItems: "center" }}
                  className='underline'
               />
               <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                     <TableHead>
                        <TableRow>
                           <TableCell >id</TableCell>
                           <TableCell>Image</TableCell>
                           <TableCell align='center'>Customer</TableCell>
                           <TableCell align='center'>Quantity</TableCell>
                           <TableCell align='center'>TotalPrice</TableCell>
                           <TableCell align='center'>Food Name</TableCell>
                           <TableCell align='left'>Ingredient</TableCell>
                           <TableCell>status</TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {
                           orderItemList?.map((orderItem, index) => (
                              <TableRow key={orderItem.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                 <TableCell >{index + 1}</TableCell>
                                 <TableCell align='center'><img src={"/imgae/dishes/" + orderItem.foodImage} alt="" className='w-14 h-14' /></TableCell>
                                 <TableCell align='center'>{orderItem.customerName}</TableCell>
                                 <TableCell align='center'>{orderItem.quantity}</TableCell>
                                 <TableCell align='center'>{orderItem.totalPrice}</TableCell>
                                 <TableCell align='center'>{orderItem.foodName}</TableCell>
                                 <TableCell align='left'><div className='w-24 px-1 py-1 text-center rounded-lg border shadow-md shadow-gray-400 bg-gray-900'>{
                                    orderItem.ingredients.map(item => (
                                       <p>{item}</p>
                                    ))
                                 }</div></TableCell>
                                 <TableCell align='left'>
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
                                                '& .MuiMenuItem-root.Mui-selected' : {
                                                   color: orderItem.orderItemState !== "CANCELLED" ? orderItem.orderItemState === "PENDING" ? "yellow" : "green" : "red",
                                                }
                                             }
                                          }}

                                          variant='outlined'
                                          value={orderItem.orderItemState}
                                          onChange={(e) => handleOrderState(orderItem.id ,e.target.value)}>
                                          <MenuItem value={"PENDING"}>PENDING</MenuItem>
                                          <MenuItem value={"COMPLETED"}>COMPLETED</MenuItem>
                                          <MenuItem value={"CANCELLED"}>CANCELLED</MenuItem>
                                       </Select>
                                    </FormControl>
                                 </TableCell>
                              </TableRow>
                           ))
                        }
                     </TableBody>
                  </Table>
               </TableContainer>
            </Card>

         </Box>
      </div>
   )
}
