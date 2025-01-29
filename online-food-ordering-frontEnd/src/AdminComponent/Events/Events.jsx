import { Box, Card, CardHeader, Icon, IconButton,Button, Paper,Typography,Modal, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Grid, TextField } from '@mui/material'
import React, { useState } from 'react';
import CreateEvents from './CreateEvents';
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Events() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [formValues, setFormValues] = useState({
    image:"",
    locaion:"",
    name:"",
    startedAt:"",
    endsAt:null
  })


  const handleSubmit = () => {

  }

  const handleFormChange = () => {
    setFormValues({})
  }

  const handleDateChange = (day, dayType) => {
    // const formatedDate = dayjs.
  }

  return (
    <div>
      <div className='p-5'>
        <Button variant='contained'>Create New Event</Button>
        <Button onClick={handleOpen}>Open modal</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
        <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
               <Grid item xs={12}>
                  <TextField
                     name='image'
                     label='Image'
                     variant='outlined'
                     fullWidth
                     value={formValues.image}
                     onChange={handleFormChange}
                  />
               </Grid>
            </Grid>
         </form>
        </Box>
      </Modal>
      </div>
    </div>
  )
}
