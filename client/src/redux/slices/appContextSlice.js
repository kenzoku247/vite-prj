import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

const INITIAL_STATE = {
    isNavMenuClose: false,
    currentApp: 'default',
};

const contextSlice = createSlice({
    name: 'context',
    initialState: INITIAL_STATE,
    reducers: {
        openNavMenu(state) {
            state.isNavMenuClose = false;
        },
        closeNavMenu(state) {
            state.isNavMenuClose = true;
        },
        collapseNavMenu(state) {
            state.isNavMenuClose = !state.isNavMenuClose;
        },
        changeApp(state, action) {
            state.currentApp = action.payload;
        },
        defaultApp(state) {
            state.currentApp = 'default';
        },
    },
});

// Export actions
export const {
    openNavMenu,
    closeNavMenu,
    collapseNavMenu,
    changeApp,
    defaultApp,
} = contextSlice.actions;

// Export reducer
export default contextSlice.reducer;