import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDoc, doc } from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";

export const StoreContext = createContext();

export const StoreContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLogin, setLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [orderDetails,setOrderDetails]=useState({})
  const [orderId,setOrderId]=useState("")
  const [doneCoupon,setDoneCoupon]=useState(false)
  const resetAuth = () => {
    setCurrentUser(null);
    setLogin(false);
    setRole(null);
  };

  useEffect(() => {
    setIsLoading(true);

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (!user) {
          resetAuth();
          setIsLoading(false);
          return;
        }

        const snap = await getDoc(doc(db, "users", user.uid));

        if (!snap.exists()) {
          await signOut(auth);
          resetAuth();
          setIsLoading(false);
          return;
        }

        const data = snap.data();

        setCurrentUser(user);
        setRole(data.role || "user");
        setLogin(true);

        setIsLoading(false);

      } catch (error) {
        console.log(error);
        resetAuth();
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, []); 

  return (
    <StoreContext.Provider
      value={{
        currentUser,
        isLogin,
        isLoading,
        role,
        orderDetails,
        setOrderDetails,
        orderId,setOrderId,
        doneCoupon,setDoneCoupon
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export const useAuth = () => useContext(StoreContext);