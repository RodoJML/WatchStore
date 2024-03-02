import NewListingStep1 from "../components/NewListingStep1";
import NewListingNav from "../components/NewListingNav";
import { useEffect, useState } from "react";
import NewListingStep2 from "../components/NewListingStep2";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { step1form } from "../components/NewListingStep1";
import { step2form } from "../components/NewListingStep2";
import { step3form } from "../components/NewListingStep3";
import { step4form } from "../components/NewListingStep4";
import NewListingStep3 from "../components/NewListingStep3";
import NewListingStep4 from "../components/NewListingStep4";
import Notification from '../components/Notification';
import { addFromListing as genUser_addFromListing } from "../state/store/slice/userSlice";
import { StoreItem, UserInfoItem, UserItem, Gen_modelItem, Orig_modelItem, DataEnvelope, Original_specsItem } from "../model/interfaces";
import { unwrapResult } from "@reduxjs/toolkit";
import { addFromListing as store_addFromListing } from "../state/store/slice/storeSlice";
import { addFromListing as orig_model_addFromListing } from "../state/store/slice/orig_modelSlice";


export interface mainForm {
    step1: step1form,
    step2: step2form,
    step3: step3form,
    step4: step4form,
}

export default function NewListing() {

    const sessionState = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch<AppDispatch>();
    const [mainForm, setMainForm] = useState({} as mainForm);

    const [step1submitted, setStep1submitted] = useState(false);
    const [step2submitted, setStep2submitted] = useState(false);
    const [step3submitted, setStep3submitted] = useState(false);
    const [step4submitted, setStep4submitted] = useState(false);

    const handleStep1Complete = (form: step1form) => {
        setMainForm({ ...mainForm, step1: form });
        setStep1submitted(true);
    };

    const handleStep2Complete = (form: step2form) => {
        setMainForm({ ...mainForm, step2: form });
        setStep2submitted(true);
    }

    const handleStep3Complete = (form: step3form) => {
        setMainForm({ ...mainForm, step3: form });
        setStep3submitted(true);
    }

    const handleStep4Complete = (form: step4form) => {
        setMainForm({ ...mainForm, step4: form });
        setStep4submitted(true);
    }

    useEffect(() => {

        if (step1submitted && step2submitted && step3submitted && step4submitted) {

            if (sessionState.user.user_type <= 2) {

            }

            // If user is of type 3 or higher, meaning unregistered. 
            if (sessionState.user.user_type > 2) {

                // Using the form data and shape it into the DB schema
                const genericUser = {
                    user_id: mainForm.step4.user_id,
                    user_type: 3,
                    user_name: "unregistered" + mainForm.step4.user_id,
                    user_email: mainForm.step4.user_email,
                    user_password: undefined,
                    user_views: undefined,
                    user_photo_path: "/src/assets/images/unregistered_user.jpg",
                    user_registration_date: undefined,
                } as UserItem;

                const genericUserInfo = {
                    info_user_id: mainForm.step4.user_id,
                    info_user_first_name: mainForm.step4.name,
                    info_user_last_name: mainForm.step4.lastName,
                    info_user_phone2: undefined,
                    info_user_phone3: undefined,
                    info_user_address1: undefined,
                    info_user_address2: undefined,
                    info_user_province: mainForm.step4.province,
                } as UserInfoItem;

                const genericStore = {
                    store_user_id: mainForm.step4.user_id,
                    store_name: "Unregistered Store",
                    store_about: "This store is a placeholder for unregistered users",
                    store_photo_path: "/src/assets/images/unregistered_store.png",
                } as StoreItem;


                // ERROR CODES
                // Error code 00: Issue in the outermost dispatch 
                // Error code 01: Issue adding generic user
                // Error code 02: Issue adding generic store

                // STEPS WHEN AN UNREGISTERED USER ADDS A LISTING
                // 1. add unregistered user to db
                // 2. add ageneric store 
                // 3. add model
                // 4. add specs
                // 5. add stock 
                // 6. add listing

                dispatch(genUser_addFromListing(genericUser)).then(unwrapResult)
                    .then((result: DataEnvelope<boolean>) => {
                        if (result.data === true) {
                            dispatch(store_addFromListing(genericStore)).then(unwrapResult)
                                .then((result: DataEnvelope<boolean>) => {
                                    if (result.data === true) {
                                        
                                        if (mainForm.step1.certification === 1) {

                                            const orig_model = {
                                                orig_model_id: undefined,
                                                orig_brand_id: mainForm.step1.brand,
                                                orig_model_name: mainForm.step2.model,
                                                orig_description: "Added automatically from a Listing",
                                                orig_UPC: undefined,
                                                orig_model_photo_path: undefined,
                                                orig_model_isTemplate: 0
                                            } as Orig_modelItem;

                                            dispatch(orig_model_addFromListing(orig_model)).then(unwrapResult)
                                                .then((result: DataEnvelope<number>) => {

                                                    const original_specs = {
                                                        orig_specs_model_id: result.data,
                                                        orig_specs_brand_id: mainForm.step1.brand,
                                                        orig_specs_type_id: mainForm.step2.type,
                                                        orig_specs_movement_id: mainForm.step2.movement,
                                                        orig_specs_style_id: mainForm.step2.style,
                                                        orig_specs_shape_id: mainForm.step2.shape,
                                                        orig_specs_glass_id: mainForm.step2.glass_material,
                                                        orig_specs_case_color: mainForm.step2.case_color,
                                                        orig_specs_case_material_id: mainForm.step2.case_material,
                                                        orig_specs_strap_color: mainForm.step2.strap_color,
                                                        orig_specs_strap_material_id: mainForm.step2.strap_material,
                                                        orig_specs_dial_color: mainForm.step2.dial_color,
                                                        orig_specs_depth: mainForm.step2.depth,
                                                        orig_specs_width: mainForm.step2.width,
                                                        orig_specs_weight: mainForm.step2.weight,
                                                        orig_specs_gender: mainForm.step2.gender,
                                                        orig_specs_water_proof: mainForm.step2.water_proof,
                                                        orig_specs_water_resistance: mainForm.step2.water_resistant,
                                                        orig_specs_bezel_type_id: mainForm.step2.bezel_type,
                                                        orig_specs_bezel_material: mainForm.step2.bezel_material,
                                                        orig_specs_pw_reserve_hrs: mainForm.step2.power_reserve,
                                                        orig_specs_lume: mainForm.step2.lume,
                                                        orig_specs_clasp_type_id: mainForm.step2.clasp_type,
                                                    }

                                                }
                                                ).catch((err) => { })

                                        } else {

                                            const model = {
                                                gen_model_id: undefined,
                                                gen_brand_id: mainForm.step1.brand,
                                                gen_model_name: mainForm.step2.model,
                                                gen_description: "Added automatically from a Listing",
                                                gen_UPC: undefined,
                                                gen_model_photo_path: undefined,
                                                gen_country_id: mainForm.step2.country,
                                            } as Gen_modelItem;

                                        }
                                    } else {
                                        alert("Error Código 02: Por favor intentar de nuevo desde el inicio");
                                    }
                                }).catch((err) => { })
                        } else {
                            alert("Error Código 01: Por favor intentar de nuevo desde el inicio");
                        }
                    }).catch((err) => {
                        console.log(err);
                        alert("Error Código 00: Por favor intentar de nuevo desde el inicio");
                    });








                console.log(mainForm);
            }

            console.log("Ready to submit");
        }

    }, [mainForm])

    return (
        <div>
            <Notification message={sessionState.notification} />
            <NewListingNav />
            <NewListingStep1 complete={handleStep1Complete} sessionStatus={sessionState} />
            {step1submitted && <NewListingStep2 begin={step1submitted} mainForm={mainForm} sessionStatus={sessionState} complete={handleStep2Complete} />}
            {step2submitted && <NewListingStep3 begin={step2submitted} mainForm={mainForm} sessionStatus={sessionState} complete={handleStep3Complete} />}
            {step3submitted && <NewListingStep4 begin={step3submitted} mainForm={mainForm} sessionStatus={sessionState} complete={handleStep4Complete} />}
        </div>
    )
}
