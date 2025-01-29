import React, { useEffect } from 'react'
import OrderCard from './OrderCard'


export default function Order() {

  

  return (
    <div>
      <div className="flex items-center flex-col">
         <h1 className='text-xl text-center py-7 font-semibold'>My Orders</h1>
         <div className="space-y-5 w-full lg:w-1/2">
            <OrderCard/>
         </div>
      </div>
    </div>
  )
}
