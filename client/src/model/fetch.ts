const API_URL = import.meta.env.VITE_API_URL as string;

export function rest(url: string, data?: any, method?: string, headers?: any) {

    console.log('fetching', url, data, method, headers);
    
    return fetch(url, 
        {
            method: method ?? (data ? 'POST' : 'GET'),
            headers: { 'Content-Type': 'application/json', ...headers },
            body: data ? JSON.stringify(data) : undefined

        }
    ).then(res => res.ok ? res.json() : res.json().then(x => {throw({...x, message: x.error})}));
}

export function api(url: string, data?: any, method?: string, headers?: any){
    return rest(API_URL + url, data, method, headers);
}

export type DataEnvelope<T> = {
    data: T,
    isSuccess: boolean,
    error?: string, 
}
// The T type is the type of the data that is returned from the API

export type DataEnvelopeList<T> = DataEnvelope<T[]> & {
    total: number,
}