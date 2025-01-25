/* eslint-disable react/jsx-no-undef */
import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import Home from '../pages/Home';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import AdminDashboard from '../pages/AdminDashboard';
import Products from '../components/Products';
import SearchProduct from '../pages/SearchProduct';
import ProductDetails from '../pages/ProductDetails';
import Cart from '../components/Cart';
import BecomeSeller from '../components/BecomeSeller';
import SupplierRegistration from '../pages/SupplierRegistration';
import SupplierDashboard from '../components/supplier/SupplierDashboard';

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "",
                element: <Home />
            },
            {
                path:"login",
                element:<Login />
            },
            {
                path:"signup",
                element:<SignUp />
            },
            {
                path:"admin-dashboard",
                element:<AdminDashboard />
            },
            {
                path: "products/:category/:subcategory",
                element: <Products />
            },
            {
                path: "search",
                element: <SearchProduct />
            },
            {
                path: "products/:id",
                element : <ProductDetails />
            },
            {
                path: "cart",
                element: <Cart /> // Route for CartPage
              },
            {
                path: "become-seller",
                element: <BecomeSeller />,
            },
            {
                path: '/supplier/register',
                element: <SupplierRegistration />
            },
            {
                path: '/supplier/dashboard',
                element: <SupplierDashboard />
            },
        ]
    }
])

export default router;
