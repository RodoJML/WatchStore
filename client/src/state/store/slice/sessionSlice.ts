import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { api } from '../../../model/fetch'

interface Message{
    message: string,
    type: 'success' | 'danger' | 'warning' | 'info'
}

interface SessionState {
    user: undefined | null,
    isLoading: boolean,
    messages: Message[],
    redirectURL: string | null,
}

const initialState: SessionState = {
    user: undefined,
    isLoading: false,
    messages: [],
    redirectURL: null,
}

const sessionSlice = createSlice(
    {
    name: 'session',
    initialState,
    reducers: {
        // This can be done only because we are using createSlice from redux toolkit.
        // Looks like we are mutating the state, but nope, redux toolkit is doing it for us.
        setUser: (state, action) => {
            state.user = action.payload;
        },
        setLoading: (state, action: PayloadAction<{value: boolean}>) => {
            state.isLoading = action.payload.value;
        },
        addMessage: (state, action: PayloadAction<Message>) => {
            state.messages.push(action.payload);
        },
        setRedirectURL: (state, action) => {
            state.redirectURL = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder.addCase(apiFetch.pending, (state) => {
            console.log('pending');
            state.isLoading = true;
        });
        builder.addCase(apiFetch.fulfilled, (state, action) => {
            console.log('fulfilled');
            console.log(action.payload);
            state.isLoading = false;
        });
        builder.addCase(apiFetch.rejected, (state) => {
            state.isLoading = false;
        });
    }
});

export const apiFetch = createAsyncThunk(
    "session/apiFetch",
    async () => {
        await new Promise(resolve => setTimeout(resolve, 3000));
        return await api( url, null, 'GET', null);
    }
)

// We easily access to the actions by exporting from the slice.
// No extra code needed to export the actions.
export const { setUser, setLoading, addMessage, setRedirectURL } = sessionSlice.actions;
// Because we are using createSlice from redux toolkit,
// we can export the reducer and use it in the store.
// A lot is happening behind scenes that redux is doing for us.
export default sessionSlice.reducer;


