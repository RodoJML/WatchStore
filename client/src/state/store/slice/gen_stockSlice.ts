import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as Fetch from './../../../model/fetch';
import * as Interfaces from './../../../model/interfaces';
import { DataEnvelope } from "./../../../model/interfaces";

interface gen_stockState{
    isLoading: boolean,
    redirectURL: string | null,
} 

const initialState: gen_stockState = {
    isLoading: false,
    redirectURL: null,
}

const orig_stockSlice = createSlice({
    name: 'gen_stock',
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
    'gen_stock/addFromListing',
    async(gen_stock: Interfaces.Gen_stockItem): Promise<DataEnvelope<number>> => {
        return await Fetch.api('/gen_stock/addFromListing', gen_stock, 'POST').catch((err) => {throw err; });
    }
)

export default orig_stockSlice.reducer;