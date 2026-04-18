import { createBrowserRouter } from "react-router-dom";
import Rootlayout from "../pages/Rootlayout";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";

import Placeholder from './../pages/Placeholder/PlaceOrder';
import Signup from "../pages/Singup/Signup";
import MyDashboard from "../pages/MyDashboard/MyDashboard";
import MyProfile from "../components/MyDashboard/MyProfile";
import Address from "../components/MyDashboard/Address";
import WhistList from "../components/MyDashboard/WhistList";
import Order from "../components/MyDashboard/Order";
import Feedback from "../components/MyDashboard/Feedback";
import Chat from "../components/MyDashboard/Chat";
import Policies from "../components/MyDashboard/Policies";
import AdminPage from "../pages/Admin/AdminPage";
import Dashboard from "../components/AdminPages/Dashboard";
import Inventory from "../components/AdminPages/Inventory";
import AddProduct from "../components/AdminPages/AddProduct";
import User from "../components/AdminPages/User";
import Settings from "../components/AdminPages/Settings";
import EditProduct from "../components/AdminPages/EditProduct";
import AdminRoute from "../components/AdminPages/AdminRoute";

export const Router=createBrowserRouter([
    {path:"/",element:<Rootlayout/>,children:([
    {path:"/",index:true,element:<Home/>},
    {path:"/cart",index:true,element:<Cart/>},
    {path:"/signup",index:true,element:<Signup/>},
    {path:"/myDashboard",element:<MyDashboard/>,children:([
        { index: true, element: <MyProfile /> },
        {path:"address",index:false,element:<Address/>},
        {path:"wishlist",index:false,element:<WhistList/>},
        {path:"orders",index:false,element:<Order/>},
        {path:"feedback",index:false,element:<Feedback/>},
        {path:"chatwithus",index:false,element:<Chat/>},
        {path:"policies",index:false,element:<Policies/>}
    ])},
    {path:"/placeOrder",index:true,element:<Placeholder/>},
    {
  path: "/admin-dashboard",
  element: (
    <AdminRoute>
      <AdminPage />
    </AdminRoute>
  ),
  children: [
    { index: true, element: <Dashboard /> }, 
    { path: "inventory", element: <Inventory /> },
    { path: "addProduct", element: <AddProduct /> },
    { path: "orderMangement", element: <Order /> },
    { path: "userManagement", element: <User /> },
    { path: "settings", element: <Settings /> },
    { path: "inventory/edit/:id", element: <EditProduct /> }
  ]
},
    ])}
])