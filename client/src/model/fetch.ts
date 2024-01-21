const API_URL = import.meta.env.VITE_API_URL as string;

export function rest(url: string, data?: any, method?: string, headers?: any) {
    return fetch(url,
        {
            method: method ?? (data ? 'POST' : 'GET'),
            headers: { 'Content-Type': 'application/json', ...headers },
            body: data ? JSON.stringify(data) : undefined

        }
    ).then(res => res.ok ? res.json() : res.json().then(x => { throw ({ ...x, message: x.error }) }));
}

export function api(url: string, data?: any, method?: string, headers?: any) {
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

export interface UserItem {
    user_id: number,
    user_type: number,
    user_name: string,
    user_password: string,
    user_views: number,
}

export interface RegLogItem {

    reg_phone: string,
    reg_date: Date, // Need to double check on this 
    reg_email: string,
    reg_user_id: number,
}

export interface UserInfoItem {
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

export interface StoreItem {
    store_user_id: number,
    store_name: string,
    store_about: string,
    store_photo: string,
}

export interface BrandItem {
    brand_id: number,
    brand_name: string,
    brand_logo: string,
    brand_website: string,
}

export interface CountryItem {
    country_id: number,
    country_name: string,
    country_emoji: string,
}

export interface OriginalModelItem {
    watch_model_id: number,
    watch_brand_id: number,
    watch_model_name: string,
    watch_description: string,
    watch_UPC: string,
    watch_model_photo: string,
    watch_country_id: number,
}

export interface GenericModelItem {
    gen_model_id: number,
    gen_brand_id: number,
    gen_model_name: string,
    gen_description: string,
    gen_UPC: string,
    gen_model_photo: string,
    gen_country_id: number,
}

export interface StockItem {
    stock_id: number,
    stock_store_user_id: number,
    orig_watch_model_id: number,
    orig_watch_brand_id: number,
    gen_watch_model_id: number,
    gen_watch_brand_id: number,
    stock_condition: number,
    stock_certification: number,
    stock_DOP: Date,
    stock_notes: string,
    stock_quantity: number,
}

export interface TypeItem {
    type_id: number,
    type_name: string,
}

export interface MovementItem {
    movement_id: number,
    movement_name: string,
}

export interface StyleItem {
    style_id: number,
    style_name: string,
}

export interface CaseMaterialItem {
    case_material_id: number,
    case_material_name: string,
}

export interface GlassMaterialItem {
    glass_material_id: number,
    glass_material_name: string,
}

export interface shapeItem {
    shape_id: number,
    shape_name: string,
}

export interface StrapMaterialItem {
    strap_material_id: number,
    strap_material_name: string,
}

export interface BezelTypeItem {
    bezel_type_id: number,
    bezel_type_name: string,
}

export interface BezelMaterialItem {
    bezel_material_id: number,
    bezel_material_name: string,
}

export interface ClaspTypeItem {
    clasp_type_id: number,
    clasp_type_name: string,
}


export interface OriginalSpecsItem {
    orig_specs_model_id: number,
    orig_specs_brand_id: number,
    orig_specs_type_id: number,
    orig_specs_movement_id: number,
    orig_specs_style_id: number,
    orig_specs_shape_id: number,
    orig_specs_glass_id: number,
    orig_specs_case_color: string,
    orig_specs_case_material_id: number,
    orig_specs_strap_color: number,
    orig_specs_strap_material_id: number,
    orig_specs_dial_color: string,
    orig_specs_depth: number,
    orig_specs_width: number,
    orig_specs_weight: number,
    orig_specs_gender: number,
    orig_specs_water_proof: number,
    orig_specs_water_resistant: number,
    orig_specs_bezel_type_id: number,
    orig_specs_bezel_material_id: number,
    orig_specs_pw_reserve_hr: number,
    orig_specs_lume: number,
    orig_specs_clasp_type_id: number,
}

export interface GenSpecsItem {
    gen_specs_model_id: number,
    gen_specs_brand_id: number,
    gen_specs_type_id: number,
    gen_specs_movement_id: number,
    gen_specs_style_id: number,
    gen_specs_shape_id: number,
    gen_specs_glass_id: number,
    gen_specs_case_color: string,
    gen_specs_case_material_id: number,
    gen_specs_strap_color: string,
    gen_specs_strap_material_id: number,
    gen_specs_dial_color: string,
    gen_specs_depth: number,
    gen_specs_width: number,
    gen_specs_weight: number,
    gen_specs_gender: number,
    gen_specs_water_proof: number,
    gen_specs_water_resistant: number,
    gen_specs_bezel_type_id: number,
    gen_specs_bezel_material_id: number,
    gen_specs_pw_reserve_hr: number,
    gen_specs_lume: number,
    gen_specs_clasp_type_id: number,
}

export interface ListingItem {
    listing_stock_id: number,
    listing_stock_user_id: number,
    listing_date: Date,
    listing_description: string,
    listing_status: number,
    listing_thumbnail: string,
    listing_guarantee: number,
    listing_views: number,
    listing_featured: number,
    listing_unit_cprince: number,
    listing_unit_drice: number,
}

export interface ListingLogItem {
    listingLog_id: number,
    listingLog_stock_id: number,
    listingLog_stock_user_id: number,
    listingLog_date: Date,
    listingLog_listing_guarantee: number,
    listingLog_listing_unit_cprice: number,
    listingLog_listing_unit_dprice: number,
}

export interface ListingReviewItem {
    listingReview_id: number,
    listingReview_stock_user_id: number,
    listingReview_stock_id: number,
    listingReview_date: Date,
    listingReview_rating: number,
    listingReview_comment: string,
}

export interface WishlistItem {
    wishlist_id: number,
    wishlist_user_id: number,
    wishlist_listing_user_id: number,
    wishlist_listing_stock_id: number,
}

export interface ListingPhotoItem {
    listingPhoto_id: number,
    listingPhoto_stock_id: number,
    listingPhoto_stock_user_id: number,
    listingPhoto_path: string,
}

export const apiFetchCalls = {
    "brands": {
        getAll: {
            url: '/fetch/brand',
            method: 'GET',
        },
        getOne(id: string) {
            return {
                url: `/fetch/brand/brand_id/${id}`,
                method: 'GET',
            }
        }
    },
}
