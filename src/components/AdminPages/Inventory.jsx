import React, { useEffect, useState } from 'react';
import { assets } from '../../assets/assets';
import foodImg from '../../../src/assets/food_25.png';
import { Pencil, Trash2 } from 'lucide-react';
import { useGetAllPostsQuery } from '../../app/store';
import InventoryItem from './InventoryItem';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';
import { Link } from 'react-router';

const Inventory = () => {
  const [products, setProducts] = useState([]); 
  const {data:allProduct=[]}=useGetAllPostsQuery()
   useEffect(() => {
  
  if (allProduct.length > 0 && products.length === 0) {
    setProducts(allProduct);
  }
}, [allProduct, products]);
  
const handleDelete = async(id) => {
  try {
    const delRef=doc(db,'products',id)
    deleteDoc(delRef)
    setProducts(prev => prev.filter(p => p.id !== id));
  } catch (error) {
    
  }
};
    return (
       <div className=''>
         <div className='max-w-full flex flex-col gap-4 overflow-hidden'>
            {/* //top area */}
        <div className='lg:flex items-center justify-between'>
            <div className='md:flex flex-col gap-2'>
                <p className='text-2xl font-semibold'>Inventory</p>
                <p className='text-sm'>Manage your product inventory</p>
            </div>
           <Link to="/admin-dashboard/addProduct"> <button className='p-2 border rounded-sm bg-[#db6e4d] hover:bg-[#da4315] text-white font-semibold text-sm'>Add Product</button></Link>
        </div>
        {/* //search area */}
        <div className='md:flex justify-between'>
            <div><input type="search" name="" id="" className='border' placeholder='Search Products ...'/></div>
            <div className='flex gap-2'>
                <button className='border px-4 py-1 rounded-sm border-[#525252] hover:bg-[#525252] hover:text-white'>Filter</button>
                 <button className='border px-4 py-1 rounded-sm border-[#525252] hover:bg-[#525252] hover:text-white'>Excel</button>
                 <button className='border px-4 py-1 rounded-sm border-[#525252] hover:bg-[#525252] hover:text-white'>Pdf</button>
            </div>
        </div>
        {/* //table */}
      <div className="w-full border border-gray-200 rounded-xl shadow-sm bg-white">
                {/* This div handles the horizontal scrolling logic strictly for the table */}
                <div className="overflow-x-auto">
                    {/* min-w-[800px] ensures it doesn't squish on mobile */}
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200">
                                <th className="px-6 py-4 font-bold text-[11px] text-gray-500 uppercase tracking-widest">Image</th>
                                <th className="px-6 py-4 font-bold text-[11px] text-gray-500 uppercase tracking-widest">Title</th>
                                <th className="px-6 py-4 font-bold text-[11px] text-gray-500 uppercase tracking-widest">Price</th>
                                <th className="px-6 py-4 font-bold text-[11px] text-gray-500 uppercase tracking-widest">Category</th>
                                <th className="px-6 py-4 font-bold text-[11px] text-gray-500 uppercase tracking-widest text-center">Actions</th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                            {/* Example Row 1 */}
                          {products.map((product)=>(
                            <InventoryItem key={product.id} product={product} setProducts={setProducts} handleDelete={handleDelete}/>
                          ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
       </div>
    );
};

export default Inventory;