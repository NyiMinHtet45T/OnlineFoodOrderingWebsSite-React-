import React, { useState } from 'react'
import { Box, Button, Card, CardHeader, Icon, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Create, Delete, Update } from '@mui/icons-material'
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFood, updateFoodAvailable } from '../../component/State/FoodCategoryAndFood/Thunk';

export default function MenuTable() {

   const navigate = useNavigate();

   const foodList = useSelector(state => state.food.foodList);

   const restaurant = useSelector(state => state.restaurant.restaurant);

   const [icon, setIcon] = useState(false);

   const dispatch = useDispatch();

   const handleDelete = (foodId) => {
      dispatch(deleteFood(foodId, restaurant?.id));
   }

   const handleAvailable = (foodId) => {
      dispatch(updateFoodAvailable(foodId, restaurant?.id))
   }

   return (
      <div>
         <Box>
            <Card className='mt-1'>
               <CardHeader
                  title={"Menu"}
                  sx={{ pt: 1, alignItems: "center" }}
                  className='underline'
                  action={
                     <div>
                        <IconButton aria-label='settings' onClick={() => navigate("/admin/restaurant/add-menu/0")}>
                           <p className='text-sm me-2 text-lime-500'>create </p>
                           <Create sx={{ fontSize: "1.3rem" , color: "green"}} />
                        </IconButton>
                        {
                           icon ? <IconButton aria-label='settings' onClick={() => setIcon(false)}>
                              <p className='text-sm me-2 text-red-500'>Delete </p>
                              <Delete sx={{ fontSize: "1.3rem", color: "red" }} />
                           </IconButton> :
                              <IconButton aria-label='settings' onClick={() => setIcon(true)}>
                                 <p className='text-sm me-2 text-yellow-500'>Update </p>
                                 <Update sx={{ fontSize: "1.3rem", color: "yellow" }} />
                              </IconButton>
                        }
                     </div>
                  }
               />

            </Card>
            <TableContainer component={Paper}>
               <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                     <TableRow>
                        <TableCell >No.</TableCell>
                        <TableCell>Image</TableCell>
                        <TableCell align='center'>Name</TableCell>
                        <TableCell align='center'>foodCategory</TableCell>
                        <TableCell align='center'>Ingredient</TableCell>
                        <TableCell align='center'>Price</TableCell>
                        <TableCell align='center'>Avability</TableCell>
                        <TableCell align='right'><p className='font-semibold'>{icon ? "Update" : "Delete"}</p></TableCell>
                     </TableRow>
                  </TableHead>
                  <TableBody>
                     {
                        foodList.map((food, index) => (
                           <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                              <TableCell>{index + 1}</TableCell>
                              <TableCell><img src={"/imgae/dishes/" + food.images} alt="" className='w-14 h-14' /></TableCell>
                              <TableCell align='center'>{food.name}</TableCell>
                              <TableCell align='center'>{food.foodCategoryName}</TableCell>
                              <TableCell align='center'>{
                                 food.ingredientCategoryAndItemName.map(category => (
                                    <div key={category.id}>
                                       <p className='underline font-bold pb-1 '>{category.categoryName}</p>
                                       <div className='pb-1.5'>
                                          {
                                             category.ingredientsItemDtoList.map(item => (
                                                <div>{item.name}</div>
                                             ))}
                                       </div>

                                    </div>
                                 ))
                              }</TableCell>
                              <TableCell align='center'>{food.price}</TableCell>
                              <TableCell align='center'>
                                 <Button variant='outlined' color={food.available ? "success" : "error"} onClick={() => handleAvailable(food.id)}>
                                    {food.available ? "Yes" : "No"}
                                 </Button>
                              </TableCell>
                              {
                                 icon ? <TableCell align='right'>
                                    <IconButton onClick={() => navigate("/admin/restaurant/add-menu/" + food.id)}>
                                       <Update className='text-yellow-500' />
                                    </IconButton>
                                 </TableCell> : <TableCell align='right'>
                                    <IconButton onClick={() => handleDelete(food.id)}>
                                       <Delete className='text-red-600' />
                                    </IconButton>
                                 </TableCell>
                              }


                           </TableRow>
                        ))
                     }
                  </TableBody>
               </Table>
            </TableContainer>
         </Box>
      </div>
   )
}
