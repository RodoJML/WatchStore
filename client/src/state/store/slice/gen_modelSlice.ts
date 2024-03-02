import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {DataEnvelope, Gen_modelItem} from "../../../model/interfaces";
import * as Fetch from '../../../model/fetch'

interface gen_modelState{
    isLoading: boolean,
    redirectURL: string | null,
}

const initialState: gen_modelState = {
    isLoading: false,
    redirectURL: null,
}

const gen_modelSlice = createSlice({
    name: 'gen_model',
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
    'gen_model/addFromListing',
    async(gen_model: Gen_modelItem): Promise<DataEnvelope<number>> => {
        // Returns the autoincremented ID from the db.
        return await Fetch.api('/gen_model/addFromListing', gen_model, 'POST').catch((err) => {throw err; });
    }
)
