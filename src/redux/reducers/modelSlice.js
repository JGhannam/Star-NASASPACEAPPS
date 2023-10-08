import { createSlice } from '@reduxjs/toolkit';

const modelSlice = createSlice({
    name: 'model',
    initialState: {
        name: 'model',
        errorList: [],
        addedErrors: false,
    },
    reducers: {
        setName: (state, action) => {
            state.name = action.payload;
        },
        addError: (state, action) => {
            state.errorList.push(action.payload);
        },
        clearErrors: (state) => {
            state.errorList = [];
        },
        setAddedErrors: (state, action) => {
            state.addedErrors = true;
        },
    },
});

export const { setName
    , addError
    , clearErrors
    , setAddedErrors
} = modelSlice.actions;

export default modelSlice.reducer;
