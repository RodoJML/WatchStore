import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { DataEnvelope, StoreItem } from "../../../model/interfaces";
import * as Fetch from '../../../model/fetch'

interface storeState{
    isLoading: boolean,
    redirectURL: string | null,
}

const initialState: storeState = {
    isLoading: false,
    redirectURL: null,
}

const storeSlice = createSlice({
    name: 'store',
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
        builder.addCase(addFromListing.rejected, (state ) => {
            state.isLoading = false;
        })
    }
});

export const addFromListing = createAsyncThunk(
    'store/addFromListing',
    // This is only used for unregistered users when they add a new listing.
    async(store: StoreItem): Promise<DataEnvelope<boolean>> => {
        return await Fetch.api('/store/addFromListing', store, 'POST').catch((err) => {throw err; });
    }
)
