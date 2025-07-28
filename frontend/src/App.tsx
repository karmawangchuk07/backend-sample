import { Route,Routes } from "react-router-dom"
import Home from "./pages/Home"
import Review from "./pages/Review"
function App(){
  return <div>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/review" element={<Review/>}/>
      {/* <Route path="/review" element={<Review/>}/> */}
    </Routes>
    </div>
}

export default App