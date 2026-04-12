import { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {StoreContext}  from "../contexts/StoreContext";
import Navbar from "../components/Navbar/Navbar";
// {Outlet}

const Rootlayout = () => {
  const { role, isLogin, isLoading } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && isLogin && role?.toLowerCase() === "admin") {
      navigate("/admin-dashboard");
    }
  }, [role, isLogin, isLoading]);

  return (
    <>
       <div>
          
           <Navbar/>
            <Outlet/>
        </div>
    </>
  );
};

export default Rootlayout;

