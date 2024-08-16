import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { request } from '@/requests';

const dispatchSettingsData = (datas) => {
  const settingsCategory = {};

  datas.map((data) => {
    settingsCategory[data.settingCategory] = {
      ...settingsCategory[data.settingCategory],
      [data.settingKey]: data.settingValue,
    };
  });

  return settingsCategory;
};

const INITIAL_SETTINGS_STATE = {
  crm_settings: {},
  finance_settings: {},
  company_settings: {},
  app_settings: {},
  money_format_settings: {},
};

const INITIAL_STATE = {
  result: INITIAL_SETTINGS_STATE,
  isLoading: false,
  isSuccess: false,
};

export const listSettings = createAsyncThunk('settings/list', async ({ entity }, thunkAPI) => {
  const response = await request.listAll({ entity });
  if (response.success === true) {
    const payload = dispatchSettingsData(response.result);
    window.localStorage.setItem('settings', JSON.stringify(payload));
    return payload;
  } else {
    return thunkAPI.rejectWithValue(response);
  }
});

export const updateCurrency = createAsyncThunk('settings/updateCurrency', async ({ data }) => {
  return data;
});

export const updateSettings = createAsyncThunk(
  'settings/update',
  async ({ entity, settingKey, jsonData }, thunkAPI) => {
    let response = await request.patch({ entity: entity + '/updateBySettingKey/' + settingKey, jsonData });

    if (response.success === true) {
      response = await request.listAll({ entity });

      if (response.success === true) {
        const payload = dispatchSettingsData(response.result);
        window.localStorage.setItem('settings', JSON.stringify(payload));
        return payload;
      } else {
        return thunkAPI.rejectWithValue(response);
      }
    } else {
      return thunkAPI.rejectWithValue(response);
    }
  }
);

const settingsSlice = createSlice({
  name: 'settings',
  initialState: INITIAL_STATE,
  reducers: {
    resetState: (state) => {
      return INITIAL_STATE;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(listSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(listSettings.fulfilled, (state, action) => {
        state.result = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(listSettings.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(updateCurrency.fulfilled, (state, action) => {
        state.result.money_format_settings = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateSettings.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateSettings.fulfilled, (state, action) => {
        state.result = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(updateSettings.rejected, (state) => {
        state.isLoading = false;
        state.isSuccess = false;
      });
  },
});

export const { resetState } = settingsSlice.actions;
export default settingsSlice.reducer;
