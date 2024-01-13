import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Fetch from './../../../model/fetch';
import type { DataEnvelopeList, DataEnvelope } from './../../../model/fetch';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setLoading } from './sessionSlice';


export interface BrandItem {
    brand_id: number,
    brand_name: string,
    brand_logo: string,
}

interface Message{
    message: string,
    type: 'success' | 'danger' | 'warning' | 'info'
}

interface BrandsState {
    data: DataEnvelopeList<BrandItem> | DataEnvelope<BrandItem> | null,
    isLoading: boolean,
    messages: Message[],
    redirectURL: string | null,
}

const initialState: BrandsState = {
    data: null,
    isLoading: false,
    messages: [],
    redirectURL: null,
}

const brandsSlice = createSlice(
    {
        name: 'brands',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(getAll.pending, (state) => {
                state.isLoading = true;
            });
            builder.addCase(getAll.fulfilled, (state, action) => {
                state.data = action.payload;
            });
            builder.addCase(getAll.rejected, (state, action) => {
                state.data?.error = JSON.stringify(action.error);
                state.isLoading = false;
            });
        }
    }
);


export const getAll = createAsyncThunk(
    "brands/getAll",
    async (): Promise<DataEnvelopeList<BrandItem>> => {
        return await Fetch.api('/brands').then((res) => {
            return res;
    },
)


export default brandsSlice.reducer;