import React, { useEffect, useState } from 'react'
import CartItem from './CartItem.'
import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material'
import AddressCard from './AddressCard'
import { AddLocation, ConnectedTvSharp } from '@mui/icons-material'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as yup from "yup"
import { useDispatch, useSelector } from 'react-redux'
import { createAddress, getAddressByUserId } from '../State/Address/Thunk'
import { getCartByUserId, getTotalPriceAndPrice } from '../State/Cart/Thunk'
import { createOrder } from '../State/Order/Thunk'
import { useNavigate } from 'react-router-dom'
import { reciveMessageSuccess } from '../State/MessageReducer'

export const style = {
   position: 'absolute',
   top: '50%',
   left: '50%',
   transform: 'translate(-50%, -50%)',
   width: 400,
   bgcolor: 'background.paper',
   ourline: 'none',
   border: '2px solid #000',
   boxShadow: 24,
   p: 4,
};

export default function Cart() {

   const [initialValues, setIntialValues] = useState({
      state: "",
      city: "",
      streetAddress: "",
      country: ""
   });

   const [text, setText] = useState(false);
   const [addressId, setAddressId] = useState(0);

   const createOrderUsingAddress = (address) => {
      const selectInitialValue = {
         state: address.state,
         city: address.city,
         streetAddress: address.streetAddress,
         country: address.country
      }
      setIntialValues(selectInitialValue)
      setAddressId(address.id)
      handleOpenAddressModal("Deliver Here",true)
   }

   const handleOpenAddressModal = (text,isOpen) => {
      setOpen(isOpen);
      if(text === "Submit") {
         const addInitialValue = {
            state: "",
            city: "",
            streetAddress: "",
            country: ""
         }
         setIntialValues(addInitialValue)
         setText(text)
      }else {
         setText(text)
      }  
   }

   const userId = useSelector(state => state.auth.user?.id);

   const dispatch = useDispatch();


   const [open, setOpen] = useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const validationSchema = yup.object({
      streetAddress: yup.string().required("Street address is required"),
      state: yup.string().required("state address is required"),
      country: yup.string().required("Country is required"),
      city: yup.string().required("City address is required")
   })

   const navigate = useNavigate();

   const handleSubmit = (value) => {
      if(userId) {
         if(text === "Deliver Here") {
            const order = {"userId":userId, "addressId":addressId, "totalPrice":finalTotalPrice, "totalQuantity":cartTotalItems}
            dispatch(createOrder(order))
            setOpen(false);
            navigate("/")
         }else {
            dispatch(createAddress(userId, value));
            setOpen(false);
         }
      }else {
         dispatch(reciveMessageSuccess("Login First Pls!"))
      }
   }

   const { cartTotalPrice, finalTotalPrice, cartTotalItems } = useSelector(state => state.cart)

   useEffect(() => {
      dispatch(getAddressByUserId(userId))
      dispatch(getCartByUserId(userId))
   }, [])

   return (
      <div>
         <main className='lg:flex justify-between mb-20'>
            <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10'>
               <CartItem />
               <Divider />
               <div>
                  <div className="px-5 text-sm">

                     <div className="flex justify-between pb-5 pt-1 text-lime-600 font-bold text-md">
                        <p className='underline'>Bill Details</p>
                        <div className='flex gap-1'>
                           <p className='underline'>Item Total</p>
                           <p className='bg-gray-600 px-1 rounded-md text-green-200'>{cartTotalItems}</p>
                        </div>
                     </div>
                     <div className='space-y-3  text-gray-400'>
                        <div className="flex justify-between">
                           <p>Item Total Price</p>
                           <p>{cartTotalPrice} Ks</p>
                        </div>
                        <div className="flex justify-between">
                           <p>Deliver Fee</p>
                           <p>500 ks</p>
                        </div>
                        <div className="flex justify-between">
                           <p>PlatForm Fee</p>
                           <p>0 Ks</p>
                        </div>
                        <div className="flex justify-between">
                           <p>GST and Restaurant Charges</p>
                           <p>500 ks</p>
                        </div>
                        <Divider />
                     </div>
                     <div className="flex justify-between mt-3 text-white">
                        <p>Total pay</p>
                        <p>{finalTotalPrice} Ks</p>
                     </div>
                  </div>
               </div>
            </section>
            <Divider orientation='vertical' flexItem />
            <section className='lg:w-[70%] flex justify-center px-5 '>
               <div>
                  <h1 className="text-center font-semibold text-2xl py-7">
                     Choose Delivery Address
                  </h1>
                  <div className="flex gap-5 flex-wrap justify-center ">

                     <AddressCard handSelectAddress={createOrderUsingAddress} isOpen={true}/>

                     <Card className="flex gap-5 w-64 p-5">
                        <AddLocation />
                        <div className="space-y-3 text-gray-500">
                           <h1 className='font-semibold text-lg text-white'>
                              Add New Address
                              {
                                 <Button variant='outlined' fullWidth onClick={() => handleOpenAddressModal("Submit",true)}>
                                    Add
                                 </Button>
                              }
                           </h1>
                        </div>
                     </Card>
                  </div>
               </div>
            </section>
         </main>
         <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
         >
            <Box sx={style}>
               <Formik initialValues={initialValues} validationSchema={validationSchema} enableReinitialize  onSubmit={handleSubmit}>
                  {({touched, errors}) => (
                     <Form >
                     <Grid container spacing={2}>
                        <Grid item xs={12}>
                           <Field
                              disabled={text == "Submit" ? false : true}
                              as={TextField}
                              name="state"
                              label="State"
                              fullWidth
                              variant="outlined"
                           />
                           <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.state && errors.state && <div>{errors.state}</div>}</div>
                        </Grid>
                        <Grid item xs={12}>
                           <Field
                           disabled={text == "Submit" ? false : true}
                              as={TextField}
                              name="city"
                              label="City"
                              fullWidth
                              variant="outlined"
                           />
                           <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.city && errors.city && <div>{errors.city}</div>}</div>
                        </Grid>
                        <Grid item xs={12}>
                           <Field
                           disabled={text == "Submit" ? false : true}
                              as={TextField}
                              name="country"
                              label="Country"
                              fullWidth
                              variant="outlined"
                           />
                           <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.country && errors.country && <div>{errors.country}</div>}</div>
                        </Grid>
                        <Grid item xs={12}>
                           <Field
                           disabled={text == "Submit" ? false : true}
                              as={TextField}
                              name="streetAddress"
                              label="StreetAddress"
                              fullWidth
                              variant="outlined"
                           />
                           <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.streetAddress && errors.streetAddress && <div>{errors.streetAddress}</div>}</div>
                        </Grid>
                        <Grid item xs={12}>
                           <Button variant='outlined' fullWidth color='warning' type='submit'>{text}</Button>
                        </Grid>
                     </Grid>
                  </Form>
                  )}
               </Formik>
            </Box>
         </Modal>
      </div>
   )
}
