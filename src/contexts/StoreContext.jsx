import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";
import { toast } from "react-toastify";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState(null);

  const resetAuthStates = () => {
    setCurrentUser(null);
    setLogin(false);
    setRole(null);
  };

  const handleAuthState = async (activeUser) => {
    try {
   

      if (!activeUser) {
        resetAuthStates();
        setIsLoading(false);
        return;
      }

      const snap = await getDoc(doc(db, "users", activeUser.uid));

      if (!snap.exists()) {
        await signOut(auth);
        resetAuthStates();
        setIsLoading(false);
        toast.error("No profile found for this account.");
        return;
      }

      const userData = snap.data();

      if (!userData.isActive) {
        await signOut(auth);
        resetAuthStates();
        setIsLoading(false);
        // toast.error("Account deactivated. Contact admin.");
        return;
      }

      
      setCurrentUser(activeUser);
      setRole(userData.role || "user");
      setLogin(true);
      setIsLoading(false);

    } catch (error) {
      console.error("Auth Sync Error:", error);
      resetAuthStates();
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, handleAuthState);
    return () => unsubscribe();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        isLogin,
        isLoading,
        role,
        currentUser,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useAuth = () => useContext(StoreContext);