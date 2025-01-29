import { Button, TextField } from '@mui/material'
import { Field, Form, Formik, useFormik } from 'formik';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createIngredientCategory, getIngredientCategory, updateIngredientCategory } from '../../component/State/IngredientCategoryAndItem/Thunk';
import * as Yup from "yup"

export default function CreateIngredientCategoryForm({ open, categoryId }) {

   const [initialValues, setIntialValues] = useState({
      id: "",
      name: "",
      restaurantId: ""
   });

   const restaurant = useSelector(state => state.restaurant.restaurant);

   const dispatch = useDispatch();

   const validationSchema = Yup.object().shape({
      name : Yup.string().required("FoodCategory name required!")
   })

   const { ingredientCategory } = useSelector(state => state.ingredient);

   const handleUpdate = () => {
      const updateData = {
         id: ingredientCategory?.id,
         name: ingredientCategory?.name,
         restaurantId: restaurant?.id
      }
      setIntialValues(updateData)
   }

   useEffect(() => {
      handleUpdate();
   }, [ingredientCategory])

   useEffect(() => {
      if (categoryId.current) {
         dispatch(getIngredientCategory(categoryId.current))
      }
   }, [categoryId.current])

   const handleSubmit = (value) => {
      if(categoryId.current) {
         dispatch(updateIngredientCategory(value));
      }else {
         value.id = null;
         dispatch(createIngredientCategory(value));
      }
      open(false)
   }


   return (
      <div>
         <div>
            <div className="p-5">
               <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient Category</h1>
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
