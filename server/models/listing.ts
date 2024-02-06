import { connect } from './knex';

async function connection() {
    const db = await connect();
    return db;
}

async function getAll_orig_previews() {
    const db = await connection();
    const objects = await db('ORIG_LISTING').select(
        'ORIG_LISTING.orig_listing_stock_id as stock_id',
        'ORIG_LISTING.orig_listing_stock_store_user_id as store_user_id',
        'BRAND.brand_name as brand',
        'ORIG_MODEL.orig_model_name as model',
        'ORIG_LISTING.orig_listing_unit_cprice as cprice',
        'MOVEMENT.movement_name as movement',
        'ORIGINAL_SPECS.orig_specs_width as width',
        'ORIG_STOCK.orig_stock_condition as condition',
        'ORIG_LISTING.orig_listing_guarantee as guarantee',
        'STORE.store_name as store_name',
        'ORIG_STOCK.orig_stock_quantity as quantity',
        'USER_INFO.info_user_province as location',
        'USER.user_name as user_name',
        'ORIG_LISTING.orig_listing_date as date',
        'ORIG_LISTING.orig_listing_views as views',
        // This next line indicates the listing type, 1 for new and 2 for used
        // We are not storing this in the database because tables are normalized
        db.raw("1 as listing_type"),
    )
    .avg('ORIG_LISTING_REVIEW.orig_listingReview_rating as rating')
        .leftJoin('ORIG_STOCK',
            function () {
                this.on('ORIG_LISTING.orig_listing_stock_id', '=', 'ORIG_STOCK.orig_stock_id')
                this.andOn('ORIG_LISTING.orig_listing_stock_store_user_id', '=', 'ORIG_STOCK.orig_stock_store_user_id')
            })
        .leftJoin('STORE', 'ORIG_STOCK.orig_stock_store_user_id', 'STORE.store_user_id')
        .leftJoin('USER', 'STORE.store_user_id', 'USER.user_id')
        .leftJoin('USER_INFO', 'USER.user_id', 'USER_INFO.info_user_id')
        .leftJoin('ORIG_LISTING_REVIEW', function () {
            this.on('ORIG_LISTING.orig_listing_stock_id', '=', 'ORIG_LISTING_REVIEW.orig_listingReview_stock_id')
            this.andOn('ORIG_LISTING.orig_listing_stock_store_user_id', '=', 'ORIG_LISTING_REVIEW.orig_listingReview_stock_store_user_id')
        })
        .leftJoin('ORIG_MODEL', function () {
            this.on('ORIG_STOCK.orig_stock_watch_model_id', '=', 'ORIG_MODEL.orig_model_id')
            this.andOn('ORIG_STOCK.orig_stock_watch_brand_id', '=', 'ORIG_MODEL.orig_brand_id')
        })
        .leftJoin('BRAND', 'ORIG_MODEL.orig_brand_id', 'BRAND.brand_id')
        .leftJoin('ORIGINAL_SPECS', function () {
            this.on('ORIG_MODEL.orig_model_id', '=', 'ORIGINAL_SPECS.orig_specs_model_id')
            this.andOn('ORIG_MODEL.orig_brand_id', '=', 'ORIGINAL_SPECS.orig_specs_brand_id')
        })
        .leftJoin('MOVEMENT', 'ORIGINAL_SPECS.orig_specs_movement_id', 'MOVEMENT.movement_id')
        .groupBy('ORIG_LISTING.orig_listing_stock_id', 'ORIG_LISTING.orig_listing_stock_store_user_id');

    const total = objects.length;
    return { objects, total };
}

async function getAll_gen_previews() {
    const db = await connection();
    const objects = await db('GEN_LISTING').select(
        'GEN_LISTING.gen_listing_stock_id as stock_id',
        'GEN_LISTING.gen_listing_stock_store_user_id as store_user_id',
        'BRAND.brand_name as brand',
        'GEN_MODEL.gen_model_name as model',
        'GEN_LISTING.gen_listing_unit_cprice as cprice',
        'MOVEMENT.movement_name as movement',
        'GEN_SPECS.gen_specs_width as width',
        'GEN_STOCK.gen_stock_condition as condition',
        'GEN_LISTING.gen_listing_guarantee as guarantee',
        'STORE.store_name as store_name',
        'GEN_STOCK.gen_stock_quantity as quantity',
        'USER_INFO.info_user_province as location',
        'USER.user_name as user_name',
        'GEN_LISTING.gen_listing_date as date',
        'GEN_LISTING.gen_listing_views as views',
        // This next line indicates the listing type, 1 for new and 2 for used
        // We are not storing this in the database because tables are normalized
        db.raw("2 as listing_type"),
    )
    .avg('GEN_LISTING_REVIEW.gen_listingReview_rating as rating')
        .leftJoin('GEN_STOCK',
            function () {
                this.on('GEN_LISTING.gen_listing_stock_id', '=', 'GEN_STOCK.gen_stock_id')
                this.andOn('GEN_LISTING.gen_listing_stock_store_user_id', '=', 'GEN_STOCK.gen_stock_store_user_id')
            })
        .leftJoin('STORE', 'GEN_STOCK.gen_stock_store_user_id', 'STORE.store_user_id')
        .leftJoin('USER', 'STORE.store_user_id', 'USER.user_id')
        .leftJoin('USER_INFO', 'USER.user_id', 'USER_INFO.info_user_id')
        .leftJoin('GEN_LISTING_REVIEW', function () {
            this.on('GEN_LISTING.gen_listing_stock_id', '=', 'GEN_LISTING_REVIEW.gen_listingReview_stock_id')
            this.andOn('GEN_LISTING.gen_listing_stock_store_user_id', '=', 'GEN_LISTING_REVIEW.gen_listingReview_stock_store_user_id')
        })
        .leftJoin('GEN_MODEL', function () {
            this.on('GEN_STOCK.gen_stock_watch_model_id', '=', 'GEN_MODEL.gen_model_id')
            this.andOn('GEN_STOCK.gen_stock_watch_brand_id', '=', 'GEN_MODEL.gen_brand_id')
        })
        .leftJoin('BRAND', 'GEN_MODEL.gen_brand_id', 'BRAND.brand_id')
        .leftJoin('GEN_SPECS', function () {
            this.on('GEN_MODEL.gen_model_id', '=', 'GEN_SPECS.gen_specs_model_id')
            this.andOn('GEN_MODEL.gen_brand_id', '=', 'GEN_SPECS.gen_specs_brand_id')
        })
        .leftJoin('MOVEMENT', 'GEN_SPECS.gen_specs_movement_id', 'MOVEMENT.movement_id')
        .groupBy('GEN_LISTING.gen_listing_stock_id', 'GEN_LISTING.gen_listing_stock_store_user_id');

    const total = objects.length;
    return { objects, total };
}
























async function getAll() {
    const db = await connection();
    const objects = await db('ORIG_LISTING').select('*');
    const total = objects.length;
    return { objects, total };
}

async function getAllFullListing() {
    const db = await connection();
    const objects = await db('ORIG_LISTING').select(
        'ORIG_LISTING.*',
        'ORIG_STOCK.orig_stock_quantity',
        'ORIG_WATCH_MODEL.watch_model_name',
        'ORIG_WATCH_MODEL.watch_description',
        'BRAND.brand_name',
        'BRAND.brand_logo_path',
        'COUNTRY.country_name',
        'ORIGINAL_SPECS.orig_specs_case_color',
        'ORIGINAL_SPECS.orig_specs_strap_color',
        'ORIGINAL_SPECS.orig_specs_dial_color',
        'ORIGINAL_SPECS.orig_specs_depth',
        'ORIGINAL_SPECS.orig_specs_width',
        'ORIGINAL_SPECS.orig_specs_weight',
        'ORIGINAL_SPECS.orig_specs_gender',
        'ORIGINAL_SPECS.orig_specs_water_proof',
        'ORIGINAL_SPECS.orig_specs_water_resistant',
        'ORIGINAL_SPECS.orig_specs_pw_reserve_hrs',
        'ORIGINAL_SPECS.orig_specs_lume',
        'TYPE.type_name',
        'MOVEMENT.movement_name',
        'STYLE.style_name',
        'SHAPE.shape_name',
        'GLASS_MATERIAL.glass_name',
        'CASE_MATERIAL.caseMaterial_name',
        'STRAP_MATERIAL.strapMaterial_name',
        'BEZEL_TYPE.bezelType_name',
        'BEZEL_MATERIAL.bezelMaterial_name',
        'CLASP_TYPE.claspType_name'
    )

        .leftJoin('ORIG_STOCK',
            function () {
                this.on('ORIG_LISTING.orig_listing_stock_id', '=', 'ORIG_STOCK.orig_stock_id');
                this.andOn('ORIG_LISTING.orig_listing_stock_store_user_id', '=', 'ORIG_STOCK.orig_stock_store_user_id');
            })

        .leftJoin('ORIG_WATCH_MODEL',
            function () {
                this.on('ORIG_STOCK.orig_stock_watch_model_id', '=', 'ORIG_WATCH_MODEL.watch_model_id');
                this.andOn('ORIG_STOCK.orig_stock_watch_brand_id', '=', 'ORIG_WATCH_MODEL.watch_brand_id');
            })

        .leftJoin('BRAND', 'ORIG_WATCH_MODEL.watch_brand_id', 'BRAND.brand_id')
        .leftJoin('COUNTRY', 'ORIG_WATCH_MODEL.watch_country_id', 'COUNTRY.country_id')

        .leftJoin('ORIGINAL_SPECS',
            function () {
                this.on('ORIG_WATCH_MODEL.watch_model_id', '=', 'ORIGINAL_SPECS.orig_specs_model_id');
                this.andOn('ORIG_WATCH_MODEL.watch_brand_id', '=', 'ORIGINAL_SPECS.orig_specs_brand_id');
            })

        .leftJoin('TYPE', 'ORIGINAL_SPECS.orig_specs_type_id', 'TYPE.type_id')
        .leftJoin('MOVEMENT', 'ORIGINAL_SPECS.orig_specs_movement_id', 'MOVEMENT.movement_id')
        .leftJoin('STYLE', 'ORIGINAL_SPECS.orig_specs_style_id', 'STYLE.style_id')
        .leftJoin('SHAPE', 'ORIGINAL_SPECS.orig_specs_shape_id', 'SHAPE.shape_id')
        .leftJoin('GLASS_MATERIAL', 'ORIGINAL_SPECS.orig_specs_glass_id', 'GLASS_MATERIAL.glass_id')
        .leftJoin('CASE_MATERIAL', 'ORIGINAL_SPECS.orig_specs_case_material_id', 'CASE_MATERIAL.caseMaterial_id')
        .leftJoin('STRAP_MATERIAL', 'ORIGINAL_SPECS.orig_specs_strap_material_id', 'STRAP_MATERIAL.strapMaterial_id')
        .leftJoin('BEZEL_TYPE', 'ORIGINAL_SPECS.orig_specs_bezel_type_id', 'BEZEL_TYPE.bezelType_id')
        .leftJoin('BEZEL_MATERIAL', 'ORIGINAL_SPECS.orig_specs_bezel_material_id', 'BEZEL_MATERIAL.bezelMaterial_id')
        .leftJoin('CLASP_TYPE', 'ORIGINAL_SPECS.orig_specs_clasp_type_id', 'CLASP_TYPE.claspType_id');

    const total = objects.length;
    return { objects, total };
}

async function getAllbyPage(page = 1, pageSize = 30) {
    const db = await connection();
    const objects = await db('listing').select('*').offset((page - 1) * pageSize).limit(pageSize);
    const total = objects.length;
    return { objects, total };
}

async function getOne(listing_stock_id: number, listing_stock_user_id: number) {
    const db = await connection();
    const object = await db('listing')
        .select('*')
        .where('listing_stock_id', listing_stock_id)
        .andWhere('listing_stock_user_id', listing_stock_user_id);
    return object;
}

async function addOne(objct: Object) {
    const db = await connection();
    const object = await db('listing').insert(objct);
    return object;
}

async function updateOne(listing_stock_id: number, listing_stock_user_id: number, objct: Object) {
    const db = await connection();
    const object = await db('listing')
        .where('listing_stock_id', listing_stock_id)
        .andWhere('listing_stock_user_id', listing_stock_user_id)
        .update(objct);
    return object;
}

async function deleteOne(listing_stock_id: number, listing_stock_user_id: number) {
    const db = await connection();
    const object = await db('listing')
        .where('listing_stock_id', listing_stock_id)
        .andWhere('listing_stock_user_id', listing_stock_user_id)
        .del();
    return object;
}

async function search(table: string, colum_name: string, key: string) {
    const db = await connection();
    const objects = await db(table).select('*').where(colum_name, 'like', `%${key}%`);
    const total = objects.length;
    return { objects, total };
}

module.exports = { getAll, getAll_orig_previews, getAll_gen_previews, getAllbyPage, getOne, addOne, updateOne, deleteOne, search };