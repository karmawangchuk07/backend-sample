import img from '../assets/asset/simple.jpg';
import Navbar from '../components/Navbar';
import About from './About';
import Contact from './Contact';
const Home = () => {
  return (
    <div>
      <Navbar/>
      <div  className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Centered content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <h2 className="font-indie text-3xl sm:text-6xl md:text-[82px] font-semibold max-w-5xl px-4 text-green-400">
          TASTE BUD'S REVIEW
        </h2>
        <p className='text-gray-300 font-serif text-md md:text-lg hover:text-green-300'>Here to provide the worlds best food Reviews
        </p>
      </div>
    </div>
        <About/>
        <Contact/>
    </div>
  );
};

export default Home;
