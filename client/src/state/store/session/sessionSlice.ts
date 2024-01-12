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

const sessionSlice = createSlice({
    name: 'session',
    initialState,
    reducers: {}
});

