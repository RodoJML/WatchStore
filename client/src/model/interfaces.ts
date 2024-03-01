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
    user_email: string,
    user_password: string | undefined,
    user_views: number | undefined,
    user_photo_path: string | undefined,
    user_registration_date: Date | undefined,
}

export interface UserInfoItem {
    info_user_id: number,
    info_user_first_name: string,
    info_user_last_name: string,
    info_user_phone2: number | undefined,
    info_user_phone3: number | undefined,
    info_user_address1: string | undefined,
    info_user_address2: string | undefined,
    info_user_province: string,
}

export interface StoreItem {
    store_user_id: number,
    store_name: string,
    store_about: string,
    store_photo_path: string,
}

export interface BrandItem {
    brand_id: number,
    brand_name: string,
    brand_logo_path: string,
    brand_website: string,
    brand_country_id: number,
}

export interface CountryItem {
    country_id: number,
    country_name: string,
    country_emoji: string,
}

export interface Orig_modelItem {
    orig_model_id: number | undefined,
    orig_brand_id: number,
    orig_model_name: string,
    orig_description: string | undefined,
    orig_UPC: string | undefined,
    orig_model_photo_path: string | undefined,
    orig_model_isTemplate: number,
}

export interface GenModelItem {
    gen_model_id: number | undefined,
    gen_brand_id: number,
    gen_model_name: string,
    gen_description: string | undefined,
    gen_UPC: string | undefined,
    gen_model_photo_path: string | undefined,
    gen_country_id: number,
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

export interface AuthenticationEnvelope {
    user: UserItem,
    token: string,
}

export interface Slide {
    url: string,
    title: string,
    description: string,
}

export interface SearchForm {
    model: string | undefined,
    brand: number | undefined,
    condition: number | undefined,
    certification: number | undefined,
    movement: number | undefined,
    width: number | undefined,
    style: number | undefined,
    type: number | undefined,
    bezel_type: number | undefined,
    glass_material: number | undefined,
    shape: number | undefined,
    gender: number | undefined,
    province: string | undefined,
    lume: number | undefined,
    weight: string | undefined,
    depth: string | undefined,
    clasp_type: number | undefined,
    power_reserve: number | undefined,
    guarantee: number | undefined,
    water_proof: number | undefined,
    water_resistant: number | undefined,
    case_material: number | undefined,
    strap_material: number | undefined,
    bezel_material: number | undefined,
    case_color: string | undefined,
    strap_color: string | undefined,
    dial_color: string | undefined,
}

export interface ListingPreviewItem {
    stock_id: number,
    store_user_id: number,
    brand: string,
    model: string,
    cprice: number,
    dprice: number | null,
    movement: string,
    width: number,
    condition: number,
    guarantee: number,
    store_name: string,
    quantity: number,
    location: string | null,
    user_name: string,
    date: Date,
    views: number,
    listing_type: number,
    rating: number,
}