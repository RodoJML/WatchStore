import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Fetch from './../../../model/fetch';
import type { DataEnvelopeList, DataEnvelope, ListingItem } from './../../../model/fetch';
import { type Message } from './sessionSlice';

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
        builder.addCase(getAllListings.pending, (state) => {
            state.messages.push({message: 'Loading...' , type: 'info'});
            state.isLoading = true;
            console.log(state.messages[state.messages.length - 1]);
        }
        );
        builder.addCase(getAllListings.fulfilled, (state) => {
            state.messages.push({message: 'Data received' , type: 'success'});
            state.isLoading = false;
            console.log(state.messages[state.messages.length - 1]);
        });
        builder.addCase(getAllListings.rejected, (state, action) => {
            state.messages.push({message: action.error.message ?? JSON.stringify(action.error) , type: 'danger'}); 
            console.log(state.messages[state.messages.length - 1]);
        });
    },
});

export const getAllListings = createAsyncThunk(
    'listings/getAllListings',
    async (): Promise<DataEnvelopeList<ListingItem>> => {
        return await Fetch.api('/fetch/orig_listing/').catch((err) => {throw err;});
    }
)

export default listingSlice.reducer;

    
