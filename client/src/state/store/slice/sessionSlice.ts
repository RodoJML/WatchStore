import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import * as Fetch from './../../../model/fetch';
import type { DataEnvelope, AuthenticationEnvelope, UserItem, SpecItem } from './../../../model/fetch';

export interface Message {
    message: string | null,
    type: 'success' | 'danger' | 'warning' | 'info' | null
}

interface SessionState {
    signedIn: boolean,
    user: UserItem,
    isLoading: boolean,
    messages: Message[],
    brands: any[],
    styles: any[],
    types: any[],
    shapes: any[],
    movements: any[],
    bezels: any[],
    clasps: any[],
    bezel_materials: any[],
    case_materials: any[],
    glass_materials: any[],
    strap_materials: any[],
    redirectURL: string | null,
}

const initialState: SessionState = {
    signedIn: false,
    user: {
        user_id: null,
        user_type: 3,
        user_name: "Guest",
        user_email: "",
        user_password: null,
        user_views: 0,
        user_photo_path: null,
        user_registration_date: null,
    },
    isLoading: false,
    messages: [],
    brands: [],
    styles: [],
    types: [],
    shapes: [],
    movements: [],
    bezels: [],
    clasps: [],
    bezel_materials: [],
    case_materials: [],
    glass_materials: [],
    strap_materials: [],
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
            setLoading: (state, action: PayloadAction<{ value: boolean }>) => {
                state.isLoading = action.payload.value;
            },
            addMessage: (state, action: PayloadAction<Message>) => {
                state.messages.push(action.payload);
            },
            setRedirectURL: (state, action) => {
                state.redirectURL = action.payload;
            },
            logOut: (state) => {
                state.signedIn = false;
                state.user = {
                    user_id: null,
                    user_type: 3,
                    user_name: "Guest",
                    user_email: "",
                    user_password: null,
                    user_views: null,
                    user_photo_path: null,
                    user_registration_date: null,
                };
            }
        },
        extraReducers: (builder) => {
            builder.addCase(apiFetch.pending, (state) => {
                state.isLoading = true;
                state.messages.push({ message: 'Loading...', type: 'info' });
                console.log(state.messages[state.messages.length - 1]);
            });
            builder.addCase(apiFetch.fulfilled, (state, action) => {
                if(action.meta.arg.url === "brand") {
                    const sortedArray = action.payload.data.slice().sort((a: any, b: any) => a.brand_name.localeCompare(b.brand_name));
                    state.brands = sortedArray;
                }
                if(action.meta.arg.url === "style") state.styles = action.payload.data;
                if(action.meta.arg.url === "type") state.types = action.payload.data;
                if(action.meta.arg.url === "shape") state.shapes = action.payload.data;
                if(action.meta.arg.url === "movement") state.movements = action.payload.data;
                if(action.meta.arg.url === "bezel_type") state.bezels = action.payload.data;
                if(action.meta.arg.url === "clasp_type") state.clasps = action.payload.data;
                if(action.meta.arg.url === "bezel_material") state.bezel_materials = action.payload.data;
                if(action.meta.arg.url === "case_material") state.case_materials = action.payload.data;
                if(action.meta.arg.url === "glass_material") state.glass_materials = action.payload.data;
                if(action.meta.arg.url === "strap_material") state.strap_materials = action.payload.data;

                state.isLoading = false;
                state.messages.push({ message: 'Data received', type: 'success' });
                console.log(state.messages[state.messages.length - 1]);
            });
            builder.addCase(apiFetch.rejected, (state, action) => {
                state.isLoading = false;
                state.messages.push({ message: action.error.message ?? JSON.stringify(action.error), type: 'danger' });
                console.log(state.messages[state.messages.length - 1]);
            });
            builder.addCase(login.pending, (state) => {
                state.isLoading = true;
                state.messages.push({ message: 'Loading...', type: 'info' });
                console.log(state.messages[state.messages.length - 1]);
            });
            builder.addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages.push({ message: 'User received', type: 'success' });
                console.log(state.messages[state.messages.length - 1]);
                state.user = action.payload.data.user;
                // action.payload.data.token is also available, use it when you need it.
                state.signedIn = true;
            });
            builder.addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.messages.push({ message: action.error.message ?? JSON.stringify(action.error), type: 'danger' });
                console.log(state.messages[state.messages.length - 1]);
                state.signedIn = false;
            });
            builder.addCase(exist.pending, (state) => {
                state.isLoading = true;
                state.messages.push({ message: 'Loading...', type: 'info' });
                console.log(state.messages[state.messages.length - 1]);
            });
            builder.addCase(exist.fulfilled, (state) => {
                state.isLoading = false;
                state.messages.push({ message: 'Data received', type: 'success' });
                console.log(state.messages[state.messages.length - 1]);
            });
            builder.addCase(exist.rejected, (state, action) => {
                state.isLoading = false;
                state.messages.push({ message: action.error.message ?? JSON.stringify(action.error), type: 'danger' });
                console.log(state.messages[state.messages.length - 1]);
            });
            builder.addCase(signup.pending, (state) => {
                state.isLoading = true;
                state.messages.push({ message: 'Loading...', type: 'info' });
                console.log(state.messages[state.messages.length - 1]);
            });
            builder.addCase(signup.fulfilled, (state, action) => {
                state.isLoading = false;
                state.messages.push({ message: 'User received', type: 'success' });
                console.log(state.messages[state.messages.length - 1]);
                state.user = action.payload.data.user;
                // action.payload.data.token is also available, use it when you need it.
                state.signedIn = true;
            });
            builder.addCase(signup.rejected, (state, action) => {
                state.isLoading = false;
                state.messages.push({ message: action.error.message ?? JSON.stringify(action.error), type: 'danger' });
                console.log(state.messages[state.messages.length - 1]);
                state.signedIn = false;
            });
        }
    });

export const apiFetch = createAsyncThunk(
    "session/apiFetch",
    async (args: { url: string, data?: any, method?: string, headers?: any }) => {
        return await Fetch.api(`/fetch/${args.url}`, args.data, args.method, args.headers).catch((err) => { throw err; });
    },
)

export const login = createAsyncThunk(
    "session/login",
    async (user: { user_email: string, user_password: string }): Promise<DataEnvelope<AuthenticationEnvelope>> => {
        return await Fetch.api('/user/login', user, 'POST').catch((err) => { throw err; });
    },
)

export const signup = createAsyncThunk(
    "session/signup",
    async (signUpForm: any): Promise<DataEnvelope<AuthenticationEnvelope>> => {
        return await Fetch.api('/user/signup', signUpForm, 'POST').catch((err) => { throw err; });
    },
)  

export const exist = createAsyncThunk(
    "session/exist",
    async ({ column_name, key}: { column_name: string, key: string }): Promise<DataEnvelope<boolean>> => {
        if(key === '' || key === null || key === undefined){
            key = "generic";
        }
        return await Fetch.api(`/user/exist/${column_name}/${key}`).catch((err) => { throw err; });
    },
)

// We easily access to the actions by exporting from the slice.
// No extra code needed to export the actions.
export const { setUser, setLoading, addMessage, setRedirectURL, logOut } = sessionSlice.actions;
// Because we are using createSlice from redux toolkit,
// we can export the reducer and use it in the store.
// A lot is happening behind scenes that redux is doing for us.
export default sessionSlice.reducer;