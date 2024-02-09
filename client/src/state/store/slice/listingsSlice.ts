import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Fetch from './../../../model/fetch';
import type { DataEnvelopeList } from './../../../model/fetch';
import { type Message } from './sessionSlice';

export interface ListingPreviewItem {
    stock_id: number,
    store_user_id: number,
    brand: string,
    model: string,
    cprice: number,
    dprice: number | null,
    movement: string,
    width: number,
    condition: number,
    guarantee: number,
    store_name: string,
    quantity: number,
    location: string | null,
    user_name: string,
    date: Date,
    views: number,
    listing_type: number,
    rating: number,
}

interface listingsState {
    isLoading: boolean,
    messages: Message[],
    redirectURL: string | null,
}

const initialState: listingsState = {
    isLoading: false,
    messages: [],
    redirectURL: null,
}

const listingSlice = createSlice({
    name: 'listings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAll_previews.pending, (state) => {
            state.messages.push({message: 'Loading...' , type: 'info'});
            state.isLoading = true;
            console.log(state.messages[state.messages.length - 1]);
        }
        );
        builder.addCase(getAll_previews.fulfilled, (state, action) => {
            state.messages.push({message: 'Data received' , type: 'success'}); 
            state.isLoading = false;
            console.log(state.messages[state.messages.length - 1]);
        });
        builder.addCase(getAll_previews.rejected, (state, action) => {
            state.messages.push({message: action.error.message ?? JSON.stringify(action.error) , type: 'danger'}); 
            console.log(state.messages[state.messages.length - 1]);
        });
    },
});

export const getAll_previews = createAsyncThunk(
    'listings/getAll_previews',
    async (page: number): Promise<DataEnvelopeList<ListingPreviewItem[]>> => {
        return await Fetch.api(`/listing/previews?page=${page}&pageSize=${2}`).catch((err) => {throw err;});
    }
)


export default listingSlice.reducer;

    
