import React, { useEffect } from 'react'
import IngredientCategory from './IngredientCategory'
import { Grid } from '@mui/material'
import IngredientItem from './IngredinetItem'
import { useDispatch, useSelector } from 'react-redux'
import { getIngredientByRestaurantId, getIngredientCategoryByRestaurantId } from '../../component/State/IngredientCategoryAndItem/Thunk'

export default function Ingredient() {

  const dispatch = useDispatch();

  const restaurant = useSelector(state => state.restaurant.restaurant);

  useEffect(() => {
    dispatch(getIngredientCategoryByRestaurantId(restaurant?.id));
    dispatch(getIngredientByRestaurantId(restaurant?.id));
  },[])

  return (
    <div>
      <div>
      <div className="px-2 flex">
         <Grid container spacing={2}>
            <Grid xs={12} lg={7}>
            <IngredientItem/>
               
            </Grid>
            <Grid xs={12} lg={5}>
            <IngredientCategory/>
            </Grid>
         </Grid>
      </div>
    </div>
    </div>
  )
}
