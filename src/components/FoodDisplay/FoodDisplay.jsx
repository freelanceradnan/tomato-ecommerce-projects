import React, { useContext } from 'react';
import { food_list } from './../../assets/assets';
import { StoreContext } from '../../contexts/StoreContext';
import FoodItem from '../FoodItem/FoodItem';

const FoodDisplay = ({categroy}) => {
    const {food_list}=useContext(StoreContext)
    return (
        <div className='mt-7' id="">
        <h2 className='font-[max(2vw,24px)] text-[600]'>Top dishes near you</h2>
        <div className="food-grid">
        {food_list.map((item,index)=>{
            return <FoodItem key={index} id={item._id} name={item.name} description={item.description} price={item.price} image={item.image}/>
        })}
        </div>  
        </div>
    );
};

export default FoodDisplay;