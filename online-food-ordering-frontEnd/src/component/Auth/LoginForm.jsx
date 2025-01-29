import { Button, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { loginUser } from '../State/Authentication/Thunk';
import * as Yup from "yup"

export default function LoginForm() {

   const navigate = useNavigate();
   const dispatch = useDispatch();

   const handleSubmit = (value) => {
      dispatch(loginUser(value, navigate))
      
   }

   const initialValues = {
      username: "",
      password: ""
   }

   const validationSchema = Yup.object().shape({
      username: Yup.string().required("Username required!"),
      password: Yup.string().required("Password required!")
   })

   return (
      <div>
         <Typography variant='h5' className='text-center'>
            Login
         </Typography>
         <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
            {({touched, errors}) => (
               <Form>
               <Field
                  as={TextField}
                  name="username"
                  label="Username"
                  fullWidth
                  variant="outlined"
                  margin="normal"
               
               />
               <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.username && errors.username && <div>{errors.username}</div>}</div>
               <Field
                  as={TextField}
                  name="password"
                  label="Password"
                  fullWidth
                  variant="outlined"
                  margin="normal"
              
               />
               <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.password && errors.password && <div>{errors.password}</div>}</div>
               <Button fullWidth sx={{mt:2, padding: "1rem"}} type='submit' variant='contained'>Login</Button>
            </Form>
            )}
         </Formik>
         <Typography variant='body2' align='center' sx={{mt:3}}>
            Don't have an account?
            <Button  onClick={() => navigate("/account/register")}>
               register
            </Button>
         </Typography>
      </div>
   )
}
