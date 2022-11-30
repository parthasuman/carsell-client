import Login from "../../Pages/Login/Login";
import CategoryData from "../../Category/CategoryData";
import SignUp from "../../Pages/SignUp/SignUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import Cardatas from "../../Category/Toyota/CarData/Cardatas/Cardatas";
import DashboardLayout from "../../Layout/DashboardLayout";
import MyBooking from "../../Dashboard/MyBooking/MyBooking";
import Allusers from "../../Dashboard/AllUsers/Allusers";
import AdminRoute from "../AdminRoute/AdminRoute";
import AddProduct from "../../Dashboard/AddProduct/AddProduct";
import SellerRoute from "../SellerRoute/SellerRoute";
import MyProducts from "../../Dashboard/MyProducts/MyProducts";
import Payment from "../../Dashboard/Dashboard/Payment/Payment";
import Blog from "../../Pages/Blog/Blog";
import ErrorPage from "../../ErrorPage/ErrorPage";
const { createBrowserRouter } = require("react-router-dom");
const { default: Main } = require("../../Layout/Main");
const { default: Home } = require("../../Pages/Home/Home/Home");

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    errorElement: <ErrorPage></ErrorPage>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SignUp></SignUp>,
      },
      {
        path: "/blog",
        element: <Blog></Blog>,
      },

      {
        path: "/category",
        element: (
          <PrivateRoute>
            <CategoryData></CategoryData>
          </PrivateRoute>
        ),
      },
      {
        path: "/category/:id",
        element: <Cardatas></Cardatas>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/category/${params.id}`),
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <DashboardLayout></DashboardLayout>
      </PrivateRoute>
    ),
    children: [
      {
        path: "/dashboard/mybooking",
        element: <MyBooking></MyBooking>,
      },
      {
        path: "/dashboard/addproduct",
        element: (
          <SellerRoute>
            <AddProduct></AddProduct>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/myproducts",
        element: (
          <SellerRoute>
            <MyProducts></MyProducts>
          </SellerRoute>
        ),
      },
      {
        path: "/dashboard/allusers",
        element: (
          <AdminRoute>
            <Allusers></Allusers>
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/payment/:id",
        element: <Payment></Payment>,
        loader: ({ params }) =>
          fetch(`http://localhost:5000/bookings/${params.id}`),
      },
    ],
  },
]);

export default router;
