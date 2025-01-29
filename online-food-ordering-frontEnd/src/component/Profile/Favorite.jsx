import React, { useEffect } from 'react'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useSelector } from 'react-redux';
import { FavoriteBorder, FavoriteSharp } from '@mui/icons-material';

export default function Favorite() {

  const favouriteRestaurants = useSelector(state => state.restaurant.favouriteRestaurant);

  console.log()
  return (
    <div>
      <h1 className='py-5 text-xl font-semibold text-center'>
        {
          favouriteRestaurants.length == 0 ? (<h1 className='text-red-500'>DON'T YOU HAVE ANY FAVORITE?</h1>) 
          : (<h5 className='text-lime-500'>MY FAVORITE</h5>)
        }</h1>
      <RestaurantCard isFavourite={true} />
    </div>
  )
}
