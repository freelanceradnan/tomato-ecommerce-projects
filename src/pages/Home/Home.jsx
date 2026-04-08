import React, { useState } from 'react';
import Header from '../../components/Header/Header';
import Exploremenu from '../../components/ExploreMenu/Exploremenu';
import FoodDisplay from '../../components/FoodDisplay/FoodDisplay';
import Footer from '../Footer/Footer';
import AppDownload from '../AppDownload/AppDownload';
import { useSearchParams } from 'react-router';
import { useGetAllPostsQuery, useGetCategoryQuery, useGetProductByCategoryQuery } from '../../app/store';

const Home = () => {
      const [categroy,setCategory]=useState("All")
      const [paramSearch,setParamSearch]=useSearchParams()
      const activeSlug=paramSearch.get('category')
      const {data:categories=[]}=useGetCategoryQuery()
      
      const activeCategory=categories.find((c)=>c.slug==activeSlug)
      // console.log(activeCategory)
      const activeCategoryId=activeCategory?.id
      const isActiveCategory=Boolean(activeCategoryId)
      const {data:allPost=[]}=useGetAllPostsQuery(undefined,{
        skip:isActiveCategory
      })
      const {data:categoryPost=[]}=useGetProductByCategoryQuery(activeCategoryId,{
        skip:!isActiveCategory
      })
       const product=isActiveCategory? categoryPost:allPost
    //    console.log(activeCategory)
       const handler=(item)=>{
       if(activeSlug==item.slug){
        clearCategory()
       }
       else{
        setParamSearch({category:item.slug})
       }
       }
       const clearCategory = () => {
        const newParams = new URLSearchParams(paramSearch);
        newParams.delete('category');
        setParamSearch(newParams);
    };
    return (
        <div>
         <div className='app'>
         <Header/>
         <Exploremenu categroy={categroy} setCategory={setCategory} handler={handler} categories={categories} activeCategory={activeCategory}/>
         <FoodDisplay categroy={categroy} product={product}/>
         <AppDownload/>
         </div>
         
         <Footer/>
        </div>
    );
};

export default Home;