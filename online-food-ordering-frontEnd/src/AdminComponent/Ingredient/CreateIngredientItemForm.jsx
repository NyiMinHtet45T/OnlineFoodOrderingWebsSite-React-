import { Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import { Field, Form, Formik, useFormik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createIngredient, getIngredientItem, updateIngredient } from '../../component/State/IngredientCategoryAndItem/Thunk'
import * as Yup from "yup"

export default function CreateIngredientItemForm({ open, itemId }) {

   const ingredientCategoryList = useSelector(state => state.ingredient.ingredientCategoryList)

   const restaurant = useSelector(state => state.restaurant.restaurant);

   const [initialValues, setIntialValues] = useState({
      id:"",
      name: "",
      inStoke: true,
      ingredientCategoryId: "",
      restaurantId: ""
   });

   const { ingredient } = useSelector(state => state.ingredient);

   const validationSchema = Yup.object().shape({
      name: Yup.string().required("Item Name required!"),
      ingredientCategoryId: Yup.string().required("IngredientCategory required!")
   })

   const handleUpdate = () => {
      const updateData = {
         id: ingredient?.id,
         name: ingredient?.name,
         inStoke: ingredient?.inStoke,
         ingredientCategoryId: ingredient?.ingredientCategoryId,
         restaurantId: restaurant?.id
      }
      setIntialValues(updateData)
   }

   useEffect(() => {
      handleUpdate();
   }, [ingredient])

   useEffect(() => {
      if (itemId.current) {
         dispatch(getIngredientItem(itemId.current))
      }
   }, [itemId.current])

   const dispatch = useDispatch();

   const handleSubmit = (value) => {
      if(itemId.current) {
         dispatch(updateIngredient(value))
      }else {
         value.id = null;
         dispatch(createIngredient(value));
      }
      open(false)
   }

   return (
      <div>
         <div>
            <div className="p-5">
               <h1 className='text-gray-400 text-center text-xl pb-10'>Create Ingredient Item</h1>
               <Formik enableReinitialize initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                  {({ setFieldValue, values, touched, errors }) => (
                     <Form className='space-y-2'>
                        <Field as={TextField} fullWidth id="name" name="name" label="Name" variant='outlined'/>
                        <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.name && errors.name && <div>{errors.name}</div>}</div>
                        <FormControl fullWidth>
                           <InputLabel id="demo-simple-select-label">Ingredient Category</InputLabel>
                           <Select
                              labelId='demo-simple-select-label'
                              id='demo-simple-select'
                              name='ingredientCategoryId'
                              value={values.ingredientCategoryId}
                              label="ingredientCategoryId"
                              onChange={(e) => setFieldValue("ingredientCategoryId", e.target.value)}>
                              {
                                 ingredientCategoryList.map(category => (
                                    <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                 ))
                              }
                           </Select>
                        </FormControl>
                        <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.ingredientCategoryId && errors.ingredientCategoryId && <div>{errors.ingredientCategoryId}</div>}</div>
                        <FormControl fullWidth>
                           <InputLabel id="demo-simple-select-label">InStoke</InputLabel>
                           <Select
                              labelId='demo-simple-select-label'
                              id='inStoke'
                              name='inStoke'
                              value={values.inStoke}
                              label="InStoke"
                              onChange={(e) => setFieldValue("inStoke", e.target.value)}
                           >
                              <MenuItem value={true}>Yes</MenuItem>
                              <MenuItem value={false}>No</MenuItem>
                           </Select>
                        </FormControl>
                        <Button variant='contained' color='primary' type='submit' fullWidth >Create</Button>
                     </Form>)}

               </Formik>
            </div>
         </div>
      </div>
   )
}
