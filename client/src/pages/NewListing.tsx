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
import { addUnregisteredUser, signup } from "../state/store/slice/sessionSlice";
import { postListing_addStore } from "../state/store/slice/listingsSlice";
import { StoreItem, UserInfoItem, UserItem, GenModelItem, OrigModelItem } from "../model/fetch";


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

            let model = {};
            let specs = {};

            if (mainForm.step1.certification === 1) {

                model = {
                    orig_model_id: undefined,
                    orig_brand_id: mainForm.step1.brand,
                    orig_model_name: mainForm.step2.model,
                    orig_description: "Added automatically from a Listing",
                    orig_UPC: undefined,
                    orig_model_photo_path: undefined,
                    orig_model_isTemplate: 0
                } as OrigModelItem;

            } else {

                model = {
                    gen_model_id: undefined,
                    gen_brand_id: mainForm.step1.brand,
                    gen_model_name: mainForm.step2.model,
                    gen_description: "Added automatically from a Listing",
                    gen_UPC: undefined,
                    gen_model_photo_path: undefined,
                    gen_country_id: mainForm.step2.country,
                } as GenModelItem;

            }



            if (sessionState.user.user_type <= 2) {

            }

            // If user is of type 3 or higher, meaning unregistered. 
            if (sessionState.user.user_type > 2) {

                // Using the form data and shape it into the DB schema
                const genericUser = {
                    user_id: mainForm.step4.user_id,
                    user_type: 3,
                    user_name: "Unregistered_User",
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







                // 1. add unregistered user to db
                dispatch(addUnregisteredUser(mainForm.step4)).then((result: any) => {
                    if (result.payload.isSuccess) {
                        console.log("Unregistered user added");

                    } else {
                        console.log("Something wrong happened while posting the listing");
                    }
                })

                // 2. add store 

                // 3. add model

                // 4. add specs

                // 5. add stock

                // 6. add listing

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
