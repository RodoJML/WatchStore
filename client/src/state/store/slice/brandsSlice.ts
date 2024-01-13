import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Fetch from './../../../model/fetch';
import type { DataEnvelopeList, DataEnvelope } from './../../../model/fetch';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

export interface BrandItem {
    brand_id: number,
    brand_name: string,
    brand_logo: string,
}

interface BrandsState {
    data: DataEnvelopeList<BrandItem> | DataEnvelope<BrandItem> | null,
    isLoading: boolean,
}

const initialState: BrandsState = {
    data: null,
    isLoading: false,
}

const brandsSlice = createSlice(
    {
        name: 'brands',
        initialState,
        reducers: {},
        extraReducers: (builder) => {
            builder.addCase(getAll.pending, () => {
                console.log('pending');
                const session = useSelector((state: RootState) => state.session);
                session.messages.push({message: 'pending', type: 'info'});
                session.isLoading = true;
            });
            builder.addCase(getAll.fulfilled, (state, action) => {
                console.log('fulfilled');
                const session = useSelector((state: RootState) => state.session);
                session.messages.push({message: 'loaded', type: 'info'});
                session.isLoading = false;
                state.data = action.payload;
            });
            builder.addCase(getAll.rejected, (state) => {
                state.isLoading = false;
            });
            builder.addCase(getOne.pending, (state) => {
                console.log('pending');
                state.isLoading = true;
            });
            builder.addCase(getOne.fulfilled, (state, action) => {
                console.log('fulfilled');
                state.isLoading = false;
                state.data = action.payload;
            });
            builder.addCase(getOne.rejected, (state) => {
                state.isLoading = false;
            });
            builder.addCase(create.pending, (state) => {
                console.log('pending');
                state.isLoading = true;
            });
            builder.addCase(create.fulfilled, (state, action) => {
                console.log('fulfilled');
                state.isLoading = false;
                state.data = action.payload;
            });
            builder.addCase(create.rejected, (state) => {
                // const session = useSelector((state: RootState) => state.session);
                // session.messages.push({message: JSON.stringify(action.error), type: 'danger'});
                state.isLoading = false;
            });
            builder.addCase(update.pending, (state) => {
                console.log('pending');
                state.isLoading = true;
            });
            builder.addCase(update.fulfilled, (state, action) => {
                console.log('fulfilled');
                state.isLoading = false;
                state.data = action.payload;
            });
            builder.addCase(update.rejected, (state) => {
                state.isLoading = false;
            });
            builder.addCase(remove.pending, (state) => {
                console.log('pending');
                state.isLoading = true;
            });
            builder.addCase(remove.fulfilled, (state, action) => {
                console.log('fulfilled');
                state.isLoading = false;
                state.data = action.payload;
            });
            builder.addCase(remove.rejected, (state) => {
                state.isLoading = false;
            });
        }
    }
);


export const getAll = createAsyncThunk(
    "brands/getAll",
    async (): Promise<DataEnvelopeList<BrandItem>> => {
        return await Fetch.api("/brands", null, "GET");
    },
)

export const getOne = createAsyncThunk(
    "brands/getOne",
    async (args: {id: number}): Promise<DataEnvelope<BrandItem>> => {
        return await Fetch.api(`/brands/${args.id}`, null, "GET");
    },
)

export const create = createAsyncThunk(
    "brands/create",
    async (args: {data: BrandItem}): Promise<DataEnvelope<BrandItem>> => {
        return await Fetch.api("/brands", args.data, "POST");
    },
)

export const update = createAsyncThunk(
    "brands/update",
    async (args: {id: number, data: BrandItem}): Promise<DataEnvelope<BrandItem>> => {
        return await Fetch.api(`/brands/${args.id}`, args.data, "PUT");
    },
)

export const remove = createAsyncThunk(
    "brands/remove",
    async (args: {id: number}): Promise<DataEnvelope<BrandItem>> => {
        return await Fetch.api(`/brands/${args.id}`, null, "DELETE");
    },
)

export default brandsSlice.reducer;