import React, { useContext, useState } from 'react';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../contexts/StoreContext';


export const FoodItem = ({id,name,price,description,image}) => {
    const [itemCount,setItemCount]=useState(0)
    const { cartItems,
        setCartItems,addToCart,
        removeCart}=useContext(StoreContext)
    return (
        <div className='w-[100%] mx-auto rouded-[15px] transition:0.3s' style={{animation:"fadeIn 3s",boxShadow:"0px 0px 10px #00000015"}} id="shop">
            <div className="relative">
                <img src={image} alt="" className='w-[100%]' style={{borderRadius:"15px 15px 0px 0px"}}/>
            {!cartItems[id]? 
            <img src={assets.add_icon_white} className="absolute w-[35px] bottom-2 right-2 cursor-pointer rounded-md" onClick={()=>addToCart(id)}/>
            :
            <div className='absolute bottom-1 right-2 flex items-center gap-4 p-2 rounded-full bg-white'>
            <img src={assets.remove_icon_red} onClick={()=>removeCart(id)} className='w-[25px]'/>
            <p>{cartItems[id]}</p>
            <img src={assets.add_icon_green}  onClick={()=>addToCart(id)} className='w-[25px]'/>
            </div>
            }
            </div>
            <div className="p-5">
                
                <div className="flex justify-between items-center mb-2.5">
                    <p className="text-[20px] font-[500] w-[150px] md:w-full overflow-hidden text-ellipsis whitespace-nowrap">{name}</p>
                    <img src={assets.rating_starts} alt="" className='w-[70px]'/>
                </div>
                <p className='text-[#676767] text-[12px]'>{description}</p>
                <p className='text-tomato text-[22px] mt-2.5'>${price}</p>
            </div>
        </div>
    );
};

export default FoodItem;