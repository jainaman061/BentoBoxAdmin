import React from 'react'
import {Route,Routes,BrowserRouter, useNavigate} from "react-router-dom"
import Login from "./Pages/LoginPage/index"
import Home from "./Pages/HomePage/index"
import RestaurantPage from "./Pages/RestaurantDetails/index"
import UnAuthorizedRiders from "./Pages/UnAuthorizedRider/Index"
import UnAuthorizedChefs from "./Pages/UnAuthorizedChef/Index"
import Userdetails from "./Pages/UserDetails/index"
import WeekMealNotAdded from "./Pages/WeekMealNotAdded/index"
import EditContainer from "./Pages/EditContainer/Index"
import AddCoupon from "./Pages/Addcoupon/Index"
import CreateOnetimeorder from "./Pages/CreateOneTimeOrder/Index"
import CreateSubscription from "./Pages/CreateSubscription/Index"
import RatingsPage from "./Pages/RatingsPage/Index"
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
   <Route path="/userDetails/:number" element={<Userdetails />}/>
   <Route path='/weekmealnotadded' element={<WeekMealNotAdded />} />
    <Route path='/editContainer' element={<EditContainer />} />
<Route path='/addCoupon' element={<AddCoupon />} />
<Route path="/ratings/orders" element={<RatingsPage />} />
<Route path="/onetimeorder/create" element={<CreateOnetimeorder/>} />
<Route path="/subscription/create" element={<CreateSubscription/>} />

</Routes>
</BrowserRouter>
  )
}

export default App