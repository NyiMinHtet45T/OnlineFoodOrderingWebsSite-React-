import { Favorite, FavoriteBorder } from '@mui/icons-material'
import { Card, Chip, IconButton } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAllFavouriteByUserId, getAllRestaurant } from '../State/Restaurant/Thunk';
import { addToFavourite } from '../State/Authentication/Thunk';
import { useNavigate } from 'react-router-dom';
import { reciveMessageSuccess } from '../State/MessageReducer';

export default function RestaurantCard({isFavourite}) {

   const restaurants = useSelector(state => state.restaurant.restaurantList);

   const favouriteRestaurants = useSelector(state => state.restaurant.favouriteRestaurant);

   const userId = useSelector(state => state.auth.user?.id);

   const navigate = useNavigate();

   const dispatch = useDispatch();

   

   const displayRestaurant = isFavourite ? favouriteRestaurants : restaurants;

   const handleFavoriteClick = (restaurantId) => {
      if (userId) {
         dispatch(addToFavourite(restaurantId, userId, isFavourite))
      }else {
         dispatch(reciveMessageSuccess("You have to Login First!"))
      }
   }

   useEffect(() => {
      if(!isFavourite) {
         dispatch(getAllRestaurant(userId));
      }else {
         dispatch(getAllFavouriteByUserId(userId))
      }
   }, [])

   return (
      <div>
         <div className='flex flex-wrap mt-4 items-center justify-around gap-6'>
         {
            displayRestaurant.map(restaurant => (
               
                  <Card key={restaurant.id} className=' w-[19rem] relative'>
                     <div onClick={() => restaurant.open ? navigate("/restaurantDetail/" + restaurant.id) : "" } className={`${restaurant.open ? 'cursor-pointer' : 'cursor-not-allowed'}`}>
                        <img src={"/imgae/restaurantPhoto/" + restaurant.image[0]} alt="" className='w-full h-[10rem] rounded-t-md object-cover' />

                        <Chip size="small" className='absolute top-2 left-2' color={restaurant.open ? "success" : "error"}
                           label={restaurant.open ? "open" : "closed"} />
                     </div>
                     <div className="p-4 textPart lg:flex w-full justify-between ">
                        <div className="space-y-1">
                           <p className='font-semibold text-2rem'>
                              {restaurant.name}
                           </p>
                           <p className='text-gray-500 text-sm '>
                              {restaurant.description}
                           </p>
                        </div>
                        <div>
                           <IconButton onClick={() => handleFavoriteClick(restaurant.id)}>
                              {restaurant.favourite ? <Favorite /> : <FavoriteBorder />}
                           </IconButton>
                        </div>
                     </div>
                  </Card>
               
            ))
         }
         </div>
      </div>
   )
}
