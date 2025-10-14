import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/authSlice";
import { Menu, X } from "lucide-react";

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user, loading } = useSelector((state) => state.auth);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutUser());
    navigate("/login");
    setMobileMenuOpen(false);
  };

  return (
    <header className="relative z-50 bg-white/10 backdrop-blur-lg border-b border-white/20">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
    
        <div
          className="flex items-center space-x-3 group cursor-pointer"
          onClick={() => navigate("/")}
        >
          <div className="relative w-14 h-14 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl transform transition-transform group-hover:scale-110 group-hover:rotate-12">
            <span className="text-3xl">🐝</span>
            <div className="absolute inset-0 bg-yellow-400/50 rounded-full animate-ping opacity-75" />
          </div>
          <span className="text-3xl font-bold text-white tracking-tight">
            TechBEE
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-4">
          {!isAuthenticated ? (
            <>
              <NavLink
                className="px-6 py-2.5 text-white font-semibold border-2 border-white rounded-full hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                to="/login"
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-pink-500/50"
              >
                Register
              </NavLink>
            </>
          ) : (
            <>
              <NavLink className="btn btn-ghost rounded-2xl text-white" to="/">
                Home
              </NavLink>
              <NavLink className="btn btn-ghost rounded-2xl text-white" to="/course">
                Course
              </NavLink>
              <NavLink className="btn btn-ghost rounded-2xl text-white" to="/quiz">
                Quiz
              </NavLink>
              <NavLink
                className="btn btn-ghost rounded-2xl text-white"
                to="/subscription"
              >
                Subscription
              </NavLink>

              {/* User Dropdown */}
              <div className="relative ml-4 dropdown dropdown-end">
                <div
                  tabIndex={0}
                  className="text-red-500 text-lg font-semibold btn rounded-2xl"
                >
                  Hi, {user?.firstName || "User"} 👋
                </div>
                <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                  <li>
                    <button onClick={handleLogout} disabled={loading}>
                      Logout
                    </button>
                  </li>
                  {user?.role === "admin" && (
                    <li>
                      <NavLink to="/admin">Admin</NavLink>
                    </li>
                  )}
                  {
                    <li>
                      <NavLink to="/profile">Profile</NavLink>
                    </li>
                  }
                </ul>
              </div>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-white focus:outline-none"
          >
            {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/10 backdrop-blur-lg border-t border-white/20 px-6 py-4">
          {!isAuthenticated ? (
            <div className="flex flex-col space-y-3">
              <NavLink
                className="px-6 py-2.5 text-white font-semibold border-2 border-white rounded-full text-center hover:bg-white hover:text-purple-600 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                to="/login"
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </NavLink>

              <NavLink
                to="/signup"
                className="px-6 py-2.5 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-full text-center hover:from-pink-600 hover:to-rose-600 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-pink-500/50"
                onClick={() => setMobileMenuOpen(false)}
              >
                Register
              </NavLink>
            </div>
          ) : (
            <div className="flex flex-col space-y-2">
              <NavLink
                className="btn btn-ghost rounded-2xl text-white text-center"
                to="/"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                className="btn btn-ghost rounded-2xl text-white text-center"
                to="/course"
                onClick={() => setMobileMenuOpen(false)}
              >
                Course
              </NavLink>
              <NavLink
                className="btn btn-ghost rounded-2xl text-white text-center"
                to="/quiz"
                onClick={() => setMobileMenuOpen(false)}
              >
                Quiz
              </NavLink>
              <NavLink
                className="btn btn-ghost rounded-2xl text-white text-center"
                to="/subscription"
                onClick={() => setMobileMenuOpen(false)}
              >
                Subscription
              </NavLink>

              <div className="dropdown dropdown-end">
                <div
                  tabIndex={0}
                  className="text-red-500 text-lg font-semibold btn rounded-2xl w-full"
                >
                  Hi, {user?.firstName || "User"} 👋
                </div>
                <ul className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-full">
                  <li>
                    <button onClick={handleLogout} disabled={loading}>
                      Logout
                    </button>
                  </li>
                  {user?.role === "admin" && (
                    <li>
                      <NavLink to="/admin" onClick={() => setMobileMenuOpen(false)}>
                        Admin
                      </NavLink>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
};

export default Header;
