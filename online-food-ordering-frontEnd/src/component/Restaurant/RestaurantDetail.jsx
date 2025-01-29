
import { CalendarMonth, LocationOn } from '@mui/icons-material'
import { Divider, FormControl, FormControlLabel, Grid, Grid2, Radio, RadioGroup, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import MenuCard from './MenuCard'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getRestaurantById } from '../State/Restaurant/Thunk'
import { getFoodByFilter, getFoodCategoryByRestaurantId } from '../State/FoodCategoryAndFood/Thunk'

const foodTypes = [
   {label: "All", value: "all"},
   {label: "Vegetarian only", value: "vegetarian"},
   {label: "Non-vegetarian", value: "non_vegetarian"},
   {label: "Seasonal", value: "seasonal"},
]

export default function RestaurantDetail({forDashBorad = true}) {

   const [foodType, setFoodType] = useState("all");

   const foodCategoryList = useSelector(state => state.food.foodCategoryList);

   const [foodCategoryId, setFoodCategory] = useState(0);

   const {id} = useParams();

   const handleFilter = (e) => {
      e.preventDefault();
      setFoodType(e.target.value);
   }

   const handCategory = (e) => {
      setFoodCategory(e.target.value)
   }

   const handleSearchFilter = () => {
      const part = [];
      if(foodType === "all") {
         part.push(null,null,null)
      }
      if(foodType === "vegetarian") {
         part.push(true,null,null)
      }
      if(foodType === "seasonal") {
         part.push(null,true,null)
      }
      if(foodType === "non_vegetarian") {
         part.push(null, null, true)
      }
      if(foodCategoryId > 0) {
         part.push(foodCategoryId);
      }else {
         part.push(null);
      }
      dispatch(getFoodByFilter(id, part[0], part[1], part[2], part[3]));
   }

   const restaurant = useSelector(state => state.restaurant.restaurant);

   const dispatch = useDispatch();

   useEffect(() => {
      handleSearchFilter();
   },[foodType,foodCategoryId])

   useEffect(() => {
         dispatch(getRestaurantById(id));
         dispatch(getFoodCategoryByRestaurantId(id));
   },[]);

   const address = restaurant?.address

  return (
    <div className='px-5 lg:px-20 pb-16'>
      <section>
         <div className='mt-5'>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  {
                     restaurant?.image.map(image => (
                        <img src={`/imgae/restaurantPhoto/${image}`} alt="" className='w-full h-[40vh] object-cover' />
                     ))
                     
                  }
               </Grid>
            </Grid>
            
         </div>
         <div className="pt-3 pb-5">
            <h1 className="text-4xl font-semibold">{restaurant?.name}</h1>
            <p className='text-gray-500 items-center mt-2'>
               <span>{restaurant?.description}</span>
            </p>
            <div className='mt-2'>
            <p className='text-gray-500 space-x-2 flex items-center mt-1'>
               <LocationOn/>
               <span>{`${address?.city} / ${address?.streetAddress} / ${address?.country}`}</span>
            </p>
            <p className='text-gray-500 space-x-2 flex items-center mt-1'>
               <CalendarMonth/>
               <span>{restaurant?.openingHours}</span>
            </p>
            </div>
         </div>
      </section>
      <Divider/>
      {
         forDashBorad && (<section className='pt-[2rem] lg:flex relative'>
            <div className="space-y-10 lg:w-[20%] filter">
               <div className="box space-y-5 lg:sticky top-28">
                  <div className='mb-3'>
                     <Typography variant="h5" sx={{paddingBottom:"0.5rem"}}>Food Type</Typography>
                     <FormControl className='py-10 space-y-5' component={"fieldset"}>
                        <RadioGroup onChange={(e) => handleFilter(e)} name="food_type" value={foodType}>
                        {
                           foodTypes.map(item => (
                              <FormControlLabel key={item.value} value={item.value} control={<Radio/>} label={item.label}/>
                              
                           ))
                        }
                        </RadioGroup>
                     </FormControl>
                  </div>
                  <Divider/>
                  <div className='mt-2'>
                     <Typography variant="h5" sx={{paddingBottom:"0.5rem"}}>Food Categories</Typography>
                     <FormControl className='py-10 space-y-5' component={"fieldset"}>
                        <RadioGroup onChange={(e) => handCategory(e)} name="food_categories" value={foodCategoryId}>
                         <FormControlLabel  value={0} control = {<Radio/>} label={"All"}/>
                        {
                           foodCategoryList?.map(item => (
                              <FormControlLabel key={item.id} value={item.id} control = {<Radio/>} label={item.name}/>
                              
                           ))
                        }
                        </RadioGroup>
                     </FormControl>
                  </div>
               </div>
            </div>
            <div className="space-y-5 lg:w-[80%] lg:pl-10">
               <MenuCard/>
            </div>
         </section>)
      }
    </div>
  )
}
