import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Fetch from './../../../model/fetch';
import type { DataEnvelopeList } from './../../../model/fetch';
import { type Message } from './sessionSlice';

export interface ListingPreviewItem {
    stock_id: number,
    store_user_id: number,
    brand: string,
    model: string,
    cprice: number,
    dprice: number | null,
    movement: string,
    width: number,
    condition: number,
    guarantee: number,
    store_name: string,
    quantity: number,
    location: string | null,
    user_name: string,
    date: Date,
    views: number,
    listing_type: number,
    rating: number,
}

interface listingsState {
    isLoading: boolean,
    listingsPreviews: ListingPreviewItem[],
    hasMore: boolean,
    searchMode: boolean,
    messages: Message[],
    redirectURL: string | null,
}

const initialState: listingsState = {
    isLoading: false,
    listingsPreviews: [],
    searchMode: false,
    hasMore: true,
    messages: [],
    redirectURL: null,
}

const listingSlice = createSlice({
    name: 'listings',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getAll_previews.pending, (state) => {
            state.messages.push({ message: 'Loading...', type: 'info' });
            state.isLoading = true;
            console.log(state.messages[state.messages.length - 1]);
        }
        );
        builder.addCase(getAll_previews.fulfilled, (state, action) => {
            state.messages.push({ message: 'Data received', type: 'success' });
            state.isLoading = false;
            state.hasMore = action.payload.total > 0;
            state.listingsPreviews = [...state.listingsPreviews, ...action.payload.data.reduce((acc, val) => acc.concat(val), [])];
            // to remove duplicates from  state.listingsPreviews
            state.listingsPreviews = state.listingsPreviews.filter(
                (value, index, self) =>
                    self.findIndex(v => v.stock_id === value.stock_id && v.store_user_id === value.store_user_id) === index);

            console.log(state.messages[state.messages.length - 1]);
        });
        builder.addCase(getAll_previews.rejected, (state, action) => {
            state.messages.push({ message: action.error.message ?? JSON.stringify(action.error), type: 'danger' });
            console.log(state.messages[state.messages.length - 1]);
        });
        builder.addCase(search.pending, (state) => {
            state.messages.push({ message: 'Loading...', type: 'info' });
            state.isLoading = true;
            console.log(state.messages[state.messages.length - 1]);
        }
        );
        builder.addCase(search.fulfilled, (state, action) => {
            state.messages.push({ message: 'Data received', type: 'success' });
            state.isLoading = false;
            state.hasMore = action.payload.total > 0;
            state.listingsPreviews = [...action.payload.data.reduce((acc, val) => acc.concat(val), [])];
            console.log(state.messages[state.messages.length - 1]);
        });
        builder.addCase(search.rejected, (state, action) => {
            state.messages.push({ message: action.error.message ?? JSON.stringify(action.error), type: 'danger' });
            console.log(state.messages[state.messages.length - 1]);
        });
    },
});

export const getAll_previews = createAsyncThunk(
    'listings/getAll_previews',
    async (page: number): Promise<DataEnvelopeList<ListingPreviewItem[]>> => {
        console.log('dispatching');
        return await Fetch.api(`/listing/previews?page=${page}&pageSize=${2}`).catch((err) => { throw err; });
    }
)

export const search = createAsyncThunk(
    'listings/search',
    async (query: string | undefined): Promise<DataEnvelopeList<ListingPreviewItem[]>> => {
        return await Fetch.api(`/listing/previews?key=${query}`).catch((err) => { throw err; });
    }
)


export default listingSlice.reducer;


