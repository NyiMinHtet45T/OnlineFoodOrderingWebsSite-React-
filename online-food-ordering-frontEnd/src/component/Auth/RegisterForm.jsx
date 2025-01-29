import React from 'react'
import { Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Field, Form, Formik } from 'formik'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { registerUser } from '../State/Authentication/Thunk';
import * as Yup from "yup"

export default function RegisterForm() {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (value) => {
    dispatch(registerUser(value))
  }

  const initialValues = {
    username: "",
    email: "",
    password: "",
    roleName: "",
    phoneNumber: ""

  }

  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Username required!"),
    email: Yup.string().required("Email required!"),
    password: Yup.string().required("Password required!"),
    roleName: Yup.string().required("RoleName required!"),
    phoneNumber: Yup.string().required("PhoneNumber required!"),
 })

  return (
    <div>
      <div>
        <Typography variant='h5' className='text-center'>
          Register
        </Typography>
        <Formik onSubmit={handleSubmit} validationSchema={validationSchema} initialValues={initialValues}>
          {({touched, errors, values}) => (
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
              name="email"
              label="Email"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.email && errors.email && <div>{errors.email}</div>}</div>
            <Field
              as={TextField}
              name="password"
              label="Password"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.password && errors.password && <div>{errors.password}</div>}</div>
            <Field
              as={TextField}
              name="phoneNumber"
              label="PhoneNumber"
              fullWidth
              variant="outlined"
              margin="normal"
            />
            <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.phoneNumber && errors.phoneNumber && <div>{errors.phoneNumber}</div>}</div>
            <FormControl fullWidth>
              <InputLabel id="role-simple-select-label">Role</InputLabel>
              <Field
                fullWidth
                as={Select}
                name="roleName"
                labelId="role-simple-select-label"
                label="Role"
                value={values.roleName}
                id="role-simple-select"
              >
                <MenuItem value={"ROLE_CUSTOMER"}>Customer</MenuItem>
                <MenuItem value={"ROLE_RESTAURANT_OWNER"}>Owner</MenuItem>
                <MenuItem value={"ROLE_ADMIN"}>Admin</MenuItem>
              </Field>
            </FormControl>
            <div className='ms-2 mt-0.5 text-red-500 text-[70%]'>{touched.roleName && errors.roleName && <div>{errors.roleName}</div>}</div>
            <Button fullWidth sx={{ mt: 2, padding: "1rem" }} type='submit' variant='contained'>Register</Button>
          </Form>
          )}
        </Formik>
        <Typography variant='body2' align='center' sx={{ mt: 3 }}>
          if you alerady have a account?
          <Button onClick={() => navigate("/account/login")}>
            Login
          </Button>
        </Typography>
      </div>
    </div>
  )
}
