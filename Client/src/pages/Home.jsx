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
         <p>I'm home Page</p>
      </>
   )
}

export default Home