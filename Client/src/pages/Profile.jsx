// import React, { useEffect, useState } from 'react';
// // import { useSelector } from 'react-redux';
// import Nav from '../components/Nav';
// import axiosClient from '../API/axiosClient';
// import { toast } from 'react-hot-toast';
// import { NavLink } from 'react-router';

// function Profile() {

//    const [userInfo, setUserInfo] = useState(null);
//    const [loading, setLoading] = useState(false);
//    // const { loading } = useSelector(state => state.auth);

//    useEffect(() => {
//       fetchUserInfo();
//    }, []);

//    const fetchUserInfo = async () => {
//       try {
//          setLoading(true)
//          const response = await axiosClient.get('/auth/user');
//          // console.log(response.data)
//          setUserInfo(response.data);
//       // eslint-disable-next-line no-unused-vars
//       } catch (error) {
//          toast.error('Failed to fetch user information');
//       } finally {
//          setLoading(false);
//       }
//    };

//    if (loading) {
//       return (
//          <div className="min-h-screen flex items-center justify-center">
//          <span className="loading loading-spinner loading-lg"></span>
//          </div>
//       );
//    }

//    return (
//       <>
//          <Nav />
//          <div className="min-h-screen bg-base-200 py-8 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 overflow-hidden relative">
//          <div className="container mx-auto px-4">
//             {/* User Info Card */}
//             <div className="card shadow-xl max-w-2xl mx-auto group bg-white/15 backdrop-blur-xl rounded-3xl p-6 border border-white/20 transform transition-all duration-500 hover:scale-105 hover:bg-white/25 hover:shadow-2xl cursor-pointer">
//                <div className="card-body">
//                <h2 className="card-title text-2xl mb-6">Profile Information</h2>

//                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//                   <div className="space-y-4">
//                      <div>
//                      <label className="text-sm opacity-70">Name</label>
//                      <p className="text-lg font-medium">{userInfo?.firstName}</p>
//                      </div>

//                      <div>
//                      <label className="text-sm opacity-70">Email</label>
//                      <p className="text-lg font-medium">{userInfo?.emailId}</p>
//                      </div>
//                   </div>

//                   <div className="space-y-4">
//                      <div>
//                      <label className="text-sm opacity-70">Contact</label>
//                      <p className="text-lg font-medium">{userInfo?.contact}</p>
//                      </div>

//                      <div>
//                      <label className="text-sm opacity-70">Role</label>
//                      <p className="text-lg font-medium capitalize">
//                         {userInfo?.role}
//                      </p>
//                      </div>
//                   </div>
//                </div>

//                {/* Admin Controls */}
//                {userInfo?.role === 'admin' && (
//                   <div className="divider my-6">Admin Controls</div>
//                )}

//                {userInfo?.role === 'admin' && (
//                   <div className="flex flex-wrap gap-4 mt-4">
//                      <NavLink to="/admin">
//                         <button className="btn btn-primary">Manage Courses</button>
//                      </NavLink>
//                      <NavLink to='/admin'>
//                         <button className='btn btn-secondary'>Create Course</button>
//                      </NavLink>
//                   </div>
//                )}
//                </div>
//             </div>
//          </div>
//          </div>
//       </>
//    );
// }

// export default Profile;



import React, { useState } from 'react';
import { Camera, Mail, Phone, MapPin, Calendar, BookOpen, Award, Briefcase, Edit2, Save, X, GraduationCap, Star, Users, Upload, Plus, Trash2, Check } from 'lucide-react';
import { useSelector } from 'react-redux';



export default function UserProfileSetup() {

  const [step, setStep] = useState('view');
  const [currentStep, setCurrentStep] = useState(1);
  const {user} = useSelector(state => state.auth)
  

  const [profileData, setProfileData] = useState({
    name: user.firstName,
    title: '',
    email: user.emailId,
    phone: user.contact || null,
    location: '',
    bio: '',
    dateOfBirth: '',
    gender: '',
    joinDate: new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
    photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=400&h=400&fit=crop',
    userType: user.role,
    education: [],
    courses: [],
    interests: [],
    achievements: [],
    skills: [],
    experience: [],
    stats: {
      coursesEnrolled: 2,
      coursesCompleted: 1,
      totalHours: 67,
      Quize: 2
    }
  });



  const [tempEducation, setTempEducation] = useState({ degree: '', school: '', year: '' });
  const [tempExperience, setTempExperience] = useState({ role: '', company: '', period: '' });
  const [tempSkill, setTempSkill] = useState('');

  const availableInterests = [
    'Web Development', 'Mobile Development', 'Data Science', 'AI/ML',
    'Cloud Computing', 'Cybersecurity', 'UI/UX Design', 'Database',
    'DevOps', 'Blockchain', 'Game Development', 'Digital Marketing'
  ];

  const handleInputChange = (field, value) => {
    setProfileData(prev => ({ ...prev, [field]: value }));
  };

  const handlePhotoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileData(prev => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const addEducation = () => {
    if (tempEducation.degree && tempEducation.school) {
      setProfileData(prev => ({
        ...prev,
        education: [...prev.education, { ...tempEducation }]
      }));
      setTempEducation({ degree: '', school: '', year: '' });
    }
  };

  const removeEducation = (index) => {
    setProfileData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
  };

  const addExperience = () => {
    if (tempExperience.role && tempExperience.company) {
      setProfileData(prev => ({
        ...prev,
        experience: [...prev.experience, { ...tempExperience }]
      }));
      setTempExperience({ role: '', company: '', period: '' });
    }
  };

  const removeExperience = (index) => {
    setProfileData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }));
  };

  const addSkill = () => {
    if (tempSkill && !profileData.skills.includes(tempSkill)) {
      setProfileData(prev => ({
        ...prev,
        skills: [...prev.skills, tempSkill]
      }));
      setTempSkill('');
    }
  };

  const removeSkill = (skill) => {
    setProfileData(prev => ({
      ...prev,
      skills: prev.skills.filter(s => s !== skill)
    }));
  };

  const toggleInterest = (interest) => {
    setProfileData(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const completeSetup = () => {
    setStep('view');
    setCurrentStep(1);
  };

  const startSetup = () => {
    setStep('setup');
    setCurrentStep(1);
  };

  const nextStep = () => {
    if (currentStep < 4) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  if (step === 'setup') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="mb-8">
            <div className="flex items-center justify-between mb-2">
              {[1, 2, 3, 4].map((s) => (
                <div key={s} className="flex items-center flex-1">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                    s <= currentStep ? 'bg-indigo-600 text-white' : 'bg-gray-300 text-gray-600'
                  }`}>
                    {s < currentStep ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 4 && (
                    <div className={`flex-1 h-1 mx-2 ${
                      s < currentStep ? 'bg-indigo-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              ))}
            </div>
            <div className="flex justify-between text-xs text-gray-600">
              <span>Basic Info</span>
              <span>Education</span>
              <span>Interests</span>
              <span>Experience</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Basic Information</h2>
                
                <div className="flex flex-col items-center mb-6">
                  <div className="relative w-32 h-32 mb-4">
                    <img
                      src={profileData.photo}
                      alt="Profile"
                      className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                    />
                    <label className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full cursor-pointer hover:bg-indigo-700 transition">
                      <Camera className="w-5 h-5 text-white" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoUpload}
                        className="hidden"
                      />
                    </label>
                  </div>
                  <p className="text-sm text-gray-600">Upload your profile photo</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      className="text-black w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Professional Title</label>
                    <input
                      type="text"
                      value={profileData.title}
                      onChange={(e) => handleInputChange('title', e.target.value)}
                      className="w-full px-4 py-2 border border-gray-300 text-black rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., Student, Developer, Teacher"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="+1 (555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => handleInputChange('location', e.target.value)}
                      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="City, State/Country"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      value={profileData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                      className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">I am a:</label>
                    <div className="flex space-x-4">
                      <label className="flex items-center text-black">
                        <input
                          type="radio"
                          value="student"
                          checked={profileData.userType === 'student'}
                          onChange={(e) => handleInputChange('userType', e.target.value)}
                          className="mr-2"
                        />
                        Student/Learner
                      </label>
                      <label className="flex items-center text-black">
                        <input
                          type="radio"
                          value="instructor"
                          checked={profileData.userType === 'instructor'}
                          onChange={(e) => handleInputChange('userType', e.target.value)}
                          className="mr-2"
                        />
                        Instructor/Teacher
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows="4"
                    className="w-full px-4 py-2 border text-black border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Tell us about yourself, your goals, and what you want to learn..."
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Education Background</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={tempEducation.degree}
                      onChange={(e) => setTempEducation({...tempEducation, degree: e.target.value})}
                      className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Degree/Certification"
                    />
                    <input
                      type="text"
                      value={tempEducation.school}
                      onChange={(e) => setTempEducation({...tempEducation, school: e.target.value})}
                      className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="School/Institution"
                    />
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={tempEducation.year}
                        onChange={(e) => setTempEducation({...tempEducation, year: e.target.value})}
                        className="text-black flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Year"
                      />
                      <button
                        onClick={addEducation}
                        className="text-black px-4 py-2 bg-indigo-60 rounded-lg hover:bg-indigo-700 transition"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {profileData.education.length > 0 && (
                    <div className="space-y-2 mt-4">
                      {profileData.education.map((edu, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-gray-900">{edu.degree}</p>
                            <p className="text-sm text-gray-600">{edu.school} • {edu.year}</p>
                          </div>
                          <button
                            onClick={() => removeEducation(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
                  <div className="flex space-x-2 mb-3">
                    <input
                      type="text"
                      value={tempSkill}
                      onChange={(e) => setTempSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                      className="text-black flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="e.g., JavaScript, Communication"
                    />
                    <button
                      onClick={addSkill}
                      className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                    >
                      <Plus className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {profileData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium flex items-center space-x-2"
                      >
                        <span>{skill}</span>
                        <button
                          onClick={() => removeSkill(skill)}
                          className="hover:text-indigo-900"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Learning Interests</h2>
                <p className="text-gray-600 mb-4">Select topics you're interested in learning:</p>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {availableInterests.map((interest) => (
                    <button
                      key={interest}
                      onClick={() => toggleInterest(interest)}
                      className={`p-3 rounded-lg border-2 transition ${
                        profileData.interests.includes(interest)
                          ? 'text-black border-indigo-600 bg-indigo-5'
                          : 'text-black border-gray-300 hover:border-gray-400'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{interest}</span>
                        {profileData.interests.includes(interest) && (
                          <Check className="w-4 h-4" />
                        )}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Work Experience (Optional)</h2>
                
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <input
                      type="text"
                      value={tempExperience.role}
                      onChange={(e) => setTempExperience({...tempExperience, role: e.target.value})}
                      className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Role/Position"
                    />
                    <input
                      type="text"
                      value={tempExperience.company}
                      onChange={(e) => setTempExperience({...tempExperience, company: e.target.value})}
                      className="text-black px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                      placeholder="Company/Organization"
                    />
                    <div className="flex space-x-2">
                      <input
                        type="text"
                        value={tempExperience.period}
                        onChange={(e) => setTempExperience({...tempExperience, period: e.target.value})}
                        className="text-black flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        placeholder="Period"
                      />
                      <button
                        onClick={addExperience}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
                      >
                        <Plus className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  {profileData.experience.length > 0 && (
                    <div className="space-y-2 mt-4">
                      {profileData.experience.map((exp, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div>
                            <p className="font-semibold text-gray-900">{exp.role}</p>
                            <p className="text-sm text-gray-600">{exp.company} • {exp.period}</p>
                          </div>
                          <button
                            onClick={() => removeExperience(index)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mt-6">
                  <p className="text-sm text-indigo-800">
                    🎉 You're almost done! Click "Complete Setup" to finish creating your profile.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`px-6 py-2 rounded-lg font-medium transition ${
                  currentStep === 1
                    ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Previous
              </button>
              {currentStep < 4 ? (
                <button
                  onClick={nextStep}
                  className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition font-medium"
                >
                  Next Step
                </button>
              ) : (
                <button
                  onClick={completeSetup}
                  className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
                >
                  Complete Setup
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-8 h-8 text-indigo-600" />
              <h1 className="text-2xl font-bold text-gray-900">EduPlatform</h1>
            </div>
            <button
              onClick={startSetup}
              className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
            >
              <Edit2 className="w-4 h-4" />
              <span>Edit Profile</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-6">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <img
                  src={profileData.photo}
                  alt="Profile"
                  className="w-32 h-32 rounded-full object-cover border-4 border-indigo-100"
                />
              </div>

              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-1">
                  {profileData.name || 'Your Name'}
                </h2>
                <p className="text-gray-600">{profileData.title || 'Add your title'}</p>
                {/* <span className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                  profileData.userType === 'instructor' 
                    ? 'bg-purple-100 text-purple-700' 
                    : 'bg-blue-100 text-blue-700'
                }`}>
                  {profileData.userType === 'instructor' ? 'Instructor' : 'Student'}
                </span> */}
              </div>

              <div className="space-y-3 mb-6">
                {profileData.email && (
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Mail className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm">{profileData.email}</span>
                  </div>
                )}
                {profileData.phone && (
                  <div className="flex items-center space-x-3 text-gray-700">
                    <Phone className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm">{profileData.phone}</span>
                  </div>
                )}
                {profileData.location && (
                  <div className="flex items-center space-x-3 text-gray-700">
                    <MapPin className="w-4 h-4 text-indigo-600" />
                    <span className="text-sm">{profileData.location}</span>
                  </div>
                )}
                <div className="flex items-center space-x-3 text-gray-700">
                  <Calendar className="w-4 h-4 text-indigo-600" />
                  <span className="text-sm">Joined {profileData.joinDate}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-6 border-t border-gray-200">
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{profileData.stats.coursesEnrolled}</div>
                  <div className="text-xs text-gray-600">Courses</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{profileData.stats.coursesCompleted}</div>
                  <div className="text-xs text-gray-600">Completed</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{profileData.stats.totalHours}</div>
                  <div className="text-xs text-gray-600">Hours</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-indigo-600">{profileData.stats.Quize}</div>
                  <div className="text-xs text-gray-600">Quize</div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-6">
            {profileData.bio ? (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About</h3>
                <p className="text-gray-700 leading-relaxed">{profileData.bio}</p>
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-6 text-center">
                <p className="text-gray-500">Click "Edit Profile" to complete your profile setup!</p>
              </div>
            )}

            {profileData.interests.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Learning Interests</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.interests.map((interest, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-full text-sm font-medium"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profileData.skills.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Skills</h3>
                <div className="flex flex-wrap gap-2">
                  {profileData.skills.map((skill, index) => (
                    <span
                      key={index}
                      className="px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {profileData.education.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />
                  Education
                </h3>
                <div className="space-y-4">
                  {profileData.education.map((edu, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-5 h-5 text-indigo-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{edu.degree}</h4>
                        <p className="text-gray-600 text-sm">{edu.school}</p>
                        <p className="text-gray-500 text-sm">{edu.year}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {profileData.experience.length > 0 && (
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Briefcase className="w-5 h-5 mr-2 text-indigo-600" />
                  Experience
                </h3>
                <div className="space-y-4">
                  {profileData.experience.map((exp, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                        <Briefcase className="w-5 h-5 text-purple-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">{exp.role}</h4>
                        <p className="text-gray-600 text-sm">{exp.company}</p>
                        <p className="text-gray-500 text-sm">{exp.period}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}