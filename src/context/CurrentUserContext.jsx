import { createContext, useState, useEffect } from "react";
 
const CurrentUserContext = createContext({ currentUser: null, loading: true });
 
 
export default CurrentUserContext;