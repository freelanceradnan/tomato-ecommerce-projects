import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { StoreContext } from "../../contexts/StoreContext";

const UserRoute = ({ children }) => {
  const { isLogin, isLoading } = useContext(StoreContext);
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!isLogin) {
    return <Navigate to="/signup" state={{ from: location }} replace />;
  }

  return children;
};

export default UserRoute;