import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkAuth } from './store/authSlice';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Course from './pages/Course';
import TechBEELanding from './pages/TechBee';







function App() {


  const dispatch = useDispatch()
  const {isAuthenticated, user} = useSelector(state=> state.auth)


  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (

    <Router>

      <Routes>
          <Route
            path="/"
            to = "/techbee"
            element={<TechBEELanding/>}
          ></Route>
         <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login></Login>}
        ></Route>
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/home" /> : <Register></Register>}
        ></Route>
        <Route
          path="/admin"
          element={isAuthenticated && (user.role === 'admin') ? <Admin/> : <Navigate to='/'/>}
        ></Route>
        <Route
          path="/course"
          element={isAuthenticated ? <Course/> : <Navigate to='/login' />}
        ></Route>

      </Routes>

    </Router>
  );
}

export default App;
