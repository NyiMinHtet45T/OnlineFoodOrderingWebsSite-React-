import { AddPhotoAlternate, Close } from '@mui/icons-material';
import { Button, CircularProgress, Grid, IconButton, TextField } from '@mui/material';
import { Field, Form, Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { createRestaurant, getRestaurantById, updateRestaurant } from '../../component/State/Restaurant/Thunk';
import { useNavigate, useParams } from 'react-router-dom';
import * as Yup from "yup" 

export default function CreateRestaurant() {

   const [intialValues, setIntialValues] = useState({
      id: "",
      name: "",
      description: "",
      cuisineType: "",
      openingHours: "MON-SUN : 9:00AM - 12:00PM",
      image: [],
      ownerId: "",

      address: {
         id:"",
         streetAddress: "",
         city: "",
         state: "",
         country: ""
      },

      contactInformation: {
         id:"",
         email: "",
         mobile: "",
         twitter: "",
         instagram: ""
      }
   });

   const userId = useSelector(state => state.auth.user?.id);

   useEffect(() => {
      setIntialValues(prev => ({ ...prev, ownerId: userId }))
   }, [userId])

   const [uploadImage, setUploadImage] = useState(false);

   const handleRemoveImage = (image) => {
      const filImage = imagePhoto.filter(prevImage => prevImage !== image)
      setImagePhoto(filImage);
   }

   const [imagePhoto, setImagePhoto] = useState([]);

   const handleImageChange = (e) => {
      const image = e.target.files[0].name
      setUploadImage(true)
      setImagePhoto(prev => {
         const finalImage = prev == undefined ? [image] :   [...prev, image];
         return finalImage;
      });
      setUploadImage(false)
   };

   var { id } = useParams();

   const restaurant = useSelector(state => state.restaurant.restaurant);

   const preaddress = restaurant?.address;

   const preContact = restaurant?.contactInformation;

   const handleUpdate = () => {


      const updateRestaurant = {
         id: restaurant?.id,
         name: restaurant?.name,
         description: restaurant?.description,
         cuisineType: restaurant?.cuisineType,
         openingHours: restaurant?.openingHours,
         image: restaurant?.image,
         ownerId: userId,
   
         address: {
            id:preaddress?.id,
            streetAddress: preaddress?.streetAddress,
            city: preaddress?.city,
            state: preaddress?.state,
            country: preaddress?.country
         },
   
         contactInformation: {
            id:preContact?.id,
            email: preContact?.email,
            mobile: preContact?.mobile,
            twitter: preContact?.twitter,
            instagram: preContact?.instagram
         }
      }

      setIntialValues(updateRestaurant);
      setImagePhoto(restaurant?.image)
   }

   useEffect(() => {
      handleUpdate();
   },[restaurant])

   useEffect(() => {
      dispatch(getRestaurantById(id))
   }, [])

   const dispatch = useDispatch();
   const navigate = useNavigate();

   const handleSubmit = (value) => {
      value.image = imagePhoto;
      if (id) {
         dispatch(updateRestaurant(value))
         navigate("/admin/restaurant/details")
      } else {
         value.id = null;
         dispatch(createRestaurant(value, navigate))
         navigate("/admin/restaurant")
      }
   }

   const validationSchema = Yup.object().shape({
      name: Yup.string().required("Name is required"),
      openingHours: Yup.string().required("Opening hours are required"),
      address: Yup.object().shape({
        streetAddress: Yup.string().required("Street Address is required"),
        city: Yup.string().required("City is required"),
        state: Yup.string().required("State is required"),
        country: Yup.string().required("Country is required"),
      }),
      contactInformation: Yup.object().shape({
        email: Yup.string().email("Invalid email format").required("Email is required"),
        mobile: Yup.string()
          .matches(/^\d+$/, "Mobile must be a number")
          .required("Mobile is required"),
      }),
    });

   return (
      <div className='py-10 lg:flex items-center justify-center min-h-screen'>
         <div className="lg:max-w-4xl">
            <h1 className='font-bold text-2xl text-center py-2'>
               Add New Restaurant
            </h1>
            <Formik enableReinitialize initialValues={intialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
               {({ touched, errors }) => (
                  <Form>
                     <Grid container spacing={2}>
                        <Grid item className='flex flex-wrap gap-5' xs={12}>
                           <input accept='image/*' type='file' id='fileInput' onChange={(e) => handleImageChange(e)} style={{ display: "none" }} />
                           <label className='relative' htmlFor="fileInput">
                              <span className='w-24 h-24 cursor-pointer flex items-center justify-center p-3 rounded-md border border-gray-600'>
                                 <AddPhotoAlternate className='text-white' />
                              </span>
                              {
                                 uploadImage && <div className='absolute left-0 right-0 top-0 bottom-0 w-24 h-24 flex justify-center items-center'><CircularProgress /></div>
                              }
                           </label>
                           <div className="flex flex-wrap gap-2">
                              {imagePhoto?.map((image, index) => (
                                 <div key={index} className='relative'>
                                    <img src={`/imgae/restaurantPhoto/${image}`} className='w-24 h-24 object-cover' alt="" />
                                    <IconButton size='small' sx={{ position: 'absolute', top: 0, right: 0, outline: "none", }} onClick={() => handleRemoveImage(image)}>
                                       <Close className='text-black' sx={{ fontSize: "1.3rem" }} />
                                    </IconButton>
                                 </div>
                              ))}
                           </div>
                        </Grid>
                        <Grid item xs={12}>
                           <Field fullWidth as={TextField} id="name" name="name" label="Name" variant='outlined' />
                           <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.name && errors.name && <div>{errors.name}</div>}</div>
                        </Grid>
                        <Grid item xs={12}>
                           <Field fullWidth as={TextField} id="description" name="description" label="description" variant='outlined' />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                           <Field fullWidth as={TextField} id="cuisineType" name="cuisineType" label="CuisineType" variant='outlined' />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                           <Field fullWidth as={TextField} id="openingHours" name="openingHours" label="Opening Hours" variant='outlined' />
                           <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.openingHours && errors.openingHours && <div>{errors.openingHours}</div>}</div>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                           <Field fullWidth as={TextField} id="city" name="address.city" label="City" variant='outlined' />
                           <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.address?.city && errors.address?.city && <div>{errors.address?.city}</div>}</div>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                           <Field fullWidth as={TextField}  id="state" name="address.state" label="State" variant='outlined' />
                           <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.address?.state && errors.address?.state && <div>{errors.address?.state}</div>}</div>
                        </Grid>
                        <Grid item xs={12} lg={4}>
                           <Field fullWidth as={TextField}  id="country" name="address.country" label="Country" variant='outlined' />
                           <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.address?.country && errors.address?.country && <div>{errors.address?.country}</div>}</div>
                        </Grid>
                        <Grid item xs={12}>
                           <Field fullWidth as={TextField}  id="streetAddress" name="address.streetAddress" label="Street Address" variant='outlined' />
                           <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.address?.streetAddress && errors.address?.streetAddress && <div>{errors.address?.streetAddress}</div>}</div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                           <Field fullWidth as={TextField}  id="email" name="contactInformation.email" label="Email" variant='outlined' />
                           <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.contactInformation?.email && errors.contactInformation?.email && <div>{errors.contactInformation?.email}</div>}</div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                           <Field fullWidth as={TextField}  id="mobile" name="contactInformation.mobile" label="Mobile" variant='outlined' />
                           <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.contactInformation?.mobile && errors.contactInformation?.mobile && <div>{errors.contactInformation?.mobile}</div>}</div>
                        </Grid>
                        <Grid item xs={12} lg={6}>
                           <Field fullWidth as={TextField}  id="twitter" name="contactInformation.twitter" label="Twitter" variant='outlined' />
                        </Grid>
                        <Grid item xs={12} lg={6}>
                           <Field fullWidth as={TextField} id="instagram" name="contactInformation.instagram" label="Instagram" variant='outlined' />
                        </Grid>
                     </Grid>
                     <Button variant='contained' color='primary' type='submit' fullWidth >Create Restaurant</Button>
                  </Form>
               )}
            </Formik>
         </div>
      </div>
   )
}
