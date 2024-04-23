import { Gen_listingItem, Gen_modelItem, Gen_specsItem, Gen_stockItem, Orig_listingItem, Orig_modelItem, Orig_stockItem, Original_specsItem, StoreItem, UserInfoItem, UserItem, listing_mainForm } from '../data/interfaces';
import { connect } from './knex';
const bcrypt = require('bcrypt');

async function connection() {
    const db = await connect();
    return db;
}

async function addPhotos(files: any){
    
    // Here's all the details of the photos, name, size, etc.
    console.log(files);

    if(files){
        return {data: "Photos received"}
    } else {
        throw new Error("No photos detected");
    }
}

// This function fetch both listings of original and generic watches, it also detects if the API call is a search.
// This function implements pagination to not include all the data information, improving performance. 
async function get_previews(page = 1, pageSize = 30, search: string, advancedSearch: string) {
    const db = await connection();

    const queryOriginals = db('ORIG_LISTING').select(
        'ORIG_LISTING.orig_listing_stock_id as stock_id',
        'ORIG_LISTING.orig_listing_stock_store_user_id as store_user_id',
        'BRAND.brand_name as brand',
        'ORIG_MODEL.orig_model_name as model',
        'ORIG_LISTING.orig_listing_unit_cprice as cprice',
        'ORIG_LISTING.orig_listing_unit_Dprice as dprice',
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
        db.raw("1 as listing_type"),)
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
        .groupBy('ORIG_LISTING.orig_listing_stock_id', 'ORIG_LISTING.orig_listing_stock_store_user_id').offset((page - 1) * pageSize).limit(pageSize);


    const queryGens = db('GEN_LISTING').select(
        'GEN_LISTING.gen_listing_stock_id as stock_id',
        'GEN_LISTING.gen_listing_stock_store_user_id as store_user_id',
        'BRAND.brand_name as brand',
        'GEN_MODEL.gen_model_name as model',
        'GEN_LISTING.gen_listing_unit_cprice as cprice',
        'GEN_LISTING.gen_listing_unit_dprice as dprice',
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
        db.raw("2 as listing_type"),)
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
        .groupBy('GEN_LISTING.gen_listing_stock_id', 'GEN_LISTING.gen_listing_stock_store_user_id').offset((page - 1) * pageSize).limit(pageSize);



    if (search) {
        const searchToArray = search.split(' ');

        console.log("Entered");
        console.log(searchToArray);

        searchToArray.forEach((word: string, index: number) => {
            if (index === 0) {

                if (searchToArray.length == 1) {
                    queryOriginals.where('ORIG_MODEL.orig_model_name', 'like', `%${word}%`);
                    queryOriginals.orWhere('BRAND.brand_name', 'like', `%${word}%`);
                    queryOriginals.orWhere('MOVEMENT.movement_name', 'like', `%${word}%`);

                    queryGens.where('GEN_MODEL.gen_model_name', 'like', `%${word}%`);
                    queryGens.orWhere('BRAND.brand_name', 'like', `%${word}%`);
                    queryGens.orWhere('MOVEMENT.movement_name', 'like', `%${word}%`);
                } else {
                    queryOriginals.where('BRAND.brand_name', 'like', `%${word}%`);
                    queryGens.where('BRAND.brand_name', 'like', `%${word}%`);
                }

            } else {
                queryOriginals.andWhere('ORIG_MODEL.orig_model_name', 'like', `%${word}%`);
                queryOriginals.orWhere('MOVEMENT.movement_name', 'like', `%${word}%`);

                queryGens.andWhere('GEN_MODEL.gen_model_name', 'like', `%${word}%`);
                queryGens.orWhere('MOVEMENT.movement_name', 'like', `%${word}%`);
            }
        })
    }

    const originals = await queryOriginals;
    const gens = await queryGens;

    const total = originals.length + gens.length;
    const objects = [...originals, ...gens];

    return { objects, total };
}

// ------------------------------------------------------------------------------------------------
async function unregistered_addListing(form: listing_mainForm) {

    const genericUser = {} as UserItem;
    genericUser.user_id = form.step4.user_id;
    genericUser.user_type = 3;
    genericUser.user_password = await bcrypt.hash(process.env.UNREGISTERED_USER_PW, 10);
    genericUser.user_name = "unregistered" + form.step4.user_id;
    genericUser.user_email = form.step4.user_email;
    genericUser.user_photo_path = "/src/assets/images/unregistered_user.jpg";

    const genericUserInfo = {} as UserInfoItem;
    genericUserInfo.info_user_id = form.step4.user_id;
    genericUserInfo.info_user_first_name = form.step4.name;
    genericUserInfo.info_user_last_name = form.step4.lastName;
    genericUserInfo.info_user_province = form.step4.province;

    const genericStore = {} as StoreItem;
    genericStore.store_user_id = form.step4.user_id;
    genericStore.store_name = "unregistered" + form.step4.user_id;
    genericStore.store_about = "unregistered";
    genericStore.store_photo_path = "/src/assets/images/unregistered_store.png";
    genericStore.store_active = 0;

    let specs = {} as any;
    let stock = {} as any;
    let listing = {} as any;

    if (form.step1.certification == 1) {

        specs = {} as Original_specsItem;
        specs.orig_specs_brand_id = form.step1.brand;
        specs.orig_specs_type_id = form.step2.type;
        specs.orig_specs_movement_id = form.step2.movement;
        specs.orig_specs_style_id = form.step2.style;
        specs.orig_specs_shape_id = form.step2.shape;
        specs.orig_specs_glass_id = form.step2.glass_material;
        specs.orig_specs_case_color = form.step2.case_color;
        specs.orig_specs_case_material_id = form.step2.case_material;
        specs.orig_specs_strap_color = form.step2.strap_color;
        specs.orig_specs_strap_material_id = form.step2.strap_material;
        specs.orig_specs_dial_color = form.step2.dial_color;
        specs.orig_specs_depth = form.step2.depth;
        specs.orig_specs_width = form.step2.width;
        specs.orig_specs_weight = form.step2.weight;
        specs.orig_specs_gender = form.step2.gender;
        specs.orig_specs_water_proof = form.step2.water_proof;
        specs.orig_specs_water_resistant = form.step2.water_resistant;
        specs.orig_specs_bezel_type_id = form.step2.bezel_type;
        specs.orig_specs_bezel_material_id = form.step2.bezel_material;
        specs.orig_specs_pw_reserve_hrs = form.step2.power_reserve;
        specs.orig_specs_lume = form.step2.lume;
        specs.orig_specs_clasp_type_id = form.step2.clasp_type;

        stock = {} as Orig_stockItem;
        stock.orig_stock_store_user_id = form.step4.user_id;
        stock.orig_stock_watch_brand_id = form.step1.brand;
        stock.orig_stock_condition = form.step3.condition;
        stock.orig_stock_quantity = form.step3.quantity;

        listing = {} as Orig_listingItem;
        listing.orig_listing_stock_store_user_id = form.step4.user_id;
        listing.orig_listing_description = form.step4.description;
        listing.orig_listing_status = 1;
        listing.orig_listing_guarantee = form.step4.warranty;
        listing.orig_listing_unit_cprice = form.step4.cprice;
        listing.orig_listing_unit_dprice = form.step4.dprice;

    } else {

        specs = {} as Gen_specsItem;
        specs.gen_specs_brand_id = form.step1.brand;
        specs.gen_specs_type_id = form.step2.type;
        specs.gen_specs_movement_id = form.step2.movement;
        specs.gen_specs_style_id = form.step2.style;
        specs.gen_specs_shape_id = form.step2.shape;
        specs.gen_specs_glass_id = form.step2.glass_material;
        specs.gen_specs_case_color = form.step2.case_color;
        specs.gen_specs_case_material_id = form.step2.case_material;
        specs.gen_specs_strap_color = form.step2.strap_color;
        specs.gen_specs_strap_material_id = form.step2.strap_material;
        specs.gen_specs_dial_color = form.step2.dial_color;
        specs.gen_specs_depth = form.step2.depth;
        specs.gen_specs_width = form.step2.width;
        specs.gen_specs_weight = form.step2.weight;
        specs.gen_specs_gender = form.step2.gender;
        specs.gen_specs_water_proof = form.step2.water_proof;
        specs.gen_specs_water_resistant = form.step2.water_resistant;
        specs.gen_specs_bezel_type_id = form.step2.bezel_type;
        specs.gen_specs_bezel_material_id = form.step2.bezel_material;
        specs.gen_specs_pw_reserve_hrs = form.step2.power_reserve;
        specs.gen_specs_lume = form.step2.lume;
        specs.gen_specs_clasp_type_id = form.step2.clasp_type;

        stock = {} as Gen_stockItem;
        stock.gen_stock_store_user_id = form.step4.user_id;
        stock.gen_stock_watch_brand_id = form.step1.brand;
        stock.gen_stock_condition = form.step3.condition;
        stock.gen_stock_quantity = form.step3.quantity;

        listing = {} as Gen_listingItem;
        listing.gen_listing_stock_store_user_id = form.step4.user_id;
        listing.gen_listing_description = form.step4.description;
        listing.gen_listing_status = 1;
        listing.gen_listing_guarantee = form.step4.warranty;
        listing.gen_listing_unit_cprice = form.step4.cprice;
        listing.gen_listing_unit_dprice = form.step4.dprice;
    }

    // UNREGISTERED USER ADDS A LISTING
    // This is the correct order follow when adding a listing based on Tables and Foreign Key.
    // 1. add unregistered user to db
    // 2. add generic store 
    // 3. add model (Returns ID)
    // 4. add specs
    // 5. add stock (Returns ID)
    // 6. add listing

    try {
        const db = await connection();
        const insertedUser = await db('user').insert(genericUser);

        if (insertedUser.length > 0) {
            const insertedStore = await db('store').insert(genericStore);

            if (insertedStore.length > 0) {

                if (form.step1.certification == 1) {

                    await db.raw('CALL olisting_insert_model_return_id(?, ?, ?, @inserted_id)', [form.step1.brand, form.step2.model, "Added automatically from listing"]);
                    const orig_model_inserted_id_select = await db.raw('SELECT @inserted_id as orig_model_inserted_id');
                    const orig_model_inserted_id_value = orig_model_inserted_id_select[0][0].orig_model_inserted_id;

                    if (orig_model_inserted_id_value > 0 && orig_model_inserted_id_value != undefined) {

                        specs.orig_specs_model_id = orig_model_inserted_id_value;
                        const inserted_orig_specs = await db('original_specs').insert(specs);

                        if (inserted_orig_specs.length > 0) {

                            await db.raw('CALL olisting_insert_stock_return_id(?, ?, ?, ?, ?, @inserted_id)',
                                [form.step4.user_id, orig_model_inserted_id_value, form.step1.brand, form.step3.condition, form.step3.quantity]);

                            const orig_stock_inserted_id_select = await db.raw('SELECT @inserted_id as orig_stock_inserted_id');
                            const orig_stock_inserted_id_value = orig_stock_inserted_id_select[0][0].orig_stock_inserted_id

                            if (orig_stock_inserted_id_value > 0 && orig_stock_inserted_id_value != undefined) {

                                listing.orig_listing_stock_id = orig_stock_inserted_id_value;
                                const inserted_listing = await db('orig_listing').insert(listing);

                                const insertedSuccessfully = inserted_listing.length > 0;
                                const total = inserted_listing.length;
                                let data = "";

                                if (insertedSuccessfully) { data = "Listing added successfully" } else { data = "Listing unsuccesfull" };
                                return { data, insertedSuccessfully, total }

                            } else {
                                throw new Error("Original: An error ocurred getting the stock_id inserted")
                            }
                        } else {
                            throw new Error("Original: An error ocurred inserting the specs of original watch")
                        }
                    } else {
                        throw new Error("Original: An error ocurred returning the inserted id in orig_model")
                    }

                } else {

                    let country = 0;

                    if (form.step2.country > 0 && form.step2.country != undefined) {
                        country = form.step2.country;
                    } else {
                        country = 7;
                    }

                    await db.raw('CALL glisting_insert_model_return_id(?, ?, ?, ?, ?, @inserted_id)',
                        [form.step1.brand, form.step2.model, "Added from listing", country, form.step1.certification]);

                    const gen_model_inserted_id_select = await db.raw('SELECT @inserted_id as gen_model_inserted_id');
                    const gen_model_inserted_id_value = gen_model_inserted_id_select[0][0].gen_model_inserted_id;

                    if (gen_model_inserted_id_value > 0 && gen_model_inserted_id_value != undefined) {

                        specs.gen_specs_model_id = gen_model_inserted_id_value;
                        const inserted_gen_specs = await db('gen_specs').insert(specs);

                        if (inserted_gen_specs.length > 0) {

                            await db.raw('CALL glisting_insert_stock_return_id(?, ?, ?, ?, ?, @inserted_id)',
                                [form.step4.user_id, gen_model_inserted_id_value, form.step1.brand, form.step3.condition, form.step3.quantity]);

                            const gen_stock_inserted_id_select = await db.raw('SELECT @inserted_id as gen_stock_inserted_id');
                            const gen_stock_inserted_id_value = gen_stock_inserted_id_select[0][0].gen_stock_inserted_id;

                            if (gen_stock_inserted_id_value > 0) {

                                listing.gen_listing_stock_id = gen_stock_inserted_id_value;
                                const inserted_listing = await db('gen_listing').insert(listing);

                                const insertedSuccessfully = inserted_listing.length > 0;
                                const total = inserted_listing.length;
                                let data = "";

                                if (insertedSuccessfully) { data = "Listing added successfully" } else { data = "Listing unsuccesfull" };
                                return { data, insertedSuccessfully, total }

                            } else {
                                throw new Error("Original: An error ocurred getting the stock_id inserted")
                            }
                        } else {
                            throw new Error("Original: An error ocurred inserting the specs of original watch")
                        }
                    } else {
                        throw new Error("Generic: An error ocurred returning the inserted id in gen_model")
                    }
                }
            } else {
                throw new Error("Something bad happened when inserting the gen store")
            }
        } else {
            throw new Error("Something bad happened when inserting the gen user")
        }
    } catch (err) {
        throw new Error('Backend end error: ' + err);
    }
}


// --- We should have another function here to add listing, but accessed from a secure route.
async function registered_addListing(form: listing_mainForm){

    let specs = {} as any;
    let stock = {} as any;
    let listing = {} as any;

    if (form.step1.certification == 1) {

        specs = {} as Original_specsItem;
        specs.orig_specs_brand_id = form.step1.brand;
        specs.orig_specs_type_id = form.step2.type;
        specs.orig_specs_movement_id = form.step2.movement;
        specs.orig_specs_style_id = form.step2.style;
        specs.orig_specs_shape_id = form.step2.shape;
        specs.orig_specs_glass_id = form.step2.glass_material;
        specs.orig_specs_case_color = form.step2.case_color;
        specs.orig_specs_case_material_id = form.step2.case_material;
        specs.orig_specs_strap_color = form.step2.strap_color;
        specs.orig_specs_strap_material_id = form.step2.strap_material;
        specs.orig_specs_dial_color = form.step2.dial_color;
        specs.orig_specs_depth = form.step2.depth;
        specs.orig_specs_width = form.step2.width;
        specs.orig_specs_weight = form.step2.weight;
        specs.orig_specs_gender = form.step2.gender;
        specs.orig_specs_water_proof = form.step2.water_proof;
        specs.orig_specs_water_resistant = form.step2.water_resistant;
        specs.orig_specs_bezel_type_id = form.step2.bezel_type;
        specs.orig_specs_bezel_material_id = form.step2.bezel_material;
        specs.orig_specs_pw_reserve_hrs = form.step2.power_reserve;
        specs.orig_specs_lume = form.step2.lume;
        specs.orig_specs_clasp_type_id = form.step2.clasp_type;

        stock = {} as Orig_stockItem;
        stock.orig_stock_store_user_id = form.step4.user_id;
        stock.orig_stock_watch_brand_id = form.step1.brand;
        stock.orig_stock_condition = form.step3.condition;
        stock.orig_stock_quantity = form.step3.quantity;

        listing = {} as Orig_listingItem;
        listing.orig_listing_stock_store_user_id = form.step4.user_id;
        listing.orig_listing_description = form.step4.description;
        listing.orig_listing_status = 1;
        listing.orig_listing_guarantee = form.step4.warranty;
        listing.orig_listing_unit_cprice = form.step4.cprice;
        listing.orig_listing_unit_dprice = form.step4.dprice;

    } else {

        specs = {} as Gen_specsItem;
        specs.gen_specs_brand_id = form.step1.brand;
        specs.gen_specs_type_id = form.step2.type;
        specs.gen_specs_movement_id = form.step2.movement;
        specs.gen_specs_style_id = form.step2.style;
        specs.gen_specs_shape_id = form.step2.shape;
        specs.gen_specs_glass_id = form.step2.glass_material;
        specs.gen_specs_case_color = form.step2.case_color;
        specs.gen_specs_case_material_id = form.step2.case_material;
        specs.gen_specs_strap_color = form.step2.strap_color;
        specs.gen_specs_strap_material_id = form.step2.strap_material;
        specs.gen_specs_dial_color = form.step2.dial_color;
        specs.gen_specs_depth = form.step2.depth;
        specs.gen_specs_width = form.step2.width;
        specs.gen_specs_weight = form.step2.weight;
        specs.gen_specs_gender = form.step2.gender;
        specs.gen_specs_water_proof = form.step2.water_proof;
        specs.gen_specs_water_resistant = form.step2.water_resistant;
        specs.gen_specs_bezel_type_id = form.step2.bezel_type;
        specs.gen_specs_bezel_material_id = form.step2.bezel_material;
        specs.gen_specs_pw_reserve_hrs = form.step2.power_reserve;
        specs.gen_specs_lume = form.step2.lume;
        specs.gen_specs_clasp_type_id = form.step2.clasp_type;

        stock = {} as Gen_stockItem;
        stock.gen_stock_store_user_id = form.step4.user_id;
        stock.gen_stock_watch_brand_id = form.step1.brand;
        stock.gen_stock_condition = form.step3.condition;
        stock.gen_stock_quantity = form.step3.quantity;

        listing = {} as Gen_listingItem;
        listing.gen_listing_stock_store_user_id = form.step4.user_id;
        listing.gen_listing_description = form.step4.description;
        listing.gen_listing_status = 1;
        listing.gen_listing_guarantee = form.step4.warranty;
        listing.gen_listing_unit_cprice = form.step4.cprice;
        listing.gen_listing_unit_dprice = form.step4.dprice;
    }

    try{
        const db = await connection();

        if (form.step1.certification == 1) {

            await db.raw('CALL olisting_insert_model_return_id(?, ?, ?, @inserted_id)', [form.step1.brand, form.step2.model, "Added automatically from listing"]);
            const orig_model_inserted_id_select = await db.raw('SELECT @inserted_id as orig_model_inserted_id');
            const orig_model_inserted_id_value = orig_model_inserted_id_select[0][0].orig_model_inserted_id;

            if (orig_model_inserted_id_value > 0 && orig_model_inserted_id_value != undefined) {

                specs.orig_specs_model_id = orig_model_inserted_id_value;
                const inserted_orig_specs = await db('original_specs').insert(specs);

                if (inserted_orig_specs.length > 0) {

                    await db.raw('CALL olisting_insert_stock_return_id(?, ?, ?, ?, ?, @inserted_id)',
                    [form.step4.user_id, orig_model_inserted_id_value, form.step1.brand, form.step3.condition, form.step3.quantity]);

                    const orig_stock_inserted_id_select = await db.raw('SELECT @inserted_id as orig_stock_inserted_id');
                    const orig_stock_inserted_id_value = orig_stock_inserted_id_select[0][0].orig_stock_inserted_id

                    if (orig_stock_inserted_id_value > 0 && orig_stock_inserted_id_value != undefined) {

                        listing.orig_listing_stock_id = orig_stock_inserted_id_value;
                        const inserted_listing = await db('orig_listing').insert(listing);

                        const insertedSuccessfully = inserted_listing.length > 0;
                        const total = inserted_listing.length;
                        let data = "";

                        if (insertedSuccessfully) { data = "Listing added successfully" } else { data = "Listing unsuccesfull" };
                        return { data, insertedSuccessfully, total }

                    } else {
                        throw new Error("Original: An error ocurred getting the stock_id inserted")
                    }
                } else {
                    throw new Error("Original: An error ocurred inserting the specs of original watch")
                }
            } else {
                throw new Error("Original: An error ocurred returning the inserted id in orig_model")
            }

        } else {

            let country = 0;

            if (form.step2.country > 0 && form.step2.country != undefined) {
                country = form.step2.country;
            } else {
                country = 7;
            }

            await db.raw('CALL glisting_insert_model_return_id(?, ?, ?, ?, ?, @inserted_id)',
                [form.step1.brand, form.step2.model, "Added from listing", country, form.step1.certification]);

            const gen_model_inserted_id_select = await db.raw('SELECT @inserted_id as gen_model_inserted_id');
            const gen_model_inserted_id_value = gen_model_inserted_id_select[0][0].gen_model_inserted_id;

            if (gen_model_inserted_id_value > 0 && gen_model_inserted_id_value != undefined) {

                specs.gen_specs_model_id = gen_model_inserted_id_value;
                const inserted_gen_specs = await db('gen_specs').insert(specs);

                if (inserted_gen_specs.length > 0) {

                    await db.raw('CALL glisting_insert_stock_return_id(?, ?, ?, ?, ?, @inserted_id)',
                        [form.step4.user_id, gen_model_inserted_id_value, form.step1.brand, form.step3.condition, form.step3.quantity]);

                    const gen_stock_inserted_id_select = await db.raw('SELECT @inserted_id as gen_stock_inserted_id');
                    const gen_stock_inserted_id_value = gen_stock_inserted_id_select[0][0].gen_stock_inserted_id;

                    if (gen_stock_inserted_id_value > 0) {

                        listing.gen_listing_stock_id = gen_stock_inserted_id_value;
                        const inserted_listing = await db('gen_listing').insert(listing);

                        const insertedSuccessfully = inserted_listing.length > 0;
                        const total = inserted_listing.length;
                        let data = "";

                        if (insertedSuccessfully) { data = "Listing added successfully" } else { data = "Listing unsuccesfull" };
                        return { data, insertedSuccessfully, total }

                    } else {
                        throw new Error("Original: An error ocurred getting the stock_id inserted")
                    }
                } else {
                    throw new Error("Original: An error ocurred inserting the specs of original watch")
                }
            } else {
                throw new Error("Generic: An error ocurred returning the inserted id in gen_model")
            }
        }

    } catch (err){
        throw new Error('Backend end error: ' + err);
    }
}

async function guestHasListing(key: number) {
    const db = await connection();

    const orig_listings_count = await db('ORIG_LISTING').count('orig_listing_stock_store_user_id').where('orig_listing_stock_store_user_id', key);
    const gen_listings_count = await db('GEN_LISTING').count('gen_listing_stock_store_user_id').where('gen_listing_stock_store_user_id', key);

    const objects = "No objects returned required for this endpoint."
    const total = Number(orig_listings_count[0]['count(`orig_listing_stock_store_user_id`)']) + Number(gen_listings_count[0]['count(`gen_listing_stock_store_user_id`)']);

    return { objects, total };
}


async function userSearch(key: string[]) {
    const db = await connection();

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

module.exports = { getAll, get_previews, getAllbyPage, getOne, addOne, updateOne, deleteOne, search, guestHasListing, unregistered_addListing, registered_addListing, addPhotos};
