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
import { signup } from "../state/store/slice/sessionSlice";


export interface mainForm{
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
        setMainForm({ ...mainForm, step1: form});
        setStep1submitted(true);
    };

    const handleStep2Complete = (form: step2form) => {
        setMainForm({ ...mainForm, step2: form});
        setStep2submitted(true);
    }

    const handleStep3Complete = (form: step3form) => {
        setMainForm({ ...mainForm, step3: form});        
        setStep3submitted(true);
    }

    const handleStep4Complete = (form: step4form) => {
        setMainForm({ ...mainForm, step4: form});
        setStep4submitted(true);
    }

    useEffect(() => {

        if(step1submitted && step2submitted && step3submitted && step4submitted){

            if(sessionState.user.user_type <= 2){
                
            }

            if(sessionState.user.user_type > 2){

                // 1. add unregistered user to db
                dispatch(signup(mainForm.step4))

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
