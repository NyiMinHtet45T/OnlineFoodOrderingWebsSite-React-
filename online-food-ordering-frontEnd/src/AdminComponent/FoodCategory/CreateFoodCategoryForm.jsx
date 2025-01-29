import { Button, TextField } from '@mui/material'
import { Field, Form, Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createFoodCategory, getFoodCategory, updateFoodCategory } from '../../component/State/FoodCategoryAndFood/Thunk';
import * as Yup from "yup"

export default function CreateFoodCategoryForm({ handleOpen, categoryId }) {

   const [initialValues, setIntialValues] = useState({
      id: "",
      name: "",
      restaurantId: ""
   });

   console.log(categoryId.current)

   const restaurant = useSelector(state => state.restaurant.restaurant);

   const { foodCategory } = useSelector(state => state.food);

   const dispatch = useDispatch();

   const handleUpdate = () => {
      const updateData = {
         id: foodCategory?.id,
         name: foodCategory?.name,
         restaurantId: restaurant?.id
      }
      setIntialValues(updateData)
   }

   useEffect(() => {
      handleUpdate();
   }, [foodCategory])

   useEffect(() => {
      if (categoryId.current) {
         dispatch(getFoodCategory(categoryId.current))
      }
   }, [categoryId.current])

   const handleSubmit = (value) => {
      if(categoryId.current) {
         dispatch(updateFoodCategory(value))
      }else {
         value.id = null;
         dispatch(createFoodCategory(value));
      }
      handleOpen(false)
   }

   const validationSchema = Yup.object().shape({
      name : Yup.string().required("FoodCategory name required!")
   })

   return (
      <div>
         <div>
            <div className="p-5">
               <h1 className='text-gray-400 text-center text-xl pb-10'>Create Food Category</h1>
               <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({touched, errors}) => (
                     <Form className='space-y-3'>
                     <Field fullWidth as={TextField} id="name" name="name" label="Name" variant='outlined' />
                     <div className='ms-2 text-red-500 text-[70%]'>{touched.name && errors.name && <div>{errors.name}</div>}</div>
                     <Button variant='contained' color='primary' type='submit' fullWidth >Create</Button>
                  </Form>
                  )}
               </Formik>
            </div>
         </div>
      </div>
   )
}
