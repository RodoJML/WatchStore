import { createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import { DataEnvelope, UserItem } from "../../../model/interfaces";
import * as Fetch from '../../../model/fetch'

interface userState{
    isLoading: boolean,
    redirectURL: string | null,
}

const initialState: userState = {
    isLoading: false,
    redirectURL: null,
}

const userSlice = createSlice({
    name: 'user',
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
    'user/addFromListing',
    // This is only used for unregistered users when they add a new listing.
    async(user: UserItem): Promise<DataEnvelope<boolean>> => {
        return await Fetch.api('/user/addFromListing', user, 'POST').catch((err) => { throw err; });
    }
)   

export default userSlice.reducer;