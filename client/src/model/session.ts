import { useReducer } from "react";
import * as Fetch from './fetch'

const defaultSession = {
    user: null,
    isLoading: false,
    messages: [] as { msg: string, type: 'sucess' | 'danger' | 'warning' | 'info' }[],
    redirectURL: null as string | null,
}

export default function Session() {

    function reducer(state: typeof defaultSession, action: any) {
        switch (action.type) {
            case 'login':
                return { ...state, user: action.user, isLoading: false, redirectURL: null };
            case 'logout':
                return { ...state, user: null, isLoading: false, redirectURL: null };
            case 'loading':
                return { ...state, isLoading: true };
            case 'stop-loading':
                return { ...state, isLoading: false };
            case 'message':
                return { ...state, messages: [...state.messages, action.message] };
            case 'clear-messages':
                return { ...state, messages: [] };
            case 'redirect':
                return { ...state, redirectURL: action.url };
            default:
                return state;
        }
    }

    const [session, dispatch] = useReducer(reducer, defaultSession);
    return { session, dispatch };
}


export function api(url: string, data?: any, method?: string, headers?: any) {

    Session().dispatch({ type: 'loading' });

    return Fetch.api(url, data, method, headers)
        .catch(err => {
            console.error({ err });
            Session().dispatch({ type: 'message', message: { msg: err.message ?? JSON.stringify(err), type: 'danger' } });
        })
        .finally(() => Session().dispatch({ type: 'stop-loading' }));

};