import img from '../assets/asset/img1.jpg'

const About = () => {
  return (
    <div className='flex flex-col items-center justify-center mx-auto p-14 md:px-20 lg:px-32 w-full overflow-hidden' id='About'>
        <h1 className='text-2xl sm:text-4xl font-bold mb-2'>About <span className='underline underline-offset-4 decoration-1 under font-light'>Us</span></h1>
        <p className='text-gray-500 max-w-80 text-center mb-8'>Passionate About Foods</p>
        <div className='flex flex-col md:flex-row items-center md:items-start md:gap-20'><br />
            <img src={img} alt="" className='w-full h-90 sm:w-1/2 max-w-lg'/>
            <div className='flex flex-col items-center md:items-start mt-10 text-grey-600'>
                <br />
                <br />
                <div className='my-10 max-w-lg font-semibold font-inter text-xl text-black hover:text-green-600'>At Taste Buds Review, we bring the flavors of your city right to your screen. Discover honest reviews of restaurants, dishes, and dining experiences shared by real food lovers like you. Whether you're craving spicy street food, cozy café vibes, or fine dining elegance, our community-driven platform helps you decide where to eat next.
                <br />
                <br />
                Leave your own reviews, rate the food and ambience, and help others find their next favorite spot. From hidden gems to trending hotspots — Taste Buds Review is your trusted guide to great food.

                </div>
            </div>
        </div>
    </div>
  )
}

export default About