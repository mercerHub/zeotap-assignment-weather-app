import { Weather } from "@/app/types/weather";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    weather: null as Weather[] | null,
    loading: false,
    error: null as string | null
}

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (cities:string[]) => {
    const response = await axios.post('/api/update-weather', { cities });
    return response.data;
})

const weatherSlice = createSlice({
    name: 'weather',
    initialState,
    reducers: {
        getWeather(state) {
            state.loading = true;
        },
        getWeatherSuccess(state, action: PayloadAction<Weather[]>) {
            state.weather = action.payload;
            state.loading = false;
        },
        getWeatherError(state, action: PayloadAction<string>) {
            state.error = action.payload;
            state.loading = false;
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchWeather.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchWeather.fulfilled, (state, action) => {
            state.weather = action.payload;
            state.loading = false;
        });
        builder.addCase(fetchWeather.rejected, (state, action) => {
            state.error = action.error.message || 'Failed to fetch weather data';
            state.loading = false;
        });
    }
});

export const { getWeather, getWeatherSuccess, getWeatherError } = weatherSlice.actions;
export default weatherSlice.reducer;