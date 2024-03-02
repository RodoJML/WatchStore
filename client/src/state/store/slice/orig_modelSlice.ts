import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as Fetch from './../../../model/fetch';
import * as Interfaces from './../../../model/interfaces';
import { DataEnvelope } from "./../../../model/interfaces";

interface orig_modelState{
    isLoading: boolean,
    redirectURL: string | null,
} 

const initialState: orig_modelState = {
    isLoading: false,
    redirectURL: null,
}

const orig_modelSlice = createSlice({
    name: 'orig_model',
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
    'orig_model/addFromListing',
    async(orig_model: Interfaces.Orig_modelItem): Promise<DataEnvelope<number>> => {
        // Returns the autoincremented ID from the db.
        return await Fetch.api('/orig_model/addFromListing', orig_model, 'POST').catch((err) => {throw err; });
    }
)

export default orig_modelSlice.reducer;