import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Exploremenu from '../../components/ExploreMenu/Exploremenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';

const Home = () => {
      const [categroy,setCategory]=useState("")
      console.log(categroy)
    return (
        <div>
         <Header/>
         <Exploremenu categroy={categroy} setCategory={setCategory}/>
         <FoodDisplay categroy={categroy}/>
        </div>
    );
};

export default Home;