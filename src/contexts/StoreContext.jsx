import { createContext, useContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { onAuthStateChanged, signOut } from "firebase/auth"; // Added signOut import
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";
import { toast } from "react-toastify";

export const StoreContext = createContext();

export const useAuth = () => {
  return useContext(StoreContext);
};

export const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState("");

  const handleAuthState = async (activeUser) => {
    setIsLoading(true); // Start loading

    try {
      if (activeUser) {
        const docRef = await getDoc(doc(db, 'users', activeUser.uid));

        if (docRef.exists()) {
          const userData = docRef.data();

          if (userData.isActive) {
            setCurrentUser(activeUser);
            setRole(userData.role || "user");
            setLogin(true);
          } else {
            // User disabled: Log them out of Firebase
            await signOut(auth);
            setCurrentUser(null);
            setLogin(false);
            setRole("");
          }
        } else {
          // No Firestore Doc: Log them out of Firebase
          await signOut(auth);
          setCurrentUser(null);
          setLogin(false);
          setRole("");
          // Use toast or a less intrusive way than alert if possible
          toast.error('No data available for login. Please contact admin.', {
    style: {
      backgroundColor: '#ff8c00', // Matching your orange theme
      color: '#ffffff'
    },
    progressStyle: {
      background: '#ffffff'
    }
  });
        }
      } else {
        // No user logged in at all
        setCurrentUser(null);
        setLogin(false);
        setRole("");
      }
    } catch (error) {
      console.error("Auth Error:", error);
    } finally {
      setIsLoading(false); // THIS MUST RUN NO MATTER WHAT
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthState);
    return () => unsubscribe();
  }, []);

  // ... rest of your cart functions

  const contextValue = {
    isLogin,
    isLoading,
    role,
    food_list,
    
    currentUser,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};