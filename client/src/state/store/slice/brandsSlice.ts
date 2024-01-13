import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Fetch from './../../../model/fetch';
import type { DataEnvelopeList, DataEnvelope } from './../../../model/fetch';

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
    item: DataEnvelope<BrandItem> | null,
    items: DataEnvelopeList<BrandItem> | null, 
    isLoading: boolean,
    messages: Message[],
    redirectURL: string | null,
}

const initialState: BrandsState = {
    item: null,
    items: null,
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
                state.messages.push({message: 'Loading...' , type: 'info'});
                state.isLoading = true;
                console.log(state.messages[state.messages.length - 1]);
            });
            builder.addCase(getAll.fulfilled, (state, action) => {
                state.messages.push({message: 'Data received' , type: 'success'});
                state.isLoading = false;
                state.items = action.payload;
                console.log(state.messages[state.messages.length - 1]);
            });
            builder.addCase(getAll.rejected, (state, action) => {
                state.messages.push({message: action.error.message ?? JSON.stringify(action.error) , type: 'danger'}); 
                console.log(state.messages[state.messages.length - 1]);
            });
        }
    }
);


export const getAll = createAsyncThunk(
    "brands/getAll",
    async (): Promise<DataEnvelopeList<BrandItem>> => {
        return await Fetch.api('/brands').catch((err) => {throw err;});
    },
)


export default brandsSlice.reducer;