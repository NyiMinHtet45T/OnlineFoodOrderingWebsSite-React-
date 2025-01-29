import React, { useState } from 'react'
import './Home.css'
import MultiItemCarousel from './MultiItemCarousel'
import RestaurantCard from '../Restaurant/RestaurantCard'
import { useNavigate } from 'react-router-dom';
import SearchFood from '../Restaurant/SearchFood';


export default function Home() {

   const navigate = useNavigate();

   return (
      <div>
         <div className="pb-10">
            <section className="bg-[url('/imgae/HomePhoto/top-view-table-full-delicious-food-composition.jpg')] banner bg-cover bg-center bg-no-repeat -z-50
          relative flex flex-col justify-center items-center" >
               <div className="w-[50vw] z-10 text-center">
                  <p className="text-2xl font-semibold lg:text-5xl z-10 py-5">
                     Food
                  </p>
                  <p className="font-semibold z-10 text-xl lg:text-4xl">
                     Tast the Convenience: Food, Fast and Delivered
                  </p>
               </div>
               <div className="cover absolute top-0 left-0 right-0">
               </div>
            </section>
            <section className='p-10 lg:py-10 lg:px-20'>
               <p className='text-2xl font-semibold text-gray-400 py-3 pb-10'>Top Meels</p>
               <MultiItemCarousel />
            </section>
            <section className='px-5 lg:px-20'>
               <h1 className='text-2xl font-semibold text-gray-400 py-3'>Order From Our Handpicked Favorites</h1>
               <div className=''>
                  <RestaurantCard />
               </div>
            </section>
         </div>
      </div>
   )
}
