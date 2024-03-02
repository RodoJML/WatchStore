import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import * as Fetch from './../../../model/fetch';
import * as Interfaces from './../../../model/interfaces';
import { DataEnvelope } from "./../../../model/interfaces";

interface gen_specsState{
    isLoading: boolean,
    redirectURL: string | null,
}

const initialState: gen_specsState = {
    isLoading: false,
    redirectURL: null,
}

const gen_specsSlice = createSlice({
    name: 'gen_specs',
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
    'gen_specs/addFromListing',
    async(gen_specs: Interfaces.Gen_specsItem): Promise<DataEnvelope<number>> => {
        return await Fetch.api('/gen_specs/addFromListing', gen_specs, 'POST').catch((err) => {throw err; });
    }
)

export default gen_specsSlice.reducer;