import NewListingStep1 from "../components/NewListingStep1";
import NewListingStep2 from "../components/NewListingStep2";
import NewListingStep3 from "../components/NewListingStep3";
import NewListingStep4 from "../components/NewListingStep4";
import NewListingPosting from "../components/NewListingPosting";
import NewListingNav from "../components/NewListingNav";
import Notification from '../components/Notification';

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { step1form } from "../components/NewListingStep1";
import { step2form } from "../components/NewListingStep2";
import { step3form } from "../components/NewListingStep3";
import { step4form } from "../components/NewListingStep4";

import { useNavigate } from "react-router-dom";
import { unregistered_addListing } from "../state/store/slice/listingsSlice";
import { DataEnvelope } from "../model/interfaces";
import { unwrapResult } from "@reduxjs/toolkit";

export interface Listing_mainForm {
    step1: step1form,
    step2: step2form,
    step3: step3form,
    step4: step4form,
}

export default function NewListing() {

    const sessionState = useSelector((state: RootState) => state.session);
    const dispatch = useDispatch<AppDispatch>();
    const [mainForm, setMainForm] = useState({} as Listing_mainForm);
    const navigate = useNavigate();

    const [currentStep, setCurrentStep] = useState(1);
    const [step1submitted, setStep1submitted] = useState(false);
    const [step2submitted, setStep2submitted] = useState(false);
    const [step3submitted, setStep3submitted] = useState(false);
    const [step4submitted, setStep4submitted] = useState(false);
    const [postedSucessfully, setPostedSucessfully] = useState(0);

    const handleStep1Complete = (form: step1form) => {
        setMainForm({ ...mainForm, step1: form });
        setStep1submitted(true);
        setCurrentStep(2);
    };

    const handleStep2Complete = (form: step2form) => {
        setMainForm({ ...mainForm, step2: form });
        setStep2submitted(true);
        setCurrentStep(3);
    }

    const handleStep3Complete = (form: step3form) => {
        setMainForm({ ...mainForm, step3: form });
        setStep3submitted(true);
        setCurrentStep(4);
    }

    const handleStep4Complete = (form: step4form) => {
        setMainForm({ ...mainForm, step4: form });
        setStep4submitted(true);
        setCurrentStep(5);
    }

    useEffect(() => {

        let timeout1: NodeJS.Timeout;

        if (step1submitted && step2submitted && step3submitted && step4submitted) {

            // If user is of type 3 or higher, it means its unregistered.
            if (sessionState.user.user_type <= 2) {

            } else {
                dispatch(unregistered_addListing(mainForm)).then(unwrapResult).then((result: DataEnvelope<string>) => {
                    if(result.isSuccess == true){
                        setPostedSucessfully(1);
                        timeout1 = setTimeout(() => {navigate("/")}, 2000);
                    } else {
                        setPostedSucessfully(2);
                    }
                }).catch((err) => {alert(err)});
            }
        }

        return () => {clearTimeout(timeout1)};

    }, [mainForm, step1submitted, step2submitted, step3submitted, step4submitted])

    return (
        <div>
            <Notification message={sessionState.notification} />
            <NewListingNav currentStep={currentStep}/>
            <NewListingStep1 complete={handleStep1Complete} sessionStatus={sessionState} />
            {step1submitted && <NewListingStep2 begin={step1submitted} mainForm={mainForm} sessionStatus={sessionState} complete={handleStep2Complete} />}
            {step2submitted && <NewListingStep3 begin={step2submitted} mainForm={mainForm} sessionStatus={sessionState} complete={handleStep3Complete} />}
            {step3submitted && <NewListingStep4 begin={step3submitted} mainForm={mainForm} sessionStatus={sessionState} complete={handleStep4Complete} />}
            {step4submitted && <NewListingPosting isSuccess={postedSucessfully}/>}
        </div>
    )
}
