import React, { useEffect, useRef, useState } from 'react'
import { Box, Card, CardHeader, Icon, IconButton, Button, Paper, Typography, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Create, Delete, Update } from '@mui/icons-material'
import CreateFoodCategoryForm from './CreateFoodCategoryForm';
import { useDispatch, useSelector } from 'react-redux';
import { deleteFoodCategoryById } from '../../component/State/FoodCategoryAndFood/Thunk';
import { reciveFoodCategorySuccess } from '../../component/State/FoodCategoryAndFood/Reducer';

export default function FoodCategoryTable() {

   const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
   };

   const foodCategoryList = useSelector(state => state.food.foodCategoryList)

   const [open, setOpen] = React.useState(false);
   const handleOpen = (value) => setOpen(value);
   const handleClose = () => setOpen(false);

   const dispatch = useDispatch();

   const restaurant = useSelector(state => state.restaurant.restaurant);

   const handleDelete = (categoryId) => {
      dispatch(deleteFoodCategoryById(categoryId, restaurant?.id));
   }

   const [icon, setIcon] = useState(false);

   const handleUpdate = (id) => {
      categoryId.current = id
      setOpen(true)
   }

   const handleCreate = () => {
      categoryId.current = null
      dispatch(reciveFoodCategorySuccess(null))
      setOpen(true)
   }

   const categoryId = useRef();

   return (
      <div>
         <Box>
            <Card className='mt-1'>
               <CardHeader
                  title={"Food Category"}
                  sx={{ pt: 1, alignItems: "center" }}
                  className='underline'
                  action={
                     <div>
                        <IconButton aria-label='settings' onClick={() => handleCreate()}>
                           <p className='text-sm me-1 text-lime-400'>create </p>
                           <Create sx={{ fontSize: "1.3rem", color: "green" }} />
                        </IconButton>
                        {
                           icon ?  <IconButton aria-label='settings' onClick={() => setIcon(false)}>
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
               <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                     <TableHead>
                        <TableRow>
                           <TableCell>No.</TableCell>
                           <TableCell align='center'>Name</TableCell>
                           <TableCell align='right'><p className='font-semibold'>{ icon ? "Update" : "Delete"}</p></TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {
                           foodCategoryList?.map((category,index) => (
                              <TableRow key={category.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                 <TableCell>{index + 1}</TableCell>
                                 <TableCell align='center'>{category.name}</TableCell>
                                 {
                                    icon ? <TableCell align='right'>
                                       <IconButton onClick={() => handleUpdate(category.id)}>
                                          <Update className='text-yellow-500' />
                                       </IconButton>
                                    </TableCell> : <TableCell align='right'>
                                       <IconButton onClick={() => handleDelete(category.id)}>
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
            </Card>

            <Modal
               open={open}
               onClose={handleClose}
               aria-labelledby="modal-modal-title"
               aria-describedby="modal-modal-description"
            >
               <Box sx={style}>
                  <CreateFoodCategoryForm handleOpen={handleOpen} categoryId={categoryId} />
               </Box>
            </Modal>
         </Box>

      </div>
   )
}
