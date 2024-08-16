import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

import translation from '@/locales/translation/translation'
import en_us from '@/locales/translation/en_us'
import storePersist from '../storePersist'

const LANG_INITIAL_STATE = {
    result: en_us,
    langCode: 'en_us',
    langDirection: 'ltr',
    isLoading: false,
    isSuccess: false
};

const INITIAL_STATE = storePersist.get('translate')
    ? storePersist.get('translate')
    : LANG_INITIAL_STATE;

export const translate = createAsyncThunk(
    'translation/translate',
    async (value = 'en_us', { dispatch, rejectWithValue }) => {
        dispatch(requestLoading());
        let data = translation.en_us;
        if (data) {
            const LANG_STATE = {
                result: data,
                isRtl: false,
                langDirection: 'ltr',
                langCode: value,
                isLoading: false,
                isSuccess: false,
            };
            window.localStorage.setItem('translate', JSON.stringify(LANG_STATE));
            return { data, value, isRtl: false };
        } else {
            return rejectWithValue();
        }
    }
);

const translationSlice = createSlice({
    name: 'translation',
    initialState: INITIAL_STATE,
    reducers: {
        resetState: () => INITIAL_STATE,
        requestLoading: (state) => {
            state.isLoading = true;
        },
        requestFailed: (state) => {
            state.isLoading = false;
            state.isSuccess = false;
        },
        requestSuccess: (state, action) => {
            state.result = action.payload.data;
            state.langCode = action.payload.value.toLowerCase();
            state.langDirection = action.payload.isRtl ? 'rtl' : 'ltr';
            state.isLoading = false;
            state.isSuccess = true;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(translate.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(translate.fulfilled, (state, action) => {
                state.result = action.payload.data;
                state.langCode = action.payload.value.toLowerCase();
                state.langDirection = action.payload.isRtl ? 'rtl' : 'ltr';
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(translate.rejected, (state) => {
                state.isLoading = false;
                state.isSuccess = false;
            });
    },
});

// Export actions and reducer
export const {
    resetState,
    requestLoading,
    requestFailed,
    requestSuccess,
} = translationSlice.actions;

export default translationSlice.reducer;