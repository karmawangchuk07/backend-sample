
const Navbar = () => {
  return (
    <div className="absolute top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-center items-center py-4 px-6 md:px-20 lg:px-32 bg-transparent">
            <ul className="hidden md:flex gap-8 text-white font-indie font-semibold text-2xl">
                <li><a href="https://google.com" className='cursor-pointer hover:text-gray-400'>Restaurent</a></li>
                <li><a href="#reviews" className='cursor-pointer hover:text-gray-400'>Reviews</a></li>
                <li><a href="#about" className='cursor-pointer hover:text-gray-400'>About Us</a></li>
                <li><a href="#contact" className='cursor-pointer hover:text-gray-400'>Contact</a></li>
                
            </ul>
            <button className="flex justify-end hidden md:block bg-green-500 px-8 py-2 rounded-full cursor-pointer text-white">Add Review</button>
            
        </div>
    </div>
  )
}

export default Navbar