import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as Fetch from './../../../model/fetch';
import * as Interfaces from './../../../model/interfaces';
import { DataEnvelope } from "./../../../model/interfaces";

interface orig_stockState{
    isLoading: boolean,
    redirectURL: string | null,
} 

const initialState: orig_stockState = {
    isLoading: false,
    redirectURL: null,
}

const orig_stockSlice = createSlice({
    name: 'orig_stock',
    initialState,
    reducers: {
        // None by now
    },
    extraReducers: (builder) => {
        builder.addCase(addFromListing.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(addFromListing.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(addFromListing.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export const addFromListing = createAsyncThunk(
    'orig_stock/addFromListing',
    async(orig_stock: Interfaces.Orig_stockItem): Promise<DataEnvelope<boolean>> => {
        return await Fetch.api('/orig_stock/addFromListing', orig_stock, 'POST').catch((err) => {throw err; });
    }
)

export default orig_stockSlice.reducer;