import NewListingStep1 from "../components/NewListingStep1";
import NewListingNav from "../components/NewListingNav";
import { useState } from "react";
import NewListingStep2 from "../components/NewListingStep2";
import { useSelector } from "react-redux";
import { RootState } from "../state/store/store";
import { step1form } from "../components/NewListingStep1";

export default function NewListing() {

    const sessionState = useSelector((state: RootState) => state.session);
    const [step1Form, setStep1Form] = useState({} as step1form);
    const [step1submitted, setStep1submitted] = useState(false);

    const handleStep1Complete = (form: step1form) => {
        setStep1Form(form);
        setStep1submitted(true);
    };

    return (
        <div>
            <NewListingNav />
            <NewListingStep1 complete={handleStep1Complete} sessionStatus={sessionState}/>
            {/* NewListingStep2 might need to go inside newListingStep1 to avoid the screen leak */}
            { step1submitted &&  <NewListingStep2 begin={step1submitted} step1form={step1Form} sessionStatus={sessionState}/>}
           
            
        </div>
    )
}
