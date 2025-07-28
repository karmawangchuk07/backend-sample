import { Menu, Utensils, X,User } from "lucide-react"
import { useState } from "react"
import { Link } from "react-router-dom"
import Review from "../pages/Review"
const Navbar = () => {


    const [menuOpen,setOpen]=useState(false)

    const toogle=()=>{
      setOpen(!menuOpen)
    }

  return (
    <div className="min-h-screen">
      <nav className="absolute top-0 left-0 w-full z-50 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
            <div className="flex justify-between items-center h-16">
              {/*//logo*/}
              <div className="flex items-center">
                <a href="#" className="flex items-center text-white text-xl font-bold">
                    <Utensils className="h-8 w-8 mr-2 text-green-400" />
                    Foodie
                  </a>
              </div>

              <div className="hidden md:block">
                  <div className="ml-10 flex items-baseline space-x-8">
                    <a href="#" className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-green-400/10 hover:-translate-y-0.5">
                      Restaurant
                    </a>
                    <Link to='/review' className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-green-400/10 hover:-translate-y-0.5">
                      Reviews
                    </Link>
                    <a href="#" className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-green-400/10 hover:-translate-y-0.5">
                      About Us
                    </a>
                    <a href="#" className="text-white hover:text-green-400 px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 hover:bg-green-400/10 hover:-translate-y-0.5">
                      Contact
                    </a>
                    <div className="ml-8 flex items-center space-x-4">
                      <button className="bg-gradient-to-r from-green-500 to-green-900 text-white px-6 py-2 rounded-full font-semibold hover:from-green-600 hover:to-green-800 transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-green-500/25">
                        Add Review
                      </button>
                      <a href="#"className="text-white hover:text-green-400 p-2 rounded-full hover:bg-green-400/10 transition-all duration-300">
                        <User className="h-8 w-8"/>
                      </a>
                    </div>
                  </div>
              </div>
              <div className="md:hidden flex flex-cols justify-end ">
                <button onClick={toogle} className="text-white hover:text-green-400 focus:outline-none focus:text-green-400 transition-colors duration-300">
                  {menuOpen?(<X className="h-6 w-6"/>):(<Menu className="h-6 w-6"/>)}
                </button>
              </div>
           </div>
          <div className={`md:hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
            <div className="px-2 pt-2 pb-3 bg-gray-300 greenborder-gray-900">
              <a href="#" className="text-green hover:text-green-400 hover:bg-green-400/10 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300">
                Restaurant
              </a>
              <a href="#" className="text-green hover:text-green-400 hover:bg-green-400/10 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300">
                Reviews
              </a>
              <a href="#" className="text-green hover:text-green-400 hover:bg-green-400/10 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300">
                About Us
              </a>
              <a href="#" className="text-green hover:text-green-400 hover:bg-green-400/10 block px-3 py-2 rounded-md text-base font-medium transition-all duration-300">
                Contact
              </a>
              <div className="px-3 py-2">
                <button className="w-1/8 bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg">
                  Add Review
                </button>
              </div>
            </div>
          </div>
        </div>
        </nav>
    </div> 
  )
}

export default Navbar