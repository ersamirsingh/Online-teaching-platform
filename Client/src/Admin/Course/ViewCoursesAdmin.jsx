import React from 'react';
import toast from 'react-hot-toast';
import axiosClient from '../../API/axiosClient';
import { useState } from 'react';
import { useEffect } from 'react';

export default function ViewCourses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchCourses = async () => {
    try {
      setLoading(true);
      const response = await axiosClient.get('/course');
      setCourses(response.data.courses);
    } catch (error) {
      setLoading(true);
      toast.error('Unable to fetch Courses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8">
      <h2 className="text-3xl font-bold text-white mb-8">Available Courses</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses &&
          courses.map(course => (
            <div
              key={course._id}
              className="group min-h-[250px] w-full bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/25 hover:shadow-2xl cursor-pointer"
            >
              <h3 className="text-xl font-semibold text-white mb-3">
                {course.title}
              </h3>
              <p className="text-gray-200 mt-2 line-clamp-3">
                {course.description}
              </p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-white font-bold">₹{course.price}</span>
                <span className="text-gray-200 bg-white/20 px-3 py-1 rounded-full text-sm">
                  {course.category}
                </span>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
