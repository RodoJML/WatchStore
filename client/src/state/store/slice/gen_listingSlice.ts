import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as Fetch from '../../../model/fetch';
import * as Interfaces from '../../../model/interfaces';
import { DataEnvelope } from "../../../model/interfaces";

interface gen_listingState{
    isLoading: boolean,
    redirectURL: string | null,
}

const initialState: gen_listingState = {
    isLoading: false,
    redirectURL: null,
}

const gen_listingSlice = createSlice({
    name: 'gen_listing',
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
    'gen_listing/addFromListing',
    async(gen_listing: Interfaces.Gen_listingItem): Promise<DataEnvelope<boolean>> => {
        return await Fetch.api('/gen_listing/addFromListing', gen_listing, 'POST').catch((err) => {throw err; });
    }
)

export default gen_listingSlice.reducer;