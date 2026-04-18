import React, { useContext, useEffect, useState } from 'react';
import DatePicker from 'react-datepicker';
import { allArea } from '../../apidata/Allarea';
import { StoreContext } from '../../contexts/StoreContext';
import { onAuthStateChanged, reload } from 'firebase/auth';
import { auth, db } from '../../Firebase/Firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';

const Address = () => {
    const [editMode,setEditMode]=useState(false)
    const [selectedDist,setSelectDist]=useState("")
    const [selectedArea,setselectedArea]=useState("")
    const [originalData,setOriginalData]=useState(null)
    
   const handleDistrictChange = (e) => {
  const distName = e.target.value;
  setSelectDist(distName);
  

  setUserData((prev) => ({
    ...prev,
    dist: distName,
    area: "" 
  }));
};


const handleAreaChange = (e) => {
  const areaName = e.target.value;

  setUserData((prev) => ({
    ...prev,
    area: areaName
  }));
};
    const [userData,setUserData]=useState({
      address1:"",
      address2:"",
      post:"",
      dist:"",
      area:""
      })
     
    
    const {currentUser}=useContext(StoreContext)
    const changeHandler = (e) => {
  const { name, value } = e.target;

  setUserData((prev) => ({
    ...prev,
    [name]: name === 'post' ? Number(value) : value, 
  }));
}
  const district=Object.keys(allArea)
   
  

    const submitHandler=async(e)=>{
      e.preventDefault()
     try {
      const docSnap=doc(db,'users',auth.currentUser.uid)
      
      const update=await updateDoc(docSnap,{
         ...userData
      })
      setEditMode(false)
      
      toast.success('Update Success!', {
                   style: {
                     backgroundColor: '#ff8c00', 
                     color: '#ffffff'          
                   },})
     } catch (error) {
      setEditMode(false)
      console.log(error.massege)
     }
    }
useEffect(() => {
 
  const unsubscribe = onAuthStateChanged(auth, async (user) => {
    if (user) {
      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserData(data);
          setOriginalData(data);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
        alert('Failed to fetch data');
      }
    } else {
      
      setUserData(null);
    }
  });

  // This cleans up the listener when the component unmounts
  return () => unsubscribe();
}, []);
const handlerCancel=()=>{
  setUserData(originalData)
  setEditMode(false)
  // setSelectDist(originalData?.dist || "");
  // setselectedArea(originalData?.area || "");
}
    
    return (
         <div className='w-full max-w-full md:max-w-4xl mx-auto bg-[#F9F9F9] md:p-6 min-h-screen' > 
               
                <form action="" className=' mt-2' onSubmit={submitHandler}>
                <div className='flex justify-between'>
                <div className=''>
                <h2 className='text-xl font-bold uppercase'>Add new address</h2>
                <p className='text-sm font-[100]'>Fill up your contact & address details</p>
                </div>
               
                </div>
               <div className='flex justify-between items-center bg-[#FFFFFF] border-b-1 border-[#F9F9F9]'>
                 <div className='font-bold py-4 uppercase'>| Address</div>
                 {!editMode&& <button type="button" className='bg-black text-white h-8 px-4' onClick={()=>setEditMode(true)}>EDIT</button>}
               </div>
                {/* //input fields */}
                
               <div className=''>
               
                <label htmlFor="name" className='text-[#807f83]'>Address Line 2 *</label>
                {editMode? <input type="text" name="address1" id="name" onChange={changeHandler} value={userData?.address1} className='w-full border border-gray-300 p-2 outline-none'/>:<h2>{userData?.address1||<p>No data found</p>}</h2>}
               </div>
               <div className=''>
               
                     <label htmlFor="name" className='text-[#807f83]'>Address Line 2 *</label>
                {editMode? <input type="text" name="address2" id="name" onChange={changeHandler} value={userData?.address2} className='w-full border border-gray-300 p-2 outline-none'/>:<h2>{userData?.address2||<p>No data found</p>}</h2>}
               </div>
               
               
               
             
            
             
                <div className='grid md:grid-cols-2 md:space-x-4'>
                   {/* {Country} */}
                  <div className=''>
                    <label htmlFor="" className="text-[#807f83]">Country *</label>
                   {editMode ? 
                    <select name="" id="" className='w-full p-2 border rounded-md outline-none  border-gray-300 'required>
                      <option value="bangladesh" selected disabled>Bangladesh</option>
                      
                    </select>
                   :
                   <p>Bangladesh</p>
                   }
                  </div>

{/* state */}
                  <div>
                    <div>
                      <label htmlFor=""  className="text-[#807f83]">Select a district, state or province *</label>
                    </div>
                   {editMode? 
                    <select name="" id="" onChange={handleDistrictChange} className='w-full p-2 border rounded-md outline-none  border-gray-300' required>
                      <option value={selectedDist}>--Select District--</option>
                      {district.map((dis)=>(
                        <option key={dis} value={dis}>{dis}</option>
                      ))}
                    </select>
                   :
                   <p>{userData.dist||"No data found"}</p>
                   }
                  </div>
            {/* {areas} */}
                  <div>
                   <div>
                     <label htmlFor=""  className="text-[#807f83]">City/Area *</label>
                   </div>
                  {editMode? 
                   <select name="" id="" 
                   onChange={handleAreaChange} 
                   className='w-full p-2 border rounded-md outline-none  border-gray-300' required>
                    <option value="" selected  className="text-[#807f83]">--Select Area--</option>
                    {
                      allArea[selectedDist]?.map((single)=>(
                       <option key={single} value={single}>{single}</option>
                      ))
                    }
                   </select>
                  : 
                  <p>{userData?.area ||"No data found"}</p>
                  }
                  </div>
                  {/* postal */}
                  <div>
                   <div>
                     <label htmlFor=""  className="text-[#807f83]">Postal Code *</label>
                   </div>
                    {editMode?
                    <input type="number" name="post" value={userData?.post} id="" className='w-full p-2 border rounded-md outline-none  border-gray-300' required onChange={changeHandler}/>
                    :
                    <p>{userData?.post ||"No data found"}</p>
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
}

export default Address;