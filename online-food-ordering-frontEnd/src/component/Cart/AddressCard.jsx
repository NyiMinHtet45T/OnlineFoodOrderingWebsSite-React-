import { Home } from '@mui/icons-material'
import { Button, Card } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux';


export default function AddressCard({ handSelectAddress, isOpen }) {
   const addressList = useSelector(state => state.address.addressList);

   return (
      <div>
         {
            addressList.map(address => (
               <div className='m-3'>
                  <Card className="flex gap-5 w-64 p-5" key={address.id}>
                     <Home />
                     <div className="space-y-3 text-gray-500">
                        <h1 className='font-semibold text-sm text-white'>
                           <p className='mb-3'>{address.fullAddress}</p>
                           {
                              isOpen && <Button variant='outlined' fullWidth onClick={() => handSelectAddress(address)}>
                                 select
                              </Button>
                           }
                        </h1>
                     </div>
                  </Card>
               </div>
            ))
         }
      </div>
   )
}
