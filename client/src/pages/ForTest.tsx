import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../state/store/store";
import { useEffect, useState } from "react";
import * as Fetch from '../model/fetch';


export default function ForTest() {

    const dispatch = useDispatch<AppDispatch>();
    const [formData, setFormData] = useState(new FormData());

    useEffect(() => {
        console.log(formData.get('photos'));
    }, [formData])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        const input = e.target;

        if (input.files) {
            console.log("File detected");
            const updatedFormData = new FormData();

            //Iterate over the files in my input and append them into the updatedFormFiles variable. 
            for (let i = 0; i < input.files.length; i++) {
                console.log(`iterate this ${i} much times`)
                updatedFormData.append('photos', input.files[i]);
            }

            setFormData(updatedFormData);
        }
    }

    const handleSubmit = async (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>) => {
        e.preventDefault();
        console.log("Submitted");

        try {
            const response = await Fetch.api('/listing/addPhotos', formData, 'POST');
            console.log(response);
        } catch (error) {
            console.error("Error submitting form:", error);
        }

    }


    return (
        <>
            <form onSubmit={handleSubmit}>
               
                    <input type="file" name="photos" id="photos" accept="image/*" multiple
                        className="flex justify-center w-full text-white px-5 py-2" onChange={handleInputChange} />
            
                <button>Submit</button>
            </form>


        </>
    )
}