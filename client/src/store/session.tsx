import * as Fetch from '../model/fetch'
import { configureStore } from '@reduxjs/toolkit'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const defaultSession = {
    user: null,
    isLoading: false,
    messages: [] as { msg: string, type: 'sucess' | 'danger' | 'warning' | 'info' }[],
    redirectURL: null as string | null,
}

// When using createSlice from Redux Toolkit, you don't need to write action creators or action types by hand.
export const session = createSlice({
    name: 'session',
    initialState: defaultSession,
    reducers: {
        setUser: () => {},
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload
        },
        setMessages: (state, action: PayloadAction<{ msg: string, type: 'sucess' | 'danger' | 'warning' | 'info' }[]>) => {
            state.messages = action.payload
        },
        setRedirectURL: (state, action: PayloadAction<string | null>) => {
            state.redirectURL = action.payload
        },
    }
})

export const store = configureStore({
    reducer: {
        session: session.reducer
    }
})

export function api(url: string, data?: any, method?: string, headers?: any) {
    
    session.actions.setIsLoading(true)

    return Fetch.api(url, data, method, headers)
        .catch( (error) => {
            session.actions.setMessages([{ msg: error.message, type: 'danger' }])
            throw error
        })
        .finally(() => session.actions.setIsLoading(false))
}

export function useSession() {
    return defaultSession
}

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const { setUser, setIsLoading, setMessages, setRedirectURL } = session.actions
export default store

