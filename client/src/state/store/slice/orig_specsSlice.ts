import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as Fetch from '../../../model/fetch';
import * as Interfaces from '../../../model/interfaces';
import { DataEnvelope } from "../../../model/interfaces";

interface original_specsState{
    isLoading: boolean,
    redirectURL: string | null,
}

const initialState: original_specsState = {
    isLoading: false,
    redirectURL: null,
}

const original_specsSlice = createSlice({
    name: 'original_specs',
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
    'original_specs/addFromListing',
    async(original_specs: Interfaces.Original_specsItem): Promise<DataEnvelope<boolean>> => {
        return await Fetch.api('/original_specs/addFromListing', original_specs, 'POST').catch((err) => {throw err; });
    }
)

export default original_specsSlice.reducer;