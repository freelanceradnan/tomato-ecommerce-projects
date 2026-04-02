import { createBrowserRouter } from "react-router";
import Rootlayout from "../pages/Rootlayout";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";

import Placeholder from './../pages/Placeholder/PlaceOrder';

export const Router=createBrowserRouter([
    {path:"/",element:<Rootlayout/>,children:([
    {path:"/",index:true,element:<Home/>},
    {path:"/cart",index:true,element:<Cart/>},
    {path:"/placeOrder",index:true,element:<Placeholder/>},
    ])}
])