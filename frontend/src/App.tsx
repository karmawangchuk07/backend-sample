import { Route,Routes, useLocation } from "react-router-dom"
import Home from "./pages/Home"
import ReviewCard from "./components/ReviewCard"
import Navbar from "./components/Navbar"
import Restaurant from "./pages/Restaurent"
// import Signup from "./pages/Signup"


function App(){

  const location=useLocation()
  const hidenavBar=["/signup","/signin"]
  const shouldhideNavbar=hidenavBar.includes(location.pathname)
  return <div>
    {!shouldhideNavbar&&<Navbar/>}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/review" element={<ReviewCard/>}/>
      <Route path="/restaurants" element={<Restaurant/>}/>
      {/* <Route path="/signup" element={<Signup/>}/> */}
    </Routes>
    </div>
}

export default App