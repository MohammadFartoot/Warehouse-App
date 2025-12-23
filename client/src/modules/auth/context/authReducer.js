export const initialState = {
    alertModal: false,
}

export const authReducer = (state, action) => {
    switch (action.type) {
        case "OPEN_ALERT_MODAL":
            return {
                alertModal: true,
            }
        case "CLOSE_ALERT_MODAL":
            return {
                alertModal: false,
            }
        default:
            return state;
    }
}