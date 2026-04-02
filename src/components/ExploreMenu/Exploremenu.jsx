import React, { useState } from 'react';
import { menu_list } from '../../assets/assets';

const Exploremenu = ({setCategory,categroy}) => {
   
    
    return (
        <div className='flex flex-col gap-3' id='explore-menu'> 
        <h2 className='text-[#262626] text-3xl font-medium mt-5'>Explore our menu</h2>
        <p className='max-w-[60%] text-[#747474] text-[max(1.4vw,14px)]' style={{columns:"#808080"}}>Choose from a diverse menu featuring a deleteable array of meal.</p>
        <div className="h-40 flex justify-between items-center gap-10 text-center m-5 no-scrollbar" style={{overflowX:"scroll",overflowY:"hidden"}}>
        {menu_list.map((item,index)=>{
        return(
            <div key={index} className='' onClick={()=>setCategory(prev=>prev===item.menu_name?"All":item.menu_name)}>
            <img src={item.menu_image} alt="" className={`w-[7.5vw] min-w-20 cursor-pointer rounded-[50%] transition:0.2s ${categroy===item.menu_name?'border-4 border-orange-600':''}`}/>
            <p className='mt-2 h-0.5 border-none'>{item.menu_name}</p>
            </div>
        )
        })}
        </div>
        <hr className='my-2 h-[2px] bg-white'/>
        </div>
    );
};

export default Exploremenu;