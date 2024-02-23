import NewListingStep1 from "../components/NewListingStep1";
import NewListingNav from "../components/NewListingNav";
import { useState } from "react";
import NewListingStep2 from "../components/NewListingStep2";
import { useSelector } from "react-redux";
import { RootState } from "../state/store/store";
import { step1form } from "../components/NewListingStep1";
import { step2form } from "../components/NewListingStep2";
import NewListingStep3 from "../components/NewListingStep3";

export default function NewListing() {

    const sessionState = useSelector((state: RootState) => state.session);
    const [step1Form, setStep1Form] = useState({} as step1form);
    const [steo2Form, setStep2Form] = useState({} as step2form);
    const [step1submitted, setStep1submitted] = useState(false);
    const [step2submitted, setStep2submitted] = useState(false);

    const handleStep1Complete = (form: step1form) => {
        setStep1Form(form);
        setStep1submitted(true);
    };

    const handleStep2Complete = (form: step2form) => {
        setStep2Form(form);
        setStep2submitted(true);
    }

    return (
        <div>
            <NewListingNav />
            <NewListingStep1 complete={handleStep1Complete} sessionStatus={sessionState} />
            {step1submitted && <NewListingStep2 begin={step1submitted} step1form={step1Form} sessionStatus={sessionState} complete={handleStep2Complete} />}
            {step2submitted && <NewListingStep3 begin={step2submitted} step1form={step1Form} step2form={steo2Form} sessionStatus={sessionState} />}
        </div>
    )
}
