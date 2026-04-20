import { createBrowserRouter } from "react-router-dom";

import Rootlayout from "../pages/Rootlayout";
import Home from "../pages/Home/Home";
import Cart from "../pages/Cart/Cart";
import Signup from "../pages/Singup/Signup";
import Placeholder from "../pages/Placeholder/PlaceOrder";

// Dashboard
import MyDashboard from "../pages/MyDashboard/MyDashboard";
import MyProfile from "../components/MyDashboard/MyProfile";
import Address from "../components/MyDashboard/Address";
import WhistList from "../components/MyDashboard/WhistList";
import Order from "../components/MyDashboard/Order";
import Feedback from "../components/MyDashboard/Feedback";
import Chat from "../components/MyDashboard/Chat";
import Policies from "../components/MyDashboard/Policies";

// Admin
import AdminPage from "../pages/Admin/AdminPage";
import Dashboard from "../components/AdminPages/Dashboard";
import Inventory from "../components/AdminPages/Inventory";
import AddProduct from "../components/AdminPages/AddProduct";
import User from "../components/AdminPages/User";
import Settings from "../components/AdminPages/Settings";
import EditProduct from "../components/AdminPages/EditProduct";
import AdminRoute from "../components/AdminPages/AdminRoute";
import UserRoute from "../components/AdminPages/userRoute";
import Checkout from "../pages/Checkout/Checkout";
import FakePayment from "../pages/FakePayment/Payment";
import OrderSuccess from "../pages/OrderSuccess/OrderSuccess";
import OrderMangement from "../components/AdminPages/OrderMangement";

const Router = createBrowserRouter([
  {
    path: "/",
    element: <Rootlayout />,
    children: [
      // public routes
      { index: true, element: <Home /> },
         {path:"processCheckout",element:<Checkout/>},
         {path:"payment",element:<FakePayment/>},
         {path:"order-success",element:<OrderSuccess/>},
      {
        path: "cart",
        element: (
          <UserRoute>
            <Cart />
          </UserRoute>
        )
        
      },
      { path: "signup", element: <Signup /> },
      { path: "placeOrder", element: <Placeholder /> },

      // dashboard
      {
        path: "myDashboard",
        element: <MyDashboard />,
        children: [
          { index: true, element: <MyProfile /> },
          { path: "address", element: <Address /> },
          { path: "wishlist", element: <WhistList /> },
          { path: "orders", element: <Order /> },
          { path: "feedback", element: <Feedback /> },
          { path: "chatwithus", element: <Chat /> },
          { path: "policies", element: <Policies /> },
        ],
      },

      // admin routes
      {
        path: "admin-dashboard",
        element: (
          <AdminRoute>
            <AdminPage />
          </AdminRoute>
        ),
        children: [
          { index: true, element: <Dashboard /> },
          { path: "inventory", element: <Inventory /> },
          { path: "addProduct", element: <AddProduct /> },
          { path: "orderMangement", element: <OrderMangement /> },
          { path: "userManagement", element: <User /> },
          { path: "settings", element: <Settings /> },
          { path: "inventory/edit/:id", element: <EditProduct /> },
        ],
      },
    ],
  },
]);
export default Router