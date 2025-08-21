import React from 'react'
import {Route,Routes,BrowserRouter} from "react-router-dom"
import Login from "./Pages/LoginPage/index"
import Home from "./Pages/HomePage/index"
import RestaurantPage from "./Pages/RestaurantDetails/index"
import UnAuthorizedRiders from "./Pages/UnAuthorizedRider/Index"
import UnAuthorizedChefs from "./Pages/UnAuthorizedChef/Index"
import TablesOnHome from "./components/TableHomeScreen/Index"
const App = () => {
  return (
       <BrowserRouter>
<Routes>
  <Route path='/login' element={<Login/>}/>
  <Route path='/' element={<Home/>}/>
  <Route path='/restaurant/:id' element={<RestaurantPage/>}/>
  <Route path='/unAuthorizedRiders' element={<UnAuthorizedRiders/>}/>
  <Route path='/unAuthorizedChefs' element={<UnAuthorizedChefs/>}/>
   <Route path='/:types' element={<Home/>} />

</Routes>
</BrowserRouter>
  )
}

export default App