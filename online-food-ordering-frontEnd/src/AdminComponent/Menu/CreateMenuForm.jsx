import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { Box, Button, Chip, CircularProgress, FormControl, Grid, IconButton, InputLabel, MenuItem, OutlinedInput, Select, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createFood, getFoodById, getFoodCategoryByRestaurantId, updateFood } from '../../component/State/FoodCategoryAndFood/Thunk';
import { getIngredientByCategoryIdList, getIngredientCategoryByRestaurantId } from '../../component/State/IngredientCategoryAndItem/Thunk';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup"

export default function CreateMenuForm() {

   const [initialValues, setIntialValues] = useState({
      id: "",
      name: "",
      description: "",
      price: "",
      available: true,
      foodCategoryId: "",
      restaurantId: "",
      isVegetarian: true,
      isNonVegetarian: true,
      isSeasonal: false,
      ingredientsItemName: [],
      ingredientsCategoryName: [],
      images: "",
   });

   const validationSchema = Yup.object().shape({
      name: Yup.string().required("Name is required!"),
      price: Yup.number().required("Price are required!"),
      foodCategoryId: Yup.string().required("FoodCategory is required!"),
      images: Yup.string().required("Image required!"),
   })

   const handleUpdate = () => {
      const updateIntialValue = {
         id: food.id,
         name: food.name,
         description: food.description,
         price: food.price,
         available: food.available,
         foodCategoryId: food.foodCategoryId,
         restaurantId: food.restaurantId,
         isVegetarian: food.isVegetarian,
         isNonVegetarian: food.isNonVegetarian,
         isSeasonal: food.isSeasonal,
         ingredientsItemName: food.ingredientsItemName,
         ingredientsCategoryName: food.ingredientsCategoryName,
         images: food.images,
      }
      setIngCategoryList(food.ingredientsCategoryName)
      setIntialValues(updateIntialValue)
      saveIngredientItem.current = food.ingredientsItemName
   }

   const navigate = useNavigate();

   const restaurant = useSelector(state => state.restaurant.restaurant);
   const foodCategoryList = useSelector(state => state.food.foodCategoryList);
   const { ingredientCategoryList, ingredientList } = useSelector(state => state.ingredient);

   const dispatch = useDispatch();

   const [uploadImage, setUploadImage] = useState(false);

   const handleRemoveImage = () => {
      setIntialValues(pre => ({ ...pre, images: "" }))
   }

   const handleImageChange = (e) => {
      const image = e.target.files[0].name
      setUploadImage(true)
      setIntialValues(pre => ({ ...pre, images: image }))
      setUploadImage(false)
   };

   const handleChange = (e) => {
      const { value } = e.target;
      setIntialValues((prev) => ({ ...prev, ingredientsCategoryName: value }));
      setIngCategoryList([...value])
   }

   const handleSubmit = (value) => {
      if (id > 0) {
         dispatch(updateFood(value, restaurant?.id))
      } else {
         value.id = "";
         value.restaurantId = restaurant.id
         dispatch(createFood(value, restaurant?.id));
      }
      navigate("/admin/restaurant/menu")
   }

   const [ingCategoryList, setIngCategoryList] = useState([]);

   const getIngredientItem = () => {
      const ingredientCategoryList = { "ingredientCategoryNameList": ingCategoryList, "restaurantId": restaurant?.id }
      dispatch(getIngredientByCategoryIdList(ingredientCategoryList));
   }

   const previousSizeOfIngCategory = useRef();
   const saveIngredientItem = useRef();

   useEffect(() => {
      if(ingCategoryList != undefined) {
         previousSizeOfIngCategory.current = ingCategoryList.length
      }
      
   },[ingCategoryList])

   const handItemChange = (e) => {
      const { value } = e.target;
      setIntialValues((prev) => ({ ...prev, ingredientsItemName: value }));
      saveIngredientItem.current = value
   }

   useEffect(() => {
      if (ingCategoryList.length < previousSizeOfIngCategory.current && saveIngredientItem.current != undefined) {
         const currentIngredientItem = ingredientList.filter(value => saveIngredientItem.current.includes(value.name))
         const currentIngredintItemName = currentIngredientItem.map(value => value.name)
         setIntialValues(prev => ({ ...prev, ingredientsItemName: currentIngredintItemName }))
         saveIngredientItem.current = currentIngredintItemName
      }
      previousSizeOfIngCategory.current = ingCategoryList.length
   }, [ingredientList])

   useEffect(() => {
      getIngredientItem();
   }, [ingCategoryList])

   const { id } = useParams();

   const { food } = useSelector(state => state.food);

   useEffect(() => {
      if (id > 0) {
         dispatch(getFoodById(id))
      }
      dispatch(getFoodCategoryByRestaurantId(restaurant?.id));
      dispatch(getIngredientCategoryByRestaurantId(restaurant?.id));
   }, [])

   useEffect(() => {
      if (food) {
         handleUpdate();
      }
   }, [food])

   return (
      <div className='py-10 lg:flex items-center justify-center min-h-screen'>
         <div className="lg:max-w-4xl">
            <h1 className='font-bold text-2xl text-center py-2'>
               {id > 0 ? "Update Menu" : "Add New Menu"}
            </h1>
            <Formik initialValues={initialValues} validationSchema={validationSchema} enableReinitialize onSubmit={handleSubmit}>
               {({ values, touched, errors }) => (
                  <Form className='space-y-10'>
                     <Grid container spacing={2}>
                        <Grid item className='flex flex-wrap gap-5' xs={12}>
                           <input accept='image/*' type='file' id='fileInput' style={{ display: "none" }} onChange={(e) => handleImageChange(e)} />
                           <label className='relative' htmlFor="fileInput">
                              <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 rounded-md border border-gray-600'>
                                 <AddPhotoAlternate className='text-white' />
                              </span>
                              {
                                 uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'><CircularProgress /></div>
                              }
                              <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.images && errors.images && <div>{errors.images}</div>}</div>
                           </label>
                           <div className="flex flex-wrap gap-2">
                              <div className='relative'>
                                 <img src={`/imgae/dishes/${values.images}`} className='w-24 h-24 object-cover' alt="" />
                                 <IconButton size='small' sx={{ position: 'absolute', top: 0, right: 0, outline: "none", }} onClick={() => handleRemoveImage()}>
                                    <Close className='text-black' sx={{ fontSize: "1.3rem" }} />
                                 </IconButton>
                              </div>
                           </div>
                        </Grid>
                        <Grid item xs={12}>
                           <Field as={TextField} onChange={(e) => setIntialValues(pre => ({ ...pre, name: e.target.value }))} id="name" fullWidth name="name" label="Name" variant='outlined' />
                           <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.name && errors.name && <div>{errors.name}</div>}</div>
                        </Grid>
                        <Grid item xs={12}>
                           <Field fullWidth as={TextField} onChange={(e) => setIntialValues(pre => ({ ...pre, description: e.target.value }))} id="description" name="description" label="Description" variant='outlined' />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                           <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Available</InputLabel>
                              <Select
                                 as={Select}
                                 labelId='demo-simple-select-label'
                                 id='available'
                                 name='available'
                                 label="available"
                                 value={values.available}
                                 onChange={(e) => setIntialValues(pre => ({ ...pre, available: e.target.value }))}
                              >
                                 <MenuItem value={true}>Yes</MenuItem>
                                 <MenuItem value={false}>No</MenuItem>
                              </Select>
                           </FormControl>

                        </Grid>
                        <Grid item xs={12} lg={6}>
                           <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Food Category</InputLabel>
                              <Select
                                 as={Select}
                                 labelId='demo-simple-select-label'
                                 id='demo-simple-select'
                                 name='foodCategoryId'
                                 label="Food Category"
                                 value={values.foodCategoryId}
                                 onChange={(e) => setIntialValues(pre => ({ ...pre, foodCategoryId: e.target.value }))}
                              >
                                 {
                                    foodCategoryList.length == 0 ? <MenuItem disabled={true}>
                                    <div className='grid grid-cols-2'>
                                       <div className=''>Create FoodCategory First!</div>
                                    </div>
                                 </MenuItem>  : (foodCategoryList.map(category => (
                                       <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>
                                    )))
                                 }
                              </Select>
                           </FormControl>
                           <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.foodCategoryId && errors.foodCategoryId && <div>{errors.foodCategoryId}</div>}</div>
                        </Grid>
                        <Grid item xs={12}>
                           <FormControl fullWidth >
                              <InputLabel id="demo-multiple-chip-label">Ingredient Category</InputLabel>
                              <Select
                                 labelId='demo-multiple-chip-label'
                                 id='demo-multiple-chip'
                                 multiple
                                 name='ingredientsCategoryName'
                                 value={values.ingredientsCategoryName}
                                 onChange={handleChange}
                                 input={<OutlinedInput id='demo-multiple-chip' label="Ingredient Category" />}
                                 renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                       {
                                          selected.map((category, index) => (
                                             <Chip key={index} label={category} />
                                          ))}
                                    </Box>)}
                              >
                                 {
                                    ingredientCategoryList.length == 0 ?
                                       <MenuItem disabled={true}>
                                          <div className='grid grid-cols-2'>
                                             <div className=''>Create IngredientCategory First!</div>
                                          </div>
                                       </MenuItem> 
                                       : (ingredientCategoryList.map((category) => (
                                          <MenuItem key={category.id} value={category.name}>
                                             {category.name}
                                          </MenuItem>
                                       )))
                                 }
                              </Select>
                           </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                           <FormControl fullWidth >
                              <InputLabel id="demo-multiple-chip-label">Ingredients Item</InputLabel>
                              <Select
                                 labelId='demo-multiple-chip-label'
                                 id='demo-multiple-chip'
                                 multiple
                                 value={values.ingredientsItemName}
                                 name='ingredientsItemName'
                                 onChange={(e) => handItemChange(e)}
                                 input={<OutlinedInput id='demo-multiple-chip' label="Ingredients Item" />}
                                 renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                       {
                                          selected.map((item, index) => (
                                             <Chip key={index} label={item} />
                                          ))
                                       }
                                    </Box>
                                 )}
                              >
                                 {
                                    ingredientList.length == 0 ?
                                       <MenuItem disabled={true}>
                                          <div className='grid grid-cols-2'>
                                             <div className=''>Select Ingredient Category Pls!</div>
                                          </div>
                                       </MenuItem> : (
                                          ingredientList.map((item) => (
                                             <MenuItem key={item.id} value={item.name}>
                                                <div className='grid grid-cols-2'>
                                                   <div className=''>{item.name}</div>
                                                   <div className='ms-10 text-sm text-gray-400'>{item.ingredientCategoryName}</div>
                                                </div>
                                             </MenuItem>))
                                       )
                                 }
                              </Select>
                           </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                           <Field as={TextField} onChange={(e) => setIntialValues(pre => ({ ...pre, price: e.target.value }))} fullWidth id="price" name="price" label="Price" variant='outlined' />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                           <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Seasonal</InputLabel>
                              <Select
                                 as={Select}
                                 labelId='demo-simple-select-label'
                                 id='isSeasonal'
                                 name='isSeasonal'
                                 label="Seasonal"
                                 value={values.isSeasonal}
                                 onChange={(e) => setIntialValues(pre => ({ ...pre, isSeasonal: e.target.value }))}
                              >
                                 <MenuItem value={true}>Yes</MenuItem>
                                 <MenuItem value={false}>No</MenuItem>
                              </Select>
                           </FormControl>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                           <FormControl fullWidth>
                              <InputLabel id="demo-simple-select-label">Vegetarian</InputLabel>
                              <Select
                                 as={Select}
                                 labelId='demo-simple-select-label'
                                 id='demo-simple-select'
                                 name='isVegetarian'
                                 label="Vegetarian"
                                 value={values.isVegetarian}
                                 onChange={(e) => setIntialValues(pre => ({ ...pre, isVegetarian: e.target.value, isNonVegetarian: !e.target.value }))}
                              >
                                 <MenuItem value={true}>Yes</MenuItem>
                                 <MenuItem value={false}>No</MenuItem>
                              </Select>
                           </FormControl>
                        </Grid>
                     </Grid>
                     <Button variant='contained' color='primary' type='submit' fullWidth >{id > 0 ? "Update" : "Create"}</Button>
                  </Form>
               )}
            </Formik>
         </div>
      </div>
   )
}
