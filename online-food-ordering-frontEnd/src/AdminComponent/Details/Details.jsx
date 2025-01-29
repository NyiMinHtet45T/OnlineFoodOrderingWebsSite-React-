import { Facebook, Instagram, Telegram, Twitter } from '@mui/icons-material'
import { Button, Card, CardContent, CardHeader, Divider, Grid } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateRestaurantState } from '../../component/State/Restaurant/Thunk';
import { useNavigate } from 'react-router-dom';

export default function Details() {

   const restaurant = useSelector(state => state.restaurant.restaurant);
   const restaurantState = useSelector(state => state.restaurant.resState);

   const restaurantBoard = [
      { title: "Owner", name: restaurant.ownerName },
      { title: "Restaurant Name", name: restaurant.name },
      { title: "Cuisine Type", name: restaurant.cuisineType },
      { title: "Opening Hours", name: restaurant.openingHours },
   ]

   const address = restaurant.address;

   const addressBoard = [
      { title: "Country", name: address.country },
      { title: "State", name: address.state },
      { title: "City", name: address.city },
      { title: "StreetAddress", name: address.streetAddress },
   ]

   const contact = restaurant.contactInformation;

   const contactBoard = [
      { title: "Email", name: contact.email },
      { title: "Moblie", name: contact.mobile },
      { title: "Social", name: "", icon: [<Instagram />, <Twitter />, <Facebook />, <Telegram />] }
   ]

   const dispatch = useDispatch();

   const handleRestaurantStatus = () => {
      dispatch(updateRestaurantState(restaurant?.id))
   }

   const navigate = useNavigate();

   return (
      <div>
         <div className="lg:px-20 px-5">
            <div className="py-5 flex justify-center items-center gap-5">
               <h1 className='text-2xl lg:text-7xl text-center font-bold p-5'>{restaurant.name}</h1>
               <div>
                  <Button color={restaurantState ? "primary" : "error"} className='py-[1rem] px-[2rem]' variant='contained' onClick={handleRestaurantStatus} size='large'>
                     {
                        restaurantState ? "open" : "close"
                     }
                  </Button>
               </div>
               <div className='ms-10'>
                  <Button color="warning" className='py-[1rem] px-[2rem]' variant='contained' onClick={() => navigate("/admin/restaurant/update/" + restaurant?.id)} size='large'>
                     <p className='text-white'>Update</p>
                  </Button>
               </div>
            </div>
            <Grid container spacing={2}>
               <Grid item xs={12}>
                  <Card>
                     <CardHeader title={<span className='text-gray-300'>Restaurant</span>} />
                     <CardContent>
                        <div className='space-y-4 text-gray-200'>
                           {
                              restaurantBoard.map((item, index) => (
                                 <div className="flex" key={index}>
                                    <p className="w-48">{item.title}</p>
                                    <p className='text-gray-400'>
                                       <span className='pr-5'>-</span>
                                       {item.name}
                                    </p>
                                 </div>
                              ))
                           }
                           <div className="flex">
                              <p className="w-48 self-center">Status</p>
                              <p className='text-gray-400'>
                                 <div className='flex items-center'>
                                    <p className='mr-5'>-</p>
                                    {
                                       restaurantState ? <p className=' text-lime-300'>Open</p>
                                          : <span className=' text-red-400'> Close</span>
                                    }

                                 </div>
                              </p>
                           </div>
                        </div>
                     </CardContent>
                  </Card>
               </Grid>
               <Grid item xs={12} lg={6}>
                  <Card>
                     <CardHeader title={<span className='text-gray-300'>Address</span>} />
                     <CardContent>
                        <div className='space-y-4 text-gray-200'>
                           {
                              addressBoard.map((item, index) => (
                                 <div className="flex" key={index}>
                                    <p className="w-48">{item.title}</p>
                                    <p className='text-gray-400'>
                                       <span className='pr-5'>-</span>
                                       {item.name}
                                    </p>

                                 </div>
                              ))
                           }

                        </div>
                     </CardContent>
                  </Card>
               </Grid>
               <Grid item xs={12} lg={6}>
                  <Card>
                     <CardHeader title={<span className='text-gray-300'>Contact Information</span>} />
                     <CardContent>
                        <div className='space-y-4 py-5 text-gray-200'>
                           {
                              contactBoard.map((item, index) => (
                                 <div className="flex" key={index}>
                                    <p className="w-48">{item.title}</p>
                                    <p className='text-gray-400 space-x-1'>
                                       <span className='pr-5'>-</span>
                                       {item.name !== "" ? item.name :
                                          item.icon.map(icon => icon)
                                       }
                                    </p>

                                 </div>
                              ))
                           }

                        </div>
                     </CardContent>
                  </Card>
               </Grid>
            </Grid>
         </div>
      </div>
   )
}
