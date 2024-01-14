import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Fetch from './../../../model/fetch';
import type { DataEnvelopeList, DataEnvelope } from './../../../model/fetch';
import { type Message } from './sessionSlice';

export interface BrandItem {
    brand_id: number,
    brand_name: string,
    brand_logo_path: string,
}

interface BrandsState {
    isLoading: boolean,
    messages: Message[],
    redirectURL: string | null,
}

const initialState: BrandsState = {
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
            builder.addCase(getAllBrands.pending, (state) => {
                state.messages.push({message: 'Loading...' , type: 'info'});
                state.isLoading = true;
                console.log(state.messages[state.messages.length - 1]);
            });
            builder.addCase(getAllBrands.fulfilled, (state) => {
                state.messages.push({message: 'Data received' , type: 'success'});
                state.isLoading = false;
                console.log(state.messages[state.messages.length - 1]);
            });
            builder.addCase(getAllBrands.rejected, (state, action) => {
                state.messages.push({message: action.error.message ?? JSON.stringify(action.error) , type: 'danger'}); 
                console.log(state.messages[state.messages.length - 1]);
            });
            builder.addCase(getOneBrand.pending, (state) => {
                state.messages.push({message: 'Loading...' , type: 'info'});
                state.isLoading = true;
                console.log(state.messages[state.messages.length - 1]);
            });
            builder.addCase(getOneBrand.fulfilled, (state) => {
                state.messages.push({message: 'Data received' , type: 'success'});
                state.isLoading = false;
                console.log(state.messages[state.messages.length - 1]);
            });
            builder.addCase(getOneBrand.rejected, (state, action) => {
                state.messages.push({message: action.error.message ?? JSON.stringify(action.error) , type: 'danger'}); 
                console.log(state.messages[state.messages.length - 1]);
            });
        }
    }
);


export const getAllBrands = createAsyncThunk(
    "brands/getAllBrands",
    async (): Promise<DataEnvelopeList<BrandItem>> => {
        return await Fetch.api('/brands').catch((err) => {throw err;});
    },
)

export const getOneBrand = createAsyncThunk(
    "brands/getOneBrand",
    async (id: number): Promise<DataEnvelope<BrandItem>> => {
        return await Fetch.api(`/brands/${id}`).catch((err) => {throw err;});
    },
)


export default brandsSlice.reducer;