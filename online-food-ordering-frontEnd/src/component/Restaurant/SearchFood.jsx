import { Card } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { searchFood } from '../State/FoodCategoryAndFood/Thunk';
import { cleanSearchFoodSuccess } from '../State/FoodCategoryAndFood/Reducer';
import { useNavigate } from 'react-router-dom';

export default function SearchFood({ search }) {

   const dispatch = useDispatch();

   const searchFoodList = useSelector(state => state.food?.searchFood)

   useEffect(() => {
      dispatch(searchFood(search));
      setShowFood(true);
   }, [search])

   const navigate = useNavigate();

   const handleSearchFood = (restaurantId) => {
      navigate(/restaurantDetail/ + restaurantId)
      dispatch(cleanSearchFoodSuccess())
   }

   const [showFood, setShowFood] = useState(false);

   const handleClose = () => {
      setShowFood(false);
   }

   return (
      <div>
         <div>
            {
               showFood && <div onClick={() => handleClose()}  className='min-h-screen z-10 w-full fixed top-0 left-0 '></div>
            }
         </div>
         {
             showFood && <div className='absolute z-20 left-[10%] top-0'>
             {
                searchFoodList?.map(food => (
                   <div>
                      <div className='m-3 w-[50%] mx-auto z-20 hover:scale-105 duration-300' key={food.id}>
                         <Card className="items-center justify-between flex  mx-auto w-[50rem] p-4 " onClick={() => handleSearchFood(food.restaurantId)}>
                            <div className="flex items-center space-x-5">
                               <img src={`/imgae/dishes/${food.image}`} alt="" className='h-16 w-16 rounded-sm' />
                               <div className='w-80'>
                                  <p className='font-semibold'>{food.name}</p>
                                  <p>{food.price} Ks</p>
                               </div>
                            </div>
                            <div className='w-30 text-gray-300 text-sm underline '>
                               <p>{food.restaurantName}</p>
                            </div>
                         </Card>
                      </div>
                   </div>
    
                ))
             }
             </div>
         }
      </div>
   )
}
