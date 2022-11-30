// import React, { useContext } from "react";
// import { Navigate, useLocation } from "react-router-dom";
// import { AuthContext } from "../../../contexts/AuthProvider";
// import useUser from "../../../hooks/useUser";

// const UserRoute = ({ children }) => {
//   const { user, loading } = useContext(AuthContext);
//   const [isUser, isUserLoading] = useUser(user?.email);
//   const location = useLocation();

//   if (loading || isUserLoading) {
//     return <progress className="progress w-56"></progress>;
//   }

//   if (user && isUser) {
//     return children;
//   }
//   return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
// };

// export default UserRoute;
