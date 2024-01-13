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
                state.messages.push({message: 'Loading...' , type: 'info'});
                state.isLoading = true;
            });
            builder.addCase(getAll.fulfilled, (state, action) => {
                state.messages.push({message: 'Response received from server' , type: 'success'});
                state.data = action.payload;
            });
            builder.addCase(getAll.rejected, (state, action) => {
                state.messages.push({message: action.error.message ?? JSON.stringify(action.error) , type: 'danger'});
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