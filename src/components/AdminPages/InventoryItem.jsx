import { Pencil, Trash2 } from 'lucide-react';
import React from 'react';
import { useGetCategoryQuery } from '../../app/store';
import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../Firebase/Firebase';
import { Link } from 'react-router-dom';

const InventoryItem = ({product,handleDelete}) => {
    const {data:allCategory=[]}=useGetCategoryQuery()
    // console.log(allCategory)
    // console.log(product)
    const getCategoryName = (productCategoryId) => {
  const match = allCategory.find(cat => cat.id === productCategoryId);
  return match ? match.name : "uncatogarized";
};

    return (
        
              <tr className="hover:bg-gray-50/50 transition-colors">
                                <td className="px-6 py-4">
                                    <img 
                                        src={product.image} 
                                        alt="product" 
                                        className="w-14 h-14 object-cover rounded-lg border border-gray-100 shadow-sm"
                                    />
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <p className='font-semibold text-gray-900'>{product.title}</p>
                                   
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className='font-bold text-gray-700 text-sm'>{product.price}</span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                    <span className="px-2.5 py-1 text-[10px] font-bold bg-gray-100 text-gray-600 rounded-full border border-gray-200">
                                       {getCategoryName(product.categoryId)}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex justify-center items-center gap-3">
                                        <Link to={`/admin-dashboard/inventory/edit/${product.id}`}>
                                        {console.log(product)}
                                        <button className="p-2 text-blue-500 hover:bg-blue-50 rounded-lg transition-all" title="Edit" >
                                            <Pencil size={18} />
                                        </button>
                                        </Link>
                                        <button className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-all" title="Delete" onClick={()=>handleDelete(product.id)}>
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </td>
                          </tr>

                           
  
    );
};

export default InventoryItem;