// Purpose: Interfaces for data models.

export type DataEnvelope<T> = {
    data: T,
    isSuccess: boolean,
    error?: string,
}

export interface UserItem {
    user_id: number,
    user_type: number,
    user_name: string,
    user_email: string,
    user_password: string | null | undefined,
    user_views: number | null | undefined,
    user_photo_path: string | null | undefined,
    user_registration_date: Date | null | undefined,
}

export interface StoreItem {
    store_user_id: number,
    store_name: string,
    store_about: string,
    store_path: string,
}

export interface Orig_modelItem {
    orig_model_id: number | undefined,
    orig_brand_id: number,
    orig_model_name: string,
    orig_description: string | undefined,
    orig_UPC: string | undefined,
    orig_model_photo_path: string | undefined,
    orig_model_isTemplate: number | undefined,
}

export interface Gen_modelItem {
    gen_model_id: number | undefined,
    gen_brand_id: number,
    gen_model_name: string,
    gen_description: string | undefined,
    gen_UPC: string | undefined,
    gen_model_photo_path: string | undefined,
    gen_country_id: number,
}

export interface Original_specsItem {
    orig_specs_model_id: number,
    orig_specs_brand_id: number,
    orig_specs_type_id: number,
    orig_specs_movement_id: number,
    orig_specs_style_id: number,
    orig_specs_shape_id: number,
    orig_specs_glass_id: number,
    orig_specs_case_color: string,
    orig_specs_case_material_id: number,
    orig_specs_strap_color: string,
    orig_specs_strap_material_id: number,
    orig_specs_dial_color: string,
    orig_specs_depth: string,
    orig_specs_width: number,
    orig_specs_weight: string,
    orig_specs_gender: number,
    orig_specs_water_proof: number,
    orig_specs_water_resistant: number,
    orig_specs_bezel_type_id: number,
    orig_specs_bezel_material_id: number,
    orig_specs_pw_reserve_hrs: number,
    orig_specs_lume: number,
    orig_specs_clasp_type_id: number,
}

export interface Gen_specsItem {
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
    gen_specs_pw_reserve_hrs: number,
    gen_specs_lume: number,
    gen_specs_clasp_type_id: number,
}

export interface Orig_stockItem {
    orig_stock_id: number,
    orig_stock_store_user_id: number,
    orig_stock_watch_model_id: number,
    orig_stock_watch_brand_id: number,
    orig_stock_condition_id: number,
    orig_stock_DOP: Date,
    orig_stock_notes: number,
    orig_stock_quantity: number,
    orig_stock_sold_out: number,
}

export interface Gen_stockItem {
    gen_stock_id: number,
    gen_stock_store_user_id: number,
    gen_stock_watch_model_id: number,
    gen_stock_watch_brand_id: number,
    gen_stock_condition_id: number,
    gen_stock_DOP: Date,
    gen_stock_notes: number,
    gen_stock_quantity: number,
    gen_stock_sold_out: number,
}
