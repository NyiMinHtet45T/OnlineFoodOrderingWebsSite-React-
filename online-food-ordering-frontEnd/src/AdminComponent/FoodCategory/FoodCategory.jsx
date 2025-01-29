import React, { useEffect } from 'react'
import FoodCategoryTable from './FoodCategoryTable'
import { useDispatch, useSelector } from 'react-redux'
import { getFoodCategoryByRestaurantId } from '../../component/State/FoodCategoryAndFood/Thunk';
import { reciveFoodCategorySuccess } from '../../component/State/FoodCategoryAndFood/Reducer';


export default function FoodCategory() {

  const dispatch = useDispatch();

  

  const restaurant = useSelector(state => state.restaurant.restaurant);

  useEffect(() => {
    dispatch(getFoodCategoryByRestaurantId(restaurant?.id))
  },[])

  return (
    <div>
      <div className="px-2">
         <FoodCategoryTable/>
      </div>
    </div>
  )
}
