const API_URL = import.meta.env.VITE_API_URL as string;

export function rest(url: string, data?: any, method?: string, headers?: any) {
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

// Just a reminder, type has more features than interface
// The T type is the type of the data that is returned from the API
export type DataEnvelope<T> = {
    data: T,
    isSuccess: boolean,
    error?: string, 
}

export type DataEnvelopeList<T> = DataEnvelope<T[]> & {
    total: number,
}

export interface UserItem{
    user_id: number,
    user_type: number,
    user_name: string,
    user_password: string,
    user_views: number,
}

export interface RegLogItem{

    reg_phone: string,
    reg_date: Date, // Need to double check on this 
    reg_email: string,
    reg_user_id: number,
}

export interface UserInfoItem{
    info_user_id: number,
    info_user_first_name: string,
    info_user_last_name: string,
    info_user_phone1: number,
    info_user_phone2: number,
    info_user_phone3: number,
    info_user_address1: string,
    info_user_address2: string,
    info_user_province: string,
}

export interface StoreItem{
    store_id: number,
    store_user_id: number,
    store_name: string,
    store_about: string,
    store_photo: string,
}

export interface ListingItem {
    listing_stock_id: number,
    listing_stock_user_id: number,
    listing_description: string,
    listing_status: number,
    listing_thumbnail: string,
    listing_guarantee: number,
    listing_views: number,
    listing_featured: number,
    listing_unit_cprince: number,
    listing_unit_drice: number,
}