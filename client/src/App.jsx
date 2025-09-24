import {Navigate, Route, Routes} from "react-router-dom";
import AccountsLayout from "./templates/AccountsLayout.jsx";
import SignUp from "./modules/auth/pages/SignUp.jsx";
import SignIn from "./modules/auth/pages/SignIn.jsx";
import PageNotFound from "./common/pages/PageNotFound.jsx";
import ProductsLayout from "./templates/ProductsLayout.jsx";
import ProductsPage from "./modules/products/pages/ProductsPage.jsx";
import DashboardPage from "./modules/dashboard/pages/DashboardPage.jsx";
import ProtectedRoute from "./core/routes/ProtectedRoute.jsx";
import {Toaster} from "react-hot-toast";
import AlertModal from "./modules/auth/index.js";


function App() {

    return (
        <>
            <AlertModal/>
            <Routes>
                <Route path="/" element={<Navigate to="/products/products-page"/>}/>
                <Route path="*" element={<PageNotFound/>}/>
                <Route path="/accounts" element={<AccountsLayout/>}>
                    <Route path="sign-up" element={<SignUp/>}/>
                    <Route path="sign-in" element={<SignIn/>}/>
                </Route>
                <Route
                    path="/dashboard"
                    element={
                        <ProtectedRoute>
                            <DashboardPage/>
                        </ProtectedRoute>}
                />
                <Route path="/products" element={<ProductsLayout/>}>
                    <Route path="products-page" element={<ProductsPage/>}/>
                </Route>
            </Routes>
            <Toaster/>
        </>
    );
}

export default App
