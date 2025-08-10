import { createContext, useContext, useReducer } from "react";

const wishlistInitialState = {
    wishlist: []
}

const WishlistContext = createContext(wishlistInitialState);

const wishlistReducer = (state, action) => {
    switch (action.type) {
        case "ADD_TO_WISHLIST":
            const existingItem = state.wishlist.find(item => item.id === action.payload.id);
            if (existingItem) {
                return state;
            }
            return {
                ...state,
                wishlist: [...state.wishlist, action.payload]
            };
        case "REMOVE_FROM_WISHLIST":
            return {
                ...state,
                wishlist: state.wishlist.filter(item => item.id !== action.payload)
            };
        case "CLEAR_WISHLIST":
            return {
                ...state,
                wishlist: []
            };
        default:
            return state;
    }
};

export const WishlistProvider = ({children}) => {
    const [state, dispatch] = useReducer(wishlistReducer, wishlistInitialState);

    function addToWishlist(product){
        dispatch({
            type: "ADD_TO_WISHLIST",
            payload: product
        });
    }

    function removeFromWishlist(productId){
        dispatch({
            type: "REMOVE_FROM_WISHLIST",
            payload: productId
        });
    }

    function clearWishlist(){
        dispatch({
            type: "CLEAR_WISHLIST"
        });
    }

    const value = {
        wishlist: state.wishlist,
        addToWishlist,
        removeFromWishlist,
        clearWishlist
    }

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    )
}

export const useWishlist = () => {
    const context = useContext(WishlistContext);
    return context;
}
