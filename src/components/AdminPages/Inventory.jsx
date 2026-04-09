import React from 'react';
import { assets } from '../../assets/assets';
import foodImg from '../../../src/assets/food_25.png';
import { Pencil, Trash2 } from 'lucide-react';

const Inventory = () => {
  
    return (
       <div className=''>
         <div className='max-w-full flex flex-col gap-4 overflow-hidden'>
            {/* //top area */}
        <div className='lg:flex items-center justify-between'>
            <div className='md:flex flex-col gap-2'>
                <p className='text-2xl font-semibold'>Inventory</p>
                <p className='text-sm'>Manage your product inventory</p>
            </div>
            <button className='p-2 border rounded-sm bg-[#db6e4d] hover:bg-[#da4315] text-white font-semibold text-sm'>Add Product</button>
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
                            <tr className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <img 
                                        src={foodImg} 
                                        alt="product" 
                                        className="w-14 h-14 object-cover rounded-lg border border-gray-100 shadow-sm"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p className='font-semibold text-gray-900'>Title 1</p>
                                    <p className='text-[10px] text-gray-400 uppercase'>ID: #4059</p>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className='font-bold text-gray-700 text-sm'>20$</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2.5 py-1 text-[10px] font-bold bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                                        UNCATAGORIZED
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center items-center gap-3">
                                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="Edit">
                                            <Pencil size={18} />
                                        </button>
                                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete">
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                            </tr>

                            {/* Example Row 2 */}
                            <tr className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <img 
                                        src={foodImg} 
                                        alt="product" 
                                        className="w-14 h-14 object-cover rounded-lg border border-gray-100 shadow-sm"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap font-semibold text-gray-900">Title 2</td>
                                <td className="px-6 py-4 whitespace-nowrap font-bold text-gray-700 text-sm">45$</td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2.5 py-1 text-[10px] font-bold bg-orange-50 text-orange-600 rounded-full border border-orange-100 uppercase">
                                        Fast Food
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center items-center gap-3">
                                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all"><Pencil size={18} /></button>
                                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all"><Trash2 size={18} /></button>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
       </div>
    );
};

export default Inventory;