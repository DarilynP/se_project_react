import { Navigate } from "react-router-dom";

function  ProtectedRoute({ isLoggedIn, children })  {
  if (!isLoggedIn) return null
    console.log("redirecting to logn..");
    // If user isn't logged in, redirect them to the login page
    return  isLoggedIn ? children : <Navigate to="/" />
    
  

}

export default ProtectedRoute;
