import { Delete } from '@mui/icons-material'
import { Card, CardActions, CardContent, CardMedia, IconButton, Typography } from '@mui/material'
import React from 'react'

export default function EventsCard() {
   return (
      <div>
         <Card sx={{ width: 245 }}>
            <CardMedia sx={{ height: 345 }} image='https://i.pinimg.com/474x/d2/c3/53/d2c3533e65fb4a5c53b6b4efbceacf74.jpg' />
            <CardContent>
               <Typography variant='h5'>
                  Myanmar Fast Food
               </Typography>
               <Typography variant='body2'>
                  50% off on your first order
               </Typography>
               <div className="py-2 space-y-2">
                  <p>Myanmar</p>
                  <p className='text-sm text-blue-500'>Faburary 14, 2024 12:00 AM</p>
                  <p className='text-sm text-red-600'>Faburary 15, 2024 12:00 AM</p>
               </div>
            </CardContent>
            {
               true && <CardActions>
                  <IconButton>
                     <Delete />
                  </IconButton>
               </CardActions>
            }
         </Card>
      </div>
   )
}
