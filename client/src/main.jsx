import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import './core/styles/global.css'
import App from './App.jsx'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import ProductsProvider from "./modules/products/context/ProductsProvider.jsx";
import ThemeProvider from "./core/context/ThemeProvider.jsx";
import AuthProvider from "./modules/auth/context/AuthProvider.jsx";


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <ThemeProvider>
                    <AuthProvider>
                        <ProductsProvider>
                            <App/>
                        </ProductsProvider>
                    </AuthProvider>
                </ThemeProvider>
            </QueryClientProvider>
        </StrictMode>
    </BrowserRouter>
)
