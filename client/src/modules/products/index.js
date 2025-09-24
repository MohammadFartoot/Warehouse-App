// components
export { default as Modal } from "./components/Modal.jsx"
export { default as AddModal } from "./components/AddModal.jsx"
export { default as DeleteModal } from "./components/DeleteModal.jsx"
export { default as EditModal } from "./components/EditModal.jsx"
export { default as ProductsList } from "./components/ProductsList.jsx"

// context
export { default as ProductsProvider, useProducts } from "./context/ProductsProvider.jsx";

// hooks
export { useGetProducts } from "./hooks/useGetProducts.js"
export { useGetProductById } from "./hooks/useGetProductById.js"
export { useAddProduct } from "./hooks/useAddProduct.js"
export { useDeleteProducts } from "./hooks/useDeleteProducts.js"
export { useDeleteProductById } from "./hooks/useDeleteProductById.js"
export { useUpdateProductById } from "./hooks/useUpdateProductById.js"
