import {configureStore} from "@reduxjs/toolkit";
import homePageReducer from './reducers/homePageSlice'
import singlePageReducer from  './reducers/singlePageSlice'

const store = configureStore({
    reducer: {
        homePageReducer,
        singlePageReducer
    }
})

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;