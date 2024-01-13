import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Fetch from './../../../model/fetch';
import type { DataEnvelopeList, DataEnvelope } from './../../../model/fetch';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../store';
import { setLoading } from './sessionSlice';

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
                const dispatch = useDispatch<AppDispatch>();
                dispatch(setLoading({value: true}));
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
        }
    }
);


export const getAll = createAsyncThunk(
    "brands/getAll",
    async (): Promise<DataEnvelopeList<BrandItem>> => {
        return await Fetch.api("/brands", null, "GET");
    },
)


export default brandsSlice.reducer;