// Purpose: Interfaces for data models.

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