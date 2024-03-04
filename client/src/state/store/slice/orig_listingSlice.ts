import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as Fetch from '../../../model/fetch';
import * as Interfaces from '../../../model/interfaces';
import { DataEnvelope } from "../../../model/interfaces";

interface orig_listingState{
    isLoading: boolean,
    redirectURL: string | null,
}

const initialState: orig_listingState = {
    isLoading: false,
    redirectURL: null,
}

const orig_listingSlice = createSlice({
    name: 'orig_listing',
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
    'orig_listing/addFromListing',
    async(orig_listing: Interfaces.Orig_listingItem): Promise<DataEnvelope<boolean>> => {
        return await Fetch.api('/orig_listing/addFromListing', orig_listing, 'POST').catch((err) => {throw err; });
    }
)

export default orig_listingSlice.reducer;