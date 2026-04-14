import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../../contexts/StoreContext";
import { useLocation, useNavigate } from "react-router";

const AdminRoute = ({ children }) => {
  const { isLogin, role, isLoading } = useContext(StoreContext);
  const location = useLocation();
if (isLoading) {
    return <div>Loading...</div>;
  }

 if (!isLogin) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }
 if (role?.toLowerCase() !== "admin") {
    return <Navigate to="/" replace />;
  }

  return children;
};

export default AdminRoute;