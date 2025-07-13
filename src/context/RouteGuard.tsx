import { Navigate, Outlet } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Flex, Spin } from "antd";

export const PrivateRoute = () => {
  const { isAuthenticated, isLoading } = useAuth0();
  console.log("isAuthenticated", isAuthenticated);
  if (isLoading) {
    return (
      <Flex style={{ height: "100vh", justifyContent: "center", alignItems: "center" }}>
        <Spin spinning={isLoading} size="large" />
      </Flex>
    )
  }
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
};
