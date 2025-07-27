import img from '../assets/simple.jpg';
import Navbar from '../components/Navbar';
const Home = () => {
  return (
    <div
      className="relative w-full h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${img})` }}
    >
      <Navbar/>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40"></div>

      {/* Centered content */}
      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <h2 className="font-indie text-white text-3xl sm:text-6xl md:text-[82px] font-semibold max-w-3xl px-4">
          TASTE BUD'S REVIEW
        </h2>
      </div>
    </div>
  );
};

export default Home;
