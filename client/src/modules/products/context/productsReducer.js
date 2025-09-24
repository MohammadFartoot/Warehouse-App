export const initialState = {
    products: [],
    deleteModal: false,
    addModal: false,
    editModal: false,
    selectedProduct: null,
    selectProductId: null,
    selectedProductIds: [],
    searchValue: "",
}

export const productsReducer = (state, action) => {


    switch (action.type) {
        case "OPEN_ADD_MODAL":
            return {
                ...state,
                addModal: true,
            }
        case "CLOSE_ADD_MODAL":
            return {
                ...state,
                addModal: false,
            }
        case "OPEN_EDIT_MODAL":
            return {
                ...state,
                editModal: true,
                selectProduct: action.payload,
            }
        case "CLOSE_EDIT_MODAL":
            return {
                ...state,
                editModal: false,
                selectProduct: null,
            }
        case "OPEN_DELETE_MODAL":
            return {
                ...state,
                deleteModal: true,
                selectProductId: action.payload,
            }
        case "CLOSE_DELETE_MODAL":
            return {
                ...state,
                deleteModal: false,
                selectedProductId: null,
            }
        case "SEARCH_PRODUCTS":
            return {
                ...state,
                searchValue: action.payload,
            }
        default:
            return state;
    }
}