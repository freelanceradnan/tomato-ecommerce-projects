import React, { useContext, useEffect, useState } from 'react';
import { StoreContext, useAuth } from '../../contexts/StoreContext';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../../Firebase/Firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { toast } from 'react-toastify';
const MyProfile = () => {
    const {currentUser}=useContext(StoreContext)
    const [editMode,setEditMode]=useState(false)
    const [originalData,setOriginalData]=useState(null)
    const [userData,setUserData]=useState({
      name:"",
    
      gender: [],
      date: "",
      mobile:""
    })
const changeHandler = (e) => {
        const { name, value } = e.target;
        setUserData((prev) => ({
            ...prev,
            [name]: name === 'number' ? Number(value) : (name === 'gender' ? [value] : value)
        }));
    };

  useEffect(()=>{
const intializer=async(user)=>{
try {
  const docRef=doc(db,'users',user.uid)
  const datasnap=await getDoc(docRef)
  if(datasnap.exists()){
    setUserData(datasnap.data())
    setOriginalData(datasnap.data())
  }
  else{
    console.log('no data availble on store')
  }
} catch (error) {
  console.log('failed to fetch data')
}
}
return ()=>onAuthStateChanged(auth,intializer)
},[])
const handlerCancel=()=>{
setUserData(originalData)
setEditMode(false)
}
//update data
const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const docRef = doc(db, 'users', auth.currentUser.uid);
            await updateDoc(docRef, {
                ...userData 
            });
           toast.success('Update Success!', {
             style: {
               backgroundColor: '#ff8c00', 
               color: '#ffffff'          
             },
             progressStyle: {
               background: '#ffffff'     
                }});
            setEditMode(false); 
        } catch (error) {
            alert("Failed to update: " + error.message);
        }
    };
    // console.log(editMode)
    return (
        <div className='w-full max-w-full md:max-w-4xl mx-auto bg-[#F9F9F9] md:p-6 min-h-screen' > 
        <h2 className='text-xl font-semibold md:text-xl'>Welcome {currentUser?.email.split('@')[0]}!</h2>
        <form action="" className=' mt-2' onSubmit={submitHandler}>
        <div className='flex justify-between'>
        <div className=''>
        <h2 className='text-xl font-bold uppercase'>Account Information</h2>
        <p className='text-sm font-[100]'>This section contains your address information</p>
        </div>
       
        </div>
       <div className='flex justify-between items-center bg-[#FFFFFF] border-b-1 border-[#F9F9F9]'>
         <div className='font-bold py-4 uppercase'>| Personal Information</div>
         {!editMode&& <button type="button" className='bg-black text-white h-8 px-4' onClick={()=>setEditMode(true)}>EDIT</button>}
       </div>
        {/* //input fields */}
        <div className='grid md:grid-cols-2 mt-4 gap-2 bg-[#FFFFFF]'>
       <div className=''>
        <div>
             <label htmlFor="name" className='text-[#807f83]'>Name*</label>
        </div>
        {editMode? <input type="text" name="name" id="name" onChange={changeHandler} value={userData?.name} className='w-full border border-gray-300 p-2 outline-none' />:<h2>{userData?.name}</h2>}
       </div>
        <div>
         <div> <label htmlFor="email" className='text-[#807f83]'>Email*</label></div>
         
         <div>{userData?.email||<p>No Email found</p>}<h2 className='text-gray-400'>[Read Only]</h2></div>
         
        </div>
        <div>
         <div><label htmlFor="number" className='text-[#807f83]'>Mobile No*</label></div>
        {editMode?  <input type="number" name="number" id="number" onChange={changeHandler} className='w-full border border-gray-300 p-2 outline-none' value={userData?.number}/>:<h2>{userData?.number||<p>No Number found</p>}</h2>}
        </div>
        <div>
        <div>
             <label htmlFor="gender" className='text-[#807f83]'>Gender*</label>
        </div>
{editMode? 
<select name="gender" required className='w-full border border-gray-300 p-2 outline-none' value={userData?.gender?.[0] || ""} onChange={changeHandler}>
  <option value="" selected>Select Gender</option> 
  <option value="male">Male</option>
  <option value="female">Female</option>
  <option value="other">Other</option>
</select>
:
<h2>{userData?.gender?.[0] || "No Gender Found!"}</h2>
}
        </div>
        <div>
           <div>
              <label htmlFor="" className='text-[#807f83]'>Date of Birth</label>
           </div>
          {editMode?
 <DatePicker 
                                selected={userData?.date ? new Date(userData.date.split('/').reverse().join('-')) : null} 
                                onChange={(date) => {
                                    if(date){
                                        const formattedDate = date.toLocaleDateString('en-GB');
                                        setUserData(prev => ({ ...prev, date: formattedDate }));
                                    }
                                }}
                                dateFormat="dd/MM/yyyy"
                                wrapperClassName="w-50 md:w-full"
                                className="w-full border border-gray-300 p-2 outline-none"
                                showMonthDropdown
                                showYearDropdown
                                dropdownMode="select"
                                placeholderText="DD/MM/YYYY"
                            />
          :
  <h2>{userData?.date || "No Birthday Found!"}</h2>
          }
        </div>
         
        </div>
        <div className='mt-4 flex flex-row gap-2 bg-[#FFFFFF]'>
        {editMode && <>
          <button className='border uppercase text-white bg-black p-2 hover:bg-orange-400 font-semibold w-30 ' type='submit'>Save</button>
         <button type="button" className='border uppercase text-black bg-white p-2 hover:bg-black font-semibold w-30 hover:text-white' onClick={handlerCancel}>Cancel</button>
        </>}
        </div>
        </form>
        </div>
    );
};

export default MyProfile;