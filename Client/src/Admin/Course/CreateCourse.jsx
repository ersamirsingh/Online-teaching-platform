import React, { useState } from 'react';
import axiosClient from '../../API/axiosClient';

const CreateCourse = () => {
   const [formData, setFormData] = useState({
      title: '',
      description: '',
      category: '',
      price: '',
      thumbnail: null,
   });

   const [preview, setPreview] = useState(null);
   const [loading, setLoading] = useState(false);
   const [message, setMessage] = useState('');

   // Handle input change
   const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({
         ...prev,
         [name]: value,
      }));
   };

   // Handle thumbnail upload
   const handleThumbnail = (e) => {
      const file = e.target.files[0];
      if (file) {
         setFormData((prev) => ({ ...prev, thumbnail: file }));
         setPreview(URL.createObjectURL(file));
      }
   };

   // Submit handler
   const handleSubmit = async (e) => {
      e.preventDefault();
      setLoading(true);
      setMessage('');

      try {
         const data = new FormData();
         data.append('title', formData.title);
         data.append('description', formData.description);
         data.append('category', formData.category);
         data.append('price', formData.price);
         if (formData.thumbnail) data.append('thumbnail', formData.thumbnail);

         // For actual API call, uncomment below:
         // const res = await axiosClient.post('/course/create', data);
         console.log([...data.entries()]);

         setMessage('✅ Course created successfully!');
         setFormData({
            title: '',
            description: '',
            category: '',
            price: '',
            thumbnail: null,
         });
         setPreview(null);
      } catch (error) {
         setMessage(error.response?.data?.message || '❌ Something went wrong');
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center px-6 py-12">
         <div
            className="w-full max-w-3xl bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 transform transition-all duration-300 hover:scale-[1.02]"
         >
            <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-10 drop-shadow-sm">
               Create a New Course
            </h1>

            <form onSubmit={handleSubmit} className="space-y-6">
               {/* Title */}
               <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                     Course Title <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="text"
                     name="title"
                     value={formData.title}
                     onChange={handleChange}
                     required
                     className="text-black w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                     placeholder="Enter course title"
                  />
               </div>

               {/* Description */}
               <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                     Description
                  </label>
                  <textarea
                     name="description"
                     value={formData.description}
                     onChange={handleChange}
                     rows="4"
                     className="text-black w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                     placeholder="Write a short course description..."
                  ></textarea>
               </div>

               {/* Category */}
               <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                     Category
                  </label>
                  <input
                     type="text"
                     name="category"
                     value={formData.category}
                     onChange={handleChange}
                     className="text-black w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                     placeholder="e.g., Web Development, Data Science"
                  />
               </div>

               {/* Price */}
               <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                     Price (₹) <span className="text-red-500">*</span>
                  </label>
                  <input
                     type="number"
                     name="price"
                     value={formData.price}
                     onChange={handleChange}
                     required
                     min="0"
                     className="text-black w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                     placeholder="Enter course price"
                  />
               </div>

               {/* Thumbnail */}
               <div>
                  <label className="block text-gray-700 font-semibold mb-1">
                     Course Thumbnail
                  </label>
                  <input
                     type="file"
                     accept="image/*"
                     onChange={handleThumbnail}
                     className="text-black w-full border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                  />
                  {preview && (
                     <div className="mt-3 flex justify-center">
                        <img
                           src={preview}
                           alt="Thumbnail Preview"
                           className="w-64 h-40 object-cover rounded-lg shadow-lg border border-gray-200"
                        />
                     </div>
                  )}
               </div>

               {/* Submit Button */}
               <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-lg transition-all shadow-lg hover:shadow-indigo-400 active:scale-95"
               >
                  {loading ? 'Creating Course...' : 'Create Course'}
               </button>

               {/* Message */}
               {message && (
                  <p
                     className={`text-center mt-4 font-medium text-lg ${message.includes('✅')
                           ? 'text-green-600'
                           : 'text-red-600'
                        }`}
                  >
                     {message}
                  </p>
               )}
            </form>
         </div>
      </div>
   );
};

export default CreateCourse;
