import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Fetch from './../../../model/fetch';
import type { DataEnvelope, DataEnvelopeList, UserItem } from './../../../model/interfaces';
import type { Listing_mainForm } from './../../../pages/NewListing';
import { type Message } from './sessionSlice';
import type { ListingPreviewItem } from './../../../model/interfaces';

interface listingsState {
    isLoading: boolean,
    listingsPreviews: ListingPreviewItem[],
    hasMore: boolean,
    searchMode: boolean,
    searchInitiated: boolean,
    lastSearch: string | undefined,
    page: number,
    messages: Message[],
    redirectURL: string | null,
}

const initialState: listingsState = {
    isLoading: false,
    listingsPreviews: [],
    searchMode: false,
    searchInitiated: false,
    lastSearch: undefined,
    page: 1,
    hasMore: true,
    messages: [],
    redirectURL: null,
}

const listingSlice = createSlice({
    name: 'listings',
    initialState,
    reducers: {
        searchModeOn: (state) => {
            state.searchMode = true;
        },
        searchModeOff: (state) => {
            state.searchMode = false;
            state.page = 1;
            state.listingsPreviews = [];
            state.lastSearch = undefined;
            state.hasMore = true;
            console.log('searchModeOff');
        },
        searchInitiatedOFF: (state) => {
            state.searchInitiated = false;
        },
        resetPage: (state) => {
            state.page = 1;
        },
        incrementPage: (state) => {
            state.page++;
        },
        setRedirectURL: (state, action) => {
            state.redirectURL = action.payload;
        },
    },
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
            state.searchInitiated = true;
            state.isLoading = false;
            state.hasMore = action.payload.total > 0;

            if (action.meta.arg.query !== state.lastSearch) {
                state.page = 1;
                state.listingsPreviews = [];
            }

            if (action.meta.arg.query === state.lastSearch && action.meta.arg.page === 1) {
                state.listingsPreviews = [...action.payload.data.reduce((acc, val) => acc.concat(val), [])];
            } else {
                state.listingsPreviews = [...state.listingsPreviews, ...action.payload.data.reduce((acc, val) => acc.concat(val), [])];
            }

            state.lastSearch = action.meta.arg.query;
            console.log(state.messages[state.messages.length - 1]);
        });
        builder.addCase(search.rejected, (state, action) => {
            state.messages.push({ message: action.error.message ?? JSON.stringify(action.error), type: 'danger' });
            console.log(state.messages[state.messages.length - 1]);
        });
        builder.addCase(guestHasListing.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(guestHasListing.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(guestHasListing.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.error);
        });
        builder.addCase(unregistered_addListing.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(unregistered_addListing.fulfilled, (state) => {
            state.isLoading = false;
        });
        builder.addCase(unregistered_addListing.rejected, (state, action) => {
            state.isLoading = false;
            console.log(action.error);
        });

    },
});

export const getAll_previews = createAsyncThunk(
    'listings/getAll_previews',
    async (page: number): Promise<DataEnvelopeList<ListingPreviewItem[]>> => {
        return await Fetch.api(`/listing/previews?page=${page}&pageSize=${10}`).catch((err) => { throw err; });
    }
)

export const search = createAsyncThunk(
    'listings/search',
    async ({ query, page }: { query: string | undefined, page: number | undefined }): Promise<DataEnvelopeList<ListingPreviewItem[]>> => {
        return await Fetch.api(`/listing/previews?key=${query}&page=${page}&pageSize=${10}`).catch((err) => { throw err; });
    }
)

export const guestHasListing = createAsyncThunk(
    'listings/guestHasListing',
    async (stock_store_user_id: number): Promise<DataEnvelope<boolean>> => {
        return await Fetch.api(`/listing/guestHasListing?key=${stock_store_user_id}`).catch((err) => { throw err; });
    }
)

export const unregistered_addListing = createAsyncThunk(
    'listings/unregistered_addListing',
    async (listing_mainForm: Listing_mainForm ): Promise<DataEnvelope<string>> => {
        return await Fetch.api(`/listing/unregistered_addListing`, listing_mainForm, 'POST').catch((err) => { throw err; });
    }
)

export const registered_addListing = createAsyncThunk(
    'listings/registered_addListing', async (args: {listing_mainForm: Listing_mainForm, user: UserItem}): Promise<DataEnvelope<string>> => {
        args.listing_mainForm.step4.user_id = args.user.user_id;
        return await Fetch.api('/secure_listing/registered_addListing', args.listing_mainForm, 'POST', { 'Authorization': 'Bearer ' + args.user.user_token})
    }
)

export const addPhotos = createAsyncThunk(
    'listings/addphotos', async (photos: FormData): Promise<DataEnvelope<string>> => {
        return await Fetch.api('/listing/addPhotos', photos, 'POST');
    }
)

export const { searchModeOn, searchModeOff, incrementPage, searchInitiatedOFF } = listingSlice.actions;

export default listingSlice.reducer;


