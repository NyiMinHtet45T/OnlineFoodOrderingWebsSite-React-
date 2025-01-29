import React, { useEffect } from 'react'
import MenuTable from './MenuTable'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getFoodByRestaurantId } from '../../component/State/FoodCategoryAndFood/Thunk';
import { reciveFoodSuccess } from '../../component/State/FoodCategoryAndFood/Reducer';

export default function Menu() {

  const dispatch = useDispatch();

  const restaurant = useSelector(state => state.restaurant.restaurant);

  useEffect(() => {
    dispatch(getFoodByRestaurantId(restaurant?.id))
    dispatch(reciveFoodSuccess(null))
  },[])

  return (
    <div>
      <div className="px-2">
         <MenuTable/>
      </div>
    </div>
  )
}
