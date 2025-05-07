import { createContext, useState, useEffect } from "react";
 
const CurrentUserContext = createContext({ currentUser: null, loading: true });
 

// export function CurrentUserProvider({ children }) {

//   const [currentUser, setCurrentUser] = useState(null);
//   const [loading, setLoading] = useState(true); // Loading state
 
//   useEffect(() => {
//     fetch("/api/currentUser")
//       .then((res) => res.json())
//       .then((data) => {
//         setCurrentUser(data); // Set current user when data is fetched
//         setLoading(false); // Set loading to false after fetching data
//       })
//       .catch((error) => {
//         console.error("Error fetching current user:", error);
//         setLoading(false); // Ensure loading stops in case of error
//       });
//   }, []);
 
//   return (
//     <CurrentUserContext.Provider value={{ currentUser, loading }}>
//       {children}
//     </CurrentUserContext.Provider>
//   );
// }
 
export default CurrentUserContext;