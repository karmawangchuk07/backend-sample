import { Mail, Phone, MapPin, Clock,Github,Facebook,Twitter } from "lucide-react";
import { useState } from "react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleInputChange = (e: any) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    // Add form submission logic here (e.g., send to backend or API)
  };

  return (
    <div className="flex h-screen">
      {/* Contact Form Section */}
      <div className="w-3/4 bg-gray-200 flex items-center justify-center mt-8 ml-20 mb-8 shadow-red-500">
        <div className="text-center p-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Contact Us</h2>
          <p className="text-gray-600">
            Feel free to contact us any time. We will get back to you as soon as we can!
          </p>
          <form onSubmit={handleSubmit} className="space-y-6 mt-6">
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-4 border-b-2 border-gray-200 bg-transparent focus:border-yellow-400 focus:outline-none transition-colors duration-300 text-gray-700 placeholder-gray-400"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-4 border-b-2 border-gray-200 bg-transparent focus:border-yellow-400 focus:outline-none transition-colors duration-300 text-gray-700 placeholder-gray-400"
            />
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleInputChange}
              className="w-full p-4 border-b-2 border-gray-200 bg-transparent focus:border-yellow-400 focus:outline-none transition-colors duration-300 text-gray-700 placeholder-gray-400 resize-none"
            ></textarea>
            <button
              type="submit"
              className="w-full bg-gray-900 text-white py-4 px-8 font-semibold tracking-wider hover:bg-gray-800 transition-colors duration-300 mt-8"
            >
              SEND
            </button>
          </form>
        </div>
      </div>

      {/* Info Sidebar */}
      <div className="w-1/4 bg-green-500 flex items-center justify-center mt-8 mr-20 mb-8 shadow-xl/20">
        <div className="text-center p-4 space-y-4">
          <h2 className="text-xl font-bold text-white mb-2">Info</h2>
          <div className="grid grid-cols-1 gap-3">
            <div className="flex items-center">
              <Mail className="w-5 h-5 mr-4 text-yellow-400" />
              <span className="text-gray-300">info@getintouch.we</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 mr-4 text-yellow-400" />
              <span className="text-gray-300">+123 456 7890</span>
            </div>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 mr-4 text-yellow-400" />
              <span className="text-gray-300">123 Street, City</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-5 h-5 mr-4 text-yellow-400" />
              <span className="text-gray-300">Mon - Fri: 9am - 6pm</span>
            </div>
            <div className="flex mt-5">
              <a href="https://github.com"><Github className="w-10 h-10 ml-4"/></a>
              <a href="https://twitter.com"><Twitter className="w-10 h-10 ml-5"/></a>
              <a href="https://facebook.com"><Facebook className="w-10 h-10 ml-5"/></a>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
