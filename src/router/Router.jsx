import { createBrowserRouter } from "react-router";
import Rootlayout from "../pages/Rootlayout";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";

import Placeholder from './../pages/Placeholder/PlaceOrder';
import Signup from "../pages/Singup/Signup";
import MyDashboard from "../pages/MyDashboard/MyDashboard";

export const Router=createBrowserRouter([
    {path:"/",element:<Rootlayout/>,children:([
    {path:"/",index:true,element:<Home/>},
    {path:"/cart",index:true,element:<Cart/>},
    {path:"/signup",index:true,element:<Signup/>},
    {path:"/myDashboard",element:<MyDashboard/>,children:([
        {path:"myProfile",index:true,element:<h2>this is element</h2>}
    ])},
    {path:"/placeOrder",index:true,element:<Placeholder/>},
    ])}
])