import React, { useRef, useState } from 'react'
import { Box, Card, CardHeader, Icon, IconButton, Button, Paper, Typography, Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { Create, Delete, Update } from '@mui/icons-material'
import CreateIngredientCategoryForm from './CreateIngredientForm';
import { useDispatch, useSelector } from 'react-redux';
import CreateIngredientItemForm from './CreateIngredientItemForm';
import { deleteIngredientItemById, updateIngredientInStoke } from '../../component/State/IngredientCategoryAndItem/Thunk';
import { reciveIngredientSuccess } from '../../component/State/IngredientCategoryAndItem/Reducer';

export default function IngredientItem() {
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

   const ingredientItemList = useSelector(state => state.ingredient.ingredientList)

   const [open, setOpen] = React.useState(false);
   const handleOpen = (value) => setOpen(value);
   const handleClose = () => setOpen(false);

   const dispatch = useDispatch();

   const restaurant = useSelector(state => state.restaurant.restaurant);

   const handleDelete = (itemId) => {
      dispatch(deleteIngredientItemById(itemId, restaurant?.id))
   }

   const handleUpdate = (id) => {
      itemId.current = id
      setOpen(true)
   }

   const handleCreate = () => {
      itemId.current = null
      dispatch(reciveIngredientSuccess(null))
      setOpen(true)
   }

   const itemId = useRef();

   const [icon, setIcon] = useState(false);

   const handleInStoke = (ingredientId) => {
      dispatch(updateIngredientInStoke(ingredientId, restaurant?.id))
   }

   return (
      <div>
         <Box className="ms-3 mt-5">
            <Card className='mt-1'>
               <CardHeader
                  title={"Ingredient Item"}
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
                  <Table sx={{ minWidth: 350 }} aria-label='simple table'>
                     <TableHead>
                        <TableRow>
                           <TableCell>id</TableCell>
                           <TableCell align='center'>Name</TableCell>
                           <TableCell align='center'>Category</TableCell>
                           <TableCell align='center'>IsStoke</TableCell>
                           <TableCell align='right'><p className='font-semibold'>{ icon ? "Update" : "Delete"}</p></TableCell>
                        </TableRow>
                     </TableHead>
                     <TableBody>
                        {
                           ingredientItemList?.map((item, index) => (
                              <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                 <TableCell>{index + 1}</TableCell>
                                 <TableCell align='center'>{item.name}</TableCell>
                                 <TableCell align='center'>
                                    <div className='text-yellow-200 font-bold'>
                                    {item.ingredientCategoryName}
                                    </div>
                                 </TableCell>
                                 <TableCell align='center'>
                                    <Button variant='outlined' onClick={() => handleInStoke(item.id)}>
                                       {item.inStoke ? "Yes" : "No"}
                                    </Button>
                                 </TableCell>
                                 {
                                    icon ? <TableCell align='right'>
                                       <IconButton onClick={() => handleUpdate(item.id)}>
                                          <Update className='text-yellow-500' />
                                       </IconButton>
                                    </TableCell> : <TableCell align='right'>
                                       <IconButton onClick={() => handleDelete(item.id)}>
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
                  <CreateIngredientItemForm open={handleOpen} itemId={itemId}/>

               </Box>
            </Modal>
         </Box>
      </div>
   )
}
