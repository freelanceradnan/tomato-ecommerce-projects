import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';

const EditProduct = () => {
    const {id}=useParams()
    return (
       <div>
         <div className='flex flex-col justify-between md:flex-row gap-2'>
            <div>
            <h2 className='text-xl'>Edit Inventory</h2>
            <p className='text-sm'>Manage your inventory items</p>
            </div>
            <div>
               <Link to="/admin-dashboard/inventory"> <button className='bg-[#e96841] text-white px-2 py-2 rounded-sm hover:bg-[#e64514] text-sm'>Go to Inventory List</button></Link>
            </div>
        </div>
        <div>
            <form action="" className='max-h-screen max-w-sm border min-w-screen'>
            <div>
            <div><label htmlFor="">Product Name</label></div>
            <input type="text" name="" id="" />
            </div>
            </form>
        </div>
       </div>
    );
};

export default EditProduct;