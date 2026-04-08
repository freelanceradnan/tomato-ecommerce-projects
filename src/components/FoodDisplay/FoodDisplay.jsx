import React, { useContext, useState } from 'react';
import { food_list } from './../../assets/assets';
import { StoreContext } from '../../contexts/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({product}) => {
    
    // const {food_list}=useContext(StoreContext)
    if (!product || product.length === 0) {
        return (
            <div className='mt-7 text-center'>
                <p className='text-gray-500'>No dishes found in this category.</p>
            </div>
        );
    }
    return (
        <div className='mt-7' id="">
        <h2 className='font-[max(2vw,24px)] text-[600]'>Top dishes near you</h2>
        <div className="food-grid">
        {product.map((pro)=>(
            <FoodItem key={pro.id} id={pro.id} image={pro.image} description={pro.description} price={pro.price}/>
        ))}
        </div>  
        </div>
    );
};

export default FoodDisplay;