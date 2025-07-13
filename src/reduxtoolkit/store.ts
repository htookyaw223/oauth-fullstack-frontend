import { configureStore } from "@reduxjs/toolkit";
import { mainApi } from "./mainApi";

const reducer = {
    [mainApi.reducerPath]: mainApi.reducer
}
export const store = configureStore({
    reducer, 
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            thunk: true,
            immutableCheck: false,
            serializableCheck: false,
          }).concat([
            mainApi.middleware
        ])
})