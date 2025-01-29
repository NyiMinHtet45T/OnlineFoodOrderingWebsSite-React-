import React, { useRef, useState } from 'react'
import { Box, Card, CardHeader, Icon, IconButton, Button, Paper, Typography, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Create, Delete, Update } from '@mui/icons-material'
import CreateIngredientCategoryForm from './CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import CreateIngredientItemForm from './CreateIngredientItemForm';
import { deleteIngredientCategoryById } from '../../component/State/IngredientCategoryAndItem/Thunk';
import { reciveIngredientCategorySuccess } from '../../component/State/IngredientCategoryAndItem/Reducer';

export default function IngredientCategory() {
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

   const ingredientCategoryList = useSelector(state => state.ingredient.ingredientCategoryList)

   const [open, setOpen] = React.useState(false);
   const handleOpen = (value) => setOpen(value);
   const handleClose = () => setOpen(false);

   const dispatch = useDispatch();

   const restaurant = useSelector(state => state.restaurant.restaurant);

   const handleDelete = (categoryId) => {
      dispatch(deleteIngredientCategoryById(categoryId, restaurant?.id))
   }

   const [icon, setIcon] = useState(false);

   const handleUpdate = (id) => {
      categoryId.current = id
      setOpen(true)
   }

   const handleCreate = () => {
      categoryId.current = null
      dispatch(reciveIngredientCategorySuccess(null))
      setOpen(true)
   }

   const categoryId = useRef();

   return (
      <div>
         <Box className="ms-2 mt-5">
            <Card className='mt-1'>
               <CardHeader
                  title={"Ingredient Category"}
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
                  <Table sx={{ minWidth: 420 }} aria-label='simple table'>
                     <TableHead>
                        <TableRow>
                           <TableCell>No.</TableCell>

                           <TableCell align='center'>Category</TableCell>
                           <TableCell align='right'><p className='font-semibold'>{ icon ? "Update" : "Delete"}</p></TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {
                           ingredientCategoryList?.map((category, index) => (
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
                  <CreateIngredientCategoryForm open={handleOpen} categoryId={categoryId} />

               </Box>
            </Modal>
         </Box>
      </div>
   )
}
