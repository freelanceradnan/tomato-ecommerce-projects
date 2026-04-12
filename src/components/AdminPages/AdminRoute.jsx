import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { StoreContext } from "../../contexts/StoreContext";

const AdminRoute = ({ children }) => {
  const { isLogin, role } = useContext(StoreContext);

  if (!isLogin) return <Navigate to="/signup" />;
  if (role?.toLowerCase() !== "admin") return <Navigate to="/" />;

  return children;
};

export default AdminRoute;