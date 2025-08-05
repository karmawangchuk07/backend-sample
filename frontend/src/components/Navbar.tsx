import { Menu, Utensils, X, User, LogOut, Settings, Bell, Edit } from "lucide-react"
import { useState, useEffect, useRef } from "react"
import { useNavigate, useLocation } from 'react-router-dom'

interface NavbarProps {
  // No props needed - auto-detects route
}

const Navbar: React.FC<NavbarProps> = () => {
  const [menuOpen, setOpen] = useState<boolean>(false)
  const navigate = useNavigate()
  const location = useLocation()

  const [isopen, setIsopen] = useState<boolean>(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickoutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsopen(false) // Fixed: was setOpen(false), should be setIsopen(false)
      }
    }
    if (isopen) {
      document.addEventListener('mousedown', handleClickoutside)
    }
    return () => {
      document.removeEventListener('mousedown', handleClickoutside)
    }
  }, [isopen])

  const toggleDrop = (): void => {
    setIsopen(!isopen)
  }

  const handleProfile = (): void => {
    console.log('View Profile');
    setIsopen(false);
  };

  const handleEditProfile = (): void => {
    console.log('Edit Profile');
    setIsopen(false);
  };

  const handleSettings = (): void => {
    console.log('Settings');
    setIsopen(false);
  };

  const handleNotifications = (): void => {
    console.log('Notifications');
    setIsopen(false);
  };

  const handleLogout = (): void => {
    console.log('Logout');
    setIsopen(false);
  };

  const toggle = (): void => {
    setOpen(!menuOpen)
  }

  // Get current page from React Router location
  const getCurrentPage = (): string => {
    const path = location.pathname
    console.log('Current path:', path) // Debug log
    
    if (path === '/review' || path.startsWith('/review')) return 'review'
    if (path === '/about' || path.startsWith('/about')) return 'about'
    if (path === '/contact' || path.startsWith('/contact')) return 'contact'
    if (path === '/restaurants' || path.startsWith('/restaurants')) return 'restaurants' // Fixed: changed to 'restaurants'
    return 'home'
  }

  const currentPage = getCurrentPage()
  console.log('Current page detected:', currentPage) // Debug log

  // Navigation handler
  const handleNavigation = (route: string): void => {
    console.log('Navigating to:', route) // Debug log
    navigate(route)
    setOpen(false) // Close mobile menu
  }

  // Update colors when route changes
  useEffect(() => {
    console.log('Route changed, current page:', currentPage) // Debug log
  }, [location.pathname])

  // Define pages that should have the special styling
  const specialPages: string[] = ['review', 'restaurants'] // Fixed: matches the route detection
  const isSpecialPage: boolean = specialPages.includes(currentPage)

  console.log('Current page:', currentPage) // Debug log
  console.log('Is special page:', isSpecialPage) // Debug log

  // Dynamic color classes based on route
  const textColor: string = isSpecialPage ? 'text-black' : 'text-white'
  const hoverColor: string = isSpecialPage ? 'hover:text-green-600' : 'hover:text-green-400'
  const logoAccentColor: string = isSpecialPage ? 'text-green-600' : 'text-green-400'
  const navBg: string = isSpecialPage ? 'bg-white/95 backdrop-blur-sm border-b border-gray-200' : 'bg-transparent'
  const mobileMenuBg: string = isSpecialPage ? 'bg-white border border-gray-200' : 'bg-gray-900/90 backdrop-blur-sm'
  const mobileTextColor: string = isSpecialPage ? 'text-black' : 'text-white'
  const mobileHoverColor: string = isSpecialPage ? 'hover:text-green-600 hover:bg-green-50' : 'hover:text-green-400 hover:bg-green-400/10'

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => handleNavigation('/')} 
              className={`flex items-center ${textColor} text-xl font-bold hover:opacity-80 transition-all duration-300`}
            >
              <Utensils className={`h-8 w-8 mr-2 ${logoAccentColor} transition-colors duration-300`} />
              Foodie
            </button>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center">
            <div className="flex items-baseline space-x-8">
              <button 
                onClick={() => handleNavigation('/restaurants')} // Fixed: changed to '/restaurants'
                className={`${textColor} ${hoverColor} px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isSpecialPage ? 'hover:bg-green-50' : 'hover:bg-green-400/10'} hover:-translate-y-0.5`}
              >
                Restaurants
              </button>
              
              {/* Reviews button - YOUR EXACT PATTERN */}
              <button 
                onClick={() => {
                  console.log('Reviews button clicked!') // Debug log
                  navigate('/review')
                }}
                className={`${textColor} ${hoverColor} px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isSpecialPage ? 'hover:bg-green-50' : 'hover:bg-green-400/10'} hover:-translate-y-0.5`}
              >
                Reviews
              </button>
              
              <button onClick={() => {
                if (location.pathname === "/") {
                  const el = document.getElementById("About");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                } else {
                  navigate("/#About"); // This will be handled in Home.tsx
                }
                setOpen(false);
              }}
                className={`${textColor} ${hoverColor} px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isSpecialPage ? 'hover:bg-green-50' : 'hover:bg-green-400/10'} hover:-translate-y-0.5`}
              >
                About Us
              </button>
              <button 
                onClick={() => {
                if (location.pathname === "/") {
                  const el = document.getElementById("contact");
                  if (el) {
                    el.scrollIntoView({ behavior: "smooth" });
                  }
                } else {
                  navigate("/#contact"); // Fixed: should navigate to #contact, not #About
                }
                setOpen(false);
              }}
                className={`${textColor} ${hoverColor} px-3 py-2 rounded-md text-sm font-medium transition-all duration-300 ${isSpecialPage ? 'hover:bg-green-50' : 'hover:bg-green-400/10'} hover:-translate-y-0.5`}
              >
                Contact
              </button>
            </div>
            
            {/* Add Review Button and User Icon */}
            <div className="ml-8 flex items-center space-x-4">
              <button 
                onClick={() => {
                  console.log('Add Review button clicked!') // Debug log
                  navigate('/review')
                }}
                className="bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 hover:-translate-y-0.5 shadow-lg hover:shadow-green-500/25"
              >
                Add Review
              </button>
              
              {/* User Dropdown Container */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={toggleDrop}
                  className={`${textColor} ${hoverColor} p-2 rounded-full ${isSpecialPage ? 'hover:bg-green-50' : 'hover:bg-green-400/10'} transition-all duration-300`}
                >
                  <User className="h-6 w-6" />
                </button>
                
                {/* Dropdown Menu */}
                {isopen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                    {/* User Info Header */}
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">John Doe</p>
                      <p className="text-sm text-gray-500">john.doe@example.com</p>
                    </div>

                    {/* Menu Items */}
                    <div className="py-1">
                      <button
                        onClick={handleProfile}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                      >
                        <User size={16} className="mr-3" />
                        View Profile
                      </button>

                      <button
                        onClick={handleEditProfile}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                      >
                        <Edit size={16} className="mr-3" />
                        Edit Profile
                      </button>

                      <button
                        onClick={handleNotifications}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                      >
                        <Bell size={16} className="mr-3" />
                        Notifications
                      </button>

                      <button
                        onClick={handleSettings}
                        className="w-full flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition-colors duration-150"
                      >
                        <Settings size={16} className="mr-3" />
                        Settings
                      </button>

                      <hr className="my-1 border-gray-100" />

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                      >
                        <LogOut size={16} className="mr-3" />
                        Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button onClick={toggle} className={`${textColor} ${hoverColor} focus:outline-none transition-colors duration-300`}>
              {menuOpen ? (<X className="h-6 w-6" />) : (<Menu className="h-6 w-6" />)}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${menuOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
          <div className={`px-2 pt-2 pb-3 ${mobileMenuBg} rounded-lg mt-2 shadow-lg`}>
            <button 
              onClick={() => handleNavigation('/restaurants')} // Fixed: changed to '/restaurants'
              className={`${mobileTextColor} ${mobileHoverColor} block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 w-full text-left`}
            >
              Restaurants
            </button>
            <button 
              onClick={() => {
                console.log('Mobile Reviews clicked!') // Debug log
                navigate('/review')
                setOpen(false)
              }}
              className={`${mobileTextColor} ${mobileHoverColor} block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 w-full text-left`}
            >
              Reviews
            </button>
            <button 
              onClick={() => handleNavigation('/about')}
              className={`${mobileTextColor} ${mobileHoverColor} block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 w-full text-left`}
            >
              About Us
            </button>
            <button 
              onClick={() => handleNavigation('/contact')}
              className={`${mobileTextColor} ${mobileHoverColor} block px-3 py-2 rounded-md text-base font-medium transition-all duration-300 w-full text-left`}
            >
              Contact
            </button>
            <div className="px-3 py-2">
              <button 
                onClick={() => {
                  console.log('Mobile Add Review clicked!') // Debug log
                  navigate('/review')
                  setOpen(false)
                }}
                className="w-full bg-gradient-to-r from-green-500 to-green-600 text-white px-6 py-2 rounded-full font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-lg"
              >
                Add Review
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar