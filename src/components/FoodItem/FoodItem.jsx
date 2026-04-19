import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../contexts/StoreContext';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../app/userDetails';


export const FoodItem = ({product}) => {
    const dispatch=useDispatch()
    
    const [itemCount,setItemCount]=useState(0)
    
    return (
        <div className='w-[100%] mx-auto rouded-[15px] transition:0.3s' style={{animation:"fadeIn 3s",boxShadow:"0px 0px 10px #00000015"}} id="shop">
            <div className="relative">
                <img src={product.image} alt="" className='w-[100%]' style={{borderRadius:"15px 15px 0px 0px"}}/>
           
            <img src={assets.add_icon_white} className="absolute w-[35px] bottom-2 right-2 cursor-pointer rounded-md" onClick={()=>{
                dispatch(addToCart(product))
                alert('success')
            }}/>
            
           
            
            </div>
            <div className="p-5">
                
                <div className="flex justify-between items-center mb-2.5">
                    <p className="text-[20px] font-[500] w-[150px] md:w-full overflow-hidden text-ellipsis whitespace-nowrap">{product.title}</p>
                    <img src={assets.rating_starts} alt="" className='w-[70px]'/>
                </div>
                <p className='text-[#676767] text-[12px]'>{product.description}</p>
                <p className='text-tomato text-[22px] mt-2.5'>${product.price}</p>
            </div>
        </div>
    );
};

export default FoodItem;