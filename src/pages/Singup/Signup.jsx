import React, { useState } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import { auth, db } from '../../Firebase/Firebase';
import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';


const Signup = () => {
     const navigate=useNavigate()
  const [currentPage, setCurrentPage] = useState("Signup");
  const [signUser,setSignUsers]=useState({
    name:"",
    email:"",
    password:""
  })
  const [loadingSign,setLoadingSign]=useState(false)
  const [errorSign,setErrorSign]=useState("")
  const [checked,setChecked]=useState(false)
  const [loadingLogin,setLoadingLogin]=useState(false)
  const [errorlogin,setErrorLogin]=useState("")

  //login
  const [userlogin,setUserLogin]=useState({
    email:"",
    password:""
  })
  //notify success for login toasts
  
  const changeLoginHandler=(e)=>{
    setUserLogin({...userlogin,[e.target.name]:e.target.value})
    if(errorlogin){
      setErrorLogin("")
    }
  }
  const SubmitLogin=async(e)=>{
    e.preventDefault()
    setLoadingLogin(true)
    try {
     const result= await signInWithEmailAndPassword(auth,userlogin.email,userlogin.password)
     if(result.user){
      toast.success('welcome back!', {
  style: {
    backgroundColor: '#ff8c00', 
    color: '#ffffff'          
  },
  progressStyle: {
    background: '#ffffff'     
     }});
      setLoadingLogin(false)
      setErrorLogin("")
      
      navigate("/")
      
     }
    } catch (error) {
  setLoadingLogin(false);

  const errorCode = error.code;
  let message = "";

  switch (errorCode) {
    case 'auth/invalid-credential':
      message = "Invalid email or password. Please try again.";
      break;
    case 'auth/user-not-found':
      message = "No account found with this email.";
      break;
    case 'auth/wrong-password':
      message = "Incorrect password.";
      break;
    case 'auth/too-many-requests':
      message = "Too many failed attempts. Try again later.";
      break;
    case 'auth/invalid-email':
      message = "The email address is not valid.";
      break;
    default:
      message = "Login failed. Please try again.";
  }

 
  setErrorLogin(errorCode);

  
  toast.error(message, {
    style: {
      backgroundColor: '#ff8c00',
      color: '#ffffff'
    },
    progressStyle: {
      background: '#ffffff'
    }
  });


;
    }
    setUserLogin({
      email:"",
      password:""
    })
  }
  //change singup handler
  const changeSignHandler=(e)=>{
    setSignUsers({...signUser,[e.target.name]:e.target.value})
    if (errorSign) {
    setErrorSign("");
  }
  }
  //singup user
const singSubmit = async (e) => {
  e.preventDefault();
  setLoadingSign(true);
  setErrorSign("");

  try {
    // 1. Auth Creation
    // Make sure 'signUser' matches your useState variable name!
    const useCredential = await createUserWithEmailAndPassword(auth, signUser.email, signUser.password);
    const user = useCredential.user;

    // 2. Firestore Write
    if (user) {
      // Use 'user.uid' instead of 'auth.currentUser.uid' (safer)
      await setDoc(doc(db, 'users', user.uid), {
        email: user.email, // Use the email from the auth response
        role: "user",
        name:signUser.name
      });
    }

    toast.success('Signup Successfully!');
    setLoadingSign(false);
   
    navigate("/");

  } catch (error) {
    setLoadingSign(false);
    console.error("Full Error Object:", error);
    setErrorSign(error.message);
    
    toast.error("Error: " + error.code);
  }

  // Ensure this matches your useState setter (signUser vs signUsers)
  setSignUsers({
    name: "",
    email: "",
    password: ""
  });
};
    return (
    
        <div className="z-50 bg-orange-500/10 backdrop-blur-sm w-full h-screen flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg md:w-2/5">
        <div className="flex justify-between">
          <div>{currentPage==='Login'?"Login":"Register Now"}</div>
          
        </div>
        {/* conditionally login or signin page */}
        {currentPage === "Login" ? (
          <div className="flex flex-col w-full max-w-[400px] bg-white rounded-xl shadow-2xl p-8 relative">


  {/* Registration Form */}
  <form className="flex flex-col gap-4" onSubmit={SubmitLogin}>
    <div className="space-y-4">
      
      
      <div className="relative">
        <input
        name="email"
        onChange={changeLoginHandler}
        value={userlogin.email}
          type="email" 
          placeholder="Your Email" 
          className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-tomato focus:ring-1 focus:ring-tomato transition-all text-sm bg-gray-50"
          required
        />
      </div>

      <div className="relative">
        <input 
        name="password"
        value={userlogin.password}
        onChange={changeLoginHandler}
          type="password" 
          placeholder="Password" 
          className="w-full px-4 py-3 border border-gray-200 rounded-lg outline-none focus:border-tomato focus:ring-1 focus:ring-tomato transition-all text-sm bg-gray-50"
          required
        />
      </div>
    </div>
    <p className="font-semibold text-center text-red-500">
      {errorlogin && <p>{errorlogin}</p>}
    </p>
   <div>
    {loadingLogin && <button 
      type="button" 
      className="w-full bg-tomato text-white font-semibold py-3 rounded-lg hover:bg-[#e24b31] transition-all shadow-md active:scale-[0.98] mt-2"
    >
      Trying To LoggedIn ...
    </button>}
    {!loadingLogin && <button 
      type="submit" 
      className="w-full bg-tomato text-white font-semibold py-3 rounded-lg hover:bg-[#e24b31] transition-all shadow-md active:scale-[0.98] mt-2"
    >
      Login
    </button>}
   </div>
    {/* CTA Button */}
    

    {/* Bottom Links */}
    <div className="text-center mt-4">
      <p className="text-sm text-gray-500">
        Don't have an account?{" "}
        <button 
          type="button"
          onClick={() => setCurrentPage("Signup")}
          className="text-tomato font-bold hover:underline"
        >
         Register Here
        </button>
      </p>
    </div>
  </form>
</div>
        ) : (
           <form onSubmit={singSubmit} className="flex flex-col gap-5 py-6">
  {/* Input Group */}
  <div className="space-y-4">
    <input 
      type="text"
      name="name"
      onChange={changeSignHandler}
      value={signUser.name} 
      placeholder="Your Name" 
      className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:border-tomato transition-all text-gray-700 text-sm"
      required
    />
    <input 
      type="email"
      name="email"
       onChange={changeSignHandler}
      value={signUser.email}
      placeholder="Your Email" 
      className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:border-tomato transition-all text-gray-700 text-sm"
      required
    />
    <input 
      type="password"
      name="password"
       onChange={changeSignHandler}
      value={signUser.password}
      placeholder="Your Password" 
      className="w-full px-4 py-2.5 border border-gray-300 rounded-md outline-none focus:border-tomato transition-all text-gray-700 text-sm"
      required
    />
  </div>
 {/* Terms & Conditions */}
  <div className="flex items-start gap-2 text-sm text-gray-500">
    <input 
      type="checkbox" 
      id="terms"
      onClick={()=>setChecked(prev=>!prev)}
      className="mt-1 accent-tomato cursor-pointer" 
      required
    />
    <label htmlFor="terms" className="leading-tight cursor-pointer">
      By continuing, I agree to the <span className="text-tomato font-medium hover:underline">Terms of Service</span> and <span className="text-tomato font-medium hover:underline">Privacy Policy</span>.
    </label>
  </div>
  {/* Primary Action Button */}
 {loadingSign &&
  <button 
    type="button"
    className="w-full bg-tomato text-white font-medium py-3 rounded-md hover:bg-[#e24b31] transition-colors shadow-sm active:scale-[0.98]"
  >
    Creating Account ...
  </button>
 }
  {!loadingSign && checked &&
  <button 
    type="submit" 
    className="w-full bg-tomato text-white font-medium py-3 rounded-md hover:bg-[#e24b31] transition-colors shadow-sm active:scale-[0.98]"
  >
    Create Account
  </button>
 }

 
<p className="text-center font-semibold text-red-600">{errorSign && <p>{errorSign}</p>}</p>
  {/* Footer Switcher */}
  <div className="pt-2 border-t border-gray-100 text-center">
    <p className="text-sm text-gray-600">
      Already have an account?{" "}
      <button 
        type="button"
        onClick={() => setCurrentPage("Login")}
        className="text-tomato font-semibold hover:underline"
      >
        Login Here
      </button>
      
    </p>
  </div>
</form>
        )}
      </div>
    </div>
    );
};

export default Signup;