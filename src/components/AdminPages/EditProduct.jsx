import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { useGetAllPostsQuery, useGetCategoryQuery, useGetEditPostQuery, useUpdateProductMutation } from '../../app/store';

const EditProduct = () => {
   const navigate=useNavigate()
   const {id}=useParams()
   const [updateProduct]=useUpdateProductMutation()
   
    const {data:singleData}=useGetEditPostQuery(id,{
        skip:!id
    })
    
   
   useEffect(()=>{
  console.log(singleData)
   },[singleData])
   //form state
   const [loading,setLoading]=useState(true)
   const [product,setProduct]=useState([])
   const [category,setCategory]=useState([])
   //product and category
   const [title,setTitle]=useState("")
   const [price,setPrice]=useState("")
   const [categoryId,setCategoryId]=useState("")

   //image upload
   const [keepExistingImage,setKeepExistingImage]=useState(true)
   const [newImageFile,setNewImageFile]=useState(null)
   const [newImagePreview,setImagePreview]=useState(null)
   const [submitting,setSubmitting]=useState(false)

  
   const submitHandler=()=>{

   }
    return (
       <div className=''>
         <div className='flex flex-col justify-between md:flex-row gap-2 max-w-full'>
            <div className='py-2'>
            <h2 className='text-xl'>Edit Inventory</h2>
            <p className='text-sm'>Manage your inventory items</p>
            </div>
            <div>
               <Link to="/admin-dashboard/inventory"> <button className='bg-[#e96841] text-white px-2 py-2 rounded-sm hover:bg-[#e64514] text-sm'>Go to Inventory List</button></Link>
            </div>
        </div>
        <div>
            <form action="" className='max-h-screen max-w-sm border flex flex-col gap-2' onSubmit={submitHandler}>
            <div>
            <div><label htmlFor="">Product Name</label></div>
            <input type="text" name="" id="" className='border w-full' />
            </div>
            <div>
            <div><label htmlFor="">Price</label></div>
            <input type="number" name="" id=""  className='border w-full'/>
            </div>
            
            
            <div>
            <div><label htmlFor="">Select Category</label></div>
            {/* <select>
               {allCategory.map(single=>(
               <option value={single} id={single}>{single.name}</option>
               ))}
            </select> */}
            </div>
            <div>
            <div><label htmlFor="">Product Image</label></div>
            <input type="file" name="" id=""  className='border w-full'/>
            </div>
            <div>
                {/* <img src="" alt="" className='h-10 w-10'/> */}
            </div>
            <div>
            <div><label htmlFor="">Product Description</label></div>
            <input type="text" name="" id=""  className='border w-full'/>
            </div>
            <button className='bg-blue-500 text-white' type='submit'>Update Product</button>
            </form>
        </div>
       </div>
    );
};

export default EditProduct;