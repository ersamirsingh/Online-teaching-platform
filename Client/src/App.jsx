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
import ViewCourses from './Admin/Course/ViewCoursesAdmin';
import Quiz from './pages/QuizPage';
import Profile from './pages/Profile';
import Subscription from './pages/Subscription';
import { useParams } from 'react-router-dom';
import Lesson from './pages/Lesson';






function App() {

  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const {courseId} = useParams();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TechBEELanding />}></Route>
        <Route
          path="/home"
          element={isAuthenticated ? <Home /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/login"
          element={isAuthenticated ? <Navigate to="/" /> : <Login />}
        ></Route>
        <Route
          path="/signup"
          element={isAuthenticated ? <Navigate to="/home" /> : <Register />}
        ></Route>
        <Route
          path="/admin"
          element={
            isAuthenticated && user.role === 'admin' ? (
              <Admin />
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
        <Route
          path="/course"
          element={isAuthenticated ? <Course /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/quiz"
          element={isAuthenticated ? <Quiz /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/subscription"
          element={
            isAuthenticated ? <Subscription /> : <Navigate to="/login" />
          }
        ></Route>
        <Route
          path="/profile"
          element={isAuthenticated ? <Profile /> : <Navigate to="/login" />}
        ></Route>
        <Route
          path="/viewcourses"
          element={
            !isAuthenticated ? ( <Navigate to="/login" />) 
            : isAuthenticated && user.role === 'admin' ? (
              <ViewCourses />
            ) : (
              <Navigate to="/" />
            )
          }
        ></Route>
        <Route
          path={`/lesson/:courseId`}
          element={isAuthenticated ? <Lesson/> : <Navigate to="/login" />}
        ></Route>
      </Routes>
    </Router>
  );
}

export default App;
