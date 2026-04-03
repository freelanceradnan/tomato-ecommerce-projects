import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Exploremenu from '../../components/ExploreMenu/Exploremenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Footer from '../Footer/Footer';
import AppDownload from '../AppDownload/AppDownload';

const Home = () => {
      const [categroy,setCategory]=useState("All")
      
    return (
        <div>
         <div className='app'>
         <Header/>
         <Exploremenu categroy={categroy} setCategory={setCategory}/>
         <FoodDisplay categroy={categroy}/>
         <AppDownload/>
         </div>
         
         <Footer/>
        </div>
    );
};

export default Home;