import {createContext, useContext, useReducer} from "react";
import {initialState, productsReducer} from "./productsReducer.js";
import {
    useGetProducts,
    useGetProductById,
    useAddProduct,
    useDeleteProducts,
    useDeleteProductById,
    useUpdateProductById,
} from "../index.js"


export const ProductsContext = createContext();
export const useProducts = () => {
    const context = useContext(ProductsContext);
    if (!context) {
        throw new Error("useProducts must be used within ProductsProvider");
    }
    return context;
}

function ProductsProvider({children}) {

    const getProducts = useGetProducts();
    const addProduct = useAddProduct();
    const getProductById = useGetProductById();
    const deleteProducts = useDeleteProducts();
    const deleteProductById = useDeleteProductById();
    const updateProductById = useUpdateProductById();


    const [state, dispatch] = useReducer(productsReducer, initialState)

    const openAddModal = () => {
        dispatch({type: "OPEN_ADD_MODAL"})
    }

    const closeAddModal = () => {
        dispatch({type: "CLOSE_ADD_MODAL"})
    }

    const openEditModal = (product) => {
        dispatch({
            type: "OPEN_EDIT_MODAL",
            payload: product,
        })
    }

    const closeEditModal = () => {
        dispatch({type: "CLOSE_EDIT_MODAL"})
    }

    const openDeleteModal = (id) => {
        dispatch({
            type: "OPEN_DELETE_MODAL",
            payload: id,
        })
    }

    const closeDeleteModal = () => {
        dispatch({type: "CLOSE_DELETE_MODAL"})
    }

    const setSearchValue = (text) => {
        dispatch({
            type: "SEARCH_PRODUCTS",
            payload: text,
        })
    }


    return (
        <ProductsContext.Provider value={{
            ...state,
            dispatch,
            productsResponse: getProducts.data,
            totalProducts: getProducts.data?.totalProducts || 0,
            totalPages: getProducts.data?.totalPages || 1,
            products: getProducts.data?.data || [],
            productsLoading: getProducts.isLoading,
            error: getProducts.error,
            addProduct,
            getProductById,
            deleteProducts,
            deleteProductById,
            updateProductById,
            openAddModal,
            closeAddModal,
            openEditModal,
            closeEditModal,
            openDeleteModal,
            closeDeleteModal,
            setSearchValue,
        }}>
            {children}
        </ProductsContext.Provider>
    );
}

export default ProductsProvider;





