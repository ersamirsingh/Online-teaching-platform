import React from "react"
import Nav from "../components/Nav"
import { useSelector } from "react-redux";




function Home(){

   const {loading} = useSelector(state=>state.auth)


   
   if (loading) {
      return (
         <div className="min-h-screen flex items-center justify-center">
         <span className="loading loading-spinner loading-lg"></span>
         </div>
      );
   }


   return (
      <>
         <Nav/>
         <div className="min-h-screen bg-gradient-to-b from-blue-300 to-blue-500">
            <div className="container mx-auto px-4 py-16">
               <div className="flex flex-col items-center justify-center space-y-8">
                  <h1 className="text-5xl font-bold text-white animate-fadeIn">
                     Welcome to Learning Platform
                  </h1>
                  <p className="text-xl text-white text-center max-w-2xl animate-slideUp">
                     Discover a world of knowledge with our interactive online courses
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
                     <div className="p-6 bg-[#20232A] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                        <h3 className="text-xl font-semibold text-white mb-4">Live Classes</h3>
                        <p className="text-gray-300">Interactive sessions with expert instructors</p>
                     </div>
                     <div className="p-6 bg-[#20232A] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                        <h3 className="text-xl font-semibold text-white mb-4">Self-Paced Learning</h3>
                        <p className="text-gray-300">Learn at your own pace with structured content</p>
                     </div>
                     <div className="p-6 bg-[#20232A] rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                        <h3 className="text-xl font-semibold text-white mb-4">Expert Support</h3>
                        <p className="text-gray-300">Get help from our dedicated support team</p>
                     </div>
                  </div>
               </div>

               {/* Course Details Section */}
               <div className="mt-20 bg-[#20232A] rounded-lg p-8">
                  <h2 className="text-3xl font-bold text-white mb-8 text-center">Featured Courses</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                     <div className="bg-[#282C34] p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-white mb-2">Web Development</h3>
                        <p className="text-gray-300 mb-4">Learn modern web development with React</p>
                        <button className="bg-[#61DAFB] text-[#20232A] px-4 py-2 rounded hover:bg-[#4FA8C6] transition-colors">
                           Learn More
                        </button>
                     </div>
                     <div className="bg-[#282C34] p-6 rounded-lg">
                        <h3 className="text-xl font-semibold text-white mb-2">Data Science</h3>
                        <p className="text-gray-300 mb-4">Master data analysis and machine learning</p>
                        <button className="bg-[#61DAFB] text-[#20232A] px-4 py-2 rounded hover:bg-[#4FA8C6] transition-colors">
                           Learn More
                        </button>
                     </div>
                  </div>
               </div>
            </div>

            {/* Footer Section */}
            <footer className="bg-[#20232A] text-white py-8 mt-20">
               <div className="container mx-auto px-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                     <div>
                        <h4 className="text-lg font-semibold mb-4">Contact Us</h4>
                        <p className="text-gray-300">Email: info@learning.com</p>
                        <p className="text-gray-300">Phone: +1 234 567 890</p>
                     </div>
                     <div>
                        <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
                        <ul className="text-gray-300">
                           <li className="mb-2"><a href="#" className="hover:text-[#61DAFB]">About Us</a></li>
                           <li className="mb-2"><a href="#" className="hover:text-[#61DAFB]">Courses</a></li>
                           <li className="mb-2"><a href="#" className="hover:text-[#61DAFB]">Contact</a></li>
                        </ul>
                     </div>
                     <div>
                        <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
                        <div className="flex space-x-4">
                           <a href="#" className="text-gray-300 hover:text-[#61DAFB]">Twitter</a>
                           <a href="#" className="text-gray-300 hover:text-[#61DAFB]">LinkedIn</a>
                           <a href="#" className="text-gray-300 hover:text-[#61DAFB]">Facebook</a>
                        </div>
                     </div>
                  </div>
               </div>
            </footer>
         </div>
      </>
   )
}

export default Home