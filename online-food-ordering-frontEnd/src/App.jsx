
import { ThemeProvider } from '@emotion/react'
import './App.css'
import Navbar from './component/Navbar/Navbar'
import { darkTheme } from './Theme/DarkTheme'
import { CssBaseline } from '@mui/material'
import Home from './component/Home/Home'
import RestaurantDetail from './component/Restaurant/RestaurantDetail'
import Cart from './component/Cart/Cart'
import Profile from './component/Profile/Profile'
import Auth from './component/Auth/Auth'
import Routers from './Routers/Routers'

function App() {

  return (
    <>
      <ThemeProvider theme={darkTheme}>
        <CssBaseline></CssBaseline>
        <Routers/>
      </ThemeProvider>
    </>
  )
}

export default App
