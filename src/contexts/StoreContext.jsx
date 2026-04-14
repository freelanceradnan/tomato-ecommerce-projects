import { createContext, useContext, useEffect, useState } from "react";
import { food_list } from "../assets/assets";
import { onAuthStateChanged } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { getDoc,doc} from "firebase/firestore";
import { auth, db } from "../Firebase/Firebase";

export const useAuth=()=>{
   return useContext(StoreContext)
}
export const StoreContext=createContext()
export const StoreContextProvider=({children})=>{
    const[cartItems,setCartItems]=useState({})
    const [currentUser,setCurrentUser]=useState(null)
    const [isLogin,setLogin]=useState(false)
    const [isLoading,setIsLoading]=useState(true)
    const [role,setRole]=useState("")

    //user persists
    const initializeApp=async(activeUser)=>{
      setIsLoading(true);
      if(activeUser){
         setCurrentUser({...activeUser})
         setLogin(true)
        
         try {
         const docRef=await getDoc(doc(db,'users',activeUser.uid))
         
         if(docRef.exists()){
            const role=docRef.data().role
         setRole(role)
         setIsLoading(false)
         }
         else{
            setRole("user")
         }

      } catch (error) {
         setIsLoading(false)
      }
      }
      else{
         setCurrentUser(null)
         setLogin(false)
         setRole("")
      }
      setIsLoading(false);
    }
    useEffect(()=>{
     const unsubscribe=onAuthStateChanged(auth,initializeApp)
     return unsubscribe
    },[])






    const addToCart=(itemId)=>{
     if(!cartItems[itemId]){
        setCartItems((prev)=>({...prev,[itemId]:1}))
     }
     else{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
     }
    }
    const removeCart=(itemId)=>{
     setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1}))
    }
   
    const contextValue={
       isLogin,
       isLoading,
       role,
        food_list,
        cartItems,
        setCartItems,addToCart,
        removeCart,
        currentUser
    }
return(
   <StoreContext.Provider value={contextValue}>
    {children}
   </StoreContext.Provider> 
)
}
