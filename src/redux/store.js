import { configureStore } from '@reduxjs/toolkit';
import modelReducer from './reducers/modelSlice';

const store = configureStore({
    reducer: {
        model: modelReducer,
    },
});

export default store;
